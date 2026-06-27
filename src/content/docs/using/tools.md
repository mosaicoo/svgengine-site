---
title: Tools
description: Overview of the editor tools — what each one does, grouped by purpose.
---

The editor ships a set of tools contributed through the `ToolRegistry`. Activate a
tool from the tools palette or with its keyboard key; its parameters then appear
in the **Tool Options** bar. Detailed per-tool pages (parameters, behaviors and
interactions) are being added section by section.

## Selection

- **Select** (`V`) — select, move, scale and rotate objects.
- **Direct Select** (`A`) — edit a path's individual anchor points and handles
  (cusp / smooth / symmetric).

## Drawing

- **Pen** (`B`) — draw precise Bézier paths point by point.
- **Pencil** (`P`) — draw freehand paths.
- **Rectangle** (`R`), **Ellipse** (`E`), **Polygon** (`Y`) — draw basic shapes
  (Polygon also draws stars).
- **Text** (`T`) — add and edit text, including rich-text runs, variable fonts
  and text on a path.

## Editing & utilities

- **Eyedropper** (`I`) — sample a style and apply it to the selection.
- **Knife** (`C`) — cut and split paths.
- **Smooth** (`S`) — smooth and simplify paths.
- **Width** (`W`) — apply a variable-width profile to a path's stroke.
- **Gradient** (`G`) — focus the selected shape and open the gradient panel;
  gradient stops and axis are edited on the canvas via the gradient overlay.
- **Symbol Sprayer** (`O`) — drag to spray instances of the active symbol, with
  a live preview and a single undo per spray.
- **Page** (`Shift`+`O`) — manage pages / artboards (the Artboard tool).

:::note
Each tool's options live in the **Tool Options** bar while the tool is active.
See [Keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/) for the
activation keys, and [Plugins](/svgengine-site/guides/plugins/) to add your own
tools through the `ToolRegistry`.
:::
