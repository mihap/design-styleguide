# 8. Form Elements & Selection Controls

MailPilot forms help SMB teams configure automation rules quickly while keeping validation and recovery close to the field.

---

## Form Layout Guidelines

| Aspect              | Specification         | Notes                                 |
|---------------------|-----------------------|---------------------------------------|
| Label placement     | Top aligned           | Use above fields for scanning and responsive layout. |
| Label spacing       | 0.375rem mt-1.5       | Keep label visually attached to field. |
| Field group gap     | 0.75rem gap-3         | Use for stacked fields.               |
| Inline fields gap   | 1rem gap-4            | Use for related fields on desktop.    |
| Helper text spacing | 0.375rem mt-1.5       | Place directly below field.           |
| Error text spacing  | 0.375rem mt-1.5       | Replace helper text only when necessary. |
| Max form width      | 42rem                 | Use for settings and rule forms.      |
| Button alignment    | Right aligned with primary last | Keep destructive actions separate. |

---

## Label Styling

| Property            | Value                     | Notes                              |
|---------------------|---------------------------|------------------------------------|
| Font size           | 0.8125rem text-xs         | Use compact labels.                |
| Font weight         | 500 font-medium           | Keep labels clear without heaviness. |
| Color               | --mp-color-base-content   | Use 80% opacity for secondary labels. |
| Required indicator  | Asterisk text-error       | Use only when most fields are optional. |
| Optional indicator  | Optional text-base-content at 60% | Use when most fields are required. |

---

## Helper & Error Text

| Type            | Font Size          | Color           | Icon                    |
|-----------------|--------------------|-----------------|-------------------------|
| Helper text     | 0.8125rem text-xs   | --mp-color-base-content at 65% | No icon by default. |
| Error text      | 0.8125rem text-xs   | --mp-color-error | Use alert-circle only for blocking errors. |
| Success text    | 0.8125rem text-xs   | --mp-color-success | Use check-circle after async validation. |
| Character count | 0.75rem text-xs     | --mp-color-base-content at 55% | Right align under textarea. |

---

## Input Variations

| Type          | Control Anatomy                     | Supporting Element / Rule         | Notes                          |
|---------------|--------------------------------------|-----------------------------------|--------------------------------|
| Text input    | Label, field, helper text            | Leading icon optional             | Use for names, subjects, and tags. |
| Password      | Label, field, reveal button          | Visibility toggle on trailing side | Use only for integrations. |
| Search        | Field with search icon               | Clear action appears after input  | Use for mailbox and customer search. |
| Number        | Field with numeric alignment         | Native stepper hidden unless useful | Use for thresholds and SLA minutes. |
| Textarea      | Label, multiline field, counter      | Min height 7.5rem and vertical resize | Use for reply templates. |
| Select        | Field with chevron                   | Selected text truncates           | Use for single assignment choices. |
| Multi-select  | Field with chips                     | Show selection summary after three chips | Use for labels and mailboxes. |
| Date picker   | Field with calendar trigger          | Use localized short date format   | Use for follow-up scheduling. |
| File upload   | Drop zone with button and helper text | Show type and size rules          | Use for CSV imports and attachments. |

---

## Selection Controls

| Control            | Control Anatomy                     | Label Placement       | Hit Area / Sizing          | Notes                          |
|--------------------|-------------------------------------|-----------------------|----------------------------|--------------------------------|
| Checkbox           | Square box plus label               | Label to right        | 1rem control with 2.5rem hit target | Use for independent options. |
| Radio              | Circle dot plus label               | Label to right        | 1rem control with 2.5rem hit target | Use for mutually exclusive choices. |
| Toggle / Switch    | Track plus thumb                    | Label to left or right | 2.5rem by 1.5rem track     | Use for enabling automation. |
| Choice chip        | Pill label with optional icon       | Inline                | 0.5rem px and 2rem height  | Use for lightweight filters. |
| Segmented control  | Joined button group                 | Inline                | 2.5rem height with 1rem px | Use for view modes and scopes. |

---

## Control Group Layout

| Context                | Gap                  | Layout Rule          | Notes                          |
|------------------------|----------------------|----------------------|--------------------------------|
| Checkbox list          | 0.5rem gap-2         | Stack vertically     | Use for permissions and options. |
| Radio group            | 0.5rem gap-2         | Stack vertically     | Use for clear comparisons.     |
| Inline choice chips    | 0.5rem gap-2         | Wrap at row end      | Use for filters and labels.    |
| Segmented control row  | 0rem gap-0           | Fit content by default | Stretch only in mobile tabs. |
| Helper / error pairing | 0.375rem gap-1.5     | Place below field    | Keep feedback close to control. |

---

## Operational Guidance

- Keep validation feedback directly adjacent to the affected field.
- Use placeholders as examples only, never as the only label.
- Make every interactive control target at least 2.5rem tall.

## Operational DO

- Do keep field labels visible after input is entered.
- Do explain automation consequences near toggles and destructive controls.

## Operational DON'T

- Do not move errors to a distant summary without local field feedback.
- Do not use toggles for actions that require review or confirmation.

## Local Decisions Made

- Rule forms use a 42rem max width.
- Automation enablement uses toggles, while one-time execution uses buttons.
