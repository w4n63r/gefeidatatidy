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
  { id: '[2024-11-23-1202]哥飞给群里的朋友们发红包了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: 'AdSense广告费入账结汇与群友红包互动', report: '' },
  { id: '[2024-11-24-2030]哥飞的朋友做了一个只有中国人才能玩的游戏', stage: 'S1_需求与关键词', difficulty: 2, minutes: 8, pacer: 'E', summary: 'NYT爆款游戏汉化创新案例：PoetryStrands首日1800人玩产生1.3万PV实证', report: '知识流程/文章分析/NYT爆款汉化与PoetryStrands高粘性实证.md' },
  { id: '[2024-11-25-1821]大家的认可是我分享的动力', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '社群持续365天高质量交付责任重申', report: '' },
  { id: '[2024-11-26-2059]奥赛的经验分享半年时间从零开始把老词工具站做到从谷歌每日获取4000点击', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 15, pacer: 'E', summary: '2000字奥赛复盘：半年将Morse Code老词做到日点击4000/KGR选词与文案重构', report: '知识流程/文章分析/MorseCode老词工具站半年日点击4000实操复盘.md' },
  { id: '[2024-11-27-2334]只因他们这样做汇丰香港One就不支持内地线上开卡了', stage: 'S8_避坑警示', difficulty: 1, minutes: 6, pacer: 'W', summary: '汇丰香港开卡政策收紧警示：严禁材料造假欺诈/警惕黑产导致全行业风控收紧', report: '知识流程/文章分析/汇丰香港开卡政策收紧警示与跨境合规底线.md' },
  { id: '[2024-11-28-2115]2024年12月哥飞的朋友们线下聚会预报名开始了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '2024年12月深圳线下聚会预报名通知', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第62批（2024-11-23 ~ 2024-11-28，6 篇）

221. **"NYT 爆款汉化与 Poetry Strands 创新实证"验证了 S1 机制迁移套利**：将海外验证的 NYT Strands 规则迁移至古诗词，V2EX 冷启动首日 1800 玩家产出 1.3 万 PV（人均 7+ 次）。
222. **"奥赛 Morse Code 老词站半年日点击 4000"丰富了 S3 老词长尾战法**：KGR < 0.25 精准筛选长尾词矩阵，ChatGPT 全量重构文案治理关键词堆砌，推动流量二次飞跃。
223. **"汇丰香港开卡政策收紧警示"确立了 S8 跨境金融合规红线**：严禁伪造出入境材料与欺诈开户，尊重海外银行风控，坚持阳光合法跨境出海。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第62批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
