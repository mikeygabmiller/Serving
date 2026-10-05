#!/usr/bin/env node
/* Makes the ready-made position sheets: sheets/<form>-<position>.pdf, one for
   every position at every form of Mass, exactly as the sheet maker draws them
   with nothing changed.

     node tools/make-sheets.cjs

   Needs Playwright with its Chromium (npm install -g playwright, then
   npx playwright install chromium). It also writes sheets/manifest.json, a
   fingerprint of the files a sheet is drawn from; tools/check.py fails when
   those files have changed since the sheets were made, so a printed sheet can
   never say something the site no longer says.

   Behind a proxy that Chromium does not trust, run it with
   NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<the proxy's CA file>: the fonts
   are fetched by Node and handed to the page. */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'sheets');
// Everything a sheet is drawn from. tools/check.py keeps the same list.
const INPUTS = [
  'css/site.css',
  'data/extras.js', 'data/low-mass-two.js', 'data/low-mass.js', 'data/missa-cantata.js', 'data/solemn-mass.js', 'data/sources.js',
  'js/app.js', 'js/forms.js', 'js/plan.js', 'js/sheets.js'
];

function fingerprint() {
  const h = crypto.createHash('sha256');
  for (const f of INPUTS) {
    const text = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
    h.update(f + '\n' + text + '\n');
  }
  return h.digest('hex');
}

function playwright() {
  try { return require('playwright'); } catch (e) { /* try the global install */ }
  try { return require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); } catch (e) { /* not there either */ }
  console.error('Playwright is not installed. Run: npm install -g playwright && npx playwright install chromium');
  process.exit(1);
}

const cache = new Map();
async function fontViaNode(route) {
  const url = route.request().url();
  try {
    if (!cache.has(url)) {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36' } });
      cache.set(url, { status: r.status, type: r.headers.get('content-type') || '', body: Buffer.from(await r.arrayBuffer()) });
    }
    const c = cache.get(url);
    await route.fulfill({ status: c.status, headers: { 'content-type': c.type, 'access-control-allow-origin': '*' }, body: c.body });
  } catch (e) {
    await route.abort();
  }
}

(async () => {
  const { chromium } = playwright();
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1400 } });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, fontViaNode);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const url = 'file://' + path.join(ROOT, 'index.html');
  await page.goto(url);
  const positions = await page.evaluate(() => window.Forms.all.map(f => ({ form: f.key, roles: f.roles.map(r => r.key) })));
  const made = [];
  let fontsOk = true;
  for (const p of positions) {
    for (const role of p.roles) {
      await page.goto(url + '#sheets:' + p.form + ':' + role);
      await page.evaluate(() => document.fonts.ready);
      const loaded = await page.evaluate(() => [...document.fonts].some(f => f.family.replace(/"/g, '') === 'Alegreya' && f.status === 'loaded'));
      if (!loaded) fontsOk = false;
      const shown = await page.evaluate(() => document.querySelectorAll('#sheet .sheet-step').length);
      if (!shown) errors.push(p.form + '/' + role + ': the sheet is empty');
      const file = p.form + '-' + role + '.pdf';
      const name = await page.evaluate(() => document.querySelector('#sheet .sheet-title').textContent + ', ' +
        window.Forms.get(document.querySelector('#sh-form').value).name);
      const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
      await page.pdf({
        path: path.join(OUT, file), format: 'Letter', printBackground: true, preferCSSPageSize: true,
        displayHeaderFooter: true, headerTemplate: '<div></div>',
        footerTemplate: '<div style="width:100%;font-size:8px;color:#5c574e;font-family:sans-serif;text-align:center">' +
          esc(name) + ' &middot; page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
      });
      made.push(file);
      console.log('made sheets/' + file + ' (' + shown + ' steps)');
    }
  }
  await browser.close();
  if (errors.length) {
    console.error('Problems:\n  ' + errors.join('\n  '));
    process.exit(1);
  }
  if (!fontsOk) console.warn('The web fonts did not load, so the sheets use fallback fonts. See the note at the top of this file.');
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({ inputs: INPUTS, fingerprint: fingerprint(), sheets: made }, null, 2) + '\n');
  console.log('wrote sheets/manifest.json');
})();
