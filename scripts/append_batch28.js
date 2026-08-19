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
  { id: '[2023-12-29-1732]介绍一个月访问量4700万的时间日期工具网站再分享一批含年份数字的关键词年年都有新词新机会', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'E', summary: '年份词=每年新机会（calendar 2024搜索量巨大）；时间工具站养老', report: '知识流程/文章分析/时间日期站与年份词机会.md' },
  { id: '[2023-12-31-0800]分享个搜索量跟Midjourney和StableDiffusion差不多的关键词有个单页网站用这个关键词赚了100万', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'E', summary: 'inches to cm单页站10年赚100万：转换刚需词+广告位+高单价国家', report: '知识流程/文章分析/inchesToCm单页站赚100万.md' },
  { id: '[2024-01-01-0010]哥飞的2023总结暨送你43篇热门文章', stage: 'S9_非学习类', difficulty: 1, minutes: 8, pacer: '', summary: '2023年度总结+43篇热门文章索引（S9）', report: '' },
  { id: '[2024-01-03-1937][哥飞观察]分享一个月收入240万美元且最近流量暴涨的产品', stage: 'S6_变现与商业化', difficulty: 1, minutes: 10, pacer: 'E', summary: 'Blinkist订阅App月入240万$：品牌直接+长尾搜索+红人营销', report: '知识流程/文章分析/Blinkist月入240万美元.md' },
  { id: '[2024-01-04-1119]哥飞带你入门AI工具站赚钱之旅AI工具站到底是什么有什么特点要怎么做有哪些成功案例', stage: 'S6_变现与商业化', difficulty: 1, minutes: 10, pacer: 'C', summary: 'AI工具站=套壳调API：易开发/传播/爆发/变现；英语+前端+API门槛', report: '知识流程/文章分析/AI工具站赚钱入门.md' },
  { id: '[2024-01-06-0800][哥飞观察]单月新增1300万访问量的网站是怎么做到的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'P', summary: '流量探案法：搜索词时间线+趋势+域名验证（换域名承接流量）', report: '知识流程/文章分析/单月1300万流量探案.md' },
  { id: '[2024-01-09-0800]可以帮你赚钱的Nextjs教程和开源项目推荐', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: 'Next.js教程+拿来即用项目（登录+LemonSqueezy支付）', report: '知识流程/文章分析/Nextjs教程与开源项目.md' }
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
## 第28批（2023-12-29 ~ 2024-01-09，7 篇）

81. **"年份词"是 S1 的年度循环机会**：calendar 2024 等每年可做。
82. **"单页站广告收入"归 S6**：inches to cm 例（单页+转换词+高单价）。
83. **"流量探案法"归 S5**：搜索词时间线+域名验证=拆解暴涨流量。
84. **"AI工具站入门/Blinkist"归 S6**：S6 的 AI 变现体系成型（入门+案例+定价）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第28批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
