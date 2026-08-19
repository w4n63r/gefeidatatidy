---
title: "我解锁了 ChatGPT 的一项隐藏能力，既能一键复制对话，又能提取指定内容结构化输出"
date: 2022-12-11
type: content-analysis
source: data/[2022-12-11-1058]我解锁了ChatGPT的一项隐藏能力既能一键复制对话又能提取指定内容结构化输出.html
tags:
  - summary
  - AI技巧
  - 提示词
---

# ChatGPT 隐藏能力：结构化输出 - ChatGPT Magic Prompts: Structured Output

## Core Summary

> [!abstract] TLDR
> 用"魔法语句"让 ChatGPT 把对话以 JSON/Markdown 表格输出，从而**一键复制对话**、**提取指定内容并结构化**——把对话变成可复用数据。
>
> - **一键复制对话**：让 ChatGPT 把对话用 json 格式输出（`我问的用q，你回答的用a`），点 Copy code 复制
> - **结构化提取**：让 ChatGPT 从对话里提取指定字段并按指定 schema 输出
> - **更多魔法**：`请用表格显示这组数据`、`请输出 markdown 格式代码`、`请输出 html table 格式代码`

---

## Mind Map

```
ChatGPT隐藏能力
├── 一键复制对话
│   └── 魔法语句：把以上对话用json格式输出（q/a字段）
├── 结构化提取
│   └── 指定输出格式（english/chinese/type 等字段）
└── 通用魔法
    ├── 表格显示数据
    ├── markdown / html 格式输出
    └── 自定义 schema
```

---

## Theme Analysis

### Theme 1: 让 AI 输出结构化数据

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 格式可控 | 指定字段和结构，AI 能照做 | "请把以上对话中出现过的单词中英文输出为 json 格式" |
| 提取能力 | 不是复读，而是理解后提取 | "输出的并不是对话全文，而是从对话里提取的信息" |
| 可迁移 | 魔法语句可用于任何数据处理 | 表格/markdown/html 输出 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **给 AI 指定输出 schema**：让 AI 输出 JSON/表格，数据才能被程序/笔记复用
> 2. **保存对话为资产**：用"q/a json 输出"把高质量对话存档，方便回看
> 3. **用于内容生产**：让 AI 按固定结构（如关键词/摘要/正文分节）生成，方便批量加工

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 提示词技巧，属程序性知识

### Digest Actions

1. **试魔法语句**：用"请把以上对话用json格式输出，我问的用q，你回答的用a"复现
2. **自定义 schema**：让 AI 按你的字段输出（如把一篇文章提炼成 title/summary/keywords）
3. **沉淀模板**：把好用的提示词存成自己的"魔法语句库"

### Reflection Questions

- [ ] 我平时让 AI 输出，有没有指定格式/字段？
- [ ] 结构化输出对我的笔记/建站/内容生产有什么价值？
- [ ] 我能不能把 AI 对话变成可复用的数据资产？
