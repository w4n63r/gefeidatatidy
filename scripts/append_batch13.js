const fs = require('fs');
const path = require('path');
const analysisFile = path.join('output','analysis','articles_analysis.jsonl');
const rawLines = fs.readFileSync(path.join('output','raw','articles.jsonl'),'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const existing = new Set();
if (fs.existsSync(analysisFile)) {
  for (const l of fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean)) {
    try { existing.add(JSON.parse(l).id); } catch {}
  }
}
const entries = [
  { id: '[2023-09-08-0831][5800字长文]从网站站内优化到部署上线再到推广运营一篇文章让你学明白', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 16, pacer: 'P', summary: '站内优化全流程：意图→TDK→h1h2h3/img→内链→分门别类罗列', report: '知识流程/文章分析/站内优化到推广运营全流程.md' },
  { id: '[2023-09-09-1014]从一个BuymeCoffee链接说起哥飞带你顺藤摸瓜抽丝剥茧发现更多商业秘密', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '顺藤摸瓜法：从链接/反链发现谁在赚什么钱（ko-fi案例）', report: '知识流程/文章分析/顺藤摸瓜发现需求.md' },
  { id: '[2023-09-10-0756]别人做过的产品我还能不能做哥飞告诉你还能做', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'C', summary: '网络有地理隔离：同类产品都能活，换地区/语言/渠道=新机会', report: '知识流程/文章分析/别人做过的产品还能做吗.md' },
  { id: '[2023-09-11-0800]关于网站备案域名备案的一点科普', stage: 'S9_非学习类', difficulty: 1, minutes: 6, pacer: '', summary: '国内备案制度科普（做海外站无需国内备案，仅标阶段）', report: '' },
  { id: '[2023-09-13-0800]养成好习惯看到任何一个网站都去看看流量和流量来源分布再看看搜索流量来自于哪些词', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'P', summary: '看站四步法：流量/相似站/来源/搜索词，一站多词策略', report: '知识流程/文章分析/看站四步法.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const fb = fs.readFileSync(path.join('output','analysis','map_feedback.md'),'utf8');
const addFb = `
## 第13批（2023-09-08 ~ 09-13，5 篇）

37. **"站内优化全流程"是 S3 的集大成教程**：意图→TDK→结构→内链→分门别类，S3 核心必读+1。
38. **"顺藤摸瓜/地理隔离/看站四步法"归 S1**：S1 的方法集进一步补全（链接线索→竞争判断→看站找词）。
39. **国内备案归 S9**：与出海无关（海外站无需国内备案）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第13批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
