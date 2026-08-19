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
  { id: '[2024-03-02-2359]推荐一款好用且免费的SEO插件哥飞天天都在用', stage: 'S7_工具与资源', difficulty: 1, minutes: 10, pacer: 'R', summary: 'AITDK SEO插件深度使用指南：集成TDK/流量/内外链/Schema一键体检', report: '知识流程/文章分析/AITDK插件深度使用指南.md' },
  { id: '[2024-03-03-2131]哥飞评站AI贴纸生成网站StickerBaker的SEO评测报告和改进建议4000字', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'P', summary: '4000字SEO评测与整改实战：StickerBaker首页/详情页/搜索页全诊断', report: '知识流程/文章分析/StickerBaker全站SEO评测与整改实战.md' },
  { id: '[2024-03-04-2357]哥飞看词帮社群里朋友看一个关键词是否能做', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '哥飞看词之pizza edition深度评测：高权内页霸屏与真实ROI评估', report: '知识流程/文章分析/哥飞看词之pizzaedition深度评测.md' },
  { id: '[2024-03-05-2345]分享一个开源CheatSheet程序让你可以快速做任何主题的CheatSheet网站', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'R', summary: '开源CheatSheet生成器quickref.me：垂直新兴技术速查表建站法', report: '知识流程/文章分析/开源CheatSheet生成器与技术速查表建站.md' },
  { id: '[2024-03-06-2347]上站上站朋友们请上站想要赚美元就多上站', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'E', summary: '上站是时间复利的前提：同日注册域名上线半年日出10单实证', report: '知识流程/文章分析/上站是时间复利的前提对比实证.md' },
  { id: '[2024-03-07-2353]哥飞推荐如果你做AI工具没灵感可以来这里一个让你可以找到真实AI需求的地方', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'R', summary: 'TAAFT用户许愿池Requests：380+条全球真实AI工具需求挖掘', report: '知识流程/文章分析/TAAFT用户需求许愿池挖掘法.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第38批（2024-03-02 ~ 2024-03-07，6 篇）

113. **"AITDK 插件 + StickerBaker 4000 字整改案"构建了 S3 站内 SEO 诊断与改造完整闭环**：涵盖 Slug 语义化、SSR 提升关键词密度与分页 Discover 抓取机制。
114. **"哥飞看词之 pizza edition"深化了 S1 选词可行性与真实 ROI 研判**：揭示了低 KD 但流量天花板受限的陷阱，以及利用 Google Sites 高权内页截流的黑客战术。
115. **"TAAFT Requests 真实需求池"丰富了 S1 的第一手选题来源**：380+ 全球用户未满足的痛点许愿池。
116. **"同日注册域名上线 vs 拖延对比"为 S0 认知提供了最鲜活的复利实证**：唯有上线运行才能享受时间复利。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第38批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
