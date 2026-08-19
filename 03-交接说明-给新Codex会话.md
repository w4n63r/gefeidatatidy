# 03｜交接说明：给新 Codex 会话（只做阶段4 逐篇精读，从 23/726 续跑）

> 本文件是**执行中交接**。分工如下：
> - **新 Codex 会话**：只负责 **阶段4 逐篇精读**（从已完成的 23 篇续跑，直到 726 篇全部处理完）；
> - **原会话（当前这个）**：阶段0~3 已完成；**阶段5~9（知识流程终稿 / 汇总 / 思维导图 / 质检）由原会话在阶段4 完成后接手**。
> 新会话**不要**执行阶段5~9。

---

## 一、当前进度快照（2026-08-17）

| 阶段 | 状态 | 归属 |
|---|---|---|
| 0 环境确认 | ✅ 完成 | 原会话 |
| 1 解析 | ✅ 完成 | 原会话（`output/raw/articles.jsonl` 726 行） |
| 2 清洗 | ✅ 完成 | 原会话（`output/clean/articles_clean.jsonl` 726 行） |
| 3 全局语料调查 | ✅ 完成 | 原会话（`知识流程/全局知识地图.md`） |
| 4 逐篇精读 | 🔄 进行中 **23/726** | **新会话续跑** |
| 5 知识流程终稿 | ⏳ | 原会话（阶段4 完成后） |
| 6 汇总 | ⏳ | 原会话 |
| 7 思维导图 | ⏳ | 原会话 |
| 8 学习台（可选） | ⏳ 默认不做 | 原会话 |
| 9 汇总质检 | ⏳ | 原会话 |

**已分析清单**：`output/analysis/articles_analysis.jsonl`（23 行，每行含 stage/报告路径）。
**地图校验反馈**：`output/analysis/map_feedback.md`（8 条）。

---

## 二、新会话要做的事（仅阶段4）

1. 读《02-执行手册-给Codex按步骤执行.md》的**阶段4**（以及 `.agents/skills/summarizer/SKILL.md` 方法论）；阶段0~3 跳过。
2. 从 `output/clean/articles_clean.jsonl` 续跑，**跳过 `output/analysis/articles_analysis.jsonl` 中已存在的 id**（23 篇）。
3. 用 `scripts/batch_reader.js <start> <count>` 打印下一批未处理文章（count 建议 1-3 篇/次，避免输出截断）。
4. 每篇处理：
   - 按 summarizer skill 方法论**完整读正文**；
   - 写报告到 `知识流程/文章分析/<id>.md`；
   - 追加一行到 `output/analysis/articles_analysis.jsonl`（stage/teaches/prerequisites/difficulty/minutes/pacer/summary/pitfalls/keywords/report）；
   - 有地图偏差 → 追加到 `output/analysis/map_feedback.md`；
   - image_only/unparseable（19 篇）不硬读，仅标 stage，teaches 留空。
5. **每批或每 20 篇更新一次 `output/progress_analysis.json`**（把 analyzed 数改对），并向用户简报。
6. **726 篇全部处理完 = 阶段4 完成**：更新 `progress_analysis.json` 状态（stage4: done），**停下并向用户报告统计**，**不要**开始阶段5~9（由原会话接手）。

---

## 三、给新会话的起始指令（用户可直接粘贴）

> 请阅读根目录的《02-执行手册-给Codex按步骤执行.md》的**阶段4**，以及《03-交接说明-给新Codex会话.md》。阶段0~3 已完成、阶段4 已分析 23/726 篇（见 output/analysis/articles_analysis.jsonl）。你的任务**只做阶段4 逐篇精读**：从 output/clean/articles_clean.jsonl 续跑剩余文章（跳过已处理 id），按 .agents/skills/summarizer/SKILL.md 的方法论逐篇产出报告到 知识流程/文章分析/，维护 articles_analysis.jsonl、map_feedback.md 和 progress_analysis.json。每批结束向我简报；全部 726 篇处理完后停下报告统计，**不要执行阶段5~9**（由原会话接手）。

---

## 四、产出位置速查

- 逐篇报告：`知识流程/文章分析/`（20 份已有，目标 707+ 份）
- 分析数据：`output/analysis/articles_analysis.jsonl`
- 地图偏差：`output/analysis/map_feedback.md`
- 进度：`output/progress_analysis.json`
- 原会话接手点：阶段4 完成后，用 `output/analysis/articles_analysis.jsonl` + `map_feedback.md` + `全局知识地图.md` 做阶段5~9
