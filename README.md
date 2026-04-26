# Design System Blueprint

A fill-in-the-blanks template for documenting a product's visual design system. Drop your tokens into the placeholders and you have a complete, navigable styleguide covering color, typography, layout, spacing, radius, elevation, component states, forms, buttons, navigation, tables, feedback, and a quick reference.

The blueprint lives in [`design-system-blueprint/`](design-system-blueprint/) as numbered Markdown files.

Appendix sidecars live in [`design-system-blueprint-appendices/`](design-system-blueprint-appendices/).

---

## What this is (and what it isn't)

**It is** a structured skeleton — tables, headings, and section ordering — battle-tested across modern UI systems. Every cell that requires a design decision is marked with a `[placeholder]`.

**It isn't** a generic, framework-free spec. The blueprint assumes:

- **Tailwind CSS** as the styling layer. Core token and scale tables for spacing, radius, color, and typography include Tailwind-friendly utility references where they are useful.
- **CSS custom properties** for theme tokens, named in the [DaisyUI](https://daisyui.com/) convention (`--color-primary`, `--color-base-100`, `--color-primary-content`, `--radius-field`, `--radius-box`, `--radius-selector`, `--size-field`, `--border`, `--depth`, `--noise`). DaisyUI itself is optional — but the variable names give you a working theme in DaisyUI without reshaping the doc.
- **A modern color space**. The Quick Reference includes both HEX and OKLCH columns; the Color System file lets you pick the format you publish.
- **rem-based sizing**. All numeric size placeholders are written as `[rem]` to keep things accessible and predictable.

If your stack is different (vanilla CSS, CSS-in-JS, a different utility framework), you can still use the blueprint — just rename the `Tailwind` columns and adjust token names. The structure is the value.

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
| 13  | [`13-quick-reference.md`](design-system-blueprint/13-quick-reference.md) | One-page cheat sheet: theme variables, color, typography              |

The numbering is intentional — files are designed to be read in order, and many later sections reference earlier ones (e.g. button states in §07 reference color tokens defined in §02).

---

## Best-Practices Appendices

The numbered blueprint remains the canonical design-system template. The appendix sidecars in `design-system-blueprint-appendices/` supplement chapters `02` through `12` with self-contained operational guidance.

- Appendices mirror blueprint chapters `02–12` only.
- `13-quick-reference.md` stays derived-only and has no appendix by default.
- Appendix files are sidecars, not replacement chapters.
- Appendix files are ordinary documentation, so placeholder validation should stay scoped to `design-system-blueprint/`.

---

## How to use it

### 1. Starting a new design system

1. Copy `design-system-blueprint/` into your repo (or fork this one).
2. Decide your **theme metadata** first — name, light/dark mode, primary typeface, color format. Fill in `00-cover.md`.
3. Write the **philosophy** in `01-design-philosophy.md` before defining tokens. The constraints you set here drive everything else (e.g. "borders, not shadows" changes how `06-shadows-elevation.md` is filled).
4. Define **tokens** in `02-color-system.md`, `03-typography.md`, `04-spacing-system.md`, `05-border-radius.md`, `06-shadows-elevation.md`. These are the source of truth.
5. Apply tokens to **components** in `07–12`. Every cell here should reference a token, not a raw value.
6. Mirror the chosen tokens into `13-quick-reference.md` — this file is a derived view; keep it in sync.

### 2. Documenting an existing system

Work backwards: extract values from your `tailwind.config.*`, theme CSS, and component library, then drop them into the matching placeholders. The Quick Reference (§13) is a good starting point — its `:root` block maps directly to a DaisyUI theme.

### 3. Adapting to a non-Tailwind stack

Rename the `Tailwind` column to match your system (e.g. `Class`, `Token`, `SCSS variable`). Keep the rest of the structure — the value of the blueprint is the categories, not the column headers.

---

## Conventions

### Placeholders

Every authorable value is wrapped in square brackets:

| Pattern               | Means                                                                |
| --------------------- | -------------------------------------------------------------------- |
| `[value]`             | A literal token value (HEX, OKLCH, font name)                        |
| `[rem]`               | A length in rem (e.g. `0.25rem`, `1.5rem`)                           |
| `[px]`                | A hairline length in px (borders, rings, dividers — e.g. `1px`)      |
| `[token]`             | A CSS variable or design token reference (e.g. `--color-primary`)    |
| `[utility]` / `[utility class]` | A Tailwind utility (e.g. `px-4`, `text-base`)              |
| `[Usage]` / `[Notes]` | Free prose; one short sentence is ideal                              |

When you finish a blueprint section, **no `[...]` brackets should remain**. Search within `design-system-blueprint/` rather than the whole repo, because appendix markdown is ordinary documentation and is not subject to placeholder validation.

### Units

- Spacing, font sizes, and radii in **rem** (`0.25rem`, not `4px`).
- Borders, rings, and dividers in **px** (`1px`) — matches Tailwind's hairline convention.
- Line heights are **unitless** (`1.5`, not `24px`).
- Letter spacing in **em** (`-0.01em`).
- Durations in **ms** (`150ms ease-out`).

### Tables

Don't widen tables with extra columns mid-file — downstream tooling and reviewers expect the existing shape. If a column doesn't apply, fill it with `—`.

### Token names

Token references should match the names declared in `13-quick-reference.md` (`:root` block). If you rename `--color-primary` to `--brand-primary`, do it everywhere — including the per-component tables in §07–12.

---

## Authoring tips

- **Define philosophy first.** "Borders over shadows" or "muted semantic colors" are decisions that ripple through later tables. Write `01` before `06` or `02`.
- **One primary action per view.** Make hierarchy clear across buttons, navigation, and alerts so multiple elements do not compete for attention.
- **Resist new colors.** Every accent or semantic color you add multiplies the state matrix in §07. The blueprint is opinionated about restraint for a reason.
- **The Quick Reference is the contract.** When in doubt, treat §13 as the authoritative token list and propagate from there.
- **Keep it short.** Every cell is a sentence at most. The blueprint earns its weight by being scannable.

---

## Maintenance

- Bump the version in `00-cover.md` and `13-quick-reference.md` together when tokens change.
- When you add a new component variant, update both its dedicated section (e.g. §09 for a new button variant, §10 for a navigation pattern, §11 for a table variant) **and** §07 component states when the state treatment changes.
- Run a "no `[`" check before tagging a release — leftover placeholders mean the system is incomplete.

---

## License & credits

This blueprint is intentionally framework-light: Tailwind utilities and DaisyUI variable names are the only specific assumptions. Rename, extend, or strip those if your stack differs — the structure carries the value.
