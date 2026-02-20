
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
  { id: 'brunch-6', name: "Steak & Eggs", description: "6oz sirloin, two eggs any style.", price: 19.50, image: "https://images.unsplash.com/photo-1598511726623-d090c279a04a?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-7', name: "Fit Egg-White", description: "Spinach, goat cheese, egg whites.", price: 13.50, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-8', name: "Brunch Tacos", description: "Corn tortillas, pickled onions, avocado.", price: 11.00, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-9', name: "Iron Frittata", description: "Onions, potatoes, aged cheddar.", price: 14.75, image: "https://images.unsplash.com/photo-1598511726623-d090c279a04a?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-10', name: "Acai Delight", description: "Mixed berries, granola, honey.", price: 12.00, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop", category: "Brunch" },
  { id: 'brunch-11', name: "Belgian Gold", description: "Crispy waffles, berries, cream.", price: 11.50, image: "assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg", category: "Brunch" },
  { id: 'brunch-12', name: "Full English", description: "Sausage, bacon, eggs, beans, toast.", price: 22.00, image: "https://images.unsplash.com/photo-1533089862017-a0e27b80d72a?q=80&w=500&auto=format&fit=crop", category: "Brunch" },

  // Brew
  { id: 'brew-1', name: "Nitro Cold Brew", description: "18-hour steep, nitrogen infused.", price: 6.50, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=500&auto=format&fit=crop", category: "Cold Brew" },
  { id: 'brew-2', name: "Ceremonial Matcha", description: "Uji-sourced matcha with oat milk.", price: 7.25, image: "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=500&auto=format&fit=crop", category: "Tea" },
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
  { id: 'creme-4', name: "Classic Apple Juice", description: "Cold pressed apples", price: 4.00, image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?q=80&w=500", category: "Juice" },
  { id: 'creme-5', name: "Berry Citrus", description: "Strawberry and grapefruit", price: 5.20, image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=500", category: "Juice" },

  // Juices (unique items)
  { id: 'juice-1', name: "Lemon Mint", description: "Zesty lemon with mint", price: 4.10, image: "assets/colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521.avif", category: "Juice" },
  { id: 'juice-2', name: "Pineapple Punch", description: "Tropical pineapple blend", price: 4.80, image: "assets/exotic-cocktail-closeup_181624-983.avif", category: "Juice" },
  { id: 'juice-3', name: "Mango Glow", description: "Alphonso mango puree", price: 5.25, image: "assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "Juice" },

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
  { id: 'smoothie-1', name: "Berry Burst", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "assets/raspberry-smoothie_1150-18529.jpg", category: "Smoothie" },
  { id: 'smoothie-2', name: "Green Power", description: "Spinach, apple, banana", price: 5.00, image: "assets/kiwi-milk-shake-table_140725-8608.jpg", category: "Smoothie" },
  { id: 'shake-1', name: "Classic Chocolate Shake", description: "Rich cocoa, creamy base", price: 5.20, image: "assets/close-up-milkshake-glass-plate_117406-7215.jpg", category: "Shake" },
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
  
  container.innerHTML = items.map(item => {
    const imgUrl = item.image || item.image_url;
    const displayImg = imgUrl ? imgUrl : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop';
    const rating = typeof item.rating === 'number' ? item.rating : getRatingForItem(item);
    
    return `
    <div class="bg-white dark:bg-[#2a1e19] rounded-[1.5rem] p-3 shadow-md border border-gray-100 dark:border-white/5 flex gap-3 items-center" data-category="${item.category}">
      <div class="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-gray-50 dark:bg-black/20 relative shrink-0">
        <img src="${displayImg}" class="w-full h-full object-cover" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop'">
        <div class="absolute top-1 right-1 bg-white/90 dark:bg-black/60 px-1 rounded-full shadow-sm">
          <span class="material-symbols-outlined text-[12px] text-primary">${getCategoryIcon(item.category)}</span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-[13px] md:text-sm text-gray-900 dark:text-white leading-tight">${item.name}</h4>
        <div class="flex items-center gap-1 mt-0.5">
          <span class="material-symbols-outlined text-[14px] text-yellow-500" style="font-variation-settings: 'FILL' 1">star</span>
          <span class="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">${Number(rating).toFixed(1)}</span>
          <span class="text-[10px] text-gray-400">(${Math.floor(Number(rating) * 25)}+)</span>
        </div>
        <p class="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">${item.description}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-xs font-bold text-primary">$${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
          <button class="size-7 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors active:scale-95" onclick="addToCart('${item.id}')">
            <span class="material-symbols-outlined text-[16px] text-primary">add</span>
          </button>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderCategories(items) {
  // SUB-CATEGORIES to be displayed as circles with real images
  const subCategories = [
    { name: 'Brunch', img: 'https://images.unsplash.com/photo-1559622214-f8a985d3ccaa?q=80&w=300&auto=format&fit=crop', link: '../long_scroll_brunch_explorer/index.html' },
    { name: 'Brew', img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=300&auto=format&fit=crop', link: '../Brew catégorie page/index.html' },
    { name: 'Tea & Infusion', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=300&auto=format&fit=crop', link: '../tea and infusion sub catégorie page/index.html' },
    { name: 'Milkshake', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=300&auto=format&fit=crop', link: '../milkshake sub catégorie page/index.html' },
    { name: 'Juice', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=300&auto=format&fit=crop', link: '../juces sub catégorie page/index.html' },
    { name: 'Sweet Pastries', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=300&auto=format&fit=crop', link: '../sweet pastries sub catégorie page/index.html' },
    { name: 'Black Coffee', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=300&auto=format&fit=crop', link: '../black coffee sub catégorie page/index.html' },
    { name: 'Latte', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=300&auto=format&fit=crop', link: '../latté hot drink sub catégorie page/index.html' },
    { name: 'Smoothie', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=300&auto=format&fit=crop', link: '../smothie sub catégorie page/index.html' },
    { name: 'Toast', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=300&auto=format&fit=crop', link: '../toast brunch sub catégorie page/index.html' },
    { name: 'Artisanal Bread', img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=300&auto=format&fit=crop', link: '../artisanal bread sub catégorie page/index.html' }
  ];

  const container = document.getElementById('explore-categories');
  if (!container) return;

  container.innerHTML = subCategories.map(cat => `
    <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='${cat.link}'">
      <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
          <div class="w-16 h-16 rounded-full overflow-hidden relative">
            <img src="${cat.img}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
          </div>
        </div>
      </div>
      <p class="text-[10px] text-gray-800 dark:text-white text-center">${cat.name}</p>
    </div>
  `).join('');

  // Ensure labels display correct names (override any default text)
  const labels = container.querySelectorAll('p.text-[10px].text-center');
  labels.forEach((label, idx) => {
    const name = subCategories[idx] && subCategories[idx].name;
    if (name && label.textContent.trim().toLowerCase() !== name.toLowerCase()) {
      label.textContent = name;
    }
  });

  // Attach category-specific fallback images to avoid coffee-only fallbacks
  container.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const cat = img.getAttribute('alt') || '';
      img.src = getCategoryFallback(cat);
    }, { once: true });
  });
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
function getCategoryFallback(cat) {
  const map = {
    'Brunch': 'assets/Brunch.jpg',
    'Brew': 'assets/Brew.jpg',
    'Black Coffee': 'assets/Brew.jpg',
    'Cold Drink': 'assets/Cold%20drinks.jpg',
    'Pastry': 'assets/pastry.jpg',
    'Sweet Pastries': 'assets/pastry.jpg',
    'Latte': 'assets/Brew.jpg',
    // For categories without local assets, use neutral non-coffee fallbacks
    'Tea & Infusion': 'assets/Brunch.jpg',
    'Milkshake': 'assets/Cold%20drinks.jpg',
    'Juice': 'assets/Cold%20drinks.jpg',
    'Smoothie': 'assets/Cold%20drinks.jpg',
    'Toast': 'assets/Brunch.jpg',
    'Artisanal Bread': 'assets/pastry.jpg'
  };
  return map[cat] || 'assets/Brunch.jpg';
}

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
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = total;
    badge.classList.toggle('hidden', total === 0);
  }
}

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
      alert('Search feature coming soon!');
    });
  }
}

// Language Helper (Placeholder for future translation logic)
function applyLang(lang) {
  document.documentElement.lang = lang;
  // Here we would update text content based on a dictionary
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
  if (lang !== 'en') applyLang(lang);
});

