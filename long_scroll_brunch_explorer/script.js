// === BRUNCH EXPLORER — COMBINED PRODUCTS ===
// Sources: Breakfast (Petit Déjeuner) + Fast Food + Healthy Food (Toast Brunch) subcategories

const products = [
    // ---- BREAKFAST (from petit dejeuner sub category) ----
    {
        id: "bk_1",
        name: "Petit Déjeuner Américain",
        description: "Eggs, pancakes and fresh sides",
        price: 7.50,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Américain.jpg",
        category: "breakfast",
        badge: "Morning",
        customizationUrl: "../pure_noir_espresso_customization_view_1/index.html"
    },
    {
        id: "bk_2",
        name: "Petit Déjeuner Complet",
        description: "Balanced morning plate",
        price: 6.80,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Complet.jpg",
        category: "breakfast",
        badge: null,
        customizationUrl: "../pure_noir_espresso_customization_view_1/index.html"
    },
    {
        id: "bk_3",
        name: "Petit Déjeuner Maroccain",
        description: "Traditional Moroccan breakfast",
        price: 6.20,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Maroccain.jpg",
        category: "breakfast",
        badge: "Local",
        customizationUrl: "../pure_noir_espresso_customization_view_1/index.html"
    },
    {
        id: "bk_4",
        name: "Petit Déjeuner Royal",
        description: "Premium breakfast selection",
        price: 8.40,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Royal.jpg",
        category: "breakfast",
        badge: "Prem",
        customizationUrl: "../pure_noir_espresso_customization_view_1/index.html"
    },
    {
        id: "bk_5",
        name: "Petit Déjeuner Turk",
        description: "Turkish style morning set",
        price: 6.90,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Turk.jpg",
        category: "breakfast",
        badge: null,
        customizationUrl: "../pure_noir_espresso_customization_view_1/index.html"
    },

    // ---- FAST FOOD (from fast food sub category) ----
    {
        id: "ff_1",
        name: "Tacos Mixte",
        description: "Mixed tacos with meat and fries",
        price: 18.00,
        image: "../images/sub catégorie images/fast food/Tacos Mixe.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_2",
        name: "Tacos Viande Haché",
        description: "Ground meat tacos",
        price: 16.00,
        image: "../images/sub catégorie images/fast food/Tacos Viande Haché.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_3",
        name: "American Burger",
        description: "Classic American burger",
        price: 22.00,
        image: "../images/sub catégorie images/fast food/American Burger .jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_4",
        name: "Double Cheese Burger",
        description: "Double patty with cheese",
        price: 28.00,
        image: "../images/sub catégorie images/fast food/Double Cheese Burger.jpg",
        category: "fastfood",
        badge: "Big",
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_5",
        name: "Chicken Burger",
        description: "Crispy chicken burger",
        price: 20.00,
        image: "../images/sub catégorie images/fast food/Chiken Burger.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_6",
        name: "Chicken Crunchy Burger",
        description: "Crispy crunchy chicken burger",
        price: 22.00,
        image: "../images/sub catégorie images/fast food/Burger Chiken Crunchy.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_7",
        name: "Chicken Pickle Burger",
        description: "Chicken burger with pickles",
        price: 21.00,
        image: "../images/sub catégorie images/fast food/Chiken Pickle Burger.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_8",
        name: "Burger Viande Boeuf",
        description: "Beef burger",
        price: 19.00,
        image: "../images/sub catégorie images/fast food/Burger Viande Beuf.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_9",
        name: "Burger Crevette",
        description: "Shrimp burger",
        price: 24.00,
        image: "../images/sub catégorie images/fast food/Burger Crevette.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_10",
        name: "Sandwich Poulet",
        description: "Chicken sandwich",
        price: 14.00,
        image: "../images/sub catégorie images/fast food/Sandwich Poulet.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_11",
        name: "Sandwich Viande Haché",
        description: "Ground meat sandwich",
        price: 15.00,
        image: "../images/sub catégorie images/fast food/Sandwich Viand Hache.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_12",
        name: "Sandwich Viande",
        description: "Meat sandwich",
        price: 16.00,
        image: "../images/sub catégorie images/fast food/Sandwich de Viande.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_13",
        name: "Hot Dog",
        description: "Classic hot dog",
        price: 12.00,
        image: "../images/sub catégorie images/fast food/Hot Dog.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_14",
        name: "Frites",
        description: "Crispy french fries",
        price: 8.00,
        image: "../images/sub catégorie images/fast food/Frites.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },

    // ---- HEALTHY FOOD (from toast brunch sub category) ----
    {
        id: "hf_1",
        name: "Toast Champignon Frommage",
        description: "Poached eggs, hollandaise",
        price: 14.50,
        image: "../images/sub catégorie images/toast/Toast Champignon Frommage.jpg",
        category: "healthy",
        badge: "Veg",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_2",
        name: "Toast Frittata",
        description: "Mushrooms, truffle oil",
        price: 12.50,
        image: "../images/sub catégorie images/toast/Toast Frittata.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_3",
        name: "Pumpkin Stew",
        description: "Tomato, peppers, eggs",
        price: 11.25,
        image: "../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg",
        category: "healthy",
        badge: "GF",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_4",
        name: "Toast Avocat",
        description: "Sourdough, smashed avo",
        price: 10.50,
        image: "../images/sub catégorie images/toast/toast.jpg",
        category: "healthy",
        badge: "Veg",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_5",
        name: "Croissant Benedict Salmon",
        description: "Poached egg, hollandaise & salmon",
        price: 13.50,
        image: "../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif",
        category: "healthy",
        badge: "Hot",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_6",
        name: "Toast Vegan",
        description: "Grains, greens",
        price: 12.00,
        image: "../images/sub catégorie images/toast/Toast Vegan.jpg",
        category: "healthy",
        badge: "Veg",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_7",
        name: "Salade Espagnol",
        description: "Feta, olives, tomatoes",
        price: 11.00,
        image: "../images/sub catégorie images/Brunch food/Salade Espagnol.jpg",
        category: "healthy",
        badge: "GF",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_8",
        name: "Herbed Focaccia",
        description: "Warm focaccia with herbs",
        price: 9.50,
        image: "../images/sub catégorie images/Brunch food/Herbed Focaccia.jpg",
        category: "healthy",
        badge: "Veg",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_9",
        name: "Salade Cesar",
        description: "Crisp romaine, parmesan",
        price: 10.00,
        image: "../images/sub catégorie images/Brunch food/Salade Cesar.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    }
];

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateItemCount();
});

function updateItemCount() {
    const badge = document.getElementById("item-count-badge");
    if (badge) badge.textContent = products.length + " ITEMS";
}

function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const url = `${product.customizationUrl}?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}`;
    window.location.href = url;
}

function renderProducts(filter = "all") {
    const list = document.getElementById("product-list");
    if (!list) return;

    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

    list.innerHTML = filtered.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full h-32 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" style="background-image:url('${product.image}')" data-name="${product.name}" data-price="${product.price}">
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
                    ${product.badge ? `<div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-800 shadow-sm z-10">${product.badge}</div>` : ''}
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
                        <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c] shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:shadow-lg" style="color: white !important;" onclick="event.stopPropagation(); redirectToCustomization('${product.id}')">ADD</button>
                    </div>
                </div>
            </div>
    `).join("");
}

// Filter buttons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            currentFilter = e.currentTarget.dataset.filter || "all";
            renderProducts(currentFilter);
        });
    });
});
