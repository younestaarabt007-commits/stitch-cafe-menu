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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
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
        const orderItem = {
            id: 'brunch-' + Date.now(), // Unique ID for cart
            name: 'Avocado Smash & Poached Egg',
            price: calculateTotal() / quantity, // Unit price
            qty: quantity,
            category: 'Brunch',
            options: {
                bread: selectedBread,
                toppings: selectedToppings,
                pairings: selectedPairings
            }
        };

        // Get existing cart
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
        } catch (e) {
            cart = [];
        }

        // Add to cart
        cart.push(orderItem);

        // Save cart
        localStorage.setItem('stitch_cart', JSON.stringify(cart));
        
        // Update totals (optional, main menu will recalculate)
        // localStorage.setItem('stitch_cart_count', String(cart.length));

        console.log('Added to cart:', orderItem);
        
        // Visual Feedback
        const btn = document.getElementById('add-to-order');
        const originalText = btn.textContent;
        btn.textContent = 'Added to Cart!';
        btn.classList.add('bg-green-600');
        
        setTimeout(() => {
            // Go back to menu or previous page
            window.history.back();
        }, 800);
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
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}
