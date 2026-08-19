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
  { id: '[2026-02-09-0058]深夜胡思乱想', stage: 'S1_需求与关键词', difficulty: 2, minutes: 8, pacer: 'C', summary: '多模态AI竞争格局深度思考：视频平台数据飞轮与Seedance/Veo/Kling生态做站心法', report: '知识流程/文章分析/全球多模态AI竞争格局与原生视频数据飞轮认知模型.md' },
  { id: '[2026-02-11-0930]摩拜单车爱迪尔来源罗生门事件', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '商业灵感与执行本质辨析：摩拜单车叙事罗生门与点子/资金/落地执行力模型', report: '知识流程/文章分析/商业灵感与执行本质辨析及摩拜单车罗生门模型.md' },
  { id: '[2026-02-12-1101]运营转产品经理没问题的可以转', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'P', summary: '运营转型AI产品经理指南：3大天然优势与4步产品直觉建立及MVP上线SOP', report: '知识流程/文章分析/运营转型AI产品经理指南与4步MVP进阶SOP.md' },
  { id: '[2026-02-15-2229]全网最全的Seedance20实测案例库发布', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'R', summary: 'Seedance2.0实测案例库发布短讯', report: '' },
  { id: '[2026-03-05-2055]Fiona如何实现出海4个月月入万刀', stage: 'S0_认知与心态', difficulty: 3, minutes: 24, pacer: 'E', summary: '4个月月入万刀复盘：Fiona大数定律上站/买时间与攒时间统筹及冷冻层专注实证', report: '知识流程/文章分析/Fiona出海4个月月入万刀大数定律与时间统筹实证.md' },
  { id: '[2026-03-06-1220]OpenClaw虾友交流会等你来参加', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: 'OpenClaw线下虾友交流会活动通告', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第105批（2026-02-09 ~ 2026-03-06，6 篇）

432. **"深夜胡思乱想"贡献了 S1 多模态竞争格局模型**：字节 Seedance、快手 Kling 与 Google Veo 依托短视频平台原生数据飞轮碾压竞争对手，出海开发者做垂直工作流超级封装者。
433. **"摩拜单车爱迪尔来源罗生门事件"辨析了 S0 灵感与落地本质**：公关叙事包装 vs 顶层商业架构定义（李斌定义扫码GPS智能锁并提供资本），点子廉价执行值钱。
434. **"运营转产品经理没问题的可以转"沉淀了 S0 运营转型 AI PM SOP**：懂竞品、贴近用户、数据敏锐 3 大非对称优势，4 步 SOP（付费订阅体验主流 AI $\rightarrow$ 解构评测 $\rightarrow$ AI 编写单页 MVP $\rightarrow$ 社媒分发测试）。
435. **"Fiona 如何实现出海 4 个月月入万刀"构建了 S0 大数定律与时间管理模型**：新词自带外部传播势能，上站服从大数定律（单站独立随机，量大必然收敛），买时间（顶配 AI 与外包）与攒时间（华罗庚统筹法并行），冷藏 vs 冷冻层专注力比喻。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第105批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
