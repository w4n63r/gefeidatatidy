const fs = require('fs');
const path = require('path');
const analysisFile = path.join('output','analysis','articles_analysis.jsonl');
fs.mkdirSync(path.dirname(analysisFile), { recursive: true });
const existing = new Set();
if (fs.existsSync(analysisFile)) {
  for (const l of fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean)) {
    try { existing.add(JSON.parse(l).id); } catch {}
  }
}
const entries = [
  { id: '[2019-10-14-1741]从大学生抖音带货赚100万佣金说起聊聊互联网广告系统的规则漏洞', stage: 'S6_变现与商业化', difficulty: 2, minutes: 14, pacer: 'C', summary: '广告系统科普：RTB/SSP/DSP/ADX与规则漏洞攻防', report: '知识流程/文章分析/广告系统规则漏洞.md' },
  { id: '[2020-01-15-2142]今天内测的公众号付费阅读我计算了一下平均在看价值发现定价是个技术活', stage: 'S6_变现与商业化', difficulty: 2, minutes: 8, pacer: 'E', summary: '用"平均每个在看价值"数据思考付费阅读定价', report: '知识流程/文章分析/付费阅读定价技术活.md' },
  { id: '[2020-03-15-1651]创业增长心理学', stage: 'S0_认知与心态', difficulty: 2, minutes: 16, pacer: 'C', summary: '增长靠五种心态：语言优先/理解用户/不断前进/热爱数据/承受失败', report: '知识流程/文章分析/创业增长心理学.md' },
  { id: '[2020-04-29-1834]游戏里50角色都是0级居然跟上班时间有关', stage: 'S7_工具与资源', difficulty: 2, minutes: 8, pacer: 'E', summary: '数据陷阱案例：日志截断造成"50%角色0级"假象，先查数据源再下结论', report: '知识流程/文章分析/游戏0级数据陷阱.md' },
  { id: '[2020-08-04-1138]TailwindCSS从副业到数百万美元的业务', stage: 'S6_变现与商业化', difficulty: 2, minutes: 18, pacer: 'E', summary: 'Tailwind案例：被遗弃项目副产品→开源→2年400万美元业务', report: '知识流程/文章分析/Tailwind从副业到数百万美元.md' },
  { id: '[2021-03-04-1008]走捷径会更快吗nn好几次滴滴车快到公司门口了前面太堵走不动司机就说你下车走路吧走路都更快到nn我信了司机的下车走路了结果还没走', stage: 'S0_认知与心态', difficulty: 1, minutes: 5, pacer: '', summary: '走捷径不一定更快（无正文，仅按标题标阶段）', report: '' }
];
const add = [];
for (const e of entries) {
  if (existing.has(e.id)) continue;
  const src = JSON.parse(fs.readFileSync(path.join('output','raw','articles.jsonl'),'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l)).find(x=>x.id===e.id) ? JSON.stringify({}) : '{}');
  // 从 raw 取标题/日期
  const rawLine = fs.readFileSync(path.join('output','raw','articles.jsonl'),'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l)).find(x=>x.id===e.id);
  add.push(JSON.stringify({ id: e.id, title: rawLine?rawLine.title:'', date: e.id.match(/\[(\d{4}-\d{2}-\d{2})/)?.[1]||'', stage: e.stage, teaches: [], prerequisites: [], difficulty: e.difficulty, minutes: e.minutes, pacer: e.pacer, summary: e.summary, pitfalls: [], keywords: [], report: e.report }));
}
if (add.length) fs.appendFileSync(analysisFile, add.join('\n') + '\n', { encoding: 'utf8' });
console.log('第1批新增分析条目:', add.length, '| 累计:', existing.size + add.length);

const feedback = [
  '# 地图校验反馈（阶段4 逐篇精读过程中记录）',
  '',
  '> 作用：精读发现全局地图与实际内容不符时，记录在此，阶段5 综合时据此修正地图/流程。',
  '',
  '## 第1批（2019-10 ~ 2021-03，6 篇）',
  '',
  '1. **广告/定价类应归 S6（变现与商业化）**：《广告系统规则漏洞》《付费阅读定价》按主题归入 S6，地图 S6 描述需补充"广告生态底层知识、定价方法"。',
  '2. **S7（工具与资源）定义偏窄**：《游戏0级数据陷阱》是"数据分析方法"而非"工具推荐"，建议把 S7 改为"工具、资源与数据分析方法"。',
  '3. **案例拆分类按主题归入对应阶段**：《Tailwind》是独立开发/开源→商业化案例，归入 S6 而非单独案例层；确认"案例层贯穿、按主题归位"的做法可行。',
  '4. **无正文文章（走捷径等）**：仅按标题标阶段（S0），不写报告，统计在报告里说明。'
].join('\n');
fs.writeFileSync(path.join('output','analysis','map_feedback.md'), feedback, { encoding: 'utf8' });
console.log('map_feedback.md 已写入');
