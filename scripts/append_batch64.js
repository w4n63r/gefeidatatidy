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
  { id: '[2024-12-06-1846]案例分享年访问量2300多万的日本在线工具网站分析', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '日本年访2361万工具站onl.jp拆解：90个页面精品路线与独立子域名聚焦架构', report: '知识流程/文章分析/日本年访2361万工具站onl拆解与子域名聚焦架构.md' },
  { id: '[2024-12-07-1817]哥飞的朋友们2024年11月新词新站比赛结果出炉了', stage: 'S1_需求与关键词', difficulty: 2, minutes: 8, pacer: 'E', summary: '11月新词新站冠军首月62万PV：良辰美单月7站包榜与执行力壁垒实证', report: '知识流程/文章分析/11月新词新站首月62万PV与良辰美7站包榜实证.md' },
  { id: '[2024-12-10-0832]OpenAI新货详解Sora附各种案例', stage: 'S7_工具与资源', difficulty: 2, minutes: 16, pacer: 'R', summary: '6100字OpenAI Sora正式版详解：sora.com独立站/4大视频编辑/定价矩阵与出海机会', report: '知识流程/文章分析/OpenAISora正式版详解与4大视频编辑模式.md' },
  { id: '[2024-12-11-2156]周活600多万的浏览器插件竟然只做这一个小功能', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'E', summary: '600万周活插件Return YouTube Dislike拆解：统计学拟合被删数据与大厂痛点对抗', report: '知识流程/文章分析/600万周活插件ReturnYouTubeDislike算法架构与痛点对抗.md' },
  { id: '[2024-12-12-2359]新站第7天1700点击日50美元收入', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 8, pacer: 'E', summary: '新站上线第7天日点击1725产出$50实录：当晚极速交付与AdSense驳回复审SOP', report: '知识流程/文章分析/新站第7天日点击1725与AdSense驳回复审SOP.md' },
  { id: '[2024-12-13-2035]哥飞为什么值得你信任', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '哥飞领航员角色与出海路书感悟', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第64批（2024-12-06 ~ 2024-12-13，6 篇）

228. **"日本年访 2361 万工具站 onl.jp 拆解"贡献了 S1/S2 精品子域名架构**：仅收录 90 页面承载 1220 万免费搜索流，各工具分配独立子域名聚焦实体权威度。
229. **"11 月新词新站比赛战报与 7 站包榜"实证了 S1 批量交付壁垒**：首月 62 万 PV 冠军，良辰美单月 7 站包榜验证方法公开透明下的执行力鸿沟。
230. **"OpenAI Sora 正式版详解"沉淀了 S7 视频 AI 资产与周边商机**：sora.com 独立站，Re-cut/Remix/Blend/Loop 4 大编辑模式，Prompt 库与格式转换出海商机。
231. **"600 万周活插件 Return YouTube Dislike"剖析了 S1 平台对抗与统计拟合算法**：10 亿历史基准 + 客户端大数抽样外推还原被删数据，大厂阉割处孕育超级单点痛点。
232. **"新站第 7 天日点击 1725 与 AdSense 驳回复审"丰富了 S3/S6 极速变现 SOP**：当晚 11 次 Commit 上线，首拒后蓄水至千次 UV 二次复审秒过。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第64批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
