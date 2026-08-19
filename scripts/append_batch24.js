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
  { id: '[2023-11-23-0829]会搞流量还是很赚钱的', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 8, pacer: 'E', summary: '2013站群回顾：流水线建站+婚纱高单价；2023网站仍可SEO获流量', report: '知识流程/文章分析/会搞流量很赚钱.md' },
  { id: '[2023-11-24-1044]哥飞开始招人了', stage: 'S9_非学习类', difficulty: 1, minutes: 3, pacer: '', summary: '招聘公告（S9）', report: '' },
  { id: '[2023-11-27-1647]出海4个月他靠网站月入3W美金', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 10, pacer: 'E', summary: '新手4个月月入3W+（多站组合）；蹭热点2小时上线', report: '知识流程/文章分析/新手4个月月入3W美金.md' },
  { id: '[2023-11-28-2359]周末快速开发的网站现在已经有2000人访问过了', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '先上线再完善：2小时静态页+收录三件套+PH时间坑+多平台宣传', report: '知识流程/文章分析/周末快速开发2000用户.md' },
  { id: '[2023-11-29-2334]如何让公众号文章获取更多搜索流量搜一搜优化教程01', stage: 'S9_非学习类', difficulty: 1, minutes: 6, pacer: '', summary: '国内公众号搜一搜优化（出海参考低，仅标阶段）', report: '' },
  { id: '[2023-11-30-2359]AI套壳产品不会改变世界但可以成为一个生意养活一个小团队', stage: 'S6_变现与商业化', difficulty: 1, minutes: 10, pacer: 'C', summary: 'AI套壳也是生意：FormulaBot/PhotoAI/PDF.ai案例；找场景架桥铺路', report: '知识流程/文章分析/AI套壳也是生意.md' },
  { id: '[2023-12-01-2227]2023年11月回顾有日入百刀的有月入万刀的也有日UV破万的还有才上第一个网站的大家都是好样的', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '11月月度回顾（S9）', report: '' },
  { id: '[2023-12-02-1855]哥飞免费提供API给新手一个练习在Vercel编写和部署项目的机会', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: 'whois查询练习项目：免费API+6版本渐进，完成第一个网站上线', report: '知识流程/文章分析/Whois练习项目.md' }
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
## 第24批（2023-11-23 ~ 12-02，8 篇）

69. **"会搞流量/月入3W/蹭热点"归 S5**：站群流水线+热点快上=增长打法。
70. **"先上线再完善/Whois练习"归 S2**：S2 的实操篇（2小时上线模板+渐进式练习项目）。
71. **"AI套壳也是生意"归 S6**：补充 S6 的 AI 变现认知（套壳+场景+运营）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第24批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
