---
title: "我 Vibe Coding 一周，做了个桌面 Agent"
date: 2026-01-24
type: content-analysis
source: data/[2026-01-24-1629]我VibeCoding一周做了个桌面Agent.html
tags:
  - summary
  - VibeCoding一周做桌面Agent
  - 艾逗笔WorkAny实战
  - Tauri与HonoSidecar架构
  - ClaudeCode自动驾驶24步
  - 人人都是架构师洗衣机理论
  - 建站与开发
---

# Vibe Coding 一周开发桌面 Agent 实录与 24 步工程 SOP - The 7-Day Autonomous Vibe Coding Playbook: idoubi's WorkAny Desktop Agent, The Tauri-Hono Sidecar Architecture & The 24-Step Production Pipeline

## Core Summary

> [!abstract] TLDR
> 通过对顶级独立开发者艾逗笔（idoubi）**在 7 天时间内以 100% 全自动驾驶 Vibe Coding 模式独立打造并开源跨平台桌面 Agent 工具——`WorkAny.ai`（对标 Cowork / Manus，具备多模态对话、Artifacts 可视化预览、本地沙箱与自动化生成 PPT/Excel/网页能力）** 的深度全流程复盘，系统公开了极速交付现代复杂桌面应用的 **24 步全流程工程化 SOP**：系统拆解了 **“Tauri（Rust 轻量外壳）+ Hono API 作为 Sidecar（规避复杂 Rust，用 TypeScript 搞定全业务）+ SQLite 本地持久化”** 的高雅技术架构；深度展示了如何通过 **Claude Code（同时开 3 个窗口并行干活）+ Claude Agent SDK + shadcn/ui + GitHub Actions 跨平台多系统自动构建与苹果开发者签名** 实现企业级交付；并深刻总结了 **“Vibe Coding 人人皆为建筑师、代码交给洗衣机、技术广度与全局视野是最大胜负手”** 的时代认知心法。
>
> - **WorkAny 架构核心设计：Tauri + Hono Sidecar 模式（The Architecture）**：
>   - **GUI 外壳**：选用轻量小巧的 Tauri（替代臃肿笨重的 Electron）；
>   - **后端业务解耦（Sidecar 模式）**：不熟悉 Rust 业务开发，让 CC 用 Hono 编写 API 作为独立 Sidecar 打包进 App，**Rust 仅充当轻量外壳**；
>   - **存储与环境**：SQLite 本地存储任务与会话数据；引入 Sandbox（Boxlite / Claude Sandbox）隔离运行代码
> - **24 步 Vibe Coding 全自动驾驶工程化 SOP（The 24-Step Pipeline）**：
>   $$\mathbf{1\sim 5.\ 快速原型} \longrightarrow \mathbf{6\sim 11.\ 架构与 UI} \longrightarrow \mathbf{12\sim 16.\ 多 Agent 抽象} \longrightarrow \mathbf{17\sim 24.\ 签名打包与 CI/CD}$$
>   - **1~5 步（极速起跑）**：Claude Agent SDK + OpenRouter/Claude Max，截图 Chatbot 交互由 CC 跑通基础对话；
>   - **6~11 步（界面与体验）**：Hono Sidecar 架构 + SQLite 本地存储；参考 Manus 截图设计**“左侧对话 + 右侧 Artifacts/虚拟计算机容器”**；接入 shadcn/ui 皮肤；
>   - **12~16 步（核心 Agent 能力）**：实现 MCP、Skills 调用（PPT/Excel/Doc 生成）；抽象 Agent Runtime（CC / Codex / DeepAgents）与 Sandbox 统一接口；
>   - **17~24 步（工程化与发布）**：构建脚本支持 Node/CC 内嵌打包与精简版（20MB）；配置 Apple 证书自动签名；GitHub Actions 自动化触发 Win/Linux/Mac 多平台 Release 构建；ShipAny 模板 1 天上线官网开源
> - **Vibe Coding 5 大核心底层认知心法（The 5 Vibe Coding Mindsets）**：
>   1. **全自动驾驶爽感**：代码 100% 由 Claude Code 编写，人类 1 行不写，开 3 个窗口并行指挥；
>   2. **技术平权与审美主导**：人人都是建筑师，对用户痛点的理解与产品审美（Sense）决定产品上限；
>   3. **全局视野与技术广度是定盘星**：懂架构与组件关系才能精准提 Prompt，遇到异常能秒级定界防止 AI 失控；
>   4. **洗衣机理论（The Washing Machine Metaphor）**：
>      - “以前总觉得手洗比洗衣机干净，现在完全交给洗衣机，又快又干净，能穿就行”——彻底破除手写代码执念；
>   5. **优秀程序员进化为超级指挥官**：法拉利老了依然是法拉利，核心竞争力升级为统筹驾驭多 Agent 矩阵

