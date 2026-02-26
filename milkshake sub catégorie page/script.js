const products = [
  {
    id: "milkshake_1",
    name: "Classic Chocolate Fudge",
    description: "Double dark chocolate with whipped cream",
    calories: "450 kcal",
    price: 6.50,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/milkshake.jpg",
    category: "chocolate"
  },
  {
    id: "milkshake_2",
    name: "Wild Strawberry Swirl",
    description: "Fresh farm berries with creamy vanilla base",
    calories: "380 kcal",
    price: 7.25,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/shake-strawberry.jpg",
    category: "fruit"
  },
  {
    id: "milkshake_3",
    name: "Peanut Butter Power",
    description: "Protein rich shake with roasted peanuts",
    calories: "520 kcal",
    price: 8.00,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/shake-banana-caramel.jpg",
    category: "protein"
  },
  {
    id: "milkshake_4",
    name: "Blueberry Vanilla Mist",
    description: "Antioxidant blast with premium vanilla bean",
    calories: "340 kcal",
    price: 7.50,
    image: "../swiggy-style_elite_main_menu_390x2500/assets/shake-vanilla-bean.jpg",
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
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');" data-name="${product.name}" data-price="${product.price}"></div>
            <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
            <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
            <div class="flex items-center justify-between mt-auto">
                <span class="text-primary font-bold text-[15px]">$${product.price.toFixed(2)}</span>
                <button class="w-[72px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
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
