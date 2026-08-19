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
  { id: '[2025-07-22-2249]哥飞SEO教程GoogleSearchConsole提示站点地图Sitemap无法抓取怎么办', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: 'GSC站点地图无法抓取排查SOP：5大常见诱因/特殊后缀子目录绕过与HTML双Sitemap架构', report: '知识流程/文章分析/GSC站点地图无法抓取排查SOP与HTML双Sitemap架构.md' },
  { id: '[2025-07-24-0002]用AI帮助别人做网站的网站Lovable8个月时间ARR突破1亿美元而国内大家只会问这年头还有人用网站吗', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: 'Lovable用8个月ARR突破1亿美元与全球Web生态繁荣提示', report: '' },
  { id: '[2025-07-25-0005]哥飞的朋友们年中分享交流会0726成都站议程出来了', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '成都年中交流会活动议程通知', report: '' },
  { id: '[2025-07-28-1239]哥飞的朋友们2025年中分享交流会成都站活动大家都说很值', stage: 'S0_认知与心态', difficulty: 3, minutes: 22, pacer: 'R', summary: '成都年中交流会全景复盘：人才5级金字塔/Ada海外PR媒体发稿/先收钱后开发与1.3亿产品心法', report: '知识流程/文章分析/成都年中交流会全景复盘与海外PR发稿及团队能力模型.md' },
  { id: '[2025-07-29-2305]普通人如何过好这一生从此刻觉醒开始', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: '人生觉醒与借假修真模型：90岁逆向假设/万能小组件1.3亿用户成长史与个人小果园心法', report: '知识流程/文章分析/人生觉醒与借假修真建个人小果园认知模型.md' },
  { id: '[2025-07-30-0949]SEO是实践的艺术也是时间的艺术', stage: 'S0_认知与心态', difficulty: 2, minutes: 8, pacer: 'C', summary: 'SEO时间的艺术：等待也是种植的一部分/新老词周期差异与多果树并重心法', report: '知识流程/文章分析/SEO时间的艺术与等待也是种植一部分心法模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第89批（2025-07-22 ~ 2025-07-30，6 篇）

357. **"GSC 站点地图无法抓取排查 SOP"补充了 S3 技术实操**：5 大常见错误诱因，特殊后缀（如 .cc）移至 /sitemap/sitemap.xml 子目录绕过 Bug，XML 与 HTML 双轨 Sitemap 架构。
358. **"成都年中交流会全景复盘"丰富了 S0/S5 核心知识库**：Rick 人才 5 级金字塔与 MVP 全员 Level 5 配置，Ada 海外科技媒体 PR 发稿与 Brand Mentions 信任分，彭涛/豆总先收钱后开发与巧玲姐 1.3 亿用户心法。
359. **"普通人如何过好这一生从此刻觉醒开始"建构了 S0 职场觉醒模型**：90 岁逆向重置多出 55 年年轻光阴，上班借假修真沉淀受用一生的技能，出来混第一件事是出来种下个人小果园。
360. **"SEO 是实践的艺术也是时间的艺术"深化了 S0/S3 种植哲学**：新词几天反馈 vs 老词两三月沙盒沉淀，种子种下后等待本身就是种植一部分，多树苗矩阵对冲单点不确定性。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第89批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
