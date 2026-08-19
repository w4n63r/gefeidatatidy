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
  { id: '[2025-05-11-0929]4月全球AI排行榜中国AI网站流量暴跌不见得', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'R', summary: '2025年4月全球AI榜单：Similarweb算法调整辟谣/Lovable达3000万与Genspark翻倍', report: '知识流程/文章分析/2025年4月全球AI排行榜与Similarweb算法调整解析.md' },
  { id: '[2025-05-12-0812]出海AI工具站做好Discord运营好处多多实操细节分享', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 18, pacer: 'P', summary: '出海AI工具站Discord运营全景SOP：降Stripe争议/挖竞品词/Nitro单号管多站与4频道规划', report: '知识流程/文章分析/出海AI工具站Discord私域运营与Stripe防封实操SOP.md' },
  { id: '[2025-05-13-0830]第一名5天170万访问哥飞的朋友们2025年3月新词新站比赛结果出炉了', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '2025年3月新词比赛复盘：5天170万PV/53站全员奖金与工具站超60%主导地位', report: '知识流程/文章分析/2025年3月新词新站比赛复盘与5天170万PV实证.md' },
  { id: '[2025-05-14-2243]哥飞SEO教程如何不让你网页里的大量重复按钮文案干扰你页面关键词密度', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '保护关键词密度黑科技：CSS伪元素content隔离重复按钮与多语言无损渲染SOP', report: '知识流程/文章分析/CSS伪元素content隔离重复按钮保护关键词密度SOP.md' },
  { id: '[2025-05-15-2327]跟着世界第一网红MrBeast野兽先生的内容创作思路学做网站', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '借鉴MrBeast爆款逻辑做站：每周拆解前100大站与“用户第一非算法偏心”认知', report: '知识流程/文章分析/借鉴MrBeast爆款逻辑做站与用户第一认知模型.md' },
  { id: '[2025-05-16-2305]哥飞的朋友们年中分享交流会0524北京站议程出来了', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'R', summary: '哥飞社群2025年中北京站议程：千万营收小排/副业到全职Clara与同侪实战画像', report: '知识流程/文章分析/哥飞社群2025年中北京站议程与千万营收同侪画像.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第81批（2025-05-11 ~ 2025-05-16，6 篇）

315. **"2025 年 4 月全球 AI 排行榜"厘清了 S1 统计口径与前沿**：Similarweb 算法调整下调亚太样本约 20%，Lovable 突破 3000 万空降全球 23，Genspark 翻倍暴涨 101%。
316. **"出海 AI 工具站 Discord 运营实操 SOP"沉淀了 S5 私域风控与产品飞轮**：降低 Stripe 争议率规避封号高压线，发 Credit 换反馈与逆向挖掘搜索词，Nitro 别名一人管理多 Server 与 4 频道极简规划。
317. **"2025 年 3 月新词比赛复盘与 5 天 170 万 PV"印证了 S1/工具站统治力**：53 个参赛站中工具站 32 个占比超 60%，全员现金奖金激励，冠军站 5 天狂揽 170 万 PV。
318. **"CSS 伪元素 content 隔离重复按钮"构筑了 S2 前端关键词密度黑科技**：用 \`::after { content: "Play" }\` 渲染文字彻底避免 40+ 重复按钮稀释 DOM 关键词密度，多语言分 CSS 文件无损加载。
319. **"借鉴 MrBeast 爆款逻辑做站"深化了 S0 用户第一哲学**：每周深度拆解前 100 大流量爆款网站，破除“怪罪算法”受害者心态（不是算法不推荐，是用户不喜欢），替 Google 服务好搜索用户。
320. **"哥飞社群年中北京站议程与同侪画像"提供了 S0 演化光谱参考**：千万营收单兵小排老师、副业到全职团队 Clara 与大厂后端 7 等实战同侪画像。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第81批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
