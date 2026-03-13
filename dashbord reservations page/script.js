
// --- STATE ---
let reservations = JSON.parse(localStorage.getItem('stitch_reservations')) || [];
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

// --- RESERVATIONS TAB ---
function loadReservationsTab() {
    renderReservationList();
}

function renderReservationList() {
    const container = document.getElementById('reservation-list');
    const emptyState = document.getElementById('reservation-empty');
    if (!container || !emptyState) return;

    if (reservations.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = reservations.map((res, index) => `
        <div class="bg-white dark:bg-[#2a1e19] p-5 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-between reservation-card">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-500 font-black">
                    ${res.tableId}
                </div>
                <div>
                    <h5 class="font-bold">${res.clientName}</h5>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${res.date} • ${res.time}</p>
                </div>
            </div>
            <button onclick="deleteReservation(${index})" class="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `).join('');
}

window.openReservationModal = () => {
    // Populate table select
    const select = document.getElementById('res-table-id');
    if (select) {
        const allTables = [];
        Object.keys(TABLE_DATA).forEach(floor => {
            TABLE_DATA[floor].forEach(t => allTables.push(t.id));
        });
        select.innerHTML = allTables.map(id => `<option value="${id}">${id}</option>`).join('');
    }

    // Set default date to today
    const dateInput = document.getElementById('res-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    document.getElementById('reservation-modal').classList.remove('hidden');
};

window.closeReservationModal = () => {
    document.getElementById('reservation-modal').classList.add('hidden');
};

window.saveReservation = () => {
    const clientName = document.getElementById('res-client-name').value;
    const tableId = document.getElementById('res-table-id').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;

    if (!clientName || !tableId || !date || !time) {
        alert("Please fill all fields");
        return;
    }

    reservations.push({ clientName, tableId, date, time });
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
    closeReservationModal();
};

window.deleteReservation = (index) => {
    reservations.splice(index, 1);
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
};

document.addEventListener('DOMContentLoaded', () => {
    loadReservationsTab();
});
