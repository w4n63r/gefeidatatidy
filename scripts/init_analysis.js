const fs = require('fs');
const path = require('path');
// 已完成的 5 篇样张 → 登记到 analysis jsonl + progress
const done = [
  { id: '[2020-04-14-0734]把工作当做自己的作品', stage: 'S0_认知与心态', difficulty: 1, pacer: 'C', minutes: 8, summary: '把工作当作品打磨，专注做透一件事', report: '知识流程/文章分析/把工作当做自己的作品.md' },
  { id: '[2026-07-23-1645]出海四个月月入万刀Fiona说新手先找鱼多人少的池子', stage: 'S1_需求与关键词', difficulty: 2, pacer: 'P', minutes: 15, summary: '新手先找鱼多人少的池子，用花钱证据验证需求', report: '知识流程/文章分析/Fiona新手先找鱼多人少的池子.md' },
  { id: '[2023-04-21-0700]如何10分钟上线一个AI导航网站', stage: 'S2_建站与开发', difficulty: 1, pacer: 'P', minutes: 8, summary: 'GitHub+Vercel+ChatGPT 10分钟上线网站', report: '知识流程/文章分析/10分钟上线AI导航网站.md' },
  { id: '[2023-07-02-0948]新上线的网站如何快速让谷歌收录做网站为什么要生成几十万个页面', stage: 'S3_SEO与流量入门', difficulty: 2, pacer: 'P', minutes: 10, summary: '新站快速收录：V2EX引荐+内链sitemap+海量关键词页思路', report: '知识流程/文章分析/新站快速谷歌收录与海量页面.md' },
  { id: '[2026-08-03-1307]从网站被罚到月入3万美金刘屹讲他交过的学费', stage: 'S8_避坑警示', difficulty: 3, pacer: 'E', minutes: 16, summary: '批量页面被罚/推广失焦等学费：阶段错了动作就变形', report: '知识流程/文章分析/刘屹从被罚到月入3万美金.md' }
];
const analysisFile = path.join('output','analysis','articles_analysis.jsonl');
fs.mkdirSync(path.dirname(analysisFile), { recursive: true });
let existing = new Set();
if (fs.existsSync(analysisFile)) {
  for (const l of fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean)) {
    try { existing.add(JSON.parse(l).id); } catch {}
  }
}
const add = [];
for (const d of done) {
  if (existing.has(d.id)) continue;
  add.push(JSON.stringify({ id: d.id, title: '', date: d.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: d.stage, teaches: [], prerequisites: [], difficulty: d.difficulty, minutes: d.minutes, pacer: d.pacer, summary: d.summary, pitfalls: [], keywords: [], report: d.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
console.log('已登记样张:', add.length, '| 现有分析条目:', existing.size + add.length);
