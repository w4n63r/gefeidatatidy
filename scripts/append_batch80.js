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
  { id: '[2025-04-27-2321]看关键词挖掘需求时CPC到底有没有参考价值', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'C', summary: '关键词挖掘CPC参考价值解耦：广告主竞价本质与工具站SaaS变现决策模型', report: '知识流程/文章分析/关键词挖掘CPC指标本质解耦与SaaS变现决策模型.md' },
  { id: '[2025-04-30-0800]哥飞评站年访问了6236万的AI视频生成网站PixverseSEO评测报告和改进建议3000字', stage: 'S3_SEO与流量入门', difficulty: 3, minutes: 20, pacer: 'P', summary: '6200万访问Pixverse评测：CSR纯前端与无SEO短板诊断及静态注入整改SOP', report: '知识流程/文章分析/6200万访问Pixverse评测与静态注入SEO整改SOP.md' },
  { id: '[2025-05-02-1034]首期发布中国AI产品热度榜amp大模型热度榜丨2025年4月', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'R', summary: '2025年4月中国AI榜单：Qwen3开源大模型/可灵2.0/扣子空间与Trae智能体升级全景', report: '知识流程/文章分析/2025年4月中国AI产品与大模型热度榜全景参考.md' },
  { id: '[2025-05-07-0902]拧到底和关停水', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '哥飞经典隐喻：拧到底与关停水——破除照搬案例与形式主义的第一性原理心法', report: '知识流程/文章分析/拧到底与关停水出海第一性原理认知模型.md' },
  { id: '[2025-05-09-0800]哥飞SEO教程什么是PBN为什么谷歌要打击PBN我们怎么防止成为PBN', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 16, pacer: 'P', summary: 'PBN本质解密与算法打击机理：Woy降权教训及健康卫星站6大防误伤SOP', report: '知识流程/文章分析/PBN风险本质解密与健康卫星站矩阵隔离SOP.md' },
  { id: '[2025-05-10-1153]从负债80万到月入万刀难得糊涂加入万刀俱乐部的感悟', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'E', summary: '难得糊涂万刀感悟：负债80万到月入万刀翻盘/拒绝卷快钱与创长青品牌思维', report: '知识流程/文章分析/负债80万到月入万刀难得糊涂长青品牌出海感悟.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第80批（2025-04-27 ~ 2025-05-10，6 篇）

309. **"关键词挖掘 CPC 参考价值解耦"纠偏了 S1/S6 选词认知**：CPC 为广告主竞价指标，CPC 为 0 不代表流量无价值（工具站靠 SaaS/买断变现坚决不看 CPC，资讯站广告变现才看高 CPC）。
310. **"6200 万年访 Pixverse SEO 评测"树立了 S3 大厂诊断标杆**：95% 为品牌词/纯 CSR 仅收录 208 页/无 Headings，给出无需重构代码的静态 \`<div id="introduction">\` 图文注入与多语言参数化整改 SOP。
311. **"2025 年 4 月中国 AI 榜单"补充了 S1/S7 产业前沿**：阿里开源 Qwen3（235B 对标 R1）、可灵 2.0 涂抹编辑、字节扣子空间与 Trae 智能体升级。
312. **"拧到底与关停水"确立了 S0 核心交付心法**：拧到底为死板执行动作（机械照抄教程 Phone Number Generator 案例），关停水为真正解决业务目标，坚决杜绝形式主义与假完成。
313. **"PBN 本质解密与健康卫星站隔离"构筑了 S5 站群风控体系**：解析 Woy 降权教训与 Google 保护 13% 外链权重生态机理，沉淀独立价值、独立流量、模板物理隔离等 6 大白帽防误伤 SOP。
314. **"难得糊涂负债 80 万到月入万刀感悟"提供了 S0 品牌演进范本**：破除纯钻研技术与刷垃圾站等 5 大伪工作，拒绝卷新词赚快钱过山车，深耕长青工具与品牌三阶梯。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第80批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
