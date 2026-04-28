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
10. Run the validators and report exact commands and results.

## Output Format

Return:

- `Status`: Pass / Needs fixes
- `Blocking issues`: ordered list with file paths and exact fix instructions
- `Non-blocking improvements`: ordered list
- `Validator results`: commands run and pass/fail result
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
node templates/validators/validate-all.mjs examples/mailpilot-design-guide
node examples/mailpilot-design-guide/scripts/validate-all.mjs examples/mailpilot-design-guide
```
