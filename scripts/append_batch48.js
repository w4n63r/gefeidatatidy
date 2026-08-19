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
  { id: '[2024-06-12-0800]即刻7天从0到100关注的思考', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'P', summary: '社媒冷启动第一性原理：社交认证/热点借势/互动转化增长SOP', report: '知识流程/文章分析/社媒冷启动第一性原理与社交认证增长SOP.md' },
  { id: '[2024-06-13-0830]哥飞的朋友们线下聚会0615上海场预告嘉宾阵容强大干货量大管饱', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'R', summary: '0615上海线下聚会10位嘉宾大纲：日入2000刀/AITDK/单兵作战全景', report: '知识流程/文章分析/0615上海聚会10位嘉宾实操主题大纲.md' },
  { id: '[2024-06-14-2328]简单的事情重复做就有了魔力', stage: 'S3_SEO与流量入门', difficulty: 1, minutes: 6, pacer: 'E', summary: 'Aff投流测品与4个月4700手工外链实证：简单事情重复做的复利', report: '知识流程/文章分析/Aff投流测品与4个月4700手工外链实证.md' },
  { id: '[2024-06-19-2225]一款出海套壳产品怎么挤进全球AI产品Top100的', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 16, pacer: 'E', summary: '6300字拆解HIX.AI月访781万冲进全球Top100：400垂类矩阵与740万外链打法', report: '知识流程/文章分析/HIXAI月访781万冲进全球Top100拆解.md' },
  { id: '[2024-06-20-0846]哥飞教你如何赚到你的第一美元', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'P', summary: '赚第一美元逆向数学模型：日均2000曝光词+GPTs锚点对照+软柿子过滤', report: '知识流程/文章分析/赚第一美元逆向数学模型与选词标准.md' },
  { id: '[2024-06-22-0943]三个月时间哥飞做的一个全新网站依靠SEO20万点击达成', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'E', summary: '3个月500万曝光20万点击新站实证：SEO技术祛魅与AI新需求无人区打法', report: '知识流程/文章分析/3个月500万曝光20万点击新站SEO实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第48批（2024-06-12 ~ 2024-06-22，6 篇）

153. **"社媒冷启动第一性原理"完善了 S5 社交分发与个人品牌起号 SOP**：阐明了 Follow=社交认证广播的乘数效应，以及大 V 评论区引流与关注率指标。
154. **"Aff 投流测品与 4700 手工外链"贡献了 S1/S3 极高价值实战打法**：用竞品 Aff 广告极速测真实付费意愿，纯人工 4 个月沉淀 4700 外链登顶 No.1。
155. **"HIX.AI 781 万月访拆解"提供了 S5 超大型矩阵产品标杆**：400+ 垂类场景拆解、2 万关键词覆盖、36 种语言及 bypass 子站打法。
156. **"赚第一美元逆向数学模型"规范了 S0/S1 目标量化标准**：日出 1 单 $\rightarrow$ 100 UV $\rightarrow$ 2000 曝光词（GPTs 锚点对照），软柿子过滤降低试错成本。
157. **"3 个月 500 万曝光 20 万点击新站"强化了 S0 认知祛魅**：老需求+AI 创造大量零供给新词，新站极速做站能在无人区轻松夺冠。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第48批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
