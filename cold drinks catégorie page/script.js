const products = [
  { id: 1, name: "Fresh Orange Juice", description: "Cold pressed Valencia oranges", price: 4.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg", category: "juices" },
  { id: 2, name: "Strawberry Smoothie", description: "Greek yogurt, strawberry puree", price: 5.75, image: "../swiggy-style_elite_main_menu_390x2500/assets/cold-strawberry-smoothie.jpg", category: "smoothies" },
  { id: 3, name: "Chocolate Shake", description: "70% cacao, vanilla ice cream", price: 6.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/shake-classic-chocolate.jpg", category: "shakes" },
  { id: 4, name: "Iced Latte", description: "Double shot over chilled milk", price: 5.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/latte-iced-matcha.jpg", category: "iced_coffee" },
  { id: 5, name: "Mango Lassi", description: "Alphonso mango, yogurt, cardamom", price: 5.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "smoothies" },
  { id: 6, name: "Cold Brew", description: "12-hour steep, smooth finish", price: 4.90, image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-cold-brew.jpg", category: "iced_coffee" },
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
    "Fresh Orange Juice": {
        fr: { name: "Jus d'Orange Frais", description: "Oranges Valencia pressées à froid" },
        ar: { name: "عصير برتقال طازج", description: "برتقال فالنسيا معصور على البارد" }
    },
    "Strawberry Smoothie": {
        fr: { name: "Smoothie Fraise", description: "Yaourt grec, purée de fraise" },
        ar: { name: "سموثي فراولة", description: "زبادي يوناني، هريس الفراولة" }
    },
    "Chocolate Shake": {
        fr: { name: "Shake Chocolat", description: "70% cacao, glace vanille" },
        ar: { name: "مخفوق الشوكولاتة", description: "70% كاكاو، آيس كريم فانيليا" }
    },
    "Iced Latte": {
        fr: { name: "Latte Glacé", description: "Double dose sur lait glacé" },
        ar: { name: "لاتيه مثلج", description: "دبل شوت على حليب بارد" }
    },
    "Mango Lassi": {
        fr: { name: "Lassi Mangue", description: "Mangue Alphonso, yaourt, cardamome" },
        ar: { name: "لاسي مانجو", description: "مانجو ألفونسو، زبادي، هيل" }
    },
    "Cold Brew": {
        fr: { name: "Infusion Froide", description: "Infusion 12 heures, finition douce" },
        ar: { name: "كولد برو", description: "نقع لمدة 12 ساعة، نهاية سلسة" }
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
  if (!document.getElementById('order-modal').classList.contains('hidden')) {
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
    <div onclick="redirectToCustomization(${product.id})" class="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-[16px] border border-zinc-100 dark:border-zinc-700 shadow-sm fade-in transition-transform active:scale-95 cursor-pointer" style="animation-delay: ${index * 0.05}s">
      <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${name}" style="background-image: url('${product.image}');"></div>
      <div class="flex-1">
        <h4 class="font-semibold text-[16px]">${name}</h4>
        <p class="text-[11px] text-zinc-500 dark:text-zinc-300 mt-0.5">${description}</p>
        <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
      </div>
      <button onclick="event.stopPropagation(); redirectToCustomization(${product.id})" class="size-8 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-transform active:scale-95">
        <span class="material-symbols-outlined text-[20px]">add</span>
      </button>
    </div>
  `}).join('');
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
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

    window.location.href = customizationUrl;
}

// Add to Cart (Deprecated for direct add, but kept for logic if needed later)
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
    toggle.addEventListener('click', function() {
      const current = localStorage.getItem('stitch_lang') || 'en';
      let next = 'en';
      if (current === 'en') next = 'fr';
      else if (current === 'fr') next = 'ar';
      else if (current === 'ar') next = 'en';
      applyLang(next);
    });
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
          <p class="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">$${x.price.toFixed(2)} each</p>
        </div>
      </div>
      <span class="font-bold">$${(x.price * x.quantity).toFixed(2)}</span>
    </div>
  `}).join('');
  
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
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
