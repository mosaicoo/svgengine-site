---
title: Best practices
description: Tips for getting the most out of the editor — and for embedding it.
---

## Working with artwork

- **Organize with layers and groups.** Group related objects, and **lock** what
  you're not editing so you don't move it by accident.
- **Use snapping, align and distribute.** Let snapping line objects up while you
  drag, and use the [Select](/svgengine-site/using/tools/select/) tool's
  Align/Distribute options for clean layouts.
- **Convert shapes to paths before anchor-editing.** Rectangles, ellipses and
  polygons become freely editable once converted; then use
  [Direct Select](/svgengine-site/using/tools/direct-select/).
- **Pick the right stroke route.** For calligraphic or variable-width strokes,
  select a brush before drawing with the
  [Pencil](/svgengine-site/using/tools/pencil/), or apply the
  [Width](/svgengine-site/using/tools/width/) tool to an existing path.
- **Take snapshots before big changes** (`Ctrl+Shift+S`) so you can jump back.
- **Nudge for precision.** Arrow keys move the selection; hold **Shift** for a
  larger step.

## Embedding the library

- **Import only what you need.** Entry points are independent — a viewer only
  needs `render`; you don't pay for the editor or Material unless you use them.
- **Keep the headless boundary.** Don't reach for `ui` unless you want the
  Material editor; the headless layers stay framework-light.
- **Extend with plugins, not forks.** Add tools, importers, effects and more
  through the registries — see [Plugins](/svgengine-site/guides/plugins/).
- **Route mutations through commands.** Dispatching commands keeps undo/redo
  consistent for free.

See [Architecture](/svgengine-site/guides/architecture/) for the reasoning behind
these.
