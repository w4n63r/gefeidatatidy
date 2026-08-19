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
  { id: '[2026-03-21-2339]吃瓜500亿美元的Cursorquot自研模型quot竟然是中国开源模型套壳', stage: 'S7_工具与资源', difficulty: 3, minutes: 25, pacer: 'C', summary: 'Cursor套壳风波深度复盘：Composer2底层KimiK2.5/AI三层分工与开源商业化模型', report: '知识流程/文章分析/Cursor套壳风波深度复盘与AI产业链三层分工及开源商业化模型.md' },
  { id: '[2026-03-30-2225]前端已死重生之在YouMind做增长工程师', stage: 'S2_建站与开发', difficulty: 3, minutes: 30, pacer: 'P', summary: '前端转型增长工程师实录：集合站引爆50%流量/GitHub双向输血与Technical SEO实战SOP', report: '知识流程/文章分析/前端转型增长工程师实录与提示词集合站打造5大SOP.md' },
  { id: '[2026-03-31-0908]2026年了努力还有用吗', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '2026年努力意义探讨短讯', report: '' },
  { id: '[2026-04-07-1335]3月AI网站排行榜全球国内出海AI网站最新排名', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'R', summary: '2026年3月AI网站榜单：Claude暴涨111%进前三/豆包全球第9/Accio与SeaArt出海参考', report: '知识流程/文章分析/2026年3月全球AI网站榜单与Claude暴增111%大盘参考.md' },
  { id: '[2026-04-08-0826]阿彪说要做可以吹牛的创新业务', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '创新业务探讨短讯', report: '' },
  { id: '[2026-04-11-1957]收集整理公开的信息为结构化数据库是可以卖钱的月收入15万美金', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '结构化公开数据变现模式：PR数据聚合/SEO单品专题页与月入15万刀订阅制实证', report: '知识流程/文章分析/结构化公开数据变现模式与月入15万刀订阅制实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第107批（2026-03-21 ~ 2026-04-11，6 篇）

442. **"Cursor 自研模型套壳风波"贡献了 S7 AI 产业链三层分工模型**：底层基座（Kimi K2.5） $\rightarrow$ 领域强化（Composer 2 RL） $\rightarrow$ 应用工作流封装（Cursor IDE 20亿 ARR），开源技术平权与许可证合规。
443. **"前端已死？重生做增长工程师"系统化了 S2/S5 增长工程与集合站 SOP**：AARRR 全链路增长，提示词集合站 5 大要素（快/16 种多语言/持续自动化/特色 UI/GitHub 10K Stars 双向输血），Technical SEO 与动态转化插桩。
444. **"2026 年 3 月全球 AI 网站排行榜"提供了 S1 流量大盘参考**：Claude 高频迭代暴涨 111% 杀入全球前三，豆包跃居全球第 9，纯概念 Moltbook 暴跌 74%，阿里 Accio 跨境采购 Agent 出海。
445. **"收集整理公开信息为结构化数据库"验证了 S1/S6 数据聚合商业模式**：全网碎片 PR 营收数据结构化加工，单品页免费引流 + $99/月全库高级订阅，批量单品专题页 SEO 拦截长尾词，巅峰月入 15 万美金。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第107批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
