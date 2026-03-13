
// --- STATE ---
const DEFAULT_TABLE_DATA = {
    "Floor A": [
        { id: "A-1", status: "Available", seats: 4 },
        { id: "A-2", status: "Available", seats: 4 },
        { id: "A-3", status: "Available", seats: 2 },
        { id: "A-4", status: "Occupied", seats: 6 },
        { id: "A-5", status: "Available", seats: 4 },
        { id: "A-6", status: "Available", seats: 4 },
    ],
    "Floor B": [
        { id: "B-1", status: "Available", seats: 4 },
        { id: "B-2", status: "Available", seats: 4 },
        { id: "B-3", status: "Available", seats: 4 },
    ],
    "Terrace": [
        { id: "T-1", status: "Available", seats: 2 },
        { id: "T-2", status: "Available", seats: 2 },
        { id: "T-3", status: "Available", seats: 4 },
    ]
};

let TABLE_DATA = JSON.parse(localStorage.getItem('stitch_tables')) || DEFAULT_TABLE_DATA;
let reservations = JSON.parse(localStorage.getItem('stitch_reservations')) || [];
let qrPrintSize = 'small'; // small, medium, large
let qrSelectedTables = []; // Array of table IDs
let currentQRFloor = "Floor A";
let currentViewedTable = null; // Object {id, floor}

function saveTableData() {
    localStorage.setItem('stitch_tables', JSON.stringify(TABLE_DATA));
}

function loadQRTab() {
    renderQRFloors();
    renderTableGrid(currentQRFloor);
    updateQRSelectionPanel();
}

function renderQRFloors() {
    const container = document.getElementById('qr-floors');
    if (!container) return;
    const floors = Object.keys(TABLE_DATA);
    container.innerHTML = floors.map(floor => `
        <button onclick="switchQRFloor('${floor}')" class="floor-btn px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm transition-all ${floor === currentQRFloor ? 'bg-primary text-white' : 'bg-white dark:bg-zinc-800 border border-accent-grey dark:border-white/5 text-industrial-slate dark:text-zinc-300'}">
            ${floor}
        </button>
    `).join('');
}

window.switchQRFloor = (floor) => {
    currentQRFloor = floor;
    renderQRFloors();
    renderTableGrid(floor);
};

function renderTableGrid(floor) {
    const grid = document.getElementById('qr-table-grid');
    if (!grid) return;
    const tables = TABLE_DATA[floor] || [];

    grid.innerHTML = tables.map(t => {
        const isSelected = qrSelectedTables.includes(t.id);
        const isReserved = reservations.some(r => r.tableId === t.id);
        const status = isReserved ? 'Reserved' : t.status;
        const statusColor = status === 'Available' ? 'text-green-500' : status === 'Reserved' ? 'text-purple-500' : 'text-primary';
        const bgOpacity = status === 'Available' ? 'bg-green-500/5' : status === 'Reserved' ? 'bg-purple-500/5' : 'bg-primary/5';

        return `
            <div class="relative group">
                <button onclick="viewTable('${t.id}', '${floor}')" class="w-full text-left p-4 sm:p-5 rounded-[2rem] border-2 transition-all pos-card btn-white shadow-soft ${currentViewedTable?.id === t.id ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-[#2a1e19] hover:border-gray-200'}">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-black">${t.id}</span>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full ${bgOpacity}">
                            <span class="w-1.5 h-1.5 rounded-full ${statusColor.replace('text', 'bg')} animate-pulse"></span>
                            <span class="text-[9px] font-black uppercase tracking-widest ${statusColor}">${t.status}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400">
                        <span class="material-symbols-outlined text-sm">person</span>
                        <span class="text-[10px] font-bold">Seats: ${t.seats}</span>
                    </div>
                </button>
                <!-- Selection Checkbox -->
                <div class="absolute top-3 right-3 z-10">
                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleTableSelection('${t.id}')" class="w-5 h-5 rounded-lg border-2 border-slate-200 text-primary focus:ring-primary cursor-pointer transition-all">
                </div>
            </div>
        `;
    }).join('');
}

window.toggleTableSelection = (id) => {
    const idx = qrSelectedTables.indexOf(id);
    if (idx > -1) qrSelectedTables.splice(idx, 1);
    else qrSelectedTables.push(id);

    updateQRBulkActions();
    renderTableGrid(currentQRFloor);
};

function updateQRBulkActions() {
    const bar = document.getElementById('qr-bulk-actions');
    const text = document.getElementById('selected-count-text');
    if (!bar || !text) return;

    if (qrSelectedTables.length > 0) {
        bar.classList.remove('hidden');
        text.textContent = `${qrSelectedTables.length} Table${qrSelectedTables.length > 1 ? 's' : ''} Selected`;
    } else {
        bar.classList.add('hidden');
    }
}

