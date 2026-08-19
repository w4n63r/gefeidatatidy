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
  { id: '[2023-07-31-0800]不用开发如何10分钟上线一个AI产品', stage: 'S2_建站与开发', difficulty: 1, minutes: 10, pacer: 'P', summary: 'Vercel AI模板中心：不写代码选模板部署+API Key即上线', report: '知识流程/文章分析/不用开发10分钟上线AI产品.md' },
  { id: '[2023-08-01-0758]有了这几个关键字优化难度分析工具妈妈再也不怕我不会判断SEO难度了', stage: 'S1_需求与关键词', difficulty: 1, minutes: 12, pacer: 'P', summary: 'KD工具链：chinaz/Ahrefs(需N网站反链)/Semrush(分国家)，难度<60可做', report: '知识流程/文章分析/关键词优化难度分析工具.md' },
  { id: '[2023-08-02-0800]如何用AI做SEO之内容自动批量生成从搜索引擎获取免费流量', stage: 'S4_内容与多语言', difficulty: 2, minutes: 8, pacer: 'P', summary: 'AI内容SEO：当前可被收录，但要做精准流量解决客户痛点，别写垃圾', report: '知识流程/文章分析/AI批量生成内容做SEO.md' },
  { id: '[2023-08-06-0800]分享一个容易实操且快速见效的给自己网站增加几十个外链的小技巧', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 8, pacer: 'P', summary: '利用网站SEO小瑕疵白帽加几十个外链（细节不公开）+难度量化', report: '知识流程/文章分析/快速增加几十个外链的小技巧.md' },
  { id: '[2023-08-07-0800]如何清晰的知道我们网站在搜索引擎的表现GoogleSearchConsole使用入门讲解', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 14, pacer: 'P', summary: 'GSC入门：提交网站/sitemap/看效果数据/按词优化/处理通知', report: '知识流程/文章分析/GSC使用入门.md' },
  { id: '[2023-08-08-0800]2023年了为什么还要做网站为的是可控的流量可控的用户可控的收入', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '做网站=可控资产：有积累可躺平、平台有下架风险、网站几乎不受限', report: '知识流程/文章分析/为什么还要做网站.md' }
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
## 第8批（2023-07-31 ~ 08-08，6 篇）

19. **KD工具链归 S1**：《关键词难度工具》与《发掘Web需求》共同构成 S1 的"选词评估"闭环（需求→词→难度→多语言套利）。
20. **GSC 归 S3（SEO 基础）**：GSC 使用入门是 S3 阶段核心操作技能，与"快速收录"互为配套（提交+效果监控）。
21. **AI 内容生成归 S4**：《AI批量内容SEO》归 S4（内容），提醒 S4 需包含"AI 内容质量底线"与"算法惩罚风险"。
22. **外链建设归 S5**：《快速加外链小技巧》归 S5；S5 需包含"外链量化（需N网站反链）"概念。
23. **"为什么做网站"归 S0**：认知决策类归 S0，作为出海前的心态/选择依据。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第8批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
