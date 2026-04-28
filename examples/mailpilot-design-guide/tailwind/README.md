# Tailwind Export

This package exports the generated design guide tokens for latest stable Tailwind CSS.

## Install

```bash
npm install
npm run build
```

## Import into a website

Import `src/theme.css` after Tailwind is loaded, or copy the `@theme` block into your app-level Tailwind CSS entry.

```css
@import "tailwindcss";
@import "./path/to/generated-guide/tailwind/src/theme.css";
```

This export targets latest stable Tailwind only and does not include any component-framework integration.
