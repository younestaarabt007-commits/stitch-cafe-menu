const products = [
  { id: "smoothie_shake_1", name: "Green Detox", description: "Spinach & Apple", price: 9.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-green-detox.jpg", category: "fruit" },
  { id: "smoothie_shake_2", name: "Choco Malt", description: "Chocolate Malt Shake", price: 7.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-choco-malt.jpg", category: "indulgent" },
  { id: "smoothie_shake_3", name: "Berry Cream", description: "Indulgent Berry Shake", price: 8.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-berry-cream.jpg", category: "indulgent" },
  { id: "smoothie_shake_4", name: "Tropical Mango", description: "Fresh mango, pineapple", price: 7.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-tropical-mango.jpg", category: "fruit" },
  { id: "smoothie_shake_5", name: "Wild Berry", description: "Blueberry, raspberry", price: 7.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-wild-berry.jpg", category: "fruit" },
  { id: "smoothie_shake_6", name: "Green Glow", description: "Kale, avocado, lime", price: 8.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-green-glow.jpg", category: "fruit" },
  { id: "smoothie_shake_7", name: "Oreo Blast", description: "Cookies, cream", price: 6.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/shake-oreo-blast.jpg", category: "indulgent" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

function redirectToCustomization(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  window.location.href = `../smothie customisation review/index.html?price=${product.price}`;
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
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-extrabold text-[15px]">$${product.price.toFixed(2)}</span>
                    <button class="w-[72px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

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
  if (btn) {
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
    setTimeout(() => {
      btn.innerHTML = originalContent;
    }, 1000);
  }
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
                <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
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
