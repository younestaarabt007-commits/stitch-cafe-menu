const fs = require('fs');
const path = require('path');

const mappings = [
    {
        file: 'stitch_caf_menu_table_12/smothie sub catégorie page/code.html',
        target: '../smothie customisation review/code.html'
    }
];

const rootDir = process.cwd();

mappings.forEach(mapping => {
    const filePath = path.join(rootDir, mapping.file);
    const targetPath = mapping.target;

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex for text-based ADD buttons
        // Matches <button ...> ... ADD ... </button>
        // Captures attributes in group 2
        const regex = /<button([^>]*?)>\s*ADD\s*<\/button>/gi;
        
        let matchCount = 0;
        const newContent = content.replace(regex, (match, attrs) => {
            matchCount++;
            // Remove type="button" or type="submit" if present, as <a> doesn't need it
            let newAttrs = attrs.replace(/type=["'](button|submit)["']/gi, '');
            
            return `<a href="${targetPath}"${newAttrs}>ADD</a>`;
        });

        if (matchCount > 0) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${matchCount} buttons in ${mapping.file}`);
        } else {
            console.log(`No matches found in ${mapping.file}`);
        }
    } else {
        console.log(`File not found: ${mapping.file}`);
    }
});
