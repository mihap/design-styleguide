# 4. Layout & Spacing

MailPilot uses Tailwind's 0.25rem spacing base so inbox density, panels, and setup flows align to one predictable rhythm.

---

## Spacing Scale

| Token | Value    | Tailwind | Common Uses                        |
|-------|----------|----------|------------------------------------|
| 0     | 0rem     | p-0      | Use for flush edges and resets.    |
| 0.5   | 0.125rem | p-0.5    | Use for hairline optical alignment. |
| 1     | 0.25rem  | p-1      | Use for icon nudges and tight gaps. |
| 1.5   | 0.375rem | p-1.5    | Use for compact badge padding.     |
| 2     | 0.5rem   | p-2      | Use for compact row gaps.          |
| 2.5   | 0.625rem | p-2.5    | Use for small control padding.     |
| 3     | 0.75rem  | p-3      | Use for default inner gaps.        |
| 4     | 1rem     | p-4      | Use for cards and default sections. |
| 5     | 1.25rem  | p-5      | Use for roomy cards and drawers.   |
| 6     | 1.5rem   | p-6      | Use for modal and page sections.   |
| 8     | 2rem     | p-8      | Use for onboarding panels.         |
| 10    | 2.5rem   | p-10     | Use for large empty states.        |
| 12    | 3rem     | p-12     | Use for major page separation.     |
| 16    | 4rem     | p-16     | Use for marketing-like setup blocks. |
| 20    | 5rem     | p-20     | Use only for full-page empty states. |
| 24    | 6rem     | p-24     | Use only for hero-scale spacing.   |

---

## Applied Spacing Reference

Use spacing tokens to balance inbox density with comfortable automation review screens.

### Button Padding

| Size          | Padding Y | Padding X | Height | Font Size |
|---------------|-----------|-----------|--------|-----------|
| xs            | 0.375rem token 1.5 | 0.625rem token 2.5 | 2rem token 8 | 0.75rem token Tiny |
| sm            | 0.5rem token 2 | 0.75rem token 3 | 2rem token 8 | 0.8125rem token Small |
| md (default)  | 0.625rem token 2.5 | 1rem token 4 | 2.5rem token 10 | 0.875rem token Body |
| lg            | 0.75rem token 3 | 1.25rem token 5 | 3rem token 12 | 1rem token Body Large |

### Input Field Spacing

| Size          | Padding Y | Padding X | Height | Font Size |
|---------------|-----------|-----------|--------|-----------|
| sm            | 0.5rem token 2 | 0.75rem token 3 | 2rem token 8 | 0.8125rem token Small |
| md (default)  | 0.625rem token 2.5 | 0.75rem token 3 | 2.5rem token 10 | 0.875rem token Body |
| lg            | 0.75rem token 3 | 1rem token 4 | 3rem token 12 | 1rem token Body Large |

### Surface Padding

| Surface             | Padding          | Gap (internal)    | Usage              |
|---------------------|------------------|-------------------|--------------------|
| Dropdown / popover  | 0.75rem p-3      | 0.5rem gap-2      | Use for compact action menus. |
| Modal content       | 1.5rem p-6       | 1rem gap-4        | Use for review and confirmation dialogs. |
| Drawer / sidebar    | 1rem p-4         | 0.75rem gap-3     | Use for persistent navigation and setup drawers. |
| Page section block  | 1.5rem p-6       | 1.5rem gap-6      | Use for dashboard and settings sections. |

### Card Spacing

| Variant      | Padding          | Gap (internal)   | Usage              |
|--------------|------------------|------------------|--------------------|
| Compact      | 0.75rem p-3      | 0.5rem gap-2     | Use for inbox row cards and metric chips. |
| Default      | 1rem p-4         | 0.75rem gap-3    | Use for standard panels. |
| Comfortable  | 1.5rem p-6       | 1rem gap-4       | Use for setup and review cards. |
| Spacious     | 2rem p-8         | 1.5rem gap-6     | Use for empty states and onboarding. |

### Page Layout Spacing

| Context                         | Value             | Notes                              |
|---------------------------------|-------------------|------------------------------------|
| Page margin (mobile)            | 1rem token 4      | Keep primary content off viewport edges. |
| Page margin (tablet)            | 1.5rem token 6    | Use for split-pane views.          |
| Page margin (desktop)           | max-width 80rem with px-6 | Center setup and settings pages. |
| Max content width               | 80rem max-w-7xl   | Use for dashboard content.         |
| Grid column gap                 | 1rem token 4      | Use for cards and dashboard columns. |
| Grid row gap                    | 1.5rem token 6    | Separate stacked content groups.   |
| Section gap                     | 2rem token 8      | Separate major page sections.      |
| Component gap (within section)  | 1rem token 4      | Separate related controls.         |
| Form field gap                  | 0.75rem token 3   | Keep labels and fields scannable.  |
| Inline gap (buttons, badges)    | 0.5rem token 2    | Use for compact action groups.     |

---

## Operational Guidance

- Use spacing tokens instead of one-off values across mailbox rows, panels, and setup screens.
- Keep compact density for inbox scanning and reserve spacious density for education or empty states.
- Check that side-by-side panels align on the same vertical rhythm.

## Operational DO

- Do use token 3 and token 4 as the default working rhythm.
- Do increase spacing before adding decorative dividers.

## Operational DON'T

- Do not use arbitrary pixel spacing for layout.
- Do not make dense inbox rows so tight that status, sender, and action labels collide.

## Local Decisions Made

- The base spacing unit is 0.25rem.
- Tables and inbox lists prefer compact or default density; onboarding screens may use spacious density.
