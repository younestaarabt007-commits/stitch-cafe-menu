// Product Data
const products = [
    {
        "id": 1,
        "name": "French Toast",
        "description": "Flaky layers, French butter",
        "price": 4.50,
        "image": "../images/sub catégorie images/sweets/French Toast.jpg",
        "category": "pastry"
    },
    {
        "id": 2,
        "name": "Mille Feuilles",
        "description": "Frangipane, toasted almond",
        "price": 5.25,
        "image": "../images/sub catégorie images/sweets/Mille Feuilles.jpg",
        "category": "pastry"
    },
    {
        "id": 3,
        "name": "Teramisu au Chocolat",
        "description": "Choux pastry, rich ganache",
        "price": 4.75,
        "image": "../images/sub catégorie images/sweets/Teramisu au Chocolat.jpg",
        "category": "cake"
    },
    {
        "id": 4,
        "name": "Waffels au fruit",
        "description": "Vanilla custard, fresh berries",
        "price": 5.80,
        "image": "../images/sub catégorie images/sweets/Waffels au fruit.jpg",
        "category": "waffle"
    },
    {
        "id": 5,
        "name": "Chees Cake au Citron",
        "description": "Zesty curd, torched meringue",
        "price": 5.90,
        "image": "../images/sub catégorie images/sweets/Chees Cake au Citron.jpg",
        "category": "cake"
    },
    {
        "id": 6,
        "name": "Dark an White Chocolat Cake ",
        "description": "Moist crumb, vanilla frosting",
        "price": 4.95,
        "image": "../images/sub catégorie images/sweets/Dark an White Chocolat Cake .jpg",
        "category": "cake"
    },
    {
        "id": 7,
        "name": "Cheese Cake Oreo",
        "description": "Creamy cheesecake with Oreo crust",
        "price": 5.90,
        "image": "../images/sub catégorie images/sweets/Cheese Cake Oreo.jpg",
        "category": "cake"
    },
    {
        "id": 8,
        "name": "Cheese Cake au Caramel",
        "description": "Smooth caramel cheesecake",
        "price": 5.90,
        "image": "../images/sub catégorie images/sweets/Cheese Cake au Caramel.jpg",
        "category": "cake"
    },
    {
        "id": 9,
        "name": "Crème Caramel",
        "description": "Silky baked custard with caramel",
        "price": 4.20,
        "image": "../images/sub catégorie images/sweets/Crème Caramel.jpg",
        "category": "dessert"
    },
    {
        "id": 10,
        "name": "Banana Split",
        "description": "Banana, ice cream, chocolate",
        "price": 5.50,
        "image": "../images/sub catégorie images/sweets/Banana Split.jpg",
        "category": "dessert"
    },
    {
        "id": 11,
        "name": "Waffels au Miels Crème",
        "description": "Honey and cream waffle",
        "price": 5.60,
        "image": "../images/sub catégorie images/sweets/Waffels au Miels Crème.jpg",
        "category": "waffle"
    },
    {
        "id": 12,
        "name": "Chocolat Fondu",
        "description": "70% Cacao, Double Espresso",
        "price": 6.00,
        "image": "../images/sub catégorie images/sweets/Chocolat Fondu.jpg",
        "category": "dessert"
    },
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
