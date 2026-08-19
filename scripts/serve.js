const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/学习网站/index.html';
  }

  const filePath = path.join(ROOT_DIR, reqPath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Special handling for HTML files: inject no-referrer to unblock WeChat images
    if (ext === '.html') {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Inject no-referrer meta tag if not present
      if (!content.includes('name="referrer"') && !content.includes("name='referrer'")) {
        if (content.includes('<head>')) {
          content = content.replace('<head>', '<head>\n  <meta name="referrer" content="no-referrer">');
        } else if (content.includes('<HEAD>')) {
          content = content.replace('<HEAD>', '<HEAD>\n  <meta name="referrer" content="no-referrer">');
        } else {
          content = '<meta name="referrer" content="no-referrer">\n' + content;
        }
      }

      // Ensure WeChat lazy-loaded data-src is mapped to src
      content = content.replace(/<img([^>]*?)data-src=["']([^"']+)["']([^>]*?)>/gi, (match, p1, dataSrc, p2) => {
        if (!match.includes(' src=') || match.includes(' src=""') || match.includes(" src=''")) {
          return `<img ${p1} src="${dataSrc}" referrerpolicy="no-referrer" ${p2}>`;
        }
        return match.replace(/<img\s+/i, '<img referrerpolicy="no-referrer" ');
      });

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/学习网站/index.html`;
  console.log('========================================================');
  console.log(`  🚀 哥飞出海做网站赚美元 — 学习工作台已启动！`);
  console.log(`  🔗 本地访问地址: ${url}`);
  console.log('========================================================\n');
  console.log('正在自动为您打开浏览器...');

  const openCmd = process.platform === 'win32' ? `start "" "${url}"` :
                  process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(openCmd);
});
