const https = require('https');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'stitch_caf_menu_table_12', 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const imagesToDownload = [
    { name: 'bakery-chocolate-eclair.jpg', keyword: 'chocolate-eclair' },
    { name: 'sweet-strawberry-tart.jpg', keyword: 'strawberry-tart' },
    { name: 'tea-matcha.jpg', keyword: 'matcha-tea' },
    { name: 'tea-masala-chai.jpg', keyword: 'masala-chai' },
    { name: 'tea-ginger-lemon.jpg', keyword: 'ginger-lemon-tea' },
    { name: 'tea-moroccan-mint.jpg', keyword: 'moroccan-mint-tea' },
    { name: 'tea-royal-milk.jpg', keyword: 'milk-tea' },
    { name: 'tea-iced-peach.jpg', keyword: 'iced-peach-tea' },
    { name: 'toast-avocado.jpg', keyword: 'avocado-toast' },
    { name: 'toast-classic-benedict.jpg', keyword: 'eggs-benedict' }
];

const downloadImage = (filename, keyword) => {
    const url = `https://source.unsplash.com/600x600/?${keyword}`;
    const filePath = path.join(assetsDir, filename);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
                https.get(response.headers.location, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`Downloaded: ${filename}`);
                        resolve();
                    });
                }).on('error', (err) => {
                    fs.unlink(filePath, () => {});
                    console.error(`Error downloading ${filename}: ${err.message}`);
                    reject(err);
                });
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded: ${filename}`);
                    resolve();
                });
            }
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            console.error(`Error downloading ${filename}: ${err.message}`);
            reject(err);
        });
    });
};

async function downloadAll() {
    console.log('Starting downloads...');
    for (const img of imagesToDownload) {
        try {
            await downloadImage(img.name, img.keyword);
        } catch (e) {
            console.error(`Failed to download ${img.name}`);
        }
    }
    console.log('All downloads completed.');
}

downloadAll();
