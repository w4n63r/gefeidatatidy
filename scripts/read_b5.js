const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join('output','clean','articles_clean.jsonl'),'utf8').split('\n').filter(Boolean);
const arts = lines.map(l => JSON.parse(l));
const a36 = arts.find(x => x.id.includes('2023-07-17-0800'));
console.log('===== 30个免费推广渠道 (2400-末尾) =====');
console.log((a36.cleaned_text||'').slice(2400, 4800));
const a18 = arts.filter(x => x.id.includes('2023-07-18-0800'));
for (const a of a18) {
  console.log('========== ' + a.id.slice(0,30) + ' | ' + a.word_count + '字 ==========');
  console.log((a.cleaned_text||'').slice(0, 1500));
}
