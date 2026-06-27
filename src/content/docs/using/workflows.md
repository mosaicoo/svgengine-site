---
title: Workflows & tool interactions
description: Recommended workflows and how the editor tools combine to get real work done.
---

Individual tools are covered in the [Tools](/svgengine-site/using/tools/) section.
This page shows how they **combine** — the workflows that get real work done.

## Draw and refine a freehand shape

1. Draw with the [Pencil](/svgengine-site/using/tools/pencil/) (`P`).
2. Clean it up with the [Smooth](/svgengine-site/using/tools/smooth/) (`S`) tool —
   raise its Tolerance for stronger simplification.
3. Fine-tune individual points with
   [Direct Select](/svgengine-site/using/tools/direct-select/) (`A`).

## Build a precise outline

1. Use the [Pen](/svgengine-site/using/tools/pen/) (`B`): **click** for corners,
   **click-drag** for curves.
2. Close the path by clicking the first anchor (or press **Enter** to leave it
   open).
3. Adjust anchors and handles with Direct Select.

## Make a shape editable

Shapes (Rectangle, Ellipse, Polygon) aren't paths until you convert them.

1. Draw the shape.
2. Convert it to a path.
3. Edit its anchors with Direct Select.

## Combine shapes (Pathfinder)

1. Select two or more overlapping shapes (Shift-click or marquee with
   [Select](/svgengine-site/using/tools/select/)).
2. Apply a boolean operation — **Union**, **Intersect**, **Subtract**,
   **Exclude** or **Divide**.

See [vector editing basics](/svgengine-site/using/concepts/#combining-shapes-pathfinder)
for what each one does.

## Calligraphic & variable-width strokes

Two routes to a profiled stroke:

- Select a **brush** before drawing with the Pencil — it expands your stroke
  along the brush's width profile (see
  [Pencil + brush expansion](/svgengine-site/using/tools/pencil/#pencil--brush-expansion)).
- Or apply the [Width](/svgengine-site/using/tools/width/) (`W`) tool to an
  existing path and pick a **tapered** or **calligraphic** profile.

## Copy a look between objects

Use the [Eyedropper](/svgengine-site/using/tools/eyedropper/) (`I`): set its
Target to **Both** to copy the full fill + stroke, or to one of them to copy just
that part.

## Lay out and align artwork

With [Select](/svgengine-site/using/tools/select/) active, the Tool Options bar
exposes **Align**, **Distribute** and **Flip**. Snapping aligns objects to one
another and the grid while you drag.

## Work across multiple screens

Use the [Page](/svgengine-site/using/tools/page/) tool (or the Pages panel) to
keep several artboards in one document; the active page is where new objects land.
