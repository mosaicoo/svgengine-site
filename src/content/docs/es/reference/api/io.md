---
title: 'API: io'
description: API pública de @mosaicoo/svg-engine/io — registries de import/export, los formatos SVG/PNG/SVGZ integrados, code generators y utilidades de defs.
---

`@mosaicoo/svg-engine/io` mueve documentos hacia dentro y fuera del engine:
registries de import/export, los formatos de archivo integrados, generadores de
código fuente y helpers para fusionar `<defs>` reutilizables. Headless: sin Angular
Material/CDK.

```ts
import { ImporterRegistry, ExporterRegistry, svgImporter, svgExporter } from '@mosaicoo/svg-engine/io';
```

## Registries de import & export

Ambos registries son signal-backed; `register()` devuelve un `Disposable` para que
los plugins eliminen sus formatos de forma limpia. Las búsquedas siguen el orden de
inserción.

| API | Descripción |
| --- | --- |
| `ImporterRegistry` | Registry de importers: `register(importer)` → `Disposable`, `get(id)`, `byExtension(ext)`, `byMediaType(type)`, más el signal `importers`. |
| `ExporterRegistry` | Registry de exporters: misma forma (`register`, `get`, `byExtension`, `byMediaType`, signal `exporters`). |
| `Importer` / `Exporter` | Los contratos que un formato implementa (`id`, `name`, extensiones/media types y `import(text)` / `export(document)`). |
| `ImportResult` | El resultado de un import: `{ ok: true, document, warnings }` o `{ ok: false, error }` — el import es best-effort y nunca lanza con contenido no soportado. |

## Formatos integrados

| API | Formato | Notas |
| --- | --- | --- |
| `svgImporter` | SVG (entrada) | Parsea SVG XML a un documento. Sanea (descarta scripts, event handlers, hrefs `javascript:`); los elementos no soportados se omiten con aviso. |
| `svgExporter` | SVG (salida) | Serialización **determinista** y byte-estable (orden de atributos fijo, números con 6 decimales, identidad/vacío omitidos) — amigable con diffs y VCS. |
| `pngExporter` / `renderPng(doc, scale?)` | PNG (salida) | Rasteriza vía `<canvas>`; asíncrono (devuelve `Promise<Blob>`). Por defecto 2× de resolución. `renderPng` permite elegir la escala. |
| `svgzExporter` / `gzipText` / `gunzipText` | SVGZ (salida) | SVG comprimido por gzip (`.svgz`, ~70–90% menor) usando el `CompressionStream` de la plataforma — cero deps. `gzipText`/`gunzipText` son helpers reutilizables string↔bytes. |
| `nodeToSvgMarkup(node)` | — | Serializa un único nodo a markup SVG. |

:::tip
Los exporters pueden ser **síncronos o asíncronos**: SVG devuelve `string`,
PNG/SVGZ devuelven una `Promise`. Maneja ambos, p. ej.
`const out = await exporter.export(doc)`.
:::

## Code generators

Convierten un documento en una **cadena de código fuente** (no en un archivo).
Puros y worker-safe; el registry refleja los de import/export.

| API | Descripción |
| --- | --- |
| `CodeGeneratorRegistry` | Registry de generadores: `register(generator)` → `Disposable`, `get(id)`, signal `generators`. |
| `CodeGenerator` | El contrato: `id`, `name`, `language`, `extension`, `options` declarativas opcionales y `generate(document, options?)`. |
| `reactJsxGenerator` | Integrado: JSX `<svg>` inline con atributos camelCase. |
| `reactComponentGenerator` | Integrado: un archivo de componente React standalone. |
| `dataUriGenerator` | Integrado: una URI `data:image/svg+xml,…`. |
| `BUILTIN_CODE_GENERATORS` | El array de los tres generadores integrados. |

**Specs de opción** (para construir la UI de ajustes de un generador):
`CodeGeneratorOptionSpec` (unión de `CodeGeneratorTextOption` /
`CodeGeneratorBooleanOption` / `CodeGeneratorSelectOption`), `CodeGeneratorOptions`,
`CodeGeneratorOptionValue` y `resolveCodeGeneratorOptionDefaults(gen)` para sembrar
los defaults.

**Transformaciones de string reutilizables:** `svgStringToJsx`, `svgToDataUri`,
`applyCurrentColor` (hace los iconos tematizables), `stripXmlProlog`,
`toPascalCaseComponentName`.

## Trabajando con `<defs>`

Cuando importas contenido que trae sus propias definiciones reutilizables, estos
helpers las fusionan en el `<defs>` compartido del documento sin romper referencias.

| API | Descripción |
| --- | --- |
| `mergeDefsFragments(existing, incoming)` | Fusiona dos fragmentos `<defs>`, deduplicando por `id` de nivel superior (preserva la referencia cuando no hay nada nuevo). |
| `collectDefsIds(defs)` | Recopila todo `id` de elemento definido en un fragmento `<defs>`. |
| `namespaceCollidingDefs(root, defs, taken, prefix)` | Renombra solo los ids que colisionan con `taken`, reescribiendo toda referencia tanto en el defs como en el árbol de nodos. Devuelve `NamespacedDefs` (`root`, `defs`, mapa `renamed`). |
