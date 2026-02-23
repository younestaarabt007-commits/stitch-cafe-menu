const products = [
  { id: "sweet_pastry_1", name: "Butter Croissant", description: "Flaky layers, French butter", price: 4.50, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", category: "croissant" },
  { id: "sweet_pastry_2", name: "Almond Croissant", description: "Frangipane, toasted almond", price: 5.25, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", category: "croissant" },
  { id: "sweet_pastry_3", name: "Chocolate Éclair", description: "Choux pastry, rich ganache", price: 4.75, image: "https://images.unsplash.com/photo-1612203985729-1c7901925a1b?auto=format&fit=crop&w=600&q=80", category: "cake" },
  { id: "sweet_pastry_4", name: "Strawberry Tart", description: "Vanilla custard, fresh berries", price: 5.80, image: "https://images.unsplash.com/photo-1563729760304-b968c7a44f97?auto=format&fit=crop&w=600&q=80", category: "tart" },
  { id: "sweet_pastry_5", name: "Lemon Meringue Tart", description: "Zesty curd, torched meringue", price: 5.90, image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80", category: "tart" },
  { id: "sweet_pastry_6", name: "Velvet Cake Slice", description: "Moist crumb, vanilla frosting", price: 4.95, image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80", category: "cake" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  updateGlobalCartCount();
});

// Navigate to customization page
    function redirectToCustomization(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const name = product.name;
        const price = product.price;
        const url = `../sweet_pastries_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
        window.location.href = url;
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
            btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
            setTimeout(() => {
                btn.innerHTML = originalContent;
            }, 1000);
        }
    }

    function renderProducts(filter = 'all') {
        const list = document.getElementById('product-list');
        if (!list) return;
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" style="background-image:url('${product.image}')" data-name="${product.name}" data-price="${product.price}"></div>
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">$${product.price.toFixed(2)}</span>
                    <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform">ADD</button>
                </div>
            </div>
        `).join('');
    }

function setupEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
      });
  }
  
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) searchBtn.addEventListener('click', () => alert('Search coming soon'));
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
