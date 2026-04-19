document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const n = params.get('name');
  const image = params.get('image');
  const p = parseFloat(params.get('price') || '');

  const basePrice = Number.isNaN(p) ? 5.00 : p;
  let currentQuantity = 1;
  let currentPackPrice = 0;
  let currentExtrasPrice = 0;

  if (n) {
    const titleEl = document.getElementById('product-title');
    if (titleEl) titleEl.textContent = decodeURIComponent(n);
  }

  if (image) {
    const hero = document.getElementById('hero-image');
    if (hero) {
      hero.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.5), transparent), url('${decodeURIComponent(image)}')`;
    }
  }

  // Elements
  const qtyDisplay = document.getElementById('qty-display');
  const totalPriceElement = document.getElementById('total-price');
  const packOptions = document.querySelectorAll('.pack-option');
  const extraOptions = document.querySelectorAll('.extra-option');

  // Back button
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      history.back();
    });
  }

  // Pack Selection
  packOptions.forEach(option => {
    option.addEventListener('click', () => {
      packOptions.forEach(opt => {
        const isSelected = (opt === option);
        if (isSelected) {
          opt.className = "relative p-3 rounded-lg border-2 border-primary bg-primary/5 dark:bg-primary/10 flex flex-col gap-1 cursor-pointer pack-option";
        } else {
          opt.className = "relative p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer pack-option";
        }
      });

      currentPackPrice = parseFloat(option.dataset.price);
      updateTotal();
    });
  });

  // Extras selection
  extraOptions.forEach(option => {
    option.addEventListener('click', () => {
      const isSelected = option.classList.contains('border-primary/20');

      if (isSelected) {
        // Deselect
        option.classList.remove('border-primary/20', 'bg-background-light', 'dark:bg-zinc-900');
        option.classList.add('border-[#e8d9ce]', 'dark:border-zinc-800');
        const checkmarkContainer = option.querySelector('.h-6.w-6');
        if (checkmarkContainer) {
          checkmarkContainer.className = 'h-6 w-6 rounded-full border-2 border-[#e8d9ce] dark:border-zinc-700';
          checkmarkContainer.innerHTML = '';
        }
      } else {
        // Select
        option.classList.remove('border-[#e8d9ce]', 'dark:border-zinc-800');
        option.classList.add('border-primary/20', 'bg-background-light', 'dark:bg-zinc-900');
        const checkmarkContainer = option.querySelector('.h-6.w-6');
        if (checkmarkContainer) {
          checkmarkContainer.className = 'h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white';
          checkmarkContainer.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
        }
      }

      calculateExtrasPrice();
      updateTotal();
    });
  });

  function calculateExtrasPrice() {
    currentExtrasPrice = 0;
    extraOptions.forEach(option => {
      if (option.classList.contains('border-primary/20')) {
        currentExtrasPrice += parseFloat(option.dataset.price);
      }
    });
  }

  // Quantity
  const decreaseBtn = document.getElementById('qty-minus');
  const increaseBtn = document.getElementById('qty-plus');

  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        qtyDisplay.textContent = currentQuantity;
        updateTotal();
      }
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener('click', () => {
      currentQuantity++;
      qtyDisplay.textContent = currentQuantity;
      updateTotal();
    });
  }

  function updateTotal() {
    const total = (basePrice + currentPackPrice + currentExtrasPrice) * currentQuantity;
    totalPriceElement.textContent = total.toFixed(2) + 'DH';
  }

  // Add to Order
  const addToOrderBtn = document.getElementById('add-to-order-btn');
  if (addToOrderBtn) {
    addToOrderBtn.addEventListener('click', () => {
      const finalName = decodeURIComponent(n || 'Sweet Pastry');
      const item = {
        id: 'pastry-' + Date.now(),
        name: finalName,
        price: (basePrice + currentPackPrice + currentExtrasPrice),
        quantity: currentQuantity,
        image: decodeURIComponent(image || ''),
        options: []
      };

      // Get pack
      packOptions.forEach(option => {
        if (option.classList.contains('border-primary')) {
          item.options.push({ name: 'Pack: ' + option.dataset.name, price: parseFloat(option.dataset.price) });
        }
      });

      // Get selected extras
      extraOptions.forEach(option => {
        if (option.classList.contains('border-primary/20')) {
          item.options.push({ name: option.dataset.name, price: parseFloat(option.dataset.price) });
        }
      });

      // Save
      const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
      cart.push(item);
      localStorage.setItem('stitch_cart', JSON.stringify(cart));

      if (window.updateGlobalCartCount) window.updateGlobalCartCount();

      // Feedback
      const originalContent = addToOrderBtn.innerHTML;
      addToOrderBtn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> ADDED';
      addToOrderBtn.style.backgroundColor = '#10b981';

      setTimeout(() => {
        addToOrderBtn.innerHTML = originalContent;
        addToOrderBtn.style.backgroundColor = '';
        history.back();
      }, 1000);
    });
  }

  updateTotal();
});
