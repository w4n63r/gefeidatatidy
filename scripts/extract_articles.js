const fs = require('fs');
const path = require('path');
const cheerio = require(path.join(process.cwd(), 'tools', 'node_modules', 'cheerio'));

const dataDir = path.join(process.cwd(), 'data');
const outDir = path.join(process.cwd(), 'output', 'raw');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'articles.jsonl');

// load existing ids for incremental
const existing = new Set();
if (fs.existsSync(outFile)) {
  for (const line of fs.readFileSync(outFile, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { existing.add(JSON.parse(line).id); } catch {}
  }
}

const force = process.argv.includes('--force');
const files = fs.readdirSync(dataDir).filter(f => f.toLowerCase().endsWith('.html'));
const results = [];
let added = 0, skipped = 0, ok = 0, imgOnly = 0, unpars = 0, totalChars = 0;
const skippedList = [];

for (const f of files) {
  const id = f.replace(/\.html$/i, '');
  if (!force && existing.has(id)) { skipped++; continue; }
  let html = '';
  try { html = fs.readFileSync(path.join(dataDir, f), 'utf8'); } catch (e) { unpars++; skippedList.push({id, date: (f.match(/\[(\d{4}-\d{2}-\d{2})/)||[])[1]||'', title: id, reason: 'read error: '+e.message}); continue; }
  const $ = cheerio.load(html);
  const date = (f.match(/\[(\d{4}-\d{2}-\d{2}-?\d*)\]/) || [])[1] || '';
  let title = $('meta[property="og:title"]').attr('content') || $('h1.rich_media_title').text().trim() || id;
  title = title.replace(/\s+/g, ' ').trim();
  const author = $('meta[name="author"]').attr('content') || '';
  const url = $('meta[property="og:url"]').attr('content') || '';
  const pub = $('#publish_time').first().text().trim();
  let text = '';
  const grab = (sel) => {
    const el = $(sel);
    if (!el.length) return '';
    const clone = el.clone();
    clone.find('script,style,svg,img').remove();
    return clone.text().replace(/\s+/g, ' ').trim();
  };
  text = grab('#js_content') || grab('.rich_media_content') || $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
  const status = text.length > 50 ? 'ok' : (text.length > 0 ? 'image_only' : 'unparseable');
  const word_count = text.replace(/[\s\p{P}\p{S}]/gu, '').length;
  if (status === 'ok') ok++; else if (status === 'image_only') imgOnly++; else unpars++;
  totalChars += word_count;
  if (status !== 'ok') skippedList.push({id, date, title, reason: status});
  results.push({id, date, title, author, url, publish_time: pub, word_count, status, text});
  added++;
}

const lines = results.map(r => JSON.stringify(r));
fs.writeFileSync(outFile, (fs.existsSync(outFile) && !force ? fs.readFileSync(outFile, 'utf8') : '') + (lines.length ? lines.join('\n') + '\n' : ''), { encoding: 'utf8' });

const md = ['# 未成功解析到正文的文章清单', '', '| id | date | title | 原因 |', '|---|---|---|---|', ...skippedList.map(s => `| ${s.id} | ${s.date} | ${s.title} | ${s.reason} |`)].join('\n');
fs.writeFileSync(path.join(outDir, 'skipped_report.md'), md, { encoding: 'utf8' });

console.log(JSON.stringify({ total: files.length, added, skipped, ok, image_only: imgOnly, unparseable: unpars, totalChars, skippedCount: skippedList.length }, null, 2));
