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
  { id: '[2026-07-18-1850]一个在线白板工具还有428万访问真正厉害的是用户会主动回来', stage: 'S1_需求与关键词', difficulty: 2, minutes: 20, pacer: 'C', summary: 'Excalidraw在线白板428万月访复盘：65%直接访问强留存/开源生态与Excalidraw+团队变现模型', report: '知识流程/文章分析/Excalidraw白板428万月访与65%直接访问强留存模型.md' },
  { id: '[2026-07-20-1907]万字长文哥飞的朋友们2026年中分享会北京站惊现日营收6万刀神秘嘉宾', stage: 'S0_认知与心态', difficulty: 3, minutes: 35, pacer: 'C', summary: '2026北京年中大会万字长文：日入6万刀神秘嘉宾/Bing极速破冰/借权重发文与学聊泡试模型', report: '知识流程/文章分析/2026北京年中大会日入6万刀嘉宾与实操方法论.md' },
  { id: '[2026-07-21-2029]00后毕业生半年做到月入万刀Asnull在深圳讲的上站路径', stage: 'S0_认知与心态', difficulty: 2, minutes: 26, pacer: 'P', summary: '00后毕业生半年月入万刀路径：Asnull深圳分享/1小时极速上站/自建脚手架与行动密度模型', report: '知识流程/文章分析/00后毕业生半年月入万刀上站路径与脚手架SOP.md' },
  { id: '[2026-07-22-1949]反常识SEO经验一个站翻译成8种语言不如8个站各做一个语种', stage: 'S4_内容与多语言', difficulty: 2, minutes: 28, pacer: 'C', summary: '多语言反常识SEO：纯血小语种独立站架构/地道关键词调研与AI本地化推理模型', report: '知识流程/文章分析/多语言反常识SEO与纯血独立站全流程SOP.md' },
  { id: '[2026-07-24-1244]YouMind的Nicole辰不买广告也能让产品被反复刷到', stage: 'S0_认知与心态', difficulty: 2, minutes: 24, pacer: 'P', summary: 'YouMind零广告社媒增长SOP：全员员工代言矩阵/前1000粉现金激励与前3秒价值爆款模型', report: '知识流程/文章分析/YouMind全员社媒零广告矩阵与前3秒爆款SOP.md' },
  { id: '[2026-07-25-1431]月入N万刀从建筑行业转到AI出海井然在深圳讲普通人的职业转型', stage: 'S0_认知与心态', difficulty: 2, minutes: 24, pacer: 'P', summary: '建筑副总转AI出海月入数万刀：井然深圳分享/5步商业闭环/Day1-3-7-30上站SOP', report: '知识流程/文章分析/建筑副总转AI出海月入数万刀与5步商业闭环SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第115批（2026-07-18 ~ 2026-07-25，6 篇）

484. **"一个在线白板工具还有 428 万访问"沉淀了 S1/S6 高留存直接访问模型**：Excalidraw 手绘白板免登录降低阻力，开源组件嵌入自传播，65% 直接访问，Excalidraw+ 团队协作云端收费。
485. **"北京年中分享会惊现日营收 6 万刀神秘嘉宾"系统化了 S0 2026 北京大会方法论**：9,900 字全景，神秘嘉宾磊磊两人团队 ARR 300 万刀，蓝星空 Bing IndexNow 破冰 + 高权重平台发文 3%~6% 转化，Jasper 学聊泡试。
486. **"00 后毕业生半年做到月入万刀"建构了 S0/S2 递进上站与脚手架 SOP**：Asnull 第 1 站跑通流程，第 2 站 1 小时上新词首周数千用户，沉淀通用模板脚手架，拒绝 Vibe Coding Demo，5 维外链筛选与三档定价。
487. **"一个站翻译成 8 种语言不如 8 个站各做一个语种"沉淀了 S4 纯血独立站 SOP**：单站机翻子目录三大死穴，8 个纯血独立站 (.jp/.de)，深挖本地地道词 (手机壳 30 万搜)，AI 深度市场推理 + 中文指令本地词原生写作。
488. **"YouMind 的 Nicole 辰不买广告也能反复刷到"系统化了 S0 员工代言增长 SOP**：全员矩阵 13.5 万粉，第一视角讲真实产品，前 1000 粉 1 刀现金激励 + 请喝奶茶轻约束，前 3 秒价值前置 + 团队加热 + 先发 100 条。
489. **"从建筑行业转到 AI 出海井然讲职业转型"沉淀了 S0 5 步商业闭环 SOP**：需求 ➔ 产品 ➔ 流量 ➔ 支付 ➔ 交付，Day 1 选品 Day 3 上站 Day 7 引流 Day 30 看付费，数据看发生邮件看原因，从做产品跃迁为做生意。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第115批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
