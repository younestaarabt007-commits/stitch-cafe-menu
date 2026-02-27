const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\soufyane\\Desktop\\essai 22 stick stitch designe only cafz qr\\stitch_caf_menu_table_12';

function findHtmlFiles(dir) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                findHtmlFiles(filePath);
            } else if (file.endsWith('.html')) {
                console.log(filePath);
            }
        });
    } catch (err) {
        // ignore errors
    }
}

findHtmlFiles(rootDir);
