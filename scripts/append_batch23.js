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
  { id: '[2023-11-14-0001]介绍几个Ahrefs家的免费SEO工具FreeSEOTools下', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: 'Ahrefs免费工具下：坏链/流量/排名/SERP/写作/插件', report: '知识流程/文章分析/Ahrefs免费SEO工具下.md' },
  { id: '[2023-11-15-0800]哥飞社群里最近的几个活动', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '社群活动公告（S9）', report: '' },
  { id: '[2023-11-16-0937]哥飞教你一招判断关键词出现时间找新词不再难', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'P', summary: 'Google Trends判断新词（出现≤12个月），多词对比', report: '知识流程/文章分析/用Trends判断新词.md' },
  { id: '[2023-11-17-2326]因为开源了一个价值几万块钱的GPTs导航程序他出海第一周就有收入了', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 10, pacer: 'E', summary: '开源即传播：3天第一笔赞助；账号经营+差异化', report: '知识流程/文章分析/开源即传播GPTs导航案例.md' },
  { id: '[2023-11-18-1642]新人出海建站从找到需求做出网站到成功变现跑通闭环大概要多久', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '新人闭环预期：全栈兼职约第5周第1美元；工具站>内容站', report: '知识流程/文章分析/新人跑通闭环要多久.md' },
  { id: '[2023-11-19-1007]参加南山小论坛是什么感受', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '参会随笔（S9）', report: '' },
  { id: '[2023-11-20-0800]出海第一周我的GPTs导航站火了', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 14, pacer: 'E', summary: '艾逗笔一周复盘：数据+快+开源+差异化→3天变现/周UV11.8k', report: '知识流程/文章分析/出海第一周GPTs导航复盘.md' },
  { id: '[2023-11-21-2238]如何花1个月从谷歌拿到100K点击又有新网站加入10K俱乐部', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '新词新站15条经验：选词/域名/内容/收录/变现checklist', report: '知识流程/文章分析/一个月100K点击15条经验.md' }
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
## 第23批（2023-11-14 ~ 11-21，8 篇）

66. **"Trends 判断新词"补全 S1 找词方法**：新词=出现≤12个月，与找新词策略闭环。
67. **"开源即传播/一周复盘"归 S5**：快+开源+差异化+多平台宣传=增长打法。
68. **"新人闭环预期"归 S0**：第5周第1美元、工具站>内容站——S0 增加"预期管理"。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第23批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
