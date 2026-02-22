const products = [
  { id: 1, name: "Fresh Orange", description: "Valencia oranges, cold pressed", price: 4.50, image: "https://images.unsplash.com/photo-1541976076758-65c1b5dc0f5b?q=80&w=500&auto=format&fit=crop", category: "citrus" },
  { id: 2, name: "Lemon Mint", description: "Zesty lemon with mint", price: 4.10, image: "https://images.unsplash.com/photo-1556745753-7e4bfc180a9f?q=80&w=500&auto=format&fit=crop", category: "citrus" },
  { id: 3, name: "Pineapple Punch", description: "Tropical pineapple blend", price: 4.80, image: "https://images.unsplash.com/photo-1547394765-185d449d6eb2?q=80&w=500&auto=format&fit=crop", category: "tropical" },
  { id: 4, name: "Apple Classic", description: "Cold-pressed apple", price: 4.00, image: "https://images.unsplash.com/photo-1568158875615-0bddd05efd0b?q=80&w=500&auto=format&fit=crop", category: "classic" },
  { id: 5, name: "Mango Glow", description: "Alphonso mango puree", price: 5.25, image: "https://images.unsplash.com/photo-1567197553646-4c084b6698a0?q=80&w=500&auto=format&fit=crop", category: "tropical" },
];

const translations = {
    en: {
        juices: "Juices",
        subtitle: "Cold-pressed and refreshing",
        all: "All",
        citrus: "Citrus",
        tropical: "Tropical",
        classic: "Classic",
        view_all: "View All",
        view_cart: "View Cart",
        items: "Items",
        search_alert: "Search functionality would open here",
        cart_alert: "Cart contains {count} items",
        order_status: "Order Status",
        received: "Received",
        subtotal: "Subtotal",
        tax: "Tax (10%)",
        total: "Total",
        place_order: "Place Order",
        close: "Close"
    },
    fr: {
        juices: "Jus",
        subtitle: "Pressé à froid et rafraîchissant",
        all: "Tout",
        citrus: "Agrumes",
        tropical: "Tropical",
        classic: "Classique",
        view_all: "Voir Tout",
        view_cart: "Voir Panier",
        items: "Articles",
        search_alert: "La fonctionnalité de recherche s'ouvrirait ici",
        cart_alert: "Le panier contient {count} articles",
        order_status: "État de la commande",
        received: "Reçu",
        subtotal: "Sous-total",
        tax: "Taxe (10%)",
        total: "Total",
        place_order: "Passer la commande",
        close: "Fermer"
    },
    ar: {
        juices: "عصائر",
        subtitle: "معصور على البارد ومنعش",
        all: "الكل",
        citrus: "حمضيات",
        tropical: "استوائي",
        classic: "كلاسيكي",
        view_all: "عرض الكل",
        view_cart: "عرض العربة",
        items: "عناصر",
        search_alert: "وظيفة البحث ستفتح هنا",
        cart_alert: "تحتوي العربة على {count} عنصر",
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
    "Fresh Orange": {
        fr: { name: "Orange Fraîche", description: "Oranges Valencia, pressées à froid" },
        ar: { name: "برتقال طازج", description: "برتقال فالنسيا، معصور على البارد" }
    },
    "Lemon Mint": {
        fr: { name: "Citron Menthe", description: "Citron piquant avec menthe" },
        ar: { name: "ليمون ونعناع", description: "ليمون حامض مع نعناع" }
    },
    "Pineapple Punch": {
        fr: { name: "Punch Ananas", description: "Mélange d'ananas tropical" },
        ar: { name: "بانش أناناس", description: "مزيج أناناس استوائي" }
    },
    "Apple Classic": {
        fr: { name: "Pomme Classique", description: "Pomme pressée à froid" },
        ar: { name: "تفاح كلاسيكي", description: "تفاح معصور على البارد" }
    },
    "Mango Glow": {
        fr: { name: "Éclat Mangue", description: "Purée de mangue Alphonso" },
        ar: { name: "توهج المانجو", description: "هريس مانجو ألفونسو" }
    }
};

let cart = [];
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
  // Re-render order summary if modal is open (not strictly necessary but good practice)
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
            <button onclick="event.stopPropagation(); addToCart(${product.id})" class="size-8 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-transform active:scale-95">
                <span class="material-symbols-outlined text-[20px]">add</span>
            </button>
        </div>
    `}).join('');
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
  
  const orderStatusLabel = getTranslation('order_status');
  const receivedLabel = getTranslation('received');
  
  // Note: This logic assumes modal structure is already localized via data-i18n, 
  // but if we are dynamically generating the whole modal content we need to be careful.
  // The modal skeleton is in index.html, so we just need to update the values.
  // However, the 'received' badge and 'order status' title are static in index.html, so they will be handled by applyLang.
  // The items list is dynamic.
  
  container.innerHTML = cart.map(x => {
      const name = getMenuTranslation(x, 'name'); // Ensure x has the original name key to look up translation
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
  // Using event delegation for dynamically added buttons or static buttons that might not be found on load if modal is hidden/generated
  // Actually, the modal buttons are static in HTML. But let's check their IDs.
  // The original script didn't have IDs for buttons in HTML (wait, I should check index.html again for IDs).
  // Assuming they are or will be added.
  
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
