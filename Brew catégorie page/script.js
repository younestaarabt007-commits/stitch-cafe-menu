// Product Data
const products = [
    {
        id: 1,
        name: "Matcha Latte",
        description: "Uji-sourced matcha with oat milk.",
        price: 7.25,
        image: "../images/sub catégorie images/latté/Matcha Latte.jpg",
        category: "seasonal"
    },
    {
        id: 2,
        name: "Ethiopian Yirgacheffe",
        description: "Floral notes with a citrus finish.",
        price: 5.00,
        image: "../images/sub kategori images/latté/Ethiopian Yirgacheffe.jpg",
        category: "coffee"
    },
    {
        id: 3,
        name: "Café Royal",
        description: "House-made spices, double shot.",
        price: 6.75,
        image: "../images/sub catégorie images/black coffee/Café Royal.jpg",
        category: "coffee"
    },
    {
        id: 4,
        name: "Café au Lait Artisanal",
        description: "Equal parts espresso & milk.",
        price: 4.50,
        image: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg",
        category: "coffee"
    },
    {
        id: 5,
        name: "lavender Tea",
        description: "Floral infusion with local honey.",
        price: 7.50,
        image: "../images/sub catégorie images/tea/lavender Tea.jpg",
        category: "tea"
    },
    {
        id: 6,
        name: "Golden Turmeric",
        description: "Spiced healing brew.",
        price: 6.25,
        image: "../images/sub catégorie images/smoothie/Golden Turmeric.jpg",
        category: "tea"
    },
    {
        id: 7,
        name: "Café au lait avec la Creme",
        description: "Layered espresso & vanilla.",
        price: 6.50,
        image: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg",
        category: "coffee"
    },
    {
        id: 8,
        name: "Tea Nordique",
        description: "Tart hibiscus with summer berries.",
        price: 5.25,
        image: "../images/sub catégorie images/tea/Tea Nordique.jpg",
        category: "tea"
    },
    {
        id: 9,
        name: "The de Hibiscus",
        description: "Fruity, floral, chilled.",
        price: 6.50,
        image: "../images/sub catégorie images/tea/The de Hibiscus.jpg",
        category: "tea"
    },
    {
        id: 10,
        name: "The Marocain a la Menthe",
        description: "Cooling green tea.",
        price: 4.50,
        image: "../images/sub catégorie images/tea/The Marocain a la Menthe.jpg",
        category: "tea"
    },
    {
        id: 11,
        name: "Tea Citron Délise",
        description: "Zesty, soothing infusion.",
        price: 5.50,
        image: "../images/sub catégorie images/tea/Tea Citron Délise.jpg",
        category: "tea"
    },
    {
        id: 12,
        name: "Floral Tea",
        description: "Black tea, milk, caramel.",
        price: 7.00,
        image: "../images/sub catégorie images/tea/Floral Tea.jpg",
        category: "tea"
    },
];
    {
        id: 3,
        name: "Ethiopian Yirgacheffe",
        description: "Floral notes with a citrus finish.",
        price: 5.00,
        image: "../images/sub catégorie images/latté/Ethiopian Yirgacheffe.jpg",
        category: "dark",
        badge: "Light Roast"
    },
    {
        id: 4,
        name: "Café Royal",
        description: "House-made spices, double shot.",
        price: 6.75,
        image: "../images/sub catégorie images/black coffee/Café Royal.jpg",
        category: "seasonal"
    },
    {
        id: 5,
        name: "Café au Lait Artisanal",
        description: "Equal parts espresso & milk.",
        price: 4.50,
        image: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg",
        category: "dark"
    },
    {
        id: 6,
        name: "lavender Tea",
        description: "Floral infusion with local honey.",
        price: 7.50,
        image: "../images/sub catégorie images/tea/lavender Tea.jpg",
        category: "seasonal"
    },
    {
        id: 7,
        name: "Golden Turmeric",
        description: "Spiced healing brew.",
        price: 6.25,
        image: "../images/sub catégorie images/smoothie/Golden Turmeric.jpg",
        category: "seasonal"
    },
    {
        id: 8,
        name: "Café au lait avec la Creme",
        description: "Layered espresso & vanilla.",
        price: 6.50,
        image: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg",
        category: "dark"
    },
    {
        id: 9,
        name: "Café Léger",
        description: "Hand poured perfection.",
        price: 8.00,
        image: "../images/sub catégorie images/black coffee/Café Léger .jpg",
        category: "dark"
    },
    {
        id: 10,
        name: "Blueberry Infusion",
        description: "Antioxidant rich blend.",
        price: 5.75,
        image: "../images/sub catégorie images/Jus/Blueberry Infusion.jpg",
        category: "seasonal",
        isHot: false
    },
    {
        id: 11,
        name: "Chocolat Fondu",
        description: "Double espresso over vanilla gelato.",
        price: 7.00,
        image: "../images/sub catégorie images/sweets/Chocolat Fondu.jpg",
        category: "dark",
        badge: "Chef's Choice"
    },
    {
        id: 12,
        name: "Café Américain",
        description: "Creamy oat milk with Madagascar vanilla.",
        price: 6.75,
        image: "../images/sub catégorie images/black coffee/Café Américain.jpg",
        category: "cold",
        isHot: false
    },
    {
        id: 13,
        name: "Café Noire Expresso",
        description: "Finely ground, cardamom infused.",
        price: 5.50,
        image: "../images/sub catégorie images/black coffee/Café Noire Expresso.jpg",
        category: "dark"
    },
    {
        id: 14,
        name: "Tea Nordique",
        description: "Tart hibiscus with summer berries.",
        price: 5.25,
        image: "../images/sub catégorie images/tea/Tea Nordique.jpg",
        category: "cold",
        isHot: false
    },
    {
        id: 15,
        name: "The de Hibiscus",
        description: "Autumn spice, real pumpkin purée.",
        price: 7.25,
        image: "../images/sub catégorie images/tea/The de Hibiscus.jpg",
        category: "seasonal",
        badge: "Seasonal"
    },
    {
        id: 16,
        name: "The Marocain a la Menthe",
        description: "Sweet condensed milk & bold espresso.",
        price: 6.25,
        image: "../images/sub catégorie images/tea/The Marocain a la Menthe.jpg",
        category: "dark"
    },
    {
        id: 17,
        name: "Tea Citron Délise",
        description: "Coffee meeting refreshing citrus.",
        price: 5.95,
        image: "../images/sub catégorie images/tea/Tea Citron Délise.jpg",
        category: "cold",
        isHot: false
    },
    {
        id: 18,
        name: "Floral Tea",
        description: "Bergamot notes with frothed milk.",
        price: 6.50,
        image: "../images/sub catégorie images/tea/Floral Tea.jpg",
        category: "seasonal"
    },
    {
        id: 19,
        name: "Café normal",
        description: "Pure, concentrated energy.",
        price: 3.50,
        image: "../images/sub catégorie images/black coffee/Café normal  .jpg",
        category: "dark",
        favorite: true
    },
    {
        id: 20,
        name: "Café au Lait Artisanal",
        description: "Tropical twist on classic cold brew.",
        price: 6.95,
        image: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg",
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
