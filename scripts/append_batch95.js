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
  { id: '[2025-09-28-2245]哥飞解答为什么Evernote自然流量突然上涨', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'C', summary: 'Evernote流量暴涨归因：高权重借力AI工具内页矩阵与做站增长三部曲模型', report: '知识流程/文章分析/Evernote流量暴涨归因与做站增长三部曲模型.md' },
  { id: '[2025-09-29-2336]GEO来了如何看待SEO的未来', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: 'GEO与SEO未来关系探讨简要预告', report: '' },
  { id: '[2025-09-30-2350]哥飞在航海家夜话的分享AI工具站案例大赏', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '航海家夜话直播分享预告短讯', report: '' },
  { id: '[2025-10-06-2357]这个站年收入900多万美金', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '年入900多万美金网站竞猜悬念短讯', report: '' },
  { id: '[2025-10-08-2139]揭晓年营收930万美金的网站到底是做什么的', stage: 'S1_需求与关键词', difficulty: 3, minutes: 22, pacer: 'E', summary: 'Famileo年入1500万美金拆解：儿孙手机发/老人看报纸代际订阅收租模型', report: '知识流程/文章分析/Famileo年入1500万美金拆解与代际情感订阅模型.md' },
  { id: '[2025-10-10-1812]9月全球AI网站最新排行榜海外国内出海排名', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'R', summary: '2025年9月全球AI网站榜单：GoogleAIStudio借NanoBanana暴增64%跻身TOP8与出海大盘', report: '知识流程/文章分析/2025年9月全球AI网站榜单与GoogleAIStudio暴增解析.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第95批（2025-09-28 ~ 2025-10-10，6 篇）

387. **"哥飞解答 Evernote 为什么流量上涨"贡献了 S3 增长三部曲**：高权重借力 AI 重写与转录子内页矩阵，确立"不断上内页 $\rightarrow$ 不断做内链 $\rightarrow$ 不断加外链"黄金增长铁律。
388. **"年营收 930 万美金网站揭晓"提供了 S1/S6 情感订阅典范实证**：Famileo 跨介质代际沟通（儿孙线上发、老人看报纸），买单人与使用人分离，26% 极低跳出率与几乎终身不退订收租，年入 1500 万美金。
389. **"9 月全球 AI 网站最新排行榜"更新了 S1 全球大盘情报**：Google AI Studio 凭借 Nano Banana 暴增 64% 杀入全球 TOP 8，DeepSeek 稳居全球前十，独立发布全球 AI 增长榜追踪黑马赛道。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第95批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
