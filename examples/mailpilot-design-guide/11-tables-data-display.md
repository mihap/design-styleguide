# 11. Tables & Data Display

MailPilot data views balance mailbox density, SLA urgency, and automation transparency without losing scan hierarchy.

---

## Table Anatomy

| Element              | Specification         | Notes                              |
|----------------------|-----------------------|------------------------------------|
| Header row           | 2.5rem height with text-xs font-semibold tracking-wider | Use uppercase labels sparingly. |
| Header cell padding  | 0.75rem px-3          | Align with compact cards.          |
| Body cell padding    | 0.75rem px-3          | Keep table scanning comfortable.   |
| Row height           | 3rem token 12         | Use for default mailbox tables.    |
| Column alignment     | Text left, numbers right, status center | Keep metric comparisons fast. |
| Selection cell       | 2.5rem width          | Keep checkbox column stable.       |
| Sort indicator       | 1rem icon with 0.25rem gap | Place after header label.      |
| Row action cell      | 3rem width, right aligned | Use icon-only action menu.      |
| Footer / pagination  | Flex row with range left and controls right | Stack on mobile. |

---

## Density & Spacing

Tables cap at Comfortable density to keep scanning fast under data load; reserve Spacious, defined for cards in chapter 04, for surfaces that prioritize visual breathing room over scanability.

| Density       | Row Height   | Cell Padding X     | Cell Padding Y     | Usage                          |
|---------------|--------------|--------------------|--------------------|--------------------------------|
| Compact       | 2rem token 8    | 0.5rem px-2      | 0.375rem py-1.5    | Use for audit logs and side panes. |
| Default       | 3rem token 12   | 0.75rem px-3     | 0.5rem py-2        | Use for mailbox and customer tables. |
| Comfortable   | 4rem token 16   | 1rem px-4        | 0.75rem py-3       | Use for setup review tables.   |

---

## Row & Cell States

| State         | Background    | Border / Divider   | Text               | Notes                          |
|---------------|---------------|--------------------|--------------------|--------------------------------|
| Default       | --mp-color-base-100 | --mp-color-base-300 1px | --mp-color-base-content | Use for normal rows. |
| Hover         | --mp-color-base-200 | --mp-color-base-300 1px | --mp-color-base-content | Use for pointer discovery. |
| Focus         | --mp-color-base-200 | 2px primary focus ring | --mp-color-base-content | Keep row actions visible. |
| Selected      | primary 10% tint | --mp-color-primary 1px | --mp-color-base-content | Use for batch actions. |
| Expanded      | --mp-color-base-200 | --mp-color-base-300 1px | --mp-color-base-content | Reveal detail panel below. |
| Error         | error 8% tint | --mp-color-error 1px | --mp-color-base-content | Use for failed sync rows. |

---

## Data States

| State          | Message / Layout Rule      | Supporting Element      | Action Rule                 | Notes                          |
|----------------|----------------------------|-------------------------|-----------------------------|--------------------------------|
| Empty          | Centered card with one-line headline | Inbox tray icon | Primary setup CTA | Use when mailbox has no data. |
| Loading        | Preserve table shape       | Skeleton rows           | Non-blocking when possible   | Keep header visible.           |
| No results     | Inline message above empty table | Filter summary       | Reset filters link           | Preserve current query.        |
| Error          | Inline alert at table top  | Error icon              | Retry button                 | Keep stale data visible when safe. |
| Truncated cell | Single-line ellipsis       | Tooltip on hover and focus | Open detail on click       | Never truncate status labels.  |

---

## Responsive Data Display

| Context                | Fallback Rule           | Notes                              |
|------------------------|-------------------------|------------------------------------|
| Horizontal overflow    | Use scroll container with sticky header | Preserve columns on tablet. |
| Column priority        | Keep sender, subject, status, owner, SLA | Hide low-value metadata first. |
| Stacked mobile rows    | Convert rows to cards   | Show labels for hidden headers.    |
| Inline filters         | Collapse into filter drawer | Keep active filter chips visible. |
| Sticky first column    | Pin sender or mailbox column | Use when horizontal scroll is required. |
| Summary-card fallback  | Use cards for mobile dashboards | Keep same tokens as tables. |

---

## Operational Guidance

- Keep the most important columns visible before preserving table width.
- Use status, owner, and SLA columns consistently across mailbox views.
- Preserve row height predictability so users can scan bulk queues.

## Operational DO

- Do use skeleton rows instead of layout-shifting spinners.
- Do make retry actions local to the failing data region.

## Operational DON'T

- Do not hide row status behind hover-only actions.
- Do not truncate message subject and sender at the same time.

## Local Decisions Made

- Mailbox tables use default density by default.
- Mobile data views convert to labeled summary cards below tablet width.
