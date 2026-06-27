---
title: Keyboard shortcuts
description: The built-in editor keyboard shortcuts and tool activation keys.
---

The editor's shortcuts are provided by opt-in plugins and registered through a
`ShortcutRegistry`, so an app can remap or disable any of them. The drop-in shell
enables the built-in set below by default.

:::note
On macOS, `Ctrl` matches `Cmd` — the combo parser treats `Ctrl` as the primary
modifier cross-platform. Shortcuts are also suppressed while you type in a text
field, so `Ctrl+C`/`Ctrl+V` do native text copy/paste there.
:::

## Editing

| Shortcut | Action |
| --- | --- |
| `Ctrl+Z` | Undo last command |
| `Ctrl+Y` | Redo (Windows idiom) |
| `Ctrl+Shift+Z` | Redo (macOS / Linux idiom) |
| `Ctrl+X` | Cut selection |
| `Ctrl+C` | Copy selection |
| `Ctrl+V` | Paste |
| `Ctrl+Shift+V` | Paste in place |
| `Ctrl+D` | Duplicate selection |

## Objects

| Shortcut | Action |
| --- | --- |
| `Ctrl+G` | Group selection |
| `Ctrl+Shift+G` | Ungroup focused selection |

## Selection

| Shortcut | Action |
| --- | --- |
| `Ctrl+A` | Select all objects on the active page |
| `Arrow keys` | Nudge selection |
| `Shift` + `Arrow keys` | Nudge selection (larger step) |
| `Delete` | Delete selection |

## Snapshots

| Shortcut | Action |
| --- | --- |
| `Ctrl+Shift+S` | Take a snapshot of the current document |
| `Ctrl+Alt+Z` | Restore the most recent snapshot |

## File

| Shortcut | Action |
| --- | --- |
| `Ctrl+S` | Save workspace (`.svge`) |

## Tool activation

Press a key to switch tools. The tools palette also shows each key as a tooltip.

| Key | Tool |
| --- | --- |
| `V` | Select |
| `P` | Pen |
| `I` | Eyedropper |
| `C` | Knife |
| `S` | Smooth |
| `G` | Gradient |
| `W` | Width |
| `O` | Symbol Sprayer |

See [Tools](/svgengine-site/using/tools/) for what each tool does and the full
list. Some features register their own shortcuts (for example, Find & Replace).
