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
  { id: '[2023-10-07-0800]国庆放假大家都没闲着都在上新站搞流量赚美元社群配套网站首次亮相', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '社群动态/国庆上站汇报（S9）', report: '' },
  { id: '[2023-10-08-0800]做网站没灵感来看看别人的优秀案例之前端工具站', stage: 'S2_建站与开发', difficulty: 1, minutes: 10, pacer: 'E', summary: '4个前端工具站案例：简单+好玩+停留长+直接访问高；monkeytype靠体验', report: '知识流程/文章分析/优秀前端工具站案例.md' },
  { id: '[2023-10-09-0800]养网站防老网站可以做成一生的事业', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'C', summary: '养网站防老：矩阵打法（老带新/一词一域名/分散风险/长期资产）', report: '知识流程/文章分析/养网站防老矩阵打法.md' },
  { id: '[2023-10-10-0800]100天103篇6613新关注23万阅读403人付费入群感谢大家的支持', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '数据汇报：100天/103篇/403人入群（S9）', report: '' },
  { id: '[2023-10-11-0800]AI导航站这么卷了还能做吗', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'P', summary: '导航站赛道分析：SEO抓新词+自然语言搜索体验差异化', report: '知识流程/文章分析/AI导航站还能做吗.md' },
  { id: '[2023-10-12-0800]他给博客增加多语言支持后访问量增加了10倍', stage: 'S4_内容与多语言', difficulty: 1, minutes: 10, pacer: 'P', summary: '多语言=10倍流量：子目录结构+GPT翻译自动化+低竞争语言套利', report: '知识流程/文章分析/多语言访问量增10倍.md' },
  { id: '[2023-10-14-0800]养网站防老第1步挖掘出第1个需求', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'P', summary: '★养网站防老第1步：51个财富密码词+Sermrush/谷歌/Trends五步挖需求', report: '知识流程/文章分析/养网站防老第1步挖掘需求.md' }
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
## 第18批（2023-10-07 ~ 10-14，7 篇）

53. **"养网站防老"系列是 S0/S1 的主干教程**：第1步（挖需求）归 S1；"养网站防老矩阵"归 S0（长期资产观）。
54. **"多语言=10倍流量"是 S4 核心**：S4 的实操 = 子目录结构+GPT翻译+低竞争语言套利。
55. **"AI导航站赛道分析"归 S1**：给出"先做赛道数据再决定"的方法，可推广到任何赛道。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第18批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
