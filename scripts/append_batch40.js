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
  { id: '[2024-03-14-2359]五个月冲到800万访问量这个AI代码生成工具站好猛', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 10, pacer: 'E', summary: 'Blackbox.ai 5个月冲至800万月访拆解：极品域名升级与80万插件周活', report: '知识流程/文章分析/Blackbox5个月冲800万月访拆解.md' },
  { id: '[2024-03-15-2325]是时候给大家好好介绍一下哥飞的社群了毕竟刚被二十年站长大佬夸过', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '社群体系与历史文章全景介绍（S9）', report: '' },
  { id: '[2024-03-16-2326]Semrush整理的16个WordPressSEO插件2024版', stage: 'S7_工具与资源', difficulty: 1, minutes: 12, pacer: 'R', summary: 'Semrush官方16个WordPress SEO插件推荐清单：综合/性能/内链/Schema', report: '知识流程/文章分析/WordPress常用16大SEO插件清单.md' },
  { id: '[2024-03-17-2153]花了20分钟改了下代码让网站每天增加了1000UV', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '基于GSC高曝光词20分钟提权SOP：排名从第6升至第2日增1000UV', report: '知识流程/文章分析/基于GSC高曝光词20分钟提权SOP.md' },
  { id: '[2024-03-18-2359]哥飞花半天时间做出来的单页网站五天时间从谷歌获取了28100个点击', stage: 'S1_需求与关键词', difficulty: 1, minutes: 10, pacer: 'E', summary: '半天单页新词网站5天获2.8万Google点击：长尾组合词东边不亮西边亮', report: '知识流程/文章分析/单页新词热词5天2.8万点击实战.md' },
  { id: '[2024-03-19-2338]哥飞详解AI工具站的新形式内容型AI工具站', stage: 'S2_建站与开发', difficulty: 2, minutes: 14, pacer: 'C', summary: '内容型AI工具站首创模型StickerShow：UGC广场/长尾收割/模板化复制', report: '知识流程/文章分析/内容型AI工具站飞轮模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第40批（2024-03-14 ~ 2024-03-19，6 篇）

120. **"内容型 AI 工具站"确立为 S2 建站与开发核心架构范式**：首创提出 UGC 生成与广场详情页联动 SEO 飞轮，公开免费引流、私密增值收费。
121. **"GSC 高曝光词 20 分钟提权 SOP"完善了 S3 站内微调标准打法**：就地修改 TDK 与 H 标签，将曝光量直接转化为排名跃升（日增 1000 UV）。
122. **"单页新词热词 5 天 2.8 万点击"丰富了 S1 新词长尾组合战术**：主词排第 2 页，靠丰富的组合词（AB/ABC）实现长尾反超。
123. **"Blackbox.ai 域名升级与插件导流"深化了 S5 品牌与生态资产建设**：从 useblackbox.io 升级至 Blackbox.ai，靠 80 万插件周活打造 93% 品牌搜索护城河。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第40批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
