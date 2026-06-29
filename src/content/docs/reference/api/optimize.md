---
title: 'API: optimize'
description: Public API of @mosaicoo/svg-engine/optimize — the optimizer registry, built-in passes and optimize command.
---

`@mosaicoo/svg-engine/optimize` is the headless **optimization pipeline**: shrink
and clean SVG documents without instantiating any editor UI. Zero Angular
Material/CDK dependency. The built-in passes are conservative — they never change
the visual render.

```ts
import { OptimizerRegistry, precisionOptimizer } from '@mosaicoo/svg-engine/optimize';
```

## Contract

- **`Optimizer`** — `id`/`name`/`order`/`defaultEnabled?` + `optimize(doc): doc`.

## Registry

- **`OptimizerRegistry`** — `register`/`get`/`list` + `runPipeline(doc, enabledIds?)`,
  which orders passes by `order` and chains them (returns the same reference when
  nothing changed).

## Command

- **`OptimizeCommand`** — wraps `runPipeline` as a single undo entry (for the
  editor; safe to ignore in headless usage).

## Built-in passes

| Pass | Effect |
| --- | --- |
| **`precisionOptimizer`** | round numerics to a fixed precision |
| **`dropDefaultsOptimizer`** | strip default values (`opacity:1`, etc.) |
| **`pruneEmptyGroupsOptimizer`** | remove empty `<g>` recursively (root preserved) |
| **`stripAuthoredTitlesOptimizer`** | opt-in — drop authored-name `<title>` children (D-072 follow-up) |

## Example — run the pipeline headlessly

```ts
const registry = inject(OptimizerRegistry);
registry.register(precisionOptimizer);
registry.register(dropDefaultsOptimizer);
const optimized = registry.runPipeline(doc);
```

:::note
The `builtinOptimizersPlugin` wrapper (which auto-registers the passes at boot)
lives in `@mosaicoo/svg-engine/edit`. Headless consumers register passes directly
or call each `optimize()` function in sequence.
:::
