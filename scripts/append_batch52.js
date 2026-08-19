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
  { id: '[2024-07-31-1629]2024年7月快要过去了哥飞的朋友们社群要涨价了', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'P', summary: '年入百万人民币逆向数学模型：4000日点击/4个千次站/16个站矩阵SOP', report: '知识流程/文章分析/年入百万出海逆向数学模型与矩阵做站SOP.md' },
  { id: '[2024-08-07-0829]方向是明确的道路是可以看到的剩下的就是执行了', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '出海三元公式与笃定执行心法：流量靠谷歌/承载靠网站/变现于流量', report: '知识流程/文章分析/出海三元公式与笃定执行心法.md' },
  { id: '[2024-08-08-1840]一个月不到AI聚合搜索SeekAll周活3000了140版本今日发布太好用了', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: 'SeekAll插件侧边栏架构升级与周活3300实证：SidePanel解构标签拥挤', report: '知识流程/文章分析/SeekAll侧边栏架构升级与周活3300实证.md' },
  { id: '[2024-08-10-1218]哥飞SEO教程多语言网站robotstxt设置指南如何正确阻止不希望被抓取的页面', stage: 'S4_内容与多语言', difficulty: 2, minutes: 10, pacer: 'P', summary: '多语言网站robots.txt设置指南：避免多语言目录漏配与Next.js动态生成SOP', report: '知识流程/文章分析/多语言网站robots设置指南与Nextjs动态生成SOP.md' },
  { id: '[2024-08-11-2211]哥飞推荐新人友好完全无需数据却有管理后台可以动态更新网站内容的开源CMS', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'R', summary: '开源无数据库CMS系统GitBase：GitHub数据流/Vercel极速部署/AI自驱动架构', report: '知识流程/文章分析/开源无数据库CMS系统GitBase架构拆解.md' },
  { id: '[2024-08-12-2327]哥飞教你如何10分钟快速上线一个导航加博客网站', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '10分钟上线GitBase导航加博客网站SOP：Vercel一键部署与GitHubToken配置', report: '知识流程/文章分析/10分钟上线GitBase导航加博客网站SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第52批（2024-07-31 ~ 2024-08-12，6 篇）

171. **"年入百万出海逆向数学模型"量化了 S0 工业化矩阵路径**：$400/天 $\rightarrow$ 40 订单 $\rightarrow$ 4,000 日点击 $\rightarrow$ 拆解为 4 个日均千次站，一年按 25% 胜率上线 16 个站确定性落地。
172. **"出海三元公式与笃定执行"确立了 S0 极简商业信仰**：流量靠谷歌、承载靠网站、变现于流量，“没有网站，啥也不是”。
173. **"多语言 robots.txt 设置与 Next.js 动态生成"修补了 S4 多语言常见漏洞**：警示 Disallow 漏配多语言子目录与通配符误杀，推荐 Next.js \`app/robots.ts\` 自动遍历 locales。
174. **"开源无数据库 CMS GitBase 与 10 分钟部署 SOP"丰富了 S2 极速建站工具链**：GitHub 仓库作为数据库 + Vercel Webhook 自动部署，实现 PageSpeed 100 分纯静态秒开与可视化 Web 管理后台。
175. **"SeekAll 1.4.0 Side Panel 侧边栏架构与周活 3300"贡献了 S2 浏览器插件高级范例**：Chrome 原生 Side Panel 垂直收纳标签，解决并发检索窗口拥挤。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第52批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
