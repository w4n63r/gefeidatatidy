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
  { id: '[2024-06-03-0800]哥飞在祖国首都北京办了一场线下分享交流会', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'E', summary: '北京线下交流会4位嘉宾画像：全职/兼职/小白起步/二手服务器降本', report: '知识流程/文章分析/北京线下交流会4位出海嘉宾画像与执行共性.md' },
  { id: '[2024-06-05-0800]哥飞实操分享一个真实的SEO失败案例帮助大家吸取教训', stage: 'S8_避坑警示', difficulty: 2, minutes: 10, pacer: 'P', summary: 'ChatGPT4o.ai翻车复盘：首页全文输出稀释关键词密度导致断崖降权', report: '知识流程/文章分析/ChatGPT4o首页全文输出稀释关键词密度翻车复盘.md' },
  { id: '[2024-06-06-2026]哥飞探案Adsense广告单价跌了吗', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'E', summary: '2024AdSense单价与审核实证：欧美RPM破10刀/声音视频工具更高/4天秒过', report: '知识流程/文章分析/2024AdSense欧美RPM破10刀与4天秒过实证.md' },
  { id: '[2024-06-07-2115]AIGCRank2024年5月AI排行榜3款国内产品进入增长榜前10', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'R', summary: 'AIGCRank5月AI排行榜：视频生成/AI搜索/教育搜题三大高增长赛道', report: '知识流程/文章分析/AIGCRank5月榜单三大高增长赛道.md' },
  { id: '[2024-06-10-2225]3个月30个站不写一行代码如何2小时快速上站', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'E', summary: '范尼3个月30个站实证：WordPress零代码2小时快速上站与退而结网心法', report: '知识流程/文章分析/范尼3个月30个站WordPress零代码上站实证.md' },
  { id: '[2024-06-11-2208]哥飞SEO教程如何用做内容的方式做好AI工具站', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'C', summary: '树状关键词下探与反哺架构：用内容做深AI工具站实现主词突围', report: '知识流程/文章分析/树状关键词下探与自下而上反哺内容模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第47批（2024-06-03 ~ 2024-06-11，6 篇）

149. **"树状关键词架构与自下而上反哺"提供了 S3 大词突围终极策略**：首页主词 $\rightarrow$ 二级目录 $\rightarrow$ 三级长尾内页，单点攻克长尾流并汇聚反哺大词。
150. **"ChatGPT4o.ai 首页全文输出稀释关键词密度"充实了 S8 致命避坑案例**：警示聚合页严禁输出 UGC 全文，必须严格限制为标题与 50 字短摘要。
151. **"2024 AdSense 欧美 RPM 破 10 刀与 4 天秒过"纠正了 S6 商业认知偏差**：声音视频垂直品类广告单价最高，真实大流量新站无需等待 3 个月即可秒过审。
152. **"范尼 3 个月 30 个站 WordPress 零代码上站"丰富了 S2 极速工业化实践**：2 小时单站流水线装配，退而结网捕捞精准需求。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第47批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
