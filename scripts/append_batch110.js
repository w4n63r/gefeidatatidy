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
  { id: '[2026-06-16-1206]独立开发进入第7年了', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: '独立开发进入第7年：从古法编程到多线程决策/AI自动化与生活自洽心法', report: '知识流程/文章分析/独立开发7年心路与AI时代个人开发者自洽模型.md' },
  { id: '[2026-06-17-1903]哥飞SEO教程不要把GSC的提示当报错提示跟预期一致就是正常现象不用处理', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 24, pacer: 'P', summary: '哥飞SEO教程：不要把GSC提示当报错/8大索引状态深度解析与4步预期排障SOP', report: '知识流程/文章分析/GSC索引状态8大提示深度解构与预期排障SOP.md' },
  { id: '[2026-06-18-1914]15岁做了个背单词网站坚持15年离开时公司估值10亿美元', stage: 'S1_需求与关键词', difficulty: 2, minutes: 25, pacer: 'E', summary: '15岁背单词网站到10亿美金估值：Quizlet 15年UGC内容网络复利与4大做站启示', report: '知识流程/文章分析/Quizlet15年从111个单词卡到10亿美金估值实证.md' },
  { id: '[2026-06-19-2255]第一波赚到钱的OPC早就不玩单人模式了', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: 'OPC模式简讯', report: '' },
  { id: '[2026-06-20-1803]从ChatGPT推荐到App付费999刀AI推荐流量已经开始带来真实订单', stage: 'S6_变现与商业化', difficulty: 2, minutes: 22, pacer: 'E', summary: 'AI推荐流量带来真实订单实证：ChatGPT推荐至99.9刀付费/Perplexity 5分钟转化与3类承接基建', report: '知识流程/文章分析/AI推荐流量直接变现与高客单转化全链路实证.md' },
  { id: '[2026-06-21-2307]Midjourney做智能硬件也许是想重拾旧梦再次证明自己', stage: 'S0_认知与心态', difficulty: 3, minutes: 35, pacer: 'C', summary: '1.38万字Midjourney传记解密：从LeapMotion体面失败到零融资年入5亿美金与4大反常识心法', report: '知识流程/文章分析/1.38万字Midjourney商业传记与零融资反常识心法.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第110批（2026-06-16 ~ 2026-06-21，6 篇）

457. **"独立开发进入第 7 年了"沉淀了 S0 个人开发者自洽模型**：完全不写代码转为多线程决策，Codex + 浏览器插件实现低人工介入自动化，从追赶焦虑走向自洽与生活平衡。
458. **"不要把 GSC 的提示当报错"系统化了 S3 GSC 索引状态排障 SOP**：预期一致即正常，8 大常见状态透视（Canonical 归集与 404 正常响应无需过度干预，已抓取未索引需加信息增量），4 步排障 SOP。
459. **"15 岁做了个背单词网站坚持 15 年到 10 亿估值"提供了 S1/S0 UGC 复利实证**：Quizlet 15 年历程，需求真极高频，从单兵工具跃迁为 UGC 学习内容复利网络，15 年专注同一主线。
460. **"从 ChatGPT 推荐到 App 付费 99.9 刀"提供了 S6/S5 AI 推荐流量变现全链路实证**：ChatGPT 推荐带来 $99.9 年费付费与积分包加购，Perplexity 5 分钟极速转化，深度博客 + 免登录工具页 + 丝滑付费页 3 类承接基建，SEO 是 GEO 基石。
461. **"Midjourney 做智能硬件 1.38 万字解密"建构了 S0 零融资超级单兵商业模型**：大卫·霍尔兹 30 年非线性积累与 Leap Motion 12 年学费，融资本质是负债，11 人极简团队年入 5 亿美金，4 大反常识产品哲学。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第110批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
