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
  { id: '[2024-03-30-0009]谷歌广告投放入门和避坑指南by拿了橘子跑啊', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 10, pacer: 'P', summary: '谷歌搜索广告投放入门SOP：转化跟踪/纯搜索网络/词组匹配/预算上限', report: '知识流程/文章分析/谷歌搜索广告投放入门与避坑SOP.md' },
  { id: '[2024-03-31-2344]哥飞SEO教程一个有效提升网页排名的方法', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'C', summary: '提升排名的终极策略：免登录试用/拉长停留时间/终结Pogosticking', report: '知识流程/文章分析/免登录试用拉长停留时间与反Pogosticking.md' },
  { id: '[2024-04-02-1727]这位法国开发者晒出了3月收入靠着10个产品总共产生了83212美元收入', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'E', summary: 'MarcLou单月8.3万美元拆解：面向独立开发者的卖铲子多产品矩阵', report: '知识流程/文章分析/MarcLou单月8.3万美元卖铲子矩阵拆解.md' },
  { id: '[2024-04-03-2328]摸到了一个站长做的字符类站群', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'R', summary: '字符符号类纯静态站群拆解：13个单页一词一域名AdSense矩阵', report: '知识流程/文章分析/字符符号类纯静态AdSense站群拆解.md' },
  { id: '[2024-04-04-2145]出海三件套开售公司注册税务申报与商标申请NSF2024首款商业产品', stage: 'S7_收款与合规', difficulty: 2, minutes: 14, pacer: 'R', summary: '出海合规三件套指南：美国公司注册/所得税申报/BOI/Stripe开户', report: '知识流程/文章分析/出海合规三件套与海外公司开户指南.md' },
  { id: '[2024-04-06-2235]哥飞SEO教程从TDK到TDH', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 8, pacer: 'C', summary: '站内SEO新三要素TDH：淘汰Keywords/确立Title+Description+Headings', report: '知识流程/文章分析/从TDK到TDH站内优化新三要素.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第42批（2024-03-30 ~ 2024-04-06，6 篇）

128. **"从 TDK 到 TDH 演进"重塑了 S3 站内优化基本认知**：彻底废弃 keywords 标签，确立 Title + Description + Headings 骨架体系。
129. **"免登录试用与反 Pogosticking"揭示了 S3 用户行为排名算法本质**：以零摩擦体验拉长页面互动时长，终结用户回退 SERP 行为。
130. **"Google Ads 搜索广告避坑 SOP"规范了 S5 SEM 投放风控**：限定纯搜索网络、选择所在地、词组匹配与 Max CPC 保护。
131. **"Marc Lou $83K/月 卖铲矩阵"丰富了 S6 商业模式**：面向出海开发者提供脚手架/发票/营销工具并采用买断制（LTD）。
132. **"出海合规三件套与海外公司开户"夯实了 S7 合规与法律底座**：涵盖美国公司注册、BOI 申报、4.15 所得税申报与 Stripe 开户。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第42批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
