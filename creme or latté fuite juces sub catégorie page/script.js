// Product Data
const products = [
  { id: 1, name: "Creamy Orange Latte", description: "Fresh orange with milk foam", price: 5.50, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCREAMY-ORANGE", category: "creamy" },
  { id: 2, name: "Citrus Spark", description: "Lemon-lime with mint", price: 4.25, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCITRUS-SPARK", category: "citrus" },
  { id: 3, name: "Mango Cream Fizz", description: "Mango puree and light cream", price: 5.75, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMANGO-CREAM", category: "creamy" },
  { id: 4, name: "Classic Apple Juice", description: "Cold pressed apples", price: 4.00, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAPPLE-JUICE", category: "classic" },
  { id: 5, name: "Berry Citrus", description: "Strawberry and grapefruit", price: 5.20, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBERRY-CITRUS", category: "citrus" },
];

// Cart State
let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  list.innerHTML = filteredProducts.map((product, index) => `
    <div class="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-[16px] border border-zinc-100 dark:border-zinc-700 shadow-sm fade-in transition-transform active:scale-95" style="animation-delay: ${index * 0.05}s">
      <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
      <div class="flex-1">
        <h4 class="font-semibold text-[16px]">${product.name}</h4>
        <p class="text-[11px] text-zinc-500 dark:text-zinc-300 mt-0.5">${product.description}</p>
        <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
      </div>
      <button onclick="addToCart(${product.id})" class="size-8 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-transform active:scale-95">
        <span class="material-symbols-outlined text-[20px]">add</span>
      </button>
    </div>
  `).join('');
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Update Cart Display
function updateCart() {
  const floatingCart = document.getElementById('floating-cart');
  const cartTotal = document.getElementById('cart-total');
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsText = document.getElementById('cart-items-text');

  if (cart.length > 0) {
    floatingCart.classList.remove('hidden');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartBadge.textContent = count;
    cartItemsText.textContent = `${count} Item${count !== 1 ? 's' : ''}`;
  } else {
    floatingCart.classList.add('hidden');
  }
}

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back();
  });
  document.getElementById('search-btn').addEventListener('click', () => {
    alert('Search functionality would open here');
  });
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
  document.getElementById('floating-cart').addEventListener('click', () => {
    alert(`Cart contains ${cart.length} items`);
  });
}
