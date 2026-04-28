# Design System Blueprint

A fill-in-the-blanks template for documenting a product's visual design system. Drop your tokens into the placeholders and you have a complete, navigable styleguide covering color, typography, layout, spacing, radius, elevation, component states, forms, buttons, navigation, tables, and feedback.

The blueprint lives in [`design-system-blueprint/`](design-system-blueprint/) as numbered Markdown files.

Appendix sidecars live in [`design-system-blueprint-appendices/`](design-system-blueprint-appendices/).

---

## What this is (and what it isn't)

**It is** a structured skeleton — tables, headings, and section ordering — for documenting modern UI systems. Every cell that requires a design decision is marked with a `[placeholder]`.

**It is Tailwind-oriented, not component-framework-specific.** The blueprint assumes:

- **Tailwind CSS** utility conventions for spacing, typography, borders, shadows, and state styling.
- **Framework-agnostic tokens.** CSS custom properties may be used for theme tokens, but token names are project-defined. Do not introduce non-Tailwind component, runtime, or token-framework assumptions unless the source system already uses them.
- **A chosen color format.** The Color System file lets you publish HEX, RGB, HSL, OKLCH, or another explicit format.
- **Tailwind unit conventions.** Spacing, font sizes, and radii normally use rem or declared tokens; borders, rings, and dividers use px; line heights are unitless; letter spacing uses em; durations use ms; opacity/depth/noise-style controls use unitless numbers.

If your styling stack is different, confirm the intended conversion first. The table structure is the value; the `Tailwind` columns can be renamed only as part of an explicit adaptation.

---

## What's inside

| #   | File                                                             | Covers                                                                |
| --- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| 00  | [`00-cover.md`](design-system-blueprint/00-cover.md)             | Title, theme metadata, table of contents                              |
| 01  | [`01-design-philosophy.md`](design-system-blueprint/01-design-philosophy.md) | Core principles, theme posture, design constraints                    |
| 02  | [`02-color-system.md`](design-system-blueprint/02-color-system.md) | Primary, base, neutral, semantic colors + text/bg/border usage tables |
| 03  | [`03-typography.md`](design-system-blueprint/03-typography.md)   | Font stack, weights, type scale, line height, letter spacing           |
| 04  | [`04-spacing-system.md`](design-system-blueprint/04-spacing-system.md) | Layout spacing + applied spacing for buttons, inputs, surfaces, cards, and pages |
| 05  | [`05-border-radius.md`](design-system-blueprint/05-border-radius.md) | Radius scale + per-component radius                                   |
| 06  | [`06-shadows-elevation.md`](design-system-blueprint/06-shadows-elevation.md) | Shadow scale + elevation method per component                         |
| 07  | [`07-component-states.md`](design-system-blueprint/07-component-states.md) | Default / hover / focus / active / disabled / loading / error / success across button, input, checkbox, toggle |
| 08  | [`08-form-elements.md`](design-system-blueprint/08-form-elements.md) | Form layout, labels, helper/error text, input variations, selection controls |
| 09  | [`09-buttons.md`](design-system-blueprint/09-buttons.md)         | Variants, sizes, icon patterns                                        |
| 10  | [`10-navigation.md`](design-system-blueprint/10-navigation.md)   | Navigation patterns, anatomy, states, responsive behavior             |
| 11  | [`11-tables-data-display.md`](design-system-blueprint/11-tables-data-display.md) | Table anatomy, density, states, responsive data display               |
| 12  | [`12-feedback-alerts.md`](design-system-blueprint/12-feedback-alerts.md) | Alert variants, anatomy, toasts, badges                               |

The numbering is intentional — files are designed to be read in order, and later sections reference earlier token decisions.

---

## Best-Practices Appendices

The numbered blueprint remains the canonical design-system template. The appendix sidecars in `design-system-blueprint-appendices/` supplement chapters `02` through `12` with self-contained operational guidance.

- Appendices mirror blueprint chapters `02–12` only.
- Appendix files are sidecars, not replacement chapters.
- Appendix files are ordinary documentation, so placeholder validation should stay scoped to `design-system-blueprint/`.

---

## How to use it

### 1. Starting a new design system

1. Copy `design-system-blueprint/` into your repo (or fork this one).
2. Decide your **theme metadata** first — name, light/dark mode, primary typeface, styling stack, color format. Fill in `00-cover.md`.
3. Write the **philosophy** in `01-design-philosophy.md` before defining tokens. The constraints you set here drive everything else (e.g. "borders, not shadows" changes how `06-shadows-elevation.md` is filled).
4. Define **tokens and scales** in `02-color-system.md`, `03-typography.md`, `04-spacing-system.md`, `05-border-radius.md`, and `06-shadows-elevation.md`. These files are the source of truth.
5. Apply tokens to **components** in `07–12`. Every value-bearing specification should reference a token or declared scale where applicable.

