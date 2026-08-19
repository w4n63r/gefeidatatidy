const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join('output','clean','articles_clean.jsonl'),'utf8').split('\n').filter(Boolean);
const arts = lines.map(l => JSON.parse(l));
const a12 = arts.filter(x => x.id.includes('2023-08-12-0800'));
for (const a of a12) {
  console.log('===== ' + a.id.slice(0,26) + ' | ' + a.word_count + '字 =====');
  console.log((a.cleaned_text||'').slice(0, 1800));
}
const a66 = arts.find(x => x.id.includes('2023-08-13-0800'));
console.log('===== 注册海外公司到Stripe收款回国 =====');
console.log((a66.cleaned_text||'').slice(0, 3000));
