# 5. Border Radius

MailPilot uses soft but restrained radii: approachable enough for SMB teams, precise enough for automation and operations work.

---

## Border Radius Scale

| Token   | Value     | Tailwind   | CSS Variable      | Usage                               |
|---------|-----------|------------|-------------------|-------------------------------------|
| none    | 0rem      | rounded-none | —               | Use for flush table dividers.       |
| sm      | 0.25rem   | rounded-sm | --mp-radius-sm    | Use for tags inside dense rows.     |
| default | 0.375rem  | rounded    | --mp-radius-default | Use for compact controls.        |
| md      | 0.5rem    | rounded-md | --mp-radius-md    | Use for buttons and inputs.         |
| lg      | 0.75rem   | rounded-lg | --mp-radius-lg    | Use for cards and menus.            |
| xl      | 1rem      | rounded-xl | --mp-radius-xl    | Use for modals and large panels.    |
| 2xl     | 1.5rem    | rounded-2xl | --mp-radius-2xl  | Use for empty states and hero panels. |
| full    | 9999px    | rounded-full | --mp-radius-full | Use for pills, avatars, and toggles. |

---

## Component-Specific Radii

| Component     | Radius             | Notes                                   |
|---------------|--------------------|-----------------------------------------|
| Buttons       | 0.5rem token md     | Use consistent rounded controls.        |
| Input fields  | 0.5rem token md     | Match buttons for form rhythm.          |
| Cards         | 0.75rem token lg    | Use soft separation without toy-like corners. |
| Modals        | 1rem token xl       | Use larger radius for elevated surfaces. |
| Dropdowns     | 0.75rem token lg    | Match cards and popovers.               |
| Tooltips      | 0.375rem token default | Keep tooltips compact.              |
| Badges        | 9999px token full   | Use pills for status and ownership.     |
| Avatar        | 9999px token full   | Keep people and team marks circular.    |
| Pill buttons  | 9999px token full   | Use only for filters and segmented picks. |
| Progress bars | 9999px token full   | Keep progress tracks smooth.            |

---

## Operational Guidance

- Use one shared radius scale and allow only adjacent-step changes between related components.
- Reserve full radius for pills, avatars, toggles, and progress bars.
- Match control radius across buttons, inputs, and selects.

## Operational DO

- Do keep cards, dropdowns, and popovers visually related.
- Do use radius to support hierarchy, not brand decoration.

## Operational DON'T

- Do not mix sharp and round controls in the same workflow.
- Do not use full radius on standard rectangular cards.

## Local Decisions Made

- MailPilot's default control radius is 0.5rem.
- Full radius is allowed only for pills, avatars, toggles, and progress tracks.
