
const fs = require('fs');
const path = require('path');
const rootDir = process.cwd();

function fixBrokenTags(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixBrokenTags(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Fix <button ...> ... </a> -> <a ...> ... </a>
            // But wait, the button has `class` and attributes. 
            // The previous script replaced <button> with <a href="..."> but maybe failed to replace </button> in some cases?
            // Or replaced </button> with </a> but left <button> in some cases?
            
            // Case 1: <button ...> ... </a> (Opening is button, closing is a)
            // This happens if I changed the closing tag but not the opening one? 
            // In Cold Drinks line 208, I saw: <button ...> ... </a>.
            // This means I should change <button to <a href="..."> IF it's supposed to be a link.
            // But wait, if it's <button> it doesn't have href.
            // If I see <button ...> ... </a>, it's definitely broken.
            // If the inner text is "Add" or "Order Now", it should be an <a> tag.
            
            // Let's use a regex to find mismatched tags.
            // This is tricky with regex.
            
            // Instead, let's look for specific broken patterns I saw.
            // Pattern: <button (attributes)> (content) </a>
            content = content.replace(/<button([^>]*)>([\s\S]*?)<\/a>/gi, (match, attrs, inner) => {
                // If it has href in attributes (unlikely for button), or if we want to convert it.
                // If it was supposed to be converted, it should have been <a href...>.
                // The previous script `universal_button_linker.js` replaced the WHOLE string.
                // So maybe the regex in `universal_button_linker.js` matched correctly but the replacement string was wrong?
                // No, the replacement string was `<a ...>...</a>`.
                
                // Maybe there was a manual edit or partial match?
                // Let's just fix it by changing <button to <a if it ends with </a>.
                // But we need the href!
                // If the href is missing, we can't just change it to <a>.
                
                // Let's look at the specific broken lines in Cold Drinks.
                // Line 208: <button class="..."> ... Add ... </a>
                // It does NOT have href.
                // So I need to add the href.
                
                // I need to map the file to the target URL again.
                // I can reuse the mapping from universal_button_linker.js
                return match; // Placeholder, logic below
            });

            // Let's re-run the logic but specifically targeting these broken buttons.
            
            // Re-importing mappings (I'll just copy them here for simplicity)
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

            // Determine target URL for this file
            let targetUrl = null;
            for (const [key, value] of Object.entries(fileMappings)) {
                if (fullPath.endsWith(path.normalize(key))) {
                    targetUrl = value;
                    break;
                }
            }

            if (targetUrl) {
                // Fix: <button ...> ... </a>
                content = content.replace(/<button([^>]*)>([\s\S]*?)<\/a>/gi, (match, attrs, inner) => {
                    if (attrs.includes('href')) return match; // Already has href? (weird for button)
                    
                    // Add href and change tag to a
                    let newAttrs = attrs.replace(/type="button"/g, '');
                    // Ensure flex/items-center
                    const classMatch = newAttrs.match(/class="([^"]*)"/);
                    let classes = classMatch ? classMatch[1] : '';
                    if (!classes.includes('flex') && !classes.includes('block')) classes += ' flex items-center justify-center';
                    
                    newAttrs = newAttrs.replace(/class="[^"]*"/, `class="${classes} text-center decoration-none"`);
                    
                    return `<a href="${targetUrl}"${newAttrs}>${inner}</a>`;
                });
                
                 // Fix: <a ...> ... </button>
                content = content.replace(/<a([^>]*)>([\s\S]*?)<\/button>/gi, (match, attrs, inner) => {
                    return `<a${attrs}>${inner}</a>`;
                });
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed tags in: ${file}`);
            }
        }
    }
}

fixBrokenTags(path.join(rootDir, 'stitch_caf_menu_table_12'));
