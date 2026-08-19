const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mindmapDir = path.join('思维导图');
if (!fs.existsSync(mindmapDir)) {
  fs.mkdirSync(mindmapDir, { recursive: true });
}

// 1. Generate Markmap Markdown
const mdContent = `# 个人开发者 Web 出海做网站赚美元 — 学习与避坑全景导图

## S0 认知与心态
- 作品思维：把工作当成自己的作品 (2020-04-14)
- 躬身入局：亲自下场参与浪潮 (2023-12-08)
- 数量胜于质量：先上站别憋大招 (2025-07-18)
- 学聊泡试：极简验证与破除惯性 (2026-07-28)
- 避坑：别带着大厂惯性空谈排期 (2026-08-10)

## S1 需求与关键词
- 找新词：永远有效的建站策略 (2023-07-24)
- 鱼多人少：找竞争小的细分池子 (2026-07-23)
- 4维交叉验证：Trends/YT/TikTok/Discord (2026-08-06)
- 意图分组：生成/修复/风格/场景 (2026-08-07)
- 避坑：新手别碰已被大站垄断的大词 (2026-08-09)

## S2 建站与开发
- 10分钟上线：单HTML极速验证 (2023-07-31)
- 全栈脚手架：Next.js+登录+Stripe (2026-07-21)
- 商业质感：拒绝粗糙VibeCodingDemo (2026-07-21)
- Web优先：绕过App繁琐审核泥潭 (2026-08-10)
- 避坑：不要花几个月做未验证的App (2026-08-10)

## S3 SEO 与流量入门
- Bing破冰：IndexNow秒级主动推送 (2026-08-02)
- GSC四级信号：已收录/抓取/发现/跌幅 (2026-07-29)
- 高权重平台发文：Medium/Dev导流 (2026-08-02)
- 避坑：外链禁用单一锚文本防隐藏 (2026-07-30)
- 避坑：抓取不收录时立刻停批量上页 (2026-07-29)

## S4 内容与多语言
- 纯血独立站：8个站各做1个语种 (2026-07-22)
- 地道选词：深挖本地人真实搜索词 (2026-07-22)
- AI本地推理：中文指令+本地高搜词 (2026-07-22)
- 避坑：单站机翻8语种子目录必死 (2026-07-22)

## S5 SEO 进阶与增长
- GEO优化：竞品对比页教育大模型 (2026-07-26)
- 企业级SEO：抓LCP首屏前5%性能 (2026-07-30)
- 外链安全：Foundation+PR稿稀释 (2026-07-30)
- 内链杠杆：中后期最高性价比动作 (2026-07-30)
- 广告模型：投广告是在训练ML模型 (2026-08-05)

## S6 变现与商业化
- AdSense审计：@adsense-site-auditor过审 (2026-07-16)
- 转化漏斗：GoogleOneTap注册率翻倍 (2026-08-09)
- 订阅SaaS：开源自托管转官方云托管 (2026-07-12)
- DealPass：独家软件折扣会员变现 (2026-07-27)
- 避坑：生成失败绝不扣减用户积分 (2026-08-09)

## S7 收款与合规 (贯穿)
- 海外公司：公司注册与商标申报 (2024-04-04)
- 跨境银行：香港及海外银行开户 (2025-02-08)
- Stripe合规：全球收付款与结汇回国 (2023-08-13)

## S8 规模化与团队 (贯穿)
- AI原生打法：2人千万ARR对标500人 (2026-07-31)
- 组织3阶段：MVP/PMF/护城河人才配置 (2026-08-12)
- 避坑：团队刚有十几人别照抄大厂架构 (2026-08-12)
`;

const mdPath = path.join(mindmapDir, '个人开发者出海-学习与避坑.md');
fs.writeFileSync(mdPath, mdContent, { encoding: 'utf8' });
console.log('Generated Markmap Markdown:', mdPath);

// 2. Compile HTML with markmap-cli
const htmlPath = path.join(mindmapDir, '个人开发者出海-学习与避坑.html');
try {
  execSync(`node ".\\tools\\node_modules\\markmap-cli\\bin\\cli.js" "${mdPath}" -o "${htmlPath}"`, { stdio: 'inherit' });
  console.log('Generated Markmap HTML:', htmlPath);
} catch (e) {
  console.error('markmap-cli compile error:', e.message);
}

