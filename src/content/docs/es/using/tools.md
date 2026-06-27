---
title: Herramientas
description: Resumen de las herramientas del editor — qué hace cada una, agrupadas por finalidad.
---

El editor incluye un conjunto de herramientas registradas en el `ToolRegistry`.
Activa una herramienta desde la paleta de herramientas o con su tecla; sus
parámetros aparecen entonces en la barra de **Tool Options**. Las páginas
detalladas por herramienta (parámetros, comportamientos e interacciones) se van
añadiendo sección a sección.

## Selección

- **Select** (`V`) — seleccionar, mover, escalar y rotar objetos.
- **Direct Select** (`A`) — editar los anchor points y handles individuales de un
  path (cusp / smooth / symmetric).

## Dibujo

- **Pen** (`B`) — dibujar paths Bézier precisos, punto a punto.
- **Pencil** (`P`) — dibujar paths a mano alzada.
- **Rectangle** (`R`), **Ellipse** (`E`), **Polygon** (`Y`) — dibujar formas
  básicas (Polygon también dibuja estrellas).
- **Text** (`T`) — añadir y editar texto, incluyendo runs de rich-text, variable
  fonts y texto sobre path.

## Edición y utilidades

- **Eyedropper** (`I`) — capturar un estilo y aplicarlo a la selección.
- **Knife** (`C`) — cortar y dividir paths.
- **Smooth** (`S`) — suavizar y simplificar paths.
- **Width** (`W`) — aplicar un perfil de ancho variable al trazo de un path.
- **Gradient** (`G`) — enfocar la forma seleccionada y abrir el panel de
  gradiente; los stops y el eje del gradiente se editan en el canvas mediante el
  gradient overlay.
- **Symbol Sprayer** (`O`) — arrastrar para rociar instancias del símbolo activo,
  con vista previa en vivo y un único undo por rociado.
- **Page** (`Shift`+`O`) — gestionar páginas / artboards (la Artboard tool).

:::note
Las opciones de cada herramienta están en la barra de **Tool Options** mientras
la herramienta está activa. Mira [Atajos de teclado](/svgengine-site/es/using/keyboard-shortcuts/)
para las teclas de activación, y [Plugins](/svgengine-site/es/guides/plugins/)
para añadir tus propias herramientas mediante el `ToolRegistry`.
:::
