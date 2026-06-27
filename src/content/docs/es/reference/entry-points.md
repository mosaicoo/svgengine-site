---
title: Entry points
description: Los entry points secundarios de la librería y qué contiene cada uno.
---

La librería expone **entry points secundarios** independientes y lazy-loadable.
Consumir `core` **no** arrastra `render`, `io`, `optimize`, `edit`, `ui` ni
`ai/*`.

La frontera headless garantiza que `core`, `render`, `io`, `optimize` y `edit`
**no** importan `@angular/material`/`@angular/cdk` — solo `ui` y `ai/nlu-ui`
pueden.

| Entry point | Contenido (resumen) | ¿Material? |
| --- | --- | --- |
| `@mosaicoo/svg-engine/core` | modelo, comandos, history, state, geometría, tree ops | No |
| `@mosaicoo/svg-engine/render` | `<svge-renderer>`, directivas por tipo, viewport, registry | No |
| `@mosaicoo/svg-engine/io` | importer/exporter SVG/PNG + registries | No |
| `@mosaicoo/svg-engine/optimize` | `OptimizerRegistry` + passes built-in | No |
| `@mosaicoo/svg-engine/edit` | selección, transform, snap, path editor, pathfinder, tools, plugins | No |
| `@mosaicoo/svg-engine/ui` | `<svge-editor>`/`<svge-shell-pro>`, paneles, dialogs | Sí |
| `@mosaicoo/svg-engine/ai/nlu` | motor de lenguaje natural (headless) | No |
| `@mosaicoo/svg-engine/ai/nlu-ui` | caja de comando texto/voz | Sí |
| `@mosaicoo/svg-engine/ai/nlu-voice-wasm` | speech-to-text en el dispositivo (Whisper) | No |

:::note
La librería se publica en npm como
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).
Los detalles completos de la API pública están en el
[repositorio de la librería](https://github.com/mosaicoo/svg-engine).
:::
