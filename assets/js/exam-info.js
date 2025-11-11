/*
  Mock Exam Portal - exam-info.js
  Started: January 2024 (self-taught during cybersecurity studies)
  Purpose: Exam instruction pages initialisation and start-exam routing. Simple but
  documented so a new contributor knows where routing decisions happen.
*/

(() => {
  "use strict";

  const { constants } = window.MockExam;
  const runSafely = (context, action) => window.MockExam.safeAction(context, action);
  const setSafeHTML = (target, html) => window.MockExam.setHTML(target, html);

  document.addEventListener("DOMContentLoaded", () => {
    runSafely("examInfoInit", () => {
      const examId = document.body.dataset.examId;
      const exam = window.MockExamData.getExamById(examId);
      const descriptionNode = document.querySelector("[data-exam-description]");

      if (!exam) {
        if (descriptionNode) {
          descriptionNode.textContent = "Exam data not found.";
        }
        document.getElementById("startExamBtn")?.setAttribute("hidden", "");
        return;
      }

      if (descriptionNode) {
        descriptionNode.textContent = exam.description;
      }

      const metaList = document.querySelector("[data-exam-meta]");
      if (metaList) {
        const secondsPerMinute = constants.TIME_MS.MINUTE / constants.TIME_MS.SECOND;
        const metaMarkup = `
          <li><strong>Total Questions:</strong><br />${exam.totalQuestions}</li>
          <li><strong>Allowed Time:</strong><br />${Math.round(exam.durationSeconds / secondsPerMinute)} minutes</li>
          <li><strong>Pass Mark:</strong><br />${exam.passMark}%</li>
          <li><strong>Version:</strong><br />${exam.version}</li>
        `;
        setSafeHTML(metaList, metaMarkup);
      }

      const topicList = document.querySelector("[data-topic-list]");
      if (topicList) {
        const listMarkup = exam.topics.map((topic) => `<li>${topic}</li>`).join("");
        setSafeHTML(topicList, listMarkup);
      }

      const startBtn = document.getElementById("startExamBtn");
      startBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        runSafely("startExamClick", () => {
          const profile = window.MockExam.getStudentProfile();
          if (!profile) {
            window.MockExam.toast("Save your student profile before starting an exam.");
            window.location.href = "../pages/student.html";
            return;
          }

          const active = window.MockExam.getActiveAttempt();
          if (active && active.examId !== exam.id) {
            const confirmSwitch = window.confirm(
              "You have an unfinished attempt in another exam. Starting a new attempt will archive that draft. Continue?"
            );
            if (!confirmSwitch) {
              return;
            }
          }

          const params = new URLSearchParams({ examId: exam.id });
          window.location.href = `../pages/exam.html?${params.toString()}`;
        });
      });
    });
  });
})();
