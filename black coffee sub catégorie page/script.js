// Product Data
const products = [
    {
        id: 1,
        name: "Velvet Flat White",
        description: "Double Shot, Silky Microfoam",
        price: 4.80,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJM9FSOKFPG71oxcbIXHzPI3JdmEoDqoupcyjwC9zi4qM0_wzlzhU7jyyhzdsFBkrBDZ0trUkR2CHGtf5076WRM1DlU2A7jFcLloqG6H36WRzFPBk_iWTXnLxbIqdoYwrvldwmnItw2fAgMAEPzxihi54rg--ag7rjgu46TJJ9cC-ctMafRmvNycsZI7CduLb1jsxK7qqFWHYC-DVTOOg7Nc77RB-pX0U_BkKENzuNomH4nToUhZtRI6EO1kTT5wylECW-aPbq2LA",
        category: "milk"
    },
    {
        id: 2,
        name: "Kyoto Cold Brew",
        description: "12-Hour Slow Drip Extraction",
        price: 5.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtn0f__4r-Zd7zjbdjMWkXDfcehpvYArEfnyA93zREIUortA8qNbqch-Hgyq50txpdCPNAH7XO3VbkdDEK-EdD-miKytaxbg9EfR2cs8DsR7iHOvnLC4IWPlCUtpcLeIcqqgKHx9KBV3wweqk0AUsd8XbOkrr9_cxBxnhwKQW-xAZ3w96D8RrGueyQP9QaoaonSrZ9KkB-6gfB2dHqdNBjulpihqKMX1yB2jJRsZBRmvXY7ed0o0g7jCuKUo90CIh0PcAn_ufvCsQ",
        category: "black"
    },
    {
        id: 3,
        name: "Oat Milk Latte",
        description: "Creamy, Nut-Free, Vegan",
        price: 5.20,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQR8gezQl3jB0vULS45TC4ue2AuPbK8pkkeLXA4LLPhYMQyJc3W-IyxooLKy_1_iDXk9QQJ29kuhWJDFi9RJXTWzx7tX5CqvyubitdxsTRewMQdCFNbeTm4VHInQmyRgjiSLHjUG-vBcPIt272R1BQd4-Nc3Zlp2oW3YamR3WslvjodjKWR3PWoIeuC4t9IG4gKmkCfuTXsWC2Sl-ojhWkr4VR4eKRMXllKe1wUWliJ8ERkgCyF5AxVrxOXD4_ZOhmPqKUABX8jEQ",
        category: "milk"
    },
    {
        id: 4,
        name: "Single Origin Espresso",
        description: "Intense Berry Notes",
        price: 3.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5_ok0-V4teAzZiv_cSTVLPbiP7IMvsZ3rUxdWd0hhV5ydDN034HvlLw6_xuTEK0GSgBwSK8PvFN9S1xmkrP6nIBzIo7QafLqzmXpoHRYl87CDazinVUjtRhDf3BekGPoF_rrBylwEpG-N0MCGpEBLcE6h-fY92XE-EI91GwNFZJijR0LU1xHKTkjnE1fVH88qQpPSR0d_Acw7jJ7ecM5nrVvduD3_6T0pE9yZyUiDwr3Tn0RRbXwEB5jic36-V7jyNWfHhIlDFek",
        category: "black"
    },
    {
        id: 5,
        name: "Dark Mocha",
        description: "70% Cacao, Double Espresso",
        price: 6.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCYOof3TzdY9V9-b2EBPVqq4uJJsqCz0GLTW10Dq9w46kRrdeBI2BpAAicfrCc4OS_2XD6KqI8sKTWXcGIwZ-U4ZHFb48UHP0SifNCmkJkP9e2txRlSerDgs6Jrwo2HJfz21TgBq-3TsoyWLeEbIi9yIxDGeWHgiW-biCeyLhVfSNtF7dhiubqN9mR5T7l0nUAhT2ss7E3aHykK2-5qvidgBXwwFsaMyRBgulEjQQVtY9RMIbE4EKToF7FUNSYGu3Lpj3p2ill10o",
        category: "milk"
    }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization(${product.id})" class="flex items-center gap-3 p-3 bg-white rounded-[16px] border border-zinc-100 shadow-sm fade-in transition-transform active:scale-95 cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="size-14 rounded-xl bg-zinc-100 bg-center bg-cover flex-shrink-0" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');"></div>
            <div class="flex-1">
                <h4 class="font-semibold text-[16px]">${product.name}</h4>
                <p class="text-[11px] text-zinc-500 mt-0.5">${product.description}</p>
                <p class="font-bold text-primary mt-1 text-sm">$${product.price.toFixed(2)}</p>
            </div>
            <button onclick="event.stopPropagation(); addToCart(${product.id})" class="size-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-primary shadow-sm hover:bg-zinc-50 transition-transform active:scale-95">
                <span class="material-symbols-outlined text-[20px]">add</span>
            </button>
        </div>
    `).join('');
}

// Navigate to customization page
function redirectToCustomization(productId) {
    // All black coffee items go to the espresso/black coffee customization view
    window.location.href = '../pure_noir_espresso_customization_view_1/index.html';
}

// Add to cart
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
    if(btn) {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 1000);
    }
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

    // Search Button
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            console.log('Search clicked');
            alert('Search functionality would open here');
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
