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
  { id: '[2025-08-25-1739]出海Web多久能有正反馈来看看一个小工具站上线四个多月完整历程', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 16, pacer: 'E', summary: '小工具站4个月流量爬坡实录：低KD选词/KGR验证/外链上站解耦与单日点击破百5阶曲线', report: '知识流程/文章分析/低KD小工具站4个月流量爬坡5阶实证与外链解耦SOP.md' },
  { id: '[2025-08-26-0800]布衣工具站出海月入3000刀记录下这一年踩过的那些坑7500字', stage: 'S0_认知与心态', difficulty: 3, minutes: 35, pacer: 'E', summary: '布衣工具站月入3000刀7500字复盘：抖音挖需求/Stripe雷达防拒付SOP/域名被封解封与合规避坑手册', report: '知识流程/文章分析/布衣工具站月入3000刀7500字复盘与Stripe雷达防拒付SOP.md' },
  { id: '[2025-08-28-0703]顶级邪修倾囊相授藏师傅教你速通NanoBanana', stage: 'S7_工具与资源', difficulty: 2, minutes: 22, pacer: 'P', summary: 'NanoBanana(Gemini 2.5 Flash Image)速通指南：涂鸦动作控制/虚拟换装/电商局部替换与8大工作流SOP', report: '知识流程/文章分析/NanoBanana图像编辑8大高阶工作流与提示词SOP.md' },
  { id: '[2025-08-30-2125]出海两年终于日入万刀了真难啊', stage: 'S0_认知与心态', difficulty: 3, minutes: 22, pacer: 'E', summary: '哥飞出海两年日入万刀复盘：自有业务破万刀/团队16人扩租与真操盘交付心法', report: '知识流程/文章分析/哥飞出海两年日入万刀复盘与16人团队扩租实证.md' },
  { id: '[2025-08-31-2330]给新办公室买好桌椅了', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '哥飞新扩租办公室桌椅添置简讯', report: '' },
  { id: '[2025-09-01-2358]哥飞出海教程Adsense提交网站申请的小细节', stage: 'S6_变现与商业化', difficulty: 2, minutes: 12, pacer: 'P', summary: 'AdSense提审黄金顺序SOP：必须先验ads.txt/代码段双重提审与加速审核细节', report: '知识流程/文章分析/AdSense提审黄金顺序SOP与先验adstxt双重验证细节.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第92批（2025-08-25 ~ 2025-09-01，6 篇）

373. **"一个小工具站上线四个多月完整历程"提供了 S3 真实成长曲线**：低 KD 蓝海选词与 KGR 量化，上站（播种）与加外链（浇水）彻底解耦，4 个月从 28 天 10 点击到单日点击破百 5 阶数据。
374. **"布衣工具站出海月入 3000 刀万字复盘"丰富了 S0/S7/S8 实战百科**：7500 字详尽实录，抖音挖需求，Stripe Radar 5 大防拒付规则与 early_fraud_warning Webhook 秒退款，UGC 涉黄域名被封解封 SOP。
375. **"顶级邪修教你速通 Nano Banana"提供了 S7 前沿图像编辑手册**：Gemini 2.5 Flash Image 免费调用，人脸 ID 一致性，涂鸦动作控制/虚拟换装/白边贴纸等 8 大生产级工作流与 Prompt。
376. **"出海两年终于日入万刀了"立下了 S0/S6 黄金里程碑**：哥飞自有业务突破日入 $10,000 美金，扩展日入 5 万与 33 万等级，16 人团队 210 平办公扩租与 30 天无理由退款底气。
377. **"AdSense 提交网站申请的小细节"完善了 S6 广告提审 SOP**：解密先选 JS 会锁定 ads.txt 的交互陷阱，确立先验 ads.txt $\rightarrow$ 植入 JS 代码段 $\rightarrow$ 正式提交的黄金 5 步时序与优先审核机制。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第92批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
