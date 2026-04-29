#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const guideRoot = path.resolve(args.find((arg) => !arg.startsWith('-')) || '');

function usage() {
  console.log(`Usage: node scripts/prepare-review.mjs <guide-dir>\n\nWrites <guide-dir>/review/review-packet.md for an independent reviewer.`);
}

if (!guideRoot || args.includes('--help') || args.includes('-h')) {
  usage();
  process.exit(guideRoot ? 0 : 1);
}
if (!fs.existsSync(guideRoot)) {
  console.error(`Guide directory does not exist: ${guideRoot}`);
  process.exit(1);
}

const reviewDir = path.join(guideRoot, 'review');
fs.mkdirSync(reviewDir, { recursive: true });
const prompt = fs.readFileSync(path.join(repoRoot, 'templates', 'review', 'guide-review-prompt.md'), 'utf8').replaceAll('{guide-dir}', path.relative(repoRoot, guideRoot));
const files = fs.readdirSync(guideRoot)
  .filter((file) => /^\d{2}-.*\.md$/.test(file) || file === 'manifest.json')
  .sort();
const visualChecklistPath = path.join(repoRoot, 'templates', 'review', 'demo-visual-review.md');
const visualChecklist = fs.existsSync(visualChecklistPath) ? fs.readFileSync(visualChecklistPath, 'utf8').trimEnd() : '';
const guideRelative = path.relative(repoRoot, guideRoot) || '.';
function shellQuote(value) {
  if (value === '') return "''";
  return `'${value.replaceAll("'", "'\\''")}'`;
}
const packet = `${prompt}\n\n---\n\n## Files to Review\n\n${files.map((file) => `- ${path.join(guideRelative, file)}`).join('\n')}\n\n## Recommended Commands\n\n\`\`\`bash\nnode ${shellQuote('templates/validators/validate-all.mjs')} ${shellQuote(guideRelative)} --no-write\nnode ${shellQuote(path.join(guideRelative, 'scripts/validate-all.mjs'))} ${shellQuote(guideRelative)} --no-write\n\`\`\`\n\n---\n\n${visualChecklist}\n`;
fs.writeFileSync(path.join(reviewDir, 'review-packet.md'), packet);
console.log(`Wrote ${path.join(reviewDir, 'review-packet.md')}`);
