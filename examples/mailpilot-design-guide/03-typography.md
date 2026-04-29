# 3. Typography

MailPilot uses Inter for crisp mailbox scanning, reliable tabular figures, and a neutral SaaS voice that can support colorful status UI.

---

## Font Stack

```
/* Sans-serif */
font-family: "Inter", ui-sans-serif, system-ui, sans-serif;

/* Monospace for code */
font-family: "JetBrains Mono", "SFMono-Regular", ui-monospace, monospace;
```

Inter is the primary interface font; JetBrains Mono is the secondary utility font for rule syntax, snippets, IDs, and message headers.

---

## Font Weights

Use three weights to keep dense views calm; reserve 700 for marketing surfaces outside the app.

| Weight    | Name       | CSS                   | Usage                                   |
|-----------|------------|-----------------------|-----------------------------------------|
| 400       | Regular    | font-normal           | Use for body copy, table cells, and helper text. |
| 500       | Medium     | font-medium           | Use for labels, nav items, and metadata. |
| 600       | Semibold   | font-semibold         | Use for headings, buttons, and status titles. |

---

## Type Scale

Use a compact scale with generous body line height for split-pane scanning.

| Name       | Size     | Weight | Line Height | Tailwind              | Usage                          |
|------------|----------|--------|-------------|-----------------------|--------------------------------|
| Display    | 3rem     | 600    | 1.05        | text-5xl leading-none | Use for empty-state hero headings. |
| H1         | 2.25rem  | 600    | 1.12        | text-4xl leading-tight | Use for page titles and setup milestones. |
| H2         | 1.875rem | 600    | 1.18        | text-3xl leading-tight | Use for dashboard section headers. |
| H3         | 1.5rem   | 600    | 1.25        | text-2xl leading-snug | Use for panel and modal titles. |
| H4         | 1.25rem  | 600    | 1.3         | text-xl leading-snug  | Use for card headings. |
| H5         | 1.125rem | 600    | 1.35        | text-lg leading-snug  | Use for compact group headings. |
| Body Large | 1rem     | 400    | 1.6         | text-base leading-relaxed | Use for explanatory copy. |
| Body       | 0.875rem | 400    | 1.5         | text-sm leading-6     | Use for app body, tables, and controls. |
| Small      | 0.8125rem | 500   | 1.45        | text-small            | Use for labels, badges, and metadata. |
| Tiny       | 0.75rem  | 500    | 1.35        | text-tiny             | Use for counters, timestamps, and compact hints. |

---

## Line Height Guidelines

Line height should keep table rows compact while leaving setup and guidance copy readable.

| Category | Line Height  | Tailwind          | Usage                                 |
|----------|--------------|-------------------|---------------------------------------|
| Tight    | 1.1          | leading-tight     | Use for large headings.               |
| Snug     | 1.25         | leading-snug      | Use for panel titles and compact headings. |
| Normal   | 1.5          | leading-normal    | Use for table cells and controls.     |
| Relaxed  | 1.6          | leading-relaxed   | Use for explanatory body copy.        |
| Loose    | 1.75         | leading-loose     | Use only for onboarding prose blocks. |

---

## Letter Spacing

| Category | Value     | Tailwind          | Usage                         |
|----------|-----------|-------------------|-------------------------------|
| Tighter  | -0.03em   | tracking-tighter  | Use for display headings only. |
| Tight    | -0.015em  | tracking-tight    | Use for H1 through H3.         |
| Normal   | 0em       | tracking-normal   | Use for body and controls.     |
| Wide     | 0.025em   | tracking-wide     | Use for badge labels.          |
| Wider    | 0.05em    | tracking-wider    | Use for uppercase table headers. |

---

## Paragraph Spacing

Consistent spacing makes guidance, audit logs, and setup screens easier to scan.

| Element    | Margin Bottom     | Notes                             |
|------------|-------------------|-----------------------------------|
| H1         | 1rem mb-4         | Use before summary copy or tabs.  |
| H2         | 0.75rem mb-3      | Use inside dashboard sections.    |
| H3         | 0.75rem mb-3      | Use inside panels and modals.     |
| H4 – H5    | 0.5rem mb-2       | Use inside cards and compact groups. |
| Paragraph  | 0.75rem mb-3      | Use for guidance copy.            |
| List       | 1rem mb-4         | Use after explanatory paragraphs. |
| List item  | 0.25rem mb-1      | Keep lists compact.               |

---

## Operational Guidance

- Treat Body at 0.875rem as the main app font size for tables, controls, and mailbox previews.
- Use body text at 1rem for explanatory onboarding copy.
- Keep labels close to their controls and use semibold only where hierarchy needs it.
- Use tabular numbers for counts, latency, SLA age, and mailbox metrics.

## Operational DO

- Do preserve readable line height in message previews and automation explanations.
- Do use text hierarchy before using color for emphasis.

## Operational DON'T

- Do not use 700 weight in core app UI.
- Do not compress body copy below 0.875rem in interactive areas.

## Local Decisions Made

- Inter is the primary app typeface.
- JetBrains Mono is the monospace typeface for rules, snippets, and message headers.
