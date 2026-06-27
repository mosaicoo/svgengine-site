---
title: Arquitectura
description: Cómo está estructurado svg-engine — la frontera headless, las dependencias entre entry points, los modos de consumo y los principios centrales.
---

svg-engine es un workspace Angular v21. La librería publicada
(`@mosaicoo/svg-engine`) se divide en **nueve entry points secundarios** para que
consumas exactamente la capa que necesitas, con tree-shaking real.

## La frontera headless

La regla central es que las capas headless nunca dependen de un toolkit de UI:

- `core`, `render`, `io`, `optimize`, `edit` y `ai/nlu` tienen dependencia
  **cero** de `@angular/material` o `@angular/cdk`.
- Solo `ui` y `ai/nlu-ui` pueden importar Material/CDK — y ambos son opt-in.

Esto es lo que permite embeber el motor en una app no-Material (o incluso
controlarlo de forma headless, sin ninguna UI Angular) sin meter una stack de UI
en tu bundle.

## Dependencias entre entry points

Cada entry point solo importa de los que están debajo de él — no hay ciclos:

```text
ai/nlu-ui → ai/nlu                       (+ @angular/material)
ai/nlu    → edit, core
ui        → edit, io, render, core       (+ @angular/material, @angular/cdk)
edit      → optimize, io, render, core
render    → core
io        → core
optimize  → core
core      → (sin entry points internos; @angular/core + polygon-clipping bundled)
```

`@angular/material` y `@angular/cdk` se declaran como peer dependencies
**opcionales**, así que un consumidor headless nunca tiene que instalarlas.

## Cuatro modos de consumo

La librería está diseñada para cuatro formas distintas de consumo (todas deben
funcionar de forma independiente):

| Modo | Qué importas | UI involucrada |
| --- | --- | --- |
| **1 — Headless** | servicios de `core` / `render` / `edit` | Ninguna — construyes tu propia UI (Angular, React, Vue, CLI…) |
| **2 — Shell completo** | `ui` (`<svge-shell-pro>` o `<svge-editor [shell]>`) | Un editor profesional completo, drop-in |
| **3 — Shell parcial** | `ui` (componentes individuales) | Elige toolbar + inspector + panel de capas y arma tu propio layout |
| **4 — Solo canvas** | `render` (`<svge-renderer>`) + gestos opcionales | Solo el canvas con pan/zoom, sin paneles |

## Principios centrales

- **Modelo inmutable.** Cada mutación produce un nuevo árbol (structural
  sharing). El undo es snapshot y replay, no un frágil sistema de deltas.
- **Signals primero.** El estado reactivo es `signal`/`computed`; no hay Subjects
  de RxJS en la API pública.
- **Patrón Command.** Cada mutación pasa por un único `CommandBus`, así que
  undo/redo es automático y consistente.
- **OnPush en todo.** Cada componente usa
  `ChangeDetectionStrategy.OnPush`.
- **Superficie tree-shakeable.** Cada entry point expone un único `public-api`;
  los internos nunca se filtran.

## Cómo se registra la funcionalidad

Dentro de `edit`, los **registries de capacidad** (tools, menús, atajos, paletas,
efectos, …) contienen la funcionalidad del editor. Los componentes en `ui` solo
**leen** esos registries; los plugins los **pueblan**. Ningún componente de UI
tiene una lista hardcodeada de tools o ítems de menú — todo aparece mediante
registro dinámico. Esa es la base del
[sistema de plugins](/svgengine-site/es/guides/plugins/).

:::note
Mira la referencia de [Entry points](/svgengine-site/es/reference/entry-points/)
para un desglose por entry point, y el
[repositorio de la librería](https://github.com/mosaicoo/svg-engine) para el
grafo completo de dependencias.
:::
