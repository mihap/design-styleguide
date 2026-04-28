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

function actionElement(item) {
  if (item.element === 'a') return `<a href="#${esc(item.href || 'states')}" class="${attrs(item.class)}">${esc(item.label)}</a>`;
  if (item.element === 'input') return `<input aria-label="${esc(item.label)}" class="${attrs(item.class)}" placeholder="${esc(item.placeholder || item.label)}" value="${esc(item.value || '')}">`;
  const disabled = item.disabled ? ' disabled' : '';
  return `<button class="${attrs(item.class)}"${disabled}>${esc(item.label)}</button>`;
}

function renderBody(example) {
  const props = example.props || {};
  switch (example.type) {
    case 'color': {
      const swatches = props.swatches?.length ? `<div class="grid gap-3 sm:grid-cols-2">${props.swatches.map((item) => `<div class="overflow-hidden rounded-lg border border-base-300"><div class="h-16 ${attrs(item.class)}"></div><div class="bg-base-100 p-3"><p class="text-sm font-semibold">${esc(item.name)}</p><p class="text-xs text-base-content/60">${esc(item.token)}</p></div></div>`).join('')}</div>` : '';
      const usage = props.usageRows?.length ? `<div class="overflow-hidden rounded-lg border border-base-300"><table class="w-full text-left text-sm"><thead class="bg-base-200 text-xs uppercase tracking-wider text-base-content/60"><tr><th class="px-3 py-2">Use</th><th class="px-3 py-2">Example</th><th class="px-3 py-2">Rule</th></tr></thead><tbody class="divide-y divide-base-300 bg-base-100">${props.usageRows.map((item) => `<tr><td class="px-3 py-3 font-medium">${esc(item.name)}</td><td class="px-3 py-3"><span class="${attrs(item.class)}">${esc(item.text)}</span></td><td class="px-3 py-3 text-base-content/65">${esc(item.rule)}</td></tr>`).join('')}</tbody></table></div>` : '';
      return `<div class="space-y-4">${swatches}${usage}</div>`;
    }
    case 'typography': {
      const fontStacks = props.fontStacks?.length ? `<div class="grid gap-3 sm:grid-cols-2">${props.fontStacks.map((item) => `<div class="rounded-lg border border-base-300 bg-base-100 p-4"><p class="text-xs font-medium uppercase tracking-wide text-base-content/50">${esc(item.label)}</p><p class="mt-2 ${attrs(item.class)}">${esc(item.text)}</p><p class="mt-2 text-xs text-base-content/60">${esc(item.rule)}</p></div>`).join('')}</div>` : '';
      const samples = props.samples?.length ? `<div class="space-y-4">${props.samples.map((item) => `<div><p class="mb-1 text-xs font-medium uppercase tracking-wide text-base-content/50">${esc(item.label)}</p><p class="${attrs(item.class)}">${esc(item.text)}</p><p class="mt-1 text-xs text-base-content/60">${esc(item.rule || '')}</p></div>`).join('')}</div>` : '';
      const scale = props.scale?.length ? `<div class="overflow-hidden rounded-lg border border-base-300"><table class="w-full text-left text-sm"><thead class="bg-base-200 text-xs uppercase tracking-wider text-base-content/60"><tr><th class="px-3 py-2">Token</th><th class="px-3 py-2">Size</th><th class="px-3 py-2">Example</th></tr></thead><tbody class="divide-y divide-base-300 bg-base-100">${props.scale.map((item) => `<tr><td class="px-3 py-3 font-medium">${esc(item.name)}</td><td class="px-3 py-3 text-base-content/65">${esc(item.size)}</td><td class="px-3 py-3"><span class="${attrs(item.class)}">${esc(item.text)}</span></td></tr>`).join('')}</tbody></table></div>` : '';
      return `<div class="space-y-4">${fontStacks}${scale}${samples}</div>`;
    }
    case 'spacing':
      return `<div class="space-y-3">${(props.items || []).map((item) => `<div class="flex items-center gap-3"><div class="${attrs(item.class)} rounded bg-primary"></div><div><p class="text-sm font-medium">${esc(item.name)}</p><p class="text-xs text-base-content/60">${esc(item.value)}</p></div></div>`).join('')}</div>`;
    case 'surface':
      return `<div class="grid gap-3">${(props.cards || []).map((item) => `<div class="${attrs(item.class)}"><p class="text-sm font-semibold">${esc(item.title)}</p><p class="mt-1 text-sm text-base-content/65">${esc(item.text)}</p></div>`).join('')}</div>`;
    case 'state': {
      const groups = props.groups || [{ title: '', states: props.states || [] }];
      return `<div class="space-y-4">${groups.map((group) => `<div><p class="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/50">${esc(group.title)}</p><div class="flex flex-wrap items-center gap-3">${(group.states || []).map(actionElement).join('')}</div></div>`).join('')}</div>`;
    }
    case 'form':
      return `<form class="space-y-4"><label class="block"><span class="text-xs font-medium text-base-content">Mailbox</span><input class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" value="support@company.com"></label><label class="flex items-center justify-between rounded-lg border border-base-300 bg-base-100 p-3"><span><span class="block text-sm font-medium">Auto-route urgent mail</span><span class="text-xs text-base-content/60">Send SLA risk messages to review.</span></span><span class="h-6 w-10 rounded-full bg-primary p-1"><span class="block h-4 w-4 translate-x-4 rounded-full bg-primary-content"></span></span></label></form>`;
    case 'button': {
      const buttons = props.buttons?.length ? `<div class="flex flex-wrap items-center gap-3">${props.buttons.map(actionElement).join('')}</div>` : '';
      const icons = props.iconSizes?.length ? `<div class="mt-4 flex flex-wrap items-end gap-4">${props.iconSizes.map((item) => `<div class="text-center"><span class="mx-auto block ${attrs(item.class)} rounded-full bg-primary"></span><p class="mt-2 text-xs font-medium">${esc(item.name)}</p><p class="text-xs text-base-content/60">${esc(item.value)}</p></div>`).join('')}</div>` : '';
      return `<div>${buttons}${icons}</div>`;
    }
    case 'navigation':
      return `<nav class="space-y-1" aria-label="Example navigation">${(props.items || []).map((item) => `<a class="${attrs(item.class)}" href="#${esc(item.href || 'navigation')}">${esc(item.label)}<span class="ml-auto rounded-full bg-base-200 px-2 py-0.5 text-xs">${esc(item.count || '')}</span></a>`).join('')}</nav>`;
    case 'table':
      return `<div class="overflow-hidden rounded-lg border border-base-300"><table class="w-full text-left text-sm"><thead class="bg-base-200 text-xs uppercase tracking-wider text-base-content/60"><tr><th class="px-3 py-2">Sender</th><th class="px-3 py-2">Status</th><th class="px-3 py-2 text-right">SLA</th></tr></thead><tbody class="divide-y divide-base-300 bg-base-100">${(props.rows || []).map((row) => `<tr><td class="px-3 py-3 font-medium">${esc(row.sender)}</td><td class="px-3 py-3"><span class="rounded-full ${attrs(row.badgeClass)} px-2 py-1 text-xs font-medium">${esc(row.status)}</span></td><td class="px-3 py-3 text-right text-base-content/70">${esc(row.sla)}</td></tr>`).join('')}</tbody></table></div>`;
    case 'feedback':
      return `<div class="space-y-3">${(props.alerts || []).map((item) => `<div class="${attrs(item.class)}"><p class="text-sm font-semibold">${esc(item.title)}</p><p class="mt-1 text-sm">${esc(item.text)}</p></div>`).join('')}</div>`;
    case 'screen':
      return `<div class="space-y-6">${(props.screens || []).map(renderScreen).join('')}</div>`;
    default:
      return '<p class="text-sm text-base-content/60">No renderer configured.</p>';
  }
}

