const products = [
  { id: 1, name: "Classic Latte", description: "Double shot, steamed milk", price: 4.80, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop", category: "classic" },
  { id: 2, name: "Vanilla Latte", description: "House vanilla syrup", price: 5.10, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop", category: "flavored" },
  { id: 3, name: "Caramel Latte", description: "Buttery caramel drizzle", price: 5.10, image: "https://images.unsplash.com/photo-1547234063-3a9ffc8ef9a7?q=80&w=500&auto=format&fit=crop", category: "flavored" },
  { id: 4, name: "Pumpkin Spice Latte", description: "Seasonal spices & puree", price: 5.40, image: "https://images.unsplash.com/photo-1631900161776-9de35f9d5fbe?q=80&w=500&auto=format&fit=crop", category: "seasonal" },
];

let cart = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
    function redirectToCustomization(productId) {
        window.location.href = '../latte_customization_view_2/index.html';
    }

    // Deprecated: Direct add to cart (kept for reference)
    function addToCart(productId) {
        redirectToCustomization(productId);
        /*
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        */
    }

    function renderProducts(filter = 'all') {
        const list = document.getElementById('product-list');
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization(${product.id})" class="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-[16px] border border-zinc-100 dark:border-zinc-700 shadow-sm fade-in transition-transform active:scale-95 cursor-pointer" style="animation-delay: ${index * 0.05}s">
                <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
                <div class="flex-1">
                    <h4 class="font-semibold text-[16px]">${product.name}</h4>
                    <p class="text-[11px] text-zinc-500 dark:text-zinc-300 mt-0.5">${product.description}</p>
                    <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
                </div>
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="size-8 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-transform active:scale-95">
                    <span class="material-symbols-outlined text-[20px]">add</span>
                </button>
            </div>
        `).join('');
    }

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
