const products = [
    { id: "latte_1", name: "Classic Latte", description: "Double shot, steamed milk", price: 4.80, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/Café Crème.jpg", category: "classic" },
    { id: "latte_2", name: "Signature Oat Latte", description: "Creamy & Sustainable", price: 6.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/c98d046bf1085bc59f77893bf9779244.jpg", category: "plant-based" },
    { id: "latte_3", name: "Vanilla Bean", description: "House vanilla bean syrup", price: 5.75, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/413ec74a68481ef01743fe316c867c48.jpg", category: "flavored" },
    { id: "latte_4", name: "Caramel Macchiato", description: "Buttery caramel drizzle", price: 6.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/c3458b0388f7f10df2f6949c1e7e73d2.jpg", category: "flavored" },
    { id: "latte_5", name: "Spanish Latte", description: "Condensed milk & espresso", price: 5.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/Café Crème.jpg", category: "classic" },
    { id: "latte_6", name: "Rose Water Latte", description: "Delicate floral infusion", price: 6.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/f44e75c15bafa88216ef43d6600177e0.jpg", category: "flavored" },
    { id: "latte_7", name: "Iced Matcha Latte", description: "Ceremonial grade green tea", price: 6.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea/8de4ad2c0c676dc76030cf5c8c8fad50.jpg", category: "iced" },
    { id: "latte_8", name: "Hazelnut Latte", description: "Rich nutty profile", price: 5.75, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/c3458b0388f7f10df2f6949c1e7e73d2.jpg", category: "flavored" },
    { id: "latte_9", name: "Pumpkin Spice Latte", description: "Seasonal spices & puree", price: 5.40, image: "../swiggy-style_elite_main_menu_390x2500/assets/latté/f44e75c15bafa88216ef43d6600177e0.jpg", category: "seasonal" }
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
    window.location.href = `../latte_customization_view_2/index.html?price=${product.price}&id=${product.id}&name=${encodeURIComponent(product.name)}`;
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
    if (btn) {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-xs">check</span>';
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 1000);
    }
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
                    <span class="text-primary font-extrabold text-[14px]">$${product.price.toFixed(2)}</span>
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
