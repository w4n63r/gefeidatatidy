const fs = require('fs');
const path = require('path');

module.exports = function generateFlowchartMmd(stages) {
  const mmdContent = `%% 哥飞出海知识流程图 (Mermaid Source)
flowchart TD
    %% 阶段节点定义
    subgraph S0_Block ["【Phase 0】S0 认知与心态"]
        S0["<b>S0 认知破局与出海常识</b><br/>• 作品思维与躬身入局<br/>• 破除大厂惯性，小步快跑<br/>• 建立赚美元正反馈"]
    end

    subgraph S1_Block ["【Phase 1】S1 需求与关键词"]
        S1["<b>S1 需求挖掘与关键词调研</b><br/>• 找“鱼多人少”的池子<br/>• Google Trends 4 维交叉验证<br/>• 逆向广告与意图清洗分组"]
    end

    subgraph S2_Block ["【Phase 2】S2 建站与开发"]
        S2["<b>S2 极速建站与脚手架</b><br/>• 10 分钟单 HTML 极速上线<br/>• Next.js/Cloudflare 部署<br/>• 通用登录/支付脚手架模板"]
    end

    subgraph S3_Block ["【Phase 3】S3 SEO收录与流量入门"]
        S3["<b>S3 SEO收录与流量破冰</b><br/>• Bing IndexNow 秒级主动推送<br/>• GSC 四级预警信号排查 SOP<br/>• 高权重平台发文 3%~6% 转化"]
    end

    subgraph S4_Block ["【Phase 4】S4 内容与多语言"]
        S4["<b>S4 纯血多语言与本地化</b><br/>• 8 语种纯血独立站 (.jp/.de)<br/>• 本地地道关键词重新调研<br/>• AI 本地市场推理原生写作"]
    end

    subgraph S5_Block ["【Phase 5】S5 SEO进阶与增长"]
        S5["<b>S5 GEO生成式优化与企业增长</b><br/>• 竞品对比页“教育大模型”<br/>• 企业级外链安全与 PR 稀释<br/>• 站内内链杠杆与 Google Ads 模型"]
    end

    subgraph S6_Block ["【Phase 6】S6 变现与商业化"]
        S6["<b>S6 商业化变现与转化漏斗</b><br/>• AdSense 审计 Skill 极速过审<br/>• Stripe 订阅与用量阶梯计费<br/>• DealPass 独家会员与 Google One Tap"]
    end

    subgraph S7_Block ["【Phase 7】S7 收款与合规"]
        S7["<b>S7 全球收款、税务与合规</b><br/>• 海外公司注册与税务申报<br/>• 香港/海外银行开户实务<br/>• Stripe 合规与合规结汇回国"]
    end

    subgraph S8_Block ["【Phase 8】S8 规模化与避坑"]
        S8["<b>S8 组织演进与避坑红线</b><br/>• 2 人千万 ARR 的 AI 原生打法<br/>• 团队 3 阶段人才演进模型<br/>• 严守防算法惩罚与防 CPA 崩塌红线"]
    end

    %% 阶段流转关系 (严格遵循学习递进逻辑)
    S0 -->|"确立方向与出海决心"| S1
    S1 -->|"产出高意图关键词清单"| S2
    S2 -->|"部署上线可访问专业页面"| S3
    S3 -->|"打通收录与早期流量闭环"| S4
    S4 -->|"开拓高购买力小语种市场"| S5
    S5 -->|"构建大模型与企业级流量矩阵"| S6
    S6 -->|"跑通商业变现与产生现金流"| S7
    S7 -->|"打通合规全球收款通道"| S8

    %% 样式美化
    classDef default fill:#f8fafc,stroke:#64748b,stroke-width:2px,color:#0f172a;
    classDef highlight fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a;
    class S0,S1,S2,S3,S4,S5,S6,S7,S8 highlight;
`;

  const targetPath = path.join('知识流程', '知识流程图.mmd');
  fs.writeFileSync(targetPath, mmdContent, { encoding: 'utf8' });
  console.log('Generated:', targetPath);
};
