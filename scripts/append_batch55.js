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
  { id: '[2024-09-01-2143]一不小心拿了个ProductHunt单日第一名总结了几点经验分享给大家', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'P', summary: 'ProductHunt单日第一名实战复盘：PH算法机制/择机避峰/7大打榜SOP', report: '知识流程/文章分析/ProductHunt单日第一名打榜实战复盘与7步SOP.md' },
  { id: '[2024-09-05-1715]榜单最受欢迎的50个AI公众号丨2024年8月', stage: 'S1_需求与关键词', difficulty: 1, minutes: 2, pacer: 'R', summary: 'AIGCRank 2024年8月最受欢迎50个AI公众号榜单', report: '' },
  { id: '[2024-09-06-1857]榜单全球最受欢迎的100款AI产品揭晓丨2024年8月', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'R', summary: 'AIGCRank 2024年8月全球Top100 AI产品榜单', report: '' },
  { id: '[2024-09-07-1157]新站上线一周流量每天都在增加哥飞又来给社群里的朋友们打鸡血了', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 8, pacer: 'E', summary: '新站上线7天进首页实证：站内SEO打底/外链加注/日点击冲500', report: '知识流程/文章分析/新站上线7天进首页实证与网感修炼.md' },
  { id: '[2024-09-12-2328]哥飞分享Reddit新人如何在3天内从负数到300Karma', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 10, pacer: 'P', summary: 'Reddit新人3天速破300 Karma养号SOP：低门槛板块/提问式互动/避坑指南', report: '知识流程/文章分析/Reddit新人3天速破300Karma养号SOP.md' },
  { id: '[2024-09-13-1723]哥飞小课堂用几个案例来讲解程序化SEO生成海量页面获取流量的方式', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 18, pacer: 'P', summary: '4600字程序化SEO全景拆解：结构化数据模版/distance.to案例/爬虫渐进喂养SOP', report: '知识流程/文章分析/程序化SEO架构设计与海量页面渐进放量SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第55批（2024-09-01 ~ 2024-09-13，6 篇）

185. **"ProductHunt 单日第一名实战复盘与 7 步 SOP"构建了 S5 顶级产品发榜战术库**：解构 PH 算法（前 4 小时随机测试 + 19 点定榜马太效应）、周末避峰选时策略及 First Comment 故事化撰写。
186. **"Reddit 3 天从负分速刷 300+ Karma"丰富了 S5 社媒冷启动实操体系**：锁定宠物与风景低门槛板块，采用“提问式标题 + 幽默互动秒回”化解负分危机。
187. **"程序化 SEO 架构设计与爬虫放量 SOP"奠定了 S5 海量页面系统总纲**：破除纯文本垃圾误区，确立“结构化数据 + SSR 模版 + 10 分钟缓存”架构与“10 $\rightarrow$ 100 $\rightarrow$ 1000 页面/天”爬虫渐进喂养流程。
188. **"新站上线 7 天进首页实证与网感修炼"强化了 S3 极速冲榜心智**：站内精准出词 + 外链推动 + 真实交互正反馈，实证 7 天日点击冲上 500+。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第55批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
