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
  { id: '[2024-11-05-2241]新站上线一个月拿下219K的UV320K的PV经验分享全公开', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'P', summary: 'TikTok爆款游戏新词与首月21.9万UV实战：GitBase模板/油管嵌入/社媒SEO联动', report: '知识流程/文章分析/TikTok爆款小游戏新词挖掘与长内容单页SEOSOP.md' },
  { id: '[2024-11-06-1628]失业夫妻双双把站上10月做了4个网站都上榜总PV367K他说好像捅破那层窗户纸了', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '失业夫妻4站上榜36.7万PV实证：新词外链去重抄作业/老站带新站SOP', report: '知识流程/文章分析/失业夫妻4站上榜36.7万PV实证与新词外链去重抄作业SOP.md' },
  { id: '[2024-11-07-1803]从北京到老家从上班到上站从大厂到个体户他靠出海实现了WLB', stage: 'S1_需求与关键词', difficulty: 2, minutes: 16, pacer: 'P', summary: '3000字前腾讯开发Blank出海全景：Similarweb新词挖掘/多广告平台组合/月入万刀算式', report: '知识流程/文章分析/前腾讯开发Blank出海全景与多广告平台组合变现SOP.md' },
  { id: '[2024-11-07-1803]榜单AI行业公众号影响力TOP50丨2024年10月', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'R', summary: 'AIGCRank 2024年10月AI行业微信公众号影响力TOP50榜单', report: '' },
  { id: '[2024-11-08-1811]哥飞小课堂月访问量只有200K但MRR有15k的在线倒计时网站分析', stage: 'S1_需求与关键词', difficulty: 2, minutes: 15, pacer: 'E', summary: '2700字拆解Stagetimer：月访仅200K斩获$15K MRR的B2B垂直场景选品法', report: '知识流程/文章分析/Stagetimer月访200K斩获15KMRR垂直利基模型.md' },
  { id: '[2024-11-09-2051]哥飞推荐31个经典游戏站推荐都是搞SEO流量的好案例', stage: 'S7_工具与资源', difficulty: 2, minutes: 16, pacer: 'R', summary: '3200字31个经典出海游戏站数据库：文字/地理/逻辑分类与站群互链架构拆解', report: '知识流程/文章分析/31个经典出海游戏站SEO数据库与站群互链架构.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第59批（2024-11-05 ~ 2024-11-09，6 篇）

204. **"TikTok 爆款小游戏新词挖掘与长内容单页"贡献了 S1/S3 跨域联动 SOP**：TikTok 评论区嗅探新词，GitBase 部署长内容单页并嵌入 YouTube 高清试玩视频强拉排名信号。
205. **"失业夫妻 4 站上榜与新词外链抄作业"贡献了 S3 纯净外链自动化 SOP**：新词外链 100% 为站长手动建设纯净资源，Semrush 批量导出 Dofollow 通过 Python 脚本去重合并。
206. **"Blank 夺冠复盘与 Similarweb 着陆页挖词"贡献了 S1 工业化选词与多广告平台 SOP**：Similarweb 过滤头部站“New Traffic”着陆页，组合接入 AdSense + Adsterra Native Banner。
207. **"Stagetimer 200K 访客斩获 $15K MRR"实证了 S1 垂直 B2B 利基场景重构**：从通用秒表升级为舞台会议多端实时同步倒计时，以 24~48 欧元高客单突破流量内卷。
208. **"31 个经典游戏站数据库与站群互链"沉淀了 S7 游戏资产库与 PBN 互链模型**：文字、地理与逻辑 5 大赛道案例，揭秘海外成熟站长矩阵互链与老站带新站架构。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第59批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
