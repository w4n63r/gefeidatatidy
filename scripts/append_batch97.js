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
  { id: '[2025-10-28-2223]谷歌SEO外链建设简明指南2025更新版', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 20, pacer: 'P', summary: '2025年Google外链建设简明指南：相关性与权威性双轨/4大主流获取战法与4大避坑SOP', report: '知识流程/文章分析/2025年Google外链建设4大主流战法与避坑SOP.md' },
  { id: '[2025-10-31-2353]去香港参加了谷歌SearchCentralLiveHK2025会议', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: 'Google香港站长会复盘：抓取解析索引全链路/超越写博客与按需做页第一性原理', report: '知识流程/文章分析/Google香港站长会复盘与按需做页第一性原理.md' },
  { id: '[2025-11-02-0015]2025年10月哥飞公众号文章一览', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '2025年10月公众号全部文章汇总目录', report: '' },
  { id: '[2025-11-02-0015]丁邱洁付费专栏深耕中美贸易16年穿透美国商业本质从社区逻辑到熔炉密码', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '丁邱洁中美贸易专栏宣传短讯', report: '' },
  { id: '[2025-11-05-0800]哥飞案例观察月访问量250万的纯文字推理在线小游戏', stage: 'S1_需求与关键词', difficulty: 3, minutes: 26, pacer: 'E', summary: 'Clues by Sam月访250万拆解：纯文字逻辑探案/每日一题Wordle式留存与HN社区冷启动实证', report: '知识流程/文章分析/CluesBySam月访250万纯文字小游戏机制与自传播实证.md' },
  { id: '[2025-11-06-1919]创造需求VS发现需求怎么找PMF', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '发现需求第一性原理与PMF 3步闭环模型：福特快马悖论/释放需求与上线即PMF心法', report: '知识流程/文章分析/发现需求第一性原理与PMF三步闭环模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第97批（2025-10-28 ~ 2025-11-06，6 篇）

394. **"谷歌 SEO 外链建设简明指南 2025 更新版"贡献了 S5 外链体系 SOP**：相关性与权威性双轨评估，4 大主流获取战法（Guest Post/Digital PR/Resource/Broken Link），4 大避坑防惩罚清单与 GEO 品牌提及。
395. **"去香港参加谷歌 Search Central Live HK 会议"强化了 S0/S3 搜索第一性原理**：大道至简，抓取解析索引排序四大底层原理，坚决超越机械写博客，按用户意图交付最适配的工具/表格/交互页面。
396. **"哥飞案例观察月访 250 万纯文字小游戏"提供了 S1 极简游戏与留存实证**：Clues by Sam 20 宫格探案，Wordle 式每日一题高粘性机制（Direct 占比 64%），HN 互动到 Show HN 登榜冷启动。
397. **"创造需求 VS 发现需求？怎么找 PMF"奠定了 S0 需求第一性原理**：破除福特快马悖论（马不是需求，更快运输才是，新工具释放旧需求），PMF 3 步闭环（发现需求 $\rightarrow$ 做好产品 $\rightarrow$ 分发触达，上线即 PMF）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第97批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
