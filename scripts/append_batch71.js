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
  { id: '[2025-02-12-0900]这是一篇关于人生的鸡汤哥飞请你喝', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '经历点线面串联哲学：2008年SEO技能在2023年AI爆发复利与长期心力模型', report: '知识流程/文章分析/经历点线面串联与技能长期复利认知模型.md' },
  { id: '[2025-02-13-0800]哥飞的朋友们小游戏站比赛结果今日出炉最高拿下165万UV却没奖金', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '专项小游戏比赛复盘：67站狂揽1619万PV与人均6PV展示广告变现实证', report: '知识流程/文章分析/专项小游戏比赛复盘与高PV展示广告变现实证.md' },
  { id: '[2025-02-14-1933]一年一千万访问量的网站只有40个单词', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'E', summary: '年访千万仅40个单词的黑屏工具站：极简纯色单页需求与0成本免费选词SOP', report: '知识流程/文章分析/年访千万仅40词黑屏工具站与0成本选词SOP.md' },
  { id: '[2025-02-17-2213]哥飞给朋友们发了2万元奖金又教你赚钱又办比赛让你练习哥飞就是对你这么好', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'E', summary: '2024年度社群战果复盘：38个变现站/92个流量站与以赛促练飞轮机制', report: '知识流程/文章分析/2024年度社群战果复盘与以赛促练飞轮机制.md' },
  { id: '[2025-02-18-0818]以DeepSeek为例哥飞跟你简单聊聊如何做AISEO', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'P', summary: '以DeepSeek为例做AI SEO：权威信源占领/播客与大站分发及纯文本URL引流SOP', report: '知识流程/文章分析/以DeepSeek为例做AISEO与外部权威信源占领SOP.md' },
  { id: '[2025-02-19-0825]为什么说哥飞的方法是可习得的', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '为什么出海做站是可习得的：SEO祛魅/巨头流量基石与AI新词极速超车机制', report: '知识流程/文章分析/SEO可习得性与AI新词极速超车认知模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第71批（2025-02-12 ~ 2025-02-19，6 篇）

263. **"经历点线面串联与技能长期复利"深化了 S0 心智心力**：2008 年自学 SEO 沉淀 16 年后在 AI 时代爆发复利，散落经历在新风口完成闭环。
264. **"小游戏比赛 67 站 1619 万 PV 复盘"沉淀了 S1/S6 赛道优势**：零 API 算力成本，人均 4.3~6.0 高 PV 深度成倍放大 AdSense 展示广告流水。
265. **"年访千万仅 40 词黑屏工具站与 0 成本选词"贡献了 S1 选词 SOP**：极简刚需单页抗脆弱模型，Google 下拉框 + Google Trends 零成本选词组合拳。
266. **"2024 年度社群战果复盘与以赛促练飞轮"丰富了 S0 生态模式**：38 个变现站与 92 个百万流量站，月度比赛倒逼新手打破拖延高频交付。
267. **"以 DeepSeek 为例做 AI SEO 权威信源占领"确立了 S5/GEO 前沿战术**：放弃自建新站给 AI 爬的内耗，转向播客文稿与外部大站寄生占领信源库，纯文本 URL 引导。
268. **"SEO 可习得性与 AI 新词极速超车机制"构筑了 S0 认知基石**：SEO 是确定性可复现工程，老需求+AI 创造大量真空新词，敏捷上站直接超越 99% 对手。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第71批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
