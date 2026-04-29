# Validator Templates

Reusable validator templates for generated design guides.

## Usage

Copy these files into a generated guide's `scripts/` directory, or run them from this repository with the generated guide path:

```bash
node templates/validators/validate-guide.mjs examples/mailpilot-design-guide
node templates/validators/validate-all.mjs examples/mailpilot-design-guide --no-write
```

## Validators

- `validate-guide.mjs` checks generated markdown chapters for required files, unresolved placeholders, table drift against the blueprint, appendix merge markers, unresolved local decisions, token references, unit rules, stale removed-chapter references, and non-Tailwind framework contamination.
- `validate-tailwind-export.mjs` checks generated Tailwind export files, token-family coverage, theme coverage, color contrast, unit rules, utility emission, and fixture compilation.
- `validate-demo.mjs` checks generated demo files, schema conformance, chapter coverage, sidebar targets, placeholder absence, landmarks, labelled form structure, and stale references.
- `validate-all.mjs` runs all validators for a generated guide. Use `--no-write` for review-only checks that must not update `manifest.json` or project CSS artifacts.

## Policy

Validators target latest stable Tailwind only and assume no component framework.
