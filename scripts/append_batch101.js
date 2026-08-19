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
  { id: '[2025-12-25-1007]2026年的目标是月营收达到1M', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '哥飞公司2025财务盘账与2026月入100万美金目标：成本覆盖与高目标牵引心法', report: '知识流程/文章分析/哥飞公司2025财务盘账与2026月入百万刀高目标模型.md' },
  { id: '[2025-12-26-2337]优秀群友怎么说第一期', stage: 'S0_认知与心态', difficulty: 3, minutes: 20, pacer: 'E', summary: '优秀出海者深度访谈：咔叽哇红海选品/唐亦安模板化做站与Ben产品经理出海六律实证', report: '知识流程/文章分析/优秀出海者访谈与Ben产品经理出海六律实证.md' },
  { id: '[2025-12-29-0018]独立开发者艾逗笔是谁他做了什么', stage: 'S0_认知与心态', difficulty: 3, minutes: 25, pacer: 'E', summary: '艾逗笔一人公司操盘实录：从GPTs导航/ThinkAny到MCP.so月访150万被a16z收录与ShipAny实证', report: '知识流程/文章分析/艾逗笔一人公司操盘实录与MCP及ShipAny实证.md' },
  { id: '[2025-12-30-0800]哥飞SEO教程内页要不要加外链记住四句话学会五步检查', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '内页加外链诊断指南：四句话底层原理与五步页面竞争力排查SOP', report: '知识流程/文章分析/内页加外链诊断指南与四句话五步排查SOP.md' },
  { id: '[2025-12-31-2342]一边上班一边上站还能月入万刀哥飞朋友们的2025年终总结大全', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '一边上班一边上站月入万刀：2025年终总结大全导读', report: '' },
  { id: '[2026-01-02-0823]新词新站快就是优势快人一步那就步步都快', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '新词新站以快打慢SOP：2026首日PV破万实录/意图深挖与先发优势4步冲榜指南', report: '知识流程/文章分析/新词新站以快打慢与先发优势4步冲榜SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第101批（2025-12-25 ~ 2026-01-02，6 篇）

411. **"2026 年的目标是月营收达到 $1M"沉淀了 S0 组织与目标牵引心法**：16 人团队 300 万成本自负盈亏，两年半摸索沉淀成熟能力资产，取其上得其中设立月入百万美金北极星。
412. **"优秀群友怎么说第一期"贡献了 S0/S2 多元操盘实战与 Ben 出海六律**：咔叽哇选品红线、唐亦安模板化做站、冉云 Google Ads 投放，Ben 提炼产品经理出海六律（判断力胜过技术、代码够用就好、审美拉开差距、Vibe Coding 人人全栈、流量大于产品、动手实践）。
413. **"独立开发者艾逗笔是谁他做了什么"丰富了 S0 一人公司标杆实操**：GPTs 导航 $\rightarrow$ ThinkAny 对 VC 祛魅 $\rightarrow$ MCP.so 月访 150 万被 a16z 收录 $\rightarrow$ ShipAny 全栈框架，敏锐技术嗅觉 + 极速交付 + SEO 闭环。
414. **"内页要不要加外链：四句话五步检查"系统化了 S3 内页权重诊断 SOP**：链接传递权重、单页为排名单位，五步排查（On-Page $\rightarrow$ 自身竞争力 $\rightarrow$ SERP 对手 $\rightarrow$ 首页内链输血优先再打外链 $\rightarrow$ 3~4 个月沉淀）。
415. **"新词新站快就是优势"完善了 S1 以快打慢冲榜 SOP**：新词无巨头算法友好，2026 元旦新站首日 PV 破万实证，24 小时极速上线 + 词频排序 + 深度解构 1 小时意图（决胜点） + 首日快收录外链。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第101批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
