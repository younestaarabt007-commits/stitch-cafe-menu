// Product Data
const products = [
    {
        id: 1,
        name: "coffee-nitro",
        description: "18-hour steep, nitrogen infused.",
        price: 6.50,
        image: "../assets/coffee-nitro.jpg",
        category: "cold",
        favorite: true,
        isHot: false
    },
    {
        id: 2,
        name: "tea-matcha",
        description: "Uji-sourced matcha with oat milk.",
        price: 7.25,
        image: "../assets/tea-matcha.jpg",
        category: "seasonal"
    },
    {
        id: 3,
        name: "coffee-single-origin-espresso",
        description: "Floral notes with a citrus finish.",
        price: 5.00,
        image: "../assets/coffee-single-origin-espresso.jpg",
        category: "dark",
        badge: "Light Roast"
    },
    {
        id: 4,
        name: "tea-masala-chai",
        description: "House-made spices, double shot.",
        price: 6.75,
        image: "../assets/tea-masala-chai.jpg",
        category: "seasonal"
    },
    {
        id: 5,
        name: "coffee-oat-milk-latte",
        description: "Equal parts espresso & milk.",
        price: 4.50,
        image: "../assets/coffee-oat-milk-latte.jpg",
        category: "dark"
    },
    {
        id: 6,
        name: "tea-lavender-earl",
        description: "Floral infusion with local honey.",
        price: 7.50,
        image: "../assets/tea-lavender-earl.jpg",
        category: "seasonal"
    },
    {
        id: 7,
        name: "tea-ginger-lemon",
        description: "Spiced healing brew.",
        price: 6.25,
        image: "../assets/tea-ginger-lemon.jpg",
        category: "seasonal"
    },
    {
        id: 8,
        name: "latte-caramel-macchiato",
        description: "Layered espresso & vanilla.",
        price: 6.50,
        image: "../assets/latte-caramel-macchiato.jpg",
        category: "dark"
    },
    {
        id: 9,
        name: "coffee-v60",
        description: "Hand poured perfection.",
        price: 8.00,
        image: "../assets/coffee-v60.jpg",
        category: "dark"
    },
    {
        id: 10,
        name: "juice-berry-blast",
        description: "Antioxidant rich blend.",
        price: 5.75,
        image: "../assets/juice-berry-blast.jpg",
        category: "seasonal",
        isHot: false
    },
    {
        id: 11,
        name: "coffee-dark-mocha",
        description: "Double espresso over vanilla gelato.",
        price: 7.00,
        image: "../assets/coffee-dark-mocha.jpg",
        category: "dark",
        badge: "Chef's Choice"
    },
    {
        id: 12,
        name: "latte-vanilla-bean",
        description: "Creamy oat milk with Madagascar vanilla.",
        price: 6.75,
        image: "../assets/latte-vanilla-bean.jpg",
        category: "cold",
        isHot: false
    },
    {
        id: 13,
        name: "coffee-single-origin-espresso",
        description: "Finely ground, cardamom infused.",
        price: 5.50,
        image: "../assets/coffee-single-origin-espresso.jpg",
        category: "dark"
    },
    {
        id: 14,
        name: "juice-berry-blast",
        description: "Tart hibiscus with summer berries.",
        price: 5.25,
        image: "../assets/juice-berry-blast.jpg",
        category: "cold",
        isHot: false
    },
    {
        id: 15,
        name: "photo-1542691457-cbe4df041eb2?q=80&w=400&auto=format&fit=crop",
        description: "Autumn spice, real pumpkin purée.",
        price: 7.25,
        image: "https://images.unsplash.com/photo-1542691457-cbe4df041eb2?q=80&w=400&auto=format&fit=crop",
        category: "seasonal",
        badge: "Seasonal"
    },
    {
        id: 16,
        name: "photo-1570968915860-54d5c301fa9f?q=80&w=400&auto=format&fit=crop",
        description: "Sweet condensed milk & bold espresso.",
        price: 6.25,
        image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&auto=format&fit=crop",
        category: "dark"
    },
    {
        id: 17,
        name: "photo-1517701550927-30cf4ba1dba5?q=80&w=300&auto=format&fit=crop",
        description: "Coffee meeting refreshing citrus.",
        price: 5.95,
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=300&auto=format&fit=crop",
        category: "cold",
        isHot: false
    },
    {
        id: 18,
        name: "photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop",
        description: "Bergamot notes with frothed milk.",
        price: 6.50,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop",
        category: "seasonal"
    },
    {
        id: 19,
        name: "photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop",
        description: "Pure, concentrated energy.",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop",
        category: "dark",
        favorite: true
    },
    {
        id: 20,
        name: "photo-1544145945-f904253d0c71?q=80&w=400&auto=format&fit=crop",
        description: "Tropical twist on classic cold brew.",
        price: 6.95,
        image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?q=80&w=400&auto=format&fit=crop",
        category: "cold",
        isHot: false
    }
];

let currentFilter = 'all';

for (const product of products) {
    if (typeof product.image === 'string' && product.image.startsWith('/assets/')) {
        product.image = '..' + product.image;
    }
    if (typeof product.image === 'string' && product.image.includes('images.unsplash.com')) {
        if (product.category === 'cold') {
            product.image = "../images/sub catégorie images/Jus/Cuba Mokhito.avif";
        } else if (product.category === 'seasonal') {
            product.image = "../images/sub catégorie images/tea/Tea Nordique.jpg";
        } else {
            product.image = "../images/sub catégorie images/black coffee/Café Noir Italien.jpg";
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all', query = '') {
    const grid = document.getElementById('product-grid');
    let filteredProducts = filter === 'all'
        ? products.filter(p => p.isHot !== false)
        : products.filter(p => p.isHot !== false && p.category === filter);

    if (query) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    grid.innerHTML = filteredProducts.map((product, index) => `
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

function addToCart(productId) {
    redirectToCustomization(productId);
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    let customizationUrl = '../pure_noir_espresso_customization_view_1/index.html'; // Default

    if (product) {
        const name = product.name.toLowerCase();
        if (name.includes('matcha') || name.includes('chai') || name.includes('tea') || name.includes('lavender') || name.includes('turmeric') || name.includes('blueberry') || name.includes('hibiscus') || name.includes('infusion')) {
            customizationUrl = '../tea_customization_view/index.html';
        } else if (name.includes('latte') || name.includes('macchiato') || name.includes('cortado') || name.includes('caffè')) {
            customizationUrl = '../latte_customization_view_2/index.html';
        } else if (name.includes('espresso') || name.includes('brew') || name.includes('v60')) {
            customizationUrl = '../pure_noir_espresso_customization_view_1/index.html';
        }
        let imgPath = product.image;
        if (imgPath && !imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = '/' + imgPath;
        }
        window.location.href = `${customizationUrl}?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(imgPath)}&price=${product.price}`;
    } else {
        window.location.href = customizationUrl;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Back Button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Cart Button
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
            const query = e.target.value.toLowerCase();
            renderProducts(currentFilter, query);
        });
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentFilter = e.currentTarget.dataset.filter;
            const query = document.getElementById('search-input')?.value.toLowerCase() || '';
            renderProducts(currentFilter, query);
        });
    });

    // Filter Settings Button
    const filterSettingsBtn = document.getElementById('filter-btn');
    if (filterSettingsBtn) {
        filterSettingsBtn.addEventListener('click', () => {
            alert('Filter settings would open here');
        });
    }
}
