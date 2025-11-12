// Combined Week 8 lab + lecture challenge logic

// Rock, Paper, Scissors module
// Basic wiring for the mini game
(function initRockPaperScissors(){
  // Cache all elements used by the game UI
  const playerChoiceEl = document.getElementById('playerChoice');
  const computerChoiceEl = document.getElementById('computerChoice');
  const resultEl = document.getElementById('result');
  const playerScoreEl = document.getElementById('playerScore');
  const computerScoreEl = document.getElementById('computerScore');
  const tiesEl = document.getElementById('ties');
  const elementsExist = playerChoiceEl && computerChoiceEl && resultEl && playerScoreEl && computerScoreEl && tiesEl;

  // Exit if the expected markup is missing
  if (!elementsExist) return;

  // Track score counters in memory
  let playerScore = 0;
  let computerScore = 0;
  let ties = 0;

  // Button id to move mapping
  const bindings = [
    { id: 'rock', move: 'Rock' },
    { id: 'paper', move: 'Paper' },
    { id: 'scissors', move: 'Scissors' }
  ];

  // Attach the click handler for each move button
  bindings.forEach(({ id, move }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', () => play(move));
    }
  });

  // Hook up the reset button
  const resetButton = document.getElementById('reset');
  if (resetButton) {
    resetButton.addEventListener('click', resetScore);
  }

  // Main RPS round logic
  function play(playerChoice){
    playerChoiceEl.textContent = playerChoice;
    const choices = ['Rock','Paper','Scissors'];
    const computerChoice = choices[Math.floor(Math.random()*choices.length)];
    computerChoiceEl.textContent = computerChoice;

    if (playerChoice == computerChoice) {
      resultEl.innerHTML = '<strong>Result:</strong> Tie';
      ties++;
    } else {
      if (playerChoice == 'Rock') {
        if (computerChoice == 'Scissors') {
          resultEl.innerHTML = '<strong>Result:</strong> You win - Rock crushes Scissors';
          playerScore++;
        } else if (computerChoice == 'Paper') {
          resultEl.innerHTML = '<strong>Result:</strong> You lose - Paper covers Rock';
          computerScore++;
        }
      }

      if (playerChoice == 'Paper') {
        if (computerChoice == 'Rock') {
          resultEl.innerHTML = '<strong>Result:</strong> You win - Paper covers Rock';
          playerScore++;
        } else if (computerChoice == 'Scissors') {
          resultEl.innerHTML = '<strong>Result:</strong> You lose - Scissors cut Paper';
          computerScore++;
        }
      }

      if (playerChoice == 'Scissors') {
        if (computerChoice == 'Paper') {
          resultEl.innerHTML = '<strong>Result:</strong> You win - Scissors cut Paper';
          playerScore++;
        } else if (computerChoice == 'Rock') {
          resultEl.innerHTML = '<strong>Result:</strong> You lose - Rock crushes Scissors';
          computerScore++;
        }
      }
    }

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    tiesEl.textContent = ties;
  }

  // Reset UI and counters to the default state
  function resetScore(){
    playerScore = 0;
    computerScore = 0;
    ties = 0;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    tiesEl.textContent = ties;
    playerChoiceEl.textContent = '-';
    computerChoiceEl.textContent = '-';
    resultEl.innerHTML = '<strong>Result:</strong> -';
  }
})();

