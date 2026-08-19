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
  { id: '[2023-07-07-0723]OpenAI的GPT4API正式全量发布所有至少成功支付过一次的开发者都可以直接调用', stage: 'S9_非学习类', difficulty: 1, minutes: 4, pacer: '', summary: '新闻公告：GPT4 API全量开放/completions弃用→chat/completions', report: '' },
  { id: '[2023-07-08-0753]如何在1亿用户的ThreadsApp里赚钱', stage: 'S1_需求与关键词', difficulty: 1, minutes: 6, pacer: 'P', summary: '新平台红利打法：关注人需求/内容缺口/bot与托管服务', report: '知识流程/文章分析/Threads里赚钱新平台红利.md' }
];
const threads = rawLines.filter(x => x.id.includes('2023-07-09-0920'));
for (const t of threads) {
  entries.push({ id: t.id, stage: 'S9_非学习类', difficulty: 1, minutes: 3, pacer: '', summary: 'AI生成的Threads平台介绍填充文（非学习类）', report: '' });
}
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const fb = fs.readFileSync(path.join('output','analysis','map_feedback.md'),'utf8');
const addFb = `
## 第4批（2023-07，10 篇）

9. **AI 生成的平台介绍填充文直接归 S9**：2023-07-09 的 8 篇 Threads 系列（约1100字/篇、模板雷同）为 AI 生成填充内容，无学习价值 → 全部 S9 仅标阶段。提示：语料里可能还有这类"凑数文"，精读时快速识别并归 S9。
10. **新平台红利类文章归 S1（找机会/新词）**：《Threads 里赚钱》本质是"新平台=新词+流量红利"的机会打法，归 S1；建议 S1 阶段补充"新平台机会识别"子主题。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
console.log('第4批新增:', add.length, '| 累计:', existing.size + add.length, '/ 726');
