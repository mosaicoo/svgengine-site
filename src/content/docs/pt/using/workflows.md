---
title: Fluxos de trabalho & interações
description: Fluxos recomendados e como as ferramentas do editor se combinam para o trabalho real.
---

As ferramentas individuais estão na seção [Ferramentas](/svgengine-site/pt/using/tools/).
Esta página mostra como elas se **combinam** — os fluxos que entregam trabalho
real.

## Desenhar e refinar uma forma à mão livre

1. Desenhe com o [Pencil](/svgengine-site/pt/using/tools/pencil/) (`P`).
2. Limpe com a ferramenta [Smooth](/svgengine-site/pt/using/tools/smooth/) (`S`) —
   aumente a Tolerance para simplificação mais forte.
3. Ajuste os pontos individuais com o
   [Direct Select](/svgengine-site/pt/using/tools/direct-select/) (`A`).

## Construir um contorno preciso

1. Use o [Pen](/svgengine-site/pt/using/tools/pen/) (`B`): **clique** para
   cantos, **click-drag** para curvas.
2. Feche o path clicando no primeiro anchor (ou pressione **Enter** para
   deixá-lo aberto).
3. Ajuste anchors e handles com o Direct Select.

## Tornar uma forma editável

Formas (Rectangle, Ellipse, Polygon) não são paths até você convertê-las.

1. Desenhe a forma.
2. Converta-a em path.
3. Edite os anchors com o Direct Select.

## Combinar formas (Pathfinder)

1. Selecione duas ou mais formas sobrepostas (Shift-clique ou marquee com o
   [Select](/svgengine-site/pt/using/tools/select/)).
2. Aplique uma operação booleana — **Union**, **Intersect**, **Subtract**,
   **Exclude** ou **Divide**.

Veja os [conceitos de edição vetorial](/svgengine-site/pt/using/concepts/#combinando-formas-pathfinder)
para o que cada uma faz.

## Traços caligráficos & de largura variável

Dois caminhos para um traço com perfil:

- Selecione um **brush** antes de desenhar com o Pencil — ele expande seu traço
  pelo perfil de largura do brush (veja
  [Pencil + expansão por brush](/svgengine-site/pt/using/tools/pencil/#pencil--expansão-por-brush)).
- Ou aplique a ferramenta [Width](/svgengine-site/pt/using/tools/width/) (`W`) a
  um path existente e escolha um perfil **tapered** ou **calligraphic**.

## Copiar a aparência entre objetos

Use o [Eyedropper](/svgengine-site/pt/using/tools/eyedropper/) (`I`): defina o
Target como **Both** para copiar fill + stroke completos, ou um deles para copiar
só essa parte.

## Organizar e alinhar a arte

Com o [Select](/svgengine-site/pt/using/tools/select/) ativo, a barra de Tool
Options expõe **Align**, **Distribute** e **Flip**. O snap alinha os objetos
entre si e à grade durante o arrasto.

## Trabalhar em múltiplas telas

Use a ferramenta [Page](/svgengine-site/pt/using/tools/page/) (ou o Pages panel)
para manter vários artboards em um documento; a página ativa é onde os novos
objetos entram.
