---
title: 'API: optimize'
description: API pública de @mosaicoo/svg-engine/optimize — o registry de optimizer, passes built-in e optimize command.
---

`@mosaicoo/svg-engine/optimize` é o **pipeline de otimização** headless: encolhe e
limpa documentos SVG sem instanciar nenhuma UI de editor. Sem dependência de
Angular Material/CDK. Os passes built-in são conservadores — nunca alteram o
render visual.

```ts
import { OptimizerRegistry, precisionOptimizer } from '@mosaicoo/svg-engine/optimize';
```

## Contrato

- **`Optimizer`** — `id`/`name`/`order`/`defaultEnabled?` + `optimize(doc): doc`.

## Registry

- **`OptimizerRegistry`** — `register`/`get`/`list` + `runPipeline(doc, enabledIds?)`,
  que ordena os passes por `order` e os encadeia (retorna a mesma referência
  quando nada muda).

## Comando

- **`OptimizeCommand`** — envolve o `runPipeline` como uma única entrada de undo
  (para o editor; pode ser ignorado em uso headless).

## Passes built-in

| Pass | Efeito |
| --- | --- |
| **`precisionOptimizer`** | arredonda numerics para uma precisão fixa |
| **`dropDefaultsOptimizer`** | remove valores default (`opacity:1`, etc.) |
| **`pruneEmptyGroupsOptimizer`** | remove `<g>` vazio recursivamente (root preservado) |
| **`stripAuthoredTitlesOptimizer`** | opt-in — remove `<title>` de nome autoral (follow-up D-072) |

## Exemplo — rodar o pipeline headless

```ts
const registry = inject(OptimizerRegistry);
registry.register(precisionOptimizer);
registry.register(dropDefaultsOptimizer);
const optimized = registry.runPipeline(doc);
```

:::note
O wrapper `builtinOptimizersPlugin` (que auto-registra os passes no boot) fica em
`@mosaicoo/svg-engine/edit`. Consumidores headless registram passes diretamente ou
chamam cada `optimize()` em sequência.
:::
