const products = [
  { id: "smoothie_1", name: "Berry Burst", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-berry-burst.jpg", category: "berry" },
  { id: "smoothie_2", name: "Green Power", description: "Spinach, apple, banana", price: 5.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/kiwi-milk-shake-table_140725-8608.jpg", category: "green" },
  { id: "smoothie_3", name: "Protein Plus", description: "Peanut, whey, banana", price: 5.80, image: "../swiggy-style_elite_main_menu_390x2500/assets/kiwi-milk-shake-table_140725-8608.jpg", category: "protein" },
  { id: "smoothie_4", name: "Tropical Smooth", description: "Mango, pineapple, coconut", price: 5.40, image: "../swiggy-style_elite_main_menu_390x2500/assets/exotic-cocktail-closeup_181624-983.avif", category: "tropical" },
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
    // Use price parameter for customization page
    window.location.href = `../smothie customisation review/index.html?price=${product.price}`;
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

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return; // Guard clause
    
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    
    const filteredProducts = products.filter(p => {
        const matchesCategory = filter === 'all' || p.category === filter;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                              p.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    if (filteredProducts.length === 0) {
        list.innerHTML = '<div class="col-span-2 text-center py-8 text-gray-500">No smoothies found</div>';
        return;
    }

    list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col gap-2 bg-white dark:bg-slate-800 p-[12px] rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-700 transition-transform active:scale-95 cursor-pointer fade-in" style="animation-delay: ${index * 0.05}s">
            <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50">
                <div class="w-full h-full bg-cover bg-center" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
                <div class="absolute top-2 left-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                    <span class="text-[10px] font-bold">$${product.price.toFixed(2)}</span>
                </div>
            </div>
            <div class="flex flex-col mt-1">
                <h4 class="font-semibold text-[16px] leading-tight">${product.name}</h4>
                <p class="text-[10px] opacity-60 line-clamp-1 mt-0.5">${product.description}</p>
            </div>
            <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="w-full h-[36px] mt-2 rounded-[12px] bg-primary flex items-center justify-center text-white text-sm font-bold shadow-md uppercase hover:bg-orange-600 transition-colors">
                ADD
            </button>
        </div>
    `).join('');
}

function setupEventListeners() {
  // Back button
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
      backBtn.onclick = () => {
          window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
      };
  }
  
  // Search input listener
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
      searchInput.addEventListener('input', () => {
          renderProducts(currentFilter);
      });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      
      // Only apply style toggling to "pill" style buttons (heuristic: has px-5 class)
      if (target.classList.contains('px-5')) {
          document.querySelectorAll('.filter-btn.px-5').forEach(b => {
              b.classList.remove('active', 'bg-primary', 'text-white');
              b.classList.add('bg-white', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
          });
          target.classList.remove('bg-white', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
          target.classList.add('active', 'bg-primary', 'text-white');
      }
      
      currentFilter = target.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
