const fs = require('fs');
const path = require('path');

const smoothieFile = String.raw`c:\Users\soufyane\Desktop\essai 22 stick stitch designe only cafz qr\stitch_caf_menu_table_12\smothies and shakes sub catégorie page\code.html`;
const milkshakeFile = String.raw`c:\Users\soufyane\Desktop\essai 22 stick stitch designe only cafz qr\stitch_caf_menu_table_12\milkshake sub catégorie page\code.html`;

const smoothieIds = [
    'photo-1623065422902-30a2d299bbe4', // Main header
    'photo-1579954115545-a95591f28bfc', // Protein
    'photo-1610970881699-44a5587cabec', // Fruit Mix
    'photo-1623065422902-30a2d299bbe4', // Offers
    'photo-1546171753-97d7676e4602',    // New Blends
    'photo-1610970881699-44a5587cabec', // Green Detox
    'photo-1572490122747-3968b75cc699', // Choco Malt
    'photo-1623065422902-30a2d299bbe4', // Berry Cream
    'photo-1610832958506-aa56368176cf', // Fruit Box
    'photo-1546171753-97d7676e4602',    // Tropical Mango
    'photo-1623065422902-30a2d299bbe4', // Wild Berry
    'photo-1610970881699-44a5587cabec', // Green Glow
    'photo-1572490122747-3968b75cc699'  // Oreo Blast
];

const milkshakeIds = [
    'photo-1572490122747-3968b75cc699', // Thick & Creamy
    'photo-1546171753-97d7676e4602',    // Just In
    'photo-1623065422902-30a2d299bbe4', // Offers
    'photo-1579954115545-a95591f28bfc', // Chef Pick
    'photo-1610970881699-44a5587cabec', // Seasonal
    'photo-1572490122747-3968b75cc699', // Signature Oreo Blast
    'photo-1623065422902-30a2d299bbe4', // Summer Berry
    'photo-1546171753-97d7676e4602',    // Mango Tango
    'photo-1572490122747-3968b75cc699', // Classic Chocolate Fudge
    'photo-1623065422902-30a2d299bbe4', // Wild Strawberry Swirl
    'photo-1579954115545-a95591f28bfc', // Peanut Butter Power
    'photo-1623065422902-30a2d299bbe4'  // Blueberry Vanilla Mist
];

function replaceImages(filePath, ids, regex) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return;
        }
        let content = fs.readFileSync(filePath, 'utf8');
        let index = 0;
        const newContent = content.replace(regex, (match) => {
            if (index < ids.length) {
                const id = ids[index++];
                return `url("https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=600&q=80")`;
            }
            return match;
        });
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Replaced ${index} images in ${path.basename(filePath)}`);
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

// Replace in Smoothie file (source.unsplash.com/...)
replaceImages(smoothieFile, smoothieIds, /url\("https:\/\/source\.unsplash\.com\/[^"]+"\)/g);

// Replace in Milkshake file (lh3.googleusercontent.com/...)
replaceImages(milkshakeFile, milkshakeIds, /url\("https:\/\/lh3\.googleusercontent\.com\/[^"]+"\)/g);
