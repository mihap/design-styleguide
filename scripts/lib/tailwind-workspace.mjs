import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export function normalizeSlashes(value) {
  return value.replace(/\\/g, '/');
}

export function positionalArg(args, valueFlags = ['--out', '-o', '--export-dir', '--demo-dir']) {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (valueFlags.includes(arg)) {
      index += 1;
      continue;
    }
    if (!arg.startsWith('-')) return arg;
  }
  return undefined;
}

export function readArg(args, flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] || null;
}

export function defaultArtifactDir(kind) {
  return path.resolve(process.cwd(), 'tmp', 'pif', kind);
}

export function assertSafeArtifactDir(directory) {
  const resolved = path.resolve(directory);
  const parsed = path.parse(resolved);
  if (resolved === parsed.root) throw new Error(`Refusing to empty filesystem root: ${resolved}`);
  if (resolved === path.resolve(process.cwd())) throw new Error(`Refusing to empty current working directory: ${resolved}`);
}

export function emptyArtifactDir(directory) {
  assertSafeArtifactDir(directory);
  fs.rmSync(directory, { recursive: true, force: true });
  fs.mkdirSync(directory, { recursive: true });
}

function splitRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function tables(markdown) {
  const lines = markdown.split('\n');
  const found = [];
  for (let i = 0; i < lines.length - 1; i += 1) {
    if (!lines[i].trim().startsWith('|')) continue;
    if (!/^\|[\s:-]+\|/.test(lines[i + 1].trim())) continue;
    const header = splitRow(lines[i]);
    const rows = [];
    let j = i + 2;
    for (; j < lines.length; j += 1) {
      if (!lines[j].trim().startsWith('|')) break;
      const cells = splitRow(lines[j]);
      const row = {};
      header.forEach((name, index) => {
        row[name] = cells[index] || '';
      });
      rows.push(row);
    }
    found.push({ header, rows });
    i = j;
  }
  return found;
}

function tableWith(markdown, ...headers) {
  return tables(markdown).find((table) => headers.every((header) => table.header.includes(header)));
}

