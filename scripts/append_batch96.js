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
  { id: '[2025-10-14-2228]出海正当时如何用SEOAI带领4000人出海掘金', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '出海正当时直播分享预告短讯', report: '' },
  { id: '[2025-10-16-0810]广告投放197ROI其实是白高兴一场', stage: 'S6_变现与商业化', difficulty: 3, minutes: 18, pacer: 'W', summary: 'Google Ads虚假ROI归因复盘：3阶免费试用转化漏斗与品牌词防御广告避坑SOP', report: '知识流程/文章分析/GoogleAds虚假ROI归因与3阶体验转化漏斗SOP.md' },
  { id: '[2025-10-18-0735]两个站长看上同一个需求在2025年三四月份分别建站半年后访问量都一百多万了', stage: 'S1_需求与关键词', difficulty: 3, minutes: 25, pacer: 'E', summary: '棋局分析双雄月访超百万复盘：巨头受限功能截流/WASM客户端零成本运行与垂直KOL自发传播实证', report: '知识流程/文章分析/国际象棋分析双雄月访百万与WASM算力降维实证.md' },
  { id: '[2025-10-20-2345]订阅真是一个好生意', stage: 'S6_变现与商业化', difficulty: 1, minutes: 1, pacer: 'R', summary: '订阅商业模式高留存高复利感悟短讯', report: '' },
  { id: '[2025-10-22-1827]上月增长最快的100个AI网站四成来自中国丨9月全球AI增长榜', stage: 'S1_需求与关键词', difficulty: 3, minutes: 24, pacer: 'R', summary: '9月全球AI增长榜TOP100解析：教育/视频/编程三大品类爆发与独立开发者突围参考', report: '知识流程/文章分析/全球AI增长榜TOP100深度解析与赛道爆发参考.md' },
  { id: '[2025-10-27-2239]茴字的四种写法SEO工作里的共识', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'C', summary: 'SEO茴字四种写法模型：4大同义变体挖掘维度与避实就虚做词SOP', report: '知识流程/文章分析/SEO需求同义变体挖掘与避实就虚做词SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第96批（2025-10-14 ~ 2025-10-27，6 篇）

390. **"广告投放 197 ROI 白高兴一场"贡献了 S6/S8 归因与漏斗 SOP**：揭密跨天品牌词延迟转化，3 阶试用转化漏斗（免登录 1 次 $\rightarrow$ 注册送 2 次 $\rightarrow$ 顺畅付费），Google Ads 避坑 3 铁律（地域白名单、品牌防御词、动态出价）。
391. **"两个站长看上同一个需求半年月访都破百万"贡献了 S1/S2 巨头截流实证**：截流 Chess.com 每天限 1 次棋局分析，Stockfish 编译 WASM 在浏览器前端零算力成本运行，免登录无限次免费体验引爆 Reddit 与 YouTube KOL。
392. **"上月增长最快的 100 个 AI 网站"丰富了 S1 赛道增长情报**：中国团队占 38 席，教育（开学季）、AI 视频、Vibe Coding 领跑，逆向拆解 JoyCast 插件冷启动与 ContractCrab 55% 搜索自然流。
393. **"茴字的四种写法：SEO 工作里的共识"奠定了 S1/S3 做词核心模型**：同一个需求不同人群有 N 种搜索表达共识，4 大同义变体维度（意图表述/近义词/场景派生/术语 vs 大白话），避实就虚长尾变体破冰上位核心大词。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第96批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
