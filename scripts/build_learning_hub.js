const fs = require('fs');
const path = require('path');

const hubDir = path.join('学习台');
if (!fs.existsSync(hubDir)) {
  fs.mkdirSync(hubDir, { recursive: true });
}

const analysisFile = path.join('output', 'analysis', 'articles_analysis.jsonl');
const articles = fs.readFileSync(analysisFile, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));

// Group by stage
const stagesOrder = [
  'S0_认知与心态', 'S1_需求与关键词', 'S2_建站与开发', 'S3_SEO与流量入门',
  'S4_内容与多语言', 'S5_SEO进阶与增长', 'S6_变现与商业化', 'S7_收款与合规',
  'S7_工具与资源', 'S8_避坑警示', 'S9_非学习类'
];

let itemsHtml = '';
stagesOrder.forEach(stage => {
  const stageArticles = articles.filter(a => a.stage === stage);
  if (!stageArticles.length) return;

  let liHtml = '';
  stageArticles.forEach(a => {
    const reportLink = a.report ? `<a href="../${a.report}" target="_blank" class="link-report">📄 精读报告</a>` : '';
    const rawLink = `<a href="../data/${a.id}.html" target="_blank" class="link-raw">🔗 原文</a>`;
    liHtml += `
      <li class="task-item">
        <label class="checkbox-container">
          <input type="checkbox" id="chk-${a.id}" onchange="updateProgress()">
          <span class="checkmark"></span>
          <span class="task-title">[${a.date || '经典'}] ${a.title || a.id}</span>
        </label>
        <div class="task-links">
          ${reportLink}
          ${rawLink}
        </div>
      </li>
    `;
  });

  itemsHtml += `
    <div class="stage-section">
      <h2 class="stage-title">${stage} (${stageArticles.length} 篇)</h2>
      <ul class="task-list">
        ${liHtml}
      </ul>
    </div>
  `;
});

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>个人开发者出海做网站赚美元 — 个人学习打卡工作台</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 20px; max-width: 900px; margin: 0 auto; }
    h1 { text-align: center; color: #0f172a; margin-bottom: 8px; }
    .subtitle { text-align: center; color: #64748b; margin-bottom: 25px; font-size: 14px; }
    .progress-box { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px; position: sticky; top: 10px; z-index: 100; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .progress-bar-bg { background: #e2e8f0; height: 16px; border-radius: 8px; overflow: hidden; margin-top: 10px; }
    .progress-bar-fill { background: #2563eb; height: 100%; width: 0%; transition: width 0.3s ease; }
    .progress-text { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; }
    .stage-section { background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
    .stage-title { font-size: 16px; font-weight: 700; color: #2563eb; margin-bottom: 15px; border-bottom: 2px solid #eff6ff; padding-bottom: 8px; }
    .task-list { list-style: none; padding: 0; margin: 0; }
    .task-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #f1f5f9; font-size: 14px; }
    .task-links { display: flex; gap: 10px; font-size: 12px; flex-shrink: 0; margin-left: 15px; }
    .link-report { color: #2563eb; text-decoration: none; font-weight: 600; }
    .link-raw { color: #64748b; text-decoration: none; }
    .link-report:hover, .link-raw:hover { text-decoration: underline; }
    .checkbox-container { display: flex; align-items: center; cursor: pointer; gap: 8px; }
  </style>
</head>
<body>
  <h1>🎯 出海做网站赚美元 — 个人学习打卡工作台</h1>
  <p class="subtitle">全库 726 篇文章学习打卡 • 支持 LocalStorage 本地自动记忆进度</p>
  
  <div class="progress-box">
    <div class="progress-text">
      <span>学习打卡完成度</span>
      <span id="progress-percent">0% (0 / 726)</span>
    </div>
    <div class="progress-bar-bg">
      <div class="progress-bar-fill" id="progress-fill"></div>
    </div>
  </div>

  <div class="tasks-container">
    ${itemsHtml}
  </div>

  <script>
    const total = 726;
    function updateProgress() {
      const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
      const pct = Math.round((checked / total) * 100);
      document.getElementById('progress-percent').innerText = pct + '% (' + checked + ' / ' + total + ')';
      document.getElementById('progress-fill').style.width = pct + '%';
      
      const state = {};
      document.querySelectorAll('input[type="checkbox"]').forEach(c => {
        if (c.checked) state[c.id] = 1;
      });
      localStorage.setItem('gf_learning_progress', JSON.stringify(state));
    }

    window.onload = function() {
      try {
        const saved = JSON.parse(localStorage.getItem('gf_learning_progress') || '{}');
        Object.keys(saved).forEach(id => {
          const el = document.getElementById(id);
          if (el) el.checked = true;
        });
      } catch(e) {}
      updateProgress();
    };
  </script>
</body>
</html>`;

const targetPath = path.join(hubDir, '学习首页.html');
fs.writeFileSync(targetPath, html, { encoding: 'utf8' });
console.log('Generated Learning Hub:', targetPath);
