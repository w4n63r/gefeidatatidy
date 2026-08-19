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
  { id: '[2026-07-12-2054]一个开源社媒工具两年做到百万ARR免费代码怎么变成云服务收入', stage: 'S6_变现与商业化', difficulty: 2, minutes: 22, pacer: 'C', summary: '开源工具两年百万ARR：Postiz开源做信任与官方云托管省运维SaaS变现模型', report: '知识流程/文章分析/Postiz开源社媒工具两年百万ARR云托管变现模型.md' },
  { id: '[2026-07-13-2015]网页截图这个小需求也能做到月入25万美元', stage: 'S1_需求与关键词', difficulty: 2, minutes: 18, pacer: 'C', summary: '网页截图API月入2.5万刀：ScreenshotOne极窄真痛点/免养浏览器集群与B2B订阅模型', report: '知识流程/文章分析/网页截图API月入2.5万刀复盘与开发者基础设施模型.md' },
  { id: '[2026-07-14-2037]一个免费插件做到五位数月收入解决的是ChatGPT用户的一个小需求', stage: 'S1_需求与关键词', difficulty: 2, minutes: 20, pacer: 'C', summary: 'ChatGPT插件五位数月入复盘：Superpower寄生式痛点增强/免费前置与35万Newsletter双轨变现', report: '知识流程/文章分析/ChatGPT插件五位数月入与宿主生态寄生变现模型.md' },
  { id: '[2026-07-15-2140]邮件越堆越来越多他做了个整理工具月入超过1万美元', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'C', summary: '邮件整理工具月入万刀复盘：InboxZero原生工作流增强/代码开源构建隐私信任模型', report: '知识流程/文章分析/InboxZero邮件整理工具月入万刀与原生工作流模型.md' },
  { id: '[2026-07-16-2010]群友亲测过审有用我把这个AdSense审计Skill分享出来', stage: 'S6_变现与商业化', difficulty: 2, minutes: 16, pacer: 'P', summary: 'AdSense审计Skill过审实战：@adsense-site-auditor自动化体检/拒审排查与逐项修复SOP', report: '知识流程/文章分析/AdSense审计Skill自动化体检与逐项过审SOP.md' },
  { id: '[2026-07-17-1954]03年小伙一年做30多个站小羊在深圳分享的成事心法', stage: 'S0_认知与心态', difficulty: 2, minutes: 24, pacer: 'C', summary: '03年小伙一年30站成事心法：小羊深圳分享/新词做小词/站群养鱼与转化漏斗模型', report: '知识流程/文章分析/小羊一年30站成事心法与站群养鱼模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第114批（2026-07-12 ~ 2026-07-17，6 篇）

478. **"一个开源社媒工具两年做到百万 ARR"沉淀了 S6 开源云托管变现模型**：Postiz 130 万 ARR，自托管给信任，官方云服务免除 Redis/S3 运维与接口跟进，版本更新天然公关传播。
479. **"网页截图这个小需求做到月入 2.5 万美元"系统化了 S1/S6 开发者 API 模型**：ScreenshotOne 800+ 客户，把需求做窄，把浏览器集群/弹窗过滤/失败重试做透，用量阶梯计费。
480. **"一个免费插件做到五位数月收入"沉淀了 S1/S6 寄生式工作流增强模型**：Superpower ChatGPT 贴着原生界面加文件夹与提示词，9 个月免费沉淀 15 万周活，重度订阅 + 35 万 Newsletter 赞助。
481. **"邮件越堆越多他做了个整理工具"系统化了 S1/S6 原生增强与隐私信任模型**：Inbox Zero 不做新客户端，挂载 Gmail 旁边提供分类/退订/拟草稿，代码开源打破敏感授权顾虑，月入过万美金。
482. **"我把这个 AdSense 审计 Skill 分享出来"沉淀了 S6/S7 自动化合规体检 SOP**：@adsense-site-auditor 逐项覆盖 ADS-* 检查项 (连通性/四件套/薄内容/死链/拒审映射)，联动 AI 修复极速过审。
483. **"03 年小伙一年做 30 多个站成事心法"系统化了 S0 实践论与养鱼模型**：先上站别一直分析，新词里做小词 (月入万刀)，堆量如养鱼重点培育，外链看 Bing 收录，打通 5 步转化漏斗。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第114批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
