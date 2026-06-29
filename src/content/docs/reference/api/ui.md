---
title: 'API: ui'
description: 'Public API of @mosaicoo/svg-engine/ui — the opt-in Material UI tier: drop-in editor shells, panels, dialogs and presentation services.'
---

`@mosaicoo/svg-engine/ui` is the **opt-in Material UI tier**: ready-made editor
shells, panels, bars, dialogs and presentation services built on Angular Material.
This entry point (and `ai/nlu-ui`) are the only ones that depend on
`@angular/material` and `@angular/cdk` — everything below `ui` stays headless.

```ts
import { SvgeShellPro, provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';
```

## Drop-in shells

The fastest way to get a working editor: mount one component.

| Component | Selector | What it is |
| --- | --- | --- |
| `SvgeShellPro` | `<svge-shell-pro>` | The professional editor: menu bar + toolbar + tool options + tools palette + canvas + context menu + layers + inspector + status bar, wired together. |
| `SvgeEditor` | `<svge-editor>` | A configurable shell (background + renderer + overlays + toolbar, optional status bar) with toggleable pieces — from headless-pure to a complete shell. |

## Setup

| API | Description |
| --- | --- |
| `provideSvgeUiBuiltins()` | Installs the UI-side built-in plugins (Material dialogs, the tool-options registry). Call it after `provideSvgEngineEditorBuiltins()` to complete the Material tier. |

## Panels & bars

Compose your own layout from these standalone components instead of using a shell.

| Component | Selector | Purpose |
| --- | --- | --- |
| `LayersPanel` | `<svge-layers-panel>` | Layers tree with drag-and-drop hierarchy. |
| `SvgeInspector` | `<svge-inspector>` | Property inspector for the selected nodes. |
| `SvgeColorPalette` | `<svge-color-palette>` | Swatch grid; emits `colorPicked` on click. |
| `SvgeColorPicker` | `<svge-color-picker>` | Full-featured color picker. |
| `SvgeGradientEditor` | `<svge-gradient-editor>` | Edit the active gradient's stops/kind. |
| `SvgeEffectsPanel` | `<svge-effects-panel>` | Effects/filters panel. |
| `SvgeLibrariesPanel` | `<svge-libraries-panel>` | Unified surface for the asset libraries (shapes, templates, gradients, patterns, styles, assets). |
| `SvgePagesPanel` | `<svge-pages-panel>` | Browser-style tabs for pages/artboards (auto-hides with zero pages). |
| `SvgeHistoryPanel` | `<svge-history-panel>` | Linear command history with click-to-time-travel (`CommandBus.goto()`). |
| `SnapshotsPanel` | `<svge-snapshots-panel>` | Named, restorable document checkpoints. |
| `SvgeAssetExportPanel` | `<svge-asset-export-panel>` | Batch-export UI over the edit-side asset-export registry. |
| `SvgeTimeline` | `<svge-timeline>` | Animation timeline dock (ruler + per-track keyframes + playhead). |
| `SvgeMenuBar` / `SvgeToolbar` / `SvgeStatusBar` | `<svge-menu-bar>` / `<svge-toolbar>` / `<svge-status-bar>` | The menu bar, a slot-driven icon toolbar, and the status bar (tool/selection/zoom/snap). |
| `SvgeToolsPalette` / `SvgeToolOptions` | `<svge-tools-palette>` / `<svge-tool-options>` | The tools palette and the host that renders the active tool's options. |
| `SvgeRulers` / `SvgeIsolationBreadcrumb` / `SvgePluginManager` | — | Rulers, the isolation-mode breadcrumb, and the plugin manager (list/enable/disable/uninstall). |

## Dialogs

Inject a dialog service and call `.open()` to launch a managed Material dialog.

| Service | Opens |
| --- | --- |
| `SvgeCommandPaletteService` | The command palette (fuzzy search over every registered menu command). |
| `SvgeTransformDialogService` | Object ▸ Transform (rotate/scale/skew by exact amounts). |
| `SvgeCodeGeneratorDialogService` | The code-generation dialog (React JSX/component/Data URI preview + copy). |
| `SvgeFindReplaceDialogService` | Find & Replace over node text/properties. |
| `SvgeKeyboardShortcutsDialogService` | The shortcuts manager (rebind/unbind/reset with conflict warnings). |
| `SvgeSvgSourceDialogService` | The SVG source viewer. |
| `SvgeSmartObjectEditorDialogService` | The smart-object contents editor. |
| `SvgeTraceImageDialogService` | The trace-image options dialog (threshold/tolerance/min-points). |
| `SvgeWorkspaceSettingsDialogService` / `SvgeDocumentSettingsDialogService` | Workspace and document settings. |
| `SvgeAboutDialogService` | The About dialog. |

## Services

| API | Description |
| --- | --- |
| `ThemeService` | Theme management (`system`/`light`/`dark`), persisted to localStorage and applied to `<html data-theme>`: `setTheme()`, `cycle()`, `theme`/`resolved` signals. |
| `ColorHistoryService` | Most-recently-used colors (16-entry MRU ring, de-duped, persisted): `add(hex)`, `clear()`, `history` signal. |
| `WorkspaceLayoutService` | Persisted panel/dock layout for the shell. |
| `SvgeContextMenuService` | Open context menus programmatically. |

:::note
`ui` also exports building blocks the shells use internally: the per-tool
*ToolOptions* components + `ToolOptionsRegistry` + `provideSvgeBuiltinToolOptions()`,
the inspector field pipes (`RectFieldPipe`, …), color-math utilities
(`hsvToRgb`, `parseHex`, …), the dialog shell (`SvgeDialogShell`,
`svgeDialogConfig`), slot constants (`MENU_SLOT`, `STATUS_BAR_SECTIONS`, …) and
`builtinUiMenuContributionsPlugin`. You normally consume these through the shells
and dialogs above rather than directly.
:::
