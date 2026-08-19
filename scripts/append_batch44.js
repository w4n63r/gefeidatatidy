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
  { id: '[2024-04-19-2206]哥飞SEO教程如何制作出SEO友好的网页先从学习谷歌是如何理解我们网页开始', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'C', summary: '谷歌如何理解网页全链路解析：10大底层环节与三大建站铁律', report: '知识流程/文章分析/谷歌理解网页全链路与SEO友好架构.md' },
  { id: '[2024-04-23-0753]硬地骇客EP57跟着哥飞学SEO和做网站养老对话哥飞', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'R', summary: '硬地骇客EP57播客专访大纲：养网站防老全景方法论与变现模型', report: '知识流程/文章分析/硬地骇客EP57播客专访大纲.md' },
  { id: '[2024-04-24-2242]5000字复盘新手第一次航海并拿到第一笔美金的详细过程', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'E', summary: '5000字零基础21天首获美金日记复盘：踩坑排障与免费漏斗改版破零', report: '知识流程/文章分析/零基础21天首获美金日记复盘.md' },
  { id: '[2024-04-25-2243]4500字复盘航海结束后的10天内如何做到天天进账', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'E', summary: '4500字航海后10天进阶复盘：涨价逆增订单/Vercel+Supabase混合架构/先卖后造', report: '知识流程/文章分析/航海后10天天天进账与混合架构复盘.md' },
  { id: '[2024-04-27-1349]5000字详解目前正在赚钱的AI产品观察', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'R', summary: '基于Toolify收入榜挖掘赚钱AI产品：Web与App排行榜工具清单', report: '知识流程/文章分析/基于Toolify收入榜挖掘赚钱AI产品.md' },
  { id: '[2024-04-29-2149]哥飞是谁哥飞在做什么事情在哥飞公众号大家可以看到什么内容', stage: 'S0_认知与心态', difficulty: 1, minutes: 12, pacer: 'C', summary: '哥飞自述与16年独立建站创业史：从百度SEO到出海AI工厂全景', report: '知识流程/文章分析/哥飞自述与16年独立开发出海全景.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第44批（2024-04-19 ~ 2024-04-29，6 篇）

138. **"谷歌理解网页 10 大全链路"完善了 S3 搜索引擎底层体系**：涵盖爬取、倒排索引、三层深度控制、Dofollow 权重与三大建站铁律。
139. **"零基础 21 天首获美金与 10 天天天进账"贡献了 S0/S6 极具说服力的成长实证**：展示了从 Reddit 获知真相反馈连夜改版免费漏斗破零、到 Vercel+Supabase 混合云解耦与先卖后造。
140. **"基于 Toolify 收入榜逆向"规范了 S1 赚钱 AI 工具选品路径**：以收款平台真实流水为依据，聚焦月入 $5K~$50K 的腰部高胜率产品。
141. **"哥飞自述 16 年站长史"夯实了 S0 认知基石与 AI 工厂愿景**：从空页测词到千万级投放操盘，确立了以 Web 为核心的工业化出海模型。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第44批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
