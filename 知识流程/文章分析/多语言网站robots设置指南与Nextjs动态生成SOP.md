---
title: "【哥飞SEO教程】多语言网站 robots.txt 设置指南：如何正确阻止不希望被抓取的页面"
date: 2024-08-10
type: content-analysis
source: data/[2024-08-10-1218]哥飞SEO教程多语言网站robotstxt设置指南如何正确阻止不希望被抓取的页面.html
tags:
  - summary
  - robots.txt
  - 多语言SEO
  - noindex
  - Next.js
  - 内容与多语言
---

# 多语言网站 robots.txt 设置指南与 Next.js 动态生成 SOP - Multilingual robots.txt Configuration: Anti-Leakage & Next.js Dynamic Generation SOP

## Core Summary

> [!abstract] TLDR
> 复盘了出海多语言网站在 `robots.txt` 规则配置中极其高发的“多语言子目录拦截遗漏”翻车事故：深度剖析了站长仅配置 `Disallow: /people/` 会导致 `/ja/people/`、`/ko/people/` 等数十种语言子路径完全裸奔被 Google 爬虫深度抓取、从而触发 GSC 海量 noindex 索引异常的根本原因；警示了严禁偷懒使用通配符 `Disallow: /*/people/`（会导致全站正常的多级内容目录被误杀）；并给出了基于 Next.js App Router 的 `app/robots.ts` 根据系统多语言配置数组自动化循环生成全量规则的最佳实践 SOP。
>
> - **多语言 robots.txt 常见翻车事故复盘**：
>   - **现象**：GSC 突然出现大量“已排除 - 被 noindex 标记”的未编入索引页面警告
>   - **根因**：站长在 `robots.txt` 中仅写了 `Disallow: /people/`，该规则仅能拦截默认语言（如英语），而站点采用子目录多语言架构时，日语 `/ja/people/`、韩语 `/ko/people/`、法语 `/fr/people/` 均未被规则匹配，导致爬虫大量抓取
> - **规则书写两大铁律与避坑**：
>   1. **严禁使用模糊通配符（误杀风险）**：若写成 `Disallow: /*/people/`，任何包含 people 的合法深层内容页面（如 `/category/def/people/`）也会被彻底封杀
>   2. **显式列出所有语言规则**：必须逐行声明每一个语种的具体子路径：
>      ```text
>      User-Agent: *
>      Allow: /
>      Disallow: /people/
>      Disallow: /ja/people/
>      Disallow: /fr/people/
>      Disallow: /ko/people/
>      Disallow: /zh/people/
>      ```
> - **Next.js 动态化最佳实践（`app/robots.ts`）**：
>   - 在 Next.js App Router 中创建 `app/robots.ts`
>   - 遍历 `locales` 语言数组，自动化映射生成所有多语言 Disallow 规则，实现新增语言时 0 手动配置遗漏

---

## Mind Map

```
多语言 robots.txt 设置指南与 Next.js 动态生成 SOP
├── 事故复盘：GSC 出现海量 noindex 未编入索引告警
│   └── 根因：Disallow: /path/ 仅封锁默认语言，多语言子目录全部漏防
├── 规则配置原则
│   ├── 严禁：Disallow: /*/path/ (模糊通配会导致深层目录误杀 ❌)
│   └── 正确：逐一显式列出所有支持语种的具体子路径 ✅
└── 自动化演进：Next.js app/robots.ts
    └── 逻辑：读取 locales 数组 → 自动 map 生成全语言 Disallow 规则
```

---

## Theme Analysis

### Theme 1: Multilingual Crawl Budget Control & Robust Routing 多语言抓取预算控制与健壮路由

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 爬虫预算保护 | 非获客页面（如后台、私密人员库）若多语言漏配，会浪费 Google 宝贵的抓取预算 | 发现一百多个页面被爬虫异常遍历 |
| 显式优于隐式 | SEO 规则中避免过于宽泛的正则表达式与通配符，显式声明保障了确定性 | 严禁使用 `/*/people/` 避免误杀 |
| 代码即配置 | 将静态文本文件升级为框架原生动态脚本，彻底杜绝人工维护的疏漏 | 采用 Next.js `robots.ts` 动态映射 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **出海多语言项目必须使用 `app/robots.ts` 动态生成 robots 规则**
> 2. **在 GSC 中定期检查“已排除”报告**：排查是否有不该被抓取的路径泄漏
> 3. **所有非获客管理或动态参数页面必须在多语言下全量 Disallow**

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文为多语言网站 robots.txt 正确书写、通配符避坑与 Next.js 动态生成的标准操作规程。

### Digest Actions

核心是**多语言 robots.txt 规范配置 SOP**——出海多语言网站爬虫控制与 GSC 维护的必查项。

1. **排查漏配**：检查每个语种的私有目录是否均有 Disallow
2. **拒绝通配**：禁止使用 `/*/path/`
3. **动态脚本**：用 Next.js `app/robots.ts` 自动遍历 locales

### Reflection Questions

- [ ] 你的多语言网站 robots.txt 是否只写了根目录拦截，而让各语言子目录处于裸奔状态？
- [ ] 你的系统是否还在手动维护静态 robots.txt，而非通过 Next.js 动态脚本自动同步语言包？
