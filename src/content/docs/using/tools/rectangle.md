---
title: Rectangle tool
description: Draw rectangles and rounded rectangles.
---

**Shortcut: `R`.** The Rectangle tool draws rectangles, including rounded
rectangles.

## How to use it

Press, drag and release to define the rectangle's bounding box. While dragging:

- **Shift** — constrain to a perfect square.
- **Alt** — draw from the **center** instead of a corner.
- **Esc** — cancel the current shape without inserting it.

The tool **stays active** after each shape, so you can keep drawing; press `V`
(Select) or `Esc` to leave it. New shapes start with a **1px black stroke and no
fill** — apply a fill afterwards in the Inspector. A near-zero drag is ignored,
so a stray click won't create an invisible shape.

## Tool Options

| Option | Range | What it does |
| --- | --- | --- |
| Fill | color / none | Fill color for the next shape (with a no-fill toggle) |
| Stroke | color | Stroke (outline) color |
| Stroke width | 0–200 | Outline thickness |
| Corner radius | 0–500 (slider 0–100) | Rounds the corners, in px |
| Reset | — | Restore the default options |

## Tips & interactions

- Set the **Corner radius** before drawing to create rounded rectangles directly.
- To reshape a rectangle freely, convert it to a path and edit its anchors with
  the [Direct Select](/svgengine-site/using/tools/) tool.

See the [tools overview](/svgengine-site/using/tools/) and
[vector editing basics](/svgengine-site/using/concepts/).
