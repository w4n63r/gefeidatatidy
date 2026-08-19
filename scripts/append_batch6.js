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
  { id: '[2023-07-10-2353][8000字讲解]人人都能学会的英文网站Adsense赚钱入门', stage: 'S6_变现与商业化', difficulty: 2, minutes: 30, pacer: 'P', summary: 'AdSense旗舰教程：流量思维/英文站/单域名单关键词/快速收录/每周2小时上站', report: '知识流程/文章分析/Adsense赚钱入门8000字.md' },
  { id: '[2023-07-20-0800]为什么我的那几个站最高可以做到10美元的ECPM', stage: 'S6_变现与商业化', difficulty: 2, minutes: 14, pacer: 'P', summary: '离钱越近单价越高：商品图片站案例+广告位布局+站群', report: '知识流程/文章分析/ECPM为什么能到10美元.md' },
  { id: '[2023-07-21-0800]哥飞聊付费流量营销短信也是付费流量生意', stage: 'S6_变现与商业化', difficulty: 2, minutes: 8, pacer: 'P', summary: '付费流量测算模型：到达率/打开率/注册率/LTV，投3500回5600', report: '知识流程/文章分析/营销短信付费流量测算.md' },
  { id: '[2023-07-22-0800]纯流量生意怎么玩有的公司靠这种方式一年做到几个亿利润', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'P', summary: '纯流量生意模型：曝光→下载→注册→付费测算+归因+oCPM回传', report: '知识流程/文章分析/纯流量生意的模型与归因.md' },
  { id: '[2023-07-23-0800]技术人如何了解目前市场上大家都在怎么赚钱', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'P', summary: '技术人了解市场四步法：找朋友聊/刷广告/做统计分类/针对性验证', report: '知识流程/文章分析/技术人了解市场赚钱四步法.md' }
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
## 第6批（2023-07-10 ~ 07-23，5 篇）

14. **AdSense/付费流量/ECPM 类集中归 S6（变现与商业化）**：《Adsense入门》《ECPM 10美元》《营销短信》《纯流量生意》均归 S6——S6 是本语料的最大主题之一，建议 S6 下分：AdSense优化 / 付费流量与归因 / 定价与订阅。
15. **市场调研类归 S1**：《技术人如何了解市场赚钱四步法》归 S1，建议 S1 增加"市场情报/调研方法"子主题（刷广告侦察、产品情报库）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第6批新增:', add.length, '| 累计:', all.length, '/ 726 | 报告:', reports);
