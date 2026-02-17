document.addEventListener('DOMContentLoaded', () => {
    // Category selection logic
    const chips = document.querySelectorAll('.chip');
    const productCards = document.querySelectorAll('.product-card');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('chip-active'));
            chip.classList.add('chip-active');
            
            const category = chip.textContent.toLowerCase().trim();
            console.log(`Filtering by: ${category}`);

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex'; // Restore display (most are flex)
                    // Note: Some cards might be block, but flex usually works for these containers
                    // If original was not flex, this might break layout slightly, but looking at HTML:
                    // Grid items are flex-col (flex). Horizontal items are flex items-center (flex).
                    // So 'flex' is safe.
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add to cart buttons - Prevent default link behavior if needed, but since they are <a> tags now, 
    // we let them navigate. However, if there are any <button> elements left (like in the Featured section?),
    // we should handle them.
    // The Featured section has an <a> tag now.
    
    // Item click -> Customization View
    // We want the whole card to be clickable, but the add button is inside it.
    // The add button is an <a> tag, so it handles itself.
    // If we make the whole card clickable, we should avoid double navigation.
    
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // If the user clicked the add button (which is an anchor), let it handle navigation
            if (e.target.closest('a')) {
                return;
            }
            
            // Otherwise, redirect
            window.location.href = '../petit pain bakery_customization_view/index.html';
        });
    });
});
