// Outbound Dev Learning Hub - Core App Engine (v3.0 2-Tier Master-Detail Navigation)
(function () {
  const data = window.GF_SITE_DATA || { articles: [], stages: [], reports: {}, pitfalls: [], pacerGuide: {} };

  // State
  let currentArticle = null;
  let readerMode = 'report'; // 'report' | 'raw' | 'split'
  let activeSidebarTab = 'stages'; // 'stages' | 'mustread' | 'bookmarks' | 'pitfalls'
  let activeRightTab = 'toc'; // 'toc' | 'notes'
  let searchSelectedStage = null;
  let selectedStageIndex = 0; // index in data.stages
  let sortOrder = 'priority'; // 'priority' | 'date_desc' | 'date_asc' | 'diff_asc'
  let currentTypeFilter = 'all'; // 'all' | 'P' | 'C' | 'R'
  let onlyUnread = false;

  // Stage Color Tokens
  const STAGE_COLORS = {
    'S0': '#2563eb', 'S1': '#4f46e5', 'S2': '#059669', 'S3': '#0284c7',
    'S4': '#7c3aed', 'S5': '#d97706', 'S6': '#db2777', 'S7': '#0d9488',
    'S7-Tools': '#64748b', 'S8': '#ea580c', 'S9': '#475569'
  };

  // LocalStorage State
  let completedSet = new Set(JSON.parse(localStorage.getItem('gf_completed') || '[]'));
  let bookmarkSet = new Set(JSON.parse(localStorage.getItem('gf_bookmarks') || '[]'));
  let notesMap = JSON.parse(localStorage.getItem('gf_notes') || '{}');

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderStageDropdownDrawer();
    renderSidebarStages();
    renderSearchFilters();
    updateGlobalProgress();

    // Open first article
    const firstArticle = data.articles.find(a => a.isMustRead && a.report) || data.articles.find(a => a.report) || data.articles[0];
    if (firstArticle) {
      loadArticle(firstArticle.id);
    }

    // Keyboard Shortcuts (⌘K / Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeSearchModal();
        closePacerGuideModal();
        closeStageDropdown();
      }
    });

    document.addEventListener('click', (e) => {
      const drawer = document.getElementById('stage-dropdown-drawer');
      const bar = document.getElementById('stage-selector-container');
      if (drawer && drawer.style.display !== 'none' && !drawer.contains(e.target) && !bar.contains(e.target)) {
        closeStageDropdown();
      }
    });

    if (window.lucide) lucide.createIcons();
  });

  // Sorting Helper
  function sortArticles(arr) {
    const list = [...arr];
    if (sortOrder === 'priority') {
      list.sort((a, b) => {
        if ((b.priorityScore || 0) !== (a.priorityScore || 0)) {
          return (b.priorityScore || 0) - (a.priorityScore || 0);
        }
        return (b.date || '').localeCompare(a.date || '');
      });
    } else if (sortOrder === 'date_desc') {
      list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    } else if (sortOrder === 'date_asc') {
      list.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    } else if (sortOrder === 'diff_asc') {
      list.sort((a, b) => {
        const diffA = a.difficulty_stars ? a.difficulty_stars.length : 2;
        const diffB = b.difficulty_stars ? b.difficulty_stars.length : 2;
        return diffA - diffB;
      });
    }
    return list;
  }

  // Render Stage Drawer Menu
  function renderStageDropdownDrawer() {
    const drawer = document.getElementById('stage-dropdown-drawer');
    if (!drawer) return;
    let html = '';
    data.stages.forEach((stage, idx) => {
      const stageArticles = data.articles.filter(a => a.stage === stage.key);
      const completedCount = stageArticles.filter(a => completedSet.has(a.id)).length;
      const stageColor = STAGE_COLORS[stage.code] || '#2563eb';
      const isActive = idx === selectedStageIndex;

      html += `
        <div class="stage-drawer-item ${isActive ? 'active' : ''}" onclick="window.app.selectStage(${idx})">
          <div class="drawer-item-left">
            <span class="stage-picker-badge" style="background:${stageColor};font-size:9.5px;">${stage.code}</span>
            <span class="drawer-item-title">${stage.name}</span>
          </div>
          <span class="drawer-item-count">${completedCount}/${stageArticles.length}</span>
        </div>
      `;
    });
    drawer.innerHTML = html;
  }

  // Sidebar List Controller (2-Tier Focused Stream)
  function renderSidebarStages(filterText = '') {
    const container = document.getElementById('sidebar-list-container');
    const selectorContainer = document.getElementById('stage-selector-container');
    if (!container) return;

    if (activeSidebarTab !== 'stages') {
      if (selectorContainer) selectorContainer.style.display = 'none';
      if (activeSidebarTab === 'mustread') renderMustReadList(container, filterText);
      else if (activeSidebarTab === 'bookmarks') renderBookmarksList(container, filterText);
      else if (activeSidebarTab === 'pitfalls') renderPitfallsList(container, filterText);
      return;
    }

    if (selectorContainer) selectorContainer.style.display = 'flex';

    const currentStage = data.stages[selectedStageIndex] || data.stages[0];
    const stageArticles = data.articles.filter(a => a.stage === currentStage.key);
    const completedCount = stageArticles.filter(a => completedSet.has(a.id)).length;
    const stageColor = STAGE_COLORS[currentStage.code] || '#2563eb';
    const pct = stageArticles.length ? Math.round((completedCount / stageArticles.length) * 100) : 0;

    // Update Stage Selector Header
    const badgeEl = document.getElementById('current-stage-badge');
    const titleEl = document.getElementById('current-stage-title');
    const progEl = document.getElementById('current-stage-progress');
    if (badgeEl) {
      badgeEl.innerText = currentStage.code;
      badgeEl.style.background = stageColor;
    }
    if (titleEl) titleEl.innerText = currentStage.name;
    if (progEl) progEl.innerText = `${completedCount}/${stageArticles.length} (${pct}%)`;

    renderStageDropdownDrawer();

    // Filter articles in current stage
    let matched = stageArticles.filter(a => {
      if (onlyUnread && completedSet.has(a.id)) return false;
      if (['P', 'C', 'R'].includes(currentTypeFilter) && (a.pacer || 'C') !== currentTypeFilter) return false;
      if (!filterText) return true;
      const q = filterText.toLowerCase();
      const t = (a.cleanTitle || a.title || a.id).toLowerCase();
      const s = (a.summary || '').toLowerCase();
      return t.includes(q) || s.includes(q) || a.id.toLowerCase().includes(q);
    });

    const sorted = sortArticles(matched);

    let html = '';
    // Milestone Goal Banner
    if (currentStage.milestone && !filterText) {
      html += `
        <div class="stage-milestone-box">
          <b>🎯 阶段里程碑</b>: ${currentStage.milestone}
        </div>
      `;
    }

    if (sorted.length === 0) {
      html += `<div style="padding:40px 15px;text-align:center;color:var(--text-muted);font-size:13px;">当前阶段暂无符合条件的文章</div>`;
    } else {
      sorted.forEach(a => {
        const isDone = completedSet.has(a.id);
        const isActive = currentArticle && currentArticle.id === a.id;
        const pacer = a.pacer || 'C';
        const pacerShort = pacer === 'P' ? '实操' : pacer === 'C' ? '心法' : pacer === 'A' ? '行动' : pacer === 'R' ? '资源' : '复盘';
        const displayTitle = a.cleanTitle || a.title || a.id;
        const mustReadBadge = a.isMustRead ? `<span class="badge-must-read">🔥 必读</span>` : '';

        html += `
          <div class="sidebar-article-item ${isActive ? 'active' : ''}" onclick="window.app.loadArticle('${a.id}')">
            <span class="item-check ${isDone ? 'completed' : ''}" onclick="event.stopPropagation(); window.app.toggleArticleComplete('${a.id}')">
              <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}"></i>
            </span>
            <span class="item-title">${mustReadBadge}${displayTitle}</span>
            <span class="item-pacer ${pacer}" title="${a.pacerDesc || ''}">${pacerShort}</span>
          </div>
        `;
      });

      // Next stage button at bottom
      if (selectedStageIndex < data.stages.length - 1 && !filterText) {
        const nextStage = data.stages[selectedStageIndex + 1];
        html += `
          <button class="stage-next-step-btn" onclick="window.app.nextStage()">
            <span>进入下一阶段: ${nextStage.code} ${nextStage.name}</span>
            <i data-lucide="arrow-right"></i>
          </button>
        `;
      }
    }

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  // Render Must-Read Landmark View
  function renderMustReadList(container, filterText) {
    const mustReads = data.articles.filter(a => a.isMustRead);
    let matched = mustReads.filter(a => {
      if (onlyUnread && completedSet.has(a.id)) return false;
      if (!filterText) return true;
      const q = filterText.toLowerCase();
      return (a.cleanTitle || a.title || a.id).toLowerCase().includes(q) || (a.summary || '').toLowerCase().includes(q);
    });

    const sorted = sortArticles(matched);
    let html = `<div style="padding:4px 0 10px;"><div style="font-size:11.5px;font-weight:700;color:var(--text-muted);margin-bottom:8px;padding:0 4px;">🔥 全局必读神作 (${sorted.length} 篇)</div>`;
    sorted.forEach(a => {
      const isDone = completedSet.has(a.id);
      const isActive = currentArticle && currentArticle.id === a.id;
      const pacer = a.pacer || 'C';
      const stageCode = a.stage ? a.stage.split('_')[0] : 'S0';
      const stageColor = STAGE_COLORS[stageCode] || '#2563eb';
      const displayTitle = a.cleanTitle || a.title || a.id;

      html += `
        <div class="sidebar-article-item ${isActive ? 'active' : ''}" onclick="window.app.loadArticle('${a.id}')">
          <span class="item-check ${isDone ? 'completed' : ''}" onclick="event.stopPropagation(); window.app.toggleArticleComplete('${a.id}')">
            <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}"></i>
          </span>
          <span class="item-title"><span class="stage-picker-badge" style="background:${stageColor};font-size:9px;padding:1px 4px;margin-right:4px;">${stageCode}</span>${displayTitle}</span>
          <span class="item-pacer ${pacer}">${pacer === 'P' ? '实操' : pacer === 'C' ? '心法' : '资源'}</span>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  // Render Bookmarks View
  function renderBookmarksList(container, filterText) {
    const bookmarkedArticles = data.articles.filter(a => bookmarkSet.has(a.id));
    if (!bookmarkedArticles.length) {
      container.innerHTML = '<div style="padding:40px 15px;text-align:center;color:var(--text-muted);font-size:13px;"><i data-lucide="bookmark" style="width:28px;height:28px;margin-bottom:8px;opacity:0.5;"></i><p>暂无收藏文章</p><p style="font-size:11px;margin-top:4px;">在阅读器右上角点击书签图标即可收藏</p></div>';
      if (window.lucide) lucide.createIcons();
      return;
    }
    let html = `<div style="padding:4px 0 10px;"><div style="font-size:11.5px;font-weight:700;color:var(--text-muted);margin-bottom:8px;padding:0 4px;">🔖 我的收藏 (${bookmarkedArticles.length} 篇)</div>`;
    const sorted = sortArticles(bookmarkedArticles);
    sorted.forEach(a => {
      const isDone = completedSet.has(a.id);
      const isActive = currentArticle && currentArticle.id === a.id;
      const displayTitle = a.cleanTitle || a.title || a.id;
      const stageCode = a.stage ? a.stage.split('_')[0] : 'S0';
      html += `
        <div class="sidebar-article-item ${isActive ? 'active' : ''}" onclick="window.app.loadArticle('${a.id}')">
          <span class="item-check ${isDone ? 'completed' : ''}" onclick="event.stopPropagation(); window.app.toggleArticleComplete('${a.id}')">
            <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}"></i>
          </span>
          <span class="item-title"><span class="stage-picker-badge" style="background:#64748b;font-size:9px;padding:1px 4px;margin-right:4px;">${stageCode}</span>${displayTitle}</span>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  // Render Pitfalls View
  function renderPitfallsList(container, filterText) {
    let html = '<div style="padding:4px 0 10px;"><div style="font-size:11.5px;font-weight:700;color:var(--warning);margin-bottom:8px;padding:0 4px;">⚠️ 5 大实战避坑场景诊断卡片</div>';
    data.pitfalls.forEach((p, idx) => {
      html += `
        <div class="stage-milestone-box" style="background:var(--bg-surface);border:1px solid var(--border-color);margin-bottom:10px;padding:10px;">
          <div style="font-weight:700;color:var(--warning);font-size:12.5px;margin-bottom:6px;">⚠️ ${p.title}</div>
          <p style="font-size:12px;color:var(--text-muted);line-height:1.5;"><b>深坑现象</b>: ${p.desc}</p>
          <p style="font-size:12px;color:var(--success);line-height:1.5;margin-top:6px;"><b>抢救处方</b>: ${p.sop}</p>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // Helper to Parse Callout HTML
  function formatCalloutHtml(type, title, bodyText) {
    const iconMap = {
      abstract: '✨', tldr: '✨', tip: '💡', important: '📌',
      warning: '⚠️', caution: '🛑', note: 'ℹ️', info: 'ℹ️'
    };
    const icon = iconMap[type] || '📌';
    const parsedBody = marked.parse(bodyText);
    return `<div class="callout callout-${type}"><div class="callout-header"><span class="callout-icon">${icon}</span> <span class="callout-title">${title}</span></div><div class="callout-body">${parsedBody}</div></div>`;
  }

  // Pre-process and render custom Markdown
  function renderCustomMarkdown(raw) {
    if (!raw) return '';
    let md = raw.replace(/^\s*---[\s\S]*?---\s*/, '');

    const lines = md.split('\n');
    const processedLines = [];
    let inCallout = false;
    let calloutType = '';
    let calloutTitle = '';
    let calloutBody = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^>\s*\[!(abstract|tldr|tip|important|warning|caution|note|info)\](?:\s*(.*))?$/i);
      if (match) {
        if (inCallout) {
          processedLines.push(formatCalloutHtml(calloutType, calloutTitle, calloutBody.join('\n')));
          calloutBody = [];
        }
        inCallout = true;
        calloutType = match[1].toLowerCase();
        calloutTitle = match[2] ? match[2].trim() : (calloutType === 'abstract' ? 'TLDR 核心提炼' : calloutType.toUpperCase());
        continue;
      }

      if (inCallout) {
        if (line.startsWith('>')) {
          calloutBody.push(line.replace(/^>\s?/, ''));
        } else if (line.trim() === '') {
          calloutBody.push('');
        } else {
          processedLines.push(formatCalloutHtml(calloutType, calloutTitle, calloutBody.join('\n')));
          inCallout = false;
          calloutBody = [];
          processedLines.push(line);
        }
      } else {
        processedLines.push(line);
      }
    }

    if (inCallout) {
      processedLines.push(formatCalloutHtml(calloutType, calloutTitle, calloutBody.join('\n')));
    }

    return marked.parse(processedLines.join('\n'));
  }

  // Load and Render Article
  function loadArticle(articleId) {
    const article = data.articles.find(a => a.id === articleId);
    if (!article) return;
    currentArticle = article;

    // Automatically sync stage selector to article's stage if in stage view
    const stageIdx = data.stages.findIndex(s => s.key === article.stage);
    if (stageIdx !== -1 && stageIdx !== selectedStageIndex && activeSidebarTab === 'stages') {
      selectedStageIndex = stageIdx;
    }

    const displayTitle = article.cleanTitle || article.title || article.id;
    const mustReadBadge = article.isMustRead ? '🔥 [必读] ' : '';

    // Update Header Breadcrumb
    const bc = document.getElementById('article-breadcrumb');
    if (bc) {
      bc.innerHTML = `<span class="crumb-stage">${article.stage}</span> / <span class="crumb-title">${mustReadBadge}${displayTitle}</span>`;
    }

    // Update Actions State
    const starBtn = document.getElementById('btn-bookmark');
    if (starBtn) {
      starBtn.className = 'action-btn ' + (bookmarkSet.has(article.id) ? 'active-star' : '');
    }
    const compBtn = document.getElementById('btn-complete');
    if (compBtn) {
      compBtn.className = 'action-btn ' + (completedSet.has(article.id) ? 'active-check' : '');
    }

    // Render Markdown Report
    const reportPane = document.getElementById('report-markdown-content');
    const reportFile = article.report ? article.report.replace(/^知识流程\/文章分析\//, '') : '';
    const rawMarkdown = data.reports[reportFile] || `# ${displayTitle}\n\n> [!info] 提示\n> 本文为阶段性通告或资讯标记，无独立长篇精读报告。\n\n**阶段归属**：\`${article.stage}\`\n**核心摘要**：${article.summary || '无'}\n\n👉 [点击切换上方【微信原文】查看原始网页](../data/${article.id}.html)`;

    if (reportPane) {
      reportPane.innerHTML = renderCustomMarkdown(rawMarkdown);
      buildTOC(reportPane);
    }

    // Update Raw Frame
    const rawFrame = document.getElementById('raw-article-frame');
    if (rawFrame) {
      rawFrame.src = `../data/${article.id}.html`;
    }

    // Load Note
    const noteEditor = document.getElementById('article-note-editor');
    if (noteEditor) {
      noteEditor.value = notesMap[article.id] || '';
    }

    renderSidebarStages(document.getElementById('sidebar-filter') ? document.getElementById('sidebar-filter').value : '');
    if (window.lucide) lucide.createIcons();
  }

  // Build Dynamic TOC from Rendered Headings
  function buildTOC(container) {
    const tocBox = document.getElementById('panel-toc-content');
    if (!tocBox) return;
    const headings = container.querySelectorAll('h1, h2, h3');
    if (!headings.length) {
      tocBox.innerHTML = '<p style="color:var(--text-muted);font-size:13px;">本文暂无章节大纲</p>';
      return;
    }

    let tocHtml = '<ul>';
    headings.forEach((h, idx) => {
      const id = 'heading-' + idx;
      h.id = id;
      const level = h.tagName.toLowerCase();
      const pad = level === 'h1' ? '0' : level === 'h2' ? '12px' : '24px';
      const weight = level === 'h1' ? '700' : 'normal';
      tocHtml += `<li style="padding-left:${pad};font-weight:${weight};" onclick="document.getElementById('${id}').scrollIntoView({behavior:'smooth'})">${h.innerText}</li>`;
    });
    tocHtml += '</ul>';
    tocBox.innerHTML = tocHtml;
  }

  // Reader Mode Switcher ('report' | 'raw' | 'split')
  function setReaderMode(mode) {
    readerMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('btn-mode-' + mode);
    if (activeBtn) activeBtn.classList.add('active');

    const readerBody = document.getElementById('reader-body');
    const paneReport = document.getElementById('pane-report');
    const paneRaw = document.getElementById('pane-raw');

    if (mode === 'report') {
      readerBody.classList.remove('split-mode');
      paneReport.style.display = 'block';
      paneRaw.style.display = 'none';
    } else if (mode === 'raw') {
      readerBody.classList.remove('split-mode');
      paneReport.style.display = 'none';
      paneRaw.style.display = 'block';
    } else if (mode === 'split') {
      readerBody.classList.add('split-mode');
      paneReport.style.display = 'block';
      paneRaw.style.display = 'block';
    }
  }

  // Stage Switcher Controls
  function selectStage(idx) {
    selectedStageIndex = idx;
    closeStageDropdown();
    renderSidebarStages(document.getElementById('sidebar-filter').value);
  }

  function prevStage() {
    if (selectedStageIndex > 0) {
      selectedStageIndex--;
      renderSidebarStages(document.getElementById('sidebar-filter').value);
    }
  }

  function nextStage() {
    if (selectedStageIndex < data.stages.length - 1) {
      selectedStageIndex++;
      renderSidebarStages(document.getElementById('sidebar-filter').value);
    }
  }

  function toggleStageDropdown() {
    const drawer = document.getElementById('stage-dropdown-drawer');
    if (!drawer) return;
    const isHidden = drawer.style.display === 'none' || !drawer.style.display;
    drawer.style.display = isHidden ? 'block' : 'none';
  }

  function closeStageDropdown() {
    const drawer = document.getElementById('stage-dropdown-drawer');
    if (drawer) drawer.style.display = 'none';
  }

  // Filter & Toolbar Controls
  function setSortOrder(order) {
    sortOrder = order;
    renderSidebarStages(document.getElementById('sidebar-filter').value);
  }

  function setTypeFilter(type) {
    currentTypeFilter = type;
    document.querySelectorAll('.pill-btn').forEach(c => {
      if (c.id !== 'filter-unread-btn') c.classList.remove('active');
    });
    event.target.classList.add('active');
    renderSidebarStages(document.getElementById('sidebar-filter').value);
  }

  function toggleUnreadOnly() {
    onlyUnread = !onlyUnread;
    const btn = document.getElementById('filter-unread-btn');
    if (btn) btn.classList.toggle('active', onlyUnread);
    renderSidebarStages(document.getElementById('sidebar-filter').value);
  }

  function clearSidebarFilter() {
    const input = document.getElementById('sidebar-filter');
    if (input) input.value = '';
    const clearBtn = document.getElementById('sidebar-filter-clear');
    if (clearBtn) clearBtn.style.display = 'none';
    renderSidebarStages('');
  }

  function switchSidebarTab(tab) {
    activeSidebarTab = tab;
    closeStageDropdown();
    document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('tab-' + tab);
    if (btn) btn.classList.add('active');
    renderSidebarStages(document.getElementById('sidebar-filter').value);
  }

  function switchRightTab(tab) {
    activeRightTab = tab;
    document.querySelectorAll('.panel-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('ptab-' + tab).classList.add('active');
    document.getElementById('panel-toc-content').style.display = tab === 'toc' ? 'block' : 'none';
    document.getElementById('panel-notes-content').style.display = tab === 'notes' ? 'flex' : 'none';
  }

  function filterSidebarList() {
    const input = document.getElementById('sidebar-filter');
    const val = input ? input.value : '';
    const clearBtn = document.getElementById('sidebar-filter-clear');
    if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
    renderSidebarStages(val);
  }

  // Progress & Notes
  function updateGlobalProgress() {
    const total = data.articles.length;
    const completed = completedSet.size;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    const txt = document.getElementById('top-progress-text');
    const fill = document.getElementById('top-progress-fill');
    const footerBadge = document.getElementById('footer-stats-badge');
    if (txt) txt.innerText = `${completed}/${total} (${pct}%)`;
    if (fill) fill.style.width = pct + '%';
    if (footerBadge) footerBadge.innerText = `全站已学 ${completed}/${total} (${pct}%)`;
  }

  function toggleArticleComplete(id) {
    if (completedSet.has(id)) completedSet.delete(id);
    else completedSet.add(id);
    localStorage.setItem('gf_completed', JSON.stringify([...completedSet]));
    updateGlobalProgress();
    loadArticle(id);
  }

  function toggleCurrentBookmark() {
    if (!currentArticle) return;
    const id = currentArticle.id;
    if (bookmarkSet.has(id)) bookmarkSet.delete(id);
    else bookmarkSet.add(id);
    localStorage.setItem('gf_bookmarks', JSON.stringify([...bookmarkSet]));
    loadArticle(id);
  }

  function saveCurrentNote() {
    if (!currentArticle) return;
    const val = document.getElementById('article-note-editor').value;
    notesMap[currentArticle.id] = val;
    localStorage.setItem('gf_notes', JSON.stringify(notesMap));
    const status = document.getElementById('note-save-status');
    if (status) {
      status.innerText = '已自动保存 ' + new Date().toLocaleTimeString();
      setTimeout(() => { status.innerText = '本地自动保存'; }, 2000);
    }
  }

  function exportNotes() {
    let md = '# 我的出海做网站赚美元 — 学习笔记汇总\n\n导出时间: ' + new Date().toLocaleString() + '\n\n---\n\n';
    Object.keys(notesMap).forEach(id => {
      if (!notesMap[id].trim()) return;
      const art = data.articles.find(a => a.id === id);
      const displayTitle = art ? (art.cleanTitle || art.title) : id;
      md += `## ${displayTitle}\n\n**阶段**：${art ? art.stage : '未知'}\n\n${notesMap[id]}\n\n---\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'My_Outbound_Notes.md';
    a.click();
  }

  // Modals & Search
  function openPacerGuideModal() {
    const modal = document.getElementById('pacer-modal');
    if (modal) modal.classList.add('open');
  }

  function closePacerGuideModal() {
    const modal = document.getElementById('pacer-modal');
    if (modal) modal.classList.remove('open');
  }

  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.add('open');
      const input = document.getElementById('global-search-input');
      if (input) {
        input.focus();
        input.select();
      }
      handleGlobalSearch();
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.remove('open');
  }

  function renderSearchFilters() {
    const container = document.getElementById('search-stage-chips');
    if (!container) return;
    let html = `<span class="stage-chip ${!searchSelectedStage ? 'active' : ''}" onclick="window.app.setSearchStageFilter(null)">全部</span>`;
    data.stages.forEach(s => {
      html += `<span class="stage-chip ${searchSelectedStage === s.key ? 'active' : ''}" onclick="window.app.setSearchStageFilter('${s.key}')">${s.code}</span>`;
    });
    container.innerHTML = html;
  }

  function handleGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const query = input ? input.value.trim().toLowerCase() : '';
    const resultsBox = document.getElementById('search-results-list');
    if (!resultsBox) return;

    let matched = data.articles.filter(a => {
      if (searchSelectedStage && a.stage !== searchSelectedStage) return false;
      if (!query) return true;
      const t = (a.cleanTitle || a.title || a.id).toLowerCase();
      const s = (a.summary || '').toLowerCase();
      return t.includes(query) || s.includes(query) || (a.stage && a.stage.toLowerCase().includes(query)) || a.id.toLowerCase().includes(query);
    });

    let html = '';
    if (!matched.length) {
      html = '<div style="padding:20px;text-align:center;color:var(--text-muted);">未找到匹配的文章或内容</div>';
    } else {
      const sorted = sortArticles(matched);
      sorted.slice(0, 30).forEach(a => {
        const displayTitle = a.cleanTitle || a.title || a.id;
        const mustBadge = a.isMustRead ? `<span class="badge-must-read">🔥 必读</span>` : '';
        html += `
          <div class="search-result-card" onclick="window.app.loadArticle('${a.id}'); window.app.closeSearchModal();">
            <div class="search-result-title">${mustBadge}${displayTitle} <span class="stage-picker-badge" style="font-size:9px;">${a.stage.split('_')[0]}</span></div>
            <div class="search-result-snippet">${a.summary || '点击阅读全文'}</div>
          </div>
        `;
      });
    }
    resultsBox.innerHTML = html;
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('gf_theme', isDark ? 'dark' : 'light');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    const hlTheme = document.getElementById('hljs-theme');
    if (hlTheme) hlTheme.href = isDark ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css' : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css';
    if (window.lucide) lucide.createIcons();
  }

  function initTheme() {
    const saved = localStorage.getItem('gf_theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      const hlTheme = document.getElementById('hljs-theme');
      if (hlTheme) hlTheme.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css';
    }
  }

  function switchView(view) {
    if (view === 'roadmap') {
      window.open('../知识流程/知识流程图.html', '_blank');
    }
  }

  // Export to Global
  window.app = {
    loadArticle,
    setReaderMode,
    selectStage,
    prevStage,
    nextStage,
    toggleStageDropdown,
    closeStageDropdown,
    filterSidebarList,
    switchSidebarTab,
    switchRightTab,
    setSortOrder,
    setTypeFilter,
    toggleUnreadOnly,
    clearSidebarFilter,
    openPacerGuideModal,
    closePacerGuideModal,
    toggleArticleComplete,
    toggleCurrentBookmark,
    toggleCurrentCompleted: () => { if (currentArticle) toggleArticleComplete(currentArticle.id); },
    saveCurrentNote,
    exportNotes,
    toggleDarkMode,
    openSearchModal,
    closeSearchModal,
    setSearchStageFilter: (s) => { searchSelectedStage = s; renderSearchFilters(); handleGlobalSearch(); },
    handleGlobalSearch,
    switchView
  };

  window.openSearchModal = openSearchModal;
  window.closeSearchModal = closeSearchModal;
  window.openPacerGuideModal = openPacerGuideModal;
  window.closePacerGuideModal = closePacerGuideModal;
  window.toggleDarkMode = toggleDarkMode;
  window.switchView = switchView;
  window.switchSidebarTab = switchSidebarTab;
  window.switchRightTab = switchRightTab;
  window.filterSidebarList = filterSidebarList;
  window.setReaderMode = setReaderMode;
  window.toggleCurrentBookmark = window.app.toggleCurrentBookmark;
  window.toggleCurrentCompleted = window.app.toggleCurrentCompleted;
  window.saveCurrentNote = saveCurrentNote;
  window.exportNotes = exportNotes;
  window.handleGlobalSearch = handleGlobalSearch;
})();


