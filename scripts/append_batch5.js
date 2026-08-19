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
  { id: '[2023-07-13-2301]10种谷歌结构化搜索结果样式介绍及实现方法最骚的是第9种', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '10种谷歌搜索样式：想要哪种样式就在页面提供对应数据，评分用ld+json', report: '知识流程/文章分析/10种谷歌搜索样式.md' },
  { id: '[2023-07-15-2138]群友新站上线9天拿到11030个独立访客他是怎么做到的', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'P', summary: '新词新站完整案例：9天11030访客，先发+快速收录+自然外链', report: '知识流程/文章分析/群友新站9天11030访客.md' },
  { id: '[2023-07-17-0800]独立开发者用得上的30个免费产品推广渠道', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 14, pacer: 'P', summary: '30个免费推广渠道清单：一篇文章发全渠道获取种子用户', report: '知识流程/文章分析/30个免费推广渠道.md' },
  { id: '[2023-07-18-0800]GPT创业四个月投入五六千用户五六千收益几十块', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '复盘讨论：赚钱不在功能强而在多少人知道，为愿意付费的用户做产品', report: '知识流程/文章分析/GPT创业四个月复盘.md' },
  { id: '[2023-07-18-0800]独家深度分析哥飞三个月的分享大揭秘商业智慧SEO技巧AI赚钱一网打尽', stage: 'S9_非学习类', difficulty: 1, minutes: 10, pacer: 'R', summary: '内容导览/合集：哥飞3个月分享的21条实践清单（指向其它文章）', report: '' },
  { id: '[2023-07-19-0800]做产品立项之初就想好赚钱模式', stage: 'S6_变现与商业化', difficulty: 2, minutes: 8, pacer: 'P', summary: '立项就定赚钱模式（收费>广告），数据指标与投放赛马方法', report: '知识流程/文章分析/立项就想好赚钱模式.md' },
  { id: '[2023-07-19-0800]如何做到通过小产品日入100美元', stage: 'S6_变现与商业化', difficulty: 2, minutes: 6, pacer: 'P', summary: '日入100美元目标倒推：ECPM→曝光→PV→UV→关键词/注册数', report: '知识流程/文章分析/小产品日入100美元拆解.md' },
  { id: '[2023-07-19-0800]给独立开发者的20条建议', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'R', summary: '20条独立开发建议：多语言/VIP/多产品试错/先上线/学会推广/现在就动手', report: '知识流程/文章分析/给独立开发者的20条建议.md' }
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
## 第5批（2023-07-10 ~ 07-19，8 篇）

11. **新词新站完整案例跨 S1/S2/S3，主归 S1**：《群友新站9天11030访客》覆盖机会识别→建站→收录→外链全流程，主归 S1（新词找机会），报告内含全流程五步法。
12. **内容导览/合集类（如"独家深度分析21条清单"）归 S9**：这类文章是"指向其它文章"的索引，无独立学习内容；但可留作阶段学习的"索引参考"。
13. **投放/推广类归 S5（SEO进阶与增长）或 S6（变现）**：《30个免费推广渠道》归 S5；《立项赚钱模式》《日入100美元拆解》归 S6；建议 S5/S6 边界写清：S5=获客与增长手段，S6=收费与商业模式。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });

// 更新进度
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第5批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
