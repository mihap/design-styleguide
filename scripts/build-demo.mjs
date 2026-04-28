#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const guideRoot = path.resolve(args.find((arg) => !arg.startsWith('-')) || '');
const scaffold = args.includes('--scaffold-data');

function usage() {
  console.log(`Usage: node scripts/build-demo.mjs <guide-dir> [--scaffold-data]\n\nCopies the reusable demo schema and renders demo/index.html from demo/demo-data.json.`);
}

if (!guideRoot || args.includes('--help') || args.includes('-h')) {
  usage();
  process.exit(guideRoot ? 0 : 1);
}
if (!fs.existsSync(guideRoot)) {
  console.error(`Guide directory does not exist: ${guideRoot}`);
  process.exit(1);
}

const demoRoot = path.join(guideRoot, 'demo');
fs.mkdirSync(demoRoot, { recursive: true });
fs.copyFileSync(path.join(repoRoot, 'templates', 'demo', 'demo.schema.json'), path.join(demoRoot, 'demo.schema.json'));

const dataPath = path.join(demoRoot, 'demo-data.json');
if (!fs.existsSync(dataPath) || scaffold) {
  const guideName = fs.readFileSync(path.join(guideRoot, '00-cover.md'), 'utf8').split('\n')[0].replace(/^#\s*/, '').trim();
  const sections = fs.readdirSync(guideRoot)
    .filter((name) => /^\d{2}-.*\.md$/.test(name) && !name.startsWith('00-'))
    .sort()
    .map((name) => {
      const title = fs.readFileSync(path.join(guideRoot, name), 'utf8').split('\n')[0].replace(/^#\s*\d+\.\s*/, '').trim();
      const id = title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return {
        id,
        title,
        sourceChapter: name,
        description: `Demonstrates ${title.toLowerCase()} decisions from ${name}.`,
        examples: [
          {
            id: `${id}-example`,
            title: `${title} example`,
            description: `Structured demo example for ${title.toLowerCase()}.`,
            type: name.startsWith('02-') ? 'color' : name.startsWith('03-') ? 'typography' : name.startsWith('04-') ? 'spacing' : name.startsWith('05-') || name.startsWith('06-') ? 'surface' : name.startsWith('07-') ? 'state' : name.startsWith('08-') ? 'form' : name.startsWith('09-') ? 'button' : name.startsWith('10-') ? 'navigation' : name.startsWith('11-') ? 'table' : 'feedback',
            tokens: [],
            props: {}
          }
        ]
      };
    });
  const data = {
    guideName,
    version: 'Version 0.1',
    description: 'Generated deterministic design guide demo.',
    tailwindExport: '../tailwind/dist/design-guide.css',
    sections
  };
  fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
}

const result = spawnSync(process.execPath, [path.join(repoRoot, 'templates', 'demo', 'build-demo.mjs'), guideRoot], {
  encoding: 'utf8',
  stdio: 'inherit'
});
if (result.status !== 0) process.exit(result.status || 1);

const manifestPath = path.join(guideRoot, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.demo = {
    schema: 'demo/demo.schema.json',
    data: 'demo/demo-data.json',
    html: 'demo/index.html',
    sourceTemplate: 'templates/demo/index.html'
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
