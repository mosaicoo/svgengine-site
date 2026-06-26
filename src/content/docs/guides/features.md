---
title: Features
description: What you can build with svg-engine — drawing, geometry, documents, style, productivity, AI, accessibility and performance.
---

svg-engine reaches a feature set comparable to desktop vector tools, all built on
the same headless engine. Everything below is available through the editor and,
where relevant, through the programmatic command API.

## Drawing

- Select and Direct-Select tools.
- Pen (Bézier) and Pencil (freehand) drawing.
- Shape tools: Rectangle, Ellipse, Polygon (and star).
- Text with rich-text runs, variable fonts and text-on-path.
- Extra tools: Eyedropper, Knife, Smooth, Gradient, Width, Symbol Sprayer.

## Geometry

- Path / Anchor editor with three anchor kinds — **cusp**, **smooth** and
  **symmetric** (Illustrator/Affinity-equivalent behavior).
- Pathfinder boolean operations: Union, Intersect, Subtract, Exclude, Divide.
- Path operations: simplify, split, join, reverse, outline stroke, offset.
- Live corners and compound paths.

The same operations the UI dispatches are available as commands:

```ts
import { CommandBus, UnionCommand, DivideCommand } from '@mosaicoo/svg-engine/core';

// Combine shapes into one path
bus.dispatch(new UnionCommand([rectId, circleId]));

// Divide overlapping shapes — each region becomes its own path
bus.dispatch(new DivideCommand([rectId, circleId]));
```

## Documents

- Pages / artboards.
- Layers, with visibility and lock.
- Smart Objects.
- Symbols and instances (master/instance).
- Version snapshots.
- Auto-save and recovery.

## Style

- Non-destructive, chainable effects and filters.
- Gradients with an inline editor.
- Patterns.
- A libraries system: shapes, palettes, gradients, patterns, symbols, brushes,
  graphic styles and templates.

## Productivity

- Find & Replace.
- Align and distribute.
- Customizable keyboard shortcuts.
- Auto-trace (raster → vector).
- Code generators (React, Data URI).
- Per-asset export.
- Animation timeline.

## AI (opt-in)

- Natural-language command input.
- On-device speech-to-text (Whisper) — fully optional and decoupled from the
  editor core. See [Entry points](/svgengine-site/reference/entry-points/) for the
  `ai/*` packages.

## Accessibility

ARIA roles and keyboard navigation are implemented across every interactive
surface — overlays, panels and handles — following the WAI-ARIA Authoring
Practices.

## Performance

The renderer targets **60 fps pan/zoom at 1,000+ nodes**, with an opt-in viewport
culling directive for sparse documents.

:::tip[Try it]
Install the package and render your first document in
[Getting started](/svgengine-site/guides/getting-started/), or learn how to add
your own tools and commands in [Plugins](/svgengine-site/guides/plugins/).
:::