// 3. Generate Mermaid Mindmap
const mmdContent = `mindmap
  root((个人开发者 Web 出海))
    S0 认知与心态
      作品思维 2020-04-14
      躬身入局 2023-12-08
      数量胜于质量 2025-07-18
      学聊泡试 2026-07-28
    S1 需求与关键词
      找新词策略 2023-07-24
      鱼多人少 2026-07-23
      4维交叉验证 2026-08-06
      意图分组 2026-08-07
    S2 建站与开发
      10分钟上线 2023-07-31
      全栈脚手架 2026-07-21
      拒绝Demo感 2026-07-21
      Web优先 2026-08-10
    S3 SEO收录入门
      Bing IndexNow 2026-08-02
      GSC四级信号 2026-07-29
      高权重发文 2026-08-02
      锚文本多样化 2026-07-30
    S4 内容与多语言
      纯血独立站 2026-07-22
      地道本地词 2026-07-22
      AI市场推理 2026-07-22
    S5 SEO进阶增长
      GEO教育AI 2026-07-26
      企业级技术SEO 2026-07-30
      外链PR稀释 2026-07-30
      内链杠杆 2026-07-30
    S6 变现商业化
      AdSense审计 2026-07-16
      OneTap漏斗调优 2026-08-09
      开源云托管 2026-07-12
      DealPass会员 2026-07-27
    S7 收款合规
      海外公司注册 2024-04-04
      跨境银行开户 2025-02-08
      Stripe结汇 2023-08-13
    S8 规模化团队
      2人千万ARR 2026-07-31
      组织3阶段演进 2026-08-12
`;
const mmdPath = path.join(mindmapDir, '个人开发者出海-学习与避坑.mmd');
fs.writeFileSync(mmdPath, mmdContent, { encoding: 'utf8' });
console.log('Generated Mermaid Mindmap:', mmdPath);

// 4. Generate FreeMind .mm
const mmContent = `<map version="1.0.1">
  <node TEXT="个人开发者 Web 出海做网站赚美元">
    <node TEXT="S0 认知与心态">
      <node TEXT="作品思维 (2020-04-14)"/>
      <node TEXT="躬身入局 (2023-12-08)"/>
      <node TEXT="数量胜于质量 (2025-07-18)"/>
      <node TEXT="学聊泡试 (2026-07-28)"/>
    </node>
    <node TEXT="S1 需求与关键词">
      <node TEXT="找新词策略 (2023-07-24)"/>
      <node TEXT="鱼多人少 (2026-07-23)"/>
      <node TEXT="4维交叉验证 (2026-08-06)"/>
      <node TEXT="意图分组 (2026-08-07)"/>
    </node>
    <node TEXT="S2 建站与开发">
      <node TEXT="10分钟上线 (2023-07-31)"/>
      <node TEXT="全栈脚手架 (2026-07-21)"/>
      <node TEXT="Web优先 (2026-08-10)"/>
    </node>
    <node TEXT="S3 SEO收录入门">
      <node TEXT="Bing IndexNow (2026-08-02)"/>
      <node TEXT="GSC四级信号 (2026-07-29)"/>
      <node TEXT="高权重发文 (2026-08-02)"/>
    </node>
    <node TEXT="S4 内容与多语言">
      <node TEXT="纯血独立站 (2026-07-22)"/>
      <node TEXT="地道本地词 (2026-07-22)"/>
    </node>
    <node TEXT="S5 SEO进阶增长">
      <node TEXT="GEO教育AI (2026-07-26)"/>
      <node TEXT="外链PR稀释 (2026-07-30)"/>
      <node TEXT="内链杠杆 (2026-07-30)"/>
    </node>
    <node TEXT="S6 变现商业化">
      <node TEXT="AdSense审计 (2026-07-16)"/>
      <node TEXT="OneTap漏斗调优 (2026-08-09)"/>
      <node TEXT="开源云托管 (2026-07-12)"/>
    </node>
    <node TEXT="S7 收款合规">
      <node TEXT="海外公司与银行开户 (2024-04-04)"/>
      <node TEXT="Stripe结汇 (2023-08-13)"/>
    </node>
    <node TEXT="S8 规模化团队">
      <node TEXT="2人千万ARR (2026-07-31)"/>
      <node TEXT="组织3阶段演进 (2026-08-12)"/>
    </node>
  </node>
</map>`;
const mmPath = path.join(mindmapDir, '个人开发者出海-学习与避坑.mm');
fs.writeFileSync(mmPath, mmContent, { encoding: 'utf8' });
console.log('Generated FreeMind .mm:', mmPath);
