# TODO — Design Style Guide Generation Workflow

## Objective

Define and implement an AI-agent workflow that turns a cloned repository plus user direction into a production-ready `{name}-design-guide/` package containing:

- A completed design style guide based on `design-system-blueprint/`.
- Appendix guidance merged into the appropriate generated sections.
- A validated Tailwind export ready to import into a real website.
- A validated deterministic HTML demo with sidebar navigation and component examples.

## Operating Rules

- Keep Tailwind as the only framework-specific assumption.
- Do not introduce component-framework, runtime-framework, or token-framework assumptions unless the user explicitly supplies them.
- Do not invent design decisions. Ask the user for missing inputs or mark them as unresolved until the final quality gate.
- Completed output must contain no bracket placeholders.
- Every value-bearing component specification should reference a token or declared scale where applicable.
- Use Tailwind unit conventions: rem or tokens for sizes, px for hairlines, unitless line heights, em letter spacing, ms durations, and unitless numeric controls.
- Treat `09-buttons.md` → `Button Sizes` as the canonical source for button icon sizes.

---

## Task List

### Phase 1 — Define the generation contract

- [x] Define the generated directory structure for `{name}-design-guide/`.
- [x] Define required user intake fields: guide name, product context, visual direction, constraints, brand inputs, typography inputs, color requirements, accessibility requirements, density preferences, and examples/references.
- [x] Define optional user intake fields: preferred color format, existing Tailwind config, token JSON, theme CSS, screenshots, brand guide, and component inventory.
- [x] Define what happens when required information is missing: ask follow-up questions before final output; never invent production decisions silently.
- [x] Define naming rules for `{name}` → filesystem-safe slug.
- [x] Create `examples/` and add the first work-surface guide at `examples/mailpilot-design-guide/`.
- [x] Define a generated-output manifest that records source inputs, assumptions, decisions, and validation results.

### Phase 2 — Create the generated guide

- [x] Create `{name}-design-guide/`.
- [x] Copy all files from `design-system-blueprint/` into `{name}-design-guide/`.
- [ ] Fill the copied blueprint from user direction and supplied source materials.
- [ ] Preserve file numbering, heading levels, table shapes, column order, and row order unless explicitly directed otherwise.
- [ ] Replace placeholders in place; do not wrap completed values in brackets.
- [ ] Use plain `—` for intentional not-applicable cells.
- [ ] Keep token families aligned: colors in `02`, typography in `03`, spacing in `04`, radius in `05`, elevation/shadow in `06`, and component usage in `07–12`.

### Phase 3 — Merge appendices into generated sections

- [x] Map each appendix file in `design-system-blueprint-appendices/` to its matching generated chapter.
- [x] Parse each appendix `Best Practices by Blueprint Section` subsection.
- [x] Insert each subsection's guidance into the matching generated chapter section using a deterministic subsection label such as `Operational Guidance`.
- [x] Append chapter-level `DO` and `DON'T` guidance under deterministic `Operational DO` and `Operational DON'T` subsections.
- [x] Convert `Local Decisions Required` into concrete generated-guide decisions whenever user input supports them.
- [x] If a local decision cannot be resolved, stop and ask the user before production-ready output is declared.
- [x] Ensure merged appendix content remains self-contained and does not include source maps, evidence ledgers, IDs, citations, or corpus references.

### Phase 4 — Review and auto-fix the generated guide

- [x] Provide a separate-review prompt and `scripts/prepare-review.mjs` review packet generator.
- [x] Run a separate review pass using a reviewer prompt or subagent that did not author the initial guide.
- [x] Check for missing sections, missing values, unresolved local decisions, bracket placeholders, token drift, table-shape drift, unit errors, and framework contamination.
- [x] Check cross-file consistency across token families and component usage.
- [x] Automatically fix issues that can be fixed from existing source material.
- [x] Ask the user for any remaining design decisions that cannot be inferred safely.
- [x] Repeat review and fixes until the generated guide passes the documentation quality gate.

### Phase 5 — Build the Tailwind export

- [ ] Read the current official Tailwind documentation before implementation and use the latest stable Tailwind package at generation time.
- [x] Create a Tailwind export directory inside `{name}-design-guide/`, for example `tailwind/`.
- [x] Add a `package.json` using Tailwind latest stable packages and build scripts.
- [x] Export tokens and scales from the completed guide into Tailwind-compatible CSS/config artifacts.
- [x] Prefer Tailwind's current best-practice customization model; for Tailwind v4-style projects, expect a CSS-first theme export using `@theme` plus importable CSS.
- [x] Include import instructions showing how a real website consumes the generated Tailwind customization.
- [x] Include a machine-readable token artifact, such as `tokens.json`, to support validation and future integrations.
- [x] Keep the export Tailwind-specific but component-framework-agnostic.

### Phase 6 — Validate the Tailwind export until clean

- [x] Provide reusable validator templates in `templates/validators/`, including `validate-tailwind-export.mjs`.
- [x] Validate that all exported tokens exist in the source guide and all source-guide token families are represented in the export.
- [x] Validate units: rem/tokens for sizes, px for hairlines, unitless line heights, em letter spacing, ms durations.
- [x] Compile a fixture stylesheet with the generated Tailwind export.
- [x] Compile fixture HTML that exercises expected theme utilities, component states, colors, typography, spacing, radius, shadows, and button icon-size rows.
- [x] Fail on missing CSS output, unresolved variables, invalid utilities, invalid token references, or framework contamination.
- [x] Automatically fix deterministic export issues and rerun validation.
- [x] Repeat until the validator exits with zero errors.

