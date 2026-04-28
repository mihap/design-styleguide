# 9. Buttons

MailPilot buttons communicate action priority, automation confidence, and safe recovery across dense operations screens.

---

## Button Variants

| Variant     | Background    | Text          | Border             | Usage                          |
|-------------|---------------|---------------|--------------------|--------------------------------|
| Primary     | --mp-color-primary | --mp-color-primary-content | --mp-color-primary | Use for recommended next actions. |
| Secondary   | --mp-color-secondary | --mp-color-secondary-content | --mp-color-secondary | Use for team routing and assignment. |
| Outline     | --mp-color-base-100 | --mp-color-base-content | --mp-color-base-300 1px | Use for secondary actions in dense toolbars. |
| Ghost       | transparent | --mp-color-base-content | transparent | Use for low-emphasis row actions. |
| Link        | transparent | --mp-color-primary | transparent | Use for inline navigation and details. |
| Destructive | --mp-color-error | --mp-color-error-content | --mp-color-error | Use for deletion and irreversible automation changes. |

---

## Button Sizes

Geometry (height, padding, font size) is defined in chapter 04 Layout & Spacing → Button Padding. This section adds icon sizing and per-size usage guidance.

| Size         | Icon Size | Usage                  |
|--------------|-----------|------------------------|
| xs           | 0.875rem  | Use in table rows and compact badges. |
| sm           | 1rem      | Use in toolbars and filters. |
| md (default) | 1.125rem  | Use for most product actions. |
| lg           | 1.25rem   | Use for onboarding and empty states. |

---

## Button with Icons

| Pattern     | Icon Placement  | Gap              | Usage Example           |
|-------------|-----------------|------------------|-------------------------|
| Icon + Text | Icon before label | 0.5rem gap-2   | Automate, Assign, Reply |
| Text + Icon | Icon after label  | 0.5rem gap-2   | Continue, Open mailbox  |
| Icon only   | Center icon with accessible label | No gap | More actions, close, search |

---

## Icon-Only Button Sizes

| Size | Dimensions      | Icon Size  | Padding |
|------|-----------------|------------|---------|
| xs   | 2rem × 2rem     | 0.875rem  | p-1.5 |
| sm   | 2rem × 2rem     | 1rem      | p-2 |
| md   | 2.5rem × 2.5rem | 1.125rem  | p-2.5 |
| lg   | 3rem × 3rem     | 1.25rem   | p-3 |

---

## Operational Guidance

- Use one primary button per decision area.
- Make destructive actions visually distinct and require confirmation when irreversible.
- Keep icon-only buttons accessible with labels and predictable hit areas.

## Operational DO

- Do use button size to match workflow importance.
- Do keep primary labels action-oriented and specific.

## Operational DON'T

- Do not place multiple primary buttons in the same toolbar.
- Do not use color-only icon buttons without accessible labels.

## Local Decisions Made

- The canonical button icon-size scale is xs, sm, md, and lg in this chapter.
- Primary buttons are reserved for automation, reply, and setup completion actions.
