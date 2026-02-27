const fs = require('fs');
const path = require('path');

const rootDir = './stitch_caf_menu_table_12';

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file === 'index.html' || file === 'code.html') {
            checkFile(fullPath);
        }
    });
}

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Check for empty hrefs
    if (content.match(/href="#"/)) issues.push('href="#"');
    if (content.match(/href=""/)) issues.push('href=""');
    
    // Check for empty src
    if (content.match(/src=""/)) issues.push('src=""');
    if (content.match(/src="#"/)) issues.push('src="#"');

    // Check for google drive links (just in case)
    if (content.match(/drive\.google\.com/)) issues.push('drive.google.com link');

    // Check for unlinked Add buttons (heuristic)
    // Looking for buttons with just text "add" or icon "add" that are not wrapped in <a> or have no onclick
    // This is harder to regex, but let's look for <a> tags with empty href that contain "add"
    
    if (issues.length > 0) {
        console.log(`File: ${filePath}`);
        issues.forEach(i => console.log(`  - ${i}`));
    }
}

scanDir(rootDir);
