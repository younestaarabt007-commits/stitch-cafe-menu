
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

function normalizeImagePath(path) {
  if (!path || typeof path !== 'string') return path;
  if (path.startsWith('../../images/')) return path.replace('../../images/', '../images/');
  if (path.startsWith('assets/')) return '../' + path;
  return path;
}

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

  if (!items || items.length === 0) {
    console.error('No items to render!');
    return;
  }

  const ordered = items;
  let html = '';

  ordered.forEach((item, index) => {
    try {
      if (!item) return;

      let imgUrl = normalizeImagePath(item.image || item.image_url);
      const isDefault = imgUrl && imgUrl.includes('photo-1546069901');
      const displayImg = (imgUrl && !isDefault) ? imgUrl : normalizeImagePath(getFallbackImage(item, index));
      const rating = typeof item.rating === 'number' ? item.rating : getRatingForItem(item);
      const fallback = normalizeImagePath(getFallbackImage(item, index + 50));
      
      item._displayImage = displayImg;

      const nameText = (() => {
        try {
          const base = getMenuTranslation(item, 'name') || item.name || 'Unknown Item';
          return getLang() === 'en' ? summarizeEnglishName(canonicalizeEnglishName(base)) : base;
        } catch (e) {
          console.warn('Error processing name for item:', item.id, e);
          return item.name || 'Item';
        }
      })();

      const descText = (() => {
        try {
          return getMenuTranslation(item, 'description') || item.description || '';
        } catch (e) {
          return item.description || '';
        }
      })();

      const priceText = typeof item.price === 'number' ? item.price.toFixed(2) : (item.price || '0.00');

      html += `
      <div class="bg-white dark:bg-[#2a1e19] rounded-[1.5rem] p-3 shadow-md border border-gray-100 dark:border-white/5 flex gap-4 items-center relative" data-category="${item.category || 'all'}">
        <div class="absolute top-3 right-3 bg-white/90 dark:bg-black/60 px-2 py-1 rounded-full shadow-sm z-10">
          <span class="material-symbols-outlined text-[14px] text-green-600 dark:text-green-400">${getCategoryIcon(item.category)}</span>
        </div>
        <div class="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-black/20 relative shrink-0">
          <img src="${displayImg}" class="w-full h-full object-cover" alt="${nameText}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
        </div>
        <div class="flex-1 min-w-0 flex flex-col h-24 md:h-32 justify-between py-0.5">
          <div>
            <h4 class="font-bold text-[13px] md:text-sm text-gray-900 dark:text-white leading-tight pr-6">${nameText}</h4>
            <div class="flex items-center gap-1 mt-1">
              <span class="material-symbols-outlined text-[14px] text-[#FFC107]" style="font-variation-settings: 'FILL' 1">star</span>
              <span class="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">${Number(rating).toFixed(1)}</span>
              <span class="text-[10px] text-gray-400">(${Math.floor(Number(rating) * 25)}+)</span>
            </div>
            <p class="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">${descText}</p>
          </div>
          <div class="flex items-center justify-between mt-auto">
            <span class="text-xs font-bold text-primary">${priceText}DH</span>
            <button onclick="addToCart('${item.id}')" class="w-[84px] h-[36px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200" style="color: white !important;">
              ${getTranslation('add')}
            </button>
          </div>
        </div>
      </div>
      `;

      // Inject BOTH Promo Carousels after every 8 items
      if ((index + 1) % 8 === 0) {
        html += renderSmallPromoCarousel();
        html += renderBannerPromoCarousel();
      }
    } catch (err) {
      console.error('Critical error rendering item at index', index, err);
    }
  });

  container.innerHTML = html;
}

function renderSmallPromoCarousel() {
  const variations = [
    { tag: 'Special Edition', title: 'Limited Roast', desc: 'Ethiopian Yirgacheffe G1 Premium', img: '../images/header images of sub catégorie/black coffee header image .jpg' },
    { tag: 'Morning Deal', title: 'Breakfast Special', desc: 'Freshly baked croissants & pastries', img: '../images/sub catégories icons/Breakfast.jpg' },
    { tag: 'Healthy Choice', title: 'Fresh & Vibrant', desc: 'Seasonal fruit smoothies', img: '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg' },
    { tag: 'Daily Fresh', title: "Baker's Choice", desc: 'Artisanal Sourdough crusts', img: '../assets/subcat_icons/artisanal bread.jpg' },
    { tag: 'Summer Vibe', title: 'Citrus Refresh', desc: 'Iced organic juice blends', img: '../images/header images of sub catégorie/juces header image.jpg' },
    { tag: 'Indulgence', title: 'Sweet Treats', desc: 'Decadent velvet chocolate cakes', img: '../images/header images of sub catégorie/sweet pastries header image.jpg' },
    { tag: 'Cool Down', title: 'Creamy Delights', desc: 'Classic vanilla bean milkshakes', img: '../images/header images of sub catégorie/milkshake header image.jpg' },
    { tag: 'Energy', title: 'Morning Boost', desc: 'Avocado & poached egg toast', img: '../images/sub catégorie images/toast/Toast Champignon Frommage.jpg' },
    { tag: 'Relax', title: 'Zen Moment', desc: 'Premium matcha green tea', img: '../assets/images/Tea an infussion header image.jpg' }
  ];

  let slidesHtml = variations.map(v => `
      <div style="width: 11.11111%;" class="shrink-0 h-full relative border border-white/10 group bg-[#1a0f08] flex items-center px-6 shadow-xl">
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 group-hover:opacity-60 transition-opacity">
            <img src="${v.img}" class="w-full h-full object-cover">
        </div>
        <div class="relative z-20 flex-1 flex flex-col justify-center py-4">
            <span class="bg-primary/20 text-primary text-[10px] font-bold w-fit px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">${v.tag}</span>
            <h3 class="text-white font-bold text-lg leading-tight mt-1">${v.title}</h3>
            <p class="text-white/60 text-[11px] mt-0.5">${v.desc}</p>
        </div>
        <div class="relative z-20 flex items-center">
            <button class="bg-primary text-white text-[11px] font-bold px-5 py-2.5 rounded-full uppercase shadow-glow active:scale-95 transition-transform">
                Try Now
            </button>
        </div>
      </div>
  `).join('');

  return `
  <div class="col-span-full my-4 -mx-1">
    <div class="w-full h-24 rounded-[2rem] overflow-hidden relative promo-container">
      <div class="promo-track-left flex w-[900%] h-full transition-transform duration-500 ease-in-out">
        ${slidesHtml}
      </div>
    </div>
  </div>
  `;
}

