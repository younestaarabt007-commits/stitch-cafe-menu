
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get('name');
    const image = params.get('image');
    const p = parseFloat(params.get('price') || '');

    // State
    const state = {
        basePrice: Number.isNaN(p) ? 4.50 : p,
        roast: 'House Blend',
        additives: [],
        qty: 1,
        prices: {
            roast: { 'House Blend': 0, 'Single Origin': 0.50, 'Decaf': 0 },
            additive: { 'Extra Shot': 1.50, 'Brown Sugar': 0, 'Cinnamon Dust': 0 }
        }
    };

    if (n) {
        const titleEl = document.querySelector('h1');
        if (titleEl) titleEl.textContent = decodeURIComponent(n);
    }

    if (image) {
        const hero = document.querySelector('div[style*="background-image"]');
        if (hero) {
            hero.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.4), transparent), url('${decodeURIComponent(image)}')`;
        }
    }

    // Elements
    const qtyDisplay = document.querySelector('.fixed span.text-center');
    const addToOrderBtn = document.querySelector('.fixed button.bg-primary');
    const priceDisplay = addToOrderBtn.querySelector('span:last-child');
    const backBtn = document.querySelector('.absolute.top-0 button'); // Arrow back

    // Helper: Update Price
    function updatePrice() {
        let total = state.basePrice;
        total += state.prices.roast[state.roast] || 0;
        state.additives.forEach(a => total += (state.prices.additive[a] || 0));
        const finalTotal = total * state.qty;
        priceDisplay.textContent = `${finalTotal.toFixed(2)}DH`;
    }

    // Helper: Set Active Roast
    function setRoastActive(targetBtn) {
        // Reset all roast buttons
        const roastContainer = document.querySelector('.grid.grid-cols-3');
        const buttons = roastContainer.querySelectorAll('div'); // The divs act as buttons here

        buttons.forEach(btn => {
            // Remove active classes
            btn.classList.remove('border-2', 'border-primary', 'bg-primary/5', 'relative');
            btn.classList.add('border', 'border-gray-200', 'bg-white', 'dark:border-gray-800', 'dark:bg-gray-900/50');

            // Remove checkmark
            const check = btn.querySelector('.absolute.top-\\[-6px\\]');
            if (check) check.remove();

            // Reset icon color
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.classList.remove('text-primary');
                icon.classList.add('text-gray-400');
            }
        });

        // Add active classes to target
        targetBtn.classList.remove('border', 'border-gray-200', 'bg-white', 'dark:border-gray-800', 'dark:bg-gray-900/50');
        targetBtn.classList.add('border-2', 'border-primary', 'bg-primary/5', 'relative');

        // Add checkmark
        const check = document.createElement('div');
        check.className = 'absolute top-[-6px] right-[-6px] bg-primary text-white rounded-full p-[2px]';
        check.innerHTML = '<span class="material-symbols-outlined text-[12px]">check</span>';
        targetBtn.appendChild(check);

        // Set icon color
        const icon = targetBtn.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.classList.remove('text-gray-400');
            icon.classList.add('text-primary');
        }
    }

    // Event Listeners: Roast
    const roastContainer = document.querySelector('.grid.grid-cols-3');
    if (roastContainer) {
        const roasts = roastContainer.querySelectorAll('div[class*="flex-col"]'); // Select the cards
        roasts.forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.querySelector('p.font-bold, p.font-medium').textContent;
                state.roast = name;
                setRoastActive(btn);
                updatePrice();
            });
        });
    }

    // Event Listeners: Additives
    const additiveRows = document.querySelectorAll('.space-y-3 > div');
    additiveRows.forEach(row => {
        row.addEventListener('click', () => {
            const name = row.querySelector('.font-semibold').textContent;
            const btn = row.querySelector('button');

            if (state.additives.includes(name)) {
                // Remove
                state.additives = state.additives.filter(a => a !== name);
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-primary');
                btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">add</span>';
            } else {
                // Add
                state.additives.push(name);
                btn.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-primary');
                btn.classList.add('bg-primary', 'text-white');
                btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
            }
            updatePrice();
        });
    });

    // Event Listeners: Quantity
    const qtyContainer = document.querySelector('.fixed .bg-gray-100');
    if (qtyContainer) {
        const [minusBtn, , plusBtn] = qtyContainer.children;

        minusBtn.addEventListener('click', () => {
            if (state.qty > 1) {
                state.qty--;
                qtyDisplay.textContent = state.qty;
                updatePrice();
            }
        });

        plusBtn.addEventListener('click', () => {
            state.qty++;
            qtyDisplay.textContent = state.qty;
            updatePrice();
        });
    }

    // Add to Order
    addToOrderBtn.addEventListener('click', () => {
        let unitPrice = state.basePrice + (state.prices.roast[state.roast] || 0);
        state.additives.forEach(a => unitPrice += (state.prices.additive[a] || 0));

        const newItem = {
            id: 'espresso-' + Date.now(),
            name: 'Pure Noir Espresso',
            price: unitPrice,
            qty: state.qty,
            category: 'Brew',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMMajC442B9OyqOEg1kiXm5UdrfIxiqbwldpPV7swoS0uF2SzRZh7kfd5rSOktPwbiXq1VKiGcG33mn9Q3_gf1mSa96WwDF4BFJgLrg3DCGZp4Mfw-BPYpU_H7VS2nji829sdByGo2CSPJ2gumJLOfpa-x3EoHsOSL7TO6LcCGYpZ9vh9qSOQ8LnCT9uE8y-sGKuzCoGlUpj9d0bl_UEvXi7Afy0TDy74WcxbKhCXWKLAcpKlwA-JDTCsRhuCzv4WvUxGpKHwkVB8',
            options: {
                Roast: state.roast,
                Additives: state.additives.join(', ')
            }
        };

        const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
        cart.push(newItem);
        localStorage.setItem('stitch_cart', JSON.stringify(cart));

        // Update stats
        const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        localStorage.setItem('stitch_cart_count', count);
        localStorage.setItem('stitch_cart_total', total);

        // Feedback
        const textSpan = addToOrderBtn.querySelector('span:first-child');
        const originalText = textSpan.textContent;
        textSpan.textContent = 'ADDED!';
        addToOrderBtn.classList.add('bg-green-600');

        setTimeout(() => {
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        }, 800);
    });

    // Back Button
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Pairings
    const pairingBtns = document.querySelectorAll('.overflow-x-auto button');
    pairingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('div[class*="w-60"]');
            const name = card.querySelector('p.font-bold').textContent;
            const priceStr = card.querySelector('.text-primary').textContent;
            const price = parseFloat(priceStr.replace('DH', ''));

            const item = {
                id: 'pairing-' + Date.now(),
                name: name,
                price: price,
                qty: 1,
                category: 'Pastry',
                image_url: ''
            };

            const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
            cart.push(item);
            localStorage.setItem('stitch_cart', JSON.stringify(cart));

            btn.textContent = '✓';
            btn.classList.add('bg-green-100', 'text-green-600');
            setTimeout(() => {
                btn.textContent = 'Add';
                btn.classList.remove('bg-green-100', 'text-green-600');
            }, 1000);
        });
    });

    // Init
    updatePrice();
});
