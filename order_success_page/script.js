
document.addEventListener('DOMContentLoaded', () => {
    // Clear the cart on successful order
    localStorage.removeItem('stitch_cart');
    
    // Update global cart badge if the function exists (from nav-bar.js)
    if (typeof updateGlobalCartCount === 'function') {
        updateGlobalCartCount();
    }

    const returnBtn = document.getElementById('return-btn');
    const viewDetailsBtn = document.getElementById('view-details-btn');

    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            // Redirect to main menu
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        });
    }

    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', () => {
            alert('Order details would be shown here.');
        });
    }
});
