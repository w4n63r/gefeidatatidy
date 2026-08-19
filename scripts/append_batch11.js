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
  { id: '[2023-08-24-0800]Adsense如何收取Pin码如何上传文件进行实名实地认证', stage: 'S6_变现与商业化', difficulty: 1, minutes: 8, pacer: 'P', summary: 'Adsense满10美元寄Pin码平信，3次收不到→人工审核（身份证+地标合影）', report: '知识流程/文章分析/AdsensePin码实名认证.md' },
  { id: '[2023-08-25-0902]从一个AI工具站最近7天Adsense不同国家收入数据分析对比告诉你为什么要出海', stage: 'S6_变现与商业化', difficulty: 1, minutes: 5, pacer: 'E', summary: '国家ECPM对比：瑞士7.34/美国4.34/法加4+，出海的硬核证据', report: '知识流程/文章分析/不同国家ECPM对比出海理由.md' },
  { id: '[2023-08-26-0953]公众号推文开流量主赚广告费真的有那么好赚吗', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '国内公众号流量主广告费讨论（出海参考低，仅标阶段）', report: '' },
  { id: '[2023-08-27-0800]继续说公众号推文开流量主赚广告费真的有那么好赚吗', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '国内公众号流量主续篇（出海参考低，仅标阶段）', report: '' },
  { id: '[2023-08-28-0800]巧妙利用搜索引擎图片搜索流量结合AI生成图片卖图包赚钱', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'P', summary: '卖图包模式拆解：图片搜索流量+三档定价，可复制到谷歌+订阅制', report: '知识流程/文章分析/图片搜索AI卖图包模式.md' },
  { id: '[2023-08-29-0800]不用开发如何上线AI网站', stage: 'S2_建站与开发', difficulty: 1, minutes: 6, pacer: 'P', summary: 'CodeCanyon买AI源码：480个几十美元一套，买来部署上线', report: '知识流程/文章分析/买AI源码快速上线.md' },
  { id: '[2023-08-30-0800]利用Semrush找有一定搜索量且竞争小的关键词时容易遇到的一些陷阱', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '找词3陷阱：季节词/谷歌直达/金矿存疑；Trends全年量+看结果形态', report: '知识流程/文章分析/Semrush找词陷阱.md' },
  { id: '[2023-08-31-0800]放眼世界遍地是金矿此时不做AI更待何时', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: 'AI+工具+出海=财富密码：细分小工具+全球市场，快速行动', report: '知识流程/文章分析/AI工具出海财富密码.md' }
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
## 第11批（2023-08-24 ~ 08-31，8 篇）

31. **找词方法已成体系（S1）**：《Semrush找词陷阱》补全"选词 3 关"（全年趋势/结果形态/KD 21-49），与 KD工具、低难度词共同构成 S1 的找词方法集。
32. **"卖图包/买源码"等低成本启动模式归 S6/S2**：卖图包→S6（商业模式）；买源码上线→S2（低成本建站）。
33. **方向宣言类归 S0**：《AI+工具+出海》归 S0（认知/大方向），作为 S0 阶段收尾的"方向共识"文章。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第11批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
