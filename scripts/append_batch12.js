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
  { id: '[2023-09-01-0800]AI+强需求=新工具', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'C', summary: 'AI+强需求=新工具公式：细分组合+新意+可收费', report: '知识流程/文章分析/AI加强需求等于新工具.md' },
  { id: '[2023-09-02-0800]如何给一个已经上线的网站出SEO改造建议', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'P', summary: '老站SEO改造：URL不改+加新页+TDK/内链/sitemap/canonical/H标签', report: '知识流程/文章分析/给上线网站出SEO改造建议.md' },
  { id: '[2023-09-03-0800]从秀才被封说起', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '平台说封就封，网站（海外站）几乎不被封，资产放自己域名', report: '知识流程/文章分析/从秀才被封说起平台风险.md' },
  { id: '[2023-09-04-0800]新网站上线最快多久能从谷歌获取搜索流量答案是48小时内', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 8, pacer: 'P', summary: '新站48小时拿流量：新词+关键词域名+按意图一页解决+从小词做起', report: '知识流程/文章分析/新站48小时拿到搜索流量.md' },
  { id: '[2023-09-05-0800]请优先关注需求关注产品关注流量其它的如变现收费先放后面', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '新手顺序：需求→产品→流量，收款/公司问题后置，推广最难', report: '知识流程/文章分析/新手先关注需求产品流量.md' },
  { id: '[2023-09-07-0833]需求有了网站也做好了流量从哪来', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 10, pacer: 'C', summary: '流量五源：搜索/免费推广/付费推广/自发传播/推荐系统', report: '知识流程/文章分析/流量从哪来五大来源.md' }
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
## 第12批（2023-09-01 ~ 09-07，6 篇）

34. **"AI+强需求"是 S1 的选品核心公式**：与《AI工具出海》互补，S1 应含"AI改造选品法"。
35. **"SEO改造清单/48小时拿流量"归 S3**：S3 已形成完整子主题：收录→GSC→站内优化清单→快速拿流量。
36. **新手顺序/平台风险归 S0**：《新手先关注需求产品流量》《从秀才被封说起》归 S0，S0 增加"新手路径与资产观"。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第12批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