---

## Mind Map

```
Vibe Coding 一周开发桌面 Agent 实录与 24 步工程 SOP
├── 架构选型：Tauri (Rust 壳) + Hono API Sidecar (业务全在 TS) + SQLite 本地持久化 ★
├── 24 步全流程 SOP ★
│   ├── 原型与 UI：Claude Agent SDK + Manus 双栏布局 (左对话/右 Artifacts) + shadcn/ui
│   ├── Agent 引擎：MCP/Skills 集成 (PPT/Excel生成) + 抽象 Agent Runtime & Sandbox 统一接口
│   └── 交付发布：Apple 签名 + GitHub Actions 自动化跨平台构建 Win/Mac/Linux + ShipAny 官网开源！★
└── 5 大心法：【代码 100% 交给 AI 洗衣机】/ 3 窗口并行 / 广度与审美是胜负手 / 程序员升级超级指挥官！★
```

---

## Theme Analysis

### Theme 1: Autonomous Agentic Delivery & The Sidecar Decoupling Pattern 自主智能体交付与 Sidecar 解耦模式

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 架构组合拳规避技术短板 | 用熟悉的语言（TS/Hono）写核心逻辑并通过 Sidecar 嵌入原生外壳（Tauri），能绕过冷门技术栈的学习阻力 | Hono Sidecar 架构 |
| 跨平台打包与签名的工业化闭环 | 只有打通了 Apple 开发者证书签名与 GitHub Actions 自动 Release，才算完成了从玩具到商业级产品的交付 | 自动化 CI/CD 流程 |
| 人类的角色从码农彻底跃迁为产品总监 | 在全自动驾驶编码时代，最值钱的能力是知道“什么样的产品形态是符合用户直觉的”以及“如何拆解任务让 AI 依次攻克” | 5 大心法与洗衣机理论 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **在尝试开发桌面应用时，采用 Tauri + Node/Hono Sidecar 的轻量组合**
> 2. **在日常 AI 编程中，开启 2~3 个终端窗口并行让 AI 攻克不同模块**
> 3. **将 GitHub Actions 跨平台自动打包与 Release 构建作为项目的标配基础设施**

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文详细记录了艾逗笔利用 Vibe Coding 与 Claude Code 一周开发桌面 Agent 的 24 步完整工程化实操 SOP 与架构方案。

### Digest Actions

核心是**Vibe Coding 一周开发桌面 Agent 24 步实录**——出海开发者摆脱手写代码执念、掌握 Tauri+Sidecar 架构、驾驭 Claude Code 多窗口全自动驾驶的实操指南。

1. **架构设计**：Tauri + Hono Sidecar + SQLite
2. **24 步 SOP**：从 SDK 接入到 GitHub Actions 跨平台签名发布
3. **心法蜕变**：代码交给洗衣机，人类做超级指挥官

### Reflection Questions

- [ ] 你是否依然停留在手写每行代码的旧时代，还是已经熟练掌握了让多个 AI 智能体并行编程的指挥技巧？
- [ ] 你的桌面端或独立项目是否已经实现了 GitHub Actions 一键跨平台自动化打包构建？
