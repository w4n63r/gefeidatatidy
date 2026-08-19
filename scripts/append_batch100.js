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
  { id: '[2025-12-05-2356]英文SEO实战派2025年终分享会', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '英文SEO实战派年终分享会预告短讯', report: '' },
  { id: '[2025-12-08-0903]11月全球AI网站排行榜国内出海海外最新排名', stage: 'S1_需求与关键词', difficulty: 2, minutes: 12, pacer: 'R', summary: '2025年11月全球AI网站榜单：Google矩阵增14%与千问启用新域名出海大盘参考', report: '知识流程/文章分析/2025年11月全球AI网站榜单与Google矩阵增14趴及千问出海解析.md' },
  { id: '[2025-12-09-2319]GoogleSearchConsole更新支持按月周日小时等不同维度查看数据了', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'P', summary: 'GSC多维度查看更新解读：周月趋势平滑过滤噪音与16个月数据本地化备份插件SOP', report: '知识流程/文章分析/GSC多维度查看更新解读与16个月数据本地化备份SOP.md' },
  { id: '[2025-12-12-0549]GPT52发布信息全整理', stage: 'S7_工具与资源', difficulty: 3, minutes: 22, pacer: 'R', summary: 'GPT-5.2重磅发布测评：三大版本/GDPval真实工作74%超人类专家与AgenticCoding跃迁参考', report: '知识流程/文章分析/GPT52重磅发布测评与真实工作74趴胜专家及AgenticCoding跃迁.md' },
  { id: '[2025-12-21-2341]我的4000人出海创业社群里靠SEO赚到钱的人都做对了什么', stage: 'S0_认知与心态', difficulty: 3, minutes: 30, pacer: 'E', summary: '4000人出海社群年终史诗复盘：8位月入万刀至百万刀标杆全景轨迹与4大成功共性实证', report: '知识流程/文章分析/4000人出海社群年终史诗复盘与8大标杆4大成功共性实证.md' },
  { id: '[2025-12-24-0949]由美国斩杀线聊到我对深圳城中村的爱', stage: 'S0_认知与心态', difficulty: 2, minutes: 15, pacer: 'C', summary: '极低生活成本缓冲带与出海黄金时代：深圳城中村低成本托底与AI出海时代机遇心法', report: '知识流程/文章分析/极低生活成本缓冲带与AI出海黄金时代认知模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第100批（2025-12-05 ~ 2025-12-24，6 篇）

406. **"11 月全球 AI 网站排行榜"更新了 S1 矩阵与品牌情报**：Google 矩阵（Gemini/NotebookLM/Labs）齐增 14%+，Sora 尝鲜期过回落 38%，阿里通义升级千问并启用 qianwen.com 顶级域名。
407. **"Google Search Console 更新多维度查看"贡献了 S3 数据分析与工具机会**：按周/月维度平滑短期噪音、识别季节性周期，破解 16 个月数据滚动丢失痛点，提出 Local-First 本地离线备份插件产品机会。
408. **"GPT-5.2 发布信息全整理"提供了 S7 前沿模型评测参考**：三大版本（Instant/Thinking/Pro），GDPval 真实工作 74% 胜过人类专家，Agentic Coding 跃迁（Windsurf/Devin 默认模型），256k 4-needle 检索与 /compact 压缩端点。
409. **"4000 人出海创业社群里靠 SEO 赚钱的人都做对了什么"奠定了 S0 终极实战总纲**：4 大成功底层共性（信念投入/真需求/高变现/高密实践），8 位月入万刀至百万刀学员真实全景轨迹（苏谨深 2 年 $1M、小南姐 70 站破 $50K、大兵哥/土木哥/小杨哥等）。
410. **"由美国斩杀线聊到我对深圳城中村的爱"构建了 S0 低成本试错模型**：城中村极低房租为独立开发者提供零成本托底缓冲带，打破宏观垃圾时间消极论，坚定拥抱 AI+Web 出海黄金时代。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第100批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
