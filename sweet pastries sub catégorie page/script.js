const products = [
    { id: "sweet_pastry_1", name: "Butter Croissant", description: "Flaky layers, French butter", price: 4.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/07abeb0b37011bc4f4413062a5fc0045.jpg", category: "croissant" },
    { id: "sweet_pastry_2", name: "Almond Croissant", description: "Frangipane, toasted almond", price: 5.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/819873298e099a845e042ded5a19ca95.jpg", category: "croissant" },
    { id: "sweet_pastry_3", name: "Chocolate Éclair", description: "Choux pastry, rich ganache", price: 4.75, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/99e4f1c4df32d646f2dde6bf28cd9566.jpg", category: "cake" },
    { id: "sweet_pastry_4", name: "Strawberry Tart", description: "Vanilla custard, fresh berries", price: 5.80, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/f3089aa69fae4df2b10dd5e82e5ef225.jpg", category: "tart" },
    { id: "sweet_pastry_5", name: "Lemon Meringue Tart", description: "Zesty curd, torched meringue", price: 5.90, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/db03e53c057449564a8c3f285d4ae705.jpg", category: "tart" },
    { id: "sweet_pastry_6", name: "Velvet Cake Slice", description: "Moist crumb, vanilla frosting", price: 4.95, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/dc7635bbd750c761b95949cdaaf3037d.jpg", category: "cake" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateGlobalCartCount();
});

// Navigate to customization page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const name = product.name;
    const price = product.price;
    const url = `../sweet_pastries_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
    window.location.href = url;
}

// Global Add to Cart
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
        btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 1000);
    }
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full h-32 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" style="background-image:url('${product.image}')" data-name="${product.name}" data-price="${product.price}">
                    <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="flex-1 flex flex-col">
                    <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${product.name}</h4>
                    <p class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">${product.description}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-primary font-bold text-[14px]">$${product.price.toFixed(2)}</span>
                        <button class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                    </div>
                </div>
            </div>
        `).join('');
}

function setupEventListeners() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        });
    }

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', () => alert('Search coming soon'));

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}
