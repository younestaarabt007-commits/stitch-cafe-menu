const products = [
  { id: "toast_1", name: "Signature Benedict", description: "Poached eggs, hollandaise", price: 14.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/0a928a23c6c3fb861e9c4ec54ae78b7d.jpg", category: "eggs" },
  { id: "toast_2", name: "Truffle Omelette", description: "Mushrooms, truffle oil", price: 12.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/3f108fda33cdb811f37bf5dc2035c3dc.jpg", category: "eggs" },
  { id: "toast_3", name: "Shakshuka", description: "Tomato, peppers, eggs", price: 11.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/5d9c920def5bef64b91715b917d667b2.jpg", category: "eggs" },
  { id: "toast_4", name: "Avocado Toast", description: "Sourdough, smashed avo", price: 10.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/5ec903108923b0eda69e0de6ab77a1f3.jpg", category: "toast" },
  { id: "toast_5", name: "Classic Benedict", description: "Ham, hollandaise", price: 13.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/62e25e1c33624e2bc57b6e4531a36dc5.jpg", category: "eggs" },
  { id: "toast_6", name: "Vegan Power Bowl", description: "Grains, greens", price: 12.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/69c52da929160d633bd0def179265173.jpg", category: "vegan" },
  { id: "toast_7", name: "Mediterranean", description: "Feta, olives, tomatoes", price: 11.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/89648609962eda9536c1eecdedbdf8ef.jpg", category: "eggs" },
  { id: "toast_8", name: "Steak & Eggs", description: "Grilled ribeye, sunny-side", price: 18.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/eb058f0421ae783ed7c55319ca504911.jpg", category: "eggs" }
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
  // Ensure we pass the price so the customization page knows the base price
  const url = `../toast_brunch_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
  window.location.href = url;
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
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1 flex flex-col">
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">$${product.price.toFixed(2)}</span>
                    <button class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
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
