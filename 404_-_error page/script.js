// Navigation Interactive States
function setActiveNav(element, pageName) {
    // Reset all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active-nav');
        item.classList.remove('text-primary');
        item.classList.add('text-[#1c140d]/40', 'dark:text-white/40');
        
        // Reset icon fill
        const icon = item.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.style.fontVariationSettings = "'FILL' 0";
        }
    });

    // Set active item
    element.classList.add('active-nav');
    element.classList.remove('text-[#1c140d]/40', 'dark:text-white/40');
    element.classList.add('text-primary');
    
    // Set active icon fill
    const icon = element.querySelector('.material-symbols-outlined');
    if (icon) {
        icon.style.fontVariationSettings = "'FILL' 1";
    }

    console.log(`Navigating to ${pageName}... (Simulation)`);
}

// Button Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-btn');
    const moreBtn = document.getElementById('more-btn');
    const returnBtn = document.getElementById('return-btn');

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log('Back button clicked');
            // Check if there is history to go back to
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = '/'; // Fallback to home/root
            }
        });
    }

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            console.log('More options clicked');
            alert('More options menu would open here.');
        });
    }

    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            console.log('Return to Menu clicked');
            // Simulate navigation to menu
            // In a real app, this would be: window.location.href = '/menu';
            
            // Visual feedback
            returnBtn.classList.add('scale-95');
            setTimeout(() => {
                returnBtn.classList.remove('scale-95');
                // Simulate transition
                document.body.style.opacity = '0';
                setTimeout(() => {
                    alert('Redirecting to Menu...');
                    document.body.style.opacity = '1';
                }, 500);
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
