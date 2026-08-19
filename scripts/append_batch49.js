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
  { id: '[2024-06-24-1143]哥飞推荐一个能够让你打开首页就跟踪N个新词热词的网站', stage: 'S1_需求与关键词', difficulty: 1, minutes: 8, pacer: 'R', summary: '新词热词监控工具trendingkeywords.net：首页平铺趋势与极速选词', report: '知识流程/文章分析/新词趋势监控工具trendingkeywords推荐.md' },
  { id: '[2024-06-25-2225]哥飞小课堂如何打造一个上线56天就拿下45万点击的新网站', stage: 'S0_认知与心态', difficulty: 1, minutes: 6, pacer: 'E', summary: '56天45.7万点击新站实证：5月1日新域名爆发与小课堂复盘', report: '知识流程/文章分析/56天45万点击新站爆发实证与复盘.md' },
  { id: '[2024-06-27-1911]哥飞小课堂如何看到某些关键词的搜索量', stage: 'S1_需求与关键词', difficulty: 2, minutes: 10, pacer: 'P', summary: '精准查看关键词绝对搜索量SOP：激活GoogleAds解锁精确数据', report: '知识流程/文章分析/激活GoogleAds解锁关键词精确搜索量SOP.md' },
  { id: '[2024-07-02-1541]哥飞的朋友们社群一周年记', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: 'R', summary: '社群一周年纪念与感谢信：5个群25万条干货消息沉淀', report: '' },
  { id: '[2024-07-04-0003]深圳航城AI出海分享交流暨网络人士资源交流对接会顺利举行', stage: 'S9_非学习类', difficulty: 1, minutes: 2, pacer: 'R', summary: '深圳航城AI出海分享会现场活动与合影报道', report: '' },
  { id: '[2024-07-05-2359]哥飞SEO教程谷歌喜欢的页面有哪些特征', stage: 'S3_SEO与流量入门', difficulty: 2, minutes: 12, pacer: 'C', summary: '谷歌喜欢的页面15大特征：体验/互动/内容/站内SEO四维质检体系', report: '知识流程/文章分析/谷歌偏好高质量页面15大特征质检体系.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第49批（2024-06-24 ~ 2024-07-05，6 篇）

158. **"谷歌偏好高质量页面 15 大特征"确立了 S3 站内 SEO 验收质检模型**：涵盖用户体验（加载/移动端/内链）、用户互动（停留长/跳出低）、内容质量（原创/垂直权威）与 On-Page 规范（工具配字/合理 TDH/图片 Alt）。
159. **"激活 Google Ads 解锁精确搜索量"填补了 S1 数据校验关键技巧**：破解第三方插件区间虚高陷阱，一次消耗小额广告费永久解锁官方精确到个位数的绝对搜索量。
160. **"新词监控工具 trendingkeywords.net"扩充了 S1 实时选品武器库**：首页平铺 Google Trends 折线走势，极大降低选词发现阻力。
161. **"56 天 45.7 万点击新站"强化了 S0 极速建站心法**：5.1 新域名在 56 天内斩获 244 万曝光与 45.7 万点击（~18.7% CTR），彻底粉碎新站沙盒论。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第49批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
