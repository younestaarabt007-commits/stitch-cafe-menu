const products = [
  { id: "smoothie_shake_1", name: "smoothie-green-detox", description: "Spinach & Apple", price: 9.50, image: "../assets/smoothie-green-detox.jpg", category: "fruit" },
  { id: "smoothie_shake_2", name: "smoothie-choco-malt", description: "Chocolate Malt Shake", price: 7.50, image: "../assets/smoothie-choco-malt.jpg", category: "indulgent" },
  { id: "smoothie_shake_3", name: "smoothie-berry-cream", description: "Indulgent Berry Shake", price: 8.25, image: "../assets/smoothie-berry-cream.jpg", category: "indulgent" },
  { id: "smoothie_shake_4", name: "smoothie-tropical-mango", description: "Fresh mango, pineapple", price: 7.50, image: "../assets/smoothie-tropical-mango.jpg", category: "fruit" },
  { id: "smoothie_shake_5", name: "raspberry-smoothie_1150-18529", description: "Blueberry, raspberry", price: 7.00, image: "../assets/raspberry-smoothie_1150-18529.jpg", category: "fruit" },
  { id: "smoothie_shake_6", name: "smoothie-green-power", description: "Kale, avocado, lime", price: 8.00, image: "../assets/smoothie-green-power.jpg", category: "fruit" },
  { id: "smoothie_shake_7", name: "shake-vanilla-bean", description: "Cookies, cream", price: 6.50, image: "../assets/shake-vanilla-bean.jpg", category: "indulgent" },
  { id: "smoothie_shake_8", name: "Blue Berry Smoothie", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "../images/sub catégorie images/smoothie/Blue Berry Smoothie.jpg", category: "fruit" },
  { id: "smoothie_shake_9", name: "Milkshake Oreo", description: "Oreo cookie indulgence", price: 5.00, image: "../images/sub catégorie images/milshake/Milkshake Oreo.jpg", category: "indulgent" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
function redirectToCustomization(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  window.location.href = `../smothie customisation review/index.html?price=${product.price}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}`;
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  if (!list) return;

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  if (filteredProducts.length === 0) {
    list.innerHTML = '<div class="col-span-2 text-center py-8 text-gray-500">No products found in this category</div>';
    return;
  }

  list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full h-32 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');">
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
            </div>
            <div class="flex-1 flex flex-col px-1">
                <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${product.name}</h4>
                <div class="flex items-center gap-1.5 mb-2">
                    <div class="flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-[#FFC107] text-[12px]">star</span>
                        <span class="text-[10px] font-bold text-green-700 dark:text-green-300">4.8</span>
                    </div>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500">(2.3k+)</span>
                </div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">${product.description}</p>
                <div class="flex items-center justify-between gap-2 mt-auto">
                    <span class="text-primary font-extrabold text-[14px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[64px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
  redirectToCustomization(productId);
}

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
      }
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );

      const list = document.getElementById('product-list');
      if (!list) return;

      if (filtered.length === 0) {
        list.innerHTML = '<div class="text-center py-8 text-gray-500">No products found</div>';
        return;
      }

      list.innerHTML = filtered.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-[16px] border border-zinc-100 dark:border-zinc-700 shadow-sm fade-in transition-transform active:scale-95 cursor-pointer" style="animation-delay: ${index * 0.05}s">
              <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
              <div class="flex-1">
                <h4 class="font-semibold text-[16px]">${product.name}</h4>
                <p class="text-[11px] text-zinc-500 dark:text-zinc-300 mt-0.5">${product.description}</p>
                <p class="font-bold text-primary mt-1 text-sm">${product.price.toFixed(2)}DH</p>
              </div>
              <button onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
            </div>
          `).join('');
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
      });
      e.currentTarget.classList.remove('bg-white', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
      e.currentTarget.classList.add('active', 'bg-primary', 'text-white');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
