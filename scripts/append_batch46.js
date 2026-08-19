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
  { id: '[2024-05-22-2338]哥飞推荐可一键部署到Vercel的开源AI导航网站', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'R', summary: '开源AI导航站tap4-ai-webui：Vercel一键部署与新词详情页流量逻辑', report: '知识流程/文章分析/开源AI导航站tap4-ai-webui与新词收录打法.md' },
  { id: '[2024-05-26-1749]10分钟内连续有5笔99美元也不知道是不是捅到了精准流量窝了', stage: 'S6_变现与商业化', difficulty: 1, minutes: 8, pacer: 'C', summary: '1.5%访客付费率与千UV测算模型：10分钟5笔9.9刀背后的转化算式', report: '知识流程/文章分析/1.5%访客付费率与千UV转化测算模型.md' },
  { id: '[2024-05-29-2335]如何使用哥飞公众号看看真实读者的真实行动', stage: 'S0_认知与心态', difficulty: 1, minutes: 10, pacer: 'E', summary: '真实读者出海行动复盘：电商运营跨界增长公式与文科生零基础手搓做站', report: '知识流程/文章分析/真实读者做站行动复盘与文科生手搓实践.md' },
  { id: '[2024-05-30-1542]周四下午的哥飞碎碎念', stage: 'S6_变现与商业化', difficulty: 1, minutes: 6, pacer: 'C', summary: '全球流量分层变现与定价心法：欧美直接付费/低价国赚广告与裂变/克制免费额度', report: '知识流程/文章分析/全球流量分层变现与克制免费额度.md' },
  { id: '[2024-06-01-0039]5月结束了哥飞的朋友们收获都不错', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'P', summary: '5月新词比赛复盘与ChatLLM模板思维：可插拔大模型架构将边际建站成本归零', report: '知识流程/文章分析/5月新词比赛复盘与ChatLLM模板思维.md' },
  { id: '[2024-06-02-0746]哥飞的朋友们线下聚会0602北京场分享嘉宾Clara的出海赚美元经验', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'E', summary: 'Clara副业做站收入超大厂薪水实证：兼职上站复利与当月UV三级跳', report: '知识流程/文章分析/Clara副业做站收入超大厂薪水实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第46批（2024-05-22 ~ 2024-06-02，6 篇）

144. **"开源导航站 tap4-ai-webui"丰富了 S2 极速上线资产库**：阐明了导航站详情页借力新产品新词截流的底层逻辑。
145. **"1.5% 访客付费率与千 UV 模型"精细化了 S6 收益逆向测算**：1000 UV * 1.5% * $9.9 = 日入 $140（月入 $4200），确立了精准搜索流量的高价值定位。
146. **"全球流量分层变现与克制免费额度"完善了 S6 商业化策略**：欧美直接付费 + 低价国广告裂变 + 严控 1-3 次免费试用防自噬。
147. **"ChatLLM 模板化工程思维"推进了 S2 工业化 AI 工厂建设**：将可插拔大模型架构与组件解耦，边际开发成本降至 10 分钟。
148. **"Clara 业余做站收入超大厂薪水"提供了 S0 极具代表性的副业跃迁实证**：展示了当月 UV 三级跳（1.1K -> 4K -> 11.2K）与兼职复利。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第46批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
