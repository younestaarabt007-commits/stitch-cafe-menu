const fs = require('fs');
const https = require('https');
const path = require('path');

const assetsDir = path.join(__dirname, 'stitch_caf_menu_table_12', 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    console.log(`Creating directory: ${assetsDir}`);
    fs.mkdirSync(assetsDir, { recursive: true });
}

const imagesToDownload = [
    // Sweet Pastries
    { name: 'sweet-butter-croissant.jpg', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
    { name: 'sweet-almond-croissant.jpg', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
    { name: 'sweet-chocolate-eclair.jpg', url: 'https://images.unsplash.com/photo-1612203985729-1c7901925a1b?auto=format&fit=crop&w=600&q=80' },
    { name: 'sweet-strawberry-tart.jpg', url: 'https://images.unsplash.com/photo-1563729760304-b968c7a44f97?auto=format&fit=crop&w=600&q=80' },
    { name: 'sweet-lemon-meringue.jpg', url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80' },
    { name: 'sweet-velvet-cake.jpg', url: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80' },

    // Tea
    { name: 'tea-matcha.jpg', url: 'https://images.unsplash.com/photo-1520986438870-2e27b2b88a4d?q=80&w=500&auto=format&fit=crop' },
    { name: 'tea-masala-chai.jpg', url: 'https://images.unsplash.com/photo-1604908554112-46d5772f4a2d?q=80&w=500&auto=format&fit=crop' },
    { name: 'tea-ginger-lemon.jpg', url: 'https://images.unsplash.com/photo-1513639725746-9baf0f0b33a3?q=80&w=500&auto=format&fit=crop' },
    { name: 'tea-moroccan-mint.jpg', url: 'https://images.unsplash.com/photo-1595974732096-0f5f9c1a5f06?q=80&w=500&auto=format&fit=crop' },
    { name: 'tea-royal-milk.jpg', url: 'https://images.unsplash.com/photo-1532634726-240e47cb5d1a?q=80&w=500&auto=format&fit=crop' },
    { name: 'tea-iced-peach.jpg', url: 'https://images.unsplash.com/photo-1515512965560-0b814a59fdf8?q=80&w=500&auto=format&fit=crop' },
    { name: 'tea-lavender-earl.jpg', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&h=600&q=80' },

    // Toast Brunch
    { name: 'toast-benedict.jpg', url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&h=600&q=80' },
    { name: 'toast-truffle-omelette.jpg', url: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&w=200&h=200&q=80' },
    { name: 'toast-shakshuka.jpg', url: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80' },
    { name: 'toast-avo.jpg', url: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=600&q=80' },
    { name: 'toast-vegan-bowl.jpg', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
    { name: 'toast-mediterranean.jpg', url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&h=600&q=80' },
    { name: 'toast-steak-eggs.jpg', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },

    // Smoothies
    { name: 'smoothie-green-detox.jpg', url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600&q=80' },
    { name: 'smoothie-choco-malt.jpg', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80' },
    { name: 'smoothie-berry-cream.jpg', url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&h=600&q=80' },
    { name: 'smoothie-tropical-mango.jpg', url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&h=600&q=80' }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filepath)) {
            console.log(`Skipping existing file: ${path.basename(filepath)}`);
            resolve();
            return;
        }

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(filepath, () => {}); // Delete empty file
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${path.basename(filepath)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
};

async function downloadAll() {
    console.log('Starting downloads...');
    for (const img of imagesToDownload) {
        const filepath = path.join(assetsDir, img.name);
        try {
            await downloadImage(img.url, filepath);
        } catch (error) {
            console.error(`Error downloading ${img.name}: ${error.message}`);
        }
    }
    console.log('All downloads finished.');
}

downloadAll();
