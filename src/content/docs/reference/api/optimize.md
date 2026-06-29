---
title: 'API: optimize'
description: Public API of @mosaicoo/svg-engine/optimize — the optimizer registry, built-in passes and the undoable optimize command.
---

`@mosaicoo/svg-engine/optimize` is a small, pluggable pipeline of **pure**
document-to-document passes that shrink and clean up an SVG. Every pass is
side-effect-free and worker-safe. Headless: no Angular Material/CDK.

```ts
import { OptimizerRegistry, precisionOptimizer } from '@mosaicoo/svg-engine/optimize';
```

## Registry & pipeline

| API | Description | Use it to |
| --- | --- | --- |
| `OptimizerRegistry` | Registry of passes: `register(optimizer)` → `Disposable`, `get(id)`, the `optimizers` signal, and `runPipeline(document, enabledIds?)`. | Register custom passes and run the pipeline programmatically. |
| `Optimizer` | The pass contract: `id`, `name`, optional `description`, `order` (lower runs first; default 100), `defaultEnabled` (default `true`), and a pure `optimize(document)`. | Implement your own optimization pass. |

`runPipeline` runs the enabled passes in ascending `order`. Pass an `enabledIds`
set to select specific passes; omit it to run every pass whose `defaultEnabled`
isn't `false`. It returns a new document — or the original if nothing changed.

## Built-in passes

| Pass | Order | Default | What it does |
| --- | --- | --- | --- |
| `precisionOptimizer` | 10 | on | Round geometry/transform/style numbers to a fixed precision (default 3 dp), removing float noise like `0.30000000000000004`. |
| `dropDefaultsOptimizer` | 50 | on | Drop presentation attributes equal to the SVG default (`opacity:1`, `visibility:visible`, …). |
| `pruneEmptyGroupsOptimizer` | — | on | Remove empty groups from the tree. |
| `stripAuthoredTitlesOptimizer` | 80 | **off** | Tell the exporter to omit the `<title>` emitted for named nodes (keeps `metadata.name` on the model; export-side only, reversible). Opt-in for production minification. |

## Undoable optimization

| API | Description |
| --- | --- |
| `OptimizeCommand` | Wraps a full pipeline run as **one** undoable command (`isDestructive: true`), so optimizing inside an editor produces a single `Ctrl+Z` entry. No-op when the pipeline changes nothing. |

:::note
In headless usage you typically call `registry.runPipeline()` directly;
`OptimizeCommand` exists for editor integration with undo/redo. See the
[core commands](/svgengine-site/reference/api/core/#commands--the-mutation-vocabulary).
:::
