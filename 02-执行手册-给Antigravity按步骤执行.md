# 02｜执行手册 v5：先全局调查、再逐篇精读、后构建知识流程（给 Codex 按步骤执行）

> 本文件由 Codex（你，模型/代理）执行。从**阶段0** 到 **阶段9** 按顺序完成。
> 工作目录 = 本文件所在目录（Windows / PowerShell）。
> **v5 修正（关键）**：正确方法 = **先全局、后局部、再综合**，绝不按文件顺序或少数几篇定流程：
> 1. **阶段3 先全局调查**：通读全部 726 篇（标题+开头段）→ 画出全局知识地图（`知识流程/全局知识地图.md` 已有初稿，作为标准）；
> 2. **阶段4 再逐篇精读**：用 summarizer skill 逐篇读正文 → 把每篇归位到地图的阶段，并校验/修正地图；
> 3. **阶段5 后综合**：用 learning-roadmap 结构产出知识流程终稿。
> 质量标准参照：`知识流程/全局知识地图.md`（全局地图初稿）、`知识流程/文章分析/`（5 篇精读样张）。

---

## 0. 目标与硬性约束

**目标**：把 `data/` 下 726 篇公众号文章，变成"内容驱动的出海学习系统"：
1. **全局知识地图**（先全局：语料库整体结构 + 作者内置路线图）；
2. **逐篇精读报告**（summarizer skill 格式，每篇都读正文）；
3. **知识流程终稿**（learning-roadmap 结构：前置→分阶段→里程碑→自测→常见坑）；
4. 学习资料汇总 + 避坑经验汇总；5. 思维导图；6.（可选）学习台。

**硬性约束**
- **只读 `data/`**；只写 `scripts/`、`output/`、`思维导图/`、`知识流程/`、`学习台/`、`.agents/skills/`。
- 统一 UTF-8；脚本写成文件后 `node .\scripts\xxx.js` 运行，**不要把含中文的脚本经管道 stdin 传给 node**。
- 路径含中文/方括号：PowerShell 用 `-LiteralPath`；Node 用 `fs` API。
- 全程 PowerShell。

**数据事实（已验证）**
- `data/` 726 个 .html；`output/raw/articles.jsonl` 已生成 726 行（707 ok / 13 image_only / 6 unparseable）。
- 已装开源 skill：`summarizer`、`learning-*`（`.agents/skills/`）；工具：`tools/`（cheerio、markmap-cli）。
- 已完成：`知识流程/全局知识地图.md`（全局初稿，基于通读全部标题）、`知识流程/文章分析/`（5 篇精读样张）、`output/raw/skipped_report.md`。

---

## 阶段0：环境与数据确认

```powershell
node --version
(Get-ChildItem -LiteralPath ".\data" -File).Count
(Get-Content -LiteralPath ".\output\raw\articles.jsonl" | Measure-Object -Line).Lines
Test-Path ".\.agents\skills\summarizer\SKILL.md"
Test-Path ".\知识流程\全局知识地图.md"
New-Item -ItemType Directory -Force -Path ".\scripts", ".\output\clean", ".\output\analysis", ".\output\learning", ".\思维导图", ".\知识流程\文章分析", ".\学习台" | Out-Null
```

- 若 skills 缺失：`npx -y skills add jiangxidong/agent-skill-summarizer -a codex --copy -y`、`npx -y skills add HermeticOrmus/learning-skills -a codex --copy -y`（需联网，向用户申请）。
- 先读 `知识流程/全局知识地图.md`（全局标准）+ `知识流程/文章分析/` 下 5 篇（精读标准）。

**验收**：726 文件、JSONL 726 行、skill 与全局地图存在。
**简报**：环境就绪。

---

## 阶段1：解析 HTML → JSONL（已完成，可增量）

`output/raw/articles.jsonl` 已有 726 行。新文章进 `data/` 后用 `scripts/extract_articles.js` 增量重跑（按 id 去重；`--force` 全量）。

**验收**：726 行；抽 3 篇与源文件一致。

---

## 阶段2：清洗正文

写 `scripts/clean_articles.js`：`output/raw/articles.jsonl` → `output/clean/articles_clean.jsonl`（新增 `cleaned_text`、`word_count`）。
- 删引导/尾注段（关键词命中且段长<40字）：`点击上方|点击关注|扫码|二维码|长按|设为星标|星标|点赞|在看|留言|转发|分享到|阅读原文|商务合作|加我微信|加微信|欢迎加入|赞赏`
- 删空行/纯符号行；压缩空白；段间一个换行；打印字数分布。

