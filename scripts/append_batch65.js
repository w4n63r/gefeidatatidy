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
  { id: '[2024-12-14-1248]独立开发者访谈从0到月入87K美元一个感谢信网站的成长故事', stage: 'S4_内容与多语言', difficulty: 2, minutes: 16, pacer: 'E', summary: '感谢信内容站从0到月入$8.7K：WordPress极简基建/场景长尾词与AdThrive质变', report: '知识流程/文章分析/感谢信内容站从0到月入87K美元与AdThrive质变拆解.md' },
  { id: '[2024-12-15-2214]以月收入87K网站为例说说为什么说公开自己的收入和网站很危险', stage: 'S8_避坑警示', difficulty: 2, minutes: 8, pacer: 'W', summary: '为什么公开收入和网站极其危险：Tons of Thanks被抄案例与资产隐蔽防守铁律', report: '知识流程/文章分析/公开域名与收入的危险性及资产隐蔽防护铁律.md' },
  { id: '[2024-12-16-2350]1221哥飞的朋友们深圳线下聚会议程出来了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '2024年12月21日深圳线下聚会完整议程与嘉宾名单', report: '' },
  { id: '[2024-12-17-0833]那些攒局创业的往事', stage: 'S0_认知与心态', difficulty: 2, minutes: 18, pacer: 'C', summary: '4600字商业史复盘：攒局创业的致命软肋与独立主C破局第一性原理', report: '知识流程/文章分析/攒局创业的致命软肋与独立主C破局第一性原理.md' },
  { id: '[2024-12-18-2222]聊聊广告主广告平台流量主之间的关系', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'C', summary: '聊聊广告主/平台/流量主关系：CPM/CPC/RPM全指标拆解与出海高单价底层原理', report: '知识流程/文章分析/全球数字广告运作与CPMCPCRPM计量模型.md' },
  { id: '[2024-12-19-0815]做独立产品不一定要先成为独立开发', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '做独立产品不一定要做独立开发：概念解构/在职孵化与现金流超工资再离职', report: '知识流程/文章分析/独立产品概念解构与在职孵化平滑过渡心法.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第65批（2024-12-14 ~ 2024-12-19，6 篇）

233. **"Tons of Thanks 感谢信内容站月入 $8.7K"丰富了 S4/S6 长尾内容与广告跃迁**：场景长尾词穷举，突破 10 万月 PV 接入 AdThrive 达成 RPM 质变。
234. **"公开域名与收入的危险性及隐蔽防护"确立了 S8 资产安全铁律**：商业模式公开引来狼群精准抄袭蚕食，严格遵守 Stealth Mode 隐蔽作战。
235. **"攒局创业致命软肋与独立主 C 破局"深化了 S0 创业第一性原理**：顺风看资源逆风看主 C，独立出海是一场 100% 属于自己的全责战役。
236. **"全球数字广告运作与 CPM/CPC/RPM 计量"构建了 S6 商业化底层理论**：广告三方闭环与分润机制，Page RPM 核心指标与欧美高单价折现逻辑。
237. **"独立产品概念解构与在职孵化心法"沉淀了 S0 职业平滑转型 SOP**：在职主业保底，业余周末播种，被动现金流持续超越全职工资后再从容离职。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第65批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
