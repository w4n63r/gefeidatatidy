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
  { id: '[2023-11-08-0944]如何发现最新最全的GPTs一百多个GPTs全介绍GPTs大全都在这里', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'R', summary: 'GPTsHunter导航站与114个首发GPTs大全：生态新词导航站抢跑', report: '知识流程/文章分析/GPTsHunter与首发114个GPTs大全.md' },
  { id: '[2023-12-04-0800]丁邱洁我的律师之路与涉外法律服务产品的开发心得', stage: 'S9_非学习类', difficulty: 1, minutes: 6, pacer: '', summary: '特邀律师随笔与线下南山小论坛心得（S9）', report: '' },
  { id: '[2023-12-10-2213]分享一些免费的前端学习课程', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: '谷歌官方web.dev前端教程推荐：HTML/CSS/表单/响应式/图片优化', report: '知识流程/文章分析/谷歌webdev免费前端课程体系.md' },
  { id: '[2024-01-12-2157]哥飞教你通过分析月访问量2445万的Gumroad高流量页面来挖掘他人正在赚钱的需求', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'P', summary: 'Semrush分析Gumroad高流量页挖掘赚钱需求：直接付费收益远超广告', report: '知识流程/文章分析/Gumroad高流量页挖掘赚钱需求.md' },
  { id: '[2024-01-13-0957]哥飞教你如何在X上发内容涨粉', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 8, pacer: 'P', summary: 'X发内容涨粉与双账号策略：整理向优质内容驱动转推并为产品导流', report: '知识流程/文章分析/X发内容涨粉与双账号运营策略.md' },
  { id: '[2024-01-15-0844]哥飞观察上线第一个月58万访问第二个月170万访问的网站是如何做到的', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'E', summary: 'ChatGot首月58万次月170万流量拆解：Typo词截流与多模型聚合', report: '知识流程/文章分析/ChatGot上线次月170万流量拆解.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第32批（2023-11-08 ~ 2024-01-15，6 篇）

94. **"Typo 词截流（Typo Interception）"是 S1 需求挖掘的又一实证实操策略**：ChatGot 案例展示了抢注头部产品高频拼写错误词并在次月冲上 170 万访问量的打法。
95. **"Gumroad Top Pages 逆向选品"丰富了 S1 的真实付费需求发掘工具链**：利用 Semrush 绕过爬虫直接抓取在赚钱的数字商品，并对比了直接付费相对于广告的 4 倍超额收益。
96. **"X/Twitter 涨粉与双账号策略"充实了 S5 社交分发与冷启动模块**：整理型推文驱动转发，为出海产品积累种子流量。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第32批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
