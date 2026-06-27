---
title: Select tool
description: Select, move, scale and rotate objects — the editor's default tool.
---

**Shortcut: `V`.** Select is the default tool: it selects objects and runs the
canvas's standard selection, marquee, move and snap behavior.

## How to use it

- **Click** an object to select it; click empty space to deselect.
- **Shift-click** (or **Ctrl-click**) to add to or remove from the selection.
- **Drag an empty area** to draw a marquee and select what it touches.
- **Drag a selected object** to move it. Snapping aligns it to other objects and
  the grid while you drag.
- **Drag the handles** to scale; **drag the rotation handle** to rotate. Resize
  and rotation happen around a movable **pivot**, and the result is baked into
  real geometry so strokes and corners don't distort.
- **Double-click a group** to enter it (isolation) and edit its contents; a
  breadcrumb shows where you are.

## Tool Options

With objects selected, the Tool Options bar offers arrangement actions:

- **Align** — left, center (horizontal), right, top, center (vertical), bottom.
- **Distribute** — horizontally, vertically.
- **Flip** — horizontal, vertical.

## Tips & interactions

- Locked objects can't be selected — unlock them in the layers panel.
- To edit a path's individual points instead of the whole object, switch to the
  [Direct Select](/svgengine-site/using/tools/direct-select/) tool.

See the [tools overview](/svgengine-site/using/tools/) and
[keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/).
