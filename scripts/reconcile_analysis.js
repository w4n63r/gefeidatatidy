const fs = require('fs');
const path = require('path');
const cleanLines = fs.readFileSync(path.join('output','clean','articles_clean.jsonl'),'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const realIds = new Set(cleanLines.map(a=>a.id));
const analysisFile = path.join('output','analysis','articles_analysis.jsonl');
let entries = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const norm = s => s.replace(/\[(\d{4}-\d{2}-\d{2})-?\d*\]/,'').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'');
let fixed = 0, unmatched = 0;
for (const e of entries) {
  if (realIds.has(e.id)) continue;
  // try match by date prefix + best norm overlap
  const date = (e.id.match(/\[(\d{4}-\d{2}-\d{2})/))?.[1];
  const en = norm(e.id);
  let best = null, bestScore = 0;
  for (const a of cleanLines) {
    if (!a.id.startsWith('['+date)) continue;
    const an = norm(a.id);
    let score = 0;
    for (const ch of en) if (an.includes(ch)) score++;
    // prefer longer shared prefixes
    let p = 0; while (p < Math.min(en.length, an.length) && en[p] === an[p]) p++;
    score += p * 2;
    if (score > bestScore) { bestScore = score; best = a.id; }
  }
  if (best) { e.id = best; fixed++; } else unmatched++;
}
// dedupe by id (keep entry with a report)
const seen = new Map();
for (const e of entries) {
  const prev = seen.get(e.id);
  if (!prev || (e.report && !prev.report)) seen.set(e.id, e);
}
const cleaned = [...seen.values()].sort((a,b)=>a.id.localeCompare(b.id));
fs.writeFileSync(analysisFile, cleaned.map(l=>JSON.stringify(l)).join('\n') + '\n', {encoding:'utf8'});
const doneIds = new Set(cleaned.map(e=>e.id));
const remaining = cleanLines.filter(a=>!doneIds.has(a.id));
console.log('对账修复: 修正 id', fixed, '| 无法匹配(幽灵条目)', unmatched, '| 去重后条目', cleaned.length, '| 真实剩余', remaining.length);
// 更新进度
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
p.counts.analyzed = cleaned.length; p.counts.remaining = remaining.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = cleaned.filter(e=>!e.report).length;
const sc = {}; for (const e of cleaned) sc[e.stage]=(sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p,null,2), {encoding:'utf8'});
console.log('进度已更新:', JSON.stringify({analyzed:p.counts.analyzed, remaining:p.counts.remaining, reports:p.counts.reports_written}));
// 打印未处理前10
remaining.slice(0,10).forEach((a,i)=>console.log(`${i+1}. ${a.id.slice(0,55)} | ${a.word_count}字`));
