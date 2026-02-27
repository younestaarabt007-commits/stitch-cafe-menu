// Product Data
const products = [
    {
        "id": 1,
        "name": "Velvet Flat White",
        "description": "Double Shot, Silky Microfoam",
        "price": 4.8,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/latté/Café Crème.jpg",
        "category": "milk"
    },
    {
        "id": 2,
        "name": "Kyoto Cold Brew",
        "description": "12-Hour Slow Drip Extraction",
        "price": 5.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/black coffee/black coffee.jpg",
        "category": "black"
    },
    {
        "id": 3,
        "name": "Oat Milk Latte",
        "description": "Creamy, Nut-Free, Vegan",
        "price": 5.2,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/latté/c98d046bf1085bc59f77893bf9779244.jpg",
        "category": "milk"
    },
    {
        "id": 4,
        "name": "Single Origin Espresso",
        "description": "Intense Berry Notes",
        "price": 3.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/black coffee/f7a30f37caad29c217c59d2804298a53.jpg",
        "category": "black"
    },
    {
        "id": 5,
        "name": "Dark Mocha",
        "description": "70% Cacao, Double Espresso",
        "price": 6,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/latté/f44e75c15bafa88216ef43d6600177e0.jpg",
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
        <div onclick="redirectToCustomization(${product.id})" class="flex flex-col bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full h-24 rounded-lg bg-cover bg-center mb-2" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1 flex flex-col">
                <h4 class="font-semibold text-sm text-[#1a1c18] dark:text-white leading-tight mb-1">${product.name}</h4>
                <p class="text-xs opacity-60 line-clamp-2 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-sm">$${product.price.toFixed(2)}</span>
                    <button class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="event.stopPropagation(); addToCart(${product.id})">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Navigate to customization page
function redirectToCustomization(productId) {
    // All black coffee items go to the espresso/black coffee customization view
    window.location.href = '../pure_noir_espresso_customization_view_1/index.html';
}

// Add to cart
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
            name: product.name,
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
