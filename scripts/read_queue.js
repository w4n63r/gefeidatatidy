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
const start = parseInt(process.argv[2]||'0',10);
const count = parseInt(process.argv[3]||'6',10);
console.log('Total queue remaining:', queue.length);
for (let i = start; i < Math.min(start+count, queue.length); i++) {
  const a = queue[i];
  console.log(`[${i}] ID: ${a.id} | WORDS: ${a.word_count} | STATUS: ${a.status} | TITLE: ${a.title}`);
}
