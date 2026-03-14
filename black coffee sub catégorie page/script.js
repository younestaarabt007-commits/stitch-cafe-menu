// Product Data
const products = [
    {
        "id": 1,
        "name": "Velvet Flat White",
        "description": "Double Shot, Silky Microfoam",
        "price": 4.8,
        "image": "/assets/latté/Café Crème.jpg",
        "category": "milk"
    },
    {
        "id": 2,
        "name": "Kyoto Cold Brew",
        "description": "12-Hour Slow Drip Extraction",
        "price": 5.5,
        "image": "/assets/black coffee/black coffee.jpg",
        "category": "black"
    },
    {
        "id": 3,
        "name": "Oat Milk Latte",
        "description": "Creamy, Nut-Free, Vegan",
        "price": 5.2,
        "image": "/assets/latté/c98d046bf1085bc59f77893bf9779244.jpg",
        "category": "milk"
    },
    {
        "id": 4,
        "name": "Single Origin Espresso",
        "description": "Intense Berry Notes",
        "price": 3.5,
        "image": "/assets/black coffee/f7a30f37caad29c217c59d2804298a53.jpg",
        "category": "black"
    },
    {
        "id": 5,
        "name": "Dark Mocha",
        "description": "70% Cacao, Double Espresso",
        "price": 6,
        "image": "/assets/latté/f44e75c15bafa88216ef43d6600177e0.jpg",
        "category": "milk"
    }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization(${product.id})" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full h-32 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');">
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="flex-1 flex flex-col px-1">
                <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${product.name}</h4>
                <div class="flex items-center gap-1.5 mb-2">
                    <div class="flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-[#FFC107] text-[12px]">star</span>
                        <span class="text-[10px] font-bold text-green-700 dark:text-green-300">4.8</span>
                    </div>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500">(2.3k+)</span>
                </div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">${product.description}</p>
                <div class="flex items-center justify-between gap-2 mt-auto">
                    <span class="text-primary font-extrabold text-[14px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[64px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Navigate to customization page
function redirectToCustomization(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;
    window.location.href = `../pure_noir_espresso_customization_view_1/index.html?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${product.price}`;
}

// Add to cart
function addToCart(productId) {
    redirectToCustomization(productId);
}

// Setup Event Listeners
function setupEventListeners() {
    // Back Button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        });
    }

    // Search Button
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            console.log('Search clicked');
            alert('Search functionality would open here');
        });
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}
