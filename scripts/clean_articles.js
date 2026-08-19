const fs = require('fs');
const path = require('path');
const outDir = path.join(process.cwd(), 'output', 'clean');
fs.mkdirSync(outDir, { recursive: true });
const lines = fs.readFileSync(path.join('output','raw','articles.jsonl'),'utf8').split('\n').filter(Boolean);
const NOISE = /点击上方|点击关注|扫码|二维码|长按|设为星标|星标|点赞|在看|留言|转发|分享到|阅读原文|商务合作|加我微信|加微信|欢迎加入|赞赏/;
const out = [];
const wordCounts = [];
for (const line of lines) {
  const a = JSON.parse(line);
  let text = a.text || '';
  // split into paragraphs
  const paras = text.split(/(?<=[。！？!?；;])\s*|\n+/).map(p => p.trim()).filter(Boolean);
  const kept = [];
  for (const p of paras) {
    if (p.length < 40 && NOISE.test(p)) continue;      // 引导语/尾注段
    if (/^[\s\-—~·\.。、，,;；:：!！?？*#<>(){}\[\]|/\\=+_""''`''【】《》]+$/.test(p)) continue; // 纯符号行
    kept.push(p);
  }
  const cleaned = kept.join('\n');
  const wc = cleaned.replace(/[\s\p{P}\p{S}]/gu, '').length;
  wordCounts.push(wc);
  out.push(JSON.stringify({ ...a, cleaned_text: cleaned, word_count: wc }));
}
fs.writeFileSync(path.join(outDir, 'articles_clean.jsonl'), out.join('\n') + '\n', { encoding: 'utf8' });
const sorted = wordCounts.slice().sort((x,y)=>x-y);
const avg = wordCounts.reduce((s,x)=>s+x,0)/wordCounts.length;
const median = sorted[Math.floor(sorted.length/2)];
console.log(JSON.stringify({ total: out.length, min: sorted[0], max: sorted[sorted.length-1], avg: Math.round(avg), median }, null, 2));