function normalizeVariable(variable) {
  return variable.replace(/`/g, '').trim();
}

function tailwindColorName(variable) {
  const clean = normalizeVariable(variable).replace(/^--/, '');
  const colorIndex = clean.indexOf('color-');
  if (colorIndex !== -1) return clean.slice(colorIndex + 'color-'.length);
  return clean;
}

function key(value) {
  return value.toLowerCase().replace(/\([^)]*\)/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function firstFont(markdown, fallback) {
  const match = markdown.match(/font-family:\s*([^;]+);/);
  return match ? match[1].replaceAll('"', '').trim() : fallback;
}

function validValue(value) {
  return value && !String(value).includes('[') && value !== '—';
}

function readGuideFile(guideRoot, name) {
  return fs.readFileSync(path.join(guideRoot, name), 'utf8');
}

export function extractTailwindTokens(guideRoot) {
  const colorMd = readGuideFile(guideRoot, '02-color-system.md');
  const colors = {};
  const aliases = {};
  for (const table of tables(colorMd)) {
    if (!table.header.includes('Value') || !table.header.includes('CSS Variable')) continue;
    for (const row of table.rows) {
      if (!validValue(row.Value) || !validValue(row['CSS Variable'])) continue;
      const variable = normalizeVariable(row['CSS Variable']);
      if (!variable.startsWith('--')) continue;
      const name = tailwindColorName(variable);
      colors[name] = row.Value;
      aliases[variable] = `var(--color-${name})`;
    }
  }

  const typeMd = readGuideFile(guideRoot, '03-typography.md');
  const typeScaleTable = tableWith(typeMd, 'Name', 'Size', 'Weight', 'Line Height');
  const typography = {
    'font-sans': firstFont(typeMd, 'ui-sans-serif, system-ui, sans-serif'),
    'font-mono': (() => {
      const matches = [...typeMd.matchAll(/font-family:\s*([^;]+);/g)];
      return matches[1] ? matches[1][1].replaceAll('"', '').trim() : 'ui-monospace, monospace';
    })()
  };
  const fontWeights = {};
  const lineHeights = {};
  const lineHeightCategories = {};
  const letterSpacing = {};
  if (typeScaleTable) {
    for (const row of typeScaleTable.rows) {
      if (!validValue(row.Size)) continue;
      const name = key(row.Name);
      typography[name] = row.Size;
      if (validValue(row['Line Height'])) lineHeights[name] = row['Line Height'];
    }
  }
  const fontWeightTable = tableWith(typeMd, 'Weight', 'Name', 'CSS');
  if (fontWeightTable) {
    for (const row of fontWeightTable.rows) {
      if (validValue(row.Weight) && validValue(row.Name)) fontWeights[key(row.Name)] = row.Weight;
    }
  }
  const lineHeightTable = tableWith(typeMd, 'Category', 'Line Height', 'Tailwind');
  if (lineHeightTable) {
    for (const row of lineHeightTable.rows) {
      if (validValue(row.Category) && validValue(row['Line Height'])) lineHeightCategories[key(row.Category)] = row['Line Height'];
    }
  }
  const letterSpacingTable = tableWith(typeMd, 'Category', 'Value', 'Tailwind');
  if (letterSpacingTable) {
    for (const row of letterSpacingTable.rows) {
      if (validValue(row.Category) && validValue(row.Value)) letterSpacing[key(row.Category)] = row.Value;
    }
  }

  const spacingMd = readGuideFile(guideRoot, '04-spacing-system.md');
  const spacingTable = tableWith(spacingMd, 'Token', 'Value', 'Tailwind');
  const spacing = {};
  if (spacingTable) {
    for (const row of spacingTable.rows) {
      if (validValue(row.Token) && validValue(row.Value)) spacing[row.Token] = row.Value;
    }
  }

  const radiusMd = readGuideFile(guideRoot, '05-border-radius.md');
  const radiusTable = tableWith(radiusMd, 'Token', 'Value', 'Tailwind');
  const radius = {};
  const radiusAliases = {};
  if (radiusTable) {
    for (const row of radiusTable.rows) {
      if (!validValue(row.Token) || !validValue(row.Value)) continue;
      radius[key(row.Token)] = row.Value;
      const variable = normalizeVariable(row['CSS Variable'] || '');
      if (variable.startsWith('--')) radiusAliases[variable] = `var(--radius-${key(row.Token)})`;
    }
  }

  const shadowMd = readGuideFile(guideRoot, '06-shadows-elevation.md');
  const shadowTable = tableWith(shadowMd, 'Level', 'Tailwind', 'CSS Value');
  const shadows = {};
  if (shadowTable) {
    for (const row of shadowTable.rows) {
      const name = key(row.Level);
      if (name === 'none' || !validValue(row['CSS Value']) || row['CSS Value'] === 'none') continue;
      shadows[name] = row['CSS Value'];
    }
  }

  const buttonMd = readGuideFile(guideRoot, '09-buttons.md');
  const iconTable = tableWith(buttonMd, 'Size', 'Icon Size', 'Usage');
  const buttonIconSizes = {};
  if (iconTable) {
    for (const row of iconTable.rows) {
      if (validValue(row.Size) && validValue(row['Icon Size'])) buttonIconSizes[key(row.Size)] = row['Icon Size'];
    }
  }

  return {
    aliases,
    radiusAliases,
    tokens: {
      name: path.basename(guideRoot),
      version: '0.1',
      colors,
      typography,
      fontWeights,
      lineHeights,
      lineHeightCategories,
      letterSpacing,
      spacing,
      radius,
      shadows,
      buttonIconSizes
    }
  };
}

export function themeCssFromTokens({ tokens, aliases, radiusAliases }) {
  const themeLines = ['@theme static {'];
  themeLines.push(`  --font-sans: ${tokens.typography['font-sans']};`);
  themeLines.push(`  --font-mono: ${tokens.typography['font-mono']};`);
  themeLines.push(`  --spacing: ${tokens.spacing['1'] || '0.25rem'};`);
  for (const [name, value] of Object.entries(tokens.colors)) themeLines.push(`  --color-${name}: ${value};`);
  for (const [name, value] of Object.entries(tokens.typography)) {
    if (name.startsWith('font-')) continue;
    themeLines.push(`  --text-${name}: ${value};`);
    if (tokens.lineHeights[name]) themeLines.push(`  --text-${name}--line-height: ${tokens.lineHeights[name]};`);
  }
  for (const [name, value] of Object.entries(tokens.fontWeights)) themeLines.push(`  --font-weight-${name}: ${value};`);
  for (const [name, value] of Object.entries(tokens.lineHeightCategories)) themeLines.push(`  --leading-${name}: ${value};`);
  for (const [name, value] of Object.entries(tokens.letterSpacing)) themeLines.push(`  --tracking-${name}: ${value};`);
  for (const [name, value] of Object.entries(tokens.radius)) themeLines.push(`  --radius-${name}: ${value};`);
  for (const [name, value] of Object.entries(tokens.shadows)) themeLines.push(`  --shadow-${name}: ${value};`);
  themeLines.push('}', '', ':root {');
  for (const [variable, value] of Object.entries(aliases)) themeLines.push(`  ${variable}: ${value};`);
  for (const [variable, value] of Object.entries(radiusAliases)) themeLines.push(`  ${variable}: ${value};`);
  for (const [name, value] of Object.entries(tokens.spacing)) themeLines.push(`  --mp-space-${name.replace('.', '-')}: ${value};`);
  for (const [name, value] of Object.entries(tokens.buttonIconSizes)) themeLines.push(`  --mp-button-icon-${name}: ${value};`);
  themeLines.push('}', '');
  for (const name of Object.keys(tokens.buttonIconSizes)) {
    themeLines.push(`@utility mp-icon-${name} {`);
    themeLines.push(`  width: var(--mp-button-icon-${name});`);
    themeLines.push(`  height: var(--mp-button-icon-${name});`);
    themeLines.push('}', '');
  }
  return themeLines.join('\n');
}

export function fixtureHtml() {
  return `<!doctype html>\n<html lang="en">\n<head><title>Tailwind Export Fixture</title></head>\n<body class="bg-base-100 text-base-content font-sans antialiased">\n  <main class="mx-auto max-w-7xl space-y-8 p-6">\n    <section class="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xs">\n      <h1 class="text-4xl font-semibold tracking-tight text-base-content">Tailwind export fixture</h1>\n      <p class="mt-3 text-base leading-relaxed text-base-content/70">Generated utility coverage for tokens and states.</p>\n      <div class="mt-6 flex flex-wrap gap-3">\n        <button class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-content shadow-xs hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100">Primary</button>\n        <button class="rounded-md border border-secondary bg-base-100 px-4 py-2 text-sm font-semibold text-secondary hover:bg-base-200">Secondary</button>\n        <button class="rounded-md bg-error px-4 py-2 text-sm font-semibold text-error-content">Destructive</button>\n      </div>\n      <div class="mt-4 flex items-center gap-3">\n        <span class="mp-icon-xs rounded-full bg-primary"></span>\n        <span class="mp-icon-sm rounded-full bg-secondary"></span>\n        <span class="mp-icon-md rounded-full bg-accent"></span>\n        <span class="mp-icon-lg rounded-full bg-success"></span>\n      </div>\n      <div class="mt-4 space-y-1">\n        <p class="font-regular leading-tight tracking-tighter text-sm">Regular tight tracking sample.</p>\n        <p class="font-medium tracking-normal text-small">Medium small-token sample.</p>\n        <p class="font-semibold tracking-wider text-tiny">Semibold tiny-token sample.</p>\n      </div>\n    </section>\n    <section class="grid gap-4 md:grid-cols-4">\n      <div class="rounded-lg bg-info p-4 text-info-content">Info</div>\n      <div class="rounded-lg bg-success p-4 text-success-content">Success</div>\n      <div class="rounded-lg bg-warning p-4 text-warning-content">Warning</div>\n      <div class="rounded-lg bg-error p-4 text-error-content">Error</div>\n    </section>\n  </main>\n</body>\n</html>\n`;
}

function sourceDirective(srcDir, sourceFile) {
  let relative = normalizeSlashes(path.relative(srcDir, sourceFile));
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return `@source "${relative}";`;
}

export function writeTailwindWorkspace({
  guideRoot,
  outputRoot,
  cssFile = 'design-guide.css',
  packageName,
  title = 'Tailwind Export',
  description = 'Generated design guide Tailwind workspace.',
  extraSourceFiles = [],
  clean = true
}) {
  if (clean) emptyArtifactDir(outputRoot);
  const src = path.join(outputRoot, 'src');
  const dist = path.join(outputRoot, 'dist');
  fs.mkdirSync(src, { recursive: true });
  fs.mkdirSync(dist, { recursive: true });

  const extracted = extractTailwindTokens(guideRoot);
  const packageJson = {
    name: packageName || `${path.basename(guideRoot)}-tailwind-export`,
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {
      build: `tailwindcss -i ./src/input.css -o ./dist/${cssFile} --minify`,
      'build:dev': `tailwindcss -i ./src/input.css -o ./dist/${cssFile}`
    },
    devDependencies: {
      '@tailwindcss/cli': 'latest',
      tailwindcss: 'latest'
    }
  };
  fs.writeFileSync(path.join(outputRoot, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(path.join(src, 'theme.css'), themeCssFromTokens(extracted));
  fs.writeFileSync(path.join(src, 'tokens.json'), `${JSON.stringify(extracted.tokens, null, 2)}\n`);
  fs.writeFileSync(path.join(src, 'fixture.html'), fixtureHtml());

  const sourceFiles = [path.join(src, 'fixture.html'), ...extraSourceFiles];
  const inputLines = [
    '@import "tailwindcss";',
    ...sourceFiles.map((sourceFile) => sourceDirective(src, sourceFile)),
    '@import "./theme.css";',
    ''
  ];
  fs.writeFileSync(path.join(src, 'input.css'), inputLines.join('\n'));

  fs.writeFileSync(path.join(outputRoot, 'README.md'), `# ${title}\n\n${description}\n\n## Build\n\n\`\`\`bash\nnpm install\nnpm run build\n\`\`\`\n\n## Integrate\n\nImport \`src/theme.css\` after Tailwind is loaded, copy the \`@theme\` block into your app-level Tailwind CSS entry, or copy the files in this directory into your project-specific integration path.\n\n\`\`\`css\n@import "tailwindcss";\n@import "./path/to/generated/theme.css";\n\`\`\`\n\nThis workspace targets latest stable Tailwind only and does not include component-framework integration.\n`);

  return { outputRoot, cssFile, tokens: extracted.tokens };
}

export function buildTailwindWorkspace(outputRoot) {
  const install = spawnSync('npm', ['install'], { cwd: outputRoot, encoding: 'utf8', stdio: 'inherit' });
  if (install.status !== 0) return install.status || 1;
  const result = spawnSync('npm', ['run', 'build'], { cwd: outputRoot, encoding: 'utf8', stdio: 'inherit' });
  return result.status || 0;
}

export function relativeDisplay(filePath) {
  const relative = path.relative(process.cwd(), filePath) || '.';
  return normalizeSlashes(relative.startsWith('..') ? filePath : relative);
}