function renderBannerPromoCarousel() {
  const variations = [
    { color: 'orange', name: 'Juice', img: '../images/header images of sub catégorie/juces header image.jpg' },
    { color: 'blue', name: 'Milkshake', img: '../images/header images of sub catégorie/milkshake header image.jpg' },
    { color: 'pink', name: 'Sweet', img: '../images/header images of sub catégorie/sweet pastries header image.jpg' },
    { color: 'emerald', name: 'Tea', img: '../assets/images/Tea an infussion header image.jpg' },
    { color: 'slate', name: 'Coffee', img: '../images/header images of sub catégorie/black coffee header image .jpg' },
    { color: 'yellow', name: 'Breakfast', img: '../images/sub catégories icons/Breakfast.jpg' },
    { color: 'rose', name: 'Smoothie', img: '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg' },
    { color: 'amber', name: 'Toast', img: '../images/sub catégorie images/toast/Toast Champignon Frommage.jpg' },
    { color: 'fuchsia', name: 'Bread', img: '../assets/subcat_icons/artisanal bread.jpg' }
  ];

  let slidesHtml = variations.map(theme => `
      <div style="width: 11.11111%;" class="shrink-0 h-full relative group">
        <div class="w-full h-full bg-gradient-to-r from-${theme.color}-50 to-${theme.color}-100 dark:from-slate-800 dark:to-slate-900 border border-${theme.color}-200/50 relative overflow-hidden flex items-center p-6 shadow-lg">
          <div class="absolute right-[-10%] top-0 bottom-0 w-[180px] bg-center bg-contain bg-no-repeat opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" 
               style='background-image: url("${theme.img}");'></div>
          <div class="relative z-10 w-full flex justify-between items-center">
              <div class="w-2/3">
                  <h3 class="font-bold text-${theme.color}-600 dark:text-${theme.color}-400 text-[10px] uppercase tracking-[0.2em] mb-1">Subscription Packs</h3>
                  <p class="font-extrabold text-xl text-gray-900 dark:text-white leading-tight">${theme.name} Packs</p>
                  <div class="mt-3 inline-flex items-center gap-2 text-primary text-[12px] font-bold uppercase tracking-wider cursor-pointer hover:gap-3 transition-all">
                      <span>Explore Plans</span> 
                      <span class="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </div>
              </div>
              <div class="w-1/3 flex justify-end">
                  <div class="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-white dark:border-white/10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <img src="${theme.img}" class="w-full h-full object-cover">
                  </div>
              </div>
          </div>
        </div>
      </div>
  `).join('');

  return `
  <div class="col-span-full my-4 -mx-1">
    <div class="w-full h-[120px] rounded-[2rem] overflow-hidden relative promo-container">
      <!-- We initialize this track offset so it can travel "Right" -->
      <div class="promo-track-right flex w-[900%] h-full transition-transform duration-500 ease-in-out" style="transform: translateX(-88.8888%);">
        ${slidesHtml}
      </div>
    </div>
  </div>
  `;
}

// Global Carousel Animation logic
let promoCarouselIndex = 0;
let promoCarouselInterval = null;

function startPromoCarousels() {
  if (promoCarouselInterval) clearInterval(promoCarouselInterval);

  // Set initial state for right tracks
  const rightTracks = document.querySelectorAll('.promo-track-right');
  rightTracks.forEach(track => {
    track.style.transform = `translateX(-88.8888%)`; // (-8 * 100/9)
  });

  promoCarouselInterval = setInterval(() => {
    promoCarouselIndex = (promoCarouselIndex + 1) % 9;
    
    // Left Sliding Card 1
    const leftTracks = document.querySelectorAll('.promo-track-left');
    leftTracks.forEach(track => {
      // 9 items = width 900%. Each item is 100/9 = 11.1111% of the track.
      track.style.transform = `translateX(-${promoCarouselIndex * 11.1111}%)`;
    });

    // Right Sliding Card 2
    const rightTracks = document.querySelectorAll('.promo-track-right');
    rightTracks.forEach(track => {
      // Starts at index 8 (-88.88%), moves towards index 0 (0%)
      const reverseIndex = 8 - promoCarouselIndex;
      track.style.transform = `translateX(-${reverseIndex * 11.1111}%)`;
    });
  }, 2000);
}

