---
title: Recursos
description: O que você pode construir com o svg-engine — desenho, geometria, documentos, estilo, produtividade, IA, acessibilidade e performance.
---

O svg-engine alcança um conjunto de recursos comparável a ferramentas vetoriais
de desktop, tudo sobre o mesmo engine headless. Tudo abaixo está disponível pelo
editor e, quando faz sentido, pela API programática de comandos.

## Desenho

- Ferramentas Select e Direct-Select.
- Desenho com Pen (Bézier) e Pencil (à mão livre).
- Ferramentas de forma: Rectangle, Ellipse, Polygon (e estrela).
- Texto com runs de rich-text, variable fonts e texto em path.
- Ferramentas extras: Eyedropper, Knife, Smooth, Gradient, Width, Symbol Sprayer.

## Geometria

- Editor de Path / Anchor com três tipos de anchor — **cusp**, **smooth** e
  **symmetric** (comportamento equivalente a Illustrator/Affinity).
- Operações booleanas do Pathfinder: Union, Intersect, Subtract, Exclude, Divide.
- Operações de path: simplify, split, join, reverse, outline stroke, offset.
- Live corners e compound paths.

As mesmas operações que a UI dispara estão disponíveis como comandos:

```ts
import { CommandBus, UnionCommand, DivideCommand } from '@mosaicoo/svg-engine/core';

// Combina formas em um único path
bus.dispatch(new UnionCommand([rectId, circleId]));

// Divide formas sobrepostas — cada região vira seu próprio path
bus.dispatch(new DivideCommand([rectId, circleId]));
```

## Documentos

- Pages / artboards.
- Camadas, com visibilidade e lock.
- Smart Objects.
- Símbolos e instâncias (master/instance).
- Snapshots de versão.
- Auto-save e recuperação.

## Estilo

- Efeitos e filtros não-destrutivos e encadeáveis.
- Gradientes com editor inline.
- Patterns.
- Um sistema de libraries: formas, paletas, gradientes, patterns, símbolos,
  brushes, graphic styles e templates.

## Produtividade

- Find &amp; Replace.
- Alinhar e distribuir.
- Atalhos de teclado configuráveis.
- Auto-trace (raster → vetor).
- Code generators (React, Data URI).
- Export por asset.
- Timeline de animação.

## IA (opt-in)

- Comando por linguagem natural.
- Speech-to-text on-device (Whisper) — totalmente opcional e desacoplado do core
  do editor. Veja os [Entry points](/svgengine-site/pt/reference/entry-points/)
  para os pacotes `ai/*`.

## Acessibilidade

Roles ARIA e navegação por teclado são implementados em toda superfície
interativa — overlays, painéis e handles — seguindo as WAI-ARIA Authoring
Practices.

## Performance

O renderer mira **60 fps de pan/zoom com 1.000+ nós**, com uma diretiva opt-in de
viewport culling para documentos esparsos.

:::tip[Experimente]
Instale o pacote e renderize seu primeiro documento em
[Primeiros passos](/svgengine-site/pt/guides/getting-started/), ou aprenda a
adicionar suas próprias tools e comandos em
[Plugins](/svgengine-site/pt/guides/plugins/).
:::
