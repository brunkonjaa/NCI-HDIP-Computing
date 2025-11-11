/*
  Mock Exam Portal - data.js
  
  PURPOSE:
    Central registry of exam metadata (titles, durations, topics, questions).
    Bridges question bank data (loaded from separate question files) with exam definitions.
    Publishes consistent exam structure to other scripts via window.MockExamData.
  
  KEY RESPONSIBILITIES:
    1. Define exam metadata (duration, pass mark, topics)
    2. Link exam definitions to question bank data
    3. Calculate dynamic totals (question count from actual questions array)
    4. Provide stable public API for accessing exam by ID
  
  DATA STRUCTURE:
    Each exam object contains:
      - id: Unique exam identifier (html, css, java)
      - title: Display name
      - description: Purpose and scope
      - totalQuestions: Count (dynamic from question bank)
      - durationSeconds: Time limit in seconds
      - passMark: Minimum percentage to pass (70%)
      - topics: Subject categories for performance breakdown
      - version: Schema version for compatibility
      - questions: Array of question objects (references question bank)
  
  EXTERNAL DEPENDENCIES:
    - window.MockExamQuestionBank (populated by html-questions.js, css-questions.js, java-questions.js)
    - Expects bank.html, bank.css, bank.java arrays to exist
  
  NOTE:
    Question data is COPIED (slice) not referenced, so modifications don't affect source.
*/

(function registerExamData() {
  "use strict";

  // ===== CONSTANTS =====
  // Configuration values for exam definitions
  const MINUTES_TO_SECONDS = 60;
  const DEFAULT_TOTAL_QUESTIONS = 80;
  const DEFAULT_PASS_MARK = 70;
  const HTML_AND_CSS_DURATION_MINUTES = 90;
  const JAVA_DURATION_MINUTES = 110;

  // ===== QUESTION BANK INITIALIZATION =====
  // Ensures question bank exists and references it for exam definitions
  window.MockExamQuestionBank = window.MockExamQuestionBank || {};
  const bank = window.MockExamQuestionBank;
  const baseDuration = HTML_AND_CSS_DURATION_MINUTES * MINUTES_TO_SECONDS;

  // ===== EXAM DEFINITIONS =====
  // Exam metadata and configuration for each subject area
  // Questions are sourced dynamically from the question bank
  
  const exams = {
    // HTML Exam: Semantic markup, accessibility, forms, APIs
    html: {
      id: "html",
      title: "HTML Mock Exam",
      description:
        "Assess your mastery of semantic HTML5, accessibility, multimedia, forms, APIs, and real-world markup scenarios.",
      totalQuestions: (bank.html ?? []).length || DEFAULT_TOTAL_QUESTIONS,
      durationSeconds: baseDuration,
      passMark: DEFAULT_PASS_MARK,
      topics: [
        "Semantic Structure",
        "Accessibility",
        "Forms & Validation",
        "Media & Graphics",
        "HTML APIs",
        "Performance & SEO",
      ],
      version: "1.0.0",
      questions: (bank.html ?? []).slice(),
    },
    // CSS Exam: Layout, responsive design, animations, modern CSS
    css: {
      id: "css",
      title: "CSS Mock Exam",
      description:
        "Evaluate layout proficiency, responsive design, animations, architecture patterns, and modern tooling in CSS.",
      totalQuestions: (bank.css ?? []).length || DEFAULT_TOTAL_QUESTIONS,
      durationSeconds: baseDuration,
      passMark: DEFAULT_PASS_MARK,
      topics: [
        "Selectors & Specificity",
        "Layout Systems",
        "Responsive Design",
        "Typography & Graphics",
        "Animations & Transitions",
        "Modern CSS Features",
      ],
      version: "1.0.0",
      questions: (bank.css ?? []).slice(),
    },
    // Java Exam: OOP, collections, streams, error handling, concurrency
    java: {
      id: "java",
      title: "Java Mock Exam",
      description:
        "Test core Java programming concepts including OOP, collections, streams, error handling, and concurrency basics.",
      totalQuestions: (bank.java ?? []).length || DEFAULT_TOTAL_QUESTIONS,
      durationSeconds: JAVA_DURATION_MINUTES * MINUTES_TO_SECONDS,
      passMark: DEFAULT_PASS_MARK,
      topics: [
        "Java Basics",
        "Object-Oriented Principles",
        "Collections & Generics",
        "Streams & Functional",
        "Error Handling",
        "Concurrency Essentials",
      ],
      version: "1.0.0",
      questions: (bank.java ?? []).slice(),
    },
  };

  // ===== PUBLIC API - Exposed via window.MockExamData =====
  // Provides stable interface for accessing exam metadata
  
  window.MockExamData = {
    exams,
    /**
     * Retrieve exam definition by ID.
     * @param {string} id - Exam ID (html, css, or java)
     * @returns {Object|null} - Exam object or null if not found
     */
    getExamById(id) {
      return exams[id] ?? null;
    },
  };
})();
