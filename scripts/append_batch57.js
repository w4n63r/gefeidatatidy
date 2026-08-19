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
  { id: '[2024-10-09-0902]榜单全球最受欢迎AIGC网站排行榜丨2024年9月', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'R', summary: 'AIGCRank 2024年9月全球最受欢迎AIGC网站排行榜', report: '' },
  { id: '[2024-10-10-2225]九月新词新站比赛结果出炉第一名网站上线当月拿下217K的PV', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '9月新词新站首月21.7万PV实证：成熟赛道新词涌现实战与刻意练习飞轮', report: '知识流程/文章分析/9月新词新站首月21.7万PV实证与成熟赛道新词挖掘.md' },
  { id: '[2024-10-14-2305]既然35岁是个坎让我们学点赚钱本领来跳过这个坎吧', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '单日$616实证与垃圾站伪命题思辨：35岁程序员破局与Google算法裁判论', report: '知识流程/文章分析/单日616刀实证与垃圾站伪命题思辨.md' },
  { id: '[2024-10-15-0823]哥飞社群支持一个月内不满意全额退款啦', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '出海两大主力站型选型对比：小游戏广告站入门 vs AI工具订阅站进阶', report: '知识流程/文章分析/出海小游戏广告站与AI订阅站选型对比.md' },
  { id: '[2024-10-18-1541]哥飞SEO教程谷歌排名的真相', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'C', summary: '谷歌排名的真相：零和博弈本质/新词极速爆发与老词微量测试机制', report: '知识流程/文章分析/谷歌排名的真相与新老词流量分配模型.md' },
  { id: '[2024-10-22-0927]SEO案例分享CNN如何做到在2024年美国选举相关搜索中霸占排名', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 16, pacer: 'P', summary: 'CNN霸榜Google热点搜索的7大激进SEO策略：LiveBlog架构/日期URL/首页挂链', report: '知识流程/文章分析/CNN霸榜Google热点的7大激进SEO策略.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第57批（2024-10-09 ~ 2024-10-22，6 篇）

195. **"9 月新词新站首月 21.7 万 PV"验证了 S1 成熟赛道新词红利**：即使成熟红海赛道，叠加新参数与新场景依然会涌现零竞争长尾新词。
196. **"单日 $616 收益与垃圾站伪命题思辨"重构了 S0 价值裁判体系**：能从严苛的 Google 算法持续稳定拿流量并变现的网站，必然 100% 满足了用户搜索意图。
197. **"小游戏广告站 vs AI 工具订阅站"完善了 S0/S6 站型阶梯路径**：国内个人卡直收 AdSense 适合新手入门破冰，海外主体 + Stripe 订阅适合高客单深耕。
198. **"谷歌排名的真相与新老词机制"深化了 S3 算法本质认知**：零和博弈本质，新词真空期极速卡位 vs 老词红海微量测试逐步放量。
199. **"CNN 霸榜 2024 大选 7 大激进 SEO 策略"贡献了 S5 实时热点霸榜 SOP**：每日独立 URL、URL 嵌入日期、LiveBlogPosting 架构、日均 40+ 次微更新与首页直链。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第57批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
