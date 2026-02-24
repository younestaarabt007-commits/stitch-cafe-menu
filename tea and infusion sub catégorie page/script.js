const products = [
  { id: "tea_1", name: "Ceremonial Matcha", description: "Stone-ground, umami-rich", price: 12.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-matcha.jpg", category: "matcha" },
  { id: "tea_2", name: "Masala Chai", description: "Spiced, creamy, warming", price: 5.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-masala-chai.jpg", category: "herbal" },
  { id: "tea_3", name: "Ginger Lemon", description: "Zesty, soothing infusion", price: 4.75, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-ginger-lemon.jpg", category: "herbal" },
  { id: "tea_4", name: "Moroccan Mint", description: "Cooling green tea", price: 4.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-moroccan-mint.jpg", category: "herbal" },
  { id: "tea_5", name: "Royal Milk Tea", description: "Black tea, milk, caramel", price: 7.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-royal-milk.jpg", category: "iced" },
  { id: "tea_6", name: "Iced Peach Oolong", description: "Fruity, floral, chilled", price: 6.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-iced-peach.jpg", category: "iced" },
  { id: "tea_7", name: "Lavender Earl Grey", description: "Classic bergamot twist", price: 5.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea-lavender-earl.jpg", category: "herbal" }
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
        const url = `../tea_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
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
                <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" style="background-image:url('${product.image}')" data-name="${product.name}"></div>
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
