---
title: Herramienta Rectangle
description: Dibuja rectángulos y rectángulos redondeados.
---

**Atajo: `R`.** La herramienta Rectangle dibuja rectángulos, incluidos
rectángulos redondeados.

## Cómo usarla

Pulsa, arrastra y suelta para definir el bounding box del rectángulo. Mientras
arrastras:

- **Shift** — restringe a un cuadrado perfecto.
- **Alt** — dibuja desde el **centro** en lugar de una esquina.
- **Esc** — cancela la forma actual sin insertarla.

La herramienta **permanece activa** tras cada forma, así que puedes seguir
dibujando; pulsa `V` (Select) o `Esc` para salir. Las formas nuevas empiezan con
**stroke negro de 1px y sin fill** — aplica un fill después en el Inspector. Un
arrastre casi nulo se ignora, así que un clic accidental no crea una forma
invisible.

## Tool Options

| Opción | Rango | Qué hace |
| --- | --- | --- |
| Fill | color / ninguno | Color de relleno de la siguiente forma (con toggle de no-fill) |
| Stroke | color | Color del trazo (contorno) |
| Stroke width | 0–200 | Grosor del contorno |
| Corner radius | 0–500 (slider 0–100) | Redondea las esquinas, en px |
| Reset | — | Restaura las opciones por defecto |

## Consejos e interacciones

- Define el **Corner radius** antes de dibujar para crear rectángulos
  redondeados directamente.
- Para remodelar un rectángulo libremente, conviértelo en path y edita sus
  anchors con la herramienta [Direct Select](/svgengine-site/es/using/tools/).

Mira el [resumen de herramientas](/svgengine-site/es/using/tools/) y los
[conceptos de edición vectorial](/svgengine-site/es/using/concepts/).
