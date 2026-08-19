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
  { id: '[2023-10-15-0800]养网站防老第2步分析搜索意图', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'P', summary: '★第2步：谷歌推荐词收集+ChatGPT批量分析搜索意图', report: '知识流程/文章分析/第2步分析搜索意图.md' },
  { id: '[2023-10-16-0800]养网站防老第15步用一个公式来判断关键词是否值得做让你选择关键词不再犹豫', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '★第1.5步：kdroi=volume×cpc÷kd 量化选词', report: '知识流程/文章分析/第15步kdroi选词公式.md' },
  { id: '[2023-10-19-0800]哥飞解读两个月拿下1359万访问量的新网站为什么会被谷歌给K了', stage: 'S8_避坑警示', difficulty: 2, minutes: 10, pacer: 'E', summary: '被K警示：两个月1359万搜索流量（78%搜索+<1%外链）后被K，别追暴涨', report: '知识流程/文章分析/1359万被谷歌K掉警示.md' },
  { id: '[2023-10-22-2345]不用开发如何只用一个域名就可以一键部署上线一个AI产品', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'P', summary: 'Vercel新模板（面试/Emoji/二维码）；Replicate每个模型=一个客户端产品', report: '知识流程/文章分析/一个域名一键部署AI产品.md' }
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
## 第19批（2023-10-15 ~ 10-22，4 篇）

56. **"养网站防老第1-1.5-2步"是 S1 的官方教程串**：挖需求→kdroi量化→搜索意图，S1 阶段把这些设为主线必读。
57. **"被K案例"归 S8**：1359万被K=避坑警示的重要案例（非自然流量信号识别）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第19批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
