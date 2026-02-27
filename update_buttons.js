
const fs = require('fs');
const path = require('path');

const root = './stitch_caf_menu_table_12';

const mappings = [
    {
        file: 'bakery catégorie page/code.html',
        target: '../petit pain bakery_customization_view/code.html'
    },
    {
        file: 'toast brunch sub catégorie page/code.html',
        target: '../toast_brunch_customization_view/index.html'
    },
    {
        file: 'tea and infusion sub catégorie page/code.html',
        target: '../tea_customization_view/code.html'
    },
    {
        file: 'sweet pastries sub catégorie page/code.html',
        target: '../sweet_pastries_customization_view/index.html'
    },
    {
        file: 'latté hot drink sub catégorie page/code.html',
        target: '../latte_customization_view_2/code.html'
    },
    {
        file: 'smothies and shakes sub catégorie page/code.html',
        target: '../smothie customisation review/code.html'
    }
];

mappings.forEach(mapping => {
    const filePath = path.join(root, mapping.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to match the button. Note: using [\s\S]*? for multiline matching inside the tag
        // We look for a button that contains "Add" and the specific span
        const regex = /<button(\s+class="[^"]+")>\s*Add\s*<span class="material-symbols-outlined[^"]*?">add<\/span>\s*<\/button>/g;
        
        if (regex.test(content)) {
            const newContent = content.replace(regex, (match, classAttr) => {
                return `<a href="${mapping.target}"${classAttr}>\n                    Add <span class="material-symbols-outlined text-[14px]">add</span>\n                </a>`;
            });
            
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated ${mapping.file}`);
        } else {
            console.log(`No match found in ${mapping.file}`);
            // Try a simpler pattern if the first one fails (e.g. different spacing)
            const regexSimple = /<button(\s+class="[^"]+")>\s*Add\s*<\/button>/g;
             if (regexSimple.test(content)) {
                const newContent = content.replace(regexSimple, (match, classAttr) => {
                    return `<a href="${mapping.target}"${classAttr}>\n                    Add\n                </a>`;
                });
                fs.writeFileSync(filePath, newContent);
                console.log(`Updated ${mapping.file} (simple pattern)`);
             } else {
                 console.log(`STILL No match found in ${mapping.file}`);
             }
        }
    } else {
        console.log(`File not found: ${mapping.file}`);
    }
});
