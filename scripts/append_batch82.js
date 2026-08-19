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
  { id: '[2025-05-17-2210]5天170万访问量2025年3月新词新站大赛第一名Lafe的经验分享', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'P', summary: '5天170万访问冠军Lafe复盘：社媒风口验证/长尾意图分流与半天上线双MVP SOP', report: '知识流程/文章分析/5天170万PV新词冠军Lafe爆款打造与双MVP上线SOP.md' },
  { id: '[2025-05-20-0011]年收入26万人民币的纯前端工具网站61流量来自于自然搜索22流量分布在美国', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'E', summary: '10年纯前端站年入26万累计130万拆解：零后端零算力与小果园抗不确定性模型', report: '知识流程/文章分析/10年纯前端站年入26万与小果园抗不确定性认知模型.md' },
  { id: '[2025-05-21-2024]炸裂完全由GoogleVeo3生成的美国西部片前行列车', stage: 'S7_工具与资源', difficulty: 1, minutes: 1, pacer: 'R', summary: 'Google Veo3文生视频影视级效果实测简讯', report: '' },
  { id: '[2025-05-23-0806]Claude4发布最强AI编程模型最强AIAgent基建', stage: 'S7_工具与资源', difficulty: 2, minutes: 18, pacer: 'R', summary: 'Claude 4发布深度测评：Sonnet 4 SWE-bench 72.7%/四大Agent基建与Cursor选型指南', report: '知识流程/文章分析/Claude4发布深度测评与Cursor编程选型实战指南.md' },
  { id: '[2025-05-26-2347]哥飞的朋友们年中分享交流会0524北京站圆满成功举办', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'E', summary: '0524北京交流会复盘：Clara全职出海SOP/小排提高成功率与曼达达人营销以小博大', report: '知识流程/文章分析/0524北京交流会复盘与Clara小排同侪实战路径.md' },
  { id: '[2025-05-27-2355]复盘网站展示量从700暴跌到40后历时2个月又恢复到600了这2个月我做了什么', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'E', summary: '新站蜜月期暴跌40自救复盘：历时2个月重回600+的4步内容与外链SOP', report: '知识流程/文章分析/新站蜜月期暴跌40自救复盘与4步外链内容SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第82批（2025-05-17 ~ 2025-05-27，6 篇）

321. **"5 天 170 万 PV 冠军 Lafe 爆款打造"沉淀了 S1 敏捷工程 SOP**：Twitter 发现 + Google Trends 双周期验证，GPT 逆向竞品痛点与长尾词分类承接，半天内极速交付 SEO 与功能双 MVP。
322. **"10 年纯前端站年入 26 万"确立了 S0/S6 小果园理论**：零后端零 API 算力成本，年访 365 万稳定年赚 26 万 RMB（10 年累计赚 130 万），以持续种下工具树苗的数量对抗市场不确定性。
323. **"Claude 4 发布与 Cursor 选型指南"提供了 S7/工具基建前沿**：Sonnet 4 (SWE 72.7% 日常主力) + Opus 4 (长程 Agent)，思维与工具交互闭环，超长指令遵循与杜绝作弊。
324. **"0524 北京交流会 300 人实战复盘"丰富了 S0 同侪画像**：Clara 兼职转全职组建外包流水线 SOP，小排老师单人年营收千万元提高立项成功率，曼达达人营销以小博大。
325. **"新站蜜月期暴跌自救复盘"沉淀了 S3 算法抗震 SOP**：展示量从 770 跌至 47 绝非死刑，通过消除重复博客/首页补 FAQ、周增 5~10 条外链、锚文本多样化与增加微交互，历时 2 个月重回 637 展示。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第82批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
