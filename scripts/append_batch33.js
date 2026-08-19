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
  { id: '[2024-01-18-0022]社群第200天盘点下哥飞的朋友们做的部分网站流量', stage: 'S0_认知与心态', difficulty: 1, minutes: 12, pacer: 'E', summary: '社群200天几十个站流量复盘：矩阵上站与靠用户付费破月入万刀', report: '知识流程/文章分析/社群200天多站点流量复盘.md' },
  { id: '[2024-01-21-2052]一周快闪SEO比赛结果出炉冠军拿到了哥飞发出的666元现金奖励', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 8, pacer: 'E', summary: 'Replace Anything新词快闪SEO比赛复盘：7天冲入谷歌前4名与防惩罚', report: '知识流程/文章分析/ReplaceAnything新词快闪SEO比赛.md' },
  { id: '[2024-01-22-2258]以月访问量175亿的Characterai为例哥飞教你如何挖掘大流量网站的新流量机会', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: 'Similarweb自然落地页过滤新页面法：从超大站挖掘KD2新词做站', report: '知识流程/文章分析/Characterai新页面挖掘KD2蓝海词.md' },
  { id: '[2024-01-24-2337]哥飞解答第一个出海站要做什么要怎么做', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '第一个出海站目标与渐进路线：KD<10进前十跑通闭环再阶梯放大', report: '知识流程/文章分析/第一个出海站目标与渐进式路径.md' },
  { id: '[2024-01-25-2312]哥飞推荐七个可以直接复制代码拿来就用的前端代码网站', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: '7个开箱即用前端UI代码库与CSS生成器推荐（uiverse/HyperUI等）', report: '知识流程/文章分析/七个开箱即用前端代码与CSS生成器.md' },
  { id: '[2024-01-26-0918]OpenAI又发新博客了有五大更新', stage: 'S2_建站与开发', difficulty: 1, minutes: 6, pacer: 'R', summary: 'OpenAI五大更新：新Embedding降价降维与API Key细粒度权限', report: '知识流程/文章分析/OpenAI五大更新新Embedding与权限控制.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第33批（2024-01-18 ~ 2024-01-26，6 篇）

97. **"新手第一站与三阶段阶梯模型"确立为 S0 认知核心纲领**：第一个站死磕 KD<10 跑通上线与 Google 前十，第 2 站日百点击，第 3 站日千点击与商业化。
98. **"Similarweb 新落地页逆向法"是 S1 发掘极低竞争词的杀手锏**：以 Character.ai 为例展示过滤新增页面挖掘 KD 2 新词（ai hoshino）做站的体系。
99. **"Replace Anything SEO 快闪赛"验证了新词 7 天冲入首页与白帽防惩罚的边界**：充实 S5 进阶增长与 S8 避坑案例库。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第33批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
