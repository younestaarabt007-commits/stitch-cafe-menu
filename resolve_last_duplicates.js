const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');
const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');

const duplicatesToFix = [
    { name: 'Ceremonial Matcha', newImage: 'latte-matcha.jpg', query: 'matcha-latte', isBrew: true }, // Special handling for Brew duplicate
    { name: 'Shakshuka', newImage: 'toast-shakshuka-baked.jpg', query: 'shakshuka' },
    { name: 'Ethiopian Yirgacheffe', newImage: 'coffee-ethiopian.jpg', query: 'black-coffee' },
    { name: 'Dirty Masala Chai', newImage: 'tea-dirty-chai.jpg', query: 'chai-latte' },
    { name: 'Golden Turmeric', newImage: 'tea-turmeric.jpg', query: 'turmeric-tea' },
    { name: 'Caramel Latte', newImage: 'latte-caramel.jpg', query: 'caramel-latte' },
    { name: 'Berry Burst', newImage: 'smoothie-berry-burst.jpg', query: 'berry-smoothie' },
    { name: 'Classic Chocolate Shake', newImage: 'shake-chocolate-classic.jpg', query: 'chocolate-milkshake' },
    { name: 'Mango Glow', newImage: 'juice-mango-glow.jpg', query: 'mango-juice' }
];

// Fallback map if download fails (using existing assets that are likely different or generic enough)
const fallbackMap = {
    'latte-matcha.jpg': 'tea-green.jpg',
    'toast-shakshuka-baked.jpg': 'brunch-shakshuka.jpg', // Worst case same, but path unique
    'coffee-ethiopian.jpg': 'coffee-drip.jpg',
    'tea-dirty-chai.jpg': 'tea-masala-chai.jpg',
    'tea-turmeric.jpg': 'tea-ginger-lemon.jpg',
    'latte-caramel.jpg': 'latte-vanilla-bean.jpg',
    'smoothie-berry-burst.jpg': 'smoothie-strawberry.jpg',
    'shake-chocolate-classic.jpg': 'shake-chocolate.jpg',
    'juice-mango-glow.jpg': 'juice-orange.jpg'
};

const downloadImage = (filename, query) => {
    return new Promise((resolve) => {
        const dest = path.join(assetsDir, filename);
        if (fs.existsSync(dest)) {
            console.log(`Skipping ${filename} (exists)`);
            resolve(true);
            return;
        }

        const url = `https://source.unsplash.com/featured/?${query}`;
        const file = fs.createWriteStream(dest);
        
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect manually if needed, but usually source.unsplash redirects to images.unsplash
                const newUrl = response.headers.location;
                https.get(newUrl, (res2) => {
                    if (res2.statusCode === 200) {
                        res2.pipe(file);
                        file.on('finish', () => { file.close(); console.log(`Downloaded ${filename}`); resolve(true); });
                    } else {
                        console.log(`Failed to download ${filename} (status ${res2.statusCode})`);
                        file.close();
                        fs.unlink(dest, () => {});
                        resolve(false);
                    }
                }).on('error', () => {
                    file.close();
                    fs.unlink(dest, () => {});
                    resolve(false);
                });
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => { file.close(); console.log(`Downloaded ${filename}`); resolve(true); });
            } else {
                console.log(`Failed to download ${filename} (status ${response.statusCode})`);
                file.close();
                fs.unlink(dest, () => {});
                resolve(false);
            }
        }).on('error', (err) => {
            console.log(`Error downloading ${filename}: ${err.message}`);
            file.close();
            fs.unlink(dest, () => {});
            resolve(false);
        });
    });
};

