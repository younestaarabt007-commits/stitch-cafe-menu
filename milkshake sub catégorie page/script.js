const products = [
  {
    id: 1,
    name: "Classic Chocolate Fudge",
    description: "Double dark chocolate with whipped cream",
    calories: "450 kcal",
    price: 6.50,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/shake-classic-chocolate.jpg",
    category: "chocolate"
  },
  {
    id: 2,
    name: "Wild Strawberry Swirl",
    description: "Fresh farm berries with creamy vanilla base",
    calories: "380 kcal",
    price: 7.25,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/strawberry-ice-cream-with-delights_140725-8818.jpg",
    category: "fruit"
  },
  {
    id: 3,
    name: "Peanut Butter Power",
    description: "Protein rich shake with roasted peanuts",
    calories: "520 kcal",
    price: 8.00,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-choco-malt.jpg",
    category: "protein"
  },
  {
    id: 4,
    name: "Blueberry Vanilla Mist",
    description: "Antioxidant blast with premium vanilla bean",
    calories: "340 kcal",
    price: 7.50,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/raspberry-smoothie_1150-18529.jpg",
    category: "fruit"
  }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
function redirectToCustomization(productId) {
    window.location.href = '../smothie customisation review/index.html';
}

// Add to cart (redirects to customization)
function addToCart(productId) {
    redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;
    
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    list.innerHTML = filteredProducts.map((product, index) => `
        <div class="flex items-center gap-3 rounded-[16px] bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/5 cursor-pointer transition-transform active:scale-95 fade-in" style="animation-delay: ${index * 0.05}s">
            <div class="size-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <div class="size-full bg-cover bg-center" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            </div>
            <div class="flex flex-1 flex-col pr-2">
                <h4 class="text-[16px] font-bold text-zinc-900 dark:text-white">${product.name}</h4>
                <p class="mt-0.5 line-clamp-1 text-[11px] text-zinc-500 dark:text-zinc-400">${product.description}</p>
                <p class="mt-1 text-[10px] font-medium text-zinc-400">${product.calories}</p>
            </div>
            <div class="flex shrink-0 items-center gap-3">
                <p class="text-[15px] font-extrabold text-zinc-900 dark:text-white">$${product.price.toFixed(2)}</p>
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20 transition-transform active:scale-95">
                    <span class="material-symbols-outlined text-[18px] font-bold">add</span>
                </button>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.history.back();
    });
  }
  
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Search functionality would open here');
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
