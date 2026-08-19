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
  { id: '[2023-03-24-1019]开源了一个不使用任何后端框架纯php实现流式调用OpenAIgpt接口的项目', stage: 'S2_建站与开发', difficulty: 2, minutes: 14, pacer: 'P', summary: '纯PHP零框架实现OpenAI流式接口调用与SSE实时前端打印', report: '知识流程/文章分析/纯PHP零框架流式GPT调用.md' },
  { id: '[2023-07-28-0800]关于用户归因一次给你讲透', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'C', summary: '用户归因原理与Web/App端实现：URL参数标签与设备回传匹配', report: '知识流程/文章分析/关于用户归因一次讲透.md' },
  { id: '[2023-08-03-0800]用三个案例来详细解释大型网站的SEO引爆点为什么是生成几十万个页面给搜索引擎收录上', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 10, pacer: 'E', summary: 'DateTimeGo通过穷举时间数字页面捕获130万搜索量月入3万美元', report: '知识流程/文章分析/大型网站SEO引爆点DateTimeGo案例.md' },
  { id: '[2023-08-04-0800]ChinaTravelDepotcom2008年通过生成大量页面三个月时间网站流量增长20倍', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'E', summary: '中青旅入境游50万长尾组合页面3个月暴涨20倍：多维需求矩阵模板化', report: '知识流程/文章分析/中青旅50万页面增长20倍案例.md' },
  { id: '[2023-08-05-0800]金山词霸icibacom2008年通过生成页面半年时间日IP从50万增长到100万', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 8, pacer: 'E', summary: '金山词霸将搜索框后隐藏内容静态化做爬虫入口：半年日IP翻倍到百万', report: '知识流程/文章分析/金山词霸搜索框内容静态化案例.md' },
  { id: '[2023-08-11-0800]5000字调查分析建站20天拿下480万访问量俄罗斯版的妙鸭相机是怎么做到的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 15, pacer: 'E', summary: '详尽溯源BaiRBIE.me 20天480万流量：热点结合、媒体软文矩阵与社媒裂变', report: '知识流程/文章分析/BaiRBIE建站20天480万流量调查.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第29批（2023-03-24 ~ 2023-08-11，6 篇）

85. **"纯PHP原生SSE实现"补齐 S2 极简开发方案**：证明独立开发轻量小工具无需复杂框架，极低门槛即可实现流式 AI 工具。
86. **"用户归因"是 S6 商业化与 ROI 核算的底层支撑**：Web 三表模型与 App 激活匹配体系，充实 S6 投放变现板块。
87. **"生成几十万页面三大案例（DateTimeGo/中青旅/金山词霸）"是 S3/S5 的程序化 SEO 核心经典**：数字穷举、多维矩阵组合与数据库内容静态化构成了完整的长尾 SEO 爆发范式。
88. **"BaiRBIE.me 20天480万流量逆向"是 S5 的标志性流量探案实战**：展示了 Google 高级语法 + 地域本土引擎（Yandex）的完整溯源链路。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第29批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
