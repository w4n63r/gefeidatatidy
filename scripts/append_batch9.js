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
  { id: '[2023-08-09-0800]出海不知道做什么网站来看看别人的成功案例', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'E', summary: '成功案例：工具站Ptable+内容站食谱，Similarweb拆流量找方向', report: '知识流程/文章分析/从成功案例找方向.md' },
  { id: '[2023-08-10-0800]分享10个基于第三方谷歌搜索API的可实操赚钱方法', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'P', summary: 'Serper.dev谷歌搜索API+10个产品机会（搜索站/SaaS/插件/监控工具）', report: '知识流程/文章分析/谷歌搜索API十个赚钱方法.md' },
  { id: '[2023-08-12-0800]人人都能学会的挖掘web产品需求之从出站域名发现新需求新产品', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: 'Semrush查大站出站域名=新品雷达，组合whois/流量/Archive筛选', report: '知识流程/文章分析/从出站域名发现新需求.md' },
  { id: '[2023-08-12-0800]微信商户该如何正确处理消费者投诉降低各项投诉指标呢一些简单实用的小技巧解除你的烦恼', stage: 'S9_非学习类', difficulty: 1, minutes: 8, pacer: '', summary: '国内微信商户投诉处理（出海参考低，仅标阶段）', report: '' },
  { id: '[2023-08-13-0800]从注册海外公司到Stripe收款回国', stage: 'S7_收款与合规', difficulty: 3, minutes: 16, pacer: 'P', summary: '收款链路实操：手机号→Wyoming LLC→EIN→Mercury→Stripe→Wise提现', report: '知识流程/文章分析/注册海外公司Stripe收款回国.md' },
  { id: '[2023-08-14-0800][收藏]如果你想做网站赚钱这里有张路线图通过36篇文章让你知道每一步该怎么做', stage: 'S0_认知与心态', difficulty: 1, minutes: 12, pacer: 'R', summary: '★作者钦定36篇路线图：赚钱/流量/需求/做网站/案例（学习总纲）', report: '知识流程/文章分析/36篇文章路线图.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const fb = fs.readFileSync(path.join('output','analysis','map_feedback.md'),'utf8');
const addFb = `
## 第9批（2023-08-09 ~ 08-14，6 篇）

24. **★《36篇文章路线图》= 学习总纲**：作者钦定顺序为"赚钱→流量→需求→做网站→案例"（倒叙讲）；学习正序为"需求→做网站→流量→赚钱"，与全局地图 S1-S6 吻合。阶段5 终稿必须把该文列为第一必读。
25. **收款链路归 S7**：《注册海外公司到Stripe收款》是 S7 的核心实操，S7 将包含"公司/银行/收款/提现"完整链路。
26. **国内平台操作类（微信商户）归 S9**：与出海主线无关。
27. **"API套壳产品机会"归 S6**：谷歌搜索API赚钱方法归 S6（产品机会/变现），提示 S6 有"API/数据套壳"类机会。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第9批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
