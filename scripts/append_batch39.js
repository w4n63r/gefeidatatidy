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
  { id: '[2024-03-08-2358]养网站防老案例月访问量277万的工具站已运行11年', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'E', summary: '11年工具站CapitalizeMyTitle月访277万拆解：首屏核心工具与108万长尾页扩展', report: '知识流程/文章分析/11年工具站CapitalizeMyTitle拆解.md' },
  { id: '[2024-03-09-1916]再聊内链建设内链重要性不亚于外链', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: '', summary: '内链文章重发简讯（S9）', report: '' },
  { id: '[2024-03-10-2043]已经完全掌握推特中文圈子的流量密码了只要我愿意发就有阅读量就能涨关注而这种内容其实很好写要写一天能写50条', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: '', summary: '推特涨粉心得简讯与社群介绍（S9）', report: '' },
  { id: '[2024-03-11-2311]1200UV的AI工具站每天200美元收入', stage: 'S6_变现与商业化', difficulty: 1, minutes: 6, pacer: 'E', summary: '1200UV小站接入Stripe首日收入破200刀与高转化率实证', report: '知识流程/文章分析/1200UV小站日入200刀付费转化实证.md' },
  { id: '[2024-03-12-0906]哥飞技术人如何成长为全流程创业者第六届南山小论坛嘉宾分享', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: '', summary: '南山小论坛演讲PPT封面与寄语（S9）', report: '' },
  { id: '[2024-03-13-2344]有消息称Sora不会在12月之前发布所以我们还有10个月的准备时间赶紧上个Sora相关的网站吧', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'C', summary: '面对Sora延迟的10个月窗口期：避开官方品牌词深耕垂直场景词', report: '知识流程/文章分析/Sora延迟发布的10个月窗口期策略.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第39批（2024-03-08 ~ 2024-03-13，6 篇）

117. **"CapitalizeMyTitle 11 年 108 万长尾页演进"丰富了 S0 果园式资产复利案例**：首页首屏始终保留核心工具，横向裂变长尾页面并辅以微量 SEM 防御。
118. **"1200 UV 站日入 $200 突破心理门槛"夯实了 S6 商业化变现信心**：打破“必须日万 UV 才能接支付”的心魔，证明垂直精准意图的高付费率。
119. **"Sora 延期 10 个月窗口期与场景选词"深化了 S1 避开官方品牌词策略**：大厂延期是低竞争潜伏建站良机，应主攻儿童动画故事等具体垂直场景词。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第39批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
