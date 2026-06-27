---
title: Polygon tool
description: Draw regular polygons and stars.
---

**Shortcut: `Y`.** The Polygon tool draws regular polygons — and stars, when
star mode is on.

## How to use it

Press, drag and release to define the polygon's bounding box. While dragging:

- **Shift** — constrain to a regular (evenly sized) polygon.
- **Alt** — draw from the **center** instead of a corner.
- **Esc** — cancel the current shape without inserting it.

The tool **stays active** after each shape, so you can keep drawing; press `V`
(Select) or `Esc` to leave it. New shapes start with a **1px black stroke and no
fill** — apply a fill afterwards in the Inspector. A near-zero drag is ignored.

## Tool Options

| Option | Range | What it does |
| --- | --- | --- |
| Fill | color / none | Fill color for the next shape (with a no-fill toggle) |
| Stroke | color | Stroke (outline) color |
| Stroke width | 0–200 | Outline thickness |
| Sides | 3–32 (default 6) | Number of polygon sides |
| Star mode | on / off | Draw a pointed star instead of a regular polygon |
| Star inner radius | 0.1–0.95 | (Star mode only) how deep the star's points cut in |
| Reset | — | Restore the default options |

## Tips & interactions

- Set **Sides** before drawing — e.g. 3 for a triangle, 5 for a pentagon.
- Turn on **Star mode** and lower the **inner radius** for sharper star points.
- To reshape a polygon freely, convert it to a path and edit its anchors with
  the [Direct Select](/svgengine-site/using/tools/) tool.

See the [tools overview](/svgengine-site/using/tools/) and
[vector editing basics](/svgengine-site/using/concepts/).
