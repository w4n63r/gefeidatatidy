---
title: "开源了一个不使用任何后端框架纯 php 实现流式调用 OpenAI gpt 接口的项目"
date: 2023-03-24
type: content-analysis
source: data/[2023-03-24-1019]开源了一个不使用任何后端框架纯php实现流式调用OpenAIgpt接口的项目.html
tags:
  - summary
  - PHP
  - OpenAI
  - SSE
  - 源码解析
  - 开发实操
---

# 纯 PHP 零框架流式调用 OpenAI GPT 接口 - Pure PHP Frameworkless OpenAI SSE

## Core Summary

> [!abstract] TLDR
> 开源项目 `php-openai-gpt-stream-chat-api-webui` 实现了零第三方后端库、纯 PHP 处理 OpenAI 流式请求与 SSE（Server-Sent Events）推送，包含基于 DFA 算法的敏感词过滤及前端打字机实时渲染。
>
> - **零依赖极简架构**：仅由原生 PHP + 原生前端构成，填入 API Key 即可直接运行，降低部署门槛
> - **流式缓冲与拆包**：针对网络传输导致的半条或多条数据，通过 `data_buffer` 与正则拆分保证 JSON 健壮解析
> - **合规敏感词过滤**：采用确定性有限自动机（DFA）算法，支持按换行与停顿符号分句校验与脱敏替换
> - **SSE 协议标准实现**：关闭输出缓冲与 gzip 压缩，设置 `text/event-stream` 与 `X-Accel-Buffering: no` 保持长连接

---

## Mind Map

```
纯PHP零框架流式GPT调用
├── 架构设计（极简零框架）
│   ├── 后端：原生 PHP + curl 回调 + Class 封装
│   └── 前端：原生 JS EventSource + Highlight.js + Marked.js
├── 流式传输与数据解析
│   ├── OpenAI 传输：CURLOPT_WRITEFUNCTION 回调处理
│   └── 粘包/半包处理：data_buffer 缓冲未完整数据
├── 安全合规（DFA 敏感词）
│   ├── 算法：确定性有限自动机 (DFA)
│   └── 逻辑：分句检测，替换为 ***，生产建议开启
└── SSE 响应头与长连接
    ├── 禁用输出缓存与 zlib 压缩
    └── 响应头配置：text/event-stream + X-Accel-Buffering: no
```

---

## Theme Analysis

### Theme 1: Frameworkless Stream Processing 零框架流式处理

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 请求与回调 | 使用 curl 的 `CURLOPT_WRITEFUNCTION` 设置回调接收 OpenAI chunk | `curl_setopt($ch, CURLOPT_WRITEFUNCTION, [$this->streamHandler, 'callback']);` |
| 异常拆包机制 | 应对网络传输导致的多条或半条 JSON 数据拼接问题 | StreamHandler 中维护 `data_buffer`，未闭合数据存入 buffer 等待下个 chunk |
| 结束信标处理 | 识别 `[DONE]` 信标并完成会话收尾 | 识别 `trim($line) == '[DONE]'` 清空缓冲并触发 `sensitive_check` 与 `end` |

> [!tip]- Top 3 Actionable Recommendations
> 1. **独立开发轻量选型**：做小型 AI 工具站或内部测试时，优先选择原生无框架方案，避免引入重型框架增加部署负担
> 2. **网络拆包必须加 buffer**：处理 SSE 流式推送时切忌假设每次回调为单一完整 JSON，必须维护缓冲区处理半包
> 3. **记录完整 Debug 日志**：对异常无法解析的 chunk 写入独立错误日志，便于针对 OpenAI 格式变动做兼容

### Theme 2: SSE Protocol & Content Compliance SSE通信与内容合规

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| SSE 基础配置 | 必须彻底关闭 PHP 与代理服务器的输出缓存 | `ini_set('output_buffering', 'off');` 及 Nginx 头部 `X-Accel-Buffering: no` |
| 前端实时渲染 | 原生 `EventSource` 监听消息并增量追加 DOM | `new EventSource(url)` + `addEventListener('message')` + `JSON.parse` |
| DFA 敏感词过滤 | 采用 DFA 算法分句脱敏，保护域名与业务安全 | `Class.DFA.php` 加载 `sensitive_words.txt`，按标点分句替换为 `***` |

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文为具体的开源项目代码解析与搭建教程，详细指导如何纯手工实现流式 AI 对话与前端集成，属于标准操作规程。

### Digest Actions

核心是**操作型程序知识**——通过动手实践与代码调试来掌握流式传输核心细节。

1. **搭建本地运行环境**：克隆原生 PHP 项目，配置本地 PHP 内置服务器（`php -S localhost:8000`）
2. **测试 SSE 缓冲特性**：观察开启与关闭 `X-Accel-Buffering` 及 PHP 输出缓冲时前端打印的差异
3. **实现自定义工具包装**：基于此底层代码改造出特定场景的 AI 对话或单页生成工具

### Reflection Questions

- [ ] 在 Nginx 反向代理环境下，除了 `X-Accel-Buffering: no` 外还需要哪些配置保证长连接不超时？
- [ ] 如果要支持多轮对话与历史消息上下文，数据存储与请求参数应如何优雅重构？
- [ ] DFA 分句检测在极高并发场景下有哪些内存与性能瓶颈？
