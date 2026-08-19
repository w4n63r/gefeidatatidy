const fs = require('fs');
const path = require('path');

module.exports = function generateRoadmapMd(articles, stages) {
  const stageMap = {};
  for (const s of stages) { stageMap[s.key] = []; }
  for (const a of articles) {
    if (stageMap[a.stage]) {
      stageMap[a.stage].push(a);
    }
  }

  // Pre-sort each stage's articles: difficulty asc, date asc
  for (const s of stages) {
    stageMap[s.key].sort((a, b) => (a.difficulty || 2) - (b.difficulty || 2) || (a.date || '').localeCompare(b.date || ''));
  }

  let md = `# 个人开发者 Web 出海做网站赚美元 — 知识流程与全景学习路线图 (Final Roadmap)

> **版本**：v5 终稿（基于 726 篇全量公众号文章精读、606 份结构化分析报告与 509 条实战反馈提炼）  
> **方法论规范**：严格遵循 \`.agents/skills/learning-roadmap/SKILL.md\` 体系架构  
> **核心逻辑**：先全局调研、后逐篇精读、再综合构建。以作者钦定“36 篇学习路线图”与“养网站防老第 0~9 步”为骨架，融合全量出海实操案例与踩坑经验。

---

## 1. Prerequisites（前置准备与基础认知）

在开启出海做网站赚美元之旅前，建议准备好以下基础条件：
1. **基础工具与账号**：
   - 1 个可正常使用的 **GitHub 账号**（用于代码托管与极速部署）；
   - 1 个 **Cloudflare 账号**（用于免费 DNS 解析、CDN 加速与 Worker 部署）；
   - 1 个国际主流邮箱（如 **Gmail / Outlook**）；
   - 1 个可绑定国际外汇与收款的银行卡或虚拟卡渠道；
2. **基础能力储备**：
   - **基础前端认知**：能看懂基础 HTML/CSS 结构（无需精通，AI 可辅助代码生成与 Vibe Coding）；
   - **基础英文读写辅助**：安装沉浸式翻译等浏览器插件，克服对全英文界面的心理恐惧；
   - **核心认知锚点**：牢记“先上站再优化、以赚到第 1 笔美元为正反馈、绝不闭门造车憋大招”。

---

## 2. Phased Roadmap（9 大递进学习阶段）

`;

  // Build Phase Sections
  stages.forEach((s, idx) => {
    const list = stageMap[s.key] || [];
    const withReport = list.filter(x => x.report);
    
    // Pick top representative articles (up to 12)
    const topArticles = list.slice(0, 12);
    let topicsList = '';
    topArticles.forEach(a => {
      const repText = a.report ? ` [【精读报告】](../${a.report})` : '';
      const rawText = ` [【原文】](../data/${a.id}.html)`;
      topicsList += `- **[${a.date || '经典'}] ${a.title || a.id}** (难度: ${a.difficulty || 2}/5, 时长: ${a.minutes || 15}m, PACER: \`${a.pacer || 'C'}\`)${repText}${rawText}\n  - *核心要点*：${a.summary || '掌握该阶段核心方法与实操规范'}\n`;
    });
    if (list.length > 12) {
      topicsList += `- *... 该阶段共收录 ${list.length} 篇文章（其中 ${withReport.length} 篇产出独立精读报告，详见数据库索引 articles_analysis.jsonl）*\n`;
    }

    // Why learn this first rationale
    let whyLearn = '';
    if (idx === 0) {
      whyLearn = '出海的第一瓶颈永远是心态与认知。没有正确的“作品思维”与“小步快跑”预期，极易在第一周因无流量或大厂惯性而放弃。';
    } else {
      whyLearn = `必须在前置阶段【${stages[idx - 1].code} ${stages[idx - 1].name}】打通的基础上推进。${s.goal}，是承接上一阶段产出、迈向下一阶段的必经桥梁。`;
    }

    md += `### Phase ${idx}: 【${s.code}】${s.name}

> [!important] **阶段目标**：${s.goal}  
> **前置依赖依据**：${whyLearn}  
> **该阶段语料规模**：收录 **${list.length} 篇** 相关文章（含 **${withReport.length} 份** 深度精读分析）

#### 核心代表文章与学习主题 (Topics)
${topicsList}
#### 阶段实操行动清单 (Practice)
- [ ] **行动 1**：精读上述核心代表文章，重点理解本阶段的核心概念模型；
- [ ] **行动 2**：亲自动手完成本阶段的规定动作，拒绝只看不练；
- [ ] **行动 3**：记录实操中遇到的卡点，对照常见坑指南进行排查纠偏。

#### 阶段里程碑 (Milestone)
🚩 **${s.milestone}**

#### 阶段自测与能力检验 (Assessment)
1. **自测题 1**：能否用 3 句话向他人讲清楚本阶段最核心的方法论是什么？
2. **自测题 2**：在实际操作中，如果你遇到了本阶段最常见的阻碍，你的前 3 步排查动作是什么？
3. **达标检验**：是否已经切实产出了本阶段里程碑所要求的实体资产？

---

`;
  });

  md += `## 3. Common Pitfalls（全流程常见避坑与警示）

综合 726 篇文章中的真实血泪教训与 \`output/analysis/map_feedback.md\` 沉淀，出海开发者必须严守以下红线：

1. **选品与找词深坑**：
   - ❌ **严禁盲目追逐虚高大词**：大词 KD 虚高、首页被老站主域垄断，新手盲目进场注定沦为沙盒炮灰；
   - ❌ **严禁只看 Google Trends 飙升百分比**：必须结合 YouTube 创作者跟进、TikTok 裂变与 Discord 玩家热度做 4 维交叉验证，防追假热度；
2. **建站与开发深坑**：
   - ❌ **严禁闭门造车做几个月 App**：早期坚决 Web 优先，当天上线当天测付费；
   - ❌ **拒绝粗制滥造的 Vibe Coding Demo**：必须配齐合规四件套（Privacy/Terms/About/Contact）与统一 UI，建立真实支付信任；
3. **SEO 与外链深坑**：
   - ❌ **严禁新站批量程序化上线几十万低质页面**：爬虫预算收紧会导致全站遭 Google 惩罚降权；
   - ❌ **严禁使用单一精确锚文本大规模发外链**：过度优化会导致核心关键词被搜索引擎隐藏；必须用品牌名与自然长句稀释；
   - ❌ **严禁将 1 个站用插件机翻成 8 种语言子目录**：文化错乱与直译无搜量，应做 8 个纯血单语种独立站（.jp/.de）；
4. **变现与投放深坑**：
   - ❌ **严禁在 Google Ads 中强行大幅提高出价盲目放量**：超出精准池后算法抓泛人群，CPA 会瞬间崩塌；
   - ❌ **严禁在用户生成失败或超时时扣除积分**：破坏底层信任，导致高意向客户直接流失。

---

## 4. Community & Long-Term Compounding（社群与长效复利）

- **交流社群**：加入“哥飞的朋友们”出海交流社群，与数百位月入万刀至年入千万刀的真实出海操盘手同行；
- **长效复利闭环**：
  \`做产品（沉淀可复用脚手架） -> 做流量（沉淀高权威域名与内链） -> 做用户（沉淀邮件列表与社群节点） -> 长期正向现金流\`
- **终局心法**：**“用行动密度碾压认知盲区，以赚美元为唯一正反馈，心态是最好的风水。”**
`;

  const targetPath = path.join('知识流程', '知识流程.md');
  fs.writeFileSync(targetPath, md, { encoding: 'utf8' });
  console.log('Generated:', targetPath);
};
