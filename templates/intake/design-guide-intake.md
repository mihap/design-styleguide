# Design Guide Intake Template

Use this intake before generating a production-ready design guide. If required fields are missing, ask follow-up questions before finalizing the guide.

## Required Inputs

| Field | Required Detail | Notes |
| --- | --- | --- |
| Guide name | Product or system name | Used to create `{name}-design-guide/`. |
| Product context | What the product does and who uses it | Include domain, audience, and primary workflows. |
| Visual direction | Desired feel and reference systems | Example: “Notion/Stripe, but more colorful.” |
| Design constraints | Rules the system must obey | Include density, accessibility, motion, brand, and platform constraints. |
| Brand inputs | Existing brand colors, logo posture, tone | If absent, ask whether opinionated draft values are allowed. |
| Typography inputs | Typeface preference or constraints | If absent, ask whether system/UI defaults are acceptable. |
| Color requirements | Color format, theme mode, semantic requirements | Tailwind unit and token rules still apply. |
| Accessibility requirements | Required WCAG level and product-specific constraints | Default target is WCAG 2.1 AA. |
| Density preference | Compact, default, comfortable, or mixed | Critical for data-heavy products. |
| Examples or references | Screenshots, existing apps, brand guide, or written references | Label invented interpretations as draft decisions. |

## Optional Inputs

| Field | Use |
| --- | --- |
| `tailwind.config.*` | Extract spacing, typography, colors, radius, and shadows. |
| Theme CSS | Extract CSS custom properties and theme values. |
| Token JSON | Preserve canonical token names and values. |
| Component inventory | Fill component chapters from real usage. |
| Screenshots | Infer layout density and hierarchy with user confirmation. |
| Brand guide | Preserve brand colors, tone, type, and logo constraints. |
| Existing website or app URL | Use as reference only; confirm extracted decisions. |

## Missing Information Rule

- If a value is required for production output and no source exists, ask the user.
- If the user explicitly permits invention, label the result as an opinionated draft in `manifest.json`.
- Do not silently invent production token values, principles, accessibility thresholds, or component behavior.
- Completed output must contain no bracket placeholders and no unresolved local decisions.
