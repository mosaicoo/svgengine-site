---
title: Herramienta Polygon
description: Dibuja polígonos regulares y estrellas.
---

**Atajo: `Y`.** La herramienta Polygon dibuja polígonos regulares — y estrellas,
cuando el star mode está activado.

## Cómo usarla

Pulsa, arrastra y suelta para definir el bounding box del polígono. Mientras
arrastras:

- **Shift** — restringe a un polígono regular (lados uniformes).
- **Alt** — dibuja desde el **centro** en lugar de una esquina.
- **Esc** — cancela la forma actual sin insertarla.

La herramienta **permanece activa** tras cada forma, así que puedes seguir
dibujando; pulsa `V` (Select) o `Esc` para salir. Las formas nuevas empiezan con
**stroke negro de 1px y sin fill** — aplica un fill después en el Inspector. Un
arrastre casi nulo se ignora.

## Tool Options

| Opción | Rango | Qué hace |
| --- | --- | --- |
| Fill | color / ninguno | Color de relleno de la siguiente forma (con toggle de no-fill) |
| Stroke | color | Color del trazo (contorno) |
| Stroke width | 0–200 | Grosor del contorno |
| Sides | 3–32 (por defecto 6) | Número de lados del polígono |
| Star mode | on / off | Dibuja una estrella en punta en lugar de un polígono regular |
| Star inner radius | 0.1–0.95 | (Solo en star mode) cuánto se hunden las puntas de la estrella |
| Reset | — | Restaura las opciones por defecto |

## Consejos e interacciones

- Define **Sides** antes de dibujar — p. ej. 3 para un triángulo, 5 para un
  pentágono.
- Activa el **Star mode** y baja el **inner radius** para puntas de estrella más
  afiladas.
- Para remodelar un polígono libremente, conviértelo en path y edita sus anchors
  con la herramienta [Direct Select](/svgengine-site/es/using/tools/).

Mira el [resumen de herramientas](/svgengine-site/es/using/tools/) y los
[conceptos de edición vectorial](/svgengine-site/es/using/concepts/).
