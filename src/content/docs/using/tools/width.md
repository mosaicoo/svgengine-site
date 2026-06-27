---
title: Width tool
description: Give a path's stroke a variable-width profile.
---

**Shortcut: `W`.** The Width tool applies a variable-width profile to a selected
path's stroke.

## How to use it

Apply it to a selected path to reshape its stroke into a profiled outline
(thicker and thinner along its length). The change is baked into the geometry and
can be reverted with undo.

## Tool Options

| Option | Values | What it does |
| --- | --- | --- |
| Profile | uniform / tapered / calligraphic | The width shape along the stroke |
| Width | 1–100 | Base width, in pixels |
| Reset | — | Restore the default options |

## Tips & interactions

- **Tapered** is thick in the middle; **calligraphic** runs thin to thick.
- This is related to the brush expansion used by the
  [Pencil](/svgengine-site/using/tools/pencil/) — both shape a stroke with a
  width profile.

See the [tools overview](/svgengine-site/using/tools/) and
[keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/).
