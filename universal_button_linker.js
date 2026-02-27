
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const fileMappings = {
    'stitch_caf_menu_table_12/artisanal bread sub catégorie page/index.html': '../petit pain bakery_customization_view/code.html',
    'stitch_caf_menu_table_12/artisanal bread sub catégorie page/code.html': '../petit pain bakery_customization_view/code.html',
    'stitch_caf_menu_table_12/cold drinks catégorie page/code.html': '../orange juce_customization_view_1/code.html',
    'stitch_caf_menu_table_12/cold drinks catégorie page/index.html': '../orange juce_customization_view_1/code.html',
    'stitch_caf_menu_table_12/creme or latté fuite juces sub catégorie page/code.html': '../latte_customization_view_2/code.html',
    'stitch_caf_menu_table_12/creme or latté fuite juces sub catégorie page/index.html': '../latte_customization_view_2/code.html',
    'stitch_caf_menu_table_12/black coffee sub catégorie page/code.html': '../pure_noir_espresso_customization_view_1/code.html',
    'stitch_caf_menu_table_12/black coffee sub catégorie page/index.html': '../pure_noir_espresso_customization_view_1/code.html',
    'stitch_caf_menu_table_12/Brew catégorie page/code.html': '../pure_noir_espresso_customization_view_1/code.html',
    'stitch_caf_menu_table_12/Brew catégorie page/index.html': '../pure_noir_espresso_customization_view_1/code.html',
    'stitch_caf_menu_table_12/milkshake sub catégorie page/code.html': '../smothie customisation review/code.html',
    'stitch_caf_menu_table_12/milkshake sub catégorie page/index.html': '../smothie customisation review/code.html',
    'stitch_caf_menu_table_12/smothie sub catégorie page/code.html': '../smothie customisation review/code.html',
    'stitch_caf_menu_table_12/smothie sub catégorie page/index.html': '../smothie customisation review/code.html',
    'stitch_caf_menu_table_12/smothies and shakes sub catégorie page/code.html': '../smothie customisation review/code.html',
    'stitch_caf_menu_table_12/smothies and shakes sub catégorie page/index.html': '../smothie customisation review/code.html',
    'stitch_caf_menu_table_12/sweet pastries sub catégorie page/code.html': '../sweet_pastries_customization_view/index.html',
    'stitch_caf_menu_table_12/sweet pastries sub catégorie page/index.html': '../sweet_pastries_customization_view/index.html',
    'stitch_caf_menu_table_12/tea and infusion sub catégorie page/code.html': '../tea_customization_view/code.html',
    'stitch_caf_menu_table_12/tea and infusion sub catégorie page/index.html': '../tea_customization_view/code.html',
    'stitch_caf_menu_table_12/toast brunch sub catégorie page/code.html': '../toast_brunch_customization_view/index.html',
    'stitch_caf_menu_table_12/toast brunch sub catégorie page/index.html': '../toast_brunch_customization_view/index.html',
    'stitch_caf_menu_table_12/long_scroll_brunch_explorer/code.html': '../brunch_customization_view/code.html',
    'stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/code.html': '../latte_customization_view_2/code.html',
};

// Main function to process files
function processFiles() {
    console.log('Starting universal button linker...');
    
    for (const [relativePath, targetUrl] of Object.entries(fileMappings)) {
        const fullPath = path.join(rootDir, relativePath);
        
        if (!fs.existsSync(fullPath)) {
            console.log(`Skipping (not found): ${relativePath}`);
            continue;
        }

        console.log(`Processing: ${relativePath}`);
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;

        // Pattern 1: Button with material-symbols-outlined "add" inside span
        content = content.replace(
            /(<button\s+[^>]*class="[^"]*"[^>]*>)\s*<span\s+class="([^"]*)"[^>]*>add<\/span>\s*<\/button>/gi,
            (match, buttonTagStart, spanClass) => {
                if (match.includes('onclick') || match.includes('href')) return match;
                const classMatch = buttonTagStart.match(/class="([^"]*)"/);
                const buttonClass = classMatch ? classMatch[1] : '';
                return `<a href="${targetUrl}" class="${buttonClass} flex items-center justify-center"><span class="${spanClass}">add</span></a>`;
            }
        );

        // Pattern 2: Simple button with "add" symbol
        content = content.replace(
            /<button([^>]*)>\s*<span class="material-symbols-outlined([^"]*)">add<\/span>\s*<\/button>/gi,
            (match, attributes, spanAttributes) => {
                 if (attributes.includes('onclick') || attributes.includes('href')) return match;
                 const classMatch = attributes.match(/class="([^"]*)"/);
                 let classes = classMatch ? classMatch[1] : '';
                 if (!classes.includes('flex')) classes += ' flex items-center justify-center';
                 return `<a href="${targetUrl}" class="${classes}"><span class="material-symbols-outlined${spanAttributes}">add</span></a>`;
            }
        );

        // Pattern 3: Text-based "Add" or "Order Now" button (e.g. Cold Drinks page)
        // Matches <button ...> ... Add ... </button> allowing for whitespace and newlines
        content = content.replace(
            /<button([^>]*)>([\s\S]*?)\b(Add|Order Now)\b([\s\S]*?)<\/button>/gi,
            (match, attributes, beforeText, text, afterText) => {
                if (attributes.includes('onclick') || attributes.includes('href')) return match;
                
                // Extract classes
                const classMatch = attributes.match(/class="([^"]*)"/);
                let classes = classMatch ? classMatch[1] : '';
                
                // Ensure flex/items-center for proper alignment if converting to anchor
                if (!classes.includes('flex') && !classes.includes('block')) classes += ' flex items-center justify-center';
                
                // Remove type="button"
                attributes = attributes.replace(/type="button"/g, '');

                return `<a href="${targetUrl}" class="${classes} text-center decoration-none"${attributes.replace(/class="[^"]*"/, '')}>${beforeText}${text}${afterText}</a>`;
            }
        );

        if (content !== originalContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`  [UPDATED] ${relativePath}`);
        } else {
            console.log(`  [NO CHANGE] ${relativePath}`);
        }
    }
}

processFiles();
