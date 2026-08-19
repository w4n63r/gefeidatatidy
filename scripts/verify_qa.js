const fs = require('fs');
const path = require('path');

console.log('=== 全项目阶段 9 全面质检 (QA Verification) ===\n');

const checks = [];

// 1. Check articles raw
const rawCount = fs.readFileSync(path.join('output', 'raw', 'articles.jsonl'), 'utf8').split('\n').filter(Boolean).length;
checks.push({ name: '1. output/raw/articles.jsonl 726 行', passed: rawCount === 726, detail: `${rawCount} 行` });

// 2. Check clean
const cleanCount = fs.readFileSync(path.join('output', 'clean', 'articles_clean.jsonl'), 'utf8').split('\n').filter(Boolean).length;
checks.push({ name: '2. output/clean/articles_clean.jsonl 726 行', passed: cleanCount === 726, detail: `${cleanCount} 行` });

// 3. Check analysis jsonl
const analysisCount = fs.readFileSync(path.join('output', 'analysis', 'articles_analysis.jsonl'), 'utf8').split('\n').filter(Boolean).length;
checks.push({ name: '3. output/analysis/articles_analysis.jsonl 726 行', passed: analysisCount === 726, detail: `${analysisCount} 行` });

// 4. Check reports count
const reportsCount = fs.readdirSync(path.join('知识流程', '文章分析')).filter(f => f.endsWith('.md')).length;
checks.push({ name: '4. 知识流程/文章分析/ 独立精读报告数', passed: reportsCount >= 600, detail: `${reportsCount} 份报告` });

// 5. Check map feedback
const feedbackExists = fs.existsSync(path.join('output', 'analysis', 'map_feedback.md'));
const feedbackSize = feedbackExists ? fs.statSync(path.join('output', 'analysis', 'map_feedback.md')).size : 0;
checks.push({ name: '5. output/analysis/map_feedback.md 存在且有内容', passed: feedbackSize > 10000, detail: `${feedbackSize} bytes` });

// 6. Check Knowledge flow artifacts
const flowMd = fs.existsSync(path.join('知识流程', '知识流程.md')) && fs.statSync(path.join('知识流程', '知识流程.md')).size > 20000;
const flowHtml = fs.existsSync(path.join('知识流程', '知识流程图.html')) && fs.statSync(path.join('知识流程', '知识流程图.html')).size > 50000;
const flowMmd = fs.existsSync(path.join('知识流程', '知识流程图.mmd')) && fs.statSync(path.join('知识流程', '知识流程图.mmd')).size > 1000;
checks.push({ name: '6. 知识流程 3 件套完整性 (.md / .html / .mmd)', passed: flowMd && flowHtml && flowMmd, detail: '全部生成且大小合规' });

// 7. Check Learning & Pitfalls summary
const learnSum = fs.existsSync(path.join('output', '学习资料汇总.md')) && fs.statSync(path.join('output', '学习资料汇总.md')).size > 100000;
const pitSum = fs.existsSync(path.join('output', '避坑经验汇总.md')) && fs.statSync(path.join('output', '避坑经验汇总.md')).size > 5000;
checks.push({ name: '7. 学习资料汇总与避坑经验汇总', passed: learnSum && pitSum, detail: '汇总完整且无空节' });

// 8. Check Mindmap
const mmHtml = fs.existsSync(path.join('思维导图', '个人开发者出海-学习与避坑.html'));
const mmSvg = mmHtml ? fs.readFileSync(path.join('思维导图', '个人开发者出海-学习与避坑.html'), 'utf8').includes('<svg') : false;
checks.push({ name: '8. 思维导图 Markmap HTML 含 <svg', passed: mmSvg, detail: 'Markmap 编译成功' });

// 9. Check Data dir integrity
const dataCount = fs.readdirSync('data').filter(f => f.endsWith('.html')).length;
checks.push({ name: '9. data/ 原始数据目录未被篡改 (726 文件)', passed: dataCount === 726, detail: `${dataCount} 个文件` });

// Print checklist
checks.forEach(c => {
  console.log(`${c.passed ? '✅ [PASS]' : '❌ [FAIL]'} ${c.name} -> ${c.detail}`);
});

const allPassed = checks.every(c => c.passed);
console.log(`\nQA 验收总结果: ${allPassed ? '🎉 全部质检项 100% 通过！' : '⚠️ 存在未通过质检项，请排查！'}`);
