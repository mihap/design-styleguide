# 12. Feedback & Alerts

MailPilot feedback stays close to the affected mailbox, rule, or field so users can act without losing workflow context.

---

## Alert Variants

Info, Success, Warning, and Error draw from the Semantic Colors in chapter 02. Neutral draws from the Neutral palette in chapter 02 and is a non-status variant for ambient announcements.

| Variant | Background    | Border          | Icon           | Usage                            |
|---------|---------------|-----------------|----------------|----------------------------------|
| Info    | info 10% tint | --mp-color-info 1px | info-circle | Use for mailbox tips and notices. |
| Success | success 12% tint | --mp-color-success 1px | check-circle | Use for completed automation. |
| Warning | warning 14% tint | --mp-color-warning 1px | alert-triangle | Use for SLA risk and pending review. |
| Error   | error 10% tint | --mp-color-error 1px | alert-circle | Use for failures and destructive confirmations. |
| Neutral | --mp-color-base-200 | --mp-color-base-300 1px | bell | Use for ambient announcements. |

---

## Alert Anatomy

| Element            | Specification           | Notes                             |
|--------------------|-------------------------|-----------------------------------|
| Container padding  | 1rem p-4                | Use default card rhythm.          |
| Icon size          | 1.125rem                | Match default button icon size.   |
| Icon-to-text gap   | 0.75rem gap-3           | Keep icon attached to message.    |
| Title font         | 0.875rem text-sm plus 600 font-semibold | Keep titles compact. |
| Body font          | 0.875rem text-sm plus 400 font-normal | Use one short paragraph. |
| Border radius      | 0.75rem rounded-lg      | Match cards and popovers.         |
| Dismiss button     | 2rem icon button top right | Use only for non-blocking alerts. |

---

## Toast Notifications

| Property       | Value                  | Notes                             |
|----------------|------------------------|-----------------------------------|
| Placement      | Top right on desktop, bottom on mobile | Avoid covering mailbox actions. |
| Max width      | 24rem                  | Keep messages short.              |
| Padding        | 1rem p-4               | Match alert padding.              |
| Shadow         | shadow-md              | Signal floating feedback.         |
| Border radius  | 0.75rem rounded-lg     | Match alerts.                     |
| Auto-dismiss   | 5000ms for success, manual for error | Errors stay until resolved. |
| Stack gap      | 0.75rem                | Keep multiple toasts separate.    |
| Animation      | 150ms fade plus 0.25rem slide | Keep motion brief.          |

---

## Badge Styles

| Variant   | Background     | Text          | Usage                     |
|-----------|----------------|---------------|---------------------------|
| Default   | --mp-color-base-200 | --mp-color-base-content | Use for neutral metadata. |
| Primary   | primary 10% tint | --mp-color-primary | Use for automation labels. |
| Secondary | secondary 14% tint | --mp-color-secondary-content | Use for team assignment. |
| Success   | success 12% tint | --mp-color-success-content | Use for completed states. |
| Warning   | warning 14% tint | --mp-color-warning-content | Use for at-risk queues. |
| Error     | error 10% tint | --mp-color-error | Use for failed states. |
| Outline   | transparent | --mp-color-base-content | Use for low-emphasis filters. |

---

## Operational Guidance

- Place feedback at the scope of the event: field, form, row, panel, or global.
- Use toasts only for non-blocking confirmations and background events.
- Keep alerts actionable and close to the affected object.

## Operational DO

- Do put field errors directly below fields.
- Do keep row-level feedback inside the row or expanded detail area.

## Operational DON'T

- Do not use global toasts for blocking form errors.
- Do not stack multiple competing alerts without clear priority.

## Local Decisions Made

- Errors never auto-dismiss.
- Toasts are reserved for non-blocking background updates and success confirmations.
