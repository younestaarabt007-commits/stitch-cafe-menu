(function() {
  function initCarousel() {
    const container = document.querySelector('#hero-carousel .flex');
    if (!container) return;
    
    // Check if already initialized to prevent duplicates
    if (container.getAttribute('data-init') === 'true') return;
    container.setAttribute('data-init', 'true');

    // Get original cards
    const originalCards = Array.from(container.children);
    if (originalCards.length === 0) return;

    // --- Infinite Loop Setup ---
    
    const lastCard = originalCards[originalCards.length - 1];
    const firstCard = originalCards[0];
    const secondCard = originalCards[1];
    
    // Create clones
    const cloneLast = lastCard.cloneNode(true);
    cloneLast.setAttribute('aria-hidden', 'true');
    cloneLast.classList.add('carousel-clone');
    
    const cloneFirst = firstCard.cloneNode(true);
    cloneFirst.setAttribute('aria-hidden', 'true');
    cloneFirst.classList.add('carousel-clone');
    
    let cloneSecond = null;
    if (secondCard) {
        cloneSecond = secondCard.cloneNode(true);
        cloneSecond.setAttribute('aria-hidden', 'true');
        cloneSecond.classList.add('carousel-clone');
    }

    // Insert clones
    container.prepend(cloneLast);
    container.appendChild(cloneFirst);
    if (cloneSecond) container.appendChild(cloneSecond);

    // Update list of all cards
    let allCards = Array.from(container.children);
    
    const startIndex = 1;
    const realLastIndex = originalCards.length;
    const jumpTriggerIndex = originalCards.length + 1;
    
    let currentIndex = startIndex;
    let autoScrollInterval;
    let isPerformingAutoScroll = false;
    let isVisible = true;
    let isUserScrolling = false; // New flag for global scroll detection

    // Helper to scroll to specific card index
    function scrollToCard(index, smooth = true) {
        // STRICT GUARD: If user has scrolled down the page, NEVER scroll the carousel
        // This prevents the "page jump" issue where the carousel pulls focus/scroll back up
        if (window.scrollY > 100 || isUserScrolling) return;

        const card = allCards[index];
        if (!card) return;

        const containerWidth = container.clientWidth;
        const cardWidth = card.offsetWidth;
        const cardLeft = card.offsetLeft;
        
        const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        // Use scrollLeft assignment for "instant" jumps (safer than scrollTo with behavior: auto)
        if (!smooth) {
            container.scrollLeft = targetScroll;
        } else {
            // For smooth scrolls, use scrollTo
            if (container.scrollWidth > container.clientWidth) {
                container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Set initial position instantly
    requestAnimationFrame(() => {
        scrollToCard(currentIndex, false);
    });

    function nextSlide() {
        if (isPerformingAutoScroll || !isVisible || isUserScrolling || window.scrollY > 300) return;
        
        currentIndex++;
        
        if (currentIndex >= allCards.length) {
            currentIndex = startIndex;
            scrollToCard(currentIndex, false);
            return;
        }

        scrollToCard(currentIndex, true);

        if (currentIndex === jumpTriggerIndex) {
            isPerformingAutoScroll = true;
            
            setTimeout(() => {
                currentIndex = startIndex;
                scrollToCard(currentIndex, false);
                
                setTimeout(() => {
                    isPerformingAutoScroll = false;
                }, 50);
            }, 600);
        }
    }

    // Loop Control
    function startLoop() {
        stopLoop();
        // Only start loop if user is NOT scrolling
        if (!isUserScrolling) {
            autoScrollInterval = setInterval(nextSlide, 3000);
        }
    }

    function stopLoop() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
    }

    // --- Global Scroll Detection ---
    let scrollTimeoutGlobal;
    window.addEventListener('scroll', () => {
        isUserScrolling = true;
        stopLoop(); // Stop carousel immediately when user scrolls page
        
        clearTimeout(scrollTimeoutGlobal);
        scrollTimeoutGlobal = setTimeout(() => {
            isUserScrolling = false;
            // Only resume if carousel is visible
            if (isVisible) {
                startLoop();
            }
        }, 150); // Wait for scroll to settle
    }, { passive: true });

    // --- Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && !isUserScrolling) {
                startLoop();
            } else {
                stopLoop();
            }
        });
    }, { threshold: 0.1 }); // Kept low to catch partial visibility
    
    observer.observe(container);

    // --- Interaction Handlers ---
    container.addEventListener('mouseenter', stopLoop);
    container.addEventListener('touchstart', stopLoop, { passive: true });
    
    container.addEventListener('mouseleave', () => {
        if (isVisible && !isUserScrolling) startLoop();
    });
    container.addEventListener('touchend', () => {
        if (isVisible && !isUserScrolling) setTimeout(startLoop, 2000);
    });
    
    // Sync currentIndex on manual carousel scroll
    let scrollTimeout;
    container.addEventListener('scroll', () => {
        if (isPerformingAutoScroll) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
             const center = container.scrollLeft + (container.clientWidth / 2);
             let minDiff = Infinity;
             let closest = currentIndex;
             
             allCards.forEach((card, i) => {
                 const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                 const diff = Math.abs(center - cardCenter);
                 if (diff < minDiff) {
                     minDiff = diff;
                     closest = i;
                 }
             });
             
             currentIndex = closest;
             
             if (currentIndex === jumpTriggerIndex) {
                 currentIndex = startIndex;
                 scrollToCard(currentIndex, false);
             }
             
             if (currentIndex === 0) {
                 currentIndex = realLastIndex;
                 scrollToCard(currentIndex, false);
             }
        }, 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();
