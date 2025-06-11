// filepath: c:\Users\Fabie\Documents\Ynov\ChallengeJS\Cliker_crea\src\scripts\shop.js

const shopItems = [
    { id: 1, name: "Upgrade Click Power", cost: 10, effect: () => { /* Increase click power */ } },
    { id: 2, name: "Auto Clicker", cost: 50, effect: () => { /* Start auto clicking */ } },
    { id: 3, name: "Currency Multiplier", cost: 100, effect: () => { /* Multiply currency earned */ } },
];

let playerCurrency = 0;

export function openShop() {
    // Logic to display the shop interface
    updateShopDisplay();
}

export function purchaseItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    if (item && playerCurrency >= item.cost) {
        playerCurrency -= item.cost;
        item.effect();
        updateShopDisplay();
    } else {
        console.log("Not enough currency or item does not exist.");
    }
}

export function updateShopDisplay() {
    // Logic to update the shop display with current items and player currency
    console.log("Shop updated. Current currency: " + playerCurrency);
}

export function addCurrency(amount) {
    playerCurrency += amount;
    updateShopDisplay();
}

document.getElementById('open-shop').addEventListener('click', openShop);