// Welcome Portal challenge
// Basic gate logic for the portal section
(function initWelcomePortal(){
  // Cache portal form controls
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const submitBtn = document.getElementById('submitBtn');
  const messageEl = document.getElementById('message');
  const resultsEl = document.getElementById('welcomeResults');
  const rpsGate = document.getElementById('rpsGate');

  // Exit early if the required markup is missing
  if (!nameInput || !ageInput || !submitBtn || !messageEl || !resultsEl || !rpsGate) return;

  // Click to validate
  submitBtn.addEventListener('click', checkAccess);

  // Allow Enter key submissions
  [nameInput, ageInput].forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        event.preventDefault();
        checkAccess();
      }
    });
  });

  // Strip non-digit characters from the age input
  ageInput.addEventListener('input', function(){
    const cleaned = this.value.replace(/[^0-9]/g,'');
    if (this.value != cleaned) {
      this.value = cleaned;
    }
  });

  // Validate the provided name and age
  function checkAccess(){
    const name = nameInput.value.trim();
    const ageRaw = ageInput.value.trim();
    const age = ageRaw == '' ? NaN : Number(ageRaw);

    if (!name) {
      setMessage("You didn't enter your name, please try again.", true);
      return;
    }

    if (ageRaw == '' || isNaN(age)) {
      setMessage("You didn't enter your age, please try again.", true);
      return;
    }

    setMessage('', false);

    const result = evaluateResult(name, age);
    renderResultCards(result);
    toggleRpsAccess(result.allowed);
  }

  // Simple helper for the inline validation message
  function setMessage(text, isError){
    messageEl.textContent = text;
    messageEl.classList.toggle('is-error', Boolean(isError));
  }

  // Decide what happens based on the name and age
  function evaluateResult(name, age){
    const trimmed = name.trim();
    const isSam = trimmed.toLowerCase() == 'sam';

    if (isSam) {
      if (age >= 18) {
        return { title: 'Barred', body: 'Sincere apologies Sam, but you are barred!', allowed: false };
      }
      return { title: 'Hey Sam', body: 'Well Sam, you are not barred yet, but will probably be once you are 18.', allowed: false };
    }

    if (age >= 18) {
      return { title: `Welcome, ${trimmed}!`, body: 'You are allowed in - the Rock, Paper, Scissors arena is now unlocked.', allowed: true };
    }

    return { title: 'Underage', body: 'You are under 18 so cartoon time and a glass of warm milk!', allowed: false };
  }

  // Render the cards that explain the decision
  function renderResultCards(result){
    const fragment = document.createDocumentFragment();

    const mainCard = document.createElement('div');
    mainCard.className = 'result-card fade-in';
    mainCard.innerHTML = `<h2>${result.title}</h2><p>${result.body}</p>`;
    fragment.appendChild(mainCard);

    if (!result.allowed) {
      const miniCard = document.createElement('div');
      miniCard.className = 'mini-card fade-in';
      miniCard.innerHTML = `
        <div>Would you like to try out the HTML/CSS/JS Software Development Mock Quiz?</div>
        <div class="quiz-actions">
          <button class="btn-primary-small" data-action="quiz-yes">Yes, show me</button>
          <button class="btn-ghost" data-action="quiz-no">Not a chance, but play REM's Losing My Religion</button>
        </div>
      `;
      fragment.appendChild(miniCard);

      const quizYes = miniCard.querySelector('[data-action="quiz-yes"]');
      const quizNo = miniCard.querySelector('[data-action="quiz-no"]');

      if (quizYes) {
        quizYes.addEventListener('click', () => {
          window.open('https://brunkonjaa.github.io/NCI-HDIP-Computing/','_blank','noopener');
        });
      }

      if (quizNo) {
        quizNo.addEventListener('click', () => {
          window.open('https://youtu.be/aFSAp-O5T-4?si=vDPyphYmES8AYghW','_blank','noopener');
        });
      }
    }

    resultsEl.innerHTML = '';
    resultsEl.appendChild(fragment);
  }

  // Unlock or lock the RPS card
  function toggleRpsAccess(allowed){
    if (allowed) {
      rpsGate.classList.remove('is-locked');
      rpsGate.setAttribute('aria-hidden','false');
      rpsGate.scrollIntoView({ behavior:'smooth', block:'center' });
    } else {
      rpsGate.classList.add('is-locked');
      rpsGate.setAttribute('aria-hidden','true');
    }
  }
})();
