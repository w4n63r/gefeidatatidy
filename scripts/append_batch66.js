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
  { id: '[2024-12-23-2210]哥飞的朋友们2024年终分享交流会办成了一场400人参加的大会', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'E', summary: '400人出海大会纪实：8位开发者转型全景/PM与奶爸破冰及出海生态飞轮', report: '知识流程/文章分析/400人出海大会纪实与8位开发者转型画像.md' },
  { id: '[2024-12-25-1808]先定一个小目标实现日入100美元', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'P', summary: '日入$100美元小目标数学逆向拆解：2万PV/4600日点击与5个中长尾词矩阵规划', report: '知识流程/文章分析/日入100美元数学逆向拆解与中长尾词矩阵规划.md' },
  { id: '[2024-12-28-0800]出海的决心耐心细心和平常心', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'C', summary: '4000字出海心力总纲：四心模型（决心/耐心/细心/平常心）与终身时间重新定价', report: '知识流程/文章分析/出海四心心力模型与终身时间重新定价哲学.md' },
  { id: '[2024-12-29-1724]老外6万美金买的域名Cursorcom一年后卖了399万美元聊聊Cursor早期的故事', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'E', summary: 'Cursor域名39.9万刀交易史与Custom Cursor插件-网站互哺变现飞轮', report: '知识流程/文章分析/Cursor域名39.9万刀交易史与CustomCursor插件互哺飞轮.md' },
  { id: '[2024-12-30-2220]因为见过所以相信因为相信所以坚定', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '出海决心与信念短图文', report: '' },
  { id: '[2024-12-31-2351]哥飞团队2024年都干了啥1到3月', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'E', summary: '3500字哥飞团队2024 Q1复盘：4大踩坑教训/SoraWebui开源与$30K MRR工具站历程', report: '知识流程/文章分析/哥飞团队2024Q1复盘与月入30KMRR工具站历程.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第66批（2024-12-23 ~ 2024-12-31，6 篇）

238. **"400 人出海大会纪实与 8 位开发者转型"展现了 S0 多元化破局生态**：AI 抹平技术门槛，字节 PM 与不懂代码奶爸依靠需求洞察与交付力超越大厂薪资。
239. **"日入 100 美元数学逆向拆解"提供了 S6/S1 目标量化模型**：$100 刀/天 $\rightarrow$ 20K PV $\rightarrow$ 4.6K 搜索点击 $\rightarrow$ 5 个 5K 日搜中长尾词矩阵规划。
240. **"出海四心心力模型与时间重新定价"确立了 S0 终身资产心法**：决心/耐心/细心/平常心模型，出海让 7x24 小时全时段产生美金资产复利。
241. **"Cursor 域名 39.9 万刀交易与 Custom Cursor 互哺飞轮"沉淀了 S1/S6 生态闭环**：官网 SEO 获客 $\rightarrow$ 引导安装插件解决留存 $\rightarrow$ 插件回流官网广告变现。
242. **"哥飞团队 2024 Q1 复盘与 $30K MRR 工具站"贡献了 S0 反脆弱实战证据**：Readweb 伪需求与 StickerShow 降权踩坑，SoraWebui 开源破局与 $30K MRR 抗脆弱增长。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第66批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
