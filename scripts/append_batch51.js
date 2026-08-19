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
  { id: '[2024-07-13-2246]哥飞分享截止到2024年7月3日4572个还可以注册的3字母ai域名列表大全', stage: 'S7_工具与资源', difficulty: 1, minutes: 8, pacer: 'R', summary: '4572个未注册3字母.ai短域名清单：全网扫描与稀缺品牌资产库', report: '知识流程/文章分析/4572个未注册3字母.ai短域名资产数据库.md' },
  { id: '[2024-07-14-2329]哥飞分享每年从谷歌获取62万点击一个很受谷歌欢迎的又长又臭的网页例子', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'C', summary: '年获62万点击的Kayak超长单页拆解：13个模块全息覆盖意图模型', report: '知识流程/文章分析/Kayak年获62万点击的13模块超长落地页模型.md' },
  { id: '[2024-07-18-0800]哥飞分享通过查看vercelapp的子域名发现新需求新关键词', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '通过vercel.app子域名挖掘新词新需求SOP：Similarweb新发现落地页反查', report: '知识流程/文章分析/通过vercel.app子域名挖掘新词新需求SOP.md' },
  { id: '[2024-07-19-0800]哥飞转载活动回顾AISaaS出海SEO与AI原生CMS实践', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 12, pacer: 'C', summary: 'SaaS出海SEO落地页策略：漏斗底部词与5大核心页面矩阵模型', report: '知识流程/文章分析/SaaS出海SEO落地页策略与漏斗底部词模型.md' },
  { id: '[2024-07-22-2343]AI时代的聚合搜索长什么样子新版发布了', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: 'SeekAll插件跨窗口通信与标签分组升级：多视图联动与权限透明化', report: '知识流程/文章分析/SeekAll多视图联动与跨窗口通信升级.md' },
  { id: '[2024-07-29-2316]哥飞分享一文详解Reddit发帖推广经验与教训', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 18, pacer: 'P', summary: '9000字详解Reddit推广实战指南：59版块矩阵/Karma养号/Claude地道改写SOP', report: '知识流程/文章分析/Reddit出海推广实战指南与59版块矩阵SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第51批（2024-07-13 ~ 2024-07-29，6 篇）

166. **"Reddit 出海推广实战指南（59 版块矩阵）"构筑了 S5 海外社群冷启动终极操作手册**：9000 字梳理了 24 亿月访 Reddit 平台规则、Karma 快速养号、10% 营销红线、以及 Claude 3.5 Sonnet 定制地道故事文风 SOP。
167. **"Kayak 13 模块超长落地页模型"丰富了 S3 主题全息覆盖（Topical Completeness）理论**：单页拆解为 13 个独立功能与内容 Section，终结搜索意图，年揽 62 万自然点击。
168. **"SaaS 出海 SEO 落地页矩阵与漏斗底部词"确立了 S5 商业转化最高效模型**：陈攀 Span 漏斗底部词（BOFU）优先原则，以及变体页/对比页/功能页/工具页/模板页 5 维拓扑。
169. **"通过 vercel.app 子域名挖掘新词新需求"提供了 S1 逆向选品雷达**：Similarweb 过滤 Vercel 新发现自然落地页，先人一步捕获草根爆火工具与新词。
170. **"4572 个未注册 3 字母 .ai 域名数据库"扩充了 S7 顶级资产库**：为出海 AI 产品提供稀缺短域名命名与品牌选址支撑。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第51批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
