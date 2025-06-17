import { addCurrency, subtractCurrency } from './currency.js';

let clickPower = 1;
let passivePower = 0;

const shopItems = [
    {
        id: 1,
        name: "Click Power +1",
        cost: 10,
        owned: 0,
        effect: function () { clickPower += 1; }
    },
    {
        id: 2,
        name: "Click Power +5",
        cost: 50,
        owned: 0,
        effect: function () { clickPower += 5; }
    },
    {
        id: 3,
        name: "Passive Income +1/sec",
        cost: 100,
        owned: 0,
        effect: function () { passivePower += 1; updatePassiveIncome(); }
    },
    {
        id: 4,
        name: "Passive Income +5/sec",
        cost: 400,
        owned: 0,
        effect: function () { passivePower += 5; updatePassiveIncome(); }
    },
    {
        id: 5,
        name: "Double Click Power",
        cost: 1000,
        owned: 0,
        effect: function () { clickPower *= 2; }
    }
];

export function getClickPower() {
    return clickPower;
}
export function getPassivePower() {
    return passivePower;
}

function updatePassiveIncome() {
    if (window.passiveInterval) clearInterval(window.passiveInterval);
    if (passivePower > 0) {
        window.passiveInterval = setInterval(() => {
            addCurrency(passivePower);
        }, 1000);
    }
}

export function purchaseItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    const currencyDisplay = document.getElementById('currency-display');
    let currentCurrency = parseInt(currencyDisplay.textContent.replace(/\D/g, '')) || 0;
    if (item && currentCurrency >= item.cost) {
        subtractCurrency(item.cost);
        item.owned = (item.owned || 0) + 1;
        item.effect();
        updateShopDisplay();
        updateOwnedUpgradesDisplay();
    } else {
        alert("Not enough currency or item does not exist.");
    }
}

export function updateShopDisplay() {
    const shopItemsDiv = document.getElementById('shop-items');
    if (shopItemsDiv) {
        shopItemsDiv.innerHTML = '';
        shopItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - Cost: ${item.cost}`;
            const buyBtn = document.createElement('button');
            buyBtn.textContent = 'Buy';
            buyBtn.onclick = () => purchaseItem(item.id);
            itemDiv.appendChild(buyBtn);
            shopItemsDiv.appendChild(itemDiv);
        });
    }
}

function updateOwnedUpgradesDisplay() {
    const ownedDiv = document.getElementById('owned-upgrades-list');
    if (ownedDiv) {
        ownedDiv.innerHTML = '';
        shopItems.forEach(item => {
            if (item.owned && item.owned > 0) {
                const upgradeDiv = document.createElement('div');
                upgradeDiv.textContent = `${item.name}: ${item.owned}`;
                ownedDiv.appendChild(upgradeDiv);
            }
        });
        if (ownedDiv.innerHTML === '') {
            ownedDiv.textContent = 'No upgrades owned yet.';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateShopDisplay();
    updateOwnedUpgradesDisplay();
});
