---
title: Flujos de trabajo e interacciones
description: Flujos recomendados y cómo se combinan las herramientas del editor para el trabajo real.
---

Las herramientas individuales están en la sección
[Herramientas](/svgengine-site/es/using/tools/). Esta página muestra cómo se
**combinan** — los flujos que sacan el trabajo adelante.

## Dibujar y refinar una forma a mano alzada

1. Dibuja con el [Pencil](/svgengine-site/es/using/tools/pencil/) (`P`).
2. Límpiala con la herramienta [Smooth](/svgengine-site/es/using/tools/smooth/)
   (`S`) — sube la Tolerance para una simplificación más fuerte.
3. Ajusta los puntos individuales con
   [Direct Select](/svgengine-site/es/using/tools/direct-select/) (`A`).

## Construir un contorno preciso

1. Usa el [Pen](/svgengine-site/es/using/tools/pen/) (`B`): **clic** para
   esquinas, **click-drag** para curvas.
2. Cierra el path haciendo clic en el primer anchor (o pulsa **Enter** para
   dejarlo abierto).
3. Ajusta anchors y handles con Direct Select.

## Hacer editable una forma

Las formas (Rectangle, Ellipse, Polygon) no son paths hasta que las conviertes.

1. Dibuja la forma.
2. Conviértela en path.
3. Edita sus anchors con Direct Select.

## Combinar formas (Pathfinder)

1. Selecciona dos o más formas superpuestas (Shift-clic o marquee con
   [Select](/svgengine-site/es/using/tools/select/)).
2. Aplica una operación booleana — **Union**, **Intersect**, **Subtract**,
   **Exclude** o **Divide**.

Mira los [conceptos de edición vectorial](/svgengine-site/es/using/concepts/#combinar-formas-pathfinder)
para saber qué hace cada una.

## Trazos caligráficos y de ancho variable

Dos caminos para un trazo con perfil:

- Selecciona un **brush** antes de dibujar con el Pencil — expande tu trazo a lo
  largo del perfil de ancho del brush (mira
  [Pencil + expansión por brush](/svgengine-site/es/using/tools/pencil/#pencil--expansión-por-brush)).
- O aplica la herramienta [Width](/svgengine-site/es/using/tools/width/) (`W`) a
  un path existente y elige un perfil **tapered** o **calligraphic**.

## Copiar el aspecto entre objetos

Usa el [Eyedropper](/svgengine-site/es/using/tools/eyedropper/) (`I`): pon su
Target en **Both** para copiar fill + stroke completos, o en uno de ellos para
copiar solo esa parte.

## Organizar y alinear el arte

Con [Select](/svgengine-site/es/using/tools/select/) activo, la barra de Tool
Options expone **Align**, **Distribute** y **Flip**. El snap alinea los objetos
entre sí y con la cuadrícula mientras arrastras.

## Trabajar en varias pantallas

Usa la herramienta [Page](/svgengine-site/es/using/tools/page/) (o el Pages panel)
para mantener varios artboards en un documento; la página activa es donde entran
los nuevos objetos.
