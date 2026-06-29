---
title: 'API: ui'
description: API pública de @mosaicoo/svg-engine/ui — los shells Material del editor, paneles, diálogos, tool options y servicios.
---

`@mosaicoo/svg-engine/ui` es la **capa de UI Material opcional**: shells de editor
listos, paneles, diálogos, componentes de tool-options y servicios de UI. Este
entry point (y `ai/nlu-ui`) es el único que depende de `@angular/material` y
`@angular/cdk`.

```ts
import { SvgeShellPro } from '@mosaicoo/svg-engine/ui';
```

## Shells

- **`SvgeShellPro`** — el editor profesional drop-in completo (`<svge-shell-pro>`).
- **`SvgeEditor`** — el shell de editor configurable (`<svge-editor>`).

## Barras

- **`SvgeMenuBar`**, **`SvgeToolbar`**, **`SvgeStatusBar`** (+ **`StatusBarSection`**,
  **`STATUS_BAR_SECTIONS`**), **`SvgeToolsPalette`**, **`SvgeToolOptions`**,
  **`SvgeContextMenu`** (+ **`SvgeContextMenuTrigger`**, **`SvgeContextMenuService`**,
  **`ContextMenuSlot`**, **`CONTEXT_MENU_SLOT`**, **`MENU_SLOT`**, **`MenuBarSlot`**).

## Paneles

- **`SvgeInspector`**, **`LayersPanel`**, **`SvgeColorPalette`**, **`SvgeColorPicker`**,
  **`SvgeGradientEditor`**, **`SvgeEffectsPanel`**, **`SvgeLibrariesPanel`**,
  **`SvgePagesPanel`**, **`SvgeHistoryPanel`** (+ **`SnapshotsPanel`**),
  **`SvgeAssetExportPanel`**, **`SvgePanelGroup`** (+ **`SvgePanelGroupTab`**),
  **`SvgeIsolationBreadcrumb`**, **`SvgeRulers`**, **`SvgeTimeline`**,
  **`SvgeDocumentSettings`**, **`SvgeWorkspaceSettings`**, **`SvgePluginManager`**,
  **`SvgeThemeToggle`**.

## Tool options

Un componente por herramienta, más el registro y el provider:

- **`ToolOptionsRegistry`**, **`provideSvgeBuiltinToolOptions`**, **`TOOL_OPT_SHARED_STYLES`**.
- **`SvgeSelectToolOptions`**, **`SvgeDirectSelectOptions`**, **`SvgePenToolOptions`**,
  **`SvgePencilToolOptions`**, **`SvgeRectangleOptions`**, **`SvgeEllipseOptions`**,
  **`SvgePolygonOptions`**, **`SvgeTextToolOptions`**, **`SvgeEyedropperToolOptions`**,
  **`SvgeKnifeToolOptions`**, **`SvgeSmoothToolOptions`**, **`SvgeGradientToolOptions`**,
  **`SvgeWidthToolOptions`**, **`SvgeSymbolSprayerOptions`**.

## Diálogos

- Shell y config: **`SvgeDialogShell`**, **`svgeDialogConfig`**, **`SvgeDialogSize`**,
  **`SVGE_DIALOG_MAX_HEIGHT`**.
- Diálogos + servicios de apertura: **`SvgeAboutDialog`** / **`SvgeAboutDialogService`**,
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

## Servicios

- **`ThemeService`** (+ **`Theme`**, **`ResolvedTheme`**), **`WorkspaceLayoutService`**,
  **`ColorHistoryService`**.

## Pipes y utilidades de color

- Pipes: **`RectFieldPipe`**, **`EllipseFieldPipe`**, **`LineFieldPipe`**.
- Color: **`HSV`**, **`RGB`**, **`hsvToRgb`**, **`rgbToHsv`**, **`hexToRgb`**,
  **`formatHex`**, **`formatHsvAsHex`**, **`parseHex`**, **`parseHexToHsv`**.
- Helpers de menú/paleta: **`humanizeMenuSlot`**, **`filterPaletteCommands`**,
  **`scorePaletteCommand`**, **`PaletteCommandLike`**.

## Providers y plugins

- **`provideSvgeUiBuiltins`**, **`builtinUiMenuContributionsPlugin`**,
  **`codeGeneratorsPlugin`**, **`provideSvgeBuiltinToolOptions`**.
- Constante: **`STORAGE_KEY`**.

:::note
La mayoría de estos símbolos de UI no están listados individualmente en
`docs/09-api-publica.md`; esta página refleja la superficie de exports actual.
:::
