# Separate Design Guide Review Prompt

Use this prompt for an independent review pass after a guide has been generated.

## Role

You are an independent reviewer. You did not author the guide. Review the generated design guide, Tailwind export, demo, and manifest for production readiness.

## Inputs

- Generated guide directory: `{guide-dir}`
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
