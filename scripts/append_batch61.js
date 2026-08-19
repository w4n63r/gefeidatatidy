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
  { id: '[2024-11-17-2035]人无法想象自己没见过的东西', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '人无法想象没见过的东西：10万PV产出$681实证与出海高单价认知破局', report: '知识流程/文章分析/见识破局与出海广告高RPM认知模型.md' },
  { id: '[2024-11-18-0848]人人都会有SB时刻但能不能变NB就不知道了', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '哥飞自省从买量幻觉重回SEO资产复利：3个月打造日入$500 AI工具站实证', report: '知识流程/文章分析/哥飞自省重回SEO资产复利与AI工具站实证.md' },
  { id: '[2024-11-19-0916]种下一颗种子等待它萌芽从树苗长成大树', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '种下一颗种子从树苗到大树：雇佣劳动本质解构与数字果园资产复利哲学', report: '知识流程/文章分析/数字果园资产沉淀与打工本质认知模型.md' },
  { id: '[2024-11-20-1622]基于Similarweb流量数据快速估算任意网站收入方法分享', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '基于Similarweb流量估算竞品收入SOP：3大假设/广告价值反推与5%高精误差实证', report: '知识流程/文章分析/基于Similarweb流量估算竞品收入SOP.md' },
  { id: '[2024-11-21-1820]SEO是能够赚钱的本领但不是点金术', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: 'SEO是真本领但非点金术：Google生态共生机制/新站上位体验阶梯与屠龙少年循环', report: '知识流程/文章分析/Google生态共生机制与新站上位体验阶梯.md' },
  { id: '[2024-11-22-0800]靠游戏站赚钱不一定要会开发游戏', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: '零游戏开发建站变现SOP：海外HTML5发行分发生态/CodeCanyon模板与SEO二次改造', report: '知识流程/文章分析/零游戏开发建站变现SOP与HTML5发行生态.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第61批（2024-11-17 ~ 2024-11-22，6 篇）

215. **"人无法想象自己没见过的东西"确立了 S0 认知破局与高 RPM 模型**：10 万 PV 产出 $681 广告费（RPM $6.8 刀），强调看见真实数据是出海行动的第一动力。
216. **"哥飞自省从买量幻觉重回 SEO 资产复利"深化了 S0 长期主义认知**：剖析买量模式的脆弱性与 SEO 睡后复利，AI 工具站上线 3 个月日入 $492 美元实证。
217. **"数字果园资产沉淀与打工本质解构"奠定了 S0 核心出海哲学**：上班是在维护别人的果园拿辛苦费，业余持续播种多站矩阵构建四季不断档的个人被动资产。
218. **"基于 Similarweb 流量逆向估算竞品月营收"贡献了 S1 商业尽调 SOP**：3 大假设 + 广告价值系数折算，Jenni AI 验证误差仅 3.8%~5%。
219. **"Google 生态共生与新站上位体验阶梯"重构了 S0 竞争与产品认知**：Google 信息焦虑症与站长供给共生；免登录无广告极致体验上位与屠龙少年商业演进。
220. **"零游戏开发建站变现 SOP 与 HTML5 发行生态"丰富了 S2 建站路径**：解析开发者-发行平台-站长三方分润，CodeCanyon 源码采购与 On-Page SEO 二次重构。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第61批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
