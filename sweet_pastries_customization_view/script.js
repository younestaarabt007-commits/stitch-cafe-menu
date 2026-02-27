let itemName = 'Pastry Selection';
let basePrice = 5.00;
let state = {
  box: { label: 'single', add: 0 },
  warm: { label: 'no', add: 0 },
  toppings: {},
  qty: 1
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const n = params.get('name');
  const p = parseFloat(params.get('price') || '');
  const image = params.get('image');

  if (n) {
    itemName = n;
    const titleEl = document.getElementById('product-title');
    if (titleEl) titleEl.textContent = itemName;
  }
  if (!Number.isNaN(p)) basePrice = p;

  if (image) {
    const hero = document.querySelector('.hero-gradient');
    if (hero) {
      hero.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('${decodeURIComponent(image)}')`;
    }
  }

  setupEvents();
  updateSummary();
});

function setupEvents() {
  document.getElementById('back-btn').addEventListener('click', () => window.history.back());
  document.querySelectorAll('.chip[data-box]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-box]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.box = { label: btn.dataset.box, add: parseFloat(btn.dataset.price || '0') };
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-warm]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-warm]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.warm = { label: btn.dataset.warm, add: parseFloat(btn.dataset.extra || '0') };
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-top]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.top;
      const price = parseFloat(btn.dataset.price || '0');
      if (btn.classList.contains('chip-active')) {
        btn.classList.remove('chip-active');
        delete state.toppings[key];
      } else {
        btn.classList.add('chip-active');
        state.toppings[key] = price;
      }
      updateSummary();
    });
  });
  document.getElementById('inc-qty').addEventListener('click', () => {
    state.qty += 1;
    document.getElementById('qty').textContent = state.qty;
    updateSummary();
  });
  document.getElementById('dec-qty').addEventListener('click', () => {
    state.qty = Math.max(1, state.qty - 1);
    document.getElementById('qty').textContent = state.qty;
    updateSummary();
  });
  document.getElementById('add-btn').addEventListener('click', () => {
    const topsTotal = Object.values(state.toppings).reduce((s, v) => s + v, 0);
    const unit = basePrice + state.box.add + state.warm.add + topsTotal;
    const order = {
      item: itemName,
      options: { box: state.box.label, warm: state.warm.label, toppings: Object.keys(state.toppings) },
      qty: state.qty,
      unit_price: unit,
      total: unit * state.qty,
      time: new Date().toISOString()
    };
    try {
      localStorage.setItem('stitch_last_order', JSON.stringify(order));
    } catch { }
    window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
  });
}

function updateSummary() {
  const topsTotal = Object.values(state.toppings).reduce((s, v) => s + v, 0);
  const unit = basePrice + state.box.add + state.warm.add + topsTotal;
  const tops = Object.keys(state.toppings);
  document.getElementById('summary-text').textContent =
    `${capitalize(state.box.label)} • ${state.warm.label === 'yes' ? 'Warm' : 'No Warm'} • ${tops.length ? tops.map(capitalize).join(', ') : '—'}`;
  document.getElementById('total-price').textContent = `${(unit * state.qty).toFixed(2)}DH`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
