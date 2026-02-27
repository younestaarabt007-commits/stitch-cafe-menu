
const fs = require('fs');
const path = require('path');

const root = './stitch_caf_menu_table_12';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(root);
const htmlFiles = files.filter(f => f.endsWith('.html'));

console.log('--- CUSTOMIZATION VIEWS ---');
htmlFiles.filter(f => f.includes('customization') || f.includes('customisation')).forEach(f => console.log(f));

console.log('\n--- CATEGORY PAGES ---');
htmlFiles.filter(f => f.includes('page') || f.includes('catégorie')).forEach(f => console.log(f));
