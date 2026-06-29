---
title: 'API: io'
description: API pública de @mosaicoo/svg-engine/io — import & export SVG/PNG/SVGZ, registries y code generators.
---

`@mosaicoo/svg-engine/io` es el entry point headless de **parse / sanitización /
serialización**: leer o escribir SVG (y PNG/SVGZ) sin instanciar ninguna UI de
editor. Sin dependencia de Angular Material/CDK.

```ts
import { svgImporter, svgExporter } from '@mosaicoo/svg-engine/io';
```

## Tipos del contrato

- **`Importer`** — `mediaTypes`/`extensions` + `import(blob): ImportResult`.
- **`Exporter`** — `mediaType`/`extension` + `export(doc): string | Blob`.
- **`ImportResult`** — `{ ok: true, document, warnings } | { ok: false, error }`.

## Registries

- **`ImporterRegistry`** — `register`/`get`/`list` + `byMediaType` / `byExtension`.
- **`ExporterRegistry`** — la misma forma, para exporters de texto y binarios.

## Import / export SVG

- **`svgImporter`** — parser SVG built-in. Sanitiza a la entrada (elimina
  `<script>`, handlers `on*` y hrefs `javascript:`).
- **`svgExporter`** — serializer SVG determinista (orden canónico de atributos,
  precisión numérica fija; transforms identidad omitidos).
- **`nodeToSvgMarkup(node)`** — serializa un solo nodo a markup SVG.

## Export PNG

- **`pngExporter`** — `SvgDocument` → `Blob` PNG vía `<canvas>` (soporta @1x/@2x/@3x).
- **`renderPng(...)`** — el helper puro de rasterización usado por `pngExporter`.

## SVGZ (SVG comprimido con gzip)

- **`svgzExporter`** — exporta SVG comprimido con gzip (`.svgz`).
- **`gzipText`** / **`gunzipText`** — helpers de gzip de bajo nivel.

## Helpers de `<defs>`

- **`mergeDefsFragments`** — fusiona fragmentos `<defs>` por id (mantiene los
  gradientes al intercambiar el contenido de un Smart Object).
- **`collectDefsIds`**, **`namespaceCollidingDefs`**, **`NamespacedDefs`** —
  namespacing de ids `<defs>` que colisionan al fusionar SVGs de distintas
  fuentes.

## Code generators

Convierten un documento SVG en código fuente (React / Data URI).

- Contrato: **`CodeGenerator`**, **`CodeGeneratorOptionSpec`**,
  **`CodeGeneratorTextOption`**, **`CodeGeneratorBooleanOption`**,
  **`CodeGeneratorSelectOption`**, **`CodeGeneratorOptions`**,
  **`CodeGeneratorOptionValue`**, **`resolveCodeGeneratorOptionDefaults`**.
- **`CodeGeneratorRegistry`** — registra/consulta generators.
- Built-ins: **`reactJsxGenerator`**, **`reactComponentGenerator`**,
  **`dataUriGenerator`**, **`BUILTIN_CODE_GENERATORS`**.
- Transforms puras: **`svgStringToJsx`**, **`svgToDataUri`**, **`applyCurrentColor`**,
  **`stripXmlProlog`**, **`toPascalCaseComponentName`**.

## Ejemplo — cargar un archivo

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
Los wrappers `builtinIoPlugin` / `pngExporterPlugin` (que auto-registran todo en
el arranque) están en `@mosaicoo/svg-engine/edit`; las funciones puras de arriba
son para herramientas headless.
:::
