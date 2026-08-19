---
title: "养网站防老第1.5步：用一个公式来判断关键词是否值得做"
date: 2023-10-16
type: content-analysis
source: data/[2023-10-16-0800]养网站防老第15步用一个公式来判断关键词是否值得做让你选择关键词不再犹豫.html
tags:
  - summary
  - 选词公式
  - kdroi
  - 教程
---

# 第1.5步：kdroi 选词公式 - Step 1.5: The kdroi Formula

## Core Summary

> [!abstract] TLDR
> 自创**选词公式 kdroi = volume × cpc ÷ kd**（优化难度回报率）：搜索量 × 点击单价 ÷ 优化难度，算出每个词的回报率再排序，优中选优。例：audiobook speed calculator（1600 搜/KD 7/CPC 13.9 → kdroi 3177）。
>
> - **指标含义**：volume=搜索量、cpc=词价值（离钱近）、kd=难度
> - **操作**：Semrush 筛选（搜索量600+/KD 0-29/CPC>0.1）→ 导出 csv → 加一列 =B2*D2/C2 → 排序
> - **效果**：把"凭感觉选词"变成"量化优中选优"
> - **后续**：对排名靠前的词，再用第2步分析搜索意图

---

## Mind Map

```
kdroi选词公式
├── 公式：kdroi = volume × cpc ÷ kd
├── 筛选：搜索量600+ / KD 0-29 / CPC>0.1
├── 操作：Semrush导出→Excel算kdroi→排序
├── 例子：audiobook speed calculator kdroi=3177
└── 后续：对高分词分析搜索意图→做网页
```

---

## Theme Analysis

### Theme 1: 量化选词

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 三维指标 | 量×价值÷难度 | "volumn 是搜索量，cpc 是点击单价，kd 是优化难度" |
| 可排序 | 一列公式全表排序 | "按照这一列从高到低排序，就得到了最值得做的关键词列表" |
| 优中选优 | 不用再凭感觉 | "是不是觉得选关键词也没有难度了" |

> [!tip]- Top 3 Actionable Recommendations
> 1. **把 kdroi 加进选词流程**：任何候选词都算一遍 kdroi，排序取前 10
> 2. **Excel 一列搞定**：导出 Semrush 词表，加 =B*D/C 列排序
> 3. **高分词再过搜索意图关**：kdroi 高≠能做，还要第2步验证

### Theme 2: 配套筛选

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 下限过滤 | 搜索量≥600/KD<30/CPC>0.1 | "设置筛选框搜索量600+，kd为0～29，cpc大于0.1" |
| 排除干扰 | 排除 near me 类 | 导航/位置类词价值不确定 |

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 可执行的量化方法，属程序性知识

### Digest Actions

1. **选 51 词之一**（如 Calculator）→ Semrush 筛选导出
2. **算 kdroi**：Excel 加列 =B2*D2/C2，排序
3. **取前 5**：对前 5 个词做搜索意图分析
4. **记录**：建"kdroi 排行榜"表

### Reflection Questions

- [ ] 我选词是凭感觉，还是用 kdroi 量化？
- [ ] 我的候选词里，kdroi 最高的是哪个？
- [ ] 高分词我验证过搜索意图和可行性吗？
