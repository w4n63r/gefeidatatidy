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
  { id: '[2026-06-04-1841]一个Reddit版主如何摧毁过亿品牌分享Codesmith的故事及营销启示', stage: 'S8_避坑警示', difficulty: 3, minutes: 28, pacer: 'E', summary: '4200字深度复盘：Reddit版主487天摧毁过亿品牌Codesmith与Google杠杆避坑实证', report: '知识流程/文章分析/Codesmith遭Reddit暗算与Google杠杆放大487天万字实证.md' },
  { id: '[2026-06-08-0004]2026年5月新词新站比赛结果出炉这次前几名都是新人', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'E', summary: '2026年5月新词比赛复盘：新人首月86万UV夺冠/新词入场时差与10-5-3阶梯做站实训SOP', report: '知识流程/文章分析/2026年5月新词比赛复盘与10-5-3阶梯做站实训SOP.md' },
  { id: '[2026-06-11-1626]离技术越近离商业越远', stage: 'S0_认知与心态', difficulty: 3, minutes: 26, pacer: 'C', summary: '3400字商业心力觉醒：离技术越近离商业越远/需求付费获客三门槛与4大残酷原则', report: '知识流程/文章分析/技术执念与商业闭环第一性原理及VibeCoding验证模型.md' },
  { id: '[2026-06-12-1903]deepaiorg一年流量腰斩AI工具站不能只靠老页面吃SEO红利', stage: 'S1_需求与关键词', difficulty: 2, minutes: 22, pacer: 'P', summary: 'DeepAI一年流量腰斩复盘：拒绝单一通用输入框/大词场景化拆解与垂直落地页SOP', report: '知识流程/文章分析/DeepAI一年流量腰斩复盘与大词场景化拆解SOP.md' },
  { id: '[2026-06-13-2313]Consensus的SEO骚操作当你看不懂一个决策时可能是因为对面有牛人', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 32, pacer: 'P', summary: 'Consensus顶级SEO骚操作全解密：反向Canonical+307临时跳转李代桃僵无损保排名架构', report: '知识流程/文章分析/Consensus反向Canonical与307李代桃僵保排名架构.md' },
  { id: '[2026-06-15-2109]哥飞SEO教程新词老词都可以做老词可以用长尾表达反向吃主词', stage: 'S1_需求与关键词', difficulty: 2, minutes: 25, pacer: 'P', summary: '新词老词实战指南：长尾表达反向吃主词/SERP首页信号判定与需求变现10维评估SOP', report: '知识流程/文章分析/长尾表达反向吃主词与新老词机会判定SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第109批（2026-06-04 ~ 2026-06-15，6 篇）

451. **"一个 Reddit 版主如何摧毁过亿品牌"揭示了 S8 社区公关与 Google SERP 杠杆风险**：竞品潜伏版主利用 Shadowban 与幸存者偏差 487 天摧毁 Codesmith，Google 盲信置顶导致品牌词沦陷，出海必须防御第三方阵地。
452. **"2026 年 5 月新词比赛新人包揽前五"产出了 S1 选词与 10-5-3 实训 SOP**：新人首月 86 万 UV 夺冠，新词晚几天入场依然红利巨大，盛极而衰练手破冰，10 站试错 ➔ 5 站聚焦 ➔ 3 站深耕。
453. **"离技术越近离商业越远"重构了 S0 技术人商业心智模型**：3400 字深刻反思，拒绝用写代码逃避获客销售，需求/付费/获客三道门槛，Vibe Coding 极速验证商业，4 大残酷原则。
454. **"deepai.org 一年流量腰斩"沉淀了 S1 大词场景化拆解 SOP**：单一通用输入框无法满足垂直进阶需求，大词拆解为 10+ 业务场景并建专门落地页，丰富案例与参数，GSC 漏斗精细调优。
455. **"Consensus 的 SEO 骚操作全解密"建构了 S5 李代桃僵保排名顶级架构**：首页反向 canonical 指内页 + 内页 307 临时跳首页，规避 301 丢失 URL 行为履历的阵痛期，利用爬虫内容继承机制实现零损失无损改版。
456. **"长尾表达反向吃主词"系统化了 S1 选词与做词战术 SOP**：不看 KD 看 SERP 独立站首页与外链数，大厂只做主词 A B C，个人用长尾表达 B C A 建站做透并反向吞噬主词，Similarweb 查 Stripe 出站验证变现。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第109批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
