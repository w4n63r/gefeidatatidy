# 04｜交接说明：给 Antigravity 继续执行（逐篇精读剩余 544 篇）

> 本文件是**项目交接文档**，Antigravity（或任何 AI 编码代理）按本文即可无缝接手。
> 目标：把 `data/` 下 726 篇"个人开发者出海"公众号文章，**逐篇精读**并产出结构化分析报告，最终构建一套学习系统（知识流程）。
> 当前状态：**已完成 182 / 726**（前序在 Codex 中完成），你从**第 183 篇**续跑，直到 726 篇全部处理完。

---

## 1. 项目背景（30 秒了解全貌）

- 语料：`data/` 下 726 个 `.html`（2019-10 ~ 2026-08，公众号"哥飞"文章），主题 = 个人开发者出海做网站赚美元。
- 最终目标：逐篇分析每篇文章"教了什么/属于出海哪一步/需要什么前置知识"，从而构建"**先学什么、再学什么**"的知识流程（先全局地图，后逐篇精读，再综合成流程）。
- 你负责的环节：**阶段4 —— 逐篇精读**（这是最耗时的一步，每篇都要真读正文）。
- 后续环节（阶段5-9：知识流程终稿/汇总/思维导图/质检）**暂不需要你执行**，除非用户另行要求。

---

## 2. 当前进度快照（2026-08-17，已对账）

| 项目 | 数值 |
|---|---|
| 总文章数 | 726（707 篇有正文 ok / 13 篇 image_only / 6 篇 unparseable） |
| 已完成分析 | **182 篇**（147 份完整报告 + 35 篇仅标阶段） |
| **待处理** | **544 篇** |
| 全局知识地图 | ✅ 已生成：`知识流程/全局知识地图.md`（9 阶段主线 S0~S8 + 贯穿层） |
| 地图校验反馈 | `output/analysis/map_feedback.md`（84 条，精读中发现的地图偏差记录） |

**已分析阶段分布**：
`S0_认知与心态:20 | S1_需求与关键词:34 | S2_建站与开发:16 | S3_SEO与流量入门:17 | S4_内容与多语言:5 | S5_SEO进阶与增长:14 | S6_变现与商业化:28 | S7_收款与合规:1 | S8_避坑警示:2 | S9_非学习类:34`

**未处理队列起点（你从这里开始，第 1-10 篇）**：
1. `[2023-03-24-1019]开源了一个不使用任何后端框架纯php实现流式调用OpenAIgpt接口的项目`
2. `[2023-07-28-0800]关于用户归因一次给你讲透`
3. `[2023-08-03-0800]用三个案例来详细解释大型网站的SEO引爆点为什么是生成几十万个页面给搜索引擎收录上`
4. `[2023-08-04-0800]ChinaTravelDepotcom2008年通过生成大量页面三个月时间网站流量增长`
5. `[2023-08-05-0800]金山词霸icibacom2008年通过生成页面半年时间日IP从50万增长到100万`
6. `[2023-08-11-0800]5000字调查分析建站20天拿下480万访问量俄罗斯版的妙鸭相机是怎么做到的`
7. `[2023-08-16-0800]如何浏览一个网站10年前的样子`
8. `[2023-08-17-0902]以四条中标的风向标为例告诉你如何写出能够中标的风向标`
9. `[2023-08-22-0800]Adsense账号注册审核网站审核的一点经验分享`
10. `[2023-09-06-0800]5000字长文海外工具从需求挖掘到网站制作全流程让你一篇文章学会`

---

## 3. 环境（Windows / PowerShell）

- 工作目录：`D:\Users\Administrator\Desktop\gfData\哥飞`
- Node.js v22 ✅；`tools/` 已装 `cheerio`、`markmap-cli`（本任务只用 cheerio/脚本，markmap 供阶段6 用）。
- 方法论技能：`.agents/skills/summarizer/SKILL.md`（开源技能，**开工前必须完整读一遍**）。
- 关键目录：`scripts/`（辅助脚本）、`output/clean/`（清洗后正文）、`output/analysis/`（分析数据）、`知识流程/文章分析/`（报告输出）、`知识流程/全局知识地图.md`。

