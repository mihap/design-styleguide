# AGENTS.md — Guidance for AI Agents

This repo contains a **design system blueprint**: a set of numbered Markdown templates with `[placeholder]` slots that human authors fill in to document a real design system. Read this file before editing anything in `design-system-blueprint/`.

If you are unsure what the user wants done, ask. The single most damaging failure mode here is **inventing design decisions** — values, tokens, principles — and presenting them as if they came from the user.

---

## Mental model

- The files in `design-system-blueprint/` are **templates**, not a finished styleguide. Every value in square brackets (`[value]`, `[rem]`, `[token]`, `[Usage]`, `[Notes]`) is an unfilled slot.
- The structure (file order, section headings, table columns, row order) is the deliverable's value. **Do not restructure** unless explicitly asked.
- The blueprint assumes **Tailwind CSS utility conventions only**. Do not introduce non-Tailwind component, runtime, or token-framework assumptions unless the user's source system explicitly uses them.
- CSS custom properties are generic design tokens here. Token names are project-defined; do not force framework-specific token names into the blueprint.
- Sizes are **rem** or declared tokens for spacing, font sizes, and radii; border/ring/divider widths are **px**; line heights are **unitless**; letter spacing is **em**; durations are **ms**; opacity/depth/noise-style values are **unitless numbers**. Convert supplied px sizes to rem at a 16px base unless they are Tailwind-style hairlines.

### Appendix Sidecars

- Best-practice appendices live in `design-system-blueprint-appendices/`, never inside `design-system-blueprint/`.
- Appendix sidecars supplement chapters `02–12` only.
- Final appendix files should be self-contained operational guidance. Strip source maps, evidence ledgers, BP IDs, citation links, and source-corpus references before calling the work done.
- If an appendix rule cannot stand on its own, rewrite it or move the uncertainty into `Local Decisions Required` instead of inventing filler guidance.
- Appendix markdown is excluded from placeholder-bracket validation intended for blueprint templates.

---

## How to handle requests

### "Fill in this blueprint" (no source material given)

**Stop and ask** for one of:
1. A `tailwind.config.*`, theme CSS, design-token file, or token table to extract from.
2. A reference design system or design file (Figma, brand guide).
3. Explicit instructions to draft opinionated defaults and label them as drafts.

Never silently invent token values, font choices, principles, or do/don't rules. They look authoritative once written.

### "Fill in from this source"

When the user supplies tokens, configs, or an existing styleguide:

1. Map their values to the placeholders **without changing the table shape**.
2. Use rem for spacing, font sizes, and radii; convert px → rem at 16px base unless told otherwise. Keep border/ring/divider widths in px.
3. If the source omits a value the blueprint asks for, leave the placeholder for unfinished work, use plain `—` for intentional not-applicable cells, or surface it as a question. Never use `[—]` in completed work.
4. Keep source chapters aligned with downstream references: colors in `02`, typography in `03`, spacing in `04`, radius in `05`, elevation in `06`, and component applications in `07–12`.

### "Document our existing system"

1. Read `tailwind.config.*`, theme CSS, design-token files, and component implementation entry points first.
2. Extract the actual values into `02–06`.
3. Only after tokens are recorded, fill in component sections (`07–12`) by reading the components themselves.
4. Quote the source file paths in your final summary so the user can verify.

### "Adapt to non-Tailwind stack"

Confirm the intended structural conversion first. If approved, rename the `Tailwind` column header (to `Class`, `Token`, `Variable`, etc.). Don't delete the column. Don't reshape rows unless the user explicitly asks.

---

## Editing rules

| Rule                                                                                            | Why                                                                |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Preserve file numbering and order unless explicitly asked to change them.                       | Files reference each other by number.                              |
| Preserve table column order and count.                                                          | Downstream tooling and reviewers depend on it.                     |
| Preserve heading levels and section titles.                                                     | The blueprint is read across systems; titles are stable anchors.   |
| Use `—` for "not applicable" cells, never blanks and never `[—]`.                              | Blanks are ambiguous and bracketed values look unfinished.          |
| Replace placeholders in place; never wrap them.                                                 | `[rem]` becomes `0.25rem`, not `[0.25rem]`.                        |
| Token names must match across files.                                                            | If `02` defines a color token, component chapters must use that exact name. |
| Keep prose to one short sentence per cell.                                                      | The blueprint's value is scannability.                             |
| Use Tailwind unit conventions: rem for sizes, px for hairlines, unitless for line height, em for letter spacing, ms for transitions. | Consistency with Tailwind's conventions.                           |
| Do not introduce non-Tailwind framework assumptions unless the user supplies them.              | The blueprint is component-framework-agnostic.                     |
| Don't add or remove files in `design-system-blueprint/` without explicit instruction.           | The numbered blueprint structure is the contract.                  |
| Filename slug and chapter title may differ; the slug is a stable internal anchor, the title is the human-facing heading. | E.g. `04-spacing-system.md` slug ↔ "Layout & Spacing" title.       |

