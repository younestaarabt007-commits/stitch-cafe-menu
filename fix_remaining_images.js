const fs = require('fs');
const path = require('path');

const files = [
    {
        path: 'stitch_caf_menu_table_12/smothie sub catégorie page/code.html',
        ids: ['1610970878497-27b5d33f6309', '1505252585461-04db1eb84625', '1623065422902-30a2d299bbe4', '1553530979-7ee52a2670c4', '1625944525533-5c8cf393368c', '1576618148400-f54bed99fcf0', '1620916566398-39f1143ab7be', '1490474501764-546119934457', '1546173159908-640c16302ddc', '1595974482550-923c6d85ff63']
    },
    {
        path: 'stitch_caf_menu_table_12/latté hot drink sub catégorie page/code.html',
        ids: ['1541167760496-1613c3434a74', '1570968993084-a8e384554f1f', '1595435934249-5df7ed86e1c0', '1517701550927-30cfdbfa4624', '1514432324607-a09d9b4aefdd', '1509042239860-f550ce710b93', '1511537632536-acc2a4223056', '1461023058943-48db5d469292', '1498804103079-a6351b050096', '1497935586351-b67a49e012bf']
    },
    {
        path: 'stitch_caf_menu_table_12/black coffee sub catégorie page/code.html',
        ids: ['1497935586351-b67a49e012bf', '1514432324607-a09d9b4aefdd', '1509042239860-f550ce710b93', '1610889556528-9a770e626337', '1511920170033-f8396924c348', '1504630083234-141d7d63b706', '1447933601403-0c6688de566e', '1495474472287-4d71bcdd2085', '1521302080324-5c2f300e3d3c', '1485808191679-5f8c7c0013e4']
    },
    {
        path: 'stitch_caf_menu_table_12/artisanal bread sub catégorie page/code.html',
        ids: ['1509440159596-0249088772ff', '1549931319-a545dcf3bc73', '1568254183919-78a4f43a2877', '1586444248902-2f64eddc13df', '1576458088443-04a19bb13da6', '1560155016355-644c330f40b2', '1530610476181-d8ceb28b5f4f', '1506224477000-0b28c6d7e082', '1517686469429-8bdb88b9f907', '1552590673-3f194e478b0c']
    }
];

const basePath = 'c:\\Users\\soufyane\\Desktop\\essai 22 stick stitch designe only cafz qr';

function replaceImages(relativePath, ids) {
    const fullPath = path.join(basePath, relativePath);
    console.log(`Processing: ${fullPath}`);

    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Regex for Google Drive URLs (handles both ' and " quotes)
    const googleRegex = /url\((["'])https:\/\/lh3\.googleusercontent\.com\/[^"']+\1\)/g;
    
    // Regex for existing Unsplash URLs (just in case)
    const unsplashRegex = /url\((["'])https:\/\/source\.unsplash\.com\/random\/[^"']+\1\)/g;

    let matchCount = 0;
    
    // Replace Google URLs
    content = content.replace(googleRegex, (match, quote) => {
        const id = ids[matchCount % ids.length];
        matchCount++;
        return `url(${quote}https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop${quote})`;
    });

    // Reset count for Unsplash replacements if any
    let unsplashMatchCount = 0;
    content = content.replace(unsplashRegex, (match, quote) => {
        const id = ids[(matchCount + unsplashMatchCount) % ids.length];
        unsplashMatchCount++;
        return `url(${quote}https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop${quote})`;
    });

    console.log(`Replaced ${matchCount + unsplashMatchCount} images.`);

    fs.writeFileSync(fullPath, content, 'utf8');
}

files.forEach(file => {
    replaceImages(file.path, file.ids);
});