### 2. Documenting an existing system

Work backwards: extract values from your `tailwind.config.*`, theme CSS, design-token files, and component implementation entry points, then drop them into the matching placeholders.

### 3. Adapting to a non-Tailwind stack

Confirm the conversion first. If approved, rename the `Tailwind` column to match your system (e.g. `Class`, `Token`, `SCSS variable`) and keep the rest of the structure intact.

---

## AI generation workflow

The intended agent workflow is:

1. Create a guide workspace with `node scripts/create-guide.mjs "Product Name" --examples` or a custom output directory.
2. Fill the generated markdown from user direction and supplied source material.
3. Merge appendix guidance with `node scripts/merge-appendices.mjs <guide-dir>` after local decisions are resolved.
4. Build the Tailwind export with `node scripts/build-tailwind-export.mjs <guide-dir> --build`.
5. Build the deterministic demo with `node scripts/build-demo.mjs <guide-dir>`.
6. Run the quality gate with `node templates/validators/validate-all.mjs <guide-dir>`.

Reusable intake templates live in `templates/intake/`, reusable review prompts live in `templates/review/`, reusable validators live in `templates/validators/`, reusable demo templates live in `templates/demo/`, and committed generated examples live in `examples/`.

---

## Conventions

### Placeholders

Every authorable value is wrapped in square brackets:

| Pattern               | Means                                                                |
| --------------------- | -------------------------------------------------------------------- |
| `[value]`             | A literal token value (HEX, OKLCH, font name)                        |
| `[rem]`               | A rem length (e.g. `0.25rem`, `1.5rem`)                              |
| `[px]`                | A hairline length in px (borders, rings, dividers — e.g. `1px`)      |
| `[number]`            | A unitless numeric value (e.g. opacity, depth, noise)                |
| `[unitless]`          | A unitless line-height value (e.g. `1.5`)                            |
| `[em]`                | A letter-spacing value (e.g. `-0.01em`)                              |
| `[ms]`                | A duration in milliseconds (e.g. `150ms`)                            |
| `[token]`             | A CSS variable or design token reference                             |
| `[utility]` / `[utility class]` | A Tailwind utility (e.g. `px-4`, `text-base`)              |
| `[Usage]` / `[Notes]` | Free prose; one short sentence is ideal                              |

When you finish a blueprint section, **no `[...]` brackets should remain**. Search within `design-system-blueprint/` rather than the whole repo, because appendix markdown is ordinary documentation and is not subject to placeholder validation. Use plain `—` for intentional not-applicable values; never use `[—]` in completed work.

### Units

- Spacing, font sizes, and radii use **rem** or declared tokens (`0.25rem`, not `4px`).
- Borders, rings, and dividers use **px** (`1px`) — matches Tailwind's hairline convention.
- Line heights are **unitless** (`1.5`, not `24px`).
- Letter spacing uses **em** (`-0.01em`).
- Durations use **ms** (`150ms ease-out`).
- Opacity, depth, and noise-style controls use **unitless numbers**.

### Tables

Don't widen tables with extra columns mid-file — downstream tooling and reviewers expect the existing shape. If a column doesn't apply, fill it with `—`.

### Token names

Token references should match the names declared in their source chapter. If you rename a token, do it everywhere it appears — including the per-component tables in `07–12`.

### Button icon sizes

Button icon sizes are declared in `09-buttons.md` → `Button Sizes` as the `Size | Icon Size | Usage` table with `xs`, `sm`, `md (default)`, and `lg` rows. Keep icon-only button sizes aligned with those rows.

---

## Authoring tips

- **Define philosophy first.** "Borders over shadows" or "muted semantic colors" are decisions that ripple through later tables. Write `01` before `06` or `02`.
- **One primary action per view.** Make hierarchy clear across buttons, navigation, and alerts so multiple elements do not compete for attention.
- **Resist new colors.** Every accent or semantic color you add multiplies the state matrix in `07`. The blueprint is opinionated about restraint for a reason.
- **Treat token chapters as the contract.** Colors live in `02`, typography in `03`, spacing in `04`, radius in `05`, and elevation in `06`.
- **Keep it short.** Every cell is a sentence at most. The blueprint earns its weight by being scannable.

---

## Maintenance

- Bump the version in `00-cover.md` when token or structure changes are released.
- When you add a new component variant, update both its dedicated section (e.g. `09` for a new button variant, `10` for a navigation pattern, `11` for a table variant) **and** `07` component states when the state treatment changes.
- Run a "no `[`" check before tagging a release — leftover placeholders mean the system is incomplete.
- Keep Tailwind as the only framework-specific assumption unless the user explicitly asks for another framework integration.

---

## License & credits

Private license. This repository is not open source; see [`LICENSE`](LICENSE). Tailwind utilities are the only framework-specific assumption in the blueprint.
