const fs = require('fs');
const path = require('path');
// 进度摘要
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
console.log('=== 进度摘要 ===');
console.log('已分析:', p.counts.analyzed, '| 剩余:', p.counts.remaining, '| 报告:', p.counts.reports_written, '| 仅标阶段:', p.counts.stage_only_entries);
console.log('阶段分布:', JSON.stringify(p.stageDistribution));
// 未处理队列前 15 篇
const cleanLines = fs.readFileSync(path.join('output','clean','articles_clean.jsonl'),'utf8').split('\n').filter(Boolean);
const arts = cleanLines.map(l => JSON.parse(l));
const done = new Set();
for (const l of fs.readFileSync(path.join('output','analysis','articles_analysis.jsonl'),'utf8').split('\n').filter(Boolean)) {
  try { done.add(JSON.parse(l).id); } catch {}
}
const queue = arts.filter(a => !done.has(a.id));
console.log('\n=== 未处理队列前15篇（Antigravity 应从这里续跑）===');
queue.slice(0,15).forEach((a,i) => console.log(`${i+1}. ${a.id.slice(0,60)} | ${a.word_count}字 | ${a.status}`));
console.log('\n=== 最近5篇已分析 ===');
const last = fs.readFileSync(path.join('output','analysis','articles_analysis.jsonl'),'utf8').split('\n').filter(Boolean).slice(-5).map(l=>JSON.parse(l));
last.forEach(e => console.log(e.id.slice(0,50), '|', e.stage, '|', e.summary));
