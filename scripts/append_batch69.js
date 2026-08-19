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
  { id: '[2025-01-19-1113]哥飞SEO教程什么是Sitelinks和MiniSitelinks如何让自己网站出现Sitelinks', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '什么是Sitelinks与MiniSitelinks：品牌词绑定霸屏原理与4大促成优化SOP', report: '知识流程/文章分析/什么是Sitelinks与MiniSitelinks及品牌词霸屏SOP.md' },
  { id: '[2025-01-21-2151]做水蒸蛋和炼油做网站和赚钱道理都是相通的', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '做水蒸蛋炼油与做站赚钱：火候控制/知其所以然与刻意练习认知模型', report: '知识流程/文章分析/做水蒸蛋炼油与做站赚钱火候隐喻认知模型.md' },
  { id: '[2025-01-22-2228]以这个Favicon图标生成工具为例哥飞告诉你好用的工具要怎么做', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'E', summary: '好用工具站怎么做：RealFaviconGenerator多端预览/全格式打包与框架集成SOP', report: '知识流程/文章分析/好用工具站产品设计与RealFaviconGenerator拆解.md' },
  { id: '[2025-01-24-0800]大厂看不上大厂员工看不懂这就是我们的机会', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: '2100字出海成本真实拆解：大厂看不上的利基缝隙与Mapify品牌外链夺词打脸复盘', report: '知识流程/文章分析/大厂看不上的利基缝隙与Mapify品牌外链夺词复盘.md' },
  { id: '[2025-01-25-2139]仅仅靠哥飞公众号的公开教程能赚到钱吗', stage: 'S0_认知与心态', difficulty: 2, minutes: 8, pacer: 'E', summary: '靠公开教程能否赚到钱：外企技术精英转型半年月入$5000实证与业务自然生长', report: '知识流程/文章分析/外企技术精英转型出海半年月入5000刀实证.md' },
  { id: '[2025-01-28-2337]农历新年最后一天上了两个网站单日新增UV破2千', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 8, pacer: 'E', summary: '除夕双站AB测试实证：10条初始启动外链13小时引爆2000点击与40倍差距', report: '知识流程/文章分析/初始启动外链对新词排名的决定性杠杆与AB测试实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第69批（2025-01-19 ~ 2025-01-28，6 篇）

251. **"Sitelinks 与 Mini Sitelinks 霸屏原理"丰富了 S3/S5 品牌词护城河**：Top 1 品牌词绑定算法机制，Header 导航/内链倾斜/Brand+场景搜索意图 4 大促成 SOP。
252. **"做水蒸蛋炼油与做站火候隐喻"构建了 S0 认知模型**：知其所以然与火候精细控制，通过 3~5 站刻意练习将排位调优内化为本能。
253. **"好用工具设计与 RealFaviconGenerator 拆解"沉淀了 S2 产品标准**：多端拟真预览、全格式一键打包与 Next.js 框架代码无缝集成，自发沉淀 10% 外部友情反链。
254. **"大厂看不上的利基缝隙与 Mapify 抢词复盘"确立了 S0/S5 竞争战术**：超轻成本结构与小微利基生存空间，Mapify 1400 引用域名外链轰炸夺取 Top 1 与 Sitelinks。
255. **"外企技术精英转型半年月入 $5000 刀"丰富了 S0 演化认知**：公开教程为宝藏图，从小微刚需切入，业务在真实用户反馈中自然生长第二增长曲线。
256. **"除夕双站 AB 测试：启动外链 40 倍差距"实证了 S3 核心外链杠杆**：10 余条初始启动外链 13 小时引爆 2000 点击（无外链仅 55 点击），验证启动反链决定性力量。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第69批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
