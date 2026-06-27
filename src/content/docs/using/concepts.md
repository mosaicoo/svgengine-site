---
title: Vector editing basics
description: The core concepts behind vector graphics and the svg-engine editor — paths, anchors, fill and stroke, layers and more.
---

New to vector editing? This page explains the fundamentals you need before
diving into the [tools](/svgengine-site/using/tools/). If you already use
Illustrator, Affinity Designer or Figma, these concepts will feel familiar.

## Vector vs. raster

A **raster** image (PNG, JPG) is a grid of pixels — zoom in and it becomes
blocky. A **vector** image describes shapes with math (points, lines, curves),
so it stays crisp at any size. SVG is a vector format, and that's what
svg-engine reads, edits and writes.

## The canvas and coordinates

Your drawing lives on a **canvas** with a coordinate system defined by the
document's **viewBox** (an `x`, `y`, `width`, `height` rectangle). Positions and
sizes are measured in those user units, independent of the screen's pixel size.
**Pan** moves your view; **zoom** scales it — neither changes the actual
geometry.

## Objects

Everything you draw is an **object** (a node in the document tree). The main
kinds are:

- **Shapes** — rectangle, ellipse, line, polygon, polyline.
- **Paths** — arbitrary outlines made of straight and curved segments.
- **Text** — editable text, which can follow a path.
- **Images** — embedded raster images.
- **Groups** — containers that hold other objects so you can move or transform
  them together.

## Paths, anchor points and handles

A **path** is a sequence of **anchor points** connected by segments. Curved
segments are shaped by **handles** (control points) that pull the curve. In
svg-engine an anchor can be one of three kinds:

- **Cusp** — the two handles move independently, creating a sharp corner.
- **Smooth** — the handles stay in line but can have different lengths.
- **Symmetric** — the handles mirror each other for a perfectly even curve.

Editing anchors directly is what the **Direct Select** tool is for.

## Fill and stroke

Most objects have a **fill** (the color or gradient inside) and a **stroke**
(the outline). Strokes have a width and can be solid color, gradient or none.
Either can be set to transparent.

## Layers and stacking order

Objects stack front-to-back — later objects paint on top of earlier ones. The
**layers panel** lets you reorder, rename, hide and lock objects, and organize
them into groups and layers.

## Transforms

Moving, scaling and rotating an object are **transforms**. In svg-engine, resize
and rotate happen around a **pivot** you can reposition, and the editor bakes the
result into real geometry so strokes and corners don't distort.

## Combining shapes (Pathfinder)

**Boolean operations** combine two or more shapes into one: **Union** (merge),
**Intersect** (keep the overlap), **Subtract** (cut one from another),
**Exclude** (keep the non-overlap) and **Divide** (split into separate regions).

## Gradients and patterns

A **gradient** fills a shape with a smooth transition between colors along an
axis; a **pattern** tiles a small graphic. Both are edited on the canvas and in
the side panels.

:::tip[Next]
Ready to draw? See the [interface overview](/svgengine-site/using/interface/) and
then the [tools](/svgengine-site/using/tools/).
:::
