---
title: 'API: optimize'
description: API pública de @mosaicoo/svg-engine/optimize — o registry de optimizer, os passes built-in e o comando de otimização com undo.
---

`@mosaicoo/svg-engine/optimize` é um pipeline pequeno e plugável de passes
**puros** documento-para-documento que encolhem e limpam um SVG. Todo passe é livre
de efeitos colaterais e worker-safe. Headless: sem Angular Material/CDK.

```ts
import { OptimizerRegistry, precisionOptimizer } from '@mosaicoo/svg-engine/optimize';
```

## Registry & pipeline

| API | Descrição | Use para |
| --- | --- | --- |
| `OptimizerRegistry` | Registry de passes: `register(optimizer)` → `Disposable`, `get(id)`, o signal `optimizers` e `runPipeline(document, enabledIds?)`. | Registrar passes customizados e rodar o pipeline programaticamente. |
| `Optimizer` | O contrato de passe: `id`, `name`, `description` opcional, `order` (menor roda primeiro; padrão 100), `defaultEnabled` (padrão `true`) e um `optimize(document)` puro. | Implementar seu próprio passe de otimização. |

`runPipeline` roda os passes habilitados em `order` ascendente. Passe um conjunto
`enabledIds` para selecionar passes específicos; omita-o para rodar todo passe cujo
`defaultEnabled` não seja `false`. Retorna um novo documento — ou o original se nada
mudou.

## Passes built-in

| Passe | Order | Padrão | O que faz |
| --- | --- | --- | --- |
| `precisionOptimizer` | 10 | ligado | Arredonda números de geometria/transform/estilo a uma precisão fixa (padrão 3 casas), removendo ruído de float como `0.30000000000000004`. |
| `dropDefaultsOptimizer` | 50 | ligado | Remove atributos de apresentação iguais ao default do SVG (`opacity:1`, `visibility:visible`, …). |
| `pruneEmptyGroupsOptimizer` | — | ligado | Remove grupos vazios da árvore. |
| `stripAuthoredTitlesOptimizer` | 80 | **desligado** | Diz ao exporter para omitir o `<title>` emitido para nós nomeados (mantém `metadata.name` no modelo; só do lado da exportação, reversível). Opt-in para minificação de produção. |

## Otimização com undo

| API | Descrição |
| --- | --- |
| `OptimizeCommand` | Encapsula uma execução completa do pipeline como **um** comando com undo (`isDestructive: true`), de modo que otimizar dentro de um editor produz uma única entrada de `Ctrl+Z`. No-op quando o pipeline não muda nada. |

:::note
Em uso headless você normalmente chama `registry.runPipeline()` diretamente; o
`OptimizeCommand` existe para integração com o undo/redo do editor. Veja os
[comandos do core](/svgengine-site/pt/reference/api/core/#comandos--o-vocabulário-de-mutação).
:::
