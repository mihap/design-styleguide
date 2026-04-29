#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const guideRoot = path.resolve(process.argv[2] || process.cwd());
const here = path.dirname(fileURLToPath(import.meta.url));
const noWrite = process.argv.includes('--no-write') || process.argv.includes('--read-only');
const validators = [
  'validate-guide.mjs',
  'validate-tailwind-export.mjs',
  'validate-demo.mjs'
];
const failures = [];
const results = [];

function updateManifest(status) {
  const manifestPath = path.join(guideRoot, 'manifest.json');
  if (!fs.existsSync(manifestPath)) return;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.validation = {
    ...(manifest.validation || {}),
    status,
    commands: {
      guide: `node ${path.relative(process.cwd(), path.join(here, 'validate-guide.mjs'))} ${path.relative(process.cwd(), guideRoot) || '.'}`,
      tailwind: `node ${path.relative(process.cwd(), path.join(here, 'validate-tailwind-export.mjs'))} ${path.relative(process.cwd(), guideRoot) || '.'}`,
      demo: `node ${path.relative(process.cwd(), path.join(here, 'validate-demo.mjs'))} ${path.relative(process.cwd(), guideRoot) || '.'}`,
      all: `node ${path.relative(process.cwd(), path.join(here, 'validate-all.mjs'))} ${path.relative(process.cwd(), guideRoot) || '.'}`
    },
    results
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

for (const validator of validators) {
  const validatorArgs = [path.join(here, validator), guideRoot];
  if (noWrite) validatorArgs.push('--no-write');
  const result = spawnSync(process.execPath, validatorArgs, {
    encoding: 'utf8',
    stdio: 'pipe'
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  const passed = result.status === 0;
  results.push({ validator, status: passed ? 'passed' : 'failed' });
  if (!passed) failures.push(validator);
}

if (failures.length) {
  if (!noWrite) updateManifest('failed');
  console.error(`Validation failed: ${failures.join(', ')}`);
  process.exit(1);
}

if (!noWrite) updateManifest('passed');
console.log(`All validations passed for ${guideRoot}`);
