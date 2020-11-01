const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer(async (req, resp) => {
    console.log('request', req.url);

    const profileName = req.url.substr(1);

    if (profileName === 'favicon.ico') {
      resp.writeHead(404);
      return;
    }

    if (profileName === '') {
      const profiles = (
        await fs.promises.readdir(path.resolve(__dirname, `../data`))
      )
        .filter((item) => item.endsWith('.mobileconfig'))
        .map((item) => {
          const name = item.replace('.mobileconfig', '');
          return `<h1><a href="/${name}" style="color:#898989">${name}</a></h1>`;
        });

      resp.writeHead(200, { 'Content-Type': 'text/html' });
      resp.end(profiles.join('\n'), 'utf-8');
      return;
    }

    const filePath = path.resolve(
      __dirname,
      `../data/${profileName}.mobileconfig`
    );

    try {
      const content = await fs.promises.readFile(filePath);
      resp.writeHead(200, {
        'Content-Type': 'application/x-apple-aspen-config',
      });
      resp.end(content, 'utf-8');
    } catch (err) {
      resp.writeHead(200, { 'Content-Type': 'text/plain' });
      resp.end(err.message, 'utf-8');
    }
  })
  .listen(6402);

console.log('Server running at http://lan.keng42.com:6402');
