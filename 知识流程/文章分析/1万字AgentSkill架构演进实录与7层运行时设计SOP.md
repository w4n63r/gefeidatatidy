---
title: "我写了半年skill，直到上周才意识到自己从一开始就搞错了方向"
date: 2026-05-15
type: content-analysis
source: data/[2026-05-15-1348]我写了半年skill直到上周才意识到自己从一开始就搞错了方向.html
tags:
  - summary
  - 10700字AgentSkill反思
  - Skill不是提示词是运行时架构
  - Agent七层架构心智模型
  - 过程下沉与常驻地图瘦身
  - Hooks强制与CLAUDE建议
  - 建站与开发
---

# 1 万字 Agent Skill 架构演进实录与 7 层运行时设计 SOP - The Agent Skills Architectural Epiphany: From Prompt Engineering to Runtime Systems & The 7-Layer Agent Operating Model

## Core Summary

> [!abstract] TLDR
> 通过对顶级开发者长达半年编写与重构 Claude Code / OpenClaw 等 Agent Skills 的深度反思与万字长文解构，系统终结了业内将 Skill 误作为“更长的 Prompt 提示词文档”的初级认知，确立了 **“Skill 根本不是提示词文档，而是 Agent 运行时（Runtime System）中按需发现、挂载与执行的可部署模块单元”** 的核心第一性原理；系统建构了现代 AI Agent 架构的 **“7 层知识与行为分层心智模型（长期记忆 Memory $\rightarrow$ 常驻地图 CLAUDE.md $\rightarrow$ 目录级规则 Path Rules $\rightarrow$ 专题工作流 Skills $\rightarrow$ 动作工具 Tools/MCP $\rightarrow$ 确定性强制约束 Hooks $\rightarrow$ 隔离执行者 Subagents）”**；并系统给出了 **“Procedure 流程下沉、Description 触发词精修、Hooks 确定性拦截与常驻文件瘦身至 150 行”** 的全流程工程化 SOP。
>
> - **一、认知的致命误区与觉醒时刻（The Cognitive Epiphany）**：
>   - **致命误区**：把 Skill 当作“打包的提示词”，把所有规则塞进 `CLAUDE.md`（导致几百行臃肿，每次会话烧光 Token 且模型经常忽略细节）；
>   - **Vercel 评测警钟**：默认 Skill 有 **56% 的情况根本未被触发**；
>   - **底层第一性原理（First Principles）**：
>     $$\mathbf{Skill \ne Prompt} \quad \implies \quad \mathbf{Skill = Agent\ 运行时架构中的按需可部署单元（Deployable\ Unit）}$$
> - **二、Agent 系统的“7 层知识与行为架构模型”（The 7-Layer Architecture）**：
>   1. **Layer 1: Memory（长期记忆层）**：
>      - Auto memory / Memory Bank，由 Agent 在使用中自动沉淀长期偏好与修正教训，解决“失忆”；
>   2. **Layer 2: CLAUDE.md / AGENTS.md（常驻地图与项目级默认行为）**：
>      - **特性**：每次会话启动全量加载（高杠杆、高成本）；
>      - **规范**：**严格控制在 100~150 行**，只放高价值项目地图、默认流程、绝对 Gotchas；
>   3. **Layer 3: Nested Rules & Path-Scoped Rules（模块级约束）**：
>      - 子目录级按需懒加载（如仅在 `/api/` 或 `.ts` 文件生效），空间隔离避免无关约束污染；
>   4. **Layer 4: Agent Skills（按需专题工作流层）**：
>      - 包含 `SKILL.md` 正文、`scripts/` 脚本、`references/` 参考资料；
>      - **机制**：启动时仅展示 `name` 和 `description`，匹配任务后才**按需挂载**，不占用常驻 Token；
>   5. **Layer 5: Tools / MCP / CLI（动作与数据层）**：
>      - 工具负责真正干活（执行 curl、查库），Skill 负责指导“何时用、按什么顺序用”；
>   6. **Layer 6: Hooks（确定性硬约束层）**：
>      - **核心区分**：**`CLAUDE.md 是 advisory（建议），Hooks 是 deterministic（强制）`**；
>      - 凡是“必须每次发生、零例外”的校验（如 Lint、格式化），一律下沉为 Hook；
>   7. **Layer 7: Subagents（隔离执行者层）**：
>      - 派生独立子 Agent 执行高读写量的深度调研，彻底保护主会话上下文不受污染
> - **三、Skill 编写与重构的 3 大工程化黄金法则（Authoring Rules）**：
>   - **1. 过程下沉原则（The Procedure-Sink Rule）**：
>     - 一旦 `CLAUDE.md` 中的某段内容演化为“多步流程、分支判断、校验顺序”，立即迁移下沉为独立 Skill；
>   - **2. Description 触发词第一法则**：
>     - Description 是 Agent 决定是否加载该 Skill 的唯一依据，必须明确交代“何时用、输入什么、解决什么”；
>   - **3. 脚本与文档解耦**：
>     - 将复杂逻辑用 Python/Node 脚本实现，文档仅保留执行调用说明

