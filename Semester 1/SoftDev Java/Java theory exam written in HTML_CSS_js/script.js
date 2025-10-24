// EXAM
const DEFAULT_QUESTIONS = [
  {
question: "Which of these are valid Java primitive types?",
answers: ["boolean", "double", "String", "char"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "What is the correct signature of the entry point in a standard Java application?",
answers: ["public static int main(String[] args)", "public static void main(String[] args)", "public void main(String args)", "static public void main()"],
correct: [1],
type: "single"
},
{
question: "Which access modifiers exist in Java?",
answers: ["default (package-private)", "private", "protected", "undefined"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which keyword prevents a variable from being reassigned?",
answers: ["final", "immutable", "readonly", "static"],
correct: [0],
type: "single"
},
{
question: "Which of these are reference types in Java?",
answers: ["Array", "Class", "Interface", "int"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which operator compares object references (not contents)?",
answers: ["==", "equals()", "equalsIgnoreCase()", "hashCode()"],
correct: [0],
type: "single"
},
{
question: "Which methods are String instance methods?",
answers: ["charAt()", "equals()", "length()", "parseInt()"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which class method converts a String to an int?",
answers: ["Integer.parseInt()", "Integer.valueOf()", "Math.toInt()", "String.toInt()"],
correct: [0, 1],
type: "multiple"
},
{
question: "Which of these loops are valid in Java?",
answers: ["do-while", "foreach (enhanced for)", "repeat-until", "while"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which statement is used to choose among multiple constant values?",
answers: ["break", "case", "switch", "throw"],
correct: [2],
type: "single"
},
{
question: "Which keywords relate to inheritance and overriding?",
answers: ["extends", "final", "implements", "override"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which of these declares a class in Java?",
answers: ["class", "define", "struct", "type"],
correct: [0],
type: "single"
},
{
question: "Which statements about constructors are true?",
answers: ["A constructor has no return type", "A constructor name matches the class name", "Constructors can be overloaded", "Constructors must be private"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which keywords are used with interfaces?",
answers: ["implements", "instanceof", "interface", "using"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which collection grows dynamically and preserves order?",
answers: ["Array", "ArrayList", "HashMap", "LinkedList"],
correct: [1, 3],
type: "multiple"
},
{
question: "Which package is imported by default?",
answers: ["java.io", "java.lang", "java.util", "javax.swing"],
correct: [1],
type: "single"
},
{
question: "Which exceptions are checked exceptions (must be handled or declared)?",
answers: ["Exception", "IOException", "NullPointerException", "RuntimeException"],
correct: [0, 1],
type: "multiple"
},
{
question: "Which blocks can follow a try block?",
answers: ["catch", "finally", "rescue", "then"],
correct: [0, 1],
type: "multiple"
},
{
question: "Which of these creates an array of 10 ints?",
answers: ["int[] a = new int[10];", "int a = new int[10];", "int a[10];", "int[10] a;"],
correct: [0],
type: "single"
},
{
question: "Which statements about arrays are true?",
answers: ["Arrays are fixed-size once created", "Arrays can store mixed types", "Arrays have a length field", "Arrays index starts at 1"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which String comparison checks content equality?",
answers: ["==", "equals()", "equalsIgnoreCase()", "matches()"],
correct: [1, 2],
type: "multiple"
},
{
question: "Which keyword allows a subclass to call its superclass constructor?",
answers: ["base", "extends", "super", "this"],
correct: [2],
type: "single"
},
{
question: "Which identifiers are valid Java variable names?",
answers: ["_count", "2ndValue", "maxValue", "total-sum"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which data types are suitable for decimal numbers?",
answers: ["BigDecimal", "double", "float", "long"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which casts are widening conversions (safe without explicit cast)?",
answers: ["byte -> int", "float -> double", "int -> long", "long -> int"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which keywords relate to polymorphism?",
answers: ["abstract", "final", "interface", "virtual"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which statements about the 'static' keyword are true?",
answers: ["A static method can be called without an instance", "A static variable is shared across all instances", "Static methods can access instance fields directly", "Static blocks can run when the class loads"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which of these are valid String literals?",
answers: ["\"Hello\"", "\"A\"", "Renew", "\"true\""],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which statements about '+=' with ints are correct?",
answers: ["It adds and assigns in one step", "It is equivalent to x = x + value", "It concatenates Strings only", "It can be used with -=, =, /= analogs"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which classes can display input dialogs in basic desktop Java?",
answers: ["JOptionPane", "Scanner", "System", "ViewPane"],
correct: [0],
type: "single"
},
{
question: "Which statements about Scanner are true?",
answers: ["It can read from System.in", "It requires java.util import", "nextInt() can throw InputMismatchException", "It lives in java.lang"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which control statements can exit a loop early?",
answers: ["break", "continue", "exit", "return"],
correct: [0, 3],
type: "multiple"
},
{
question: "Which keywords are used to handle exceptions?",
answers: ["catch", "finally", "throw", "with"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which method prints a line to standard output?",
answers: ["System.err.println()", "System.out.println()", "System.printer.println()", "println()"],
correct: [1],
type: "single"
},
{
question: "Which are valid boolean literals?",
answers: ["FALSE", "TRUE", "false", "true"],
correct: [2, 3],
type: "multiple"
},
{
question: "Which arithmetic operators exist in Java?",
answers: ["%", "*", "**", "/"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which statements about method overloading are true?",
answers: ["Different parameter lists", "Different return types only is enough", "Same method name", "Same parameter list with different variable names is enough"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which statements about 'this' are true?",
answers: ["It refers to the current instance", "It can call another constructor in the same class", "It can replace 'super' in all cases", "It is allowed in static methods"],
correct: [0, 1],
type: "multiple"
},
{
question: "Which statements about 'final' classes or methods are true?",
answers: ["A final class cannot be extended", "A final method cannot be overridden", "final prevents method overloading", "final variables must be assigned exactly once"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which lines would cause a compile-time error?",
answers: ["char c = 'AB';", "char c = 'A';", "int n = 1.5;", "long l = 5L;"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which are valid switch labels (Java 8 style)?",
answers: ["case 1:", "case 'A':", "case jar:", "default:"],
correct: [0, 1, 3,],
type: "multiple"
},
{
question: "Which statements about equals/hashCode are true?",
answers: ["If equals is overridden, hashCode should be too", "Objects with equal() true should have same hashCode", "hashCode uniqueness is guaranteed", "equals default compares references"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which declarations define an interface?",
answers: ["abstract interface Shape {}", "class Shape implements Interface {}", "interface Shape {}", "struct Shape {}"],
correct: [0, 2],
type: "multiple"
},
{
question: "Which file extensions are associated with Java compilation and bytecode?",
answers: [".class", ".java", ".jar", ".jre"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which commands compile and run a simple Java program from terminal?",
answers: ["java MyApp", "javac MyApp.java", "javadoc MyApp.java", "java MyApp.class"],
correct: [0, 1],
type: "multiple"
},
{
question: "Which are Object class methods?",
answers: ["clone()", "equals()", "notify()", "size()"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which statements about encapsulation are true?",
answers: ["Fields are kept private", "Getters/setters control access", "Public fields maximize encapsulation", "Encapsulation hides implementation details"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which keywords can define an abstract class member?",
answers: ["abstract", "default", "native", "synchronized"],
correct: [0],
type: "single"
},
{
question: "Which features are unique to enums?",
answers: ["They define a fixed set of constants", "They can have fields and methods", "They can be used in switch", "They cannot implement interfaces"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which choices correctly declare a 2D int array?",
answers: ["int[][] m;", "int[] m[];", "int m[][];", "int[2][3] m;"],
correct: [0, 1, 2],
type: "multiple"
},
{
question: "Which statements about for-each (enhanced for) are true?",
answers: ["Works with arrays", "Works with Iterable collections", "Allows modifying the underlying collection size safely", "Simplifies iteration without index"],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which comparison operators are valid in Java?",
answers: ["!=", "<=", "===", ">="],
correct: [0, 1, 3],
type: "multiple"
},
{
question: "Which Swing class can show a message dialog?",
answers: ["JDialog", "JFrame", "JOptionPane", "JPanel"],
correct: [2],
type: "single"
},
{
question: "Which statements about package declarations are true?",
answers: ["package must be the first non-comment line", "package name should match folder structure", "A file can declare multiple packages", "Classes without package belong to default package"],
correct: [0, 1, 3],
type: "multiple"
}
];

// Allow external override: if exam page defines window.EXAM_QUESTIONS, use it
const questions = Array.isArray(window.EXAM_QUESTIONS) ? window.EXAM_QUESTIONS : DEFAULT_QUESTIONS;

// DOM
const questionContainer = document.getElementById("question-container");
const progressContainer = document.getElementById("progress-container");
const resultContainer = document.getElementById("results");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

// STATE OF AFFAIRS
let currentQuestionIndex = 0;
let score = 0;
const answered = Array(questions.length).fill(false);
const questionScores = Array(questions.length).fill(false);
const userChoices = Array(questions.length).fill(null); // STORES ARRAY OF SELECTED INDICES PER QUESTION

// UTILITIES AND STUFF
const arraysEqual = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

function renderProgress() {
  progressContainer.innerHTML = "";
  questions.forEach((_, idx) => {
    const div = document.createElement("div");
    div.className =
      "progress-square " +
      (answered[idx] ? (questionScores[idx] ? "correct" : "incorrect") : "unanswered");
    div.textContent = idx + 1;
    div.title = `Go to question ${idx + 1}`;
    div.addEventListener("click", () => {
      currentQuestionIndex = idx;
      loadQuestion();
    });
    progressContainer.appendChild(div);
  });
}

function setNavButtons() {
  prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display =
    currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";

  // ONLY ALLOW "NEXT" IF THIS QUESTION IS ANSWERED - VERY IMPORTANT
  nextBtn.disabled = !answered[currentQuestionIndex];
}

// APPLY VISUALS TO CURRENT DOM BASED ON SELECTIONS
function applyGradingStyles(q, inputs, selections) {
  inputs.forEach((inp) => {
    const idx = parseInt(inp.value, 10);
    const label = inp.parentElement;

    // LOCK INPUTS & REFLECT FINAL SELECTION
    inp.disabled = true;
    const chosen = selections.includes(idx);
    const isCorrect = q.correct.includes(idx);
    inp.checked = chosen;

    // RESET STYLES
    label.style.fontWeight = "normal";
    label.style.textDecoration = "none";
    label.style.color = "";

    // REMOVE ANY PRIOR MARK
    const old = label.querySelector(".graded-mark");
    if (old) old.remove();

    // ALWAYS SHOW A CHECK FOR CORRECT ANSWERS
    if (isCorrect) {
      const mark = document.createElement("span");
      mark.className = "graded-mark";
      mark.style.fontSize = "20px";
      mark.style.marginLeft = "6px";
      mark.textContent = '\u2714';
      label.appendChild(mark);

      // CHOSEN CORRECT VS MISSED CORRECT - UNDERLINE TO DIFFERENTIATE
      label.style.fontWeight = "700";
      label.style.color = "#000";
      if (!chosen) {
        label.style.textDecoration = "underline";
      }
    }

// CHOSEN WRONG - STRIKE OUT
if (!isCorrect && chosen) {
  label.style.fontWeight = "700";
  label.style.color = "lightcoral";
  label.style.textDecoration = "line-through";
}

  });
}



function gradeAndLock(selections) {
  const qIdx = currentQuestionIndex;
  const q = questions[qIdx];

  // SORT BOTH FOR COMPARISON
  const normalized = selections.slice().sort((a, b) => a - b);
  const correct = q.correct.slice().sort((a, b) => a - b);

  answered[qIdx] = true;
  userChoices[qIdx] = normalized;

  const isCorrect = arraysEqual(normalized, correct);
  questionScores[qIdx] = isCorrect;
  if (isCorrect) score++;

  // APPLY VISUALS ON CURRENT DOM
  const inputs = document.querySelectorAll(`input[name="q${qIdx}"]`);
  applyGradingStyles(q, inputs, normalized);

  renderProgress();
  setNavButtons();
}

// LOAD QUESTION
function loadQuestion() {
  const q = questions[currentQuestionIndex];

  questionContainer.innerHTML = `
    <h3>Q${currentQuestionIndex + 1}: ${q.question}</h3>
    <p>Select ${q.correct.length} answer${q.correct.length > 1 ? "s" : ""}</p>
    ${q.answers
      .map((ans, i) => {
        const inputType = q.type === "single" ? "radio" : "checkbox";
        return `
          <label>
            <input type="${inputType}" name="q${currentQuestionIndex}" value="${i}">
            ${ans}
          </label><br>
        `;
      })
      .join("")}
  `;

  const inputs = Array.from(
    document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`)
  );
  const maxSelections = q.correct.length;

  // IF IT'S ALREADY ANSWERED, THEN RE-APPLY GRADING VISUALS AND LOCK
  if (answered[currentQuestionIndex] && Array.isArray(userChoices[currentQuestionIndex])) {
    applyGradingStyles(q, inputs, userChoices[currentQuestionIndex]);
  } else {
    // OTHERWISE SET UP SELECTION LIMITING + AUTO GRADE
    inputs.forEach((inp) => {
      inp.addEventListener("change", () => {
        if (q.type === "single") {
          const chosen = [parseInt(inp.value, 10)];
          gradeAndLock(chosen);
          return;
        }

        const chosen = inputs.filter(i => i.checked).map(i => parseInt(i.value, 10));

        // PREVENT OVER-SELECTING
        if (chosen.length > maxSelections) {
          inp.checked = false;
          return;
        }

        if (chosen.length === maxSelections) {
          gradeAndLock(chosen);
        }
      });
    });
  }

  renderProgress();
  setNavButtons();
}

// SUBMIT EXAM AND SAY A PRAYER
function submitExam() {
  // NO AUTO-GRADING OF UNANSWERED ON SUBMIT; IT SUBMITS WHAT IS GRADED
  questionContainer.classList.add("hidden");
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";

  const percentage = ((score / questions.length) * 100).toFixed(1);
  resultContainer.innerHTML = `
    <h2>Exam Finished</h2>
    <p>Your score: ${score} / ${questions.length}</p>
    <p>Percentage: ${percentage}%</p>
    <button onclick="restartExam()">Restart Exam</button>
  `;
  resultContainer.classList.remove("hidden");
  renderProgress();
}

// RESTART EXAM
function restartExam() {
  currentQuestionIndex = 0;
  score = 0;
  for (let i = 0; i < questions.length; i++) {
    answered[i] = false;
    questionScores[i] = false;
    userChoices[i] = null;
  }
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  submitBtn.style.display = "inline-block";
  loadQuestion();
}

// THEME TOGGLE
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// NAVIGATION
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  // ONLY ALLOW MOVING FORWARD IF THIS QUESTION IS ANSWERED
  if (!answered[currentQuestionIndex]) return;
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

submitBtn.addEventListener("click", submitExam);

// START
loadQuestion();






