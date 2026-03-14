
function apiBase() {
  try {
    return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || null;
  } catch {
    return null;
  }
}

let bestsellers = [];
let cart = [];
let currentTable = new URLSearchParams(window.location.search).get('table') || null;

// Consolidated Product Data from all sub-categories


function fetchBestsellers() {
  const menuData = (typeof allMenuItems !== 'undefined' && Array.isArray(allMenuItems)) ? allMenuItems : [];
  if (!menuData.length) {
    console.error('Menu data not loaded. Check menu.js path.');
  }
  bestsellers = menuData;
  renderBestsellers(bestsellers);
}

function renderBestsellers(items) {
  const container = document.getElementById('bestsellers') || document.getElementById('bestsellers-grid');
  if (!container) return;

  // Debug check
  if (!items || items.length === 0) {
    console.error('No items to render!');
    return;
  }

  // Simply use the provided items directly
  const ordered = items;

  container.innerHTML = ordered.map((item, index) => {
    let imgUrl = item.image || item.image_url;
    if (imgUrl && imgUrl.startsWith('assets/')) {
      imgUrl = '../../' + imgUrl;
    }
    // Use fallback if image is missing or is the default Unsplash placeholder
    const isDefault = imgUrl && imgUrl.includes('photo-1546069901');
    const displayImg = (imgUrl && !isDefault) ? imgUrl : getFallbackImage(item, index);
    const rating = typeof item.rating === 'number' ? item.rating : getRatingForItem(item);

    const fallback = getFallbackImage(item, index + 50); // Different seed for fallback
    
    // Store exact image used so the customization view gets the same one
    item._displayImage = displayImg;

    return `
    <div class="bg-white dark:bg-[#2a1e19] rounded-[1.5rem] p-3 shadow-md border border-gray-100 dark:border-white/5 flex gap-4 items-center relative" data-category="${item.category}">
      <div class="absolute top-3 right-3 bg-white/90 dark:bg-black/60 px-2 py-1 rounded-full shadow-sm z-10">
        <span class="material-symbols-outlined text-[14px] text-green-600 dark:text-green-400">${getCategoryIcon(item.category)}</span>
      </div>
      <div class="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-black/20 relative shrink-0">
        <img src="${displayImg}" class="w-full h-full object-cover" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
      </div>
      <div class="flex-1 min-w-0 flex flex-col h-24 md:h-32 justify-between py-0.5">
        <div>
          <h4 class="font-bold text-[13px] md:text-sm text-gray-900 dark:text-white leading-tight pr-6">${getMenuTranslation(item, 'name')}</h4>
          <div class="flex items-center gap-1 mt-1">
            <span class="material-symbols-outlined text-[14px] text-[#FFC107]" style="font-variation-settings: 'FILL' 1">star</span>
            <span class="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">${Number(rating).toFixed(1)}</span>
            <span class="text-[10px] text-gray-400">(${Math.floor(Number(rating) * 25)}+)</span>
          </div>
          <p class="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">${getMenuTranslation(item, 'description')}</p>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-xs font-bold text-primary">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}DH</span>
          <button onclick="addToCart('${item.id}')" class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform">
            ${getTranslation('add')}
          </button>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderCategories(items) {
  // SUB-CATEGORIES to be displayed as circles with real images
  const subCategories = [
    { name: getTranslation('Tea & Infusion'), img: 'assets/subcat_icons/tea icon .png', link: '../tea and infusion sub catégorie page/index.html' },
    { name: getTranslation('Milkshake'), img: 'assets/subcat_icons/milkshake icon.png', link: '../milkshake sub catégorie page/index.html' },
    { name: getTranslation('Juice'), img: 'assets/subcat_icons/juces icon.png', link: '../juces sub catégorie page/index.html' },
    { name: getTranslation('Sweet Pastries'), img: 'assets/subcat_icons/sweet pastry.png', link: '../sweet pastries sub catégorie page/index.html' },
    { name: getTranslation('Black Coffee'), img: 'assets/subcat_icons/black coffe icon.jpg', link: '../black coffee sub catégorie page/index.html' },
    { name: getTranslation('Latte'), img: 'assets/subcat_icons/latté icon.jpg', link: '../latté hot drink sub catégorie page/index.html' },
    { name: getTranslation('Smoothie'), img: 'assets/subcat_icons/smoothie icon.png', link: '../smothie sub catégorie page/index.html' },
    { name: getTranslation('Toast'), img: 'assets/subcat_icons/sandwich or toast icon .jpg', link: '../toast brunch sub catégorie page/index.html' },
    { name: getTranslation('Artisanal Bread'), img: 'assets/subcat_icons/artisanal bread.jpg', link: '../artisanal bread sub catégorie page/index.html' }
  ];

  const container = document.getElementById('explore-categories');
  if (!container) return;

  container.innerHTML = subCategories.map(cat => `
    <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='${cat.link}'">
      <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
          <div class="w-16 h-16 rounded-full overflow-hidden relative">
            <img src="${cat.img}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../../assets/waiter.jpg'">
          </div>
        </div>
      </div>
      <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]">${cat.name}</p>
    </div>
  `).join('');
}

function getCategoryIcon(cat) {
  const icons = {
    'Brew': 'coffee',
    'Cold Brew': 'coffee', // Added Cold Brew
    'Pastry': 'bakery_dining',
    'Brunch': 'brunch_dining',
    'Cold Drink': 'local_bar',
    'Tea': 'emoji_food_beverage',
    'Coffee': 'coffee',
    'Juice': 'local_drink',
    'Smoothie': 'blender',
    'Shake': 'icecream',
    'Bread': 'breakfast_dining',
    'Toast': 'breakfast_dining'
  };
  return icons[cat] || 'restaurant';
}

function getRatingForItem(item) {
  const map = {
    'Coffee': 4.5,
    'Cold Brew': 4.5,
    'Tea': 4.4,
    'Juice': 4.3,
    'Smoothie': 4.4,
    'Shake': 4.3,
    'Pastry': 4.5,
    'Brunch': 4.4,
    'Toast': 4.3,
    'Bread': 4.4
  };
  const base = map[item.category] || 4.4;
  return base;
}

function buildCustomizationUrl(item) {
  if (!item) return '../pure_noir_espresso_customization_view_1/index.html';
  const category = (item.category || '').toLowerCase();
  let customizationPage = '../brunch_customization_view/index.html';
  if (category.includes('brunch') || category.includes('toast')) {
    customizationPage = '../toast_brunch_customization_view/index.html';
  } else if (category.includes('tea') || category.includes('infusion')) {
    customizationPage = '../tea_customization_view/index.html';
  } else if (category.includes('coffee') || category.includes('brew')) {
    customizationPage = '../pure_noir_espresso_customization_view_1/index.html';
  } else if (category.includes('pastry') || category.includes('bakery')) {
    customizationPage = '../sweet_pastries_customization_view/index.html';
  } else if (category.includes('bread')) {
    customizationPage = '../petit pain bakery_customization_view/index.html';
  } else if (category.includes('juice') || category.includes('drink')) {
    customizationPage = '../orange juce_customization_view_1/index.html';
  } else if (category.includes('smoothie')) {
    customizationPage = '../smothie customisation review/index.html';
  } else if (category.includes('milkshake') || category.includes('shake')) {
    customizationPage = '../milkshake_customization_view/index.html';
  }

  // Use the stored display image if available, else original, else fallback
  let imgPath = item._displayImage || item.image || getFallbackImage(item, 0);

  const params = new URLSearchParams({
    id: item.id || '',
    name: item.name || '',
    price: item.price ?? '',
    image: imgPath,
    category: item.category || ''
  });

  return `${customizationPage}?${params.toString()}`;
}

function getFallbackImage(item, seed = 0) {
  // Try to match specific keywords in name to local assets
  const name = item.name.toLowerCase();
  if (name.includes('milkshake')) return '../../assets/close-up-milkshake-glass-plate_117406-7215.jpg';
  if (name.includes('smoothie')) return '../../assets/raspberry-smoothie_1150-18529.jpg';
  if (name.includes('juice') || name.includes('orange')) return '../../assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif';
  if (name.includes('tea')) return '../../assets/exotic-cocktail-closeup_181624-983.avif';
  if (name.includes('toast') || name.includes('benedict')) return '../../assets/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif';
  if (name.includes('pancake')) return '../../assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg';
  if (name.includes('pastry') || name.includes('croissant')) return '../../assets/pastry.jpg';
  if (name.includes('mango')) return '../../assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif';

  // Fallback pool of high-quality images
  const pool = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', // Salad/Bowl
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500', // Pizza/Flatbread
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500', // Toast/Egg
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=500', // French Toast
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500', // Healthy Bowl
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500', // Drink
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500', // Coffee
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=500'  // Coffee beans
  ];

  // Deterministic selection based on item name char code sum + seed
  const safeName = item.name || 'item';
  const hash = safeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + seed;
  return pool[hash % pool.length];
}

function startHeroCarousel() {
  console.log('Hero carousel is disabled in this script. using carousel-auto-loop.js instead.');
  return;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Cart
  cart = getStoredCart();
  updateCartUI();

  // 2. Check for returning customization order
  try {
    const lastOrder = localStorage.getItem('stitch_last_order');
    if (lastOrder) {
      const order = JSON.parse(lastOrder);
      // Create a cart item from the order
      const cartItem = {
        id: 'custom-' + Date.now(), // Unique ID for custom item
        name: order.item,
        price: order.unit_price, // Use the customized unit price
        image: order.image && order.image.startsWith('assets/') ? '../../' + order.image : (order.image || '../../assets/waiter.jpg'), // Use passed image or fallback
        category: 'Custom',
        quantity: order.qty,
        options: order.options
      };
      
      // Add to cart
      cart.push(cartItem);
      updateCartUI();
      localStorage.setItem('stitch_cart', JSON.stringify(cart));
      
      // Clear the temp storage
      localStorage.removeItem('stitch_last_order');
    }
  } catch (e) {
    console.error('Error processing last order', e);
  }

  fetchBestsellers();
  renderCategories();
  handleTableContext();
  // startHeroCarousel(); // Disabled - using auto-loop instead
});

function handleTableContext() {
  if (!currentTable) return;

  // 1. Update Table Badge in UI
  const badge = document.getElementById('table-badge');
  if (badge) {
    badge.textContent = `Table ${currentTable}`;
    badge.classList.remove('hidden');
  }

  // 2. Check Reservation Status
  const reservations = JSON.parse(localStorage.getItem('stitch_reservations') || '[]');
  const isReserved = reservations.some(res => res.tableId === currentTable);

  if (isReserved) {
    showReservationOverlay();
  }
}

function showReservationOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center text-white';
  overlay.innerHTML = `
    <div class="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 border border-primary/30">
        <span class="material-symbols-outlined text-[48px] text-primary">event_busy</span>
    </div>
    <h2 class="text-3xl font-serif italic mb-2">Table Reserved</h2>
    <p class="text-gray-400 mb-8 max-w-xs">This table is currently booked for a client. Please see our staff for assistance.</p>
    <button onclick="window.history.back()" class="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-glow">Go Back</button>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

// Intercept Place Order to sync with Dashboard
const originalPlaceOrder = window.placeOrder; // Not defined yet or defined differently
window.placeOrder = () => {
  if (cart.length === 0) return;

  const orderData = {
    id: 'ORD-' + Math.floor(Math.random() * 10000).toString().padStart(3, '0'),
    table: currentTable || 'Online',
    items: cart,
    total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    status: 'Received',
    time: Date.now()
  };

  // 1. Sync to LocalStorage for Dashboard
  const liveOrders = JSON.parse(localStorage.getItem('stitch_live_orders') || '[]');
  liveOrders.push(orderData);
  localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));

  // 2. Clear Cart and Notify
  cart = [];
  localStorage.removeItem('cart');
  renderCart();

  // Custom success view
  showOrderSuccess(orderData.id);
};