---

## Cross-file consistency invariants

When you change anything, check these still hold:

1. **Color tokens** declared in `02-color-system.md` must be the only color tokens referenced in `07–12` where those chapters reference color-driven treatments.
2. **Type scale** in `03-typography.md` must supply typography values referenced elsewhere: size, weight, line height, and letter spacing.
3. **Spacing values** referenced in `08-form-elements.md`, `09-buttons.md`, `10-navigation.md`, `11-tables-data-display.md`, and `12-feedback-alerts.md` must come from `04-spacing-system.md` where applicable.
4. **Radius values** must come from `05-border-radius.md`; **shadow/elevation values** must come from `06-shadows-elevation.md`.
5. **Button icon sizes** are declared in `09-buttons.md` → `Button Sizes` as the `Size | Icon Size | Usage` table with `xs`, `sm`, `md (default)`, and `lg` rows. Keep icon-only button sizes aligned with those rows; do not create a separate global icon scale unless the user asks.
6. **Scale-typed values** should not appear as raw rem values outside their declaring scale, except where the table itself is defining that scale.
7. **Philosophy constraints** in `01-design-philosophy.md` should not be contradicted later. If `01` says "borders, not shadows", `06` should default to borders for elevation.
8. **Shared interaction treatment** should stay consistent across `07-component-states.md`, `09-buttons.md`, `10-navigation.md`, and `11-tables-data-display.md`. If focus, active, or selected behavior changes in one, sweep the others.
9. **Cover metadata** in `00-cover.md` (theme name, font, styling stack, color format) must match what the rest of the document actually uses.

When the user changes one token, do a **full sweep** rather than a single-file edit.

---

## Validation checklist before declaring "done"

Run through this before telling the user a fill-in is complete:

- [ ] No `[` characters remain in any blueprint file (search the whole `design-system-blueprint/` folder).
- [ ] No completed cell contains `[—]`; intentional not-applicable cells use plain `—`.
- [ ] Every referenced token is declared in its source chapter: colors in `02`, typography in `03`, spacing in `04`, radius in `05`, and elevation/shadow in `06`.
- [ ] Every Tailwind utility referenced is real (not `[utility]`).
- [ ] Sizes are rem or declared tokens; borders/rings/dividers are px; line heights unitless; letter spacing em; durations ms; opacity/depth/noise-style values unitless.
- [ ] Cover (`00`) metadata reflects the actual fills.
- [ ] No non-Tailwind framework assumptions were introduced unless the user supplied them explicitly.
- [ ] No table has gained or lost a column unless the user explicitly requested that structural change.
- [ ] No unexpected file has been added or removed from the approved blueprint structure (`00–12`).

If you changed appendix sidecars, also check these:

- [ ] No appendix file was added under `design-system-blueprint/`.
- [ ] Every appendix includes `Scope`, `Best Practices by Blueprint Section`, `DO`, `DON'T`, and `Local Decisions Required`.
- [ ] Appendix rules are self-contained and operationally clear without external references.

If any item fails, fix or surface it — don't gloss over it.

---

## Tone for filled-in prose

The blueprint's voice is **direct, declarative, opinionated, and short**. When filling `[Usage]`, `[Notes]`, or principles:

- One sentence. Imperative voice ("Use X for Y", not "X can be used for Y").
- Concrete, not aspirational. "Border-only elevation; shadows reserved for modals" beats "We aim for restrained elevation".
- No marketing language. No "delightful", "beautiful", "modern" — name the actual rule.
- No hedging.

---

## Common requests and the right move

| Request                                          | Right move                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| "Add a new color"                                | Add it to `02` → reference in `07`/`09`/`10`/`11`/`12` wherever it applies.                      |
| "Add a new button variant"                       | Add row to `09` variants table → add states to `07` when state treatment changes.                |
| "Add a new navigation pattern"                   | Add it to `10` → align spacing with `04` and states with `07`.                                   |
| "Add a new table variant"                        | Add it to `11` → align spacing with `04` and typography with `03`.                               |
| "Switch from light to dark mode"                 | New top-level theme; consider duplicating the blueprint or adding a parallel set of files. Ask first. |
| "Convert to non-Tailwind"                        | Confirm the structural conversion, then rename `Tailwind` columns globally without reshaping rows unless asked. |
| "Add another framework"                          | Ask for explicit source material and label framework-specific assumptions clearly.                |
| "Generate a Figma export / Storybook / tokens.json" | Out of scope unless explicitly added. Confirm before doing it.                                |
| "Shorten this"                                   | Tighten prose, never delete table rows or sections.                                              |

---

## Files outside `design-system-blueprint/`

- `README.md` — human-facing intro. Update if the blueprint's structure or framework assumptions change.
- `AGENTS.md` — this file. Update when invariants change.
- `LICENSE` — private license notice. Update only when ownership or distribution terms change.

If you change the blueprint's structure (rare, only on user instruction), update both `README.md` and `AGENTS.md` in the same change.
