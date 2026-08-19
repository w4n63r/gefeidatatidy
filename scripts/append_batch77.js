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
  { id: '[2025-04-07-2244]一个没注意谷歌Ads500块钱广告费打了水漂', stage: 'S8_避坑警示', difficulty: 2, minutes: 8, pacer: 'W', summary: '避坑警示：谷歌Ads漏设地区打水漂！Tier-1白名单设置与低预算测试SOP', report: '知识流程/文章分析/谷歌Ads漏设地域打水漂警示与白名单投放SOP.md' },
  { id: '[2025-04-08-0848]挖掘需求做产品宣传推广搞流量流量变现赚美元', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '出海三步闭环总纲：零成本SEO钓鱼破冰与后期付费投放炸鱼二阶演进模型', report: '知识流程/文章分析/出海三步闭环与SEO钓鱼转付费炸鱼演进模型.md' },
  { id: '[2025-04-09-1551]第十届南山小论坛圆满落幕聚焦出海创业科技创新共探人工智能与跨境电商新机遇', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '南山小论坛出海创业线下分享简讯', report: '' },
  { id: '[2025-04-10-1908]3月全球AI排行榜全球AI一超多强Manus空降榜单第二名', stage: 'S1_需求与关键词', difficulty: 2, minutes: 14, pacer: 'R', summary: '2025年3月全球AI榜单：ChatGPT达45亿/Manus空降出海第二与成熟AI内外兼修回流', report: '知识流程/文章分析/2025年3月全球AI排行榜与Manus空降出海第二名.md' },
  { id: '[2025-04-11-0903]哥飞社群多少钱续费多少钱', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'R', summary: '哥飞社群定价与运营机制：首年2600次年固定888/拒绝终身制与老带新18%让利', report: '知识流程/文章分析/哥飞社群定价与运营机制及拒绝终身制参考.md' },
  { id: '[2025-04-12-1306]新词新站赚钱秘诀用好谷歌趋势GoogleTrends', stage: 'S1_需求与关键词', difficulty: 3, minutes: 30, pacer: 'P', summary: '9400字谷歌趋势实战全书：Topics与Terms/Breakout爆发词/ATS深层需求挖掘与竞品决策SOP', report: '知识流程/文章分析/谷歌趋势GoogleTrends实战全书与新词选品SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第77批（2025-04-07 ~ 2025-04-12，6 篇）

295. **"谷歌 Ads 漏设地域打水漂警示"确立了 S8/付费投放风控红线**：严禁默认全球投放，必须手动锁定 Tier-1 欧美高净值白名单，初始以 200 元小样低预算测试转化。
296. **"出海三步闭环与钓鱼转炸鱼演进"深化了 S0/S1 商业模型**：需求/流量/变现三步总纲，初期 SEO 零资金风险精准钓鱼，后期利润投入 Google Ads 买量规模化炸鱼。
297. **"2025 年 3 月全球 AI 排行榜"提供了 S1 赛道宏观格局**：ChatGPT 突破 45 亿统治大盘，Manus 首月狂揽 2309 万空降出海第二，Trae/Monica 海外成功后反向杀回国内。
298. **"哥飞社群定价与拒绝终身制机制"沉淀了 S0 运营伦理**：首年 2600 次年固定 888 续费，拒绝虚假的终身制以保障长期高水平交付，推荐人 0 佣金 + 新人 18% 优惠让利。
299. **"谷歌趋势 Google Trends 9400 字实战全书"构筑了 S1 顶级选词 SOP 圣经**：Terms 与 Topics 精准解耦，留空探索大盘，Breakout 爆发词捕捉，ATS 深层痛点挖掘与竞品替代/扩张决策模型。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第77批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
