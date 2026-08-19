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
  { id: '[2025-09-11-2338]牙疼', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '牙疼就医与京东风控日常记录', report: '' },
  { id: '[2025-09-13-2015]你觉得自己优秀到不需要努力就能得到一切吗', stage: 'S0_认知与心态', difficulty: 1, minutes: 1, pacer: 'R', summary: '努力与优秀关系警醒图片短讯', report: '' },
  { id: '[2025-09-18-2356]哥飞如何给新入职的SEO同事布置新手入门学习任务', stage: 'S3_SEO与流量入门', difficulty: 3, minutes: 22, pacer: 'P', summary: '哥飞公司SEO新人入门培训SOP：5步网站词页循环拆解法与学习资料三剑客', report: '知识流程/文章分析/哥飞公司SEO新人5步循环实训与三剑客教程SOP.md' },
  { id: '[2025-09-20-1032]拿到Zac老师的亲笔签名了', stage: 'S0_认知与心态', difficulty: 2, minutes: 8, pacer: 'C', summary: '中文SEO薪火相传：从2008年Zac老师《SEO实战密码》到出海社群的传承心法', report: '知识流程/文章分析/中文SEO薪火相传与长期主义致敬模型.md' },
  { id: '[2025-09-24-0950]顾问培训人才流动', stage: 'S0_认知与心态', difficulty: 2, minutes: 12, pacer: 'C', summary: '增长专家时间杠杆与人才流动模型：一对N培训杠杆/巨头流量下滑真因与关键操盘手价值', report: '知识流程/文章分析/增长专家时间杠杆与出海关键人才流动认知模型.md' },
  { id: '[2025-09-27-2143]祝谷歌27岁生日快乐哥飞解答为什么说谷歌在用金钱维系整个互联网生态', stage: 'S0_认知与心态', difficulty: 3, minutes: 26, pacer: 'C', summary: 'Google 27周年生态深度解构：金钱维系开放互联网飞轮/AdSense分润与NicheExpertise垂直突围模型', report: '知识流程/文章分析/Google27周年生态解构与NicheExpertise垂直突围模型.md' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const raw = rawLines.find(x => x.id === e.id);
  add.push(JSON.stringify({ id: e.id, title: raw?raw.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
const addFb = `
## 第94批（2025-09-11 ~ 2025-09-27，6 篇）

383. **"哥飞如何给新入职的 SEO 同事布置新手任务"贡献了 S3 新人实训 SOP**：坚守熟练技术栈（用熟练语言最快出 MVP），5 步循环拆解法（大盘 $\rightarrow$ 非品牌词 $\rightarrow$ AITDK 逆向 $\rightarrow$ SERP 复盘 $\rightarrow$ 循环），SEO 入门学习资料三剑客。
384. **"拿到 Zac 老师的亲笔签名了"建构了 S0 历史传承模型**：2008 年《SEO 每日一贴》与《SEO 实战密码》启蒙，白帽长期主义穿越 17 年周期，薪火相传赋能新一代开发者。
385. **"顾问、培训、人才流动"深化了 S0 时间杠杆与组织模型**：增长专家从代客执行到一对 N 培训与自营资产的杠杆演进，巨头流量下滑往往因关键操盘手流失。
386. **"祝谷歌 27 岁生日快乐"奠定了 S0/S3/S6 生态总纲**：Google 释放搜索流量 + AdSense 广告分润维系开放 Web 生态，从“内容上网”转向“AI 服务与交互工具上网”，Niche Expertise 垂直专精以小博大突围巨头。
`;
fs.appendFileSync(path.join('output','analysis','map_feedback.md'), addFb, { encoding: 'utf8' });
const p = JSON.parse(fs.readFileSync(path.join('output','progress_analysis.json'),'utf8'));
const all = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length;
p.counts.analyzed = all.length; p.counts.remaining = 726 - all.length; p.counts.reports_written = reports;
p.counts.stage_only_entries = all.filter(e=>!e.report).length;
const sc = {}; for (const e of all) sc[e.stage] = (sc[e.stage]||0)+1; p.stageDistribution = sc;
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(p, null, 2), { encoding: 'utf8' });
console.log('第94批新增:', add.length, '| 累计已分析:', all.length, '/ 726 | 累计报告:', reports, '| 剩余:', p.counts.remaining);
