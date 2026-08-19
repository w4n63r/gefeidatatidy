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
  { id: '[2025-01-01-2134]真实的声音', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '即刻学员2024年终总结海报图片合集', report: '' },
  { id: '[2025-01-02-0925]哥飞的朋友们社群满一岁半了感谢所有2600位朋友们', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '社群满一岁半2600人感言与2025年去做主题', report: '' },
  { id: '[2025-01-03-2158]一位前字节产品经理的出海赚美元之旅从指挥程序员写代码到指挥AI写代码', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'E', summary: '前字节PM出海9个月到月入万刀日入千刀：零代码指挥AI/避开雕花陷阱与实操日志', report: '知识流程/文章分析/前字节PM出海9个月月入万刀实战日志与避坑心法.md' },
  { id: '[2025-01-05-2348]分享一个旱地拔葱的网站上线第一个月2768万访问量', stage: 'S1_需求与关键词', difficulty: 2, minutes: 6, pacer: 'E', summary: '音乐信件站TikTok裂变首月2768万访问：极简情感社交玩法与病毒传播机制', report: '知识流程/文章分析/音乐信件站TikTok病毒裂变首月2768万访问案例.md' },
  { id: '[2025-01-06-2338]SEO排名掉了流量掉了怎么办看哥飞给你表演妙手回春', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 10, pacer: 'P', summary: 'SEO排名下滑妙手回春SOP：关闭广告/放开免费/扩充内页拉升3大用户行为信号', report: '知识流程/文章分析/SEO排名下滑妙手回春SOP与3大用户行为信号调优.md' },
  { id: '[2025-01-07-2324]跟月访问量两千多万的工具矩阵学做SEO不同功能用不同域名做网站', stage: 'S1_需求与关键词', difficulty: 2, minutes: 8, pacer: 'E', summary: '123apps月访2000万工具矩阵拆解：不同功能独立域名做站与多站互链架构', report: '知识流程/文章分析/123apps两千万月访多域名工具矩阵架构拆解.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第67批（2025-01-01 ~ 2025-01-07，6 篇）

243. **"前字节 PM 出海 9 个月月入万刀日志"丰富了 S0 敏捷转型心法**：零代码指挥 AI，坚决破除细节雕花陷阱，一周一站高频验证，年终达成单日千刀/月入万刀。
244. **"音乐信件站 TikTok 病毒裂变首月 2768 万访问"丰富了 S1/S5 病毒裂变路径**：极简音乐+情感网页信件，TikTok 拆信二创短视频引爆千万级公域免费流。
245. **"SEO 排名下滑妙手回春 SOP"贡献了 S5 核心救市技术指南**：关停展示广告 + 大幅放开免费额度 + 扩充场景内页，调优跳出率/人均PV/停留时间重夺首页前三。
246. **"123apps 两千万月访多域名工具矩阵"沉淀了 S1/S2 架构设计战略**：每个高搜功能注册独立垂直域名卡位 Top 1，全家族通过顶通导航与 Footer 互链构筑护城河。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第67批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
