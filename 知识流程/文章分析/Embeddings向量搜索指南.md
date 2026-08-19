---
title: "一篇让你搞懂向量 Embeddings 如何使用"
date: 2023-10-03
type: content-analysis
source: data/[2023-10-03-0800]一篇让你搞懂向量Embeddings如何使用.html
tags:
  - summary
  - 技术
  - 向量搜索
  - AI
---

# 向量 Embeddings 使用指南 - Vector Embeddings for Semantic Search

## Core Summary

> [!abstract] TLDR
> 用 OpenAI **Embeddings 接口（text-embedding-ada-002，1536 维，$0.0001/1K tokens）**把文字向量化，实现**跨语言语义搜索**（搜"制作表情包"能搜出"Meme Generator"）。原理=余弦相似度，新手可先存文本文件，再考虑向量数据库。
>
> - **流程**：每段文字调一次接口→得向量→存起来；搜索时把用户输入向量化→与所有向量算余弦相似度→取前 10
> - **存储**：先纯文本文件，再上向量库（Chroma/ES/Milvus/Pinecone/Qdrant/Redis/Typesense/Weaviate）
> - **成本**：几乎不要钱（$0.0001/1K tokens）
> - **代码**：文章给了 PHP 点积/幅度/余弦相似度函数

---

## Mind Map

```
Embeddings使用
├── 接口：text-embedding-ada-002（1536维，便宜）
├── 流程
│   ├── 内容→向量（存）
│   ├── 搜索词→向量
│   └── 余弦相似度→Top10
├── 存储：文本文件起步→向量数据库
└── 价值：跨语言语义搜索
```

---

## Theme Analysis

### Theme 1: 原理与实现

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 语义搜索 | 不靠关键词匹配 | "结果里没有出现'制作表情包'五个字中的任何一个字，但依然搜索出了正确的结果" |
| 余弦相似度 | 向量距离=语义距离 | "余弦距离越小表示越相似" |
| 低成本 | 便宜到几乎不要钱 | "价格是$0.0001/1K tokens" |

> [!tip]- Top 3 Actionable Recommendations
> 1. **给网站加"语义搜索"**：用 Embeddings 让用户用自然语言搜内容
> 2. **新手先存文本**：别一上来上向量数据库，文件版先跑通
> 3. **跨语言价值**：中文搜英文内容也能命中（出海工具站友好）

### Theme 2: 工程选择

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 起步方案 | 纯文本文件 | "哥飞不推荐新手一上来还没搞懂原理就用这些向量数据库" |
| 进阶方案 | 8 个向量库可选 | Chroma/ES/Milvus/Pinecone/Qdrant/Redis/Typesense/Weaviate |

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 技术实现指南，属程序性知识

### Digest Actions

1. **跑通最小版**：用 Embeddings 接口把 10 段文字向量化，实现一个搜索 demo
2. **算相似度**：用余弦相似度函数验证"语义相关但不同词"能命中
3. **记录**：写下"我的站哪里适合加语义搜索"

### Reflection Questions

- [ ] 我的工具站有没有"用自然语言找内容"的需求？
- [ ] 我先用文本文件方案，还是直接上向量库？
- [ ] 跨语言语义搜索，能不能成为我的差异化？
