const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join('output','clean','articles_clean.jsonl'),'utf8').split('\n').filter(Boolean);
const ok = lines.map(l=>JSON.parse(l)).filter(a=>a.status==='ok');
const NOISE = /点击上方|点击关注|扫码|二维码|长按|设为星标|点赞|在看|欢迎加入|加我微信|阅读原文/;
let found = 0;
for (const a of [ok[0], ok[Math.floor(ok.length/2)], ok[ok.length-1]]) {
  const m = (a.cleaned_text||'').match(NOISE);
  console.log('ID:', a.id.slice(0,20), '| 字数:', a.word_count, '| 噪音残留:', m ? m[0] : '无');
  if (m) found++;
}
let total = 0;
for (const l of lines) { const a = JSON.parse(l); if (NOISE.test(a.cleaned_text||'')) total++; }
console.log('全库仍有噪音段落的文章数:', total, '/', lines.length);
