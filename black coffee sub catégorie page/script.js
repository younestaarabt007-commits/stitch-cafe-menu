// Product Data
const products = [
    {
        "id": 1,
        "name": "Velvet Flat White",
        "description": "Double Shot, Silky Microfoam",
        "price": 4.8,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg",
        "category": "milk"
    },
    {
        "id": 2,
        "name": "Kyoto Cold Brew",
        "description": "12-Hour Slow Drip Extraction",
        "price": 5.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/coffee-kyoto-cold-brew.jpg",
        "category": "black"
    },
    {
        "id": 3,
        "name": "Oat Milk Latte",
        "description": "Creamy, Nut-Free, Vegan",
        "price": 5.2,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/coffee-oat-milk-latte.jpg",
        "category": "milk"
    },
    {
        "id": 4,
        "name": "Single Origin Espresso",
        "description": "Intense Berry Notes",
        "price": 3.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg",
        "category": "black"
    },
    {
        "id": 5,
        "name": "Dark Mocha",
        "description": "70% Cacao, Double Espresso",
        "price": 6,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/coffee-dark-mocha.jpg",
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
        <div onclick="redirectToCustomization(${product.id})" class="flex items-center gap-3 p-3 bg-white rounded-[16px] border border-zinc-100 shadow-sm fade-in transition-transform active:scale-95 cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1">
                <h4 class="font-semibold text-[16px]">${product.name}</h4>
                <p class="text-[11px] text-zinc-500 mt-0.5">${product.description}</p>
                <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
            </div>
            <button onclick="event.stopPropagation(); addToCart(${product.id})" class="size-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 transition-transform active:scale-95">
                <span class="material-symbols-outlined text-[20px]">add</span>
            </button>
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
    if(btn) {
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
