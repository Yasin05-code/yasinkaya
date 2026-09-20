/* Yayina hazir dosyalari dist/ klasorune kopyalar.
   Netlify bu klasoru yayinlar; node_modules ve kaynak dosyalar disarida kalir. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const FILES = ['favicon.ico', 'robots.txt', 'sitemap.xml'];
const DIRS = ['assets', 'images'];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

let count = 0;

for (const name of fs.readdirSync(ROOT)) {
  if (name.endsWith('.html')) {
    fs.copyFileSync(path.join(ROOT, name), path.join(DIST, name));
    count++;
  }
}

for (const name of FILES) {
  const src = path.join(ROOT, name);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, name));
    count++;
  }
}

for (const dir of DIRS) {
  const src = path.join(ROOT, dir);
  if (!fs.existsSync(src)) continue;
  fs.mkdirSync(path.join(DIST, dir), { recursive: true });
  for (const name of fs.readdirSync(src)) {
    // images/ icinde yalnizca optimize edilmis .webp yayinlanir;
    // buyuk .png/.jpeg dosyalari kaynak olarak repoda kalir.
    if (dir === 'images' && !name.endsWith('.webp')) continue;
    fs.copyFileSync(path.join(src, name), path.join(DIST, dir, name));
    count++;
  }
}

console.log(`dist/ hazir — ${count} dosya kopyalandi.`);
