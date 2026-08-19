---
title: "我把网站迁移到 cf，省了几万块"
date: 2024-08-14
type: content-analysis
source: data/[2024-08-14-2116]我把网站迁移到cf省了几万块.html
tags:
  - summary
  - Vercel避坑
  - Cloudflare
  - AWS部署
  - PM2
  - Docker
  - 降本增效
  - 建站与开发
---

# Vercel 迁移 AWS 与 Cloudflare 降本实战手册 - Escaping the Vercel Tax: The Ultimate AWS & Cloudflare Migration Manual

## Core Summary

> [!abstract] TLDR
> 8200 字详尽复盘了独立开发者 idoubi（ThinkAny 作者）自研 AI 搜索引擎月访问量达数十万后，因遭遇 Vercel 每月高达 $5,000+ 美元（约 3.7 万人民币）的“天价账单刺客”，历时两天将服务深度重构并成功迁移至 AWS 与 Cloudflare 的完整降本实操手册：系统剖析了 Vercel 在云函数执行时间、流量计费（$0.18/GB-hr）与 Next/Image 裁剪 CDN 上的计费陷阱；给出了“AWS EC2 + PM2 / Docker 独立部署”与“Cloudflare Pages Edge 运行时全托管”三大落地架构；并详述了 Edge 运行时下移除 Node.js `fs`/`http` 依赖及数据库适配等关键避坑点。
>
> - **Vercel 账单陷阱与天价支出根因**：
>   - **流量与算力刺客**：月访仅数十万，但因云函数调用与流式传输产生高额流量费（$0.18/GB-hr）
>   - **组件隐形消耗**：滥用 `next/image` 组件导致 Vercel 内部图片裁剪与 CDN 优化账单暴增
>   - **本质**：Vercel 本质是 AWS 的二道贩子套壳，规模化后边际成本极高
> - **三大成熟迁移替代架构与实操 SOP**：
>   1. **方案一（AWS EC2 + PM2 + Nginx + Certbot）**：自购 4C8G 实例，安装 pnpm + PM2 守护进程，Nginx 反向代理，Certbot 自动签发 Let's Encrypt 免费 SSL
>   2. **方案二（Docker 容器化 + Standalone）**：配置 `output: "standalone"` 极大精简构建镜像，通过 Dockerfile 实现跨环境微服务迁移
>   3. **方案三（Cloudflare Pages 全托管 / 几近免费）**：安装 `@cloudflare/next-on-pages`，声明 `export const runtime = "edge"`，零服务器成本承接海量并发
> - **Cloudflare Edge 运行时改造避坑要点**：
>   - **移除 Node API**：Edge 环境不支持原生 `fs` 与 `http`（需将 Axios 请求重构为原生 `fetch`）
>   - **数据库客户端选型**：传统 `pg` 驱动不兼容 Edge，需切换为 Neon Serverless 驱动或 `@supabase/supabase-js`
> - **Cloudflare 免费全家桶生态**：结合 11ms 全球 DNS 解析、WAF 防刷人机验证、R2 零出网费图床（替代 S3）与 D1 数据库，构建极致低成本高防架构

---

## Mind Map

```
Vercel 迁移 AWS 与 Cloudflare 降本实战手册
├── 痛点爆发：月访数十万 → Vercel 账单高达 $5,000+ 刀/月
│   ├── 根因：云函数按量计费 + Next/Image 裁剪 + 存储超额
│   └── 结论：Vercel 适合早期 Demo，起量后必须迁移降本
├── 3 大迁移替代架构实战
│   ├── 1. AWS EC2 + PM2 + Nginx + Certbot (可控低成本)
│   ├── 2. Docker + Next.js Standalone 模式 (标准容器化)
│   └── 3. Cloudflare Pages + Edge 运行时 (几近免费 Serverless)
└── Cloudflare Edge 改造避坑与基建全家桶
    ├── 避坑：移除 fs/http (改用 fetch) + 替换 Edge 兼容 DB 客户端
    └── 全家桶：11ms DNS + WAF 防火墙 + R2 零流出费图床 + D1 数据库
```

---

## Theme Analysis

### Theme 1: Infrastructure Cost Control & Edge Optimization 基建成本控制与边缘计算优化

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 告别云厂商税 | 早期追求便利可以使用 Vercel，但当月流量突破 10 万后必须有能力完成基建解耦 | 从 $5000/月 降至几乎为零的服务器成本 |
| 容器与轻量化 | Next.js Standalone 输出模式去除了无用的 node_modules 冗余，使镜像体积缩小 80% | `output: "standalone"` 配置 |
| 边缘运行时的威力 | Cloudflare 全球分布式 Edge 计算节点不仅延迟极低，而且彻底摆脱单机带宽瓶颈 | ThinkAny / SoraFM 成功跑在 CF 边缘上 |

> [!tip]- Top 3 Actionable Recommendations
> 1. **在 Next.js 项目起量前排查 `next/image` 与云函数调用量**：防止月初账单突袭
> 2. **图片存储全面迁移至 Cloudflare R2**：享受零出网流量费与 S3 兼容 API
> 3. **为全栈 Next.js 项目配置 Dockerfile 与 PM2 脚本**：随时具备自建部署能力

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 本文为从 Vercel 迁移至 AWS EC2/PM2/Docker 及 Cloudflare Pages 的完整重构与部署标准操作规程。

### Digest Actions

核心是**出海全栈基建降本 SOP**——出海独立开发者产品起量后节省数万服务器开销的工程圣经。

1. **架构选型**：EC2+PM2 稳健派 vs Cloudflare Pages 极致免费派
2. **Edge 改造**：全局替换 Axios 为 Fetch，适配 Neon/Supabase Edge 驱动
3. **安全配置**：挂载 Cloudflare DNS 与 WAF 防盗刷

### Reflection Questions

- [ ] 你的出海网站如果突然迎来 50 万月访问，Vercel 账单是否会导致你的利润被完全吞噬？
- [ ] 你的代码中是否重度依赖了原生 Node.js API 从而丧失了迁移到 Edge 运行时的灵活性？
