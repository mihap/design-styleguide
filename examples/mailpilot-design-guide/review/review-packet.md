# Separate Design Guide Review Prompt

Use this prompt for an independent review pass after a guide has been generated.

## Role

You are an independent reviewer. You did not author the guide. Review the generated design guide, Tailwind export, demo, and manifest for production readiness.

## Inputs

- Generated guide directory: `examples/mailpilot-design-guide`
- Source blueprint: `design-system-blueprint/`
- Appendices: `design-system-blueprint-appendices/`
- Validators: `templates/validators/`

## Review Tasks

1. Confirm all chapters `00–12` exist and preserve blueprint heading/table structure.
2. Confirm no square-bracket placeholders remain in generated guide, Tailwind export, demo data, or demo HTML.
3. Confirm no `Local Decisions Required` sections remain.
4. Confirm appendix guidance was merged into matching chapters and local decisions were resolved.
5. Confirm tokens resolve by source family:
   - colors in `02-color-system.md`
   - typography in `03-typography.md`
   - spacing in `04-spacing-system.md`
   - radius in `05-border-radius.md`
   - elevation/shadow in `06-shadows-elevation.md`
   - button icon sizes in `09-buttons.md`
6. Confirm value-bearing component specs reference declared tokens or scales where applicable.
7. Confirm Tailwind export targets latest stable Tailwind only and uses no component-framework assumptions.
8. Confirm demo is deterministic, schema-driven, sidebar-navigable, and backed by the validated Tailwind export.
9. Confirm color pairs used for content on fills meet at least 3:1 contrast, and body-like text pairs meet WCAG AA where applicable.
10. Run the demo visual review checklist from `templates/review/demo-visual-review.md` when browser access is available.
11. Run the validators in no-write mode and report exact commands and results.

## Output Format

Return:

- `Status`: Pass / Needs fixes
- `Blocking issues`: ordered list with file paths and exact fix instructions
- `Non-blocking improvements`: ordered list
- `Validator results`: commands run and pass/fail result
- `Visual review results`: checklist status and viewport notes when performed
- `Final recommendation`: production-ready or not

Do not invent missing design decisions. If a production decision is missing, flag it as blocking.


---

## Files to Review

- examples/mailpilot-design-guide/00-cover.md
- examples/mailpilot-design-guide/01-design-philosophy.md
- examples/mailpilot-design-guide/02-color-system.md
- examples/mailpilot-design-guide/03-typography.md
- examples/mailpilot-design-guide/04-spacing-system.md
- examples/mailpilot-design-guide/05-border-radius.md
- examples/mailpilot-design-guide/06-shadows-elevation.md
- examples/mailpilot-design-guide/07-component-states.md
- examples/mailpilot-design-guide/08-form-elements.md
- examples/mailpilot-design-guide/09-buttons.md
- examples/mailpilot-design-guide/10-navigation.md
- examples/mailpilot-design-guide/11-tables-data-display.md
- examples/mailpilot-design-guide/12-feedback-alerts.md
- examples/mailpilot-design-guide/manifest.json

## Recommended Commands

```bash
node 'templates/validators/validate-all.mjs' 'examples/mailpilot-design-guide' --no-write
node 'examples/mailpilot-design-guide/scripts/validate-all.mjs' 'examples/mailpilot-design-guide' --no-write
```

---

# Demo Visual Review Checklist

Use this checklist after `demo/index.html` is generated and validators pass. The goal is to catch visual, interaction, and product-realism issues that static validators cannot fully judge.

## Setup

1. Build the Tailwind export.
2. Build the demo.
3. Open `demo/index.html` in a browser.
4. Review desktop width first, then tablet/mobile widths.

## Required Checks

### Page Structure

- [ ] Sidebar navigation is visible on desktop and every item scrolls to the correct section.
- [ ] Main content has a clear title, version, and purpose statement.
- [ ] Sections appear in guide order and are easy to scan.
- [ ] Each example clearly names what decision it demonstrates.

### Token Visibility

- [ ] Color examples show brand, base, semantic, text, link, and feedback usage.
- [ ] Typography examples show primary font, secondary/mono font, main app font size, type scale, text color hierarchy, and links.
- [ ] Spacing examples make density and rhythm visible.
- [ ] Radius and elevation examples show actual surface differences.
- [ ] Button examples show variants, sizes, icon scale, and interactive states.

### Product Realism

- [ ] At least one full product screen combines multiple token families.
- [ ] Product-screen examples look plausible for the stated product domain.
- [ ] Tables contain realistic rows and status values.
- [ ] Forms include realistic labels, helper behavior, actions, and toggles.
- [ ] Feedback examples are scoped to fields, rows, panels, or global context as appropriate.

### Interaction States

- [ ] Buttons show default, hover, focus, active, disabled, and loading treatments.
- [ ] Links show default, hover, focus, and disabled treatments.
- [ ] Navigation shows default, hover, and selected/current treatments.
- [ ] Focus rings are visible and not clipped.
- [ ] Disabled states look unavailable without becoming unreadable.

### Accessibility and Readability

- [ ] Text contrast appears readable in all examples.
- [ ] Semantic statuses are not conveyed by color alone when meaning is critical.
- [ ] Forms have visible labels.
- [ ] Icon-only or compact actions have accessible labels in the source.
- [ ] Body-sized text remains readable at default browser zoom.

### Responsive Behavior

- [ ] Sidebar/header behavior works at desktop, tablet, and mobile widths.
- [ ] Tables do not break the layout on narrow screens.
- [ ] Cards and product screens stack cleanly on mobile.
- [ ] Tap targets remain large enough on mobile.
- [ ] No important content is hidden behind horizontal overflow without an obvious affordance.

### Tailwind and Framework Policy

- [ ] Demo uses generated Tailwind export classes and tokens.
- [ ] Demo does not rely on component-framework markup or scripts.
- [ ] Demo does not use arbitrary bracket utilities for core deterministic examples.
- [ ] Demo examples stay static and reproducible from `demo/demo-data.json`.

## Output Format

Record results as:

```md
# Demo Visual Review Results

Status: Pass / Needs fixes

## Blocking Issues

- [file/path] Exact issue and required fix.

## Non-Blocking Improvements

- [file/path] Suggested improvement.

## Screens Reviewed

- Desktop width: pass/fail notes
- Tablet width: pass/fail notes
- Mobile width: pass/fail notes
```
