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
  { id: '[2025-07-31-1357]成功率有多大其实不看我看你自己看你自己有多努力', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '成功率第一性原理：看准方向极速走出新手村与带方向的自驱努力心法', report: '知识流程/文章分析/成功率第一性原理与带方向的自驱努力心法.md' },
  { id: '[2025-08-02-1036]哥飞在谷歌办公室的分享AI时代站长如何在谷歌掘金', stage: 'S0_认知与心态', difficulty: 2, minutes: 15, pacer: 'C', summary: '谷歌办公室闭门分享：站长与谷歌共赢第一性原理/摒弃AI批量垃圾页与做精品页模型', report: '知识流程/文章分析/谷歌官方闭门分享与告别AI批量垃圾页做精品页模型.md' },
  { id: '[2025-08-04-0830]水往低处流从都江堰学到的流量哲学', stage: 'S0_认知与心态', difficulty: 3, minutes: 18, pacer: 'C', summary: '流量第一性原理：都江堰治水哲学/阻抗反比分配与流量流向变现效率最高处模型', report: '知识流程/文章分析/都江堰治水哲学与流量流向变现效率最高处模型.md' },
  { id: '[2025-08-05-0945]老婆本也是靠网站赚到的', stage: 'S0_认知与心态', difficulty: 2, minutes: 10, pacer: 'C', summary: '哥飞做站史与非零和博弈模型：坚守正反馈模式/打破教会徒弟饿死师傅与无限游戏心法', report: '知识流程/文章分析/哥飞做站史与打破留一手非零和博弈认知模型.md' },
  { id: '[2025-08-08-0828]GPT5所有信息都在这了', stage: 'S7_工具与资源', difficulty: 2, minutes: 20, pacer: 'R', summary: 'GPT-5发布全景评测：降价增效/ResponsesAPI原生MCP/Verbosity控制与VibeCoding实测', report: '知识流程/文章分析/GPT5发布全景评测与原生MCP及Verbosity调用参考.md' },
  { id: '[2025-08-10-1002]沉浸式翻译真的泄露隐私吗', stage: 'S8_避坑警示', difficulty: 2, minutes: 14, pacer: 'W', summary: '沉浸式翻译隐私风波技术复盘：快照分享泄露根因与防爬虫收录5重安全SOP', report: '知识流程/文章分析/沉浸式翻译隐私风波复盘与快照防抓取5重安全SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第90批（2025-07-31 ~ 2025-08-10，6 篇）

361. **"成功率有多大其实看你自己有多努力"建构了 S0 自驱模型**：成功率取决于主观能动性与有效时间注入，6 个月学员下班奋战至凌晨 3 点收入超主业离职，践行带方向的矢量努力。
362. **"哥飞在谷歌办公室的分享"确立了 S0/S3 官方共赢与精品页范式**：站长交付好产品替 Google 解决搜索意图，Crawl Budget 爬虫预算决定批量生成必遭清零，一周打磨 1~2 个高质量精品页。
363. **"水往低处流从都江堰学到的流量哲学"贡献了 S0/S6 流量第一性原理**：电路阻抗反比分配与都江堰顺水哲学，流量永远流向变现效率最高处（高客单价/低阻力赋予最高竞价出价权，日耗 $5000 放量）。
364. **"老婆本也是靠网站赚到的"升华了 S0 无限游戏胸怀**：2012 卖站赚彩礼，反思放弃正反馈追逐时髦 App 弯路，彻底打破教会徒弟饿死师傅的狭隘零和博弈。
365. **"GPT-5 发布全景评测"提供了 S7/AI 前沿武器**：全面降价增效，Responses API 原生集成 MCP 与 Web Search，verbosity 冗长度精细控制与 Vibe Coding 视觉跃迁。
366. **"沉浸式翻译隐私风波技术复盘"补齐了 S8 防御性 SEO 安全 SOP**：快照分享未设防遭爬虫收录引发公关危机，确立 robots.txt 封禁 + noindex 强约束 + CSR 渲染等 5 重安全防御 SOP。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第90批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
