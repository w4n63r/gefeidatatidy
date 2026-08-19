const fs = require('fs');
const path = require('path');

const analysisFile = path.join('output', 'analysis', 'articles_analysis.jsonl');
const articles = fs.readFileSync(analysisFile, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));

// Stage definition & sequence
const STAGES = [
  { key: 'S0_认知与心态', code: 'S0', name: '认知与心态', title: 'Phase 0: 认知破局与出海常识', goal: '建立作品思维、躬身入局与独立开发出海正确预期，破除打工惯性与大招妄念', milestone: '确立 1~2 个重点出海方向，完成出海工具链准备，树立“小步快跑、以赚美元为正反馈”的心态' },
  { key: 'S1_需求与关键词', code: 'S1', name: '需求与关键词', title: 'Phase 1: 需求挖掘与关键词调研', goal: '掌握“鱼多人少”选词法，通过 Google Trends、逆向广告与意图分组找到真实刚需', milestone: '产出一张包含 20~50 个真实高意图、低竞争长尾词的结构化词表（包含搜量、意图与对应页面类型）' },
  { key: 'S2_建站与开发', code: 'S2', name: '建站与开发', title: 'Phase 2: 极速建站与可复用脚手架', goal: '掌握 10 分钟单 HTML 极速上线、Next.js/Cloudflare 部署与通用登录支付脚手架搭建', milestone: '成功部署首个可公开访问的工具站点，打通 Google 登录与响应式 UI，页面具备专业商业质感' },
  { key: 'S3_SEO与流量入门', code: 'S3', name: 'SEO与流量入门', title: 'Phase 3: SEO收录与流量破冰', goal: '掌握 GSC 四级预警信号诊断、Bing IndexNow 主动秒级推送与高权重平台发文导流', milestone: '站点在 GSC 与 Bing Webmaster 成功验证，首批核心页面实现收录，从 Bing 或第三方平台斩获首批真实 UV' },
  { key: 'S4_内容与多语言', code: 'S4', name: '内容与多语言', title: 'Phase 4: 纯血多语言与AI本地化', goal: '打破机翻子目录陷阱，掌握 8 语种纯血独立站（.jp/.de）架构与 AI 本地市场深度推理', milestone: '上线 1 个非英语纯血独立站，使用地道本地词与本地支付/排版规范，在目标国 SERP 获得收录与排名' },
  { key: 'S5_SEO进阶与增长', code: 'S5', name: 'SEO进阶与增长', title: 'Phase 5: GEO生成式优化与企业级增长', goal: '掌握 AI 搜索时代 GEO 竞品对比页“教育大模型”、企业级外链安全体系、内链杠杆与 Google Ads 机器学习训练', milestone: '构建竞品对比页被 Perplexity/ChatGPT 引用，搭建安全外链网络，通过站内内链盘活全站老页权重' },
  { key: 'S6_变现与商业化', code: 'S6', name: '变现与商业化', title: 'Phase 6: 商业化变现与转化漏斗', goal: '掌握 AdSense 审计过审、Stripe/LemonSqueezy 订阅与用量计费、DealPass 独家会员以及 Google One Tap 漏斗调优', milestone: '网站成功跑通在线支付，赚到出海“第一刀”美元，注册率达到 40%+，付费转化率稳定在 0.1%~0.5%' },
  { key: 'S7_收款与合规', code: 'S7', name: '收款与合规', title: 'Phase 7: 全球收款、税务与合规', goal: '掌握海外公司注册、香港/海外银行开户、Stripe 风控合规与外汇合规回国通道', milestone: '拥有稳定合规的海外收款账户与企业实体，实现美元收入合规结汇与税务安全' },
  { key: 'S8_避坑警示', code: 'S8', name: '规模化与避坑', title: 'Phase 8: 组织演进、站群矩阵与避坑红线', goal: '掌握 2 人千万 ARR 的 AI 原生工作流、创业团队 3 阶段人才配置，严守防算法惩罚与防 CPA 崩塌红线', milestone: '形成个人或极简团队专属的多站矩阵资产，建立自动化运维与抗风险护城河' }
];

console.log('Building Knowledge Flow artifacts...');
require('./generate_roadmap_md.js')(articles, STAGES);
require('./generate_flowchart_html.js')(articles, STAGES);
require('./generate_flowchart_mmd.js')(STAGES);
console.log('Stage 5 build complete!');
