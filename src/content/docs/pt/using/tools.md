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
- **Direct Select** (`A`) — editar os anchor points e handles individuais de um
  path (cusp / smooth / symmetric).

## Desenho

- **Pen** (`B`) — desenhar paths Bézier precisos, ponto a ponto.
- **Pencil** (`P`) — desenhar paths à mão livre.
- **Rectangle** (`R`), **Ellipse** (`E`), **Polygon** (`Y`) — desenhar formas
  básicas (Polygon também desenha estrelas).
- **Text** (`T`) — adicionar e editar texto, incluindo runs de rich-text,
  variable fonts e texto sobre path.

## Edição & utilitários

- **Eyedropper** (`I`) — capturar um estilo e aplicá-lo à seleção.
- **Knife** (`C`) — cortar e dividir paths.
- **Smooth** (`S`) — suavizar e simplificar paths.
- **Width** (`W`) — aplicar um perfil de largura variável ao traço de um path.
- **Gradient** (`G`) — focar a forma selecionada e abrir o painel de gradiente;
  os stops e o eixo do gradiente são editados no canvas pelo gradient overlay.
- **Symbol Sprayer** (`O`) — arrastar para espalhar instâncias do símbolo ativo,
  com preview ao vivo e um único undo por spray.
- **Page** (`Shift`+`O`) — gerenciar páginas / artboards (a Artboard tool).

:::note
As opções de cada ferramenta ficam na barra de **Tool Options** enquanto a
ferramenta está ativa. Veja [Atalhos de teclado](/svgengine-site/pt/using/keyboard-shortcuts/)
para as teclas de ativação, e [Plugins](/svgengine-site/pt/guides/plugins/) para
adicionar suas próprias ferramentas pelo `ToolRegistry`.
:::
