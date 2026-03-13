// ============================================================
// STITCH — Shop & Menu Hub Script
// Handles: category filters, live/off toggles, add-item modal,
// shop open/closed toggle, user profile from localStorage.
// All state is namespaced to 'stitch_menu_*' in localStorage.
// ============================================================

// --- DEMO DATA (used until real API is connected) ---
const MENU_ITEMS = [
    { id: 'm1', category: 'Espresso', name: 'Oat Milk Latte', desc: 'House blend, Oatly milk', price: 28, live: true, img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=200&q=80' },
    { id: 'm2', category: 'Espresso', name: 'Truffle Scramble', desc: 'Organic eggs, black truffle', price: 120, live: false, img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=200&q=80' },
    { id: 'm3', category: 'Espresso', name: 'Cortado', desc: 'Equal parts espresso & milk', price: 22, live: true, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=80' },
    { id: 'm4', category: 'Brunch', name: 'Avocado Toast', desc: 'Sourdough, smashed avocado', price: 45, live: true, img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=200&q=80' },
    { id: 'm5', category: 'Pastries', name: 'Butter Croissant', desc: 'Fresh baked, flaky butter', price: 18, live: true, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80' },
    { id: 'm6', category: 'Pastries', name: 'Pain au Chocolat', desc: 'Dark chocolate, light dough', price: 20, live: false, img: 'https://images.unsplash.com/photo-1586444248879-bc604bc77f90?w=200&q=80' },
];

let activeCategory = 'All Items';
let shopOpen = JSON.parse(localStorage.getItem('stitch_menu_shopOpen') ?? 'true');

// Load persisted live-state overrides
const liveStateOverrides = JSON.parse(localStorage.getItem('stitch_menu_liveStates') || '{}');
MENU_ITEMS.forEach(item => {
    if (liveStateOverrides[item.id] !== undefined) item.live = liveStateOverrides[item.id];
});

// --- SHOP OPEN/CLOSED TOGGLE ---
function initShopToggle() {
    const toggle = document.querySelector('input[type="checkbox"]');
    const statusText = document.querySelector('.p-4 p.text-zinc-500');
    if (!toggle) return;

    toggle.checked = shopOpen;
    if (statusText) statusText.textContent = shopOpen ? 'Accepting orders right now' : 'Shop is currently closed';

    toggle.addEventListener('change', () => {
        shopOpen = toggle.checked;
        localStorage.setItem('stitch_menu_shopOpen', JSON.stringify(shopOpen));
        if (statusText) statusText.textContent = shopOpen ? 'Accepting orders right now' : 'Shop is currently closed';
    });
}

// --- CATEGORY FILTER ---
function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('.flex.gap-2.p-4 button, .flex.gap-6 a');
    filterBtns.forEach(btn => {
        const label = btn.textContent.trim();
        if (!label) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            activeCategory = label;
            renderMenu();
            // Highlight active
            filterBtns.forEach(b => {
                const isActive = b.textContent.trim() === label;
                b.classList.toggle('bg-charcoal', isActive);
                b.classList.toggle('text-white', isActive);
                b.classList.toggle('bg-white', !isActive);
            });
        });
    });
}

// --- RENDER MENU ITEMS ---
function renderMenu() {
    const container = document.querySelector('.w-full.space-y-0.divide-y');
    if (!container) return;

    // Group by category
    const categories = activeCategory === 'All Items'
        ? [...new Set(MENU_ITEMS.map(i => i.category))]
        : [activeCategory];

    const itemsToShow = MENU_ITEMS.filter(i => activeCategory === 'All Items' || i.category === activeCategory);

    if (itemsToShow.length === 0) {
        container.innerHTML = '<div class="text-center py-10 text-zinc-400 text-sm font-bold uppercase tracking-widest">No items in this category</div>';
        return;
    }

    let html = '';
    categories.forEach(cat => {
        const catItems = itemsToShow.filter(i => i.category === cat);
        if (catItems.length === 0) return;

        html += `
        <div class="flex items-center justify-between px-4 py-3 bg-roastery-bg border-b border-border-light">
            <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-400">${cat}</h3>
            <button onclick="showAddItemModal('${cat}')" class="text-emerald text-sm font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-base">add_circle</span> Add Item
            </button>
        </div>`;

        catItems.forEach(item => {
            html += `
            <div class="flex items-center gap-4 ${item.live ? 'bg-white' : 'bg-white/60 opacity-75'} p-4 w-full border-b border-border-light transition-all" id="item-row-${item.id}">
                <div class="size-20 rounded-lg bg-cover bg-center flex-shrink-0 border border-border-light shadow-inner ${item.live ? '' : 'grayscale opacity-50'}"
                     style="background-image: url('${item.img}')"></div>
                <div class="flex-1 min-w-0">
                    <h4 class="${item.live ? 'text-charcoal' : 'text-zinc-400'} text-lg font-bold leading-tight truncate">${item.name}</h4>
                    <p class="text-zinc-500 text-xs mt-0.5">${item.desc}</p>
                    <p class="${item.live ? 'text-charcoal' : 'text-zinc-400'} font-extrabold text-base mt-1">${item.price} DH</p>
                </div>
                <div class="flex flex-col items-center gap-1.5 pl-2 border-l border-soft-gray">
                    <label class="relative inline-flex items-center cursor-pointer scale-90">
                        <input type="checkbox" class="sr-only peer item-toggle" data-id="${item.id}" ${item.live ? 'checked' : ''}>
                        <div class="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald"></div>
                    </label>
                    <span class="text-[9px] font-extrabold ${item.live ? 'text-zinc-400' : 'text-red-500'} tracking-tighter item-label-${item.id}">${item.live ? 'LIVE' : 'OFF'}</span>
                </div>
            </div>`;
        });
    });

    container.innerHTML = html;

    // Bind toggle events
    document.querySelectorAll('.item-toggle').forEach(toggle => {
        toggle.addEventListener('change', () => {
            const id = toggle.dataset.id;
            const item = MENU_ITEMS.find(i => i.id === id);
            if (!item) return;
            item.live = toggle.checked;

            // Persist override
            liveStateOverrides[id] = item.live;
            localStorage.setItem('stitch_menu_liveStates', JSON.stringify(liveStateOverrides));

            // Re-render just this row
            renderMenu();
        });
    });
}

// --- ADD ITEM MODAL ---
function showAddItemModal(defaultCategory = 'Espresso') {
    // If modal doesn't exist yet, create it
    if (!document.getElementById('add-item-modal')) {
        const modal = document.createElement('div');
        modal.id = 'add-item-modal';
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-bold text-charcoal">Add Menu Item</h3>
                    <button onclick="hideAddItemModal()" class="p-2 hover:bg-soft-gray rounded-xl transition-all">
                        <span class="material-symbols-outlined text-zinc-400">close</span>
                    </button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Name</label>
                        <input id="new-item-name" type="text" class="w-full mt-1 px-4 py-3 bg-soft-gray rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-emerald outline-none" placeholder="e.g. Iced Matcha Latte">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Price (DH)</label>
                            <input id="new-item-price" type="number" step="0.5" class="w-full mt-1 px-4 py-3 bg-soft-gray rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-emerald outline-none" placeholder="28">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Category</label>
                            <select id="new-item-category" class="w-full mt-1 px-4 py-3 bg-soft-gray rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-emerald outline-none">
                                <option ${defaultCategory === 'Espresso' ? 'selected' : ''}>Espresso</option>
                                <option ${defaultCategory === 'Brunch' ? 'selected' : ''}>Brunch</option>
                                <option ${defaultCategory === 'Pastries' ? 'selected' : ''}>Pastries</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Description (optional)</label>
                        <input id="new-item-desc" type="text" class="w-full mt-1 px-4 py-3 bg-soft-gray rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-emerald outline-none" placeholder="Ingredients / notes">
                    </div>
                    <button onclick="saveNewItem()" class="w-full mt-2 py-4 bg-charcoal text-white font-bold rounded-2xl hover:bg-black transition-all">
                        Save Item
                    </button>
                </div>
            </div>`;
        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideAddItemModal();
        });
    } else {
        document.getElementById('add-item-modal').classList.remove('hidden');
        document.getElementById('new-item-category').value = defaultCategory;
    }
}

window.showAddItemModal = showAddItemModal;

window.hideAddItemModal = () => {
    document.getElementById('add-item-modal')?.classList.add('hidden');
};

window.saveNewItem = () => {
    const name = document.getElementById('new-item-name')?.value?.trim();
    const price = parseFloat(document.getElementById('new-item-price')?.value);
    const category = document.getElementById('new-item-category')?.value;
    const desc = document.getElementById('new-item-desc')?.value?.trim() || '';

    if (!name || isNaN(price)) {
        alert('Please enter a name and price.');
        return;
    }

    const newItem = {
        id: 'local-' + Date.now(),
        category, name, desc, price, live: true,
        img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=200&q=80'
    };
    MENU_ITEMS.push(newItem);
    hideAddItemModal();
    renderMenu();
};

// --- USER PROFILE ---
function initUserProfile() {
    const user = JSON.parse(localStorage.getItem('stitch_user') || '{}');
    if (user.name || user.email) {
        const el = document.getElementById('user-profile-info');
        if (el) {
            el.innerHTML = `
                <p class="text-sm font-bold">${user.name || 'Merchant Admin'}</p>
                <p class="text-xs text-gray-500">${user.email || 'admin@stitch.com'}</p>`;
        }
    }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initShopToggle();
    initCategoryFilter();
    initUserProfile();
    renderMenu();
    console.info('[Stitch] Menu Management Hub loaded.');
});
