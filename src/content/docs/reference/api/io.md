---
title: 'API: io'
description: Public API of @mosaicoo/svg-engine/io — SVG/PNG/SVGZ import & export, registries and code generators.
---

`@mosaicoo/svg-engine/io` is the headless **parse / sanitize / serialize** entry
point: read or write SVG (and PNG/SVGZ) without instantiating any editor UI. Zero
Angular Material/CDK dependency.

```ts
import { svgImporter, svgExporter } from '@mosaicoo/svg-engine/io';
```

## Contract types

- **`Importer`** — `mediaTypes`/`extensions` + `import(blob): ImportResult`.
- **`Exporter`** — `mediaType`/`extension` + `export(doc): string | Blob`.
- **`ImportResult`** — `{ ok: true, document, warnings } | { ok: false, error }`.

## Registries

- **`ImporterRegistry`** — `register`/`get`/`list` + `byMediaType` / `byExtension`.
- **`ExporterRegistry`** — the same shape, for text and binary exporters.

## SVG import / export

- **`svgImporter`** — built-in SVG parser. Sanitizes on the way in (drops
  `<script>`, `on*` handlers and `javascript:` hrefs).
- **`svgExporter`** — deterministic SVG serializer (canonical attribute order,
  fixed numeric precision; identity transforms omitted).
- **`nodeToSvgMarkup(node)`** — serialize a single node to SVG markup.

## PNG export

- **`pngExporter`** — `SvgDocument` → PNG `Blob` via `<canvas>` (supports @1x/@2x/@3x).
- **`renderPng(...)`** — the pure rasterization helper used by `pngExporter`.

## SVGZ (gzip-compressed SVG)

- **`svgzExporter`** — export gzip-compressed SVG (`.svgz`).
- **`gzipText`** / **`gunzipText`** — low-level gzip helpers.

## `<defs>` helpers

- **`mergeDefsFragments`** — merge `<defs>` fragments by id (keeps gradients when
  swapping Smart Object content).
- **`collectDefsIds`**, **`namespaceCollidingDefs`**, **`NamespacedDefs`** —
  namespace colliding `<defs>` ids when merging SVGs from different sources.

## Code generators

Turn an SVG document into source code (React / Data URI).

- Contract: **`CodeGenerator`**, **`CodeGeneratorOptionSpec`**,
  **`CodeGeneratorTextOption`**, **`CodeGeneratorBooleanOption`**,
  **`CodeGeneratorSelectOption`**, **`CodeGeneratorOptions`**,
  **`CodeGeneratorOptionValue`**, **`resolveCodeGeneratorOptionDefaults`**.
- **`CodeGeneratorRegistry`** — register/look up generators.
- Built-ins: **`reactJsxGenerator`**, **`reactComponentGenerator`**,
  **`dataUriGenerator`**, **`BUILTIN_CODE_GENERATORS`**.
- Pure transforms: **`svgStringToJsx`**, **`svgToDataUri`**, **`applyCurrentColor`**,
  **`stripXmlProlog`**, **`toPascalCaseComponentName`**.

## Example — load a file

```ts
import { provideSvgEnginePlugin, builtinIoPlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(builtinIoPlugin)];

private readonly importers = inject(ImporterRegistry);
async loadFile(file: File) {
  const importer = this.importers.byMediaType('image/svg+xml');
  const result = importer?.import(await file.text());
  if (result?.ok) this.state.resetDocument(result.document);
}
```

:::note
The `builtinIoPlugin` / `pngExporterPlugin` wrappers (which auto-register these at
boot) live in `@mosaicoo/svg-engine/edit`; the bare functions above are for
headless tools.
:::
