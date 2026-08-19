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
  { id: '[2023-08-15-0800]分享一个谷歌和百度都优化得不错的网站', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'P', summary: '千篇国学案例：子域名栏目+分门别类语义覆盖长尾，不堆关键词', report: '知识流程/文章分析/千篇国学双优化内容结构.md' },
  { id: '[2023-08-18-0800]分享几个优化难度不高但搜索量不小的关键词', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '低难度高搜索量词：时间词/每天一页/需求×地点程序化思路', report: '知识流程/文章分析/低难度高搜索量关键词.md' },
  { id: '[2023-08-19-0914]看得上小钱才能赚大钱积少成多聚沙成塔', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '先赚小钱再赚大钱：卖时间→产品→收购→钱生钱升级路径', report: '知识流程/文章分析/看得上小钱才能赚大钱.md' },
  { id: '[2023-08-20-0800]对于我们来说尽快多赚点美元可能是最适合我们的方案', stage: 'S6_变现与商业化', difficulty: 1, minutes: 5, pacer: 'P', summary: '第一个100美元目标（Adsense起付线），别设门槛有流量就申请', report: '知识流程/文章分析/尽快赚到第一个100美元.md' },
  { id: '[2023-08-21-0800]做网站如何从搜索引擎图片搜索获取流量', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 6, pacer: 'P', summary: '图片搜索=顶部精准流量：大图+alt/title优化', report: '知识流程/文章分析/从图片搜索获取流量.md' },
  { id: '[2023-08-23-0800]如何快速估算一个网站的Adsense广告收入', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'P', summary: '收入估算公式：30×UV倍数×ECPM×PV比×展示比，加AI再做一遍机会', report: '知识流程/文章分析/快速估算Adsense收入.md' }
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
## 第10批（2023-08-15 ~ 08-23，6 篇）

28. **内容结构/图片SEO归 S3**：《千篇国学》《图片搜索》归 S3（SEO基础），S3 需含"内容页结构（分门别类）+图片SEO"子主题。
29. **"赚小钱/第一个100美元"归 S0/S6**：《看得上小钱》归 S0（心态路径）；《第一个100美元》归 S6（Adsense实操）。
30. **Adsense 收入估算公式是 S6 核心工具**：30×UV×ECPM×PV比×展示比，建议纳入知识流程的"变现计算"小节。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第10批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
