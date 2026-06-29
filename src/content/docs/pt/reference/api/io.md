---
title: 'API: io'
description: API pública de @mosaicoo/svg-engine/io — registries de import/export, os formatos SVG/PNG/SVGZ built-in, code generators e utilitários de defs.
---

`@mosaicoo/svg-engine/io` move documentos para dentro e para fora do engine:
registries de import/export, os formatos de arquivo built-in, geradores de
código-fonte e helpers para mesclar `<defs>` reutilizáveis. Headless: sem Angular
Material/CDK.

```ts
import { ImporterRegistry, ExporterRegistry, svgImporter, svgExporter } from '@mosaicoo/svg-engine/io';
```

## Registries de import & export

Ambos os registries são signal-backed; `register()` retorna um `Disposable` para
que plugins removam seus formatos de forma limpa. As buscas seguem a ordem de
inserção.

| API | Descrição |
| --- | --- |
| `ImporterRegistry` | Registry de importers: `register(importer)` → `Disposable`, `get(id)`, `byExtension(ext)`, `byMediaType(type)`, mais o signal `importers`. |
| `ExporterRegistry` | Registry de exporters: mesma forma (`register`, `get`, `byExtension`, `byMediaType`, signal `exporters`). |
| `Importer` / `Exporter` | Os contratos que um formato implementa (`id`, `name`, extensões/media types e `import(text)` / `export(document)`). |
| `ImportResult` | O resultado de um import: `{ ok: true, document, warnings }` ou `{ ok: false, error }` — o import é best-effort e nunca lança em conteúdo não suportado. |

## Formatos built-in

| API | Formato | Notas |
| --- | --- | --- |
| `svgImporter` | SVG (entrada) | Faz parse de SVG XML num documento. Sanitiza (descarta scripts, event handlers, hrefs `javascript:`); elementos não suportados são pulados com aviso. |
| `svgExporter` | SVG (saída) | Serialização **determinística** e byte-estável (ordem de atributos fixa, números com 6 decimais, identidade/vazio omitidos) — amigável a diffs e VCS. |
| `pngExporter` / `renderPng(doc, scale?)` | PNG (saída) | Rasteriza via `<canvas>`; assíncrono (retorna `Promise<Blob>`). Padrão 2× de resolução. `renderPng` permite escolher a escala. |
| `svgzExporter` / `gzipText` / `gunzipText` | SVGZ (saída) | SVG comprimido por gzip (`.svgz`, ~70–90% menor) usando o `CompressionStream` da plataforma — zero deps. `gzipText`/`gunzipText` são helpers reutilizáveis string↔bytes. |
| `nodeToSvgMarkup(node)` | — | Serializa um único nó em markup SVG. |

:::tip
Exporters podem ser **síncronos ou assíncronos**: SVG retorna `string`, PNG/SVGZ
retornam uma `Promise`. Trate ambos, p.ex. `const out = await exporter.export(doc)`.
:::

## Code generators

Transformam um documento numa **string de código-fonte** (não num arquivo). Puros e
worker-safe; o registry espelha os de import/export.

| API | Descrição |
| --- | --- |
| `CodeGeneratorRegistry` | Registry de geradores: `register(generator)` → `Disposable`, `get(id)`, signal `generators`. |
| `CodeGenerator` | O contrato: `id`, `name`, `language`, `extension`, `options` declarativas opcionais e `generate(document, options?)`. |
| `reactJsxGenerator` | Built-in: JSX `<svg>` inline com atributos camelCase. |
| `reactComponentGenerator` | Built-in: um arquivo de componente React standalone. |
| `dataUriGenerator` | Built-in: uma URI `data:image/svg+xml,…`. |
| `BUILTIN_CODE_GENERATORS` | O array dos três geradores built-in. |

**Specs de opção** (para construir a UI de configurações de um gerador):
`CodeGeneratorOptionSpec` (união de `CodeGeneratorTextOption` /
`CodeGeneratorBooleanOption` / `CodeGeneratorSelectOption`), `CodeGeneratorOptions`,
`CodeGeneratorOptionValue` e `resolveCodeGeneratorOptionDefaults(gen)` para semear
os defaults.

**Transformações de string reutilizáveis:** `svgStringToJsx`, `svgToDataUri`,
`applyCurrentColor` (torna ícones temáveis), `stripXmlProlog`,
`toPascalCaseComponentName`.

## Trabalhando com `<defs>`

Quando você importa conteúdo que traz suas próprias definições reutilizáveis, estes
helpers as mesclam no `<defs>` compartilhado do documento sem quebrar referências.

| API | Descrição |
| --- | --- |
| `mergeDefsFragments(existing, incoming)` | Mescla dois fragmentos `<defs>`, deduplicando por `id` de topo (preserva a referência quando nada é novo). |
| `collectDefsIds(defs)` | Coleta todo `id` de elemento definido num fragmento `<defs>`. |
| `namespaceCollidingDefs(root, defs, taken, prefix)` | Renomeia só os ids que colidem com `taken`, reescrevendo toda referência tanto no defs quanto na árvore de nós. Retorna `NamespacedDefs` (`root`, `defs`, mapa `renamed`). |
