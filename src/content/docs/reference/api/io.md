---
title: 'API: io'
description: Public API of @mosaicoo/svg-engine/io — import/export registries, the built-in SVG/PNG/SVGZ formats, code generators and defs utilities.
---

`@mosaicoo/svg-engine/io` moves documents in and out of the engine: import/export
registries, the built-in file formats, source-code generators, and helpers for
merging reusable `<defs>`. Headless: no Angular Material/CDK.

```ts
import { ImporterRegistry, ExporterRegistry, svgImporter, svgExporter } from '@mosaicoo/svg-engine/io';
```

## Import & export registries

Both registries are signal-backed; `register()` returns a `Disposable` so plugins
can cleanly remove their formats. Lookups are insertion-ordered.

| API | Description |
| --- | --- |
| `ImporterRegistry` | Registry of importers: `register(importer)` → `Disposable`, `get(id)`, `byExtension(ext)`, `byMediaType(type)`, plus the `importers` signal. |
| `ExporterRegistry` | Registry of exporters: same shape (`register`, `get`, `byExtension`, `byMediaType`, `exporters` signal). |
| `Importer` / `Exporter` | The contracts a format implements (`id`, `name`, extensions/media types, and `import(text)` / `export(document)`). |
| `ImportResult` | The outcome of an import: `{ ok: true, document, warnings }` or `{ ok: false, error }` — import is best-effort and never throws on unsupported content. |

## Built-in formats

| API | Format | Notes |
| --- | --- | --- |
| `svgImporter` | SVG in | Parses SVG XML into a document. Sanitizes (drops scripts, event handlers, `javascript:` hrefs); unsupported elements are skipped with a warning. |
| `svgExporter` | SVG out | **Deterministic**, byte-stable serialization (fixed attribute order, 6-decimal numbers, identity/empty omitted) — diff- and VCS-friendly. |
| `pngExporter` / `renderPng(doc, scale?)` | PNG out | Rasterizes via `<canvas>`; async (returns a `Promise<Blob>`). Defaults to 2× resolution. `renderPng` lets you pick the scale. |
| `svgzExporter` / `gzipText` / `gunzipText` | SVGZ out | Gzip-compressed SVG (`.svgz`, ~70–90% smaller) using the platform `CompressionStream` — zero deps. `gzipText`/`gunzipText` are reusable string↔bytes helpers. |
| `nodeToSvgMarkup(node)` | — | Serialize a single node to SVG markup. |

:::tip
Exporters may be **sync or async**: SVG returns a `string`, PNG/SVGZ return a
`Promise`. Handle both, e.g. `const out = await exporter.export(doc)`.
:::

## Code generators

Turn a document into a **string of source code** (not a file). Pure and
worker-safe; the registry mirrors the import/export ones.

| API | Description |
| --- | --- |
| `CodeGeneratorRegistry` | Registry of generators: `register(generator)` → `Disposable`, `get(id)`, `generators` signal. |
| `CodeGenerator` | The contract: `id`, `name`, `language`, `extension`, optional declarative `options`, and `generate(document, options?)`. |
| `reactJsxGenerator` | Built-in: inline `<svg>` JSX with camelCased attributes. |
| `reactComponentGenerator` | Built-in: a standalone React component file. |
| `dataUriGenerator` | Built-in: a `data:image/svg+xml,…` URI. |
| `BUILTIN_CODE_GENERATORS` | The array of the three built-in generators. |

**Option specs** (for building a generator's settings UI): `CodeGeneratorOptionSpec`
(union of `CodeGeneratorTextOption` / `CodeGeneratorBooleanOption` /
`CodeGeneratorSelectOption`), `CodeGeneratorOptions`, `CodeGeneratorOptionValue`,
and `resolveCodeGeneratorOptionDefaults(gen)` to seed defaults.

**Reusable string transforms:** `svgStringToJsx`, `svgToDataUri`, `applyCurrentColor`
(make icons themeable), `stripXmlProlog`, `toPascalCaseComponentName`.

## Working with `<defs>`

When you import content that brings its own reusable definitions, these helpers
merge them into the document's shared `<defs>` without breaking references.

| API | Description |
| --- | --- |
| `mergeDefsFragments(existing, incoming)` | Merge two `<defs>` fragments, deduping by top-level `id` (reference-preserving when nothing is new). |
| `collectDefsIds(defs)` | Collect every element `id` defined in a `<defs>` fragment. |
| `namespaceCollidingDefs(root, defs, taken, prefix)` | Rename only the ids that collide with `taken`, rewriting every reference in both the defs and the node tree. Returns `NamespacedDefs` (`root`, `defs`, `renamed` map). |
