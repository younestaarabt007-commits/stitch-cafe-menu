const products = [
  { id: 1, name: "Ceremonial Matcha", description: "Stone-ground, umami-rich", price: 12.00, image: "https://images.unsplash.com/photo-1520986438870-2e27b2b88a4d?q=80&w=500&auto=format&fit=crop", category: "matcha" },
  { id: 2, name: "Masala Chai", description: "Spiced, creamy, warming", price: 5.50, image: "https://images.unsplash.com/photo-1604908554112-46d5772f4a2d?q=80&w=500&auto=format&fit=crop", category: "herbal" },
  { id: 3, name: "Ginger Lemon", description: "Zesty, soothing infusion", price: 4.75, image: "https://images.unsplash.com/photo-1513639725746-9baf0f0b33a3?q=80&w=500&auto=format&fit=crop", category: "herbal" },
  { id: 4, name: "Moroccan Mint", description: "Cooling green tea", price: 4.50, image: "https://images.unsplash.com/photo-1595974732096-0f5f9c1a5f06?q=80&w=500&auto=format&fit=crop", category: "herbal" },
  { id: 5, name: "Royal Milk Tea", description: "Black tea, milk, caramel", price: 7.00, image: "https://images.unsplash.com/photo-1532634726-240e47cb5d1a?q=80&w=500&auto=format&fit=crop", category: "iced" },
  { id: 6, name: "Iced Peach Oolong", description: "Fruity, floral, chilled", price: 6.50, image: "https://images.unsplash.com/photo-1515512965560-0b814a59fdf8?q=80&w=500&auto=format&fit=crop", category: "iced" }
];

let cart = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
    function redirectToCustomization(productId) {
        const product = products.find(p => p.id === productId);
        const name = product ? product.name : '';
        const url = `../tea_customization_view/index.html?name=${encodeURIComponent(name)}`;
        window.location.href = url;
    }

    // Deprecated: Direct add to cart (kept for reference)
    function addToCart(productId) {
        redirectToCustomization(productId);
        /*
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) existingItem.quantity += 1;
        else cart.push({ ...product, quantity: 1 });
        updateCart();
        */
    }

    function renderProducts(filter = 'all') {
        const list = document.getElementById('product-list');
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization(${product.id})" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" style="background-image:url('${product.image}')" data-name="${product.name}"></div>
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">$${product.price.toFixed(2)}</span>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform">ADD</button>
                </div>
            </div>
        `).join('');
        // Removed separate click listener for product-image as the whole card is now clickable
    }

function updateCart() {
  const floatingCart = document.getElementById('floating-cart');
  const cartTotalEl = document.getElementById('cart-total');
  const cartItemsText = document.getElementById('cart-items-text');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (count > 0) {
    floatingCart.classList.remove('hidden');
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartItemsText.textContent = `${count} Item${count !== 1 ? 's' : ''}`;
  } else {
    floatingCart.classList.add('hidden');
  }
}

function setupEventListeners() {
  document.getElementById('back-btn').addEventListener('click', () => window.history.back());
  document.getElementById('search-btn').addEventListener('click', () => alert('Search coming soon'));
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
