const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join('output','raw','articles.jsonl'),'utf8').split('\n').filter(Boolean);
const arts = lines.map(l => JSON.parse(l));

const STAGES = {
  'S0_认知与心态': /作品|热爱|躬身入局|长期主义|走捷径|平常心|决心|心法|心态|觉醒|鸡汤|感悟|焦虑|耐心|信仰|信念|执行力|把工作当|不要憋大招|数量胜于质量|人生|生活/,
  'S1_需求与关键词': /需求|关键词|新词|老词|小词|大词|长尾|搜索量|搜索意图|CPC|KD|鱼多|池子|蓝海|赛道|选品|选题|找方向|找词|财富密码|挖需求|挖掘需求|信息差|细分/,
  'S2_建站与开发': /上线|建站|部署|Vercel|GitHub|域名|HTML|前端|后端|代码|开发|模板|服务器|自动化|API|插件|小程序|生成网页|Vibe Coding|开源|Next\.js|落地页|上站/,
  'S3_SEO与流量入门': /收录|谷歌|Google|索引|sitemap|站点地图|内链|外链|反链|排名|搜索流量|GSC|Search Console|UV|PV|访问量|点击|权重|结构化数据|元标签|canonical|robots|Title|H1/,
  'S4_内容与多语言': /多语言|子域名|子目录|语种|翻译|AI生成内容|内容型|内容营销|GEO|AI搜索|共识|博客|内容站|写作|原创/,
  'S5_SEO进阶与增长': /程序化|海量页面|批量|外链建设|PBN|DR|技术SEO|页面速度|LCP|排名因素|算法|增长|放量|翻倍|爆发|冷启动|推广|营销|Discord|Reddit|ProductHunt|广告投放/,
  'S6_变现与商业化': /AdSense|广告|变现|订阅|会员|佣金|定价|付费|收入|美元|美金|万刀|月入|日入|营收|利润|赚钱|盈利|ECPM|流量主/,
  'S7_收款与合规': /收款|支付|Stripe|PayPal|Paddle|税务|公司注册|商标|银行|汇丰|港澳|备案|合规|法务|律师|身份验证/,
  'S8_规模化与团队': /团队|合伙人|招人|招聘|管理|组织|远程|外包|员工|老板|公司|规模化|一人公司|多站/,
  'S9_非学习类': /停更|图片消息|报名|议程|榜单|排行榜|月总结|年终奖|红包|拜年|抽奖|活动|比赛结果|征集|通知/
};
const PREQ = /需要先|先看|前提|前置|要懂|要先|建议先|在学.{0,6}之前|先了解|前提条件|要求/;

function hits(t, re) { const m = t.match(re); return m ? m.length : 0; }

const stats = {};
for (const k of Object.keys(STAGES)) stats[k] = { primary: 0, hit: 0, words: 0 };
let preq = 0;
const preqSamples = [];

for (const a of arts) {
  const t = (a.title || '') + ' ' + (a.text || '').slice(0, 3000);
  let best = null, bestN = 0;
  for (const [k, re] of Object.entries(STAGES)) {
    const n = hits(t, re);
    if (n > bestN) { bestN = n; best = k; }
  }
  if (!best || bestN === 0) best = 'S9_非学习类';
  stats[best].primary++;
  stats[best].words += a.word_count || 0;
  for (const [k, re] of Object.entries(STAGES)) if (hits(t, re) > 0) stats[k].hit++;
  if (PREQ.test(t)) { preq++; if (preqSamples.length < 20) preqSamples.push(a.title); }
}

const out = [];
out.push('# 全局语料调查（脚本初筛，仅作粗参考；权威分布以逐篇精读为准）\n');
out.push('> 方法：按阶段短语词表对"标题+正文前3000字"做命中统计。主阶段=命中最多。此表用于概览，不用于定流程。\n');
out.push('| 阶段 | 主阶段篇数 | 命中该阶段篇数 | 主阶段正文总字数 |');
out.push('|---|---|---|---|');
for (const [k, v] of Object.entries(stats)) out.push(`| ${k} | ${v.primary} | ${v.hit} | ${v.words} |`);
out.push(`\n## 依赖信号（"先看/前提/要懂/建议先"等）文章数: ${preq}\n`);
out.push('## 依赖信号样例（前20）\n');
for (const s of preqSamples) out.push(`- ${s}`);
fs.writeFileSync(path.join('output','analysis','global_survey.md'), out.join('\n'), { encoding: 'utf8' });

console.log('===== 主阶段分布（内容级粗筛） =====');
for (const [k, v] of Object.entries(stats)) console.log(`${k}: 主 ${v.primary} | 命中 ${v.hit}`);
console.log('依赖信号文章数:', preq);
