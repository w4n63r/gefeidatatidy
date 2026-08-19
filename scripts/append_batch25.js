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
  { id: '[2023-12-03-2041]瞬间出图我还在打字图片已经生成好了SDXLTurbo就是这么快', stage: 'S9_非学习类', difficulty: 1, minutes: 4, pacer: '', summary: 'SDXL Turbo工具体验（S9）', report: '' },
  { id: '[2023-12-05-0800]养网站防老的典型例子一个多月把一个网站慢慢养到了每天两千多访问未来还会更多', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'E', summary: '健康流量曲线：28天起飞+50%直接访问，养网站防老实证', report: '知识流程/文章分析/养网站防老典型例子.md' },
  { id: '[2023-12-06-2314]介绍一个月访问量326万的homemade网站以及更多其它相似网站', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 8, pacer: 'E', summary: '多关键词矩阵+64%移动端必须适配；从关键词扩散找竞品', report: '知识流程/文章分析/326万homemade站多关键词.md' },
  { id: '[2023-12-07-1850]某个月访问量3000多万的网站里有个月访问量118万的页面有人基于这个页面的需求做了个月收入12万美金的AIApp', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'E', summary: '大站流量页发现需求（Pick Up Lines）→Rizz AI App月入12万', report: '知识流程/文章分析/118万页面到12万App.md' },
  { id: '[2023-12-08-0828]看来我们走在了正确的道路上既然未来无法预测那就躬身入局参与到浪潮中只有身在浪中才会有冲浪的可能而不是被浪撞晕', stage: 'S0_认知与心态', difficulty: 1, minutes: 4, pacer: '', summary: '短随笔：躬身入局（S0，仅标阶段）', report: '' },
  { id: '[2023-12-09-2100]哥飞在深圳线下聚会的分享', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '线下聚会分享（S9）', report: '' },
  { id: '[2023-12-11-2351]三聊小词也许可以农村包围城市', stage: 'S1_需求与关键词', difficulty: 2, minutes: 8, pacer: 'P', summary: '农村包围城市：1万小词矩阵×10访问=10万日访问（hix.ai尝试）', report: '知识流程/文章分析/农村包围城市小词矩阵.md' }
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
## 第25批（2023-12-03 ~ 12-11，7 篇）

72. **"养网站防老典型例子"归 S0**：28天起飞+健康结构=长期主义实证。
73. **"大站流量页发现需求"是 S1 的高价值方法**：Pick Up Lines→Rizz App（月入12万$），S1 增加"单页需求产品化"。
74. **"农村包围城市"补全 S1**：小词矩阵规模化策略。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第25批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
