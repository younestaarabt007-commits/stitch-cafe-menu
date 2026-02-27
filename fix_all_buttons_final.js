const fs = require('fs');
const path = require('path');

// User's requested button style
const TARGET_CLASSES = "w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform";

// Root directory
const ROOT_DIR = "c:\\Users\\soufyane\\Desktop\\essai 22 stick stitch designe only cafz qr\\stitch_caf_menu_table_12";

// Regex patterns
// HTML: Find <button ... addToCart(...) ... > ... </button>
// We use [\s\S] instead of . with dotAll because JS regex dotAll (s flag) is relatively new, but supported in Node 24.
// Let's use the 's' flag.

const BUTTON_REGEX = /<button\s+[^>]*onclick=["']((?:event\.stopPropagation\(\);\s*)?addToCart\([^"']*(?:['"][^"']*['"][^"']*)*\))["'][^>]*>.*?<\/button>/gis;

// Cache busting regex
const CACHE_BUST_REGEX = /src="(\.?\.?\/?)script\.js\?v=\d+"/gi;

function fixFileContent(content, fileType) {
    let newContent = content;

    // Replace buttons
    newContent = newContent.replace(BUTTON_REGEX, (match, onclickVal) => {
        // Construct new button
        return `<button class="${TARGET_CLASSES}" onclick="${onclickVal}">ADD</button>`;
    });

    return newContent;
}

function updateCacheBusting(content) {
    const timestamp = Math.floor(Date.now() / 1000);
    return content.replace(CACHE_BUST_REGEX, `src="$1script.js?v=${timestamp}"`);
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath).toLowerCase();
        let newContent = content;

        if (fileName === 'index.html') {
            newContent = fixFileContent(newContent, 'html');
            newContent = updateCacheBusting(newContent);
        } else if (fileName === 'script.js') {
            newContent = fixFileContent(newContent, 'js');
        }

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
            return 1;
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
    return 0;
}

function walkDir(dir) {
    let count = 0;
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                count += walkDir(filePath);
            } else {
                const lowerFile = file.toLowerCase();
                if (lowerFile === 'index.html' || lowerFile === 'script.js') {
                    count += processFile(filePath);
                }
            }
        }
    } catch (err) {
        console.error(`Error walking ${dir}: ${err.message}`);
    }
    return count;
}

console.log(`Scanning ${ROOT_DIR}...`);
const totalUpdated = walkDir(ROOT_DIR);
console.log(`Total files updated: ${totalUpdated}`);
