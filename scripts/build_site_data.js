const fs = require('fs');
const path = require('path');

const siteDir = path.join('学习网站');
if (!fs.existsSync(siteDir)) {
  fs.mkdirSync(siteDir, { recursive: true });
}

console.log('Pre-compiling learning site data with Priority, PACER labels and Clean Markdown...');

const analysisFile = path.join('output', 'analysis', 'articles_analysis.jsonl');
const rawArticles = fs.readFileSync(analysisFile, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));

// Key landmark patterns for must-read articles
const MUST_READ_KEYWORDS = [
  '路线图', '养网站防老', '找新词', '8000字', '5800字', '5000字', '10分钟上线',
  '5分钟做个网站', 'GSC四级', '反常识', 'AI 搜索来了', 'John', '1000万美元', '磊磊',
  '1300个精准UV', 'Niko', '蓝星空', '空弦', '30万美金外链', 'Andy Wang', '10倍增长',
  'Rick', '前30名网站', '广告投放', '冉云', '半年增长100倍', 'Jasper', '1359万',
  '20条建议', '日入100美元', '30个免费产品推广渠道', '财富密码', '保小图大',
  '妙鸭相机', 'ChatPDF', '全流程SOP', 'Excalidraw', 'ToolFinder', 'YouMind', 'Asnull'
];

const PACER_MAP = {
  P: { label: '实操 SOP', desc: '手把手操作流程、步骤教程与实战配置' },
  C: { label: '认知心法', desc: '底层逻辑、商业洞察、作品思维与认知破局' },
  A: { label: '行动清单', desc: '可直接执行的任务列表、Checklist 与实操动作' },
  R: { label: '工具资源', desc: '高价值工具链、渠道资源与开源项目推荐' },
  E: { label: '经验复盘', desc: '真实团队操盘、踩坑教训与数据复盘' }
};

function cleanTitle(rawTitle, id) {
  let title = rawTitle || id || '';
  title = title.replace(/^\[\d{4}-\d{2}-\d{2}-\d{4}\]/, '').trim();
  title = title.replace(/\\n/g, ' ').replace(/[\r\n]+/g, ' ').trim();
  if (title.length > 40) {
    const firstSentence = title.split(/[。！？\?!]/)[0].trim();
    if (firstSentence && firstSentence.length >= 4 && firstSentence.length <= 40) {
      title = firstSentence;
    } else {
      title = title.slice(0, 38) + '...';
    }
  }
  return title;
}

