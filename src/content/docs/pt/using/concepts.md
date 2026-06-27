---
title: Conceitos de edição vetorial
description: Os conceitos centrais por trás de gráficos vetoriais e do editor svg-engine — paths, anchors, fill e stroke, camadas e mais.
---

Novo na edição vetorial? Esta página explica os fundamentos que você precisa
antes de ir para as [ferramentas](/svgengine-site/pt/using/tools/). Se você já
usa Illustrator, Affinity Designer ou Figma, esses conceitos serão familiares.

## Vetor vs. raster

Uma imagem **raster** (PNG, JPG) é uma grade de pixels — ao ampliar, fica
serrilhada. Uma imagem **vetorial** descreve formas com matemática (pontos,
linhas, curvas), então permanece nítida em qualquer tamanho. SVG é um formato
vetorial — é o que o svg-engine lê, edita e grava.

## O canvas e as coordenadas

Seu desenho vive em um **canvas** com um sistema de coordenadas definido pelo
**viewBox** do documento (um retângulo `x`, `y`, `width`, `height`). Posições e
tamanhos são medidos nessas unidades de usuário, independentes do pixel da tela.
O **pan** move a sua visão; o **zoom** a escala — nenhum altera a geometria real.

## Objetos

Tudo que você desenha é um **objeto** (um nó na árvore do documento). Os
principais tipos são:

- **Formas** — retângulo, elipse, linha, polígono, polilinha.
- **Paths** — contornos arbitrários feitos de segmentos retos e curvos.
- **Texto** — texto editável, que pode seguir um path.
- **Imagens** — imagens raster embutidas.
- **Grupos** — contêineres que guardam outros objetos para mover ou transformar
  juntos.

## Paths, anchor points e handles

Um **path** é uma sequência de **anchor points** ligados por segmentos. Segmentos
curvos são moldados por **handles** (pontos de controle) que puxam a curva. No
svg-engine um anchor pode ser de três tipos:

- **Cusp** — os dois handles se movem de forma independente, criando um canto
  agudo.
- **Smooth** — os handles ficam alinhados, mas podem ter comprimentos
  diferentes.
- **Symmetric** — os handles se espelham, para uma curva perfeitamente uniforme.

Editar anchors diretamente é a função da ferramenta **Direct Select**.

## Fill e stroke

A maioria dos objetos tem um **fill** (a cor ou gradiente do interior) e um
**stroke** (o contorno). Strokes têm largura e podem ser cor sólida, gradiente ou
nenhum. Qualquer um pode ser transparente.

## Camadas e ordem de empilhamento

Os objetos se empilham da frente para trás — objetos posteriores pintam sobre os
anteriores. O **painel de camadas** permite reordenar, renomear, ocultar e
travar objetos, e organizá-los em grupos e camadas.

## Transforms

Mover, escalar e rotacionar um objeto são **transforms**. No svg-engine, resize e
rotação acontecem ao redor de um **pivot** que você pode reposicionar, e o editor
assa o resultado em geometria real para que strokes e cantos não distorçam.

## Combinando formas (Pathfinder)

**Operações booleanas** combinam duas ou mais formas em uma: **Union** (unir),
**Intersect** (manter a sobreposição), **Subtract** (subtrair uma da outra),
**Exclude** (manter o que não se sobrepõe) e **Divide** (dividir em regiões
separadas).

## Gradientes e patterns

Um **gradiente** preenche uma forma com uma transição suave entre cores ao longo
de um eixo; um **pattern** ladrilha um pequeno gráfico. Ambos são editados no
canvas e nos painéis laterais.

:::tip[A seguir]
Pronto para desenhar? Veja a [visão geral da interface](/svgengine-site/pt/using/interface/)
e depois as [ferramentas](/svgengine-site/pt/using/tools/).
:::