function renderCategories(items) {
  // SUB-CATEGORIES to be displayed as circles with real images
  const subCategories = [
    { name: getTranslation('Tea & Infusion'), img: '../assets/subcat_icons/tea icon .png', link: '../tea and infusion sub catégorie page/index.html' },
    { name: getTranslation('Milkshake'), img: '../assets/subcat_icons/milkshake icon.png', link: '../milkshake sub catégorie page/index.html' },
    { name: getTranslation('Juice'), img: '../assets/subcat_icons/juces icon.png', link: '../juces sub catégorie page/index.html' },
    { name: getTranslation('Sweet Pastries'), img: '../images/sub catégories icons/sweet pastry icon.png', link: '../sweet pastries sub catégorie page/index.html' },
    { name: getTranslation('Cold Drinks') || 'Cold Drinks', img: '../images/sub catégories icons/Cold drinks icon.jpg', link: '../cold drinks sub catégorie page/index.html' },
    { name: getTranslation('Black Coffee'), img: '../assets/subcat_icons/black coffe icon.jpg', link: '../black coffee sub catégorie page/index.html' },
    { name: getTranslation('Latte'), img: '../assets/subcat_icons/latté icon.jpg', link: '../latté hot drink sub catégorie page/index.html' },
    { name: getTranslation('Smoothie'), img: '../assets/subcat_icons/smoothie icon.png', link: '../smothie sub catégorie page/index.html' },
    { name: getTranslation('Toast'), img: '../assets/subcat_icons/sandwich or toast icon .jpg', link: '../toast brunch sub catégorie page/index.html' },
    { name: getTranslation('Breakfast'), img: '../images/sub catégories icons/Breakfast.jpg', link: '../petit dejeuner sub catégorie page/index.html' },
    { name: getTranslation('Artisanal Bread'), img: '../assets/subcat_icons/artisanal bread.jpg', link: '../artisanal bread sub catégorie page/index.html' },
    { name: getTranslation('Fast Food') || 'Fast Food', img: '../images/sub catégories icons/Snack Food.jpg', link: '../fast food sub catégorie page/index.html' }
  ];

  const container = document.getElementById('explore-categories');
  if (!container) return;

  container.innerHTML = subCategories.map(cat => `
    <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='${cat.link}'">
      <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
          <div class="w-16 h-16 rounded-full overflow-hidden relative">
            <img src="${cat.img}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../assets/waiter.jpg'">
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
    'Toast': 'breakfast_dining',
    'Fast Food': 'fastfood'
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
    'Bread': 4.4,
    'Fast Food': 4.6
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
  } else if (category.includes('fast food')) {
    customizationPage = '../fast_food_customization_view/index.html';
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
  let imgPath = normalizeImagePath(item._displayImage || item.image || getFallbackImage(item, 0));

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
  if (name.includes('milkshake')) return '../images/sub catégorie images/milshake/close-up-milkshake-glass-plate_.jpg';
  if (name.includes('smoothie')) return '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg';
  if (name.includes('juice') || name.includes('orange')) return '../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif';
  if (name.includes('tea')) return '../images/sub catégorie images/tea/Tea Citron Délise.jpg';
  if (name.includes('toast') || name.includes('benedict')) return '../images/sub catégorie images/toast/Toast Champignon Frommage.jpg';
  if (name.includes('pancake')) return '../images/sub catégorie images/sweets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg';
  if (name.includes('pastry') || name.includes('croissant')) return '../images/sub catégorie images/sweets/French Toast.jpg';
  if (name.includes('mango')) return '../images/sub catégorie images/Jus/delicious-indian-mango-drink-high-angle_23-2148734680.avif';

  // Fallback pool of local images
  const pool = [
    '../images/sub catégorie images/Brunch food/Salade Cesar.jpg',
    '../images/sub catégorie images/Brunch food/Salade Mexicaine.jpg',
    '../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg',
    '../images/sub catégorie images/sweets/panne cake with berries .png',
    '../images/sub catégorie images/Jus/colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521.avif',
    '../images/sub catégorie images/tea/Tea Nordique.jpg',
    '../images/sub catégorie images/black coffee/Café Noir Italien.jpg',
    '../images/sub catégorie images/sweets/Orange Chesse Cake.jpg'
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
        image: order.image && order.image.startsWith('assets/') ? '../' + order.image : (normalizeImagePath(order.image) || '../assets/waiter.jpg'),
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
  startPromoCarousels();
  initSearch();
});

function handleTableContext() {
  if (!currentTable) return;

  // 1. Update Table Badge in UI
  const badge = document.getElementById('table-badge');
  if (badge) {
    // Find the text element inside the badge to preserve the icon
    const textSpan = badge.querySelector('span[data-i18n^="table"]');
    if (textSpan) {
      textSpan.textContent = `Table ${currentTable}`;
    } else {
      // Fallback if structure is different
      badge.textContent = `Table ${currentTable}`;
    }
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
  if (categoryId === 'bakery' || categoryId === 'pastry') {
    window.location.href = '../artisanal bread sub catégorie page/index.html'; // Assuming this is where artisan bread/pastry is
    return;
  }
  if (categoryId === 'sweet pastries') {
    window.location.href = '../sweet pastries sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'fast food') {
    window.location.href = '../fast food sub catégorie page/index.html';
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
  // Search button is now handled by initSearch input listener
  // but we can add a focus shortcut here if needed
  const searchBtn = document.querySelector('.material-symbols-outlined.text-xl'); 
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      document.getElementById('search-input')?.focus();
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

  const placeOrderBtn = document.getElementById('order-place-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', placeOrder);
  }
}

function placeOrder() {
  if (cart.length === 0) {
    alert(getTranslation('cart_empty') || "Your cart is empty!");
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal * 1.1; // 10% tax

  const orderData = {
    merchantId: 'm1', // Default for now
    table: currentTable || 'Online',
    customer: localStorage.getItem('stitch_customer_name') || 'Guest',
    itemsList: cart.map(item => ({
      name: getMenuTranslation(item, 'name'),
      qty: item.quantity,
      price: item.price,
      image_url: item.image
    })),
    total: `${total.toFixed(2)}DH`,
    timestamp: Date.now()
  };

  if (window.CentralStore) {
    window.CentralStore.addOrder(orderData);
    
    // UI Feedback
    const btn = document.getElementById('order-place-btn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "✓ SENT";
    btn.classList.replace('bg-primary', 'bg-green-500');

    setTimeout(() => {
      cart = [];
      localStorage.removeItem('stitch_cart');
      updateCartUI();
      closeOrderModal();
      
      // Reset button
      btn.disabled = false;
      btn.textContent = originalText;
      btn.classList.replace('bg-green-500', 'bg-primary');
      
      alert("Order placed successfully! The kitchen is preparing your food.");
    }, 1500);
  } else {
    alert("Ordering system offline. Please try again later.");
  }
}

// Menu translations are now managed globally in i18n.js

function canonicalizeEnglishName(s) {
  if (!s || typeof s !== 'string') return s;
  let t = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  t = t.replace(/’/g, "'");
  const lowers = t.toLowerCase();
  const fruitMap = {
    'ananas': 'pineapple',
    'fraise': 'strawberry',
    'pomme': 'apple',
    'mangue': 'mango',
    'citron': 'lemon',
    'peche': 'peach',
    'framboise': 'raspberry',
    'myrtille': 'blueberry',
    'banane': 'banana',
    'orange': 'orange',
    'kiwi': 'kiwi',
    'avocat': 'avocado',
    'papae': 'papaya',
    'grenadine': 'pomegranate'
  };
  let out = lowers;
  out = out.replace(/\bjus\s+(d'|de\s+)?([a-z]+(?:\s+[a-z]+)*)/g, (_, __, fruit) => {
    const words = fruit.trim().split(/\s+/).map(w => fruitMap[w] || w);
    return `${words.join(' ')} juice`;
  });
  out = out.replace(/\bsalade\s+(de|d')\s+([a-z]+(?:\s+[a-z]+)*)/g, (_, __, what) => {
    return `${what.trim()} salad`;
  });
  const repl = [
    ['petit dejeuner', 'breakfast'],
    ['oeufs', 'eggs'],
    ['oeuf', 'egg'],
    ['cafe au lait', 'coffee with milk'],
    ['cafe', 'coffee'],
    ['noire', 'black'],
    ['noir', 'black'],
    ['italien', 'italian'],
    ['marocain', 'moroccan'],
    ['marocaine', 'moroccan'],
    ['nordique', 'nordic'],
    ['latino', 'latin'],
    ['cesar', 'caesar'],
    ['salade', 'salad'],
    ['creme', 'cream'],
    ['citron', 'lemon'],
    ['fraise', 'strawberry'],
    ['gaufre', 'waffle'],
    ['chocolat', 'chocolate'],
    ['lait', 'milk'],
    ['vanille', 'vanilla'],
    ['caramel', 'caramel'],
    ['banane', 'banana'],
    ['frommage', 'cheese'],
    ['fromage', 'cheese'],
    ['champignon', 'mushroom'],
    ['the', 'tea'],
    ['menthe', 'mint'],
    ['lavande', 'lavender'],
    ['myrtille', 'blueberry'],
    ['pomme', 'apple'],
    ['mangue', 'mango'],
    ['peche', 'peach'],
    ['avocat', 'avocado'],
    ['russe', 'russian'],
    ['mexicaine', 'mexican'],
    ['belge', 'belgian'],
    ['citronnelle', 'lemongrass'],
    ['citronnelle', 'lemongrass'],
    ['citron vert', 'lime'],
    ['focaccia', 'focaccia'],
    ['babka', 'babka'],
    ['croissant', 'croissant'],
    ['tarte', 'tart'],
    ['gateau', 'cake'],
    ['velours', 'velvet'],
    ['eclair', 'eclair'],
    ['espresso', 'espresso']
  ];
  repl.forEach(([a, b]) => {
    const r = new RegExp(`\\b${a}\\b`, 'g');
    out = out.replace(r, b);
  });
  out = out.replace(/\bau\b/g, 'to').replace(/\bde\b/g, 'of').replace(/\bet\b/g, 'and').replace(/\bavec\b/g, 'with').replace(/\bla\b/g, '').replace(/\ble\b/g, '').replace(/\bdu\b/g, '').replace(/\bdes\b/g, '');
  out = out.replace(/\bsalad\s+([a-z]+)/g, (_, adj) => `${adj} salad`);
  out = out.replace(/[_\-]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  const small = new Set(['and','or','of','the','with','to','a','an','in','on','for']);
  out = out.split(' ').map((w,i) => {
    if (!w) return w;
    if (small.has(w) && i !== 0) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
  return out;
}

function summarizeEnglishName(s) {
  if (!s || typeof s !== 'string') return s;
  const cleaned = s
    .replace(/\.(png|jpg|jpeg|avif|webp)$/i, '')
    .replace(/\b\d{3,}\b/g, ' ')
    .replace(/\bpng\b|\bjpeg\b|\bjpg\b|\bavif\b|\bwebp\b/gi, ' ')
    .replace(/\bisolated\b|\btransparent\b|\bbackground\b|\bimage\b/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const stop = new Set(['with','and','of','the','to','for','on','in','or','from','by','over','under','into','a','an','at','as','is','are','was','were','be','being','been','served','serving','fresh','delicious','tasty','garnished','creating','featuring','perfect','presentation','high','angle','close','up','bursting','shape','glass','umbrella','straw','plate','breakfast','brunch','english']);
  const words = cleaned.split(/[\s\-_,/]+/).filter(Boolean);
  const uniq = [];
  for (const w of words) {
    const lw = w.toLowerCase();
    if (stop.has(lw)) continue;
    if (/^\d+$/.test(lw)) continue;
    if (lw.length < 2) continue;
    if (!uniq.includes(lw)) uniq.push(lw);
  }
  const has = (k) => uniq.includes(k);
  if (has('salad')) {
    if (has('caesar') || has('cesar')) return 'Cesar Salad';
    if (has('moroccan') || has('marocain') || has('marocaine')) return 'Moroccan Salad';
    return 'Salad';
  }
  const keyOrder = ['benedict','eggs','egg','breakfast','brunch','salmon','omelette','scrambled','waffle','pancake','toast','salad','croissant','tart','cake','eclair','babka','focaccia','latte','espresso','coffee','tea','juice','smoothie','milkshake','cocktail','mango','orange','blueberry','strawberry','lemon'];
  const eggIdx = uniq.indexOf('egg');
  if (eggIdx !== -1 && !uniq.includes('eggs')) {
    uniq[eggIdx] = 'eggs';
  }
  uniq.sort((a,b) => {
    const ia = keyOrder.indexOf(a);
    const ib = keyOrder.indexOf(b);
    const sa = ia === -1 ? 999 : ia;
    const sb = ib === -1 ? 999 : ib;
    if (sa !== sb) return sa - sb;
    return 0;
  });
  const top = uniq.slice(0,3).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return top.join(' ').trim() || s;
}

function generateFrenchFromEnglishSummary(name) {
  if (!name || typeof name !== 'string') return name;
  const dict = {
    'benedict':'Bénédicte','eggs':'Œufs','egg':'Œuf','salmon':'Saumon','omelette':'Omelette','scrambled':'Brouillés','waffle':'Gaufre','pancake':'Pancake','toast':'Toast','salad':'Salade','croissant':'Croissant','tart':'Tarte','cake':'Gâteau','eclair':'Éclair','babka':'Babka','focaccia':'Focaccia','latte':'Latte','espresso':'Espresso','coffee':'Café','tea':'Thé','juice':'Jus','smoothie':'Smoothie','milkshake':'Milkshake','cocktail':'Cocktail','mango':'Mangue','orange':'Orange','blueberry':'Myrtille','strawberry':'Fraise','raspberry':'Framboise','banana':'Banane','apple':'Pomme','peach':'Pêche','lemon':'Citron','lime':'Citron vert','lemongrass':'Citronnelle','avocado':'Avocat','mint':'Menthe','rosemary':'Romarin','iced':'Glacé','indian':'Indien','drink':'Boisson','slice':'Tranche','zest':'Zeste','cheese':'Fromage','chesse':'Fromage','vanilla':'Vanille','caramel':'Caramel','chocolate':'Chocolat','caesar':'César','cesar':'César'
  };
  return name.split(' ').map(t => dict[t.toLowerCase()] || t).join(' ');
}

function generateArabicFromEnglishSummary(name) {
  if (!name || typeof name !== 'string') return name;
  const tokens = name.toLowerCase().split(/\s+/).filter(Boolean);
  const has = (k) => tokens.includes(k);
  const flavors = ['mango','orange','lemon','lime','apple','peach','banana','strawberry','blueberry','raspberry','avocado','vanilla','caramel','chocolate','mint','rosemary'];
  const arDef = {
    mango:'المانجو', orange:'البرتقال', lemon:'الليمون', lime:'الليمون الأخضر', apple:'التفاح', peach:'الخوخ', banana:'الموز',
    strawberry:'الفراولة', blueberry:'التوت الأزرق', raspberry:'التوت الأحمر', avocado:'الأفوكادو',
    vanilla:'الفانيليا', caramel:'الكراميل', chocolate:'الشوكولاتة', mint:'النعناع', rosemary:'إكليل الجبل',
    salmon:'السلمون', cheese:'الجبن', mushroom:'الفطر', moroccan:'المغربية', caesar:'قيصر', cesar:'قيصر'
  };
  const pickFlavor = () => {
    for (const f of flavors) if (has(f)) return f;
    return null;
  };
  const flavor = pickFlavor();
  if (has('juice')) {
    if (flavor) return `عصير ${arDef[flavor] || ''}`.trim();
    return 'عصير';
  }
  if (has('smoothie')) {
    if (flavor) return `سموثي ${arDef[flavor] || ''}`.trim();
    return 'سموثي';
  }
  if (has('milkshake')) {
    if (flavor) return `ميلك شيك ${arDef[flavor] || ''}`.trim();
    return 'ميلك شيك';
  }
  if (has('latte')) {
    const iced = has('iced');
    if (flavor) return `لاتيه ${arDef[flavor] || ''}${iced ? ' مثلج' : ''}`.trim();
    return iced ? 'لاتيه مثلج' : 'لاتيه';
  }
  if (has('espresso')) {
    return 'إسبريسو';
  }
  if (has('coffee')) {
    const iced = has('iced');
    return iced ? 'قهوة مثلجة' : 'قهوة';
  }
  if (has('tea')) {
    if (has('moroccan') && has('mint')) return 'شاي مغربي بالنعناع';
    if (has('mint')) return 'شاي بالنعناع';
    if (flavor) return `شاي ${arDef[flavor] || ''}`.trim();
    return 'شاي';
  }
  if (has('benedict')) {
    if (has('salmon')) return 'بيض بنديكت بالسلمون';
    return 'بيض بنديكت';
  }
  if (has('omelette')) {
    if (has('cheese') && has('mushroom')) return 'عجة بالجبن والفطر';
    if (has('cheese')) return 'عجة بالجبن';
    if (has('mushroom')) return 'عجة بالفطر';
    return 'عجة';
  }
  if (has('scrambled') && has('eggs')) {
    if (has('rosemary')) return 'بيض مخفوق بإكليل الجبل';
    return 'بيض مخفوق';
  }
  if (has('salad')) {
    if (has('moroccan')) return 'سلطة مغربية';
    if (has('caesar')) return 'سلطة قيصر';
    if (flavor) return `سلطة ${arDef[flavor] || ''}`.trim();
    return 'سلطة';
  }
  if (has('cake')) {
    if (has('cheese') && flavor) return `كعكة الجبن بـ${arDef[flavor] ? arDef[flavor].replace(/^ال/,'ال') : ''}`.trim();
    if (has('cheese')) return 'كعكة الجبن';
    if (flavor) return `كيك ${arDef[flavor] || ''}`.trim();
    return 'كيك';
  }
  if (has('tart')) {
    if (flavor) return `تارت ${arDef[flavor] || ''}`.trim();
    return 'تارت';
  }
  if (has('eclair')) {
    if (flavor) return `إكلير ${arDef[flavor] || ''}`.trim();
    return 'إكلير';
  }
  if (has('croissant')) {
    if (has('benedict') && has('salmon')) return 'كرواسون بنديكت بالسلمون';
    if (has('benedict')) return 'كرواسون بنديكت';
    if (flavor) return `كرواسون ${arDef[flavor] || ''}`.trim();
    return 'كرواسون';
  }
  if (has('waffle')) {
    if (flavor) return `وافل بـ${arDef[flavor] ? arDef[flavor].replace(/^ال/,'ال') : ''}`.trim();
    return 'وافل';
  }
  if (has('pancake')) {
    if (flavor) return `بان كيك بـ${arDef[flavor] ? arDef[flavor].replace(/^ال/,'ال') : ''}`.trim();
    return 'بان كيك';
  }
  if (has('toast')) {
    if (has('avocado')) return 'توست بالأفوكادو';
    if (has('cheese') && has('mushroom')) return 'توست بالجبن والفطر';
    if (has('cheese')) return 'توست بالجبن';
    if (has('mushroom')) return 'توست بالفطر';
    return 'توست';
  }
  if (has('infusion')) return 'نقيع';
  if (has('brew') || has('cold') && has('brew')) return 'كولد برو';
  if (has('matcha')) return 'ماتشا';
  if (has('chai') || has('masala')) return 'تشاي ماسالا';
  if (has('hibiscus')) return 'كركديه';
  if (has('moroccan') || has('marocain')) return 'مغربي';
  if (has('nordic') || has('nordique')) return 'شمالي';
  if (has('citron') || has('lemon')) return 'ليمون';
  if (has('royal')) return 'رويال';
  if (has('normal')) return 'قهوة عادية';
  if (has('américain') || has('americain')) return 'قهوة أمريكية';
  if (has('noire') || has('noir')) return 'قهوة سوداء';
  if (has('italien') || has('italian')) return 'إيطالي';
  if (has('léger') || has('leger')) return 'خفيف';
  if (has('au') && has('lait')) return 'قهوة بالحليب';
  if (has('crème') || has('creme')) return 'كريمة';
  if (has('au') && has('lait') && has('artisanal')) return 'قهوة حرفية بالحليب';
  if (has('chocolate') || has('chocolat')) return 'شوكولاتة';
  if (has('fondue')) return 'شوكولاتة مذابة';
  if (has('split')) return 'سبليت';
  if (has('french')) return 'فرنسي';
  if (has('mille') && has('feuilles')) return 'ميل فوي';
  if (has('teramisu') || has('tiramisu')) return 'تيراميسو';
  if (has('waffels') || has('waffle')) return 'وافل';
  if (has('chees') || has('cheese')) return 'جبن';
  if (has('citron') || has('lemon')) return 'ليمون';
  if (has('dark') && has('white')) return 'شوكولاتة بيضاء وداكنة';
  if (has('oreo')) return 'أوريو';
  if (has('caramel')) return 'كراميل';
  if (has('banane') || has('banana')) return 'موز';
  if (has('fraise') || has('strawberry')) return 'فراولة';
  if (has('myrtille') || has('blueberry')) return 'توت أزرق';
  if (has('framboise') || has('raspberry')) return 'توت أحمر';
  if (has('kiwi')) return 'كيوي';
  if (has('ananas') || has('pineapple')) return 'أناناس';
  if (has('pêche') || has('peach')) return 'خوخ';
  if (has('pomme') || has('apple')) return 'تفاح';
  if (has('d\'ananas')) return 'عصير أناناس';
  if (has('de') && has('pomme')) return 'عصير تفاح';
  if (has('de') && has('fraise')) return 'عصير فراولة';
  if (has('de') && has('mangue')) return 'عصير مانجو';
  if (has('mang')) return 'مانجو';
  if (has('cub') && has('mokhito')) return 'كوبا موكيتو';
  if (has('cuba')) return 'كوبا';
  if (has('mokhito') || has('mojito')) return 'موخيتو';
  if (has('glass') || has('iced')) return 'مثلج';
  if (has('milk') || has('shake')) return 'ميلك شيك';
  if (has('milkshake') || has('milkshake')) return 'ميلك شيك';
  if (has('blue') && has('berry')) return 'توت أزرق';
  if (has('green')) return 'أخضر';
  if (has('golden') || has('turmeric')) return 'كركم ذهبي';
  if (has('brazilian')) return 'برازيلي';
  if (has('dragon') && has('fruit')) return 'فاكهة التنين';
  if (has('greek') && has('yogurt')) return 'زبادي يوناني';
  if (has('tropical')) return 'استوائي';
  if (has('protein')) return 'بروتين';
  if (has('acai')) return 'آساي';
  if (has('bowl')) return 'بولة';
  if (has('citron') || has('delise')) return 'ليمون';
  if (has('floral')) return 'زهري';
  if (has('lavender')) return 'لافندر';
  if (has('ginger')) return 'زنجبيل';
  if (has('rosey') || has('rose')) return 'وردي';
  if (has('hazelnut')) return 'بنسل';
  if (has('spanish')) return 'إسباني';
  if (has('lotus')) return 'لوتس';
  if (has('cannelle') || has('cinnamon')) return 'قرفة';
  if (has('chocolate')) return 'شوكولاتة';
  if (has('close') && has('up')) return 'لقطة قريبة';
  if (has('glass')) return 'كأس';
  if (has('plate')) return 'طبق';
  if (has('photo')) return 'صورة';
  if (has('png') || has('jpg') || has('jpeg')) return '';
  if (has('delicious') || has('tasty')) return '';
  if (has('high') && has('angle')) return '';
  if (has('isolated') || has('transparent')) return '';
  if (has('background')) return '';
  if (has('perfect') || has('perfect')) return '';
  if (has('vibrant') || has('appetizing')) return '';
  if (has('presentation')) return '';
  if (has('fresh') || has('served')) return '';
  if (has('with') || has('and')) return '';
  const dict = {
    benedict:'بنديكت',eggs:'بيض',egg:'بيض',salmon:'سلمون',omelette:'عجة',scrambled:'مخلوط',waffle:'وافل',pancake:'بان كيك',toast:'توست',salad:'سلطة',croissant:'كرواسون',tart:'تارت',cake:'كيك',eclair:'إكلير',babka:'بابكا',focaccia:'فوكاتشيا',latte:'لاتيه',espresso:'إسبريسو',coffee:'قهوة',tea:'شاي',juice:'عصير',smoothie:'سموثي',milkshake:'ميلك شيك',cocktail:'كوكتيل',mango:'مانجو',orange:'برتقال',blueberry:'توت أزرق',strawberry:'فراولة',raspberry:'توت أحمر',banana:'موز',apple:'تفاح',peach:'خوخ',lemon:'ليمز',lime:'ليمز أخضر',lemongrass:'عشب الليمز',avocado:'أفوكادو',mint:'نعناع',rosemary:'إكليل الجبل',iced:'مثلج',indian:'هندي',drink:'مشروب',slice:'شريحة',zest:'قشر',cheese:'جبن',chesse:'جبن',vanilla:'فانيليا',caramel:'كراميل',chocolate:'شوكولاتة',
    // Additional words
    cafe:'قهوة',café:'قهوة',creme:'كريمة',crème:'كريمة',pain:'خبز',sandwich:'ساندويتش',pizza:'بيتزا',burger:'برغر',soupe:'شوربة',riz:'أرز',pates:'معكرونة',pâtes:'معكرونة',volaille:'دواجن',poulet:'دجاج',viande:'لحم',poisson:'سمك',bacon:'لحم مقدد',saucisse:'سجق',chorizo:'تشوريزو',jambon:'هام',frites:'بطاطس مقلية',pommes:'تفاح',petit:'صغير',grand:'كبير',medium:'متوسط', Chaud:'ساخن',froid:'بارد',doux:'حلو',sale:'مالح',nouveau:'جديد',special:'خاص',deluxe:'ديلكس',mix:'ميمكس',breakfast:'فطور',brunch:'برانش',dinner:'عشاء',lunch:'غداء',fermier:'ريفي',artisanal:'حرفي',fresh:'طازج',home:'منزل',house:'منزل',chef:'شيف',king:'ملك',queen:'ملكة',deluxe:'ديلكس',supreme:'سوبريم',complet:'كامل',simple:'بسيط',naturel:'طبيعي',bio:'عضوي',organic:'عضوي',healthy:'صحي',light:'خفيف',heavy:'ثقل',spicy:'حار',mild:'خفيف',hot:'ساخن',warm:'دافئ',cold:'بارد',gratin:'جرتان',royale:'رويال',mousse:'موس',flan:'فلان',soufflé:'سفله',fondue:'فوندو',rizotto:'ريزوتو',burger:'برغر',tacos:'تاكو',burrito:'بوريتو',wrap:'راب',bagel:'بيغل',donut:'دونات',muffin:'مافن',croissant:'كرواسون',brioche:'بريوش',chausson:'شوسون',feuilletée:'فيليتي',feuillete:'فيليتي',pithivier:'بيتيفييه',galette:'جاليت',crpe:'كريب',crêpe:'كريب',blinis:'بليني',blini:'بليني',naan:'نان',pita:'بيتا',khobz:'خBread',focaccia:'فوكاتشيا',ciabatta:'سياباتا',baguette:'باغيت',baton:'باتون',torsette:'تورسيت',ficelle:'فيسيل',sandwich:'ساندويتش',club:'كلوب',panini:'بانيي',bagel:'بيغل',croque:'كروك',croissant:'كرواسون',chausson:'شوسون',viennoiserie:'فيانوازري',patisserie:'باتيسري',gteau:'جاتو',gâteau:'جاتو',tarte:'تارت',flan:'فلان',pouding:'بودينغ',crumble:'كرمبل',cobbler:'كوبler',trifle:'ترايفل',bavarois:'بافاروا',mousse:'موس',gelée:'جيلي',pâte:'بات',pate:'بات',marzipan:'مارزيبان',nougat:'نوقات',praline:'برالين',caramel:'كراميل',sirop:'شربات',syrup:'شربات',miel:'عسل',confiture:'مربى',pâte:'معجون',nutella:'نوتيلا',pistache:' fistash',pistachio:'فستق',amande:'لوز',noix:'جوز',noisette:'هيزل',cacahuète:'كاشو',arachide:'فول سوداني',noix:'جوز',coco:'جوز الهند',cocoa:'كاكاو',vanille:'فانيليا',cinnamon:'قرفة',cannelle:'قرفة',gingembre:'زنجبيل',curcuma:'كركم',cardamome:'هيل',poivre:'فلفل',sel:'ملح',sucre:' sugar',sucre:'سكب',épice:'توابل',herbes:'أعشاب',basilic:'ريحان',ciboulette:'شبت',persil:'بقدونس',estragon:'إستراجون',sauge:'مريمية',thym:'زعتر',romarin:'إكليل الجبل',lavande:'لافندر',fleur:'زهر',fleurs:'زهور',rose:'وردي',violette:'بنفسجي',jasmin:'ياسمين',fleur:'زهرة',
    // Menu specific items
    frittata:'فريتاتا',champignon:'فطر',frommage:'جبن',avocat:'أفوكادو',fromage:'جبن',mache:'جرجير',roquette:'روكيت',laitue:'خس',tomate:'طماطم',oignon:'بصل',poivron:'فطر',pomme:'تفاح',pomme:'بطاطس',patate:'بطاطس',carotte:'جزر',celeri:' كرفس',brocoli:'بروكلي',haricot:'فاصوليا',pois:'بازلاء',lentille:'عدس',chickpeas:'حمص',quinoa:'كينوا',couscous:'كسكس', Boulgour:'برغل',riz:'أرز',pates:'معكرونة',nouilles:'نودلز',vermicelle:'فيرميسيل',lasagne:'لازانيا',ravioli:'رافيولي',tortellini:'تورتيليني',gnocchi:'نيوكي',risotto:'ريزوتو',arancini:'أرانسيني',falafel:'فلافل',tabbouleh:'تبولة',houmous:'حمص',baba:'بابا',ganache:'غاناش',glacage:'تلج',crème:'كريمة',pâte:'عجينة',levure:'خميرة',levain:'عجين',beurre:'زبدة',lait:'حليب',crème:'كريمة',yaourt:'زبادي',fromage:'جبن',chèvre:'ماعز',brebis:'ضأن',comté:'كومتي',gruyère:'غرويير',mozzarella:'موزاريلا',parmesan:'بارميزان',cheddar:'شيدر',bleu:'أزرق',roquefort:'روكفور',feta:'فيتا',ricotta:'ريكوتا',mascarpone:'ماسكاربوني',philadelphia:'فيلادلفيا',boursin:'بورسان',nordique:'شمالي',marocain:'مغربي',espagnol:'إسباني',italien:'إيطالي',français:'فرنسي',américain:'أمريكي',asiatique:'آسيوي',indien:'هندي',arabe:'عربي',méditerran:'متوسطي',oriental:'شرقي',occidental:'غربي',traditionnel:'تقليدي',moderne:'حديث',classique:'كلاسيكي',rustique:'ريفي',gastronom:'غاسترونوم',bio:'عضوي',naturel:'طبيعي',pur:'نقي',fin:'رفيع',premium:'بريميوم',luxe:'فاخر',elite:'نخبة',signature:'توقيع',chef:'شيف',master:' master',grand:'كبير',petit:'صغير',giant:'عملاق',mini:'صغير',size:'حجم',portion:'حصة',assiette:'طبق',menu:'قائمة',carte:'خريطة',list:'قائمة',special:'خاص',offre:'عرض',promo:'برومو',deal:'صفقة',combo:'كومبو',set:'مجموعة',pack:'حزمة',box:'صندوق',tray:'صينية',plateau:'طاولة',serviette:'منديل',couvercle:'غطاء',verre:'كأس',tasse:'فنجان',bol:'وعاء',mug:'ماغ',carafe:'carafe',bouteille:'زجاجة',cannette:'علبة',can:'علبة',paille:'ماصة',cuiller:'ملعة',fourchette:'شوكة',couteau:'سكين',serviette:'منديل',nappe:'مفرش',tapis:'سجادة',sets:'طقم',cadeau:'هدية',bonus:'مكافأة',point:'نقطة',credit:'ائتمان',carte:'بطاقة',ticket:'تذكرة',coupon:'كوبون',voucher:'فاوشر',gift:'هدية',reward:'مكافأة',promotion:'ترقية',reduction:'تخفيض',discount:'خصم',soldes:'تنزيلات',solde:'تنزيل',gratis:'مجاني',offert:'مقدم',inclus:'مشمول',extra:'إضافي',supplément:'إضافة',option:'خيار',choix:'اختيار',alternative:'بديل',substitut:'بديل',autre:'أخرى',encore:'مرة أخرى',autres:'آخرين',plus:'أكثر',moins:'أقل',tres:'جدا',bien:'جيد',tres:' very',super:'سوبر',hyper:'هابر',mega:'ميغا',extra:'إكسترا',ultra:'ألترا',
    // New additions for better coverage
    petit:'صغير',dejeuner:'غداء',déjeuner:'غداء',diner:'عشاء',dîner:'عشاء',collation:'وجبة خفيفة',snack:'سناك', amuse:'أمuze',bouffe:'طعام',repas:'وجبة',plats:'أطباق',plat:'طبق',entrée:'مقبلات',dessert:'حلويات',boisson:'مشروبات',accompagnement:'إضافة',côtée:'جنب',gratinée:'جراتين',composée:'مركبة',mêlée:'مخلوطة',froide:'باردة',chaude:'ساخنة',légère:'خفيفة',corsée:'قوية',foncée:'داكنة',claire:'فاتحة',nature:'طبيعية',suivie:'متبوعة',servie:'مخدمة',préparée:'محضرة',cuisinée:'مطبوخة',rôtie:'مشوية',grillée:'مشوية',pochée:'مسلوقة',battue:'مخفوقة',mixée:'ممزوجة',filtrée:'مصفاة',infusée:'منقوعة',bouillie:' مسلوقة',cuite:'مطبوخة',crue:'نيئة',fraiche:'طازجة',salée:'مملحة',sucrée:'محلاة',épicerée:'متبل',fumée:'مدخنة',marinée:'متبلة',confite:'مربى',séchée:'مجففة',congélée:'مجمدية',réfrigérée:'مبردة',chauffée:'مسخنة',réchauffée:'مسخنة',emportée:'مغلفة',livrée:'مسلمة',commandée:'مطلوبة',réservée:'محجوزة',confirmée:'مؤكدة',annulée:'ملغاة',reportée:'مؤجلة',accepted:'مقبول',refused:'مرفوض',pending:'قيد الانتظار',complete:'مكتمل',incomplet:'غير مكتمل',urgent:'عاجل',prioritaire:'أولوية',normal:'عادي',express:'سريع',rapide:'سريع',lent:'بطيء',court:'قصير',long:' طويل',large:'واسع',étroit:'ضيق',haut:'عالي',bas:'منخفض',gros:'سميك',mince:'رفيع',lourd:'ثقيل',leger:'خفيف',fort:'قوي',doux:' softer',dur:'صعب',mou:'لين',sec:'جاف',humide:'رطب',mouillé:'مبلل',cassé:'مكسور',entier:'كامل',moitié:'نصف',quart:'ربع',tiers:'ثلث',trois:' three',deux:' two',un:' one',zero:'صفر',premier:'الأول',deuxième:'الثاني',troisième:'الثالث',dernier:'الأخير',suivant:'التالي',précédent:'السابق',autre:'آخر',différent:'مختلف',simile:'مشابه',identique:'متطابق',équivalent:'مكافئ',opposé:'معاكس',contraire:'ضد',semblable:'ماثل',comparalbe:'مقارن',différent:'مغاير',
  };
  const out = tokens.map(t => dict[t]).filter(Boolean);
  return out.length > 0 ? out.join(' ') : 'منتج';
}


/**
 * PREMIUM SEARCH ENGINE
 */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const resultsList = document.getElementById('results-list');
  const resultsCount = document.getElementById('results-count');

  if (!searchInput || !searchResults || !resultsList) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 1) {
      searchResults.classList.add('hidden');
      return;
    }

    const matches = allMenuItems.filter(item => {
      const name = (getMenuTranslation(item, 'name') || item.name || '').toLowerCase();
      const desc = (getMenuTranslation(item, 'description') || item.description || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      return name.includes(query) || desc.includes(query) || cat.includes(query);
    });

    renderSearchResults(matches);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.add('hidden');
      searchInput.blur();
    }
  });
}

function renderSearchResults(matches) {
  const searchResults = document.getElementById('search-results');
  const resultsList = document.getElementById('results-list');
  const resultsCount = document.getElementById('results-count');

  if (matches.length === 0) {
    resultsList.innerHTML = `
      <div class="p-8 text-center">
        <span class="material-symbols-outlined text-gray-300 text-4xl mb-2">search_off</span>
        <p class="text-sm text-gray-500">No dishes found for this search</p>
      </div>
    `;
    resultsCount.textContent = "0 found";
  } else {
    resultsCount.textContent = `${matches.length} found`;
    resultsList.innerHTML = matches.map(item => {
      const name = getMenuTranslation(item, 'name') || item.name;
      const price = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;
      const img = normalizeImagePath(item.image || getFallbackImage(item));
      
      return `
        <div class="p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors active:scale-[0.98]" 
             onclick="navigateToProduct('${item.id}')">
          <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100 dark:border-white/5">
            <img src="${img}" class="w-full h-full object-cover" alt="${name}" onerror="this.src='../assets/waiter.jpg'">
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate">${name}</h4>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[10px] font-bold text-primary">${price}DH</span>
              <span class="text-[9px] text-gray-400 uppercase tracking-tighter bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded-full">${item.category}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-gray-300 text-[18px]">chevron_right</span>
        </div>
      `;
    }).join('');
  }

  searchResults.classList.remove('hidden');
}

window.navigateToProduct = (id) => {
  const item = allMenuItems.find(i => i.id === id);
  if (item) {
    localStorage.setItem('stitch_customizing_item', JSON.stringify(item));
    window.location.href = buildCustomizationUrl(item);
  }
};


// Respond to language changes
document.addEventListener('languageChanged', (e) => {
  const lang = e.detail.lang;
  
  const greetingEl = document.getElementById('header-greeting');
  if (greetingEl) {
    const h = new Date().getHours();
    const key = h < 12 ? 'greeting_morning' : h < 17 ? 'greeting_afternoon' : 'greeting_evening';
    greetingEl.textContent = getTranslation(key);
  }

  // Re-render content
  if (typeof bestsellers !== 'undefined' && bestsellers.length) {
    renderBestsellers(bestsellers);
  }
  renderCategories();
  updateCartUI();

  const modal = document.getElementById('order-modal');
  if (modal && !modal.classList.contains('hidden')) {
    renderCartItems();
  }
});

