const fs = require('fs');
const path = require('path');

module.exports = function generateFlowchartHtml(articles, stages) {
  // Group articles by stage
  const stageMap = {};
  for (const s of stages) { stageMap[s.key] = []; }
  for (const a of articles) {
    if (stageMap[a.stage]) {
      stageMap[a.stage].push(a);
    }
  }

  // Generate Stage Cards HTML
  let cardsHtml = '';
  stages.forEach((s, idx) => {
    const list = stageMap[s.key] || [];
    const withReport = list.filter(x => x.report);
    const countText = `${list.length} 篇文章 (${withReport.length} 篇精读)`;
    
    let articlesLi = '';
    list.slice(0, 15).forEach(item => {
      const reportLink = item.report ? `<a href="../${item.report}" class="report-tag" target="_blank">📄 读报告</a>` : '';
      const rawLink = `<a href="../data/${item.id}.html" class="raw-tag" target="_blank">🔗 读原文</a>`;
      articlesLi += `
        <li class="article-item">
          <div class="article-title">${item.title || item.id}</div>
          <div class="article-meta">
            <span class="pacer-badge ${item.pacer}">${item.pacer || 'C'}</span>
            <span class="diff-badge">难度 ${item.difficulty || 2}</span>
            <span class="min-badge">${item.minutes || 15}m</span>
            ${reportLink}
            ${rawLink}
          </div>
          ${item.summary ? `<div class="article-summary">${item.summary}</div>` : ''}
        </li>`;
    });
    if (list.length > 15) {
      articlesLi += `<li class="article-more">... 以及另外 ${list.length - 15} 篇文章（详见《知识流程.md》）</li>`;
    }

    cardsHtml += `
      <div class="stage-card" id="card-${s.code}">
        <div class="stage-header" onclick="toggleStage('${s.code}')">
          <div class="stage-badge">${s.code}</div>
          <div class="stage-info">
            <div class="stage-name">${s.name} <span class="stage-count">${countText}</span></div>
            <div class="stage-goal">${s.goal}</div>
          </div>
          <div class="stage-toggle-btn" id="btn-${s.code}">▼ 展开文章</div>
        </div>
        <div class="stage-milestone">🚩 <b>阶段里程碑：</b>${s.milestone}</div>
        <div class="stage-body" id="body-${s.code}" style="display: none;">
          <ul class="article-list">
            ${articlesLi}
          </ul>
        </div>
      </div>
      ${idx < stages.length - 1 ? `<div class="flow-arrow"><div class="arrow-line"></div><div class="arrow-text">推进至下一阶段 ➔</div></div>` : ''}
    `;
  });

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>哥飞出海做网站赚美元 — 全局知识流程与学习路径图</title>
  <style>
    :root { --primary: #2563eb; --primary-light: #eff6ff; --bg: #f8fafc; --card-bg: #ffffff; --text: #0f172a; --text-muted: #64748b; --border: #e2e8f0; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: var(--bg); color: var(--text); line-height: 1.5; padding: 30px 20px; }
    .container { max-width: 1000px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { font-size: 28px; font-weight: 800; color: #1e293b; margin-bottom: 12px; }
    .header p { font-size: 15px; color: var(--text-muted); max-width: 700px; margin: 0 auto; }
    .stats-bar { display: flex; justify-content: space-around; background: #ffffff; border: 1px solid var(--border); border-radius: 12px; padding: 18px; margin-bottom: 35px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .stat-item { text-align: center; }
    .stat-num { font-size: 24px; font-weight: 700; color: var(--primary); }
    .stat-label { font-size: 13px; color: var(--text-muted); }
    .stage-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); overflow: hidden; transition: all 0.2s ease; }
    .stage-card:hover { border-color: #93c5fd; box-shadow: 0 4px 12px rgba(37,99,235,0.08); }
    .stage-header { display: flex; align-items: center; padding: 20px 24px; cursor: pointer; user-select: none; background: #ffffff; }
    .stage-badge { width: 44px; height: 44px; background: var(--primary); color: #fff; font-weight: 800; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-right: 18px; flex-shrink: 0; }
    .stage-info { flex-grow: 1; }
    .stage-name { font-size: 18px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 10px; }
    .stage-count { font-size: 13px; font-weight: normal; color: var(--text-muted); background: #f1f5f9; padding: 2px 8px; border-radius: 6px; }
    .stage-goal { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
    .stage-toggle-btn { font-size: 13px; color: var(--primary); font-weight: 600; padding: 6px 12px; border-radius: 6px; background: var(--primary-light); }
    .stage-milestone { background: #fefce8; border-top: 1px solid #fef08a; border-bottom: 1px solid #fef08a; padding: 10px 24px; font-size: 13px; color: #854d0e; }
    .stage-body { padding: 20px 24px; background: #fafafa; border-top: 1px solid var(--border); }
    .article-list { list-style: none; }
    .article-item { padding: 12px 0; border-bottom: 1px dashed var(--border); }
    .article-item:last-child { border-bottom: none; }
    .article-title { font-size: 14px; font-weight: 600; color: #334155; }
    .article-meta { display: flex; align-items: center; gap: 8px; margin: 6px 0; font-size: 12px; }
    .article-summary { font-size: 13px; color: var(--text-muted); }
    .pacer-badge { font-weight: 700; padding: 1px 6px; border-radius: 4px; font-size: 11px; }
    .pacer-badge.P { background: #dcfce7; color: #166534; }
    .pacer-badge.A { background: #e0e7ff; color: #3730a3; }
    .pacer-badge.C { background: #fef3c7; color: #92400e; }
    .pacer-badge.E { background: #fce7f3; color: #9d174d; }
    .pacer-badge.R { background: #f3e8ff; color: #6b21a8; }
    .diff-badge, .min-badge { background: #f1f5f9; color: #475569; padding: 1px 6px; border-radius: 4px; font-size: 11px; }
    .report-tag { color: var(--primary); text-decoration: none; font-weight: 600; }
    .raw-tag { color: var(--text-muted); text-decoration: none; }
    .report-tag:hover, .raw-tag:hover { text-decoration: underline; }
    .article-more { font-size: 13px; color: var(--text-muted); font-style: italic; padding-top: 10px; }
    .flow-arrow { text-align: center; margin: 8px 0; display: flex; flex-direction: column; align-items: center; }
    .arrow-line { width: 2px; height: 16px; background: #cbd5e1; }
    .arrow-text { font-size: 11px; font-weight: 700; color: #94a3b8; margin-top: 2px; }
    .footer { text-align: center; margin-top: 50px; font-size: 13px; color: var(--text-muted); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>基于 726 篇出海实战公众号全量精读与 606 份结构化报告，系统构建的个人开发者 Web 出海 9 阶段递进学习与实战闭环体系。</p>
    </div>

    <div class="stats-bar">
      <div class="stat-item"><div class="stat-num">726 篇</div><div class="stat-label">全量文章分析</div></div>
      <div class="stat-item"><div class="stat-num">606 份</div><div class="stat-label">方法论精读报告</div></div>
      <div class="stat-item"><div class="stat-num">9 大阶段</div><div class="stat-label">递进实操流程</div></div>
      <div class="stat-item"><div class="stat-num">100%</div><div class="stat-label">全链路闭环</div></div>
    </div>

    <div class="roadmap-flow">
      ${cardsHtml}
    </div>

    <div class="footer">
      <p>知识流程构建完成 • 严格遵循 02-执行手册 与 learning-roadmap 规范</p>
    </div>
  </div>

  <script>
    function toggleStage(code) {
      const body = document.getElementById('body-' + code);
      const btn = document.getElementById('btn-' + code);
      if (body.style.display === 'none') {
        body.style.display = 'block';
        btn.innerText = '▲ 收起文章';
      } else {
        body.style.display = 'none';
        btn.innerText = '▼ 展开文章';
      }
    }
  </script>
</body>
</html>`;

  const targetPath = path.join('知识流程', '知识流程图.html');
  fs.writeFileSync(targetPath, html, { encoding: 'utf8' });
  console.log('Generated:', targetPath);
};
