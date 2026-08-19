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
  { id: '[2025-03-22-2337]哥飞SEO扫盲免费公益培训直播视频快转发给你公司同事学习吧', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '哥飞2.5小时SEO本质培训复盘：全球1.96亿活跃网站存活律与过时博客思维祛魅', report: '知识流程/文章分析/全球活跃网站存活律与SEO长青流量认知模型.md' },
  { id: '[2025-03-23-2328]如果你是程序员如果你想在上班之余赚点零花钱那么哥飞社群就是你的最好选择没有之一', stage: 'S0_认知与心态', difficulty: 1, minutes: 8, pacer: 'R', summary: '哥飞3000人出海社群体系：游戏站/新词站/AI站三大打法与1个月无理由退款机制', report: '知识流程/文章分析/哥飞3000人出海社群体系与三大核心玩法总览.md' },
  { id: '[2025-03-24-2342]Video后缀会被谷歌惩罚简直扯淡', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'C', summary: '域名后缀偏见辟谣：.video后缀无惩罚/免费.tk冷门机理与流量断崖暴跌两大真凶', report: '知识流程/文章分析/域名后缀偏见辟谣与流量断崖暴跌两大真凶排查.md' },
  { id: '[2025-03-26-0707]GPT4o生图实测很强附20场景示例amp缺陷整理', stage: 'S7_工具与资源', difficulty: 2, minutes: 16, pacer: 'R', summary: 'GPT-4o原生生图深度实测：20+场景提示词/文本渲染一致性与6大缺陷边界', report: '知识流程/文章分析/GPT4o原生生图实测与20场景示例缺陷整理.md' },
  { id: '[2025-03-27-2346]你还在乐此不疲的画图聪明人已经买域名上站还出单了', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '生图热潮中的出海建站出单截图提醒', report: '' },
  { id: '[2025-03-28-2349]今天看看大家怎么夸哥飞', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '即刻评论区夸奖与互动内容整理', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第75批（2025-03-22 ~ 2025-03-28，6 篇）

286. **"全球活跃网站存活律与 SEO 长青流量"深化了 S0 流量本质**：全球 11.8 亿网站中仅 1.96 亿活跃（83% 淘汰），买量一波流必死，唯有 SEO 7x24 小时被动供血；破除无序泛博客过时思维。
287. **"哥飞 3000 人出海社群三大核心玩法体系"提供了 S0 框架图谱**：小游戏站、突发新词站与 AI 工具站三大成熟打法，new.web.cafe 稿费共创与 1 个月全额退款保障。
288. **"域名后缀偏见辟谣与暴跌归因"纠正了 S2 认知偏差**：.video 正规商业后缀无算法惩罚（HailuoAI 千万级月访）；暴跌核心元凶为大量生成 Thin Content 低质页或涌入 Toxic 垃圾外链。
289. **"GPT-4o 原生生图实测与 20+ 场景"提供了 S7 前沿工具与利基机会**：英文排版精准、多轮一致性与物理知识贯通；解锁菜单/请柬/卡牌等垂直设计工具站机遇。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第75批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
