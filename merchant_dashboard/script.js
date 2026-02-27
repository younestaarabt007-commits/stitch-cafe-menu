function apiBase() {
    try {
        return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || 'http://localhost:3000';
    } catch {
        return 'http://localhost:3000';
    }
}

// Tab Switching Logic
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

function switchTab(tabId) {
    tabContents.forEach(tab => tab.classList.add('hidden'));
    navBtns.forEach(btn => {
        btn.classList.remove('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        btn.classList.add('text-gray-500');
    });

    const activeTab = document.getElementById(`${tabId}-tab`);
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);

    if (activeTab) activeTab.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.add('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        activeBtn.classList.remove('text-gray-500');
    }

    // Update Header
    if (tabId === 'dashboard') {
        pageTitle.textContent = "Today's Summary";
        pageSubtitle.textContent = "Manage your shop in real-time.";
        loadLiveOrders();
        loadStats();
    } else if (tabId === 'pos') {
        pageTitle.textContent = "Point of Sale";
        pageSubtitle.textContent = "Take manual orders directly from the counter.";
        loadPOSMenu();
    } else if (tabId === 'orders') {
        pageTitle.textContent = "Order History";
        pageSubtitle.textContent = "Review and manage all past orders.";
        loadLiveOrders();
    } else if (tabId === 'menu') {
        pageTitle.textContent = "Menu Management";
        pageSubtitle.textContent = "Add, edit, or remove products from your shop.";
        loadMenuManager();
    }
}

