// Product Data
const products = [
    {
        id: 1,
        name: "Nitro Cold Brew",
        description: "18-hour steep, nitrogen infused.",
        price: 6.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1wCQUEc2xm-D5wFbJkHDepkkxz8VAQ26JaKcvw-sbyix2-wnVYGr9MM6IRPbIxWiagXO2AZspBq7z_gEewaC0kTwGXDgRCFn8_fTndDjohi1j8MFgyEfwwCRe4J_EIyGKeq0tG96ht7dKmdS0UV1M-N8NOUNn_XGEibjCk7gaQOfFVDUWaUyZW2p-fsQpMVs3b-GANBPfgIeNi5YzlSigTeiVujRH8mglMr_JDDkuSHQt5KJU6fJJSfCe0CPcmmEJodJhhS_ou4",
        category: "cold",
        favorite: true
    },
    {
        id: 2,
        name: "Ceremonial Matcha",
        description: "Uji-sourced matcha with oat milk.",
        price: 7.25,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_3flnm9KLgxLxKB36tF5eXyvIvGDSTnw3jBRAcGyjK_SGUuZ3JPs5YYrkdEg5fFljs-4RtwHnDa-jOyAW4Ub3SlfyS58kUA_YJTQdrYkz7WcWZB4cDNQ1LIjvooURT4In53-fDmvdS3vRbA76SC3wRZ8Y4ubqmeswA3svSzCnIIKpceJcnNb1M8hHdr0rw4T2etbM3F_eTqjzb7pq3tBENJSXcgjGVpXWW7k6dy9oh7HYntN_asAaXRao-JwdRY1BOiVtrQP5tjA",
        category: "seasonal"
    },
    {
        id: 3,
        name: "Ethiopian Yirgacheffe",
        description: "Floral notes with a citrus finish.",
        price: 5.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIP8MKi2WKW4FSXIX4uvldgOj21D4qEbRqsDBBYoxlr9x3dmsp0mL1i5r85xkCM4uLPXIZYy1GiKVF_aUHi6wSloHdM3Mn2Bee8ZDUa6h581QlsAhbWH5D_r8yOk_BuAHNZgTpa0SAfGJtSnCYMB6liMbJmsOw_VhT9xJ_2LLtccejxDRgMQror-VKXeKmhWNbhU7zGS1z2iHOJ7breLPN987MQU8RnaQjnu52DHUS3Y1nfGm7DowdJJdStwcA-5YC_gaQDPsAQmM",
        category: "dark",
        badge: "Light Roast"
    },
    {
        id: 4,
        name: "Dirty Masala Chai",
        description: "House-made spices, double shot.",
        price: 6.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwFabdrk_JL6HIByPm53ZtP_znMiZMWNEtU0XkybbZi02Fy6f4Vk5XTmHVDxtB8NEq9SAM3hr7yZYT61yhTWZ-OARuI8ZM4WyBG-nB1OT2Q7ErWVeAVlc6YcfLbN_ZjFqnzVU-4qK2Tl4Yk_TEOIyIrL70bJCg3PSFrvbjpfPH5w6LN-0wDX59LDLe2l4MICrO14SdODVMOGJ5_yGJFkh3hy748EMnANTwLB1pmveS9PuHi7qDkDDoSsodhvKD5e7Rc29lkTIFnWs",
        category: "seasonal"
    },
    {
        id: 5,
        name: "Oat Milk Cortado",
        description: "Equal parts espresso & milk.",
        price: 4.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuK0f9G3KD60FGrWg5AGNt2qeexG3wWZL1iLgHto2Xu2d1aUqqC-8zl9Tmv9RMTri5kkfdZa5VMd32mqYpC6ZSILkMccPWGfmdNTBcLyfK28VU4vwdQeACNCKVyiR8XATf0XV0EsWoMzj64MjcGRHWvqiWad6oHKyKARDoZ4lA7mGltdXdymwoAm8Y5NlExQJ6ABoKYNgIICshB-7LF-XeJpCcoIUHkuwcJFOY4zB-mtuwue8gDJur4zsZROdT6io1z60gTIQ2Rwo",
        category: "dark"
    },
    {
        id: 6,
        name: "Lavender Honey",
        description: "Floral infusion with local honey.",
        price: 7.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdVi2KlhCBtLOydplTgK0Ca0WYozE2GbOrVa_5EXWSopewMmcpyaqylHKKxBc5rkZX_vsP1AZ2Q0NkyOU8ptRusMfyUPWQdyW93ed3BiZtihb5C1qEZs1T3HHJhVLA1St4BLlmJqQR-XCatKqcTDKZeDWNu-3nnSr_fB9b0YH1ADgnBlUdTitwyS4BJ7yMC1uR8uUI3JbffxvOL9hudg1A3itd56iCOtZVDw-0LXuH2YO4xCgWUErVpLKW6cDZ_4fQohchHAMgU9A",
        category: "seasonal"
    },
    {
        id: 7,
        name: "Golden Turmeric",
        description: "Spiced healing brew.",
        price: 6.25,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2WveZEQ9ZqAuaHtk2h6S7uzflx9VYT-AI_atXxKqO5MUHmU3EEDLsfzkbtlDdqtcgtHQPtqEtPjcqo65RGfeh0kmjFPIPtRTU9FHgbVE7RtDPzc4cRzDeNFS4brkZ9aNTffRYiRAe0ccNMzxu1NHII0aNiFiF45-bfNXfSMLGfelG4PFYUh7HERxL-BDsXJhz_d3ZpPXWqMh920_RH-VMsNmj2FmPKBYk9SwuLUTlF1JkQYjeLzXjvBIg5BAHQnmXfIcekdJxIk0",
        category: "seasonal"
    },
    {
        id: 8,
        name: "Caramel Macchiato",
        description: "Layered espresso & vanilla.",
        price: 6.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgjUlQZeCIa1cnwbujIqf06Gd160tTeQ1LCF-BkuqaVAfFV6_v399zhZm6H3ZGcsBb6fuJyRSrdB6MkTlZHDDT8bL81yBPRYETh-x7KlmkVkO6t5EaYQy5aZNk9iHuq3Fu28pE9z-5lQnFH2MTwHhFJYtmnY2Kao3_g8jMGmRcPEWJAuzh5bvj0YMi3K0mI7ijKAds1jFXDEw6_dkgoOE3fcdSCJjpbIVL_WlylVfUxPgsbKCisuDDIURnvMpATBBg0lhpiEUPnlI",
        category: "dark"
    },
    {
        id: 9,
        name: "V60 Single Origin",
        description: "Hand poured perfection.",
        price: 8.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKee-oKo58OiriOnZCwDYqvQvCiIxmqzZ-27U6k7qRm4V69tuQWlK6hNj2dSIqtMzHaEo5BLnPatnnkfGe-8O_ilFd5jUrY49cMKvypm-WLC210aVdMmzjGOnCaS7FAso9CnYG7paFf9znbxIm_VlBqkUCH3tQLsw0XZvtRmzPdibc0npc3IREUntX_4djm2s8N1EI3tBpMpe1Ax3nhS2X90rux0YHV1sADM2Tk4vBhCnlLBERMtZ4DK1_9LAJKcPM2Ag9YgREEMk",
        category: "dark"
    },
    {
        id: 10,
        name: "Blueberry Infusion",
        description: "Antioxidant rich blend.",
        price: 5.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2vnzTZpixnidCim5NBvO0g74IgwleCQ2NAnomq6nJXiLXe-19kgjWA5t-qTYcIoYhRJrBhigigvJdrIDHv1kwBsDad7bQsU14ItZOQMf7ScowfgN_BfUin4YKqzm2r4_E9HHrrMi2oh6rzVmKtf3kD2smOr5_pEs7aRUktwEhUu07hdaPLnGaR9lBqtaKn8DoAtoOZ8Rfe0RdRlOAA_JwxkCuowz7-SrlkI3uKFjUZZc-kb67YGmcgWweaFqmXLGfg0uPmJZ_bH0",
        category: "seasonal"
    }
];

