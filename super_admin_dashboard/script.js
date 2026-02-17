// Merchant Management Logic
let allMerchants = [];

async function loadMerchants() {
    const tbody = document.getElementById('merchant-list-body');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center py-10"><span class="animate-spin material-symbols-outlined text-primary text-4xl">sync</span></td></tr>';
    
    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch('http://localhost:3000/api/v1/admin/merchants', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        
        if (result.success) {
            allMerchants = result.data;
            renderMerchants(allMerchants);
        }
    } catch (e) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-10 text-red-500 font-bold">Failed to load merchants.</td></tr>';
    }
}

function renderMerchants(merchants) {
    const tbody = document.getElementById('merchant-list-body');
    tbody.innerHTML = merchants.map(m => `
        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors">
            <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                        ${m.name.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <p class="font-bold">${m.name}</p>
                        <p class="text-xs text-gray-400 font-medium">Tenant ID: ${m.id.substring(0,8)}...</p>
                    </div>
                </div>
            </td>
            <td class="px-8 py-5">
                <span class="px-3 py-1 ${m.is_active ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} text-[10px] font-bold rounded-full">
                    ${m.is_active ? 'Active' : 'Suspended'}
                </span>
            </td>
            <td class="px-8 py-5 text-xs font-medium text-gray-500">
                ${new Date(m.created_at).toLocaleDateString()}
            </td>
            <td class="px-8 py-5 text-right">
                <div class="flex justify-end gap-2">
                    <button onclick="toggleMerchantStatus('${m.id}', ${m.is_active})" class="p-2 hover:bg-orange-50 dark:hover:bg-orange-950/10 rounded-lg transition-all" title="${m.is_active ? 'Suspend' : 'Activate'}">
                        <span class="material-symbols-outlined ${m.is_active ? 'text-orange-500' : 'text-green-500'}">${m.is_active ? 'block' : 'check_circle'}</span>
                    </button>
                    <button onclick="deleteMerchant('${m.id}')" class="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all text-red-500" title="Delete Permanent">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.toggleMerchantStatus = async (id, currentStatus) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'SUSPEND' : 'ACTIVATE'} this merchant?`)) return;
    
    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`http://localhost:3000/api/v1/admin/merchants/${id}/status`, {
            method: 'PATCH',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_active: !currentStatus })
        });
        
        if (res.ok) {
            loadMerchants();
        }
    } catch (e) {
        alert('Action failed');
    }
};

window.deleteMerchant = async (id) => {
    if (!confirm('CRITICAL: This will permanently delete ALL data for this merchant. This cannot be undone. Proceed?')) return;
    
    try {
        const token = localStorage.getItem('stitch_token');
        const res = await fetch(`http://localhost:3000/api/v1/admin/merchants/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            loadMerchants();
        }
    } catch (e) {
        alert('Delete failed');
    }
};

// Search Filter
document.getElementById('merchant-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = allMerchants.filter(m => m.name.toLowerCase().includes(q));
    renderMerchants(filtered);
});

// Session Check
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('stitch_token');
    const role = localStorage.getItem('stitch_role');
    if (!token || role !== 'SUPER_ADMIN') {
        window.location.href = '../auth_login_page/index.html';
        return;
    }
    const savedTheme = localStorage.getItem('stitch_theme') || 'elite';
    applyTheme(savedTheme);
});

// Tab Switching Logic
const navButtons = document.querySelectorAll('#main-nav button');
const tabContents = document.querySelectorAll('.tab-content');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update Nav UI
        navButtons.forEach(b => {
            b.classList.remove('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
            b.classList.add('text-gray-500');
        });
        btn.classList.add('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        btn.classList.remove('text-gray-500');

        // Show/Hide Content
        tabContents.forEach(content => {
            if (content.id === `${tabId}-content`) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });

        if (tabId === 'merchants') {
            loadMerchants();
        }

        // Update Header Title
        const titles = {
            overview: 'Platform Overview',
            merchants: 'Merchant Management',
            payments: 'Financial Overview',
            accounts: 'Administrative Accounts'
        };
        document.querySelector('header h2').textContent = titles[tabId];
    });
});

// Modal Logic
function editMerchant(name) {
    document.getElementById('edit-merchant-name').value = name;
    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('edit-modal');
    if (event.target == modal) {
        closeModal();
    }
}

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

// Logout logic
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('stitch_token');
    localStorage.removeItem('stitch_role');
    localStorage.removeItem('stitch_user');
    window.location.href = '../auth_login_page/index.html';
});