---

## Mind Map

```
1 万字 Agent Skill 架构演进实录与 7 层运行时设计 SOP
├── 认知觉醒：【Skill 不是提示词！它是 Agent 运行时按需加载的可部署单元！】★
├── Agent 7 层架构心智模型 ★
│   ├── L1 Memory (自动沉淀) ↔ L2 CLAUDE.md (常驻地图，严格控在 100-150 行！) ★
│   ├── L3 Path Rules (目录懒加载) ↔ L4 Agent Skills (按需挂载的专题工作流) ★
│   ├── L5 Tools/MCP (执行动作) ↔ L6 Hooks (【确定性强制执行！零例外！】) ★
│   └── L7 Subagents (隔离深度调研，防止主上下文污染)
└── 3 大黄金法则：【流程下沉为 Skill】/ 精修 Description 触发词 / 脚本代码解耦！★
```

---

## Theme Analysis

### Theme 1: Context Economics & Layered Runtime Determinism 上下文经济学与分层运行时确定性

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 上下文窗口是极其昂贵的有限资源 | 盲目将所有操作规范塞入常驻文档不仅浪费 Token，更会造成模型注意力稀释导致指令失效 | CLAUDE.md 200 行反思 |
| 建议与强制的清晰工程分水岭 | 不能寄希望于概率性的自然语言提示词去保证 100% 的代码规范，必须通过确定性的 Hooks 进行前置拦截 | Hooks vs CLAUDE.md |
| 模块化解耦实现 Agent 系统的无限演进 | 通过将知识、流程、工具与执行者拆分为 7 层架构，能构建出像现代操作系统一样稳定可维护的智能体 | 7 层架构模型 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **立即审查根目录 `CLAUDE.md`，将超过 10 步的复杂操作流程全部剥离为独立 Skill**
> 2. **精简常驻提示词文档至 150 行以内，仅保留项目架构地图与核心开发命令**
> 3. **为 Git commit 检查或 Lint 格式化配置硬性 Hooks，消除对 AI 自觉性的依赖**

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文以 10,700 字深度反思系统给出了 Agent 7 层架构设计、Skill 模块化下沉、Hooks 配置与常驻地图瘦身的全流程工程化 SOP。

### Digest Actions

核心是**Agent Skill 架构演进与 7 层运行时设计 SOP**——出海开发者从浅层提示词工程跃迁为 Agent 操作系统架构师、驾驭 Claude Code 与构建高稳定性智能体的必读圣经。

1. **底层重塑**：Skill 是按需加载的可部署运行时模块
2. **7 层架构**：Memory $\rightarrow$ Map $\rightarrow$ Path $\rightarrow$ Skill $\rightarrow$ Tool $\rightarrow$ Hook $\rightarrow$ Subagent
3. **重构 SOP**：常驻地图瘦身 + 流程下沉 + Hooks 硬拦截

### Reflection Questions

- [ ] 你的 `CLAUDE.md` 是否已经臃肿到两三百行，导致 AI 频繁遗漏核心指令？
- [ ] 面对需要 100% 严格执行的代码规范，你是在靠文字提示词祈祷，还是配置了确定性的 Hooks 拦截？
