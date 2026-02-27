document.addEventListener('DOMContentLoaded', () => {
    const basePrice = 8.50;
    let currentQuantity = 1;
    let currentSizePrice = 0;
    let currentExtrasPrice = 0;

    // Elements
    const quantityValue = document.getElementById('quantity-value');
    const totalPriceElement = document.getElementById('total-price');
    const sizeOptions = document.querySelectorAll('.size-option');
    const extraOptions = document.querySelectorAll('.extra-option');

    // Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            history.back();
        });
    }

    // Size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Update all options
            sizeOptions.forEach(opt => {
                const isSelected = (opt === option);
                const iconContainer = opt.querySelector('div.flex');

                if (isSelected) {
                    opt.className = "relative p-4 rounded-lg border-2 border-primary bg-primary/5 dark:bg-primary/10 flex flex-col gap-1 cursor-pointer size-option";

                    // Update icons
                    let iconHtml = `<span class="material-symbols-outlined text-primary">local_drink</span>`;
                    iconHtml += `<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">check_circle</span>`;
                    iconContainer.innerHTML = iconHtml;
                } else {
                    opt.className = "relative p-4 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer size-option";

                    // Update icons
                    let iconHtml = `<span class="material-symbols-outlined text-[#9c6c49] dark:text-zinc-400">local_drink</span>`;
                    iconContainer.innerHTML = iconHtml;
                }
            });

            currentSizePrice = parseFloat(option.dataset.price);
            updateTotal();
        });
    });

    // Extras selection
    extraOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Check current state by looking for border-primary
            const isSelected = option.classList.contains('border-primary/20');

            if (isSelected) {
                // Deselect
                option.classList.remove('border-primary/20', 'bg-background-light', 'dark:bg-zinc-900');
                option.classList.add('border-[#e8d9ce]', 'dark:border-zinc-800');

                // Update checkmark circle
                const checkmarkContainer = option.querySelector('.h-6.w-6');
                if (checkmarkContainer) {
                    checkmarkContainer.className = 'h-6 w-6 rounded-full border-2 border-[#e8d9ce] dark:border-zinc-700';
                    checkmarkContainer.innerHTML = '';
                }
            } else {
                // Select
                option.classList.remove('border-[#e8d9ce]', 'dark:border-zinc-800');
                option.classList.add('border-primary/20', 'bg-background-light', 'dark:bg-zinc-900');

                // Update checkmark circle
                const checkmarkContainer = option.querySelector('.h-6.w-6');
                if (checkmarkContainer) {
                    checkmarkContainer.className = 'h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white';
                    checkmarkContainer.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
                }
            }

            calculateExtrasPrice();
            updateTotal();
        });
    });

    function calculateExtrasPrice() {
        currentExtrasPrice = 0;
        extraOptions.forEach(option => {
            if (option.classList.contains('border-primary/20')) {
                currentExtrasPrice += parseFloat(option.dataset.price);
            }
        });
    }

    // Quantity
    const decreaseBtn = document.getElementById('quantity-decrease');
    const increaseBtn = document.getElementById('quantity-increase');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityValue.textContent = currentQuantity;
                updateTotal();
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            currentQuantity++;
            quantityValue.textContent = currentQuantity;
            updateTotal();
        });
    }

    function updateTotal() {
        const total = (basePrice + currentSizePrice + currentExtrasPrice) * currentQuantity;
        totalPriceElement.textContent = total.toFixed(2) + 'DH';
    }

    // Add to Order
    const addToOrderBtn = document.getElementById('add-to-order-btn');
    if (addToOrderBtn) {
        addToOrderBtn.addEventListener('click', () => {
            const item = {
                id: 'smoothie-mixed-berry-' + Date.now(),
                name: 'Mixed Berry Smoothie',
                price: (basePrice + currentSizePrice + currentExtrasPrice),
                quantity: currentQuantity,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiVeZwsSWJCE0eA9VnyqfFQS9JikAIjX1ILhQIdSMxHybKQKVUH0Sr4yC_VY7Kk24O1rncwIV4QOErsCS1AQafyRo16YS2BNrdDdtGyILBk815rqkxyt10oNzoZhdGaAuoofSFHQwNk1HqwRzN_8N8iQQFRJQbND46R6lZeLOfl01ft9o-_Nqhm_V7Hoj1P2VTpGmEqLxku_EHeRoAggD0NnfKsB_q5hKCNJx87UYCqbvwAHawhLYg4sCOANFI-gixKf_hoMp6jic',
                options: []
            };

            // Get selected size name
            sizeOptions.forEach(option => {
                if (option.classList.contains('border-primary')) {
                    const name = option.querySelector('p.font-bold').textContent;
                    item.options.push({ name: 'Size: ' + name, price: parseFloat(option.dataset.price) });
                }
            });

            // Get selected extras
            extraOptions.forEach(option => {
                if (option.classList.contains('border-primary/20')) {
                    const name = option.querySelector('p.font-bold').textContent;
                    item.options.push({ name: name, price: parseFloat(option.dataset.price) });
                }
            });

            // Save to localStorage
            const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
            cart.push(item);
            localStorage.setItem('stitch_cart', JSON.stringify(cart));

            // Update badge
            if (window.updateGlobalCartCount) {
                window.updateGlobalCartCount();
            }

            // Visual Feedback
            const originalContent = addToOrderBtn.innerHTML;
            addToOrderBtn.innerHTML = '<span class="material-symbols-outlined">check</span> ADDED';
            addToOrderBtn.classList.remove('bg-primary');
            addToOrderBtn.classList.add('bg-green-600');

            setTimeout(() => {
                addToOrderBtn.innerHTML = originalContent;
                addToOrderBtn.classList.remove('bg-green-600');
                addToOrderBtn.classList.add('bg-primary');
            }, 2000);
        });
    }

    // Initialize totals
    calculateExtrasPrice();
    updateTotal();
});
