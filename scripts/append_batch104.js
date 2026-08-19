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
  { id: '[2026-01-28-0905]AIGCRank2025年度AI网站总榜发布', stage: 'S1_需求与关键词', difficulty: 3, minutes: 22, pacer: 'R', summary: '2025年度全球AI网站总榜报告：三极竞争/DeepSeek暴增2688%/Agent与AI编程爆发参考', report: '知识流程/文章分析/2025年度全球AI网站总榜报告与三极竞争及垂直Agent赛道大盘参考.md' },
  { id: '[2026-01-29-2307]大白话讲清楚出海网站赚钱逻辑为什么能赚钱赚的谁的钱怎么赚到的需要做什么', stage: 'S0_认知与心态', difficulty: 3, minutes: 25, pacer: 'C', summary: '出海做站赚钱底层逻辑全景：赚欧美高购买力钱/SEO与SEM双轨飞轮及商业闭环第一性原理', report: '知识流程/文章分析/出海做站赚钱底层逻辑全景与SEO-SEM双轨商业闭环模型.md' },
  { id: '[2026-02-01-0800]Clawdbot教程01模型的配置和切换', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: 'Clawdbot/OpenClaw模型配置教程：国内外baseURL分流/openclaw.json修改与排障SOP', report: '知识流程/文章分析/Clawdbot与OpenClaw模型配置教程及国内外分流排障SOP.md' },
  { id: '[2026-02-03-1735]春节VibeCoding赢MacMiniVibeCodingforOpenClawVibeHacks03', stage: 'S1_需求与关键词', difficulty: 2, minutes: 15, pacer: 'P', summary: 'OpenClaw开源Agent生态爆发：6大高价值做站选题/Skill市场与VibeCoding开发指南', report: '知识流程/文章分析/OpenClaw开源Agent生态爆发与6大高价值做站选题指南.md' },
  { id: '[2026-02-07-2000]浅浅秀一个投放数据今日ROAS最高543', stage: 'S6_变现与商业化', difficulty: 1, minutes: 1, pacer: 'R', summary: '今日投放ROAS最高543%喜报短讯', report: '' },
  { id: '[2026-02-08-2154]出海人也还是要过年的不过好就好在人歇站不歇', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: '出海团队年终战略复盘：人歇站不歇被动收租/8万刀外链与40万刀Ads买量及增长三部曲模型', report: '知识流程/文章分析/出海团队年终战略复盘与新站增长三部曲模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第104批（2026-01-28 ~ 2026-02-08，6 篇）

427. **"2025 年度 AI 网站总榜发布"提供了 S1 全球流量宏观参考**：三极竞争格局（ChatGPT/Gemini/DeepSeek 暴增 2688%），Lovable/Cursor/Manus 等 Agent 与 AI 原生编程爆发，2026 专业工作流工具化演进。
428. **"大白话讲清楚出海网站赚钱逻辑"奠定了 S0 商业化闭环第一性原理**：欧美高购买力套利，SEO 种树（外链推荐信 + 停留数据）与 SEM 测品双轨协同，4 大闭环支撑体系。
429. **"Clawdbot 教程 01：模型的配置和切换"沉淀了 S2 本地 Agent 配置 SOP**：openclaw configure 流程，openclaw.json 国内外 baseURL 分流（Minimax/Kimi），/new 切换与 no output 排障。
430. **"春节 Vibe Coding 围绕 OpenClaw 做产品"丰富了 S1 Agent 二级生态选题**：11 万 Star 带来的 6 大高价值做站选题（Skill 市场/Dashboard/安全工具/一键部署），MAU 唯一真理赛制。
431. **"出海人也还是要过年的：人歇站不歇"构建了 S0 被动资产与增长三部曲模型**：数字化资产 24 小时全球收美金，8 万刀付费外链 + 40 万刀 Google Ads 补齐短板，【上内页 $\rightarrow$ 铺外链 $\rightarrow$ 投 Ads 广告】新站增长三部曲。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第104批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
