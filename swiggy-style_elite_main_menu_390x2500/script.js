
function apiBase() {
  try {
    return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || 'http://localhost:3000';
  } catch {
    return 'http://localhost:3000';
  }
}

let bestsellers = [];
let cart = [];

// Consolidated Product Data from all sub-categories
const sampleMenu = [
  // Brunch (New)
  { id: 'brunch-1', name: "Farm Omelette", description: "Organic eggs, cheddar, fresh herbs.", price: 12.50, image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-2', name: "Eggs Benedict", description: "English muffin, bacon, hollandaise sauce.", price: 16.00, image: "assets/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", category: "Brunch" },
  { id: 'brunch-3', name: "Spicy Shakshuka", description: "Poached eggs in hearty spicy tomato sauce.", price: 15.50, image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-4', name: "Garden Skillet", description: "Roasted potatoes, kale, peppers.", price: 14.50, image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-5', name: "Brunch Burrito", description: "Chorizo, scrambled eggs, beans.", price: 13.00, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-6', name: "Steak & Eggs", description: "6oz sirloin, two eggs any style.", price: 19.50, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-7', name: "Fit Egg-White", description: "Spinach, goat cheese, egg whites.", price: 13.50, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-8', name: "Brunch Tacos", description: "Corn tortillas, pickled onions, avocado.", price: 11.00, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-9', name: "Iron Frittata", description: "Onions, potatoes, aged cheddar.", price: 14.75, image: "https://images.unsplash.com/photo-1598511726623-d090c279a04a?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-10', name: "Acai Delight", description: "Mixed berries, granola, honey.", price: 12.00, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-11', name: "Belgian Gold", description: "Crispy waffles, berries, cream.", price: 11.50, image: "assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg", category: "Brunch" },
  { id: 'brunch-12', name: "Full English", description: "Sausage, bacon, eggs, beans, toast.", price: 22.00, image: "https://images.unsplash.com/photo-1533089862017-a0e27b80d72a?q=80&w=500&auto=format&fit=crop", category: "Brunch" },

  // Brew
  { id: 'brew-1', name: "Nitro Cold Brew", description: "18-hour steep, nitrogen infused.", price: 6.50, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=500&auto=format&fit=crop", category: "Cold Brew" },
  { id: 'brew-2', name: "Ceremonial Matcha", description: "Uji-sourced matcha with oat milk.", price: 7.25, image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'brew-3', name: "Ethiopian Yirgacheffe", description: "Floral notes with a citrus finish.", price: 5.00, image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'brew-4', name: "Dirty Masala Chai", description: "House-made spices, double shot.", price: 6.75, image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'brew-5', name: "Oat Milk Cortado", description: "Equal parts espresso & milk.", price: 4.50, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'brew-6', name: "Lavender Honey", description: "Floral infusion with local honey.", price: 7.50, image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'brew-7', name: "Golden Turmeric", description: "Spiced healing brew.", price: 6.25, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'brew-8', name: "Caramel Macchiato", description: "Layered espresso & vanilla.", price: 6.50, image: "https://images.unsplash.com/photo-1485808191679-5f8c7c41f7bc?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'brew-9', name: "V60 Single Origin", description: "Hand poured perfection.", price: 8.00, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'brew-10', name: "Blueberry Infusion", description: "Antioxidant rich blend.", price: 5.75, image: "https://images.unsplash.com/photo-1596710629170-1f222915dd44?q=80&w=500&auto=format&fit=crop", category: "Tea" },

  // Artisanal Bread
  { id: 'bread-1', name: "Chocolate Babka", description: "Rich dark chocolate ganache swirl.", price: 12.00, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500&auto=format&fit=crop", category: "Pastry" },
  { id: 'bread-2', name: "Seeded Multigrain", description: "Hand-topped with flax & oats.", price: 9.00, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop", category: "Bread" },
  { id: 'bread-3', name: "Dark Rye Loaf", description: "Robust German-style dense rye.", price: 10.50, image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=500&auto=format&fit=crop", category: "Bread" },
  { id: 'bread-4', name: "Herbed Focaccia", description: "Rosemary, garlic & olive oil.", price: 7.50, image: "https://images.unsplash.com/photo-1573140247632-f84660f67627?q=80&w=500&auto=format&fit=crop", category: "Bread" },
  { id: 'bread-5', name: "Honey Brioche", description: "Ultra-soft, buttery morning loaf.", price: 11.25, image: "https://images.unsplash.com/photo-1619531102901-2e673070c79f?q=80&w=500&auto=format&fit=crop", category: "Bread" },
  { id: 'bread-6', name: "Stoneground Wheat", description: "Nutritious 100% whole grain.", price: 8.75, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=500&auto=format&fit=crop", category: "Bread" },
  { id: 'bread-7', name: "Parisian Baguette", description: "Classic crust with an airy crumb.", price: 4.50, image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=500&auto=format&fit=crop", category: "Bread" },
  { id: 'bread-8', name: "Cranberry Walnut", description: "Sweet & tart artisan loaf.", price: 9.50, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop", category: "Bread" },

  // Black Coffee
  { id: 'coffee-1', name: "Velvet Flat White", description: "Double Shot, Silky Microfoam", price: 4.80, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'coffee-2', name: "Kyoto Cold Brew", description: "12-Hour Slow Drip Extraction", price: 5.50, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop", category: "Cold Brew" },
  { id: 'coffee-3', name: "Oat Milk Latte", description: "Creamy, Nut-Free, Vegan", price: 5.20, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'coffee-4', name: "Single Origin Espresso", description: "Intense Berry Notes", price: 3.50, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'coffee-5', name: "Dark Mocha", description: "70% Cacao, Double Espresso", price: 6.00, image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=500&auto=format&fit=crop", category: "Coffee" },

  // Cold Drinks
  { id: 'cold-1', name: "Fresh Orange Juice", description: "Cold pressed Valencia oranges", price: 4.50, image: "assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", category: "Juice" },
  { id: 'cold-2', name: "Strawberry Smoothie", description: "Greek yogurt, strawberry puree", price: 5.75, image: "assets/raspberry-smoothie_1150-18529.jpg", category: "Smoothie" },
  { id: 'cold-3', name: "Chocolate Shake", description: "70% cacao, vanilla ice cream", price: 6.25, image: "assets/close-up-milkshake-glass-plate_117406-7215.jpg", category: "Shake" },
  { id: 'cold-4', name: "Iced Latte", description: "Double shot over chilled milk", price: 5.50, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'cold-5', name: "Mango Lassi", description: "Alphonso mango, yogurt, cardamom", price: 5.00, image: "assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "Smoothie" },
  { id: 'cold-6', name: "Cold Brew", description: "12-hour steep, smooth finish", price: 4.90, image: "https://images.unsplash.com/photo-1510626176956-c2a2b4ff10ec?q=80&w=500&auto=format&fit=crop", category: "Cold Brew" },

  // Creme/Latte (Updated Images)
  { id: 'creme-1', name: "Creamy Orange Latte", description: "Fresh orange with milk foam", price: 5.50, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=500", category: "Coffee" },
  { id: 'creme-2', name: "Citrus Spark", description: "Lemon-lime with mint", price: 4.25, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=500", category: "Juice" },
  { id: 'creme-3', name: "Mango Cream Fizz", description: "Mango puree and light cream", price: 5.75, image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=500", category: "Cold Drink" },
  { id: 'creme-4', name: "Classic Apple Juice", description: "Cold pressed apples", price: 4.00, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500&auto=format&fit=crop", category: "Juice" },
  { id: 'creme-5', name: "Berry Citrus", description: "Strawberry and grapefruit", price: 5.20, image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=500", category: "Juice" },

  // Juices (unique items)
  { id: 'juice-1', name: "Lemon Mint", description: "Zesty lemon with mint", price: 4.10, image: "assets/colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521.avif", category: "Juice" },
  { id: 'juice-2', name: "Pineapple Punch", description: "Tropical pineapple blend", price: 4.80, image: "assets/exotic-cocktail-closeup_181624-983.avif", category: "Juice" },
  { id: 'juice-3', name: "Mango Glow", description: "Alphonso mango puree", price: 5.25, image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=500&auto=format&fit=crop", category: "Juice" },

  // Latte Hot
  { id: 'latte-1', name: "Classic Latte", description: "Double shot, steamed milk", price: 4.80, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'latte-2', name: "Vanilla Latte", description: "House vanilla syrup", price: 5.10, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'latte-3', name: "Caramel Latte", description: "Buttery caramel drizzle", price: 5.10, image: "https://images.unsplash.com/photo-1547234063-3a9ffc8ef9a7?q=80&w=500&auto=format&fit=crop", category: "Coffee" },
  { id: 'latte-4', name: "Pumpkin Spice Latte", description: "Seasonal spices & puree", price: 5.40, image: "https://images.unsplash.com/photo-1631900161776-9de35f9d5fbe?q=80&w=500&auto=format&fit=crop", category: "Coffee" },

  // Tea (New)
  { id: 'tea-1', name: "Ceremonial Matcha", description: "Stone-ground, umami-rich", price: 12.00, image: "https://images.unsplash.com/photo-1520986438870-2e27b2b88a4d?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'tea-2', name: "Masala Chai", description: "Spiced, creamy, warming", price: 5.50, image: "https://images.unsplash.com/photo-1604908554112-46d5772f4a2d?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'tea-3', name: "Ginger Lemon", description: "Zesty, soothing infusion", price: 4.75, image: "https://images.unsplash.com/photo-1513639725746-9baf0f0b33a3?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'tea-4', name: "Moroccan Mint", description: "Cooling green tea", price: 4.50, image: "https://images.unsplash.com/photo-1595974732096-0f5f9c1a5f06?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'tea-5', name: "Royal Milk Tea", description: "Black tea, milk, caramel", price: 7.00, image: "https://images.unsplash.com/photo-1532634726-240e47cb5d1a?q=80&w=500&auto=format&fit=crop", category: "Tea" },
  { id: 'tea-6', name: "Iced Peach Oolong", description: "Fruity, floral, chilled", price: 6.50, image: "https://images.unsplash.com/photo-1515512965560-0b814a59fdf8?q=80&w=500&auto=format&fit=crop", category: "Tea" },

  // Smoothie & Shake (New)
  { id: 'smoothie-1', name: "Berry Burst", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=500&auto=format&fit=crop", category: "Smoothie" },
  { id: 'smoothie-2', name: "Green Power", description: "Spinach, apple, banana", price: 5.00, image: "assets/kiwi-milk-shake-table_140725-8608.jpg", category: "Smoothie" },
  { id: 'shake-1', name: "Classic Chocolate Shake", description: "Rich cocoa, creamy base", price: 5.20, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=500&auto=format&fit=crop", category: "Shake" },
  { id: 'shake-2', name: "Vanilla Bean Shake", description: "Madagascar vanilla, smooth", price: 5.00, image: "assets/strawberry-ice-cream-with-delights_140725-8818.jpg", category: "Shake" },
  { id: 'shake-3', name: "Strawberry Bliss", description: "Fresh strawberries, cream", price: 5.40, image: "assets/caramel-cold-shake-with-cream_140725-4501.avif", category: "Shake" },
  { id: 'shake-4', name: "Banana Caramel", description: "Banana, caramel drizzle", price: 5.60, image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=500&auto=format&fit=crop", category: "Shake" },

  // Toast (New)
  { id: 'toast-1', name: "Signature Benedict", description: "Poached eggs, hollandaise", price: 14.50, image: "assets/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", category: "Toast" },
  { id: 'toast-2', name: "Truffle Omelette", description: "Mushrooms, truffle oil", price: 12.50, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=500&auto=format&fit=crop", category: "Toast" },
  { id: 'toast-3', name: "Shakshuka", description: "Tomato, peppers, eggs", price: 11.25, image: "https://images.unsplash.com/photo-1604908172713-3d6b1eb1b1a6?q=80&w=500&auto=format&fit=crop", category: "Toast" },
  { id: 'toast-4', name: "Avocado Toast", description: "Sourdough, smashed avo", price: 10.50, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500&auto=format&fit=crop", category: "Toast" },
  { id: 'toast-5', name: "Classic Benedict", description: "Ham, hollandaise", price: 13.50, image: "https://images.unsplash.com/photo-1512058564366-18510be2bd16?q=80&w=500&auto=format&fit=crop", category: "Toast" },
  { id: 'toast-6', name: "Vegan Power Bowl", description: "Grains, greens", price: 12.00, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop", category: "Toast" },

  // Pastry (New)
  { id: 'pastry-1', name: "Butter Croissant", description: "Flaky layers, French butter", price: 4.50, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500&auto=format&fit=crop", category: "Pastry" },
  { id: 'pastry-2', name: "Almond Croissant", description: "Frangipane, toasted almond", price: 5.25, image: "https://images.unsplash.com/photo-1612539425542-4ec77f5a7f8a?q=80&w=500&auto=format&fit=crop", category: "Pastry" },
  { id: 'pastry-3', name: "Chocolate Éclair", description: "Choux pastry, rich ganache", price: 4.75, image: "https://images.unsplash.com/photo-1546549036-3786c5d0cf29?q=80&w=500&auto=format&fit=crop", category: "Pastry" },
  { id: 'pastry-4', name: "Strawberry Tart", description: "Vanilla custard, fresh berries", price: 5.80, image: "https://images.unsplash.com/photo-1541782810487-8f9b5c0294c6?q=80&w=500&auto=format&fit=crop", category: "Pastry" },
  { id: 'pastry-5', name: "Lemon Meringue Tart", description: "Zesty curd, torched meringue", price: 5.90, image: "https://images.unsplash.com/photo-1617196030881-4ac5bb32f21e?q=80&w=500&auto=format&fit=crop", category: "Pastry" },
  { id: 'pastry-6', name: "Velvet Cake Slice", description: "Moist crumb, vanilla frosting", price: 4.95, image: "https://images.unsplash.com/photo-1606312618779-298c046f66da?q=80&w=500&auto=format&fit=crop", category: "Pastry" }
];

async function fetchBestsellers() {
  const base = apiBase();
  try {
    const res = await fetch(`${base}/api/products`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    bestsellers = data;
    renderBestsellers(bestsellers);
  } catch (err) {
    console.log('Using local fallback data');
    bestsellers = sampleMenu;
    renderBestsellers(bestsellers);
  }
}

function renderBestsellers(items) {
  const container = document.getElementById('bestsellers') || document.getElementById('bestsellers-grid');
  if (!container) return;
  
  function classify(cat) {
    const c = String(cat || '').toLowerCase();
    if (c.includes('brunch') || c.includes('toast') || c.includes('pastry') || c.includes('bread') || c.includes('bakery')) return 'food';
    if (c.includes('coffee') || c.includes('tea') || c.includes('espresso') || c.includes('latte')) return 'hot';
    if (c.includes('cold') || c.includes('juice') || c.includes('smoothie') || c.includes('shake') || c.includes('drink')) return 'cold';
    return 'food';
  }
  function diversify(itemsList) {
    const food = [], hot = [], cold = [];
    for (const it of itemsList) {
      const t = classify(it.category);
      if (t === 'food') food.push(it);
      else if (t === 'hot') hot.push(it);
      else cold.push(it);
    }
    const res = [];
    function take2(arr) {
      const out = [];
      if (arr.length) out.push(arr.shift());
      if (arr.length) out.push(arr.shift());
      return out;
    }
    while (food.length || hot.length || cold.length) {
      for (const arr of [food, hot, cold]) {
        if (arr.length) {
          const t = take2(arr);
          for (const x of t) res.push(x);
        }
      }
    }
    return res;
  }
  const ordered = diversify(items);
  container.innerHTML = ordered.map((item, index) => {
    const imgUrl = item.image || item.image_url;
    // Use fallback if image is missing or is the default Unsplash placeholder
    const isDefault = imgUrl && imgUrl.includes('photo-1546069901');
    const displayImg = (imgUrl && !isDefault) ? imgUrl : getFallbackImage(item, index);
    const rating = typeof item.rating === 'number' ? item.rating : getRatingForItem(item);
    
    const fallback = getFallbackImage(item, index + 50); // Different seed for fallback
    
    return `
    <div class="bg-white dark:bg-[#2a1e19] rounded-[1.5rem] p-3 shadow-md border border-gray-100 dark:border-white/5 flex gap-4 items-center relative" data-category="${item.category}">
      <div class="absolute top-3 right-3 bg-white/90 dark:bg-black/60 px-2 py-1 rounded-full shadow-sm z-10">
        <span class="material-symbols-outlined text-[14px] text-green-600 dark:text-green-400">${getCategoryIcon(item.category)}</span>
      </div>
      <div class="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-black/20 relative shrink-0">
        <img src="${displayImg}" class="w-full h-full object-cover" alt="${getMenuTranslation(item, 'name')}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
      </div>
      <div class="flex-1 min-w-0 flex flex-col h-24 md:h-32 justify-between py-0.5">
        <div>
          <h4 class="font-bold text-[13px] md:text-sm text-gray-900 dark:text-white leading-tight pr-6">${getMenuTranslation(item, 'name')}</h4>
          <div class="flex items-center gap-1 mt-1">
            <span class="material-symbols-outlined text-[14px] text-[#FFC107]" style="font-variation-settings: 'FILL' 1">star</span>
            <span class="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">${Number(rating).toFixed(1)}</span>
            <span class="text-[10px] text-gray-400">(${Math.floor(Number(rating) * 25)}+)</span>
          </div>
          <p class="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">${getMenuTranslation(item, 'description')}</p>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-xs font-bold text-primary">$${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
          <button class="bg-orange-50 text-primary dark:bg-primary/20 dark:text-primary text-[12px] font-black uppercase shadow-sm active:scale-95 transition-transform flex items-center justify-center w-[84px] h-[36px] rounded-[12px]" onclick="addToCart('${item.id}')">
            ${getTranslation('add')}
          </button>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderCategories(items) {
  // SUB-CATEGORIES to be displayed as circles with real images
  const subCategories = [
    { name: getTranslation('Tea & Infusion'), img: 'assets/exotic-cocktail-closeup_181624-983.avif', link: '../tea and infusion sub catégorie page/index.html' },
    { name: getTranslation('Milkshake'), img: 'assets/close-up-milkshake-glass-plate_117406-7215.jpg', link: '../milkshake sub catégorie page/index.html' },
    { name: getTranslation('Juice'), img: 'assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif', link: '../juces sub catégorie page/index.html' },
    { name: getTranslation('Sweet Pastries'), img: 'assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg', link: '../sweet pastries sub catégorie page/index.html' },
    { name: getTranslation('Black Coffee'), img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop', link: '../black coffee sub catégorie page/index.html' },
    { name: getTranslation('Latte'), img: 'https://images.unsplash.com/photo-1570968992193-6e5c9220956c?q=80&w=500&auto=format&fit=crop', link: '../latté hot drink sub catégorie page/index.html' },
    { name: getTranslation('Smoothie'), img: 'assets/raspberry-smoothie_1150-18529.jpg', link: '../smothie sub catégorie page/index.html' },
    { name: getTranslation('Toast'), img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=500&auto=format&fit=crop', link: '../toast brunch sub catégorie page/index.html' },
    { name: getTranslation('Artisanal Bread'), img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop', link: '../artisanal bread sub catégorie page/index.html' }
  ];

  const container = document.getElementById('explore-categories');
  if (!container) return;

  container.innerHTML = subCategories.map(cat => `
    <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='${cat.link}'">
      <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
          <div class="w-16 h-16 rounded-full overflow-hidden relative">
            <img src="${cat.img}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500'">
          </div>
        </div>
      </div>
      <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]">${cat.name}</p>
    </div>
  `).join('');
}

function getCategoryIcon(cat) {
  const icons = {
    'Brew': 'coffee',
    'Cold Brew': 'coffee', // Added Cold Brew
    'Pastry': 'bakery_dining',
    'Brunch': 'brunch_dining',
    'Cold Drink': 'local_bar',
    'Tea': 'emoji_food_beverage',
    'Coffee': 'coffee',
    'Juice': 'local_drink',
    'Smoothie': 'blender',
    'Shake': 'icecream',
    'Bread': 'breakfast_dining',
    'Toast': 'breakfast_dining'
  };
  return icons[cat] || 'restaurant';
}

function getRatingForItem(item) {
  const map = {
    'Coffee': 4.5,
    'Cold Brew': 4.5,
    'Tea': 4.4,
    'Juice': 4.3,
    'Smoothie': 4.4,
    'Shake': 4.3,
    'Pastry': 4.5,
    'Brunch': 4.4,
    'Toast': 4.3,
    'Bread': 4.4
  };
  const base = map[item.category] || 4.4;
  return base;
}

function getFallbackImage(item, seed = 0) {
  // Try to match specific keywords in name to local assets
  const name = item.name.toLowerCase();
  if (name.includes('milkshake')) return 'assets/close-up-milkshake-glass-plate_117406-7215.jpg';
  if (name.includes('smoothie')) return 'assets/raspberry-smoothie_1150-18529.jpg';
  if (name.includes('juice') || name.includes('orange')) return 'assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif';
  if (name.includes('tea')) return 'assets/exotic-cocktail-closeup_181624-983.avif';
  if (name.includes('toast') || name.includes('benedict')) return 'assets/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif';
  if (name.includes('pancake')) return 'assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg';
  if (name.includes('pastry') || name.includes('croissant')) return 'assets/pastry.jpg';
  if (name.includes('mango')) return 'assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif';

  // Fallback pool of high-quality images
  const pool = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', // Salad/Bowl
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500', // Pizza/Flatbread
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500', // Toast/Egg
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=500', // French Toast
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500', // Healthy Bowl
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500', // Drink
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500', // Coffee
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=500'  // Coffee beans
  ];

  // Deterministic selection based on item name char code sum + seed
  const hash = item.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + seed;
  return pool[hash % pool.length];
}

function startHeroCarousel() {
  console.log('Starting hero carousel (simplified version)...');
  
  // Wait a bit for DOM to be ready
  setTimeout(() => {
    const container = document.querySelector('#hero-carousel .flex');
    if (!container) {
      console.log('Carousel container not found, retrying...');
      setTimeout(startHeroCarousel, 1000);
      return;
    }
    
    console.log('Carousel found, starting auto-scroll...');

  let currentCardIndex = 0;
  let autoScrollInterval;

  function getCardDimensions() {
    const firstCard = container.querySelector('div');
    if (!firstCard) return null;

    const cardWidth = firstCard.offsetWidth;
    const style = window.getComputedStyle(container);
    let gap = parseFloat(style.gap) || 0;
    
    if (gap < 2 && style.gap && style.gap.includes('rem')) {
      gap = gap * 16;
    } else if (gap === 0) {
      gap = 16;
    }
    
    return { cardWidth, gap, itemWidth: cardWidth + gap };
  }

  function scrollToCard(index) {
    const dimensions = getCardDimensions();
    if (!dimensions) {
      console.log('No card dimensions available');
      return;
    }

    const { itemWidth } = dimensions;
    const totalCards = container.children.length;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    console.log(`Scrolling to card ${index}, itemWidth: ${itemWidth}, maxScroll: ${maxScroll}`);
    
    if (index >= totalCards) {
      // Loop back to start
      currentCardIndex = 0;
      container.scrollTo({ left: 0, behavior: 'smooth' });
      console.log('Looped back to start');
    } else {
      const targetScroll = index * itemWidth;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      console.log(`Scrolled to position ${targetScroll}`);
    }
  }

  function startAutoScroll() {
    console.log('Starting auto-scroll interval...');
    
    autoScrollInterval = setInterval(() => {
      const totalCards = container.children.length;
      currentCardIndex = (currentCardIndex + 1) % totalCards;
      
      console.log(`Auto-scrolling to card ${currentCardIndex} of ${totalCards}`);
      scrollToCard(currentCardIndex);
    }, 3000); // Change card every 3 seconds
  }

    // Start the automatic carousel
    startAutoScroll();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBestsellers();
  renderCategories();
  // startHeroCarousel(); // Disabled - using auto-loop instead
});

window.navigateToCategory = (category) => {
  const categoryId = category.toLowerCase();

  // Navigation logic for Main Categories
  if (categoryId === 'brew') {
    window.location.href = '../Brew catégorie page/index.html';
    return;
  }
  if (categoryId === 'bakery' || categoryId === 'pastry' || categoryId === 'sweet pastries') {
    window.location.href = '../sweet pastries sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'cold drink') {
    window.location.href = '../cold drinks catégorie page/index.html';
    return;
  }
  if (categoryId === 'branch') {
    console.log('Branch category selected');
  }
  if (categoryId === 'brunch') {
    window.location.href = '../long_scroll_brunch_explorer/index.html';
    return;
  }
  if (categoryId === 'toast') {
    window.location.href = '../toast brunch sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'tea' || categoryId === 'tea & infusion') {
    window.location.href = '../tea and infusion sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'milkshake' || categoryId === 'shake') { // Added shake alias
    window.location.href = '../milkshake sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'juice') {
    window.location.href = '../juces sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'black coffee') {
    window.location.href = '../black coffee sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'latte') {
    window.location.href = '../latté hot drink sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'creme') { // Added creme
    window.location.href = '../creme or latté fuite juces sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'smoothie') {
    window.location.href = '../smothie sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'artisanal bread' || categoryId === 'bread') { // Added bread alias
    window.location.href = '../artisanal bread sub catégorie page/index.html';
    return;
  }

  // Fallback to filtering if something goes wrong, though paths should cover all
  filterByCategory(category);
};

window.filterByCategory = (category) => {
  const filtered = bestsellers.filter(i => i.category === category);
  renderBestsellers(filtered);
};

window.addToCart = (id) => {
  const item = bestsellers.find(i => i.id === id) || sampleMenu.find(i => i.id === id);
  if (!item) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartUI();
  
  // Also save to localStorage for persistence across pages
  localStorage.setItem('stitch_cart', JSON.stringify(cart));
};

function updateCartUI() {
  const badge = document.getElementById('cart-items-text');
  if (badge) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    const itemsText = getTranslation('items');
    badge.textContent = `${total} ${itemsText}`;
    badge.classList.toggle('hidden', total === 0);
  }
}

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.remove('hidden');
    renderCartItems();
  }
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderCartItems() {
  const container = document.getElementById('order-items');
  const subtotalEl = document.getElementById('modal-subtotal');
  const taxEl = document.getElementById('modal-tax');
  const totalEl = document.getElementById('modal-total');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl';
    
    // Get translated name
    const itemName = getMenuTranslation(item, 'name');
    
    div.innerHTML = `
      <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <img src="${item.image}" class="w-full h-full object-cover" alt="${itemName}">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-sm truncate dark:text-white">${itemName}</h4>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs text-gray-500 dark:text-gray-400">$${item.price}</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="updateItemQuantity('${item.id}', -1)" class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">-</button>
        <span class="text-sm font-bold w-4 text-center dark:text-white">${item.quantity}</span>
        <button onclick="updateItemQuantity('${item.id}', 1)" class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">+</button>
      </div>
    `;
    container.appendChild(div);
  });
  
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

window.updateItemQuantity = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
    renderCartItems();
    localStorage.setItem('stitch_cart', JSON.stringify(cart));
  }
};

// Helper to get stored cart
function getStoredCart() {
  try {
    const stored = localStorage.getItem('stitch_cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Setup basic events
function setupEvents() {
  const searchBtn = document.querySelector('.material-symbols-outlined.text-xl'); // Assuming search icon
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      alert(getTranslation('search_feature_soon'));
    });
  }

  const cartBtn = document.getElementById('view-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openOrderModal);
  }
  
  const closeBtn = document.getElementById('order-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOrderModal);
  }
}

// Language Helper
const translations = {
  en: {
    table_12: "Table 12",
    stitch_cafe: "Stitch Café",
    dine_in: "Dine In",
    take_away: "Take Away",
    chefs_choice: "Chef's Choice",
    no1_seller: "N°1 seller",
    brunch: "BRUNCH",
    favorites: "FAVORITES",
    savory_brunch: "Savory brunch classics.",
    order_now: "Order Now",
    new_arrival: "New Arrival",
    hot: "🔥 Hot",
    velvet: "VELVET",
    sips: "SIPS",
    smooth_iced_blends: "Smooth iced blends.",
    morning_special: "Morning Special",
    trend: "Trend",
    morning: "MORNING",
    brew: "BREW",
    freshly_brewed_coffee: "Freshly brewed coffee.",
    sweet_treats: "Sweet Treats",
    popular: "⭐ Popular",
    sweet: "SWEET",
    delights: "DELIGHTS",
    fluffy_pancakes: "Fluffy pancakes, sweet treats.",
    explore: "Explore",
    view_all: "View All",
    milkshake: "Milkshake",
    juice: "Juice",
    sweet_pastries: "Sweet Pastries",
    toast: "Toast",
    black_coffee: "Black Coffee",
    latte: "Latte",
    smoothie: "Smoothie",
    tea_infusion: "Tea & Infusion",
    artisanal_bread: "Artisanal Bread",
    our_menu: "Our Menu",
    toasts_bowls: "Toasts & Bowls",
    coffee_tea: "Coffee & Tea",
    cold_drink: "Cold Drink",
    juices_shakes: "Juices & Shakes",
    pastry: "Pastry",
    bakery_sweets: "Bakery & Sweets",
    trending_now: "Trending Now",
    all_items: "All variety of items",
    home: "Home",
    cart: "Cart",
    profile: "Profile",
    search_placeholder: "Search...",
    search_feature_soon: "Search feature coming soon!",
    items: "items",
    add: "ADD",
    subtotal: "Subtotal",
    tax: "Tax (10%)",
    total: "Total",
    close: "Close",
    place_order: "Place Order",
    order_status: "Order Status",
    received: "Received",
    // Categories
    'Tea & Infusion': "Tea & Infusion",
    'Milkshake': "Milkshake",
    'Juice': "Juice",
    'Sweet Pastries': "Sweet Pastries",
    'Black Coffee': "Black Coffee",
    'Latte': "Latte",
    'Smoothie': "Smoothie",
    'Toast': "Toast",
    'Artisanal Bread': "Artisanal Bread"
  },
  fr: {
    table_12: "Table 12",
    stitch_cafe: "Stitch Café",
    dine_in: "Sur Place",
    take_away: "À Emporter",
    chefs_choice: "Choix du Chef",
    no1_seller: "N°1 des ventes",
    brunch: "BRUNCH",
    favorites: "FAVORIS",
    savory_brunch: "Classiques salés du brunch.",
    order_now: "Commander",
    new_arrival: "Nouveauté",
    hot: "🔥 Chaud",
    velvet: "VELOURS",
    sips: "GORGEES",
    smooth_iced_blends: "Mélanges glacés onctueux.",
    morning_special: "Spécial Matin",
    trend: "Tendance",
    morning: "MATIN",
    brew: "INFUSION",
    freshly_brewed_coffee: "Café fraîchement préparé.",
    sweet_treats: "Douceurs Sucrées",
    popular: "⭐ Populaire",
    sweet: "DOUCEUR",
    delights: "DELICES",
    fluffy_pancakes: "Pancakes moelleux, douceurs.",
    explore: "Explorer",
    view_all: "Voir Tout",
    milkshake: "Milkshake",
    juice: "Jus",
    sweet_pastries: "Pâtisseries Sucrées",
    toast: "Tartine",
    black_coffee: "Café Noir",
    latte: "Latte",
    smoothie: "Smoothie",
    tea_infusion: "Thé & Infusion",
    artisanal_bread: "Pain Artisanal",
    our_menu: "Notre Menu",
    toasts_bowls: "Tartines & Bols",
    coffee_tea: "Café & Thé",
    cold_drink: "Boissons Froides",
    juices_shakes: "Jus & Shakes",
    pastry: "Pâtisserie",
    bakery_sweets: "Boulangerie & Douceurs",
    trending_now: "Tendances",
    all_items: "Toute la variété",
    home: "Accueil",
    cart: "Panier",
    profile: "Profil",
    search_placeholder: "Rechercher...",
    search_feature_soon: "Fonction de recherche bientôt disponible !",
    items: "articles",
    add: "AJOUTER",
    subtotal: "Sous-total",
    tax: "Taxe (10%)",
    total: "Total",
    close: "Fermer",
    place_order: "Commander",
    order_status: "Statut de la commande",
    received: "Reçu",
    // Categories
    'Tea & Infusion': "Thé & Infusion",
    'Milkshake': "Milkshake",
    'Juice': "Jus",
    'Sweet Pastries': "Pâtisseries Sucrées",
    'Black Coffee': "Café Noir",
    'Latte': "Latte",
    'Smoothie': "Smoothie",
    'Toast': "Tartine",
    'Artisanal Bread': "Pain Artisanal"
  },
  ar: {
    table_12: "طاولة 12",
    stitch_cafe: "ستيتش كافيه",
    dine_in: "تناول هنا",
    take_away: "سفري",
    chefs_choice: "اختيار الشيف",
    no1_seller: "الأكثر مبيعاً",
    brunch: "فطور متأخر",
    favorites: "المفضلة",
    savory_brunch: "كلاسيكيات الفطور المالح.",
    order_now: "اطلب الآن",
    new_arrival: "وصل حديثاً",
    hot: "🔥 ساخن",
    velvet: "مخملي",
    sips: "رشفات",
    smooth_iced_blends: "مشروبات مثلجة ناعمة.",
    morning_special: "عرض الصباح",
    trend: "رائج",
    morning: "الصباح",
    brew: "قهوة",
    freshly_brewed_coffee: "قهوة طازجة التحضير.",
    sweet_treats: "حلويات",
    popular: "⭐ مشهور",
    sweet: "حلوى",
    delights: "لذيذة",
    fluffy_pancakes: "بان كيك هش، حلويات.",
    explore: "استكشف",
    view_all: "عرض الكل",
    milkshake: "ميلك شيك",
    juice: "عصير",
    sweet_pastries: "معجنات حلوة",
    toast: "توست",
    black_coffee: "قهوة سوداء",
    latte: "لاتيه",
    smoothie: "سموثي",
    tea_infusion: "شاي وأعشاب",
    artisanal_bread: "خبز حرفي",
    our_menu: "قائمتنا",
    toasts_bowls: "توست وسلطانيات",
    coffee_tea: "قهوة وشاي",
    cold_drink: "مشروبات باردة",
    juices_shakes: "عصائر ومخفوقات",
    pastry: "معجنات",
    bakery_sweets: "مخبوزات وحلويات",
    trending_now: "الأكثر رواجاً",
    all_items: "جميع الأصناف",
    home: "الرئيسية",
    cart: "السلة",
    profile: "الملف الشخصي",
    search_placeholder: "بحث...",
    add: "إضافة",
    search_feature_soon: "ميزة البحث قريبا!",
    items: "عناصر",
    order_status: "حالة الطلب",
    received: "تم الاستلام",
    subtotal: "المجموع الفرعي",
    tax: "ضريبة (10%)",
    total: "المجموع",
    close: "إغلاق",
    place_order: "تأكيد الطلب",
    // Categories
    'Tea & Infusion': "شاي وأعشاب",
    'Milkshake': "ميلك شيك",
    'Juice': "عصير",
    'Sweet Pastries': "معجنات حلوة",
    'Black Coffee': "قهوة سوداء",
    'Latte': "لاتيه",
    'Smoothie': "سموثي",
    'Toast': "توست",
    'Artisanal Bread': "خبز حرفي"
  }
};

const menuTranslations = {
  // Brunch
  'brunch-1': {
    fr: { name: "Omelette Fermière", description: "Œufs bio, cheddar, herbes fraîches." },
    ar: { name: "عجة ريفية", description: "بيض عضوي، جبن شيدر، أعشاب طازجة." }
  },
  'brunch-2': {
    fr: { name: "Œufs Bénédicte", description: "Muffin anglais, bacon, sauce hollandaise." },
    ar: { name: "بيض بنديكت", description: "مافن إنجليزي، لحم مقدد، صلصة هولنديز." }
  },
  'brunch-3': {
    fr: { name: "Shakshuka Épicée", description: "Œufs pochés dans une sauce tomate épicée." },
    ar: { name: "شكشوكة حارة", description: "بيض مسلوق في صلصة طماطم حارة." }
  },
  'brunch-4': {
    fr: { name: "Poêlée du Jardin", description: "Pommes de terre rôties, chou frisé, poivrons." },
    ar: { name: "مقلاة الحديقة", description: "بطاطس مشوية، كرنب، فلفل." }
  },
  'brunch-5': {
    fr: { name: "Burrito Brunch", description: "Chorizo, œufs brouillés, haricots." },
    ar: { name: "بوريتو الفطور", description: "تشوريزو، بيض مخفوق، فاصوليا." }
  },
  'brunch-6': {
    fr: { name: "Steak & Œufs", description: "Faux-filet 6oz, deux œufs au choix." },
    ar: { name: "ستيك وبيض", description: "شريحة لحم 6 أونصة، بيضتان حسب الرغبة." }
  },
  'brunch-7': {
    fr: { name: "Blanc d'Œuf Fitness", description: "Épinards, fromage de chèvre, blancs d'œufs." },
    ar: { name: "بياض البيض الصحي", description: "سبانخ، جبن ماعز، بياض بيض." }
  },
  'brunch-8': {
    fr: { name: "Tacos Brunch", description: "Tortillas de maïs, oignons marinés, avocat." },
    ar: { name: "تاكو الفطور", description: "تورتيلا ذرة، بصل مخلل، أفوكادو." }
  },
  'brunch-9': {
    fr: { name: "Frittata de Fer", description: "Oignons, pommes de terre, cheddar vieilli." },
    ar: { name: "فريتاتا الحديد", description: "بصل، بطاطس، شيدر معتق." }
  },
  'brunch-10': {
    fr: { name: "Délice Açaï", description: "Baies mélangées, granola, miel." },
    ar: { name: "ديلك آساي", description: "توت مشكل، جرانولا، عسل." }
  },
  'brunch-11': {
    fr: { name: "Gaufre Belge", description: "Gaufres croustillantes, baies, crème." },
    ar: { name: "وافل بلجيكي", description: "وافل مقرمش، توت، كريمة." }
  },
  'brunch-12': {
    fr: { name: "Petit Déjeuner Anglais", description: "Saucisse, bacon, œufs, haricots, toast." },
    ar: { name: "فطور إنجليزي كامل", description: "سجق، لحم مقدد، بيض، فاصوليا، توست." }
  },

  // Brew
  'brew-1': {
    fr: { name: "Nitro Cold Brew", description: "Infusion 18h, infusé à l'azote." },
    ar: { name: "نيترو كولد برو", description: "نقع 18 ساعة، مشبع بالنيتروجين." }
  },
  'brew-2': {
    fr: { name: "Matcha Cérémonial", description: "Matcha d'Uji avec lait d'avoine." },
    ar: { name: "ماتشا احتفالي", description: "ماتشا من أوجي مع حليب الشوفان." }
  },
  'brew-3': {
    fr: { name: "Yirgacheffe Éthiopien", description: "Notes florales avec une finale citronnée." },
    ar: { name: "يرجاشيف إثيوبي", description: "نكهات زهرية مع لمسة حمضية." }
  },
  'brew-4': {
    fr: { name: "Dirty Masala Chai", description: "Épices maison, double dose." },
    ar: { name: "ديرتي ماسالا تشاي", description: "توابل منزلية، جرعة مزدوجة." }
  },
  'brew-5': {
    fr: { name: "Cortado Lait d'Avoine", description: "Parts égales expresso & lait." },
    ar: { name: "كورتادو حليب الشوفان", description: "كميات متساوية من الإسبريسو والحليب." }
  },
  'brew-6': {
    fr: { name: "Miel Lavande", description: "Infusion florale avec miel local." },
    ar: { name: "عسل اللافندر", description: "نقيع زهري مع عسل محلي." }
  },
  'brew-7': {
    fr: { name: "Curcuma Doré", description: "Infusion curative épicée." },
    ar: { name: "كركم ذهبي", description: "مشروب علاجي متبل." }
  },
  'brew-8': {
    fr: { name: "Caramel Macchiato", description: "Expresso étagé & vanille." },
    ar: { name: "كراميل ماكياتو", description: "طبقات إسبريسو وفانيليا." }
  },
  'brew-9': {
    fr: { name: "V60 Origine Unique", description: "Perfection versée à la main." },
    ar: { name: "V60 أصل واحد", description: "تحضير يدوي متقن." }
  },
  'brew-10': {
    fr: { name: "Infusion Myrtille", description: "Mélange riche en antioxydants." },
    ar: { name: "نقيع التوت الأزرق", description: "خليط غني بمضادات الأكسدة." }
  },

  // Artisanal Bread
  'bread-1': {
    fr: { name: "Babka Chocolat", description: "Tourbillon de ganache chocolat noir riche." },
    ar: { name: "بابكا الشوكولاتة", description: "دوامة غاناش الشوكولاتة الداكنة الغنية." }
  },
  'bread-2': {
    fr: { name: "Multigrains", description: "Garni à la main de lin & avoine." },
    ar: { name: "خبز متعدد الحبوب", description: "مغطى يدوياً بالكتان والشوفان." }
  },
  'bread-3': {
    fr: { name: "Pain de Seigle Noir", description: "Seigle dense style allemand robuste." },
    ar: { name: "رغيف الجاودار الداكن", description: "جاودار كثيف على الطراز الألماني." }
  },
  'bread-4': {
    fr: { name: "Focaccia aux Herbes", description: "Romarin, ail & huile d'olive." },
    ar: { name: "فوكاشيا بالأعشاب", description: "إكليل الجبل، ثوم وزيت زيتون." }
  },
  'bread-5': {
    fr: { name: "Brioche au Miel", description: "Pain du matin ultra-doux et beurré." },
    ar: { name: "بريوش بالعسل", description: "رغيف صباحي فائق النعومة والزبدة." }
  },
  'bread-6': {
    fr: { name: "Blé Moulu sur Pierre", description: "100% grains entiers nutritifs." },
    ar: { name: "قمح مطحون على الحجر", description: "حبوب كاملة مغذية 100%." }
  },
  'bread-7': {
    fr: { name: "Baguette Parisienne", description: "Croûte classique avec mie aérée." },
    ar: { name: "باغيت باريسي", description: "قشرة كلاسيكية مع لب هوائي." }
  },
  'bread-8': {
    fr: { name: "Canneberge Noix", description: "Pain artisanal doux & acidulé." },
    ar: { name: "توت بري وجوز", description: "رغيف حرفي حلو وحامض." }
  },

  // Black Coffee
  'coffee-1': {
    fr: { name: "Flat White Velours", description: "Double dose, micromousse soyeuse" },
    ar: { name: "فلات وايت مخملي", description: "جرعة مزدوجة، رغوة ناعمة حريرية" }
  },
  'coffee-2': {
    fr: { name: "Kyoto Cold Brew", description: "Extraction goutte à goutte lente 12h" },
    ar: { name: "كيوتو كولد برو", description: "استخلاص بالتنقيط البطيء لمدة 12 ساعة" }
  },
  'coffee-3': {
    fr: { name: "Latte Lait d'Avoine", description: "Crémeux, sans noix, végétalien" },
    ar: { name: "لاتيه حليب الشوفان", description: "كريمي، خالي من المكسرات، نباتي" }
  },
  'coffee-4': {
    fr: { name: "Espresso Origine Unique", description: "Notes de baies intenses" },
    ar: { name: "إسبريسو أصل واحد", description: "نكهات توت قوية" }
  },
  'coffee-5': {
    fr: { name: "Moka Noir", description: "70% Cacao, Double Expresso" },
    ar: { name: "موكا داكن", description: "70% كاكاو، إسبريسو مزدوج" }
  },

  // Cold Drinks
  'cold-1': {
    fr: { name: "Jus d'Orange Frais", description: "Oranges Valencia pressées à froid" },
    ar: { name: "عصير برتقال طازج", description: "برتقال فالنسيا معصور على البارد" }
  },
  'cold-2': {
    fr: { name: "Smoothie Fraise", description: "Yaourt grec, purée de fraise" },
    ar: { name: "سموثي الفراولة", description: "زبادي يوناني، هريس الفراولة" }
  },
  'cold-3': {
    fr: { name: "Shake Chocolat", description: "70% cacao, glace vanille" },
    ar: { name: "شيك الشوكولاتة", description: "70% كاكاو، آيس كريم فانيليا" }
  },
  'cold-4': {
    fr: { name: "Latte Glacé", description: "Double dose sur lait glacé" },
    ar: { name: "لاتيه مثلج", description: "جرعة مزدوجة على حليب بارد" }
  },
  'cold-5': {
    fr: { name: "Mango Lassi", description: "Mangue Alphonso, yaourt, cardamome" },
    ar: { name: "مانجو لاسي", description: "مانجو ألفونسو، زبادي، هيل" }
  },
  'cold-6': {
    fr: { name: "Cold Brew", description: "Infusion 12h, finale douce" },
    ar: { name: "كولد برو", description: "نقع 12 ساعة، نهاية سلسة" }
  },

  // Creme/Latte
  'creme-1': {
    fr: { name: "Latte Orange Crémeux", description: "Orange fraîche avec mousse de lait" },
    ar: { name: "لاتيه برتقال كريمي", description: "برتقال طازج مع رغوة حليب" }
  },
  'creme-2': {
    fr: { name: "Étincelle Agrumes", description: "Citron-lime avec menthe" },
    ar: { name: "شرارة الحمضيات", description: "ليمون وليمون حامض مع نعناع" }
  },
  'creme-3': {
    fr: { name: "Fizz Mangue Crème", description: "Purée de mangue et crème légère" },
    ar: { name: "فيز مانجو وكريمة", description: "هريس مانجو وكريمة خفيفة" }
  },
  'creme-4': {
    fr: { name: "Jus de Pomme Classique", description: "Pommes pressées à froid" },
    ar: { name: "عصير تفاح كلاسيكي", description: "تفاح معصور على البارد" }
  },
  'creme-5': {
    fr: { name: "Agrumes Baies", description: "Fraise et pamplemousse" },
    ar: { name: "حمضيات وتوت", description: "فراولة وجريب فروت" }
  },

  // Juices
  'juice-1': {
    fr: { name: "Citron Menthe", description: "Citron piquant avec menthe" },
    ar: { name: "ليمون ونعناع", description: "ليمون لاذع مع نعناع" }
  },
  'juice-2': {
    fr: { name: "Punch Ananas", description: "Mélange ananas tropical" },
    ar: { name: "بنش الأناناس", description: "مزيج أناناس استوائي" }
  },
  'juice-3': {
    fr: { name: "Éclat Mangue", description: "Purée de mangue Alphonso" },
    ar: { name: "توهج المانجو", description: "هريس مانجو ألفونسو" }
  },

  // Latte Hot
  'latte-1': {
    fr: { name: "Latte Classique", description: "Double dose, lait vapeur" },
    ar: { name: "لاتيه كلاسيكي", description: "جرعة مزدوجة، حليب مبخر" }
  },
  'latte-2': {
    fr: { name: "Latte Vanille", description: "Sirop vanille maison" },
    ar: { name: "لاتيه فانيليا", description: "شراب فانيليا منزلي" }
  },
  'latte-3': {
    fr: { name: "Latte Caramel", description: "Filet de caramel au beurre" },
    ar: { name: "لاتيه كراميل", description: "رذاذ كراميل بالزبدة" }
  },
  'latte-4': {
    fr: { name: "Pumpkin Spice Latte", description: "Épices de saison & purée" },
    ar: { name: "لاتيه توابل اليقطين", description: "توابل موسمية وهريس" }
  },

  // Tea
  'tea-1': {
    fr: { name: "Matcha Cérémonial", description: "Moulu sur pierre, riche en umami" },
    ar: { name: "ماتشا احتفالي", description: "مطحون على الحجر، غني بالأومامي" }
  },
  'tea-2': {
    fr: { name: "Masala Chai", description: "Épicé, crémeux, réchauffant" },
    ar: { name: "ماسالا تشاي", description: "متبل، كريمي، دافئ" }
  },
  'tea-3': {
    fr: { name: "Gingembre Citron", description: "Piquant, infusion apaisante" },
    ar: { name: "زنجبيل وليمون", description: "لاذع، نقيع مهدئ" }
  },
  'tea-4': {
    fr: { name: "Menthe Marocaine", description: "Thé vert rafraîchissant" },
    ar: { name: "شاي مغربي بالنعناع", description: "شاي أخضر منعش" }
  },
  'tea-5': {
    fr: { name: "Thé au Lait Royal", description: "Thé noir, lait, caramel" },
    ar: { name: "شاي بالحليب ملكي", description: "شاي أسود، حليب، كراميل" }
  },
  'tea-6': {
    fr: { name: "Oolong Pêche Glacé", description: "Fruité, floral, frais" },
    ar: { name: "أولونغ الخوخ المثلج", description: "فاكهي، زهري، بارد" }
  },

  // Smoothie & Shake
  'smoothie-1': {
    fr: { name: "Explosion de Baies", description: "Fraise, myrtille, yaourt" },
    ar: { name: "انفجار التوت", description: "فراولة، توت أزرق، زبادي" }
  },
  'smoothie-2': {
    fr: { name: "Force Verte", description: "Épinards, pomme, banane" },
    ar: { name: "القوة الخضراء", description: "سبانخ، تفاح، موز" }
  },
  'shake-1': {
    fr: { name: "Shake Chocolat Classique", description: "Cacao riche, base crémeuse" },
    ar: { name: "شيك شوكولاتة كلاسيكي", description: "كاكاو غني، قاعدة كريمية" }
  },
  'shake-2': {
    fr: { name: "Shake Vanille", description: "Vanille de Madagascar, onctueux" },
    ar: { name: "شيك فانيليا", description: "فانيليا مدغشقر، ناعم" }
  },
  'shake-3': {
    fr: { name: "Délice Fraise", description: "Fraises fraîches, crème" },
    ar: { name: "بهجة الفراولة", description: "فراولة طازجة، كريمة" }
  },
  'shake-4': {
    fr: { name: "Banane Caramel", description: "Banane, filet de caramel" },
    ar: { name: "موز وكراميل", description: "موز، رذاذ كراميل" }
  },

  // Toast
  'toast-1': {
    fr: { name: "Bénédicte Signature", description: "Œufs pochés, hollandaise" },
    ar: { name: "بنديكت المميز", description: "بيض مسلوق، هولنديز" }
  },
  'toast-2': {
    fr: { name: "Omelette Truffe", description: "Champignons, huile de truffe" },
    ar: { name: "عجة الكمأة", description: "فطر، زيت الكمأة" }
  },
  'toast-3': {
    fr: { name: "Shakshuka", description: "Tomate, poivrons, œufs" },
    ar: { name: "شكشوكة", description: "طماطم، فلفل، بيض" }
  },
  'toast-4': {
    fr: { name: "Toast Avocat", description: "Levain, avocat écrasé" },
    ar: { name: "توست الأفوكادو", description: "خبز العجين المخمر، أفوكادو مهروس" }
  },
  'toast-5': {
    fr: { name: "Bénédicte Classique", description: "Jambon, hollandaise" },
    ar: { name: "بنديكت كلاسيكي", description: "لحم، هولنديز" }
  },
  'toast-6': {
    fr: { name: "Bol Énergie Vegan", description: "Graines, légumes verts" },
    ar: { name: "وعاء الطاقة النباتي", description: "حبوب، خضروات" }
  },

  // Pastry
  'pastry-1': {
    fr: { name: "Croissant au Beurre", description: "Feuilleté, beurre français" },
    ar: { name: "كرواسون بالزبدة", description: "طبقات هشة، زبدة فرنسية" }
  },
  'pastry-2': {
    fr: { name: "Croissant aux Amandes", description: "Frangipane, amandes grillées" },
    ar: { name: "كرواسون باللوز", description: "فرانجيبان، لوز محمص" }
  },
  'pastry-3': {
    fr: { name: "Éclair au Chocolat", description: "Pâte à choux, ganache riche" },
    ar: { name: "إكلير الشوكولاتة", description: "عجينة الشو، غاناش غني" }
  },
  'pastry-4': {
    fr: { name: "Tarte aux Fraises", description: "Crème pâtissière, fraises fraîches" },
    ar: { name: "تارت الفراولة", description: "كاسترد الفانيليا، فراولة طازجة" }
  },
  'pastry-5': {
    fr: { name: "Tarte Citron Meringuée", description: "Caillé piquant, meringue brûlée" },
    ar: { name: "تارت الليمون والميرينغ", description: "خثرة لاذعة، ميرينغ محمر" }
  },
  'pastry-6': {
    fr: { name: "Part de Gâteau Velours", description: "Mie moelleuse, glaçage vanille" },
    ar: { name: "شريحة كيك مخملي", description: "فتات رطب، كريمة فانيليا" }
  }
};

function getTranslation(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || (translations['en'] && translations['en'][key]) || key;
}

function getMenuTranslation(item, field) {
  const lang = getLang();
  if (lang === 'en') return item[field];
  
  if (menuTranslations[item.id] && menuTranslations[item.id][lang] && menuTranslations[item.id][lang][field]) {
    return menuTranslations[item.id][lang][field];
  }
  return item[field];
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('stitch_lang', lang);
  
  // RTL Support
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
  }

  // Update static text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
    }
  });

  // Update Toggle UI
  const toggle = document.getElementById('language-toggle');
  const label = document.getElementById('current-language');
  if (toggle && label) {
    toggle.classList.remove('lang-en', 'lang-fr', 'lang-ar');
    toggle.classList.add(`lang-${lang}`);
    label.textContent = lang === 'en' ? 'English' : (lang === 'fr' ? 'Français' : 'العربية');
  }
  
  // Re-render content
  if (typeof bestsellers !== 'undefined' && bestsellers.length) {
      renderBestsellers(bestsellers);
  }
  renderCategories();
  updateCartUI();
  
  const modal = document.getElementById('order-modal');
  if (modal && !modal.classList.contains('hidden')) {
    renderCartItems();
  }
}

function getLang() {
  return localStorage.getItem('stitch_lang') || 'en';
}

document.addEventListener('DOMContentLoaded', () => {
  cart = getStoredCart();
  updateCartUI();
  fetchBestsellers();
  renderCategories();
  setupEvents();
  
  // Check for language preference
  const lang = getLang();
  applyLang(lang); // Always apply to ensure UI sync

  setupLanguageToggle();
});

function setupLanguageToggle() {
  const toggle = document.getElementById('language-toggle');
  
  if (!toggle) return;

  toggle.addEventListener('click', function() {
    const current = getLang();
    let next = 'en';
    if (current === 'en') next = 'fr';
    else if (current === 'fr') next = 'ar';
    else if (current === 'ar') next = 'en';
    
    applyLang(next);
  });
}
