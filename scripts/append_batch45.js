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
  { id: '[2024-05-01-2356]人放假网站不放假收入不放假', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: 'R', summary: '五一放假简讯：人放假网站不放假被动收入', report: '' },
  { id: '[2024-05-03-2256]人歇站不歇美元蹭蹭来', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: 'R', summary: '五一假期简讯：人歇站不歇持续产生美元收入', report: '' },
  { id: '[2024-05-06-2331]每一个新产品都会经历这样的心路历程', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: 'R', summary: '新产品流量与收入心路历程：从0到日入千刀的阶段演进', report: '' },
  { id: '[2024-05-10-2042]哥飞分享别给自己立一堵墙让自己无法前进', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: 'R', summary: '短评分享：想都是问题做才是答案，别给自己设限', report: '' },
  { id: '[2024-05-16-0800]哥飞SEO教程再聊Canonical标签用好有好处用错有坏处需要小心用', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'P', summary: 'Canonical规范标签深度指南：权重汇聚/多语言配置与常见致命错误', report: '知识流程/文章分析/Canonical规范标签深度实战与避坑指南.md' },
  { id: '[2024-05-17-0007]哥飞社群辅导员Banbri的故事巨大变化的一年', stage: 'S0_认知与心态', difficulty: 1, minutes: 12, pacer: 'E', summary: 'Banbri一年蜕变实证：从被欠薪前端打工人到多个日入百刀自由职业者', report: '知识流程/文章分析/Banbri一年从欠薪打工人到自由职业者实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第45批（2024-05-01 ~ 2024-05-17，6 篇）

142. **"Canonical 规范标签实战"填补了 S3 站内重复内容治理关键盲区**：详解了解决 www/参数重复网址、权重统一汇聚原理，以及“全站写死首页”和“多语言混用”两大致命避坑。
143. **"Banbri 一年自由职业蜕变"丰富了 S0 程序员破局案例**：展示了“抓 Plugin 热点做站 → 合作开源 → 社群做站造多个日入百刀站 → 自由职业”的标准跃迁轨迹。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第45批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
