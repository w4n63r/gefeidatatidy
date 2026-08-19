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
  { id: '[2024-11-10-0906]解答一下为什么最近哥飞社群里学员拿到的成绩被人质疑', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '为什么学员成绩被同行质疑：传统文科SEO vs 全栈科学修仙SEO降维打击', report: '知识流程/文章分析/全栈开发SEO降维打击与科学修仙模型.md' },
  { id: '[2024-11-11-1012]不好意思日入200美金的网站已经翻倍到400美金了', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '日入翻倍至$400实证与短期热点思辨：为什么新人必须大胆蹭热点磨刀', report: '知识流程/文章分析/日入翻倍至400刀实证与短期热点思辨.md' },
  { id: '[2024-11-12-1246]哥飞实操教学如何半小时上线一个小游戏网站', stage: 'S2_建站与开发', difficulty: 2, minutes: 16, pacer: 'P', summary: '3100字保姆级实操：30分钟极速上线出海小游戏站/双文件iframe架构与CF严格SSL避坑', report: '知识流程/文章分析/30分钟极速上线出海小游戏站保姆级SOP.md' },
  { id: '[2024-11-13-2140]刘小排5分钟做个网站人人都能学会', stage: 'S2_建站与开发', difficulty: 2, minutes: 18, pacer: 'P', summary: '刘小排4800字：Bolt.new 5分钟极速做站SOP/标准Prompt语义与付费测试选品', report: '知识流程/文章分析/Bolt极速做站SOP与标准Prompt语义.md' },
  { id: '[2024-11-14-1853]你自己做十个八个日入400美元的网站不香吗收学费多慢', stage: 'S0_认知与心态', difficulty: 2, minutes: 15, pacer: 'C', summary: '2400字回应为什么教人出海做站：学员蜂群互哺/10人团队矩阵/填补国内SEO断层', report: '知识流程/文章分析/知识社群互哺飞轮与出海人才生态战略.md' },
  { id: '[2024-11-16-2220]哥飞SEO教程如何通过谷歌趋势推断一个关键词搜索量', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '谷歌趋势反推绝对搜索量SOP：GPTs基准锚点/倍率折算法与突发变量捕捉', report: '知识流程/文章分析/谷歌趋势反推绝对搜索量SOP与锚点基准法.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第60批（2024-11-10 ~ 2024-11-16，6 篇）

209. **"全栈开发 SEO 降维打击与科学修仙"重构了 S0/S3 技术 SEO 壁垒**：传统文科 SEO 纯堆文章 vs 全栈开发 SEO 在架构、DOM 与交互层面的工程级降维打击。
210. **"日入翻倍至 $400 与短期热点思辨"确立了 S0 新手蹭热点磨刀模型**：通过蹭热点极速打磨做站肌肉记忆，配合外链与内页防守推入首页。
211. **"30 分钟极速上线出海小游戏站"贡献了 S2 纯浏览器端建站 SOP**：GitHub Web + Claude 提示词 + Vercel 部署，双文件 iframe 架构与 Cloudflare Full (strict) SSL 避坑。
212. **"刘小排 Bolt.new 5 分钟做站 SOP"提炼了 S2 语义 Prompt 规范**：header/hero/features 等 8 大标准语义词消除歧义，锁定付费测试（MBTI/心理测评）高转化赛道。
213. **"知识社群互哺飞轮与生态战略"深化了 S0 团队组织演进认知**：10 人全职做站自造血，学员蜂群前线探索反哺核心认知，填补国内 SEO 断层。
214. **"谷歌趋势反推绝对搜索量与锚点基准法"贡献了 S1 搜索量量化 SOP**：以 GPTs (5K/天) 为标准参照物，通过 Trends 倍率折算绝对搜索量并捕获异常突发变量。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第60批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
