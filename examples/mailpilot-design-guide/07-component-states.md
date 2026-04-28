# 7. Component States

MailPilot states make availability, automation progress, and validation outcomes explicit without making dense screens noisy.

---

## State Overview

| State           | Description                     | Visual Treatment                     |
|-----------------|---------------------------------|--------------------------------------|
| Default         | Component is available and idle. | Base fill, standard border, and normal text. |
| Hover           | Pointer is over an available component. | Slight base-200 or primary tint shift. |
| Focus           | Component is keyboard focused.  | 2px primary ring with 2px offset.     |
| Active / Pressed | Component is being pressed.    | Darker fill and translate-y-px.       |
| Selected        | Component is chosen or current. | Primary tint fill and visible indicator. |
| Disabled        | Component is unavailable.       | 45% opacity and not-allowed cursor.   |
| Loading         | Component is processing.        | Spinner, disabled pointer events, stable label width. |
| Error           | Component has invalid or failed state. | Error border and error text.          |
| Success         | Component has confirmed state.  | Success border or success text.       |

---

## Primary Button States

| State     | Background       | Text         | Border    | Notes                          |
|-----------|------------------|--------------|-----------|--------------------------------|
| Default   | --mp-color-primary | --mp-color-primary-content | --mp-color-primary | Use for one recommended action. |
| Hover     | primary 92% lightness shift | --mp-color-primary-content | --mp-color-primary | Increase contrast slightly. |
| Focus     | --mp-color-primary | --mp-color-primary-content | --mp-color-primary | Add 2px primary ring with 2px offset. |
| Active / Pressed | primary 88% lightness shift | --mp-color-primary-content | --mp-color-primary | Use translate-y-px. |
| Disabled  | --mp-color-primary at 45% opacity | --mp-color-primary-content at 70% opacity | --mp-color-primary | Use cursor-not-allowed. |
| Loading   | --mp-color-primary | --mp-color-primary-content | --mp-color-primary | Show spinner and disable pointer events. |

---

## Secondary / Outline Button States

| State     | Background    | Text          | Border            | Notes             |
|-----------|---------------|---------------|-------------------|-------------------|
| Default   | --mp-color-base-100 | --mp-color-secondary | --mp-color-secondary 1px | Use for assignment actions. |
| Hover     | --mp-color-base-200 | --mp-color-secondary | --mp-color-secondary 1px | Tint the surface only. |
| Focus     | --mp-color-base-100 | --mp-color-secondary | --mp-color-secondary 1px | Add primary focus ring. |
| Active / Pressed | --mp-color-base-200 | --mp-color-secondary | --mp-color-secondary 1px | Use translate-y-px. |
| Disabled  | --mp-color-base-100 | --mp-color-base-content at 40% opacity | --mp-color-base-300 at 70% opacity | Use cursor-not-allowed. |

---

## Input Field States

| State        | Background    | Border            | Text          | Notes                        |
|--------------|---------------|-------------------|---------------|------------------------------|
| Default      | --mp-color-base-100 | --mp-color-base-300 1px | --mp-color-base-content | Use for idle fields. |
| Placeholder  | --mp-color-base-100 | --mp-color-base-300 1px | --mp-color-base-content at 45% opacity | Keep examples short. |
| Hover        | --mp-color-base-100 | --mp-color-neutral 1px | --mp-color-base-content | Strengthen border only. |
| Focus        | --mp-color-base-100 | --mp-color-primary 1px | --mp-color-base-content | Add 2px ring and no glow. |
| Filled       | --mp-color-base-100 | --mp-color-base-300 1px | --mp-color-base-content | Keep same as default. |
| Disabled     | --mp-color-base-200 | --mp-color-base-300 1px | --mp-color-base-content at 45% opacity | Use cursor-not-allowed. |
| Read-only    | --mp-color-base-200 | --mp-color-base-300 1px | --mp-color-base-content | Remove editable affordance. |
| Error        | --mp-color-base-100 | --mp-color-error 1px | --mp-color-base-content | Place error text below field. |
| Success      | --mp-color-base-100 | --mp-color-success 1px | --mp-color-base-content | Use only after validation. |

---

## Focus Ring Specifications

Focus rings must be visible for keyboard, assistive tech, and remote-control input.

| Property            | Value         | CSS                     |
|---------------------|---------------|-------------------------|
| Ring color          | --mp-color-primary | focus:ring-primary  |
| Ring width          | 2px           | focus:ring-2            |
| Ring offset         | 2px           | focus:ring-offset-2     |
| Ring offset color   | --mp-color-base-100 | focus:ring-offset-base-100 |
| Transition          | 150ms ease-out | transition duration-150 ease-out |

```
/* Tailwind CSS focus ring composition */
focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100
```

---

## Checkbox & Radio States

| State              | Box Background | Border            | Check / Dot | Label               |
|--------------------|----------------|-------------------|-------------|---------------------|
| Unchecked          | --mp-color-base-100 | --mp-color-base-300 1px | transparent | --mp-color-base-content |
| Unchecked:hover    | --mp-color-base-200 | --mp-color-neutral 1px | transparent | --mp-color-base-content |
| Unchecked:focus    | --mp-color-base-100 | --mp-color-primary 1px | transparent | --mp-color-base-content plus ring |
| Checked            | --mp-color-primary | --mp-color-primary | --mp-color-primary-content | --mp-color-base-content |
| Checked:hover      | primary 92% lightness shift | --mp-color-primary | --mp-color-primary-content | --mp-color-base-content |
| Checked:focus      | --mp-color-primary | --mp-color-primary | --mp-color-primary-content | --mp-color-base-content plus ring |
| Disabled unchecked | --mp-color-base-200 | --mp-color-base-300 1px | transparent | --mp-color-base-content at 45% opacity |
| Disabled checked   | --mp-color-primary at 45% opacity | --mp-color-primary | --mp-color-primary-content | --mp-color-base-content at 45% opacity |

---

## Toggle / Switch States

| State         | Track              | Thumb     | Notes                      |
|---------------|--------------------|-----------|----------------------------|
| Off           | --mp-color-base-300 | --mp-color-base-100 | Use for disabled automation rules. |
| Off:hover     | --mp-color-neutral at 20% tint | --mp-color-base-100 | Increase track contrast. |
| Off:focus     | --mp-color-base-300 plus ring | --mp-color-base-100 | Add primary focus ring. |
| On            | --mp-color-primary | --mp-color-primary-content | Use for active automation. |
| On:hover      | primary 92% lightness shift | --mp-color-primary-content | Keep thumb high contrast. |
| On:focus      | --mp-color-primary plus ring | --mp-color-primary-content | Add primary focus ring. |
| Disabled off  | --mp-color-base-200 | --mp-color-base-300 | Use cursor-not-allowed. |
| Disabled on   | --mp-color-primary at 45% opacity | --mp-color-primary-content | Preserve state while disabled. |

---

## Operational Guidance

- Define every state that a component supports before styling variants.
- Keep focus visible with at least 2px ring width, 2px offset, and 3:1 contrast against adjacent colors.
- Use loading states that preserve layout width.

## Operational DO

- Do treat state coverage as part of the component contract.
- Do make selected, active, and current states distinct in navigation and tables.

## Operational DON'T

- Do not rely on color alone when status has operational meaning.
- Do not hide focus rings on mouse interaction if keyboard focus can follow.

## Local Decisions Made

- Focus uses a 2px primary ring with 2px offset.
- Success states are allowed for inputs and automation outcomes, but warning states remain in alerts and badges.
