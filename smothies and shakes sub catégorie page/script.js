const products = [
  { id: "smoothie_shake_1", name: "Green Detox", description: "Spinach & Apple", price: 9.50, image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600&q=80", category: "fruit" },
  { id: "smoothie_shake_2", name: "Choco Malt", description: "Chocolate Malt Shake", price: 7.50, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80", category: "indulgent" },
  { id: "smoothie_shake_3", name: "Berry Cream", description: "Indulgent Berry Shake", price: 8.25, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&h=600&q=80", category: "indulgent" },
  { id: "smoothie_shake_4", name: "Tropical Mango", description: "Fresh mango, pineapple", price: 7.50, image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&h=600&q=80", category: "fruit" },
  { id: "smoothie_shake_5", name: "Wild Berry", description: "Blueberry, raspberry", price: 7.00, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&h=600&q=80", category: "fruit" },
  { id: "smoothie_shake_6", name: "Green Glow", description: "Kale, avocado, lime", price: 8.00, image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600&q=80", category: "fruit" },
  { id: "smoothie_shake_7", name: "Oreo Blast", description: "Cookies, cream", price: 6.50, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80", category: "indulgent" }
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
    <div onclick="redirectToCustomization('${product.id}')" class="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-[16px] border border-zinc-100 dark:border-zinc-700 shadow-sm fade-in transition-transform active:scale-95 cursor-pointer" style="animation-delay: ${index * 0.05}s">
      <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
      <div class="flex-1">
        <h4 class="font-semibold text-[16px]">${product.name}</h4>
        <p class="text-[11px] text-zinc-500 dark:text-zinc-300 mt-0.5">${product.description}</p>
        <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
      </div>
      <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="size-8 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-transform active:scale-95">
        <span class="material-symbols-outlined text-[20px]">add</span>
      </button>
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
  if(btn) {
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
              <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="size-8 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-transform active:scale-95">
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
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
