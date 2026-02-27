const fs = require('fs');
const path = require('path');

const filePath = String.raw`c:\Users\soufyane\Desktop\essai 22 stick stitch designe only cafz qr\stitch_caf_menu_table_12\creme or latté fuite juces sub catégorie page\code.html`;

// Map of keywords to Unsplash IDs
const imageMap = {
    'Velvet Crush': 'photo-1613478223719-2ab802602423', // Orange juice
    'Pure OJ': 'photo-1613478223719-2ab802602423',
    'Oat Blend': 'photo-1541167760496-1628856ab772', // Latte
    'Protein': 'photo-1505252585461-04db1eb84625', // Smoothie
    'Offers': 'photo-1497534446932-c925b458314e', // Berry
    'Orange Velvet': 'photo-1613478223719-2ab802602423',
    'Berry Cream': 'photo-1497534446932-c925b458314e',
    'Tropical Milk': 'photo-1546171753-97d7676e4602',
    'Wellness Shots': 'photo-1513558161293-cdaf765ed2fd',
    'Valencia Classic': 'photo-1613478223719-2ab802602423',
    'Orange Milk': 'photo-1541167760496-1628856ab772',
    'Carrot Glow': 'photo-1598155523122-3842334d6c10'
};

const defaultIds = [
    'photo-1613478223719-2ab802602423',
    'photo-1541167760496-1628856ab772',
    'photo-1505252585461-04db1eb84625',
    'photo-1497534446932-c925b458314e',
    'photo-1546171753-97d7676e4602'
];

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to find the background-image style with Google Drive URL
    // We capture the surrounding context to help identify which item it is if possible, 
    // but since the structure is complex, we'll iterate through the file and replace line by line or use a more robust regex.
    
    // Simpler approach: Split by lines, check if line has google url, try to find a keyword in previous lines to identify context? 
    // No, that's hard.
    
    // Better approach: Just find all google URLs and replace them.
    // Since we want specific images for specific items, we can look for the image URL and the item name near it.
    // However, the Google URLs are opaque.
    
    // Let's just replace them sequentially or with a default set if we can't context match.
    // But wait, the file content I read shows the item name is usually AFTER or BEFORE the image div.
    // e.g.
    // <div ... style='...google...'></div>
    // <div ...> ... <h3>Velvet Crush</h3> ...
    
    // Since I have the file content in the chat history, I can see the order.
    // 1. Velvet Crush (Line 107 image, 111 text)
    // 2. Pure OJ (Line 124 image, 127 text)
    // 3. Oat Blend (Line 132 image, 135 text)
    // ...
    
    // I will just replace them in order of appearance.
    
    const replacements = [
        'photo-1613478223719-2ab802602423', // Velvet Crush
        'photo-1613478223719-2ab802602423', // Pure OJ
        'photo-1541167760496-1628856ab772', // Oat Blend
        'photo-1505252585461-04db1eb84625', // Protein
        'photo-1497534446932-c925b458314e', // Offers
        'photo-1613478223719-2ab802602423', // Orange Velvet
        'photo-1497534446932-c925b458314e', // Berry Cream
        'photo-1546171753-97d7676e4602',    // Tropical Milk
        'photo-1513558161293-cdaf765ed2fd', // Wellness Shots
        'photo-1613478223719-2ab802602423', // Valencia Classic
        'photo-1541167760496-1628856ab772', // Orange Milk
        'photo-1598155523122-3842334d6c10'  // Carrot Glow
    ];
    
    let replacementIndex = 0;
    
    // Regex matches the url("...") part
    const newContent = content.replace(/url\("https:\/\/lh3\.googleusercontent\.com\/[^"]+"\)/g, (match) => {
        if (replacementIndex < replacements.length) {
            const id = replacements[replacementIndex++];
            return `url("https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&h=500&q=80")`;
        }
        return match; // Should not happen if counts match
    });
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Replaced ${replacementIndex} images in ${filePath}`);
    
} catch (err) {
    console.error('Error:', err);
}
