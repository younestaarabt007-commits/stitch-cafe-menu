const products = [
  { id: "toast_1", name: "Signature Benedict", description: "Poached eggs, hollandaise", price: 14.50, image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&h=600&q=80", category: "eggs" },
  { id: "toast_2", name: "Truffle Omelette", description: "Mushrooms, truffle oil", price: 12.50, image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&w=200&h=200&q=80", category: "eggs" },
  { id: "toast_3", name: "Shakshuka", description: "Tomato, peppers, eggs", price: 11.25, image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80", category: "eggs" },
  { id: "toast_4", name: "Avocado Toast", description: "Sourdough, smashed avo", price: 10.50, image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=600&q=80", category: "toast" },
  { id: "toast_5", name: "Classic Benedict", description: "Ham, hollandaise", price: 13.50, image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&h=600&q=80", category: "eggs" },
  { id: "toast_6", name: "Vegan Power Bowl", description: "Grains, greens", price: 12.00, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", category: "vegan" },
  { id: "toast_7", name: "Mediterranean", description: "Feta, olives, tomatoes", price: 11.00, image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&h=600&q=80", category: "eggs" },
  { id: "toast_8", name: "Steak & Eggs", description: "Grilled ribeye, sunny-side", price: 18.00, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", category: "eggs" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// Navigate to customization page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const name = product.name;
    const price = product.price;
    // Ensure we pass the price so the customization page knows the base price
    const url = `../toast_brunch_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
    window.location.href = url;
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
        btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 1000);
    }
}

function setupEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
      });
  }
  
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) searchBtn.addEventListener('click', () => alert('Search coming soon'));
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}
