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
  { id: '[2026-08-01-1354]哥飞的朋友们2025年度前30名的网站流量都是怎么做起来的', stage: 'S0_认知与心态', difficulty: 3, minutes: 30, pacer: 'C', summary: '2025年度Top30网站流量全景复盘：人均30站/新词极速上线/矩阵长尾与高PV架构模型', report: '知识流程/文章分析/2025年度Top30网站操盘全景与高PV矩阵架构模型.md' },
  { id: '[2026-08-02-1613]Google没排名也能月入千刀蓝星空讲新站怎么找用户', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 28, pacer: 'P', summary: 'Google没排名月入千刀SOP：蓝星空Bing-IndexNow破冰/第三方高权重平台发文与3-6%高转化模型', report: '知识流程/文章分析/Google零排名新站Bing破冰与高权重发文月入千刀SOP.md' },
  { id: '[2026-08-04-1058]独立开发两年咔叽哇讲怎么低成本启动项目拿到第一批用户', stage: 'S0_认知与心态', difficulty: 2, minutes: 26, pacer: 'C', summary: '独立开发两年复盘：咔叽哇轻量工具4条件/AI长期岗位3标准与真实外链冷启动模型', report: '知识流程/文章分析/独立开发两年低成本启动与AI长期岗位模型.md' },
  { id: '[2026-08-05-1520]开5家店亏了200多万冉云靠广告投放把钱赚了回来', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 28, pacer: 'P', summary: '广告投放翻盘实操复盘：冉云线下亏200万/训练GoogleAds模型/小预算测市场与放量模型', report: '知识流程/文章分析/广告投放模型训练与小预算ROI翻盘SOP.md' },
  { id: '[2026-08-06-1342]从腾讯网易裸辞后唐亦安靠几个失败站练会了追新词', stage: 'S1_需求与关键词', difficulty: 2, minutes: 28, pacer: 'P', summary: '大厂裸辞追新词实战SOP：唐亦安失败站复盘/4维信号交叉验证与Beaks单日3万UV模型', report: '知识流程/文章分析/大厂裸辞追新词实操与4维信号交叉验证SOP.md' },
  { id: '[2026-08-07-1423]哥飞SEO教程先收集关键词再规划网站结构', stage: 'S1_需求与关键词', difficulty: 2, minutes: 22, pacer: 'P', summary: '哥飞SEO教程：先收集关键词再规划网站结构/8步规划SOP与意图分组模型', report: '知识流程/文章分析/关键词收集到网站结构规划全流程SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第117批（2026-08-01 ~ 2026-08-07，6 篇）

496. **"2025 年度前 30 名网站流量怎么做起来的"系统化了 S0 头部操盘大盘模型**：人均 20~40 站试错基石，极速追新词派 (空白静态HTML/孟健400邮箱测付费)，长尾内页高 PV 派 (Winter 22.7万UV撬动360万PV)。
497. **"Google 没排名也能月入千刀蓝星空讲找用户"沉淀了 S3 Bing 破冰与发文 SOP**：Bing Webmaster 修复基础 + IndexNow 主动秒级推送 (第 11 天破百点击)，Medium/Dev.to 痛点教程发文 (3%~6% 高转化)，杜绝重复与单一锚文本。
498. **"独立开发两年咔叽哇讲低成本启动"建构了 S0/S1 极简工具与 AI 长期岗位模型**：轻量工具 4 条件 (刚性/单一/可控/靠SEO)，给 AI 找长期稳定岗位 3 标准，500 条死外链不如 1 条带来真实用户的活外链。
499. **"开 5 家店亏 200 万冉云靠广告把钱赚回来"系统化了 S5/S6 Google Ads 模型训练 SOP**：投广告是训练机器学习模型，以购买订阅为主目标，质量得分降本 (点击率 25%/CPC 砍半)，小预算测新市场与克制放量防 CPA 崩塌。
500. **"从腾讯网易裸辞后唐亦安练会追新词"沉淀了 S1 4 维信号交叉验证 SOP**：Trends 发现 + YouTube 创作者跟进 + TikTok 裂变 + Discord 核心玩家热烈讨论，首页答核心 + 独立内页拆痛点，Beaks 游戏单日 3 万 UV 与百刀日入。
501. **"先收集关键词再规划网站结构"建构了 S1 8 步建站架构规划 SOP**：多入口收词 ➔ Ads/Trends 补搜量 ➔ 清理合并 ➔ 意图分组 (生成/修复/风格/场景) ➔ 分配页面类型 ➔ URL 清单 ➔ 砍薄页 ➔ 首批精做 5~10 页，工具意图必做功能。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第117批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
