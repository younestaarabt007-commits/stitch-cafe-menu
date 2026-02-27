const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_caf_menu_table_12');
const assetsPath = '../swiggy-style_elite_main_menu_390x2500/assets/';

const replacements = {
    'sweet pastries sub catégorie page/script.js': [
        // Fix Chocolate Éclair (was using babka)
        { find: /(id: "sweet_pastry_3"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}bakery-chocolate-eclair.jpg$2` },
        // Fix Strawberry Tart (was using lemon meringue)
        { find: /(id: "sweet_pastry_4"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}sweet-strawberry-tart.jpg$2` }
    ],
    'tea and infusion sub catégorie page/script.js': [
        // Matcha
        { find: /(id: "tea_1"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}tea-matcha.jpg$2` },
        // Masala Chai
        { find: /(id: "tea_2"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}tea-masala-chai.jpg$2` },
        // Ginger Lemon
        { find: /(id: "tea_3"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}tea-ginger-lemon.jpg$2` },
        // Moroccan Mint
        { find: /(id: "tea_4"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}tea-moroccan-mint.jpg$2` },
        // Royal Milk Tea
        { find: /(id: "tea_5"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}tea-royal-milk.jpg$2` },
        // Iced Peach Oolong
        { find: /(id: "tea_6"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}tea-iced-peach.jpg$2` }
    ],
    'toast brunch sub catégorie page/script.js': [
        // Avocado Toast
        { find: /(id: "toast_4"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}toast-avocado.jpg$2` },
        // Classic Benedict (if distinct)
        { find: /(id: "toast_5"[^}]*image: ")[^"]+(")/, replace: `$1${assetsPath}toast-classic-benedict.jpg$2` }
    ]
};

Object.keys(replacements).forEach(fileRelPath => {
    const filePath = path.join(baseDir, fileRelPath);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        replacements[fileRelPath].forEach(rep => {
            if (content.match(rep.find)) {
                content = content.replace(rep.find, rep.replace);
                modified = true;
            }
        });
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${fileRelPath}`);
        } else {
            console.log(`No changes for: ${fileRelPath}`);
        }
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
