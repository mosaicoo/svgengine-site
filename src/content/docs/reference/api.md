---
title: API reference
description: The public API surface of svg-engine, organized by entry point.
---

This reference documents the **public API surface** of svg-engine — the symbols
exported from each entry point's `public-api.ts`. It is derived from the
library's source, which is the source of truth.

## What's public

Each secondary entry point exposes a curated set of classes, interfaces, types,
functions, services, commands and tokens. Anything not exported from an entry
point's `public-api.ts` is internal and may change without notice. The public
surface follows **SemVer** once the library reaches `1.0.0` (it is currently
`pre-1.0`, so the surface is still hardening).

The headless boundary applies here too: `core`, `render`, `io`, `optimize`,
`edit` and `ai/nlu` export **no** Angular Material/CDK types — only `ui` and
`ai/nlu-ui` do. See [Architecture](/svgengine-site/guides/architecture/).

## Entry points

| Entry point | What it exposes | Material? |
| --- | --- | --- |
| [`core`](/svgengine-site/reference/api/core/) | data model, immutable tree ops, document, commands, history/state services, geometry, animation, snapshots | No |
| [`render`](/svgengine-site/reference/api/render/) | the renderer, per-type directives, viewport, node-renderer registry | No |
| [`io`](/svgengine-site/reference/api/io/) | importer/exporter registries + SVG/PNG/SVGZ built-ins, code generators | No |
| [`optimize`](/svgengine-site/reference/api/optimize/) | optimizer registry + built-in passes + optimize command | No |
| [`edit`](/svgengine-site/reference/api/edit/) | selection, transform, tools, plugins, registries, libraries, pages, effects | No |
| [`ui`](/svgengine-site/reference/api/ui/) | shells, panels, dialogs, tool options, services | Yes |
| [`ai/nlu`](/svgengine-site/reference/api/ai-nlu/) | natural-language engine, dictionaries, matchers, LLM provider | No |
| [`ai/nlu-ui`](/svgengine-site/reference/api/ai-nlu-ui/) | command input component + voice services | Yes |
| [`ai/nlu-voice-wasm`](/svgengine-site/reference/api/ai-nlu-voice-wasm/) | on-device Whisper voice provider | No |

:::note
For the exact, most current signatures, the
[library repository](https://github.com/mosaicoo/svg-engine) is always
authoritative.
:::
