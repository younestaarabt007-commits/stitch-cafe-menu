// Product Data
const products = [
    {
        "id": 1,
        "name": "Chocolate Babka",
        "description": "Rich dark chocolate ganache swirl.",
        "price": 12,
        "image": "../images/sub catégorie images/sweets/Chocolate Babka.jpg",
        "category": "patisserie"
    },
    {
        "id": 2,
        "name": "Waffels au Miels Crème",
        "description: "Hand-topped with flax & oats.",
        "price": 9,
        "image": "../images/sub catégorie images/sweets/Waffels au Miels Crème.jpg",
        "category": "sourdough"
    },
    {
        "id": 3,
        "name": "Salade Espagnol",
        "description": "Robust German-style dense rye.",
        "price": 10.5,
        "image": "../images/sub catégorie images/Brunch food/Salade Espagnol.jpg",
        "category": "sourdough"
    },
    {
        "id": 4,
        "name": "Herbed Focaccia",
        "description": "Rosemary, garlic & olive oil.",
        "price": 7.5,
        "image": "../images/sub catégorie images/Brunch food/Herbed Focaccia.jpg",
        "category": "viennoiserie"
    },
    {
        "id": 5,
        "name": "Sandwich Viand Hache",
        "description": "Ultra-soft, buttery morning loaf.",
        "price": 11.25,
        "image": "../images/sub catégorie images/Snack food/Sandwich Viand Hache.jpg",
        "category": "viennoiserie"
    },
    {
        "id": 6,
        "name": "Salade Cesar",
        "description": "Nutritious 100% whole grain.",
        "price": 8.75,
        "image": "../images/sub catégorie images/Brunch food/Salade Cesar.jpg",
        "category": "sourdough"
    },
    {
        "id": 7,
        "name": "Banana Split",
        "description": "Classic crust with an airy crumb.",
        "price": 4.5,
        "image": "../images/sub catégorie images/sweets/Banana Split.jpg",
        "category": "viennoiserie"
    },
    {
        "id": 8,
        "name": "Waffels au fruit",
        "description": "Sweet & tart artisan loaf.",
        "price": 9.5,
        "image": "../images/sub catégorie images/sweets/Waffels au fruit.jpg",
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
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1 flex flex-col">
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[84px] h-[36px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c] shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:shadow-lg" style="color: white !important;" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    redirectToCustomization(productId);
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => String(p.id) === String(productId));
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

    // Append price, name, and image to URL
    window.location.href = `${customizationUrl}?price=${product.price}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}`;
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
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full aspect-square rounded-xl bg-cover bg-center mb-3" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1 flex flex-col">
                <h4 class="font-semibold text-[16px] text-[#1a1c18] dark:text-white leading-tight mb-0.5">${product.name}</h4>
                <p class="text-[11px] opacity-60 line-clamp-1 mb-2">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-primary font-bold text-[15px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
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
