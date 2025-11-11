/*
  Mock Exam Portal - student.js
  Started: January 2024 (self-taught during cybersecurity studies)
  Purpose: Student hub related UI wiring (profile, available exams, attempt history).
  Comments are verbose to make intent explicit for future readers.
*/

(() => {
  "use strict";

  const runSafely = (context, action) => window.MockExam.safeAction(context, action);
  const setSafeHTML = (target, html) => window.MockExam.setHTML(target, html);

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("student-form");
    if (!form) {
      return;
    }

    let profile = window.MockExam.getStudentProfile();
    const formFields = ["studentName", "studentId", "studentEmail"];

    formFields.forEach((field) => {
      const input = document.getElementById(field);
      if (input && profile?.[field]) {
        input.value = profile[field];
      }
    });

    const availableExams = document.getElementById("available-exams");
    const attemptHistory = document.getElementById("attempt-history");

    /**
     * Toggle the visibility of dependent sections once a profile exists.
     * @param {boolean} shouldShow
     * @returns {void}
     */
    const toggleSections = (shouldShow) => {
      if (shouldShow) {
        availableExams?.removeAttribute("hidden");
        attemptHistory?.removeAttribute("hidden");
      } else {
        availableExams?.setAttribute("hidden", "");
        attemptHistory?.setAttribute("hidden", "");
      }
    };

    toggleSections(Boolean(profile));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      runSafely("studentFormSubmit", () => {
        const data = Object.fromEntries(new FormData(form).entries());
        const trimmed = {
          studentName: data.studentName?.trim(),
          studentId: data.studentId?.trim(),
          studentEmail: data.studentEmail?.trim() || null,
        };

        let hasError = false;
        for (const field of formFields) {
          const input = document.getElementById(field);
          if (!input) {
            continue;
          }
          if (field !== "studentEmail" && !trimmed[field]) {
            window.MockExam.displayError(input, "This field is required.");
            hasError = true;
          } else if (field === "studentEmail" && trimmed[field] && !input.checkValidity()) {
            window.MockExam.displayError(input, "Enter a valid email.");
            hasError = true;
          } else {
            window.MockExam.clearError(input);
          }
        }

        if (hasError) {
          return;
        }

        window.MockExam.setStudentProfile(trimmed);
        profile = trimmed;
        window.MockExam.toast("Student profile saved. Exam dashboards unlocked.");
        toggleSections(true);
        populateAttemptHistory();
      });
    });

    const clearBtn = document.getElementById("clearProfileBtn");
    clearBtn?.addEventListener("click", () =>
      runSafely("clearStudentProfile", () => {
        window.MockExam.setStudentProfile(null);
        profile = null;
        window.MockExam.toast("Profile cleared. Stored attempts remain for lecturer review.");
        form.reset();
        toggleSections(false);
      })
    );

    /**
     * Render attempt history for the active student profile.
     * @returns {void}
     */
    function populateAttemptHistory() {
      const wrapper = document.getElementById("attemptTableWrapper");
      if (!wrapper) {
        return;
      }
      runSafely("populateAttemptHistory", () => {
        const currentProfile = window.MockExam.getStudentProfile();
        const attempts = window.MockExam
          .getAttempts()
          .filter((item) => item.student?.studentId === currentProfile?.studentId);
        if (!attempts.length) {
          setSafeHTML(wrapper, "<p>No attempts recorded for this student yet.</p>");
          return;
        }

        const rows = attempts
          .slice()
          .reverse()
          .map((attempt) => {
            const started = new Date(attempt.startedAt).toLocaleString();
            const score = `${attempt.score?.percentage ?? 0}%`;
            return `<tr>
                <td>${attempt.exam.title}</td>
                <td>${score}</td>
                <td>${attempt.score?.correct ?? 0}/${attempt.exam.totalQuestions}</td>
                <td>${started}</td>
                <td><a class="link" href="pages/results.html?attemptId=${encodeURIComponent(
                  attempt.attemptId
                )}">Review</a></td>
              </tr>`;
          })
          .join("");

        const markup = `<table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Score</th>
              <th>Correct</th>
              <th>Attempted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>`;
        setSafeHTML(wrapper, markup);
      });
    }

    populateAttemptHistory();
  });
})();
