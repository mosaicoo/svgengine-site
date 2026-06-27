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
- **Direct Select** — edit a path's individual anchor points and handles
  (cusp / smooth / symmetric).

## Drawing

- **Pen** (`P`) — draw precise Bézier paths point by point.
- **Pencil** — draw freehand paths.
- **Rectangle**, **Ellipse**, **Polygon** (and star) — draw basic shapes.
- **Text** — add and edit text, including rich-text runs, variable fonts and
  text on a path.

## Editing & utilities

- **Eyedropper** (`I`) — sample a style and apply it to the selection.
- **Knife** (`C`) — cut and split paths.
- **Smooth** (`S`) — smooth and simplify paths.
- **Gradient** (`G`) — focus the selection and open the gradient panel to edit
  its gradient. _(In-canvas gradient handles are still being built.)_
- **Page** — manage pages / artboards (the Artboard tool).

## Preview tools

These tools appear in the palette but are **not fully wired yet** — they reserve
their place for upcoming releases:

- **Width** (`W`) — variable-width strokes. _(Preview.)_
- **Symbol Sprayer** (`O`) — spray symbol instances. _(Preview.)_

:::note
Each tool's options live in the **Tool Options** bar while the tool is active.
See [Keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/) for the
activation keys, and [Plugins](/svgengine-site/guides/plugins/) to add your own
tools through the `ToolRegistry`.
:::
