---
title: "我用 Claude 两天做了一个在线小游戏，很上瘾很上头"
date: 2026-03-09
type: content-analysis
source: data/[2026-03-09-2241]我用Claude两天做了一个在线小游戏很上瘾很上头.html
tags:
  - summary
  - Claude两天做小游戏
  - ZooBlocks实战复盘
  - 双消除双循环机制
  - 纯单文件HTML零依赖
  - 纯代码SVG萌系绘制
  - 建站与开发
---

# Claude 两天开发高粘性在线小游戏实录与 ZooBlocks 双循环 SOP - The 48-Hour Claude Game Craft: ZooBlocks Dual-Clear Engine, SVG Procedural Aesthetics & Zero-Dependency Web Architecture

## Core Summary

> [!abstract] TLDR
> 系统复盘了如何借助 Claude 在短短 **48 小时（两天）内从零设计并独立上线一款极度令人上瘾的爆款在线小游戏——`ZooBlocks.app`（方块消除 + 动物园放置挂机经营）** 的完整全栈工程实录：系统公开了其打破同质化玩法的 **“双消除核心引擎（行列填满消除 + 基于 BFS 洪水填充算法的同色相邻 $\ge 3$ 连通区域消除，支持双系统同时触发与递归连锁反应）”**；深度展示了拉长用户留存与生命周期的 **“双循环经济飞轮（消除方块赚钻石 $\longleftrightarrow$ 购买升级 12 级动物园挂机产出钻石并反哺消除模式得分倍率）”**；系统总结了 **纯单文件 HTML+CSS+JS 零外部依赖（秒开秒玩）、纯代码 SVG 动态绘制萌系动物面孔、`100dvh` 移动端视口防遮挡适配、Canvas 动态海报生成与 Web Share API 原生分享** 等一系列高阶前端交付实操 SOP。
>
> - **一、核心玩法与机制创新：双消除与双循环飞轮（Game Mechanics）**：
>   - **1. 双消除系统（Dual-Clear Engine）**：
>     - **行列消除（Line Clear）**：指数倍率计分（消 1 行 $\times 1$、消 2 行 $\times 4$、消 3 行 $\times 8$、消 4 行 $\times 16$）；
>     - **颜色匹配消除（Color Match / BFS 连通域）**：新放置方块与已有同色动物连通数 $\ge 3$ 时触发，必须包含新旧方块（鼓励玩家做布局）；
>     - **双系统同步触发与连锁**：一行消除填补空格的同时触发颜色消除，产生爆炸性多重得分；
>   - **2. 双循环经济飞轮（The Progression Loop）**：
>     $$\mathbf{消除方块赚钻石} \xrightarrow{\text{投入动物园}} \mathbf{购买升级 12 级动物（每级 10 倍产出递增）} \xrightarrow{\text{产生被动钻石}} \xrightarrow{\text{反哺消除得分倍率}}$$
> - **二、48 小时极速交付全流程工程化 SOP（The 48-Hour Pipeline）**：
>   - **Day 1 上午（基础单文件原型）**：纯 HTML + 原生 JS，无框架，单文件秒开部署 Cloudflare Pages；
>   - **Day 1 下午（纯代码 SVG 萌系渲染）**：`animalFace()` 函数动态生成熊、狐狸、青蛙、兔子、猫、猫头鹰等 6 种动物，去除杂色统一面部特征，全矢量锐利显示；
>   - **Day 1 晚上（移动端视口适配防遮挡）**：
>     - 解决手机浏览器地址栏遮挡底栏问题：**`100dvh` + `window.visualViewport.height` 实时监听与重绘**；
>   - **Day 2 上午（关卡与存储）**：5 个渐进式教学关卡 + 随机无限生成关卡，LocalStorage 双 Key 自动存档；
>   - **Day 2 下午（动物园经营挂机系统）**：设计 12 级动物数值膨胀模型；
>   - **Day 2 晚上（社交传播裂变基建）**：HTML5 Canvas 将动态 SVG 转换为 Blob 绘制 540×960 战绩海报，接入 Web Share API 原生分享与 2400×1260 OG 社交卡片
> - **三、纯前端 Web 工具/游戏核心心法（Zero-Dependency Philosophy）**：
>   - 追求极致加载速度（<1 秒），零后端数据库运维负担，天然具备抗百万并发能力与极高 Google 停留时长

---

## Mind Map

```
Claude 两天开发高粘性在线小游戏实录与 ZooBlocks 双循环 SOP
├── 核心机制：双消除 (行列指数消除 + BFS 颜色连通) ➔ 鼓励高阶布局与连锁反应！★
├── 留存飞轮：【消除赚钻石 ↔ 动物园放置挂机 (12 级 10 倍膨胀) ➔ 反哺消除倍率！】★
└── 48 小时工程化 SOP ★
    ├── Day 1：纯单文件 HTML/JS + 纯代码 SVG 动态画萌兽 + 100dvh 移动端防遮挡
    ├── Day 2：5 教学关 + 无限关卡 + LocalStorage 存档 + 放置挂机 + Canvas 海报原生分享！★
    └── 架构本质：零外部依赖，毫秒级秒开，零后端成本抗百万并发！★
```

---

## Theme Analysis

### Theme 1: Zero-Dependency Architecture & Addictive Game Loops 零依赖架构与高粘性游戏循环

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 极简架构换取极致的加载性能与健壮性 | 放弃臃肿的前端框架与后端服务，纯静态单 HTML 能在全球 CDN 实现毫秒级加载与零宕机风险 | Cloudflare Pages 单文件 |
| 双机制融合拉升用户平均停留时长（Dwell Time） | 将短周期的消除操作与长周期的挂机数值成长结合，能使网站的跳出率降至 40% 以下 | 动物园挂机飞轮 |
| 纯代码生成资源摆脱素材版权与加载延迟 | 使用 SVG 代码和 Canvas 绘制游戏元素，无需下载外部图片，分辨率无损且体积趋近于零 | SVG 动态萌兽函数 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **在制作轻量 Web 工具或小游戏时，优先采用纯 HTML+JS 单文件架构进行快速验证**
> 2. **在移动端 Web 开发中，一律使用 `100dvh` 与 `visualViewport` 监听器消除底部遮挡**
> 3. **在产品中内置 Canvas 生成战绩图片与 Web Share API，降低社交裂变门槛**

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文详尽记录了利用 Claude 在两天内完成从玩法设计、SVG 绘制、双消除算法到 Canvas 分享的完整实操 SOP 与代码决策。

### Digest Actions

核心是**Claude 两天全栈开发小游戏实录与双循环 SOP**——出海开发者驾驭 AI 极速交付高粘性 Web 游戏、优化移动端视口与打造零依赖纯静态站的必读工程指南。

1. **玩法设计**：双消除系统 + 挂机经营双循环
2. **工程实现**：纯单文件 + 纯代码 SVG + 100dvh 移动适配
3. **社交裂变**：Canvas 战绩海报 + Web Share API

### Reflection Questions

- [ ] 你的独立产品是否拥有像“放置挂机+消除倍率”这样能让用户反复回访的飞轮机制？
- [ ] 面对移动端 Web 视口被浏览器底栏遮挡的顽疾，你是否已经掌握了 `100dvh` 的标准解法？
