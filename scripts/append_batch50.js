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
  { id: '[2024-07-06-2015]哥飞的朋友们社群一周年感谢所有留言支持的朋友们', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '社群一周年感谢留言支持朋友们的简短动态', report: '' },
  { id: '[2024-07-07-2017]AIGCRank2024年6月AI排行榜AI出海榜首发', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'R', summary: 'AIGCRank6月AI出海榜首发：Luma爆发1800万/独立开发优势/Mapify品牌升级', report: '知识流程/文章分析/AIGCRank6月AI出海榜首发与赛道洞察.md' },
  { id: '[2024-07-10-2259]一不小心哥飞花了70天做了一个DR62的新网站', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'E', summary: 'Woy.ai 70天冲到DR62与日入1700刀实证：AI原生CMS与极速权威度积累', report: '知识流程/文章分析/Woy70天冲到DR62与日入1700刀实证.md' },
  { id: '[2024-07-11-1814]AI时代的聚合搜索长什么样子哥飞帮你做出来了', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: 'Chrome聚合搜索插件SeekAll.ai研发复盘：多窗口平铺架构与商店审核避坑', report: '知识流程/文章分析/Chrome聚合搜索插件SeekAll研发复盘.md' },
  { id: '[2024-07-12-1029]哥飞SEO友好的AI原生CMS思考和实践Part1', stage: 'S2_建站与开发', difficulty: 3, minutes: 18, pacer: 'C', summary: 'SEO友好的AI原生CMS设计Part1：架构哲学/Next.js技术栈/Prompt表解耦', report: '知识流程/文章分析/AI原生CMS架构设计与Nextjs技术栈Part1.md' },
  { id: '[2024-07-12-1029]哥飞SEO友好的AI原生CMS思考和实践Part2', stage: 'S2_建站与开发', difficulty: 3, minutes: 18, pacer: 'P', summary: 'SEO友好的AI原生CMS设计Part2：自动化采集/参考资料库/标签系统SOP', report: '知识流程/文章分析/AI原生CMS自动化工作流与标签系统Part2.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第50批（2024-07-06 ~ 2024-07-12，6 篇）

162. **"SEO友好的AI原生CMS思考与实践（Part1+Part2）"奠定了 S2 工业化做站顶级架构体系**：2.7 万字全面开源了 Next.js SSR 渲染、展示表与 Prompt 表物理解耦、真实参考资料库（消除幻觉+提权 E-E-A-T）、搜索量驱动的自动化 Tags 标签网络、以及广告+PR 收录费+广告位直租的商业闭环。
163. **"Woy.ai 70 天冲至 Ahrefs DR 62 与日入 $1700"验证了 S2/S6 工业化威力**：实证系统化 AI 原生 CMS 能在 2 个月内跨越传统老站数年的权重门槛并产生顶级现金流。
164. **"Chrome 聚合搜索插件 SeekAll 研发复盘"贡献了 S2 桌面客户端与插件商店避坑 SOP**：多窗口平铺（Window Tiling）架构保留原生状态与合规分流，最小权限原则顺利通过谷歌商店审核。
165. **"AIGCRank 6 月出海 AI 榜首发"印证了 S1 赛道新动向**：AI 视频爆发（Luma 1800万月访），国内小团队独立出海在海外具备极强竞争力。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第50批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
