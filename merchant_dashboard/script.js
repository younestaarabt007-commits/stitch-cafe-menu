// ============================================================
// STITCH MERCHANT DASHBOARD — DEMO MODE
// All API calls are gracefully degraded to static demo data.
// No customer data or tokens are exposed.
// ============================================================

// --- DEMO DATA ---
const DEMO_MENU = [
    // Brunch
    { id: 'brunch-1', name: "Farm Omelette", price: 12.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/0a928a23c6c3fb861e9c4ec54ae78b7d.jpg", hasModifiers: false, stock: 15 },
    { id: 'brunch-2', name: "Eggs Benedict", price: 16.00, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/3f108fda33cdb811f37bf5dc2035c3dc.jpg", hasModifiers: false, stock: 12 },
    { id: 'brunch-3', name: "Spicy Shakshuka", price: 15.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/5d9c920def5bef64b91715b917d667b2.jpg", hasModifiers: false, stock: 10 },
    { id: 'brunch-4', name: "Garden Skillet", price: 14.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/5ec903108923b0eda69e0de6ab77a1f3.jpg", hasModifiers: false, stock: 8 },
    { id: 'brunch-5', name: "Brunch Burrito", price: 13.00, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/62e25e1c33624e2bc57b6e4531a36dc5.jpg", hasModifiers: false, stock: 14 },
    { id: 'brunch-6', name: "Steak & Eggs", price: 19.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/69c52da929160d633bd0def179265173.jpg", hasModifiers: false, stock: 6 },
    { id: 'brunch-7', name: "Fit Egg-White", price: 13.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/89648609962eda9536c1eecdedbdf8ef.jpg", hasModifiers: false, stock: 20 },
    { id: 'brunch-8', name: "Brunch Tacos", price: 11.00, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/902f3561ca86aba6382aad94c75b11f4.jpg", hasModifiers: false, stock: 15 },
    { id: 'brunch-9', name: "Iron Frittata", price: 14.75, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/eb058f0421ae783ed7c55319ca504911.jpg", hasModifiers: false, stock: 10 },
    { id: 'brunch-10', name: "Acai Delight", price: 12.00, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-acai-bowl.jpg", hasModifiers: false, stock: 12 },
    { id: 'brunch-11', name: "Belgian Gold", price: 11.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-12', name: "Full English", price: 22.00, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/brunch-full-english.jpg", hasModifiers: false, stock: null },

    // Brew & Coffee
    { id: 'brew-1', name: "Nitro Cold Brew", price: 6.50, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-nitro-brew.jpg", hasModifiers: true, stock: null },
    { id: 'brew-2', name: "Matcha Latte", price: 7.25, category: "Tea", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Matcha Latte.jpg", hasModifiers: true, stock: null },
    { id: 'brew-3', name: "Ethiopian Yirgacheffe", price: 5.00, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Ethiopian Yirgacheffe.jpg", hasModifiers: true, stock: null },
    { id: 'brew-4', name: "Dirty Masala Chai", price: 6.75, category: "Tea", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/tea-dirty-chai-espresso.jpg", hasModifiers: true, stock: null },
    { id: 'brew-5', name: "Oat Milk Cortado", price: 4.50, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-oat-milk-latte.jpg", hasModifiers: true, stock: null },
    { id: 'brew-6', name: "Lavender Honey", price: 7.50, category: "Tea", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/tea-lavender-earl.jpg", hasModifiers: true, stock: null },
    { id: 'brew-7', name: "Golden Turmeric", price: 6.25, category: "Tea", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Golden Turmeric.jpg", hasModifiers: true, stock: null },
    { id: 'brew-8', name: "Caramel Macchiato", price: 6.50, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/latte-caramel-macchiato.jpg", hasModifiers: true, stock: null },
    { id: 'brew-9', name: "Light Black Coffee", price: 8.00, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Light Black Coffee.jpg", hasModifiers: true, stock: null },
    { id: 'brew-10', name: "Blueberry Infusion", price: 5.75, category: "Tea", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Blueberry Infusion.jpg", hasModifiers: true, stock: null },

    { id: 'coffee-1', name: "Velvet Flat White", price: 4.80, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-2', name: "Kyoto Cold Brew", price: 5.50, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-kyoto-cold-brew.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-3', name: "Oat Milk Latte", price: 5.20, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/latte-oat.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-4', name: "Single Origin Espresso", price: 3.50, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-5', name: "Dark Mocha", price: 6.00, category: "Coffee", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-dark-mocha.jpg", hasModifiers: true, stock: null },

    // Artisanal Bread
    { id: 'bread-1', name: "Chocolate Babka", price: 12.00, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Chocolate Babka.jpg", hasModifiers: false, stock: 10 },
    { id: 'bread-2', name: "Seeded Multigrain", price: 9.00, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-seeded-multigrain.jpg", hasModifiers: false, stock: 15 },
    { id: 'bread-3', name: "Dark Rye Loaf", price: 10.50, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-dark-rye-loaf.jpg", hasModifiers: false, stock: 8 },
    { id: 'bread-4', name: "Herbed Focaccia", price: 7.50, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/Herbed Focaccia.jpg", hasModifiers: false, stock: 12 },
    { id: 'bread-5', name: "Honey Brioche", price: 11.25, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-honey-brioche.jpg", hasModifiers: false, stock: 6 },
    { id: 'bread-6', name: "Stoneground Wheat", price: 8.75, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-stoneground-wheat.jpg", hasModifiers: false, stock: 20 },
    { id: 'bread-7', name: "Parisian Baguette", price: 4.50, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-parisian-baguette.jpg", hasModifiers: false, stock: 30 },
    { id: 'bread-8', name: "Cranberry Walnut", price: 9.50, category: "Bread", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-cranberry-walnut.jpg", hasModifiers: false, stock: 5 },

    // Bakery & Sweets
    { id: 'pastry-1', name: "Butter Croissant", price: 4.50, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/sweet-butter-croissant.jpg", hasModifiers: false, stock: 20 },
    { id: 'pastry-2', name: "Almond Croissant", price: 5.25, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/sweet-almond-croissant.jpg", hasModifiers: false, stock: 10 },
    { id: 'pastry-3', name: "Chocolate Éclair", price: 4.75, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-chocolate-eclair.jpg", hasModifiers: false, stock: 15 },
    { id: 'pastry-4', name: "Strawberry Tart", price: 5.80, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/sweet-strawberry-tart.jpg", hasModifiers: false, stock: 8 },
    { id: 'pastry-5', name: "Lemon Meringue Tart", price: 5.90, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/sweet-lemon-meringue.jpg", hasModifiers: false, stock: 12 },
    { id: 'pastry-6', name: "Velvet Cake Slice", price: 4.95, category: "Bakery", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/sweet-velvet-cake.jpg", hasModifiers: false, stock: 18 },

    // Juices & Cold Drinks
    { id: 'juice-1', name: "Lemon Mint", price: 4.10, category: "Juices", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/juice-lemon-mint.jpg", hasModifiers: false, stock: null },
    { id: 'juice-2', name: "Pineapple Punch", price: 4.80, category: "Juices", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/juice-pineapple-punch.jpg", hasModifiers: false, stock: null },
    { id: 'juice-3', name: "Mango Glow", price: 5.25, category: "Juices", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/juice-mango-glow.jpg", hasModifiers: false, stock: null },
    { id: 'cold-1', name: "Fresh Orange Juice", price: 4.50, category: "Juices", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg", hasModifiers: false, stock: null },

    // Smoothies & Shakes
    { id: 'smoothie-1', name: "Berry Burst", price: 5.20, category: "Smoothie", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-berry-cream.jpg", hasModifiers: false, stock: null },
    { id: 'smoothie-2', name: "Green Power", price: 5.00, category: "Smoothie", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-green-power.jpg", hasModifiers: false, stock: null },
    { id: 'shake-1', name: "Classic Chocolate Shake", price: 5.20, category: "Shakes", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-choco-malt.jpg", hasModifiers: false, stock: null },
    { id: 'shake-2', name: "Vanilla Bean Shake", price: 5.00, category: "Shakes", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/shake-vanilla-bean.jpg", hasModifiers: false, stock: null },
    { id: 'shake-3', name: "Strawberry Bliss", price: 5.40, category: "Shakes", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/shake-strawberry.jpg", hasModifiers: false, stock: null },
    { id: 'shake-4', name: "Banana Caramel", price: 5.60, category: "Shakes", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/shake-banana-caramel.jpg", hasModifiers: false, stock: null },

    // Toasts & Benedicts
    { id: 'toast-1', name: "Signature Benedict", price: 14.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/toast-signature-benedict.jpg", hasModifiers: false, stock: null },
    { id: 'toast-2', name: "Truffle Omelette", price: 12.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/brunch-farm-omelette.jpg", hasModifiers: false, stock: null },
    { id: 'toast-3', name: "Shakshuka", price: 11.25, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/toast-shakshuka.jpg", hasModifiers: false, stock: null },
    { id: 'toast-4', name: "Avocado Toast", price: 10.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/toast-avocado.jpg", hasModifiers: false, stock: null },
    { id: 'toast-5', name: "Classic Benedict", price: 13.50, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/toast-benedict.jpg", hasModifiers: false, stock: null },
    { id: 'toast-6', name: "Vegan Power Bowl", price: 12.00, category: "Brunch", image_url: "../swiggy-style_elite_main_menu_390x2500/assets/toast-vegan-bowl.jpg", hasModifiers: false, stock: null },
];

const DEMO_ORDERS = [
    { id: 'ORD-001', table: '12', items: [{ name: 'Velvet Flat White', qty: 2, price: 20, image_url: '../swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg' }, { name: 'Butter Croissant', qty: 1, price: 18, image_url: '../swiggy-style_elite_main_menu_390x2500/assets/sweet-butter-croissant.jpg' }], total: 58, status: 'Received', time: Date.now() - 1000 * 60 * 2 },
    { id: 'ORD-002', table: '5', items: [{ name: 'Avocado Toast', qty: 1, price: 45, image_url: '../swiggy-style_elite_main_menu_390x2500/assets/toast-avocado.jpg' }, { name: 'Fresh Orange Juice', qty: 1, price: 30, image_url: '../swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg' }], total: 75, status: 'Preparing', time: Date.now() - 1000 * 60 * 12 },
    { id: 'ORD-003', table: '3', items: [{ name: 'Single Origin Espresso', qty: 3, price: 18, mods: ['Extra Shot', 'Oat Milk'], image_url: '../swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg' }], total: 78, status: 'Ready', time: Date.now() - 1000 * 60 * 25 },
];

// --- TRANSLATIONS ---
const DASHBOARD_TRANSLATIONS = {
    en: {
        dashboard: "Dashboard",
        take_order: "Take Order",
        live_orders: "Live Orders",
        kitchen_display: "Kitchen Display",
        menu_manager: "Menu Manager",
        qr_center: "QR Center",
        reservations: "Reservations",
        sign_out: "Sign Out",
        summary_title: "Today's Summary",
        summary_subtitle: "Manage your shop in real-time.",
        manual_order: "Manual Order",
        kitchen_online: "Kitchen Online",
        total_revenue: "Total Revenue",
        active_tables: "Active Tables",
        pending_orders: "Pending",
        completed_orders: "Completed",
        search_placeholder: "Search menu items...",
        add_to_cart: "Add to Order",
        checkout: "Checkout",
        table: "Table",
        status: "Status",
        items: "Items",
        total: "Total",
        action: "Action",
        total_sales: "Total Sales",
        total_orders: "Total Orders",
        today: "Today",
        avg_prep: "Avg. Preparation",
        fast: "Fast",
        in_progress: "In Progress",
        quick_actions: "Quick Actions",
        generate_qr: "<p class='font-bold'>Generate QR</p><p class='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>New Table QR</p>",
        welcome_ali: "<h2 class='text-xl font-bold'>Good Morning, Ali! 👋</h2><p class='text-gray-500 mt-2'>Here's what's happening at Stitch today.</p>",
        end_shift: "End Shift",
        floor_plan: "Floor Plan"
    },
    fr: {
        dashboard: "Tableau de Bord",
        take_order: "Prendre Commande",
        live_orders: "Commandes en Direct",
        kitchen_display: "Affichage Cuisine",
        menu_manager: "Gestion Menu",
        qr_center: "Centre QR",
        reservations: "Réservations",
        sign_out: "Déconnexion",
        summary_title: "Résumé d'aujourd'hui",
        summary_subtitle: "Gérez votre boutique en temps réel.",
        manual_order: "Commande Manuelle",
        kitchen_online: "Cuisine en Ligne",
        total_revenue: "Chiffre d'Affaire",
        active_tables: "Tables Actives",
        pending_orders: "En attente",
        completed_orders: "Terminées",
        search_placeholder: "Rechercher des articles...",
        add_to_cart: "Ajouter à la commande",
        checkout: "Payer",
        table: "Table",
        status: "Statut",
        items: "Articles",
        total: "Total",
        action: "Action",
        total_sales: "Ventes Totales",
        total_orders: "Commandes Totales",
        today: "Aujourd'hui",
        avg_prep: "Préparation Moy.",
        fast: "Rapide",
        in_progress: "En Cours",
        quick_actions: "Actions Rapides",
        generate_qr: "<p class='font-bold'>Générer QR</p><p class='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Nouveau QR Table</p>",
        welcome_ali: "<h2 class='text-xl font-bold'>Bonjour, Ali ! 👋</h2><p class='text-gray-500 mt-2'>Voici ce qui se passe chez Stitch aujourd'hui.</p>",
        end_shift: "Fin de service",
        floor_plan: "Plan de salle"
    },
    ar: {
        dashboard: "لوحة التحكم",
        take_order: "اتخاذ الطلب",
        live_orders: "الطلبات المباشرة",
        kitchen_display: "عرض المطبخ",
        menu_manager: "مدير القائمة",
        qr_center: "مركز QR",
        reservations: "الحجوزات",
        sign_out: "تسجيل الخروج",
        summary_title: "ملخص اليوم",
        summary_subtitle: "إدارة متجرك في الوقت الحقيقي.",
        manual_order: "طلب يدوي",
        kitchen_online: "المطبخ متصل",
        total_revenue: "إجمالي الإيرادات",
        active_tables: "الطاولات النشطة",
        pending_orders: "قيد الانتظار",
        completed_orders: "مكتمل",
        search_placeholder: "البحث في القائمة...",
        add_to_cart: "إضافة للطلب",
        checkout: "الدفع",
        table: "طاولة",
        status: "الحالة",
        items: "العناصر",
        total: "المجموع",
        action: "إجراء",
        total_sales: "إجمالي المبيعات",
        total_orders: "إجمالي الطلبات",
        today: "اليوم",
        avg_prep: "متوسط التحضير",
        fast: "سريع",
        in_progress: "قيد التنفيذ",
        quick_actions: "إجراءات سريعة",
        generate_qr: "<p class='font-bold'>إنشاء QR</p><p class='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>QR طاولة جديد</p>",
        welcome_ali: "<h2 class='text-xl font-bold'>صباح الخير يا علي! 👋</h2><p class='text-gray-500 mt-2'>إليك ما يحدث في Stitch اليوم.</p>",
        end_shift: "إنهاء الوردية",
        floor_plan: "مخطط الطوابق"
    }
};

let currentLang = localStorage.getItem('stitch_dashboard_lang') || 'en';

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('stitch_dashboard_lang', lang);

    // Set direction
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update translations (text only)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (DASHBOARD_TRANSLATIONS[lang][key]) {
            el.textContent = DASHBOARD_TRANSLATIONS[lang][key];
        }
    });

    // Update translations (HTML inner)
    document.querySelectorAll('[data-i18n-inner]').forEach(el => {
        const key = el.getAttribute('data-i18n-inner');
        if (DASHBOARD_TRANSLATIONS[lang][key]) {
            el.innerHTML = DASHBOARD_TRANSLATIONS[lang][key];
        }
    });

    // Update UI active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active-lang', 'bg-primary', 'text-white');
        if (btn.id === `lang-${lang}`) {
            btn.classList.add('active-lang', 'bg-primary', 'text-white');
        }
    });

    // Update cycle button text
    const langCycleText = document.getElementById('lang-cycle-text');
    if (langCycleText) {
        langCycleText.textContent = lang.toUpperCase();
    }

    // Handle dynamic text elements
    if (typeof updateDynamicTranslations === 'function') {
        updateDynamicTranslations();
    }
}

function updateDynamicTranslations() {
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');

    // Only update if they exist and are matched to summary
    if (title && (title.textContent.includes('Summary') || title.textContent.includes('Résumé') || title.textContent.includes('ملخص'))) {
        title.textContent = DASHBOARD_TRANSLATIONS[currentLang].summary_title;
    }
}

function cycleLanguage() {
    const languages = ['en', 'fr', 'ar'];
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    
    // Update the button text
    const langCycleText = document.getElementById('lang-cycle-text');
    if (langCycleText) {
        langCycleText.textContent = nextLang.toUpperCase();
    }
    
    // Switch to the next language
    switchLanguage(nextLang);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLang);
    
    // Initialize cycle button text
    const langCycleText = document.getElementById('lang-cycle-text');
    if (langCycleText) {
        langCycleText.textContent = currentLang.toUpperCase();
    }
    
    // ... existing init logic
});

// --- STATE ---
let posCart = [];
let menuItems = [...DEMO_MENU];
let liveOrders = [...DEMO_ORDERS]; // Mutable state for KDS dashboard
let completedOrders = []; // Track completed orders for Z-Report
let globalDiscount = { amount: 0, type: '%' };
let currentModItem = null; // Item currently being customized
let activePosCartItemId = null;
let hasHydratedMenuFromAPI = false;
let menuRequestPromise = null;
let hasInitializedMenuManager = false;
let initialHydrationFinished = false;

function waitForMaterialSymbols(timeoutMs = 1200) {
    if (!document.fonts?.load) return Promise.resolve();
    return Promise.race([
        document.fonts.load('20px "Material Symbols Outlined"'),
        new Promise(resolve => setTimeout(resolve, timeoutMs))
    ]);
}

function finishInitialHydration() {
    if (initialHydrationFinished) return;
    initialHydrationFinished = true;
    document.body.classList.remove('app-preload');
}

function revealMaterialIcons() {
    document.body.classList.remove('icons-pending');
}

window.addEventListener('error', () => {
    finishInitialHydration();
    revealMaterialIcons();
}, { once: true });
window.addEventListener('unhandledrejection', () => {
    finishInitialHydration();
    revealMaterialIcons();
}, { once: true });

// --- API HELPER (gracefully falls back to demo data) ---
function apiBase() {
    try {
        return localStorage.getItem('stitch_api_base') || 'http://localhost:3000';
    } catch {
        return 'http://localhost:3000';
    }
}

async function fetchJSON(url, options = {}) {
    const { timeoutMs = 2500, ...restOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const token = localStorage.getItem('stitch_token');
    try {
        const res = await fetch(url, {
            ...restOptions,
            signal: controller.signal,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...(restOptions.headers || {}) }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

function hydrateMenuFromCache() {
    try {
        const cached = JSON.parse(localStorage.getItem('stitch_menu_cache') || '[]');
        if (Array.isArray(cached) && cached.length > 0) menuItems = cached;
    } catch { }
}

function persistMenuCache(items) {
    try {
        localStorage.setItem('stitch_menu_cache', JSON.stringify(items));
    } catch { }
}

async function ensureMenuData() {
    if (hasHydratedMenuFromAPI) return;
    if (menuRequestPromise) {
        await menuRequestPromise;
        return;
    }

    const token = localStorage.getItem('stitch_token');
    const apiBaseUrl = apiBase();
    if (!token && apiBaseUrl === 'http://localhost:3000') {
        hasHydratedMenuFromAPI = true;
        return;
    }

    menuRequestPromise = (async () => {
        try {
            const result = await fetchJSON(`${apiBaseUrl}/api/v1/menu`, { timeoutMs: 1500 });
            if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                menuItems = result.data;
                persistMenuCache(menuItems);
            }
        } catch { }
        hasHydratedMenuFromAPI = true;
        menuRequestPromise = null;
    })();

    await menuRequestPromise;
}

// --- TAB SWITCHING ---
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    
    const activeTab = document.getElementById(`${tabId}-tab`);
    if (activeTab) activeTab.classList.remove('hidden');

    const titles = {
        dashboard: ["Today's Summary", "Manage your shop in real-time."],
        pos: ["Point of Sale", "Take manual orders directly from the counter."],
        orders: ["Order History", "Review and manage all past orders."],
        kitchen: ["Kitchen Display", "Manage orders in the kitchen."],
        menu: ["Menu Management", "Add, edit, or remove products from your shop."],
        qr: ["QR Command Center", "Manage table status and generate ordering codes."],
    };
    if (pageTitle && titles[tabId]) {
        pageTitle.textContent = titles[tabId][0];
        if (pageSubtitle) {
            if (tabId === 'pos') {
                // Hide subtitle in POS mode
                pageSubtitle.style.display = 'none';
            } else {
                // Show subtitle and set text for other tabs
                pageSubtitle.style.display = 'block';
                pageSubtitle.textContent = titles[tabId][1];
            }
        }
    }

    if (tabId === 'dashboard') { renderDashboard(); }
    if (tabId === 'pos') { loadPOSMenu(); }
    if (tabId === 'orders') { renderOrders(); }
    if (tabId === 'kitchen') { renderKitchenDisplay(); }
    if (tabId === 'menu') { loadMenuManager(); }
    if (tabId === 'qr') { loadQRTab(); }
    if (tabId === 'reservations') { loadReservationsTab(); }
}

// --- QR CENTER TAB ---
const DEFAULT_TABLE_DATA = {
    "Floor A": [
        { id: "A-1", status: "Available", seats: 4 },
        { id: "A-2", status: "Available", seats: 4 },
        { id: "A-3", status: "Available", seats: 2 },
        { id: "A-4", status: "Occupied", seats: 6 },
        { id: "A-5", status: "Available", seats: 4 },
        { id: "A-6", status: "Available", seats: 4 },
    ],
    "Floor B": [
        { id: "B-1", status: "Available", seats: 4 },
        { id: "B-2", status: "Available", seats: 4 },
        { id: "B-3", status: "Available", seats: 4 },
    ],
    "Terrace": [
        { id: "T-1", status: "Available", seats: 2 },
        { id: "T-2", status: "Available", seats: 2 },
        { id: "T-3", status: "Available", seats: 4 },
    ]
};

let TABLE_DATA = JSON.parse(localStorage.getItem('stitch_tables')) || DEFAULT_TABLE_DATA;
let reservations = JSON.parse(localStorage.getItem('stitch_reservations')) || [];
let qrPrintSize = 'small'; // small, medium, large

function saveTableData() {
    localStorage.setItem('stitch_tables', JSON.stringify(TABLE_DATA));
}

let qrSelectedTables = []; // Array of table IDs
let currentQRFloor = "Floor A";
let currentViewedTable = null; // Object {id, floor}

function loadQRTab() {
    renderQRFloors();
    renderTableGrid(currentQRFloor);
    updateQRSelectionPanel();
    bindQRBlankClickDeselect();
}

function renderQRFloors() {
    const container = document.getElementById('qr-floors');
    if (!container) return;
    const floors = Object.keys(TABLE_DATA);
    container.innerHTML = floors.map(floor => `
        <button onclick="switchQRFloor('${floor}')" class="floor-btn px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm transition-all ${floor === currentQRFloor ? 'bg-primary text-white' : 'bg-white dark:bg-zinc-800 border border-accent-grey dark:border-white/5 text-industrial-slate dark:text-zinc-300'}">
            ${floor}
        </button>
    `).join('');
}

window.switchQRFloor = (floor) => {
    currentQRFloor = floor;
    renderQRFloors();
    renderTableGrid(floor);
};

function renderTableGrid(floor) {
    const grid = document.getElementById('qr-table-grid');
    if (!grid) return;
    const tables = TABLE_DATA[floor] || [];

    grid.innerHTML = tables.map(t => {
        const isSelected = qrSelectedTables.includes(t.id);
        const isReserved = reservations.some(r => r.tableId === t.id);
        const status = isReserved ? 'Reserved' : t.status;
        const statusColor = status === 'Available' ? 'text-green-500' : status === 'Reserved' ? 'text-purple-500' : 'text-primary';
        const bgOpacity = status === 'Available' ? 'bg-green-500/5' : status === 'Reserved' ? 'bg-purple-500/5' : 'bg-primary/5';

        return `
            <div class="relative group">
                <button onclick="viewTable('${t.id}', '${floor}')" class="w-full text-left p-4 sm:p-5 rounded-[2rem] border-2 transition-all pos-card btn-white shadow-soft ${currentViewedTable?.id === t.id ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-[#2a1e19] hover:border-gray-200'}">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-black">${t.id}</span>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full ${bgOpacity}">
                            <span class="w-1.5 h-1.5 rounded-full ${statusColor.replace('text', 'bg')} animate-pulse"></span>
                            <span class="text-[9px] font-black uppercase tracking-widest ${statusColor}">${t.status}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400">
                        <span class="material-symbols-outlined text-sm">person</span>
                        <span class="text-[10px] font-bold">Seats: ${t.seats}</span>
                    </div>
                </button>
                <!-- Selection Checkbox -->
                <div class="absolute top-3 right-3 z-10">
                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleTableSelection('${t.id}')" class="w-5 h-5 rounded-lg border-2 border-slate-200 text-primary focus:ring-primary cursor-pointer transition-all">
                </div>
            </div>
        `;
    }).join('');
}

window.toggleTableSelection = (id) => {
    const idx = qrSelectedTables.indexOf(id);
    if (idx > -1) qrSelectedTables.splice(idx, 1);
    else qrSelectedTables.push(id);

    updateQRBulkActions();
    renderTableGrid(currentQRFloor);
};

function updateQRBulkActions() {
    const bar = document.getElementById('qr-bulk-actions');
    const text = document.getElementById('selected-count-text');
    if (!bar || !text) return;

    if (qrSelectedTables.length > 0) {
        bar.classList.remove('hidden');
        text.textContent = `${qrSelectedTables.length} Table${qrSelectedTables.length > 1 ? 's' : ''} Selected`;
    } else {
        bar.classList.add('hidden');
    }
}

function updateQRSelectionPanel() {
    const noSel = document.getElementById('qr-no-selection');
    const activeSel = document.getElementById('qr-active-selection');
    if (!noSel || !activeSel) return;

    if (!currentViewedTable) {
        noSel.classList.remove('hidden');
        activeSel.classList.add('hidden');
    } else {
        noSel.classList.add('hidden');
        activeSel.classList.remove('hidden');

        const table = TABLE_DATA[currentViewedTable.floor].find(t => t.id === currentViewedTable.id);
        document.getElementById('qr-sel-id').textContent = `Table ${table.id}`;
        document.getElementById('qr-sel-area').textContent = currentViewedTable.floor;

        // Update status buttons
        document.querySelectorAll('.status-toggle-btn').forEach(btn => {
            const isMatch = btn.dataset.status === table.status;
            btn.classList.toggle('bg-primary', isMatch && table.status === 'Occupied');
            btn.classList.toggle('bg-green-500', isMatch && table.status === 'Available');
            btn.classList.toggle('text-white', isMatch);
            btn.classList.toggle('border-transparent', isMatch);
        });

        // Update size buttons
        document.querySelectorAll('.size-option-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === qrPrintSize);
            btn.classList.toggle('bg-primary', btn.dataset.size === qrPrintSize);
            btn.classList.toggle('text-white', btn.dataset.size === qrPrintSize);
        });

        generateQRPreview(table.id);
    }
}

function clearViewedTableSelection() {
    if (!currentViewedTable) return;
    currentViewedTable = null;
    renderTableGrid(currentQRFloor);
    updateQRSelectionPanel();
}

function bindQRBlankClickDeselect() {
    const grid = document.getElementById('qr-table-grid');
    const leftColumn = grid?.closest('.lg\\:col-span-2');
    if (!grid || !leftColumn || leftColumn.dataset.blankDeselectBound === '1') return;

    leftColumn.dataset.blankDeselectBound = '1';
    grid.addEventListener('click', (event) => {
        if (event.target === grid) {
            clearViewedTableSelection();
        }
    });

    leftColumn.addEventListener('click', (event) => {
        const clickedInteractive = event.target.closest('button, input, label, a');
        if (clickedInteractive) return;
        clearViewedTableSelection();
    });

    if (document.body.dataset.qrEscDeselectBound !== '1') {
        document.body.dataset.qrEscDeselectBound = '1';
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            const qrTab = document.getElementById('qr-tab');
            if (qrTab?.classList.contains('hidden')) return;
            clearViewedTableSelection();
        });
    }
}

window.viewTable = (id, floor) => {
    currentViewedTable = { id, floor };
    renderTableGrid(floor);
    updateQRSelectionPanel();
};

window.setTableStatus = (status) => {
    if (!currentViewedTable) return;
    const table = TABLE_DATA[currentViewedTable.floor].find(t => t.id === currentViewedTable.id);
    if (table) {
        table.status = status;
        saveTableData();
        renderTableGrid(currentViewedTable.floor);
        updateQRSelectionPanel();
    }
};

window.setPrintSize = (size) => {
    qrPrintSize = size;
    
    // Update radio card active states
    const buttons = document.querySelectorAll('.btn-radio-card');
    buttons.forEach(btn => {
        if (btn.dataset.size === size) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    updateQRSelectionPanel();
};

function overlayQRCode(ctx, canvas, qrImg, tableId) {
    // Calculate position for QR code to fit perfectly in brackets
    const qrSize = 175; 
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = 118; // Adjusted to sit inside brackets

    // 1. Draw white background for QR area to cover the "QR" placeholder
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4);
    
    // 2. Draw QR code
    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
    
    // 3. Draw background color patch to cover messy instructions
    // Using a color close to the template's yellow/light area if possible, 
    // but the template is mostly white/light in that area. 
    // Let's use the background color of the template area.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(20, 305, 210, 80); // Covering the instruction block

    // 4. Draw Clear Instructions
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    
    // Instruction 1
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("1. OUVREZ L'APPAREIL PHOTO", canvas.width / 2, 315);
    ctx.font = '500 8px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("DE VOTRE TÉLÉPHONE", canvas.width / 2, 325);
    
    // Instruction 2
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("2. POINTEZ LE QR CODE", canvas.width / 2, 340);
    
    // Instruction 3
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("3. APPUYEZ SUR LA NOTIFICATION", canvas.width / 2, 355);
    ctx.font = '500 8px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("POUR AFFICHER NOTRE MENU", canvas.width / 2, 365);
    
    // 5. Add table number text at bottom area
    ctx.fillStyle = '#000000'; 
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${tableId}`, canvas.width / 2, 400);
}

function generateQRPreview(tableId) {
    const container = document.getElementById('qr-preview-canvas');
    if (!container) return;
    container.innerHTML = '';

    const url = `${window.location.origin}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?table=${tableId}`;

    // Create a temporary div for QRCode.js to render into
    const tempDiv = document.createElement('div');
    new QRCode(tempDiv, {
        text: url,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Create canvas for the template preview
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 250;
    canvas.height = 420;
    canvas.className = 'rounded-3xl shadow-combined';

    // Load the template image
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        setTimeout(() => {
            const qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
            if (qrImg) {
                overlayQRCode(ctx, canvas, qrImg, tableId);
            }
            container.appendChild(canvas);
            canvas.id = "stylized-qr-canvas";
        }, 50);
    };
    
    // Fallback if template image fails to load
    backgroundImage.onerror = function() {
        console.warn('Template image failed to load, using default preview');
        
        // Fallback to original design
        setTimeout(() => {
            const qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
            if (!qrImg) return;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 250, 420);

            ctx.lineWidth = 10;
            ctx.strokeStyle = '#FF5200';
            ctx.strokeRect(5, 5, 240, 410);

            ctx.drawImage(qrImg, 25, 80, 200, 200);

            ctx.fillStyle = '#FF5200';
            ctx.font = 'bold 24px "Instrument Serif", serif';
            ctx.textAlign = 'center';
            ctx.fillText('STITCH CAFÉ', 125, 380);

            container.appendChild(canvas);
            canvas.id = "stylized-qr-canvas";
        }, 50);
    };
    
    // Load the template image
    backgroundImage.src = '../../image new/qr code .jpg';
}

window.refreshCurrentQR = () => {
    if (currentViewedTable) generateQRPreview(currentViewedTable.id);
};

window.printCurrentQR = () => {
    if (!currentViewedTable) return;

    const sourceCanvas = document.getElementById('stylized-qr-canvas');
    if (!sourceCanvas) return;

    const printSection = document.getElementById('print-section');
    printSection.innerHTML = '';

    const printCanvas = document.createElement('canvas');
    const pctx = printCanvas.getContext('2d');

    // Size Mapping (roughly mapping mm to px at 96dpi)
    const sizes = {
        small: { w: 320, h: 210 }, // Card (~85x55mm)
        medium: { w: 450, h: 450 }, // ~120x120mm
        large: { w: 750, h: 750 }   // ~200x200mm
    };

    const target = sizes[qrPrintSize] || sizes.small;
    printCanvas.width = target.w;
    printCanvas.height = target.h;

    // Draw background white
    pctx.fillStyle = '#ffffff';
    pctx.fillRect(0, 0, target.w, target.h);

    if (qrPrintSize === 'small') {
        // Card layout: QR on left, Text on right
        pctx.drawImage(sourceCanvas, 10, 10, 190, 190);
        pctx.fillStyle = '#FF5200';
        pctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        pctx.fillText('STITCH', 210, 50);
        pctx.font = '12px "Plus Jakarta Sans", sans-serif';
        pctx.fillStyle = '#666';
        pctx.fillText(`TABLE ${currentViewedTable.id}`, 210, 80);
        pctx.fillText('Scan to Order', 210, 100);
    } else {
        // Square layout: Center QR
        const qrSize = target.w * 0.8;
        const offset = (target.w - qrSize) / 2;
        pctx.drawImage(sourceCanvas, offset, offset, qrSize, qrSize);
    }

    printSection.appendChild(printCanvas);
    printSection.classList.remove('hidden');
    window.print();
    printSection.classList.add('hidden');
};

window.printCurrentQRWithTemplate = () => {
    if (!currentViewedTable) return;

    const sourceCanvas = document.getElementById('stylized-qr-canvas');
    if (!sourceCanvas) return;

    const printSection = document.getElementById('print-section');
    printSection.innerHTML = '';

    const printCanvas = document.createElement('canvas');
    const pctx = printCanvas.getContext('2d');

    // Set dimensions for the template (A5-ish aspect ratio)
    printCanvas.width = 1200;
    printCanvas.height = 1800;

    // Create background image
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
        // Draw the background template
        pctx.drawImage(backgroundImage, 0, 0, printCanvas.width, printCanvas.height);
        
        // Get QR code from QRCode.js instead of sourceCanvas for higher quality
        const tableId = currentViewedTable.id;
        const url = `${window.location.origin}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?table=${tableId}`;
        
        const qrContainer = document.createElement('div');
        new QRCode(qrContainer, {
            text: url,
            width: 1024,
            height: 1024,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            const qrImg = qrContainer.querySelector('img') || qrContainer.querySelector('canvas');
            if (qrImg) {
                const qrSize = 840; // 4.8x the 175 from preview
                const qrX = (printCanvas.width - qrSize) / 2;
                const qrY = 500; // Adjusted for print template

                // 1. Draw white background
                pctx.fillStyle = '#FFFFFF';
                pctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

                // 2. Draw QR code
                pctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
                
                // 3. Draw background patch for instructions
                pctx.fillStyle = '#FFFFFF';
                pctx.fillRect(100, 1340, 1000, 300);

                // 4. Draw Clear Instructions
                pctx.fillStyle = '#000000';
                pctx.textAlign = 'center';
                
                // Instruction 1
                pctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("1. OUVREZ L'APPAREIL PHOTO", printCanvas.width / 2, 1380);
                pctx.font = '500 36px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("DE VOTRE TÉLÉPHONE", printCanvas.width / 2, 1430);
                
                // Instruction 2
                pctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("2. POINTEZ LE QR CODE", printCanvas.width / 2, 1500);
                
                // Instruction 3
                pctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("3. APPUYEZ SUR LA NOTIFICATION", printCanvas.width / 2, 1570);
                pctx.font = '500 36px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("POUR AFFICHER NOTRE MENU", printCanvas.width / 2, 1620);
                
                // 5. Add table number
                pctx.fillStyle = '#000000';
                pctx.font = '800 120px "Plus Jakarta Sans", sans-serif';
                pctx.textAlign = 'center';
                pctx.fillText(`${tableId}`, printCanvas.width / 2, 1750);
            }
            
            // Add to print section and trigger print
            printSection.appendChild(printCanvas);
            printSection.classList.remove('hidden');
            window.print();
            printSection.classList.add('hidden');
        }, 100);
    };
    
    // Load your template image
    backgroundImage.src = '../../image new/qr code .jpg';
    
    // Fallback if image fails to load
    backgroundImage.onerror = function() {
        console.warn('Template image failed to load, using default print');
        printCurrentQR();
    };
};

window.shareCurrentQR = () => {
    if (!currentViewedTable) return;
    const url = `${window.location.origin}/order?table=${currentViewedTable.id}`;
    if (navigator.share) {
        navigator.share({ title: `Order from Table ${currentViewedTable.id}`, url });
    } else {
        alert(`Link copied: ${url}`);
    }
};

window.downloadSelectedQRs = () => {
    if (qrSelectedTables.length === 0) return;

    alert(`⚡ Generating ${qrSelectedTables.length} QR codes for download...`);

    // In a real app, we'd loop through selected tables, 
    // generate canvases, and trigger downloads or a ZIP.
    // For demo: simulation
    setTimeout(() => {
        alert("✅ Download ready! (Simulated)");
        qrSelectedTables = [];
        updateQRBulkActions();
        renderTableGrid(currentQRFloor);
    }, 1500);
};

// --- RESERVATIONS TAB ---
function loadReservationsTab() {
    renderReservationList();
}

function renderReservationList() {
    const container = document.getElementById('reservation-list');
    const emptyState = document.getElementById('reservation-empty');
    if (!container || !emptyState) return;

    if (reservations.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = reservations.map((res, index) => `
        <div class="bg-white dark:bg-[#2a1e19] p-5 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-between reservation-card">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-500 font-black">
                    ${res.tableId}
                </div>
                <div>
                    <h5 class="font-bold">${res.clientName}</h5>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${res.date} • ${res.time}</p>
                </div>
            </div>
            <button onclick="deleteReservation(${index})" class="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `).join('');
}

window.openReservationModal = () => {
    // Populate table select
    const select = document.getElementById('res-table-id');
    if (select) {
        const allTables = [];
        Object.keys(TABLE_DATA).forEach(floor => {
            TABLE_DATA[floor].forEach(t => allTables.push(t.id));
        });
        select.innerHTML = allTables.map(id => `<option value="${id}">${id}</option>`).join('');
    }

    // Set default date to today
    const dateInput = document.getElementById('res-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    document.getElementById('reservation-modal').classList.remove('hidden');
};

window.closeReservationModal = () => {
    document.getElementById('reservation-modal').classList.add('hidden');
};

window.saveReservation = () => {
    const clientName = document.getElementById('res-client-name').value;
    const tableId = document.getElementById('res-table-id').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;

    if (!clientName || !tableId || !date || !time) {
        alert("Please fill all fields");
        return;
    }

    reservations.push({ clientName, tableId, date, time });
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
    closeReservationModal();

    // Update dashboard grid if we are in QR view
    if (!document.getElementById('qr-tab').classList.contains('hidden')) {
        renderTableGrid(currentQRFloor);
    }
};

window.deleteReservation = (index) => {
    reservations.splice(index, 1);
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
    if (!document.getElementById('qr-tab').classList.contains('hidden')) {
        renderTableGrid(currentQRFloor);
    }
};

// --- ORDER SYNC LISTENER ---
window.addEventListener('storage', (e) => {
    if (e.key === 'stitch_live_orders') {
        const newOrders = JSON.parse(e.newValue || '[]');
        if (newOrders.length > liveOrders.length) {
            // New order added!
            liveOrders = newOrders;
            renderLiveOrders(liveOrders);
            // Play a sound or notify?
            console.log("🔔 New order synced from menu!");
        }
    }
});

// --- DASHBOARD TAB ---
function renderDashboard() {
    renderLiveOrders(liveOrders); // In complete app: fetch from API, otherwise use local state
}

function getStatusStyle(status) {
    if (status === 'Received') return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
    if (status === 'Preparing') return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    if (status === 'Ready') return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
}

function timeAgo(ms) {
    const min = Math.floor((Date.now() - ms) / 60000);
    return min === 0 ? 'Just now' : `${min}m ago`;
}

function renderLiveOrders(orders) {
    const container = document.querySelector('#dashboard-tab .col-span-2 .grid');
    if (!container) return;

    if (!window.liveOrderInterval) {
        window.liveOrderInterval = setInterval(() => renderLiveOrders(liveOrders), 60000);
    }

    if (orders.length === 0) {
        container.innerHTML = '<div class="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No active orders</div>';
        return;
    }

    // Hybrid Grouping: Group orders by table
    const groupedOrders = {};
    orders.forEach(order => {
        const table = order.table || 'Walk-in';
        if (!groupedOrders[table]) groupedOrders[table] = [];
        groupedOrders[table].push(order);
    });

    let html = '';

    // Sort tables so the one with the oldest active order is first
    const sortedTables = Object.keys(groupedOrders).sort((a, b) => {
        const oldestA = Math.min(...groupedOrders[a].map(o => o.time));
        const oldestB = Math.min(...groupedOrders[b].map(o => o.time));
        return oldestA - oldestB;
    });

    sortedTables.forEach(table => {
        const tableOrders = groupedOrders[table];

        // Table Header
        html += `
            <div class="bg-gray-50/50 dark:bg-black/10 rounded-[2.5rem] p-4 sm:p-6 border border-gray-200 dark:border-white/5 mb-6 col-span-full">
                <div class="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-white/5">
                    <div class="w-12 h-12 bg-white dark:bg-[#2a1e19] rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-sm">
                        <span class="material-symbols-outlined text-primary">table_restaurant</span>
                    </div>
                    <div>
                        <h4 class="text-xl font-black">Table ${table}</h4>
                        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">${tableOrders.length} Active Tickets</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4">
        `;

        // Individual Orders - Visual Cards
        tableOrders.forEach(o => {
            const displayName = o.guestName ? o.guestName : `Order ${o.id}`;
            const guestIcon = o.guestName ? o.guestName.charAt(0).toUpperCase() : '#';

            // Build visual item thumbnails
            const visualItemsHtml = o.items.map(i => `
                <div class="relative group/item shrink-0">
                    <div class="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full border-2 border-white dark:border-[#2a1e19] shadow-sm overflow-hidden flex items-center justify-center">
                        ${i.image_url
                    ? `<img src="${i.image_url}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-gray-400 text-[18px]\\'>coffee</span>'">`
                    : `<span class="material-symbols-outlined text-gray-400 text-[18px]">coffee</span>`}
                    </div>
                    <span class="absolute -top-1 -right-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#2a1e19] shadow-sm">${i.qty}x</span>
                    <!-- Hover Tooltip -->
                    <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10 w-max shadow-xl">
                        ${i.name}
                    </div>
                </div>
            `).join('');

            html += `
                <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] p-5 sm:p-6 border border-gray-100 dark:border-white/5 shadow-soft shadow-lg flex flex-col items-stretch transition-all gap-5 relative overflow-hidden group pos-card btn-white">
                    
                    ${o.status === 'Received' ? '<div class="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-[2.5rem] pointer-events-none"><div class="bg-orange-500 text-white text-[8px] font-bold uppercase tracking-widest text-center py-1 absolute w-24 top-4 -right-6 rotate-45 shadow-sm">NEW</div></div>' : ''}

                    <!-- Top Row: Meta -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 ${getStatusStyle(o.status)} rounded-2xl flex flex-col items-center justify-center shrink-0 transition-colors shadow-sm">
                                <span class="text-xl font-black font-serif italic opacity-90">${guestIcon}</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-3 mb-0.5">
                                    <span class="text-lg font-bold">${displayName}</span>
                                    <span class="px-2 py-0.5 ${getStatusStyle(o.status)} text-[10px] font-bold rounded-full border border-current/20 shadow-sm">${o.status}</span>
                                </div>
                                <div class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    <span class="font-mono">#${o.id}</span>
                                    <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">schedule</span> ${timeAgo(o.time)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden sm:block">
                            <span class="font-black text-lg px-2 text-primary bg-orange-50 dark:bg-orange-900/10 py-1.5 rounded-xl border border-orange-100 dark:border-orange-900/30">${o.total.toFixed(2)}DH</span>
                        </div>
                    </div>

                    <!-- Middle Row: Visual Order Items -->
                    <div class="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                        ${visualItemsHtml}
                        <div class="ml-2 text-xs font-bold text-gray-400 whitespace-nowrap hidden sm:block">
                            ${o.items.length} ${o.items.length === 1 ? 'Item' : 'Items'} Total
                        </div>
                    </div>

                    <!-- Bottom Row: Explicit Actions -->
                    <div class="flex items-center justify-between mt-1 sm:mt-0">
                        <div class="sm:hidden">
                            <span class="font-black text-lg text-primary">${o.total.toFixed(2)}DH</span>
                        </div>
                        <div class="flex items-center gap-3 ml-auto">
                            <button onclick="openReceiptModal('${o.id}')" class="px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center gap-2 pos-button" title="Print Receipt">
                                <span class="material-symbols-outlined text-[18px]">print</span>
                                <span class="hidden sm:inline text-xs">Print</span>
                            </button>
                            <button onclick="openOrderDetailsModal('${o.id}')" class="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                                <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                                <span class="text-sm border-l border-white/20 dark:border-gray-900/20 pl-2 ml-1">Full Details</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`; // Close grid and table block
    });

    container.innerHTML = html;
}

// --- KDS: ORDER DETAILS MODAL ---
window.openOrderDetailsModal = (orderId) => {
    const order = liveOrders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('order-details-id').textContent = order.guestName ? `${order.guestName}'s Order` : `ORD-${order.id}`;
    document.getElementById('order-details-table').textContent = order.table || '—';
    document.getElementById('order-details-time').textContent = timeAgo(order.time);
    document.getElementById('order-details-total').textContent = `${order.total.toFixed(2)}DH`;

    const badge = document.getElementById('order-details-status-badge');
    badge.textContent = order.status;
    badge.className = `px-2 py-0.5 ${getStatusStyle(order.status)} text-[10px] font-bold rounded-full uppercase tracking-widest border border-current/20`;

    // Items list
    document.getElementById('order-details-items').innerHTML = order.items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex items-start gap-4 pos-card btn-white shadow-soft">
            <div class="w-10 h-10 bg-gray-50 dark:bg-black/20 rounded-xl flex items-center justify-center font-black text-primary shrink-0">${item.qty}x</div>
            <div class="flex-1">
                <p class="font-bold text-sm text-gray-800 dark:text-white">${item.name}</p>
                ${item.mods && item.mods.length > 0 ? `<p class="text-xs text-gray-500 mt-1">${item.mods.join(', ')}</p>` : ''}
                ${item.notes ? `<p class="text-[10px] text-orange-500 font-medium mt-1 uppercase tracking-widest"><span class="material-symbols-outlined text-[10px] align-middle">warning</span> ${item.notes}</p>` : ''}
            </div>
            <div class="font-bold text-xs shrink-0">${(item.price * item.qty).toFixed(2)}DH</div>
        </div>
    `).join('');

    // Action buttons based on status
    const actions = document.getElementById('order-details-actions');
    if (order.status === 'Received') {
        actions.innerHTML = `<button onclick="updateOrderStatus('${order.id}', 'Preparing')" class="col-span-2 py-4 bg-blue-500 text-white font-bold rounded-2xl shadow-glow transition-transform hover:scale-105">Start Preparing</button>`;
    } else if (order.status === 'Preparing') {
        actions.innerHTML = `<button onclick="updateOrderStatus('${order.id}', 'Ready')" class="col-span-2 py-4 bg-green-500 text-white font-bold rounded-2xl shadow-glow transition-transform hover:scale-105">Mark as Ready</button>`;
    } else if (order.status === 'Ready') {
        actions.innerHTML = `
            <button onclick="updateOrderStatus('${order.id}', 'Completed')" class="py-4 bg-gray-800 text-white font-bold rounded-2xl transition-transform hover:scale-105">Complete & Archive</button>
            <button onclick="openReceiptModal('${order.id}'); closeOrderDetailsModal()" class="py-4 border border-gray-200 text-gray-800 font-bold rounded-2xl transition-transform hover:scale-105 flex items-center justify-center gap-2"><span class="material-symbols-outlined">print</span> Print</button>`;
    }

    document.getElementById('order-details-modal').classList.remove('hidden');
};

window.closeOrderDetailsModal = () => document.getElementById('order-details-modal').classList.add('hidden');

window.updateOrderStatus = (orderId, newStatus) => {
    const order = liveOrders.find(o => o.id === orderId);
    if (!order) return;
    order.status = newStatus;

    if (newStatus === 'Completed') {
        // Move from live display to completed history
        completedOrders.push({ ...order, completedAt: Date.now() });
        liveOrders = liveOrders.filter(o => o.id !== orderId);
        closeOrderDetailsModal();
    } else {
        // Re-open details to show new state
        openOrderDetailsModal(orderId);
    }
    renderLiveOrders(liveOrders);
};

// --- KDS: RECEIPT PRINTING MODAL ---
window.openReceiptModal = (orderId) => {
    // If order was passed, use it. Otherwise find it.
    let order = liveOrders.find(o => o.id === orderId);
    if (!order) {
        // For completed demo orders not in live state anymore, or fallback
        order = DEMO_ORDERS.find(o => o.id === orderId) || DEMO_ORDERS[0];
    }

    document.getElementById('receipt-date').textContent = new Date(order.time).toLocaleString();
    document.getElementById('receipt-order-id').textContent = `Order: ${order.id}`;
    document.getElementById('receipt-table').textContent = `Table: ${order.table}`;

    // Items
    document.getElementById('receipt-items').innerHTML = order.items.map(i => `
        <div class="flex justify-between items-start mb-2">
            <div class="w-8 shrink-0">${i.qty}x</div>
            <div class="flex-1 px-2">
                <div>${i.name}</div>
                ${i.mods && i.mods.length > 0 ? `<div class="text-[10px] text-gray-500 italic mt-0.5">• ${i.mods.join(', ')}</div>` : ''}
            </div>
            <div class="w-16 text-right">${(i.price * i.qty).toFixed(2)}</div>
        </div>
    `).join('');

    const sub = order.total / 1.1; // Simple reverse tax calculation for demo
    document.getElementById('receipt-subtotal').textContent = sub.toFixed(2);
    document.getElementById('receipt-tax').textContent = (order.total - sub).toFixed(2);
    document.getElementById('receipt-total').textContent = order.total.toFixed(2);

    document.getElementById('receipt-modal').classList.remove('hidden');
};

window.closeReceiptModal = () => document.getElementById('receipt-modal').classList.add('hidden');

window.printReceipt = () => {
    // In a real app, this would trigger a thermal printer API like StarPRNT or Epson ePOS.
    // Here we just trigger the browser print dialog and use CSS to format it.
    const originalTitle = document.title;
    document.title = "Receipt";

    // Quick hack for demo to only print the paper
    const printContent = document.getElementById('receipt-paper').innerHTML;
    const originalBody = document.body.innerHTML;

    document.body.innerHTML = `<div style="padding:20px; font-family:monospace; max-width:300px; margin:auto;">${printContent}</div>`;
    window.print();

    // Restore
    document.body.innerHTML = originalBody;
    document.title = originalTitle;
    location.reload(); // Reload to re-bind event listeners after destructive body text replace
};

// --- Z-REPORT / END OF SHIFT ---
window.openEndOfShiftModal = () => {
    // For demo, we'll calculate totals from both Completed and any remaining Live Orders just to show data
    const allToday = [...completedOrders, ...liveOrders];

    document.getElementById('end-shift-time').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('z-total-qty').textContent = allToday.length;

    const grossTotal = allToday.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('z-total-amount').textContent = `${grossTotal.toFixed(2)}DH`;

    document.getElementById('end-shift-modal').classList.remove('hidden');
};

window.closeEndOfShiftModal = () => document.getElementById('end-shift-modal').classList.add('hidden');

window.printZReport = () => {
    const allToday = [...completedOrders, ...liveOrders];
    const grossTotal = allToday.reduce((sum, o) => sum + o.total, 0);

    const originalTitle = document.title;
    document.title = "Z-Report";

    const printContent = `
        <div style="padding:20px; font-family:monospace; max-width:300px; margin:auto; text-align:center;">
            <h2 style="font-size:24px; font-weight:bold; margin-bottom: 5px;">STITCH Z-REPORT</h2>
            <p style="font-size:12px; border-bottom:1px dashed #000; padding-bottom:10px; margin-bottom:10px;">End of Shift: ${new Date().toLocaleString()}</p>
            
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>Total Transactions:</span>
                <strong>${allToday.length}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:18px; font-weight:bold; border-bottom:1px dashed #000; padding-bottom:10px;">
                <span>Gross Sales:</span>
                <span>${grossTotal.toFixed(2)}DH</span>
            </div>
            
            <p style="font-size:10px; margin-top:20px;">Register Closed</p>
        </div>
    `;

    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();

    document.body.innerHTML = originalBody;
    document.title = originalTitle;
    location.reload();
};

window.closeShift = () => {
    if (!confirm("Are you sure you want to close the register and reset today's data?")) return;

    // Reset Data
    completedOrders = [];
    liveOrders = [];

    closeEndOfShiftModal();
    renderDashboard();
    renderOrders();
    alert('Shift Closed. Register has been reset.');
};

// --- ORDERS TAB (HISTORY) ---
function renderOrders() {
    const ordersTab = document.getElementById('orders-tab');
    if (!ordersTab) return;

    // Combine all orders for history view, sort newest first
    const historyOrders = [...liveOrders, ...completedOrders].sort((a, b) => b.time - a.time);
    const renderKey = historyOrders.map(o => `${o.id}|${o.status}|${o.time}|${o.total}`).join('||');
    if (ordersTab.dataset.renderKey === renderKey) return;
    ordersTab.dataset.renderKey = renderKey;

    if (historyOrders.length === 0) {
        ordersTab.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <h4 class="text-xl font-bold">All Orders</h4>
            </div>
            <div class="text-center py-20 bg-white dark:bg-[#2a1e19] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm text-gray-400">
                <span class="material-symbols-outlined text-[48px] mb-2 opacity-20">receipt_long</span>
                <p class="text-xs font-bold uppercase tracking-widest">No order history available</p>
            </div>`;
        return;
    }

    ordersTab.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-6">
                <h4 class="text-xl font-bold">All Orders</h4>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">${historyOrders.length} Today</span>
            </div>
            <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden overflow-x-auto">
                <table class="w-full text-left min-w-[600px]">
                    <thead>
                        <tr class="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50/50 dark:bg-black/10">
                            <th class="px-6 py-4">Time</th>
                            <th class="px-6 py-4">Order</th>
                            <th class="px-6 py-4">Guest/Table</th>
                            <th class="px-6 py-4">Items</th>
                            <th class="px-6 py-4">Total</th>
                            <th class="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                        ${historyOrders.map(o => `
                        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors cursor-pointer" onclick="openOrderDetailsModal('${o.id}')">
                            <td class="px-6 py-4 text-xs font-bold text-gray-500 whitespace-nowrap">${new Date(o.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td class="px-6 py-4 font-mono text-xs text-gray-500 font-bold">${o.id}</td>
                            <td class="px-6 py-4">
                                <div class="font-bold text-primary truncate max-w-[120px]">${o.guestName || 'Table ' + o.table}</div>
                                ${o.guestName ? `<div class="text-[10px] text-gray-400">Tb: ${o.table}</div>` : ''}
                            </td>
                            <td class="px-6 py-4 text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</td>
                            <td class="px-6 py-4 font-bold text-sm">${o.total.toFixed(2)}DH</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 ${o.status === 'Completed' ? 'bg-gray-800 text-white dark:bg-white dark:text-black' : getStatusStyle(o.status)} text-[10px] font-bold rounded-full border border-current/20 shadow-sm">${o.status}</span>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
}

// --- KITCHEN DISPLAY TAB ---
function renderKitchenDisplay() {
    const kitchenTab = document.getElementById('kitchen-tab');
    if (!kitchenTab) return;
    
    const container = document.getElementById('kitchen-orders-container');
    const emptyState = document.getElementById('kitchen-empty-state');
    
    // Filter orders that need kitchen attention (not completed)
    const kitchenOrders = liveOrders.filter(order => order.status !== 'Completed');
    
    if (kitchenOrders.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Sort by time (oldest first for kitchen priority)
    const sortedOrders = kitchenOrders.sort((a, b) => a.time - b.time);
    
    container.innerHTML = sortedOrders.map(order => `
        <div class="bg-white dark:bg-[#2a1e19] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
            <div class="p-4 border-b border-gray-100 dark:border-white/10">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="font-mono text-xs text-gray-500 font-bold">${order.id}</span>
                        <span class="px-2 py-0.5 ${getStatusStyle(order.status)} text-[10px] font-bold rounded-full border border-current/20 shadow-sm">${order.status}</span>
                    </div>
                    <span class="text-xs font-bold text-gray-400">${timeAgo(order.time)}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[16px] text-gray-400">table_restaurant</span>
                    <span class="text-sm font-bold text-primary">Table ${order.table || 'Walk-in'}</span>
                </div>
            </div>
            
            <div class="p-4">
                <div class="space-y-3">
                    ${order.items.map(item => `
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-lg bg-gray-50 dark:bg-black/20 flex items-center justify-center overflow-hidden">
                                    ${item.image_url ? `<img src="${item.image_url}" alt="${item.name}" class="w-full h-full object-cover">` : '<span class="material-symbols-outlined text-gray-400 text-[16px]">restaurant</span>'}
                                </div>
                                <div>
                                    <div class="font-bold text-sm">${item.name}</div>
                                    ${item.mods ? `<div class="text-xs text-gray-500">${item.mods.join(', ')}</div>` : ''}
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-bold text-sm">x${item.qty}</div>
                                <div class="text-xs text-gray-500">${item.price}DH</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-bold">Total</span>
                        <span class="font-bold text-primary">${order.total.toFixed(2)}DH</span>
                    </div>
                </div>
                
                <div class="mt-4 flex gap-2">
                    ${order.status === 'Received' ? `
                        <button onclick="updateOrderStatus('${order.id}', 'Preparing')" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all">
                            Start Preparing
                        </button>
                    ` : ''}
                    ${order.status === 'Preparing' ? `
                        <button onclick="updateOrderStatus('${order.id}', 'Ready')" class="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all">
                            Mark Ready
                        </button>
                    ` : ''}
                    ${order.status === 'Ready' ? `
                        <button onclick="updateOrderStatus('${order.id}', 'Completed')" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all">
                            Complete Order
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// --- POS TAB ---
async function loadPOSMenu() {
    const grid = document.getElementById('pos-menu-grid');
    if (!grid) return;

    renderPOSCategories(menuItems);
    renderPOSMenu(menuItems);

    await ensureMenuData();

    const searchValue = document.getElementById('pos-search')?.value?.toLowerCase().trim() || '';
    const filtered = searchValue
        ? menuItems.filter(i => i.name.toLowerCase().includes(searchValue) || i.category.toLowerCase().includes(searchValue))
        : menuItems;
    renderPOSCategories(menuItems);
    renderPOSMenu(filtered);
}

function renderPOSCategories(items) {
    const container = document.getElementById('pos-categories');
    if (!container) return;
    const categories = ['All', ...new Set(items.map(i => i.category))];
    container.innerHTML = categories.map(cat => `
        <button onclick="filterPOSByCategory('${cat}')" class="category-btn px-4 py-2 ${cat === 'All' ? 'bg-primary text-white shadow-glow' : 'bg-gray-100 dark:bg-white/5 text-gray-500'} text-xs font-bold rounded-xl transition-all whitespace-nowrap">
            ${cat}
        </button>
    `).join('');
}

window.filterPOSByCategory = (category) => {
    document.querySelectorAll('.category-btn').forEach(btn => {
        const isActive = btn.textContent.trim() === category;
        btn.classList.toggle('bg-primary', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('shadow-glow', isActive);
        btn.classList.toggle('bg-gray-100', !isActive);
        btn.classList.toggle('text-gray-500', !isActive);
    });
    const filtered = category === 'All' ? menuItems : menuItems.filter(i => i.category === category);
    renderPOSMenu(filtered);
};

function renderPOSMenu(items) {
    const grid = document.getElementById('pos-menu-grid');
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-3 text-center py-10 text-gray-400 font-bold text-xs uppercase tracking-widest">No items found</div>';
        return;
    }
    grid.innerHTML = items.map(item => {
        const outOfStock = item.stock !== null && item.stock <= 0;
        return `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft transition-all group relative overflow-hidden pos-card ${outOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/50 cursor-pointer'}" 
             ${!outOfStock ? `onclick="addToCart('${item.id}')"` : ''}>
            
            ${outOfStock ? '<div class="absolute inset-0 bg-white/50 dark:bg-black/50 z-10 flex items-center justify-center"><span class="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest rotate-[-15deg] shadow-lg border-2 border-white dark:border-[#2a1e19]">Sold Out</span></div>' : ''}

            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                ${item.image_url
                ? `<img src="${item.image_url}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">`
                : `<span class="material-symbols-outlined text-4xl text-gray-300">coffee</span>`}
                ${!outOfStock ? `
                <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all bg-white rounded-full p-2 shadow-lg">add</span>
                </div>` : ''}
            </div>
            <h5 class="font-bold text-sm mb-1 truncate pr-2">${item.name}</h5>
            <div class="flex items-center justify-between mt-1">
                <span class="text-primary font-black">${Number(item.price).toFixed(2)}DH</span>
                ${item.stock !== null && item.stock > 0 ? `<span class="text-[10px] font-bold text-orange-500 px-1.5 py-0.5 bg-orange-50 dark:bg-orange-900/20 rounded-md shadow-sm border border-orange-100 dark:border-orange-800/30">${item.stock} left</span>`
                : `<span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${item.category}</span>`}
            </div>
        </div>
    `}).join('');
}

window.addToCart = (itemId) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    // Reject if out of stock
    if (item.stock !== null && item.stock <= 0) {
        alert('This item is currently out of stock.');
        return;
    }

    // Check if adding exceeds current stock
    const cartCount = posCart.filter(c => c.id === itemId).reduce((sum, current) => sum + current.quantity, 0);
    if (item.stock !== null && cartCount >= item.stock) {
        alert(`Cannot add more. Only ${item.stock} left in stock.`);
        return;
    }

    // If it has modifiers (e.g. Coffee), show modal. Otherwise, add directly.
    if (item.hasModifiers || item.category === 'Coffee') {
        openModifierModal(item);
    } else {
        // Direct add for simple items
        const cartId = item.id;
        const existing = posCart.find(c => c.cartId === cartId);
        if (existing) existing.quantity++;
        else posCart.push({ ...item, cartId, quantity: 1, basePrice: item.price, mods: [], notes: '' });
        activePosCartItemId = cartId;
        renderCart();
    }
};

// --- MODIFIER MODAL LOGIC ---
const modifiersConfig = {
    Coffee: [
        {
            name: "Milk Options", type: "radio", options: [
                { label: "Whole Milk", price: 0 },
                { label: "Oat Milk", price: 5 },
                { label: "Almond Milk", price: 4 }
            ]
        },
        {
            name: "Extras", type: "checkbox", options: [
                { label: "Extra Shot", price: 5 },
                { label: "Vanilla Syrup", price: 3 },
                { label: "Caramel Syrup", price: 3 }
            ]
        }
    ],
    Brunch: [
        {
            name: "Sides", type: "checkbox", options: [
                { label: "Extra Egg", price: 5 },
                { label: "Side Avocado", price: 8 },
                { label: "Crispy Bacon", price: 10 }
            ]
        }
    ],
    Tea: [
        {
            name: "Sweetener", type: "radio", options: [
                { label: "No Sugar", price: 0 },
                { label: "Honey", price: 2 },
                { label: "Brown Sugar", price: 0 }
            ]
        }
    ],
    Juices: [
        {
            name: "Extras", type: "checkbox", options: [
                { label: "Fresh Mint", price: 2 },
                { label: "Ginger Shot", price: 5 },
                { label: "Extra Ice", price: 0 }
            ]
        }
    ]
};

function openModifierModal(item) {
    currentModItem = { ...item, basePrice: item.price };
    const modal = document.getElementById('pos-modifier-modal');
    if (!modal) return;

    document.getElementById('mod-item-name').textContent = item.name;
    document.getElementById('mod-item-price').textContent = `${item.price.toFixed(2)}DH`;
    document.getElementById('mod-item-notes').value = '';

    const container = document.getElementById('mod-options-container');
    const mods = modifiersConfig[item.category] || modifiersConfig['Coffee'];

    container.innerHTML = mods.map((mod, gIdx) => `
        <div>
            <h4 class="text-sm font-bold mb-3">${mod.name}</h4>
            <div class="space-y-2">
                ${mod.options.map((opt, oIdx) => `
                    <label class="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#2a1e19] cursor-pointer hover:border-primary/50 transition-all pos-button btn-white shadow-soft">
                        <div class="flex items-center gap-3">
                            <input type="${mod.type}" name="mod-${gIdx}" value="${opt.price}" data-label="${opt.label}" class="text-primary focus:ring-primary ${mod.type === 'radio' ? 'rounded-full' : 'rounded'} border-gray-300" ${mod.type === 'radio' && oIdx === 0 ? 'checked' : ''} onchange="calculateModPrice()">
                            <span class="text-sm font-medium">${opt.label}</span>
                        </div>
                        <span class="text-xs font-bold text-gray-400">${opt.price > 0 ? '+' + opt.price + 'DH' : 'Free'}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');

    calculateModPrice();
    modal.classList.remove('hidden');
}

window.closeModifierModal = () => {
    document.getElementById('pos-modifier-modal')?.classList.add('hidden');
    currentModItem = null;
};

window.calculateModPrice = () => {
    if (!currentModItem) return;
    let total = currentModItem.basePrice;

    document.querySelectorAll('#mod-options-container input:checked').forEach(input => {
        total += parseFloat(input.value);
    });

    document.getElementById('mod-final-price').textContent = `${total.toFixed(2)}DH`;
};

document.getElementById('mod-add-btn')?.addEventListener('click', () => {
    if (!currentModItem) return;

    let addedPrice = 0;
    let selectedMods = [];

    document.querySelectorAll('#mod-options-container input:checked').forEach(input => {
        const val = parseFloat(input.value);
        if (val > 0 || input.type !== 'radio') { // Dont list "Whole Milk (Free)" as a mod to keep it clean, unless you want to
            selectedMods.push(input.dataset.label);
        }
        addedPrice += val;
    });

    const notes = document.getElementById('mod-item-notes').value.trim();
    const tableNo = document.getElementById('mod-item-table').value.trim() || 'Walk-in';
    const finalPrice = currentModItem.basePrice + addedPrice;

    // Create a unique cart ID based on options so identical customizations stack
    const modString = selectedMods.sort().join('|') + '|' + notes + '|' + tableNo;
    const cartId = `${currentModItem.id}-${btoa(modString).substring(0, 10)}`;

    const existing = posCart.find(c => c.cartId === cartId);
    if (existing) {
        existing.quantity++;
        activePosCartItemId = cartId;
    } else {
        posCart.push({
            ...currentModItem,
            cartId,
            quantity: 1,
            price: finalPrice,
            mods: selectedMods,
            notes: notes,
            table: tableNo
        });
        activePosCartItemId = cartId;
    }

    renderCart();
    closeModifierModal();
});

window.focusPosCartItem = (cartId) => {
    activePosCartItemId = cartId;
    renderCart();
};

function renderCart() {
    const cartList = document.getElementById('pos-cart-list');
    const checkoutBtn = document.getElementById('pos-checkout-btn');
    if (!cartList) return;

    if (posCart.length === 0) {
        cartList.innerHTML = `
            <div class="text-center py-4 text-gray-400">
                <span class="material-symbols-outlined text-[32px] mb-1 opacity-20">shopping_cart</span>
                <p class="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
            </div>`;
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        cartList.innerHTML = posCart.map(item => `
            <div onclick="focusPosCartItem('${item.cartId}')" class="pos-cart-item ${activePosCartItemId === item.cartId ? 'active' : ''} flex items-start gap-2 bg-white dark:bg-black/20 p-2 rounded-lg border border-gray-100 dark:border-white/5 group cursor-pointer">
                <div class="w-9 h-9 rounded-md bg-white/90 dark:bg-[#3a2c25] border border-white/80 dark:border-white/10 flex items-center justify-center overflow-hidden text-primary font-bold shrink-0">
                    ${item.image_url
                ? `<img src="${item.image_url}" alt="${item.name}" loading="lazy" decoding="async" class="w-full h-full object-cover">`
                : `<span class="material-symbols-outlined text-[16px] text-primary/70">restaurant</span>`}
                </div>
                <div class="flex-1 min-w-0 py-0">
                    <p class="font-bold text-xs truncate">${item.name}</p>
                    ${item.mods && item.mods.length > 0 ? `<p class="text-[10px] text-gray-500 truncate mt-0.5">${item.mods.join(', ')}</p>` : ''}
                    ${item.notes ? `<p class="text-[10px] text-orange-500 font-medium truncate mt-0.5"><span class="material-symbols-outlined text-[10px] align-middle">warning</span> ${item.notes}</p>` : ''}
                    <p class="text-[10px] text-primary font-bold mt-0.5">Table: ${item.table || 'Walk-in'}</p>
                    <p class="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">${(item.price * item.quantity).toFixed(2)}DH</p>
                </div>
                <div class="w-7 h-7 rounded-md bg-white/90 dark:bg-[#3a2c25] border border-white/80 dark:border-white/10 flex items-center justify-center text-primary text-[10px] font-black shrink-0 mt-0.5">
                    ${item.quantity}x
                </div>
                <div class="flex flex-col gap-0.5 items-center justify-center shrink-0">
                    <button onclick="event.stopPropagation(); updateQty('${item.cartId}', 1)"  class="pos-cart-qty-btn text-gray-400 hover:text-primary transition-all"><span class="material-symbols-outlined text-[18px]">add_circle</span></button>
                    <button onclick="event.stopPropagation(); updateQty('${item.cartId}', -1)" class="pos-cart-qty-btn text-gray-400 hover:text-red-500 transition-all"><span class="material-symbols-outlined text-[18px]">remove_circle</span></button>
                </div>
            </div>
        `).join('');
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    updateTotals();
}

window.updateQty = (cartId, delta) => {
    const item = posCart.find(c => c.cartId === cartId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) posCart = posCart.filter(c => c.cartId !== cartId);
    if (delta > 0) activePosCartItemId = cartId;
    if (!posCart.some(c => c.cartId === activePosCartItemId)) activePosCartItemId = posCart[0]?.cartId || null;
    renderCart();
};

function updateTotals() {
    const subtotal = posCart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Read discount from the new UI elements
    const discountVal = parseFloat(document.getElementById('discount-value')?.value) || 0;
    const discountType = document.getElementById('discount-type')?.value || '%';

    let discountAmount = 0;
    if (discountVal > 0) {
        discountAmount = discountType === '%' ? subtotal * (discountVal / 100) : discountVal;
    }

    const total = Math.max(0, subtotal - discountAmount);
    const el = document.getElementById('pos-cart-total');
    if (el) el.textContent = `${total.toFixed(2)}DH`;
}

window.clearCart = () => {
    posCart = [];
    activePosCartItemId = null;
    const discountEl = document.getElementById('discount-value');
    if (discountEl) discountEl.value = '';
    renderCart();
};

window.checkoutPOS = async () => {
    if (posCart.length === 0) return;
    
    try {
        const result = await fetchJSON(`${apiBase()}/api/v1/orders`, {
            method: 'POST',
            body: JSON.stringify({ items: posCart.map(i => ({ menu_item_id: i.id, quantity: i.quantity })) })
        });
        if (result.success) {
            alert('✅ Order placed successfully!');
            posCart = [];
            renderCart();
            switchTab('dashboard');
            return;
        }
    } catch { /* Demo fallback */ }
    
    // Demo: simulate successful order & decrement stock logically
    const total = posCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderId = 'POS-' + Date.now();
    const tableNo = posCart[0]?.table || 'Walk-in';
    const newOrder = {
        id: orderId,
        table: tableNo,
        items: posCart.map(c => ({ name: c.name, qty: c.quantity, price: c.price, mods: c.mods || [], notes: c.notes || '', image_url: c.image_url || '' })),
        total,
        status: 'Received',
        time: Date.now()
    };
    
    // Decrement stock for tracked items
    posCart.forEach(cartItem => {
        const activeItem = menuItems.find(i => i.id === cartItem.id);
        if (activeItem && activeItem.stock !== null) {
            activeItem.stock = Math.max(0, activeItem.stock - cartItem.quantity);
        }
    });
    
    liveOrders.unshift(newOrder);
    localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));
    posCart = [];
    activePosCartItemId = null;
    renderCart();
    renderDashboard();
    alert(`✅ Order ${orderId} placed successfully! Total: ${total.toFixed(2)}DH`);
    switchTab('orders');
};

window.filterPOSBySearch = (query) => {
    const q = query.toLowerCase().trim();
    const filtered = q ? menuItems.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)) : menuItems;
    renderPOSMenu(filtered);
};


// --- MENU MANAGER TAB ---
let activeMenuSubTab = 'catalog'; // 'catalog' or 'inventory'

async function loadMenuManager() {
    const container = document.getElementById('menu-tab');
    if (!container) return;
    if (!hasInitializedMenuManager) {
        container.innerHTML = `
        <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-2 bg-gray-100 dark:bg-black/20 p-1 rounded-xl self-start">
                    <button onclick="switchMenuSubTab('catalog')" id="subtab-catalog" class="px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMenuSubTab === 'catalog' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Catalog</button>
                    <button onclick="switchMenuSubTab('inventory')" id="subtab-inventory" class="px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMenuSubTab === 'inventory' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Inventory</button>
                </div>
                
                <button onclick="showAddProductModal()" class="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-glow hover:scale-105 transition-all w-full sm:w-auto justify-center">
                    <span class="material-symbols-outlined">add</span> Add Product
                </button>
            </div>
            
            <!-- Dynamic Content Area -->
            <div id="menu-manager-content"></div>
        </div>

        <!-- Add Product Modal -->
        <div id="add-product-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="bg-white dark:bg-[#2a1e19] w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl">
                <h3 class="text-2xl font-bold mb-6">Add New Product</h3>
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                        <input type="text" id="new-product-name" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" placeholder="e.g. Iced Vanilla Latte">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Price (DH)</label>
                        <input type="number" id="new-product-price" step="0.5" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" placeholder="28.00">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Category</label>
                        <select id="new-product-category" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary">
                            <option>Coffee</option><option>Bakery</option><option>Brunch</option><option>Juices</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Initial Stock (Optional)</label>
                        <input type="number" id="new-product-stock" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" placeholder="Leave blank for infinite">
                    </div>
                    <div class="pt-4 flex gap-3">
                        <button onclick="hideAddProductModal()" class="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all">Cancel</button>
                        <button onclick="saveNewProduct()" class="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-glow hover:scale-105 transition-all">Save Product</button>
                    </div>
                </div>
            </div>
        </div>
    `;
        hasInitializedMenuManager = true;
    }

    switchMenuSubTab(activeMenuSubTab);
    await ensureMenuData();
    switchMenuSubTab(activeMenuSubTab);
}

window.showAddProductModal = () => document.getElementById('add-product-modal')?.classList.remove('hidden');
window.hideAddProductModal = () => document.getElementById('add-product-modal')?.classList.add('hidden');

window.switchMenuSubTab = (tab) => {
    activeMenuSubTab = tab;

    // Update active styles
    ['catalog', 'inventory'].forEach(t => {
        const btn = document.getElementById(`subtab-${t}`);
        if (btn) {
            btn.className = `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMenuSubTab === t ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}`;
        }
    });

    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    // Sub-renderer
    if (tab === 'catalog') {
        content.innerHTML = '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="menu-manager-grid"></div>';
        renderMenuManagerItems(menuItems);
    } else {
        renderInventoryManager(menuItems);
    }
};

window.saveNewProduct = async () => {
    const name = document.getElementById('new-product-name')?.value?.trim();
    const price = document.getElementById('new-product-price')?.value;
    const category = document.getElementById('new-product-category')?.value;
    const stockVal = document.getElementById('new-product-stock')?.value;

    if (!name || !price) return alert('Please fill in all fields.');

    const stock = stockVal ? parseInt(stockVal) : null;
    const newItem = { id: 'local-' + Date.now(), name, price: parseFloat(price), category, image_url: '', stock, hasModifiers: category === 'Coffee' };

    try {
        const result = await fetchJSON(`${apiBase()}/api/v1/menu`, {
            method: 'POST',
            body: JSON.stringify({ name, price: parseFloat(price), category, image_url: '' })
        });
        if (result.success) newItem.id = result.data.id;
    } catch { /* demo: just add locally */ }

    menuItems.push(newItem);
    hideAddProductModal();

    // Clear form for next time
    ['new-product-name', 'new-product-price', 'new-product-stock'].forEach(id => {
        if (document.getElementById(id)) document.getElementById(id).value = '';
    });

    switchMenuSubTab(activeMenuSubTab); // Re-render current subtab
};

window.deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
        await fetchJSON(`${apiBase()}/api/v1/menu/${id}`, { method: 'DELETE' });
    } catch { /* demo: delete locally */ }
    menuItems = menuItems.filter(i => i.id !== id);
    switchMenuSubTab(activeMenuSubTab);
};

function renderMenuManagerItems(items) {
    const grid = document.getElementById('menu-manager-grid');
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">No items in menu. Add your first product!</div>';
        return;
    }
    grid.innerHTML = items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                ${item.image_url
            ? `<img src="${item.image_url}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-4xl text-gray-300\\'>coffee</span>'">`
            : `<span class="material-symbols-outlined text-4xl text-gray-300">coffee</span>`}
            </div>
            <h5 class="font-bold text-sm mb-1 truncate">${item.name}</h5>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${item.category}</span>
            <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <div>
                    <span class="text-primary font-black">${Number(item.price).toFixed(2)}DH</span>
                    ${item.stock !== null ? `<span class="block text-[10px] text-gray-500 font-bold mt-0.5">Stock: ${item.stock}</span>` : `<span class="block text-[10px] text-gray-400 mt-0.5 italic">Infinite Stock</span>`}
                </div>
                <button onclick="deleteProduct('${item.id}')" class="text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

// --- INVENTORY VIEW ---
function renderInventoryManager(items) {
    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    if (items.length === 0) {
        content.innerHTML = '<div class="text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">No items in inventory.</div>';
        return;
    }

    content.innerHTML = `
        <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
            <table class="w-full text-left">
                <thead>
                    <tr class="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50/50 dark:bg-black/10">
                        <th class="px-6 py-4">Product Name</th>
                        <th class="px-6 py-4">Category</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4 text-center">Stock Quantity</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                    ${items.map(item => `
                    <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors group">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                                    ${item.image_url ? `<img src="${item.image_url}" loading="lazy" decoding="async" class="w-full h-full object-cover">` : '<span class="material-symbols-outlined text-[16px] text-gray-400">coffee</span>'}
                                </div>
                                <span class="font-bold text-sm truncate max-w-[150px] sm:max-w-xs">${item.name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-xs font-bold text-gray-400 tracking-widest uppercase">${item.category}</td>
                        <td class="px-6 py-4">
                            ${item.stock === null ? '<span class="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-md">Unlimited</span>'
            : item.stock <= 0 ? '<span class="px-2 py-1 bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold rounded-md uppercase tracking-wider">Out of Stock</span>'
                : item.stock <= 5 ? '<span class="px-2 py-1 bg-orange-100 text-orange-600 border border-orange-200 text-[10px] font-bold rounded-md uppercase tracking-wider">Low Stock</span>'
                    : '<span class="px-2 py-1 bg-green-100 text-green-600 border border-green-200 text-[10px] font-bold rounded-md uppercase tracking-wider">In Stock</span>'}
                        </td>
                        <td class="px-6 py-4">
                            ${item.stock !== null ? `
                            <div class="flex items-center justify-center gap-3">
                                <button onclick="adjustStock('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded drop-shadow-sm transition-all focus:ring-1">-</button>
                                <span class="font-mono font-bold w-10 text-center">${item.stock}</span>
                                <button onclick="adjustStock('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded drop-shadow-sm transition-all focus:ring-1">+</button>
                            </div>` : `<div class="text-center text-gray-300 text-xl font-black">∞</div>`}
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

window.adjustStock = (id, delta) => {
    const item = menuItems.find(i => i.id === id);
    if (!item || item.stock === null) return;

    item.stock = Math.max(0, item.stock + delta);
    renderInventoryManager(menuItems);
};

// --- THEME ---
function applyTheme(name) {
    document.documentElement.classList.remove('theme-blue', 'theme-emerald');
    if (name === 'blue') document.documentElement.classList.add('theme-blue');
    if (name === 'emerald') document.documentElement.classList.add('theme-emerald');
    localStorage.setItem('stitch_theme', name);
}

// ============================================================
// INIT — everything starts here after DOM is ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const hydrationTimeout = setTimeout(() => finishInitialHydration(), 2200);
    const iconFontReadyPromise = waitForMaterialSymbols().then(() => revealMaterialIcons());

    // DEMO MODE: no redirect if no token
    const token = localStorage.getItem('stitch_token');
    const role = localStorage.getItem('stitch_role');
    if (!token) {
        console.info('[Stitch] Demo mode active — no auth token found.');
        // In a real deployment, redirect to login:
        // window.location.href = '../auth_login_page/index.html';
    }

    // Theme
    applyTheme(localStorage.getItem('stitch_theme') || 'elite');
    hydrateMenuFromCache();

    // Sidebar nav buttons
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    document.querySelectorAll('.collapsed-nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Quick "Manual Order" header button
    document.getElementById('pos-quick-btn')?.addEventListener('click', () => switchTab('pos'));

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const current = localStorage.getItem('stitch_theme') || 'elite';
        const next = current === 'elite' ? 'blue' : current === 'blue' ? 'emerald' : 'elite';
        applyTheme(next);
    });

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        if (confirm('Sign out?')) {
            localStorage.removeItem('stitch_token');
            localStorage.removeItem('stitch_role');
            localStorage.removeItem('stitch_user');
            window.location.href = '../auth_login_page/index.html';
        }
    });

    // POS Search
    document.getElementById('pos-search')?.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        renderPOSMenu(menuItems.filter(i =>
            i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
        ));
    });

    // Discount Inputs
    const discountInput = document.getElementById('pos-discount-input');
    const discountType = document.getElementById('pos-discount-type');

    if (discountInput && discountType) {
        const applyDiscount = () => {
            globalDiscount.amount = parseFloat(discountInput.value) || 0;
            globalDiscount.type = discountType.value;
            updateTotals();
        };
        discountInput.addEventListener('input', applyDiscount);
        discountType.addEventListener('change', applyDiscount);
    }

    // POS Checkout
    document.getElementById('pos-checkout-btn')?.addEventListener('click', async () => {
        const btn = document.getElementById('pos-checkout-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Processing...';
        
        try {
            // Call the original checkoutPOS function and wait for it to complete
            await checkoutPOS();
        } finally {
            // Reset button state after checkout completes (success or failure)
            btn.disabled = false;
            btn.innerHTML = '<span class="material-symbols-outlined">receipt_long</span> Place Order';
        }
    });

    // --- QR CODE GENERATOR ---
    window.openQRModal = () => {
        document.getElementById('qr-table-input').value = '';
        document.getElementById('qr-result-area').classList.add('hidden');
        document.getElementById('qr-canvas-container').innerHTML = '';
        document.getElementById('qr-modal').classList.remove('hidden');
    };

    window.closeQRModal = () => document.getElementById('qr-modal').classList.add('hidden');

    let currentQRData = '';

    window.generateQR = () => {
        const tableId = document.getElementById('qr-table-input').value.trim() || 'Undefined';

        // Construct the demo URL representing the storefront link
        const url = new URL(window.location.href);
        const baseUrl = url.origin + url.pathname.replace('/stitch_caf_menu_table_12/merchant_dashboard/index.html', '/stitch_caf_menu_table_12');
        currentQRData = `${baseUrl}?table=${encodeURIComponent(tableId)}`;

        document.getElementById('qr-link-text').textContent = currentQRData;

        const container = document.getElementById('qr-canvas-container');
        container.innerHTML = ''; // Clear previous

        // Generate new QR using the included CDN library
        new QRCode(container, {
            text: currentQRData,
            width: 135, // Reduced by 25% from 180
            height: 135, // Reduced by 25% from 180
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        document.getElementById('qr-result-area').classList.remove('hidden');
    };

    window.printQRCode = () => {
        const tableId = document.getElementById('qr-table-input').value.trim() || 'Undefined';
        const qrImage = document.querySelector('#qr-canvas-container img')?.src || document.querySelector('#qr-canvas-container canvas')?.toDataURL();

        if (!qrImage) return alert('Please generate a QR code first.');

        const originalTitle = document.title;
        document.title = `Table_${tableId}_QR`;

        const printContent = `
            <div style="padding:40px; text-align:center; font-family:sans-serif; max-width:300px; margin:auto; border: 2px dashed #ccc; border-radius: 20px;">
                <h2 style="font-size:32px; font-weight:900; margin-bottom: 5px; text-transform:uppercase;">STITCH</h2>
                <p style="font-size:14px; color:#666; font-weight:bold; letter-spacing:2px; margin-bottom:20px; text-transform:uppercase;">Order Here</p>
                
                <img src="${qrImage}" style="width:200px; height:200px; margin:auto; display:block;" />
                
                <div style="margin-top:20px; padding-top:20px; border-top: 2px solid #eee;">
                    <p style="font-size:12px; color:#999; text-transform:uppercase; font-weight:bold; letter-spacing:1px; margin-bottom:5px;">Table</p>
                    <p style="font-size:48px; font-weight:900; margin:0; line-height:1;">${tableId}</p>
                </div>
            </div>
        `;

        const originalBody = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();

        document.body.innerHTML = originalBody;
        document.title = originalTitle;
        location.reload();
    };

    // Mobile Sidebar
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const collapsedRail = document.getElementById('collapsed-quick-rail');
    const sidebarStateKey = 'merchant_sidebar_expanded';
    const setDesktopSidebar = (expanded) => {
        if (!sidebar || !mainContent) return;
        if (expanded) {
            sidebar.classList.add('md:translate-x-0');
            sidebar.classList.remove('-translate-x-full');
            mainContent.classList.remove('md:ml-20');
            mainContent.classList.add('md:ml-72');
            collapsedRail?.classList.add('hidden');
        } else {
            sidebar.classList.remove('md:translate-x-0');
            sidebar.classList.add('-translate-x-full');
            mainContent.classList.remove('md:ml-72');
            mainContent.classList.add('md:ml-20');
            collapsedRail?.classList.remove('hidden');
        }
        localStorage.setItem(sidebarStateKey, expanded ? '1' : '0');
    };
    if (window.innerWidth >= 768) {
        const savedExpanded = localStorage.getItem(sidebarStateKey) !== '0';
        setDesktopSidebar(savedExpanded);
    } else {
        collapsedRail?.classList.add('hidden');
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            collapsedRail?.classList.add('hidden');
            mainContent?.classList.remove('md:ml-20');
            mainContent?.classList.add('md:ml-72');
            sidebar?.classList.add('md:translate-x-0');
            return;
        }
        const savedExpanded = localStorage.getItem(sidebarStateKey) !== '0';
        setDesktopSidebar(savedExpanded);
    });
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
        sidebar?.classList.remove('-translate-x-full');
    });
    document.getElementById('mobile-menu-close')?.addEventListener('click', () => {
        sidebar?.classList.add('-translate-x-full');
    });
    document.getElementById('sidebar-retract-trigger')?.addEventListener('click', () => {
        if (!sidebar) return;
        if (window.innerWidth >= 768) {
            const isExpanded = sidebar.classList.contains('md:translate-x-0');
            setDesktopSidebar(!isExpanded);
            return;
        }
        sidebar.classList.toggle('-translate-x-full');
    });
    document.getElementById('sidebar-expand-trigger')?.addEventListener('click', () => {
        if (window.innerWidth >= 768) {
            setDesktopSidebar(true);
            return;
        }
        sidebar?.classList.remove('-translate-x-full');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth < 768) document.getElementById('sidebar')?.classList.add('-translate-x-full');
        });
    });

    // Close POS modal on outside click
    window.onclick = (e) => {
        const addModal = document.getElementById('add-product-modal');
        const modModal = document.getElementById('pos-modifier-modal');
        if (addModal && e.target === addModal) hideAddProductModal();
        if (modModal && e.target === modModal) closeModifierModal();
    };

    // Load initial dashboard
    switchTab('dashboard');
    switchMenuSubTab('catalog'); // init menu manager subtab state
    Promise.allSettled([iconFontReadyPromise, ensureMenuData()])
        .then(() => {
            clearTimeout(hydrationTimeout);
            finishInitialHydration();
        });
});
