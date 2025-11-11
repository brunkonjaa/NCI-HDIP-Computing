/*
  Mock Exam Portal - exam-runner.js
  
  PURPOSE:
    Core exam runtime engine handling question rendering, timing, answer tracking,
    and submission workflow. Manages exam state, question navigation, flagging,
    and submission review.
  
  KEY RESPONSIBILITIES:
    1. Load exam data and restore saved attempts (resume from interruption)
    2. Shuffle questions and randomize answer option order
    3. Render current question with answer options
    4. Track student responses and flagged questions
    5. Countdown timer with auto-submit on expiry
    6. Question navigation (next, previous, jump to question)
    7. Flag/unflag questions for review
    8. Submission workflow (review modal, calculate score, persist attempt)
    9. Generate performance breakdown by topic
  
  STATE MANAGEMENT:
    - state.questions: Ordered array of questions (possibly restored or shuffled)
    - state.responses: Map of questionId -> selected answer IDs
    - state.flagged: Set of flagged question IDs
    - state.currentIndex: Zero-based position in question array
    - state.timerId: Countdown timer interval ID
    - state.submitted: Flag preventing re-submission
    - state.optionOrders: Map to restore original option order if resumed
  
  ARCHITECTURE:
    - IIFE for scope isolation
    - Question shuffling uses Fisher-Yates algorithm
    - Auto-save to localStorage on navigation (via exam-info.js save point)
    - Submission creates attempt record with full response data
    - Results calculated server-side equivalent (client-side scoring)
  
  FLOW:
    1. Load & validate exam data
    2. Render exam shell (title, sidebar info, navigator grid)
    3. Start countdown timer
    4. Render first question
    5. Listen for: answers, flag, next/prev, navigator clicks
    6. On submit: show review modal, calculate score, save attempt, redirect
*/

