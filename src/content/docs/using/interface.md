---
title: Interface overview
description: A tour of the svg-engine professional editor — the panels, bars and canvas that make up the shell.
---

The professional shell (`<svge-shell-pro>`) arranges the editor into a few clear
regions. Because the editor is composable, a given app may show only some of
them — but the full shell looks like this:

## Menu bar

Across the top: **File**, **Edit**, **View**, **Object**, **Path** and more.
Menus are populated by plugins, so the exact entries depend on which features an
app enables.

## Toolbar

A row of quick actions (undo / redo / zoom / reset and other plugin
contributions).

## Tool Options bar

Shows the parameters of the **currently active tool**. For example, with the
Rectangle tool active you'll see its corner-radius option; with Polygon, its
sides and star options. The bar updates as you switch tools.

## Tools palette

A vertical strip of tool buttons down one side. Click a tool or press its
keyboard key to activate it; the active tool is highlighted. See
[Tools](/svgengine-site/using/tools/) and
[Keyboard shortcuts](/svgengine-site/using/keyboard-shortcuts/).

## Canvas

The center area where you draw and edit. It renders your document and hosts the
interactive overlays — selection handles, the rotation pivot, the marquee,
snap guides, the path/anchor editor and page outlines. **Pan** and **zoom** here
to navigate.

## Layers panel

Usually on the right: a tree of every object, with reordering (drag and drop),
rename, **visibility** (eye) and **lock** toggles, and grouping. Locked objects
can't be selected or edited until unlocked.

## Inspector (Properties)

Shows and edits the properties of the selected object — geometry (position,
size), fill and stroke, text/type settings, and transform/align/arrange actions,
organized into tabs.

## Status bar

Along the bottom: contextual readouts such as the active tool, selection count,
cursor position, zoom level and snap state.

## Context menu

**Right-click** the canvas or an object to open a context menu with the actions
relevant to what you clicked.

## Pages panel

When a document has multiple **pages / artboards**, a tab strip lets you create,
select, rename and reorder them.

:::note
Not every consumer of the library shows every panel — apps compose only the
parts they need. The hosted [live demo](/svgengine-site/demo/) shows the full
professional shell.
:::
