---
title: Herramienta Pencil
description: Dibuja paths a mano alzada — y expándelos con un perfil de brush.
---

**Atajo: `P`.** La herramienta Pencil dibuja paths a mano alzada que siguen tu
cursor.

## Cómo usarla

- Pulsa, arrastra y suelta para dibujar; el path sigue tu cursor con una
  **previsualización en vivo**.
- Un solo clic (sin arrastrar) no hace nada — un path necesita al menos un trazo
  corto.
- Cambiar de herramienta a mitad del trazo **descarta** el dibujo en curso.

## Tool Options

| Opción | Rango | Qué hace |
| --- | --- | --- |
| Fill | color / ninguno | Color de relleno del nuevo path (con toggle de no-fill) |
| Stroke | color | Color del trazo (contorno) |
| Stroke width | 0.5–100 | Grosor del contorno |
| Close path | on / off | Cierra el trazo en un bucle (añade una `Z` al path) |
| Reset | — | Restaura las opciones por defecto |

## Pencil + expansión por brush

Aquí es donde el Pencil cambia drásticamente de comportamiento según tus ajustes.
Si hay un **brush** seleccionado (de la Brush library), el Pencil **no** dibuja
un centerline simple — **expande** tu trazo a lo largo del **width profile** del
brush en un contorno relleno de **ancho variable** (usando el base width del
brush). Sin **ningún brush** seleccionado, obtienes un path centerline normal que
usa tu **Stroke width**.

Así que el mismo gesto produce resultados muy distintos:

- **Sin brush** → un path con trazo de ancho uniforme.
- **Con brush** → un contorno relleno de ancho variable (aspecto caligráfico /
  afilado) moldeado por el perfil del brush.

## Consejos e interacciones

- Para trazos caligráficos o afilados, elige un brush **antes** de dibujar.
- Activa **Close path** para dibujar formas cerradas a mano alzada.

Mira el [resumen de herramientas](/svgengine-site/es/using/tools/) y los
[atajos de teclado](/svgengine-site/es/using/keyboard-shortcuts/).
