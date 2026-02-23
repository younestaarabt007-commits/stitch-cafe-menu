const products = [
  { id: 1, name: "Butter Croissant", description: "Flaky layers, French butter", price: 4.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/pastry.jpg", category: "croissant" },
  { id: 2, name: "Almond Croissant", description: "Frangipane, toasted almond", price: 5.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/pastry.jpg", category: "croissant" },
  { id: 3, name: "Chocolate Éclair", description: "Choux pastry, rich ganache", price: 4.75, image: "../swiggy-style_elite_main_menu_390x2500/assets/hero-pancakes.png", category: "cake" },
  { id: 4, name: "Strawberry Tart", description: "Vanilla custard, fresh berries", price: 5.80, image: "../swiggy-style_elite_main_menu_390x2500/assets/strawberry-ice-cream-with-delights_140725-8818.jpg", category: "tart" },
  { id: 5, name: "Lemon Meringue Tart", description: "Zesty curd, torched meringue", price: 5.90, image: "../swiggy-style_elite_main_menu_390x2500/assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg", category: "tart" },
  { id: 6, name: "Velvet Cake Slice", description: "Moist crumb, vanilla frosting", price: 4.95, image: "../swiggy-style_elite_main_menu_390x2500/assets/hero-pancakes.png", category: "cake" }
];

let cart = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
    function redirectToCustomization(productId) {
        const product = products.find(p => p.id === productId);
        const name = product ? product.name : '';
        const price = product ? product.price : '';
        const url = `../sweet_pastries_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
        window.location.href = url;
    }

    // Deprecated: Direct add to cart (kept for reference)
    function addToCart(productId) {
        redirectToCustomization(productId);
        /*
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) existingItem.quantity += 1;
        else cart.push({ ...product, quantity: 1 });
        updateCart();
        */
    }

    function renderProducts(filter = 'all') {
        const list = document.getElementById('product-list');
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization(${product.id})" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" style="background-image:url('${product.image}')" data-name="${product.name}" data-price="${product.price}"></div>
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">$${product.price.toFixed(2)}</span>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform">ADD</button>
                </div>
            </div>
        `).join('');
        // Removed separate click listener
    }

function updateCart() {
  const floatingCart = document.getElementById('floating-cart');
  const cartTotalEl = document.getElementById('cart-total');
  const cartItemsText = document.getElementById('cart-items-text');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (count > 0) {
    floatingCart.classList.remove('hidden');
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartItemsText.textContent = `${count} Item${count !== 1 ? 's' : ''}`;
  } else {
    floatingCart.classList.add('hidden');
  }
}

function setupEventListeners() {
  document.getElementById('back-btn').addEventListener('click', () => window.history.back());
  document.getElementById('search-btn').addEventListener('click', () => alert('Search coming soon'));
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