### Phase 7 — Build the deterministic HTML demo

- [x] Create reusable demo skeleton templates in `templates/demo/`.
- [x] Define a demo schema before generating HTML.
- [x] Use a deterministic data file, for example `demo/demo-data.json`, that conforms to the schema.
- [x] Use the latest stable Tailwind package and the validated Tailwind export from Phase 6.
- [x] Generate `demo/index.html` from the schema/data, not from ad hoc prose.
- [x] Include sidebar navigation across all generated sections.
- [x] Present each section as HTML component examples using the generated Tailwind tokens and utilities.
- [x] Include examples for color, typography, spacing, radius, elevation, states, forms, buttons, navigation, tables, and feedback.
- [x] Keep demo output static, deterministic, and component-framework-agnostic.

### Phase 8 — Validate the HTML demo until clean

- [x] Provide reusable demo validator template in `templates/validators/validate-demo.mjs`.
- [x] Validate `demo/demo-data.json` against `demo/demo.schema.json`.
- [x] Validate that every sidebar item targets an existing section.
- [x] Validate that every demo section maps to a generated guide chapter.
- [x] Validate that demo classes compile through the generated Tailwind export.
- [x] Validate that no bracket placeholders or unresolved local decisions appear in demo HTML or data.
- [x] Validate basic accessibility structure: document title, landmarks, headings, navigation labels, form labels, focusable controls, and color contrast checks where token pairs are available.
- [x] Automatically fix deterministic demo issues and rerun validation.
- [x] Repeat until the validator exits with zero errors.

### Phase 9 — Final quality gate and handoff

- [x] Run the guide validator, Tailwind export validator, and demo validator together.
- [x] Write final validation results to the generated-output manifest.
- [x] Confirm the generated directory is production-ready.
- [x] Provide the user with a concise handoff: generated path, source assumptions, unresolved questions if any, build commands, validation commands, and import instructions.

---

## Draft Implementation Plan for Review

### Proposed generated directory structure

```text
{name}-design-guide/
  00-cover.md
  01-design-philosophy.md
  02-color-system.md
  03-typography.md
  04-spacing-system.md
  05-border-radius.md
  06-shadows-elevation.md
  07-component-states.md
  08-form-elements.md
  09-buttons.md
  10-navigation.md
  11-tables-data-display.md
  12-feedback-alerts.md
  manifest.json
  tailwind/
    package.json
    src/
      input.css
      theme.css
      tokens.json
      fixture.html
    dist/
      design-guide.css
    README.md
  demo/
    demo.schema.json
    demo-data.json
    index.html
    assets/
  scripts/
    validate-guide.mjs
    validate-tailwind-export.mjs
    validate-demo.mjs
    validate-all.mjs
```

### Proposed appendix merge rule

1. Match appendix file number to generated chapter number.
2. For each appendix subsection under `Best Practices by Blueprint Section`, find the matching heading in the generated chapter.
3. Insert a nested `Operational Guidance` block immediately after that section's table or explanatory paragraph.
4. Add chapter-level `Operational DO`, `Operational DON'T`, and `Local Decisions Made` sections near the end of the chapter.
5. Convert unresolved `Local Decisions Required` bullets into explicit decisions or user questions before the quality gate.

### Proposed validation strategy

Use validators as normal generated artifacts, not just one-off agent checks:

- `validate-guide.mjs` checks guide completeness, table stability, no brackets, token family consistency, units, appendix merge completeness, no unresolved local decisions, and no non-Tailwind framework assumptions.
- `validate-tailwind-export.mjs` checks token coverage, Tailwind build success, utility compilation, importability, units, and framework contamination.
- `validate-demo.mjs` checks demo schema validity, sidebar links, chapter coverage, placeholder absence, Tailwind compilation, and basic accessibility structure.
- `validate-all.mjs` runs all validators and writes pass/fail details into `manifest.json`.

### Proposed deterministic demo schema

The demo should be generated from structured data with these top-level fields:

```json
{
  "guideName": "string",
  "version": "string",
  "tailwindExport": "string",
  "sections": [
    {
      "id": "string",
      "title": "string",
      "sourceChapter": "string",
      "examples": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "type": "color|typography|spacing|surface|state|form|button|navigation|table|feedback",
          "tokens": ["string"],
          "props": { "structuredExampleData": true }
        }
      ]
    }
  ]
}
```

### Proposed quality gate definition

The generated package is production-ready only when:

- No bracket placeholders remain in the generated guide, Tailwind export, or demo.
- No unresolved local decisions remain.
- All token references resolve to their source chapters.
- Tailwind export builds successfully with latest stable Tailwind at generation time.
- Demo builds from schema/data and uses the validated Tailwind export.
- All validators pass with zero errors.
- The manifest records inputs, assumptions, decisions, commands run, and validation results.

## Resolved Decisions

- Generated examples should be committed under `examples/`; the first work-surface guide is `examples/mailpilot-design-guide/`.
- Reusable validator templates live in this repository under `templates/validators/` and can be copied into generated guides.
- The reusable HTML demo skeleton lives under `templates/demo/`; examples should be generated from structured component-example data and typed props, not raw ad hoc markup.
- Tailwind export targets the latest stable Tailwind release only; no legacy compatibility config is required.
