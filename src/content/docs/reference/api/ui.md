---
title: 'API: ui'
description: Public API of @mosaicoo/svg-engine/ui — the Material editor shells, panels, dialogs, tool options and services.
---

`@mosaicoo/svg-engine/ui` is the **opt-in Material UI layer**: ready-made editor
shells, panels, dialogs, tool-options components and UI services. This entry point
(and `ai/nlu-ui`) is the only one that depends on `@angular/material` and
`@angular/cdk`.

```ts
import { SvgeShellPro } from '@mosaicoo/svg-engine/ui';
```

## Shells

- **`SvgeShellPro`** — the full professional drop-in editor (`<svge-shell-pro>`).
- **`SvgeEditor`** — the configurable editor shell (`<svge-editor>`).

## Bars

- **`SvgeMenuBar`**, **`SvgeToolbar`**, **`SvgeStatusBar`** (+ **`StatusBarSection`**,
  **`STATUS_BAR_SECTIONS`**), **`SvgeToolsPalette`**, **`SvgeToolOptions`**,
  **`SvgeContextMenu`** (+ **`SvgeContextMenuTrigger`**, **`SvgeContextMenuService`**,
  **`ContextMenuSlot`**, **`CONTEXT_MENU_SLOT`**, **`MENU_SLOT`**, **`MenuBarSlot`**).

## Panels

- **`SvgeInspector`**, **`LayersPanel`**, **`SvgeColorPalette`**, **`SvgeColorPicker`**,
  **`SvgeGradientEditor`**, **`SvgeEffectsPanel`**, **`SvgeLibrariesPanel`**,
  **`SvgePagesPanel`**, **`SvgeHistoryPanel`** (+ **`SnapshotsPanel`**),
  **`SvgeAssetExportPanel`**, **`SvgePanelGroup`** (+ **`SvgePanelGroupTab`**),
  **`SvgeIsolationBreadcrumb`**, **`SvgeRulers`**, **`SvgeTimeline`**,
  **`SvgeDocumentSettings`**, **`SvgeWorkspaceSettings`**, **`SvgePluginManager`**,
  **`SvgeThemeToggle`**.

## Tool options

A component per tool, plus the registry and provider:

- **`ToolOptionsRegistry`**, **`provideSvgeBuiltinToolOptions`**, **`TOOL_OPT_SHARED_STYLES`**.
- **`SvgeSelectToolOptions`**, **`SvgeDirectSelectOptions`**, **`SvgePenToolOptions`**,
  **`SvgePencilToolOptions`**, **`SvgeRectangleOptions`**, **`SvgeEllipseOptions`**,
  **`SvgePolygonOptions`**, **`SvgeTextToolOptions`**, **`SvgeEyedropperToolOptions`**,
  **`SvgeKnifeToolOptions`**, **`SvgeSmoothToolOptions`**, **`SvgeGradientToolOptions`**,
  **`SvgeWidthToolOptions`**, **`SvgeSymbolSprayerOptions`**.

## Dialogs

- Shell & config: **`SvgeDialogShell`**, **`svgeDialogConfig`**, **`SvgeDialogSize`**,
  **`SVGE_DIALOG_MAX_HEIGHT`**.
- Dialogs + opener services: **`SvgeAboutDialog`** / **`SvgeAboutDialogService`**,
  **`SvgeCommandPaletteDialog`** / **`SvgeCommandPaletteService`**,
  **`SvgeFindReplaceDialog`** / **`SvgeFindReplaceDialogService`**,
  **`SvgeKeyboardShortcutsDialog`** / **`SvgeKeyboardShortcutsDialogService`**,
  **`SvgeNumberPromptDialog`** / **`SvgeNumberPromptDialogService`** (+ **`NumberPromptDialogData`**),
  **`SvgeSmartObjectEditorDialog`** / **`SvgeSmartObjectEditorDialogService`** (+ **`SmartObjectEditorDialogData`**),
  **`SvgeSvgSourceDialog`** / **`SvgeSvgSourceDialogService`**,
  **`SvgeTraceImageDialog`** / **`SvgeTraceImageDialogService`** (+ **`TraceImageDialogData`**, **`TraceImageDialogResult`**),
  **`SvgeTransformDialog`** / **`SvgeTransformDialogService`** (+ **`TransformDialogData`**, **`TransformDialogMode`**, **`TransformDialogResult`**),
  **`SvgeCodeGeneratorDialog`** / **`SvgeCodeGeneratorDialogService`**,
  **`SvgePluginManagerDialog`** / **`SvgePluginManagerDialogService`**,
  **`SvgeDocumentSettingsDialogService`**, **`SvgeWorkspaceSettingsDialogService`**.

## Services

- **`ThemeService`** (+ **`Theme`**, **`ResolvedTheme`**), **`WorkspaceLayoutService`**,
  **`ColorHistoryService`**.

## Pipes & color utilities

- Pipes: **`RectFieldPipe`**, **`EllipseFieldPipe`**, **`LineFieldPipe`**.
- Color: **`HSV`**, **`RGB`**, **`hsvToRgb`**, **`rgbToHsv`**, **`hexToRgb`**,
  **`formatHex`**, **`formatHsvAsHex`**, **`parseHex`**, **`parseHexToHsv`**.
- Menu/palette helpers: **`humanizeMenuSlot`**, **`filterPaletteCommands`**,
  **`scorePaletteCommand`**, **`PaletteCommandLike`**.

## Providers & plugins

- **`provideSvgeUiBuiltins`**, **`builtinUiMenuContributionsPlugin`**,
  **`codeGeneratorsPlugin`**, **`provideSvgeBuiltinToolOptions`**.
- Constant: **`STORAGE_KEY`**.

:::note
Most of these UI symbols are not individually listed in the library's
`docs/09-api-publica.md`; this page reflects the current export surface.
:::
