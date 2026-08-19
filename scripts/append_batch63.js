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
  { id: '[2024-11-29-0932]Woy流量下滑了原因是', stage: 'S8_避坑警示', difficulty: 2, minutes: 6, pacer: 'W', summary: 'Woy.ai流量下滑根因复盘：导航站免费滥收低质新站导致被Google降权避坑', report: '知识流程/文章分析/导航站滥收新站导致被Google降权避坑复盘.md' },
  { id: '[2024-11-30-0800]SEO是实践的艺术', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: 'SEO是实践的艺术：AI SEO工具真伪甄别三角与知识付费分摊试错成本逻辑', report: '知识流程/文章分析/SEO实践艺术与AI工具真伪甄别模型.md' },
  { id: '[2024-12-01-1919]哥飞2024年11月发文一览', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '2024年11月33篇出海文章汇总与月访3825万数据展示', report: '' },
  { id: '[2024-12-02-2333]放弃一站发思维先从练手站做起', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'P', summary: '放弃一站暴富思维：出海独立开发新手村“3级练手站进化模型”与通关指南', report: '知识流程/文章分析/出海新手村三级练手站进化模型与通关SOP.md' },
  { id: '[2024-12-04-1641]当你不懂时建议多看几遍尝试理解而不是来反驳或者来嘲笑', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '如何用AI辅助深度研读知识：破除断章取义与完整Context三步分析法', report: '知识流程/文章分析/AI辅助深度研读知识与完整Context三步法.md' },
  { id: '[2024-12-05-2332]去年今日回忆11月新词新站比赛结果', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '2023年11月新词新站比赛结果回顾与自由职业成果', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第63批（2024-11-29 ~ 2024-12-05，6 篇）

224. **"Woy.ai 导航站降权复盘"敲响了 S8 出站链接风控警钟**：免费滥收低质新站导致被 Google 判定为 Link Farm 连带降权，出站必须配置 Nofollow 与付费准入门槛。
225. **"SEO 实践艺术与 AI 工具真伪甄别"确立了 S0 工具怀疑论与试错经济学**：样板间/商业逻辑/提效定性三角模型，分摊集体试错成本换取无价时间。
226. **"放弃一站发思维与 3 级练手站进化"贡献了 S0 新手村通关 SOP**：Level 1 流程闭环 $\rightarrow$ Level 2 微长尾出词 $\rightarrow$ Level 3 中长尾矩阵破冰。
227. **"AI 辅助深度研读与完整 Context 三步法"完善了 S0 批判性研学方法**：输入完整推导上下文进行逻辑评估，求真务实吸收先进生产力。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第63批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