function checkMustRead(title, id, report) {
  const text = (title + ' ' + id + ' ' + report).toLowerCase();
  return MUST_READ_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

const articles = rawArticles.map(a => {
  const cTitle = cleanTitle(a.title, a.id);
  const isMustRead = checkMustRead(a.title, a.id, a.report || '');
  const pacerKey = a.pacer || 'C';
  const pacerInfo = PACER_MAP[pacerKey] || PACER_MAP['C'];
  const priorityScore = isMustRead ? 100 : (a.report ? 50 : 10);

  return {
    ...a,
    cleanTitle: cTitle,
    isMustRead,
    priorityScore,
    pacerLabel: pacerInfo.label,
    pacerDesc: pacerInfo.desc
  };
});

// Pre-load all reports and STRIP YAML FRONTMATTER
const reportsMap = {};
const reportsDir = path.join('知识流程', '文章分析');
if (fs.existsSync(reportsDir)) {
  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const fullPath = path.join(reportsDir, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    // Strip YAML frontmatter cleanly
    content = content.replace(/^\s*---[\s\S]*?---\s*/, '');
    reportsMap[f] = content;
  }
}

// Stage definitions
const stages = [
  { key: 'S0_认知与心态', code: 'S0', name: '认知与心态', desc: '作品思维、躬身入局与独立开发出海常识', icon: 'compass', milestone: '确立 1~2 个重点出海方向，完成出海工具链准备，树立“小步快跑、以赚美元为正反馈”的心态' },
  { key: 'S1_需求与关键词', code: 'S1', name: '需求与关键词', desc: '找“鱼多人少”的池子，Google Trends 4维验证与意图分组', icon: 'search', milestone: '产出一张包含 20~50 个真实高意图、低竞争长尾词的结构化词表' },
  { key: 'S2_建站与开发', code: 'S2', name: '建站与开发', desc: '10分钟单HTML上线、Next.js全栈脚手架与商业质感', icon: 'code', milestone: '成功部署首个可公开访问的工具站点，打通 Google 登录与响应式 UI' },
  { key: 'S3_SEO与流量入门', code: 'S3', name: 'SEO流量入门', desc: 'Bing/IndexNow秒级破冰、GSC四级信号与高权重发文', icon: 'trending-up', milestone: '站点在 GSC 与 Bing 成功验证，首批核心页面实现收录，斩获首批真实 UV' },
  { key: 'S4_内容与多语言', code: 'S4', name: '纯血多语言', desc: '8语种纯血独立站(.jp/.de)、地道本地词与AI市场推理', icon: 'globe', milestone: '上线 1 个非英语纯血独立站，在目标国 SERP 获得收录与排名' },
  { key: 'S5_SEO进阶与增长', code: 'S5', name: 'GEO与进阶增长', desc: 'GEO竞品对比页教育大模型、外链PR稀释与内链杠杆', icon: 'zap', milestone: '构建竞品对比页被 AI 引用，搭建安全外链网络与内链权重杠杆' },
  { key: 'S6_变现与商业化', code: 'S6', name: '变现与商业化', desc: 'AdSense审计、Stripe订阅、DealPass会员与OneTap漏斗调优', icon: 'credit-card', milestone: '网站跑通在线支付，赚到出海“第一刀”，注册率 40%+，付费率 0.1%~0.5%' },
  { key: 'S7_收款与合规', code: 'S7', name: '收款与合规', desc: '海外公司注册、香港/海外银行开户、Stripe风控与合规结汇', icon: 'shield-check', milestone: '拥有稳定合规的海外收款账户与企业实体，实现美元收入合规结汇' },
  { key: 'S7_工具与资源', code: 'S7-Tools', name: '工具与资源', desc: '常用SEO工具、开源项目与AI工具链', icon: 'tool', milestone: '掌握 Similarweb/Semrush/Ahrefs 及自动化审计工具链' },
  { key: 'S8_避坑警示', code: 'S8', name: '避坑与规模化', desc: '2人千万ARR打法、组织3阶段演进与防算法惩罚红线', icon: 'alert-triangle', milestone: '形成个人或极简团队专属的多站矩阵资产，建立自动化运维与抗风险护城河' },
  { key: 'S9_非学习类', code: 'S9', name: '大会与通告', desc: '线下分享会议程、赛事通告与社群公告', icon: 'calendar', milestone: '了解出海社区生态演进' }
];

// Pitfalls data
const pitfallsData = [
  { scenario: 'SEO被罚与流量断崖', title: '批量程序化上线低质薄页面整站被 K', desc: '盲目追求几十万页面规模，大量生成高度同质化机翻内容；Google 判定低质滥用，收紧爬虫预算并从索引全量下架。', sop: '立刻停止批量生产同类薄页；404 下架无价值空壳页；回归“一个页面满足一个明确需求”并提供不可替代的信息增益。', date: '2023-10-19 / 2025-03-20', report: '两个月1359万访问网站被K教训复盘.md' },
  { scenario: 'SEO被罚与流量断崖', title: '改版将服务端渲染（SSR）误改为纯前端（CSR）导致排名归零', desc: '改版时未做预渲染，导致 Googlebot 抓取时正文内容空白，关键词密度与语义信号瞬间清零。', sop: '改版前后必须用 GSC“网址检查”对比渲染 HTML；核心内容必须在初始服务端响应中直出。', date: '2026-07-29', report: 'GSC四级阶梯预警信号与降权诊断排查SOP.md' },
  { scenario: '外链采购与投放深坑', title: '外链全部使用 100% 精确匹配锚文本致核心词被搜索引擎隐藏', desc: '买外链时全部用同一个核心词做锚文本，被 Google 算法识别为人工操纵外链，核心词直接被压制降权。', sop: '严格维持锚文本多样性：品牌名 + URL + 自然长句占比 80% 以上，精确匹配词控制在 20% 以下。', date: '2026-07-30', report: '30万美金外链学费解密与企业级SEO五层体系.md' },
  { scenario: '外链采购与投放深坑', title: '广告投放盲目提高出价放量导致获客成本（CPA）失控崩塌', desc: '细分市场精准池有限，强行将出价提高；算法为消耗预算抓取海量泛人群，展示暴增但转化率断崖下跌。', sop: '广告达到稳定出单后保持克制；想要增量应通过开辟新市场、测试新受众或新产品扩展，不强求单组无限放量。', date: '2026-08-05', report: '广告投放模型训练与小预算ROI翻盘SOP.md' },
  { scenario: '选品与方向误区', title: '新手打王者局：盲目挑战已被大站首页垄断的成熟大词', desc: '新手一上来挑竞争极其惨烈的成熟老词，首页全是权重 DR 80+ 的老站，新站因无品牌与外链积累沦为炮灰。', sop: '新手必须坚持“找新词、做小词、保小图大”；从 Google Trends 抓新词或从垂直长尾场景切入。', date: '2026-08-09', report: '1300精准UV零出单排查与转化漏斗调优SOP.md' },
  { scenario: '选品与方向误区', title: '只看 Google Trends 飙升百分比追到虚假热度', desc: '某些冷门词查询从 1 次到 10 次涨幅虽高达 1000%，但实际毫无真实用户密度与付费意愿。', sop: '执行 4 维信号交叉验证：Trends 发现 + YouTube 创作者跟进 + TikTok 裂变 + Discord 玩家讨论。', date: '2026-08-06', report: '大厂裸辞追新词实操与4维信号交叉验证SOP.md' },
  { scenario: '支付、扣费与合规', title: 'AI 生成任务报错或超时仍扣除用户积分导致客户愤然流失', desc: '后端未做严格事务校验，用户遇到失败还被扣额度，引发强烈被剥夺感与差评退款。', sop: '代码严格事务把关，仅在生成成功交付后才扣减积分；失败即刻弹窗友好提示并原路返还额度。', date: '2026-08-09', report: '1300精准UV零出单排查与转化漏斗调优SOP.md' },
  { scenario: '团队组织与心态', title: '带着大厂打工惯性开会排期，闭门造车几个月做复杂产品', desc: '习惯了等别人拆任务、追求代码绝对完美；几个月不上线，未经验证就耗尽了热情与启动资金。', sop: '树立“Web 优先、3 天上线、以赚美元为唯一正反馈”心智；用 AI Agent 作为全天候全栈执行系统。', date: '2026-08-10', report: '技术高管转型Web优先与老站功能复用增长模型.md' }
];

const siteData = {
  version: '1.2.0',
  totalArticles: articles.length,
  totalReports: Object.keys(reportsMap).length,
  pacerGuide: PACER_MAP,
  stages,
  articles,
  reports: reportsMap,
  pitfalls: pitfallsData
};

const jsContent = `// Pre-compiled Learning Hub Data (v1.2 with Priority & Chinese PACER Tags)\nwindow.GF_SITE_DATA = ${JSON.stringify(siteData)};\n`;
fs.writeFileSync(path.join(siteDir, 'data.js'), jsContent, { encoding: 'utf8' });

console.log(`Updated data.js generated! Size: ${fs.statSync(path.join(siteDir, 'data.js')).size} bytes`);
