
const allMenuItems = [
  // Brunch
  { id: 'brunch-1', name: "delicious-omelette-bursting-with-fillings-featuring-eggs-vegetables-and-cheese-creating-vibrant-and-appetizing-presentation-perfect-for-breakfast-or-brunch-lovers-png", description: "Organic eggs, cheddar, fresh herbs.", price: 12.50, image: "../../images/sub catégorie images/Brunch food/Salade Cesar.jpg", category: "Brunch" },
  { id: 'brunch-2', name: "croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329", description: "English muffin, bacon, hollandaise sauce.", price: 16.00, image: "../../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", category: "Brunch" },
  { id: 'brunch-3', name: "Petit Déjeuner Latino", description: "Poached eggs in hearty spicy tomato sauce.", price: 15.50, image: "../../images/sub catégorie images/Brunch food/Petit Déjeuner Latino.jpg", category: "Brunch" },
  { id: 'brunch-4', name: "Salade Marocaine", description: "Roasted potatoes, kale, peppers.", price: 14.50, image: "../../images/sub catégorie images/Brunch food/Salade Marocaine.jpg", category: "Brunch" },
  { id: 'brunch-5', name: "Petit Déjeuner Nordique", description: "Chorizo, scrambled eggs, beans.", price: 13.00, image: "../../images/sub catégorie images/Brunch food/Petit Déjeuner Nordique.jpg", category: "Brunch" },
  { id: 'brunch-6', name: "Orange Chesse Cake", description: "6oz sirloin, two eggs any style.", price: 19.50, image: "../../images/sub catégorie images/sweets/Orange Chesse Cake.jpg", category: "Brunch" },
  { id: 'brunch-7', name: "fluffy-scrambled-eggs-garnished-with-rosemary-png", description: "Spinach, goat cheese, egg whites.", price: 13.50, image: "../../images/sub catégorie images/Brunch food/fluffy-scrambled-eggs-garnished-with-rosemary-png.png", category: "Brunch" },
  { id: 'brunch-8', name: "Crème Caramel", description: "Corn tortillas, pickled onions, avocado.", price: 11.00, image: "../../images/sub catégorie images/sweets/Crème Caramel.jpg", category: "Brunch" },
  { id: 'brunch-9', name: "Toast Frittata", description: "Onions, potatoes, aged cheddar.", price: 14.75, image: "../../images/sub catégorie images/toast/Toast Frittata.jpg", category: "Brunch" },
  { id: 'brunch-10', name: "panne cake with berries ", description: "Mixed berries, granola, honey.", price: 12.00, image: "../../images/sub catégorie images/sweets/Orange Chesse Cake.jpg", category: "Brunch" },
  { id: 'brunch-11', name: "waffles with Honey and Creme", description: "Crispy waffles, berries, cream.", price: 11.50, image: "../../images/sub catégorie images/sweets/waffles with Honey and Creme.jpg", category: "Brunch" },
  { id: 'brunch-12', name: "delicious-and-hearty-full-english-breakfast-plate-with-fried-eggs-sausages-toast-beans-and-tomatoes-isolated-on-transparent-background-png", description: "Sausage, bacon, eggs, beans, toast.", price: 22.00, image: "../../images/sub catégorie images/Brunch food/delicious-and-hearty-full-english-breakfast-plate-with-fried-eggs-sausages-toast-beans-and-tomatoes-isolated-on-transparent-background-png.png", category: "Brunch" },

  // Brew
  { id: 'brew-1', name: "Café Noir Italien", description: "18-hour steep, nitrogen infused.", price: 6.50, image: "../../images/sub catégorie images/black coffee/Café Noir Italien.jpg", category: "Cold Brew" },
  { id: 'brew-2', name: "Matcha Latte", description: "Uji-sourced matcha with oat milk.", price: 7.25, image: "../../images/sub catégorie images/latté/Matcha Latte.jpg", category: "Tea" },
  { id: 'brew-3', name: "Ethiopian Yirgacheffe", description: "Floral notes with a citrus finish.", price: 5.00, image: "../../images/sub catégorie images/latté/Ethiopian Yirgacheffe.jpg", category: "Coffee" },
  { id: 'brew-4', name: "Café Royal", description: "House-made spices, double shot.", price: 6.75, image: "../../images/sub catégorie images/black coffee/Café Royal.jpg", category: "Coffee" },
  { id: 'brew-5', name: "Café au Lait Artisanal", description: "Equal parts espresso & milk.", price: 4.50, image: "../../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", category: "Coffee" },
  { id: 'brew-6', name: "lavender Tea", description: "Floral infusion with local honey.", price: 7.50, image: "../../images/sub catégorie images/tea/lavender Tea.jpg", category: "Tea" },
  { id: 'brew-7', name: "Golden Turmeric", description: "Spiced healing brew.", price: 6.25, image: "../../images/sub catégorie images/smoothie/Golden Turmeric.jpg", category: "Tea" },
  { id: 'brew-8', name: "Café au lait avec la Creme", description: "Layered espresso & vanilla.", price: 6.50, image: "../../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", category: "Coffee" },
  { id: 'brew-9', name: "Café Léger ", description: "Hand poured perfection.", price: 8.00, image: "../../images/sub catégorie images/black coffee/Café Léger .jpg", category: "Coffee" },
  { id: 'brew-10', name: "Blueberry Infusion", description: "Antioxidant rich blend.", price: 5.75, image: "../../images/sub catégorie images/Jus/Blueberry Infusion.jpg", category: "Tea" },

  // Artisanal Bread
  { id: 'bread-1', name: "Chocolate Babka", description: "Rich dark chocolate ganache swirl.", price: 12.00, image: "../../images/sub catégorie images/sweets/Chocolate Babka.jpg", category: "Pastry" },
  { id: 'bread-3', name: "Salade Espagnol", description: "Robust German-style dense rye.", price: 10.50, image: "../../images/sub catégorie images/Brunch food/Salade Espagnol.jpg", category: "Bread" },
  { id: 'bread-4', name: "Herbed Focaccia", description: "Rosemary, garlic & olive oil.", price: 7.50, image: "../../images/sub catégorie images/Brunch food/Herbed Focaccia.jpg", category: "Bread" },
  { id: 'bread-5', name: "Waffels au Miels Crème", description: "Ultra-soft, buttery morning loaf.", price: 11.25, image: "../../images/sub catégorie images/sweets/Waffels au Miels Crème.jpg", category: "Bread" },
  { id: 'bread-6', name: "Salade Cesar", description: "Nutritious 100% whole grain.", price: 8.75, image: "../../images/sub catégorie images/Brunch food/Salade Cesar.jpg", category: "Bread" },
  { id: 'bread-7', name: "Sandwich Viand Hache", description: "Classic crust with an airy crumb.", price: 4.50, image: "../../images/sub catégorie images/Snack food/Sandwich Viand Hache.jpg", category: "Bread" },
  { id: 'bread-8', name: "Banana Split", description: "Sweet & tart artisan loaf.", price: 9.50, image: "../../images/sub catégorie images/sweets/Banana Split.jpg", category: "Bread" },

  // Black Coffee
  { id: 'coffee-1', name: "Café normal  ", description: "Double Shot, Silky Microfoam", price: 4.80, image: "../../images/sub catégorie images/black coffee/Café normal  .jpg", category: "Coffee" },
  { id: 'coffee-2', name: "Café Américain", description: "12-Hour Slow Drip Extraction", price: 5.50, image: "../../images/sub catégorie images/black coffee/Café Américain.jpg", category: "Cold Brew" },
  { id: 'coffee-3', name: "Café au Lait Artisanal", description: "Creamy, Nut-Free, Vegan", price: 5.20, image: "../../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", category: "Coffee" },
  { id: 'coffee-4', name: "Café Noire Expresso", description: "Intense Berry Notes", price: 3.50, image: "../../images/sub catégorie images/black coffee/Café Noire Expresso.jpg", category: "Coffee" },
  { id: 'coffee-5', name: "Chocolat Fondu", description: "70% Cacao, Double Espresso", price: 6.00, image: "../../images/sub catégorie images/sweets/Chocolat Fondu.jpg", category: "Coffee" },

  // Cold Drinks
  { id: 'cold-1', name: "Jus D'Orange", description: "Cold pressed Valencia oranges", price: 4.50, image: "../../images/sub catégorie images/Jus/Jus D'Orange.jpg", category: "Juice" },
  { id: 'cold-2', name: "raspberry-smoothie_1150-18529", description: "Greek yogurt, strawberry puree", price: 5.75, image: "../../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg", category: "Smoothie" },
  { id: 'cold-3', name: "close-up-milkshake-glass-plate_", description: "70% cacao, vanilla ice cream", price: 6.25, image: "../../images/sub catégorie images/milshake/close-up-milkshake-glass-plate_.jpg", category: "Shake" },
  { id: 'cold-4', name: "Café Crème", description: "Double shot over chilled milk", price: 5.50, image: "../../images/sub catégorie images/latté/Café Crème.jpg", category: "Coffee" },
  { id: 'cold-5', name: "Jus Mangue", description: "Alphonso mango, yogurt, cardamom", price: 5.00, image: "../../images/sub catégorie images/Jus/Jus Mangue.jpg", category: "Smoothie" },
  { id: 'cold-6', name: "Café Noir Italien", description: "12-hour steep, smooth finish", price: 4.90, image: "../../images/sub catégorie images/black coffee/Café Noir Italien.jpg", category: "Cold Brew" },

  // Creme/Latte
  { id: 'creme-1', name: "glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038", description: "Fresh orange with milk foam", price: 5.50, image: "../../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", category: "Coffee" },
  { id: 'creme-2', name: "colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521", description: "Lemon-lime with mint", price: 4.25, image: "../../images/sub catégorie images/Jus/colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521.avif", category: "Juice" },
  { id: 'creme-3', name: "delicious-indian-mango-drink-high-angle_23-2148734680", description: "Mango puree and light cream", price: 5.75, image: "../../images/sub catégorie images/Jus/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "Cold Drink" },
  { id: 'creme-4', name: "Jus de Pomme", description: "Cold pressed apples", price: 4.00, image: "../../images/sub catégorie images/Jus/Jus de Pomme.jpg", category: "Juice" },
  { id: 'creme-5', name: "Jus de Fraise ", description: "Strawberry and grapefruit", price: 5.20, image: "../../images/sub catégorie images/Jus/Jus de Fraise .jpg", category: "Juice" },

  // Juices
  { id: 'juice-1', name: "Cuba Mokhito", description: "Zesty lemon with mint", price: 4.10, image: "../../images/sub catégorie images/Jus/Cuba Mokhito.avif", category: "Juice" },
  { id: 'juice-2', name: "Jus D'ananas", description: "Tropical pineapple blend", price: 4.80, image: "../../images/sub catégorie images/Jus/Jus D'ananas.jpg", category: "Juice" },
  { id: 'juice-3', name: "Jus Mangue", description: "Alphonso mango puree", price: 5.25, image: "../../images/sub catégorie images/Jus/Jus Mangue.jpg", category: "Juice" },

  // Latte Hot
  { id: 'latte-1', name: "Café au lait avec la Creme", description: "Double shot, steamed milk", price: 4.80, image: "../../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", category: "Coffee" },
  { id: 'latte-2', name: "Café au Lait Artisanal", description: "House vanilla syrup", price: 5.10, image: "../../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", category: "Coffee" },
  { id: 'latte-3', name: "caramel-cold-shake-with-cream_", description: "Buttery caramel drizzle", price: 5.10, image: "../../images/sub catégorie images/sweets/caramel-cold-shake-with-cream_.avif", category: "Coffee" },
  { id: 'latte-4', name: "Chocolat Cake with Stawberrys", description: "Seasonal spices & puree", price: 5.40, image: "../../images/sub catégorie images/sweets/Chocolat Cake with Stawberrys.jpg", category: "Coffee" },

  // Tea
  { id: 'tea-1', name: "Matcha Latte", description: "Stone-ground, umami-rich", price: 12.00, image: "../../images/sub catégorie images/latté/Matcha Latte.jpg", category: "Tea" },
  { id: 'tea-2', name: "Tea Citron Délise", description: "Spiced, creamy, warming", price: 5.50, image: "../../images/sub catégorie images/tea/Tea Citron Délise.jpg", category: "Tea" },
  { id: 'tea-3', name: "Tea Nordique", description: "Zesty, soothing infusion", price: 4.75, image: "../../images/sub catégorie images/tea/Tea Nordique.jpg", category: "Tea" },
  { id: 'tea-4', name: "The Marocain a la Menthe", description: "Cooling green tea", price: 4.50, image: "../../images/sub catégorie images/tea/The Marocain a la Menthe.jpg", category: "Tea" },
  { id: 'tea-5', name: "Floral Tea", description: "Black tea, milk, caramel", price: 7.00, image: "../../images/sub catégorie images/tea/Floral Tea.jpg", category: "Tea" },
  { id: 'tea-6', name: "The de Hibiscus", description: "Fruity, floral, chilled", price: 6.50, image: "../../images/sub catégorie images/tea/The de Hibiscus.jpg", category: "Tea" },

  // Smoothie & Shake
  { id: 'smoothie-1', name: "Blue Berry Smoothie", description: "Strawberry, blueberry, yogurt", price: 5.20, image: "../../images/sub catégorie images/smoothie/Blue Berry Smoothie.jpg", category: "Smoothie" },
  { id: 'smoothie-2', name: "Kiwi Smoothie", description: "Spinach, apple, banana", price: 5.00, image: "../../images/sub catégorie images/smoothie/Kiwi Smoothie.jpg", category: "Smoothie" },
  { id: 'shake-1', name: "Milkshake Café Chocolat", description: "Rich cocoa, creamy base", price: 5.20, image: "../../images/sub catégorie images/milshake/Milkshake Café Chocolat.jpg", category: "Shake" },
  { id: 'shake-2', name: "Milkshake Oreo", description: "Madagascar vanilla, smooth", price: 5.00, image: "../../images/sub catégorie images/milshake/Milkshake Oreo.jpg", category: "Shake" },
  { id: 'shake-3', name: "strawberry-ice milkshake", description: "Fresh strawberries, cream", price: 5.40, image: "../../images/sub catégorie images/milshake/strawberry-ice milkshake.jpg", category: "Shake" },
  { id: 'shake-4', name: "Milkshake Banane", description: "Banana, caramel drizzle", price: 5.60, image: "../../images/sub catégorie images/milshake/Milkshake Banane.jpg", category: "Shake" },

  // Toast
  { id: 'toast-1', name: "Toast Champignon Frommage", description: "Poached eggs, hollandaise", price: 14.50, image: "../../images/sub catégorie images/toast/Toast Champignon Frommage.jpg", category: "Toast" },
  { id: 'toast-2', name: "Toast Frittata", description: "Mushrooms, truffle oil", price: 12.50, image: "../../images/sub catégorie images/toast/Toast Frittata.jpg", category: "Toast" },
  { id: 'toast-3', name: "Pumpkin Stew", description: "Tomato, peppers, eggs", price: 11.25, image: "../../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg", category: "Toast" },
  { id: 'toast-4', name: "toast", description: "Sourdough, smashed avo", price: 10.50, image: "../../images/sub catégorie images/toast/toast.jpg", category: "Toast" },
  { id: 'toast-5', name: "croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329", description: "Ham, hollandaise", price: 13.50, image: "../../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", category: "Toast" },
  { id: 'toast-6', name: "Toast Vegan", description: "Grains, greens", price: 12.00, image: "../../images/sub catégorie images/toast/Toast Vegan.jpg", category: "Toast" },

  // Pastry
  { id: 'pastry-1', name: "French Toast", description: "Flaky layers, French butter", price: 4.50, image: "../../images/sub catégorie images/sweets/French Toast.jpg", category: "Pastry" },
  { id: 'pastry-2', name: "Mille Feuilles", description: "Frangipane, toasted almond", price: 5.25, image: "../../images/sub catégorie images/sweets/Mille Feuilles.jpg", category: "Pastry" },
  { id: 'pastry-3', name: "Teramisu au Chocolat", description: "Choux pastry, rich ganache", price: 4.75, image: "../../images/sub catégorie images/sweets/Teramisu au Chocolat.jpg", category: "Pastry" },
  { id: 'pastry-4', name: "Waffels au fruit", description: "Vanilla custard, fresh berries", price: 5.80, image: "../../images/sub catégorie images/sweets/Waffels au fruit.jpg", category: "Pastry" },
  { id: 'pastry-5', name: "Chees Cake au Citron", description: "Zesty curd, torched meringue", price: 5.90, image: "../../images/sub catégorie images/sweets/Chees Cake au Citron.jpg", category: "Pastry" },
  { id: 'pastry-6', name: "Dark an White Chocolat Cake ", description: "Moist crumb, vanilla frosting", price: 4.95, image: "../../images/sub catégorie images/sweets/Dark an White Chocolat Cake .jpg", category: "Pastry" }
];

for (const item of allMenuItems) {
  if (typeof item.image === 'string' && item.image.startsWith('../../images/')) {
    item.image = item.image.replace('../../images/', '../images/');
  }
}
