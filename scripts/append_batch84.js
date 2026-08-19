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
  { id: '[2025-06-10-1039]哥飞的朋友们深圳分享会amp上站Hackathon活动开始报名了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '深圳两周年活动海报（纯图片）', report: '' },
  { id: '[2025-06-12-1441]参加了Google大中华区Web商业合作伙伴峰会还去谷歌上海办公室参观了', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'E', summary: '谷歌官方Web峰会深度复盘：证实每天15%全新搜索词/AdSense限流机理与三好生态', report: '知识流程/文章分析/谷歌官方Web峰会复盘与每天15新词及三好生态.md' },
  { id: '[2025-06-14-0800]13天花了20多万广告费之后总结的广告投放精髓', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'C', summary: '13天消耗23万广告费实战：单UV变现效率决定投放放量天花板认知模型', report: '知识流程/文章分析/13天消耗23万广告费实战与单UV变现效率认知模型.md' },
  { id: '[2025-06-15-1546]5月全球AI排行榜AI视频全面加速智能体爆发进行时', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'R', summary: '2025年5月全球AI榜单：Gemini反超重回全球第二/AI视频与智能体Agent双爆发', report: '知识流程/文章分析/2025年5月全球AI排行榜与视频Agent双爆发解析.md' },
  { id: '[2025-06-16-2336]哥飞的朋友们6月28日29日两天活动议程出来了', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'R', summary: '深圳两周年大会议程：SagaSu月入2万刀/高中数学老师跨界与新手村打怪模型', report: '知识流程/文章分析/深圳两周年大会议程与SagaSu月入2万刀同侪画像.md' },
  { id: '[2025-06-17-2343]月访问量从0到10万花了10个月再涨到200万又花了11个月', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'E', summary: '200万月访Airbrush复盘：前10个月蓄力破10万与后11个月飙升200万复利模型', report: '知识流程/文章分析/200万月访Airbrush复盘与前10个月蓄力破茧模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第84批（2025-06-10 ~ 2025-06-17，6 篇）

331. **"Google 大中华区 Web 商业伙伴峰会复盘"奠定了 S0/S3 官方生态基石**：证实每天 15% 为全新搜索词（新词新站永远有效），解析 AdSense 宁可错杀买量假量的限流机理（SEO 自然流老号免死金牌），确立 Google 大产品经理与站长一线开发共赢模型。
332. **"13 天消耗 23 万广告费精髓"确立了 S6 付费投放第一性原理**：单 UV 变现效率（ARPU/LTV）决定买量放量天花板，变现强敢出最高价垄断曝光，坚决践行“先修好转化漏斗、再启动投放策略”铁律。
333. **"2025 年 5 月全球 AI 榜单"揭示了 S1 视频与智能体风口**：Gemini 反超 DeepSeek 夺回全球第二，通义突破 3900 万，Sora/Veo 领衔视频生成与 Lovart/Fellou 智能体 Agent 双赛道爆发。
334. **"深圳两周年大会议程与同侪画像"丰富了 S0 新手村进化范本**：SagaSu 极度克制做 4 款产品月入 2 万刀、高中数学老师跨界变现与打赢 Google 仲裁，确立每上一个站复盘一次的打怪升级模型。
335. **"Airbrush 从 0 到 10 万再到 200 万复盘"印证了 S0/S3 长期主义非线性复利**：前 10 个月蓄力打地基破 10 万 UV，跨越算法沙盒阈值后 11 个月内垂直飙升 20 倍达 200 万 UV。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第84批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
