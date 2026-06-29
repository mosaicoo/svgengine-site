---
title: 'API: optimize'
description: API pública de @mosaicoo/svg-engine/optimize — el registry de optimizer, los passes integrados y el comando de optimización con undo.
---

`@mosaicoo/svg-engine/optimize` es un pipeline pequeño y enchufable de passes
**puros** documento-a-documento que reducen y limpian un SVG. Cada passe es libre de
efectos secundarios y worker-safe. Headless: sin Angular Material/CDK.

```ts
import { OptimizerRegistry, precisionOptimizer } from '@mosaicoo/svg-engine/optimize';
```

## Registry & pipeline

| API | Descripción | Úsalo para |
| --- | --- | --- |
| `OptimizerRegistry` | Registry de passes: `register(optimizer)` → `Disposable`, `get(id)`, el signal `optimizers` y `runPipeline(document, enabledIds?)`. | Registrar passes personalizados y ejecutar el pipeline programáticamente. |
| `Optimizer` | El contrato de passe: `id`, `name`, `description` opcional, `order` (menor corre primero; por defecto 100), `defaultEnabled` (por defecto `true`) y un `optimize(document)` puro. | Implementar tu propio passe de optimización. |

`runPipeline` ejecuta los passes habilitados en `order` ascendente. Pasa un conjunto
`enabledIds` para seleccionar passes específicos; omítelo para ejecutar todo passe
cuyo `defaultEnabled` no sea `false`. Devuelve un documento nuevo — o el original si
nada cambió.

## Passes integrados

| Passe | Order | Por defecto | Qué hace |
| --- | --- | --- | --- |
| `precisionOptimizer` | 10 | activado | Redondea números de geometría/transform/estilo a una precisión fija (por defecto 3 decimales), eliminando ruido de float como `0.30000000000000004`. |
| `dropDefaultsOptimizer` | 50 | activado | Elimina atributos de presentación iguales al default de SVG (`opacity:1`, `visibility:visible`, …). |
| `pruneEmptyGroupsOptimizer` | — | activado | Elimina grupos vacíos del árbol. |
| `stripAuthoredTitlesOptimizer` | 80 | **desactivado** | Indica al exporter que omita el `<title>` emitido para nodos nombrados (mantiene `metadata.name` en el modelo; solo del lado de la exportación, reversible). Opt-in para minificación de producción. |

## Optimización con undo

| API | Descripción |
| --- | --- |
| `OptimizeCommand` | Envuelve una ejecución completa del pipeline como **un** comando con undo (`isDestructive: true`), de modo que optimizar dentro de un editor produce una sola entrada de `Ctrl+Z`. No-op cuando el pipeline no cambia nada. |

:::note
En uso headless normalmente llamas a `registry.runPipeline()` directamente; el
`OptimizeCommand` existe para la integración con el undo/redo del editor. Ver los
[comandos de core](/svgengine-site/es/reference/api/core/#comandos--el-vocabulario-de-mutación).
:::
