---
title: "养网站防老第3步：根据搜索意图使用ChatGPT的GPT4生成网页"
date: 2023-10-17
type: content-analysis
source: data/[2023-10-17-0900]养网站防老第3步根据搜索意图使用ChatGPT的GPT4生成网页.html
tags:
  - summary
  - 养网站防老
  - GPT-4
  - SEO页面生成
  - 搜索意图
  - 前端开发
---

# 养网站防老第3步：GPT-4 生成 SEO 网页 - Building SEO Pages via GPT-4 from Search Intent

## Core Summary

> [!abstract] TLDR
> 养网站防老官方教程第 3 步：将前期 Semrush 挖掘出的搜索意图（如 phone number generator）转化为精准的 Prompt，利用 GPT-4 自动生成符合 SEO 语义化标准（语义标签、H1/H2 结构、URL 路由规划）的基础 HTML 与 CSS 样式。
>
> - **意图落地架构**：面对全球各国号码格式差异，摒弃下拉列表交互，践行“分门别类罗列”六字真言，在首页直接平铺各国子模块
> - **SEO 结构标准**：严格要求 GPT-4 采用语义化标签（`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`）以及清晰的 H1（全站主词）到 H2（国家长尾词）层级
> - **Prompt 核心要素**：明确角色定位（SEO+前端专家）、业务目标、H1/H2 结构、段落描述、按钮文案、跳转 URL 规范（如 `us-phone-number-generator`）
> - **渐进迭代生成**：单次生成不求完美，通过追加提示词分步补全 CSS 配色、国家列表与多模块展开

---

## Mind Map

```
养网站防老第3步GPT4生成网页
├── 搜索意图到页面架构转化
│   ├── 核心词："phone number generator"（测试数据/隐私保护）
│   └── 布局哲学：摒弃下拉列表，采用"分门别类罗列"平铺各国
├── Prompt 工程化设计（SEO+前端）
│   ├── 角色设定：SEO 专家 + 前端专家
│   ├── 标签规范：语义化 HTML5 + 唯一 H1 + 多个 H2 结构
│   └── 交互约定：按钮文案带长尾关键词 + 语义化 URL
└── 渐进式交付与文件组织
    ├── 生成 index.html（语义骨架）
    ├── 生成 styles.css（简洁现代配色）
    └── 追加迭代：扩展至 10-100 个国家的完整列表
```

---

## Theme Analysis

### Theme 1: Structuring Pages from Search Intent 基于搜索意图的页面结构规划

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 交互服务于 SEO | 下拉框对爬虫不可见且用户查找繁琐，平铺罗列既利于爬虫又提升体验 | “最直接想到的办法是给出一个下拉框……但是很不方便。最好的办法就是用六字真言‘分门别类罗列’” |
| 关键词权重布局 | 首页 H1 承接核心大词，H2 分别绑定具体长尾国家词 | H1 为 `Phone Number Generator`，各 section H2 为 `{Country} Phone Number Generator` |
| URL 语义化设计 | 链接 URL 必须清晰体现页面目标关键词 | 美国对应 `us-phone-number-generator`，利于搜索引擎理解与快速收录 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **Prompt 必须指定 SEO 语义标签**：要求 AI 严禁全用 `<div>`，强制使用 `<main>`、`<section>`、`<h1>`、`<h2>` 构建骨架
> 2. **首屏增加锚点列表**：在 H1 下方增加紧凑的国家/类目标签列表，提升内链密度与用户直达效率
> 3. **分步驱动 AI 生成**：先生成骨架，再让 AI 单独输出 CSS 样式，最后扩充数据量，避免单次 Token 耗尽截断

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文为手把手的提示词编写与网页代码生成实操教程，属于养网站防老系列的核心操作规程。

### Digest Actions

核心是**代码生成与提示词实操**——掌握如何用大模型快速搭建高质量 SEO 落地页。

1. **准备关键词输入**：从 Semrush 选定 1 个核心主词与 10 个衍生子词
2. **执行结构化 Prompt**：套用文中的专家 Prompt 模板，生成符合 SEO 标准的 `index.html` 与 `styles.css`
3. **本地浏览器检验**：查看标签层级是否清晰、元素间距是否协调

### Reflection Questions

- [ ] 你的 Prompt 是否明确约束了 URL 结构和按钮文本的关键词密度？
- [ ] 在利用 AI 生成几百个相似国家/城市页面时，如何设计脚本批量组装？
