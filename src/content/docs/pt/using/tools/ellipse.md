---
title: Ferramenta Ellipse
description: Desenhe elipses e círculos.
---

**Atalho: `E`.** A ferramenta Ellipse desenha elipses e círculos.

## Como usar

Pressione, arraste e solte para definir o bounding box da elipse. Durante o
arrasto:

- **Shift** — restringe a um círculo perfeito.
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
| Reset | — | Restaura as opções padrão |

## Dicas & interações

- Segure **Shift** para um círculo; combine com **Alt** para crescer o círculo a
  partir do centro.
- Para remodelar uma elipse livremente, converta-a em path e edite os anchors com
  a ferramenta [Direct Select](/svgengine-site/pt/using/tools/).

Veja a [visão geral das ferramentas](/svgengine-site/pt/using/tools/) e os
[conceitos de edição vetorial](/svgengine-site/pt/using/concepts/).
