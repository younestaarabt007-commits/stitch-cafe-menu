const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\soufyane\\Desktop\\essai 22 stick stitch designe only cafz qr\\stitch_caf_menu_table_12';

function getAllHtmlFiles(dir, fileList = []) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                getAllHtmlFiles(filePath, fileList);
            } else if (file.endsWith('.html')) {
                fileList.push(filePath);
            }
        });
    } catch (err) {
        // ignore
    }
    return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);
let unlinkedButtonsCount = 0;
let dynamicImagesCount = 0;
let filesWithIssues = [];

console.log('--- PROJECT AUDIT ---');

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(rootDir, file);
    let fileIssues = [];

    // Check for unlinked ADD buttons (buttons with text "Add" or similar, or icons)
    // We look for <button> tags that might be intended as links
    // A simple heuristic: <button> containing "Add" or "add" (case insensitive)
    const buttonMatches = content.match(/<button[^>]*>[\s\S]*?add[\s\S]*?<\/button>/gi);
    if (buttonMatches) {
        // Filter out buttons that might be legitimate functional buttons (like in cart)
        // This is heuristic. If it's a product card, it should probably be a link.
        // We'll count them for manual review.
        const count = buttonMatches.length;
        unlinkedButtonsCount += count;
        if (count > 0) fileIssues.push(`${count} unlinked 'Add' buttons`);
    }

    // Check for dynamic Unsplash URLs
    const dynamicImgMatches = content.match(/source\.unsplash\.com\/\?[a-zA-Z0-9,]+/g);
    if (dynamicImgMatches) {
        const count = dynamicImgMatches.length;
        dynamicImagesCount += count;
        fileIssues.push(`${count} dynamic Unsplash images`);
    }

    if (fileIssues.length > 0) {
        console.log(`\nFILE: ${relativePath}`);
        fileIssues.forEach(issue => console.log(`  - ${issue}`));
        filesWithIssues.push({ file: relativePath, issues: fileIssues });
    }
});

console.log('\n--- SUMMARY ---');
console.log(`Total Files Scanned: ${htmlFiles.length}`);
console.log(`Files with Issues: ${filesWithIssues.length}`);
console.log(`Potential Unlinked Buttons: ${unlinkedButtonsCount}`);
console.log(`Dynamic Images to Pin: ${dynamicImagesCount}`);
