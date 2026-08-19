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
  { id: '[2024-04-07-2316]哥飞SEO教程如果不想要谷歌给的免费流量你就用前端渲染吧', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '别用前端渲染搞丢SEO：Googlebot抓取机制与SSR/CSR排查SOP', report: '知识流程/文章分析/别用前端渲染搞丢SEO与SSR排查SOP.md' },
  { id: '[2024-04-08-2200]从法学硕士到AI搜索LLM如何驱动更智能的搜索', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'C', summary: '秘塔AI搜索单月飙至669万拆解：LLM+实时检索RAG机制与免登录体验', report: '知识流程/文章分析/秘塔AI搜索流量暴涨与RAG机制拆解.md' },
  { id: '[2024-04-09-2314]哥飞的朋友网站接入支付三天用户付费2500美元', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'E', summary: '新站半月百万PV与3天充值2500刀复盘：新词突围与初学者照搬执行心法', report: '知识流程/文章分析/新站半月百万PV与初学者照搬执行心法.md' },
  { id: '[2024-04-10-2347]每天1000UV就可以有每月3000美元收入', stage: 'S6_变现与商业化', difficulty: 1, minutes: 6, pacer: 'C', summary: '1000UV四大商业模型收益阶梯：中文广告vs英文广告vs英文直接付费', report: '知识流程/文章分析/1000UV三大商业模型收益阶梯.md' },
  { id: '[2024-04-13-0910]人生无常世事难料活在当下不下牌桌努力上进', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '不下牌桌哲学与长期蓄力心法：人生无常/历史叠加/穿越周期', report: '知识流程/文章分析/不下牌桌哲学与长期蓄力心法.md' },
  { id: '[2024-04-18-2221]出海法财税星球起航路虽远行则将至', stage: 'S7_收款与合规', difficulty: 2, minutes: 14, pacer: 'R', summary: '出海法财税40问合规手册：怀俄明LLC/Stripe直连/年审报税/商标防御', report: '知识流程/文章分析/出海法财税40问合规手册.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第43批（2024-04-07 ~ 2024-04-18，6 篇）

133. **"别用前端渲染搞丢 SEO"树立了 S2 核心开发技术红线**：Googlebot 不运行 JS 渲染中小站，强制要求采用 SSR/SSG，并提供 view-source 排查 SOP。
134. **"秘塔 AI 搜索与 RAG 机制"拆解了 S1 新一代智能搜索架构**：大模型逻辑推理 + 实时全网检索提炼，免登录降维颠覆传统搜索。
135. **"1000 UV 收益阶梯对比"量化了 S6 商业变现杠杆**：中文广告（<$100）vs 英文广告（$300+）vs 英文直接付费（$1,000~$3,000），实证 30 倍收益杠杆。
136. **"初学者照搬执行手册与不下牌桌"夯实了 S0 核心心法**：破除胡思乱想自嗨，严格照搬 SOP，保持在场蓄力穿越周期。
137. **"出海法财税 40 问合规手册"完善了 S7 收款合规落地指南**：怀俄明州 LLC 设立、Stripe 直连、年审与 4.15 报税规范。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第43批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