// Cart State - Deprecated, handled by nav-bar.js
// let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization(${product.id})" class="flex flex-col group product-card w-full fade-in cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-sm mb-3 border border-stone-100 bg-white">
                <img alt="${product.name}" class="product-image w-full h-full object-cover transition-transform duration-700" src="${product.image}"/>
                ${product.badge ? `
                    <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <span class="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">${product.badge}</span>
                ` : ''}
                ${product.favorite ? `
                    <button class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 shadow-sm z-20">
                        <span class="material-symbols-outlined text-base">favorite</span>
                    </button>
                ` : ''}
            </div>
            <h3 class="font-display font-semibold text-stone-900 text-[16px] leading-tight mb-0.5">${product.name}</h3>
            <p class="text-[12px] text-stone-500 mb-2 leading-tight line-clamp-2">${product.description}</p>
            <div class="flex items-center justify-between mt-auto w-full">
                <span class="font-bold text-espresso tracking-tight text-sm">$${product.price.toFixed(2)}</span>
                <button onclick="event.stopPropagation(); redirectToCustomization(${product.id})" class="add-btn w-[84px] h-[36px] min-w-[84px] rounded-[12px] bg-white border border-orange-custom text-orange-custom text-xs font-bold shadow-sm active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center">
                    Add
                </button>
            </div>
        </div>
    `).join('');
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    let customizationUrl = '../pure_noir_espresso_customization_view_1/index.html'; // Default

    // Logic to determine customization page based on product or category
    if (product.name.toLowerCase().includes('matcha') || 
        product.name.toLowerCase().includes('chai') || 
        product.name.toLowerCase().includes('tea') ||
        product.name.toLowerCase().includes('lavender') ||
        product.name.toLowerCase().includes('turmeric') ||
        product.name.toLowerCase().includes('blueberry')) {
        customizationUrl = '../tea_customization_view/index.html';
    } else if (product.name.toLowerCase().includes('latte') || 
               product.name.toLowerCase().includes('macchiato') ||
               product.name.toLowerCase().includes('cortado')) {
        customizationUrl = '../latte_customization_view_2/index.html';
    } else if (product.name.toLowerCase().includes('espresso') || 
               product.name.toLowerCase().includes('brew') ||
               product.name.toLowerCase().includes('v60')) {
        customizationUrl = '../pure_noir_espresso_customization_view_1/index.html';
    }

    window.location.href = customizationUrl;
}

// Setup Event Listeners
function setupEventListeners() {
    // Back Button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log('Back button clicked');
            window.history.back();
        });
    }

    // Cart Button (Header) - Optional: Redirect to cart page or remove listener if button is removed
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
            const searchTerm = e.target.value.toLowerCase();
            console.log('Search:', searchTerm);
            // Implement search functionality here
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

    // Cart Button
    document.getElementById('cart-btn').addEventListener('click', () => {
        console.log('Cart:', cart);
        alert(`Cart has ${cart.length} items`);
    });

    // Checkout Button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        console.log('Checkout clicked');
        alert('Proceeding to checkout...');
    });

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            currentFilter = e.target.dataset.filter;
            renderProducts(currentFilter);
        });
    });

    // Search Input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const grid = document.getElementById('product-grid');

        if (query.length > 0) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );

            grid.innerHTML = filtered.map((product, index) => `
                <div class="flex flex-col group product-card w-full fade-in" style="animation-delay: ${index * 0.05}s">
                    <div class="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-sm mb-3 border border-stone-100 bg-white">
                        <img alt="${product.name}" class="product-image w-full h-full object-cover transition-transform duration-700" src="${product.image}"/>
                    </div>
                    <h3 class="font-display font-semibold text-stone-900 text-[16px] leading-tight mb-0.5">${product.name}</h3>
                    <p class="text-[12px] text-stone-500 mb-2 leading-tight line-clamp-2">${product.description}</p>
                    <div class="flex items-center justify-between mt-auto w-full">
                        <span class="font-bold text-espresso tracking-tight text-sm">$${product.price.toFixed(2)}</span>
                        <button onclick="addToCart(${product.id})" class="add-btn w-[84px] h-[36px] min-w-[84px] rounded-[12px] bg-white border border-orange-custom text-orange-custom text-xs font-bold shadow-sm active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center">
                            Add
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            renderProducts(currentFilter);
        }
    });

    // Filter Settings Button
    document.getElementById('filter-btn').addEventListener('click', () => {
        alert('Filter settings would open here');
    });
}
