---
title: "Claude Code之父的13大cc使用技巧"
date: 2026-01-04
type: content-analysis
source: data/[2026-01-04-1325]ClaudeCode之父的13大cc使用技巧.html
tags:
  - summary
  - ClaudeCode之父Boris
  - 13大使用技巧
  - Opus4.5思考模式
  - CLAUDE.md动态演进飞轮
  - 浏览器自动验证闭环
  - 建站与开发
---

# Claude Code 之父 13 大实操技巧与验证闭环 SOP - The Creator's Claude Code Masterclass: Boris's 13 High-Leverage Protocols, Agentic Pipelines & The Verification-Loop Paradigm

## Core Summary

> [!abstract] TLDR
> 基于 Anthropic 官方 **Claude Code（简称 CC）** 核心缔造者 Boris Cherny（曾在 30 天内提交 259 个 PR、497 次 Commit、全量由 CC + Opus 4.5 编写 7.8 万行代码、消耗 3.25 亿 Tokens）公开的实战心得，系统深度解密了这位创建者本人高频高能使用 CC 的 **13 大核心实操技巧与工程工作流**：系统阐明了 **“并行多开 5 个终端 + Web 端 5~10 个实例双线作战”、“全程锁定 Opus 4.5 + 思考模式（大模型少返工，综合速度反超小模型）”、“团队 Git 共享维护 `CLAUDE.md`（建立‘犯错 $\rightarrow$ 记录 $\rightarrow$ 规则沉淀 $\rightarrow$ 免疫’的正向飞轮）”、“从 Plan 模式开始规划”、“子代理做流程自动化而非专家分割”**；并重点揭示了最核心的**第 13 条法则——“为 Claude 配备自动化验证工作流（如 Chrome DevTools 扩展自动跑 UI 测试与代码自修复，产出质量提升 2~3 倍）”**。
>
> - **创建者 Boris 的 13 大 Claude Code 实操神技（The 13 Creator Techniques）**：
>   1. **多终端并行（Parallel Instancing）**：在本地开 5 个 CC 终端（标签 1~5），通过系统通知提醒输入；
>   2. **本地 + 网页端双线作战（Hybrid Local-Web Workflow）**：通过 `claude.ai/code` 同时跑 5~10 个任务，用 `&` 后台交接或 `--teleport` 跨端无缝切换；
>   3. **全程锁定 Opus 4.5 + 思考模式（Opus-Only Rule）**：工具调用与推理极强，极少需要人工引导，最终整体交付耗时远低于频繁返工的小模型；
>   4. **动态维护共享 `CLAUDE.md`（The Error-Learning Flywheel）**：
>      $$\mathbf{Claude\ 犯错} \longrightarrow \mathbf{记录到\ CLAUDE.md} \longrightarrow \mathbf{提交\ Git\ 团队共享} \longrightarrow \mathbf{下次运行彻底免疫}$$
>   5. **Code Review 联动规则更新**：PR 评审时 `@.claude` 自动将新规则写入 `CLAUDE.md`（`/install-github-action`）；
>   6. **绝大多数会话从 Plan 模式开始（Plan-First Protocol）**：双击 Shift+Tab 进入 Plan 模式，来回讨论确定方案后再切入自动编辑；
>   7. **Slash Commands 固化高频内循环**：在 `.claude/commands/` 下定义自定义命令（如 `/review` 让 Claude 自查）；
>   8. **子代理做流程自动化（Subagent Automation）**：配置 `code-simplifier`（代码精简）与 `verify-app`（端到端测试），**坚决不做切碎上下文的“专家子代理”**；
>   9. **PostToolUse 钩子自动格式化**：在关键检查点用钩子自动触发代码美化；
>   10. **`/permissions` 预授权已知命令**：替代危险跳过，兼顾安全与全自动；
>   11. **将 CC 视作通用 Agent**：调用 MCP 连通 Slack、跑 BigQuery、从 Sentry 抓报错日志；
>   12. **超长任务使用 `ralph-wiggum` 循环插件**：让 Claude 在后台持续自我循环直至完成终极目标
> - **终极核心秘诀：自闭环验证机制（The Closed-Loop Verification Mandate）**：
>   $$\mathbf{编写代码} \longrightarrow \mathbf{自动运行\ Bash/测试套件/Chrome\ 扩展} \longrightarrow \mathbf{发现界面与逻辑缺陷} \longrightarrow \mathbf{自我修复代码} \longrightarrow \mathbf{再验证}$$
>   - 不给 Claude 验证手段，它只能交付“盲猜代码”；一旦赋予它在浏览器或终端自我测试的闭环，产出质量将发生 **2~3 倍的质变跃迁**

---

## Mind Map

```
Claude Code 之父 13 大实操技巧与验证闭环 SOP
├── 核心基建：Opus 4.5 + 思考模式 (大模型少返工总用时更快) ↔ 多终端并行 (本地5个+网页10个) ★
├── 规则飞轮与规划：Plan 模式先行 (Shift+Tab) ➔ 团队 Git 共享维护 CLAUDE.md (犯错即免疫) ★
├── 流程加速：Slash 命令固化内循环 / 子代理做流程自动化 (拒绝切碎上下文的专家子代理) / MCP 工具调用
└── 终极胜负手 (第 13 条)：给 Claude 验证工作的方式！★
    └── 结合 Chrome 扩展与测试套件自跑自改 → 形成完整闭环，产出质量暴增 2~3 倍！★
```

---

## Theme Analysis

### Theme 1: Closed-Loop Tool Use & Context Preservation 闭环工具使用与上下文保真

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 自我验证是智能体代码质量的倍增器 | 拥有反馈回路的 AI 能在交付给人类之前自行消除 90% 的低级语法与 UI 渲染错误 | 第 13 条验证法则 |
| 避免人为割裂上下文的虚假专业分工 | 大模型具备全栈推理能力，按流程划分子代理优于按学科角色划分子代理 | 子代理使用规范 |
| 规则文档的生命周期在于持续迭代 | 将 CLAUDE.md 当作会生长的代码资产，每次踩坑都是对模型指令集的永久强化 | CLAUDE.md 飞轮 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **在项目根目录创建 `CLAUDE.md`，每次发现 AI 编码偏好错误时立即追加一条明确规则**
> 2. **在让 AI 编写复杂功能前，强制其先进入 Plan 模式输出分步计划并由人工确认**
> 3. **为 AI 接入命令行测试套件或浏览器自动化 MCP，让其写完代码后自行验证效果**

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文系统梳理了 Claude Code 之父 Boris 的 13 大实操技巧与浏览器自动化测试验证 SOP。

### Digest Actions

核心是**Claude Code 之父 13 大实操技巧与验证闭环**——出海开发者驾驭前沿 Agentic Coding 工具、搭建自动化代码产出流水线与倍增开发效率的权威指南。

1. **核心配置**：Opus 4.5 + Plan 模式先行
2. **规则演进**：Git 共享 `CLAUDE.md` 动态免疫飞轮
3. **验证闭环**：结合 Chrome 扩展与 Bash 测试自跑自修

### Reflection Questions

- [ ] 你的 AI 编程工作流是在每次从零纠错，还是通过 `CLAUDE.md` / Cursor Rules 建立了规则沉淀机制？
- [ ] 你是否为 AI 提供了自我运行和验证代码的环境，还是每次都在肉眼帮 AI 找 Bug？
