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
  { id: '[2024-10-25-0859]任何有搜索框的地方都可以做搜索引擎优化', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '泛搜索引擎优化第一性原理：破除躺赚幻觉与有搜索框即可做SEO', report: '知识流程/文章分析/泛搜索引擎优化第一性原理与搜索抗衰减模型.md' },
  { id: '[2024-10-28-1451]曾经日入6万美金的小游戏网站是美国一代人的回忆2024年依然还有每月1490万的访问量', stage: 'S6_变现与商业化', difficulty: 2, minutes: 15, pacer: 'E', summary: '2800字拆解CoolMathGames：20年常青/月访1490万/Unblocked流量密码', report: '知识流程/文章分析/CoolMathGames20年常青与日入6万美金传奇拆解.md' },
  { id: '[2024-11-01-0847]做出一个日入200美金的网站需要多久答案是半个月', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'E', summary: '做出日入200美金网站需要多久：15天全流程时间线实证与出海15问答', report: '知识流程/文章分析/15天日入200美金全流程实证与做站15问答.md' },
  { id: '[2024-11-02-2356]朋友们这是目前哥飞流量最大的网站', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '哥飞流量最大网站AdSense广告与基础服务流量截图', report: '' },
  { id: '[2024-11-03-1712]记一个冉冉升起的出海新星', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'E', summary: '传统程序员转型出海首站实证：Cursor辅助/零外链进首页/新手破冰心法', report: '知识流程/文章分析/传统程序员转型出海首站实证与破冰心法.md' },
  { id: '[2024-11-04-0839]大公司病小公司得不起', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '小团队敏捷调头哲学：破除大公司病与动态导航避障模型', report: '知识流程/文章分析/小团队敏捷调头哲学与动态导航避障模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第58批（2024-10-25 ~ 2024-11-04，6 篇）

200. **"泛搜索引擎优化第一性原理"重构了 S0 流量抗衰减心智**：任何有搜索框的地方都可以做 SEO，主动搜索（Pull）流量具备跨周期的终身被动分红属性。
201. **"CoolMathGames 20 年常青与日入 6 万美金"树立了 S6 养网站防老终极标杆**：揭秘 Unblocked Games 机房场景红利，单人运营结合 HTML5 排行榜达成 1490 万月访。
202. **"15 天日入 $200 极速全流程实证"确立了 S0/S6 敏捷执行标准**：15 天完成建站到 AdSense 过审变现，出海 15 问解答了肌肉记忆与矩阵抗周期原理。
203. **"小团队敏捷调头哲学"提炼了 S0 动态导航避障模型**：目的地恒定不变，路线随新词与路况随时“朝令夕改”，以 24 小时极速转向作为核心护城河。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第58批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
