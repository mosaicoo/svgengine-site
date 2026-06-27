---
title: Herramienta Ellipse
description: Dibuja elipses y círculos.
---

**Atajo: `E`.** La herramienta Ellipse dibuja elipses y círculos.

## Cómo usarla

Pulsa, arrastra y suelta para definir el bounding box de la elipse. Mientras
arrastras:

- **Shift** — restringe a un círculo perfecto.
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
| Reset | — | Restaura las opciones por defecto |

## Consejos e interacciones

- Mantén **Shift** para un círculo; combínalo con **Alt** para crecer el círculo
  desde su centro.
- Para remodelar una elipse libremente, conviértela en path y edita sus anchors
  con la herramienta [Direct Select](/svgengine-site/es/using/tools/).

Mira el [resumen de herramientas](/svgengine-site/es/using/tools/) y los
[conceptos de edición vectorial](/svgengine-site/es/using/concepts/).
