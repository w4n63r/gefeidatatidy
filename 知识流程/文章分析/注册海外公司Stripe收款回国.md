---
title: "从注册海外公司到 Stripe 收款回国"
date: 2023-08-13
type: content-analysis
source: data/[2023-08-13-0800]从注册海外公司到Stripe收款回国.html
tags:
  - summary
  - 出海基础设施
  - 公司注册
  - 收款
  - 实操
---

# 从注册海外公司到 Stripe 收款回国 - Full Guide: US Company → Stripe → CNY

## Core Summary

> [!abstract] TLDR
> 个人开发者出海收款的完整实操路径：**海外手机号 → 美国公司（Wyoming LLC）→ 地址公证 → EIN → Mercury 银行 → Stripe/收款渠道 → Wise 提现回国**，实现"全球收款国内到账"。
>
> - **手机号**：英国 giffgaff（180 天保号）或美国 Ultra Mobile PayGo（$3/月）
> - **公司**：Firstbase 注册 Wyoming LLC（个人开发者友好），地址用 Notarize 视频公证（1583 表）
> - **银行**：Mercury（1 工作日过审，免费无限虚拟卡，可绑支付宝）
> - **收款**：EIN 到手后注册 Stripe；还可注册 LemonSqueezy/Paddle（需验证产品站）
> - **提现**：Wise 换人民币提现到国内（汇率通常比银行好）；Kraken→欧元 SEPA→Wise
> - **成本**：手机号 $36/年 + Firstbase $399 + 地址 $350/年 + 代理 $299/年

---

## Mind Map

```
海外公司→Stripe收款
├── 手机号：giffgaff / Ultra Mobile PayGo
├── 美国公司：Firstbase 注册 Wyoming LLC
│   ├── 地址：Notarize 视频公证（1583表，驾驶证翻译件）
│   └── EIN：第10个工作日收到国税局信件
├── 银行：Mercury（免费虚拟卡/绑支付宝/限商户额度）
├── 收款：Stripe + LemonSqueezy/Paddle
└── 提现：Wise 换汇回国 / Kraken→欧元→Wise
    └── 成本：约 $1100+/年
```

---

## Theme Analysis

### Theme 1: 收款基础设施

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 公司主体 | LLC 适合个人开发者 | "选择了Wyoming，公司类型是LLC，比较适合个人开发者" |
| 银行虚拟卡 | Mercury 免费无限虚拟卡 | "可以限制交易商户和额度……遇到流氓服务直接注销卡号" |
| 多渠道收款 | Stripe+LemonSqueezy+Paddle | "这两家都需要验证产品网站" |

> [!tip]- Top 3 Actionable Recommendations
> 1. **按需选型**：只想收 Adsense/联盟款→Wise/Payoneer 就够；要收 SaaS 订阅→Stripe+公司
> 2. **别填假信息**：护照/驾驶证要真实，避免封号（作者反复强调）
> 3. **虚拟卡管理**：用 Mercury 虚拟卡按商户限制额度，防自动扣款/流氓服务

### Theme 2: 成本与合规

| Dimension | Insight | Supporting Evidence |
|-----------|---------|---------------------|
| 年成本 | 公司+地址+代理约 $1100/年 | Firstbase $399 + 地址 $350 + 代理 $299 + 手机号 $36 |
| 长期价值 | 公司主体解锁更多 | Apple/Google Play 开发者账号、OpenAI 补贴、ITIN/信用卡 |
| 时效提醒 | 出海要趁早 | "大陆身份出海遇到封号已是家常便饭，凡事还是要趁早" |

> [!warning]- 注意
> 本文是 2023 年的实操路径，服务商价格/政策会变；涉及税务合规（公司年报/报税），建议按自己情况咨询专业人士。

---

## PACER Application

> [!important] PACER Classification: P — Procedural
> **Rationale**: 完整操作流程，属程序性知识，按步骤执行

### Digest Actions

1. **评估需求**：你的变现模式需要公司+Stripe吗？（广告/联盟→先不用）
2. **列清单**：手机号/公司/地址/EIN/银行/收款/提现，逐项打勾
3. **选服务商**：对比 Firstbase/淘宝代理/自助，算清年成本
4. **记录**：写下你的"收款链路图"（产品→Stripe→Mercury→Wise→人民币）

### Reflection Questions

- [ ] 我的出海收入目标，值不值得现在投入 ~$1100/年 的公司成本？
- [ ] 我有没有"收到钱但提不回国"的卡点？
- [ ] 这个链路里哪一步我现在就能做（如先注册 Wise/Payoneer）？
