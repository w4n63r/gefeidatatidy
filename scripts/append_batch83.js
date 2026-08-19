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
  { id: '[2025-05-28-2027]主动关闭了一个网站', stage: 'S8_避坑警示', difficulty: 2, minutes: 14, pacer: 'W', summary: '哥飞避坑警示：主动关闭月访10K网站！dofollow外链农场/借壳作弊与DMCA风险', report: '知识流程/文章分析/主动关闭月访10K网站的反思与3大合规死穴.md' },
  { id: '[2025-05-29-2335]Similarweb可以看Youtube关键词基于关键词生成更多关键词', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'R', summary: 'Similarweb查看YouTube关键词拓词简短提示', report: '' },
  { id: '[2025-05-31-2358]哥飞的朋友们分校交流会0607上海站议程出来了', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'R', summary: '0607上海交流会议程：万刀俱乐部同侪分享与国内公司直连PayPal收款新范式', report: '知识流程/文章分析/0607上海交流会议程与国内公司直连PayPal新范式.md' },
  { id: '[2025-06-04-2359]日入100美元越南站长做越南动漫粉丝网站的故事', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'E', summary: '越南站长动漫粉丝站赚4.4万刀拆解：规避版权纯做资讯日历与Facebook群组冷启动SOP', report: '知识流程/文章分析/越南站长动漫粉丝站赚4万刀与Facebook冷启动SOP.md' },
  { id: '[2025-06-05-1956]哥飞的朋友们深圳分享会amp上站Hackathon活动开始报名了', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'R', summary: '哥飞社群深圳两周年大会：8位嘉宾实战分享与首届线下24小时上站Hackathon', report: '知识流程/文章分析/哥飞社群深圳两周年大会与24小时线下上站Hackathon.md' },
  { id: '[2025-06-06-1516]如何做出好产品', stage: 'S0_认知与心态', difficulty: 3, minutes: 25, pacer: 'C', summary: '6400字字节做产品复盘：张一鸣产品第一定律（收益>成本）/拒绝抽象与系统级微创新壁垒', report: '知识流程/文章分析/张一鸣产品第一定律与字节做产品实事求是心法.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第83批（2025-05-28 ~ 2025-06-06，6 篇）

326. **"主动关闭了一个网站"构筑了 S8 UGC 抓取与合规避坑警示**：dofollow 导致 5928 个域名薅外链羊毛、黑产中转借壳 Parasite SEO 排名以及 Google DMCA 侵权警示，确立不做自嗨 Idea 与果断关站断舍离心法。
327. **"0607 上海交流会议程与国内直连 PayPal"重构了 S7 收款认知**：破除必须美国公司与 Stripe 执念，国内大陆主体可直接接入 PayPal 官方收取全球 200+ 国家美金并合规结汇。
328. **"越南站长动漫粉丝站赚 4.4 万美金"沉淀了 S1/S6 衍生资讯套利 SOP**：避开侵权视频纯做番剧介绍、追更日历与榜单投票，自建 Facebook 社群拉动 30% 回头客反哺 SEO。
329. **"深圳两周年大会与 24 小时上站 Hackathon"树立了 S0 极限交付标杆**：以赛促练，同侪高压环境下 24 小时跑通选词建站全流程击碎拖延症。
330. **"张一鸣产品第一定律与字节做产品心法"确立了 S0/S2 殿堂级认知总纲**：用户收益大于操作成本为唯一必要条件，剖析选兴趣/蒙层引导/锤子手机三大反模式，践行看数据不看感觉、拒绝抽象不装逼与系统级微创新护城河。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第83批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
