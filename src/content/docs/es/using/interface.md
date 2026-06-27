---
title: Resumen de la interfaz
description: Un recorrido por el editor profesional de svg-engine — los paneles, barras y el canvas que componen el shell.
---

El shell profesional (`<svge-shell-pro>`) organiza el editor en unas pocas
regiones claras. Como el editor es componible, una app puede mostrar solo algunas
de ellas — pero el shell completo se ve así:

## Barra de menús

En la parte superior: **File**, **Edit**, **View**, **Object**, **Path** y más.
Los menús los pueblan los plugins, así que las entradas exactas dependen de qué
funciones habilite la app.

## Toolbar

Una fila de acciones rápidas (undo / redo / zoom / reset y otras contribuciones
de plugin).

## Barra de Tool Options

Muestra los parámetros de la **herramienta activa**. Por ejemplo, con la
herramienta Rectangle activa verás su opción de radio de esquina; con Polygon,
sus opciones de lados y estrella. La barra se actualiza al cambiar de
herramienta.

## Paleta de herramientas

Una franja vertical de botones de herramienta en un lateral. Haz clic en una
herramienta o pulsa su tecla para activarla; la herramienta activa se resalta.
Mira [Herramientas](/svgengine-site/es/using/tools/) y
[Atajos de teclado](/svgengine-site/es/using/keyboard-shortcuts/).

## Canvas

El área central donde dibujas y editas. Renderiza el documento y aloja los
overlays interactivos — handles de selección, el pivot de rotación, el marquee,
las guías de snap, el editor de path/anchor y los contornos de página. Haz
**pan** y **zoom** aquí para navegar.

## Panel de capas

Normalmente a la derecha: un árbol de todos los objetos, con reordenación
(arrastrar y soltar), renombrar, **visibilidad** (ojo) y **bloqueo** (candado), y
agrupación. Los objetos bloqueados no se pueden seleccionar ni editar hasta
desbloquearlos.

## Inspector (Properties)

Muestra y edita las propiedades del objeto seleccionado — geometría (posición,
tamaño), fill y stroke, ajustes de texto/tipografía, y acciones de
transform/align/arrange, organizadas en pestañas.

## Barra de estado

En la parte inferior: lecturas contextuales como la herramienta activa, el número
de elementos seleccionados, la posición del cursor, el nivel de zoom y el estado
del snap.

## Menú contextual

**Haz clic derecho** en el canvas o en un objeto para abrir un menú contextual
con las acciones relevantes a lo que hiciste clic.

## Panel de páginas

Cuando un documento tiene varias **páginas / artboards**, una franja de pestañas
permite crear, seleccionar, renombrar y reordenar.

:::note
No todos los consumidores de la librería muestran todos los paneles — las apps
componen solo las partes que necesitan. La [demo en vivo](/svgengine-site/es/demo/)
muestra el shell profesional completo.
:::
