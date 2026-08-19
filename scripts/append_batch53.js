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
  { id: '[2024-08-14-2116]我把网站迁移到cf省了几万块', stage: 'S2_建站与开发', difficulty: 3, minutes: 18, pacer: 'P', summary: '8200字详解Vercel迁移至AWS与Cloudflare：月省数万的基建降本SOP', report: '知识流程/文章分析/Vercel迁移AWS与Cloudflare降本实战手册.md' },
  { id: '[2024-08-15-2309]看得上小需求不害怕大需求赶紧行动早日赚钱', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'C', summary: '单UV价值量化与大小需求辩证法：100UV日出3单与内页正反馈模型', report: '知识流程/文章分析/单UV价值量化与做站正反馈模型.md' },
  { id: '[2024-08-16-2251]社群里的朋友给哥飞发了666元大红包因为哥飞提醒他做了某个网站', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'E', summary: '极速捕获商机的底层逻辑：建站肌肉记忆与平时多练心法', report: '知识流程/文章分析/建站肌肉记忆与商机极速捕获实证.md' },
  { id: '[2024-08-17-1933]产品经理再也没有借口不会写代码了再也不会就缺一个程序员了', stage: 'S2_建站与开发', difficulty: 1, minutes: 8, pacer: 'P', summary: 'Cursor+Next.js+Shadcn独立开发范式：产品经理与非程序员做站破局', report: '知识流程/文章分析/Cursor与Nextjs独立做站开发范式.md' },
  { id: '[2024-08-18-2059]短文两则AI会让垃圾站变多吗产品越复杂越赚钱吗', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'C', summary: '认知思辨两则：AI供给暴增的生态自净与产品复杂度与赚钱能力脱钩', report: '知识流程/文章分析/生态自净规律与产品复杂度脱钩思辨.md' },
  { id: '[2024-08-19-2219]SeekALL周活破6000了我只花了169块钱', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 6, pacer: 'E', summary: '169元撬动1500下载与周活破6000实证：小红利博主合作与抖加助推打法', report: '知识流程/文章分析/169元撬动1500下载与周活破6000微投放实证.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第53批（2024-08-14 ~ 2024-08-19，6 篇）

176. **"Vercel 迁移至 AWS 与 Cloudflare 降本手册"奠定了 S2 规模化出海基建解耦方案**：idoubi 8200 字详述了 Vercel 账单陷阱（函数流量与图片裁剪费）、AWS EC2+PM2 独立部署、Cloudflare Pages Edge 运行时改造及 R2 零出网费图床。
177. **"单 UV 价值量化与做站正反馈模型"量化了 S0/S6 单元经济学**：精准搜索 1 UV 价值 1~2 元人民币，日均 100 UV 小站日出 3 单，建立“多 1 内页 = +10 UV = +10 元/天”的物理动能。
178. **"Cursor + Next.js + Shadcn 独立开发范式"更新了 S2 现代建站工作流**：AI IDE 一键 Apply/Diff 审查，彻底打破非程序员不会写代码的门槛。
179. **"生态自净与复杂度脱钩思辨"升华了 S0 认知哲学**：供给繁荣带来生态自净（用户用脚投票），极简工具（如 ChatPDF 年入千万刀）同样具备顶级商业回报。
180. **"169 元撬动 1500 下载与周活破 6000"贡献了 S5 微预算冷启动实操打法**：腰尾部科技博主小额制作费 + 多平台分发 + 官方投流助推，单客成本低至 0.11 元。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第53批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