**验收**：抽 3 篇无引导语残留。

---

## 阶段3：全局语料调查（先全局，Top-Down，核心第一步）

> 目的：先看清"整个语料库长什么样、学这件事的正确骨架是什么"，**再**决定流程。禁止只看几篇就定流程。

**3.1 脚本统计**（`scripts/global_survey.js`，已有，可复用）：
- 全库分布、字数、依赖信号（"先看/前提/要懂/建议先"等）文章数；结果入 `output/analysis/global_survey.md`。
- 注意：**关键词正则只能当粗筛**，分布数据仅供参考，不要直接据此定流程。

**3.2 模型通读（必须做）**：
- 通读全部 726 篇的标题 + 每篇正文开头 1-2 段（分批打印阅读），建立全局认知；
- **重点找出作者内置的学习骨架**：路线图文章（36篇路线图 2023-08-14、养网站防老路线图 2023-10-29）和"养网站防老第0~9步"系列——这是流程骨架；
- 归纳 3 类内容：教程/方法、案例拆解、Meta（社群/榜单/通知→标"非学习类"）。

**3.3 产出**：更新 `知识流程/全局知识地图.md`（以现有初稿为底）：
- 全库结构说明 + 作者官方骨架；
- 9 阶段主线（S0 认知→S1 需求关键词→S2 建站→S3 SEO收录基础→S4 内容多语言→S5 进阶增长→S6 变现→S7 收款合规→S8 规模化团队）+ 贯穿层（案例/避坑/工具）；
- 每阶段：核心概念 + 代表文章（来自全库，注明日期）；
- 写明"为什么这个顺序"（作者钦定 + 依赖信号 + 递进逻辑）。

**验收**：全局地图覆盖全部 9 阶段+3 贯穿层；每阶段有≥5 篇代表文章；顺序有依据。
**简报**：向用户展示全局地图概览（阶段+篇数+顺序理由），用户确认后再进入逐篇精读。

---

## 阶段4：逐篇精读（后局部，Bottom-Up，用 summarizer skill）

> 先完整读 `.agents/skills/summarizer/SKILL.md`，按其 Phase 1-4 与 Output Template 执行。

1. 按 `status==='ok'` 过滤有正文文章（707 篇）；**分批（每批 20-40 篇）逐篇读 cleaned_text 全文**。
2. 每篇产出 summarizer 格式报告到 `知识流程/文章分析/<id>.md`（YAML 头 / `> [!abstract] TLDR` / box-drawing Mind Map / Theme Analysis 表 + Top3 建议 / PACER 消化策略），双语、证据来自正文。
3. 每篇追加一行到 `output/analysis/articles_analysis.jsonl`：
   ```json
   {"id":"...","title":"...","date":"...","stage":"S1_需求与关键词","teaches":["..."],"prerequisites":["..."],"difficulty":2,"minutes":12,"pacer":"P","summary":"≤40字","pitfalls":["..."],"keywords":["..."],"report":"知识流程/文章分析/<id>.md"}
   ```
   - `stage` 取值与全局地图一致：`S0_认知与心态`…`S8_规模化与团队`；案例拆解按主题归入对应阶段；非学习类标 `S9_非学习类`。
   - **同时校验全局地图**：若发现某篇的阶段/依赖与地图不符，在 `output/analysis/map_feedback.md` 记录（文章 id、地图怎么说的、实际怎么样）。
4. 进度写 `output/progress_analysis.json`，下次续跑。
5. 19 篇 image_only/unparseable：不硬读，按标题标阶段，teaches 留空。

**验收**：`articles_analysis.jsonl` 726 行；报告 ≥707 份；map_feedback.md 记录所有地图偏差。
**简报**：各阶段篇数分布 + 地图偏差数（说明全局地图是否被证实/需要修正）。

---

## 阶段5：知识流程终稿（后综合，用 learning-roadmap skill）

> 先完整读 `.agents/skills/learning-roadmap/SKILL.md`，按其结构组织。

写 `scripts/build_knowledge_flow.js`，综合【全局地图 + 逐篇分析 + map_feedback】，产出：