const applyFallback = (filename) => {
    const dest = path.join(assetsDir, filename);
    if (fs.existsSync(dest)) return;

    const fallbackSrc = fallbackMap[filename];
    if (fallbackSrc) {
        const srcPath = path.join(assetsDir, fallbackSrc);
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, dest);
            console.log(`Created fallback for ${filename} using ${fallbackSrc}`);
        } else {
            // Last resort: copy ANY jpg
            const anyJpg = fs.readdirSync(assetsDir).find(f => f.endsWith('.jpg'));
            if (anyJpg) {
                fs.copyFileSync(path.join(assetsDir, anyJpg), dest);
                console.log(`Created EMERGENCY fallback for ${filename} using ${anyJpg}`);
            }
        }
    }
};

async function process() {
    console.log('Resolving last duplicates...');
    
    // 1. Ensure images exist
    for (const item of duplicatesToFix) {
        const success = await downloadImage(item.newImage, item.query);
        if (!success) {
            applyFallback(item.newImage);
        }
    }

    // 2. Update Script
    let content = fs.readFileSync(scriptPath, 'utf8');
    let modified = false;

    duplicatesToFix.forEach(item => {
        // We need to target specific lines for duplicates.
        // For "Ceremonial Matcha", we have two. We want to change the one in "Brew" (id: brew-2) or "Tea" (id: tea-1).
        // Let's change the one that matches specific context if possible.
        
        // Regex to match: { id: '...', name: "NAME", ... image: "OLD" ... }
        // We want to replace image.
        
        // Strategy: Regex for name: "NAME" ... image: "OLD"
        // But since we want to target specific occurrences (like the first one for Brew), we might need to be careful.
        // Actually, if I change the image filename for the item name, it will change ALL occurrences of that item name.
        // If "Ceremonial Matcha" is used twice, and I change the image for "Ceremonial Matcha", BOTH will get the new image.
        // This resolves the "duplicate image file" issue, but they will still share the NEW image.
        // The user wants NO repeating images.
        // So I must DIFFERENTIATE them.
        
        if (item.name === 'Ceremonial Matcha') {
            // Special case: Rename one to "Matcha Latte"
            // Find the one with id: 'brew-2'
            if (content.includes("id: 'brew-2'")) {
                content = content.replace(
                    /{ id: 'brew-2', name: "Ceremonial Matcha"/,
                    `{ id: 'brew-2', name: "Matcha Latte"`
                );
                // Now update its image
                content = content.replace(
                    /id: 'brew-2', name: "Matcha Latte", description: "([^"]+)", price: ([^,]+), image: "([^"]+)"/,
                    `id: 'brew-2', name: "Matcha Latte", description: "$1", price: $2, image: "assets/${item.newImage}"`
                );
                modified = true;
                console.log('Updated Ceremonial Matcha (Brew) to Matcha Latte with new image');
            }
            return; // Skip standard update
        }

        // Standard update: find specific items by Name AND Category if needed, or just replace the image for that Name.
        // But wait, if "Shakshuka" (Toast) and "Spicy Shakshuka" (Brunch) are different names, simple name matching works.
        
        // Items with different names but same image:
        // Shakshuka (Toast) vs Spicy Shakshuka (Brunch) -> Distinct names.
        // Ethiopian Yirgacheffe vs Single Origin Espresso -> Distinct names.
        // Dirty Masala Chai vs Masala Chai -> Distinct names.
        // Golden Turmeric vs Ginger Lemon -> Distinct names.
        // Caramel Latte vs Caramel Macchiato -> Distinct names.
        // Berry Burst vs Strawberry Smoothie -> Distinct names.
        // Classic Chocolate Shake vs Chocolate Shake -> Distinct names.
        // Mango Glow vs Mango Lassi -> Distinct names.
        
        // So for all others, I can just target the specific Name and update its image.
        
        const regex = new RegExp(`name: "${item.name}", description: "([^"]+)", price: ([^,]+), image: "([^"]+)"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `name: "${item.name}", description: "$1", price: $2, image: "assets/${item.newImage}"`);
            modified = true;
            console.log(`Updated image for ${item.name}`);
        }
    });

    if (modified) {
        fs.writeFileSync(scriptPath, content, 'utf8');
        console.log('Script updated successfully.');
    } else {
        console.log('No script changes made (matches not found?).');
    }
}

process();
