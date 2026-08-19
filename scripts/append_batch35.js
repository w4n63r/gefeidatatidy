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
  { id: '[2024-02-05-0939]哥飞推荐一个能火的开源项目AI对联AI春联', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 8, pacer: 'P', summary: '春节AI对联与红包封面案例：时令热点+开源免费驱动大V自发传播', report: '知识流程/文章分析/春节AI对联与开源传播逻辑.md' },
  { id: '[2024-02-06-2332]只要行动就会有收获只有行动才会有收获', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '执行力是出海唯一杠杆：七类关键词上站模型与告别观望', report: '知识流程/文章分析/出海执行力心法与七类关键词模型.md' },
  { id: '[2024-02-09-0947]哥飞给大家的年终奖到账了', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '社群年终奖与月度新词新站比赛发奖现场（S9）', report: '' },
  { id: '[2024-02-10-1936]哥飞给大家拜年了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: '', summary: '龙年新春拜年问候与上站寄语（S9）', report: '' },
  { id: '[2024-02-11-1004]哥飞推荐假期可以带着孩子们一起玩的编程小游戏培养逻辑思维能力养网站防老从娃娃抓起', stage: 'S7_工具与资源', difficulty: 1, minutes: 6, pacer: 'R', summary: '零基础逻辑与编程入门游戏推荐：W3Schools与Google Blockly Games', report: '知识流程/文章分析/零基础逻辑与编程入门小游戏.md' },
  { id: '[2024-02-17-1902]再聊多语言为什么不建议使用子域名而更建议使用子目录', stage: 'S4_内容与多语言', difficulty: 2, minutes: 12, pacer: 'C', summary: '多语言子目录vs子域名深度辨析：子域名权重隔离与301规范化', report: '知识流程/文章分析/多语言子目录vs子域名深度辨析.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第35批（2024-02-05 ~ 2024-02-17，6 篇）

104. **"多语言子目录 vs 子域名"确立为 S4 多语言建站的刚性技术规范**：通过 Ahrefs、GSC 及平台反证三大铁证，论证了多语言必须使用子目录（Subdirectory）聚合整站权重。
105. **"七类关键词上站模型"丰富了 S0 认知与选词分类学**：涵盖热点、新词、AI老需求、强付费、超级大词、开源分发与盲区蓝海。
106. **"开源免费作为冷启动特洛伊木马"充实了 S5 社交分发策略**：消除大 V 推荐商业顾虑，驱动病毒式自发传播与高质量外链沉淀。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第35批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
