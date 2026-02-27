const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\soufyane\\Desktop\\essai 22 stick stitch designe only cafz qr\\stitch_caf_menu_table_12\\super_admin_dashboard';

try {
    const files = fs.readdirSync(targetDir);
    files.forEach(file => {
        console.log(file);
    });
} catch (err) {
    console.error('Error:', err);
}
