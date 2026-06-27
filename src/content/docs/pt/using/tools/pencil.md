---
title: Ferramenta Pencil
description: Desenhe paths à mão livre — e expanda-os com um perfil de brush.
---

**Atalho: `P`.** A ferramenta Pencil desenha paths à mão livre que acompanham o
seu cursor.

## Como usar

- Pressione, arraste e solte para desenhar; o path acompanha o cursor com um
  **preview ao vivo**.
- Um clique único (sem arrastar) não faz nada — um path precisa de pelo menos um
  traço curto.
- Trocar de ferramenta no meio do traço **descarta** o desenho em andamento.

## Tool Options

| Opção | Faixa | O que faz |
| --- | --- | --- |
| Fill | cor / nenhum | Cor de preenchimento do novo path (com toggle de no-fill) |
| Stroke | cor | Cor do traço (contorno) |
| Stroke width | 0.5–100 | Espessura do contorno |
| Close path | on / off | Fecha o traço em um laço (adiciona um `Z` ao path) |
| Reset | — | Restaura as opções padrão |

## Pencil + expansão por brush

É aqui que o Pencil muda drasticamente de comportamento conforme as suas
configurações. Se um **brush** estiver selecionado (na Brush library), o Pencil
**não** desenha um centerline simples — ele **expande** o seu traço ao longo do
**width profile** do brush em um contorno preenchido de **largura variável**
(usando a base width do brush). Sem **nenhum brush** selecionado, você obtém um
path centerline normal que usa o seu **Stroke width**.

Então o mesmo gesto produz resultados bem diferentes:

- **Sem brush** → um path com traço de largura uniforme.
- **Com brush** → um contorno preenchido de largura variável (aparência
  caligráfica / afilada) moldado pelo perfil do brush.

## Dicas & interações

- Para traços caligráficos ou afilados, escolha um brush **antes** de desenhar.
- Ligue **Close path** para desenhar formas fechadas à mão livre.

Veja a [visão geral das ferramentas](/svgengine-site/pt/using/tools/) e os
[atalhos de teclado](/svgengine-site/pt/using/keyboard-shortcuts/).
