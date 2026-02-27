
document.addEventListener('DOMContentLoaded', () => {
    // State
    const state = {
        basePrice: 5.50, // Base price for small/default
        size: 'Medium', // Default selection
        milk: 'Oat',    // Default selection
        syrups: [],
        qty: 1,
        prices: {
            size: { 'Small': -0.5, 'Medium': 0, 'Large': 1.0 },
            milk: { 'Oat': 0, 'Almond': 0.5, 'Dairy': 0 },
            syrup: { 'Vanilla': 0.8, 'Caramel': 0.8, 'Hazelnut': 0.8 }
        }
    };

    // DOM Elements
    const sizeBtns = document.querySelectorAll('.px-4.pt-5.pb-2 button'); // Size section
    const milkBtns = document.querySelectorAll('.px-4.pt-4.pb-2 button'); // Milk section (first one)
    const syrupRows = document.querySelectorAll('.space-y-2 > div'); // Syrup rows

    // Bottom bar elements
    const qtyMinusBtn = document.querySelector('.fixed .material-symbols-outlined[class*="remove"]').parentElement;
    const qtyPlusBtn = document.querySelector('.fixed .material-symbols-outlined[class*="add"]').parentElement; // First add icon in bottom bar
    const qtyDisplay = document.querySelector('.fixed span.text-center');
    const addToOrderBtn = document.querySelector('.fixed button.bg-primary');
    const priceDisplay = addToOrderBtn.querySelector('span:last-child');
    const backBtn = document.querySelector('.absolute.top-12.left-4 button');

    // Helper: Update Price Display
    function updatePrice() {
        let total = state.basePrice;

        // Add Size adjustment
        total += state.prices.size[state.size] || 0;

        // Add Milk adjustment
        total += state.prices.milk[state.milk] || 0;

        // Add Syrups
        state.syrups.forEach(s => {
            total += state.prices.syrup[s] || 0;
        });

        // Multiply by Qty
        const finalTotal = total * state.qty;

        // Update Button
        priceDisplay.textContent = `${finalTotal.toFixed(2)}DH`;
    }

    // Helper: Toggle Active Class for Single Select
    function setActive(buttons, selectedIndex) {
        buttons.forEach((btn, idx) => {
            if (idx === selectedIndex) {
                // Add active styles (border-primary, bg-orange-50/50, etc - simplistic approach based on HTML)
                btn.classList.add('border-primary', 'bg-orange-50/50', 'dark:bg-primary/5');
                btn.classList.remove('border-gray-100', 'dark:border-white/10', 'bg-white', 'dark:bg-white/5');

                // Ensure check circle exists
                if (!btn.querySelector('.check-circle')) {
                    const check = document.createElement('div');
                    check.className = 'absolute top-2 right-2 check-circle';
                    check.innerHTML = '<span class="material-symbols-outlined text-primary !text-[16px] fill-[1]">check_circle</span>';
                    btn.classList.add('relative');
                    btn.appendChild(check);
                }
            } else {
                // Remove active styles
                btn.classList.remove('border-primary', 'bg-orange-50/50', 'dark:bg-primary/5', 'relative');
                btn.classList.add('border-gray-100', 'dark:border-white/10', 'bg-white', 'dark:bg-white/5');

                const check = btn.querySelector('.check-circle');
                if (check) check.remove();
            }
        });
    }

    // Event Listeners: Size
    // Note: The selector might grab milk buttons too if not careful. 
    // The HTML structure: Size is in the first grid, Milk in the second.
    // Let's be more specific with selectors based on container headings.

    const sizeSection = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Choose Size'));
    const milkSection = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Choose Milk'));

    if (sizeSection) {
        const buttons = sizeSection.nextElementSibling.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.querySelector('span.text-xs').textContent; // Small, Medium, Large
                state.size = text;
                setActive(buttons, Array.from(buttons).indexOf(btn));
                updatePrice();
            });
        });
    }

    if (milkSection) {
        const buttons = milkSection.nextElementSibling.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Extract milk name (Oat, Almond, Dairy)
                // The structure is span(Name) span(Price)
                const textSpan = btn.querySelector('span.font-bold, span.font-semibold');
                if (textSpan) {
                    state.milk = textSpan.textContent;
                    setActive(buttons, Array.from(buttons).indexOf(btn));
                    updatePrice();
                }
            });
        });
    }

    // Event Listeners: Syrups (Toggle)
    syrupRows.forEach(row => {
        row.addEventListener('click', () => {
            const name = row.querySelector('.font-semibold').textContent;
            const checkbox = row.querySelector('button.rounded-full'); // The circle button

            if (state.syrups.includes(name)) {
                // Remove
                state.syrups = state.syrups.filter(s => s !== name);
                // Visual Update: Uncheck
                checkbox.innerHTML = '';
                checkbox.classList.remove('bg-primary', 'text-white', 'border-transparent');
                checkbox.classList.add('border-gray-300', 'dark:border-white/20');
            } else {
                // Add
                state.syrups.push(name);
                // Visual Update: Check
                checkbox.innerHTML = '<span class="material-symbols-outlined !text-[14px]">check</span>';
                checkbox.classList.remove('border-gray-300', 'dark:border-white/20');
                checkbox.classList.add('bg-primary', 'text-white', 'border-transparent');
            }
            updatePrice();
        });
    });

    // Event Listeners: Quantity
    qtyMinusBtn.addEventListener('click', () => {
        if (state.qty > 1) {
            state.qty--;
            qtyDisplay.textContent = state.qty;
            updatePrice();
        }
    });

    qtyPlusBtn.addEventListener('click', () => {
        state.qty++;
        qtyDisplay.textContent = state.qty;
        updatePrice();
    });

    // Event Listener: Add to Order
    addToOrderBtn.addEventListener('click', () => {
        // Create Cart Item
        let unitPrice = state.basePrice + (state.prices.size[state.size] || 0) + (state.prices.milk[state.milk] || 0);
        state.syrups.forEach(s => unitPrice += (state.prices.syrup[s] || 0));

        const newItem = {
            id: 'latte-' + Date.now(),
            name: 'Velvet Oat Latte', // Could be dynamic if we had product info
            price: unitPrice,
            qty: state.qty,
            category: 'Brew',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvbgZWbn9eyuS2SQxtuqDftg5W9AY-WScx5N1AIalvRK6U-fX4X_iT9cDMPihN4ID53SzmMb1AObO_cNTkyturqVwxy0Pd2xIpSuniI55hNSLTd1lgpq4WnnElptw7ypSL6xe6V82jPoHWz2TVm9YBgcqNlK0f7mfaW4ThqXEP-8_1npqwMVqn1QGRB5DvQSyKKUhYwR-DlwEbfrmmR7_BThJ2a2oLRM2kJlr65dIvzzp1JNWRCzF00YfIzEkYm8650rpZAhBgLLA',
            options: {
                Size: state.size,
                Milk: state.milk,
                Syrups: state.syrups.join(', ')
            }
        };

        // Save to LocalStorage
        const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
        cart.push(newItem);
        localStorage.setItem('stitch_cart', JSON.stringify(cart));

        // Update totals logic (simplified)
        const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        localStorage.setItem('stitch_cart_count', count);
        localStorage.setItem('stitch_cart_total', total);

        // Feedback
        const originalText = addToOrderBtn.querySelector('span:first-child').textContent;
        addToOrderBtn.querySelector('span:first-child').textContent = 'Added!';
        addToOrderBtn.classList.add('bg-green-600');

        setTimeout(() => {
            // Redirect back to menu or category
            // Try to go back to where we came from, or default to menu
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        }, 800);
    });

    // Back Button
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Perfect Pairings Add Buttons
    const pairingBtns = document.querySelectorAll('.hide-scrollbar button');
    pairingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('div[class*="w-[140px]"]');
            const name = card.querySelector('h3').textContent;
            const priceStr = card.querySelector('.text-xs').textContent;
            const price = parseFloat(priceStr.replace('$', ''));

            const item = {
                id: 'pairing-' + Date.now(),
                name: name,
                price: price,
                qty: 1,
                category: 'Pastry',
                image_url: '' // simplified
            };

            const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
            cart.push(item);
            localStorage.setItem('stitch_cart', JSON.stringify(cart));

            // Visual feedback on the small button
            const icon = btn.querySelector('span');
            icon.textContent = 'check';
            btn.classList.add('bg-green-100', 'text-green-600');
            setTimeout(() => {
                icon.textContent = 'add';
                btn.classList.remove('bg-green-100', 'text-green-600');
            }, 1000);
        });
    });

    // Initialize
    updatePrice();
});
