# Design System Blueprint

A fill-in-the-blanks template for documenting a product's visual design system. Drop your tokens into the placeholders and you have a complete, navigable styleguide covering color, typography, spacing, radius, elevation, component states, forms, buttons, feedback, do's & don'ts, and a quick reference.

The blueprint lives in [`design-system-blueprint/`](design-system-blueprint/) as twelve numbered Markdown files.

---

## What this is (and what it isn't)

**It is** a structured skeleton — tables, headings, and section ordering — battle-tested across modern UI systems. Every cell that requires a design decision is marked with a `[placeholder]`.

**It isn't** a generic, framework-free spec. The blueprint assumes:

- **Tailwind CSS** as the styling layer. Every spacing, radius, color, and typography table has a `Tailwind` column for the matching utility class.
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
| 03  | [`03-typography.md`](design-system-blueprint/03-typography.md)   | Font stack, weights, type scale, line height, letter spacing, do/don'ts |
| 04  | [`04-spacing-system.md`](design-system-blueprint/04-spacing-system.md) | Spacing scale + component spacing (buttons, inputs, cards, layout)    |
| 05  | [`05-border-radius.md`](design-system-blueprint/05-border-radius.md) | Radius scale + per-component radius                                   |
| 06  | [`06-shadows-elevation.md`](design-system-blueprint/06-shadows-elevation.md) | Shadow scale + elevation method per component                         |
| 07  | [`07-component-states.md`](design-system-blueprint/07-component-states.md) | Default / hover / focus / active / disabled / loading / error / success across button, input, checkbox, toggle |
| 08  | [`08-form-elements.md`](design-system-blueprint/08-form-elements.md) | Form layout, labels, helper/error text, input variations              |
| 09  | [`09-buttons.md`](design-system-blueprint/09-buttons.md)         | Variants, sizes, icon patterns, do/don'ts                             |
| 10  | [`10-feedback-alerts.md`](design-system-blueprint/10-feedback-alerts.md) | Alert variants, anatomy, toasts, badges                               |
| 11  | [`11-dos-donts.md`](design-system-blueprint/11-dos-donts.md)     | Cross-cutting rules: color, layout, interaction, hierarchy, a11y      |
| 12  | [`12-quick-reference.md`](design-system-blueprint/12-quick-reference.md) | One-page cheat sheet: theme variables, color, typography              |

The numbering is intentional — files are designed to be read in order, and many later sections reference earlier ones (e.g. button states in §07 reference color tokens defined in §02).

---

## How to use it

### 1. Starting a new design system

1. Copy `design-system-blueprint/` into your repo (or fork this one).
2. Decide your **theme metadata** first — name, light/dark mode, primary typeface, color format. Fill in `00-cover.md`.
3. Write the **philosophy** in `01-design-philosophy.md` before defining tokens. The constraints you set here drive everything else (e.g. "borders, not shadows" changes how `06-shadows-elevation.md` is filled).
4. Define **tokens** in `02-color-system.md`, `03-typography.md`, `04-spacing-system.md`, `05-border-radius.md`, `06-shadows-elevation.md`. These are the source of truth.
5. Apply tokens to **components** in `07–10`. Every cell here should reference a token, not a raw value.
6. Mirror the chosen tokens into `12-quick-reference.md` — this file is a derived view; keep it in sync.

### 2. Documenting an existing system

Work backwards: extract values from your `tailwind.config.*`, theme CSS, and component library, then drop them into the matching placeholders. The Quick Reference (§12) is a good starting point — its `:root` block maps directly to a DaisyUI theme.

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
| `[token]`             | A CSS variable or design token reference (e.g. `--color-primary`)    |
| `[utility]` / `[utility class]` | A Tailwind utility (e.g. `px-4`, `text-base`)              |
| `[Usage]` / `[Notes]` | Free prose; one short sentence is ideal                              |
| `[Don't rule — ...]`  | A specific rule. Keep one rule per bullet.                           |

When you finish a section, **no `[...]` brackets should remain**. A repo-wide search for `\[` quickly surfaces unfilled cells.

### Units

- All sizes in **rem**, not px. (`0.25rem`, not `4px`.)
- Line heights are **unitless** (`1.5`, not `24px`).
- Letter spacing in **em** (`-0.01em`).
- Durations in **ms** (`150ms ease-out`).

### Tables

Don't widen tables with extra columns mid-file — downstream tooling and reviewers expect the existing shape. If a column doesn't apply, fill it with `—`.

### Token names

Token references should match the names declared in `12-quick-reference.md` (`:root` block). If you rename `--color-primary` to `--brand-primary`, do it everywhere — including the per-component tables in §07–10.

---

## Authoring tips

- **Define philosophy first.** "Borders over shadows" or "muted semantic colors" are decisions that ripple through later tables. Write `01` before `06` or `02`.
- **One primary action per view.** §09 and §11 both repeat this; if your filled-in version contradicts itself, your designers will too.
- **Resist new colors.** Every accent or semantic color you add multiplies the state matrix in §07. The blueprint is opinionated about restraint for a reason.
- **The Quick Reference is the contract.** When in doubt, treat §12 as the authoritative token list and propagate from there.
- **Keep it short.** Every cell is a sentence at most. The blueprint earns its weight by being scannable.

---

## Maintenance

- Bump the version in `00-cover.md` and `12-quick-reference.md` together when tokens change.
- When you add a new component variant, update both its dedicated section (e.g. §09 for a new button variant) **and** §07 component states.
- Run a "no `[`" check before tagging a release — leftover placeholders mean the system is incomplete.

---

## License & credits

This blueprint is intentionally framework-light: Tailwind utilities and DaisyUI variable names are the only specific assumptions. Rename, extend, or strip those if your stack differs — the structure carries the value.
