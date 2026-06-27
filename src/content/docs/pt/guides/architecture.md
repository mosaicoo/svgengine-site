---
title: Arquitetura
description: Como o svg-engine é estruturado — a fronteira headless, as dependências entre entry points, os modos de consumo e os princípios centrais.
---

O svg-engine é um workspace Angular v21. A library publicada
(`@mosaicoo/svg-engine`) é dividida em **nove entry points secundários** para
você consumir exatamente a camada que precisa, com tree-shaking real.

## A fronteira headless

A regra central é que as camadas headless nunca dependem de um toolkit de UI:

- `core`, `render`, `io`, `optimize`, `edit` e `ai/nlu` têm dependência **zero**
  de `@angular/material` ou `@angular/cdk`.
- Apenas `ui` e `ai/nlu-ui` podem importar Material/CDK — e ambos são opt-in.

É isso que permite embutir o engine em um app não-Material (ou até controlá-lo de
forma headless, sem nenhuma UI Angular) sem puxar uma stack de UI para o seu
bundle.

## Dependências entre entry points

Cada entry point só importa dos que estão abaixo dele — não há ciclos:

```text
ai/nlu-ui → ai/nlu                       (+ @angular/material)
ai/nlu    → edit, core
ui        → edit, io, render, core       (+ @angular/material, @angular/cdk)
edit      → optimize, io, render, core
render    → core
io        → core
optimize  → core
core      → (sem entry points internos; @angular/core + polygon-clipping bundled)
```

`@angular/material` e `@angular/cdk` são declarados como peer dependencies
**opcionais**, então um consumidor headless nunca precisa instalá-los.

## Quatro modos de consumo

A library é desenhada para quatro formas distintas de consumo (todas precisam
funcionar de forma independente):

| Modo | O que você importa | UI envolvida |
| --- | --- | --- |
| **1 — Headless** | serviços de `core` / `render` / `edit` | Nenhuma — você constrói a sua própria UI (Angular, React, Vue, CLI…) |
| **2 — Shell completo** | `ui` (`<svge-shell-pro>` ou `<svge-editor [shell]>`) | Um editor profissional completo, drop-in |
| **3 — Shell parcial** | `ui` (componentes individuais) | Escolha toolbar + inspector + painel de camadas e monte o seu layout |
| **4 — Só canvas** | `render` (`<svge-renderer>`) + gestos opcionais | Apenas o canvas com pan/zoom, sem painéis |

## Princípios centrais

- **Modelo imutável.** Cada mutação gera uma nova árvore (structural sharing). O
  undo é snapshot e replay, não um sistema frágil de deltas.
- **Signals primeiro.** O estado reativo é `signal`/`computed`; não há Subjects
  do RxJS na API pública.
- **Command pattern.** Cada mutação passa por um único `CommandBus`, então
  undo/redo é automático e consistente.
- **OnPush em tudo.** Todo componente usa
  `ChangeDetectionStrategy.OnPush`.
- **Superfície tree-shakeable.** Cada entry point expõe um único `public-api`; os
  internos nunca vazam.

## Como a funcionalidade é registrada

Dentro de `edit`, **registries de capacidade** (tools, menus, atalhos, paletas,
efeitos, …) guardam a funcionalidade do editor. Os componentes em `ui` apenas
**leem** esses registries; os plugins **populam** eles. Nenhum componente de UI
tem lista hardcoded de tools ou itens de menu — tudo aparece via registro
dinâmico. Essa é a base do [sistema de plugins](/svgengine-site/pt/guides/plugins/).

:::note
Veja a referência de [Entry points](/svgengine-site/pt/reference/entry-points/)
para um detalhamento por entry point, e o
[repositório da library](https://github.com/mosaicoo/svg-engine) para o grafo
completo de dependências.
:::
