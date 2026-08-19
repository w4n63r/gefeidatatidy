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
  { id: '[2025-06-18-2251]Labubu哪有泡沫', stage: 'S0_认知与心态', difficulty: 3, minutes: 20, pacer: 'C', summary: 'Labubu爆火商业反思：符号溢价即实用价值/共识经济学与破除低价内卷模型', report: '知识流程/文章分析/Labubu爆火商业反思与符号溢价即实用价值模型.md' },
  { id: '[2025-06-19-1513]发布商新开帐号收益达10美金后需进行身份验证', stage: 'S7_收款与合规', difficulty: 1, minutes: 1, pacer: 'R', summary: 'AdSense发布商新号达10美元身份验证提示（图片）', report: '' },
  { id: '[2025-06-20-0000]月访问量178万的纯前端工具年收入67万只为了满足一个小需求', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'E', summary: '10年纯前端睡眠计算器年入67万拆解：单页178万月访/零后端与养网站防老实证', report: '知识流程/文章分析/10年纯前端睡眠计算器年入67万与养网站防老实证.md' },
  { id: '[2025-06-21-2217]再聊谷歌生态为什么2025年了还能靠网站赚钱', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: '2025做站第一性原理：谷歌生态飞轮/15%新词同跑线与单点突破打法模型', report: '知识流程/文章分析/2025做站第一性原理与15新词同跑线及单点突破模型.md' },
  { id: '[2025-06-22-2249]MidjourneyV1视频模型性价比超绝泛化性优秀', stage: 'S7_工具与资源', difficulty: 2, minutes: 18, pacer: 'R', summary: 'Midjourney V1视频模型评测：买生图送无限视频性价比/审美泛化登顶与分层创作SOP', report: '知识流程/文章分析/MidjourneyV1视频大模型深度测评与保底抽卡工作流.md' },
  { id: '[2025-06-24-0003]一个月1万美金的小游戏站到底怎么做跟着成功案例走就行跟着榜样赚美元', stage: 'S6_变现与商业化', difficulty: 2, minutes: 14, pacer: 'P', summary: '小游戏站月入1万刀数学推导：哥飞13站AdSense实证与Wordle2一词一页矩阵SOP', report: '知识流程/文章分析/小游戏站月入1万美金数学推导与Wordle2矩阵SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第85批（2025-06-18 ~ 2025-06-24，6 篇）

336. **"Labubu 哪有泡沫"建构了 S0 高维共识经济学**：符号溢价本身就是刚需实用价值（身份区隔与社交资本），破除 BOM 硬件成本极致内卷，走向审美与情绪溢价。
337. **"10 年纯前端睡眠计算器年入 67 万"深化了 S1/S6 养网站防老实证**：纯前端单页满足 90 分钟睡眠计算痛点，月访 178 万单广告位年赚 $9.3 万美元（67 万 RMB），外链逐年沉淀成长为参天果树。
338. **"再聊谷歌生态 2025 为什么还能靠网站赚钱"重构了 S0 核心逻辑**：Google 30 年生态飞轮坚如磐石，每天 15% 全新搜索词提供同一起跑线先发红利，单点突破打法以独立工具页狙击大站弱内页。
339. **"Midjourney V1 视频模型测评"提供了 S7/多模态创作前沿**：买生图送无限视频极致性价比，美学风格泛化性登顶，沉淀 MJ V1 保底抽卡 + Veo 3 复杂精修两阶 SOP。
340. **"小游戏站月入 1 万美金数学推导"确立了 S6 标准作业公式**：哥飞 13 站 AdSense 月入万刀实证（美区 RPM 达 $13.45），Wordle2 裂变 2790 页一词一页，推导出“日均 2.2 万 UV 达成月入万刀”极简目标。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第85批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
