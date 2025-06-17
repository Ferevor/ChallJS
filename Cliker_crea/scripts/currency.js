// filepath: c:\Users\Fabie\Documents\Ynov\ChallengeJS\Cliker_crea\scripts\currency.js

let currentCurrency = 0;

function addCurrency(amount) {
    currentCurrency += amount;
    updateCurrencyDisplay();
}

function subtractCurrency(amount) {
    if (currentCurrency >= amount) {
        currentCurrency -= amount;
        updateCurrencyDisplay();
    } else {
        console.log("Not enough currency!");
    }
}

function updateCurrencyDisplay() {
    const currencyDisplay = document.getElementById('currency-display');
    if (currencyDisplay) {
        currencyDisplay.textContent = `Currency: ${currentCurrency}`;
    }
}

export { addCurrency, subtractCurrency, currentCurrency };