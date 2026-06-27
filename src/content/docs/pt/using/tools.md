---
title: Ferramentas
description: Visão geral das ferramentas do editor — o que cada uma faz, agrupadas por finalidade.
---

O editor traz um conjunto de ferramentas registradas no `ToolRegistry`. Ative
uma ferramenta pela paleta de ferramentas ou pela tecla; os parâmetros dela
aparecem então na barra de **Tool Options**. Páginas detalhadas por ferramenta
(parâmetros, comportamentos e interações) estão sendo adicionadas seção a seção.

## Seleção

- **Select** (`V`) — selecionar, mover, escalar e rotacionar objetos.
- **Direct Select** — editar os anchor points e handles individuais de um path
  (cusp / smooth / symmetric).

## Desenho

- **Pen** (`P`) — desenhar paths Bézier precisos, ponto a ponto.
- **Pencil** — desenhar paths à mão livre.
- **Rectangle**, **Ellipse**, **Polygon** (e estrela) — desenhar formas básicas.
- **Text** — adicionar e editar texto, incluindo runs de rich-text, variable
  fonts e texto sobre path.

## Edição & utilitários

- **Eyedropper** (`I`) — capturar um estilo e aplicá-lo à seleção.
- **Knife** (`C`) — cortar e dividir paths.
- **Smooth** (`S`) — suavizar e simplificar paths.
- **Gradient** (`G`) — focar a seleção e abrir o painel de gradiente para
  editá-lo. _(Os handles de gradiente no canvas ainda estão em construção.)_
- **Page** — gerenciar páginas / artboards (a Artboard tool).

## Ferramentas em preview

Estas ferramentas aparecem na paleta, mas **ainda não estão totalmente
ligadas** — reservam o lugar para próximos lançamentos:

- **Width** (`W`) — traços de largura variável. _(Preview.)_
- **Symbol Sprayer** (`O`) — espalhar instâncias de símbolo. _(Preview.)_

:::note
As opções de cada ferramenta ficam na barra de **Tool Options** enquanto a
ferramenta está ativa. Veja [Atalhos de teclado](/svgengine-site/pt/using/keyboard-shortcuts/)
para as teclas de ativação, e [Plugins](/svgengine-site/pt/guides/plugins/) para
adicionar suas próprias ferramentas pelo `ToolRegistry`.
:::
