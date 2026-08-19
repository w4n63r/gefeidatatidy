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
  { id: '[2026-07-26-1135]AI搜索来了John说别再只围着关键词做SEO', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 28, pacer: 'C', summary: 'AI搜索时代SEO重构：John九步客户旅程/Negative-ICP与竞品对比页教育AI模型', report: '知识流程/文章分析/AI搜索时代GEO与全网客户旅程重构模型.md' },
  { id: '[2026-07-27-1433]月收入五位数的小生意工具软件评测', stage: 'S1_需求与关键词', difficulty: 2, minutes: 18, pacer: 'C', summary: '工具评测站五位数月入复盘：ToolFinder一人团队/真实场景判断与DealPass会员变现模型', report: '知识流程/文章分析/ToolFinder评测站五位数月入与DealPass变现模型.md' },
  { id: '[2026-07-28-1251]半年增长100倍Jasper讲AI出海最难熬的那半年如何从低谷到起飞', stage: 'S0_认知与心态', difficulty: 2, minutes: 28, pacer: 'C', summary: '半年增长100倍心法复盘：Jasper从战线拉散低谷到聚焦单品/学聊泡试与转化模型', report: '知识流程/文章分析/半年增长100倍心法与单品聚焦转化模型.md' },
  { id: '[2026-07-29-1603]哥飞SEO教程通过看GSC四级信号来看自己网站是否可能被谷歌惩罚', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 20, pacer: 'P', summary: '哥飞SEO教程：GSC四级阶梯预警信号解密/抓取未收录与曝光骤降诊断排查SOP', report: '知识流程/文章分析/GSC四级阶梯预警信号与降权诊断排查SOP.md' },
  { id: '[2026-07-30-1458]3个月花掉30万美金外链预算Andy讲SEO增长的学费', stage: 'S5_SEO进阶与增长', difficulty: 3, minutes: 28, pacer: 'C', summary: '30万美金SEO外链学费解密：Andy五层体系/外链安全防惩罚与内链杠杆模型', report: '知识流程/文章分析/30万美金外链学费解密与企业级SEO五层体系.md' },
  { id: '[2026-07-31-1057]两个人做到1000万美元年经常性收入磊磊讲AI原生打法', stage: 'S0_认知与心态', difficulty: 3, minutes: 30, pacer: 'C', summary: '两个人千万美元ARR实录：磊磊AI原生工作流/2人对标500人/2亿播放链路承接与号商分发模型', report: '知识流程/文章分析/两个人千万美元ARR实录与AI原生打法模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第116批（2026-07-26 ~ 2026-07-31，6 篇）

490. **"AI 搜索来了别再只围着关键词做 SEO"建立了 S5 GEO 生成式引擎优化模型**：用户先问 AI 进官网只为验证，竞品对比页为了"教育大模型"优先推荐，John 九步客户旅程与 Negative ICP 排除低价值用户。
491. **"月收入五位数的小生意工具软件评测"沉淀了 S1/S6 评测策展变现模型**：Tool Finder 一人团队年访 200 万，真实试用 1000+ 工具给主观场景判断，赞助 + 联盟 + Deal Pass 独家折扣通行证三轨变现。
492. **"半年增长 100 倍 Jasper 讲 AI 出海最难熬的半年"建构了 S0 聚焦单品心智模型**：首单后战线拉散连开 5 坑陷低谷，收敛聚焦单品单日营收暴涨 100 倍，学聊泡试与打消订阅扣费顾虑。
493. **"通过看 GSC 四级信号看网站是否遭惩罚"沉淀了 S3/S8 降权诊断排查 SOP**：已收录无曝光 (改基础)、抓取不收录 (停批量/清薄页)、发现不抓取 (爬虫预算收紧/大清退)、曝光断崖 (查改版/算法更新)，看 14 天趋势。
494. **"3 个月花掉 30 万美金外链预算 Andy 讲 SEO 增长学费"系统化了 S5 企业级 SEO 体系**：技术抓 LCP 前 5%，内容先诚意打样再 AI 放量，外链 Foundation+PR 稀释+控速率+锚文本多样化，内链为中后期最高 ROI 动作，谨慎 pSEO。
495. **"两个人做到 1000 万美元 ARR 磊磊讲 AI 原生打法"建构了 S0/S6 极简组织与商业模型**：2 人团队千万 ARR 单日 6 万刀，人类把关审美/方向/发布标准，AI 做 100% 全栈执行 (2 人对标 500 人)，2 亿播放链路承接与号商分发招安。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第116批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
