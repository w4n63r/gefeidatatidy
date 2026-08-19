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
  { id: '[2025-11-21-2207]毫无预兆的Gartner给大模型开发平台排了座次', stage: 'S7_工具与资源', difficulty: 3, minutes: 22, pacer: 'R', summary: 'Gartner大模型开发平台魔力象限解析：6大硬门槛/全球4大象限格局与中国MaaS突围参考', report: '知识流程/文章分析/Gartner大模型开发平台魔力象限解析与中国MaaS突围参考.md' },
  { id: '[2025-11-22-1914]出海就要大胆定价你的定价决定了你能够抓到哪一类人群', stage: 'S6_变现与商业化', difficulty: 2, minutes: 8, pacer: 'C', summary: '出海高客单定价模型：破除低价心理藩篱/大胆定七八百美金年费与客群筛选心法', report: '知识流程/文章分析/出海高客单脱敏定价与客群筛选认知模型.md' },
  { id: '[2025-11-28-0800]2025年12月哥飞的朋友们年终分享交流会amp上站Hackathon活动议程出来了欢迎报名参加', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '2025年12月年终分享交流会与Hackathon活动议程通告', report: '' },
  { id: '[2025-12-01-1810]2025年快要过去了这一年里社群朋友们都有哪些进步有人月入万刀有人两年百万刀', stage: 'S0_认知与心态', difficulty: 3, minutes: 24, pacer: 'E', summary: '2025年终出海成长全景复盘：阶梯收入跃迁与苏谨深两年100万美金操盘实证', report: '知识流程/文章分析/2025年终出海成长全景复盘与苏谨深两年百万美金操盘实证.md' },
  { id: '[2025-12-02-2350]日入千刀是什么感觉单用户付费1700刀是什么感觉', stage: 'S6_变现与商业化', difficulty: 1, minutes: 1, pacer: 'R', summary: '单用户付费1700刀大额付费喜报短讯', report: '' },
  { id: '[2025-12-04-1557]2025年12月上站Hackathon活动奖项安排出来了', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '12月上站Hackathon比赛奖项安排通告', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第99批（2025-11-21 ~ 2025-12-04，6 篇）

403. **"Gartner 给大模型开发平台排了座次"贡献了 S7 MaaS 格局参考**：6 大硬门槛，海外三大云（领导者） vs 火山引擎/阿里/腾讯（挑战者，豆包厘时代成本），MaaS 平台管理软件工厂。
404. **"出海就要大胆定价"丰富了 S6 商业化定价模型**：破除国内低价自卑，欧美用户对生产力工具极其脱敏，大胆定七八百美金年费，定价即受众筛选器。
405. **"2025 年快要过去了社群朋友们都有哪些进步"构建了 S0 收入跃迁与苏谨深 $1M 模型**：0 到 1 破冰 $\rightarrow$ 月入千刀 $\rightarrow$ 万刀俱乐部 $\rightarrow$ 苏谨深两年 100 万美金，C 端极简工具跑通后做自助式 API 获 B 端长期收租，Discord/邮件深度闲聊撞出刚需。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第99批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
