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
  { id: '[2023-10-05-1112]哥飞的最近即刻动态合集', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '20条即刻动态合集：随笔与观点碎片（S9）', report: '' },
  { id: '[2023-10-13-0800]入群100天哥飞的朋友们手握百万流量支付订单滚滚来', stage: 'S9_非学习类', difficulty: 1, minutes: 6, pacer: '', summary: '社群100天成绩复盘与干货文章索引（S9）', report: '' },
  { id: '[2023-10-17-0900]养网站防老第3步根据搜索意图使用ChatGPT的GPT4生成网页', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: '养网站防老第3步：用GPT-4根据搜索意图生成SEO语义化HTML/CSS', report: '知识流程/文章分析/养网站防老第3步GPT4生成网页.md' },
  { id: '[2023-10-18-0939]养网站防老第4步手动调整布局和样式', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '养网站防老第4步：手动微调Logo/导航/H1/按钮与响应式布局', report: '知识流程/文章分析/养网站防老第4步手动调整布局和样式.md' },
  { id: '[2023-10-20-0800]养网站防老第5步内页和内链建设', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '养网站防老第5步：内页开发、JS功能实现与双锚文本内链权重传递', report: '知识流程/文章分析/养网站防老第5步内页与内链建设.md' },
  { id: '[2023-10-21-0800]6000字详解养网站防老第6步利用ChatGPT给网站增加多语言支持', stage: 'S4_内容与多语言', difficulty: 2, minutes: 15, pacer: 'P', summary: '养网站防老第6步：子目录多语言架构与ChatGPT页面级精准翻译实操', report: '知识流程/文章分析/养网站防老第6步ChatGPT多语言支持.md' },
  { id: '[2023-10-23-2212]养网站防老第7步注册域名解析域名部署上线', stage: 'S2_建站与开发', difficulty: 2, minutes: 12, pacer: 'P', summary: '养网站防老第7步：Cloudflare+GitHub+Vercel域名解析与自动化部署上线', report: '知识流程/文章分析/养网站防老第7步域名解析与Vercel部署.md' },
  { id: '[2023-10-27-0831]今日停更一天', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: '', summary: '停更通知（无正文，S9）', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第31批（2023-10-05 ~ 2023-10-27，8 篇）

93. **"养网站防老第3-7步"构成了官方建站与流量的黄金主干教程**：
    - 第3步（S2）：意图输入 + GPT-4 提示词驱动语义化 HTML/CSS 生成；
    - 第4步（S2）：文字 Logo、H1/div 区分、导航高亮与镂空按钮等精细调优；
    - 第5步（S3）：内页制作、前端 JS 算法实现与双锚文本内链权重传递体系；
    - 第6步（S4）：ISO 639-1 子目录多语言架构、母语自称切换器与页面级精准翻译；
    - 第7步（S2）：com/net 选域名、Cloudflare 托管、GitHub+Vercel 自动化部署及 SSL Full 避坑。
    该系列在阶段 5 综合时必须作为 S2/S3/S4 的核心必修骨架。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第31批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
