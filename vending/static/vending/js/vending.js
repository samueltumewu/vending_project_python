balance = 0; 

async function fetchBalance() {
    const res = await fetch('/vending/balance/');
    const data = await res.json();
    return data.balance;
}

async function insertMoney(amount) {
    const res = await fetch('/vending/insert/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount })
    });
    const data = await res.json();
    updateDisplay(data.balance);
}

async function buyDrink(drink, price) {
    const res = await fetch('/vending/buy/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drink: drink, price: price })
    });
    const data = await res.json();
    if (data.success) {
        alert(`You bought ${drink} for Rp ${price}`);
    } else {
        alert(`Insufficient balance for ${drink}`);
    }
    updateDisplay(data.balance);
}

function updateDisplay(balance) {
    document.getElementById('balance-display').innerText = `Balance: Rp ${balance}`;
    document.getElementById('btn-aqua').disabled = balance < 5000;
    document.getElementById('btn-cola').disabled = balance < 8000;
    document.getElementById('btn-tehkotak').disabled = balance < 6000;
}

window.onload = async () => {
    const balance = await fetchBalance();
    if (balance === null) updateDisplay(0)
    updateDisplay(balance);
};