(() => {
  "use strict";

  // ===== EXAM STATE =====
  // Complete runtime state for the active exam attempt
  const state = {
    exam: null,
    questions: [],
    currentIndex: 0,
    responses: new Map(),
    flagged: new Set(),
    startedAt: null,
    endsAt: null,
    timerId: null,
    student: null,
    optionOrders: new Map(),
    submitted: false,
  };

  // ===== DOM SELECTORS =====
  // Cached selectors for commonly accessed elements
  const selectors = {
    title: () => document.querySelector("[data-exam-title]"),
    sidebarExam: () => document.querySelector("[data-sidebar-exam]"),
    studentName: () => document.querySelector("[data-student-name]"),
    remaining: () => document.querySelector("[data-remaining]"),
    questionIndex: () => document.querySelector("[data-q-index]"),
    questionTitle: () => document.querySelector("[data-question-title]"),
    questionTopic: () => document.querySelector("[data-question-topic]"),
    answerForm: () => document.getElementById("answerForm"),
    flagButton: () => document.getElementById("flagQuestionBtn"),
    navigator: () => document.querySelector("[data-question-buttons]"),
    progressCount: () => document.querySelector("[data-progress-count]"),
    progressTotal: () => document.querySelector("[data-progress-total]"),
    toast: () => window.MockExam.toast,
    modal: () => document.getElementById("reviewModal"),
    reviewSummary: () => document.getElementById("reviewSummary"),
  };

  const { constants } = window.MockExam;
  const runSafely = (context, action) => window.MockExam.safeAction(context, action);
  const setSafeHTML = (target, html) => window.MockExam.setHTML(target, html);

  // ===== QUESTION TYPES =====
  // Question category constants
  const QUESTION_TYPES = {
    SINGLE: "single",
    MULTI: "multi",
  };

  // ===== UTILITY FUNCTIONS =====
  /**
   * Create a shuffled copy of an array using Fisher-Yates algorithm.
   * Provides fair randomization without modifying the original array.
   * @template T
   * @param {T[]} array
   * @returns {T[]}
   */
  const shuffle = (array) => {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // ===== EXAM INITIALIZATION =====
  /**
   * Load exam metadata and restore saved attempt if available.
   * Validates exam data, student profile, and checks for resumable attempts.
   * If no saved attempt, shuffles questions and options for randomization.
   * @returns {void}
   */
  const loadExam = () => {
    runSafely("loadExam", () => {
      const query = window.MockExam.parseQuery();
      const examId = query.get("examId");
      if (!examId) {
        window.MockExam.toast("Missing exam ID. Redirecting to Student Hub.");
        window.location.href = "../pages/student.html";
        return;
      }

      const exam = window.MockExamData.getExamById(examId);
      if (!exam || !Array.isArray(exam.questions) || !exam.questions.length) {
        window.MockExam.toast("Exam questions unavailable. Please ensure the data is loaded.");
        window.location.href = `../pages/${examId}-exam.html`;
        return;
      }

      const student = window.MockExam.getStudentProfile();
      if (!student) {
        window.MockExam.toast("Save a student profile before attempting an exam.");
        window.location.href = "../pages/student.html";
        return;
      }

      const savedAttempt = window.MockExam.getActiveAttempt();
      const hasSavedAttempt =
        savedAttempt &&
        savedAttempt.examId === exam.id &&
        savedAttempt.student?.studentId === student.studentId;

      state.exam = exam;
      state.student = student;

      if (hasSavedAttempt) {
        const order = savedAttempt.questionOrder ?? exam.questions.map((question) => question.id);
        const optionOrders = new Map(savedAttempt.optionOrders ?? []);
        state.optionOrders = optionOrders;
        state.questions = order
          .map((questionId) => exam.questions.find((item) => item.id === questionId))
          .filter(Boolean)
          .map((question) => {
            const optionOrder = optionOrders.get(question.id);
            const options = optionOrder
              ? question.options
                  .slice()
                  .sort((a, b) => optionOrder.indexOf(a.id) - optionOrder.indexOf(b.id))
              : question.options.slice();
            return { ...question, options };
          });

        state.currentIndex = Math.min(savedAttempt.currentIndex ?? 0, Math.max(state.questions.length - 1, 0));
        state.responses = new Map(savedAttempt.responses ?? []);
        state.flagged = new Set(savedAttempt.flagged ?? []);
        state.startedAt = savedAttempt.startedAt ?? Date.now();
        state.endsAt = savedAttempt.endsAt ?? state.startedAt + exam.durationSeconds * constants.TIME_MS.SECOND;
      } else {
        const shuffledQuestions = shuffle(exam.questions);
        state.optionOrders = new Map();
        state.questions = shuffledQuestions.map((question) => {
          const shuffledOptions = shuffle(question.options);
          state.optionOrders.set(question.id, shuffledOptions.map((option) => option.id));
          return { ...question, options: shuffledOptions };
        });
        const now = Date.now();
        state.startedAt = now;
        state.endsAt = now + exam.durationSeconds * constants.TIME_MS.SECOND;
      }
    });
  };

  // ===== EXAM UI RENDERING =====
  /**
   * Render the static exam shell UI (title, sidebar, navigator grid).
   * Called once during initialization. Question content rendered separately.
   * @returns {void}
   */
  const renderExamShell = () => {
    runSafely("renderExamShell", () => {
      const examTitle = selectors.title();
      if (examTitle) {
        examTitle.textContent = state.exam.title;
      }
      const sidebarExam = selectors.sidebarExam();
      if (sidebarExam) {
        sidebarExam.textContent = state.exam.title;
      }
      const studentName = selectors.studentName();
      if (studentName) {
        studentName.textContent = state.student.studentName ?? "Student";
      }
      const total = selectors.progressTotal();
      if (total) {
        total.textContent = state.questions.length;
      }

      const navGrid = selectors.navigator();
      if (!navGrid) {
        return;
      }
      const buttonMarkup = state.questions
        .map(
          (_, idx) => `
            <button type="button" class="navigator-button" data-question="${idx + 1}">
              ${idx + 1}
            </button>
          `
        )
        .join("");
      setSafeHTML(navGrid, buttonMarkup);
    });
  };

  // ===== TIMER MANAGEMENT =====
  /**
   * Update the countdown timer display and trigger auto-submit on expiry.
   * Called every second (see startTimer). Handles time format and final submission.
   * @returns {void}
   */
  const updateTimer = () => {
    if (!state.endsAt) {
      return;
    }
    runSafely("updateTimer", () => {
      const now = Date.now();
      const remainingMs = Math.max(0, state.endsAt - now);
      const remainingSeconds = Math.ceil(remainingMs / constants.TIME_MS.SECOND);
      const remainingNode = selectors.remaining();
      if (remainingNode) {
        remainingNode.textContent = window.MockExam.formatDuration(remainingSeconds);
      }
      if (remainingSeconds <= 0) {
        window.clearInterval(state.timerId);
        runSafely("autoSubmitExam", handleSubmit);
      }
    });
  };

  /**
   * Persist the current attempt progress to storage.
   * @returns {void}
   */
  const persistActiveAttempt = () => {
    runSafely("persistActiveAttempt", () => {
      const payload = {
        examId: state.exam.id,
        student: state.student,
        currentIndex: state.currentIndex,
        responses: Array.from(state.responses.entries()),
        flagged: Array.from(state.flagged),
        startedAt: state.startedAt,
        endsAt: state.endsAt,
        questionOrder: state.questions.map((question) => question.id),
        optionOrders: Array.from(state.optionOrders.entries()),
      };
      window.MockExam.setActiveAttempt(payload);
    });
  };

  /**
   * Retrieve the question currently in view.
   * @returns {Record<string, any>}
   */
  const getCurrentQuestion = () => state.questions[state.currentIndex];

  // ===== QUESTION RENDERING =====
  /**
   * Render the current question and response options.
   * Updates question text, options, flag button state, and navigator status.
   * Restores previous answer if it exists.
   * @returns {void}
   */
  const renderQuestion = () => {
    const question = getCurrentQuestion();
    if (!question) {
      return;
    }
    runSafely("renderQuestion", () => {
      const indexNode = selectors.questionIndex();
      if (indexNode) {
        indexNode.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;
      }
      const titleNode = selectors.questionTitle();
      if (titleNode) {
        titleNode.textContent = question.prompt;
      }
      const topicNode = selectors.questionTopic();
      if (topicNode) {
        topicNode.textContent = question.topic;
      }

      const form = selectors.answerForm();
      if (!form) {
        return;
      }
      setSafeHTML(form, "");

      const selected = state.responses.get(question.id) ?? [];
      question.options.forEach((option, index) => {
        const inputId = `q${question.id}_${index}`;
        const optionNode = document.createElement("label");
        optionNode.className = "option-card";
        const input = document.createElement("input");
        input.type = question.type === QUESTION_TYPES.MULTI ? "checkbox" : "radio";
        input.name = "answer";
        input.value = option.id;
        input.id = inputId;
        if (selected.includes(option.id)) {
          input.checked = true;
        }
        input.addEventListener("change", handleAnswerChange);
        const wrapper = document.createElement("div");
        wrapper.className = "option-content";
        const optionText = document.createElement("p");
        optionText.className = "option-text";
        optionText.textContent = option.text ?? option.label ?? option.id;
        wrapper.append(optionText);
        optionNode.append(input, wrapper);
        form.append(optionNode);
      });

      const flagButton = selectors.flagButton();
      if (flagButton) {
        flagButton.textContent = state.flagged.has(question.id) ? "Unflag Question" : "Flag Question";
      }
      updateNavigatorState();
    });
  };

  /**
   * Update the navigator button states to reflect current progress.
   * @returns {void}
   */
  const updateNavigatorState = () => {
    runSafely("updateNavigatorState", () => {
      const navGrid = selectors.navigator();
      if (!navGrid) {
        return;
      }
      navGrid.querySelectorAll(".navigator-button").forEach((button) => {
        const idx = Number(button.dataset.question) - 1;
        const question = state.questions[idx];
        button.classList.toggle("current", idx === state.currentIndex);
        button.classList.toggle("answered", state.responses.has(question.id));
        button.classList.toggle("flagged", state.flagged.has(question.id));
      });

      const progressCount = selectors.progressCount();
      if (progressCount) {
        progressCount.textContent = state.responses.size;
      }
    });
  };

  /**
   * Capture selected answers for the active question.
   * @returns {void}
   */
  const handleAnswerChange = () => {
    runSafely("handleAnswerChange", () => {
      const question = getCurrentQuestion();
      if (!question) {
        return;
      }
      const form = selectors.answerForm();
      if (!form) {
        return;
      }
      const inputs = form.querySelectorAll("input[name='answer']");
      const selected = Array.from(inputs)
        .filter((input) => input.checked)
        .map((input) => input.value);

      if (selected.length) {
        state.responses.set(question.id, selected);
      } else {
        state.responses.delete(question.id);
      }

      persistActiveAttempt();
      updateNavigatorState();
    });
  };

  /**
   * Move the current question pointer forward or backward.
   * @param {number} direction
   * @returns {void}
   */
  const changeQuestion = (direction) => {
    const nextIndex = state.currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= state.questions.length) {
      return;
    }
    state.currentIndex = nextIndex;
    persistActiveAttempt();
    renderQuestion();
  };

  /**
   * Jump to an explicit question index.
   * @param {number} index
   * @returns {void}
   */
  const goToQuestion = (index) => {
    if (index < 0 || index >= state.questions.length) {
      return;
    }
    state.currentIndex = index;
    persistActiveAttempt();
    renderQuestion();
  };

  // ===== FLAGGING & ANSWER TRACKING =====
  /**
   * Toggle flag status for the current question.
   * Updates UI to show flagged state in navigator.
   * @returns {void}
   */
  const toggleFlag = () => {
    runSafely("toggleFlagAction", () => {
      const question = getCurrentQuestion();
      if (!question) {
        return;
      }
      if (state.flagged.has(question.id)) {
        state.flagged.delete(question.id);
        window.MockExam.toast("Question unflagged.");
      } else {
        state.flagged.add(question.id);
        window.MockExam.toast("Question flagged for review.");
      }
      persistActiveAttempt();
      renderQuestion();
    });
  };

  /**
   * Build the review summary displayed in the modal.
   * @returns {void}
   */
  const buildReviewSummary = () => {
    runSafely("buildReviewSummary", () => {
      const totalUnanswered = state.questions.filter((q) => !state.responses.has(q.id)).length;
      const flaggedCount = state.flagged.size;
      const list = state.questions
        .map((question, idx) => {
          const answered = state.responses.has(question.id);
          const flagged = state.flagged.has(question.id);
          return `<li>
            <button type="button" data-review-jump="${idx}">
              Question ${idx + 1} &middot; ${answered ? "Answered" : "Unanswered"}
              ${flagged ? '<span class="badge-pill">Flagged</span>' : ""}
            </button>
          </li>`;
        })
        .join("");
      const summary = selectors.reviewSummary();
      if (summary) {
        const markup = `
          <p>You have ${totalUnanswered} unanswered questions and ${flaggedCount} flagged for review.</p>
          <ul class="review-list">${list}</ul>
        `;
        setSafeHTML(summary, markup);
      }
    });
  };

  /**
   * Display the review modal with summary content.
   * @returns {void}
   */
  const openReview = () => {
    buildReviewSummary();
    runSafely("openReview", () => {
      const modal = selectors.modal();
      if (!modal) {
        return;
      }
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("show");
      modal.querySelector("[data-review-jump]")?.focus();
    });
  };

  /**
   * Hide the review modal from view.
   * @returns {void}
   */
  const closeReview = () => {
    runSafely("closeReview", () => {
      const modal = selectors.modal();
      if (modal) {
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("show");
      }
    });
  };

  /**
   * Finalise the attempt, persist results, and redirect to the summary page.
   * @param {Event} [event]
   * @returns {void}
   */
  const handleSubmit = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    closeReview();

    runSafely("handleSubmit", () => {
      const questionResults = state.questions.map((question) => {
        const selected = state.responses.get(question.id) ?? [];
        const correct = question.correctAnswers.slice().sort().join("|");
        const chosen = selected.slice().sort().join("|");
        const isCorrect = correct === chosen;
        return {
          id: question.id,
          selected,
          correctAnswers: question.correctAnswers,
          isCorrect,
          topic: question.topic,
          prompt: question.prompt,
          options: question.options,
          type: question.type,
        };
      });

      const correctCount = questionResults.filter((item) => item.isCorrect).length;
      const percentage = Math.round((correctCount / state.questions.length) * constants.PERCENT_MAX);
      const topicTotals = {};
      const topicCorrect = {};
      questionResults.forEach((result) => {
        topicTotals[result.topic] = (topicTotals[result.topic] ?? 0) + 1;
        if (result.isCorrect) {
          topicCorrect[result.topic] = (topicCorrect[result.topic] ?? 0) + 1;
        }
      });
      const topicBreakdown = Object.keys(topicTotals).map((topic) => ({
        topic,
        total: topicTotals[topic],
        correct: topicCorrect[topic] ?? 0,
        percentage: Math.round(((topicCorrect[topic] ?? 0) / topicTotals[topic]) * constants.PERCENT_MAX),
      }));

      const submittedAt = Date.now();
      const attempt = {
        attemptId: `${state.student.studentId}-${state.exam.id}-${submittedAt}`,
        exam: {
          id: state.exam.id,
          title: state.exam.title,
          totalQuestions: state.questions.length,
          passMark: state.exam.passMark,
        },
        student: state.student,
        startedAt: state.startedAt,
        submittedAt,
        score: {
          correct: correctCount,
          incorrect: state.questions.length - correctCount,
          percentage,
          passed: percentage >= state.exam.passMark,
        },
        topicBreakdown,
        durationSeconds: Math.round((submittedAt - state.startedAt) / constants.TIME_MS.SECOND),
        responses: questionResults,
      };

      window.MockExam.upsertAttempt(attempt);
      state.submitted = true;
      if (state.timerId) {
        window.clearInterval(state.timerId);
        state.timerId = null;
      }
      window.MockExam.clearActiveAttempt();
      window.location.href = `../pages/results.html?attemptId=${encodeURIComponent(attempt.attemptId)}`;
    });
  };

  /**
   * Attach UI event handlers required for the exam runner.
   * @returns {void}
   */
  const bindEvents = () => {
    const nextBtn = document.getElementById("nextQuestionBtn");
    nextBtn?.addEventListener("click", () => runSafely("nextQuestion", () => changeQuestion(1)));

    const prevBtn = document.getElementById("prevQuestionBtn");
    prevBtn?.addEventListener("click", () => runSafely("prevQuestion", () => changeQuestion(-1)));

    document.getElementById("flagQuestionBtn")?.addEventListener("click", () =>
      runSafely("toggleFlag", toggleFlag)
    );

    document.getElementById("reviewBtn")?.addEventListener("click", () => runSafely("openReviewClick", openReview));

    document.querySelectorAll("[data-close-modal]")?.forEach((button) => {
      button.addEventListener("click", () => runSafely("closeReviewClick", closeReview));
    });

    document.getElementById("submitExamBtn")?.addEventListener("click", (event) => handleSubmit(event));

    const navigator = selectors.navigator();
    navigator?.addEventListener("click", (event) => {
      const target = event.target.closest("button[data-question]");
      if (!target) {
        return;
      }
      runSafely("navigateToQuestion", () => {
        const index = Number(target.dataset.question) - 1;
        goToQuestion(index);
      });
    });

    const reviewSummary = selectors.reviewSummary();
    reviewSummary?.addEventListener("click", (event) => {
      const target = event.target.closest("button[data-review-jump]");
      if (!target) {
        return;
      }
      runSafely("reviewJump", () => {
        goToQuestion(Number(target.dataset.reviewJump));
        closeReview();
      });
    });

    document.getElementById("toggleSidebarBtn")?.addEventListener("click", () =>
      runSafely("toggleSidebar", () => {
        const sidebar = document.getElementById("sidebar");
        sidebar?.classList.toggle("is-visible");
      })
    );

    document.getElementById("toggleNavBtn")?.addEventListener("click", () =>
      runSafely("toggleNavigator", () => {
        const navigatorPanel = document.getElementById("questionNavigator");
        navigatorPanel?.toggleAttribute("hidden");
      })
    );
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadExam();
    if (!state.exam) {
      return;
    }
    renderExamShell();
    renderQuestion();
    bindEvents();
    updateTimer();
    state.timerId = window.setInterval(updateTimer, constants.TIME_MS.SECOND);
    persistActiveAttempt();

    window.addEventListener("beforeunload", (event) => {
      if (!state.submitted && state.exam && Date.now() < state.endsAt) {
        event.preventDefault();
        event.returnValue = "";
      }
    });
  });
})();
