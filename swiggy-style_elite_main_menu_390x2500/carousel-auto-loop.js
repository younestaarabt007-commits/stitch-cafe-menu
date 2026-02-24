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
    // Define itemWidth as let so we can update it after cleaning clones
    let itemWidth;
    let currentIndex = 0;
    
    // Clear any existing interval
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    
    // Check if RTL mode is active
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    
    // Create infinite loop by duplicating cards
    function createInfiniteLoop() {
      // Clean up any existing clones first to prevent exponential growth
      const existingClones = container.querySelectorAll('.clone-card');
      existingClones.forEach(el => el.remove());

      // Get only original cards (exclude any clones if they somehow persist)
      const originalCards = Array.from(container.children).filter(c => !c.classList.contains('clone-card'));
      
      if (originalCards.length === 0) return;

      const totalCards = originalCards.length;
      
      // Calculate itemWidth from an original card BEFORE cloning
      const firstCard = originalCards[0];
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(container);
      const gap = parseFloat(style.gap) || 16;
      itemWidth = cardWidth + gap; // Update the outer scope variable
      
      // Clone all cards and append them to create infinite effect
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-card'); // Mark as clone
        clone.style.display = ''; 
        container.appendChild(clone);
      });
      
      // Clone all cards again and prepend them
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-card'); // Mark as clone
        clone.style.display = '';
        container.insertBefore(clone, container.firstChild);
      });
      
      // Set initial scroll position to show original cards
      // Use scrollTo for reliable cross-browser positioning without page jump
      const startCard = container.children[totalCards];
      if (startCard) {
        // container.scrollLeft = startCard.offsetLeft;
        container.scrollTo({
          left: startCard.offsetLeft,
          behavior: 'auto'
        });
      }
      currentIndex = totalCards;
      
      console.log(`Created infinite loop with ${totalCards} original cards, starting at index ${currentIndex}`);
    }
    
    // Create infinite loop
    createInfiniteLoop();

    // User interaction handling
    let userInteracting = false;
    let interactionTimeout;

    const pauseAutoScroll = () => {
      userInteracting = true;
      if (interactionTimeout) clearTimeout(interactionTimeout);
    };

    const resumeAutoScroll = () => {
      interactionTimeout = setTimeout(() => {
        userInteracting = false;
      }, 5000); // Resume after 5 seconds of inactivity
    };

    // Add event listeners for user interaction
    container.addEventListener('touchstart', pauseAutoScroll, { passive: true });
    container.addEventListener('touchmove', pauseAutoScroll, { passive: true });
    container.addEventListener('touchend', resumeAutoScroll, { passive: true });
    container.addEventListener('mousedown', pauseAutoScroll);
    container.addEventListener('mousemove', pauseAutoScroll);
    container.addEventListener('mouseup', resumeAutoScroll);
    container.addEventListener('mouseleave', resumeAutoScroll);
    container.addEventListener('scroll', pauseAutoScroll, { passive: true });
    
    // Start continuous auto-scroll
    carouselInterval = setInterval(() => {
      if (userInteracting) return;

      // Check if container is in viewport to prevent forced scrolling when user is down the page
      const rect = container.getBoundingClientRect();
      const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);
      
      if (!isVisible) {
        // console.log('Carousel out of view, skipping auto-scroll');
        return;
      }

      currentIndex++;
      
      // Use scrollTo on container instead of scrollIntoView to prevent page scrolling
      const targetCard = container.children[currentIndex];
      if (targetCard) {
        // Calculate the scroll position to center the card or align it
        // For simple carousel, we can just scroll to the card's offsetLeft
        // But we need to account for RTL if necessary, though offsetLeft is usually from left
        
        // In RTL, scrollLeft is negative or works differently depending on browser
        // For simplicity and robustness, we can just use the card's offsetLeft
        // container.scrollLeft = targetCard.offsetLeft; 
        
        // Better: use scrollTo with behavior
        container.scrollTo({
          left: targetCard.offsetLeft,
          behavior: 'smooth'
        });
      }
      
      console.log(`Carousel auto-scrolled to card ${currentIndex} (RTL: ${isRTL})`);
      
      // Handle infinite loop - reset when reaching cloned cards
      setTimeout(() => {
        // Calculate total original cards dynamically as cards.length includes clones
        const currentTotalCards = container.children.length;
        const totalOriginalCards = currentTotalCards / 3; 
        
        if (currentIndex >= totalOriginalCards * 2) {
          // We've reached the end of appended cards, jump back to original set
          currentIndex = totalOriginalCards;
          const resetCard = container.children[currentIndex];
          if (resetCard) {
            // Instant jump without animation
            container.scrollTo({
              left: resetCard.offsetLeft,
              behavior: 'auto'
            });
          }
          console.log('Reset to original card set for seamless loop');
        }
      }, 500); // Wait for scroll animation to complete
      
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