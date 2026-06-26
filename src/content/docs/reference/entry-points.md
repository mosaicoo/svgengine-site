---
title: Entry points
description: The library's secondary entry points and what each one contains.
---

The library exposes independent, lazy-loadable **secondary entry points**.
Consuming `core` does **not** pull in `render`, `io`, `optimize`, `edit`, `ui`
or `ai/*`.

The headless boundary guarantees that `core`, `render`, `io`, `optimize` and
`edit` do **not** import `@angular/material`/`@angular/cdk` — only `ui` and
`ai/nlu-ui` may.

| Entry point | Contents (summary) | Material? |
| --- | --- | --- |
| `@mosaicoo/svg-engine/core` | model, commands, history, state, geometry, tree ops | No |
| `@mosaicoo/svg-engine/render` | `<svge-renderer>`, per-type directives, viewport, registry | No |
| `@mosaicoo/svg-engine/io` | SVG/PNG importer/exporter + registries | No |
| `@mosaicoo/svg-engine/optimize` | `OptimizerRegistry` + built-in passes | No |
| `@mosaicoo/svg-engine/edit` | selection, transform, snap, path editor, pathfinder, tools, plugins | No |
| `@mosaicoo/svg-engine/ui` | `<svge-editor>`/`<svge-shell-pro>`, panels, dialogs | Yes |
| `@mosaicoo/svg-engine/ai/nlu` | natural-language engine (headless) | No |
| `@mosaicoo/svg-engine/ai/nlu-ui` | text/voice command box | Yes |
| `@mosaicoo/svg-engine/ai/nlu-voice-wasm` | on-device speech-to-text (Whisper) | No |

:::note
The library is published on npm as
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).
Public surface details live in the library's `docs/09-api-publica.md`.
:::
