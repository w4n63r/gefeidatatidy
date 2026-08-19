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
  { id: '[2025-11-07-1542]10月全球AI网站最新排行榜海外国内出海排名', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'R', summary: '2025年10月全球AI网站榜单：Sora暴涨94%入围TOP16与Perplexity浏览器分销增长参考', report: '知识流程/文章分析/2025年10月全球AI网站榜单与Sora及Perplexity增长解析.md' },
  { id: '[2025-11-12-0001]前两名共100万PV10月新词新站比赛结果出炉个个都很强', stage: 'S1_需求与关键词', difficulty: 3, minutes: 22, pacer: 'E', summary: '10月新词新站比赛复盘：前两名破百万PV/AI视频与游戏站领跑/跳出率70%红线实证', report: '知识流程/文章分析/10月新词新站比赛复盘与高胜率品类及70趴跳出率红线实证.md' },
  { id: '[2025-11-14-2314]入群四个月实现月入万刀底气从哪来', stage: 'S0_认知与心态', difficulty: 3, minutes: 24, pacer: 'C', summary: '入群4个月月入万刀复盘：万刀逆向数学拆解/算法惩罚辨析与带记忆重生做站心法', report: '知识流程/文章分析/入群4个月月入万刀复盘与带记忆重生做站心法.md' },
  { id: '[2025-11-17-2326]哥飞SEO教程别再继续做博客页了正确的做法是用户要什么你就做什么页面', stage: 'S3_SEO与流量入门', difficulty: 3, minutes: 25, pacer: 'P', summary: '按需做页实操教程：SERP与AI双轨逆向意图法/badtimesimulator月搜55万长青词实战', report: '知识流程/文章分析/按需做页实战SOP与意图逆向及10年长青词挖掘模型.md' },
  { id: '[2025-11-18-2158]Cloudflare瘫痪全球一半以上网站都挂了大家今晚可以早点休息了', stage: 'S8_避坑警示', difficulty: 1, minutes: 1, pacer: 'R', summary: 'Cloudflare全球瘫痪突发快讯', report: '' },
  { id: '[2025-11-19-1004]昨晚Cloudflare的惊天故障原因竟是一条没写全的SQL引发的蝴蝶效应', stage: 'S8_避坑警示', difficulty: 3, minutes: 22, pacer: 'W', summary: 'Cloudflare全球瘫痪故障深度复盘：未限定SQL蝴蝶效应与系统架构5大高可用避坑SOP', report: '知识流程/文章分析/Cloudflare全球瘫痪故障复盘与架构5大高可用避坑SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第98批（2025-11-07 ~ 2025-11-19，6 篇）

398. **"10 月全球 AI 网站最新排行榜"更新了 S1 视频与分销情报**：Sora 暴涨 94% 杀入 TOP 16，Perplexity 凭 AI 浏览器与 Affiliate 裂变增 20%+，RunningHub 与 Hakko AI 新晋上榜。
399. **"10 月新词新站比赛结果出炉"提供了 S1/S3 体验红线实证**：前两名破 100 万 PV，AI 视频（50%+）与小游戏领跑，确立 70% 跳出率生死线（标杆站跳出率 28% + 23 分钟停留）。
400. **"入群四个月实现月入万刀底气从哪来"建构了 S0 万刀数学与重生模型**：月入万刀逆向数学拆解（日搜 1 万词有上万个），带记忆重生心法（站点被罚立即换域名重新来，代码经验持续复利），断崖跌零与自然衰退辨析。
401. **"别再继续做博客页了：用户要什么就做什么页面"系统化了 S3 按需做页实战**：页面意图全景矩阵，Google SERP + AI 双轨逆向陌生意图 SOP，挖掘 bad time simulator 10 年 55 万月搜长青小游戏做站养老实证。
402. **"昨晚 Cloudflare 惊天故障原因分析"贡献了 S8 高可用架构 5 大 SOP**：未限定 SQL 导致表元数据翻倍突破 Rust 200 特征硬限制崩溃，确立防御性降级、配置校验、显式 SQL 与全局熔断 Kill Switch 规范。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第98批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
