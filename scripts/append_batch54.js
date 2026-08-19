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
  { id: '[2024-08-20-2219]加了500个外链拿下50K的MRR', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'E', summary: '500外链拿下50K MRR实证：40/20/40时间分配与单外链100刀MRR量化', report: '知识流程/文章分析/500外链冲破50KMRR与40-20-40精力模型.md' },
  { id: '[2024-08-22-1132]哥飞SEO教程简单总结谷歌排名到底怎么回事Nofollow外链也别嫌弃对于权重提升有作用', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'C', summary: '谷歌排名三阶递进法则与Nofollow外链机制：入围-冲榜-定名次', report: '知识流程/文章分析/谷歌排名三阶递进法则与Nofollow外链机制.md' },
  { id: '[2024-08-23-0109]花了两小时做了一个3D文字海报生成器还开源了', stage: 'S2_建站与开发', difficulty: 1, minutes: 4, pacer: 'R', summary: '2小时手搓开源3D文字海报生成器aiposter.app：轻量Canvas工具案例', report: '知识流程/文章分析/开源3D文字海报生成器aiposter极速做站案例.md' },
  { id: '[2024-08-24-2357]去北京在王煜全年中分享会上做了一次分享', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'C', summary: '竞品收入逆向估算模型：从支付网关反推到广告流量价值反推演进', report: '知识流程/文章分析/竞品收入逆向估算模型与广告价值反推法.md' },
  { id: '[2024-08-27-0800]哥飞分享如何解决网站留存差问题也许这个网站找到了最佳答案', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'E', summary: '解决网站留存差的终极答案：Custom Cursor 400万周活与插件双向飞轮模型', report: '知识流程/文章分析/CustomCursor400万周活与插件双向飞轮模型.md' },
  { id: '[2024-08-31-1722]ProductHunt暂定第一名SeekAll急需大家帮忙投票', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: 'SeekAll上线ProductHunt冲刺第一名拉票求助动态', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第54批（2024-08-20 ~ 2024-08-31，6 篇）

181. **"500 外链冲破 50K MRR 与 40/20/40 精力分配"确立了 S0/S3 资源配置金科玉律**：40% 挖需求 + 20% 开发 + 40% 推广外链，量化单外链贡献 $100/月 MRR 增量。
182. **"谷歌排名三阶递进法则与 Nofollow 外链机制"提炼了 S3 算法本质**：Title/H1 入围待排池 $\rightarrow$ 外链冲进前十 $\rightarrow$ 用户体验决定最终名次；破除 Nofollow 偏见，确认其为核心自然信任信号。
183. **"Custom Cursor 400 万周活双向流量飞轮"奠定了 S5 工具站留存终极解法**：SEO 引流新客 $\rightarrow$ 强制装插件沉淀 400 万桌面周活 $\rightarrow$ 插件回跳官网贡献 52% 直接访问，年入 $120K 广告费。
184. **"竞品收入逆向估算模型演进"丰富了 S1 选品分析工具**：从支付网关跳转估算升级为基于 Google 广告消耗（Paid Search Spend）与流量价值（Traffic Value）反推营收。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第54批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
