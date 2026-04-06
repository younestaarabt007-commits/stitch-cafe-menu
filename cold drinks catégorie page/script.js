const products = [
  { id: 1, name: "Jus D'Orange", description: "Cold pressed Valencia oranges", price: 4.50, image: "../images/sub catégorie images/Jus/Jus D'Orange.jpg", category: "juices" },
  { id: 2, name: "Jus Mangue", description: "Alphonso mango, yogurt, cardamom", price: 5.00, image: "../images/sub catégorie images/Jus/Jus Mangue.jpg", category: "juices" },
  { id: 3, name: "Jus D'ananas", description: "Tropical pineapple blend", price: 4.80, image: "../images/sub catégorie images/Jus/Jus D'ananas.jpg", category: "juices" },
  { id: 4, name: "Cuba Mokhito", description: "Zesty lemon with mint", price: 4.10, image: "../images/sub catégorie images/Jus/Cuba Mokhito.avif", category: "juices" },
  { id: 5, name: "Blueberry Infusion", description: "Antioxidant rich blend", price: 5.75, image: "../images/sub catégorie images/Jus/Blueberry Infusion.jpg", category: "smoothies" },
  { id: 6, name: "Blue Berry Smoothie", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "../images/sub catégorie images/smoothie/Blue Berry Smoothie.jpg", category: "smoothies" },
  { id: 7, name: "Kiwi Smoothie", description: "Spinach, apple, banana", price: 5.00, image: "../images/sub catégorie images/smoothie/Kiwi Smoothie.jpg", category: "smoothies" },
  { id: 8, name: "Milkshake Café Chocolat", description: "Rich cocoa, creamy base", price: 5.20, image: "../images/sub catégorie images/milshake/Milkshake Café Chocolat.jpg", category: "shakes" },
  { id: 9, name: "Milkshake Oreo", description: "Madagascar vanilla, smooth", price: 5.00, image: "../images/sub catégorie images/milshake/Milkshake Oreo.jpg", category: "shakes" },
  { id: 10, name: "strawberry-ice milkshake", description: "Fresh strawberries, cream", price: 5.40, image: "../images/sub catégorie images/milshake/strawberry-ice milkshake.jpg", category: "shakes" },
  { id: 11, name: "Milkshake Banane", description: "Banana, caramel drizzle", price: 5.60, image: "../images/sub catégorie images/milshake/Milkshake Banane.jpg", category: "shakes" },
];

const translations = {
  en: {
    cold_drinks: "Cold Drinks",
    subtitle: "Chilled, refreshing, handcrafted",
    all: "All",
    juices: "Juices",
    smoothies: "Smoothies",
    shakes: "Shakes",
    iced_coffee: "Iced Coffee",
    view_cart: "View Cart",
    items: "Items",
    search_alert: "Search functionality would open here",
    cart_alert: "Cart contains {count} items",
    categories: "Categories",
    just_in: "Just In",
    offers: "Offers",
    chef_pick: "Chef Pick",
    view_all: "View All",
    order_status: "Order Status",
    received: "Received",
    subtotal: "Subtotal",
    tax: "Tax (10%)",
    total: "Total",
    place_order: "Place Order",
    close: "Close"
  },
  fr: {
    cold_drinks: "Boissons Froides",
    subtitle: "Frais, rafraîchissant, artisanal",
    all: "Tout",
    juices: "Jus",
    smoothies: "Smoothies",
    shakes: "Shakes",
    iced_coffee: "Café Glacé",
    view_cart: "Voir Panier",
    items: "Articles",
    search_alert: "La fonctionnalité de recherche s'ouvrirait ici",
    cart_alert: "Le panier contient {count} articles",
    categories: "Catégories",
    just_in: "Nouveauté",
    offers: "Offres",
    chef_pick: "Choix du Chef",
    view_all: "Voir Tout",
    order_status: "État de la commande",
    received: "Reçu",
    subtotal: "Sous-total",
    tax: "Taxe (10%)",
    total: "Total",
    place_order: "Passer la commande",
    close: "Fermer"
  },
  ar: {
    cold_drinks: "مشروبات باردة",
    subtitle: "بارد، منعش، مصنوع يدوياً",
    all: "الكل",
    juices: "عصائر",
    smoothies: "سموثي",
    shakes: "مخفوق الحليب",
    iced_coffee: "قهوة مثلجة",
    view_cart: "عرض العربة",
    items: "عناصر",
    search_alert: "وظيفة البحث ستفتح هنا",
    cart_alert: "تحتوي العربة على {count} عنصر",
    categories: "فئات",
    just_in: "وصل حديثاً",
    offers: "عروض",
    chef_pick: "اختيار الشيف",
    view_all: "عرض الكل",
    order_status: "حالة الطلب",
    received: "تم الاستلام",
    subtotal: "المجموع الفرعي",
    tax: "ضريبة (10%)",
    total: "المجموع",
    place_order: "تأكيد الطلب",
    close: "إغلاق"
  }
};

