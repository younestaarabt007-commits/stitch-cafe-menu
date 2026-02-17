function apiBase() {
  try {
    return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || 'http://localhost:3000';
  } catch {
    return 'http://localhost:3000';
  }
}

let bestsellers = [];
let cart = [];
const sampleMenu = [
  { id: 'fallback-1', name: 'Iced Citrus Cooler', category: 'Cold Drink', price: 4.80, description: 'Tropical pineapple blend', image_url: 'https://images.unsplash.com/photo-1547394765-185d449d6eb2?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-2', name: 'Fresh Orange Juice', category: 'Cold Drink', price: 4.50, description: 'Valencia oranges, cold pressed', image_url: 'https://images.unsplash.com/photo-1541976076758-65c1b5dc0f5b?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-3', name: 'Cold Brew', category: 'Brew', price: 4.90, description: '12-hour steep, smooth finish', image_url: 'https://images.unsplash.com/photo-1576675745666-0e81982f807a?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-4', name: 'Flat White', category: 'Brew', price: 3.90, description: 'Velvety milk and espresso', image_url: 'https://images.unsplash.com/photo-1560972715-3fb62a8469fe?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-5', name: 'Croissant', category: 'Pastry', price: 2.80, description: 'Butter-laminated pastry', image_url: 'https://images.unsplash.com/photo-1509440159598-7106ff28ebfe?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-6', name: 'Almond Pain', category: 'Pastry', price: 3.20, description: 'Almond cream filling', image_url: 'https://images.unsplash.com/photo-1541167760496-16288540b7d2?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-7', name: 'Avocado Toast', category: 'Brunch', price: 10.50, description: 'Sourdough, smashed avocado', image_url: 'https://images.unsplash.com/photo-1559622214-f8a985d3ccaa?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-8', name: 'Shakshuka', category: 'Brunch', price: 11.25, description: 'Tomato, peppers, eggs', image_url: 'https://images.unsplash.com/photo-1543332164-6e82f355bad2?q=80&w=500&auto=format&fit=crop' },
  { id: 'fallback-9', name: 'Mango Lassi', category: 'Cold Drink', price: 5.00, description: 'Alphonso mango, yogurt, cardamom', image_url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=500&auto=format&fit=crop' }
];

document.addEventListener('DOMContentLoaded', () => {
  cart = getStoredCart();
  loadMenuData();
  setupEvents();
  applyLang(getLang());
  updateCart();
});

async function loadMenuData() {
  const container = document.getElementById('bestsellers');
  container.innerHTML = '<div class="text-center py-10"><span class="animate-spin material-symbols-outlined text-primary text-4xl">sync</span></div>';

  try {
    const res = await fetch(`${apiBase()}/api/v1/menu`);
    const result = await res.json();
    
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      bestsellers = result.data;
      renderBestsellers(bestsellers);
      renderCategories(bestsellers);
    } else {
      bestsellers = sampleMenu;
      renderBestsellers(bestsellers);
      renderCategories(bestsellers);
    }
  } catch (e) {
    bestsellers = sampleMenu;
    renderBestsellers(bestsellers);
    renderCategories(bestsellers);
  }
}

