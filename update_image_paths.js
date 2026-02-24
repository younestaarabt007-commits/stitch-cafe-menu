
const fs = require('fs');
const path = require('path');

// We are running from stitch_caf_menu_table_12
const rootDir = process.cwd();
const commonPath = '../swiggy-style_elite_main_menu_390x2500/assets/';

// Helper to update file content
function updateFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    replacements.forEach(({ search, replace }) => {
        if (search instanceof RegExp) {
            if (search.test(content)) {
                content = content.replace(search, replace);
                modified = true;
            }
        } else {
            if (content.includes(search)) {
                content = content.replace(search, replace);
                modified = true;
            }
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    } else {
        console.log(`No changes for: ${filePath}`);
    }
}

// Helper to update products in script.js
function updateProductsInScript(scriptPath, updates) {
    if (!fs.existsSync(scriptPath)) {
        console.log(`Script not found: ${scriptPath}`);
        return;
    }
    
    let content = fs.readFileSync(scriptPath, 'utf8');
    // Match the products array block
    const productMatch = content.match(/(const products = \[\s*[\s\S]*?\];)/);
    
    if (productMatch) {
        let productBlock = productMatch[1];
        let modified = false;
        
        updates.forEach(update => {
            // Regex to find the object property 'name' and then 'image'
            // We look for name: 'Something', then later image: '...'
            // We want to replace the image value
            const regex = new RegExp(`(name:\\s*["']${update.name}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'i');
            
            if (regex.test(productBlock)) {
                const match = productBlock.match(regex);
                // Only replace if it's not already the correct image
                if (match && !match[2].includes(update.image)) {
                    productBlock = productBlock.replace(regex, `$1${commonPath}${update.image}`);
                    modified = true;
                }
            }
        });
        
        if (modified) {
            content = content.replace(/(const products = \[\s*[\s\S]*?\];)/, productBlock);
            fs.writeFileSync(scriptPath, content, 'utf8');
            console.log(`Updated objects in: ${scriptPath}`);
        } else {
            console.log(`No object updates needed for: ${scriptPath}`);
        }
    }
}

// Use current directory as base since we are running from there
const basePath = rootDir;

// --- 1. JUICES (Script.js) ---
updateProductsInScript(path.join(basePath, 'juces sub catégorie page', 'script.js'), [
    { name: 'Fresh Orange Juice', image: 'juice-orange.jpg' },
    { name: 'Apple Zest', image: 'juice-apple.jpg' },
    { name: 'Carrot Boost', image: 'juice-carrot.jpg' },
    { name: 'Watermelon Refresh', image: 'juice-watermelon.jpg' },
    { name: 'Pineapple Punch', image: 'juice-pineapple.jpg' }, // If missing, maybe use orange
    { name: 'Classic Lemonade', image: 'juice-lemonade.jpg' },
    { name: 'Mixed Berry', image: 'juice-apple.jpg' }, // Fallback
    { name: 'Mango Magic', image: 'juice-orange.jpg' } // Fallback
]);

// --- 2. TEA (Script.js) ---
updateProductsInScript(path.join(basePath, 'tea hot drink sub catégorie page', 'script.js'), [
    { name: 'Moroccan Mint Tea', image: 'tea-mint.jpg' },
    { name: 'Green Tea', image: 'tea-green.jpg' },
    { name: 'English Breakfast', image: 'tea-earl-grey.jpg' }, // Fallback
    { name: 'Earl Grey', image: 'tea-earl-grey.jpg' },
    { name: 'Chamomile', image: 'tea-green.jpg' }, // Fallback
    { name: 'Iced Lemon Tea', image: 'tea-iced-lemon.jpg' },
    { name: 'Hibiscus', image: 'tea-green.jpg' } // Fallback
]);

// --- 3. PASTRIES / BAKERY (Script.js & HTML) ---
updateProductsInScript(path.join(basePath, 'bakery catégorie page', 'script.js'), [
    { name: 'Blueberry Muffin', image: 'pastry-muffin-blueberry.jpg' },
    { name: 'Chocolate Muffin', image: 'pastry-muffin-chocolate.jpg' },
    { name: 'Croissant', image: 'bread-butter-croissant.jpg' }, // From previous
    { name: 'Pain au Chocolat', image: 'bread-pain-au-chocolat.jpg' }, // From previous
    { name: 'Danish Pastry', image: 'bread-butter-croissant.jpg' }, // Fallback
    { name: 'Fruit Tart', image: 'pastry-muffin-blueberry.jpg' } // Fallback
]);

// --- 4. BLACK COFFEE (Script.js) ---
updateProductsInScript(path.join(basePath, 'black coffee sub catégorie page', 'script.js'), [
    { name: 'Espresso', image: 'coffee-americano.jpg' }, // Fallback
    { name: 'Americano', image: 'coffee-americano.jpg' },
    { name: 'Long Black', image: 'coffee-americano.jpg' }, // Fallback
    { name: 'Macchiato', image: 'coffee-americano.jpg' } // Fallback
]);

// --- 5. PREVIOUS UPDATES (Re-run to ensure consistency) ---
// Artisanal Bread (HTML)
updateFile(path.join(basePath, 'artisanal bread sub catégorie page', 'index.html'), [
    { 
        search: /https:\/\/images\.unsplash\.com\/photo-1590095834643-753c0e4972c2[^\"]+/g, 
        replace: `${commonPath}bread-butter-croissant.jpg` 
    },
    { 
        search: /https:\/\/images\.unsplash\.com\/photo-1568758881209-4893f8ca3b58[^\"]+/g, 
        replace: `${commonPath}bread-pain-au-chocolat.jpg` 
    },
    {
        search: /assets\/bread-baguette.jpg/g,
        replace: `${commonPath}bread-baguette.jpg`
    }
]);

// Smoothies & Shakes (JS)
updateProductsInScript(path.join(basePath, 'smothies and shakes sub catégorie page', 'script.js'), [
    { name: 'Green Glow', image: 'smoothie-green-glow.jpg' },
    { name: 'Wild Berry', image: 'smoothie-wild-berry.jpg' },
    { name: 'Mango Lassi', image: 'juice-orange.jpg' }, // Fallback
    { name: 'Oreo Blast', image: 'shake-oreo-blast.jpg' }
]);

// Milkshakes (JS)
updateProductsInScript(path.join(basePath, 'milkshake sub catégorie page', 'script.js'), [
    { name: 'Classic Chocolate Fudge', image: 'shake-classic-chocolate.jpg' },
    { name: 'Oreo Blast', image: 'shake-oreo-blast.jpg' },
    { name: 'Vanilla Bean', image: 'latte-vanilla.jpg' } // Fallback
]);

// Lattes (JS)
updateProductsInScript(path.join(basePath, 'latté hot drink sub catégorie page', 'script.js'), [
    { name: 'Classic Latte', image: 'latte-classic.jpg' },
    { name: 'Vanilla Latte', image: 'latte-vanilla.jpg' },
    { name: 'Hazelnut Latte', image: 'latte-hazelnut.jpg' },
    { name: 'Mocha Latte', image: 'latte-mocha.jpg' },
    { name: 'Pumpkin Spice Latte', image: 'latte-pumpkin-spice.jpg' },
    { name: 'Rose Latte', image: 'latte-rose.jpg' }
]);

// Cold Drinks (JS)
updateProductsInScript(path.join(basePath, 'cold drinks catégorie page', 'script.js'), [
    { name: 'Iced Latte', image: 'cold-iced-latte.jpg' },
    { name: 'Cold Brew', image: 'cold-brew.jpg' },
    { name: 'Chocolate Shake', image: 'shake-classic-chocolate.jpg' }
]);

console.log('Update script execution finished.');
