---
title: Ferramenta Polygon
description: Desenhe polígonos regulares e estrelas.
---

**Atalho: `Y`.** A ferramenta Polygon desenha polígonos regulares — e estrelas,
quando o star mode está ligado.

## Como usar

Pressione, arraste e solte para definir o bounding box do polígono. Durante o
arrasto:

- **Shift** — restringe a um polígono regular (lados uniformes).
- **Alt** — desenha a partir do **centro** em vez do canto.
- **Esc** — cancela a forma atual sem inseri-la.

A ferramenta **permanece ativa** após cada forma, então você pode continuar
desenhando; pressione `V` (Select) ou `Esc` para sair. Novas formas começam com
**stroke preto de 1px e sem fill** — aplique um fill depois no Inspector. Um
arrasto quase nulo é ignorado.

## Tool Options

| Opção | Faixa | O que faz |
| --- | --- | --- |
| Fill | cor / nenhum | Cor de preenchimento da próxima forma (com toggle de no-fill) |
| Stroke | cor | Cor do traço (contorno) |
| Stroke width | 0–200 | Espessura do contorno |
| Sides | 3–32 (padrão 6) | Número de lados do polígono |
| Star mode | on / off | Desenha uma estrela pontuda em vez de um polígono regular |
| Star inner radius | 0.1–0.95 | (Só no star mode) o quão fundo as pontas da estrela entram |
| Reset | — | Restaura as opções padrão |

## Dicas & interações

- Defina **Sides** antes de desenhar — ex.: 3 para um triângulo, 5 para um
  pentágono.
- Ligue o **Star mode** e reduza o **inner radius** para pontas de estrela mais
  afiadas.
- Para remodelar um polígono livremente, converta-o em path e edite os anchors
  com a ferramenta [Direct Select](/svgengine-site/pt/using/tools/).

Veja a [visão geral das ferramentas](/svgengine-site/pt/using/tools/) e os
[conceitos de edição vetorial](/svgengine-site/pt/using/concepts/).
