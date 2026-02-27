let state = {
  size: { label: 'medium', price: 7.00 },
  milk: { label: 'whole', extra: 0.00 },
  sweet: 50,
  qty: 1
};
let itemName = 'Kyoto Matcha Latte';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const n = params.get('name');
  if (n) {
    itemName = n;
    const titleEl = document.getElementById('product-title');
    if (titleEl) titleEl.textContent = itemName;
  }

  const imgUrl = params.get('image');
  if (imgUrl) {
    const heroEl = document.querySelector('.tea-cust-hero');
    if (heroEl) {
      heroEl.style.backgroundImage = `url('${imgUrl}')`;
      heroEl.style.backgroundSize = 'cover';
      heroEl.style.backgroundPosition = 'center';
      heroEl.style.position = 'relative';
      // Add overlay since we're removing the CSS gradients
      if (!heroEl.querySelector('.hero-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'hero-overlay absolute inset-0 bg-black/40';
        heroEl.appendChild(overlay);
      }
    }
  }

  setupEvents();
  updateSummary();
});

function setupEvents() {
  document.getElementById('back-btn').addEventListener('click', () => window.history.back());
  document.querySelectorAll('.chip[data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-size]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.size = { label: btn.dataset.size, price: parseFloat(btn.dataset.price) };
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-milk]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-milk]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.milk = { label: btn.dataset.milk, extra: parseFloat(btn.dataset.extra) };
      updateSummary();
    });
  });
  document.querySelectorAll('.chip[data-sweet]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-sweet]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      state.sweet = parseInt(btn.dataset.sweet, 10);
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
    const order = {
      item: itemName,
      size: state.size.label,
      milk: state.milk.label,
      sweet: state.sweet,
      qty: state.qty,
      unit_price: (state.size.price + state.milk.extra),
      total: (state.size.price + state.milk.extra) * state.qty,
      time: new Date().toISOString()
    };
    try {
      localStorage.setItem('stitch_last_order', JSON.stringify(order));
    } catch { }
    window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
  });
}

function updateSummary() {
  const price = (state.size.price + state.milk.extra) * state.qty;
  document.getElementById('summary-text').textContent =
    `${capitalize(state.size.label)} • ${capitalize(state.milk.label)} • ${state.sweet}%`;
  document.getElementById('total-price').textContent = `${price.toFixed(2)}DH`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
