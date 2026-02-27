
const fs = require('fs');
const path = require('path');

const root = './stitch_caf_menu_table_12';

const mappings = [
    {
        file: 'bakery catégorie page/code.html',
        target: '../petit pain bakery_customization_view/code.html',
        patterns: [
            /<button(\s+class="[^"]*?")>\s*Add\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/button>/g
        ]
    },
    {
        file: 'toast brunch sub catégorie page/code.html',
        target: '../toast_brunch_customization_view/index.html',
        patterns: [
            // Matches the BUTTON with ADD text
            /<button(\s+class="[^"]*?")>\s*ADD\s*<\/button>/g,
            // Matches the DIV with add icon (small ones)
            /<div(\s+class="[^"]*?rounded-full[^"]*?bg-primary[^"]*?")>\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/div>/g
        ]
    },
    {
        file: 'tea and infusion sub catégorie page/code.html',
        target: '../tea_customization_view/code.html',
        patterns: [
            // Matches the BUTTON with add icon
            /<button(\s+class="[^"]*?")>\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/button>/g,
            // Matches the DIV with add icon (large ones)
            /<div(\s+class="[^"]*?size-8[^"]*?bg-primary[^"]*?")>\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/div>/g,
             // Matches the DIV with add icon (small ones)
            /<div(\s+class="[^"]*?size-6[^"]*?bg-primary\/20[^"]*?")>\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/div>/g
        ]
    },
    {
        file: 'sweet pastries sub catégorie page/code.html',
        target: '../sweet_pastries_customization_view/index.html',
        patterns: [
             // Assumption: Similar to Toast or Bakery
            /<button(\s+class="[^"]*?")>\s*Add\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/button>/g,
            /<button(\s+class="[^"]*?")>\s*ADD\s*<\/button>/g
        ]
    },
    {
        file: 'latté hot drink sub catégorie page/code.html',
        target: '../latte_customization_view_2/code.html',
        patterns: [
            /<button(\s+class="[^"]*?")>\s*Add\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/button>/g,
             /<button(\s+class="[^"]*?")>\s*ADD\s*<\/button>/g
        ]
    },
     {
        file: 'smothies and shakes sub catégorie page/code.html',
        target: '../smothie customisation review/code.html',
        patterns: [
             // Already done partially, but good to ensure
            /<button(\s+class="[^"]*?")>\s*Add\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/button>/g
        ]
    }
];

mappings.forEach(mapping => {
    const filePath = path.join(root, mapping.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        mapping.patterns.forEach(regex => {
            content = content.replace(regex, (match, classAttr) => {
                // Determine content inside based on match or just recreate it
                // To be safe, we'll try to preserve the inner content logic from the regex match
                // But since we want to wrap it in <a>, we can just grab the class and put the content back
                
                let inner = match.substring(match.indexOf('>') + 1, match.lastIndexOf('<'));
                // Remove the closing tag name from the end index? No, substring takes start and end index.
                // Actually, just replacing the wrapper tag is safer.
                
                // Construct new tag
                // If it was a div or button, it becomes a
                return `<a href="${mapping.target}"${classAttr}>${inner}</a>`;
            });
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${mapping.file}`);
        } else {
            console.log(`No changes for ${mapping.file}`);
        }
    } else {
        console.log(`File not found: ${mapping.file}`);
    }
});
