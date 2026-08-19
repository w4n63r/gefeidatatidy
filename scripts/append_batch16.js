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
  { id: '[2023-09-25-0800]分享几个实用的谷歌搜索高级语法', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: '谷歌语法：引号/site/减号/intitle/inurl/filetype，可组合', report: '知识流程/文章分析/谷歌搜索高级语法.md' },
  { id: '[2023-09-26-0800]哥飞解读年收入1400万美元的一人公司为何这么赚', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'E', summary: 'BuiltWith卖销售线索年入1400万；用BuiltWith找赚钱利基站模仿', report: '知识流程/文章分析/BuiltWith一人公司1400万.md' },
  { id: '[2023-09-27-0800]哥飞解读Adsense生态是谷歌的胜利', stage: 'S6_变现与商业化', difficulty: 1, minutes: 8, pacer: 'C', summary: 'Adsense=谷歌给站长分钱的多赢飞轮，冷门词站天然有优势', report: '知识流程/文章分析/Adsense生态是谷歌的胜利.md' },
  { id: '[2023-09-28-0934]保小图大专门给初学者的用小词图谋大词做站策略', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '新手先做KD<29小词举全站之力，站稳后扩兄弟词再图父词', report: '知识流程/文章分析/保小图大策略.md' },
  { id: '[2023-09-29-0755]月访问量2000万的Markdown文章在线分享工具', stage: 'S6_变现与商业化', difficulty: 1, minutes: 8, pacer: 'E', summary: '极简工具+可分享链接=1940万访问；外链CSV+AI分析用户行为', report: '知识流程/文章分析/2000万访问的简单工具.md' },
  { id: '[2023-09-30-0755]2023的HCU是利基网站的杀手吗哥飞回答你不是', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'C', summary: 'HCU是优胜劣汰：为搜索用户服务而非爬虫，好站会回来', report: '知识流程/文章分析/HCU不是利基网站杀手.md' }
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
## 第16批（2023-09-25 ~ 09-30，6 篇）

47. **"保小图大"是 S1/S2 的进阶策略**：小词→兄弟词→父词 + 举全站之力，作为 S1 找词后的"做站策略"核心。
48. **"BuiltWith 找利基站"归 S6**：线索数据生意+免费选品工具（搜广告网络找赚钱站），S6 增加"B2B/线索生意"。
49. **"HCU/算法更新"归 S3**：S3 增加"算法更新应对（用户价值>SEO）"子主题。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第16批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
