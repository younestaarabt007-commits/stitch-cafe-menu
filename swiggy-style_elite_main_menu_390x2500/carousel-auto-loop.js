// Immediate carousel auto-start - runs continuously without any visible controls
(function() {
  let carouselInterval;
  let isRunning = false;
  
  function startCarouselImmediately() {
    if (isRunning) return; // Prevent multiple starts
    
    const container = document.querySelector('#hero-carousel .flex');
    if (!container) {
      console.log('Carousel not ready, will retry...');
      setTimeout(startCarouselImmediately, 500);
      return;
    }
    
    const cards = container.children;
    if (cards.length === 0) {
      console.log('No cards found, will retry...');
      setTimeout(startCarouselImmediately, 500);
      return;
    }
    
    console.log('Starting immediate carousel with', cards.length, 'cards');
    isRunning = true;
    
    // Get card dimensions
    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;
    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.gap) || 16;
    const itemWidth = cardWidth + gap;
    
    let currentIndex = 0;
    
    // Clear any existing interval
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    
    // Start continuous auto-scroll
    carouselInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      const targetScroll = currentIndex * itemWidth;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      console.log(`Carousel auto-scrolled to card ${currentIndex + 1} of ${cards.length}`);
    }, 3000);
    
    console.log('Carousel running continuously in background');
  }
  
  // Try to start immediately when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startCarouselImmediately);
  } else {
    startCarouselImmediately();
  }
  
  // Also try again after a delay to ensure everything is loaded
  setTimeout(startCarouselImmediately, 2000);
  
  // Keep trying until successful
  const retryInterval = setInterval(() => {
    if (isRunning) {
      clearInterval(retryInterval);
    } else {
      startCarouselImmediately();
    }
  }, 1000);
  
})();