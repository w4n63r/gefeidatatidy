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
  { id: '[2023-10-29-1000]AI工具站日收入破千美元零基础入门养网站防老路线图', stage: 'S0_认知与心态', difficulty: 1, minutes: 12, pacer: 'R', summary: '养网站防老完整路线图索引（第0-9步+变现+运营），作学习导航', report: '知识流程/文章分析/养网站防老完整路线图.md' },
  { id: '[2023-10-30-0942][哥飞带你读]Ahrefs研究网页从上线开始算起拿到排名需要多久时间', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 14, pacer: 'E', summary: 'Ahrefs数据：前10平均2年/第一3年；5.7%一年内进首页；新词是捷径', report: '知识流程/文章分析/Ahrefs排名时间研究.md' },
  { id: '[2023-10-31-1000]月访问量八百万的在线自动化工具站如何用内容做SEO获取大量优质免费流量', stage: 'S4_内容与多语言', difficulty: 1, minutes: 10, pacer: 'E', summary: 'Zapier案例：工具站+博客内容（Best xxx）=48.9%搜索流量', report: '知识流程/文章分析/Zapier工具站内容SEO.md' },
  { id: '[2023-11-01-1012]2023年10月回顾有日入千刀的有月入千刀的也有日UV破万的还有才上第一个网站的大家都是好样的', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '10月月度回顾/群友战绩汇总（S9）', report: '' },
  { id: '[2023-11-02-0848]以月访问量760万的字数统计工具网站告诉你为什么要用关键字为域名', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'E', summary: '关键词域名求仁得仁：wordcounter.net两词第一，时间积累+相互成就', report: '知识流程/文章分析/关键词做域名求仁得仁.md' },
  { id: '[2023-11-03-1306]再聊内链建设内链重要性不亚于外链', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '内链价值+做法清单：加速收录/传权重/闭环，文本锚文本', report: '知识流程/文章分析/内链建设不亚于外链.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const fb = fs.readFileSync(path.join('output','analysis','map_feedback.md'),'utf8');
const addFb = `
## 第21批（2023-10-29 ~ 11-03，6 篇）

60. **"关键词域名"是 S1 的重要策略**：求仁得仁（域名词=排名词），与"一词一域名"互为印证。
61. **"Ahrefs 排名时间"归 S3（预期管理）**：S3 增加"排名时间预期（新词快/老词慢）"。
62. **"工具站+内容博客"归 S4**：Zapier 案例支撑 S4 的内容营销打法。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第21批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
