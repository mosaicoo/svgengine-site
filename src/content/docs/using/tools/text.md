---
title: Text tool
description: Add and edit text on the canvas.
---

**Shortcut: `T`.** The Text tool adds text and edits it inline on the canvas.

## How to use it

- **Click** the canvas to insert a text node and enter inline-edit mode; a
  placeholder appears that you type over.
- **Enter** or clicking away (**blur**) commits the text. Empty text on a fresh
  placeholder is removed automatically.
- **Esc** cancels the edit.
- **Shift+Enter** inserts a line break.

Set the **font, size, weight and alignment in the options before clicking**, so
the new text starts the way you want.

## Tool Options

| Option | Range | What it does |
| --- | --- | --- |
| Font | font family | Typeface of the new text |
| Size | 6–400 | Font size, in px |
| Weight | font weight | Boldness of the text |
| Italic | on / off | Italic style |
| Anchor | left / center / right | Alignment (`text-anchor` start / middle / end) |
| Fill | color | Text color |
| Reset | — | Restore the default options |

## Tips & interactions

- Text supports rich-text runs, variable fonts and text-on-a-path; configure
  those from the Inspector after creating the text.

See the [tools overview](/svgengine-site/using/tools/) and
[keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/).
