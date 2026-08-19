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
  { id: '[2022-12-06-1304]ChatGPT的10种快速变现方法', stage: 'S6_变现与商业化', difficulty: 1, minutes: 6, pacer: 'P', summary: '2022年ChatGPT套壳变现10法（多数已过时，看模式分类）', report: '知识流程/文章分析/ChatGPT十种快速变现.md' },
  { id: '[2022-12-07-1306]没有openai账号无法如何使用ChatGPT方法来了打开httpsgptchatapiart不用不用注册直接提问绝', stage: 'S7_工具与资源', difficulty: 1, minutes: 3, pacer: '', summary: 'ChatGPT免注册访问工具（无正文，仅标阶段）', report: '' },
  { id: '[2022-12-08-0830]如何用ChatGPT帮助程序员更高效的写出更好的代码', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'P', summary: '用ChatGPT查原理/写代码/调试/取名，先问AI再查文档', report: '知识流程/文章分析/用ChatGPT高效写代码.md' },
  { id: '[2022-12-09-0830]ChatGPT最惊艳的能力是无中生有曾经沧海难为水除却巫山不是云', stage: 'S9_非学习类', difficulty: 1, minutes: 8, pacer: 'C', summary: 'AI能力认知随笔：ChatGPT无中生有=理解后生成新内容', report: '知识流程/文章分析/ChatGPT无中生有.md' },
  { id: '[2022-12-10-1229]与ChatGPT的一段长长的对话让我觉得对面真的是一个人在回答我的问题', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'P', summary: 'AI对话要耐心反复纠偏，答案偏了先检查自己需求是否说清', report: '知识流程/文章分析/与ChatGPT长对话.md' },
  { id: '[2022-12-11-1058]我解锁了ChatGPT的一项隐藏能力既能一键复制对话又能提取指定内容结构化输出', stage: 'S7_工具与资源', difficulty: 1, minutes: 7, pacer: 'P', summary: '魔法语句让AI按JSON/表格输出：一键复制对话+结构化提取', report: '知识流程/文章分析/ChatGPT隐藏能力结构化输出.md' },
  { id: '[2023-01-09-0800]一周即刻精选第1期202301020108', stage: 'S9_非学习类', difficulty: 1, minutes: 8, pacer: 'R', summary: '合集随笔：学习方法(ChatGPT+搜索循环)/text2sql趋势/赚美元国内花', report: '知识流程/文章分析/一周即刻精选第1期.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
console.log('第2批新增:', add.length, '| 累计:', existing.size + add.length, '/ 726');
