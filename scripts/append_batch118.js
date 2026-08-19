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
  { id: '[2026-08-08-1506]从字节离职后空弦的新站做到月入万刀', stage: 'S0_认知与心态', difficulty: 2, minutes: 26, pacer: 'C', summary: '字节离职月入万刀复盘：空弦节点链接资产沉淀/横向纵向调研与客服连接模型', report: '知识流程/文章分析/字节离职空弦新站月入万刀与节点链接资产沉淀模型.md' },
  { id: '[2026-08-09-1637]1300个精准UV一单没出Niko改完网站后做到月入千刀', stage: 'S6_变现与商业化', difficulty: 2, minutes: 28, pacer: 'P', summary: '1300精准UV零出单排查SOP：Niko转化漏斗基准/GoogleOneTap与扣积分Bug修复模型', report: '知识流程/文章分析/1300精准UV零出单排查与转化漏斗调优SOP.md' },
  { id: '[2026-08-10-1852]从技术高管到AI出海Leo带着小团队重新学产品SEO和投放', stage: 'S0_认知与心态', difficulty: 2, minutes: 28, pacer: 'C', summary: '技术高管转AI出海复盘：Leo带团队Web优先验证/SEO-SEM流量组合与老站功能复用模型', report: '知识流程/文章分析/技术高管转型Web优先与老站功能复用增长模型.md' },
  { id: '[2026-08-11-1409]两个项目做到10倍增长Ben讲怎么提高产品成功率', stage: 'S0_认知与心态', difficulty: 2, minutes: 28, pacer: 'C', summary: '两个项目10倍增长复盘：Ben提高产品成功率/亚马逊逆向工作法与用户共创模型', report: '知识流程/文章分析/两个项目10倍增长与逆向工作法产品成功率模型.md' },
  { id: '[2026-08-12-1835]出海20多年Rick讲创业团队不同阶段该招什么人', stage: 'S0_认知与心态', difficulty: 2, minutes: 28, pacer: 'C', summary: '出海20年创业团队人才模型：Rick三阶段组织演进/自驱特种兵与护城河配置', report: '知识流程/文章分析/出海20年创业团队三阶段组织与人才演进模型.md' },
  { id: '[2026-08-13-0006]刚刚DeepSeekV4Pro正式版发布', stage: 'S7_工具与资源', difficulty: 1, minutes: 5, pacer: 'C', summary: 'DeepSeek V4 Pro 正式版发布：增强 Agent 能力支持 Responses API 与 Codex 接入', report: '' },
  { id: '[2026-08-15-1608]Sora2中国首测OpenAI这次真成了', stage: 'S7_工具与资源', difficulty: 1, minutes: 5, pacer: 'C', summary: 'Sora 2 中国首测资讯与技术演进标记', report: '' },
  { id: '[2026-08-15-1626]工具出海全球收付款的流程', stage: 'S7_收款与合规', difficulty: 1, minutes: 5, pacer: 'P', summary: '工具出海全球收付款流程与合规实务指南', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第118批（2026-08-08 ~ 2026-08-15，8 篇，全项目大收官！）

502. **"从字节离职后空弦的新站做到月入万刀"沉淀了 S0 节点链接资产模型**：旧站流量 ➔ 候补页收邮箱 ➔ Reddit 保讨论 ➔ 新站未开发锁定 50+ 种子客户，纵横调研与客服退款变高客单。
503. **"1300 个精准 UV 一单没出 Niko 改完网站月入千刀"建构了 S6 漏斗排查 SOP**：注册 40%~60% / 付费 0.1%~0.5% 基准，Google One Tap 注册率翻倍至 40%，修扣积分 Bug 与即时客服促成近 $600 年费大单。
504. **"从技术高管到 AI 出海 Leo 带团队重学产品投放"系统化了 S0 Web 优先与老站复用模型**：管验证成本，纯 Web 极速验证全闭环避开 App 泥潭，SEO+SEM+社媒组合拳，优先在老站内复用域名权重。
505. **"两个项目做到 10 倍增长 Ben 讲提高成功率"沉淀了 S0 逆向工作法与共创模型**：先看够并亲手用透竞品，亚马逊逆向工作法 (先写成果再倒推)，死磕 4 步最短路径，3~5 个真实客户深度共创。
506. **"出海 20 多年 Rick 讲团队不同阶段招什么人"系统化了 S0 三阶段人才演进模型**：MVP 阶段 (2~3人自驱特种兵+设反方)，PMF 阶段 (5~10人/30%定义问题/文档沉淀)，护城河阶段 (15~30人/防大公司病)。
507. **"刚刚 DeepSeek V4 Pro 正式版发布"标记为 S7 工具与资源**：增强 Agent 能力支持 Responses API 与 Codex 接入。
508. **"Sora 2 中国首测 OpenAI 这次真成了"标记为 S7 工具与资源**：Sora 2 首测技术演进快讯。
509. **"工具出海全球收付款的流程"标记为 S7 收款与合规**：出海收付款流程与合规实操。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第118批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
