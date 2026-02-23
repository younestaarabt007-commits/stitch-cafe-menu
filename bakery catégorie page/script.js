// Product Data
const products = [
    {
        id: "bakery_1",
        name: "Chocolate Babka",
        description: "Rich dark chocolate ganache swirl.",
        price: 12.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4yxTrjplybSy3tivdZIqpAykri084L5Nj4ITNMaV9x8iiG-se_kiD1Wa5p5ZnMZXPyNzvUdGD-9c-ZLsKpl-74UVqutCJtd7YpMk3bbnJkH777pdAhEXu_F7jtei9Pu3oPh1_TSRBcaEhk5G9gk3aco5DSzS7bsfihmMjd7tfrgMdYFlf48mebUUQ0JD9Zm3C5fGrRZL7mmjCIPmVxW0o6QhP5cUCO-voI4uj6kMDiidWhU-AB3pNwIEDFrurwCYKWCK0obPceGo",
        category: "patisserie"
    },
    {
        id: "bakery_2",
        name: "Seeded Multigrain",
        description: "Hand-topped with flax & oats.",
        price: 9.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWXQYBr2UB9mKoM-3OljUM4Mbxqs0QeEqyCWbih9P2llDX1U2l_OCUTK6oizGPgdpSmloYOriqJP7lqzbSl-S_2WJb5b4yZibP6iRjAQWtYmZPcDYQ6uBeN1IKJHPrswHmKLeIQU8nTZCCuHgRj7Bi5t3p5s_zB8fdm7O-O7Qm_HED43a--LhjAHI664fTUwwqSH4OJum0FUowLkeXDkewdqtEYihwO9zJQVM-ekXCxwhzfrSSp-YDUl-9Eujlafqml2VaUB7kxQo",
        category: "sourdough"
    },
    {
        id: "bakery_3",
        name: "Dark Rye Loaf",
        description: "Robust German-style dense rye.",
        price: 10.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGwz6vJnJ9G1Ygn-TJfSbp9HWAl5oplo_g241pWY8yeoIwsUa3mNcLK88FJOl7CzrgsIKqclAlE5rY2vIFQiVzLMFWDfZVBJ8sDjrB1tEIzWghhllLO6WTSSW4Zp9ln50KL3-Wbo1Jx5wf2iXIBynTxnYmh5wNnnATdVV3fy-Lm5eYcIpP-3nulhml1MV8gr-VZafmLg7a8e6cJVzOr5kuuvbk2wCGQXAyD_aSIiYklo6z2JYWbD1KV4rYpKY_QlSYd2mpkbeMiIU",
        category: "sourdough"
    },
    {
        id: "bakery_4",
        name: "Herbed Focaccia",
        description: "Rosemary, garlic & olive oil.",
        price: 7.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsP00_mSkTTD7XOht1m0f1PLmaPLvSyyl_EGWPSSOiWpwmjKq7cxeuHpp4Xuj9GownfB0_6PO_pN15p8BHqqE5I4jI3UMBUmptIFoBsszRVnzFXh2tdy-s4bIGzA0w96Q92uIO4xLac3QDZ9TOiAR8pWlc5H_SOZfTGvPMlhuN6aVfLW7F_wafL5JOxsp4GQplcSsUBjTAz00KGzvYDEYxi8ORYUDf7Aj7XF_r0vTLKzvGH1OWOZ83WlIilWdCeiIYFdhvWJase8E",
        category: "viennoiserie"
    },
    {
        id: "bakery_5",
        name: "Honey Brioche",
        description: "Ultra-soft, buttery morning loaf.",
        price: 11.25,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2G_p_jRRdkHcAqubYRVvWsr1TxDFPx8O-eeNsiSLghADLxSJRYQMieySKjDUtFifCzsd3F-dp41WDMZS6BQsV9MuXPJB7S8_802mE8SaAJ2iVblIM-msYW4FEBDBjb0Cun4u2vABRTjKL4X_Y8gZWPR795SOb0eVEDBsWF6Ig-8WbcNbv_xJDYkp7pa08HoiMefRQPVBpz2BZLoZ_XNiyV6MkGws2F-96XCTkx3_Zr6N57U2Jd9a7Y4I35CKttKR9hFGK3kYQCfg",
        category: "viennoiserie"
    },
    {
        id: "bakery_6",
        name: "Stoneground Wheat",
        description: "Nutritious 100% whole grain.",
        price: 8.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5VgizJ__ivEI0Nk_U_DkH9m713CSJAOlDlQL-z_tsQrrypMAoFFIt1OJBOULcQN1LhWAZ4Nizg1qcMPMiRg4cNTyMZ_O4xrI5FIAtPii1AA_IUODdDTVRYnmSC3oi7ZqqgIXL1A5dxX6zKvK9kvH7RSmwXWue5NICBb-IA-N_c1NUYKoejQrj26e6Us28IsoMLpcWBOQtxZpVuVOheAhFdUVTjua_9ffuSzADsYSZvuF09UoDcls6m1YabthQpwgTxR8Xf4wZda0",
        category: "sourdough"
    },
    {
        id: "bakery_7",
        name: "Parisian Baguette",
        description: "Classic crust with an airy crumb.",
        price: 4.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATB369qZC7VlSNGUPM_0qJa8T-pzAF0NXgK2y33TDOjiNuTz20PMb9T13YvwX7G0DdpxT0mjCUH5KBN0tljD8sVZiWDm0PNbOkJ5eO3rUzuBG8hCtaYZVMSigNVf4inqx6Z4ncEsQPI7l7tfDMQfR5iPDwxiyLYw4P9GcnvzfRnKYq-4U2ed1pOqc0UQMj7lGYwy2z5MQD7i585pXYoQSE3cAp-hHNq-0HTvDk8AVwX5a4Ruz1ogNkDkAJrA3q9yA87cqdfYoOltc",
        category: "viennoiserie"
    },
    {
        id: "bakery_8",
        name: "Cranberry Walnut",
        description: "Sweet & tart artisan loaf.",
        price: 9.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8pqreXdQ1Y9lHmtpVLICGMk-g0UhtrGGdFAFguHz_tLj1CF_KDwddadNvBSNJ0AnSAnxbuv6aQ_12CTzf8r-jTt_G8Vhp8o6o4Izi72N0LIv6TM8I5To-K-QkTlFAUFSdLwI-Ub2UaXN7fNEbMvhbUXjAZpCZi439NhcMiJ17UARLvNHQRzwE9CbuMYAIbGYzKcWZ70-7KpJejlZZ8vPV60x-g05mILQPAPK6LJ16hasdVabqCt6lhRZy8AU8X1apmusvwgyyrnM",
        category: "sourdough"
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
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col group fade-in cursor-pointer" style="animation-delay: ${index * 0.05}s">
            <div class="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm mb-3 bg-white">
                <img alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${product.image}"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm z-10">
                    <span class="material-symbols-outlined text-[16px] text-stone-400">favorite</span>
                </div>
                <div class="absolute bottom-3 left-3 bg-[#F3E5D8] px-2 py-1 rounded-md shadow-sm border border-[#E6D0BC]">
                    <span class="text-[10px] font-bold text-[#5D4037] font-display">$${product.price.toFixed(2)}</span>
                </div>
            </div>
            <h3 class="font-display font-bold text-product text-stone-900 leading-tight">${product.name}</h3>
            <p class="text-[11px] text-stone-500 mb-3 line-clamp-1">${product.description}</p>
            <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="w-full h-[36px] bg-white border border-caramel/30 text-caramel rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-caramel hover:text-white transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95">
                Add <span class="material-symbols-outlined text-[14px]">add</span>
            </button>
        </div>
    `).join('');
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
    if(btn) {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 1000);
    }
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let customizationUrl = '../petit pain bakery_customization_view/index.html'; // Default

    // Logic to determine customization page based on product or category
    if (product.category === 'viennoiserie' || 
        product.category === 'patisserie' || 
        product.name.toLowerCase().includes('brioche') ||
        product.name.toLowerCase().includes('baguette') ||
        product.name.toLowerCase().includes('croissant') ||
        product.name.toLowerCase().includes('cake')) {
        customizationUrl = '../sweet_pastries_customization_view/index.html';
    } else {
        customizationUrl = '../petit pain bakery_customization_view/index.html';
    }

    // Append price to URL
    window.location.href = `${customizationUrl}?price=${product.price}`;
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

    // Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.description.toLowerCase().includes(searchTerm)
            );
            
            const grid = document.getElementById('product-grid');
            if (grid) {
                 grid.innerHTML = filtered.map((product, index) => `
                    <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col group fade-in cursor-pointer" style="animation-delay: ${index * 0.05}s">
                        <div class="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm mb-3 bg-white">
                            <img alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${product.image}"/>
                            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm z-10">
                                <span class="material-symbols-outlined text-[16px] text-stone-400">favorite</span>
                            </div>
                            <div class="absolute bottom-3 left-3 bg-[#F3E5D8] px-2 py-1 rounded-md shadow-sm border border-[#E6D0BC]">
                                <span class="text-[10px] font-bold text-[#5D4037] font-display">$${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <h3 class="font-display font-bold text-product text-stone-900 leading-tight">${product.name}</h3>
                        <p class="text-[11px] text-stone-500 mb-3 line-clamp-1">${product.description}</p>
                        <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="w-full h-[36px] bg-white border border-caramel/30 text-caramel rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-caramel hover:text-white transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95">
                            Add <span class="material-symbols-outlined text-[14px]">add</span>
                        </button>
                    </div>
                `).join('');
            }
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
