---
title: Conceptos de edición vectorial
description: Los conceptos centrales detrás de los gráficos vectoriales y del editor svg-engine — paths, anchors, fill y stroke, capas y más.
---

¿Nuevo en la edición vectorial? Esta página explica los fundamentos que
necesitas antes de pasar a las [herramientas](/svgengine-site/es/using/tools/).
Si ya usas Illustrator, Affinity Designer o Figma, estos conceptos te resultarán
familiares.

## Vector vs. raster

Una imagen **raster** (PNG, JPG) es una cuadrícula de píxeles — al ampliar, se
ve pixelada. Una imagen **vectorial** describe formas con matemáticas (puntos,
líneas, curvas), así que se mantiene nítida a cualquier tamaño. SVG es un formato
vectorial — es lo que svg-engine lee, edita y escribe.

## El canvas y las coordenadas

Tu dibujo vive en un **canvas** con un sistema de coordenadas definido por el
**viewBox** del documento (un rectángulo `x`, `y`, `width`, `height`). Las
posiciones y los tamaños se miden en esas unidades de usuario, independientes del
píxel de la pantalla. El **pan** mueve tu vista; el **zoom** la escala — ninguno
cambia la geometría real.

## Objetos

Todo lo que dibujas es un **objeto** (un nodo en el árbol del documento). Los
tipos principales son:

- **Formas** — rectángulo, elipse, línea, polígono, polilínea.
- **Paths** — contornos arbitrarios hechos de segmentos rectos y curvos.
- **Texto** — texto editable, que puede seguir un path.
- **Imágenes** — imágenes raster incrustadas.
- **Grupos** — contenedores que agrupan otros objetos para moverlos o
  transformarlos juntos.

## Paths, anchor points y handles

Un **path** es una secuencia de **anchor points** unidos por segmentos. Los
segmentos curvos se moldean con **handles** (puntos de control) que tiran de la
curva. En svg-engine un anchor puede ser de tres tipos:

- **Cusp** — los dos handles se mueven de forma independiente, creando una
  esquina marcada.
- **Smooth** — los handles quedan alineados, pero pueden tener longitudes
  distintas.
- **Symmetric** — los handles se reflejan, para una curva perfectamente
  uniforme.

Editar anchors directamente es la función de la herramienta **Direct Select**.

## Fill y stroke

La mayoría de los objetos tiene un **fill** (el color o gradiente del interior) y
un **stroke** (el contorno). Los strokes tienen ancho y pueden ser color sólido,
gradiente o ninguno. Cualquiera puede ser transparente.

## Capas y orden de apilamiento

Los objetos se apilan de adelante hacia atrás — los objetos posteriores pintan
sobre los anteriores. El **panel de capas** permite reordenar, renombrar, ocultar
y bloquear objetos, y organizarlos en grupos y capas.

## Transforms

Mover, escalar y rotar un objeto son **transforms**. En svg-engine, el resize y
la rotación ocurren alrededor de un **pivot** que puedes reposicionar, y el
editor hornea el resultado en geometría real para que los strokes y las esquinas
no se distorsionen.

## Combinar formas (Pathfinder)

Las **operaciones booleanas** combinan dos o más formas en una: **Union**
(unir), **Intersect** (mantener la superposición), **Subtract** (restar una de
otra), **Exclude** (mantener lo que no se superpone) y **Divide** (dividir en
regiones separadas).

## Gradientes y patterns

Un **gradiente** rellena una forma con una transición suave entre colores a lo
largo de un eje; un **pattern** repite un pequeño gráfico en mosaico. Ambos se
editan en el canvas y en los paneles laterales.

:::tip[Siguiente]
¿Listo para dibujar? Mira el [resumen de la interfaz](/svgengine-site/es/using/interface/)
y luego las [herramientas](/svgengine-site/es/using/tools/).
:::
