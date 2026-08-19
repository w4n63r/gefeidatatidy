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
  { id: '[2025-02-03-2108]一手实测OpenAIDeepResearch', stage: 'S7_工具与资源', difficulty: 2, minutes: 16, pacer: 'R', summary: '3000字OpenAI Deep Research实测：微调o3架构/HLE基准与长研报Agent局限', report: '知识流程/文章分析/OpenAIDeepResearch深度实测微调o3架构与局限.md' },
  { id: '[2025-02-06-1902]来看看你目前收入属于哪个等级如果想实现这个收入需要做几个网站', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'P', summary: 'SEO收入10级天梯与目标拆解计算器：月入$1万拆解为2个KD50站与外链ROI', report: '知识流程/文章分析/SEO收入10级天梯与目标拆解计算器SOP.md' },
  { id: '[2025-02-07-1144]网页千次访问81美金惊到我了', stage: 'S6_变现与商业化', difficulty: 2, minutes: 6, pacer: 'E', summary: '千次访问$81美元极限Page RPM实证：高净值人群每刷新一次赚6毛与选词启示', report: '知识流程/文章分析/千次访问81美元极限PageRPM实证与高净值选词.md' },
  { id: '[2025-02-08-2326]从深圳去香港不去网点柜台最快开通汇丰银行账号全流程攻略分享', stage: 'S7_收款与合规', difficulty: 2, minutes: 12, pacer: 'P', summary: '赴港免柜台开通汇丰One与中银香港SOP：屯门商场连WiFi/12367记录与避坑', report: '知识流程/文章分析/免柜台赴港开通汇丰One与中银香港全流程SOP.md' },
  { id: '[2025-02-09-2157]一个悲伤的故事日5K访客零付费', stage: 'S8_避坑警示', difficulty: 2, minutes: 6, pacer: 'W', summary: '避坑：日5K访客消耗$1500美金API零付费惨痛教训与低价值国家流量防御', report: '知识流程/文章分析/日5K访客消耗1500美金API零付费避坑警示.md' },
  { id: '[2025-02-11-2343]哥飞的朋友们2025年1月新词新站比赛结果出炉第一名拿下225K的PV', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '2025年1月新词新站56站百万PV复盘：AI站流量效率称霸与5大品类数据拆解', report: '知识流程/文章分析/2025年1月新词新站56站百万PV复盘与5大品类拆解.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第70批（2025-02-03 ~ 2025-02-11，6 篇）

257. **"OpenAI Deep Research 深度实测"提供了 S7 前沿 Agent 参考**：微调 o3 架构深度搜索与推理双轮驱动，长研报 Agent 局限与出海工具站机遇。
258. **"SEO 收入 10 级天梯与目标拆解计算器"贡献了 S6 科学规划模型**：月入 $10K 拆解为 2 个 KD50 站点，日搜 7.1K 词攻入 Top 3 配 84 个外链域名，ROI 达 5.23 倍。
259. **"千次访问 $81 美元极限 Page RPM"实证了 S6 受众价值套利**：欧美垂直高客单人群吸引高竞价广告主，每刷新一次赚 0.6 元，低流量即可达成高收入。
260. **"免柜台赴港开通汇丰 One 与中银香港 SOP"沉淀了 S7 收款合规基建**：深圳湾至屯门商场连 WiFi，12367 记录+信用卡账单，永久免管理费汇丰 One 秒批。
261. **"日 5K 访客烧 $1500 刀 API 零付费"构筑了 S8/S6 财务风控警示**：Tier-3 发展中国家低价值流量陷阱，昂贵 API 必须设置地域限流与每日消费熔断。
262. **"2025 年 1 月新词新站 56 站百万 PV 复盘"沉淀了 S1 品类效率大盘**：AI 工具站（9 站独揽 55% UV）流量效率全面称霸，小游戏数量多，导航站边缘化。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第70批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
