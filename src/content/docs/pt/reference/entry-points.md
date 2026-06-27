---
title: Entry points
description: Os entry points secundários da library e o que cada um contém.
---

A library expõe **entry points secundários** independentes e lazy-loadable.
Consumir `core` **não** arrasta `render`, `io`, `optimize`, `edit`, `ui` ou
`ai/*`.

A fronteira headless garante que `core`, `render`, `io`, `optimize` e `edit`
**não** importam `@angular/material`/`@angular/cdk` — apenas `ui` e `ai/nlu-ui`
podem.

| Entry point | Conteúdo (resumo) | Material? |
| --- | --- | --- |
| `@mosaicoo/svg-engine/core` | modelo, comandos, history, state, geometria, tree ops | Não |
| `@mosaicoo/svg-engine/render` | `<svge-renderer>`, diretivas por tipo, viewport, registry | Não |
| `@mosaicoo/svg-engine/io` | importer/exporter SVG/PNG + registries | Não |
| `@mosaicoo/svg-engine/optimize` | `OptimizerRegistry` + passes built-in | Não |
| `@mosaicoo/svg-engine/edit` | seleção, transform, snap, path editor, pathfinder, tools, plugins | Não |
| `@mosaicoo/svg-engine/ui` | `<svge-editor>`/`<svge-shell-pro>`, painéis, dialogs | Sim |
| `@mosaicoo/svg-engine/ai/nlu` | engine de linguagem natural (headless) | Não |
| `@mosaicoo/svg-engine/ai/nlu-ui` | caixa de comando texto/voz | Sim |
| `@mosaicoo/svg-engine/ai/nlu-voice-wasm` | speech-to-text on-device (Whisper) | Não |

:::note
A library é publicada no npm como
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).
Os detalhes completos da API pública estão no
[repositório da library](https://github.com/mosaicoo/svg-engine).
:::
