document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-btn');
    const moreBtn = document.getElementById('more-btn');
    const returnBtn = document.getElementById('return-btn');

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        });
    }

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            // Optional: Implement more options or remove
        });
    }

    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            // Visual feedback
            returnBtn.classList.add('scale-95');
            setTimeout(() => {
                returnBtn.classList.remove('scale-95');
                window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
            }, 100);
        });
    }

    // Initialize Animations randomly for floating elements
    const floatingElements = document.querySelectorAll('.floating-medium, .floating-fast, .floating-slow');
    floatingElements.forEach(el => {
        const randomDelay = Math.random() * 2;
        el.style.animationDelay = `${randomDelay}s`;
    });
});
