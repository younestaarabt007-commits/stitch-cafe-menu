let itemName = 'Chef\'s Brunch';
let basePrice = 12.00;
let state = {
  eggs: 'poached',
  toast: 'sourdough',
  spice: 'none',
  extras: {},
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
  document.querySelectorAll('.chip[data-eggs]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-eggs]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.eggs = btn.dataset.eggs;
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-toast]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-toast]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.toast = btn.dataset.toast;
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-spice]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-spice]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.spice = btn.dataset.spice;
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-extra]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.extra;
      const price = parseFloat(btn.dataset.price || '0');
      if (btn.classList.contains('chip-active')) {
        btn.classList.remove('chip-active');
        delete state.extras[key];
      } else {
        btn.classList.add('chip-active');
        state.extras[key] = price;
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
    const extrasTotal = Object.values(state.extras).reduce((s, v) => s + v, 0);
    const unit = basePrice + extrasTotal;
    const order = {
      item: itemName,
      options: { eggs: state.eggs, toast: state.toast, spice: state.spice, extras: Object.keys(state.extras) },
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
  const extrasTotal = Object.values(state.extras).reduce((s, v) => s + v, 0);
  const unit = basePrice + extrasTotal;
  document.getElementById('summary-text').textContent =
    `${capitalize(state.eggs)} • ${capitalize(state.toast)} • ${capitalize(state.spice)}`;
  document.getElementById('total-price').textContent = `${(unit * state.qty).toFixed(2)}DH`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
