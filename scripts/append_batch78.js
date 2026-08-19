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
  { id: '[2025-04-13-0800]哥飞答疑再讲SEO排名的本质以及如何做新词和老词', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'C', summary: '哥飞答疑SEO排位本质：跨词对比与抄老站缺点误区及老词表忠心6步SOP', report: '知识流程/文章分析/SEO排位本质与老词表忠心6步SOP.md' },
  { id: '[2025-04-14-0730]Github屏蔽中国大陆IPGithub官方回应纯属Bug现已恢复', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: 'GitHub中国大陆访问受阻官方公告：未登录配置Bug追溯报告与辟谣', report: '' },
  { id: '[2025-04-14-0730]没有打印机拍断大腿也想不到的几个需求', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: 'Printable词根暴利矩阵：打印日历百万月访/方格纸20万与数据驱动选品SOP', report: '知识流程/文章分析/Printable可打印词根百万月访实证与数据驱动选品SOP.md' },
  { id: '[2025-04-15-2333]来欣赏两个特别漂亮的AI工具站', stage: 'S2_建站与开发', difficulty: 2, minutes: 8, pacer: 'E', summary: '现代出海AI工具站视觉美学进阶：Ghiblio与YouPhoto暗黑沉浸式UI设计拆解', report: '知识流程/文章分析/Ghiblio与YouPhoto暗黑沉浸式AI工具站设计拆解.md' },
  { id: '[2025-04-16-1937]现在可以直接加元宝为微信好友了支持图片和文章总结和划重点', stage: 'S7_工具与资源', difficulty: 2, minutes: 10, pacer: 'R', summary: '腾讯元宝微信好友功能实测：微信内文章链接/图片与PDF文档极速总结实录', report: '知识流程/文章分析/腾讯元宝微信好友功能实测与交互参考.md' },
  { id: '[2025-04-17-0800]如何利用ChatGPT4o让网站设计大杀四方', stage: 'S2_建站与开发', difficulty: 2, minutes: 14, pacer: 'P', summary: '程序员高颜值AI站设计SOP：Shadcn打底/GPT-4o定制统一图标与动效升华', report: '知识流程/文章分析/利用GPT4o与Shadcn打造高审美AI站三步SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第78批（2025-04-13 ~ 2025-04-17，6 篇）

300. **"SEO 排位本质与老词表忠心 6 步"深化了 S3/S5 心智与战术**：每个关键词都是独立 SERP 排行榜（严禁跨词比外链/严禁抄老站缺点）；攻坚老词需保持周更精品页、周增反链与意图秒解决等 6 步自证。
301. **"Printable 可打印词根百万月访实证"丰富了 S1 数据驱动选品**：破除国内无打印机经验盲区，抓取高自然流站点提炼共性词根，拓出日历（百万月访）、方格纸（20万月访）等纯静态高毛利利基矩阵。
302. **"Ghiblio 与 YouPhoto 暗黑设计拆解"提升了 S2 产品审美**：AI 生成暗调大图背景 + 视差固定滑动（Parallax Fixed Background），拉满 Dwell Time 停留时长。
303. **"腾讯元宝微信好友功能实测"提供了 S7 工作流嵌入参考**：微信生态内文章/PDF 穿透式秒级总结划重点，零摩擦嵌入原生通讯场景。
304. **"利用 GPT-4o 与 Shadcn 打造高颜值 AI 站"沉淀了 S2 高阶设计 SOP**：Shadcn 配色打底，文案截图让 4o 批量定制成套风格统一图标，种子到大树成长进度条动效，践行自然与确定性原则。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第78批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
