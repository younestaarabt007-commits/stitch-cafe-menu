// Product Data
const products = [
    {
        id: 1,
        name: "Nitro Cold Brew",
        description: "18-hour steep, nitrogen infused.",
        price: 6.50,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-kyoto-cold-brew.jpg",
        category: "cold",
        favorite: true
    },
    {
        id: 2,
        name: "Ceremonial Matcha",
        description: "Uji-sourced matcha with oat milk.",
        price: 7.25,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/smoothie-green-power.jpg",
        category: "seasonal"
    },
    {
        id: 3,
        name: "Ethiopian Yirgacheffe",
        description: "Floral notes with a citrus finish.",
        price: 5.00,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg",
        category: "dark",
        badge: "Light Roast"
    },
    {
        id: 4,
        name: "Dirty Masala Chai",
        description: "House-made spices, double shot.",
        price: 6.75,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-dark-mocha.jpg",
        category: "seasonal"
    },
    {
        id: 5,
        name: "Oat Milk Cortado",
        description: "Equal parts espresso & milk.",
        price: 4.50,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-oat-milk-latte.jpg",
        category: "dark"
    },
    {
        id: 6,
        name: "Lavender Honey",
        description: "Floral infusion with local honey.",
        price: 7.50,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/latte-classic.jpg",
        category: "seasonal"
    },
    {
        id: 7,
        name: "Golden Turmeric",
        description: "Spiced healing brew.",
        price: 6.25,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/latte-spanish.jpg",
        category: "seasonal"
    },
    {
        id: 8,
        name: "Caramel Macchiato",
        description: "Layered espresso & vanilla.",
        price: 6.50,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/latte-hazelnut.jpg",
        category: "dark"
    },
    {
        id: 9,
        name: "V60 Single Origin",
        description: "Hand poured perfection.",
        price: 8.00,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg",
        category: "dark"
    },
    {
        id: 10,
        name: "Blueberry Infusion",
        description: "Antioxidant rich blend.",
        price: 5.75,
        image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-berry-blast.jpg",
        category: "seasonal"
    }
];

// Cart State - Deprecated, handled by nav-bar.js
// let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization(${product.id})" class="flex flex-col group product-card w-full fade-in cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-sm mb-3 border border-stone-100 bg-white">
                <img alt="${product.name}" class="product-image w-full h-full object-cover transition-transform duration-700" src="${product.image}"/>
                ${product.badge ? `
                    <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <span class="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">${product.badge}</span>
                ` : ''}
                ${product.favorite ? `
                    <button class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 shadow-sm z-20">
                        <span class="material-symbols-outlined text-base">favorite</span>
                    </button>
                ` : ''}
            </div>
            <h3 class="font-display font-semibold text-stone-900 text-[16px] leading-tight mb-0.5">${product.name}</h3>
            <p class="text-[12px] text-stone-500 mb-2 leading-tight line-clamp-2">${product.description}</p>
            <div class="flex items-center justify-between mt-auto w-full">
                <span class="font-bold text-espresso tracking-tight text-sm">$${product.price.toFixed(2)}</span>
                <button onclick="event.stopPropagation(); redirectToCustomization(${product.id})" class="add-btn w-[84px] h-[36px] min-w-[84px] rounded-[12px] bg-white border border-orange-custom text-orange-custom text-xs font-bold shadow-sm active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center">
                    Add
                </button>
            </div>
        </div>
    `).join('');
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    let customizationUrl = '../pure_noir_espresso_customization_view_1/index.html'; // Default

    // Logic to determine customization page based on product or category
    if (product.name.toLowerCase().includes('matcha') || 
        product.name.toLowerCase().includes('chai') || 
        product.name.toLowerCase().includes('tea') ||
        product.name.toLowerCase().includes('lavender') ||
        product.name.toLowerCase().includes('turmeric') ||
        product.name.toLowerCase().includes('blueberry')) {
        customizationUrl = '../tea_customization_view/index.html';
    } else if (product.name.toLowerCase().includes('latte') || 
               product.name.toLowerCase().includes('macchiato') ||
               product.name.toLowerCase().includes('cortado')) {
        customizationUrl = '../latte_customization_view_2/index.html';
    } else if (product.name.toLowerCase().includes('espresso') || 
               product.name.toLowerCase().includes('brew') ||
               product.name.toLowerCase().includes('v60')) {
        customizationUrl = '../pure_noir_espresso_customization_view_1/index.html';
    }

    window.location.href = customizationUrl;
}

// Setup Event Listeners
function setupEventListeners() {
    // Back Button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log('Back button clicked');
            window.history.back();
        });
    }

    // Cart Button (Header) - Optional: Redirect to cart page or remove listener if button is removed
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = '../order_success_page/index.html';
        });
    }

    // Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Search:', searchTerm);
            // Implement search functionality here
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

    // Cart Button
    document.getElementById('cart-btn').addEventListener('click', () => {
        console.log('Cart:', cart);
        alert(`Cart has ${cart.length} items`);
    });

    // Checkout Button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        console.log('Checkout clicked');
        alert('Proceeding to checkout...');
    });

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            currentFilter = e.target.dataset.filter;
            renderProducts(currentFilter);
        });
    });

    // Search Input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const grid = document.getElementById('product-grid');

        if (query.length > 0) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );

            grid.innerHTML = filtered.map((product, index) => `
                <div class="flex flex-col group product-card w-full fade-in" style="animation-delay: ${index * 0.05}s">
                    <div class="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-sm mb-3 border border-stone-100 bg-white">
                        <img alt="${product.name}" class="product-image w-full h-full object-cover transition-transform duration-700" src="${product.image}"/>
                    </div>
                    <h3 class="font-display font-semibold text-stone-900 text-[16px] leading-tight mb-0.5">${product.name}</h3>
                    <p class="text-[12px] text-stone-500 mb-2 leading-tight line-clamp-2">${product.description}</p>
                    <div class="flex items-center justify-between mt-auto w-full">
                        <span class="font-bold text-espresso tracking-tight text-sm">$${product.price.toFixed(2)}</span>
                        <button onclick="addToCart(${product.id})" class="add-btn w-[84px] h-[36px] min-w-[84px] rounded-[12px] bg-white border border-orange-custom text-orange-custom text-xs font-bold shadow-sm active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center">
                            Add
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            renderProducts(currentFilter);
        }
    });

    // Filter Settings Button
    document.getElementById('filter-btn').addEventListener('click', () => {
        alert('Filter settings would open here');
    });
}
