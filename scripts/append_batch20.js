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
  { id: '[2023-10-24-0800]养网站防老第8步添加统计代码提交到GoogleSearchConsole增加外链等待被收录', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 12, pacer: 'P', summary: '★第8步：GA统计+GSC/sitemap+高权重外链，GitHub中转自主可控', report: '知识流程/文章分析/第8步统计GSC外链.md' },
  { id: '[2023-10-25-0842]养网站防老第9步谷歌对于AI生成内容的态度及如何让AI生成高质量内容', stage: 'S4_内容与多语言', difficulty: 2, minutes: 14, pacer: 'P', summary: '★第9步：谷歌奖励高质量AI内容；参考+范文格式+半结构化生成法', report: '知识流程/文章分析/第9步AI内容质量方法论.md' },
  { id: '[2023-10-26-0919]什么是饱和式建站为什么要饱和式建站怎么实现饱和式建站', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 14, pacer: 'P', summary: '饱和式建站：多域名同关键词霸占前10，各站必须差异化防被K', report: '知识流程/文章分析/饱和式建站策略.md' },
  { id: '[2023-10-28-0800]养网站防老第0步如果你没有编程基础如果你不会前端开发那么推荐跟着这个免费视频教程学习', stage: 'S2_建站与开发', difficulty: 1, minutes: 10, pacer: 'P', summary: '★第0步：HTML+CSS视频入门+JS事件，做在线闹钟=入门，别学框架', report: '知识流程/文章分析/第0步零基础前端入门.md' }
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
## 第20批（2023-10-24 ~ 10-28，4 篇）

58. **"养网站防老第0/8/9步"归位 S2/S3/S4**：第0步（前端入门）→S2；第8步（统计/GSC/收录）→S3；第9步（AI内容质量）→S4。官方教程串已覆盖 S0-S5 全流程。
59. **"饱和式建站"归 S5**：多站霸屏策略，与"批量页面被罚"互为警示（差异化是红线）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第20批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
