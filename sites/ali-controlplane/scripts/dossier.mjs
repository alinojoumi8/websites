// Prints dist/dossier/ to the PDF that the contact section offers.
// Usage: npm run build && node scripts/dossier.mjs && npm run build   (run from sites/ali-controlplane)
// (the second build copies the new PDF from public/ into dist/)
// Needs Google Chrome. Set CHROME to its path if it is not "google-chrome".
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { extname, join, normalize } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = 'dist';
const out = 'public/Ali-Nojoumi-Executive-Dossier.pdf';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  try {
    let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    if (path.endsWith('/')) path += 'index.html';
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();

try {
  await run(process.env.CHROME || 'google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=6000',
    `--print-to-pdf=${out}`,
    `http://127.0.0.1:${port}/dossier/`,
  ]);
  console.log('wrote', out);
} finally {
  server.close();
}