---

## 4. 你要做的事：阶段4 逐篇精读（剩余 544 篇）

### 4.1 方法论（必须遵守）
开工前先完整读 `.agents/skills/summarizer/SKILL.md`，按其 Phase 1-4 与 Output Template 执行。每篇报告必须包含：
- YAML front matter（title / date / type: content-analysis / source / tags）
- **Core Summary**：`> [!abstract] TLDR` + 3-5 条加粗要点（证据来自正文）
- **Mind Map**：box-drawing 字符树（├── └── │）
- **Theme Analysis**：2-4 个主题，每个含 `Dimension | Insight | Supporting Evidence` 表格 + `> [!tip]-` 或 `> [!warning]-` 的 Top 3 Actionable Recommendations
- **PACER Application**：按 SKILL.md 决策逻辑归 P/C/A/E/R，给 Digest Actions + Reflection Questions
- 风格：英文给主题名/概念，中文给解释/建议；**证据必须来自正文，不编造**。

### 4.2 每篇的"阶段分类"（stage）
按正文内容归到（与 `全局知识地图.md` 一致）：
`S0_认知与心态`、`S1_需求与关键词`、`S2_建站与开发`、`S3_SEO与流量入门`、`S4_内容与多语言`、`S5_SEO进阶与增长`、`S6_变现与商业化`、`S7_收款与合规`、`S8_避坑警示`、`S9_非学习类`。
- 案例拆分类 → 按主题归入对应阶段（如 SEO 案例→S3/S5、变现案例→S6）。
- 新闻/活动/月总结/榜单/通知/个人随笔 → `S9_非学习类`（可只标阶段不写报告）。
- 分类拿不准时：参考 `map_feedback.md` 里已有的归类先例。

### 4.3 续跑操作（严格按此流程，保证可续跑、不重复）

1. **读下一批文章**：运行
   ```powershell
   node .\scripts\batch_reader.js <start> <count>
   ```
   - `start` 从 0 开始（0 = 未处理队列第一篇）；`count` 建议 **1-2 篇/次**（文章全文较长，输出会被截断）。
   - `batch_reader.js` 会自动**跳过已处理 id**，输出的就是待处理队列。
2. **逐篇精读**：每篇**完整读 cleaned_text 全文**（长文分 2-3 段读，见"常见坑"）。
3. **写报告**：保存到 `知识流程/文章分析/<id>.md`（文件名可用简短描述名，如 `用户归因一次讲透.md`，但 analysis 里 report 字段填实际路径）。
4. **追加分析条目**：在 `output/analysis/articles_analysis.jsonl` 末尾追加一行 JSON（**每行一个 JSON**，字段见第 5 节）。
5. **记录地图偏差**：如果某篇的阶段/依赖与 `全局知识地图.md` 不符，追加到 `output/analysis/map_feedback.md`（格式：`## 第N批 ...` + 编号条目）。
6. **image_only / unparseable（19 篇）**：不硬读正文，只追加一条 stage 条目（按标题猜阶段，拿不准标 `S9`），`teaches` 留空、`report` 留空。
7. **每批结束**：更新 `output/progress_analysis.json`（把 counts.analyzed / remaining / reports_written / stageDistribution 改对），并向用户简报进度。

### 4.4 节奏建议
- 每轮对话建议处理 **4-8 篇**（质量优先，别贪多）。
- 进度以文件为准：`articles_analysis.jsonl` 是"已完成"的唯一事实来源；`batch_reader.js` 的队列即"待处理"。

---

## 5. 数据结构规范（articles_analysis.jsonl 每行）

