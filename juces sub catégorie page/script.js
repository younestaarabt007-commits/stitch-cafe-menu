const products = [
    {
        "id": "juice_1",
        "name": "Fresh Orange",
        "description": "Valencia oranges, cold pressed",
        "price": 4.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/juces.jpg",
        "category": "citrus"
    },
    {
        "id": "juice_2",
        "name": "Lemon Mint",
        "description": "Zesty lemon with mint",
        "price": 4.1,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/juice-lemon-mint.jpg",
        "category": "citrus"
    },
    {
        "id": "juice_3",
        "name": "Pineapple Punch",
        "description": "Tropical pineapple blend",
        "price": 4.8,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/juice-pineapple-punch.jpg",
        "category": "tropical"
    },
    {
        "id": "juice_4",
        "name": "Apple Classic",
        "description": "Cold-pressed apple",
        "price": 4,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/juice-apple.jpg",
        "category": "classic"
    },
    {
        "id": "juice_5",
        "name": "Mango Glow",
        "description": "Alphonso mango puree",
        "price": 5.25,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/juice-mango-glow.jpg",
        "category": "tropical"
    },
    {
        "id": "juice_6",
        "name": "Signature Green Juice",
        "description": "Kale, Apple, Lemon",
        "price": 9.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/c638c126fbfb5edadc53720118cea1a9.jpg",
        "category": "wellness"
    },
    {
        "id": "juice_7",
        "name": "Berry Blast",
        "description": "Mixed berries antioxidant boost",
        "price": 8,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/f7a30f37caad29c217c59d2804298a53.jpg",
        "category": "smoothies"
    },
    {
        "id": "juice_8",
        "name": "Mango Tango",
        "description": "Mango, peach, passion fruit",
        "price": 8.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/db03e53c057449564a8c3f285d4ae705.jpg",
        "category": "tropical"
    },
    {
        "id": "juice_9",
        "name": "Cold Pressed Orange",
        "description": "Valencia oranges, zero water",
        "price": 7,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/juces.jpg",
        "category": "citrus"
    },
    {
        "id": "juice_10",
        "name": "Ginger Turmeric Shot",
        "description": "Morning immunity boost",
        "price": 4.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bf9d74d6badcbc6dad96c5fe3b2537d9.jpg",
        "category": "wellness"
    },
    {
        "id": "juice_11",
        "name": "Beetroot Energizer",
        "description": "Beet, Carrot, Ginger",
        "price": 8.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/a560aa77331782366884542df097f5fd.jpg",
        "category": "wellness"
    },
    {
        "id": "juice_12",
        "name": "Green Goddess",
        "description": "Kale, spinach, apple",
        "price": 9,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/734403dc841bf127b5df37617dadbab8.jpg",
        "category": "wellness"
    }
];

const translations = {
    en: {
        juices: "Juices",
        subtitle: "Cold-pressed and refreshing",
        all: "All",
        citrus: "Citrus",
        tropical: "Tropical",
        classic: "Classic",
        smoothies: "Smoothies",
        wellness: "Wellness",
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
        smoothies: "Smoothies",
        wellness: "Bien-être",
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
        smoothies: "عصائر سموثي",
        wellness: "صحة",
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
    },
    "Signature Green Juice": {
        fr: { name: "Jus Vert Signature", description: "Chou frisé, pomme, citron" },
        ar: { name: "العصير الأخضر المميز", description: "كرنب، تفاح، ليمون" }
    },
    "Berry Blast": {
        fr: { name: "Explosion de Baies", description: "Mélange de baies antioxydant" },
        ar: { name: "انفجار التوت", description: "مزيج التوت المضاد للأكسدة" }
    },
    "Mango Tango": {
        fr: { name: "Mango Tango", description: "Mangue, pêche, fruit de la passion" },
        ar: { name: "مانجو تانجو", description: "مانجو، خوخ، فاكهة العاطفة" }
    },
    "Cold Pressed Orange": {
        fr: { name: "Orange Pressée à Froid", description: "Oranges Valencia, zéro eau" },
        ar: { name: "برتقال معصور على البارد", description: "برتقال فالنسيا، بدون ماء" }
    },
    "Ginger Turmeric Shot": {
        fr: { name: "Shot Gingembre Curcuma", description: "Boost d'immunité matinal" },
        ar: { name: "جرعة الزنجبيل والكركم", description: "تعزيز المناعة الصباحي" }
    },
    "Beetroot Energizer": {
        fr: { name: "Énergisant Betterave", description: "Betterave, carotte, gingembre" },
        ar: { name: "منشط الشمندر", description: "شمندر، جزر، زنجبيل" }
    },
    "Green Goddess": {
        fr: { name: "Déesse Verte", description: "Chou frisé, épinards, pomme" },
        ar: { name: "الإلهة الخضراء", description: "كرنب، سبانخ، تفاح" }
    }
};

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
    const product = products.find(p => p.id === productId);
    if (!product) return;
    window.location.href = `../orange juce_customization_view_1/index.html?price=${product.price}`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: getMenuTranslation(product, 'name'),
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }

    localStorage.setItem('stitch_cart', JSON.stringify(cart));

    if (window.updateGlobalCartCount) {
        window.updateGlobalCartCount();
    }

    // Visual feedback
    const btn = document.querySelector(`button[onclick*="${productId}"]`);
    if (btn) {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 1000);
    }
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return; // Guard clause

    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';

    const filteredProducts = products.filter(p => {
        const name = getMenuTranslation(p, 'name').toLowerCase();
        const description = getMenuTranslation(p, 'description').toLowerCase();
        const matchesCategory = filter === 'all' || p.category === filter;
        const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        list.innerHTML = '<div class="col-span-2 text-center py-8 text-gray-500">No juices found</div>';
        return;
    }

    list.innerHTML = filteredProducts.map((product, index) => {
        const name = getMenuTranslation(product, 'name');
        const description = getMenuTranslation(product, 'description');

        return `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full h-32 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${name}" style="background-image: url('${product.image}');">
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="flex-1 flex flex-col px-1">
                <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${name}</h4>
                <div class="flex items-center gap-1.5 mb-2">
                    <div class="flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-[#FFC107] text-[12px]">star</span>
                        <span class="text-[10px] font-bold text-green-700 dark:text-green-300">4.8</span>
                    </div>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500">(2.3k+)</span>
                </div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">${description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-extrabold text-[15px]">$${product.price.toFixed(2)}</span>
                    <button class="w-[72px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `}).join('');
}

function setupEventListeners() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderProducts(currentFilter);
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });

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
