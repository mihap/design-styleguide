#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const guideRoot = path.resolve(process.argv[2] || process.cwd());
const here = path.dirname(new URL(import.meta.url).pathname);
const demoRoot = path.join(guideRoot, 'demo');
const data = JSON.parse(fs.readFileSync(path.join(demoRoot, 'demo-data.json'), 'utf8'));

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function attrs(classes) {
  return esc(classes || '');
}

function renderBody(example) {
  const props = example.props || {};
  switch (example.type) {
    case 'color':
      return `<div class="grid gap-3 sm:grid-cols-2">${(props.swatches || []).map((item) => `<div class="overflow-hidden rounded-lg border border-base-300"><div class="h-16 ${attrs(item.class)}"></div><div class="bg-base-100 p-3"><p class="text-sm font-semibold">${esc(item.name)}</p><p class="text-xs text-base-content/60">${esc(item.token)}</p></div></div>`).join('')}</div>`;
    case 'typography':
      return `<div class="space-y-4">${(props.samples || []).map((item) => `<div><p class="mb-1 text-xs font-medium uppercase tracking-wide text-base-content/50">${esc(item.label)}</p><p class="${attrs(item.class)}">${esc(item.text)}</p></div>`).join('')}</div>`;
    case 'spacing':
      return `<div class="space-y-3">${(props.items || []).map((item) => `<div class="flex items-center gap-3"><div class="${attrs(item.class)} rounded bg-primary"></div><div><p class="text-sm font-medium">${esc(item.name)}</p><p class="text-xs text-base-content/60">${esc(item.value)}</p></div></div>`).join('')}</div>`;
    case 'surface':
      return `<div class="grid gap-3">${(props.cards || []).map((item) => `<div class="${attrs(item.class)}"><p class="text-sm font-semibold">${esc(item.title)}</p><p class="mt-1 text-sm text-base-content/65">${esc(item.text)}</p></div>`).join('')}</div>`;
    case 'state':
      return `<div class="flex flex-wrap gap-3">${(props.states || []).map((item) => `<button class="${attrs(item.class)}">${esc(item.label)}</button>`).join('')}</div>`;
    case 'form':
      return `<form class="space-y-4"><label class="block"><span class="text-xs font-medium text-base-content">Mailbox</span><input class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" value="support@company.com"></label><label class="flex items-center justify-between rounded-lg border border-base-300 bg-base-100 p-3"><span><span class="block text-sm font-medium">Auto-route urgent mail</span><span class="text-xs text-base-content/60">Send SLA risk messages to review.</span></span><span class="h-6 w-10 rounded-full bg-primary p-1"><span class="block h-4 w-4 translate-x-4 rounded-full bg-primary-content"></span></span></label></form>`;
    case 'button':
      return `<div class="flex flex-wrap gap-3">${(props.buttons || []).map((item) => `<button class="${attrs(item.class)}">${esc(item.label)}</button>`).join('')}</div>`;
    case 'navigation':
      return `<nav class="space-y-1" aria-label="Example navigation">${(props.items || []).map((item) => `<a class="${attrs(item.class)}" href="#${esc(item.href || 'navigation')}">${esc(item.label)}<span class="ml-auto rounded-full bg-base-200 px-2 py-0.5 text-xs">${esc(item.count || '')}</span></a>`).join('')}</nav>`;
    case 'table':
      return `<div class="overflow-hidden rounded-lg border border-base-300"><table class="w-full text-left text-sm"><thead class="bg-base-200 text-xs uppercase tracking-wider text-base-content/60"><tr><th class="px-3 py-2">Sender</th><th class="px-3 py-2">Status</th><th class="px-3 py-2 text-right">SLA</th></tr></thead><tbody class="divide-y divide-base-300 bg-base-100">${(props.rows || []).map((row) => `<tr><td class="px-3 py-3 font-medium">${esc(row.sender)}</td><td class="px-3 py-3"><span class="rounded-full ${attrs(row.badgeClass)} px-2 py-1 text-xs font-medium">${esc(row.status)}</span></td><td class="px-3 py-3 text-right text-base-content/70">${esc(row.sla)}</td></tr>`).join('')}</tbody></table></div>`;
    case 'feedback':
      return `<div class="space-y-3">${(props.alerts || []).map((item) => `<div class="${attrs(item.class)}"><p class="text-sm font-semibold">${esc(item.title)}</p><p class="mt-1 text-sm">${esc(item.text)}</p></div>`).join('')}</div>`;
    default:
      return '<p class="text-sm text-base-content/60">No renderer configured.</p>';
  }
}

const sidebarItems = data.sections.map((section) => `<a class="flex rounded-lg px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content" href="#${esc(section.id)}">${esc(section.title)}</a>`).join('\n        ');
const sections = data.sections.map((section) => {
  const examples = section.examples.map((example) => `<article class="rounded-xl border border-base-300 bg-base-100 p-4" data-example-type="${esc(example.type)}"><div class="mb-4"><h3 class="text-base font-semibold">${esc(example.title)}</h3><p class="mt-1 text-sm leading-6 text-base-content/65">${esc(example.description)}</p></div><div class="rounded-lg border border-base-300 bg-base-200/50 p-4">${renderBody(example)}</div></article>`).join('\n    ');
  return `<section id="${esc(section.id)}" class="scroll-mt-8 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xs" data-source-chapter="${esc(section.sourceChapter)}"><div class="mb-6 flex flex-col gap-2 border-b border-base-300 pb-4 md:flex-row md:items-end md:justify-between"><div><p class="text-xs font-semibold uppercase tracking-wider text-base-content/55">${esc(section.sourceChapter)}</p><h2 class="text-2xl font-semibold tracking-tight">${esc(section.title)}</h2></div><p class="max-w-2xl text-sm leading-6 text-base-content/65">${esc(section.description)}</p></div><div class="grid gap-4 lg:grid-cols-2">${examples}</div></section>`;
}).join('\n        ');

const shell = fs.readFileSync(path.join(here, 'index.html'), 'utf8')
  .replaceAll('{{guideName}}', esc(data.guideName))
  .replaceAll('{{version}}', esc(data.version))
  .replaceAll('{{description}}', esc(data.description))
  .replaceAll('{{sidebarItems}}', sidebarItems)
  .replaceAll('{{sections}}', sections);

fs.writeFileSync(path.join(demoRoot, 'index.html'), shell);
console.log(`Wrote ${path.join(demoRoot, 'index.html')}`);
