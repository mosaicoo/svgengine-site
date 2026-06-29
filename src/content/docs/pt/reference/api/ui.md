---
title: 'API: ui'
description: API pública de @mosaicoo/svg-engine/ui — os shells Material do editor, painéis, dialogs, tool options e serviços.
---

`@mosaicoo/svg-engine/ui` é a **camada de UI Material opt-in**: shells de editor
prontos, painéis, dialogs, componentes de tool-options e serviços de UI. Este
entry point (e o `ai/nlu-ui`) é o único que depende de `@angular/material` e
`@angular/cdk`.

```ts
import { SvgeShellPro } from '@mosaicoo/svg-engine/ui';
```

## Shells

- **`SvgeShellPro`** — o editor profissional drop-in completo (`<svge-shell-pro>`).
- **`SvgeEditor`** — o shell de editor configurável (`<svge-editor>`).

## Barras

- **`SvgeMenuBar`**, **`SvgeToolbar`**, **`SvgeStatusBar`** (+ **`StatusBarSection`**,
  **`STATUS_BAR_SECTIONS`**), **`SvgeToolsPalette`**, **`SvgeToolOptions`**,
  **`SvgeContextMenu`** (+ **`SvgeContextMenuTrigger`**, **`SvgeContextMenuService`**,
  **`ContextMenuSlot`**, **`CONTEXT_MENU_SLOT`**, **`MENU_SLOT`**, **`MenuBarSlot`**).

## Painéis

- **`SvgeInspector`**, **`LayersPanel`**, **`SvgeColorPalette`**, **`SvgeColorPicker`**,
  **`SvgeGradientEditor`**, **`SvgeEffectsPanel`**, **`SvgeLibrariesPanel`**,
  **`SvgePagesPanel`**, **`SvgeHistoryPanel`** (+ **`SnapshotsPanel`**),
  **`SvgeAssetExportPanel`**, **`SvgePanelGroup`** (+ **`SvgePanelGroupTab`**),
  **`SvgeIsolationBreadcrumb`**, **`SvgeRulers`**, **`SvgeTimeline`**,
  **`SvgeDocumentSettings`**, **`SvgeWorkspaceSettings`**, **`SvgePluginManager`**,
  **`SvgeThemeToggle`**.

## Tool options

Um componente por tool, mais o registry e o provider:

- **`ToolOptionsRegistry`**, **`provideSvgeBuiltinToolOptions`**, **`TOOL_OPT_SHARED_STYLES`**.
- **`SvgeSelectToolOptions`**, **`SvgeDirectSelectOptions`**, **`SvgePenToolOptions`**,
  **`SvgePencilToolOptions`**, **`SvgeRectangleOptions`**, **`SvgeEllipseOptions`**,
  **`SvgePolygonOptions`**, **`SvgeTextToolOptions`**, **`SvgeEyedropperToolOptions`**,
  **`SvgeKnifeToolOptions`**, **`SvgeSmoothToolOptions`**, **`SvgeGradientToolOptions`**,
  **`SvgeWidthToolOptions`**, **`SvgeSymbolSprayerOptions`**.

## Dialogs

- Shell & config: **`SvgeDialogShell`**, **`svgeDialogConfig`**, **`SvgeDialogSize`**,
  **`SVGE_DIALOG_MAX_HEIGHT`**.
- Dialogs + services de abertura: **`SvgeAboutDialog`** / **`SvgeAboutDialogService`**,
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

## Serviços

- **`ThemeService`** (+ **`Theme`**, **`ResolvedTheme`**), **`WorkspaceLayoutService`**,
  **`ColorHistoryService`**.

## Pipes & utilitários de cor

- Pipes: **`RectFieldPipe`**, **`EllipseFieldPipe`**, **`LineFieldPipe`**.
- Cor: **`HSV`**, **`RGB`**, **`hsvToRgb`**, **`rgbToHsv`**, **`hexToRgb`**,
  **`formatHex`**, **`formatHsvAsHex`**, **`parseHex`**, **`parseHexToHsv`**.
- Helpers de menu/paleta: **`humanizeMenuSlot`**, **`filterPaletteCommands`**,
  **`scorePaletteCommand`**, **`PaletteCommandLike`**.

## Providers & plugins

- **`provideSvgeUiBuiltins`**, **`builtinUiMenuContributionsPlugin`**,
  **`codeGeneratorsPlugin`**, **`provideSvgeBuiltinToolOptions`**.
- Constante: **`STORAGE_KEY`**.

:::note
A maioria desses símbolos de UI não está listada individualmente em
`docs/09-api-publica.md`; esta página reflete a superfície de exports atual.
:::
