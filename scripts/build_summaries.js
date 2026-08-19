const fs = require('fs');
const path = require('path');

const analysisFile = path.join('output', 'analysis', 'articles_analysis.jsonl');
const articles = fs.readFileSync(analysisFile, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));

console.log('Generating output/学习资料汇总.md and output/避坑经验汇总.md...');

require('./generate_learning_summary.js')(articles);
require('./generate_pitfalls_summary.js')(articles);

console.log('Stage 6 generation complete!');
