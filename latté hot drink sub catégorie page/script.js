const products = [
    { id: "latte_1", name: "Café au lait avec la Creme", description: "Double shot, steamed milk", price: 4.80, image: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", category: "classic" },
    { id: "latte_2", name: "latte-oat", description: "Creamy & Sustainable", price: 6.50, image: "../assets/latte-oat.jpg", category: "plant-based" },
    { id: "latte_3", name: "latte-vanilla-bean", description: "House vanilla bean syrup", price: 5.75, image: "../assets/latte-vanilla-bean.jpg", category: "flavored" },
    { id: "latte_4", name: "Café au lait avec la Creme", description: "Buttery caramel drizzle", price: 6.25, image: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", category: "flavored" },
    { id: "latte_5", name: "latte-spanish", description: "Condensed milk & espresso", price: 5.50, image: "../assets/latte-spanish.jpg", category: "classic" },
    { id: "latte_6", name: "latte-rose-water", description: "Delicate floral infusion", price: 6.00, image: "../assets/latte-rose-water.jpg", category: "flavored" },
    { id: "latte_7", name: "latte-iced-matcha", description: "Ceremonial grade green tea", price: 6.25, image: "../assets/latte-iced-matcha.jpg", category: "iced" },
    { id: "latte_8", name: "latte-hazelnut", description: "Rich nutty profile", price: 5.75, image: "../assets/latte-hazelnut.jpg", category: "flavored" },
    { id: "latte_10", name: "Café au Lait Artisanal", description: "House vanilla syrup", price: 5.10, image: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", category: "classic" },
    { id: "latte_11", name: "Café Crème", description: "Double shot over chilled milk", price: 5.50, image: "../images/sub catégorie images/latté/Café Crème.jpg", category: "classic" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    // Update cart count on load
    if (window.updateGlobalCartCount) {
        window.updateGlobalCartCount();
    }
});

// Navigate to customization page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    // Redirect to the review page which acts as customization for now, or the specific customization page if it exists
    // Using smothie customisation review as a fallback or template if specific latte customization isn't ready
    // But based on folder structure, maybe 'latté hot drink sub catégorie page' IS the list, and we need a detail page.
    // The previous code pointed to '../latte_customization_view_2/index.html'
    window.location.href = `../latte_customization_view_2/index.html?price=${product.price}&id=${product.id}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}`;
}

function addToCart(productId) {
    redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return; // Guard clause in case element doesn't exist

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

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            // Implement search if needed, or just filter
            // renderProducts(currentFilter);
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the closest parent that contains all filter buttons if they are in different containers
            // or just document.querySelectorAll again
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-card-tan', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white')); // Reset to default style

            // Set active style
            e.currentTarget.classList.remove('bg-card-tan', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
            e.currentTarget.classList.add('active', 'bg-primary', 'text-white');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}
