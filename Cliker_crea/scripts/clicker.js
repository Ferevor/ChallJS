// filepath: c:\Users\Fabie\Documents\Ynov\ChallengeJS\Cliker_crea\scripts\clicker.js

let currency = 0;
let timerInterval;
let elapsedSeconds = 0;

function startGame() {
    currency = 0;
    updateDisplay();
    startTimer();
}

function startTimer() {
    elapsedSeconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.innerText = `Time: ${formatTime(elapsedSeconds)}`;
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

function handleClick() {
    currency++;
    updateDisplay();
}

function updateDisplay() {
    const currencyDisplay = document.getElementById('currency-display');
    currencyDisplay.innerText = `Currency: ${currency}`;
}

document.getElementById('click-image').addEventListener('click', handleClick);

window.onload = startGame;