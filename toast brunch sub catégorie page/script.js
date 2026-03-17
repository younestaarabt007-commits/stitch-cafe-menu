const products = [
  { id: "toast_1", name: "Toast Champignon Frommage", description: "Poached eggs, hollandaise", price: 14.50, image: "../images/sub catégorie images/toast/Toast Champignon Frommage.jpg", category: "eggs" },
  { id: "toast_2", name: "Toast Frittata", description: "Mushrooms, truffle oil", price: 12.50, image: "../images/sub catégorie images/toast/Toast Frittata.jpg", category: "eggs" },
  { id: "toast_3", name: "Pumpkin Stew", description: "Tomato, peppers, eggs", price: 11.25, image: "../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg", category: "eggs" },
  { id: "toast_4", name: "toast", description: "Sourdough, smashed avo", price: 10.50, image: "../images/sub catégorie images/toast/toast.jpg", category: "toast" },
  { id: "toast_5", name: "croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329", description: "Ham, hollandaise", price: 13.50, image: "../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", category: "eggs" },
  { id: "toast_6", name: "Toast Vegan", description: "Grains, greens", price: 12.00, image: "../images/sub catégorie images/toast/Toast Vegan.jpg", category: "vegan" },
  { id: "toast_7", name: "Salade Espagnol", description: "Feta, olives, tomatoes", price: 11.00, image: "../images/sub catégorie images/Brunch food/Salade Espagnol.jpg", category: "eggs" }
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
  const name = product.name;
  const price = product.price;
  const image = product.image;
  // Ensure we pass the price so the customization page knows the base price
  const url = `../toast_brunch_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
  window.location.href = url;
}

function addToCart(productId) {
  redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  if (!list) return;

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

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
                <div class="flex items-center justify-between gap-2 mt-auto">
                    <span class="text-primary font-extrabold text-[14px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[64px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit" onclick="event.stopPropagation(); redirectToCustomization('${product.id}')">ADD</button>
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