1. `知识流程/知识流程.md`（终稿）：
   - **Prerequisites 前置**：学之前要会什么（基本 GitHub、一个域名、基础英语等）；
   - **Phases 分阶段**（S0→S8，顺序即学习顺序）：每阶段 = 目标 / Topics（该阶段文章按难度升序+依赖排序）/ Practice（阶段行动清单）/ Resources（原文链接）；
   - 阶段间写明"为什么先学它"（引用作者路线图 + 具体文章内容）；
   - **Milestones 里程碑**（每阶段完成标志）；**Assessment 自测**（每阶段 2-3 题，答案附录）；
   - **Common pitfalls 常见坑**（贯穿，来自 pitfalls 汇总）；**Community 社群/资源**。
2. `知识流程/知识流程图.html`：纯 HTML/CSS 流程图（阶段方框+箭头，点阶段展开文章清单）。
3. `知识流程/知识流程图.mmd`：Mermaid `flowchart LR` 源。

**验收**：顺序有依据（作者骨架+内容证据）；依赖边正确；里程碑/自测/坑齐全；流程图可打开。
**简报**：流程概览 + 每阶段篇数。

---

## 阶段6：学习资料汇总 + 避坑经验汇总

- `output/学习资料汇总.md`：按 9 阶段分节，每节列"可学习方法"（源自各报告），开头"TOP 10 最值得先读"（S0/S1 优先 + 内容质量 + 作者路线图推荐优先）。
- `output/避坑经验汇总.md`：按场景分组（`SEO被罚与流量`、`外链与投放`、`选品与方向`、`支付与合规`、`团队与心态`、`技术实现`），每条 + 来源日期。

**验收**：无空节、可跳转。

---

## 阶段7：思维导图

- `思维导图/个人开发者出海-学习与避坑.md`：`#` 中心主题，`##` = 9 阶段（贯穿层标注"贯穿"），叶子 = 各阶段关键要点（≤20字 + 来源日期）。
- 生成 HTML：`node ".\tools\node_modules\markmap-cli\bin\cli.js" "思维导图\个人开发者出海-学习与避坑.md" -o "思维导图\个人开发者出海-学习与避坑.html"`
- 附加：mermaid mindmap 版 + FreeMind `.mm` 版。

**验收**：HTML >10KB、含 `<svg`。

---

## 阶段8：（可选）学习台——个人打卡进度 HTML

> 用户明确"进度"指知识流程而非个人打卡，本阶段可选（用户确认才做）。

若做：`scripts/build_learning_hub.js` 生成单文件 `学习台/学习首页.html`（localStorage 勾选、进度条、"读原文"链接 `../data/<id>.html`、"看报告"链接 `../知识流程/文章分析/<id>.md`）。

**验收**：勾选刷新保留；链接可开。

---

## 阶段9：汇总与质检

### 9.1 报告
`output/README-结果说明.md`：统计（726 篇、9 阶段分布、报告数、学习点/避坑点条数、地图偏差数）、文件清单与用法、已知限制（19 篇无正文）。

### 9.2 质检
- `articles.jsonl` 726 行；`articles_analysis.jsonl` 726 行；报告 ≥707 份。
- 抽 5 份报告与原文核对（证据真实）；`map_feedback.md` 已处理（地图已按反馈修正）。
- `知识流程/知识流程.md` + 流程图可打开；思维导图 HTML 含 `<svg`；（若做）学习台可用。
- `data/` 未被改动（726 文件）。

### 9.3 最终报告
向用户输出：全局地图概览（阶段+顺序+理由）、做了什么、结果在哪、统计、限制与建议。

---

## 完成标准（DoD）
- [ ] `output/raw/articles.jsonl` 726 行（已完成）+ `skipped_report.md`
- [ ] `output/clean/articles_clean.jsonl`
- [ ] `知识流程/全局知识地图.md`（阶段3 更新版）
- [ ] `output/analysis/articles_analysis.jsonl` 726 行 + `map_feedback.md`
- [ ] `知识流程/文章分析/` ≥707 份 summarizer 报告
- [ ] `知识流程/知识流程.md` + `知识流程图.html` + `.mmd`
- [ ] `output/学习资料汇总.md` + `output/避坑经验汇总.md`
- [ ] `思维导图/个人开发者出海-学习与避坑.md/.html`（+ mermaid / .mm）
- [ ] `output/README-结果说明.md`
- [ ] `data/` 未做任何改动

每完成一个阶段向用户简报；只有影响范围的决定（是否做学习台、是否联网装包）才需要先问用户。
