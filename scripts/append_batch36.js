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
  { id: '[2024-02-18-0800]哥飞带你读你需要了解的10个重要SEO元标签上', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'P', summary: '10个重要SEO元标签详解(上)：Title/Description/Headings配置规范', report: '知识流程/文章分析/10个重要SEO元标签详解上.md' },
  { id: '[2024-02-19-0800]哥飞带你读你需要了解的10个重要SEO元标签中', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 10, pacer: 'P', summary: '10个重要SEO元标签详解(中)：Alt/Nofollow/RobotsMeta配置规范', report: '知识流程/文章分析/10个重要SEO元标签详解中.md' },
  { id: '[2024-02-20-1006]哥飞带你读你需要了解的10个重要SEO元标签下', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 14, pacer: 'P', summary: '10个重要SEO元标签详解(下)：Canonical/Schema/OG/Viewport配置规范', report: '知识流程/文章分析/10个重要SEO元标签详解下.md' },
  { id: '[2024-02-21-1602]推荐一个能让你在SoraAPI发布之前就上线网站接住泼天流量的开源SoraWeb客户端SoraWebui', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: 'SoraAPI发布前抢跑泼天流量：开源SoraWebui与FakeSoraAPI模拟走通', report: '知识流程/文章分析/Sora发布前抢跑泼天流量与FakeAPI.md' },
  { id: '[2024-02-22-1933]哥飞实操开源也是一个很不错的产品宣传模式', stage: 'S5_SEO进阶与增长', difficulty: 2, minutes: 10, pacer: 'E', summary: 'SoraWebui开源宣发48小时实战复盘：390Star与被动外链裂变', report: '知识流程/文章分析/SoraWebui开源宣发48小时复盘.md' },
  { id: '[2024-02-23-2322]开源3天SoraWebui拿下560个Star', stage: 'S5_SEO进阶与增长', difficulty: 1, minutes: 8, pacer: 'E', summary: 'SoraWebui开源3天560Star冲上GitHub趋势榜第3与全球自发裂变', report: '知识流程/文章分析/SoraWebui开源3天冲上GitHub趋势榜.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第36批（2024-02-18 ~ 2024-02-23，6 篇）

107. **"10 个重要 SEO 元标签（上中下）"奠定了 S3 站内 SEO 优化的最完整规范体系**：覆盖 Title、Description、Headings、Alt、Nofollow、Robots Meta、Canonical、Schema JSON-LD、OG/Twitter Cards 及 Viewport。
108. **"Sora 泼天流量抢跑与 FakeSoraAPI 模拟方案"确立了重大新技术风口的预判式建站流程**：在官方发布 API 前完成收录与权重积累。
109. **"SoraWebui 72 小时开源战役"成为 S5 开源裂变的标准典范案例**：GitHub 开源 + 演示站链接 + PH 冲榜 → 登上 GitHub Trending Top 3、获得权威主流媒体被动反链并在多国社群自发传播。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第36批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