function showOrderSuccess(orderId) {
  const success = document.createElement('div');
  success.className = 'fixed inset-0 bg-white dark:bg-[#1a100c] z-[110] flex flex-col items-center justify-center p-8 text-center';
  success.innerHTML = `
        <div class="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mb-8 relative">
            <div class="absolute inset-0 bg-green-500/5 rounded-full animate-ping"></div>
            <span class="material-symbols-outlined text-[64px] text-green-500">check_circle</span>
        </div>
        <h2 class="text-3xl font-serif italic mb-2">Order Confirmed!</h2>
        <p class="text-gray-500 mb-2">Your order <span class="font-bold text-primary">#${orderId}</span> is now being prepared.</p>
        <p class="text-xs text-gray-400 mb-10">We'll bring it to your table shortly.</p>
        <button onclick="location.reload()" class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-bold">Done</button>
    `;
  document.body.appendChild(success);
}

window.navigateToCategory = (category) => {
  const categoryId = category.toLowerCase();

  // Navigation logic for Main Categories
  if (categoryId === 'brew') {
    window.location.href = '../Brew catégorie page/index.html';
    return;
  }
  if (categoryId === 'bakery' || categoryId === 'pastry' || categoryId === 'sweet pastries') {
    window.location.href = '../sweet pastries sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'cold drink') {
    window.location.href = '../cold drinks catégorie page/index.html';
    return;
  }
  if (categoryId === 'branch') {
    console.log('Branch category selected');
  }
  if (categoryId === 'brunch') {
    window.location.href = '../long_scroll_brunch_explorer/index.html';
    return;
  }
  if (categoryId === 'toast') {
    window.location.href = '../toast brunch sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'tea' || categoryId === 'tea & infusion') {
    window.location.href = '../tea and infusion sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'milkshake' || categoryId === 'shake') { // Added shake alias
    window.location.href = '../milkshake sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'juice') {
    window.location.href = '../juces sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'black coffee') {
    window.location.href = '../black coffee sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'latte') {
    window.location.href = '../latté hot drink sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'creme') { // Added creme
    window.location.href = '../creme or latté fuite juces sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'smoothie') {
    window.location.href = '../smothie sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'artisanal bread' || categoryId === 'bread') { // Added bread alias
    window.location.href = '../artisanal bread sub catégorie page/index.html';
    return;
  }

  // Fallback to filtering if something goes wrong, though paths should cover all
  filterByCategory(category);
};

