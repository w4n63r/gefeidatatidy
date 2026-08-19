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
  { id: '[2025-01-09-2310]2024年12月新词新站比赛结果出来了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '2024年12月新词新站比赛发奖与多样化站点概况', report: '' },
  { id: '[2025-01-11-2312]做站终于赚到第1美元新站上线24小时3600点击被遗忘的网站赚了400多美元', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'E', summary: '3大出海做站实证：第1美元破冰/新站24小时3600点击/0外链先发红利与防守', report: '知识流程/文章分析/出海第1美元破冰与0外链先发优势衰减实证.md' },
  { id: '[2025-01-13-2236]SaaS网站变现新模式广告订阅', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'C', summary: 'SaaS变现新模式：免登录广告托底覆盖API成本+增值订阅纯赚模型与财务实证', report: '知识流程/文章分析/SaaS免登录广告托底覆盖成本与增值订阅纯赚模型.md' },
  { id: '[2025-01-14-2307]曾经月收入135万元的出海网站如今只剩25万元', stage: 'S0_认知与心态', difficulty: 2, minutes: 8, pacer: 'C', summary: '曾经月入13.5万出海站跌至2.5万：短期热点全生命周期ROI与做站肌肉记忆', report: '知识流程/文章分析/短期热点全生命周期ROI与做站肌肉记忆实证.md' },
  { id: '[2025-01-15-2213]一年366天都打开了公众号平台全勤了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '2024年公众号366天全勤发文与关注增长总结', report: '' },
  { id: '[2025-01-17-1728]见多才能识广多看多挖才能发现赚钱的机会才有可能赚到美元', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '见多识广挖利基：Quickposes速写工具14年长青与月入$5000利基矩阵模型', report: '知识流程/文章分析/Quickposes速写工具14年长青与5000刀利基矩阵模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第68批（2025-01-09 ~ 2025-01-17，6 篇）

247. **"第 1 美元破冰与 0 外链先发优势衰减"确立了 S0/S3 二段式规律**：16 条外链赚到第 1 美元破冰；新词早期先发优势抢跑（0 外链日点击 4K），后期必须补足 20~30 条外链做防守。
248. **"SaaS 免登录广告托底覆盖成本与增值订阅纯赚"颠覆了 S6 商业模式**：免登录零摩擦拉满用户停留信号驱动 SEO 爆发，广告费直接覆盖 87%~200% 的 API 算力成本，订阅全额转化为纯利润。
249. **"短期热点全生命周期 ROI 与肌肉记忆"深化了 S0 认知**：爆发期 200 万 PV 单月赚 13.5 万，衰退期跌至 2.5 万，但 3 个月累计入账 16 万+ 现金流，极限打磨 24 小时交付肌肉记忆。
250. **"Quickposes 14 年长青与 $5K 利基矩阵"丰富了 S1/S6 利基舰队模型**：极简定时换图工具 14 年稳定月访 54 万，打造 10 个月入 $5K 垂直利基站舰队（月入 36 万 RMB）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第68批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
