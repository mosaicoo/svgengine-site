---
title: Ellipse tool
description: Draw ellipses and circles.
---

**Shortcut: `E`.** The Ellipse tool draws ellipses and circles.

## How to use it

Press, drag and release to define the ellipse's bounding box. While dragging:

- **Shift** — constrain to a perfect circle.
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
| Reset | — | Restore the default options |

## Tips & interactions

- Hold **Shift** for a circle; combine with **Alt** to grow a circle from its
  center.
- To reshape an ellipse freely, convert it to a path and edit its anchors with
  the [Direct Select](/svgengine-site/using/tools/) tool.

See the [tools overview](/svgengine-site/using/tools/) and
[vector editing basics](/svgengine-site/using/concepts/).
