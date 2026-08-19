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
const start = parseInt(process.argv[2]||'0',10), count = parseInt(process.argv[3]||'5',10);
for (let i = start; i < Math.min(start+count, queue.length); i++) {
  const a = queue[i];
  const text = (a.cleaned_text||'').trim();
  const cap = text.length > 3000 ? text.slice(0, 3000) + '\n...[截断, 实际 ' + a.word_count + ' 字]' : text;
  console.log('========== [' + (i+1) + '/' + queue.length + '] ==========');
  console.log('ID: ' + a.id);
  console.log('TITLE: ' + a.title);
  console.log('WORDS: ' + a.word_count + ' | STATUS: ' + a.status);
  console.log('TEXT:');
  console.log(cap);
}
console.log('--- 队列剩余: ' + queue.length + ' 篇 ---');