const menuTranslations = {
  "Jus D'Orange": {
    fr: { name: "Jus d'Orange Frais", description: "Oranges Valencia pressées à froid" },
    ar: { name: "عصير برتقال طازج", description: "برتقال فالنسيا معصور على البارد" }
  },
  "raspberry-smoothie_1150-18529": {
    fr: { name: "Smoothie Framboise", description: "Yaourt grec, purée de fraise" },
    ar: { name: "سموثي التوت", description: "زبادي يوناني، هريس الفراولة" }
  },
  "close-up-milkshake": {
    fr: { name: "Shake Chocolat", description: "70% cacao, glace vanille" },
    ar: { name: "مخفوق الشوكولاتة", description: "70% كاكاو، آيس كريم فانيليا" }
  },
  "Café Crème": {
    fr: { name: "Café Crème", description: "Double dose sur lait glacé" },
    ar: { name: "كافيه كريم", description: "دبل شوت على حليب بارد" }
  },
  "Jus Mangue": {
    fr: { name: "Jus de Mangue", description: "Mangue Alphonso, yaourt, cardamome" },
    ar: { name: "عصير مانجو", description: "مانجو ألفونسو، زبادي، هيل" }
  },
  "Café Noir Italien": {
    fr: { name: "Café Noir Italien", description: "Infusion 12 heures, finition douce" },
    ar: { name: "كافيه نوار إيطالي", description: "نقع لمدة 12 ساعة، نهاية سلسة" }
  }
};

// let cart = []; // Deprecated, handled by nav-bar.js
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('stitch_lang') || 'en';
  applyLang(savedLang);
  renderProducts();
  setupEventListeners();
});

function applyLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('stitch_lang', lang);

  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
  }

  // Update Toggle UI
  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    toggle.classList.remove('lang-en', 'lang-fr', 'lang-ar');
    toggle.classList.add(`lang-${lang}`);
  }

  // Update static text
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Re-render products to update their text
  renderProducts(currentFilter);
  // Re-render order summary if modal is open
  const orderModal = document.getElementById('order-modal');
  if (orderModal && !orderModal.classList.contains('hidden')) {
    renderOrderSummary();
  }
}

function getTranslation(key) {
  const lang = localStorage.getItem('stitch_lang') || 'en';
  return translations[lang][key] || key;
}

function getMenuTranslation(item, field) {
  const lang = localStorage.getItem('stitch_lang') || 'en';
  if (lang === 'en') return item[field];

  if (menuTranslations[item.name] && menuTranslations[item.name][lang] && menuTranslations[item.name][lang][field]) {
    return menuTranslations[item.name][lang][field];
  }
  return item[field];
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  list.innerHTML = filteredProducts.map((product, index) => {
    const name = getMenuTranslation(product, 'name');
    const description = getMenuTranslation(product, 'description');

    return `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" role="img" aria-label="${name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1 flex flex-col">
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[84px] h-[36px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c] shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:shadow-lg" style="color: white !important;" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `}).join('');
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
  const product = products.find(p => String(p.id) === String(productId));
  if (!product) return;
  let customizationUrl = '../orange juce_customization_view_1/index.html'; // Default

  // Logic to determine customization page based on product or category
  if (product.category === 'smoothies' || product.category === 'shakes') {
    customizationUrl = '../smothie customisation review/index.html';
  } else if (product.category === 'iced_coffee' || product.name.toLowerCase().includes('latte')) {
    customizationUrl = '../latte_customization_view_2/index.html';
  } else if (product.category === 'juices') {
    customizationUrl = '../orange juce_customization_view_1/index.html';
  } else if (product.name.toLowerCase().includes('cold brew')) {
    customizationUrl = '../pure_noir_espresso_customization_view_1/index.html';
  }

  window.location.href = `${customizationUrl}?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${product.price}`;
}

function addToCart(productId) {
  redirectToCustomization(productId);
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
    cartTotal.textContent = `${total.toFixed(2)}DH`;
    cartBadge.textContent = count;

    const itemsLabel = getTranslation('items');
    cartItemsText.textContent = `${count} ${itemsLabel}`;
  } else {
    floatingCart.classList.add('hidden');
  }
}

function setupEventListeners() {
  document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back();
  });
  document.getElementById('search-btn').addEventListener('click', () => {
    alert(getTranslation('search_alert'));
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

  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = localStorage.getItem('stitch_lang') || 'en';
      let next = 'en';
      if (current === 'en') next = 'fr';
      else if (current === 'fr') next = 'ar';
      else if (current === 'ar') next = 'en';
      applyLang(next);
    });
  }
}

// Global filter function for category icons
function filterByCategory(category) {
  currentFilter = category;
  renderProducts(category);
  
  // Update active button state
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
}

/*
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
  
  container.innerHTML = cart.map(x => {
      const name = getMenuTranslation(x, 'name');
      return `
    <div class="flex items-center justify-between bg-zinc-50 dark:bg-black/20 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center text-primary font-bold">${x.quantity}x</div>
        <div>
          <p class="font-bold text-sm">${name}</p>
          <p class="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">${x.price.toFixed(2)}DH each</p>
        </div>
      </div>
      <span class="font-bold">${(x.price * x.quantity).toFixed(2)}DH</span>
    </div>
  `}).join('');
  
  subtotalEl.textContent = `${subtotal.toFixed(2)}DH`;
  taxEl.textContent = `${tax.toFixed(2)}DH`;
  totalEl.textContent = `${total.toFixed(2)}DH`;
}

document.addEventListener('click', (e) => {
  if (e.target && (e.target.id === 'order-close-btn' || e.target.closest('#order-close-btn'))) {
    closeOrderModal();
  }
  if (e.target && (e.target.id === 'order-place-btn' || e.target.closest('#order-place-btn'))) {
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
    alert('Order placed successfully! (Demo)');
  }
});
*/
