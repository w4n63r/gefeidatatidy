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
  { id: '[2023-11-04-0759]与纯银探讨再聊我们为什么要出海赚美元', stage: 'S0_认知与心态', difficulty: 1, minutes: 14, pacer: 'C', summary: '出海=用细分付费避开国内规模内卷；先做第一个产品别等完美机会', report: '知识流程/文章分析/为什么出海赚美元.md' },
  { id: '[2023-11-05-0800]为何这个年收入130万美元的网站每月只有六万多访问量', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'E', summary: 'Browserless：API生意1.5万用户撑130万/年；流量≠收入，找痛点服务', report: '知识流程/文章分析/Browserless年入130万流量小.md' },
  { id: '[2023-11-06-2222]上线5天的新网站今日UV3000多', stage: 'S9_非学习类', difficulty: 1, minutes: 3, pacer: '', summary: '图片消息/短更新（S9）', report: '' },
  { id: '[2023-11-07-0724]OpenAIDevDay发布了好多好东西之开发者后台', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: 'OpenAI开发者后台更新新闻（S9）', report: '' },
  { id: '[2023-11-09-1555]能让大家的网站上线第一周就有流量的付费社群哥飞的朋友们优惠进行中仅剩79个名额就要涨价了', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '社群推广帖（S9）', report: '' },
  { id: '[2023-11-10-2255]社群朋友两个日UV过10K的新网站一个靠SEO一个靠自发传播', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 12, pacer: 'E', summary: 'SEO(9天10K)与自发传播(3天10K)两条路径；健康流量结构', report: '知识流程/文章分析/两条流量路径过10KUV.md' },
  { id: '[2023-11-11-2350]上线4天获得4700个外链他是怎么做到的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 8, pacer: 'P', summary: 'GPTsHunter复盘：快=抢热点+1天上线+社区发帖→4700外链', report: '知识流程/文章分析/上线4天4700外链快打法.md' },
  { id: '[2023-11-12-2359]介绍几个Ahrefs家的免费SEO工具FreeSEOTools上', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: 'Ahrefs免费工具7个：关键词生成/分平台词/KD/反链/权重', report: '知识流程/文章分析/Ahrefs免费SEO工具上.md' }
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
## 第22批（2023-11-04 ~ 11-12，8 篇）

63. **"快=抢热点"是 S5 的增长打法**：GPTsHunter 案例（48小时上线+社区引爆），S5 增加"热点快速上线"子主题。
64. **"流量≠收入"归 S6**：Browserless 案例支撑 B2B/API 生意视角。
65. **免费工具清单归 S7**：Ahrefs 免费工具补齐 S7 工具链。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第22批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
