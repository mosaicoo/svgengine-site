---
title: 'API: optimize'
description: API pública de @mosaicoo/svg-engine/optimize — el registry de optimizer, passes built-in y optimize command.
---

`@mosaicoo/svg-engine/optimize` es el **pipeline de optimización** headless:
encoge y limpia documentos SVG sin instanciar ninguna UI de editor. Sin
dependencia de Angular Material/CDK. Los passes built-in son conservadores —
nunca cambian el render visual.

```ts
import { OptimizerRegistry, precisionOptimizer } from '@mosaicoo/svg-engine/optimize';
```

## Contrato

- **`Optimizer`** — `id`/`name`/`order`/`defaultEnabled?` + `optimize(doc): doc`.

## Registry

- **`OptimizerRegistry`** — `register`/`get`/`list` + `runPipeline(doc, enabledIds?)`,
  que ordena los passes por `order` y los encadena (devuelve la misma referencia
  cuando nada cambia).

## Comando

- **`OptimizeCommand`** — envuelve `runPipeline` como una única entrada de undo
  (para el editor; se puede ignorar en uso headless).

## Passes built-in

| Pass | Efecto |
| --- | --- |
| **`precisionOptimizer`** | redondea numerics a una precisión fija |
| **`dropDefaultsOptimizer`** | elimina valores por defecto (`opacity:1`, etc.) |
| **`pruneEmptyGroupsOptimizer`** | elimina `<g>` vacío recursivamente (root preservado) |
| **`stripAuthoredTitlesOptimizer`** | opt-in — elimina `<title>` de nombre autoral (follow-up D-072) |

## Ejemplo — ejecutar el pipeline headless

```ts
const registry = inject(OptimizerRegistry);
registry.register(precisionOptimizer);
registry.register(dropDefaultsOptimizer);
const optimized = registry.runPipeline(doc);
```

:::note
El wrapper `builtinOptimizersPlugin` (que auto-registra los passes en el arranque)
está en `@mosaicoo/svg-engine/edit`. Los consumidores headless registran passes
directamente o llaman a cada `optimize()` en secuencia.
:::