function updateQRSelectionPanel() {
    const noSel = document.getElementById('qr-no-selection');
    const activeSel = document.getElementById('qr-active-selection');
    if (!noSel || !activeSel) return;

    if (!currentViewedTable) {
        noSel.classList.remove('hidden');
        activeSel.classList.add('hidden');
    } else {
        noSel.classList.add('hidden');
        activeSel.classList.remove('hidden');

        const table = TABLE_DATA[currentViewedTable.floor].find(t => t.id === currentViewedTable.id);
        document.getElementById('qr-sel-id').textContent = `Table ${table.id}`;
        document.getElementById('qr-sel-area').textContent = currentViewedTable.floor;

        // Update status buttons
        document.querySelectorAll('.status-toggle-btn').forEach(btn => {
            const isMatch = btn.dataset.status === table.status;
            btn.classList.toggle('bg-primary', isMatch && table.status === 'Occupied');
            btn.classList.toggle('bg-green-500', isMatch && table.status === 'Available');
            btn.classList.toggle('text-white', isMatch);
            btn.classList.toggle('border-transparent', isMatch);
        });

        // Update size buttons
        document.querySelectorAll('.size-option-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === qrPrintSize);
            btn.classList.toggle('bg-primary', btn.dataset.size === qrPrintSize);
            btn.classList.toggle('text-white', btn.dataset.size === qrPrintSize);
        });

        generateQRPreview(table.id);
    }
}

window.viewTable = (id, floor) => {
    currentViewedTable = { id, floor };
    renderTableGrid(floor);
    updateQRSelectionPanel();
};

window.setTableStatus = (status) => {
    if (!currentViewedTable) return;
    const table = TABLE_DATA[currentViewedTable.floor].find(t => t.id === currentViewedTable.id);
    if (table) {
        table.status = status;
        saveTableData();
        renderTableGrid(currentViewedTable.floor);
        updateQRSelectionPanel();
    }
};

window.setPrintSize = (size) => {
    qrPrintSize = size;
    updateQRSelectionPanel();
};

function generateQRPreview(tableId) {
    const container = document.getElementById('qr-preview-canvas');
    if (!container) return;
    container.innerHTML = '';

    const url = `${window.location.origin}/swiggy-style_elite_main_menu_390x2500/index.html?table=${tableId}`;

    // Create a temporary div for QRCode.js to render into
    const tempDiv = document.createElement('div');
    new QRCode(tempDiv, {
        text: url,
        width: 300,
        height: 300,
        colorDark: "#FF6B00", // Stitch Primary Orange
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Wait for the QR to generate then draw on canvas with styling
    setTimeout(() => {
        const qrImg = tempDiv.querySelector('img');
        if (!qrImg) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        // 1. Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 400, 400);

        // 2. Border
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#FF6B00';
        ctx.strokeRect(5, 5, 390, 390);

        // 3. Draw QR
        ctx.drawImage(qrImg, 50, 50, 300, 300);

        // 4. Add "Stitch" Text at bottom
        ctx.fillStyle = '#FF6B00';
        ctx.font = 'bold 24px "Instrument Serif", serif';
        ctx.textAlign = 'center';
        ctx.fillText('STITCH CAFÉ', 200, 385);

        container.appendChild(canvas);
        canvas.id = "stylized-qr-canvas";
    }, 50);
}

window.refreshCurrentQR = () => {
    if (currentViewedTable) generateQRPreview(currentViewedTable.id);
};

window.printCurrentQR = () => {
    if (!currentViewedTable) return;

    const sourceCanvas = document.getElementById('stylized-qr-canvas');
    if (!sourceCanvas) return;

    const printSection = document.getElementById('print-section');
    printSection.innerHTML = '';

    const printCanvas = document.createElement('canvas');
    const pctx = printCanvas.getContext('2d');

    // Size Mapping (roughly mapping mm to px at 96dpi)
    const sizes = {
        small: { w: 320, h: 210 }, // Card (~85x55mm)
        medium: { w: 450, h: 450 }, // ~120x120mm
        large: { w: 750, h: 750 }   // ~200x200mm
    };

    const target = sizes[qrPrintSize] || sizes.small;
    printCanvas.width = target.w;
    printCanvas.height = target.h;

    // Draw background white
    pctx.fillStyle = '#ffffff';
    pctx.fillRect(0, 0, target.w, target.h);

    if (qrPrintSize === 'small') {
        // Card layout: QR on left, Text on right
        pctx.drawImage(sourceCanvas, 10, 10, 190, 190);
        pctx.fillStyle = '#FF6B00';
        pctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        pctx.fillText('STITCH', 210, 50);
        pctx.font = '12px "Plus Jakarta Sans", sans-serif';
        pctx.fillStyle = '#666';
        pctx.fillText(`TABLE ${currentViewedTable.id}`, 210, 80);
        pctx.fillText('Scan to Order', 210, 100);
    } else {
        // Square layout: Center QR
        const qrSize = target.w * 0.8;
        const offset = (target.w - qrSize) / 2;
        pctx.drawImage(sourceCanvas, offset, offset, qrSize, qrSize);
    }

    printSection.appendChild(printCanvas);
    printSection.classList.remove('hidden');
    window.print();
    printSection.classList.add('hidden');
};

window.shareCurrentQR = () => {
    if (!currentViewedTable) return;
    const url = `${window.location.origin}/swiggy-style_elite_main_menu_390x2500/index.html?table=${currentViewedTable.id}`;
    if (navigator.share) {
        navigator.share({ title: `Order from Table ${currentViewedTable.id}`, url });
    } else {
        alert(`Link copied: ${url}`);
    }
};

window.downloadSelectedQRs = () => {
    if (qrSelectedTables.length === 0) return;

    alert(`⚡ Generating ${qrSelectedTables.length} QR codes for download...`);

    // In a real app, we'd loop through selected tables, 
    // generate canvases, and trigger downloads or a ZIP.
    // For demo: simulation
    setTimeout(() => {
        alert("✅ Download ready! (Simulated)");
        qrSelectedTables = [];
        updateQRBulkActions();
        renderTableGrid(currentQRFloor);
    }, 1500);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadQRTab();
});
