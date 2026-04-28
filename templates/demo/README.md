# Reusable HTML Demo Skeleton

This directory contains deterministic HTML demo templates for generated design guides.

## Files

- `index.html` defines the page shell, sidebar, and main content area.
- `section.html` defines one generated guide section.
- `example-card.html` defines one component example wrapper.
- `demo.schema.json` defines the data contract for generated demo data.

## Rules

- Use the validated Tailwind export from the generated guide.
- Generate examples from structured data and typed props, not ad hoc prose.
- Keep the demo static and component-framework-agnostic.
- Target the latest stable Tailwind release only.
