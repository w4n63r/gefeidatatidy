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
  { id: '[2025-04-18-2142]提前半个月布局今天日访问量涨了十倍', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'E', summary: '提前半个月布局新词战报：热点爆发日UV暴涨10倍突破10K与耐心执行心法', report: '知识流程/文章分析/提前半月布局新词日访暴涨10倍实证与执行心法.md' },
  { id: '[2025-04-20-0014]哥飞实操教学如何用ChatGPTO3做出SEO友好的落地页', stage: 'S2_建站与开发', difficulty: 2, minutes: 14, pacer: 'P', summary: 'o3与Claude双AI协同开发SOP：o3深度调研文案+Claude审美精修SEO落地页', report: '知识流程/文章分析/o3与Claude双AI协同打造SEO落地页SOP.md' },
  { id: '[2025-04-21-0800]哥飞SEO理论搜索量来自于共识', stage: 'S0_认知与心态', difficulty: 3, minutes: 16, pacer: 'C', summary: '哥飞原创SEO理论：搜索量来自于共识(CDSD)及getimg暴涨1080万实证实操', report: '知识流程/文章分析/哥飞原创SEO理论搜索量来自于共识CDSD认知模型.md' },
  { id: '[2025-04-24-0800]一个有点奇葩的单页网站没有关键词密度也能拿到谷歌排名', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'E', summary: '奇葩单页月访12万拆解：无关键词密度凭“分门别类罗列”与EMD登顶谷歌Top1', report: '知识流程/文章分析/奇葩单页月访12万与分门别类罗列意图直答认知模型.md' },
  { id: '[2025-04-25-1219]哥飞SEO教程再聊Canonical标签用好有好处用错有坏处需要小心用', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 1, pacer: 'W', summary: 'Canonical标签使用规范警示短文', report: '' },
  { id: '[2025-04-26-1344]SEO经验经验分享两周内如何用AI友好度优化获得13K曝光量', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 1, pacer: 'E', summary: 'AI友好度优化获取13K曝光实测分享短文', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第79批（2025-04-18 ~ 2025-04-26，6 篇）

305. **"提前半个月布局新词战报"实证了 S1 趋势抢跑红利**：提前 15 天上线收录抹平爬虫时滞，共识爆发日访问量暴涨 10 倍达 10K UV，坚信+执行+跨越沙盒耐心。
306. **"o3 与 Claude 双 AI 协同打造 SEO 落地页"沉淀了 S2 工业化流水线**：o3 负责大脑（联网深度调研、供需痛点与 Schema 结构），Claude 负责颜值（Tailwind + Shadcn 高级暗黑 UI 精修）。
307. **"哥飞原创 SEO 理论：搜索量来自于共识 (CDSD)"确立了 S0/S1 顶层认知理论总纲**：自造词搜索量恒为 0；强共识带来大搜索；getimg.ai 极速上线 Ghibli AI 内页承接社媒爆发共识，单月暴涨 1080 万访问！
308. **"奇葩单页月访 12 万拆解"揭示了 S3 意图满足第一性原理**：全站仅 1 单页、7 外链起步、0 关键词密度，凭“分门别类罗列”1000 个英文名字真实交付与 EMD 域名加持，全面垄断 Google Top 1。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第79批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
