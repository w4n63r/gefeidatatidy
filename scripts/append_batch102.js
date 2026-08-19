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
  { id: '[2026-01-03-1842]加入哥飞社群一年终于做出一个月近900K流量的网站', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'R', summary: '月访近900K流量站点喜报短讯', report: '' },
  { id: '[2026-01-04-1325]ClaudeCode之父的13大cc使用技巧', stage: 'S2_建站与开发', difficulty: 3, minutes: 25, pacer: 'P', summary: 'Claude Code之父13大实操技巧：Opus4.5思考模式/CLAUDE.md闭环与浏览器自动验证SOP', report: '知识流程/文章分析/ClaudeCode之父13大实操技巧与验证闭环SOP.md' },
  { id: '[2026-01-06-2244]急寻三位只花了26元就开通了社群网站权限的幸运朋友', stage: 'S8_避坑警示', difficulty: 3, minutes: 20, pacer: 'W', summary: '支付系统漏洞深度复盘：单位混淆/一分钱篡改防范与全流程工程师支付安全SOP', report: '知识流程/文章分析/支付系统漏洞深度复盘与全流程防羊毛安全SOP.md' },
  { id: '[2026-01-09-2208]2025年度网站比赛出炉冠军竟然是广告投手5个月拿下526万独立访客', stage: 'S1_需求与关键词', difficulty: 3, minutes: 30, pacer: 'E', summary: '2025年度做站冠军复盘：国内广告投手5个月狂揽526万UV/外链逆向找词与极致体验迭代实证', report: '知识流程/文章分析/2025年度做站冠军复盘与广告投手5个月526万UV实证.md' },
  { id: '[2026-01-10-2349]zjl观哥飞群友2025年度网站比赛直播有感', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: '2025年度做站大赛TOP10复盘：35岁非纯技术人群画像/上站30个与AdSense风控避坑10大洞察', report: '知识流程/文章分析/2025年度做站大赛TOP10群体画像与10条实操认知模型.md' },
  { id: '[2026-01-13-0800]案例回顾11月哥飞分享过的网站现在流量又增长了100万', stage: 'S1_需求与关键词', difficulty: 2, minutes: 15, pacer: 'E', summary: 'cluesbysam月访350万案例追踪：半年1351万访问/5欧元资源包变现与广告双轨收益测算实证', report: '知识流程/文章分析/cluesbysam月访350万案例追踪与小游戏双轨变现实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第102批（2026-01-03 ~ 2026-01-13，6 篇）

416. **"Claude Code 之父的 13 大 cc 使用技巧"奠定了 S2 Agentic 编程标准**：Opus 4.5 思考模式少返工，Git 共享 CLAUDE.md 犯错免疫飞轮，Plan 模式先行，Chrome 扩展闭环自动验证与代码自修复（第 13 条法则，质量提升 2~3 倍）。
417. **"急寻三位只花了 26 元开通权限的朋友"提供了 S8 支付安全避坑 SOP**：分/元单位混淆事故，后端查库定价杜绝前端一分钱篡改，Webhook 签名与实付金额双重校验，全流程工程师能力模型。
418. **"2025 年度网站比赛出炉：广告投手 5 个月 526 万 UV"贡献了 S1/S3 顶级实战打法**：国内广告投手李太白，外链逆向顺藤摸瓜找词，玩家视角 VS Code 提交 20+ 版本超越大站简陋竞品，内页 Title 埋词引爆流量，每日一题机制。
419. **"zjl 观 2025 年度网站比赛直播有感"构建了 S0 获胜者画像与 10 大认知**：35 岁中年危机驱动极强执行力，非纯技术人员懂一点代码 + 懂商业更易成，上站 30~50 个是标配，严防 AdSense 限流导致高峰零变现，盈利后必上 Google Ads。
420. **"案例回顾：cluesbysam 流量又增长 100 万"完善了 S1/S6 双轨变现模型**：月访冲上 350 万（半年 1351 万），跳出率 47.58% + 停留超 6 分钟，40 万内购包对比 100~190 万潜在广告收益，确立【前置广告 + 后置付费包】双轨模型。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第102批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
