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
  { id: '[2023-12-21-2330]分享一个在Instagram上有134K关注的心灵鸡汤账号顺便请大家喝一些鸡汤', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 8, pacer: 'C', summary: '炒冷饭（火过会再火）+社媒账号矩阵（信任+被K兜底）', report: '知识流程/文章分析/Instagram鸡汤账号启示.md' },
  { id: '[2023-12-22-2300]月访问量1221万的打字练习网站的开源模式值得我们学习', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 10, pacer: 'E', summary: 'MonkeyType开源+平台化（冲榜）：开源=宣传+自动外链', report: '知识流程/文章分析/MonkeyType开源平台化.md' },
  { id: '[2023-12-23-2323]分享一个月收入39万的在线数独游戏网站每月从搜索引擎获取1190万访问量', stage: 'S6_变现与商业化', difficulty: 1, minutes: 10, pacer: 'E', summary: 'sudoku.com：首屏游戏+底部SEO内容+引导下载App变现', report: '知识流程/文章分析/数独游戏站App变现.md' },
  { id: '[2023-12-25-1638]第二次作业练习做一个在线讲解数独题目的AI小工具', stage: 'S2_建站与开发', difficulty: 2, minutes: 14, pacer: 'P', summary: 'AI讲解数独9版本渐进：红海+AI差异化+需求拆解', report: '知识流程/文章分析/AI讲解数独练习项目.md' },
  { id: '[2023-12-26-2231]只要放眼全球就全是机会', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '全球=多隔离市场补缝隙；收入层级：1000$上站/1万$多渠道/10万$投广告', report: '知识流程/文章分析/放眼全球全是机会.md' },
  { id: '[2023-12-27-2207]分享两个SEO友好的开源网站一个内容站一个工具站', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'P', summary: 'MorseDecoder工具站布局+AstroPaper博客模板；工具站需内容支撑', report: '知识流程/文章分析/两个SEO友好开源站.md' }
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
## 第27批（2023-12-21 ~ 12-27，6 篇）

78. **"开源+平台化"是 S5 的增长打法**（MonkeyType 冲榜机制），与开源传播案例成体系。
79. **"网站→App 变现"归 S6**：sudoku.com 路径（搜索流量→App 留存）。
80. **"炒冷饭+社媒矩阵"归 S5**：内容重做+账号兜底。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第27批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
