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
  { id: '[2024-01-27-2342]哥飞解读2024年谷歌算法排名因素变化', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'C', summary: '2024谷歌算法排名因素解读：持续发布/标题/外链/专长/移动优先', report: '知识流程/文章分析/2024谷歌算法排名因素深度解读.md' },
  { id: '[2024-01-28-2358]哥飞观察月访问量1138万的在线计算器网站流量几乎全是搜索引擎给的', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'E', summary: '14年计算器站月访问1138万复盘：单工具页80万UV与时间复利', report: '知识流程/文章分析/14年计算器站月访千万复盘.md' },
  { id: '[2024-01-29-0800]哥飞解读为什么要一个关键词一个域名', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'C', summary: '一词一域名策略与专长权重：细分专长占14%算法权重与以小博大', report: '知识流程/文章分析/一词一域名策略与专长权重.md' },
  { id: '[2024-01-30-0839]每天不到100UV的网站也有人付费11月初做的网站现在已经月收入3000美元了', stage: 'S6_变现与商业化', difficulty: 1, minutes: 8, pacer: 'E', summary: '100UV精准流量即产生$29.9付费与2天上站3个月月入3000刀', report: '知识流程/文章分析/低流量精准付费与双轮变现.md' },
  { id: '[2024-01-31-2214]哥飞观察单月新增850万访问量的网站是如何做到的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'E', summary: 'Everand单月新增850万流量拆解：Scribd母站导流与241万长尾页面', report: '知识流程/文章分析/Everand单月新增850万流量拆解.md' },
  { id: '[2024-02-01-0848]朋友们哥飞给大家过年发奖金了', stage: 'S9_非学习类', difficulty: 1, minutes: 3, pacer: '', summary: '社群新词新站比赛与年终奖活动通知（S9）', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第34批（2024-01-27 ~ 2024-02-01，6 篇）

100. **"2024 谷歌算法排名权重模型"为 S3 站内站外 SEO 提供了权威权重依据**：持续发布（21%）、Title（15%）、外链（14%）、专长（14%）及语义归一化。
101. **"一词一域名"获得算法底层理论支撑（细分专长 14%）**：确立了以独立垂直站击败综合巨头内页的博弈原则。
102. **"精准流量变现与双轮驱动模型"强化 S6 商业化实操**：证实日均 <100 UV 精准意图即可产生 $29.9 付费，且广告+付费双轮模型 3 个月可达 $3000 月入。
103. **"14 年计算器站与 Everand 规模化"互为印证**：展现了常青小单页与海量长尾矩阵（241万页）在不同体量下的增长复利。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第34批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
