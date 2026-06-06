const heroSection = document.getElementById('hero-section');
const gameSection = document.getElementById('game-section');
const victorySection = document.getElementById('victory-section');

const startBtn = document.getElementById('start-btn');
const guessBtn = document.getElementById('guess-btn');
const restartBtn = document.getElementById('restart-btn');

const guessInput = document.getElementById('guess-input');
const hintText = document.getElementById('hint-text');
const attemptCount = document.getElementById('attempt-count');
const finalAttempts = document.getElementById('final-attempts');
const guessHistory = document.getElementById('guess-history');

let targetNumber;
let attempts;

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = '';
    hintText.textContent = '';
    attemptCount.textContent = '0';
    guessHistory.innerHTML = '';
}

function showScreen(screen) {
    heroSection.classList.remove('active');
    gameSection.classList.remove('active');
    victorySection.classList.remove('active');
    screen.classList.add('active');
}

function handleGuess() {
    const guess = parseInt(guessInput.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        hintText.textContent = 'Enter a valid number (1-100)';
        hintText.style.color = '#341212';
        return;
    }

    attempts++;
    attemptCount.textContent = attempts;
    hintText.style.color = '#ff69c8';

    const historyItem = document.createElement('span');
    historyItem.className = 'history-item';
    historyItem.textContent = guess;
    guessHistory.appendChild(historyItem);

    if (guess === targetNumber) {
        finalAttempts.textContent = attempts;
        showScreen(victorySection);
    } else if (guess < targetNumber) {
        hintText.textContent = 'Too Low';
    } else {
        hintText.textContent = 'Too High';
    }

    guessInput.value = '';
    guessInput.focus();
}

startBtn.addEventListener('click', () => {
    initGame();
    showScreen(gameSection);
    setTimeout(() => guessInput.focus(), 100);
});

guessBtn.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

restartBtn.addEventListener('click', () => {
    initGame();
    showScreen(gameSection);
    setTimeout(() => guessInput.focus(), 100);
});