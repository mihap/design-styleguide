# 10. Navigation

MailPilot navigation keeps mailbox orientation, automation settings, and team workflows available without competing with the message list.

---

## Navigation Patterns

| Pattern         | Usage                               | Desktop Layout           | Mobile Layout            | Notes                          |
|-----------------|-------------------------------------|--------------------------|--------------------------|--------------------------------|
| Global header   | Use for workspace switcher and account actions. | 4rem height with search centered | Collapses to top bar | Keep persistent but quiet. |
| Sidebar / rail  | Use for primary product areas.      | 16rem sidebar with grouped items | Drawer from left | Show counts for inbox and review. |
| Local tabs      | Use for mailbox states and settings groups. | Horizontal row under header | Scrollable tabs | Keep labels short. |
| Breadcrumbs     | Use for nested setup and rule editing. | Inline above title | Truncate middle items | Use only past two levels. |
| Pagination      | Use for tables and audit logs.      | Compact controls at footer | Previous and next only | Prefer cursor pagination labels. |

---

## Navigation Item Anatomy

| Element              | Specification         | Notes                              |
|----------------------|-----------------------|------------------------------------|
| Item height          | 2.5rem h-10           | Use for sidebar and header actions. |
| Padding X            | 0.75rem px-3          | Use inside nav items.              |
| Padding Y            | 0.5rem py-2           | Preserve readable hit areas.       |
| Icon size            | 1.125rem              | Match default button icon size.    |
| Icon / label gap     | 0.625rem gap-2.5      | Keep icon attached to label.       |
| Active indicator     | 0.1875rem left border | Use primary color for current item. |
| Badge placement      | Trailing aligned      | Use for counts and review status.  |
| Chevron / caret gap  | 0.5rem gap-2          | Use for expandable groups.         |

---

## Navigation States

| State              | Background    | Text / Icon     | Indicator            | Notes                        |
|--------------------|---------------|-----------------|----------------------|------------------------------|
| Default            | transparent | --mp-color-base-content at 75% | transparent | Use for idle items. |
| Hover              | --mp-color-base-200 | --mp-color-base-content | transparent | Use for pointer hover. |
| Focus              | --mp-color-base-200 | --mp-color-base-content | --mp-color-primary 2px ring | Use focus ring. |
| Active / Pressed   | --mp-color-base-200 | --mp-color-base-content | --mp-color-primary 0.1875rem | Use during click. |
| Current / Selected | primary 10% tint | --mp-color-primary | --mp-color-primary 0.1875rem | Use for current route. |
| Disabled           | transparent | --mp-color-base-content at 40% opacity | transparent | Use cursor-not-allowed. |

---

## Responsive Navigation Behavior

| Context                | Fallback Rule           | Notes                              |
|------------------------|-------------------------|------------------------------------|
| Desktop header         | Keep search and workspace switcher visible | Hide secondary account text first. |
| Collapsed sidebar      | Show icons plus tooltips | Preserve counts for urgent queues. |
| Mobile drawer          | Use modal drawer with overlay | Keep current route visible at top. |
| Overflow tabs          | Horizontal scroll with edge fade | Do not shrink tap targets. |
| Breadcrumb truncation  | Collapse middle crumbs into menu | Keep first and current crumb. |
| Pagination on mobile   | Show previous, next, and range | Hide page number list. |

---

## Operational Guidance

- Preserve current location, primary destinations, and tap targets before showing metadata.
- Remove decorative icons and secondary counts before reducing label clarity.
- Keep navigation quiet when a user is reviewing a message or rule.

## Operational DO

- Do make the current area visually persistent.
- Do keep mailbox counts aligned and easy to compare.

## Operational DON'T

- Do not let badges dominate nav labels.
- Do not hide urgent queues behind overflow on desktop.

## Local Decisions Made

- The desktop product shell uses a sidebar plus a global header.
- Mobile navigation uses a drawer and horizontal local tabs.
