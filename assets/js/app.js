/*
  Mock Exam Portal - app.js
  
  PURPOSE:
    Central hub for shared utilities, constants, and helpers used across all pages.
    Provides safe DOM manipulation, localStorage persistence, error handling, and security measures.
  
  KEY RESPONSIBILITIES:
    1. Application constants (time units, storage keys)
    2. localStorage wrapper functions (load, save, parse, validate)
    3. Security utilities (clipboard/selection disabling, HTML sanitization)
    4. Error handling and safe action execution
    5. Student profile and attempt data management
    6. Toast notifications for user feedback
    7. Duration formatting and query string parsing
  
  ARCHITECTURE:
    - IIFE (Immediately Invoked Function Expression) for scope isolation
    - All utilities exposed via window.MockExam namespace
    - Defensive programming: null checks, try-catch blocks, fallback values
    - Safe HTML rendering through DOMPurify or manual tag stripping
  
  SECURITY NOTES:
    - Disables copy/paste/right-click to prevent cheating during exams
    - Sanitizes all HTML before DOM insertion to prevent XSS
    - Uses non-cryptographic hash for offline lecturer authentication
*/

(() => {
  "use strict";

  // ===== CONSTANTS & CONFIGURATION =====
  // Centralized application constants including time units and storage key mappings
  const constants = Object.freeze({
    PERCENT_MAX: 100,
    TIME_MS: Object.freeze({
      SECOND: 1000,
      MINUTE: 60 * 1000,
      HOUR: 60 * 60 * 1000,
      DAY: 24 * 60 * 60 * 1000,
      TOAST_DEFAULT: 3000,
      TOAST_WELCOME: 4500,
    }),
  });

  // HTML tags that pose security risks and are stripped during sanitization
  const SANITIZE_BLOCKED_TAGS = Object.freeze(["script", "iframe", "object", "embed", "link", "style"]);

  // ===== localStorage KEYS & METADATA =====
  // Namespaced storage keys to avoid collisions with other apps
  const storeKey = {
    studentProfile: "mockExam.studentProfile",
    lecturerPasscode: "mockExam.lecturerCode",
    attempts: "mockExam.attempts",
    activeAttempt: "mockExam.activeAttempt",
  };

  // ===== DOM UTILITIES =====
  // Helper functions for DOM manipulation and year updates
  const getYearElms = () => document.querySelectorAll("[data-year]");
  const setCurrentYear = () => {
    const year = new Date().getFullYear();
    getYearElms().forEach((node) => (node.textContent = String(year)));
  };

  /**
   * Disable clipboard and selection-related interactions globally.
   * Prevents cheating by disabling copy/paste/cut/right-click during exams.
   * @returns {void}
   */
  const disableClipboardInteractions = () => {
    const cancel = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    ["copy", "cut", "paste", "contextmenu", "selectstart", "dragstart"].forEach((eventName) => {
      document.addEventListener(eventName, cancel, true);
    });

    document.addEventListener(
      "keydown",
      (event) => {
        const key = typeof event.key === "string" ? event.key.toLowerCase() : "";
        const ctrlOrMeta = event.ctrlKey || event.metaKey;
        const shift = event.shiftKey;

        const blocked =
          (ctrlOrMeta && ["c", "x", "v", "a"].includes(key)) ||
          (shift && key === "insert") ||
          (ctrlOrMeta && key === "insert") ||
          (shift && key === "delete");

        if (blocked) {
          cancel(event);
        }
      },
      true
    );
  };

  // ===== localStorage PERSISTENCE =====
  // Wrapper functions for safe read/write to browser storage with error handling
  
  /**
   * Attempt to read and parse JSON from localStorage.
   * @param {string} key
   * @param {unknown} fallback
   * @returns {any}
   */
  const load = (key, fallback = null) => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to load from localStorage", key, err);
      return fallback;
    }
  };

  /**
   * Serialize state into localStorage or remove it when value is undefined.
   * @param {string} key
   * @param {any} value
   * @returns {boolean}
   */
  const save = (key, value) => {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      return true;
    } catch (err) {
      console.error("Failed to save to localStorage", key, err);
      return false;
    }
  };

  // ===== HTML SANITIZATION & SECURITY =====
  // Sanitize user-facing content to prevent XSS attacks
  
  /**
   * Sanitize markup using DOMPurify when available, otherwise stripping dangerous tags.
   * @param {string} html
   * @returns {string}
   */
  const sanitizeMarkup = (html) => {
    if (typeof html !== "string" || !html.trim()) {
      return "";
    }
    if (window.DOMPurify?.sanitize) {
      return window.DOMPurify.sanitize(html);
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      SANITIZE_BLOCKED_TAGS.forEach((tag) => {
        doc.body.querySelectorAll(tag).forEach((node) => node.remove());
      });
      return doc.body.innerHTML;
    } catch (error) {
      console.error("Failed to sanitize markup", error);
      return "";
    }
  };

  // ===== TOAST NOTIFICATIONS =====
  // User feedback system for messages and alerts
  
  const toast = (() => {
    let hideTimer = null;
    const node = document.getElementById("toast");
    if (!node) {
      return () => {};
    }
    return (message, timeout = constants.TIME_MS.TOAST_DEFAULT) => {
      node.textContent = message;
      node.classList.add("is-visible");
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
      hideTimer = window.setTimeout(() => {
        node.classList.remove("is-visible");
      }, timeout);
    };
  })();

  // ===== PUBLIC API - Exposed via window.MockExam =====
  /*
    All utilities and functions exposed to other scripts.
    This namespace prevents global scope pollution and organizes functionality.
    
    Sections:
      - Data management (student profile, attempts, active attempt)
      - Error handling (safe action execution, error reporting)
      - DOM utilities (set HTML safely, clear/display form errors)
      - Security utilities (sanitization, authentication)
      - Utilities (duration formatting, query parsing)
  */
  
  window.MockExam = {
    storeKey,
    constants,
    load,
    save,
    toast,
    sanitizeHTML: sanitizeMarkup,
    
    // ===== ERROR HANDLING =====
    /**
     * Report errors in a consistent manner.
     * @param {string} context
     * @param {unknown} error
     */
    handleError(context, error) {
      console.error(`[MockExam] ${context}`, error);
      if (typeof toast === "function") {
        toast("Something went wrong. Please try again.", constants.TIME_MS.TOAST_DEFAULT);
      }
    },
    /**
     * Safely execute a callback and capture unexpected failures.
     * @template T
     * @param {string} context
     * @param {() => T} action
     * @returns {T|null}
     */
    safeAction(context, action) {
      try {
        return action();
      } catch (error) {
        this.handleError(context, error);
        return null;
      }
    },
    /**
     * Hydrate an element with sanitized HTML.
     * @param {Element|null} target
     * @param {string} html
     */
    setHTML(target, html) {
      if (!(target instanceof Element)) {
        return;
      }
      this.safeAction(`setHTML:${target.id ?? target.className ?? target.tagName}`, () => {
        target.innerHTML = this.sanitizeHTML(html);
      });
    },
    formatDuration(totalSeconds) {
      const secondsPerHour = constants.TIME_MS.HOUR / constants.TIME_MS.SECOND;
      const secondsPerMinute = constants.TIME_MS.MINUTE / constants.TIME_MS.SECOND;
      const hours = Math.floor(totalSeconds / secondsPerHour);
      const minutes = Math.floor((totalSeconds % secondsPerHour) / secondsPerMinute);
      const seconds = Math.max(0, totalSeconds % secondsPerMinute);
      return [hours, minutes, seconds]
        .map((unit) => String(unit).padStart(2, "0"))
        .join(":");
    },
    
    // ===== UTILITY FUNCTIONS =====
    parseQuery() {
      return new URLSearchParams(window.location.search);
    },
    
    // ===== STUDENT & PROFILE MANAGEMENT =====
    getStudentProfile() {
      return load(storeKey.studentProfile, null);
    },
    setStudentProfile(profile) {
      return save(storeKey.studentProfile, profile);
    },
    
    // ===== LECTURER AUTHENTICATION =====
    getLecturerCode() {
      return load(storeKey.lecturerPasscode, { hash: null });
    },
    setLecturerCode(codeHash) {
      return save(storeKey.lecturerPasscode, { hash: codeHash });
    },
    hashPasscode(passcode) {
      // Simple non-crypto hash for offline verification.
      let hash = 0;
      const text = String(passcode);
      for (let i = 0; i < text.length; i += 1) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    },
    
    // ===== EXAM ATTEMPT MANAGEMENT =====
    // Create, retrieve, update exam attempts with all responses and scores
    upsertAttempt(attempt) {
      const attempts = load(storeKey.attempts, []);
      const index = attempts.findIndex((item) => item.attemptId === attempt.attemptId);
      if (index >= 0) {
        attempts[index] = attempt;
      } else {
        attempts.push(attempt);
      }
      save(storeKey.attempts, attempts);
      return attempts;
    },
    getAttempts() {
      return load(storeKey.attempts, []);
    },
    setAttempts(attempts) {
      return save(storeKey.attempts, attempts);
    },
    getActiveAttempt() {
      return load(storeKey.activeAttempt, null);
    },
    setActiveAttempt(data) {
      return save(storeKey.activeAttempt, data);
    },
    clearActiveAttempt() {
      window.localStorage.removeItem(storeKey.activeAttempt);
    },
    
    // ===== FORM VALIDATION & ERROR DISPLAY =====
    // User-facing form error messaging
    displayError(inputEl, message) {
      this.safeAction(`displayError:${inputEl?.id ?? "unknown"}`, () => {
        const feedback = document.querySelector(`[data-error-for="${inputEl.id}"]`);
        if (feedback) {
          feedback.textContent = message;
        }
        inputEl.setAttribute("aria-invalid", "true");
        inputEl.classList.add("input-error");
      });
    },
    clearError(inputEl) {
      this.safeAction(`clearError:${inputEl?.id ?? "unknown"}`, () => {
        const feedback = document.querySelector(`[data-error-for="${inputEl.id}"]`);
        if (feedback) {
          feedback.textContent = "";
        }
        inputEl.removeAttribute("aria-invalid");
        inputEl.classList.remove("input-error");
      });
    },
  };

  // ===== PAGE INITIALIZATION =====
  // Runs when DOM is loaded: set current year, disable cheating measures, mark ready state
  document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    disableClipboardInteractions();
    document.body.classList.add("is-ready");
    
    // Browser compatibility check
    checkBrowserCompatibility();
  });

  /**
   * Check if the browser supports required modern JavaScript features.
   * Display a warning if essential features are missing.
   * @returns {void}
   */
  function checkBrowserCompatibility() {
    const unsupportedFeatures = [];

    // Check for optional chaining support
    try {
      const test = { a: { b: 1 } };
      const result = test?.a?.b;
      if (result !== 1) unsupportedFeatures.push("Optional Chaining");
    } catch (e) {
      unsupportedFeatures.push("Optional Chaining");
    }

    // Check for nullish coalescing support
    try {
      const test = null ?? "default";
      if (test !== "default") unsupportedFeatures.push("Nullish Coalescing");
    } catch (e) {
      unsupportedFeatures.push("Nullish Coalescing");
    }

    // Check for localStorage support
    try {
      if (typeof Storage === "undefined") {
        unsupportedFeatures.push("LocalStorage");
      }
    } catch (e) {
      unsupportedFeatures.push("LocalStorage");
    }

    // Display warning if any features are missing
    if (unsupportedFeatures.length > 0) {
      const message = `⚠️ Your browser may not fully support this application. Missing features: ${unsupportedFeatures.join(", ")}. Please update to a modern browser (Chrome 80+, Firefox 74+, Safari 13.4+, or Edge 80+) for the best experience.`;
      
      // Create a warning banner
      const banner = document.createElement("div");
      banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ef4444;
        color: white;
        padding: 1rem;
        text-align: center;
        z-index: 9999;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 0.9rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `;
      banner.textContent = message;
      
      // Add close button
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "✕";
      closeBtn.style.cssText = `
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        border-radius: 4px;
        font-size: 1.2rem;
      `;
      closeBtn.onclick = () => banner.remove();
      banner.appendChild(closeBtn);
      
      document.body.insertBefore(banner, document.body.firstChild);
      
      console.warn("Browser Compatibility Warning:", unsupportedFeatures);
    }
  }
})();