window.filterByCategory = (category) => {
  const filtered = bestsellers.filter(i => i.category === category);
  renderBestsellers(filtered);
};

window.addToCart = (id) => {
  const itemFromBestsellers = bestsellers.find(i => i.id === id);
  const itemFromAll = typeof allMenuItems !== 'undefined' ? allMenuItems.find(i => i.id === id) : null;
  const item = itemFromBestsellers || itemFromAll;
  if (!item) {
    window.location.href = '../pure_noir_espresso_customization_view_1/index.html';
    return;
  }

  localStorage.setItem('stitch_customizing_item', JSON.stringify(item));
  window.location.href = buildCustomizationUrl(item);
};

function updateCartUI() {
  const badge = document.getElementById('cart-items-text');
  if (badge) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    const itemsText = getTranslation('items');
    badge.textContent = `${total} ${itemsText}`;
    badge.classList.toggle('hidden', total === 0);
  }
}

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.remove('hidden');
    renderCartItems();
  }
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderCartItems() {
  const container = document.getElementById('order-items');
  const subtotalEl = document.getElementById('modal-subtotal');
  const taxEl = document.getElementById('modal-tax');
  const totalEl = document.getElementById('modal-total');

  if (!container) return;

  container.innerHTML = '';

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl';

    // Get translated name
    const itemName = getMenuTranslation(item, 'name');

    div.innerHTML = `
      <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <img src="${item.image}" class="w-full h-full object-cover" alt="${itemName}">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-sm truncate dark:text-white">${itemName}</h4>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs text-gray-500 dark:text-gray-400">${item.price}DH</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="updateItemQuantity('${item.id}', -1)" class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">-</button>
        <span class="text-sm font-bold w-4 text-center dark:text-white">${item.quantity}</span>
        <button onclick="updateItemQuantity('${item.id}', 1)">ADD</button>
      </div>
    `;
    container.appendChild(div);
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)}DH`;
  if (taxEl) taxEl.textContent = `${tax.toFixed(2)}DH`;
  if (totalEl) totalEl.textContent = `${total.toFixed(2)}DH`;
}

window.updateItemQuantity = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
    renderCartItems();
    localStorage.setItem('stitch_cart', JSON.stringify(cart));
  }
};

// Helper to get stored cart
function getStoredCart() {
  try {
    const stored = localStorage.getItem('stitch_cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Setup basic events
function setupEvents() {
  const searchBtn = document.querySelector('.material-symbols-outlined.text-xl'); // Assuming search icon
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      alert(getTranslation('search_feature_soon'));
    });
  }

  const cartBtn = document.getElementById('view-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openOrderModal);
  }

  const closeBtn = document.getElementById('order-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOrderModal);
  }
}

// Language Helper
const translations = {
  en: {
    table_12: "Table 12",
    stitch_cafe: "Stitch Café",
    dine_in: "Dine In",
    take_away: "Take Away",
    chefs_choice: "Chef's Choice",
    no1_seller: "N°1 seller",
    brunch: "BRUNCH",
    favorites: "FAVORITES",
    savory_brunch: "Savory brunch classics.",
    order_now: "Order Now",
    new_arrival: "New Arrival",
    hot: "🔥 Hot",
    velvet: "VELVET",
    sips: "SIPS",
    smooth_iced_blends: "Smooth iced blends.",
    morning_special: "Morning Special",
    trend: "Trend",
    morning: "MORNING",
    brew: "BREW",
    freshly_brewed_coffee: "Freshly brewed coffee.",
    sweet_treats: "Sweet Treats",
    popular: "⭐ Popular",
    sweet: "SWEET",
    delights: "DELIGHTS",
    fluffy_pancakes: "Fluffy pancakes, sweet treats.",
    explore: "Explore",
    view_all: "View All",
    milkshake: "Milkshake",
    juice: "Juice",
    sweet_pastries: "Sweet Pastries",
    toast: "Toast",
    black_coffee: "Black Coffee",
    latte: "Latte",
    smoothie: "Smoothie",
    tea_infusion: "Tea & Infusion",
    artisanal_bread: "Artisanal Bread",
    our_menu: "Our Menu",
    toasts_bowls: "Toasts & Bowls",
    coffee_tea: "Coffee & Tea",
    cold_drink: "Cold Drink",
    juices_shakes: "Juices & Shakes",
    pastry: "Pastry",
    bakery_sweets: "Bakery & Sweets",
    trending_now: "Trending Now",
    all_items: "All variety of items",
    home: "Home",
    cart: "Cart",
    profile: "Profile",
    search_placeholder: "Search...",
    search_feature_soon: "Search feature coming soon!",
    items: "items",
    add: "ADD",
    subtotal: "Subtotal",
    tax: "Tax (10%)",
    total: "Total",
    close: "Close",
    place_order: "Place Order",
    order_status: "Order Status",
    received: "Received",
    // Categories
    'Tea & Infusion': "Tea & Infusion",
    'Milkshake': "Milkshake",
    'Juice': "Juice",
    'Sweet Pastries': "Sweet Pastries",
    'Black Coffee': "Black Coffee",
    'Latte': "Latte",
    'Smoothie': "Smoothie",
    'Toast': "Toast",
    'Artisanal Bread': "Artisanal Bread"
  },
  fr: {
    table_12: "Table 12",
    stitch_cafe: "Stitch Café",
    dine_in: "Sur Place",
    take_away: "À Emporter",
    chefs_choice: "Choix du Chef",
    no1_seller: "N°1 des ventes",
    brunch: "BRUNCH",
    favorites: "FAVORIS",
    savory_brunch: "Classiques salés du brunch.",
    order_now: "Commander",
    new_arrival: "Nouveauté",
    hot: "🔥 Chaud",
    velvet: "VELOURS",
    sips: "GORGEES",
    smooth_iced_blends: "Mélanges glacés onctueux.",
    morning_special: "Spécial Matin",
    trend: "Tendance",
    morning: "MATIN",
    brew: "INFUSION",
    freshly_brewed_coffee: "Café fraîchement préparé.",
    sweet_treats: "Douceurs Sucrées",
    popular: "⭐ Populaire",
    sweet: "DOUCEUR",
    delights: "DELICES",
    fluffy_pancakes: "Pancakes moelleux, douceurs.",
    explore: "Explorer",
    view_all: "Voir Tout",
    milkshake: "Milkshake",
    juice: "Jus",
    sweet_pastries: "Pâtisseries Sucrées",
    toast: "Tartine",
    black_coffee: "Café Noir",
    latte: "Latte",
    smoothie: "Smoothie",
    tea_infusion: "Thé & Infusion",
    artisanal_bread: "Pain Artisanal",
    our_menu: "Notre Menu",
    toasts_bowls: "Tartines & Bols",
    coffee_tea: "Café & Thé",
    cold_drink: "Boissons Froides",
    juices_shakes: "Jus & Shakes",
    pastry: "Pâtisserie",
    bakery_sweets: "Boulangerie & Douceurs",
    trending_now: "Tendances",
    all_items: "Toute la variété",
    home: "Accueil",
    cart: "Panier",
    profile: "Profil",
    search_placeholder: "Rechercher...",
    search_feature_soon: "Fonction de recherche bientôt disponible !",
    items: "articles",
    add: "AJOUTER",
    subtotal: "Sous-total",
    tax: "Taxe (10%)",
    total: "Total",
    close: "Fermer",
    place_order: "Commander",
    order_status: "Statut de la commande",
    received: "Reçu",
    // Categories
    'Tea & Infusion': "Thé & Infusion",
    'Milkshake': "Milkshake",
    'Juice': "Jus",
    'Sweet Pastries': "Pâtisseries Sucrées",
    'Black Coffee': "Café Noir",
    'Latte': "Latte",
    'Smoothie': "Smoothie",
    'Toast': "Tartine",
    'Artisanal Bread': "Pain Artisanal"
  },
  ar: {
    table_12: "طاولة 12",
    stitch_cafe: "ستيتش كافيه",
    dine_in: "تناول هنا",
    take_away: "سفري",
    chefs_choice: "اختيار الشيف",
    no1_seller: "الأكثر مبيعاً",
    brunch: "فطور متأخر",
    favorites: "المفضلة",
    savory_brunch: "كلاسيكيات الفطور المالح.",
    order_now: "اطلب الآن",
    new_arrival: "وصل حديثاً",
    hot: "🔥 ساخن",
    velvet: "مخملي",
    sips: "رشفات",
    smooth_iced_blends: "مشروبات مثلجة ناعمة.",
    morning_special: "عرض الصباح",
    trend: "رائج",
    morning: "الصباح",
    brew: "قهوة",
    freshly_brewed_coffee: "قهوة طازجة التحضير.",
    sweet_treats: "حلويات",
    popular: "⭐ مشهور",
    sweet: "حلوى",
    delights: "لذيذة",
    fluffy_pancakes: "بان كيك هش، حلويات.",
    explore: "استكشف",
    view_all: "عرض الكل",
    milkshake: "ميلك شيك",
    juice: "عصير",
    sweet_pastries: "معجنات حلوة",
    toast: "توست",
    black_coffee: "قهوة سوداء",
    latte: "لاتيه",
    smoothie: "سموثي",
    tea_infusion: "شاي وأعشاب",
    artisanal_bread: "خبز حرفي",
    our_menu: "قائمتنا",
    toasts_bowls: "توست وسلطانيات",
    coffee_tea: "قهوة وشاي",
    cold_drink: "مشروبات باردة",
    juices_shakes: "عصائر ومخفوقات",
    pastry: "معجنات",
    bakery_sweets: "مخبوزات وحلويات",
    trending_now: "الأكثر رواجاً",
    all_items: "جميع الأصناف",
    home: "الرئيسية",
    cart: "السلة",
    profile: "الملف الشخصي",
    search_placeholder: "بحث...",
    add: "إضافة",
    search_feature_soon: "ميزة البحث قريبا!",
    items: "عناصر",
    order_status: "حالة الطلب",
    received: "تم الاستلام",
    subtotal: "المجموع الفرعي",
    tax: "ضريبة (10%)",
    total: "المجموع",
    close: "إغلاق",
    place_order: "تأكيد الطلب",
    // Categories
    'Tea & Infusion': "شاي وأعشاب",
    'Milkshake': "ميلك شيك",
    'Juice': "عصير",
    'Sweet Pastries': "معجنات حلوة",
    'Black Coffee': "قهوة سوداء",
    'Latte': "لاتيه",
    'Smoothie': "سموثي",
    'Toast': "توست",
    'Artisanal Bread': "خبز حرفي"
  }
};

const menuTranslations = {
  // Brunch
  'brunch-1': {
    fr: { name: "Omelette Fermière", description: "Œufs bio, cheddar, herbes fraîches." },
    ar: { name: "عجة ريفية", description: "بيض عضوي، جبن شيدر، أعشاب طازجة." }
  },
  'brunch-2': {
    fr: { name: "Œufs Bénédicte", description: "Muffin anglais, bacon, sauce hollandaise." },
    ar: { name: "بيض بنديكت", description: "مافن إنجليزي، لحم مقدد، صلصة هولنديز." }
  },
  'brunch-3': {
    fr: { name: "Shakshuka Épicée", description: "Œufs pochés dans une sauce tomate épicée." },
    ar: { name: "شكشوكة حارة", description: "بيض مسلوق في صلصة طماطم حارة." }
  },
  'brunch-4': {
    fr: { name: "Poêlée du Jardin", description: "Pommes de terre rôties, chou frisé, poivrons." },
    ar: { name: "مقلاة الحديقة", description: "بطاطس مشوية، كرنب، فلفل." }
  },
  'brunch-5': {
    fr: { name: "Burrito Brunch", description: "Chorizo, œufs brouillés, haricots." },
    ar: { name: "بوريتو الفطور", description: "تشوريزو، بيض مخفوق، فاصوليا." }
  },
  'brunch-6': {
    fr: { name: "Steak & Œufs", description: "Faux-filet 6oz, deux œufs au choix." },
    ar: { name: "ستيك وبيض", description: "شريحة لحم 6 أونصة، بيضتان حسب الرغبة." }
  },
  'brunch-7': {
    fr: { name: "Blanc d'Œuf Fitness", description: "Épinards, fromage de chèvre, blancs d'œufs." },
    ar: { name: "بياض البيض الصحي", description: "سبانخ، جبن ماعز، بياض بيض." }
  },
  'brunch-8': {
    fr: { name: "Tacos Brunch", description: "Tortillas de maïs, oignons marinés, avocat." },
    ar: { name: "تاكو الفطور", description: "تورتيلا ذرة، بصل مخلل، أفوكادو." }
  },
  'brunch-9': {
    fr: { name: "Frittata de Fer", description: "Oignons, pommes de terre, cheddar vieilli." },
    ar: { name: "فريتاتا الحديد", description: "بصل، بطاطس، شيدر معتق." }
  },
  'brunch-10': {
    fr: { name: "Délice Açaï", description: "Baies mélangées, granola, miel." },
    ar: { name: "ديلك آساي", description: "توت مشكل، جرانولا، عسل." }
  },
  'brunch-11': {
    fr: { name: "Gaufre Belge", description: "Gaufres croustillantes, baies, crème." },
    ar: { name: "وافل بلجيكي", description: "وافل مقرمش، توت، كريمة." }
  },
  'brunch-12': {
    fr: { name: "Petit Déjeuner Anglais", description: "Saucisse, bacon, œufs, haricots, toast." },
    ar: { name: "فطور إنجليزي كامل", description: "سجق، لحم مقدد، بيض، فاصوليا، توست." }
  },

  // Brew
  'brew-1': {
    fr: { name: "Nitro Cold Brew", description: "Infusion 18h, infusé à l'azote." },
    ar: { name: "نيترو كولد برو", description: "نقع 18 ساعة، مشبع بالنيتروجين." }
  },
  'brew-2': {
    fr: { name: "Matcha Cérémonial", description: "Matcha d'Uji avec lait d'avoine." },
    ar: { name: "ماتشا احتفالي", description: "ماتشا من أوجي مع حليب الشوفان." }
  },
  'brew-3': {
    fr: { name: "Yirgacheffe Éthiopien", description: "Notes florales avec une finale citronnée." },
    ar: { name: "يرجاشيف إثيوبي", description: "نكهات زهرية مع لمسة حمضية." }
  },
  'brew-4': {
    fr: { name: "Dirty Masala Chai", description: "Épices maison, double dose." },
    ar: { name: "ديرتي ماسالا تشاي", description: "توابل منزلية، جرعة مزدوجة." }
  },
  'brew-5': {
    fr: { name: "Cortado Lait d'Avoine", description: "Parts égales expresso & lait." },
    ar: { name: "كورتادو حليب الشوفان", description: "كميات متساوية من الإسبريسو والحليب." }
  },
  'brew-6': {
    fr: { name: "Miel Lavande", description: "Infusion florale avec miel local." },
    ar: { name: "عسل اللافندر", description: "نقيع زهري مع عسل محلي." }
  },
  'brew-7': {
    fr: { name: "Curcuma Doré", description: "Infusion curative épicée." },
    ar: { name: "كركم ذهبي", description: "مشروب علاجي متبل." }
  },
  'brew-8': {
    fr: { name: "Caramel Macchiato", description: "Expresso étagé & vanille." },
    ar: { name: "كراميل ماكياتو", description: "طبقات إسبريسو وفانيليا." }
  },
  'brew-9': {
    fr: { name: "V60 Origine Unique", description: "Perfection versée à la main." },
    ar: { name: "V60 أصل واحد", description: "تحضير يدوي متقن." }
  },
  'brew-10': {
    fr: { name: "Infusion Myrtille", description: "Mélange riche en antioxydants." },
    ar: { name: "نقيع التوت الأزرق", description: "خليط غني بمضادات الأكسدة." }
  },

  // Artisanal Bread
  'bread-1': {
    fr: { name: "Babka Chocolat", description: "Tourbillon de ganache chocolat noir riche." },
    ar: { name: "بابكا الشوكولاتة", description: "دوامة غاناش الشوكولاتة الداكنة الغنية." }
  },
  'bread-2': {
    fr: { name: "Multigrains", description: "Garni à la main de lin & avoine." },
    ar: { name: "خبز متعدد الحبوب", description: "مغطى يدوياً بالكتان والشوفان." }
  },
  'bread-3': {
    fr: { name: "Pain de Seigle Noir", description: "Seigle dense style allemand robuste." },
    ar: { name: "رغيف الجاودار الداكن", description: "جاودار كثيف على الطراز الألماني." }
  },
  'bread-4': {
    fr: { name: "Focaccia aux Herbes", description: "Romarin, ail & huile d'olive." },
    ar: { name: "فوكاشيا بالأعشاب", description: "إكليل الجبل، ثوم وزيت زيتون." }
  },
  'bread-5': {
    fr: { name: "Brioche au Miel", description: "Pain du matin ultra-doux et beurré." },
    ar: { name: "بريوش بالعسل", description: "رغيف صباحي فائق النعومة والزبدة." }
  },
  'bread-6': {
    fr: { name: "Blé Moulu sur Pierre", description: "100% grains entiers nutritifs." },
    ar: { name: "قمح مطحون على الحجر", description: "حبوب كاملة مغذية 100%." }
  },
  'bread-7': {
    fr: { name: "Baguette Parisienne", description: "Croûte classique avec mie aérée." },
    ar: { name: "باغيت باريسي", description: "قشرة كلاسيكية مع لب هوائي." }
  },
  'bread-8': {
    fr: { name: "Canneberge Noix", description: "Pain artisanal doux & acidulé." },
    ar: { name: "توت بري وجوز", description: "رغيف حرفي حلو وحامض." }
  },

  // Black Coffee
  'coffee-1': {
    fr: { name: "Flat White Velours", description: "Double dose, micromousse soyeuse" },
    ar: { name: "فلات وايت مخملي", description: "جرعة مزدوجة، رغوة ناعمة حريرية" }
  },
  'coffee-2': {
    fr: { name: "Kyoto Cold Brew", description: "Extraction goutte à goutte lente 12h" },
    ar: { name: "كيوتو كولد برو", description: "استخلاص بالتنقيط البطيء لمدة 12 ساعة" }
  },
  'coffee-3': {
    fr: { name: "Latte Lait d'Avoine", description: "Crémeux, sans noix, végétalien" },
    ar: { name: "لاتيه حليب الشوفان", description: "كريمي، خالي من المكسرات، نباتي" }
  },
  'coffee-4': {
    fr: { name: "Espresso Origine Unique", description: "Notes de baies intenses" },
    ar: { name: "إسبريسو أصل واحد", description: "نكهات توت قوية" }
  },
  'coffee-5': {
    fr: { name: "Moka Noir", description: "70% Cacao, Double Expresso" },
    ar: { name: "موكا داكن", description: "70% كاكاو، إسبريسو مزدوج" }
  },

  // Cold Drinks
  'cold-1': {
    fr: { name: "Jus d'Orange Frais", description: "Oranges Valencia pressées à froid" },
    ar: { name: "عصير برتقال طازج", description: "برتقال فالنسيا معصور على البارد" }
  },
  'cold-2': {
    fr: { name: "Smoothie Fraise", description: "Yaourt grec, purée de fraise" },
    ar: { name: "سموثي الفراولة", description: "زبادي يوناني، هريس الفراولة" }
  },
  'cold-3': {
    fr: { name: "Shake Chocolat", description: "70% cacao, glace vanille" },
    ar: { name: "شيك الشوكولاتة", description: "70% كاكاو، آيس كريم فانيليا" }
  },
  'cold-4': {
    fr: { name: "Latte Glacé", description: "Double dose sur lait glacé" },
    ar: { name: "لاتيه مثلج", description: "جرعة مزدوجة على حليب بارد" }
  },
  'cold-5': {
    fr: { name: "Mango Lassi", description: "Mangue Alphonso, yaourt, cardamome" },
    ar: { name: "مانجو لاسي", description: "مانجو ألفونسو، زبادي، هيل" }
  },
  'cold-6': {
    fr: { name: "Cold Brew", description: "Infusion 12h, finale douce" },
    ar: { name: "كولد برو", description: "نقع 12 ساعة، نهاية سلسة" }
  },

  // Creme/Latte
  'creme-1': {
    fr: { name: "Latte Orange Crémeux", description: "Orange fraîche avec mousse de lait" },
    ar: { name: "لاتيه برتقال كريمي", description: "برتقال طازج مع رغوة حليب" }
  },
  'creme-2': {
    fr: { name: "Étincelle Agrumes", description: "Citron-lime avec menthe" },
    ar: { name: "شرارة الحمضيات", description: "ليمون وليمون حامض مع نعناع" }
  },
  'creme-3': {
    fr: { name: "Fizz Mangue Crème", description: "Purée de mangue et crème légère" },
    ar: { name: "فيز مانجو وكريمة", description: "هريس مانجو وكريمة خفيفة" }
  },
  'creme-4': {
    fr: { name: "Jus de Pomme Classique", description: "Pommes pressées à froid" },
    ar: { name: "عصير تفاح كلاسيكي", description: "تفاح معصور على البارد" }
  },
  'creme-5': {
    fr: { name: "Agrumes Baies", description: "Fraise et pamplemousse" },
    ar: { name: "حمضيات وتوت", description: "فراولة وجريب فروت" }
  },

  // Juices
  'juice-1': {
    fr: { name: "Citron Menthe", description: "Citron piquant avec menthe" },
    ar: { name: "ليمون ونعناع", description: "ليمون لاذع مع نعناع" }
  },
  'juice-2': {
    fr: { name: "Punch Ananas", description: "Mélange ananas tropical" },
    ar: { name: "بنش الأناناس", description: "مزيج أناناس استوائي" }
  },
  'juice-3': {
    fr: { name: "Éclat Mangue", description: "Purée de mangue Alphonso" },
    ar: { name: "توهج المانجو", description: "هريس مانجو ألفونسو" }
  },

  // Latte Hot
  'latte-1': {
    fr: { name: "Latte Classique", description: "Double dose, lait vapeur" },
    ar: { name: "لاتيه كلاسيكي", description: "جرعة مزدوجة، حليب مبخر" }
  },
  'latte-2': {
    fr: { name: "Latte Vanille", description: "Sirop vanille maison" },
    ar: { name: "لاتيه فانيليا", description: "شراب فانيليا منزلي" }
  },
  'latte-3': {
    fr: { name: "Latte Caramel", description: "Filet de caramel au beurre" },
    ar: { name: "لاتيه كراميل", description: "رذاذ كراميل بالزبدة" }
  },
  'latte-4': {
    fr: { name: "Pumpkin Spice Latte", description: "Épices de saison & purée" },
    ar: { name: "لاتيه توابل اليقطين", description: "توابل موسمية وهريس" }
  },

  // Tea
  'tea-1': {
    fr: { name: "Matcha Cérémonial", description: "Moulu sur pierre, riche en umami" },
    ar: { name: "ماتشا احتفالي", description: "مطحون على الحجر، غني بالأومامي" }
  },
  'tea-2': {
    fr: { name: "Masala Chai", description: "Épicé, crémeux, réchauffant" },
    ar: { name: "ماسالا تشاي", description: "متبل، كريمي، دافئ" }
  },
  'tea-3': {
    fr: { name: "Gingembre Citron", description: "Piquant, infusion apaisante" },
    ar: { name: "زنجبيل وليمون", description: "لاذع، نقيع مهدئ" }
  },
  'tea-4': {
    fr: { name: "Menthe Marocaine", description: "Thé vert rafraîchissant" },
    ar: { name: "شاي مغربي بالنعناع", description: "شاي أخضر منعش" }
  },
  'tea-5': {
    fr: { name: "Thé au Lait Royal", description: "Thé noir, lait, caramel" },
    ar: { name: "شاي بالحليب ملكي", description: "شاي أسود، حليب، كراميل" }
  },
  'tea-6': {
    fr: { name: "Oolong Pêche Glacé", description: "Fruité, floral, frais" },
    ar: { name: "أولونغ الخوخ المثلج", description: "فاكهي، زهري، بارد" }
  },

  // Smoothie & Shake
  'smoothie-1': {
    fr: { name: "Explosion de Baies", description: "Fraise, myrtille, yaourt" },
    ar: { name: "انفجار التوت", description: "فراولة، توت أزرق، زبادي" }
  },
  'smoothie-2': {
    fr: { name: "Force Verte", description: "Épinards, pomme, banane" },
    ar: { name: "القوة الخضراء", description: "سبانخ، تفاح، موز" }
  },
  'shake-1': {
    fr: { name: "Shake Chocolat Classique", description: "Cacao riche, base crémeuse" },
    ar: { name: "شيك شوكولاتة كلاسيكي", description: "كاكاو غني، قاعدة كريمية" }
  },
  'shake-2': {
    fr: { name: "Shake Vanille", description: "Vanille de Madagascar, onctueux" },
    ar: { name: "شيك فانيليا", description: "فانيليا مدغشقر، ناعم" }
  },
  'shake-3': {
    fr: { name: "Délice Fraise", description: "Fraises fraîches, crème" },
    ar: { name: "بهجة الفراولة", description: "فراولة طازجة، كريمة" }
  },
  'shake-4': {
    fr: { name: "Banane Caramel", description: "Banane, filet de caramel" },
    ar: { name: "موز وكراميل", description: "موز، رذاذ كراميل" }
  },

  // Toast
  'toast-1': {
    fr: { name: "Bénédicte Signature", description: "Œufs pochés, hollandaise" },
    ar: { name: "بنديكت المميز", description: "بيض مسلوق، هولنديز" }
  },
  'toast-2': {
    fr: { name: "Omelette Truffe", description: "Champignons, huile de truffe" },
    ar: { name: "عجة الكمأة", description: "فطر، زيت الكمأة" }
  },
  'toast-3': {
    fr: { name: "Shakshuka", description: "Tomate, poivrons, œufs" },
    ar: { name: "شكشوكة", description: "طماطم، فلفل، بيض" }
  },
  'toast-4': {
    fr: { name: "Toast Avocat", description: "Levain, avocat écrasé" },
    ar: { name: "توست الأفوكادو", description: "خبز العجين المخمر، أفوكادو مهروس" }
  },
  'toast-5': {
    fr: { name: "Bénédicte Classique", description: "Jambon, hollandaise" },
    ar: { name: "بنديكت كلاسيكي", description: "لحم، هولنديز" }
  },
  'toast-6': {
    fr: { name: "Bol Énergie Vegan", description: "Graines, légumes verts" },
    ar: { name: "وعاء الطاقة النباتي", description: "حبوب، خضروات" }
  },

  // Pastry
  'pastry-1': {
    fr: { name: "Croissant au Beurre", description: "Feuilleté, beurre français" },
    ar: { name: "كرواسون بالزبدة", description: "طبقات هشة، زبدة فرنسية" }
  },
  'pastry-2': {
    fr: { name: "Croissant aux Amandes", description: "Frangipane, amandes grillées" },
    ar: { name: "كرواسون باللوز", description: "فرانجيبان، لوز محمص" }
  },
  'pastry-3': {
    fr: { name: "Éclair au Chocolat", description: "Pâte à choux, ganache riche" },
    ar: { name: "إكلير الشوكولاتة", description: "عجينة الشو، غاناش غني" }
  },
  'pastry-4': {
    fr: { name: "Tarte aux Fraises", description: "Crème pâtissière, fraises fraîches" },
    ar: { name: "تارت الفراولة", description: "كاسترد الفانيليا، فراولة طازجة" }
  },
  'pastry-5': {
    fr: { name: "Tarte Citron Meringuée", description: "Caillé piquant, meringue brûlée" },
    ar: { name: "تارت الليمون والميرينغ", description: "خثرة لاذعة، ميرينغ محمر" }
  },
  'pastry-6': {
    fr: { name: "Part de Gâteau Velours", description: "Mie moelleuse, glaçage vanille" },
    ar: { name: "شريحة كيك مخملي", description: "فتات رطب، كريمة فانيليا" }
  }
};

function getTranslation(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || (translations['en'] && translations['en'][key]) || key;
}

function getMenuTranslation(item, field) {
  const lang = getLang();
  if (lang === 'en') return item[field];

  if (menuTranslations[item.id] && menuTranslations[item.id][lang] && menuTranslations[item.id][lang][field]) {
    return menuTranslations[item.id][lang][field];
  }
  return item[field];
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('stitch_lang', lang);

  // RTL Support
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
  }

  // Update static text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update Toggle UI
  const toggle = document.getElementById('language-toggle');
  const label = document.getElementById('current-language');
  if (toggle && label) {
    toggle.classList.remove('lang-en', 'lang-fr', 'lang-ar');
    toggle.classList.add(`lang-${lang}`);
    label.textContent = lang === 'en' ? 'English' : (lang === 'fr' ? 'Français' : 'العربية');
  }

  // Re-render content
  if (typeof bestsellers !== 'undefined' && bestsellers.length) {
    renderBestsellers(bestsellers);
  }
  // renderCategories();
  updateCartUI();

  const modal = document.getElementById('order-modal');
  if (modal && !modal.classList.contains('hidden')) {
    renderCartItems();
  }
}

function getLang() {
  return localStorage.getItem('stitch_lang') || 'en';
}

document.addEventListener('DOMContentLoaded', () => {
  cart = getStoredCart();
  updateCartUI();
  fetchBestsellers();
  // // renderCategories();
  setupEvents();

  // Check for language preference
  const lang = getLang();
  applyLang(lang); // Always apply to ensure UI sync

  setupLanguageToggle();
});

function setupLanguageToggle() {
  const toggle = document.getElementById('language-toggle');

  if (!toggle) return;

  toggle.addEventListener('click', function () {
    const current = getLang();
    let next = 'en';
    if (current === 'en') next = 'fr';
    else if (current === 'fr') next = 'ar';
    else if (current === 'ar') next = 'en';

    applyLang(next);
  });
}
