# AGENTS.md — Guidance for AI Agents

This repo contains a **design system blueprint**: a set of twelve Markdown templates with `[placeholder]` slots that human authors fill in to document a real design system. Read this file before editing anything in `design-system-blueprint/`.

If you are unsure what the user wants done, ask. The single most damaging failure mode here is **inventing design decisions** — values, tokens, principles — and presenting them as if they came from the user.

---

## Mental model

- The files in `design-system-blueprint/` are **templates**, not a finished styleguide. Every value in square brackets (`[value]`, `[rem]`, `[token]`, `[Usage]`, `[Notes]`) is an unfilled slot.
- The structure (file order, section headings, table columns, row order) is the deliverable's value. **Do not restructure** unless explicitly asked.
- The blueprint assumes a **Tailwind CSS + DaisyUI-style token** stack. CSS variable names follow DaisyUI conventions (`--color-base-100`, `--color-primary`, `--color-primary-content`, `--radius-field`, `--radius-box`, `--radius-selector`, `--size-field`, `--border`, `--depth`, `--noise`). The `Tailwind` column in tables expects utility classes (e.g. `px-4`, `text-base`, `rounded-lg`).
- Sizes are **rem**, line heights are **unitless**, letter spacing is **em**, durations are **ms**. Convert if the user supplies px.

---

## How to handle requests

### "Fill in this blueprint" (no source material given)

**Stop and ask** for one of:
1. A `tailwind.config.*` / theme CSS / DaisyUI theme block to extract from.
2. A reference design system or design file (Figma, brand guide).
3. Explicit instructions to draft opinionated defaults and label them as drafts.

Never silently invent token values, font choices, principles, or do/don't rules. They look authoritative once written.

### "Fill in from this source"

When the user supplies tokens, configs, or an existing styleguide:

1. Map their values to the placeholders **without changing the table shape**.
2. Use rem for sizes; convert px → rem at 16px base unless told otherwise.
3. If the source omits a value the blueprint asks for (e.g. they have no `Display` heading size), leave the placeholder, mark with `[—]`, or surface it as a question — don't fabricate.
4. Keep `12-quick-reference.md` aligned with §02 / §03 / §05 — it's a derived view; both must agree.

### "Document our existing system"

1. Read `tailwind.config.*`, theme CSS, and any component library entry points first.
2. Extract the actual values into §02–§06.
3. Only after tokens are recorded, fill in component sections (§07–§10) by reading the components themselves.
4. Quote the source file paths in your final summary so the user can verify.

### "Adapt to non-Tailwind stack"

Rename the `Tailwind` column header (to `Class`, `Token`, `Variable`, etc.). Don't delete the column. Don't reshape rows. The structure must remain intact for cross-team familiarity.

---

## Editing rules

| Rule                                                                                            | Why                                                                |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Preserve file numbering and order.                                                              | Files reference each other by number.                              |
| Preserve table column order and count.                                                          | Downstream tooling and reviewers depend on it.                     |
| Preserve heading levels and section titles.                                                     | The blueprint is read across systems; titles are stable anchors.   |
| Use `—` for "not applicable" cells, never blanks.                                               | Blanks are ambiguous between "skipped" and "intentionally empty".  |
| Replace placeholders in place; never wrap them.                                                 | `[rem]` becomes `0.25rem`, not `[0.25rem]`.                        |
| Token names must match across files.                                                            | If §12 uses `--color-primary`, §07 must too.                       |
| Keep prose to one short sentence per cell.                                                      | The blueprint's value is scannability.                             |
| Use `rem` for sizes, unitless for line height, `em` for letter spacing, `ms` for transitions.   | Consistency with the existing format.                              |
| Don't add or remove files in `design-system-blueprint/` without explicit instruction.           | The 12-section structure is the contract.                          |

---

## Cross-file consistency invariants

When you change anything, check these still hold:

1. **Color tokens** declared in `02-color-system.md` must appear (by the same name) in:
   - `12-quick-reference.md` (`:root` block + Color Quick Reference table)
   - `07-component-states.md` (every state token)
   - `09-buttons.md`, `10-feedback-alerts.md`
2. **Type scale** in `03-typography.md` must match the Typography Quick Reference in `12-quick-reference.md`.
3. **Radius scale** in `05-border-radius.md` must match `--radius-*` declarations in `12-quick-reference.md`.
4. **Spacing tokens** in `04-spacing-system.md` are the only legal values referenced in `08-form-elements.md`, `09-buttons.md`, `10-feedback-alerts.md`. No raw rem values that aren't on the spacing scale.
5. **Philosophy constraints** in `01-design-philosophy.md` should not be contradicted later. If §01 says "borders, not shadows", §06 should default to borders for elevation.
6. **Do / Don't rules** in `11-dos-donts.md` should be consistent with rules in §03 (typography do/don'ts) and §09 (button do/don'ts). If you change one, sweep the others.
7. **Cover metadata** in `00-cover.md` (theme name, font, framework, color format) must match what the rest of the document actually uses.

When the user changes one token, do a **full sweep** rather than a single-file edit.

---

## Validation checklist before declaring "done"

Run through this before telling the user a fill-in is complete:

- [ ] No `[` characters remain in any blueprint file (search the whole `design-system-blueprint/` folder).
- [ ] Every CSS variable referenced in §07–§10 is declared in §02 and §12.
- [ ] Every Tailwind utility referenced is real (not `[utility]`).
- [ ] Sizes are rem; line heights unitless; letter spacing em; durations ms.
- [ ] Cover (§00) metadata reflects the actual fills.
- [ ] Quick Reference (§12) matches §02 (colors), §03 (typography), §05 (radius).
- [ ] No table has gained or lost a column.
- [ ] No file added or removed.

If any item fails, fix or surface it — don't gloss over it.

---

## Tone for filled-in prose

The blueprint's voice is **direct, declarative, opinionated, and short**. When filling `[Usage]`, `[Notes]`, principles, or do/don't rules:

- One sentence. Imperative voice ("Use X for Y", not "X can be used for Y").
- Concrete, not aspirational. "Border-only elevation; shadows reserved for modals" beats "We aim for restrained elevation".
- No marketing language. No "delightful", "beautiful", "modern" — name the actual rule.
- No hedging. "Don't" means don't.

---

## Common requests and the right move

| Request                                          | Right move                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| "Add a new color"                                | Add it to §02 → §12 (`:root` + table) → reference in §07/§09/§10 wherever it applies.            |
| "Add a new button variant"                       | Add row to §09 variants table → add states to §07 Primary/Secondary section → cross-check §11.   |
| "Switch from light to dark mode"                 | New top-level theme; consider duplicating the blueprint or adding a parallel set of files. Ask first. |
| "Convert to non-Tailwind"                        | Rename `Tailwind` column header globally. Don't reshape.                                         |
| "Make it framework-agnostic"                     | Push back: the blueprint explicitly assumes Tailwind. Confirm the user wants a structural rewrite. |
| "Generate a Figma export / Storybook / tokens.json" | Out of scope unless explicitly added. Confirm before doing it.                                |
| "Shorten this"                                   | Tighten prose, never delete table rows or sections.                                              |

---

## Files outside `design-system-blueprint/`

- `README.md` — human-facing intro. Update if the blueprint's structure or framework assumptions change.
- `AGENTS.md` — this file. Update when invariants change.

If you change the blueprint's structure (rare, only on user instruction), update both `README.md` and `AGENTS.md` in the same change.
