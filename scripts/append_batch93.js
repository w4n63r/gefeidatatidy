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
  { id: '[2025-09-02-2337]Web出海赚钱这件事好就好在团队可以做个人也可以做', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: 'Web出海组织包容性模型：团队矩阵与个人单兵双轨并进/AI编程细节把控心法', report: '知识流程/文章分析/Web出海组织包容性与单兵全栈能力模型.md' },
  { id: '[2025-09-04-0000]2025年四五六七4个月新词新站比赛结果揭晓', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '2025年4个月新词新站大赛结果揭晓与数据榜单通告', report: '' },
  { id: '[2025-09-06-1008]Web出海赚钱这件事好就好在有钱有有钱的玩法没钱有没钱的玩法', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: 'Web出海资本与时间双轨模型：没钱搞SEO低成本破冰/有钱搞SEM买量加速测品飞轮', report: '知识流程/文章分析/Web出海资本与时间双轨模型与SEM测品飞轮.md' },
  { id: '[2025-09-07-2314]小游戏站赚美元攻略第1篇从什么是小游戏站说起3600字', stage: 'S6_变现与商业化', difficulty: 3, minutes: 25, pacer: 'C', summary: '小游戏站赚美金攻略第1篇：iframe生态共赢机制/4大产品形态与合二为一终极架构', report: '知识流程/文章分析/小游戏站赚美金全景第1篇与合二为一终极架构.md' },
  { id: '[2025-09-09-0001]哥飞SEO教程以Canvacomsizes页面为例说明如何做内页拿流量', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: 'Canva内页做词体系拆解：/sizes/设计尺寸结构化专题页与工业化内容生产流水线SOP', report: '知识流程/文章分析/Canva内页做词体系与结构化尺寸专题页生产线SOP.md' },
  { id: '[2025-09-10-1221]别学这是错误的品牌升级案例', stage: 'S8_避坑警示', difficulty: 3, minutes: 18, pacer: 'W', summary: '品牌与域名双换避坑警示：Turbo.ai反面教材/破除301迷信与12步平滑迁移SOP', report: '知识流程/文章分析/品牌升级与域名迁移12步防雪崩安全SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第93批（2025-09-02 ~ 2025-09-10，6 篇）

378. **"Web 出海团队可以做个人也可以做"确立了 S0 单兵模型**：组织弹性包容，懂基础编程才能指挥 AI 抠紧 On-Page 细节，单兵省下工资即纯利润。
379. **"Web 出海有钱有有钱的玩法没钱有没钱的玩法"丰富了 S0/S5 资本双轨策略**：个人没钱搞 SEO 零成本试错，团队有钱上线次日投 Google Search Ads 极速测转化漏斗并开启放量飞轮。
380. **"小游戏站赚美元攻略第 1 篇"奠定了 S6 游戏站商业总纲**：外围 AdSense 变现与超高停留时长暴利高 RPM，iframe 共赢机制，4 大形态与"合二为一"终极架构（标杆 geometry-lite 140 万月访）。
381. **"以 Canva.com/sizes/ 为例做内页拿流量"补充了 S3 结构化专题页 SOP**：参数化尺寸需求，结构化表格 + 单位切换（px/cm） + 场景说明，工业化流水线水磨做词。
382. **"别学这是错误的品牌升级案例"贡献了 S8 域名迁移 12 步 SOP**：Turbo.ai 一刀切 301 导致新老品牌双向失联惨案，破除 301 即时转移迷信，确立 12 步平滑过渡安全规范。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第93批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
