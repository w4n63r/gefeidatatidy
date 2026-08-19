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
  { id: '[2026-01-14-2149]入群九个月从网站被惩罚到月入万刀', stage: 'S0_认知与心态', difficulty: 3, minutes: 24, pacer: 'E', summary: '9个月从被罚归零到月入万刀复盘：严禁AI批量水页/外链加速发现好页面与关键词域名实证', report: '知识流程/文章分析/9个月从被罚归零到月入万刀复盘与换域名做词实证.md' },
  { id: '[2026-01-15-2254]哥飞SEO教程这个发外链的方式一般人想不到', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'P', summary: '高阶外链获取指南：开源项目Sponsor高DR外链与技术社区发帖引流SOP', report: '知识流程/文章分析/开源项目Sponsor高DR外链与社区ShowCase发帖SOP.md' },
  { id: '[2026-01-19-2311]外链到底有什么作用是用来提升权重还是来获取访问量一定要分清楚', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 8, pacer: 'C', summary: '外链作用深度辨析：直接引流与长期权重提升区别/长效PageRank杠杆认知模型', report: '知识流程/文章分析/外链双重属性辨析与长期PageRank权重杠杆模型.md' },
  { id: '[2026-01-21-1652]一种全新又复古的软件交付方式', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'C', summary: '极简软件交付模型：单HTML文件双击即用/卖APIKey与本地纯前端商业化心法', report: '知识流程/文章分析/极简软件交付模型与单HTML卖APIKey商业化心法.md' },
  { id: '[2026-01-23-0810]解决系列图书阅读顺序问题的小网站一年有2000万访问量太不可思议了', stage: 'S1_需求与关键词', difficulty: 3, minutes: 20, pacer: 'E', summary: '图书阅读顺序利基站拆解：BookSeriesInOrder年访2000万/矩阵做词与年入50万刀养老实证', report: '知识流程/文章分析/BookSeriesInOrder年访2000万拆解与长青做词实证.md' },
  { id: '[2026-01-24-1629]我VibeCoding一周做了个桌面Agent', stage: 'S2_建站与开发', difficulty: 3, minutes: 25, pacer: 'P', summary: 'VibeCoding一周开发桌面Agent实录：Tauri+ClaudeCode全自动驾驶24步工程SOP', report: '知识流程/文章分析/VibeCoding一周开发桌面Agent实录与24步工程SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第103批（2026-01-14 ~ 2026-01-24，6 篇）

421. **"入群九个月从网站被惩罚到月入万刀"贡献了 S0 止损与外链本质模型**：AI 批量低质水页致信任清零，果断弃坑换域名带记忆重生，睡飞外链本质（加速发现高质量好页面），低垂果实打怪法。
422. **"这个发外链的方式一般人想不到"系统化了 S5 开源赞助外链**：赞助高知名度开源官网获取 DR 85+ 顶级永久首页外链，社区持续发帖介绍产品更新沉淀上下文反链。
423. **"外链到底是提升权重还是获取访问量"辨析了 S5 权重杠杆心法**：99% 价值在于向 Google 注入 PageRank 权重拉升关键词排位，拒绝用直接引荐流量算短期 ROI。
424. **"一种全新又复古的软件交付方式"建构了 S2/S6 极简交付模型**：纯静态单 HTML 文件双击即用，卖带积分额度的 API Key，本地存储保障数据隐私。
425. **"解决系列图书阅读顺序问题的小网站"提供了 S1 长青做词模板**：BookSeriesInOrder 年访 2016 万（12 年老站养老），{author} books in order 沉淀 20,000+ 结构化内页，AdSense + Amazon 分销年入 50 万美金。
426. **"我 Vibe Coding 一周做了个桌面 Agent"沉淀了 S2 24 步工程化 SOP**：艾逗笔 WorkAny，Tauri + Hono API Sidecar + SQLite，3 窗口 Claude Code 并行，GitHub Actions 跨平台自动打包签名发布。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第103批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
