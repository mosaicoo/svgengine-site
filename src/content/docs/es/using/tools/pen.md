---
title: Herramienta Pen
description: Dibuja paths Bézier precisos con clics y click-drags.
---

**Atajo: `B`.** La herramienta Pen construye paths vectoriales punto a punto —
esquinas con clics, curvas con click-drags.

## Cómo usarla

- **Haz clic** para colocar un anchor de **esquina** (cusp).
- **Haz clic y arrastra** para colocar un anchor **smooth** con handles
  simétricos — esto curva el path a través de ese punto.
- Una línea de previsualización **rubber-band** sigue al cursor entre clics.
- **Haz clic de nuevo en el primer anchor** para **cerrar** el path y
  finalizarlo.
- **Enter** finaliza el path abierto actual; **Esc** lo descarta.

## Tool Options

| Opción | Rango | Qué hace |
| --- | --- | --- |
| Fill | color / ninguno | Color de relleno del nuevo path (con toggle de no-fill) |
| Stroke | color | Color del trazo (contorno) |
| Stroke width | 0.5–100 | Grosor del contorno |
| Rubber band | on / off | Muestra la línea de previsualización al dibujar |
| Reset | — | Restaura las opciones por defecto |

## Consejos e interacciones

- Combina **clics** (esquinas) y **click-drags** (curvas) para dibujar cualquier
  contorno.
- Refina el resultado después con la herramienta
  [Direct Select](/svgengine-site/es/using/tools/direct-select/).

Mira el [resumen de herramientas](/svgengine-site/es/using/tools/) y los
[atajos de teclado](/svgengine-site/es/using/keyboard-shortcuts/).
