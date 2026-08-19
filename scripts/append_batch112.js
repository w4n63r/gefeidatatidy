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
  { id: '[2026-06-28-2258]2026年哥飞的朋友们年中分享交流会深圳站议程安排', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '年中交流会议程通告', report: '' },
  { id: '[2026-06-29-2237]哥飞SEO教程KD很高的词也能做先看真实网页供应量', stage: 'S1_需求与关键词', difficulty: 2, minutes: 20, pacer: 'P', summary: '高KD词破局指南：KD与intitle真实供应量双维评估/用首页打内页与5步选词SOP', report: '知识流程/文章分析/高KD词破局指南与真实网页供应量评估SOP.md' },
  { id: '[2026-06-30-2249]一个博客工具做到月入16万美元靠的是把Pinterest流量自动化', stage: 'S6_变现与商业化', difficulty: 2, minutes: 22, pacer: 'C', summary: 'Pinterest自动化工具月入1.6万刀：BlogToPin运营痛点产品化与垂直渠道SaaS变现模型', report: '知识流程/文章分析/Pinterest自动化工具与垂直渠道SaaS变现模型.md' },
  { id: '[2026-07-01-2049]哥飞SEO教程页面已经出词了还能不能改Title和H1', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 24, pacer: 'P', summary: '哥飞SEO教程：页面出词后Title与H1微调SOP/分词优化原理解密与严禁AI大改整页', report: '知识流程/文章分析/页面出词后Title与H1微调分词优化SOP.md' },
  { id: '[2026-07-02-1914]哥飞SEO教程怎么用正在投广告的产品挖掘值得做的赚钱需求', stage: 'S1_需求与关键词', difficulty: 2, minutes: 22, pacer: 'P', summary: '逆向广告挖掘需求SOP：从Similarweb投流词到落地页交易路径拆解与Web化5步法', report: '知识流程/文章分析/逆向广告挖掘高意图赚钱需求与Web化5步SOP.md' },
  { id: '[2026-07-03-2035]一个17年写作网站做到月入26万美元靠的是强留存', stage: 'S6_变现与商业化', difficulty: 2, minutes: 18, pacer: 'C', summary: '17年写作站月入2.6万刀：750Words极简微动作与强留存订阅商业模型', report: '知识流程/文章分析/750Words极简微动作与强留存订阅商业模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第112批（2026-06-28 ~ 2026-07-03，6 篇）

467. **"KD 很高的词也能做先看真实供应量"系统化了 S1 关键词评估 5 步 SOP**：KD 看前排强度，intitle: 看真实竞争供给，大词 KD 虚低陷阱，高 KD 词用聚焦独立站首页打大站泛内页。
468. **"一个博客工具做到月入 1.6 万美元"沉淀了 S6 运营痛点产品化模型**：BlogToPin 将英文站手动制作 Pinterest 海报排期的日常痛苦封装为微型 SaaS，解决持续省时间与拿流量，月入 1.6 万美金。
469. **"页面已经出词了还能不能改 Title 和 H1"沉淀了 S3 页面调优 SOP**：出词说明方向正确严禁 AI 大改整页，极小删词优化分词 24 小时激活新词曝光，按"曝光先于点击"监控。
470. **"怎么用正在投广告的产品挖掘赚钱需求"系统化了 S1 逆向广告挖掘 5 步 SOP**：持续投流证明需求真实有账可算，Similarweb 查 Search Ads ➔ 剥离品牌词 ➔ 拆落地页交易路径 ➔ 验收入 ➔ Web 网页化截流。
471. **"一个 17 年写作网站做到月入 2.6 万美元"建构了 S6 极简微动作强留存订阅模型**：750 Words 专做每天写 750 词私人日记，Streak 打卡与历史文字沉淀，从"被搜索到"跃迁为"被记住"的日常习惯入口。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第112批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
