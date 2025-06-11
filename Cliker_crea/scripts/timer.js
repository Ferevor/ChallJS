// filepath: c:\Users\Fabie\Documents\Ynov\ChallengeJS\Cliker_crea\src\scripts\timer.js

let timerInterval;
let timerActive = false;
let currencyPerSecond = 1; // Amount of currency generated per second

export function startTimer() {
    if (!timerActive) {
        timerActive = true;
        timerInterval = setInterval(() => {
            addCurrency(currencyPerSecond);
            updateTimerDisplay();
        }, 1000);
    }
}

export function stopTimer() {
    if (timerActive) {
        clearInterval(timerInterval);
        timerActive = false;
    }
}

export function updateTimerDisplay() {
    // Update the timer display logic here
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.innerText = `Currency generated per second: ${currencyPerSecond}`;
    }
}

// Function to add currency (assumes addCurrency is imported from currency.js)
function addCurrency(amount) {
    // Logic to add currency to the player's total
}