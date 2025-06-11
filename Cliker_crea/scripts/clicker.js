// filepath: c:\Users\Fabie\Documents\Ynov\ChallengeJS\Cliker_crea\scripts\clicker.js

let currency = 0;
let timerInterval;

function startGame() {
    currency = 0;
    updateDisplay();
    startTimer();
}

function handleClick() {
    currency++;
    updateDisplay();
}

function updateDisplay() {
    const currencyDisplay = document.getElementById('currency-display');
    currencyDisplay.innerText = `Currency: ${currency}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        currency++;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

document.getElementById('click-button').addEventListener('click', handleClick);

// Initialize the game when the window loads
window.onload = startGame;