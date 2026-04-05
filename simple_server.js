const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer(function (request, response) {
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(request.url);
    } catch (e) {
        decodedUrl = request.url;
    }
    
    if (decodedUrl === '/tea' || decodedUrl === '/tea/' || decodedUrl === '/tea-and-infusion' || decodedUrl === '/tea-and-infusion/') {
        response.writeHead(302, { 'Location': '/stitch_caf_menu_table_12/tea%20and%20infusion%20sub%20cat%C3%A9gorie%20page/index.html' });
        response.end();
        return;
    }
    if (decodedUrl === '/merchant' || decodedUrl === '/merchant/' || decodedUrl === '/dashboard' || decodedUrl === '/dashboard/' || decodedUrl === '/manager' || decodedUrl === '/manager/') {
        response.writeHead(302, { 'Location': '/stitch_caf_menu_table_12/dashbord%20insight%20page/index.html' });
        response.end();
        return;
    }
    if (decodedUrl === '/merchant-dashboard' || decodedUrl === '/merchant-dashboard/') {
        response.writeHead(302, { 'Location': '/stitch_caf_menu_table_12/merchant_dashboard/index.html' });
        response.end();
        return;
    }
    if (decodedUrl === '/@vite/client') {
        response.writeHead(404);
        response.end('404 Not Found');
        return;
    }
    let filePath = '.' + decodedUrl;
    
    filePath = filePath.split('?')[0];

    if (filePath === './') {
        filePath = './index.html';
    }

    if (filePath.includes('tea and infusion sub categorie page')) {
        filePath = filePath.replace('tea and infusion sub categorie page', 'tea and infusion sub catégorie page');
    }
    if (filePath.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
    }
    

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                let isDirectory = false;
                try {
                    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
                        isDirectory = true;
                    }
                } catch(e) {}

                if (isDirectory) {
                     const indexFilePath = path.join(filePath, 'index.html');
                     fs.readFile(indexFilePath, function(err, indexContent) {
                        if (err) {
                             response.writeHead(404);
                             response.end('404 Not Found: ' + filePath + ' (and index.html missing)');
                        } else {
                             response.writeHead(200, { 'Content-Type': 'text/html' });
                             response.end(indexContent, 'utf-8');
                        }
                     });
                     return;
                }

                response.writeHead(404);
                response.end('404 Not Found: ' + filePath);
                console.log('404 Not Found: ' + filePath);
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
