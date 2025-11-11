/*
  Mock Exam Portal - results.js
  Started: January 2024 (self-taught during cybersecurity studies)
  
  Purpose: 
    Render and manage the exam results page. Handles loading attempt data,
    displaying score summaries, rendering answer reviews, and enabling JSON export.
  
  Key Responsibilities:
    1. Fetch attempt data from localStorage using attemptId from URL params
    2. Populate score breakdown (percentage, correct/incorrect, time taken)
    3. Render question navigator grid with visual correctness indicators
    4. Handle answer review detail view (showing prompt + user selections + correct answers)
    5. Provide JSON export functionality for record keeping
  
  Data Flow:
    - URL param (attemptId) → localStorage → attempt object
    - attempt object → renderTopicBreakdown() for performance by topic
    - attempt object → renderReviewNavigator() for question grid
    - user click on question → renderReviewDetail(index) for detailed answer view
    - export button → exportAttempt() downloads JSON
  
  Note: Uses IIFE (Immediately Invoked Function Expression) for scope isolation.
  All rendering is done safely using window.MockExam.setHTML() to prevent XSS.
*/

(() => {
  "use strict";

  const container = () => document.getElementById("resultsContainer");
  const { constants } = window.MockExam;
  const runSafely = (context, action) => window.MockExam.safeAction(context, action);
  const setSafeHTML = (target, html) => window.MockExam.setHTML(target, html);

  let reviewResponses = [];

  /**
   * Render per-topic performance information.
   * @param {Array<Record<string, any>>} breakdown
   * @returns {void}
   */
  const renderTopicBreakdown = (breakdown) => {
    const target = document.getElementById("topicBreakdown");
    if (!target) return;
    runSafely("renderTopicBreakdown", () => {
      if (!breakdown?.length) {
        setSafeHTML(target, "<p class='review-detail__muted'>No topic data recorded for this attempt.</p>");
        return;
      }
      const cards = breakdown
        .map(
          (item) => `
          <article class="topic-card">
            <header>
              <h3>${item.topic}</h3>
              <span>${item.percentage}%</span>
            </header>
            <p class="topic-card__meta">${item.correct} of ${item.total} correct</p>
            <div class="topic-card__meter">
              <span style="width: ${item.percentage}%;"></span>
            </div>
          </article>
        `
        )
        .join("");
      setSafeHTML(target, cards);
    });
  };

  /**
   * Render the review navigator grid (question number buttons).
   * Each button displays its correctness status via CSS classes.
   * Clicking a button triggers renderReviewDetail() to show answer details.
   * 
   * @param {Array<Record<string, any>>} responses - Array of user responses from attempt
   * @returns {void}
   */
  const renderReviewNavigator = (responses) => {
    const target = document.querySelector("[data-review-buttons]");
    if (!target) return;
    reviewResponses = Array.isArray(responses) ? responses : [];
    runSafely("renderReviewNavigator", () => {
      if (!reviewResponses.length) {
        setSafeHTML(target, "<p class='review-detail__muted'>No responses recorded.</p>");
        return;
      }
      const buttons = reviewResponses
        .map(
          (response, idx) => `
          <button type="button" class="navigator-button ${
            response.isCorrect ? "is-correct" : "is-incorrect"
          }" data-review-question="${idx}">
            ${idx + 1}
          </button>
        `
        )
        .join("");
      setSafeHTML(target, buttons);
    });
  };

  /**
   * Render the detail card for a selected question.
   * Shows the question prompt, user's selected answer(s), and the correct answer(s).
   * Highlights correct selections in green and incorrect in red.
   * For multi-answer questions, all options must be correct for full marks.
   * 
   * @param {number|null} index - Index of the question in reviewResponses array
   * @returns {void}
   */
  const renderReviewDetail = (index = null) => {
    const detail = document.getElementById("reviewDetail");
    if (!detail) return;
    runSafely("renderReviewDetail", () => {
      if (!reviewResponses.length) {
        setSafeHTML(detail, "<p class='review-detail__muted'>No response data recorded.</p>");
        return;
      }
      if (index === null || !reviewResponses[index]) {
        setSafeHTML(detail, "<p class='review-detail__muted'>Select a question number to view the prompt and answers.</p>");
        return;
      }
      const response = reviewResponses[index];
      const correctOptions = response.options.filter((option) => response.correctAnswers.includes(option.id));
      const selectedOptions = response.selected?.length
        ? response.options.filter((option) => response.selected.includes(option.id))
        : [];

      const correctList = correctOptions
        .map(
          (option) => `
          <li class="answer-row">
            <span class="answer-indicator correct" aria-hidden="true">✓</span>
            <p>${option.text}</p>
          </li>
        `
        )
        .join("");

      const selectionList = selectedOptions.length
        ? selectedOptions
            .map((option) => {
              const isCorrect = response.correctAnswers.includes(option.id);
              return `
              <li class="answer-row">
                <span class="answer-indicator ${isCorrect ? "correct" : "incorrect"}" aria-hidden="true">${
                isCorrect ? "✓" : "✕"
              }</span>
                <p>${option.text}</p>
              </li>
            `;
            })
            .join("")
        : `<li class="answer-row">
            <span class="answer-indicator incorrect" aria-hidden="true">✕</span>
            <p>No selection</p>
          </li>`;

      const markup = `
        <div class="review-detail__header">
          <span>Question ${index + 1}</span>
          <span class="badge-pill ${response.isCorrect ? "correct" : "incorrect"}">${
        response.isCorrect ? "Correct" : "Incorrect"
      }</span>
        </div>
        <p class="review-detail__prompt">${response.prompt}</p>
        <div class="review-detail__answers">
          <div>
            <h4>Correct answer${response.correctAnswers.length > 1 ? "s" : ""}</h4>
            <ul>${correctList}</ul>
          </div>
          <div>
            <h4>Your selection</h4>
            <ul>${selectionList}</ul>
          </div>
        </div>
      `;
      setSafeHTML(detail, markup);
    });
  };

  /**
   * Trigger a JSON export of the current attempt.
   * Creates a Blob with the attempt data, generates a download link,
   * and automatically triggers browser download.
   * Filename format: {attemptId}.json
   * 
   * @param {Record<string, any>} attempt - Complete attempt object to export
   * @returns {void}
   */
  const exportAttempt = (attempt) => {
    runSafely("exportAttempt", () => {
      const blob = new Blob([JSON.stringify(attempt, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${attempt.attemptId}.json`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  // ===== PAGE INITIALIZATION =====
  // Runs when DOM is fully loaded. Orchestrates entire results page rendering.
  document.addEventListener("DOMContentLoaded", () => {
    runSafely("resultsInit", () => {
      // 1. Extract attemptId from URL query parameters
      const params = new URLSearchParams(window.location.search);
      const attemptId = params.get("attemptId");
      const resultsContainer = container();
      
      // Safety check: attemptId is required
      if (!attemptId) {
        if (resultsContainer) {
          setSafeHTML(resultsContainer, "<p class='alert'>Attempt ID missing. Return to the Student Hub.</p>");
        }
        return;
      }

      // 2. Retrieve attempt from storage and validate existence
      const attempts = window.MockExam.getAttempts();
      const attempt = attempts.find((item) => item.attemptId === attemptId);

      if (!attempt) {
        if (resultsContainer) {
          setSafeHTML(resultsContainer, "<p class='alert danger'>Attempt not found. It may have been deleted.</p>");
        }
        return;
      }

      // 3. Populate header and summary data fields using data attributes
      const titleNode = document.querySelector("[data-exam-title]");
      if (titleNode) {
        titleNode.textContent = `${attempt.exam.title} - Results`;
      }
      const studentNode = document.querySelector("[data-student-name]");
      if (studentNode) {
        studentNode.textContent = attempt.student.studentName ?? "Unknown";
      }
      const attemptDate = document.querySelector("[data-attempt-date]");
      if (attemptDate) {
        attemptDate.textContent = new Date(attempt.submittedAt).toLocaleString();
      }
      const scoreNode = document.querySelector("[data-score]");
      if (scoreNode) {
        scoreNode.textContent = `${attempt.score.percentage}%`;
      }
      const correctNode = document.querySelector("[data-correct]");
      if (correctNode) {
        correctNode.textContent = attempt.score.correct;
      }
      const incorrectNode = document.querySelector("[data-incorrect]");
      if (incorrectNode) {
        incorrectNode.textContent = attempt.score.incorrect;
      }
      const durationNode = document.querySelector("[data-duration]");
      if (durationNode) {
        durationNode.textContent = window.MockExam.formatDuration(attempt.durationSeconds);
      }

      // 4. Render main content sections
      renderReviewNavigator(attempt.responses);
      renderReviewDetail();

      // 5. Attach event listeners
      // Handle question navigator clicks to show answer details
      const reviewGrid = document.querySelector("[data-review-buttons]");
      if (reviewGrid) {
        reviewGrid.addEventListener("click", (event) => {
          const button = event.target.closest("[data-review-question]");
          if (!button) return;
          const index = Number(button.dataset.reviewQuestion);
          // Update UI: mark this button as current
          reviewGrid.querySelectorAll("[data-review-question]").forEach((node) => {
            node.classList.toggle("current", node === button);
          });
          // Render answer details for selected question
          renderReviewDetail(index);
        });
      }

      // Handle JSON export button
      document.getElementById("exportAttemptBtn")?.addEventListener("click", () => {
        exportAttempt(attempt);
      });
    });
  });

  // ===== END RESULTS.JS =====
  // The IIFE ends here. All functions and variables remain scoped and isolated.
})();
