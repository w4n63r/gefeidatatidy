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
  { id: '[2026-06-22-2238]一个填字游戏网站月访问量822万靠短视频冷启动做成了订阅生意', stage: 'S1_需求与关键词', difficulty: 2, minutes: 22, pacer: 'E', summary: '填字游戏月访822万复盘：短视频降门槛冷启动/网站承接与App订阅商业飞轮', report: '知识流程/文章分析/填字游戏月访822万复盘与短视频冷启动订阅商业飞轮.md' },
  { id: '[2026-06-23-2242]一个目录站月入13万美元靠的是把抄袭者变成客户', stage: 'S1_需求与关键词', difficulty: 2, minutes: 24, pacer: 'P', summary: '目录站月入1.3万刀实录：OpenAlternative开源替代品SEO矩阵与把抄袭者变客户SOP', report: '知识流程/文章分析/目录站月入1.3万刀实录与把抄袭者变客户SOP.md' },
  { id: '[2026-06-24-1800]起名想破头我做了个网页工具起名查域名撞名检测一条龙真是太好用了', stage: 'S2_建站与开发', difficulty: 2, minutes: 16, pacer: 'P', summary: '起名查域名撞名检测一条龙：单HTML极简工具设计/Serper与Whois接口闭环SOP', report: '知识流程/文章分析/起名查域名撞名检测一条龙工具与单HTML开发SOP.md' },
  { id: '[2026-06-25-2032]开源库很多人用捐赠却很少换个思路后他做到了月入13万美元', stage: 'S6_变现与商业化', difficulty: 2, minutes: 20, pacer: 'C', summary: '开源变现月入1.3万刀：从Nodemailer捐赠困境到EmailEngine相邻自托管API商业模型', report: '知识流程/文章分析/开源变现从Nodemailer到EmailEngine相邻产品模型.md' },
  { id: '[2026-06-26-2001]大家都用来测网速的网站为什么能卖12亿美元', stage: 'S6_变现与商业化', difficulty: 3, minutes: 25, pacer: 'C', summary: '免费测速站12亿美元收购解密：Speedtest与Downdetector数据飞轮与B2B变现4大支柱', report: '知识流程/文章分析/免费测速站12亿美元收购解密与B2B数据飞轮模型.md' },
  { id: '[2026-06-27-2143]2026年哥飞的朋友们年中分享交流会深圳站开始报名了', stage: 'S9_非学习类', difficulty: 1, minutes: 1, pacer: 'R', summary: '年中交流会报名通告', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第111批（2026-06-22 ~ 2026-06-27，6 篇）

462. **"一个填字游戏网站月访问量 822 万"产出了 S1/S6 短视频冷启动与订阅飞轮**：Minute Cryptic 每日短视频拆解降门槛 ➔ 评论区驱动做移动优先网站 ➔ App 连续打卡 ➔ $9/月会员与出书变现，4 大类似结构特征。
463. **"一个目录站月入 1.3 万美元"沉淀了 S1/S6 目录站与反向变现 SOP**：OpenAlternative 开源替代品矩阵，动态拉取 GitHub 数据保障新鲜度与决策价值，赞助广告 + Dirstarter 模板售卖把抄袭者变客户。
464. **"起名想破头我做了个网页工具"沉淀了 S2 单 HTML 极简全自动化开发 SOP**：需求输入 ➔ LLM 流式起名 ➔ Serper 查撞名 ➔ Whois 查注册 ➔ AI 综合推荐，纯前端单 HTML + CF Worker 跨域转发，10 秒全自动完成。
465. **"开源库很多人用捐赠却很少"建构了 S6 开源相邻重需求变现模型**：Nodemailer 捐赠困境，开源负责顶级信任背书，相邻产品 EmailEngine 统一封装协议以自托管 + 固定年费直击企业重痛点，月入 1.3 万美金。
466. **"测网速网站为什么能卖 12 亿美元"系统化了 S6 免费工具沉淀 B2B 数据资产模型**：Speedtest + Downdetector 埃森哲 12 亿美元收购案，前端极简工具捕获 1000+ 维遥测数据，B2B 运营商情报/SDK 授权/故障告警 4 大支柱。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第111批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
