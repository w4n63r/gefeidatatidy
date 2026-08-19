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
  { id: '[2024-09-18-0800]5500字长文AI出海一年简单回顾从新手到养得起20人团队', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'C', summary: '5500字AI出海复盘：40站矩阵/月访2.3M/养活20人团队/品牌复利哲学', report: '知识流程/文章分析/5500字AI出海一年全景复盘与品牌复利哲学.md' },
  { id: '[2024-09-19-2105]产品经理从0开始做网站3个月时间实现每天从谷歌获取流量破千', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'E', summary: '产品经理3个月日点击破千全记录：取消强制登录/80外链/改Title踩坑复盘', report: '知识流程/文章分析/产品经理3个月日点击破千的9节点实战日志.md' },
  { id: '[2024-09-21-1047]哥飞分享', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 15, pacer: 'P', summary: '4200字详解Reddit爆款制造与Comment截流：冲突文案/神评机制/6大问答版块', report: '知识流程/文章分析/Reddit爆款制造与CommentKarma前排截流SOP.md' },
  { id: '[2024-09-22-1645]出海AI工具一定要大胆上付费上订阅上年付订阅', stage: 'S6_变现与商业化', difficulty: 1, minutes: 8, pacer: 'C', summary: '出海AI工具变现进化四部曲：大胆付费/梯度涨价/月度订阅/年费大单', report: '知识流程/文章分析/出海AI工具变现四部曲与年付订阅定价SOP.md' },
  { id: '[2024-09-30-2315]新站上线一周一天从谷歌获取285万点击是什么体验', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'E', summary: '新词新站1周单日2.85万点击实证：先发优势/算法波动与新词爆发红利', report: '知识流程/文章分析/新词新站1周单日2.85万点击实证与先发规律.md' },
  { id: '[2024-10-03-1502]3个月实现每天从谷歌获取流量破千的网站两周后破两千了', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '付费外链加速器与日点击破2000实证：TAAFT/Toolify/Semrush避坑SOP', report: '知识流程/文章分析/付费外链加速器与日点击破2000实操SOP.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第56批（2024-09-18 ~ 2024-10-03，6 篇）

189. **"damo 5500 字出海一年复盘"确立了 S0/S5 工业化矩阵与品牌复利典范**：40 站矩阵、月访 2.3M、养活 20 人团队；确立出海四支柱与“先为他人提供价值”的向上社交法则。
190. **"产品经理 3 个月日点击破千日志"丰富了 S3 体验调优与避坑经验**：取消强制登录大幅拉长停留时间促使算法放量；严禁擅改已排名前列页面的 Title 抢大词。
191. **"Reddit 爆款文案与 Comment Karma 截流"完善了 S5 社区营销战法**：设计带冲突感反差文案；在百万级活跃版块抢占 1~2 楼神评坑位与主帖高频互动。
192. **"出海 AI 工具变现进阶四部曲"重构了 S6 定价体系**：大胆付费 $\rightarrow$ 梯度涨价 $\rightarrow$ 月度订阅（享受惰性留存） $\rightarrow$ 高亮年费（改善即时现金流并爆大单）。
193. **"新词新站 1 周单日 2.85 万点击"实证了 S1 先发卡位规律**：零代码小白抢占供给真空期，单日斩获 21.5 万曝光与 2.85 万点击。
194. **"付费外链加速器与日点击破 2000"贡献了 S3 付费外链放量 SOP**：Semrush 严格排除 Link Farm 农场外链，采购 TAAFT 与 Toolify 享受“买一送多”爬虫衍生反链。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第56批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
