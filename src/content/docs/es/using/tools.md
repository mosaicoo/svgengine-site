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
- **Direct Select** — editar los anchor points y handles individuales de un path
  (cusp / smooth / symmetric).

## Dibujo

- **Pen** (`P`) — dibujar paths Bézier precisos, punto a punto.
- **Pencil** — dibujar paths a mano alzada.
- **Rectangle**, **Ellipse**, **Polygon** (y estrella) — dibujar formas básicas.
- **Text** — añadir y editar texto, incluyendo runs de rich-text, variable fonts
  y texto sobre path.

## Edición y utilidades

- **Eyedropper** (`I`) — capturar un estilo y aplicarlo a la selección.
- **Knife** (`C`) — cortar y dividir paths.
- **Smooth** (`S`) — suavizar y simplificar paths.
- **Gradient** (`G`) — enfocar la selección y abrir el panel de gradiente para
  editarlo. _(Los handles de gradiente en el canvas aún se están construyendo.)_
- **Page** — gestionar páginas / artboards (la Artboard tool).

## Herramientas en preview

Estas herramientas aparecen en la paleta pero **aún no están totalmente
conectadas** — reservan su lugar para próximas versiones:

- **Width** (`W`) — trazos de ancho variable. _(Preview.)_
- **Symbol Sprayer** (`O`) — rociar instancias de símbolo. _(Preview.)_

:::note
Las opciones de cada herramienta están en la barra de **Tool Options** mientras
la herramienta está activa. Mira [Atajos de teclado](/svgengine-site/es/using/keyboard-shortcuts/)
para las teclas de activación, y [Plugins](/svgengine-site/es/guides/plugins/)
para añadir tus propias herramientas mediante el `ToolRegistry`.
:::
