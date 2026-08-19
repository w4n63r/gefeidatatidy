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
  { id: '[2026-04-18-1110]设计圈的ClaudeCode时刻来了', stage: 'S7_工具与资源', difficulty: 3, minutes: 28, pacer: 'C', summary: '设计圈ClaudeCode时刻：ClaudeDesign颠覆Figma/输出可运行React代码与超级单兵生产力模型', report: '知识流程/文章分析/设计圈ClaudeCode时刻与ClaudeDesign协作模型.md' },
  { id: '[2026-04-28-1914]养网站如种果树浇水施肥除草然后等待它慢慢成长', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'E', summary: '养网站如种果树实录：拒绝逃避式过度迭代/10个内页6个月突破8000点击与算法提权工具站实证', report: '知识流程/文章分析/养网站如种果树实录与10个内页爆发8000点击实证.md' },
  { id: '[2026-04-29-2319]Google在2026年3月底的算法更新到底更新了哪些东西对我们有什么影响', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 30, pacer: 'C', summary: '2026年3月Google核心算法更新深度解构：打压Listicle聚合/Gemini4语义过滤与工具站提权模型', report: '知识流程/文章分析/2026年3月Google核心算法更新深度解构与工具站提权模型.md' },
  { id: '[2026-05-03-1124]丁邱洁律师报个喜我顺利通过美国加州律师考试五月感恩系列', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '加州律师考试通过喜报', report: '' },
  { id: '[2026-05-09-2250]哥飞SEO教程谷歌下线FAQPage新页面还要不要写结构化数据', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 22, pacer: 'P', summary: '谷歌下线FAQPage应对指南：Keywords与FAQPage博弈史/难以伪造信号第一性原理与4条SOP', report: '知识流程/文章分析/谷歌下线FAQPage应对与难以伪造信号第一性原理SOP.md' },
  { id: '[2026-05-15-1348]我写了半年skill直到上周才意识到自己从一开始就搞错了方向', stage: 'S2_建站与开发', difficulty: 3, minutes: 35, pacer: 'P', summary: '1万字AgentSkill架构演进实录：从提示词到运行时/7层Agent架构与按需挂载SOP', report: '知识流程/文章分析/1万字AgentSkill架构演进实录与7层运行时设计SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第108批（2026-04-18 ~ 2026-05-15，6 篇）

446. **"设计圈的 Claude Code 时刻来了"建构了 S7 Claude Design 生成式设计模型**：AI 主生成人类主审阅，输出生产级 React 可交互代码，读取组织级设计系统，临时生成交互工具，一键 Handoff 给 Claude Code。
447. **"养网站如种果树"提供了 S0/S3 极简内页长期复利实证**：拒绝用写代码逃避发外链的逃避式过度迭代，10 个精品内页熬过漫长平台期，6 个月突破 8000 点击，算法提权去中间商。
448. **"Google 在 2026 年 3 月底的算法更新深度解构"系统化了 S5 算法新规**：Listicle 聚合降权 ➔ 直出工具官网，Information Gain 考核，Gemini 4.0 语义过滤，模板化定性为规模化内容滥用，精品工具站全面提权。
449. **"谷歌下线 FAQPage 新页面还要不要写结构化数据"沉淀了 S3 Schema 4 条实操 SOP**：难以伪造的信号第一性原理，老页不删，新页建议写兼顾 AI 爬虫 GEO 引用，前端 FAQ 模块坚决保留服务用户转化。
450. **"我写了半年 skill 搞错方向"奠定了 S2 Agent 7 层架构心智模型**：1.07 万字史诗反思，Skill 不是提示词而是运行时可部署单元，7 层分层（Memory ➔ CLAUDE.md 150行 ➔ Path Rules ➔ Skills ➔ Tools ➔ Hooks 确定性强制 ➔ Subagents）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第108批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
