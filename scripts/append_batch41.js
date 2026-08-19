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
  { id: '[2024-03-20-2356]哥飞教你如何一年上线30个AI工具站', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: '一年上线30个AI工具站工业化流水线：通用模板/API插拔/一词一域名', report: '知识流程/文章分析/一年上线30个AI工具站工业化流水线.md' },
  { id: '[2024-03-22-0000]哥飞教你如何利用各种工具制作一个SVG格式的Logo', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'P', summary: '极速制作SVG矢量Logo三步法：Ideogram+Clipdrop+Vectorizer实操', report: '知识流程/文章分析/AI辅助制作SVG矢量Logo实操.md' },
  { id: '[2024-03-23-0028]以月访问量2058万的16型性格测试网站为例说说搜索流量的品牌和非品牌区别暨链接好坏判断方式', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'C', summary: '16型人格2000万月访拆解：通用词品牌化绑定与4级外链质量天梯', report: '知识流程/文章分析/16型人格2000万月访与4级外链天梯.md' },
  { id: '[2024-03-24-1957]让一部分程序员先赚到美元', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '让一部分程序员先赚到美元：忘记技术自嗨/聚焦需求解决/渐进式破局', report: '知识流程/文章分析/让一部分程序员先赚到美元心智重构.md' },
  { id: '[2024-03-25-1014]哥飞朋友的网站上线第六天用户付费766美元你没赚钱很可能就是差了执行力', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'E', summary: '上线第6天日收766美元：发现需求/共享域名/复用代码极速执行实证', report: '知识流程/文章分析/上线第6天日收766美元执行力实证.md' },
  { id: '[2024-03-29-2311]哥飞和大家聊聊谷歌和站长的关系', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '谷歌与站长相互依存哲学：每天15%新搜索/生态新陈代谢/新供给捏软柿子', report: '知识流程/文章分析/谷歌与站长相互依存哲学与新供给捏软柿子.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第41批（2024-03-20 ~ 2024-03-29，6 篇）

124. **"一年上线 30 个 AI 工具站"确立为 S2 工厂化开发标准流水线**：以通用模板为底座，插拔替换生图/视频/修复 API 与 Prompt 极速量产独立站。
125. **"Ideogram + ClipDrop + Vectorizer"构建了 S2 极简 SVG Logo 设计三步 SOP**：为无设计基础开发者提供 5 分钟出矢量代码的标准方案。
126. **"16 型人格 2000 万月访与 4 级外链天梯"夯实了 S3 外链质量标准**：确立了 Title+锚文本 > 锚文本 > 品牌名 > 裸 URL 的四级质量天梯与“有比没有好”底线心法。
127. **"谷歌与站长相互依存与捏软柿子战术"升华了 S0 认知哲学**：每日 15% 新词驱动生态代谢，倡导用现代 AI 体验重构 5 年以上老旧大流量站（捏软柿子）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第41批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
