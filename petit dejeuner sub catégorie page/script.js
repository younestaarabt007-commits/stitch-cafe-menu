const products = [
    {
        id: 1,
        name: "Petit Déjeuner Américain",
        description: "Eggs, pancakes and fresh sides",
        price: 7.5,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Américain.jpg",
        category: "classic"
    },
    {
        id: 2,
        name: "Petit Déjeuner Complet",
        description: "Balanced morning plate",
        price: 6.8,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Complet.jpg",
        category: "classic"
    },
    {
        id: 3,
        name: "Petit Déjeuner Maroccain",
        description: "Traditional Moroccan breakfast",
        price: 6.2,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Maroccain.jpg",
        category: "moroccan"
    },
    {
        id: 4,
        name: "Petit Déjeuner Royal",
        description: "Premium breakfast selection",
        price: 8.4,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Royal.jpg",
        category: "deluxe"
    },
    {
        id: 5,
        name: "Petit Déjeuner Turk",
        description: "Turkish style morning set",
        price: 6.9,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Turk.jpg",
        category: "traditional"
    }
];

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupEventListeners();
});

function renderProducts(filter = "all") {
    const list = document.getElementById("product-list");
    if (!list) return;

    const filteredProducts = filter === "all"
        ? products
        : products.filter((product) => product.category === filter);

    list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization(${product.id})" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
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
    `).join("");
}

function redirectToCustomization(productId) {
    const product = products.find((p) => String(p.id) === String(productId));
    if (!product) return;
    window.location.href = `../pure_noir_espresso_customization_view_1/index.html?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${product.price}`;
}

function addToCart(productId) {
    redirectToCustomization(productId);
}

function setupEventListeners() {
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "../swiggy-style_elite_main_menu_390x2500/index.html";
        });
    }

    const searchBtn = document.getElementById("search-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            alert("Search functionality would open here");
        });
    }

    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            document.querySelectorAll(".filter-btn").forEach((button) => button.classList.remove("active"));
            event.currentTarget.classList.add("active");
            currentFilter = event.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}
