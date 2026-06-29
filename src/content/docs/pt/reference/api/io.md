---
title: 'API: io'
description: API pública de @mosaicoo/svg-engine/io — import & export SVG/PNG/SVGZ, registries e code generators.
---

`@mosaicoo/svg-engine/io` é o entry point headless de **parse / sanitização /
serialização**: ler ou escrever SVG (e PNG/SVGZ) sem instanciar nenhuma UI de
editor. Sem dependência de Angular Material/CDK.

```ts
import { svgImporter, svgExporter } from '@mosaicoo/svg-engine/io';
```

## Tipos do contrato

- **`Importer`** — `mediaTypes`/`extensions` + `import(blob): ImportResult`.
- **`Exporter`** — `mediaType`/`extension` + `export(doc): string | Blob`.
- **`ImportResult`** — `{ ok: true, document, warnings } | { ok: false, error }`.

## Registries

- **`ImporterRegistry`** — `register`/`get`/`list` + `byMediaType` / `byExtension`.
- **`ExporterRegistry`** — mesma forma, para exporters de texto e binários.

## Import / export SVG

- **`svgImporter`** — parser SVG built-in. Sanitiza na entrada (remove
  `<script>`, handlers `on*` e hrefs `javascript:`).
- **`svgExporter`** — serializer SVG determinístico (ordem canônica de atributos,
  precisão numérica fixa; transforms identidade omitidos).
- **`nodeToSvgMarkup(node)`** — serializa um único nó em markup SVG.

## Export PNG

- **`pngExporter`** — `SvgDocument` → `Blob` PNG via `<canvas>` (suporta @1x/@2x/@3x).
- **`renderPng(...)`** — o helper puro de rasterização usado pelo `pngExporter`.

## SVGZ (SVG comprimido com gzip)

- **`svgzExporter`** — exporta SVG comprimido com gzip (`.svgz`).
- **`gzipText`** / **`gunzipText`** — helpers de gzip de baixo nível.

## Helpers de `<defs>`

- **`mergeDefsFragments`** — mescla fragmentos `<defs>` por id (mantém gradientes
  ao trocar o conteúdo de um Smart Object).
- **`collectDefsIds`**, **`namespaceCollidingDefs`**, **`NamespacedDefs`** —
  namespacing de ids `<defs>` colidentes ao mesclar SVGs de fontes diferentes.

## Code generators

Transformam um documento SVG em código-fonte (React / Data URI).

- Contrato: **`CodeGenerator`**, **`CodeGeneratorOptionSpec`**,
  **`CodeGeneratorTextOption`**, **`CodeGeneratorBooleanOption`**,
  **`CodeGeneratorSelectOption`**, **`CodeGeneratorOptions`**,
  **`CodeGeneratorOptionValue`**, **`resolveCodeGeneratorOptionDefaults`**.
- **`CodeGeneratorRegistry`** — registra/consulta generators.
- Built-ins: **`reactJsxGenerator`**, **`reactComponentGenerator`**,
  **`dataUriGenerator`**, **`BUILTIN_CODE_GENERATORS`**.
- Transforms puras: **`svgStringToJsx`**, **`svgToDataUri`**, **`applyCurrentColor`**,
  **`stripXmlProlog`**, **`toPascalCaseComponentName`**.

## Exemplo — carregar um arquivo

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
Os wrappers `builtinIoPlugin` / `pngExporterPlugin` (que auto-registram tudo no
boot) ficam em `@mosaicoo/svg-engine/edit`; as funções puras acima são para
ferramentas headless.
:::
