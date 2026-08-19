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
  { id: '[2023-12-12-2319]上线一年歌词解释网站SongTellcom月访问量已达800万另一个巨头是月访问量1150万的Geniuscom', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'E', summary: 'SongTell AI重做歌词一年800万/月；Genius教训：别买外链/版权合规', report: '知识流程/文章分析/SongTellAI重做歌词站.md' },
  { id: '[2023-12-13-1104]哥飞关于订阅App的套餐定价的一点思考', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'P', summary: '年付定价提LTV：5个月费=12个月；用注册成本倒推回本线', report: '知识流程/文章分析/订阅年付定价提升LTV.md' },
  { id: '[2023-12-14-0800]哥飞的朋友们社群里每天到底在聊什么', stage: 'S9_非学习类', difficulty: 1, minutes: 6, pacer: '', summary: '社群日常介绍（S9）', report: '' },
  { id: '[2023-12-15-0832]独立开发之新增驱动开发', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: '新增驱动：收入=新增×常数；获客排序；LandingPage先验证', report: '知识流程/文章分析/新增驱动开发.md' },
  { id: '[2023-12-18-1210]与其国内卷不如出海浪', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'P', summary: '要想富看榜单：行业榜筛选自然搜索占比高→逐个拆解需求', report: '知识流程/文章分析/要想富看榜单.md' },
  { id: '[2023-12-19-0800]用一个真实例子教你如何判断一个关键词是否值得做网站', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '四步判断：收窄→KD→搜索量→前三流量→ROI换词（UUID例）', report: '知识流程/文章分析/判断关键词是否值得做.md' },
  { id: '[2023-12-20-2340]花半天开发的网站上线一周今日3000人访问他是怎么做到的', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'P', summary: 'MIT开源改接口半天上线；开源=宣传+自动外链', report: '知识流程/文章分析/半天上线一周3000人.md' }
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
## 第26批（2023-12-12 ~ 12-20，7 篇）

75. **"AI重做验证领域"是 S1 的选品主线**（SongTell 例）：AI+既有大需求（歌词/翻译）+多页面+多语言+合规。
76. **"看榜单/判断词是否值得"补全 S1**：榜单筛选法+四步ROI判断。
77. **"订阅年付定价"归 S6**：LTV 与注册成本模型。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第26批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
