# Generation Scripts

Reusable scripts for creating and validating generated design guides.

## Create a guide workspace

```bash
node scripts/create-guide.mjs "Product Name" --examples
```

Creates `examples/product-name-design-guide/`, copies blueprint chapters, copies validator templates, creates demo/tailwind folders, and writes an initial manifest. Use `--force` to refresh support files; add `--overwrite-chapters` only when replacing markdown chapters is intended.

## Merge appendices

```bash
node scripts/merge-appendices.mjs examples/product-name-design-guide
```

Merges appendix guidance into matching chapters. If local decisions are unresolved, the script stops before production-ready output is declared. Use `--allow-unresolved` only when you intentionally want blocking questions inserted.

## Build Tailwind export

```bash
node scripts/build-tailwind-export.mjs examples/product-name-design-guide --build
```

Extracts tokens from the completed guide into `tailwind/src/theme.css`, `tailwind/src/tokens.json`, fixture files, and package metadata. The export targets latest stable Tailwind only.

## Build demo

```bash
node scripts/build-demo.mjs examples/product-name-design-guide
```

Renders `demo/index.html` from `demo/demo-data.json` using the reusable deterministic HTML demo skeleton.

## Prepare separate review

```bash
node scripts/prepare-review.mjs examples/product-name-design-guide
```

Writes `review/review-packet.md` for an independent reviewer or review subagent.

## Quality gate

```bash
node templates/validators/validate-all.mjs examples/product-name-design-guide
```
