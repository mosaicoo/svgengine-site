---
title: Funcionalidades
description: Qué puedes construir con svg-engine — dibujo, geometría, documentos, estilo, productividad, IA, accesibilidad y rendimiento.
---

svg-engine alcanza un conjunto de funciones comparable al de las herramientas
vectoriales de escritorio, todo sobre el mismo motor headless. Todo lo de abajo
está disponible mediante el editor y, cuando aplica, mediante la API
programática de comandos.

## Dibujo

- Herramientas Select y Direct-Select.
- Dibujo con Pen (Bézier) y Pencil (a mano alzada).
- Herramientas de forma: Rectangle, Ellipse, Polygon (y estrella).
- Texto con runs de rich-text, variable fonts y texto sobre path.
- Herramientas extra: Eyedropper, Knife, Smooth, Gradient, Width, Symbol Sprayer.

## Geometría

- Editor de Path / Anchor con tres tipos de anchor — **cusp**, **smooth** y
  **symmetric** (comportamiento equivalente a Illustrator/Affinity).
- Operaciones booleanas del Pathfinder: Union, Intersect, Subtract, Exclude,
  Divide.
- Operaciones de path: simplify, split, join, reverse, outline stroke, offset.
- Live corners y compound paths.

Las mismas operaciones que dispara la UI están disponibles como comandos:

```ts
import { CommandBus, UnionCommand, DivideCommand } from '@mosaicoo/svg-engine/core';

// Combina formas en un único path
bus.dispatch(new UnionCommand([rectId, circleId]));

// Divide formas superpuestas — cada región se convierte en su propio path
bus.dispatch(new DivideCommand([rectId, circleId]));
```

## Documentos

- Pages / artboards.
- Capas, con visibilidad y bloqueo.
- Smart Objects.
- Símbolos e instancias (master/instance).
- Snapshots de versión.
- Autoguardado y recuperación.

## Estilo

- Efectos y filtros no destructivos y encadenables.
- Gradientes con editor inline.
- Patterns.
- Un sistema de libraries: formas, paletas, gradientes, patterns, símbolos,
  brushes, graphic styles y plantillas.

## Productividad

- Find &amp; Replace.
- Alinear y distribuir.
- Atajos de teclado configurables.
- Auto-trace (raster → vector).
- Code generators (React, Data URI).
- Export por asset.
- Línea de tiempo de animación.

## IA (opt-in)

- Comando por lenguaje natural.
- Speech-to-text en el dispositivo (Whisper) — totalmente opcional y desacoplado
  del core del editor. Mira los
  [Entry points](/svgengine-site/es/reference/entry-points/) para los paquetes
  `ai/*`.

## Accesibilidad

Los roles ARIA y la navegación por teclado están implementados en cada
superficie interactiva — overlays, paneles y handles — siguiendo las WAI-ARIA
Authoring Practices.

## Rendimiento

El renderer apunta a **60 fps de pan/zoom con 1.000+ nodos**, con una directiva
opt-in de viewport culling para documentos dispersos.

:::tip[Pruébalo]
Instala el paquete y renderiza tu primer documento en
[Primeros pasos](/svgengine-site/es/guides/getting-started/), o aprende a añadir
tus propias tools y comandos en
[Plugins](/svgengine-site/es/guides/plugins/).
:::
