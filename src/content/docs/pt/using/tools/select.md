---
title: Ferramenta Select
description: Selecionar, mover, escalar e rotacionar objetos — a ferramenta padrão do editor.
---

**Atalho: `V`.** A Select é a ferramenta padrão: seleciona objetos e executa o
comportamento padrão do canvas — seleção, marquee, mover e snap.

## Como usar

- **Clique** num objeto para selecioná-lo; clique no espaço vazio para
  desmarcar.
- **Shift-clique** (ou **Ctrl-clique**) para adicionar ou remover da seleção.
- **Arraste numa área vazia** para desenhar um marquee e selecionar o que ele
  tocar.
- **Arraste um objeto selecionado** para movê-lo. O snap alinha a outros objetos
  e à grade durante o arrasto.
- **Arraste os handles** para escalar; **arraste o handle de rotação** para
  rotacionar. Resize e rotação acontecem em torno de um **pivot** móvel, e o
  resultado é assado em geometria real para que strokes e cantos não distorçam.
- **Dê duplo-clique num grupo** para entrar nele (isolation) e editar o
  conteúdo; um breadcrumb mostra onde você está.

## Tool Options

Com objetos selecionados, a barra de Tool Options oferece ações de organização:

- **Align** — esquerda, centro (horizontal), direita, topo, centro (vertical),
  base.
- **Distribute** — horizontalmente, verticalmente.
- **Flip** — horizontal, vertical.

## Dicas & interações

- Objetos travados não podem ser selecionados — destrave-os no painel de camadas.
- Para editar os pontos individuais de um path em vez do objeto inteiro, troque
  para a ferramenta [Direct Select](/svgengine-site/pt/using/tools/direct-select/).

Veja a [visão geral das ferramentas](/svgengine-site/pt/using/tools/) e os
[atalhos de teclado](/svgengine-site/pt/using/keyboard-shortcuts/).
