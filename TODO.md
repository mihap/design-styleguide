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

## Implementation Status

Status: **implemented and validated** using `examples/mailpilot-design-guide/` as the work-surface guide.

Validated with:

```bash
node templates/validators/validate-all.mjs examples/mailpilot-design-guide
node scripts/smoke-test.mjs --full
```

## Implemented Workflow

### Phase 1 — Generation contract

- [x] Defined generated directory structure for `{name}-design-guide/`.
- [x] Defined required user intake fields in `templates/intake/design-guide-intake.md`.
- [x] Defined optional user intake fields in `templates/intake/design-guide-intake.md`.
- [x] Defined missing-information behavior: ask follow-up questions unless the user explicitly allows opinionated draft decisions.
- [x] Defined slug naming rules in `scripts/create-guide.mjs`.
- [x] Created `examples/` and first work-surface guide at `examples/mailpilot-design-guide/`.
- [x] Defined generated-output manifest and validation result recording.

### Phase 2 — Generated guide creation

- [x] Implemented guide scaffolding in `scripts/create-guide.mjs`.
- [x] Copied blueprint files into generated guide workspaces.
- [x] Filled the MailPilot example from user direction and explicit permission to invent missing decisions.
- [x] Preserved file numbering, heading levels, table shapes, column order, and row order.
- [x] Replaced placeholders in completed output.
- [x] Enforced plain `—` for intentional not-applicable values.
- [x] Kept token families aligned: colors `02`, typography `03`, spacing `04`, radius `05`, elevation/shadow `06`, and components `07–12`.

### Phase 3 — Appendix merge

- [x] Implemented appendix merge automation in `scripts/merge-appendices.mjs`.
- [x] Mapped appendix files to matching generated chapters.
- [x] Parsed appendix `Best Practices by Blueprint Section` subsections.
- [x] Inserted deterministic `Operational Guidance` blocks.
- [x] Added `Operational DO`, `Operational DON'T`, and `Local Decisions Made` sections.
- [x] Blocked unresolved local decisions unless explicitly allowed.
- [x] Preserved self-contained appendix guidance without source maps, evidence ledgers, IDs, citations, or corpus references.

### Phase 4 — Review and auto-fix

- [x] Added separate-review prompt in `templates/review/guide-review-prompt.md`.
- [x] Added review packet generator in `scripts/prepare-review.mjs`.
- [x] Ran separate reviewer passes and fixed blocking issues.
- [x] Validator coverage now checks missing sections, placeholders, unresolved decisions, token drift, table-shape drift, unit errors, and framework contamination.
- [x] Cross-file consistency is checked across token families and component usage.

### Phase 5 — Tailwind export

- [x] Implemented Tailwind export generation in `scripts/build-tailwind-export.mjs`.
- [x] Uses latest stable Tailwind package at generation/build time.
- [x] Emits CSS-first Tailwind theme export using `@theme static`.
- [x] Emits `tailwind/src/theme.css`, `tailwind/src/tokens.json`, `tailwind/src/fixture.html`, package files, and import instructions.
- [x] Exports color, typography, font weights, line heights, letter spacing, spacing aliases, radius, shadows, and button icon-size utilities.
- [x] Keeps export Tailwind-specific and component-framework-agnostic.

### Phase 6 — Tailwind export validation

- [x] Added reusable Tailwind validator in `templates/validators/validate-tailwind-export.mjs`.
- [x] Validates token-family coverage and source/export consistency.
- [x] Validates units for size, line-height, letter-spacing, radius, and button icon-size values.
- [x] Validates fill/content color contrast pairs.
- [x] Compiles fixture stylesheet with Tailwind.
- [x] Checks utility emission for fixture/demo classes.
- [x] Fails on unresolved variables, invalid utilities, invalid token references, arbitrary bracket utilities, stale references, and framework contamination.

### Phase 7 — Deterministic HTML demo

- [x] Added reusable demo skeleton in `templates/demo/`.
- [x] Added demo schema in `templates/demo/demo.schema.json`.
- [x] Added deterministic data file pattern with `demo/demo-data.json`.
- [x] Generates `demo/index.html` from schema/data through `templates/demo/build-demo.mjs` and `scripts/build-demo.mjs`.
- [x] Includes sidebar navigation across generated sections.
- [x] Presents each section as HTML examples using generated Tailwind tokens and utilities.
- [x] Includes examples for color, typography, spacing, radius, elevation, states, forms, buttons, navigation, tables, feedback, and full product screens.
- [x] Keeps demo static, deterministic, and component-framework-agnostic.

### Phase 8 — Demo validation

- [x] Added reusable demo validator in `templates/validators/validate-demo.mjs`.
- [x] Validates `demo/demo-data.json` against `demo/demo.schema.json` constraints.
- [x] Validates sidebar targets and section coverage.
- [x] Validates demo classes through Tailwind export validation.
- [x] Validates no placeholders, unresolved local decisions, stale references, or framework contamination.
- [x] Validates accessibility structure: title, landmarks, labelled navigation, form labels, and focusable controls.
- [x] Added visual review checklist in `templates/review/demo-visual-review.md`.

### Phase 9 — Final quality gate and handoff

- [x] Added `templates/validators/validate-all.mjs` quality gate.
- [x] Added `scripts/smoke-test.mjs` and full smoke-test mode.
- [x] Writes validation results to `manifest.json`.
- [x] Confirms generated directory is production-ready when all validators pass.
- [x] Added README quickstart and script documentation.

---

## Current Artifacts

### Work-surface example

```text
examples/mailpilot-design-guide/
  00-cover.md ... 12-feedback-alerts.md
  manifest.json
  tailwind/
  demo/
  review/
  scripts/
```

### Reusable scripts

```text
scripts/create-guide.mjs
scripts/merge-appendices.mjs
scripts/build-tailwind-export.mjs
scripts/build-demo.mjs
scripts/prepare-review.mjs
scripts/smoke-test.mjs
```

### Reusable templates

```text
templates/intake/design-guide-intake.md
templates/review/guide-review-prompt.md
templates/review/demo-visual-review.md
templates/demo/
templates/validators/
```

## Remaining Optional Enhancements

These are not blockers for the initial plan:

- Add automated screenshot capture for demo review artifacts.
- Add browser-driven visual regression checks.
- Add contrast validation for more contextual text/background combinations, not only exported fill/content pairs.
- Add stricter generated-demo richness requirements per section.
- Add a second example guide to exercise a different product domain.
