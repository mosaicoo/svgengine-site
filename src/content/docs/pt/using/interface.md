---
title: Visão geral da interface
description: Um tour pelo editor profissional do svg-engine — os painéis, barras e o canvas que compõem o shell.
---

O shell profissional (`<svge-shell-pro>`) organiza o editor em algumas regiões
claras. Como o editor é componível, um app pode mostrar só algumas delas — mas o
shell completo se parece com isto:

## Barra de menus

No topo: **File**, **Edit**, **View**, **Object**, **Path** e mais. Os menus são
populados por plugins, então as entradas exatas dependem de quais recursos o app
habilita.

## Toolbar

Uma linha de ações rápidas (undo / redo / zoom / reset e outras contribuições de
plugin).

## Barra de Tool Options

Mostra os parâmetros da **ferramenta ativa**. Por exemplo, com a ferramenta
Rectangle ativa você vê a opção de raio de canto; com Polygon, as opções de lados
e estrela. A barra se atualiza conforme você troca de ferramenta.

## Paleta de ferramentas

Uma faixa vertical de botões de ferramenta em uma das laterais. Clique numa
ferramenta ou pressione a tecla dela para ativá-la; a ferramenta ativa fica
destacada. Veja [Ferramentas](/svgengine-site/pt/using/tools/) e
[Atalhos de teclado](/svgengine-site/pt/using/keyboard-shortcuts/).

## Canvas

A área central onde você desenha e edita. Renderiza o documento e hospeda os
overlays interativos — handles de seleção, o pivot de rotação, o marquee, as
guias de snap, o editor de path/anchor e os contornos de página. Faça **pan** e
**zoom** aqui para navegar.

## Painel de camadas

Normalmente à direita: uma árvore de todos os objetos, com reordenação (drag and
drop), renomear, **visibilidade** (olho) e **lock** (cadeado), e agrupamento.
Objetos travados não podem ser selecionados nem editados até serem destravados.

## Inspector (Properties)

Mostra e edita as propriedades do objeto selecionado — geometria (posição,
tamanho), fill e stroke, configurações de texto/tipografia, e ações de
transform/align/arrange, organizadas em abas.

## Barra de status

Na base: leituras contextuais como a ferramenta ativa, contagem da seleção,
posição do cursor, nível de zoom e estado do snap.

## Menu de contexto

**Clique com o botão direito** no canvas ou em um objeto para abrir um menu de
contexto com as ações relevantes ao que você clicou.

## Painel de páginas

Quando um documento tem múltiplas **páginas / artboards**, uma faixa de abas
permite criar, selecionar, renomear e reordenar.

:::note
Nem todo consumidor da library mostra todos os painéis — apps compõem só as
partes que precisam. A [demo ao vivo](/svgengine-site/pt/demo/) mostra o shell
profissional completo.
:::
