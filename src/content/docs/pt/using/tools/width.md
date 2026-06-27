---
title: Ferramenta Width
description: Dê ao traço de um path um perfil de largura variável.
---

**Atalho: `W`.** A ferramenta Width aplica um perfil de largura variável ao traço
de um path selecionado.

## Como usar

Aplique a um path selecionado para remodelar o traço em um contorno com perfil
(mais grosso e mais fino ao longo do comprimento). A mudança é assada na
geometria e pode ser revertida com undo.

## Tool Options

| Opção | Valores | O que faz |
| --- | --- | --- |
| Profile | uniform / tapered / calligraphic | A forma da largura ao longo do traço |
| Width | 1–100 | Largura base, em pixels |
| Reset | — | Restaura as opções padrão |

## Dicas & interações

- **Tapered** é grosso no meio; **calligraphic** vai de fino a grosso.
- Tem relação com a expansão por brush usada pelo
  [Pencil](/svgengine-site/pt/using/tools/pencil/) — ambos moldam um traço com um
  perfil de largura.

Veja a [visão geral das ferramentas](/svgengine-site/pt/using/tools/) e os
[atalhos de teclado](/svgengine-site/pt/using/keyboard-shortcuts/).
