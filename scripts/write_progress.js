const fs = require('fs');
const path = require('path');
const analysisFile = path.join('output','analysis','articles_analysis.jsonl');
const entries = fs.readFileSync(analysisFile,'utf8').split('\n').filter(Boolean).map(l=>JSON.parse(l));
const reports = fs.existsSync(path.join('知识流程','文章分析')) ? fs.readdirSync(path.join('知识流程','文章分析')).filter(f=>f.endsWith('.md')).length : 0;
const stageCount = {};
for (const e of entries) stageCount[e.stage] = (stageCount[e.stage]||0)+1;
const progress = {
  updated: '2026-08-17',
  manual: '02-执行手册-给Codex按步骤执行.md (v5)',
  status: {
    stage0_env: 'done', stage1_parse: 'done', stage2_clean: 'done', stage3_global_map: 'done',
    stage4_per_article: 'in_progress', stage5_flow: 'pending', stage6_summary: 'pending',
    stage7_mindmap: 'pending', stage8_learning_hub: 'optional', stage9_qa: 'pending'
  },
  counts: {
    total_articles: 726, parsed_ok: 707, image_only: 13, unparseable: 6,
    analyzed: entries.length, remaining: 726 - entries.length,
    reports_written: reports, stage_only_entries: entries.filter(e=>!e.report).length
  },
  stageDistribution: stageCount,
  resume: {
    how: '新会话按 02 v5 从 阶段4 续跑：读 output/clean/articles_clean.jsonl，跳过 output/analysis/articles_analysis.jsonl 中已存在的 id，分批精读剩余文章',
    helperScript: 'scripts/batch_reader.js（打印未处理文章，参数：start count）',
    progressFile: 'output/progress_analysis.json',
    mapFeedback: 'output/analysis/map_feedback.md'
  }
};
fs.writeFileSync(path.join('output','progress_analysis.json'), JSON.stringify(progress, null, 2), { encoding: 'utf8' });
console.log(JSON.stringify({ analyzed: progress.counts.analyzed, remaining: progress.counts.remaining, reports: reports, stageOnly: progress.counts.stage_only_entries, byStage: stageCount }, null, 2));
