---
title: 'API: edit'
description: API pública de @mosaicoo/svg-engine/edit — seleção, transform, tools, sistema de plugins, registries, libraries, efeitos, pages e mais.
---

`@mosaicoo/svg-engine/edit` é o maior entry point headless: serviços de seleção &
transform, o sistema de tools, o **scaffolding de plugins**, os registries de
capacidade, os ecossistemas de libraries/efeitos, pages, snapshots e os overlays
que a UI projeta no canvas. Sem dependência de Angular Material/CDK.

```ts
import { provideSvgEnginePlugin, ToolRegistry } from '@mosaicoo/svg-engine/edit';
```

Esta página agrupa a superfície pública completa por área. O **conteúdo de
library** built-in (shapes, gradients, patterns, templates, etc.) é exportado
como muitas pequenas funções factory; elas são resumidas por library em vez de
listadas uma a uma. Para as assinaturas exatas, o
[repositório da library](https://github.com/mosaicoo/svg-engine) é autoritativo.

## Sistema de plugins

- Contrato: **`EditorPlugin`**, **`PluginContext`**, **`PluginCategory`**,
  **`PLUGIN_API_VERSION`**, **`Disposable`**.
- Registry & bootstrap: **`PluginRegistry`**, **`provideSvgEnginePlugin`**,
  **`provideSvgEngineEditorScope`** (escopo por editor, D-042),
  **`provideSvgEngineEditorBuiltins`**.
- Gerência (D-083 Fase 1): **`PluginManagerService`**, **`PluginCatalog`**,
  **`PluginStateStore`**, **`InstalledPlugin`**, **`PluginDisplayMeta`**,
  **`withPluginMeta`**, **`PluginActionResult`**.
- Carregamento externo (D-083 Fase 2): **`PluginLoader`**, **`providePluginLoader`**,
  **`PluginLoaderConfig`**, **`PluginModuleLoader`**, **`PluginManifest`**,
  **`PluginSource`**, **`ExternalPluginManifest`**, **`validateExternalPluginManifest`**,
  **`SVGE_PLUGIN_MODULE_LOADER`**, **`SVGE_PLUGIN_TRUSTED_ORIGINS`**.

## Registries de capacidade

Todo registry segue `register(entry): Disposable`:

- **`ToolRegistry`**, **`MenuContributionRegistry`**, **`ShortcutRegistry`**,
  **`PaletteRegistry`**, **`EffectRegistry`**, **`ParametricEffectRegistry`**,
  **`ChainFilterRegistry`**, **`AssetExportRegistry`**, **`LibraryRegistry`**,
  **`PluginRegistry`**, além dos re-exportados **`ImporterRegistry`**,
  **`ExporterRegistry`**, **`OptimizerRegistry`**.

## Tools

- IDs (15): **`SELECT_TOOL_ID`**, **`DIRECT_SELECT_TOOL_ID`**, **`PEN_TOOL_ID`**,
  **`PENCIL_TOOL_ID`**, **`RECTANGLE_TOOL_ID`**, **`ELLIPSE_TOOL_ID`**,
  **`POLYGON_TOOL_ID`**, **`TEXT_TOOL_ID`**, **`EYEDROPPER_TOOL_ID`**,
  **`KNIFE_TOOL_ID`**, **`SMOOTH_TOOL_ID`**, **`GRADIENT_TOOL_ID`**,
  **`WIDTH_TOOL_ID`**, **`SYMBOL_SPRAYER_TOOL_ID`**, **`PAGE_TOOL_ID`**.
- Contrato & host: **`Tool`**, **`ToolContext`**, **`ToolPointerEvent`**,
  **`ToolHostService`**.
- Plugins de tool: **`selectToolPlugin`**, **`shapeToolsPlugin`**, **`penToolPlugin`**,
  **`pencilToolPlugin`**, **`textToolPlugin`**, **`extraToolsPlugin`**,
  **`pageToolPlugin`**, **`selectionNudgePlugin`**.
- Serviços por tool: **`ShapeToolService`**, **`PenToolService`**,
  **`PencilToolService`**, **`EyedropperToolService`**, **`KnifeToolService`**,
  **`SmoothToolService`**, **`GradientToolService`**, **`WidthToolService`**,
  **`SymbolSprayerService`**, **`SymbolSprayerPreviewService`**,
  **`InlineTextEditor`** / **`InlineTextEditorService`**.
- Helpers de shape: **`ShapeDraft`**, **`ShapeKind`**, **`regularPolygonPoints`**,
  **`pointsToPathD`**, **`DEFAULT_POLYGON_SIDES`**, **`PLACEHOLDER_TEXT`**.

## Seleção, transform, marquee, snap, alinhamento

- Seleção: **`SelectionService`**, **`SelectionAppearanceService`**,
  **`AnchorSelectionService`**, **`SelectionResolutionMode`**,
  **`SelectableResolveOptions`**, **`KeyObjectService`**.
- Transform: **`TransformService`**, **`RotationPivot`**.
- Marquee: **`MarqueeService`**, **`Marquee`**, **`MarqueeState`**,
  **`MarqueeMode`**, **`MarqueeHitMode`**, **`MarqueeCandidate`**,
  **`nodesInsideMarquee`**.
- Snap: **`SnapService`**, **`SnapResult`**, **`SnapTarget`**, **`SnapSource`**,
  **`SnapMode`**, **`SnapAxis`**, **`SnapGuide`**, **`SnapGuides`**, **`resolveSnap`**,
  **`rectsToSnapTargets`**, **`gridTargetsNear`**, **`guidesToSnapTargets`**.
- Alinhamento: **`AlignmentService`**, **`AlignAxis`**, **`DistributeAxis`**,
  **`computeAlignDeltas`**, **`computeAlignToReferenceDeltas`**,
  **`computeDistributeDeltas`**, **`computeDistributeSpacingDeltas`**,
  **`computeAverageGap`**, **`resolveAlignReference`**.
- Anchors de bbox: **`BBOX_ANCHORS`**, **`BBoxAnchor`**, **`allAnchors`**,
  **`anchorPoint`**, **`findNearestAnchor`**.

## Hit-testing & geometria renderizada

- **`findOwningNodeId`**, **`resolveNodeIdFromEvent`**, **`resolveSelectableNodeId`**,
  **`resolveSelectableNodeIdFromElement`**, **`geometricHitTestElement`**,
  **`findRenderedNode`**.
- **`getRenderedNodeBBox`**, **`getRenderedNodeOBB`**, **`getRenderedParentMatrix`**,
  **`getCombinedBBox`**, **`NodeBBox`**, **`RenderedOBB`**, **`rectFromPoints`**,
  **`pageBoundsIn`**, **`collectNodeAncestorIds`**, **`DEFAULT_HIT_TOLERANCE_PX`**.
- Pointer (D-036): **`capturePointer`**, **`releasePointer`**, **`isEditableTarget`**.

## Overlays, gestos & diretivas

- Overlays: **`SelectionOverlay`**, **`AnchorOverlay`**, **`GridOverlay`**,
  **`GuidesOverlay`**, **`PageOverlay`**, **`SvgePageSelectionOverlay`**,
  **`PenOverlay`**, **`PencilOverlay`**, **`ShapeOverlay`**, **`GradientOverlay`**,
  **`SymbolSprayerOverlay`**, **`SvgeImportPlacementOverlay`**, **`SvgePixelPreviewRaster`**.
- Gestos & filtros: **`SvgeCanvasGestures`**, **`SvgeShellInteractions`**,
  **`SvgeViewportCullingDirective`**, **`IsolationFilter`**, **`LayersFilter`**,
  **`InteractionConfig`**.
- Viewport culling: **`ViewportCullingService`** (+ a diretiva acima),
  **`WHEEL_ZOOM_SPEED_MIN`**, **`WHEEL_ZOOM_SPEED_MAX`**.
- Help links (D-096): **`SvgeHelpLinks`**, **`DEFAULT_HELP_LINKS`**,
  **`SVGE_HELP_LINKS`**, **`provideSvgeHelpLinks`**.
- Tamanho dos handles: **`HANDLE_SIZE_DEFAULT`**, **`HANDLE_SIZE_MIN`**, **`HANDLE_SIZE_MAX`**,
  **`HANDLE_SIZE_PRESETS`**, **`HandleSizePreset`**, **`clampHandleSize`**,
  **`HANDLE_DATA_ATTR`**.

## Workspace, layers, isolation, auto-save

- **`WorkspaceService`** + tipos de config: **`WorkspaceConfigState`**,
  **`WorkspaceEditorState`**, **`WorkspaceViewportState`**, **`WorkspaceEnvelope`**,
  **`WorkspaceParseResult`**, **`WorkspaceBackground`**, **`BackgroundConfig`**,
  **`GridConfig`**, **`RulersConfig`**, **`Guide`**; serialização
  **`serializeWorkspace`** / **`parseWorkspace`**, **`WORKSPACE_FORMAT`**,
  **`WORKSPACE_SCHEMA_VERSION`**.
- **`LayersService`**, **`IsolationService`**, **`AutoSaveService`**
  (+ **`AUTOSAVE_STORAGE_KEY`**), **`RecentFilesService`** (+ **`RecentFile`**,
  **`RECENT_FILES_STORAGE_KEY`**), **`FullscreenService`**, **`PanelHostService`**
  (+ **`PanelId`**, **`PANEL_ID`**, **`PanelRevealRequest`**).

## Menus & atalhos

- Menus: **`MenuContribution`**, **`MenuContributionContext`**,
  **`MenuContributionDisabled`**, **`MenuSlot`**, **`MenuBarSlot`**,
  **`ContextMenuSlot`**, **`ToolbarSlot`**, **`MENU_SLOT`**, **`CONTEXT_MENU_SLOT`**,
  **`TOOLBAR_SLOT`**, **`runContribution`**, **`makeDisabledResolver`**,
  **`resolveDisabledSignal`**.
- Atalhos: **`Shortcut`**, **`ShortcutContext`**, **`ParsedCombo`**,
  **`parseCombo`**, **`comboMatches`**, **`comboFromEvent`**, **`formatCombo`**,
  **`validateCombo`**, **`ShortcutService`**, **`ShortcutRegistry`**,
  **`KeybindingsService`**, **`KeybindingOverrides`**, **`KeybindingView`**.
- Plugins de menu/atalho: **`builtinMenuContributionsPlugin`**,
  **`builtinInsertMenuPlugin`**, **`builtinAdvancedEditMenuPlugin`**,
  **`builtinRoadmapMenuPlugin`**, **`builtinEditorShortcutsPlugin`**.

## IO & optimize (re-exportados)

Por compatibilidade, `edit` re-exporta as superfícies de `io` e `optimize` (veja
essas páginas) mais os wrappers de plugin: **`builtinIoPlugin`**,
**`pngExporterPlugin`**, **`builtinOptimizersPlugin`**.

## Efeitos

- Modelo: **`Effect`**, **`EffectInstance`**, **`EffectPreset`**, **`EffectParam`**,
  **`EffectParams`**, **`EffectParamType`**, **`EffectParamValue`**,
  **`EffectNumberParam`**, **`EffectColorParam`**, **`EffectBooleanParam`**,
  **`EffectSelectParam`**.
- Registries & plugin: **`EffectRegistry`**, **`ParametricEffectRegistry`**,
  **`ChainFilterRegistry`**, **`builtinEffectsPlugin`**, **`BUILTIN_EFFECTS`**.
- Factories de efeito built-in (single-filter + presets): `dropShadowEffect`,
  `blurEffect`, `innerShadowEffect`, `innerGlowEffect`, `outerGlowEffect`,
  `brightnessEffect`, `contrastEffect`, `saturateEffect`, `hueRotateEffect`,
  `grayscaleEffect`, `sepiaEffect`, `invertEffect`, `posterizeEffect`,
  `pixelateEffect`, `noiseEffect`, `embossEffect`, `bevelEffect`,
  `displacementMapEffect`, `chromaticAberrationEffect`, e mais.
- Helpers: **`effectDefaults`**, **`resolveEffectParams`**, **`nonDefaultParams`**,
  **`isNumberParam`**, **`encodeEffectFilterId`**, **`extractEffectFilterId`**,
  **`parseEffectFilterId`**, **`makeChainFilterId`**, **`extractChainFilterId`**,
  **`parseChainFilterId`**, **`CHAIN_FILTER_ID_PREFIX`**, **`CHAIN_FILTER_SEPARATOR`**,
  **`PARAM_FILTER_ID_PREFIX`**; filtros **`OutlineFilter`**, **`PixelPreviewFilter`**.

## Libraries (ecossistema de assets, D-048)

Um **`LibraryRegistry`** genérico + **`LibraryItem`** / **`CatalogEntry`** com nove
libraries concretas. Cada uma tem um serviço, um tipo de item, um catálogo
`BUILTIN_*`, um plugin e muitas factories de conteúdo:

- **Shapes** — `ShapeLibraryService`, `ShapeLibraryItem`, `BUILTIN_SHAPES`,
  `builtinShapesPlugin`, factories (`arrowShape`, `starShape`, `heartShape`,
  `hexagonShape`, `cloudShape`, …).
- **Gradients** — `GradientLibraryService`, `GradientLibraryItem`,
  `BUILTIN_GRADIENTS`, `builtinGradientsPlugin`, `GradientStop`, `GradientKind`,
  `GradientGeometry`, `GradientPatch`, `buildGradientMarkup`,
  `GradientEditingService`, `SetGradientCommand`; factories (`linearSunsetGradient`,
  `radialSpotlightGradient`, …).
- **Patterns** — `PatternLibraryService`, `PatternLibraryItem`, `BUILTIN_PATTERNS`,
  `builtinPatternsPlugin`; factories (`dotsPattern`, `gridPattern`, …).
- **Symbols** — `SymbolLibraryService`, `SymbolLibraryItem`, `BUILTIN_SYMBOLS`,
  `builtinSymbolsPlugin`, `SymbolSelectionService`, `InsertSymbolInstanceCommand`,
  `InsertSymbolInstancesBatchCommand`, `SprayDrop`, `buildSymbolMarkup`.
- **Brushes** — `BrushLibraryService`, `BrushLibraryItem`, `BUILTIN_BRUSHES`,
  `builtinBrushesPlugin`, `BrushSelectionService`, `expandStrokeWithProfile`,
  `sampleProfile`, `WidthProfilePreset`.
- **Graphic styles** — `GraphicStyleLibraryService`, `GraphicStyleLibraryItem`,
  `BUILTIN_GRAPHIC_STYLES`, `builtinGraphicStylesPlugin`; factories
  (`glassStyle`, `neonStyle`, …).
- **Templates** — `TemplateLibraryService`, `TemplateLibraryItem`,
  `BUILTIN_TEMPLATES`, `builtinTemplatesPlugin`; factories
  (`a4PortraitTemplate`, `instagramSquareTemplate`, …).
- **Clip paths** — `ClipPathLibraryService`, `ClipPathLibraryItem`,
  `BUILTIN_CLIP_PATHS`, `builtinClipPathsPlugin`.
- **Masks** — `MaskLibraryService`, `MaskLibraryItem`, `BUILTIN_MASKS`,
  `builtinMasksPlugin`.
- Compartilhado: **`ActiveDefsService`**, **`AssetManagerService`**, **`AssetCatalogEntry`**.

## Paletas

- **`Palette`**, **`PaletteRegistry`**, **`builtinPalettesPlugin`**,
  **`extraPalettesPlugin`**.

## Pages

- **`PagesService`**, **`ActivePageService`**, **`PageDragService`**,
  **`PageConfig`**, **`ACTIVE_PAGE_STORAGE_KEY`** (+ os overlays de página acima).

## Smart objects, asset export, find/replace, import, trace, animação

- Smart objects: **`SmartObjectActionsService`**.
- Asset export (D-077): **`AssetExportRegistry`**, **`AssetExportRunner`**,
  **`AssetExportPersistenceService`**, **`ExportSlot`**, **`ExportSlotInput`**,
  **`ExportSlotResult`**, **`ASSET_EXPORT_STORAGE_KEY`**.
- Find & select-same: **`FindReplaceService`**, **`FindCriteria`**, **`FindMatch`**,
  **`SelectSameService`**.
- Import placement: **`ImportPlacementService`**, **`ImportSettingsService`**,
  **`ImportPlacementMode`**, **`PendingImport`**, **`fitImportTransform`**,
  **`stretchImportTransform`**.
- Trace (raster→vetor): **`TraceImageCommand`**, **`traceImageToPaths`**,
  **`TraceOptions`**, **`TraceProgressService`**.
- Engine de animação (escopado): **`AnimationService`**, **`PlaybackService`**,
  **`DEFAULT_STEP_MS`**.
- Persistência de snapshots: **`SnapshotsPersistenceService`**, **`SerializedSnapshot`**.

:::note
A maioria dessas APIs não está listada individualmente em
`docs/09-api-publica.md`; esta página reflete a superfície de exports atual.
:::
