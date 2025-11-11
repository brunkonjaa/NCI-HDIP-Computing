/*
  Mock Exam Portal - index.js
  Started: January 2024 (self-taught during cybersecurity studies)
  Purpose: page-specific initialisation for the root index page. Small, documented
  bootstrapping so maintainers immediately know where welcome messages and small UI
  behaviors live.
*/

(() => {
  "use strict";

  const { toast, constants } = window.MockExam;
  const runSafely = (context, action) => window.MockExam.safeAction(context, action);

  /**
   * Display active exam progress on the hero card if an exam is in progress.
   * @returns {void}
   */
  const displayActiveExamProgress = () => {
    runSafely("displayActiveExamProgress", () => {
      const heroCard = document.querySelector(".hero-card");
      if (!heroCard) return;

      const valueElement = document.querySelector(".hero-card__value");
      const metaElement = document.querySelector(".hero-card__meta");
      const progressBar = document.querySelector(".hero-progress");
      const labelElement = document.querySelector(".hero-card__label");

      const activeAttempt = window.MockExam.getActiveAttempt();
      
      // If no active attempt, show "no active exams" message
      if (!activeAttempt) {
        heroCard.classList.remove("active-exam");
        heroCard.style.cursor = "";
        heroCard.removeAttribute("role");
        heroCard.removeAttribute("tabindex");
        heroCard.removeAttribute("aria-label");
        heroCard.onclick = null;
        heroCard.onkeydown = null;

        if (valueElement) {
          valueElement.textContent = "0%";
        }
        if (metaElement) {
          metaElement.textContent = "No active exams at present";
        }
        if (progressBar) {
          progressBar.style.width = "0%";
        }
        if (labelElement) {
          labelElement.textContent = "EXAM STATUS";
        }
        return;
      }

      // Check if exam data is available
      if (!window.MockExamData?.getExamById) {
        console.warn("MockExamData not yet loaded");
        return;
      }

      const exam = window.MockExamData.getExamById(activeAttempt.examId);
      if (!exam) {
        console.warn("Exam data not found for", activeAttempt.examId);
        return;
      }

      const totalQuestions = activeAttempt.questionOrder?.length || exam.totalQuestions;
      const answeredCount = activeAttempt.responses?.length || 0;
      const percentage = Math.round((answeredCount / totalQuestions) * 100);
      
      // Count attempts for this exam
      const attempts = window.MockExam.getAttempts() || [];
      const examAttempts = attempts.filter((a) => 
        a.exam?.id === activeAttempt.examId && 
        a.student?.studentId === activeAttempt.student?.studentId
      );
      const attemptNumber = examAttempts.length + 1;

      // Update hero card elements
      if (labelElement) {
        labelElement.textContent = "EXAM PROGRESS";
      }

      if (valueElement) {
        valueElement.textContent = `${percentage}%`;
      }

      if (metaElement) {
        metaElement.innerHTML = `${exam.title} &mdash; Attempt ${attemptNumber} (In Progress)`;
      }

      if (progressBar) {
        progressBar.style.width = `${percentage}%`;
      }

      // Make the hero card clickable to resume exam
      heroCard.style.cursor = "pointer";
      heroCard.setAttribute("role", "button");
      heroCard.setAttribute("tabindex", "0");
      heroCard.setAttribute("aria-label", `Resume ${exam.title} - ${percentage}% complete`);
      
      const resumeExam = () => {
        window.location.href = `pages/exam.html?examId=${activeAttempt.examId}`;
      };

      // Remove old listeners by replacing the element's event handlers
      heroCard.onclick = resumeExam;
      heroCard.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          resumeExam();
        }
      };

      // Add visual indicator
      heroCard.classList.add("active-exam");
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    runSafely("indexInit", () => {
      const yearTargets = document.querySelectorAll("[data-year]");
      if (yearTargets.length) {
        const year = new Date().getFullYear();
        yearTargets.forEach((node) => (node.textContent = year));
      }

      const aboutLink = document.querySelector('a[href="#about"]');
      if (aboutLink) {
        aboutLink.addEventListener("click", (event) => {
          event.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        });
      }

      // Debug button to clear all localStorage data
      const debugClearBtn = document.getElementById("debugClearBtn");
      if (debugClearBtn) {
        debugClearBtn.addEventListener("click", () => {
          if (confirm("Clear all localStorage data? This will reset everything including student profiles and exam attempts.")) {
            localStorage.clear();
            toast("All data cleared! Refreshing page...", constants.TIME_MS.TOAST_DEFAULT);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
      }

      // Display active exam progress if available
      displayActiveExamProgress();

      const activeAttempt = window.MockExam.getActiveAttempt();
      const welcomeMessage = activeAttempt 
        ? "Welcome back! You have an exam in progress. Click the progress card to resume."
        : "Welcome to the Mock Exam Portal. Choose a hub to get started.";

      toast(welcomeMessage, constants.TIME_MS.TOAST_WELCOME);
    });
  });
})();
