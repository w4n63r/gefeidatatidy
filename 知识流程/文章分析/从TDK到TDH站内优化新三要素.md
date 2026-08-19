---
title: "【哥飞SEO教程】从 TDK 到 TDH"
date: 2024-04-06
type: content-analysis
source: data/[2024-04-06-2235]哥飞SEO教程从TDK到TDH.html
tags:
  - summary
  - TDK
  - TDH
  - Headings
  - 骨架结构
  - 站内优化
  - SEO入门
---

# 从 TDK 到 TDH 站内优化新三要素 - Evolving On-Page SEO: From TDK to the Modern TDH Framework

## Core Summary

> [!abstract] TLDR
> 提出了站内 SEO 核心三要素的历史演进与现代规范——“从 TDK 到 TDH”：阐明了 `<meta name="keywords">` 因历史过度作弊且 Google 语义理解进化而早在 10 年前被算法彻底淘汰；确立了以 Title（标题）、Description（描述）和 Headings（H 标签骨架树，尤其是 H1 与 H2/H3）构成的现代 TDH 体系，强调 Headings 是支撑网页语义相关性与搜索意图命中的承重墙。
>
> - **Keywords（K）被淘汰的历史真相**：
>   - 滥用与作弊：早期黑帽站长在 Keywords 中无脑堆砌几十个热门词蹭流量
>   - 算法进化：Google 的分词、NLP 实体抽取与上下文语义理解技术日益成熟，完全可以直接从正文中提取主题，不再信任且彻底忽略 `<meta keywords>` 标签
> - **TDH 现代站内优化黄金三角**：
>   - **Title（T）**：搜索结果蓝字大标题，决定排名权重与点击率（CTR）的核心
>   - **Description（D）**：搜索结果摘要，承接搜索意图并促进点击
>   - **Headings（H）**：H1 到 H6 的 HTML 标题骨架，赋予网页清晰的语义层级
> - **Headings 的骨骼支撑作用**：
>   - H1 必须唯一且精准包含核心搜索需求词
>   - H2/H3 承担子需求、常见问题（FAQ）与长尾词布局，充当网页内容的承重柱

---

## Mind Map

```
从 TDK 到 TDH 站内优化新三要素
├── 淘汰史：为什么 K (Keywords) 走向消亡
│   ├── 历史：黑帽滥用堆砌 → 搜索引擎彻底丧失信任
│   └── 现状：Google NLP 语义理解成熟，写 Keywords 毫无加分
├── 确立：现代 TDH 站内优化黄金三角
│   ├── T (Title)：最强语义权重 + SERP 核心展示标题
│   ├── D (Description)：转化点击诱饵 + 意图补充说明
│   └── H (Headings)：H1~H6 构成全站语义承重骨架
└── 实操落地原则
    ├── 单页唯一 H1 命中主词
    └── H2 / H3 结构化布局衍生功能与长尾关键词
```

---

## Theme Analysis

### Theme 1: Semantic Evolution from Meta Tags to Structural HTML 从 Meta 标签到结构化 HTML 语义

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 舍弃无用代码 | 停止在页面中生成 keywords meta 标签，避免暴露优化意图与冗余 HTML | “早在 10 年前哥飞就不写 Keywords 了，K 早被 SEO 界淘汰” |
| Headings 骨架权威 | 现代搜索引擎严重依赖 Headings 标签来构建页面的知识图谱与语义大纲 | “Headings 相当于网页的骨架，是支撑内容的骨骼结构” |
| 整体协同效应 | Title 与 H1 呼应，Description 与 H2/H3 呼应，形成闭环权重传递 | “用好 TD 和 H，才是拿到关键词排名的关键” |

> [!tip]- Top 3 Actionable Recommendations
> 1. **代码中彻底移除 keywords 标签**：在 Next.js / HTML 模板中删掉 `<meta name="keywords">`
> 2. **全站强制规范单一 H1**：每个页面有且仅有一个 H1，且必须包含目标核心词
> 3. **用 H2 布局副标题与长尾词**：每个内容区块使用语义明确的 H2/H3 组织

---

## PACER Application

> [!important] PACER Classification: C — Conceptual
> **Rationale**: 本文提出了从传统 TDK 向现代 TDH 演进的站内 SEO 核心概念模型，属于基础理论框架。

### Digest Actions

核心是**TDH 站内优化新概念**——作为出海建站前端代码审查的基准规范。

**Core concept nodes**:
1. **Keywords 废弃论 (Keywords Deprecation)** — 彻底摒弃无效的 keywords meta 标签
2. **TDH 黄金三角 (TDH Framework)** — Title + Description + Headings
3. **Headings 骨架体系 (Semantic Heading Skeleton)** — 支撑网页语义层级的 H1~H6 规范

### Reflection Questions

- [ ] 你的网站代码里，是否还在徒劳地维护 `<meta name="keywords">`？
- [ ] 你的网页 H1 标签是否精准命中了用户的核心搜索词？
