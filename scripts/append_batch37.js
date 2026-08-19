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
  { id: '[2024-02-24-1904]哥飞科普说说域名NS和DNS', stage: 'S2_建站与开发', difficulty: 1, minutes: 10, pacer: 'C', summary: '域名NS与DNS解析底层科普：Cloudflare授权/A与CNAME记录/Vercel绑定', report: '知识流程/文章分析/域名NS与DNS解析底层原理.md' },
  { id: '[2024-02-25-0004]因为今天白天有事要一早就出门所以就发个图片消息吧', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: '', summary: '出门临时简讯与图片消息（S9）', report: '' },
  { id: '[2024-02-27-1611]哥飞推荐一个开源AI贴纸生成器同时也是', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '开源AI贴纸生成器StickerBaker：Replicate生图套壳与一模型一站矩阵', report: '知识流程/文章分析/开源AI贴纸生成器与Replicate矩阵.md' },
  { id: '[2024-02-28-0918]哥飞AI出海产品如何搞流量', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 14, pacer: 'C', summary: 'AI出海搞流量7大武器库：SEO/SEM/投流/邮件/社区/PR/KOL全域模型', report: '知识流程/文章分析/AI出海搞流量七大武器库体系.md' },
  { id: '[2024-02-29-0858]今天哥飞跟大家聊聊职场话题', stage: 'S9_非学习类', difficulty: 1, minutes: 3, pacer: '', summary: '职场拒绝PUA与关心配偶随笔（S9）', report: '' },
  { id: '[2024-03-01-1754]哥飞2024年2月文章一览', stage: 'S9_非学习类', difficulty: 1, minutes: 5, pacer: '', summary: '2024年2月月度文章一览与索引汇总（S9）', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第37批（2024-02-24 ~ 2024-03-01，6 篇）

110. **"域名 NS 与 DNS 解析底层原理"夯实了 S2 建站基础网络概念**：厘清了 NS 托管 Cloudflare、A 记录与 CNAME 别名解耦机制以及 Vercel/Nginx 虚拟主机路由逻辑。
111. **"AI 出海搞流量 7 大武器库"确立为 S5 流量增长顶层框架**：系统整合 SEO、SEM、投流、邮件、社区发帖、软文公关与红人营销。
112. **"Replicate 生图套壳与一模型一站矩阵"丰富了 S2 AI 工具快速变现模式**：通过前置多语言翻译与替换模型参数批量矩阵做站。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第37批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
