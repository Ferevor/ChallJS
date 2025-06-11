//Cash.js
const money = {
    dollar: 0.84,
    euro: 1,
    livre: 1.14,
    bitcoin: 40000
};

let inputCurrency = 'euro'; // Devise par défaut pour l'entrée
let outputCurrency = 'euro'; // Devise par défaut pour la sortie

// Définit la devise d'entrée
function setInputCurrency(currency) {
    inputCurrency = currency;
    convertCurrency();
}

// Définit la devise de sortie
function setOutputCurrency(currency) {
    outputCurrency = currency;
    convertCurrency();
}

// Effectue la conversion
function convertCurrency() {
    const entryValue = parseFloat(document.getElementById('entry').value) || 0;
    const result = (money[inputCurrency] * entryValue) / money[outputCurrency];
    //console.log(`Conversion result: ${result}`);
    document.getElementById('result').value = result.toFixed(2);
}