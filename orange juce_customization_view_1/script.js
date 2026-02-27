document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const image = params.get('image');
    const price = params.get('price');

    if (image) {
        const heroImage = document.querySelector('div[style*="background-image"]');
        if (heroImage) {
            heroImage.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.2), transparent), url('${decodeURIComponent(image)}')`;
        }
    }

    if (name) {
        const title = document.querySelector('h1');
        if (title) title.textContent = decodeURIComponent(name);
    }

    if (price) {
        const priceDisplay = document.querySelector('.fixed .font-extrabold.text-base');
        if (priceDisplay) priceDisplay.textContent = `${parseFloat(price).toFixed(2)}DH`;
    }

    // Basic event listeners for orange juice customization
    const backBtn = document.querySelector('button[class*="rounded-full"] span[class*="arrow_back_ios_new"]')?.parentElement;
    if (backBtn) {
        backBtn.addEventListener('click', () => window.history.back());
    }

    // Add to order logic could be expanded here if needed
});
