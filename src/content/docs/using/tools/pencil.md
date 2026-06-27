---
title: Pencil tool
description: Draw freehand paths — and expand them with a brush profile.
---

**Shortcut: `P`.** The Pencil tool draws freehand paths that follow your cursor.

## How to use it

- Press, drag and release to draw; the path follows your cursor with a **live
  preview**.
- A single click (no drag) does nothing — a path needs at least a short stroke.
- Switching tools mid-stroke **discards** the in-progress drawing.

## Tool Options

| Option | Range | What it does |
| --- | --- | --- |
| Fill | color / none | Fill color for the new path (with a no-fill toggle) |
| Stroke | color | Stroke (outline) color |
| Stroke width | 0.5–100 | Outline thickness |
| Close path | on / off | Close the stroke into a loop (adds a `Z` to the path) |
| Reset | — | Restore the default options |

## Pencil + brush expansion

This is where the Pencil changes behavior dramatically depending on your
settings. If a **brush** is selected (from the Brush library), the Pencil does
**not** draw a simple stroked centerline — it **expands** your stroke along the
brush's **width profile** into a filled outline with **variable width** (using
the brush's base width). With **no brush** selected, you get a normal centerline
path that uses your **Stroke width**.

So the same gesture produces very different results:

- **No brush** → a uniform-width stroked path.
- **Brush selected** → a filled, variable-width outline (calligraphic / tapered
  look) shaped by the brush profile.

## Tips & interactions

- For calligraphic or tapered strokes, pick a brush **before** drawing.
- Turn on **Close path** to draw closed shapes freehand.

See the [tools overview](/svgengine-site/using/tools/) and
[keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/).
