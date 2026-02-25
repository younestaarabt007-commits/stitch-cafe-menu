
document.addEventListener("DOMContentLoaded", function() {
    // Check if nav already exists to prevent duplicates
    if (document.querySelector("nav.standard-nav-bar")) return;

    // Remove existing legacy nav bars or floating carts
    const oldNavs = document.querySelectorAll("nav, .floating-cart, #bottom-tabbar, .fixed.bottom-0");
    oldNavs.forEach(el => el.remove());

    // Create the new nav bar
    const navHTML = `
      <nav class="standard-nav-bar bg-white dark:bg-[#2a1e19] border-t border-gray-100 dark:border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md h-[55px] md:h-[65px] flex items-stretch justify-between px-6 md:px-12 fixed bottom-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto transition-transform duration-300">
        <button onclick="window.location.href='../swiggy-style_elite_main_menu_390x2500/index.html'" class="flex-1 flex flex-col items-center justify-center gap-0.5 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[22px] md:text-[26px]">home</span>
          <span class="text-[10px] md:text-xs font-bold uppercase tracking-widest">Home</span>
        </button>
        <button onclick="window.location.href='../swiggy-style_elite_main_menu_390x2500/index.html#explore'" class="flex-1 flex flex-col items-center justify-center gap-0.5 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[22px] md:text-[26px]">category</span>
          <span class="text-[10px] md:text-xs font-bold uppercase tracking-widest">Explore</span>
        </button>
        <button onclick="window.location.href='../order_success_page/index.html'" class="relative flex-1 flex flex-col items-center justify-center gap-0.5 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[22px] md:text-[26px]">shopping_cart</span>
          <span class="text-[10px] md:text-xs font-bold uppercase tracking-widest">Cart</span>
          <span id="global-cart-count" class="absolute -top-1 right-4 md:right-8 bg-primary text-white text-[10px] md:text-xs font-bold px-1.5 py-[2px] rounded-full hidden">0</span>
        </button>
        <button onclick="alert('Profile feature coming soon')" class="flex-1 flex flex-col items-center justify-center gap-0.5 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[22px] md:text-[26px]">person</span>
          <span class="text-[10px] md:text-xs font-bold uppercase tracking-widest">Profile</span>
        </button>
      </nav>
    `;

    document.body.insertAdjacentHTML('beforeend', navHTML);

    // Scroll behavior: hide on scroll down, show on scroll up
    const navBar = document.querySelector('.standard-nav-bar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide if scrolling down and not at the very top
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navBar.classList.add('translate-y-full');
        } else {
            // Show if scrolling up
            navBar.classList.remove('translate-y-full');
        }

        lastScrollY = currentScrollY;
    });

    // Update cart count from localStorage
    updateGlobalCartCount();
});

function updateGlobalCartCount() {
    const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('global-cart-count');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}
