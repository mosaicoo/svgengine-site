---
title: Ferramenta Rectangle
description: Desenhe retângulos e retângulos arredondados.
---

**Atalho: `R`.** A ferramenta Rectangle desenha retângulos, incluindo retângulos
arredondados.

## Como usar

Pressione, arraste e solte para definir o bounding box do retângulo. Durante o
arrasto:

- **Shift** — restringe a um quadrado perfeito.
- **Alt** — desenha a partir do **centro** em vez do canto.
- **Esc** — cancela a forma atual sem inseri-la.

A ferramenta **permanece ativa** após cada forma, então você pode continuar
desenhando; pressione `V` (Select) ou `Esc` para sair. Novas formas começam com
**stroke preto de 1px e sem fill** — aplique um fill depois no Inspector. Um
arrasto quase nulo é ignorado, então um clique acidental não cria uma forma
invisível.

## Tool Options

| Opção | Faixa | O que faz |
| --- | --- | --- |
| Fill | cor / nenhum | Cor de preenchimento da próxima forma (com toggle de no-fill) |
| Stroke | cor | Cor do traço (contorno) |
| Stroke width | 0–200 | Espessura do contorno |
| Corner radius | 0–500 (slider 0–100) | Arredonda os cantos, em px |
| Reset | — | Restaura as opções padrão |

## Dicas & interações

- Defina o **Corner radius** antes de desenhar para criar retângulos arredondados
  diretamente.
- Para remodelar um retângulo livremente, converta-o em path e edite os anchors
  com a ferramenta [Direct Select](/svgengine-site/pt/using/tools/).

Veja a [visão geral das ferramentas](/svgengine-site/pt/using/tools/) e os
[conceitos de edição vetorial](/svgengine-site/pt/using/concepts/).
