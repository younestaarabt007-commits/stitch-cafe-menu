const products = [
    { id: "bakery_1", name: "Signature Sourdough", description: "Naturally leavened for 24h", price: 8.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/toast.jpg", category: "sourdough" },
    { id: "bakery_2", name: "Butter Croissant", description: "Flaky layers, French butter", price: 3.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/07abeb0b37011bc4f4413062a5fc0045.jpg", category: "pastries" },
    { id: "bakery_3", name: "Pain au Chocolat", description: "Rich chocolate, buttery dough", price: 4.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/99e4f1c4df32d646f2dde6bf28cd9566.jpg", category: "pastries" },
    { id: "bakery_4", name: "Traditional Baguette", description: "Crispy crust, airy interior", price: 4.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/sweets/f3089aa69fae4df2b10dd5e82e5ef225.jpg", category: "sourdough" },
    { id: "bakery_5", name: "Artisan Rye Bread", description: "Dense and fiber-rich", price: 7.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/tea/7eb56d04c899ffd7a40ed6151c2713f0.jpg", category: "whole grain" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Navigate to customization page
function redirectToCustomization(productId) {
    window.location.href = '../petit pain bakery_customization_view/index.html';
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
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());
    list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full h-32 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" style="background-image:url('${product.image}')" data-name="${product.name}" data-price="${product.price}">
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
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-primary font-extrabold text-[15px]">$${product.price.toFixed(2)}</span>
                        <button class="w-[72px] h-[32px] rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
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

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-white', 'dark:bg-zinc-800', 'text-zinc-500', 'dark:text-white');
            });
            e.currentTarget.classList.remove('bg-white', 'dark:bg-zinc-800', 'text-zinc-500', 'dark:text-white');
            e.currentTarget.classList.add('active', 'bg-primary', 'text-white');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}
