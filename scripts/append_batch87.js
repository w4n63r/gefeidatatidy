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
  { id: '[2025-07-07-2315]两个你想不到的小需求这个站长做成了两个网站每年躺赚23万', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'E', summary: '2个微需求单页年入23万拆解：独立域名聚焦单点突破与周期性新词捕获模型', report: '知识流程/文章分析/2个微需求单页年入23万实证与独立域名单点突破模型.md' },
  { id: '[2025-07-08-2239]哥飞的社群怎么样', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '哥飞出海社群定位与交付口碑简要评价', report: '' },
  { id: '[2025-07-09-2358]社群配套网站功能上新新版群聊发布现在 chemicals可以看到完整历史聊天记录了'.replace(' chemicals',''), stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'R', summary: '社群配套知识库升级：2年全量聊天沉淀/时间穿梭机与“重走大佬来时路”学习参考', report: '知识流程/文章分析/社群知识库全量群聊沉淀与重走大佬来时路学习参考.md' },
  { id: '[2025-07-10-2324]为什么我们应该多做网站当然是为了多赚美元', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '出海做站进阶三大里程碑模型：新手村累计破千刀/毕业单站首月千刀与月入万刀', report: '知识流程/文章分析/出海做站进阶三大里程碑与多站练习评估模型.md' },
  { id: '[2025-07-11-2335]大部分低垂的果实已被采摘完了但依然还有果实值得去采摘', stage: 'S1_需求与关键词', difficulty: 2, minutes: 15, pacer: 'C', summary: '选品第一性原理：带着好奇心冲浪/月入6000刀小生意定位与核心方法论总览', report: '知识流程/文章分析/选品第一性原理带着好奇心冲浪与月入6000刀小生意模型.md' },
  { id: '[2025-07-13-0008]岳母的抱怨让他尝试为老游戏开发新版本而疫情让游戏彻底火了', stage: 'S3_SEO与流量入门', difficulty: 3, minutes: 20, pacer: 'E', summary: '2390万月访Solitaired拆解：顶级现代UI/系统外链溯源与红海大市场后来居上SOP', report: '知识流程/文章分析/2390万月访Solitaired拆解与红海大市场后来居上SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第87批（2025-07-07 ~ 2025-07-13，6 篇）

346. **"两个你想不到的小需求做成两个网站年入 23 万"强化了 S1/S6 独立域名单点突破**：两个小单页月访 46 万年入 $3.3 万美元（23 万 RMB），独立域名保持 100% 主题纯度，周期性新词捕获。
347. **"社群配套网站新版群聊发布"沉淀了 S0 观察式学习方法论**：人工整理追不上生产速度必瘫痪，自动化全量沉淀 51 万条记录，利用时间穿梭机“重走大佬来时路”消解新手迷茫。
348. **"为什么我们应该多做网站"确立了 S0 三大进阶里程碑**：新手期必须多做网站进行刻意练习，明确走出新手村（累计 $1000）、毕业达标（单站首月 $1000）与学有所成（稳定月入万刀）三大标准。
349. **"大部分低垂果实已被采摘但依然有果实"重构了 S1 选品心法**：带着好奇心在词与站中冲浪破除功利焦虑，锚定月入 $6000 美元自由小生意，全景索引哥飞出海方法论体系。
350. **"2390 万月访 Solitaired 拆解"贡献了 S3/S5 红海颠覆标杆**：2 年内从 0 冲到 2390 万月访超越 10 年老牌站，现代顶级 UI 降维打击 + 熟人/资产/Smashing 技术客座 520+ 外链系统化冷启动。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第87批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
