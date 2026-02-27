
const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\soufyane\\Desktop\\essai 22 stick stitch designe only cafz qr\\stitch_caf_menu_table_12';
const folders = [
    'dashbord insight page',
    'dashbord item_&_menu_management page',
    'dashbord orders page',
    'desktop_table and floor_management_map page',
    'editorial_checkout_&_tipping page',
    'first page_loading_screen',
    'latte_customization_view_2',
    'long_scroll_brunch_explorer',
    'orange juce_customization_view_1',
    'order_success_page',
    'petit pain bakery_customization_view',
    'pure_noir_espresso_customization_view_1',
    'smothie customisation review'
];

folders.forEach(folder => {
    const dirPath = path.join(rootDir, folder);
    const indexPath = path.join(dirPath, 'index.html');
    const stylePath = path.join(dirPath, 'style.css');
    const scriptPath = path.join(dirPath, 'script.js');

    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        let cssContent = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n';
        let jsContent = '';
        let hasChanges = false;

        // Extract <style> tags
        const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
        let match;
        while ((match = styleRegex.exec(content)) !== null) {
            cssContent += match[1].trim() + '\n\n';
            hasChanges = true;
        }

        // Remove <style> tags
        if (hasChanges) {
            content = content.replace(styleRegex, '');
            
            // Add link to style.css in head
            if (!content.includes('style.css')) {
                content = content.replace('</head>', '  <link rel="stylesheet" href="style.css"/>\n</head>');
            }

            // Write style.css
            fs.writeFileSync(stylePath, cssContent);
            console.log(`Created style.css for ${folder}`);
        }

        // Check for script.js
        if (!fs.existsSync(scriptPath)) {
            fs.writeFileSync(scriptPath, '// Script for ' + folder + '\n');
            console.log(`Created script.js for ${folder}`);
        }

        // Add script tag if missing
        if (!content.includes('script.js')) {
            content = content.replace('</body>', '  <script src="script.js"></script>\n</body>');
            hasChanges = true;
        }

        if (hasChanges) {
            fs.writeFileSync(indexPath, content);
            console.log(`Updated index.html for ${folder}`);
        }
    } else {
        console.log(`No index.html found in ${folder}`);
    }
});
