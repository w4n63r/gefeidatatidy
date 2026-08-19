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
  { id: '[2025-06-25-1029]最快速度让AI写的代码拥有牛逼的设计', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: '5分钟提升AI代码审美SOP：v0生成MVP+Aceternity模板+Claude Code一键移植', report: '知识流程/文章分析/5分钟提升AI代码审美SOP与ClaudeCode模板套用.md' },
  { id: '[2025-06-26-1849]只靠传统狭义理解怎么可能做好SEO', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '广义SEO与一人公司认知模型：从机械发外链到产品交付与“省下工资即利润”', report: '知识流程/文章分析/广义SEO全栈模型与一人公司省下工资即利润.md' },
  { id: '[2025-07-03-2336]程序员为什么要出海赚美刀程序员如何搞副业做网站赚美元', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: '程序员出海副业四阶跃迁模型：汇率杠杆/免费工具链看千站与社群真交付法则', report: '知识流程/文章分析/程序员出海副业四阶跃迁与免费工具链看千站心法.md' },
  { id: '[2025-07-04-2112]AI时代如何做独立开发', stage: 'S0_认知与心态', difficulty: 3, minutes: 25, pacer: 'P', summary: '方糖Easy独立开发5700字指南：1小时极速上线/程序化SEOpSEO与MCP平台生态SOP', report: '知识流程/文章分析/AI时代独立开发实战指南与pSEO及MCP赛道SOP.md' },
  { id: '[2025-07-05-2359]一个奇葩的社群两周年了', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'R', summary: '哥飞社群两周年复盘：14大反常规商业规则与1100万字真交付哲学参考', report: '知识流程/文章分析/哥飞社群两周年14大交付法则与长期主义参考.md' },
  { id: '[2025-07-06-2312]丁律师采访哥飞如何做好社群如何做好交付如何做好活动以及更多', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '丁律师采访哥飞出海年中特别访谈提纲简讯', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第86批（2025-06-25 ~ 2025-07-06，6 篇）

341. **"最快速度让 AI 写的代码拥有牛逼的设计"沉淀了 S2 极速审美 SOP**：v0 口喷 Canvas/编辑核心逻辑 MVP，结合 Aceternity Pro 商业模板，利用 Claude Code 5 分钟全自动套壳移植高质感设计系统。
342. **"只靠传统狭义理解怎么可能做好 SEO"确立了 S0/S3 广义全栈模型**：狭义 SEO 彻底失效，广义 SEO 聚合需求洞察、产品交付、秒开体验与内容闭环，一人公司省下的庞大协作工资全为纯利润。
343. **"程序员为什么要出海赚美刀"规划了 S0 四阶跃迁路径**：汇率杠杆非对称优势，月入 $1000 $\rightarrow$ $3000 全职 $\rightarrow$ $10000+ 跃迁，Ahrefs 免费工具链看 100 词 + 1000 站培养产品手感。
344. **"AI 时代如何做独立开发"贡献了 S0/S2/S5 殿堂级实战全书**：方糖 Easy 5700 字复盘，唯快不破与长期主义并重，沉淀 1 小时极速上线、ProductHunt 打榜、程序化 SEO（MCP.so 登顶第一）与 MCP 平台级赛道机会。
345. **"一个奇葩的社群两周年了"记录了 S0 长期主义交付哲学**：0 佣金/无理由退款/封顶 360 美金/续费固定 888，1137 万字答疑与 15 万买断课程，78% 超高续费率支撑真实做站赚美金生态。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第86批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
