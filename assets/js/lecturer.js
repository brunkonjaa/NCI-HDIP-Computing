/*
  Mock Exam Portal - lecturer.js
  Started: January 2024 (self-taught during cybersecurity studies)
  Purpose: Lecturer dashboard glue — filtering, metrics and table rendering.
  This file intentionally documents helper boundaries and failure cases to aid maintainers.
*/

(() => {
  "use strict";

  const passcodeFallback = "letmein123";

  const state = {
    unlocked: false,
    attempts: [],
  };

  const tableWrapper = () => document.getElementById("attemptLogTable");

  const { constants } = window.MockExam;
  const runSafely = (context, action) => window.MockExam.safeAction(context, action);
  const setSafeHTML = (target, html) => window.MockExam.setHTML(target, html);

  const ensurePasscode = () => {
    const stored = window.MockExam.getLecturerCode();
    if (!stored?.hash) {
      const defaultHash = window.MockExam.hashPasscode(passcodeFallback);
      window.MockExam.setLecturerCode(defaultHash);
    }
  };

  /**
   * Filter attempts based on lecturer dashboard controls.
   * @param {Array<Record<string, any>>} attempts
   * @returns {Array<Record<string, any>>}
   */
  const filterAttempts = (attempts) => {
    const result = runSafely("filterAttempts", () => {
      const filterExam = document.getElementById("filterExam");
      const filterStudent = document.getElementById("filterStudent");
      const filterFrom = document.getElementById("filterFrom");
      const filterTo = document.getElementById("filterTo");

      const examValue = filterExam?.value ?? "all";
      const studentValue = filterStudent?.value?.trim().toLowerCase() ?? "";
      const fromValue = filterFrom?.value ? new Date(filterFrom.value).getTime() : null;
      const toValue = filterTo?.value ? new Date(filterTo.value).getTime() : null;

      return attempts.filter((attempt) => {
        if (examValue !== "all" && attempt.exam.id !== examValue) {
          return false;
        }
        if (studentValue && !attempt.student.studentName?.toLowerCase().includes(studentValue)) {
          return false;
        }
        const submitted = attempt.submittedAt;
        if (fromValue && submitted < fromValue) {
          return false;
        }
        if (toValue && submitted > toValue + constants.TIME_MS.DAY) {
          return false;
        }
        return true;
      });
    });
    return Array.isArray(result) ? result : [];
  };

  /**
   * Render the attempts table based on current filters.
   * @returns {void}
   */
  const renderTable = () => {
    const wrapper = tableWrapper();
    if (!wrapper) {
      return;
    }
    runSafely("renderTable", () => {
      const attempts = filterAttempts(state.attempts);
      if (!attempts.length) {
        setSafeHTML(wrapper, '<p>No attempts match the current filters.</p>');
        return;
      }
      const rows = attempts
        .map((attempt) => {
          return `<tr>
            <td>${attempt.student.studentName}</td>
            <td>${attempt.student.studentId}</td>
            <td>${attempt.exam.title}</td>
            <td>${attempt.score.percentage}%</td>
            <td>${attempt.score.correct}/${attempt.exam.totalQuestions}</td>
            <td>${new Date(attempt.submittedAt).toLocaleString()}</td>
            <td><a class="link" href="pages/results.html?attemptId=${encodeURIComponent(attempt.attemptId)}">Review</a></td>
          </tr>`;
        })
        .join("");
      const markup = `<table>
        <thead>
          <tr>
            <th>Student</th>
            <th>ID</th>
            <th>Exam</th>
            <th>Score</th>
            <th>Correct</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
      setSafeHTML(wrapper, markup);
    });
  };

  /**
   * Update summary metrics for the dashboard cards.
   * @returns {void}
   */
  const computeMetrics = () => {
    runSafely("computeMetrics", () => {
      const attempts = filterAttempts(state.attempts);
      const totalAttempts = attempts.length;
      const totalNode = document.querySelector("[data-total-attempts]");
      if (totalNode) {
        totalNode.textContent = String(totalAttempts);
      }

      const averageNode = document.querySelector("[data-average-score]");
      const medianNode = document.querySelector("[data-median-score]");
      const onTrackNode = document.querySelector("[data-on-track-count]");
      const distributionNode = document.getElementById("scoreDistribution");
      const masteryNode = document.getElementById("topicMastery");

      if (!totalAttempts) {
        if (averageNode) averageNode.textContent = "0%";
        if (medianNode) medianNode.textContent = "0%";
        if (onTrackNode) onTrackNode.textContent = "0";
        if (distributionNode) setSafeHTML(distributionNode, "<p>No attempts yet.</p>");
        if (masteryNode) setSafeHTML(masteryNode, "<p>No attempts yet.</p>");
        return;
      }

      const scores = attempts.map((attempt) => attempt.score.percentage).sort((a, b) => a - b);
      const average = Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
      const median =
        scores.length % 2 === 0
          ? Math.round((scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2)
          : scores[Math.floor(scores.length / 2)];

      if (averageNode) averageNode.textContent = `${average}%`;
      if (medianNode) medianNode.textContent = `${median}%`;
      if (onTrackNode) {
        const onTrack = attempts.filter((attempt) => attempt.score.percentage >= attempt.exam.passMark).length;
        onTrackNode.textContent = String(onTrack);
      }

      renderDistribution(attempts);
      renderTopicMastery(attempts);
    });
  };

  /**
   * Render a visual distribution of scores.
   * @param {Array<Record<string, any>>} attempts
   * @returns {void}
   */
  const renderDistribution = (attempts) => {
    runSafely("renderDistribution", () => {
      const wrapper = document.getElementById("scoreDistribution");
      if (!wrapper) {
        return;
      }
      const buckets = {
        "<50": 0,
        "50-59": 0,
        "60-69": 0,
        "70-79": 0,
        "80-89": 0,
        "90-100": 0,
      };
      attempts.forEach((attempt) => {
        const score = attempt.score.percentage;
        if (score < 50) buckets["<50"] += 1;
        else if (score < 60) buckets["50-59"] += 1;
        else if (score < 70) buckets["60-69"] += 1;
        else if (score < 80) buckets["70-79"] += 1;
        else if (score < 90) buckets["80-89"] += 1;
        else buckets["90-100"] += 1;
      });

      const distribution = Object.entries(buckets)
        .map(
          ([range, count]) => `
          <div class="distribution-row">
            <span>${range}%</span>
            <div class="distribution-bar">
              <span style="width:${(count / attempts.length) * constants.PERCENT_MAX}%;"></span>
            </div>
            <span>${count}</span>
          </div>
        `
        )
        .join("");

      setSafeHTML(wrapper, distribution);
    });
  };

  /**
   * Render topic mastery breakdown across attempts.
   * @param {Array<Record<string, any>>} attempts
   * @returns {void}
   */
  const renderTopicMastery = (attempts) => {
    runSafely("renderTopicMastery", () => {
      const wrapper = document.getElementById("topicMastery");
      if (!wrapper) {
        return;
      }
      const totals = {};
      attempts.forEach((attempt) => {
        attempt.topicBreakdown.forEach((topic) => {
          totals[topic.topic] = totals[topic.topic] || { correct: 0, total: 0 };
          totals[topic.topic].correct += topic.correct;
          totals[topic.topic].total += topic.total;
        });
      });

      const content = Object.entries(totals)
        .map(([topic, value]) => {
          const percentage = Math.round((value.correct / value.total) * constants.PERCENT_MAX);
          return `
          <div class="topic-row">
            <div>
              <h3>${topic}</h3>
              <p>${value.correct} of ${value.total} correct (${percentage}%)</p>
            </div>
            <div class="topic-meter">
              <div class="topic-meter__track">
                <div class="topic-meter__fill" style="width:${percentage}%;"></div>
              </div>
              <span>${percentage}%</span>
            </div>
          </div>
        `;
        })
        .join("");
      setSafeHTML(wrapper, content);
    });
  };

  /**
   * Populate the exam filter select with available exams.
   * @returns {void}
   */
  const populateExamFilter = () => {
    const select = document.getElementById("filterExam");
    if (!select) {
      return;
    }
    runSafely("populateExamFilter", () => {
      const exams = window.MockExamData.exams;
      const options =
        '<option value="all">All exams</option>' +
        Object.values(exams)
          .map((exam) => `<option value="${exam.id}">${exam.title}</option>`)
          .join("");
      setSafeHTML(select, options);
    });
  };

  /**
   * Refresh attempts from persistent storage.
   * @returns {void}
   */
  const loadAttempts = () => {
    state.attempts = window.MockExam.getAttempts();
    renderTable();
    computeMetrics();
  };

  /**
   * Export filtered attempts to a CSV file.
   * @returns {void}
   */
  const exportCsv = () => {
    runSafely("exportCsv", () => {
      const attempts = filterAttempts(state.attempts);
      if (!attempts.length) {
        window.MockExam.toast("No attempts to export with current filters.");
        return;
      }
      const header = ["Student Name", "Student ID", "Exam", "Score %", "Correct", "Incorrect", "Submitted"];
      const rows = attempts.map((attempt) => [
        attempt.student.studentName,
        attempt.student.studentId,
        attempt.exam.title,
        attempt.score.percentage,
        attempt.score.correct,
        attempt.score.incorrect,
        new Date(attempt.submittedAt).toISOString(),
      ]);
      const csv = [header, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\r\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mock-exam-attempts.csv";
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  /**
   * Clear active exam sessions without affecting completed attempts.
   * @returns {void}
   */
  const clearActiveSessions = () => {
    runSafely("clearActiveSessions", () => {
      const activeAttempt = window.MockExam.getActiveAttempt();
      if (!activeAttempt) {
        window.MockExam.toast("No active exam sessions found.");
        return;
      }

      const confirmed = window.confirm(
        "Clear active exam sessions? This will cancel any in-progress exams but will not affect completed attempts."
      );
      if (!confirmed) return;

      window.MockExam.clearActiveAttempt();
      window.MockExam.toast("Active exam sessions cleared.");
    });
  };

  /**
   * Archive attempts to a JSON file and clear them from storage.
   * @returns {void}
   */
  const archiveAttempts = () => {
    runSafely("archiveAttempts", () => {
      const confirmed = window.confirm(
        "Archive and purge all data? This will:\n• Export all attempts to a JSON file\n• Clear all completed attempts\n• Cancel active exam sessions\n\nContinue?"
      );
      if (!confirmed) return;

      const archived = window.MockExam.getAttempts();
      if (!archived.length) {
        window.MockExam.toast("No attempts stored.");
        return;
      }

      const blob = new Blob([JSON.stringify(archived, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mock-exam-archive-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      window.MockExam.setAttempts([]);
      window.MockExam.clearActiveAttempt();
      state.attempts = [];
      renderTable();
      computeMetrics();
      window.MockExam.toast("Archive created. All attempts and active sessions cleared.");
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    ensurePasscode();
    populateExamFilter();

    const form = document.getElementById("lecturerForm");
    const dashboard = document.getElementById("dashboardContent");

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("lecturerCode");
      if (!input) return;
      const value = input.value;
      if (!value) {
        window.MockExam.displayError(input, "Enter the passphrase.");
        return;
      }
      const stored = window.MockExam.getLecturerCode();
      if (stored?.hash === window.MockExam.hashPasscode(value)) {
        window.MockExam.clearError(input);
        state.unlocked = true;
        form.setAttribute("hidden", "");
        dashboard.removeAttribute("hidden");
        loadAttempts();
        window.MockExam.toast("Dashboard unlocked.");
      } else {
        window.MockExam.displayError(input, "Incorrect passphrase.");
      }
    });

    document.getElementById("resetLecturerCodeBtn")?.addEventListener("click", () => {
      const newCode = window.prompt(
        "Enter a new lecturer passphrase (minimum 6 characters).",
        passcodeFallback
      );
      if (!newCode || newCode.length < 6) {
        window.MockExam.toast("Passphrase not updated.");
        return;
      }
      window.MockExam.setLecturerCode(window.MockExam.hashPasscode(newCode));
      window.MockExam.toast("Lecturer passphrase updated.");
    });

    ["filterExam", "filterStudent", "filterFrom", "filterTo"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", () => {
        renderTable();
        computeMetrics();
      });
    });

    document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
      ["filterExam", "filterStudent", "filterFrom", "filterTo"].forEach((id) => {
        const field = document.getElementById(id);
        if (!field) return;
        if (field.tagName === "SELECT") {
          field.selectedIndex = 0;
        } else {
          field.value = "";
        }
      });
      renderTable();
      computeMetrics();
    });

    document.getElementById("exportCsvBtn")?.addEventListener("click", exportCsv);
    document.getElementById("clearActiveSessionBtn")?.addEventListener("click", clearActiveSessions);
    document.getElementById("purgeAttemptsBtn")?.addEventListener("click", archiveAttempts);
  });
})();
