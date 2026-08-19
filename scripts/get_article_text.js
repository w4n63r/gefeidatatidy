const fs = require('fs');
const path = require('path');
const cleanLines = fs.readFileSync(path.join('output','clean','articles_clean.jsonl'),'utf8').split('\n').filter(Boolean);
const arts = cleanLines.map(l => JSON.parse(l));
const analysisFile = path.join('output','analysis','articles_analysis.jsonl');
const done = new Set();
if (fs.existsSync(analysisFile)) {
  for (const l of fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean)) {
    try { done.add(JSON.parse(l).id); } catch {}
  }
}
const queue = arts.filter(a => !done.has(a.id));
const idx = parseInt(process.argv[2]||'0',10);
const offset = parseInt(process.argv[3]||'0',10);
const length = parseInt(process.argv[4]||'4000',10);

if (idx < 0 || idx >= queue.length) {
  console.log('Index out of range');
  process.exit(1);
}

const a = queue[idx];
console.log(`=== ARTICLE [${idx}] ===`);
console.log('ID:', a.id);
console.log('TITLE:', a.title);
console.log('WORD_COUNT:', a.word_count);
console.log('STATUS:', a.status);
console.log(`--- TEXT (offset ${offset}, length ${length}) ---`);
console.log((a.cleaned_text || '').slice(offset, offset + length));
console.log('--- END SLICE ---');
