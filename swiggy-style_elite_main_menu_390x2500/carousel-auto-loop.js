// Simple carousel auto-scroll - reliable and fast
(function() {
  let autoScrollInterval;
  
  function initCarousel() {
    const container = document.querySelector('#hero-carousel .flex');
    if (!container) {
      console.log('Carousel container not found');
      return;
    }
    
    const cards = container.children;
    if (cards.length === 0) {
      console.log('No cards found');
      return;
    }
    
    console.log('Starting carousel with', cards.length, 'cards');
    
    let currentIndex = 0;
    
    // Clear any existing interval
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    
    // Auto-scroll function
    function autoScroll() {
      currentIndex++;
      if (currentIndex >= cards.length) {
        currentIndex = 0;
      }
      
      const targetCard = cards[currentIndex];
      if (targetCard) {
        targetCard.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
    
    // Start auto-scroll every 3 seconds
    autoScrollInterval = setInterval(autoScroll, 3000);
    
    // Handle user interaction - pause on hover/touch
    let isPaused = false;
    
    container.addEventListener('mouseenter', () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        isPaused = true;
      }
    });
    
    container.addEventListener('mouseleave', () => {
      if (isPaused) {
        autoScrollInterval = setInterval(autoScroll, 3000);
        isPaused = false;
      }
    });
    
    container.addEventListener('touchstart', () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        isPaused = true;
      }
    });
    
    container.addEventListener('touchend', () => {
      setTimeout(() => {
        if (isPaused) {
          autoScrollInterval = setInterval(autoScroll, 3000);
          isPaused = false;
        }
      }, 2000);
    });
    
    console.log('Carousel auto-scroll started successfully');
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
  
  // Retry if needed
  setTimeout(initCarousel, 1000);
  
})();