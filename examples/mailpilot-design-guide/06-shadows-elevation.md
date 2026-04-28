# 6. Shadows & Elevation

MailPilot uses borders and background steps for most depth; shadows appear only when a surface floats above mailbox content.

---

## Shadow Scale

| Level | Tailwind        | CSS Value                       | Usage                           |
|-------|-----------------|---------------------------------|---------------------------------|
| None  | shadow-none     | none                            | Use for inline rows and flat panels. |
| XS    | shadow-xs       | 0 1px 2px rgb(15 23 42 / 0.05) | Use for subtle cards over base. |
| SM    | shadow-sm       | 0 1px 3px rgb(15 23 42 / 0.08), 0 1px 2px rgb(15 23 42 / 0.04) | Use for sticky toolbars. |
| MD    | shadow-md       | 0 8px 20px rgb(15 23 42 / 0.10) | Use for dropdowns and popovers. |
| LG    | shadow-lg       | 0 16px 36px rgb(15 23 42 / 0.14) | Use for modals and drawers. |
| XL    | shadow-xl       | 0 24px 56px rgb(15 23 42 / 0.18) | Use for rare blocking overlays. |

---

## Elevation Guidelines

Use border-first elevation so dense mailbox views remain calm and shadows signal actual floating surfaces.

| Component            | Elevation Method              | Notes                           |
|----------------------|-------------------------------|---------------------------------|
| Cards (default)      | border border-base-300 shadow-none | Use for dashboard panels. |
| Cards (elevated)     | border border-base-300 shadow-xs | Use when a card overlaps another surface. |
| Dropdowns            | border border-base-300 shadow-md | Use for floating action menus. |
| Modals               | shadow-lg with backdrop       | Use for blocking review and confirmation. |
| Tooltips             | shadow-sm on neutral fill     | Keep short and close to trigger. |
| Popovers             | border border-base-300 shadow-md | Use for filters and automation previews. |
| Sticky headers       | border-b border-base-300 shadow-sm | Use only when content scrolls beneath. |
| Floating action btn  | shadow-md                     | Use sparingly for one contextual action. |

---

## Operational Guidance

- Prefer borders and background steps before shadows.
- Use low-opacity layered shadows that never become the strongest separator on the surface.
- Escalate depth only for menus, popovers, drawers, and modals.

## Operational DO

- Do use shadow to communicate overlap and blocking behavior.
- Do pair elevated surfaces with clear borders when they sit over dense content.

## Operational DON'T

- Do not use heavy pure-black shadows.
- Do not shadow every card on dashboard pages.

## Local Decisions Made

- Default cards are border-only.
- Modals, dropdowns, popovers, and sticky headers are the only default surfaces allowed to use shadows.