function renderScreen(screen) {
  if (screen.kind === 'dashboard') {
    return `<div class="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"><div class="mb-4 flex items-center justify-between"><div><p class="text-xs font-semibold uppercase tracking-wider text-primary">Dashboard</p><h4 class="text-xl font-semibold tracking-tight">${esc(screen.title || 'Mailbox command center')}</h4></div><button class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-content hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Automate queue</button></div><div class="grid gap-3 md:grid-cols-4">${(screen.metrics || []).map((metric) => `<div class="rounded-xl border border-base-300 bg-base-100 p-4"><p class="text-xs font-medium text-base-content/60">${esc(metric.label)}</p><p class="mt-2 text-2xl font-semibold tracking-tight ${attrs(metric.class || 'text-base-content')}">${esc(metric.value)}</p><p class="mt-1 text-xs text-base-content/60">${esc(metric.hint || '')}</p></div>`).join('')}</div><div class="mt-4 grid gap-4 lg:grid-cols-2"><div class="rounded-xl border border-base-300 bg-base-100 p-4"><h5 class="text-sm font-semibold">Queue health</h5><div class="mt-3 space-y-2">${(screen.queues || []).map((queue) => `<div class="flex items-center justify-between rounded-lg bg-base-200/70 px-3 py-2"><span class="text-sm font-medium">${esc(queue.name)}</span><span class="rounded-full ${attrs(queue.class)} px-2 py-1 text-xs font-medium">${esc(queue.value)}</span></div>`).join('')}</div></div><div class="rounded-xl border border-base-300 bg-base-100 p-4"><h5 class="text-sm font-semibold">Automation activity</h5><div class="mt-3 space-y-3">${(screen.activity || []).map((item) => `<div class="flex gap-3"><span class="mt-1 h-2 w-2 rounded-full ${attrs(item.dot)}"></span><div><p class="text-sm font-medium">${esc(item.title)}</p><p class="text-xs text-base-content/60">${esc(item.text)}</p></div></div>`).join('')}</div></div></div></div>`;
  }
  if (screen.kind === 'rule-builder') {
    return `<div class="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"><div class="mb-4"><p class="text-xs font-semibold uppercase tracking-wider text-primary">Rule builder</p><h4 class="text-xl font-semibold tracking-tight">${esc(screen.title || 'Route VIP billing mail')}</h4><p class="mt-1 text-sm text-base-content/65">${esc(screen.description || '')}</p></div><div class="grid gap-4 lg:grid-cols-2"><form class="space-y-4 rounded-xl border border-base-300 bg-base-200/60 p-4"><label class="block"><span class="text-xs font-medium">Trigger</span><select class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"><option>Sender contains domain</option></select></label><label class="block"><span class="text-xs font-medium">Condition</span><input class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value="vip.customer"></label><label class="block"><span class="text-xs font-medium">Action</span><input class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value="Assign to billing lead"></label><div class="flex gap-2"><button class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-content hover:bg-primary/90">Publish rule</button><button class="rounded-md border border-base-300 bg-base-100 px-4 py-2 text-sm font-semibold hover:bg-base-200">Preview</button></div></form><div class="rounded-xl border border-base-300 bg-base-100 p-4"><h5 class="text-sm font-semibold">Preview</h5><div class="mt-3 rounded-lg border border-warning bg-warning/15 p-4 text-warning-content"><p class="text-sm font-semibold">SLA risk detected</p><p class="mt-1 text-sm">This message will be assigned to Billing Lead and marked urgent.</p></div><pre class="mt-4 overflow-auto rounded-lg bg-neutral p-4 font-mono text-xs leading-5 text-neutral-content">if sender.domain == 'vip.customer'\nthen assign('billing-lead')\nand priority('urgent')</pre></div></div></div>`;
  }
  if (screen.kind === 'settings') {
    return `<div class="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"><div class="mb-4"><p class="text-xs font-semibold uppercase tracking-wider text-primary">Settings</p><h4 class="text-xl font-semibold tracking-tight">${esc(screen.title || 'Mailbox settings')}</h4></div><form class="grid gap-4 md:grid-cols-2"><label class="block"><span class="text-xs font-medium">Mailbox address</span><input class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value="support@company.com"></label><label class="block"><span class="text-xs font-medium">Default owner</span><input class="mt-1.5 h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value="Operations Team"></label><label class="flex items-center justify-between rounded-lg border border-base-300 bg-base-100 p-3 md:col-span-2"><span><span class="block text-sm font-medium">Enable AI draft suggestions</span><span class="text-xs text-base-content/60">Draft replies only; humans still approve outbound mail.</span></span><span class="h-6 w-10 rounded-full bg-primary p-1"><span class="block h-4 w-4 translate-x-4 rounded-full bg-primary-content"></span></span></label><div class="md:col-span-2 flex gap-2"><button class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-content hover:bg-primary/90">Save settings</button><button class="rounded-md border border-base-300 bg-base-100 px-4 py-2 text-sm font-semibold hover:bg-base-200">Cancel</button></div></form></div>`;
  }
  return `<div class="rounded-xl border border-base-300 bg-base-100 p-4"><p class="text-sm text-base-content/60">Unknown screen example.</p></div>`;
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
