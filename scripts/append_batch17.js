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
  { id: '[2023-10-01-0755]坚持写作三个月哥飞公众号涨了6000+关注社群朋友9月份新上的网站从谷歌获得了1万个点击', stage: 'S9_非学习类', difficulty: 1, minutes: 8, pacer: '', summary: '月总结+数据汇报：写作3个月+6000关注；阅读量取决于标题（S9）', report: '' },
  { id: '[2023-10-02-0755]哥飞解读一个数学在线教育网站如何做到一千万月访问量', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'P', summary: 'cuemath案例：乱点发现需求，注意文化差异，教育类需求稳定', report: '知识流程/文章分析/cuemath千万月访问案例.md' },
  { id: '[2023-10-03-0800]一篇让你搞懂向量Embeddings如何使用', stage: 'S2_建站与开发', difficulty: 3, minutes: 16, pacer: 'P', summary: 'Embeddings语义搜索：向量化+余弦相似度，新手先存文本再向量库', report: '知识流程/文章分析/Embeddings向量搜索指南.md' },
  { id: '[2023-10-04-0755]以月访问量1450万的网站为例教你如何找出网站靠哪些页面从搜索引擎获取流量', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: 'brainly QA页面矩阵：长句问题生成页面，排除品牌词看长尾', report: '知识流程/文章分析/找出网站靠哪些页面拿流量.md' },
  { id: '[2023-10-06-0755]再聊小词不妨看看CPC有价值的小词也是值得做的', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '选词看ROI=搜索量×CPC：高CPC低竞争词优先，搜索量≥600', report: '知识流程/文章分析/小词看CPC选词法.md' }
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
## 第17批（2023-10-01 ~ 10-06，5 篇）

50. **"选词=搜索量×CPC（ROI）"补全 S1**：CPC 选词法与 KD/陷阱/保小图大共同构成完整选词体系。
51. **"QA 页面矩阵"是 S3/S4 的内容策略**：长句问题生成页面，GPT 批量做（注意质量）。
52. **Embeddings/向量搜索归 S2（技术）**：S2 增加"语义搜索/向量技术"子主题。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第17批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
