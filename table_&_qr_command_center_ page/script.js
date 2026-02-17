const floors = {
  'Floor A': Array.from({ length: 9 }, (_, i) => ({ id: `A-${i + 1}`, seats: 4, status: 'free' })),
  'Floor B': Array.from({ length: 9 }, (_, i) => ({ id: `B-${i + 1}`, seats: 2, status: i % 3 === 0 ? 'occupied' : 'free' })),
  'Terrace': Array.from({ length: 9 }, (_, i) => ({ id: `T-${i + 1}`, seats: 6, status: i % 4 === 0 ? 'cleaning' : 'free' })),
};

let currentFloor = 'Floor A';
let selectedTable = null;

document.addEventListener('DOMContentLoaded', () => {
  renderTables();
  setupEvents();
});

function renderTables() {
  const grid = document.getElementById('table-grid');
  const tables = floors[currentFloor];
  grid.innerHTML = tables.map(t => `
    <button class="table-card ${selectedTable === t.id ? 'selected' : ''}" data-id="${t.id}">
      <div class="flex items-center justify-between">
        <span class="text-[12px] font-bold">${t.id}</span>
        <span class="text-[10px] font-bold ${statusColor(t.status)}">${t.status}</span>
      </div>
      <div class="text-[10px] opacity-60 mt-1">Seats: ${t.seats}</div>
    </button>
  `).join('');
  document.querySelectorAll('.table-card').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTable = btn.dataset.id;
      renderTables();
    });
  });
}

function statusColor(s) {
  if (s === 'occupied') return 'text-red-600';
  if (s === 'cleaning') return 'text-yellow-600';
  return 'text-green-600';
}

function setupEvents() {
  document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-active'));
      btn.classList.add('tab-active');
      currentFloor = btn.textContent.trim();
      selectedTable = null;
      renderTables();
    });
  });
  document.getElementById('refresh-qr').addEventListener('click', () => {
    const img = document.getElementById('qr-image');
    const url = new URL(img.src);
    url.searchParams.set('v', Math.random().toString(36).slice(2));
    img.src = url.toString();
  });
  document.getElementById('share-qr').addEventListener('click', async () => {
    const table = selectedTable || 'Unassigned';
    const shareData = { title: 'Stitch Café QR', text: `QR for ${table} on ${currentFloor}` };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      alert(`${shareData.title}\n${shareData.text}`);
    }
  });
  document.getElementById('save-qr').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = document.getElementById('qr-image').src;
    a.download = `stitch-qr-${currentFloor}-${selectedTable || 'unassigned'}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
  document.getElementById('zip-all').addEventListener('click', () => {
    alert('Preparing ZIP of all current floor QR codes...');
  });
  document.getElementById('new-table').addEventListener('click', () => {
    const tables = floors[currentFloor];
    const id = `${currentFloor.split(' ')[0][0]}-${tables.length + 1}`;
    tables.push({ id, seats: 4, status: 'free' });
    renderTables();
  });
}
