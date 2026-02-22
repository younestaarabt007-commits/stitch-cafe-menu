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
    
    // Check if RTL mode is active
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    
    // Create infinite loop by duplicating cards
    function createInfiniteLoop() {
      const originalCards = Array.from(cards);
      const totalCards = originalCards.length;
      
      // Clone all cards and append them to create infinite effect
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        container.appendChild(clone);
      });
      
      // Clone all cards again and prepend them
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        container.insertBefore(clone, container.firstChild);
      });
      
      // Set initial scroll position to show original cards
      const initialScroll = isRTL 
        ? container.scrollWidth - container.clientWidth - (totalCards * itemWidth)
        : totalCards * itemWidth;
      
      container.scrollLeft = initialScroll;
      currentIndex = totalCards;
      
      console.log(`Created infinite loop with ${totalCards} original cards, starting at index ${currentIndex}`);
    }
    
    // Create infinite loop
    createInfiniteLoop();
    
    // Start continuous auto-scroll
    carouselInterval = setInterval(() => {
      currentIndex++;
      let targetScroll;
      
      if (isRTL) {
        // For RTL, calculate scroll from the right
        const maxScroll = container.scrollWidth - container.clientWidth;
        targetScroll = maxScroll - (currentIndex * itemWidth);
      } else {
        // For LTR, normal left-to-right scrolling
        targetScroll = currentIndex * itemWidth;
      }
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      console.log(`Carousel auto-scrolled to card ${currentIndex + 1} (RTL: ${isRTL})`);
      
      // Handle infinite loop - reset when reaching cloned cards
      setTimeout(() => {
        const totalOriginalCards = cards.length / 3; // We have 3 sets: prepended, original, appended
        
        if (currentIndex >= totalOriginalCards * 2) {
          // We've reached the end of appended cards, jump back to original set
          const resetScroll = isRTL 
            ? container.scrollWidth - container.clientWidth - (totalOriginalCards * itemWidth)
            : totalOriginalCards * itemWidth;
          
          container.scrollLeft = resetScroll;
          currentIndex = totalOriginalCards;
          console.log('Reset to original card set for seamless loop');
        } else if (currentIndex < totalOriginalCards) {
          // We've reached the beginning of prepended cards, jump to original set
          const resetScroll = isRTL 
            ? container.scrollWidth - container.clientWidth - (totalOriginalCards * itemWidth)
            : totalOriginalCards * itemWidth;
          
          container.scrollLeft = resetScroll;
          currentIndex = totalOriginalCards;
          console.log('Reset to original card set for seamless loop');
        }
      }, 350); // Wait for scroll animation to complete
      
    }, 3000);
    
    console.log('Carousel running continuously in background');
  }
  
  // Function to restart carousel when RTL changes
  function restartCarouselOnRTLChange() {
    // Stop current carousel
    if (carouselInterval) {
      clearInterval(carouselInterval);
      isRunning = false;
    }
    
    // Restart with new RTL setting
    setTimeout(startCarouselImmediately, 100);
  }
  
  // Watch for RTL changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
        console.log('RTL direction changed, restarting carousel...');
        restartCarouselOnRTLChange();
      }
    });
  });
  
  // Start observing the document element for dir attribute changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir']
  });
  
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