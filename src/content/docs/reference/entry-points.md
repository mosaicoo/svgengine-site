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
| `svg-engine/core` | model, commands, history, state, geometry, tree ops | No |
| `svg-engine/render` | `<svge-renderer>`, per-type directives, viewport, registry | No |
| `svg-engine/io` | SVG/PNG importer/exporter + registries | No |
| `svg-engine/optimize` | `OptimizerRegistry` + built-in passes | No |
| `svg-engine/edit` | selection, transform, snap, path editor, pathfinder, tools, plugins | No |
| `svg-engine/ui` | `<svge-editor>`/`<svge-shell-pro>`, panels, dialogs | Yes |
| `svg-engine/ai/nlu` | natural-language engine (headless) | No |
| `svg-engine/ai/nlu-ui` | text/voice command box | Yes |
| `svg-engine/ai/nlu-voice-wasm` | on-device speech-to-text (Whisper) | No |

:::caution[Verify before release]
The table above reflects the folder structure (`ng-package.json` directories
under `projects/svg-engine/`). Confirm it against the repository when writing.
Public surface details live in the library's `docs/09-api-publica.md`.
:::
