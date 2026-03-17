const products = [
    { id: "tea_1", name: "Matcha Latte", description: "Stone-ground, umami-rich", price: 12.00, image: "../images/sub catégorie images/latté/Matcha Latte.jpg", category: "matcha" },
    { id: "tea_2", name: "Tea Citron Délise", description: "Spiced, creamy, warming", price: 5.50, image: "../images/sub catégorie images/tea/Tea Citron Délise.jpg", category: "herbal" },
    { id: "tea_3", name: "Tea Nordique", description: "Zesty, soothing infusion", price: 4.75, image: "../images/sub catégorie images/tea/Tea Nordique.jpg", category: "herbal" },
    { id: "tea_4", name: "The Marocain a la Menthe", description: "Cooling green tea", price: 4.50, image: "../images/sub catégorie images/tea/The Marocain a la Menthe.jpg", category: "herbal" },
    { id: "tea_5", name: "Floral Tea", description: "Black tea, milk, caramel", price: 7.00, image: "../images/sub catégorie images/tea/Floral Tea.jpg", category: "iced" },
    { id: "tea_6", name: "The de Hibiscus", description: "Fruity, floral, chilled", price: 6.50, image: "../images/sub catégorie images/tea/The de Hibiscus.jpg", category: "iced" },
    { id: "tea_7", name: "Luxury Late Night Tea", description: "Classic bergamot twist", price: 5.25, image: "../images/sub catégorie images/tea/Luxury Late Night Tea.jpg", category: "herbal" }
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
    const image = product.image;
    const url = `../tea_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}

// Global Add to Cart
function addToCart(productId) {
    redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
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
