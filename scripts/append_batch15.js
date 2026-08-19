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
  { id: '[2023-09-19-0845]从一个月访问量78亿的网站告诉你子域名和子目录该如何选择', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'C', summary: '子域名=新站（无关词）；子目录=延伸（层级词）；fandom每词一子站案例', report: '知识流程/文章分析/子域名还是子目录.md' },
  { id: '[2023-09-20-0800]不会部署AI模型不买GPU服务器就不能做AI产品了吗哥飞告诉你能', stage: 'S2_建站与开发', difficulty: 1, minutes: 6, pacer: 'P', summary: 'Huggingface/Replicate调API做AI产品，无需GPU/部署', report: '知识流程/文章分析/不部署模型做AI产品.md' },
  { id: '[2023-09-22-0800]从一本书名到发现一批大流量工具站和内容站全流程揭秘', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'P', summary: '小词沿兄弟词→父词挖大需求（书名词→printables→home made 440万）', report: '知识流程/文章分析/从书名挖到440万搜索词.md' },
  { id: '[2023-09-23-0800]Semrush和Similarweb是如何知道每个网站的流量数据的', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'C', summary: '流量数据=模型估算：搜索量×排名位置占比，第一名通常吃80%', report: '知识流程/文章分析/流量数据工具原理.md' },
  { id: '[2023-09-24-0800]ChatPDFcom小调查帮你梳理这个月访问量540万的AI产品是如何爆火的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 14, pacer: 'E', summary: 'ChatPDF爆火：卡API窗口+传播链+订阅变现+开放API', report: '知识流程/文章分析/ChatPDF爆火路径调查.md' }
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
## 第15批（2023-09-19 ~ 09-24，5 篇）

43. **"子域名vs子目录"归 S3（URL架构）**：S3 增加"URL 架构决策"子主题。
44. **"用API做AI产品"归 S2**：S2（建站与开发）增加"AI 能力接入（Huggingface/Replicate/第三方API）"子主题。
45. **"挖词族（兄弟词→父词）"是 S1 核心方法**：与 KD/陷阱/低难度词共同构成 S1 找词方法集。
46. **"流量数据工具原理"归 S7**：理解工具估算逻辑（80%规则），S7 增加"工具原理"。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第15批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
