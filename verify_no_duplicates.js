
const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');
const content = fs.readFileSync(scriptPath, 'utf8');

const itemRegex = /name:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
const items = [];
let match;

while ((match = itemRegex.exec(content)) !== null) {
    items.push({ name: match[1], image: match[2] });
}

const imageCounts = {};
items.forEach(item => {
    imageCounts[item.image] = (imageCounts[item.image] || 0) + 1;
});

const duplicates = Object.entries(imageCounts).filter(([image, count]) => count > 1);

const reportPath = path.join(__dirname, 'duplicates_report.txt');
let report = '';

if (duplicates.length > 0) {
    report += 'Found duplicates:\n';
    duplicates.forEach(([image, count]) => {
        report += `Image: ${image} (Used ${count} times)\n`;
        const usingItems = items.filter(item => item.image === image).map(item => item.name);
        report += `  Used by: ${usingItems.join(', ')}\n`;
    });
} else {
    report += 'No duplicates found!\n';
}

fs.writeFileSync(reportPath, report);
console.log('Report written to duplicates_report.txt');
