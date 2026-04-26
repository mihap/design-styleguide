# Review Findings

## Review Summary

I re-checked the files directly and compared them with two independent explore passes. The 10 blueprint findings stand. In the appendix section, 5 are real clarity issues; the shadows finding is split: `06-shadows-elevation-best-practices.md:11` needs tightening, while `:32` is already concrete enough.

## Blueprint / Cross-file Findings

- **[HIGH] 1. §02 ↔ §13 token list mismatch**  
  **Evidence:** `02-color-system.md:11-16` omits `Secondary Content` and `Accent Content`; `13-quick-reference.md:12-17,47-50` includes both.  
  **Proposed fix:** Make §02 the source of truth and add explicit `Secondary Content` and `Accent Content` entries there. If those tokens are intentionally shared with another content token, still add rows and document the alias instead of omitting them.

- **[MEDIUM] 2. Semantic color content tokens are modeled in two different shapes**  
  **Evidence:** `02-color-system.md:48-53` uses a `Content Color` column; `13-quick-reference.md:57-64` uses separate `Info Content` / `Success Content` / etc. rows.  
  **Proposed fix:** Pick one canonical model. Recommendation: keep the semantic-usage table in §02, and add a small companion token table for semantic content tokens so §13 has a direct structural source without forcing a full table rewrite.

- **[MEDIUM] 3. State naming drifts across files**  
  **Evidence:** `07-component-states.md:14,30,43,98`; `08-form-elements.md:67`; `10-navigation.md:41-42`.  
  **Proposed fix:** Define a canonical vocabulary in `07-component-states.md` and reuse it verbatim everywhere. For example: standardize on `Active / Pressed`, `Selected`, and one control label form (`Switch / Toggle` or `Toggle / Switch`) with consistent capitalization and spacing.

- **[MEDIUM] 4. Button-size schema diverges between §04 and §09**  
  **Evidence:** `04-spacing-system.md:36-41` vs `09-buttons.md:22-27`.  
  **Proposed fix:** Make §04 the canonical geometry table for button sizing, then have §09 either mirror that exact schema or reference it instead of redefining it. If §09 must keep extra button-specific data, add only `Icon Size` there and inherit height/padding/font size from §04.

- **[LOW] 5. Density tiers differ between cards and tables with no stated rule**  
  **Evidence:** `04-spacing-system.md:62-67` has `Spacious`; `11-tables-data-display.md:25-29` stops at `Comfortable`.  
  **Proposed fix:** Either add `Spacious` to tables, or explicitly document that tables intentionally cap at `Comfortable` for scanability while cards may use `Spacious`. The ambiguity is the problem more than the difference itself.

- **[LOW] 6. Variable-column labeling is inconsistent**  
  **Evidence:** `02-color-system.md:11,24,37,48` uses `CSS Variable`; `05-border-radius.md:9` uses `DaisyUI Variable`.  
  **Proposed fix:** Standardize on `CSS Variable` everywhere, and mention DaisyUI only in surrounding prose. The stored value is a CSS custom property regardless of whether it follows DaisyUI naming.

- **[MEDIUM] 7. Typography schema mismatch between §03 and §13**  
  **Evidence:** `03-typography.md:35-46` has `Usage` but no `Weight`; `13-quick-reference.md:70-81` has `Weight` but no `Usage`.  
  **Proposed fix:** Align the schemas. Recommendation: add `Weight` to the §03 type-scale table so §13 can remain a true derived quick reference without inventing extra structure.

- **[MEDIUM] 8. AGENTS invariant #4 is too broad as written**  
  **Evidence:** `AGENTS.md:83-85` says spacing tokens are “the only legal values referenced” in downstream chapters; `09-buttons.md:22-27` also includes `Font Size` and `Icon Size`, which clearly overlap with typography/icon sizing, not just spacing.  
  **Proposed fix:** Narrow the invariant to spacing-related values. Suggested direction: “Spacing values in §08–§12 must come from §04; typography values must come from §03; icon sizes must come from a declared icon/type scale.”

- **[MEDIUM] 9. `Neutral` alert variant is not reconciled with the semantic color model**  
  **Evidence:** `12-feedback-alerts.md:11-15` includes `Neutral`; `02-color-system.md:48-53` semantic colors are only `Info/Success/Warning/Error`.  
  **Proposed fix:** Decide whether `Neutral` is a semantic status or a non-semantic utility variant. If it is semantic, add it to §02. If it is not, keep it in alerts but explicitly document that it draws from the neutral palette rather than the semantic-status palette.

- **[LOW] 10. File slug and displayed title do not match**  
  **Evidence:** `04-spacing-system.md:1`, `00-cover.md:22`, `README.md:34`.  
  **Proposed fix:** Choose which is canonical: the human-facing title or the file slug. Recommendation: keep `Layout & Spacing` as the display title and treat `04-spacing-system.md` as a stable internal slug, then document that convention once instead of leaving it implicit.

## Appendix / Clarity Findings

- **[MEDIUM] A1. Accessibility threshold is underspecified**  
  **Evidence:** `design-system-blueprint-appendices/02-color-system-best-practices.md:37`.  
  **Proposed fix:** Replace “your chosen accessibility threshold” with an explicit target, such as WCAG AA for body text and UI text, plus any stronger requirement you want for focus indicators or critical messaging.

- **[LOW] A2. “Subtle shadows” is vague; “heavy, pure-black shadows” is already clear enough**  
  **Evidence:** `design-system-blueprint-appendices/06-shadows-elevation-best-practices.md:11,32`.  
  **Proposed fix:** Keep line 32 as-is. Tighten line 11 by defining what “subtle” means operationally — for example, low-opacity layered shadows, limited blur/spread, and shadows that never become the strongest visual separator on the surface.

- **[MEDIUM] A3. Navigation appendix uses subjective terms without removal rules**  
  **Evidence:** `design-system-blueprint-appendices/10-navigation-best-practices.md:11,23,29`.  
  **Proposed fix:** Define a prioritization order for compact nav. Example direction: preserve current location, primary destinations, and tap targets first; remove decorative icons, secondary metadata, and overflow details before shrinking labels or reducing hit area.

- **[MEDIUM] A4. Radius guidance is too qualitative**  
  **Evidence:** `design-system-blueprint-appendices/05-border-radius-best-practices.md:11`.  
  **Proposed fix:** Add numeric or relational constraints, such as one shared radius scale, only adjacent-step changes between related components, and explicit exceptions for pills/avatars.

- **[HIGH] A5. Focus visibility guidance is not measurable enough**  
  **Evidence:** `design-system-blueprint-appendices/07-component-states-best-practices.md:35`.  
  **Proposed fix:** Set explicit minimums: e.g. minimum ring width, offset behavior, and a required contrast threshold against adjacent colors. Focus treatment should be testable, not just “visible enough.”

- **[MEDIUM] A6. “Keep feedback close” is directionally right but not operationally specific**  
  **Evidence:** `design-system-blueprint-appendices/12-feedback-alerts-best-practices.md:17`.  
  **Proposed fix:** Add placement rules by scope: field errors directly adjacent to the field, form errors at the form boundary plus anchor links, row-level feedback inline in the row, and toasts reserved for non-blocking/global confirmation.