async function loadStats() {
    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`${apiBase()}/api/v1/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
            const orders = result.data;
            const totalSales = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
            const totalOrders = orders.length;

            // Update UI elements (finding them by text content since they lack IDs)
            const statsCards = document.querySelectorAll('.tab-content h3');
            if (statsCards.length >= 2) {
                statsCards[0].textContent = `${totalSales.toFixed(0)}DH`;
                statsCards[1].textContent = totalOrders;
            }
            const ratingEl = document.getElementById('customer-rating-value');
            if (ratingEl) {
                let avg = 4.8;
                try {
                    const lastOrder = JSON.parse(localStorage.getItem('stitch_last_order') || '{}');
                    if (lastOrder && lastOrder.rating) {
                        avg = Number(lastOrder.rating).toFixed(1);
                    }
                } catch (e) { }
                ratingEl.textContent = avg;
            }
        }
    } catch (e) { }
}

async function loadLiveOrders() {
    const container = document.querySelector('#dashboard-tab .col-span-2 .grid');
    if (!container) return;

    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`${apiBase()}/api/v1/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();

        if (result.success && result.data.length > 0) {
            container.innerHTML = result.data.slice(0, 5).map(order => `
                <div class="bg-white dark:bg-[#2a1e19] rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-all">
                  <div class="flex items-center gap-6">
                    <div class="w-16 h-16 bg-gray-50 dark:bg-black/20 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-white/5">
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order</span>
                      <span class="text-xl font-black text-primary">#${order.id.substring(0, 3).toUpperCase()}</span>
                    </div>
                    <div>
                      <div class="flex items-center gap-3 mb-1">
                        <span class="text-sm font-bold">Total: ${Number(order.total_amount).toFixed(2)}DH</span>
                        <span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold rounded-full">${order.status}</span>
                      </div>
                      <p class="text-[10px] text-gray-400 mt-1 font-bold">Placed on ${new Date(order.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <button class="p-3 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 rounded-xl transition-all">
                      <span class="material-symbols-outlined">print</span>
                    </button>
                  </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="text-center py-10 text-gray-400 font-bold uppercase tracking-widest text-xs">No orders yet</div>';
        }
    } catch (e) {
        console.error('Failed to load orders', e);
    }
}

// POS Logic
let posCart = [];
let menuItems = [];

async function loadMenuData() {
    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`${apiBase()}/api/v1/menu`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
            menuItems = result.data;
            return menuItems;
        }
    } catch (e) {
        console.error('Failed to load menu data', e);
    }
    return [];
}

async function loadPOSMenu() {
    const grid = document.getElementById('pos-menu-grid');
    grid.innerHTML = '<div class="col-span-3 text-center py-10"><span class="animate-spin material-symbols-outlined text-primary text-4xl">sync</span></div>';

    const items = await loadMenuData();
    renderPOSCategories(items);
    renderPOSMenu(items);
}

async function loadMenuManager() {
    const container = document.getElementById('menu-tab');
    if (!container) return;

    // Create menu management UI if it doesn't exist
    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold">Menu Items</h4>
                <button onclick="showAddProductModal()" class="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg">
                    <span class="material-symbols-outlined">add</span>
                    Add Product
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="menu-manager-grid">
                <!-- Products loaded here -->
            </div>
        </div>

        <!-- Add Product Modal -->
        <div id="add-product-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center">
            <div class="bg-white dark:bg-[#2a1e19] w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl">
                <h3 class="text-2xl font-bold mb-6">Add New Product</h3>
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                        <input type="text" id="new-product-name" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1" placeholder="e.g. Iced Vanilla Latte">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Price ($)</label>
                        <input type="number" id="new-product-price" step="0.01" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1" placeholder="4.50">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Category</label>
                        <select id="new-product-category" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1">
                            <option value="Coffee">Coffee</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Juices">Juices</option>
                        </select>
                    </div>
                    <div class="pt-4 flex gap-3">
                        <button onclick="hideAddProductModal()" class="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all">Cancel</button>
                        <button onclick="saveNewProduct()" class="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-glow">Save Product</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const items = await loadMenuData();
    renderMenuManagerItems(items);
}

window.showAddProductModal = () => document.getElementById('add-product-modal').classList.remove('hidden');
window.hideAddProductModal = () => document.getElementById('add-product-modal').classList.add('hidden');

window.saveNewProduct = async () => {
    const name = document.getElementById('new-product-name').value;
    const price = document.getElementById('new-product-price').value;
    const category = document.getElementById('new-product-category').value;
    const image_url = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200'; // Default image

    if (!name || !price) return alert('Please fill all fields');

    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`${apiBase()}/api/v1/menu`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price: parseFloat(price), category, image_url })
        });

        const result = await res.json();
        if (result.success) {
            menuItems.push(result.data);
            hideAddProductModal();
            renderMenuManagerItems(menuItems);
            renderPOSMenu(menuItems);
        }
    } catch (e) {
        alert('Failed to save product');
    }
};

window.deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`${apiBase()}/api/v1/menu/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const result = await res.json();
        if (result.success) {
            menuItems = menuItems.filter(i => i.id !== id);
            renderMenuManagerItems(menuItems);
            renderPOSMenu(menuItems);
        }
    } catch (e) {
        alert('Failed to delete product');
    }
};

function renderMenuManagerItems(items) {
    const grid = document.getElementById('menu-manager-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">No items in menu</div>';
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-2xl mb-4 overflow-hidden">
                <img src="${item.image_url || 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200'}" 
                     class="w-full h-full object-cover" 
                     onerror="this.src='https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200'">
            </div>
            <h5 class="font-bold text-sm mb-1">${item.name}</h5>
            <div class="flex items-center justify-between">
                <span class="text-primary font-black">${Number(item.price).toFixed(2)}DH</span>
                <button onclick="deleteProduct('${item.id}')" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 p-2 rounded-lg transition-all">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

function renderPOSCategories(items) {
    const container = document.getElementById('pos-categories');
    if (!container) return;
    const categories = ['All', ...new Set(items.map(i => i.category))];

    container.innerHTML = categories.map(cat => `
        <button onclick="filterPOSByCategory('${cat}')" class="category-btn px-4 py-2 ${cat === 'All' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500'} text-xs font-bold rounded-xl transition-all">
            ${cat}
        </button>
    `).join('');
}

window.filterPOSByCategory = (category) => {
    // Update button styles
    const btns = document.querySelectorAll('.category-btn');
    btns.forEach(btn => {
        if (btn.textContent.trim() === category) {
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('bg-gray-100', 'dark:bg-white/5', 'text-gray-500');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-gray-100', 'dark:bg-white/5', 'text-gray-500');
        }
    });

    const filtered = category === 'All'
        ? menuItems
        : menuItems.filter(i => i.category === category);
    renderPOSMenu(filtered);
};

function renderPOSMenu(items) {
    const grid = document.getElementById('pos-menu-grid');
    grid.innerHTML = items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary/50 cursor-pointer transition-all group" onclick="addToCart('${item.id}')">
            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-2xl mb-4 overflow-hidden relative">
                ${item.image_url ? `<img src="${item.image_url}" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center text-gray-300"><span class="material-symbols-outlined text-4xl">coffee</span></div>`}
                <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all">add</span>
                </div>
            </div>
            <h5 class="font-bold text-sm mb-1">${item.name}</h5>
            <div class="flex items-center justify-between">
                <span class="text-primary font-black">${Number(item.price).toFixed(2)}DH</span>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${item.category}</span>
            </div>
        </div>
    `).join('');
}

window.addToCart = (itemId) => {
    const item = menuItems.find(i => i.id === itemId);
    const existing = posCart.find(c => c.id === itemId);

    if (existing) {
        existing.quantity++;
    } else {
        posCart.push({ ...item, quantity: 1 });
    }
    renderCart();
};

function renderCart() {
    const cartList = document.getElementById('pos-cart-list');
    const checkoutBtn = document.getElementById('pos-checkout-btn');

    if (posCart.length === 0) {
        cartList.innerHTML = `
            <div class="text-center py-10 text-gray-400">
                <span class="material-symbols-outlined text-[48px] mb-2 opacity-20">shopping_cart</span>
                <p class="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartList.innerHTML = posCart.map(item => `
            <div class="flex items-center gap-4 bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-[#2a1e19] flex items-center justify-center text-primary font-bold">
                    ${item.quantity}x
                </div>
                <div class="flex-1">
                    <p class="font-bold text-sm">${item.name}</p>
                    <p class="text-[10px] text-gray-400 font-bold tracking-widest uppercase">${(item.price * item.quantity).toFixed(2)}DH</p>
                </div>
                <div class="flex gap-1">
                    <button onclick="updateQty('${item.id}', -1)" class="p-1 hover:text-primary transition-all"><span class="material-symbols-outlined text-sm">remove_circle</span></button>
                    <button onclick="updateQty('${item.id}', 1)" class="p-1 hover:text-primary transition-all"><span class="material-symbols-outlined text-sm">add_circle</span></button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    updateTotals();
}

window.updateQty = (itemId, delta) => {
    const item = posCart.find(c => c.id === itemId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        posCart = posCart.filter(c => c.id !== itemId);
    }
    renderCart();
};

function updateTotals() {
    const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('pos-subtotal').textContent = `${subtotal.toFixed(2)}DH`;
    document.getElementById('pos-tax').textContent = `${tax.toFixed(2)}DH`;
    document.getElementById('pos-total').textContent = `${total.toFixed(2)}DH`;
}

document.getElementById('pos-checkout-btn').addEventListener('click', async () => {
    const btn = document.getElementById('pos-checkout-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Processing...';

    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`${apiBase()}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: posCart.map(i => ({ menu_item_id: i.id, quantity: i.quantity }))
            })
        });

        const result = await res.json();
        if (result.success) {
            alert('Order Completed Successfully!');
            posCart = [];
            renderCart();
            switchTab('dashboard');
        } else {
            alert(`Error: ${result.error.message}`);
        }
    } catch (e) {
        alert('Failed to complete order.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Complete Order';
    }
});

// Search functionality
document.getElementById('pos-search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = menuItems.filter(i =>
        i.name.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query)
    );
    renderPOSMenu(filtered);
});

// Session Check
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('stitch_token');
    const role = localStorage.getItem('stitch_role');
    if (!token || (role !== 'MANAGER' && role !== 'STAFF')) {
        window.location.href = '../auth_login_page/index.html';
        return;
    }
    const user = JSON.parse(localStorage.getItem('stitch_user') || '{}');
    console.log(`Welcome, ${user.name || ''}`);
    const savedTheme = localStorage.getItem('stitch_theme') || 'elite';
    applyTheme(savedTheme);

    navBtns.forEach(btn => {
        const tab = btn.getAttribute('data-tab');
        if (tab) {
            btn.addEventListener('click', () => switchTab(tab));
        }
    });
    const posQuickBtn = document.getElementById('pos-quick-btn');
    if (posQuickBtn) {
        posQuickBtn.addEventListener('click', () => switchTab('pos'));
    }

    // Load initial dashboard data
    loadLiveOrders();
    loadStats();
});

// Logout logic
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('stitch_token');
    localStorage.removeItem('stitch_role');
    localStorage.removeItem('stitch_user');
    window.location.href = '../auth_login_page/index.html';
});

// Mobile Sidebar Logic
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileClose = document.getElementById('mobile-menu-close');
const sidebar = document.getElementById('sidebar');

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
    });
}

if (mobileClose && sidebar) {
    mobileClose.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
    });
}

// Close sidebar on nav click (mobile)
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }
    });
});

function applyTheme(name) {
    document.body.classList.remove('theme-blue', 'theme-emerald');
    if (name === 'blue') document.body.classList.add('theme-blue');
    if (name === 'emerald') document.body.classList.add('theme-emerald');
    localStorage.setItem('stitch_theme', name);
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = localStorage.getItem('stitch_theme') || 'elite';
        const next = current === 'elite' ? 'blue' : current === 'blue' ? 'emerald' : 'elite';
        applyTheme(next);
    });
}
