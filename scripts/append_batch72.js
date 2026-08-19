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
  { id: '[2025-02-20-1931]DeepSeek如何解读3月1日起人在内地就可以办理港澳银行卡了', stage: 'S7_收款与合规', difficulty: 2, minutes: 16, pacer: 'R', summary: '3000字DeepSeek解读港澳银行内地发卡新规：境内公民仅限外币卡/借记卡报告制与合规参考', report: '知识流程/文章分析/DeepSeek解读港澳银行内地发卡新规与合规参考.md' },
  { id: '[2025-02-22-2029]案例演示如何分析关键词如何对比网站如何推断排前面的网站能够拿到排名的原因', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: '案例演示：如何逆向分析竞品排位原因及BlockBlastSolver自创新词绑定品牌词SOP', report: '知识流程/文章分析/竞品SEO逆向推导与BlockBlast自创需求词品牌绑定SOP.md' },
  { id: '[2025-02-25-2000]哥飞聊案例9天新增183万访问量的DeepSeek套壳', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '问小白9天新增183万访问量：DeepSeek官网拥堵下的溢出流量捕获与免登录口碑裂变', report: '知识流程/文章分析/问小白9天新增183万访问与DeepSeek溢出流量实证.md' },
  { id: '[2025-02-27-1204]一天40美金一年就是10万人民币关于自动化或者半自动化赚钱的小生意模式的思考', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: '1800字自动化被动小生意思考：双重魔法/日入$40刀年入10万RMB与避开两重陷阱', report: '知识流程/文章分析/日入40美元年入10万RMB自动化小生意思考.md' },
  { id: '[2025-02-28-2205]老手可以去做难而正确的事情新手只需要去追热点追新词就行', stage: 'S0_认知与心态', difficulty: 2, minutes: 14, pacer: 'C', summary: '新手追新词 vs 老手做难事：出海二阶进化分水岭与外链-权重-流量三阶段规律', report: '知识流程/文章分析/新手追新词与老手做难事的出海二阶进化模型.md' },
  { id: '[2025-03-01-2226]5500字长文AI出海一年简单回顾从新手到养得起20人团队', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '历史长文回顾与damo团队流量翻倍感悟', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第72批（2025-02-20 ~ 2025-03-01，6 篇）

269. **"港澳银行内地发卡新规法理解读"提供了 S7 合规基准**：2025.3.1 生效，境内公民仅限办理外币卡，借记卡 5 日事后报告制与对公双币支持。
270. **"竞品 SEO 逆向推导与自创需求词绑定品牌"贡献了 S1/S5 顶级操盘 SOP**：快照还原+趋势对比+社媒溯源三步法；BlockBlastSolver 预判痛点提前建站并造词推爆，促成 Google 绑定为品牌词霸屏。
271. **"问小白 9 天 183 万访问与 DeepSeek 溢出流量"丰富了 S1/S2 爆发模式**：超级官方服务拥堵挤兑，免登录开源镜像承接海啸溢出流，全网自来水口碑裂变。
272. **"日入 40 美元年入 10 万 RMB 自动化小生意"构建了 S0 被动资产心智**：时间复利与地理套利双重魔法，日入 $40 达成 10 万年薪副业，坚决避开肉身时间与重资产学费陷阱。
273. **"新手追新词 vs 老手做难事"确立了 S0/S3 二阶战略分水岭**：新手短视追新词 3~5 天拿 GSC 正反馈；老手按“外链先行 $\rightarrow$ 权重攀升 $\rightarrow$ 流量爆发”规律攻坚高 KD 长青大赛道。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第72批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
