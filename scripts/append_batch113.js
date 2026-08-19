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
  { id: '[2026-07-04-1959]复盘一个品牌站上线半年多时怎么跑到月入万刀', stage: 'S0_认知与心态', difficulty: 2, minutes: 22, pacer: 'E', summary: '品牌站半年月入万刀复盘：SEO外链内页持续积累与克服恐惧亲自投Ads双轨实证', report: '知识流程/文章分析/品牌站半年月入万刀复盘与SEO-SEM双轨实证.md' },
  { id: '[2026-07-07-1939]650位朋友来到深圳在哥飞的朋友们2026年中分享交流会里都学到了这些', stage: 'S0_认知与心态', difficulty: 3, minutes: 40, pacer: 'C', summary: '1.34万字2026年中大会全景复盘：找词源头新体系/小语种纯血站/AI全网旅程与2026实操总纲', report: '知识流程/文章分析/2026深圳年中大会1.34万字出海实操方法论全景.md' },
  { id: '[2026-07-08-2331]一个词根一个白天175支交卷的队伍哥飞的朋友们上站Hackathon深圳站侧记', stage: 'S2_建站与开发', difficulty: 2, minutes: 28, pacer: 'P', summary: '175支战队黑客松侧记：一个词根一个白天/撞词修罗场与SEO满分后审美交互胜出SOP', report: '知识流程/文章分析/175支战队黑客松侧记与SEO满分后审美胜出SOP.md' },
  { id: '[2026-07-09-2303]在教人赚钱这件事情上我干了三年了居然口碑不错', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'C', summary: '哥飞社群三周年心路：教人赚钱的口碑本质/80%续费率与一个月无理由退款信任模型', report: '知识流程/文章分析/哥飞社群三周年心路与口碑交付退款模型.md' },
  { id: '[2026-07-10-2305]一个简历工具站做到1800万自然访问靠SEO卖出100万英镑订阅', stage: 'S1_需求与关键词', difficulty: 2, minutes: 24, pacer: 'E', summary: '简历工具站1800万访问复盘：StandOutCV三层页面矩阵/内容导向工具与100万英镑订阅实证', report: '知识流程/文章分析/简历工具站1800万访问复盘与三层SEO矩阵实证.md' },
  { id: '[2026-07-11-2242]哥飞SEO教程为什么你的工具站有页面却拿不到好排名', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 22, pacer: 'P', summary: '哥飞SEO教程：工具站有页面无排名根本病因/三合一精品单页公式与5步排查SOP', report: '知识流程/文章分析/工具站三合一单页架构与5步诊断排查SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第113批（2026-07-04 ~ 2026-07-11，6 篇）

472. **"复盘一个品牌站"沉淀了 S0/S5 品牌站冲刺万刀双轨模型**：克服未知恐惧亲自下场投 Ads，专人持续集中采买收费外链 + 扩充垂直功能内页，广告投放要趁早，外链内页不能停。
473. **"650 位朋友来到深圳"系统化了 S0/S1 2026 年中出海实战方法论总纲**：1.34 万字解密找词源头新体系 (Sitemap/推特高赞自动化)、小语种日韩纯血站、AI 深度推理与全网客户旅程教育 AI (GEO)。
474. **"175 支交卷的队伍黑客松侧记"建构了 S2 极速上站与审美决胜模型**：一个词根一个白天，大面积撞词下 SEO 性能自动分全员 100 分，胜负分水岭在点开后的 UI 审美、交互质感与痛点解决深度。
475. **"在教人赚钱这件事情上干了三年"沉淀了 S0 经验交付与退款信任模型**：以钱买时间少走弯路，超额真心交付，以赚美金为唯一正反馈，80% 续费率 + 30 天不满意全额退款倒逼极致质量。
476. **"一个简历工具站做到 1800 万自然访问"沉淀了 S1 三层 SEO 矩阵实证**：StandOut CV 100 万英镑订阅收购，高意图成交页 + 岗位细分场景页 + 信息指南文章，内容导向在线生成器导出付费。
477. **"为什么你的工具站有页面却拿不到好排名"系统化了 S3 三合一精品单页 SOP**：根治 www 介绍与 app 工具割裂分裂病，首屏即开即用工具 + 深度图文说明 + 精选案例展示，5 步诊断 Checklist。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第113批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
