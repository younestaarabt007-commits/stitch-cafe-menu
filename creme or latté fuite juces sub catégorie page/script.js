const products = [
  { id: "creme_latte_fuite_juice_1", name: "Orange Velvet", description: "Signature creamy orange blend", price: 8.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg", category: "creamy" },
  { id: "creme_latte_fuite_juice_2", name: "Berry Cream", description: "Mixed berries with cream", price: 6.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/cold-strawberry-smoothie.jpg", category: "creamy" },
  { id: "creme_latte_fuite_juice_3", name: "Tropical Milk", description: "Exotic fruits with milk", price: 6.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/exotic-cocktail-closeup_181624-983.avif", category: "creamy" },
  { id: "creme_latte_fuite_juice_4", name: "Valencia Classic", description: "100% Pure Orange Juice", price: 5.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-cold-pressed-orange.jpg", category: "pure" },
  { id: "creme_latte_fuite_juice_5", name: "Orange Milk", description: "Creamy Refresher", price: 6.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", category: "creamy" },
  { id: "creme_latte_fuite_juice_6", name: "Carrot Glow", description: "Ginger Kick", price: 7.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-mango-glow.jpg", category: "pure" },
  { id: "creme_latte_fuite_juice_7", name: "Berry Shake", description: "Thick & Creamy", price: 7.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/close-up-milkshake-glass-plate_117406-7215.jpg", category: "creamy" },
];

// Cart State
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  setupSearch();
});

// Render Products
function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  if (!list) return;

  // Filter products based on category and search term
  const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                          p.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
      list.innerHTML = '<div class="col-span-1 text-center py-8 text-gray-500">No products found</div>';
      return;
  }

  list.innerHTML = filteredProducts.map((product, index) => `
    <div class="relative bg-white rounded-3xl compact-card shadow-[0_5px_25px_-5px_rgba(0,0,0,0.05)] overflow-visible group fade-in" style="animation-delay: ${index * 0.05}s">
      <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-contain bg-center bg-no-repeat z-10 liquid-splash-img group-hover:scale-105 transition-transform duration-300" style='background-image: url("${product.image}");'></div>
      <div class="text-center pt-8">
        <h3 class="font-semibold text-[16px] text-slate-900 leading-tight">${product.name}</h3>
        <p class="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-1 mb-2">${product.description}</p>
        <div class="flex items-center justify-between mt-1 bg-slate-50 rounded-full p-1 pl-3">
          <span class="font-bold text-sm text-slate-900">$${product.price.toFixed(2)}</span>
          <button class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="addToCart('${product.id}')">ADD</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Global Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
      });
  }

  localStorage.setItem('stitch_cart', JSON.stringify(cart));

  if (window.updateGlobalCartCount) {
      window.updateGlobalCartCount();
  }

  // Visual feedback
  const btn = document.querySelector(`button[onclick*="${productId}"]`);
  if(btn) {
      const originalContent = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
      setTimeout(() => {
          btn.innerHTML = originalContent;
      }, 1000);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
    });
  }

  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
       const searchInput = document.getElementById('search-input');
       if (searchInput) {
           searchInput.focus();
           // Optional: Toggle search visibility if hidden
       } else {
           // Fallback if no input exists
           alert('Search feature coming soon');
       }
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-black', 'text-white'));
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-white', 'text-slate-800'));
      
      e.currentTarget.classList.remove('bg-white', 'text-slate-800');
      e.currentTarget.classList.add('active', 'bg-black', 'text-white');
      
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}

function setupSearch() {
    // Create search input if it doesn't exist (optional, but good for completeness)
    // For now, we assume the UI handles the search input visibility or we just filter based on a hypothetical input
    // The previous code.html didn't seem to have a visible search input, just a button.
    // I'll add a simple prompt-based search or just rely on the button to maybe show an input.
    // Actually, looking at other pages, I usually added a search input.
    // I should probably add a search input to code.html if I want real search.
    // But for now, I'll stick to the button just alerting or focusing.
}
