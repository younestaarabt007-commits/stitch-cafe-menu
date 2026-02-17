const products = [
  { id: 1, name: "Fresh Orange", description: "Valencia oranges, cold pressed", price: 4.50, image: "https://images.unsplash.com/photo-1541976076758-65c1b5dc0f5b?q=80&w=500&auto=format&fit=crop", category: "citrus" },
  { id: 2, name: "Lemon Mint", description: "Zesty lemon with mint", price: 4.10, image: "https://images.unsplash.com/photo-1556745753-7e4bfc180a9f?q=80&w=500&auto=format&fit=crop", category: "citrus" },
  { id: 3, name: "Pineapple Punch", description: "Tropical pineapple blend", price: 4.80, image: "https://images.unsplash.com/photo-1547394765-185d449d6eb2?q=80&w=500&auto=format&fit=crop", category: "tropical" },
  { id: 4, name: "Apple Classic", description: "Cold-pressed apple", price: 4.00, image: "https://images.unsplash.com/photo-1568158875615-0bddd05efd0b?q=80&w=500&auto=format&fit=crop", category: "classic" },
  { id: 5, name: "Mango Glow", description: "Alphonso mango puree", price: 5.25, image: "https://images.unsplash.com/photo-1567197553646-4c084b6698a0?q=80&w=500&auto=format&fit=crop", category: "tropical" },
];

let cart = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
    function redirectToCustomization(productId) {
        window.location.href = '../orange juce_customization_view_1/index.html';
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
  document.getElementById('floating-cart').addEventListener('click', openOrderModal);
}

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  if (!modal) return;
  renderOrderSummary();
  modal.classList.remove('hidden');
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (!modal) return;
  modal.classList.add('hidden');
}

function renderOrderSummary() {
  const container = document.getElementById('order-items');
  const subtotalEl = document.getElementById('modal-subtotal');
  const taxEl = document.getElementById('modal-tax');
  const totalEl = document.getElementById('modal-total');
  const subtotal = cart.reduce((sum, x) => sum + x.price * x.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  container.innerHTML = cart.map(x => `
    <div class="flex items-center justify-between bg-zinc-50 dark:bg-black/20 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center text-primary font-bold">${x.quantity}x</div>
        <div>
          <p class="font-bold text-sm">${x.name}</p>
          <p class="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">$${x.price.toFixed(2)} each</p>
        </div>
      </div>
      <span class="font-bold">$${(x.price * x.quantity).toFixed(2)}</span>
    </div>
  `).join('');
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'order-close-btn') {
    closeOrderModal();
  }
  if (e.target && e.target.id === 'order-place-btn') {
    const subtotal = cart.reduce((sum, x) => sum + x.price * x.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    const order = {
      id: '#' + Math.floor(1000 + Math.random() * 9000),
      items: cart.map(x => ({ id: x.id, name: x.name, qty: x.quantity, price: x.price })),
      subtotal,
      tax,
      total,
      status: 'CONFIRMED',
      table: 12,
      created_at: new Date().toISOString()
    };
    localStorage.setItem('stitch_last_order', JSON.stringify(order));
    closeOrderModal();
  }
});
