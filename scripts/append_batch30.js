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
  { id: '[2023-08-16-0800]如何浏览一个网站10年前的样子', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'P', summary: 'Wayback Machine使用与API：看网站历史改版与精准判断上线时间', report: '知识流程/文章分析/WaybackMachine查看网站历史.md' },
  { id: '[2023-08-17-0902]以四条中标的风向标为例告诉你如何写出能够中标的风向标', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '拆解四条中标风向标：从新信息、深度规律到低成本实操方案', report: '知识流程/文章分析/四条中标风向标与信息差.md' },
  { id: '[2023-08-22-0800]Adsense账号注册审核网站审核的一点经验分享', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'P', summary: 'Adsense账号注册与网站审核：代码/ads.txt双验证与Pin码实名', report: '知识流程/文章分析/Adsense账号注册与审核实操.md' },
  { id: '[2023-09-06-0800]5000字长文海外工具从需求挖掘到网站制作全流程让你一篇文章学会', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '海外工具站长期复利与新手练手路径（付费截断）', report: '知识流程/文章分析/海外工具站全流程与长期复利.md' },
  { id: '[2023-09-12-0814]收藏51个挖掘需求时能用得上的财富密码关键词哥飞免费赠送给大家', stage: 'S1_需求与关键词', difficulty: 1, minutes: 12, pacer: 'R', summary: '51个工具站需求挖掘核心词根（Generator/Converter/Calculator等）', report: '知识流程/文章分析/51个工具需求挖掘关键词.md' },
  { id: '[2023-09-21-0900]DALLE3将于10月份发布到时可在ChatGPTPlus和API上体验', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'R', summary: 'DALL·E 3发布与DALL·E 2 API解析：新词出现即建站机会', report: '知识流程/文章分析/DALLE3发布与生图API解析.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第30批（2023-08-16 ~ 2023-09-21，6 篇）

89. **"Wayback Machine / Archive.org" 确立为 S7 竞品调研的必备工具**：校正域名年龄偏差、还原改版与推广节点。
90. **"51 个功能词根库"是 S1 需求挖掘的标准化拓词工具箱**：提供了与行业实体结合做笛卡尔积的系统化方法。
91. **"Adsense 注册与 Pin 码实名"是 S6 变现的实操闭环指南**：双重验证与平信补救为出海开发者扫清结算障碍。
92. **"大厂新发布即新词机会"强化 S1 找新词方法论**：结合 DALL·E 3 等突发超级关键词建立快速建站机制。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第30批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
