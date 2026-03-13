document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get('name');
    const itemImage = params.get('image');
    const itemPrice = parseFloat(params.get('price'));

    const basePrice = isNaN(itemPrice) ? 0 : itemPrice;
    let currentQuantity = 1;
    let sizePriceOffset = 0;
    let extrasPrice = 0;

    // Populate item details
    document.getElementById('item-name').textContent = itemName ? decodeURIComponent(itemName) : 'Milkshake';
    const heroImage = document.getElementById('hero-image');
    if (itemImage) {
        heroImage.style.backgroundImage = `url('${decodeURIComponent(itemImage)}')`;
    }
    
    // UI Elements
    const quantityElement = document.getElementById('quantity');
    const itemPriceElement = document.getElementById('item-price');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const sizeRadios = document.querySelectorAll('input[name="size"]');
    const extraCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const addToOrderBtn = document.getElementById('add-to-order-btn');

    function updatePrice() {
        const total = (basePrice + sizePriceOffset + extrasPrice) * currentQuantity;
        const formattedTotal = total.toFixed(2) + ' DH';
        
        if (itemPriceElement) {
            itemPriceElement.textContent = formattedTotal;
        }
        
        if (totalItemsElement) {
            totalItemsElement.textContent = `${currentQuantity} Item${currentQuantity > 1 ? 's' : ''}`;
        }

        if (totalPriceElement) {
            totalPriceElement.textContent = formattedTotal;
        }
    }

    // Quantity controls
    decreaseBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityElement.textContent = currentQuantity;
            updatePrice();
        }
    });

    increaseBtn.addEventListener('click', () => {
        currentQuantity++;
        quantityElement.textContent = currentQuantity;
        updatePrice();
    });

    // Size selection
    sizeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const selectedSize = document.querySelector('input[name="size"]:checked');
            const priceString = selectedSize.parentElement.querySelector('.ml-auto').textContent;
            sizePriceOffset = parseFloat(priceString.replace(/[^\d.-]/g, ''));
            updatePrice();
        });
    });
    
    // Initial size price
    const initialSelectedSize = document.querySelector('input[name="size"]:checked');
    if (initialSelectedSize) {
        const priceString = initialSelectedSize.parentElement.querySelector('.ml-auto').textContent;
        sizePriceOffset = parseFloat(priceString.replace(/[^\d.-]/g, ''));
    }


    // Extras selection
    extraCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            extrasPrice = 0;
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkedBox => {
                const priceString = checkedBox.parentElement.querySelector('.ml-auto').textContent;
                extrasPrice += parseFloat(priceString.replace(/[^\d.-]/g, ''));
            });
            updatePrice();
        });
    });

    // Add to order
    addToOrderBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
        
        const selectedSizeEl = document.querySelector('input[name="size"]:checked');
        const selectedExtras = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));

        const item = {
            id: `${itemName.replace(/\s+/g, '-')}-${Date.now()}`,
            name: itemName,
            price: basePrice + sizePriceOffset + extrasPrice,
            quantity: currentQuantity,
            image: itemImage,
            options: []
        };

        if (selectedSizeEl) {
            item.options.push({
                name: `Size: ${selectedSizeEl.nextElementSibling.textContent}`
            });
        }

        selectedExtras.forEach(extra => {
            item.options.push({
                name: extra.nextElementSibling.textContent
            });
        });

        cart.push(item);
        localStorage.setItem('stitch_cart', JSON.stringify(cart));

        // Optional: Give user feedback
        const originalText = addToOrderBtn.querySelector('button').textContent;
        addToOrderBtn.querySelector('button').textContent = 'Added!';
        setTimeout(() => {
            addToOrderBtn.querySelector('button').textContent = originalText;
        }, 2000);
    });

    // Initial price update
    updatePrice();
});
