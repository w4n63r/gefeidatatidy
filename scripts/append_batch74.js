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
  { id: '[2025-03-11-2119]找出单月新增590万的网页谷歌Site语法的五种用法最后一种你绝对想不到', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '谷歌site语法5种高阶用法：穿透590万暴涨子域与Toolify炒豆子百万收录SOP', report: '知识流程/文章分析/谷歌site语法5大用法与Toolify炒豆子百万收录SOP.md' },
  { id: '[2025-03-15-2223]如何低成本的养着一个网站为什么要继续养着网站', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '如何低成本养站：Vercel零固定成本架构/13年DR52老站资产与偶尔蹦出99刀', report: '知识流程/文章分析/低成本养站防老与Vercel零边际成本架构认知模型.md' },
  { id: '[2025-03-17-2254]SmartSEOFindingLowCompetitionKeywordsThatConvert', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'P', summary: '全英文SEO选词指南：低竞争突发新词识别/地域限定降维与GSC/Clarity监控SOP', report: '知识流程/文章分析/全英文SEO选词指南与低竞争突发新词识别SOP.md' },
  { id: '[2025-03-18-2308]新词来了时请抓住先发优势尽快发布', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'P', summary: '新手出海8大常识纠偏：单页HTML上线/AdSense跨引擎变现与新词极速发布SOP', report: '知识流程/文章分析/新手出海8大常识纠偏与新词极速发布SOP.md' },
  { id: '[2025-03-20-2347]哥飞SEO教程新站批量化上页面必死', stage: 'S8_避坑警示', difficulty: 2, minutes: 12, pacer: 'W', summary: '避坑警示：新站批量上页面必死！新站4维量化定义与10页梯次放量SOP', report: '知识流程/文章分析/新站批量上页面必死警示与10页梯次放量SOP.md' },
  { id: '[2025-03-21-2345]哥飞SEO教程新站不批量上页面那要怎么做页面呢从对SEO祛魅开始', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'C', summary: 'SEO彻底祛魅与排位真相：你只与SERP前几十个网页竞争及新站精品页破局SOP', report: '知识流程/文章分析/SEO局部竞争真相与新站精品页破局认知模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第74批（2025-03-11 ~ 2025-03-21，6 篇）

280. **"谷歌 site 语法 5 大用法与炒豆子收录"丰富了 S3 搜索指令与索引 SOP**：穿透 iseej 592 万子域；Toolify 首页未收录页面轮转曝光，驱动百万级收录。
281. **"低成本养站防老与 Vercel 零边际成本架构"构筑了 S0/S2 资产哲学**：Vercel Serverless 消除固定月租，低流量衰退站 3 个月被动入账 $1943，13 年老站沉淀 610 外链与 DR52。
282. **"全英文 SEO 选词指南与地域限定降维"沉淀了 S1 国际化选词 SOP**：突发新词趋势识别，地域词（Nigeria SEO）降维竞争，GSC+Clarity 双轨监控。
283. **"新手出海 8 大常识纠偏与新词极速发布"纠正了 S0/S2 完美主义误区**：单页 HTML 极速上线，Bing 流量合规挂 AdSense，先发速度压倒尽善尽美。
284. **"新站批量上页面必死警示与 10 页梯次放量"确立了 S8 避坑红线**：新站 4 维量化定义（外链<100/DR<40）；10 页小样测试收录与点击，未收录立即熔断。
285. **"SEO 局部竞争真相与新站精品页破局"深化了 S0/S3 排位第一性原理**：你仅与当前 SERP 前几十个网页竞争；5.5 小时上线狂揽 41 点击；手工打造 100 个 Top 20 锚点页。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第74批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
