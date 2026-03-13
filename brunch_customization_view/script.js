// State
let selectedBread = 'sourdough';
let selectedToppings = ['poached-egg']; // Default selection
let selectedPairings = [];
let quantity = 1;

const basePrice = 12.50;
const toppingPrices = {
    'poached-egg': 2.00,
    'smoked-salmon': 4.50,
    'extra-avocado': 3.00
};
let itemName = 'Artisanal Avocado Toast';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get('name');
    const image = params.get('image');

    if (n) {
        itemName = n;
        const titleEl = document.querySelector('h1');
        if (titleEl) titleEl.textContent = decodeURIComponent(n);
    }

    if (image) {
        const hero = document.getElementById('customization-hero');
        if (hero) {
            hero.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.4), transparent), url('${decodeURIComponent(image)}')`;
        }
    }

    setupEventListeners();
    updateTotal();
});

// Setup Event Listeners
function setupEventListeners() {
    // Close Button
    document.getElementById('close-btn').addEventListener('click', () => {
        console.log('Close clicked');
        window.history.back();
    });

    // Share Button
    document.getElementById('share-btn').addEventListener('click', () => {
        console.log('Share clicked');
        alert('Share functionality would open here');
    });

    // Bread Options
    document.querySelectorAll('.bread-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.bread-option').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedBread = e.currentTarget.dataset.bread;
            console.log('Selected bread:', selectedBread);
        });
    });

    // Topping Items
    document.querySelectorAll('.topping-item').forEach(item => {
        item.addEventListener('click', () => {
            const topping = item.dataset.topping;

            if (selectedToppings.includes(topping)) {
                selectedToppings = selectedToppings.filter(t => t !== topping);
                item.classList.remove('selected');
            } else {
                selectedToppings.push(topping);
                item.classList.add('selected');
            }

            updateTotal();
        });
    });

    // Pairing Add Buttons
    document.querySelectorAll('.pairing-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pairing = btn.dataset.pairing;
            const price = parseFloat(btn.dataset.price);

            if (!selectedPairings.includes(pairing)) {
                selectedPairings.push(pairing);
                console.log('Added pairing:', pairing);
                updateTotal();
            }
        });
    });

    // Quantity Controls
    document.getElementById('qty-minus').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById('quantity').textContent = quantity;
            updateTotal();
        }
    });

    document.getElementById('qty-plus').addEventListener('click', () => {
        quantity++;
        document.getElementById('quantity').textContent = quantity;
        updateTotal();
    });

    // Add to Order Button
    document.getElementById('add-to-order').addEventListener('click', () => {
        const order = {
            item: itemName || "Brunch Item",
            bread: selectedBread,
            toppings: selectedToppings,
            pairings: selectedPairings,
            qty: quantity,
            unit_price: calculateTotal() / quantity,
            total: calculateTotal(),
            time: new Date().toISOString()
        };
        try {
            localStorage.setItem('stitch_last_order', JSON.stringify(order));
        } catch { }
        window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
    });
}

// Calculate Total
function calculateTotal() {
    let total = basePrice;

    // Add topping prices
    selectedToppings.forEach(topping => {
        total += toppingPrices[topping] || 0;
    });

    // Add pairing prices
    selectedPairings.forEach(pairing => {
        if (pairing === 'iced-latte') total += 5.50;
        if (pairing === 'fresh-oj') total += 4.50;
    });

    // Multiply by quantity
    total *= quantity;

    return total;
}

// Update Total Display
function updateTotal() {
    const total = calculateTotal();
    document.getElementById('total-price').textContent = `${total.toFixed(2)}DH`;
}
