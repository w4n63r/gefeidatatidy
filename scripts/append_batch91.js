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
  { id: '[2025-08-11-0800]成功商业模式产品力共识力传播力SEO力品牌力', stage: 'S0_认知与心态', difficulty: 3, minutes: 20, pacer: 'C', summary: '成功商业五力乘数模型：Google信息增量专利/做词三大境界与创造共识飞轮', report: '知识流程/文章分析/成功商业五力乘数模型与创造新词最高境界.md' },
  { id: '[2025-08-12-1003]资溪面包走向全国的故事哥飞也在学习', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '资溪面包军团商业启示：四阶学徒演进路径/认知忍耐度与出海产业集群协同模型', report: '知识流程/文章分析/资溪面包军团启示与出海师徒网络协同模型.md' },
  { id: '[2025-08-13-2303]产品经理出海一年月入万刀实战经验分享', stage: 'S0_认知与心态', difficulty: 3, minutes: 22, pacer: 'E', summary: '产品经理Andy出海一年月入万刀复盘：聚焦主站/需求判断双维/高质量外链与付费换时间心法', report: '知识流程/文章分析/产品经理Andy出海一年月入万刀实战复盘.md' },
  { id: '[2025-08-15-2243]哥飞SEO教程图解内链内部链接外链外部链接反链反向链接正向链接', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'P', summary: 'SEO链接拓扑全景图解：内链/外链/反链定义辨析与PageRank权重流动闭环SOP', report: '知识流程/文章分析/SEO链接拓扑图解与PageRank权重流动闭环SOP.md' },
  { id: '[2025-08-18-2244]出海航行需灯塔', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '身边灯塔效应：同侪确定性破除怀疑/从日入1刀到月入10万刀认知跃迁心法', report: '知识流程/文章分析/身边灯塔效应与同侪确定性激励认知模型.md' },
  { id: '[2025-08-21-1448]从大厂到老师再到AI出海一个普通人的6年总结', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'E', summary: '程序员羊上上出海月入五位数复盘：大厂转型/6大经典做站避坑清单与纠偏实证', report: '知识流程/文章分析/程序员羊上上出海月入五位数与6大避坑清单.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第91批（2025-08-11 ~ 2025-08-21，6 篇）

367. **"成功商业模式五力乘数模型"确立了 S0/S5 顶层战略体系**：产品力 × 共识力 × 传播力 × SEO力 × 品牌力，Google 信息增量（Information Gain）专利重排序机理，做词三大境界（跟进/预测/创造新词）。
368. **"资溪面包走向全国的故事"贡献了 S0 产业协同模型**：亏钱忍耐度取决于商业确定性，资溪四阶成长路径（打工偷师 $\rightarrow$ 开店实战 $\rightarrow$ 研发新品 $\rightarrow$ 连锁品牌），构建出海开发者公会集群。
369. **"产品经理 Andy 出海一年月入万刀实战"提供了 S0/S1/S5 标杆实证**：聚焦主站拒绝分散，需求判断双维度（AI体验提升 + 过去付费意愿），高质量外链（Guest Post/PR）与付费换时间。
370. **"哥飞图解内链外链反链"完善了 S3 链接拓扑与权重 SOP**：清晰解耦同一链接的不同视角称谓，PageRank 权重流动方向与超链接指向严格一致，构建站内内链闭环架构。
371. **"出海航行需灯塔"建构了 S0 身边灯塔激励模型**：身边同侪拿到真金白银正反馈直接破除怀疑，从日入 1 刀到月入 10 万刀持续抬升群体认知天花板。
372. **"程序员羊上上 6 年出海总结"记录了 S0/S8 避坑与破局实证**：大厂转型稳定月入五位数 RMB，总结批量垃圾页/垃圾外链/频繁改版/Canonical错误等 6 大死穴与系统纠偏。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第91批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
