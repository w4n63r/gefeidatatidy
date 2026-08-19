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
  { id: '[2023-07-24-0800]找新词一个永远有效的建站策略让你快速拿到搜索引擎流量', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'P', summary: '新词=新站机会：谷歌15%全新词，收录即第一，先发占位', report: '知识流程/文章分析/找新词永远有效的建站策略.md' },
  { id: '[2023-07-25-0000]搞一个新词新站快闪活动两周时间任你发挥赚两份666元奖金', stage: 'S9_非学习类', difficulty: 1, minutes: 4, pacer: '', summary: '活动公告：新词新站挑战赛规则（非学习内容）', report: '' },
  { id: '[2023-07-26-0906]人人都能学会的发掘web产品需求方法入门', stage: 'S1_需求与关键词', difficulty: 1, minutes: 12, pacer: 'P', summary: '需求挖掘：Similarweb看流量/爱站看词/chinaz查难度，一词一站', report: '知识流程/文章分析/发掘Web产品需求方法入门.md' },
  { id: '[2023-07-27-0800]以时间戳Timestamp在线工具网站为例手把手教你做一个工具网站的详细步骤', stage: 'S2_建站与开发', difficulty: 2, minutes: 20, pacer: 'P', summary: '工具站完整教程：竞品分析/长尾词/URL结构/密度5%/动态页', report: '知识流程/文章分析/时间戳工具站完整教程.md' },
  { id: '[2023-07-29-0801]如果你准备出海请提前注册好海外各种媒体社区服务的账号并时长登录保持活跃', stage: 'S7_工具与资源', difficulty: 1, minutes: 6, pacer: 'P', summary: '提前注册养海外账号：IH/PH/HN/Reddit/Twitter/Google等', report: '知识流程/文章分析/提前养海外账号.md' },
  { id: '[2023-07-30-0800]我如何通过SEO和Adsense优化把一个网站广告收入从每月八百多美元提升到每月两千多美元经验全分享', stage: 'S6_变现与商业化', difficulty: 2, minutes: 14, pacer: 'P', summary: '广告收入翻倍：提速+站内SEO+广告位布局（3个/页）', report: '知识流程/文章分析/广告收入800到2100美元.md' }
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
## 第7批（2023-07-24 ~ 07-30，6 篇）

16. **"找新词/需求挖掘/工具站搭建"是 S1/S2 的核心教程**：《找新词》《发掘Web需求》《时间戳工具站》共同构成"选词→建站"主线，建议知识流程 S1→S2 顺序中把这三篇设为必读。
17. **出海准备类（养号）归 S7**：《提前养海外账号》归 S7（基础设施/账号），建议 S7 增加"出海账号与基础设施"子主题。
18. **活动公告类归 S9**（快闪活动规则）——与社群运营相关，非学习内容。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第7批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
