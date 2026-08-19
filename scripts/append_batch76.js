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
  { id: '[2025-03-30-2318]听哥飞的话流量自然来群友新站上线一天40万访问量', stage: 'S1_需求与关键词', difficulty: 1, minutes: 1, pacer: 'E', summary: '新站上线单日突破40万访问量学员战报与生财大会分享', report: '' },
  { id: '[2025-04-01-2307]哥飞公众号3月总结', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'E', summary: '哥飞公众号2025年3月运营总结：28篇文章21.6万阅读/总关注破5.3万与出海营收新高', report: '知识流程/文章分析/哥飞公众号2025年3月运营复盘与团队扩张实证.md' },
  { id: '[2025-04-02-2349]哥飞解读2025年谷歌算法排名因素变化', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 16, pacer: 'C', summary: '2025年谷歌算法排名权重全面解读：内容与意图23%/用户行为12%及内页反链多样性', report: '知识流程/文章分析/2025年谷歌算法排名权重全面解读与用户行为信号.md' },
  { id: '[2025-04-03-2313]一些有意思的出海产品小数据', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'E', summary: '哥飞自有出海站6组微观数据实录：首单2.56%付费率/税费手续费实际扣除与沙盒反弹', report: '知识流程/文章分析/出海站长一手微观数据拆解与税费沙盒反弹实证.md' },
  { id: '[2025-04-05-1934]假期无聊来猜猜这个上线6个月从谷歌拿到了116万点击的小游戏站收入是多少', stage: 'S6_变现与商业化', difficulty: 2, minutes: 10, pacer: 'P', summary: '小游戏站半年116万点击复盘：全网187万UV/840万PV及AdSense收入逆向估算SOP', report: '知识流程/文章分析/小游戏站半年116万点击复盘与AdSense收入逆向估算SOP.md' },
  { id: '[2025-04-06-0815]出海网站落地页的10到15版本20再到25版本', stage: 'S2_建站与开发', difficulty: 2, minutes: 10, pacer: 'C', summary: '出海网站落地页四大演进版本：从1.0泛博客到1.5专题页再到2.0免登录意图直达工具', report: '知识流程/文章分析/出海落地页4大演进版本与2.0意图直达认知模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第76批（2025-03-30 ~ 2025-04-06，6 篇）

290. **"哥飞公众号 2025 年 3 月复盘与团队扩张"实证了 S0 内容飞轮**：28 篇全勤获 21.6 万阅读，粉丝破 5.3 万，出海 AI 矩阵营收创新高推动团队扩至 14 人。
291. **"2025 年谷歌算法排名权重深度解读"确立了 S3 算法前沿**：内容满足意图权重达 23%（第一大因素），用户行为信号达 12%（Last Click 冲刺 Top 1），链接分布多样性要求内页广泛获链。
292. **"出海站长一手微观数据拆解"沉淀了 S6 财务单元模型**：首日 2.56% 转化率，流水扣除消费税 12.4% 与手续费 6.7% 后实际净到账率 80.8%，持续补充外链破除沙盒暴跌。
293. **"小游戏站半年 116 万点击复盘与收入估算"提供了 S6/变现 SOP**：Google 点击折算 187 万 UV $\rightarrow$ 乘上 4.5 人均高 PV 达 840 万 PV $\rightarrow$ 按 $3~$6 RPM 测算半年净赚 18~36 万元。
294. **"出海落地页 4 大演进版本与 2.0 意图直达"构建了 S2 核心架构模型**：从 1.0 泛博客到 1.5 营销专题页，跨越至 2.0 免登录首屏即完整工具（Last Click 意图秒满足与极致高 CTR）。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第76批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
