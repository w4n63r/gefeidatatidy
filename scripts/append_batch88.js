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
  { id: '[2025-07-14-2336]主动离开大厂下海猛干一个月拿到正反馈了', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'E', summary: '大厂程序员Uni离职一个月出单41单复盘：424时间法则/大刀砍功能与反向找词实证', report: '知识流程/文章分析/大厂程序员Uni离职一个月出单41单复盘与424法则.md' },
  { id: '[2025-07-15-2325]6月全球AI排行榜国内AI网站出海AI网站最新流量排名', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'R', summary: '2025年6月全球AI榜单：TOP30门槛升至2382万/Vidu出海高增与设计Agent领跑', report: '知识流程/文章分析/2025年6月全球AI排行榜与出海高增长态势解析.md' },
  { id: '[2025-07-16-2306]哥飞的朋友给爆火游戏做了两个工具站上线第二个月访问量分别是260万和160万', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'E', summary: '爆火游戏配套工具站次月420万月访拆解：54%~72%纯自然搜索与订阅收租演进实证', report: '知识流程/文章分析/爆火游戏配套工具站次月420万月访拆解与收租演进实证.md' },
  { id: '[2025-07-17-2328]哥飞答疑为什么刘小排的Fast3Dio会选择用Fast3D这个搜索量这么小的关键词做域名', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'C', summary: '品牌词域名策略深度解析：Fast3D独占品牌防截流与免费免登录大词突围模型', report: '知识流程/文章分析/品牌词域名策略深度解析与免登录大词突围模型.md' },
  { id: '[2025-07-18-1139]数量胜于质量不要憋大招佛罗里达大学教授的试验结果与哥飞的实践经验不谋而合', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'C', summary: '数量胜于质量认知模型：佛罗里达摄影实验/卓越源于不完美与破除憋大招心法', report: '知识流程/文章分析/数量胜于质量认知模型与佛罗里达摄影实验启示.md' },
  { id: '[2025-07-20-1902]哥飞的朋友们年中分享会0719杭州场顺利举办', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'R', summary: '杭州年中交流会复盘：茄子亿级投放/金果大厂转型万刀与同侪能力画像参考', report: '知识流程/文章分析/杭州年中交流会复盘与茄子金果同侪能力画像参考.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第88批（2025-07-14 ~ 2025-07-20，6 篇）

351. **"主动离开大厂下海猛干一个月拿到正反馈"树立了 S0/S2 转型范本**：Uni 认识大厂平台溢价，离职首月出单 41 单，践行 424 时间法则（40% 需求 + 20% 开发 + 40% 推广）与大刀阔斧砍功能。
352. **"6 月全球 AI 排行榜"提供了 S1 赛道全景数据**：TOP 30 门槛增至 2382 万，Vidu 318 万跻身出海前列，设计 Agent（Lovart）与工作流翻译扩展领跑高增长。
353. **"爆火游戏配套工具站次月 420 万月访"印证了 S1/S6 衍生词红利**：两站次月分别获 260 万与 160 万访问（54%~72% 纯 SEO 免费流），跑通单页到订阅收租标准演进链。
354. **"Fast3D 域名选择答疑"建构了 S2 品牌词域名策略**：用独占品牌词做域名防截流（1 个月登顶 Google 前三），站内 TDK 覆盖大词，免登录纯免费体验引爆自发外链。
355. **"数量胜于质量不要憋大招"深化了 S0 第一性原理**：佛罗里达摄影实验印证数量组包揽全部顶级作品，卓越源于不完美，高频上站喂养 SEO 肌肉记忆。
356. **"杭州年中交流会顺利举办"丰富了 S0 同侪画像**：茄子老师（1 亿广告费投放）补齐买量体系，金果大厂转型 11 个月破万刀，三会场轮流讲两次展现极致交付。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第88批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
