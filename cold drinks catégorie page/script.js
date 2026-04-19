const products = [
  { id: 1, name: "Cocktail Purple Berry Lime", description: "Purple berry and lime cocktail", price: 8.50, image: "../images/sub catégorie images/cold drinks/Coktail purple berry lime .jpg", category: "cocktails" },
  { id: 2, name: "Cold Pomelo Mouse", description: "Refreshing pomelo drink", price: 7.00, image: "../images/sub catégorie images/cold drinks/Cold Ponplemouse .jpg", category: "fresh" },
  { id: 3, name: "Miami Cocktail", description: "Tropical Miami style cocktail", price: 9.00, image: "../images/sub catégorie images/cold drinks/Miami Coktail.jpg", category: "cocktails" },
  { id: 4, name: "Mokhito", description: "Classic mojito mint cocktail", price: 8.00, image: "../images/sub catégorie images/cold drinks/Mokhito.jpg", category: "cocktails" },
  { id: 5, name: "Tropical Drink", description: "Tropical fruit punch", price: 7.50, image: "../images/sub catégorie images/cold drinks/Tripical Drink.jpg", category: "fresh" },
  { id: 6, name: "Wild Berry Drink", description: "Mixed wild berries drink", price: 7.00, image: "../images/sub catégorie images/cold drinks/Wild Berry Drink.jpg", category: "fresh" },
  { id: 7, name: "Coca Cola", description: "Classic Coca Cola", price: 3.00, image: "../images/sub catégorie images/cold drinks/Coka Cola.jpg", category: "sodas" },
  { id: 8, name: "Sprite", description: "Refreshing Sprite", price: 3.00, image: "../images/sub catégorie images/cold drinks/Sprite.jpg", category: "sodas" },
  { id: 9, name: "Hawaii", description: "Tropical Hawaii drink", price: 5.00, image: "../images/sub catégorie images/cold drinks/Hawei.jpg", category: "fresh" }
];

const translations = {
  en: {
    cold_drinks: "Cold Drinks",
    fresh_drinks: "Fresh Drinks",
    subtitle: "Chilled, refreshing, handcrafted",
    all: "All",
    cocktails: "Cocktails",
    fresh: "Fresh",
    sodas: "Sodas"
  },
  fr: {
    cold_drinks: "Boissons Froides",
    fresh_drinks: "Boissons Fraiches",
    subtitle: "Frais, rafraîchissant, artisanal",
    all: "Tout",
    cocktails: "Cocktails",
    fresh: "Frais",
    sodas: "Sodas"
  }
};

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

function redirectToCustomization(productId) {
  const product = products.find(p => String(p.id) === String(productId));
  if (!product) return;
  window.location.href = `../cold_drink_customization_view/index.html?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${product.price}`;
}

function addToCart(productId) {
  redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full h-44 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');">
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
                    <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c]" style="color: white !important;" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
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
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}