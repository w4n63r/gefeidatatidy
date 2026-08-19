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
  { id: '[2023-09-14-0800]恭喜群友做了个网站上线21天拿到10万日PV又花了13天变成了20万日PV', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'C', summary: '34天20万日PV案例：AI改造强需求，别为差异化而差异化', report: '知识流程/文章分析/34天20万日PV案例.md' },
  { id: '[2023-09-15-0800]A16Z报告说用户很愿意为AI类产品付费名单里90%的公司已经实现盈利几乎所有盈利公司的盈利都来自于用户订阅贡献', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'E', summary: 'A16Z：AI产品做网站+订阅（月费10美元），90%盈利靠订阅，口口相传获客', report: '知识流程/文章分析/A16Z报告AI产品是好生意.md' },
  { id: '[2023-09-16-0800]建站第2个月拿下1840万访问量俄罗斯版的妙鸭相机是怎么做到的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'E', summary: '妙鸭俄版1840万：付费软文+自发传播，2170个反链=可投媒体池', report: '知识流程/文章分析/妙鸭俄版1840万爆火路径.md' },
  { id: '[2023-09-17-0800]养成好习惯之从一张图片开始发现一个月访问量1亿的网站', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'P', summary: '从图→域名→反链→大站；小词汇总=大流量，别看不起小词', report: '知识流程/文章分析/从一张图发现1亿访问站.md' },
  { id: '[2023-09-18-0800]为什么俄罗斯版妙鸭相机即使拿下1840万月访问量也主要只在几个国家火哥飞告诉你答案', stage: 'S4_内容与多语言', difficulty: 2, minutes: 10, pacer: 'C', summary: '语言是天然屏障：多语言i18n+按语言人群找当地媒体/KOL推广', report: '知识流程/文章分析/语言是天然的屏障.md' }
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
## 第14批（2023-09-14 ~ 09-18，5 篇）

40. **"妙鸭爆火路径"归 S5（增长/软文）**：付费软文+反链=增长渠道，S5 增加"软文投放与媒体资源"子主题。
41. **"语言屏障/多语言"归 S4**：S4（内容与多语言）核心概念确认：i18n+按语言人群推广。
42. **A16Z 报告归 S6**：AI 产品订阅制证据，S6 增加"AI 订阅定价（~10美元/月）"参考。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第14批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
