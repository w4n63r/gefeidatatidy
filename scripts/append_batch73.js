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
  { id: '[2025-03-03-0800]一个游戏辅助小工具一年876万访问量域名还特别奇怪', stage: 'S1_需求与关键词', difficulty: 2, minutes: 8, pacer: 'E', summary: '5-letter-words年访876万工具站拆解：Wordle找词侧翼选词与精准属性词避坑SOP', report: '知识流程/文章分析/5letterwords年访876万工具站侧翼选词拆解.md' },
  { id: '[2025-03-04-2353]SEO基础哥飞跟大家聊聊HTTP协议互联网爬虫和外链', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 16, pacer: 'C', summary: '2300字SEO底层原理：HTTP协议/SSR与CSR/爬虫预算分配及GSC与Ahrefs外链差异', report: '知识流程/文章分析/HTTP协议爬虫预算与GSC外链底层认知模型.md' },
  { id: '[2025-03-05-2334]哥飞的朋友们2025年2月新词新站比赛结果出来了这次有点不太一样', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '2025年2月新词新站复盘：13天斩获55万PV与AI工具站30%终身Aff分润变现SOP', report: '知识流程/文章分析/2025年2月新词新站复盘与AI工具30分润Aff模型.md' },
  { id: '[2025-03-06-0810]实测Manus首个真干活AI中国造附50个用例拆解', stage: 'S7_工具与资源', difficulty: 2, minutes: 18, pacer: 'R', summary: '4000字实测Manus首个真干活AI：端到端云端沙盒/DOOM自动部署与50个实战用例拆解', report: '知识流程/文章分析/Manus通用Agent实测与50个落地用例拆解.md' },
  { id: '[2025-03-07-1950]2月全球AI排行榜国产AI全线暴发DeepSeek访问量破6亿', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'R', summary: '2025年2月全球AI排行榜：DeepSeek突破6亿访问/Qwen登顶出海第一与各赛道分化', report: '知识流程/文章分析/2025年2月全球AI排行榜与DeepSeek突破6亿访问.md' },
  { id: '[2025-03-09-0800]一夜之间哥飞上新闻了刚好用来测试AISEO效果怎么样', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 14, pacer: 'E', summary: '哥飞上新闻与AI SEO实测：权威媒体分发对Perplexity/Gemini知识库占领实证', report: '知识流程/文章分析/哥飞上新闻与Perplexity等AISEO实测验证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第73批（2025-03-03 ~ 2025-03-09，6 篇）

274. **"5-letter-words 年访 876 万侧翼选词拆解"丰富了 S1 避实击虚战术**：避开正面高 KD 大词（Word Finder），卡位精准规则属性词（5 letter words）注册 EMD 单页吃下千万级精准流量。
275. **"HTTP 协议、爬虫预算与 GSC 外链差异"构建了 S3 技术第一性原理**：SSR 直出内容对 SEO 的决定性优势，低质 Thin Content 导致的爬虫预算削减与降权机制，Ahrefs 与 GSC 路径独立性。
276. **"2025 年 2 月新词新站复盘与 AI 工具 30% Aff 模型"沉淀了 S1/S6 轻资产变现**：13 天斩获 55 万 PV（人均 6.44）；Pollo.ai 首充 30% + 终身续费 30% Recurring Aff 变现。
277. **"Manus 通用 Agent 实测与 50 个落地用例"提供了 S7 前沿参考**：云端沙盒 + 浏览器自主操控 + 自动部署 manus.space，端到端执行交付范式。
278. **"2025 年 2 月全球 AI 排行榜"提供了 S1 赛道宏观风向**：DeepSeek 单月突破 6.1 亿访问（达 GPT 15.7%），Qwen 登顶出海第一，生产力 Agent 崛起而虚拟陪伴降温。
279. **"哥飞上新闻与 Perplexity 等 AI SEO 实测"实证了 S5/GEO 权威借势法则**：主流媒体权威通稿分发，驱动 Perplexity、Gemini、DeepSeek 一致采信并输出确定性推荐。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第73批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
