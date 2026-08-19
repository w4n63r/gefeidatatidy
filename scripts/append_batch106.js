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
  { id: '[2026-03-08-2328]哥飞的朋友们2026年2月新词新站比赛结果出炉第一名上站首月拿下510K的PV', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '2026年2月新词比赛复盘：首月55万PV/小游戏练手到高客单AI工具站双阶进阶SOP', report: '知识流程/文章分析/2026年2月新词比赛复盘与小游戏练手到高客单AI工具站SOP.md' },
  { id: '[2026-03-09-2241]我用Claude两天做了一个在线小游戏很上瘾很上头', stage: 'S2_建站与开发', difficulty: 3, minutes: 26, pacer: 'P', summary: 'Claude两天开发高粘性在线小游戏实录：ZooBlocks双消除双循环机制与纯前端极速交付SOP', report: '知识流程/文章分析/Claude两天开发高粘性在线小游戏实录与ZooBlocks双循环SOP.md' },
  { id: '[2026-03-10-2343]26年2月新词新站比赛冠军复盘死磕游戏站终有所成', stage: 'S1_需求与关键词', difficulty: 3, minutes: 25, pacer: 'E', summary: '2026年2月新词比赛冠军复盘：死磕游戏站三阶段/每天发外链5小时与30分钟极速上站实证', report: '知识流程/文章分析/张瑜2月新词比赛冠军复盘与死磕游戏站3阶段实证.md' },
  { id: '[2026-03-11-1318]深扒SEO数据网站品牌词被抢访问量却创200万新高看真RaphaelAI如何逆势增长', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 35, pacer: 'E', summary: '1.1万字深扒RaphaelAI品牌词被抢与200万逆袭：Google实体识别/Navboost算法纠偏与多语言承接实证', report: '知识流程/文章分析/1万1千字深扒RaphaelAI品牌词被抢与200万逆袭实证.md' },
  { id: '[2026-03-16-1442]你是否已经开始给自己做网站养老了但还有一身班味', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'P', summary: '消除打工班味指南：拒绝机械批量水页/单页打样验证与渐进式梯度做词SOP', report: '知识流程/文章分析/消除打工班味指南与单页渐进式梯度做词SOP.md' },
  { id: '[2026-03-17-1314]摸索一年走上出海web道路月入4w刀万字记录历程分享实操', stage: 'S0_认知与心态', difficulty: 3, minutes: 35, pacer: 'E', summary: '1.35万字出海Web实操全景：从迷茫到月入4万刀/App与Web抉择/榜单逆向与睡后收入实证', report: '知识流程/文章分析/1万3千字出海Web月入4万刀全流程实操与认知实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第106批（2026-03-08 ~ 2026-03-17，6 篇）

436. **"2026 年 2 月新词比赛结果出炉"建立了 S1/S6 双阶做站路径**：小游戏站低竞争易拿首月几十万 PV 练手，AI 工具站单客变现高 5~10 倍获取超额利润。
437. **"我用 Claude 两天做了一个在线小游戏"系统化了 S2 游戏全栈交付 SOP**：ZooBlocks 双消除系统 + 12 级动物园放置挂机飞轮，纯单文件 HTML/JS + 纯代码 SVG 动态画兽 + 100dvh 移动适配 + Canvas 海报原生分享。
438. **"26 年 2 月新词比赛冠军复盘"沉淀了 S1/S5 死磕游戏站三阶段**：张瑜首月 51 万 PV，弃坑超 30 天老词，Sitemap 监测 + 每天手动发外链 4~6 小时（200~300 RD 登顶），Google Trends 抢注 .com 30 分钟极速上站当晚收录，YouTube 字幕提取做内容增量。
439. **"深扒 SEO 数据：Raphael AI 品牌词被抢与 200 万逆袭"贡献了 S5 实体与 Navboost 史诗案例**：1.1 万字解剖李逵被李鬼抢词 8 个月，香港都会大学 .edu.hk 外链推升 DR 至 48 临界点，3 分钟深度停留（Navboost）迫使算法纠偏，夺回品牌词并拿下 KD 90+ 大词前 10。
440. **"你是否已经开始给自己做网站养老了但还有一身班味"给出了 S0 渐进做词 SOP**：拒绝应付交差批量生成水页，每一个词都是养老资产，单页精细打样验证 $\rightarrow$ 独立原创改写 $\rightarrow$ 阶梯式提速（1天1页 $\rightarrow$ 1天3页 $\rightarrow$ 1天5页）。
441. **"摸索一年走上出海 web 道路月入 4w 刀万字记录"奠定了 S0 Web 睡后收入总纲**：1.35 万字史诗复盘，App 依赖投流 vs 出海 Web 24×365 自动售货机睡后收入，Toolify 12 维逆向选品法，Pieter Levels 痛点记录，SEO + Google Ads + 众安卡合规无损消费。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第106批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