function renderCategories(items) {
  // SUB-CATEGORIES to be displayed as circles with real images
  const subCategories = [
    { name: 'Tea & Infusion', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=200&auto=format&fit=crop', link: '../tea and infusion sub catégorie page/index.html' },
    { name: 'Milkshake', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=200&auto=format&fit=crop', link: '../milkshake sub catégorie page/index.html' },
    { name: 'Juice', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=200&auto=format&fit=crop', link: '../juces sub catégorie page/index.html' },
    { name: 'Sweet Pastries', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=200&auto=format&fit=crop', link: '../sweet pastries sub catégorie page/index.html' },
    { name: 'Black Coffee', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=200&auto=format&fit=crop', link: '../black coffee sub catégorie page/index.html' },
    { name: 'Latte', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=200&auto=format&fit=crop', link: '../latté hot drink sub catégorie page/index.html' },
    { name: 'Smoothie', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=200&auto=format&fit=crop', link: '../smothie sub catégorie page/index.html' },
    { name: 'Toast', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=200&auto=format&fit=crop', link: '../toast brunch sub catégorie page/index.html' },
    { name: 'Artisanal Bread', img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=200&auto=format&fit=crop', link: '../artisanal bread sub catégorie page/index.html' }
  ];

  const container = document.querySelector('.flex.overflow-x-auto.hide-scrollbar');
  if (!container) return;

  container.innerHTML = subCategories.map(sub => `
    <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='${sub.link}'">
      <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
          <div class="w-16 h-16 rounded-full overflow-hidden relative">
            <img src="${sub.img}" alt="${sub.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
          </div>
        </div>
      </div>
      <span class="text-[12px] text-gray-700 dark:text-gray-300 font-bold text-center leading-tight max-w-[70px]">${sub.name}</span>
    </div>
  `).join('');
}

function getCategoryIcon(cat) {
  const icons = {
    'Brew': 'coffee',
    'Pastry': 'bakery_dining',
    'Brunch': 'brunch_dining',
    'Cold Drink': 'local_bar'
  };
  return icons[cat] || 'restaurant';
}

window.navigateToCategory = (category) => {
  const categoryId = category.toLowerCase();

  // Navigation logic for Main Categories
  if (categoryId === 'brew') {
    window.location.href = '../Brew catégorie page/index.html';
    return;
  }
  if (categoryId === 'bakery' || categoryId === 'pastry') {
    window.location.href = '../bakery catégorie page/index.html';
    return;
  }
  if (categoryId === 'cold drink') {
    window.location.href = '../cold drinks catégorie page/index.html';
    return;
  }
  if (categoryId === 'branch') {
    // Assuming there is a branch page, otherwise keep default behavior or alert
    // window.location.href = '../branch_page/index.html'; 
    console.log('Branch category selected');
  }
  if (categoryId === 'brunch') {
    window.location.href = '../long_scroll_brunch_explorer/index.html';
    return;
  }

  // Fallback to filtering if something goes wrong, though paths should cover all
  filterByCategory(category);
};

window.filterByCategory = (category) => {
  const filtered = bestsellers.filter(i => i.category === category);
  renderBestsellers(filtered);
};

function renderBestsellers(items) {
  const container = document.getElementById('bestsellers');
  if (items.length === 0) {
    container.innerHTML = '<p class="text-center py-10 text-gray-400 font-bold">No items found</p>';
    return;
  }
  container.innerHTML = items.map(item => `
    <div class="bg-white dark:bg-[#2a1e19] p-[16px] rounded-[1.5rem] shadow-sm flex gap-[16px] items-center relative overflow-hidden group">
      <div class="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
             src="${item.image_url || 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200'}"
             onerror="this.src='https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200'"/>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex flex-col gap-0.5">
          <span class="text-[10px] text-primary font-bold uppercase tracking-widest">${item.category}</span>
          <h4 class="text-[18px] font-bold text-gray-900 dark:text-white leading-tight truncate">${item.name}</h4>
          ${item.description ? `<p class="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-1">${item.description}</p>` : ''}
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-gray-900 dark:text-white font-black text-[16px]">$${Number(item.price).toFixed(2)}</span>
          <button class="bg-orange-50 text-primary dark:bg-primary/20 dark:text-primary text-[12px] font-black uppercase shadow-sm active:scale-95 transition-transform flex items-center justify-center" style="width:84px;height:36px;border-radius:12px;" onclick="addToCart('${item.id}')">
            Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.addToCart = (id) => {
  const item = bestsellers.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  updateCart();
};

function updateCart() {
  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const count = cart.reduce((sum, x) => sum + x.qty, 0);
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
  document.getElementById('cart-items-text').textContent = `${count} Item${count !== 1 ? 's' : ''}`;
  storeCart(cart, count, total);
}

function setupEvents() {
  document.getElementById('hero-order-btn').addEventListener('click', () => {
    const trending = bestsellers[0];
    if (trending) addToCart(trending.id);
  });
  document.getElementById('search-input').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = bestsellers.filter(x => x.name.toLowerCase().includes(q) || x.category.toLowerCase().includes(q));
    renderBestsellers(filtered);
  });
  const viewBtn = document.getElementById('view-cart-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', openOrderModal);
  }
  const closeBtn = document.getElementById('order-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOrderModal);
  }
  const placeBtn = document.getElementById('order-place-btn');
  if (placeBtn) {
    placeBtn.addEventListener('click', placeOrder);
  }
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = nextLang(getLang());
      localStorage.setItem('stitch_lang', next);
      applyLang(next);
    });
  }
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
  const statusBadge = document.getElementById('order-status-badge');
  const last = getLastOrder();
  let items = [];
  let subtotal = 0;
  if (cart.length > 0) {
    items = cart.map(x => ({ name: x.name, qty: x.qty, price: x.price }));
    subtotal = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  } else if (last) {
    if (Array.isArray(last.items) && last.items.length) {
      items = last.items.map(i => ({ name: i.name, qty: i.qty, price: i.price }));
      subtotal = Number(last.subtotal || items.reduce((s, i) => s + i.price * i.qty, 0));
    } else if (last.item) {
      items = [{ name: last.item, qty: last.qty || 1, price: last.unit_price || Number(last.price || 0) }];
      subtotal = Number(last.total || items[0].price * items[0].qty);
    }
  }
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  container.innerHTML = items.map(x => `
    <div class="flex items-center justify-between bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white dark:bg-[#2a1e19] flex items-center justify-center text-primary font-bold">${x.qty}x</div>
        <div>
          <p class="font-bold text-sm">${x.name}</p>
          <p class="text-[10px] text-gray-400 font-bold tracking-widest uppercase">$${Number(x.price).toFixed(2)} each</p>
        </div>
      </div>
      <span class="font-bold">$${(Number(x.price) * Number(x.qty)).toFixed(2)}</span>
    </div>
  `).join('');
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
  statusBadge.textContent = t('status_received');
}

async function placeOrder() {
  const subtotal = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const orderData = {
    items: cart.map(x => ({ 
        id: x.id, 
        name: x.name, 
        qty: x.qty, 
        price: x.price,
        // Add options if they exist in the cart item
        options: x.options || {} 
    })),
    total_amount: total, // Ensure this matches API expectation
    table_number: 12,
    status: 'PENDING'
  };

  try {
      // Show loading state
      const btn = document.getElementById('order-place-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Processing...';
      btn.disabled = true;

      const response = await fetch(`${apiBase()}/api/v1/orders`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
          // Clear cart
          cart = [];
          storeCart(cart, 0, 0);
          updateCart();
          
          // Save last order for display
          localStorage.setItem('stitch_last_order', JSON.stringify(result.data));
          
          // Show success and close
          closeOrderModal();
          alert('Order placed successfully!');
          // Optional: Redirect to success page if it exists
          // window.location.href = '../order_success_page/index.html';
      } else {
          alert('Failed to place order: ' + (result.message || 'Unknown error'));
      }
      
      btn.textContent = originalText;
      btn.disabled = false;

  } catch (error) {
      console.error('Error placing order:', error);
      alert('Error connecting to server. Please try again.');
      document.getElementById('order-place-btn').textContent = t('place_order');
      document.getElementById('order-place-btn').disabled = false;
  }
}

function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem('stitch_last_order') || 'null');
  } catch {
    return null;
  }
}
function getStoredCart() {
  try {
    const raw = localStorage.getItem('stitch_cart') || '[]';
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function storeCart(items, count, total) {
  localStorage.setItem('stitch_cart', JSON.stringify(items));
  localStorage.setItem('stitch_cart_count', String(count));
  localStorage.setItem('stitch_cart_total', String(total));
}
const i18n = {
  en: {
    view_cart: 'View Cart',
    order_status: 'Order Status',
    subtotal: 'Subtotal',
    tax: 'Tax (10%)',
    total: 'Total',
    close: 'Close',
    place_order: 'Place Order',
    status_received: 'Received'
  },
  fr: {
    view_cart: 'Voir le panier',
    order_status: 'Statut de commande',
    subtotal: 'Sous-total',
    tax: 'Taxe (10%)',
    total: 'Total',
    close: 'Fermer',
    place_order: 'Passer la commande',
    status_received: 'Reçu'
  },
  es: {
    view_cart: 'Ver carrito',
    order_status: 'Estado del pedido',
    subtotal: 'Subtotal',
    tax: 'Impuesto (10%)',
    total: 'Total',
    close: 'Cerrar',
    place_order: 'Realizar pedido',
    status_received: 'Recibido'
  },
  ar: {
    view_cart: 'عرض السلة',
    order_status: 'حالة الطلب',
    subtotal: 'المجموع الفرعي',
    tax: '(10٪) ضريبة',
    total: 'الإجمالي',
    close: 'إغلاق',
    place_order: 'تأكيد الطلب',
    status_received: 'تم الاستلام'
  }
};

function getLang() {
  return localStorage.getItem('stitch_lang') || 'en';
}

function nextLang(curr) {
  const order = ['en', 'fr', 'es', 'ar'];
  const i = order.indexOf(curr);
  return order[(i + 1) % order.length];
}

function t(key) {
  const lang = getLang();
  return (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;
}

function applyLang(lang) {
  const map = [
    ['view-cart-label', 'view_cart'],
    ['order-modal-title', 'order_status'],
    ['subtotal-label', 'subtotal'],
    ['tax-label', 'tax'],
    ['total-label', 'total'],
    ['order-close-btn', 'close'],
    ['order-place-btn', 'place_order']
  ];
  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });
  const badge = document.getElementById('order-status-badge');
  if (badge) badge.textContent = t('status_received');
}
