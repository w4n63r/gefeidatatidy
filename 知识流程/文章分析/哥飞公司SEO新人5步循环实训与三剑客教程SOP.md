---
title: "哥飞如何给新入职的 SEO 同事布置新手入门学习任务？"
date: 2025-09-18
type: content-analysis
source: data/[2025-09-18-2356]哥飞如何给新入职的SEO同事布置新手入门学习任务.html
tags:
  - summary
  - 哥飞公司SEO新人培训SOP
  - 5步网站词页循环训练法
  - AITDK插件逆向分析
  - SEO学习资料三剑客
  - 坚守擅长工具流
  - SEO与流量入门
---

# 哥飞公司 SEO 新人 5 步循环实训与三剑客教程 SOP - The SEO Onboarding Immersion Protocol: The 5-Step Site-Page-Keyword Loop, AITDK Reverse-Engineering & The Classical Triad

## Core Summary

> [!abstract] TLDR
> 首次完整公开了哥飞出海公司内部为新入职 SEO 运营同事制定的**“新手第一周沉浸式实训 SOP”**：系统演示了如何通过 **“5 步循环拆解法（标杆大站 Similarweb 大盘 $\rightarrow$ 非品牌词流量定位 $\rightarrow$ AITDK 插件逆向 On-Page $\rightarrow$ 真实 Google SERP 结果页复盘 $\rightarrow$ 挖掘新竞品重入循环）”**，在飞书表格中高频沉淀网站、网页与关键词三者之间的拓扑关系，让新人彻底告别机械搬运、迅速建立敏锐的 SEO 直觉与手感；系统整理了官方推荐的 **“SEO 入门必读三剑客教程”**；并深刻阐述了在出海做站中**“坚守自己最熟悉擅长的工作流与技术栈（如熟悉 PHP/Python 就用其写 MVP，手写 PPT 胜过盲目折腾 AI 工具），避免因追逐时髦工具浪费宝贵时间”**的效率哲学。
>
> - **效率与工作流第一性原理（Workflow Familiarity Axiom）**：
>   - **避坑反思**：哥飞在准备大会 PPT 时，曾试图利用 Claude 与可视化动效制作网页版讲稿，因长上下文遗忘浪费数天，最终回归 Gamma 手写一天完成；
>   - **做站启示**：
>     - **“出海绝非强制绑定 Next.js 或 Vercel”**；
>     - 熟悉 PHP 就用 PHP，熟悉 Python 就用 Python，**用自己最熟悉的技术栈以最快速度交付 MVP 才是最高优先级的战略**
> - **哥飞公司 SEO 运营新人“5 步循环训练法”（The 5-Step Immersion Loop SOP）**：
>   1. **第 1 步（标杆站点大盘拆解）**：使用 Similarweb 打开对标大站（如 `Pollo.ai`），统计并记录上月总访问量、Direct 直接访问与 Organic Search 自然搜索流量占比；
>   2. **第 2 步（非品牌词与落地页映射）**：深度提取该站核心非品牌关键词（Non-Brand Keywords），记录每个词贡献的流量大小及其承接的 Landing Page URL；
>   3. **第 3 步（AITDK 插件逆向 On-Page 细节）**：打开各承接页，利用 `AITDK.com` 浏览器插件记录 Title、Meta Description、正文单词总数、H1 标签及前 5 名 1words~4words 核心词频分布；
>   4. **第 4 步（真实 Google SERP 竞争复盘）**：在无痕浏览器中搜索该词，记录 Google 第一页排名结果（排除 Apple Store、YouTube、Reddit 等巨头平台内页）；
>   5. **第 5 步（发现新站 $\rightarrow$ 重入第 1 步循环）**：将搜索结果中冒出的新独立站作为新目标，重返第 1 步循环往复；
>   - **执行要求**：在飞书表格每日记录几十个站与词，用心体悟，同步撰写飞书心得文档
> - **SEO 入门学习资料“三剑客”（The Classical Triad）**：
>   1. **教程一（排名因素总览）**：Backlinko Brian Dean《Google Ranking Factors》（理解算法为何给排名的底层机理）
>   2. **教程二（页面优化实操）**：Ahrefs《On-Page SEO Tutorial》（掌握基于排名因素的站内代码与内容落地 SOP）
>   3. **教程三（系统入门框架）**：Ahrefs《SEO 入门基础教程中文版》（建立体系化的技术与外链认知框架）

---

## Mind Map

```
哥飞公司 SEO 新人 5 步循环实训与三剑客教程 SOP
├── 效率心法：坚守熟悉技术栈！(用熟悉的 PHP/Python 极速出 MVP，拒绝时髦工具内耗) ★
├── 5 步循环实训法 (The 5-Step Loop) ★
│   ├── 1. Similarweb 拆标杆大盘 (总访客/自然流占比)
│   ├── 2. 挖掘非品牌词与承接落地页 URL
│   ├── 3. AITDK 逆向 On-Page (Title/Desc/字数/H1/词频)
│   ├── 4. Google 真实 SERP 排除平台大站复盘排名
│   └── 5. 发现新站 → 回到第 1 步循环！(在站-页-词三者间建立敏锐直觉) ★
└── 经典三剑客：Backlinko 排名因素 + Ahrefs 站内优化 + Ahrefs 中文基础教程
```

---

## Theme Analysis

### Theme 1: Reverse-Engineering Immersion & Workflow Pragmatism 逆向工程沉浸与工作流实用主义

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 真实数据喂养是建立手感的唯一捷径 | 看 100 篇理论不如在飞书表格里扎实逆向 50 个真实排名前列的落地页细节 | 5 步实训法 |
| 关注非品牌词才能看清真实搜索需求 | 品牌词流量来自既有知名度，非品牌词排位才真正体现站长的 SEO 功力 | 非品牌词拆解 |
| 务实交付优于形式主义的工具崇拜 | 商业竞争比拼的是交付速度与解决问题的确定性，而非所用工具链的炫酷程度 | Gamma 写 PPT 反思 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **安装 AITDK Chrome 插件，养成每次打开竞品网站必看 TDK 与词频的习惯**
> 2. **建立飞书“竞品 SEO 逆向库”，每周固定拆解 3~5 个高增长站点的落地页架构**
> 3. **完整通读 Ahrefs On-Page SEO 中文教程，对照核验自身站点的标签规范**

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文为哥飞公司新入职 SEO 运营员工制定的 5 步循环网站逆向实训与三剑客学习指南标准 SOP。

### Digest Actions

核心是**哥飞公司 SEO 新人入门实训 SOP 与三剑客教程**——出海开发者构建 SEO 逆向直觉、训练团队运营人员与掌握 On-Page 核心细节的实操指南。

1. **实训 SOP**：大盘 $\rightarrow$ 词页映射 $\rightarrow$ AITDK 逆向 $\rightarrow$ SERP 复盘 $\rightarrow$ 循环
2. **效率法则**：用最熟练技术栈极速上线 MVP
3. **权威资料**：Backlinko 排名因素 + Ahrefs 站内优化

### Reflection Questions

- [ ] 你在分析竞品时，是否曾深入拆解过其非品牌词对应的落地页 Title、H1 与词频分布？
- [ ] 面对新技术栈，你是否做到了优先使用自己最擅长的语言与工具以最快速度交付 MVP？
