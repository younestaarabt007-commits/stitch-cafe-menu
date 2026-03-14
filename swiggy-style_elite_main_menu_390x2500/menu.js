
const allMenuItems = [
  // Brunch
  { id: 'brunch-1', name: "Farm Omelette", description: "Organic eggs, cheddar, fresh herbs.", price: 12.50, image: "/assets/salty food and sweet brunch/0a928a23c6c3fb861e9c4ec54ae78b7d.jpg", category: "Brunch" },
  { id: 'brunch-2', name: "Eggs Benedict", description: "English muffin, bacon, hollandaise sauce.", price: 16.00, image: "/assets/salty food and sweet brunch/3f108fda33cdb811f37bf5dc2035c3dc.jpg", category: "Brunch" },
  { id: 'brunch-3', name: "Spicy Shakshuka", description: "Poached eggs in hearty spicy tomato sauce.", price: 15.50, image: "/assets/salty food and sweet brunch/5d9c920def5bef64b91715b917d667b2.jpg", category: "Brunch" },
  { id: 'brunch-4', name: "Garden Skillet", description: "Roasted potatoes, kale, peppers.", price: 14.50, image: "/assets/salty food and sweet brunch/5ec903108923b0eda69e0de6ab77a1f3.jpg", category: "Brunch" },
  { id: 'brunch-5', name: "Brunch Burrito", description: "Chorizo, scrambled eggs, beans.", price: 13.00, image: "/assets/salty food and sweet brunch/62e25e1c33624e2bc57b6e4531a36dc5.jpg", category: "Brunch" },
  { id: 'brunch-6', name: "Steak & Eggs", description: "6oz sirloin, two eggs any style.", price: 19.50, image: "/assets/salty food and sweet brunch/69c52da929160d633bd0def179265173.jpg", category: "Brunch" },
  { id: 'brunch-7', name: "Fit Egg-White", description: "Spinach, goat cheese, egg whites.", price: 13.50, image: "/assets/salty food and sweet brunch/89648609962eda9536c1eecdedbdf8ef.jpg", category: "Brunch" },
  { id: 'brunch-8', name: "Brunch Tacos", description: "Corn tortillas, pickled onions, avocado.", price: 11.00, image: "/assets/salty food and sweet brunch/902f3561ca86aba6382aad94c75b11f4.jpg", category: "Brunch" },
  { id: 'brunch-9', name: "Iron Frittata", description: "Onions, potatoes, aged cheddar.", price: 14.75, image: "/assets/salty food and sweet brunch/eb058f0421ae783ed7c55319ca504911.jpg", category: "Brunch" },
  { id: 'brunch-10', name: "Acai Delight", description: "Mixed berries, granola, honey.", price: 12.00, image: "/assets/smoothie-acai-bowl.jpg", category: "Brunch" },
  { id: 'brunch-11', name: "Belgian Gold", description: "Crispy waffles, berries, cream.", price: 11.50, image: "/assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg", category: "Brunch" },
  { id: 'brunch-12', name: "Full English", description: "Sausage, bacon, eggs, beans, toast.", price: 22.00, image: "/assets/brunch-full-english.jpg", category: "Brunch" },

  // Brew
  { id: 'brew-1', name: "Nitro Cold Brew", description: "18-hour steep, nitrogen infused.", price: 6.50, image: "/assets/coffee-nitro-brew.jpg", category: "Cold Brew" },
  { id: 'brew-2', name: "Matcha Latte", description: "Uji-sourced matcha with oat milk.", price: 7.25, image: "/assets/Matcha Latte.jpg", category: "Tea" },
  { id: 'brew-3', name: "Ethiopian Yirgacheffe", description: "Floral notes with a citrus finish.", price: 5.00, image: "/assets/Ethiopian Yirgacheffe.jpg", category: "Coffee" },
  { id: 'brew-4', name: "Dirty Masala Chai", description: "House-made spices, double shot.", price: 6.75, image: "/assets/tea-dirty-chai-espresso.jpg", category: "Coffee" },
  { id: 'brew-5', name: "Oat Milk Cortado", description: "Equal parts espresso & milk.", price: 4.50, image: "/assets/coffee-oat-milk-latte.jpg", category: "Coffee" },
  { id: 'brew-6', name: "Lavender Honey", description: "Floral infusion with local honey.", price: 7.50, image: "/assets/tea-lavender-earl.jpg", category: "Coffee" },
  { id: 'brew-7', name: "Golden Turmeric", description: "Spiced healing brew.", price: 6.25, image: "/assets/Golden Turmeric.jpg", category: "Tea" },
  { id: 'brew-8', name: "Caramel Macchiato", description: "Layered espresso & vanilla.", price: 6.50, image: "/assets/latte-caramel-macchiato.jpg", category: "Coffee" },
  { id: 'brew-9', name: "Light Black Coffee", description: "Hand poured perfection.", price: 8.00, image: "/assets/Light Black Coffee.jpg", category: "Coffee" },
  { id: 'brew-10', name: "Blueberry Infusion", description: "Antioxidant rich blend.", price: 5.75, image: "/assets/Blueberry Infusion.jpg", category: "Tea" },

  // Artisanal Bread
  { id: 'bread-1', name: "Chocolate Babka", description: "Rich dark chocolate ganache swirl.", price: 12.00, image: "/assets/bakery-chocolate-babka.jpg", category: "Pastry" },
  { id: 'bread-2', name: "Seeded Multigrain", description: "Hand-topped with flax & oats.", price: 9.00, image: "/assets/bakery-seeded-multigrain.jpg", category: "Bread" },
  { id: 'bread-3', name: "Dark Rye Loaf", description: "Robust German-style dense rye.", price: 10.50, image: "/assets/bakery-dark-rye-loaf.jpg", category: "Bread" },
  { id: 'bread-4', name: "Herbed Focaccia", description: "Rosemary, garlic & olive oil.", price: 7.50, image: "/assets/bakery-herbed-focaccia.jpg", category: "Bread" },
  { id: 'bread-5', name: "Honey Brioche", description: "Ultra-soft, buttery morning loaf.", price: 11.25, image: "/assets/bakery-honey-brioche.jpg", category: "Bread" },
  { id: 'bread-6', name: "Stoneground Wheat", description: "Nutritious 100% whole grain.", price: 8.75, image: "/assets/bakery-stoneground-wheat.jpg", category: "Bread" },
  { id: 'bread-7', name: "Parisian Baguette", description: "Classic crust with an airy crumb.", price: 4.50, image: "/assets/bakery-parisian-baguette.jpg", category: "Bread" },
  { id: 'bread-8', name: "Cranberry Walnut", description: "Sweet & tart artisan loaf.", price: 9.50, image: "/assets/bakery-cranberry-walnut.jpg", category: "Bread" },

  // Black Coffee
  { id: 'coffee-1', name: "Velvet Flat White", description: "Double Shot, Silky Microfoam", price: 4.80, image: "/assets/coffee-velvet-flat-white.jpg", category: "Coffee" },
  { id: 'coffee-2', name: "Kyoto Cold Brew", description: "12-Hour Slow Drip Extraction", price: 5.50, image: "/assets/coffee-kyoto-cold-brew.jpg", category: "Cold Brew" },
  { id: 'coffee-3', name: "Oat Milk Latte", description: "Creamy, Nut-Free, Vegan", price: 5.20, image: "/assets/latte-oat.jpg", category: "Coffee" },
  { id: 'coffee-4', name: "Single Origin Espresso", description: "Intense Berry Notes", price: 3.50, image: "/assets/coffee-single-origin-espresso.jpg", category: "Coffee" },
  { id: 'coffee-5', name: "Dark Mocha", description: "70% Cacao, Double Espresso", price: 6.00, image: "/assets/coffee-dark-mocha.jpg", category: "Coffee" },

  // Cold Drinks
  { id: 'cold-1', name: "Fresh Orange Juice", description: "Cold pressed Valencia oranges", price: 4.50, image: "/assets/juice-orange.jpg", category: "Juice" },
  { id: 'cold-2', name: "Strawberry Smoothie", description: "Greek yogurt, strawberry puree", price: 5.75, image: "/assets/cold-strawberry-smoothie.jpg", category: "Smoothie" },
  { id: 'cold-3', name: "Chocolate Shake", description: "70% cacao, vanilla ice cream", price: 6.25, image: "/assets/close-up-milkshake-glass-plate_117406-7215.jpg", category: "Shake" },
  { id: 'cold-4', name: "Iced Latte", description: "Double shot over chilled milk", price: 5.50, image: "/assets/cold-iced-latte.jpg", category: "Coffee" },
  { id: 'cold-5', name: "Mango Lassi", description: "Alphonso mango, yogurt, cardamom", price: 5.00, image: "/assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "Smoothie" },
  { id: 'cold-6', name: "Cold Brew", description: "12-hour steep, smooth finish", price: 4.90, image: "/assets/coffee-classic-cold-brew.jpg", category: "Cold Brew" },

  // Creme/Latte
  { id: 'creme-1', name: "Creamy Orange Latte", description: "Fresh orange with milk foam", price: 5.50, image: "/assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", category: "Coffee" },
  { id: 'creme-2', name: "Citrus Spark", description: "Lemon-lime with mint", price: 4.25, image: "/assets/juice-lemon-mint.jpg", category: "Juice" },
  { id: 'creme-3', name: "Mango Cream Fizz", description: "Mango puree and light cream", price: 5.75, image: "/assets/juice-mango-fizz.jpg", category: "Cold Drink" },
  { id: 'creme-4', name: "Classic Apple Juice", description: "Cold pressed apples", price: 4.00, image: "/assets/juice-apple-classic.jpg", category: "Juice" },
  { id: 'creme-5', name: "Berry Citrus", description: "Strawberry and grapefruit", price: 5.20, image: "/assets/juice-berry-blast.jpg", category: "Juice" },

  // Juices
  { id: 'juice-1', name: "Lemon Mint", description: "Zesty lemon with mint", price: 4.10, image: "/assets/juice-lemon-mint.jpg", category: "Juice" },
  { id: 'juice-2', name: "Pineapple Punch", description: "Tropical pineapple blend", price: 4.80, image: "/assets/juice-pineapple-punch.jpg", category: "Juice" },
  { id: 'juice-3', name: "Mango Glow", description: "Alphonso mango puree", price: 5.25, image: "/assets/juice-mango-glow.jpg", category: "Juice" },

  // Latte Hot
  { id: 'latte-1', name: "Classic Latte", description: "Double shot, steamed milk", price: 4.80, image: "/assets/latte-classic.jpg", category: "Coffee" },
  { id: 'latte-2', name: "Vanilla Latte", description: "House vanilla syrup", price: 5.10, image: "/assets/latte-vanilla-bean.jpg", category: "Coffee" },
  { id: 'latte-3', name: "Caramel Latte", description: "Buttery caramel drizzle", price: 5.10, image: "/assets/latte-caramel-swirl.jpg", category: "Coffee" },
  { id: 'latte-4', name: "Pumpkin Spice Latte", description: "Seasonal spices & puree", price: 5.40, image: "/assets/latte-pumpkin-spice.jpg", category: "Coffee" },

  // Tea
  { id: 'tea-1', name: "Matcha Latte", description: "Stone-ground, umami-rich", price: 12.00, image: "/assets/Matcha Latte.jpg", category: "Tea" },
  { id: 'tea-2', name: "Masala Chai", description: "Spiced, creamy, warming", price: 5.50, image: "/assets/tea-masala-chai.jpg", category: "Tea" },
  { id: 'tea-3', name: "Ginger Lemon", description: "Zesty, soothing infusion", price: 4.75, image: "/assets/tea-ginger-lemon.jpg", category: "Tea" },
  { id: 'tea-4', name: "Moroccan Mint", description: "Cooling green tea", price: 4.50, image: "/assets/tea-moroccan-mint.jpg", category: "Tea" },
  { id: 'tea-5', name: "Royal Milk Tea", description: "Black tea, milk, caramel", price: 7.00, image: "/assets/tea-royal-milk.jpg", category: "Tea" },
  { id: 'tea-6', name: "Iced Peach Oolong", description: "Fruity, floral, chilled", price: 6.50, image: "/assets/tea-iced-peach.jpg", category: "Tea" },

  // Smoothie & Shake
  { id: 'smoothie-1', name: "Berry Burst", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "/assets/smoothie-berry-cream.jpg", category: "Smoothie" },
  { id: 'smoothie-2', name: "Green Power", description: "Spinach, apple, banana", price: 5.00, image: "/assets/smoothie-green-power.jpg", category: "Smoothie" },
  { id: 'shake-1', name: "Classic Chocolate Shake", description: "Rich cocoa, creamy base", price: 5.20, image: "/assets/smoothie-choco-malt.jpg", category: "Shake" },
  { id: 'shake-2', name: "Vanilla Bean Shake", description: "Madagascar vanilla, smooth", price: 5.00, image: "/assets/shake-vanilla-bean.jpg", category: "Shake" },
  { id: 'shake-3', name: "Strawberry Bliss", description: "Fresh strawberries, cream", price: 5.40, image: "/assets/shake-strawberry.jpg", category: "Shake" },
  { id: 'shake-4', name: "Banana Caramel", description: "Banana, caramel drizzle", price: 5.60, image: "/assets/shake-banana-caramel.jpg", category: "Shake" },

  // Toast
  { id: 'toast-1', name: "Signature Benedict", description: "Poached eggs, hollandaise", price: 14.50, image: "/assets/toast-signature-benedict.jpg", category: "Toast" },
  { id: 'toast-2', name: "Truffle Omelette", description: "Mushrooms, truffle oil", price: 12.50, image: "/assets/brunch-farm-omelette.jpg", category: "Toast" },
  { id: 'toast-3', name: "Shakshuka", description: "Tomato, peppers, eggs", price: 11.25, image: "/assets/toast-shakshuka.jpg", category: "Toast" },
  { id: 'toast-4', name: "Avocado Toast", description: "Sourdough, smashed avo", price: 10.50, image: "/assets/toast-avocado.jpg", category: "Toast" },
  { id: 'toast-5', name: "Classic Benedict", description: "Ham, hollandaise", price: 13.50, image: "/assets/toast-benedict.jpg", category: "Toast" },
  { id: 'toast-6', name: "Vegan Power Bowl", description: "Grains, greens", price: 12.00, image: "/assets/toast-vegan-bowl.jpg", category: "Toast" },

  // Pastry
  { id: 'pastry-1', name: "Butter Croissant", description: "Flaky layers, French butter", price: 4.50, image: "/assets/sweet-butter-croissant.jpg", category: "Pastry" },
  { id: 'pastry-2', name: "Almond Croissant", description: "Frangipane, toasted almond", price: 5.25, image: "/assets/sweet-almond-croissant.jpg", category: "Pastry" },
  { id: 'pastry-3', name: "Chocolate Éclair", description: "Choux pastry, rich ganache", price: 4.75, image: "/assets/bakery-chocolate-eclair.jpg", category: "Pastry" },
  { id: 'pastry-4', name: "Strawberry Tart", description: "Vanilla custard, fresh berries", price: 5.80, image: "/assets/sweet-strawberry-tart.jpg", category: "Pastry" },
  { id: 'pastry-5', name: "Lemon Meringue Tart", description: "Zesty curd, torched meringue", price: 5.90, image: "/assets/sweet-lemon-meringue.jpg", category: "Pastry" },
  { id: 'pastry-6', name: "Velvet Cake Slice", description: "Moist crumb, vanilla frosting", price: 4.95, image: "/assets/sweet-velvet-cake.jpg", category: "Pastry" }
];