```json
{
  "id": "文件名去掉.html（必须与 output/clean 中完全一致）",
  "title": "标题",
  "date": "YYYY-MM-DD",
  "stage": "S1_需求与关键词",
  "teaches": ["这篇教了什么(3-6条)"],
  "prerequisites": ["读者需要先会/先看什么(可空)"],
  "difficulty": 1,
  "minutes": 12,
  "pacer": "P",
  "summary": "≤40字一句话摘要",
  "pitfalls": ["文中提到的坑(可空)"],
  "keywords": ["关键词(2-5个)"],
  "report": "知识流程/文章分析/<文件名>.md"
}
```

⚠️ **id 必须与 `output/clean/articles_clean.jsonl` 里的 id 完全一致**（之前出现过 id 不一致导致"看似做完实则没做"的问题，已修复；请新条目严格从 batch_reader 输出里复制 id）。

---

## 6. 常见坑（务必注意）

| 坑 | 解决 |
|---|---|
| PowerShell 把中文脚本经管道传给 node 会乱码 | 所有含中文的脚本**写成 .js 文件**再 `node .\scripts\xxx.js` 运行；不要用 `@'...'@ \| node -` 传中文 |
| 一次打印多篇全文会**截断输出** | 每次只读 1-2 篇；长文（>4000 字）用 `text.slice(0,4000)` / `slice(4000,8000)` 分段读 |
| 中文文件名/路径 | PowerShell 用 `-LiteralPath`；Node 用 `fs.readFileSync/readdirSync` |
| 读不到某篇 | 用日期前缀匹配（如 `x.id.includes('2023-08-03')`）而非精确标题 |
| 报告太多难管理 | 文件名用简短描述（如 `海量页面SEO引爆点.md`），analysis 里 report 字段写实际路径 |

---

## 7. 验收与完成标准

- `output/analysis/articles_analysis.jsonl` 最终条目数 = 726（每篇一条，id 全部能在 `output/clean` 中找到）。
- `知识流程/文章分析/` 报告数 ≈ 707（有正文的）；19 篇仅标阶段。
- 抽查已写报告：TLDR/导图/主题表/PACER 齐全，证据来自正文。
- `output/progress_analysis.json` 中 `remaining` 归零，`stage4_status` 改为 `done`。
- `data/` 未被改动；所有新产出都在 `知识流程/文章分析/`、`output/analysis/`、`output/progress_analysis.json`、`map_feedback.md`。

---

## 8. 给 Antigravity 的起始指令（可直接粘贴到 Antigravity）

> 请阅读根目录的《04-交接说明-给Antigravity.md》和《02-执行手册-给Codex按步骤执行.md》的阶段4，以及 `.agents/skills/summarizer/SKILL.md`（完整读）。项目：把 data/ 下 726 篇出海公众号文章逐篇精读分析；已完成 182 篇（见 output/analysis/articles_analysis.jsonl），请从剩余 544 篇续跑（用 `node .\scripts\batch_reader.js 0 1` 获取队列，跳过已处理 id）。每篇：完整读 output/clean 中的正文 → 按 summarizer 方法论写报告到 知识流程/文章分析/ → 追加一行到 articles_analysis.jsonl → 有地图偏差记入 map_feedback.md → 每批更新 progress_analysis.json。image_only/unparseable 仅标阶段。每批（4-8 篇）向我简报进度；全部 726 篇处理完并报告统计后停下，**不要执行阶段5-9**（除非我另外要求）。

---

## 9.（可选，提前了解）之后要做的事

阶段4 完成后（由你或原会话执行）：
- **阶段5**：综合 `全局知识地图.md` + 逐篇分析 + `map_feedback.md`，用 `learning-roadmap` 结构产出 `知识流程/知识流程.md` + 流程图（HTML/.mmd）。
- **阶段6**：`output/学习资料汇总.md` + `output/避坑经验汇总.md`。
- **阶段7**：思维导图（markmap-cli 已装）。
- **阶段9**：`output/README-结果说明.md` + 质检。

（阶段4 期间不需要碰这些。）
