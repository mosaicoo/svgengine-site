---
title: Referencia de la API
description: La superficie de API pública de svg-engine, organizada por entry point.
---

Esta referencia documenta la **superficie de API pública** de svg-engine — los
símbolos exportados por el `public-api.ts` de cada entry point. Se deriva del
código fuente de la librería, que es la fuente de la verdad.

## Qué es público

Cada entry point secundario expone un conjunto curado de clases, interfaces,
tipos, funciones, servicios, comandos y tokens. Todo lo que no se exporta desde
el `public-api.ts` de un entry point es interno y puede cambiar sin aviso. La
superficie pública sigue **SemVer** a partir de `1.0.0` (actualmente es `pre-1.0`,
así que la superficie aún se está estabilizando).

La frontera headless también aplica aquí: `core`, `render`, `io`, `optimize`,
`edit` y `ai/nlu` **no** exportan tipos de Angular Material/CDK — solo `ui` y
`ai/nlu-ui` lo hacen. Mira [Arquitectura](/svgengine-site/es/guides/architecture/).

## Entry points

| Entry point | Qué expone | ¿Material? |
| --- | --- | --- |
| [`core`](/svgengine-site/es/reference/api/core/) | modelo de datos, tree ops inmutables, document, comandos, servicios de history/state, geometría, animación, snapshots | No |
| [`render`](/svgengine-site/es/reference/api/render/) | el renderer, directivas por tipo, viewport, registry de node-renderer | No |
| [`io`](/svgengine-site/es/reference/api/io/) | registries de importer/exporter + built-ins SVG/PNG/SVGZ, code generators | No |
| [`optimize`](/svgengine-site/es/reference/api/optimize/) | registry de optimizer + passes built-in + optimize command | No |
| `edit` | selección, transform, tools, plugins, registries, libraries, pages, efectos | No |
| `ui` | shells, paneles, dialogs, tool options, servicios | Sí |
| `ai/nlu` | motor de lenguaje natural, diccionarios, matchers, provider LLM | No |
| `ai/nlu-ui` | componente de input de comando + servicios de voz | Sí |
| `ai/nlu-voice-wasm` | provider de voz Whisper en el dispositivo | No |

:::note
Esta referencia se está ampliando entry point por entry point. Para las firmas
exactas y más actuales, el
[repositorio de la librería](https://github.com/mosaicoo/svg-engine) es siempre
autoritativo.
:::
