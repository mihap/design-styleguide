# 2. Color System

MailPilot uses OKLCH tokens so automation states stay vivid without losing contrast across dense mailbox screens.

---

## Primary Colors

Primary colors carry automation trust, recommended actions, and branded emphasis.

| Color             | Value                   | CSS Variable                 | Usage                             |
|-------------------|-------------------------|------------------------------|-----------------------------------|
| Primary           | oklch(0.58 0.20 265)    | --mp-color-primary           | Use for recommended automation actions. |
| Primary Content   | oklch(0.99 0.01 265)    | --mp-color-primary-content   | Use for text and icons on primary fills. |
| Secondary         | oklch(0.70 0.15 205)    | --mp-color-secondary         | Use for routing, team, and assignment actions. |
| Secondary Content | oklch(0.16 0.04 220)    | --mp-color-secondary-content | Use for text and icons on secondary fills. |
| Accent            | oklch(0.76 0.17 70)     | --mp-color-accent            | Use for AI suggestions, highlights, and new insights. |
| Accent Content    | oklch(0.20 0.05 55)     | --mp-color-accent-content    | Use for text and icons on accent fills. |

---

## Base Colors

Base colors create a layered workspace for mailbox lists, detail panes, and automation panels.

| Color        | Value                   | CSS Variable              | Usage                                         |
|--------------|-------------------------|---------------------------|-----------------------------------------------|
| Base 100     | oklch(0.99 0.006 250)   | --mp-color-base-100       | Use for page backgrounds and quiet panels.    |
| Base 200     | oklch(0.965 0.014 250)  | --mp-color-base-200       | Use for list rows, subtle fills, and hovers.  |
| Base 300     | oklch(0.91 0.025 250)   | --mp-color-base-300       | Use for borders, dividers, and separators.    |
| Base Content | oklch(0.22 0.035 260)   | --mp-color-base-content   | Use for headings, body text, and icons.       |

---

## Neutral Colors

Neutral colors support overlays, tooltips, command menus, and durable emphasis.

| Color           | Value                   | CSS Variable                 | Usage                                       |
|-----------------|-------------------------|------------------------------|---------------------------------------------|
| Neutral         | oklch(0.30 0.04 260)    | --mp-color-neutral           | Use for tooltips, command surfaces, and dark badges. |
| Neutral Content | oklch(0.98 0.006 250)   | --mp-color-neutral-content   | Use for text and icons on neutral surfaces. |

---

## Semantic Colors

Semantic colors communicate mailbox health and operational risk with moderate saturation.

| Color   | Value                   | CSS Variable             | Usage                                    | Content Color                 |
|---------|-------------------------|--------------------------|------------------------------------------|-------------------------------|
| Info    | oklch(0.68 0.15 245)    | --mp-color-info          | Use for system notices and mailbox tips. | --mp-color-info-content       |
| Success | oklch(0.70 0.16 150)    | --mp-color-success       | Use for completed automation and valid setup. | --mp-color-success-content |
| Warning | oklch(0.78 0.16 85)     | --mp-color-warning       | Use for SLA risk and pending review.     | --mp-color-warning-content    |
| Error   | oklch(0.64 0.20 25)     | --mp-color-error         | Use for failed automation and destructive actions. | --mp-color-error-content |

---

## Semantic Content Colors

Semantic content tokens keep text and icons readable on status fills.

| Color           | Value                   | CSS Variable                    | Usage                                  |
|-----------------|-------------------------|---------------------------------|----------------------------------------|
| Info Content    | oklch(0.16 0.05 245)    | --mp-color-info-content         | Use for text and icons on info fills.  |
| Success Content | oklch(0.16 0.05 150)    | --mp-color-success-content      | Use for text and icons on success fills. |
| Warning Content | oklch(0.20 0.05 75)     | --mp-color-warning-content      | Use for text and icons on warning fills. |
| Error Content   | oklch(0.99 0.01 25)     | --mp-color-error-content        | Use for text and icons on error fills. |

---

## Color Usage Guidelines

### Text Colors

| Context                                    | Color                       | Opacity / Variant     |
|--------------------------------------------|-----------------------------|-----------------------|
| Primary text (headings, body)              | --mp-color-base-content     | 100%                  |
| Secondary text (descriptions, captions)    | --mp-color-base-content     | 70%                   |
| Disabled text                              | --mp-color-base-content     | 40%                   |
| Placeholder text                           | --mp-color-base-content     | 45%                   |
| Links                                      | --mp-color-primary          | 100%                  |
| Link hover                                 | --mp-color-primary          | 88% plus underline    |
| Error text                                 | --mp-color-error            | 100%                  |
| Success text                               | --mp-color-success          | 100%                  |

### Background Colors

| Context                   | Color                   | Notes                              |
|---------------------------|-------------------------|------------------------------------|
| Page background           | --mp-color-base-100     | Use for the app shell canvas.      |
| Card / panel background   | --mp-color-base-100     | Use with a base-300 border.        |
| Sidebar / nav background  | --mp-color-base-200     | Use for persistent navigation.     |
| Hover state (rows, items) | --mp-color-base-200     | Use for non-selected hover states. |
| Selected / active state   | --mp-color-primary      | Use at 10% tint for selected rows. |
| Modal backdrop            | --mp-color-neutral      | Use at 45% opacity behind dialogs. |
| Tooltip background        | --mp-color-neutral      | Use with neutral content text.     |

### Border Colors

| Context                         | Color                   | Width   |
|---------------------------------|-------------------------|---------|
| Default borders (cards, inputs) | --mp-color-base-300     | 1px     |
| Subtle dividers                 | --mp-color-base-300     | 1px     |
| Strong dividers (sections)      | --mp-color-neutral      | 1px     |
| Focus rings                     | --mp-color-primary      | 2px     |
| Error borders                   | --mp-color-error        | 1px     |
| Success borders                 | --mp-color-success      | 1px     |

---

## Operational Guidance

- Reserve the strongest saturation for the recommended action or the most urgent workflow state.
- Step lightness between canvas, rows, cards, drawers, and hovers before inventing another hue.
- Pair every status background, border, and badge with its content token.
- Test essential text, icon, border, and state pairings against WCAG 2.1 AA before release.

## Operational DO

- Use color to clarify hierarchy before adding heavier visual separation.
- Test semantic and surface pairings inside real mailbox screens.

## Operational DON'T

- Do not add decorative hues that do not map to action, ownership, urgency, or automation state.
- Do not ship semantic colors whose text, borders, or icons become hard to read in context.

## Local Decisions Made

- MailPilot uses four semantic families: info, success, warning, and error.
- Dark mode is deferred; semantic tokens must keep their role names so a future dark theme can remap values without table changes.
