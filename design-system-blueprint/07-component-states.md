# 7. Component States

[Opening paragraph — importance of clearly communicating state to users for usability and accessibility.]

---

## State Overview

| State           | Description                     | Visual Treatment                     |
|-----------------|---------------------------------|--------------------------------------|
| Default         | [Description]                   | [Visual treatment]                   |
| Hover           | [Description]                   | [Visual treatment]                   |
| Focus           | [Description]                   | [Visual treatment]                   |
| Active/Pressed  | [Description]                   | [Visual treatment]                   |
| Selected        | [Description]                   | [Visual treatment]                   |
| Disabled        | [Description]                   | [Visual treatment]                   |
| Loading         | [Description]                   | [Visual treatment]                   |
| Error           | [Description]                   | [Visual treatment]                   |
| Success         | [Description]                   | [Visual treatment]                   |

---

## Primary Button States

| State     | Background       | Text         | Border    | Other                          |
|-----------|------------------|--------------|-----------|--------------------------------|
| Default   | [token]          | [token]      | [token]   | [notes]                        |
| Hover     | [token / shift]  | [token]      | [token]   | [notes]                        |
| Focus     | [token]          | [token]      | [token]   | [focus ring spec]              |
| Active    | [token / shift]  | [token]      | [token]   | [transform]                    |
| Disabled  | [token / opacity]| [token / op] | [token]   | [cursor rule]                  |
| Loading   | [token]          | [token]      | [token]   | [indicator + pointer-events]   |

---

## Secondary / Outline Button States

| State     | Background    | Text          | Border            | Other             |
|-----------|---------------|---------------|-------------------|-------------------|
| Default   | [token]       | [token]       | [token / width]   | [notes]           |
| Hover     | [token]       | [token]       | [token / width]   | [notes]           |
| Focus     | [token]       | [token]       | [token / width]   | [focus ring spec] |
| Active    | [token]       | [token]       | [token / width]   | [transform]       |
| Disabled  | [token]       | [token / op]  | [token / op]      | [cursor rule]     |

---

## Input Field States

| State        | Background    | Border            | Text          | Other                        |
|--------------|---------------|-------------------|---------------|------------------------------|
| Default      | [token]       | [token / width]   | [token]       | [notes]                      |
| Placeholder  | [token]       | [token / width]   | [token]       | [notes]                      |
| Hover        | [token]       | [token / width]   | [token]       | [notes]                      |
| Focus        | [token]       | [token / width]   | [token]       | [focus ring + glow spec]     |
| Filled       | [token]       | [token / width]   | [token]       | [notes]                      |
| Disabled     | [token]       | [token / width]   | [token]       | [cursor rule]                |
| Read-only    | [token]       | [token / width]   | [token]       | [notes]                      |
| Error        | [token]       | [token / width]   | [token]       | [notes]                      |
| Success      | [token]       | [token / width]   | [token]       | [notes]                      |

---

## Focus Ring Specifications

[One-line — why focus rings are critical for keyboard accessibility; visibility without overwhelm.]

| Property            | Value         | CSS                     |
|---------------------|---------------|-------------------------|
| Ring color          | [token]       | [utility]               |
| Ring width          | [rem]          | [utility]               |
| Ring offset         | [rem]          | [utility]               |
| Ring offset color   | [token]       | [utility]               |
| Transition          | [ms ease]     | [utility]               |

```
/* Tailwind CSS focus ring composition */
[utility combo — e.g. focus:outline-none focus:ring-N focus:ring-[token] focus:ring-offset-N]
```

---

## Checkbox & Radio States

| State              | Box Background | Border            | Check / Dot | Label               |
|--------------------|----------------|-------------------|-------------|---------------------|
| Unchecked          | [token]        | [token / width]   | [token]     | [token]             |
| Unchecked:hover    | [token]        | [token / width]   | [token]     | [token]             |
| Unchecked:focus    | [token]        | [token / width]   | [token]     | [token + ring]      |
| Checked            | [token]        | [token]           | [token]     | [token]             |
| Checked:hover      | [token]        | [token]           | [token]     | [token]             |
| Checked:focus      | [token]        | [token]           | [token]     | [token + ring]      |
| Disabled unchecked | [token]        | [token / width]   | [token]     | [token]             |
| Disabled checked   | [token]        | [token]           | [token]     | [token]             |

---

## Toggle / Switch States

| State         | Track              | Thumb     | Notes                      |
|---------------|--------------------|-----------|----------------------------|
| Off           | [token]            | [token]   | [Notes]                    |
| Off:hover     | [token]            | [token]   | [Notes]                    |
| Off:focus     | [token + ring]     | [token]   | [Notes]                    |
| On            | [token]            | [token]   | [Notes]                    |
| On:hover      | [token]            | [token]   | [Notes]                    |
| On:focus      | [token + ring]     | [token]   | [Notes]                    |
| Disabled off  | [token]            | [token]   | [Notes]                    |
| Disabled on   | [token]            | [token]   | [Notes]                    |
