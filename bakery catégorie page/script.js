// Product Data
const products = [
    {
        "id": 1,
        "name": "Chocolate Babka",
        "description": "Rich dark chocolate ganache swirl.",
        "price": 12,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-chocolate-babka.jpg",
        "category": "patisserie"
    },
    {
        "id": 2,
        "name": "Seeded Multigrain",
        "description": "Hand-topped with flax & oats.",
        "price": 9,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-seeded-multigrain.jpg",
        "category": "sourdough"
    },
    {
        "id": 3,
        "name": "Dark Rye Loaf",
        "description": "Robust German-style dense rye.",
        "price": 10.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-dark-rye-loaf.jpg",
        "category": "sourdough"
    },
    {
        "id": 4,
        "name": "Herbed Focaccia",
        "description": "Rosemary, garlic & olive oil.",
        "price": 7.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-herbed-focaccia.jpg",
        "category": "viennoiserie"
    },
    {
        "id": 5,
        "name": "Honey Brioche",
        "description": "Ultra-soft, buttery morning loaf.",
        "price": 11.25,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-honey-brioche.jpg",
        "category": "viennoiserie"
    },
    {
        "id": 6,
        "name": "Stoneground Wheat",
        "description": "Nutritious 100% whole grain.",
        "price": 8.75,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-stoneground-wheat.jpg",
        "category": "sourdough"
    },
    {
        "id": 7,
        "name": "Parisian Baguette",
        "description": "Classic crust with an airy crumb.",
        "price": 4.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-parisian-baguette.jpg",
        "category": "viennoiserie"
    },
    {
        "id": 8,
        "name": "Cranberry Walnut",
        "description": "Sweet & tart artisan loaf.",
        "price": 9.5,
        "image": "../swiggy-style_elite_main_menu_390x2500/assets/bakery-cranberry-walnut.jpg",
        "category": "sourdough"
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
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col group fade-in cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm mb-3 bg-white">
                <img alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${product.image}"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm z-10">
                    <span class="material-symbols-outlined text-[16px] text-stone-400">favorite</span>
                </div>
                <div class="absolute bottom-3 left-3 bg-[#F3E5D8] px-2 py-1 rounded-md shadow-sm border border-[#E6D0BC]">
                    <span class="text-[10px] font-bold text-[#5D4037] font-display">$${product.price.toFixed(2)}</span>
                </div>
            </div>
            <h3 class="font-display font-bold text-product text-stone-900 leading-tight">${product.name}</h3>
            <p class="text-[11px] text-stone-500 mb-3 line-clamp-1">${product.description}</p>
            <button class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="event.stopPropagation(); addToCart('${product.id}')" class="w-full h-[36px] bg-white border border-caramel/30 text-caramel rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-caramel hover:text-white transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95">
                Add <span class="material-symbols-outlined text-[14px]">add</span>
            </button>
        </div>
    `).join('');
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

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let customizationUrl = '../petit pain bakery_customization_view/index.html'; // Default

    // Logic to determine customization page based on product or category
    if (product.category === 'viennoiserie' || 
        product.category === 'patisserie' || 
        product.name.toLowerCase().includes('brioche') ||
        product.name.toLowerCase().includes('baguette') ||
        product.name.toLowerCase().includes('croissant') ||
        product.name.toLowerCase().includes('cake')) {
        customizationUrl = '../sweet_pastries_customization_view/index.html';
    } else {
        customizationUrl = '../petit pain bakery_customization_view/index.html';
    }

    // Append price to URL
    window.location.href = `${customizationUrl}?price=${product.price}`;
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

    // Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.description.toLowerCase().includes(searchTerm)
            );
            
            const grid = document.getElementById('product-grid');
            if (grid) {
                 grid.innerHTML = filtered.map((product, index) => `
                    <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col group fade-in cursor-pointer" style="animation-delay: ${index * 0.05}s">
                        <div class="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm mb-3 bg-white">
                            <img alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${product.image}"/>
                            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm z-10">
                                <span class="material-symbols-outlined text-[16px] text-stone-400">favorite</span>
                            </div>
                            <div class="absolute bottom-3 left-3 bg-[#F3E5D8] px-2 py-1 rounded-md shadow-sm border border-[#E6D0BC]">
                                <span class="text-[10px] font-bold text-[#5D4037] font-display">$${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <h3 class="font-display font-bold text-product text-stone-900 leading-tight">${product.name}</h3>
                        <p class="text-[11px] text-stone-500 mb-3 line-clamp-1">${product.description}</p>
                        <button onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                    </div>
                `).join('');
            }
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
