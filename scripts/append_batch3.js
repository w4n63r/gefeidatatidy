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
  { id: '[2023-03-30-0930]如何在公众号内接入对话能力时异步回复给用户', stage: 'S2_建站与开发', difficulty: 2, minutes: 6, pacer: 'P', summary: '公众号异步回复：5秒应答+消息队列+客服消息（国内技术，出海参考低）', report: '知识流程/文章分析/公众号异步回复方案.md' },
  { id: '[2023-04-21-0700]如何让AI帮你自动赚钱', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'C', summary: 'AI自动化设想：浏览器插件自动执行出海建站11步（前瞻类）', report: '知识流程/文章分析/AI自动赚钱设想.md' },
  { id: '[2023-04-22-0700]一个国外独立开发者的五年独立开发之旅所得到的经验教训', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: '五年独立开发教训：激情双刃剑/关系无法摆脱/社区是学习资源', report: '知识流程/文章分析/五年独立开发之旅的教训.md' },
  { id: '[2023-06-29-1804]美团收购光年之外2065亿人民币的投资打造AI领域的新巨头', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '行业新闻：美团20.65亿收购光年之外（新闻，非学习内容）', report: '' },
  { id: '[2023-07-06-2315]Threads上线我火速做了个网站1小时就被谷歌收录了操作步骤全揭秘', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 8, pacer: 'P', summary: '新站1小时被谷歌收录复盘：V2EX发帖引荐是吸引爬虫关键动作', report: '知识流程/文章分析/Threads上线1小时被谷歌收录.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
console.log('第3批新增:', add.length, '| 累计:', existing.size + add.length, '/ 726');

const fb = fs.readFileSync(path.join('output','analysis','map_feedback.md'),'utf8');
const addFb = `
## 第2-3批（2022-12 ~ 2023-07，12 篇）

5. **早期 ChatGPT 文章多为"工具使用/认知"**：2022-12 的 ChatGPT 系列（写代码/长对话/隐藏能力/无中生有）多归 S7（工具与资源）或 S9（随笔）；其中"10 种变现"是 2022 窗口期玩法，多数已过时，报告已标注风险——提醒流程中 AI 类内容要注意时效性。
6. **V2EX 发帖=新站收录的标准动作（强信号）**：《新站快速谷歌收录》(2023-07-02) 与《Threads 1小时被收录》(2023-07-06) 互相印证，S3 阶段"收录"小节应把"高权重社区发帖引荐"列为第一步。
7. **国内平台技术类（公众号）对出海主线参考价值低**：《公众号异步回复》归 S2 但标记低优先；建议流程中此类文章标"可选/低优先"。
8. **行业新闻/合并收购类**（如美团收购光年之外）归 S9，不写报告，仅记一行。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
console.log('map_feedback 已追加');
