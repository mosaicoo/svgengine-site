---
title: Pen tool
description: Draw precise Bézier paths with clicks and click-drags.
---

**Shortcut: `B`.** The Pen tool builds vector paths point by point — corners
with clicks, curves with click-drags.

## How to use it

- **Click** to place a **corner** (cusp) anchor.
- **Click and drag** to place a **smooth** anchor with symmetric handles — this
  curves the path through that point.
- A **rubber-band** preview line follows the cursor between clicks.
- **Click the first anchor** again to **close** the path and finish it.
- **Enter** finalizes the current open path; **Esc** discards it.

## Tool Options

| Option | Range | What it does |
| --- | --- | --- |
| Fill | color / none | Fill color for the new path (with a no-fill toggle) |
| Stroke | color | Stroke (outline) color |
| Stroke width | 0.5–100 | Outline thickness |
| Rubber band | on / off | Show the preview line while drawing |
| Reset | — | Restore the default options |

## Tips & interactions

- Mix **clicks** (corners) and **click-drags** (curves) to draw any outline.
- Refine the result afterwards with the
  [Direct Select](/svgengine-site/using/tools/direct-select/) tool.

See the [tools overview](/svgengine-site/using/tools/) and
[keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/).
