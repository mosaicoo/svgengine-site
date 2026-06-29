---
title: 'API: edit'
description: API pública de @mosaicoo/svg-engine/edit — selección, transform, tools, sistema de plugins, registries, libraries, efectos, pages y más.
---

`@mosaicoo/svg-engine/edit` es el mayor entry point headless: servicios de
selección & transform, el sistema de tools, el **scaffolding de plugins**, los
registries de capacidad, los ecosistemas de libraries/efectos, pages, snapshots y
los overlays que la UI proyecta en el canvas. Sin dependencia de Angular
Material/CDK.

```ts
import { provideSvgEnginePlugin, ToolRegistry } from '@mosaicoo/svg-engine/edit';
```

Esta página agrupa la superficie pública completa por área. El **contenido de
library** built-in (shapes, gradients, patterns, plantillas, etc.) se exporta
como muchas pequeñas funciones factory; se resumen por library en lugar de
listarse una a una. Para las firmas exactas, el
[repositorio de la librería](https://github.com/mosaicoo/svg-engine) es
autoritativo.

## Sistema de plugins

- Contrato: **`EditorPlugin`**, **`PluginContext`**, **`PluginCategory`**,
  **`PLUGIN_API_VERSION`**, **`Disposable`**.
- Registry & bootstrap: **`PluginRegistry`**, **`provideSvgEnginePlugin`**,
  **`provideSvgEngineEditorScope`** (scope por editor, D-042),
  **`provideSvgEngineEditorBuiltins`**.
- Gestión (D-083 Fase 1): **`PluginManagerService`**, **`PluginCatalog`**,
  **`PluginStateStore`**, **`InstalledPlugin`**, **`PluginDisplayMeta`**,
  **`withPluginMeta`**, **`PluginActionResult`**.
- Carga externa (D-083 Fase 2): **`PluginLoader`**, **`providePluginLoader`**,
  **`PluginLoaderConfig`**, **`PluginModuleLoader`**, **`PluginManifest`**,
  **`PluginSource`**, **`ExternalPluginManifest`**, **`validateExternalPluginManifest`**,
  **`SVGE_PLUGIN_MODULE_LOADER`**, **`SVGE_PLUGIN_TRUSTED_ORIGINS`**.

## Registries de capacidad

Todo registry sigue `register(entry): Disposable`:

- **`ToolRegistry`**, **`MenuContributionRegistry`**, **`ShortcutRegistry`**,
  **`PaletteRegistry`**, **`EffectRegistry`**, **`ParametricEffectRegistry`**,
  **`ChainFilterRegistry`**, **`AssetExportRegistry`**, **`LibraryRegistry`**,
  **`PluginRegistry`**, además de los re-exportados **`ImporterRegistry`**,
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
- Servicios por tool: **`ShapeToolService`**, **`PenToolService`**,
  **`PencilToolService`**, **`EyedropperToolService`**, **`KnifeToolService`**,
  **`SmoothToolService`**, **`GradientToolService`**, **`WidthToolService`**,
  **`SymbolSprayerService`**, **`SymbolSprayerPreviewService`**,
  **`InlineTextEditor`** / **`InlineTextEditorService`**.
- Helpers de shape: **`ShapeDraft`**, **`ShapeKind`**, **`regularPolygonPoints`**,
  **`pointsToPathD`**, **`DEFAULT_POLYGON_SIDES`**, **`PLACEHOLDER_TEXT`**.

## Selección, transform, marquee, snap, alineación

- Selección: **`SelectionService`**, **`SelectionAppearanceService`**,
  **`AnchorSelectionService`**, **`SelectionResolutionMode`**,
  **`SelectableResolveOptions`**, **`KeyObjectService`**.
- Transform: **`TransformService`**, **`RotationPivot`**.
- Marquee: **`MarqueeService`**, **`Marquee`**, **`MarqueeState`**,
  **`MarqueeMode`**, **`MarqueeHitMode`**, **`MarqueeCandidate`**,
  **`nodesInsideMarquee`**.
- Snap: **`SnapService`**, **`SnapResult`**, **`SnapTarget`**, **`SnapSource`**,
  **`SnapMode`**, **`SnapAxis`**, **`SnapGuide`**, **`SnapGuides`**, **`resolveSnap`**,
  **`rectsToSnapTargets`**, **`gridTargetsNear`**, **`guidesToSnapTargets`**.
- Alineación: **`AlignmentService`**, **`AlignAxis`**, **`DistributeAxis`**,
  **`computeAlignDeltas`**, **`computeAlignToReferenceDeltas`**,
  **`computeDistributeDeltas`**, **`computeDistributeSpacingDeltas`**,
  **`computeAverageGap`**, **`resolveAlignReference`**.
- Anchors de bbox: **`BBOX_ANCHORS`**, **`BBoxAnchor`**, **`allAnchors`**,
  **`anchorPoint`**, **`findNearestAnchor`**.

## Hit-testing & geometría renderizada

- **`findOwningNodeId`**, **`resolveNodeIdFromEvent`**, **`resolveSelectableNodeId`**,
  **`resolveSelectableNodeIdFromElement`**, **`geometricHitTestElement`**,
  **`findRenderedNode`**.
- **`getRenderedNodeBBox`**, **`getRenderedNodeOBB`**, **`getRenderedParentMatrix`**,
  **`getCombinedBBox`**, **`NodeBBox`**, **`RenderedOBB`**, **`rectFromPoints`**,
  **`pageBoundsIn`**, **`collectNodeAncestorIds`**, **`DEFAULT_HIT_TOLERANCE_PX`**.
- Pointer (D-036): **`capturePointer`**, **`releasePointer`**, **`isEditableTarget`**.

## Overlays, gestos & directivas

- Overlays: **`SelectionOverlay`**, **`AnchorOverlay`**, **`GridOverlay`**,
  **`GuidesOverlay`**, **`PageOverlay`**, **`SvgePageSelectionOverlay`**,
  **`PenOverlay`**, **`PencilOverlay`**, **`ShapeOverlay`**, **`GradientOverlay`**,
  **`SymbolSprayerOverlay`**, **`SvgeImportPlacementOverlay`**, **`SvgePixelPreviewRaster`**.
- Gestos & filtros: **`SvgeCanvasGestures`**, **`SvgeShellInteractions`**,
  **`SvgeViewportCullingDirective`**, **`IsolationFilter`**, **`LayersFilter`**,
  **`InteractionConfig`**.
- Viewport culling: **`ViewportCullingService`** (+ la directiva de arriba),
  **`WHEEL_ZOOM_SPEED_MIN`**, **`WHEEL_ZOOM_SPEED_MAX`**.
- Help links (D-096): **`SvgeHelpLinks`**, **`DEFAULT_HELP_LINKS`**,
  **`SVGE_HELP_LINKS`**, **`provideSvgeHelpLinks`**.
- Tamaño de handles: **`HANDLE_SIZE_DEFAULT`**, **`HANDLE_SIZE_MIN`**, **`HANDLE_SIZE_MAX`**,
  **`HANDLE_SIZE_PRESETS`**, **`HandleSizePreset`**, **`clampHandleSize`**,
  **`HANDLE_DATA_ATTR`**.

## Workspace, layers, isolation, auto-save

- **`WorkspaceService`** + tipos de config: **`WorkspaceConfigState`**,
  **`WorkspaceEditorState`**, **`WorkspaceViewportState`**, **`WorkspaceEnvelope`**,
  **`WorkspaceParseResult`**, **`WorkspaceBackground`**, **`BackgroundConfig`**,
  **`GridConfig`**, **`RulersConfig`**, **`Guide`**; serialización
  **`serializeWorkspace`** / **`parseWorkspace`**, **`WORKSPACE_FORMAT`**,
  **`WORKSPACE_SCHEMA_VERSION`**.
- **`LayersService`**, **`IsolationService`**, **`AutoSaveService`**
  (+ **`AUTOSAVE_STORAGE_KEY`**), **`RecentFilesService`** (+ **`RecentFile`**,
  **`RECENT_FILES_STORAGE_KEY`**), **`FullscreenService`**, **`PanelHostService`**
  (+ **`PanelId`**, **`PANEL_ID`**, **`PanelRevealRequest`**).

## Menús & atajos

- Menús: **`MenuContribution`**, **`MenuContributionContext`**,
  **`MenuContributionDisabled`**, **`MenuSlot`**, **`MenuBarSlot`**,
  **`ContextMenuSlot`**, **`ToolbarSlot`**, **`MENU_SLOT`**, **`CONTEXT_MENU_SLOT`**,
  **`TOOLBAR_SLOT`**, **`runContribution`**, **`makeDisabledResolver`**,
  **`resolveDisabledSignal`**.
- Atajos: **`Shortcut`**, **`ShortcutContext`**, **`ParsedCombo`**,
  **`parseCombo`**, **`comboMatches`**, **`comboFromEvent`**, **`formatCombo`**,
  **`validateCombo`**, **`ShortcutService`**, **`ShortcutRegistry`**,
  **`KeybindingsService`**, **`KeybindingOverrides`**, **`KeybindingView`**.
- Plugins de menú/atajo: **`builtinMenuContributionsPlugin`**,
  **`builtinInsertMenuPlugin`**, **`builtinAdvancedEditMenuPlugin`**,
  **`builtinRoadmapMenuPlugin`**, **`builtinEditorShortcutsPlugin`**.

## IO & optimize (re-exportados)

Por compatibilidad, `edit` re-exporta las superficies de `io` y `optimize` (mira
esas páginas) más los wrappers de plugin: **`builtinIoPlugin`**,
**`pngExporterPlugin`**, **`builtinOptimizersPlugin`**.

## Efectos

- Modelo: **`Effect`**, **`EffectInstance`**, **`EffectPreset`**, **`EffectParam`**,
  **`EffectParams`**, **`EffectParamType`**, **`EffectParamValue`**,
  **`EffectNumberParam`**, **`EffectColorParam`**, **`EffectBooleanParam`**,
  **`EffectSelectParam`**.
- Registries & plugin: **`EffectRegistry`**, **`ParametricEffectRegistry`**,
  **`ChainFilterRegistry`**, **`builtinEffectsPlugin`**, **`BUILTIN_EFFECTS`**.
- Factories de efecto built-in (single-filter + presets): `dropShadowEffect`,
  `blurEffect`, `innerShadowEffect`, `innerGlowEffect`, `outerGlowEffect`,
  `brightnessEffect`, `contrastEffect`, `saturateEffect`, `hueRotateEffect`,
  `grayscaleEffect`, `sepiaEffect`, `invertEffect`, `posterizeEffect`,
  `pixelateEffect`, `noiseEffect`, `embossEffect`, `bevelEffect`,
  `displacementMapEffect`, `chromaticAberrationEffect`, y más.
- Helpers: **`effectDefaults`**, **`resolveEffectParams`**, **`nonDefaultParams`**,
  **`isNumberParam`**, **`encodeEffectFilterId`**, **`extractEffectFilterId`**,
  **`parseEffectFilterId`**, **`makeChainFilterId`**, **`extractChainFilterId`**,
  **`parseChainFilterId`**, **`CHAIN_FILTER_ID_PREFIX`**, **`CHAIN_FILTER_SEPARATOR`**,
  **`PARAM_FILTER_ID_PREFIX`**; filtros **`OutlineFilter`**, **`PixelPreviewFilter`**.

## Libraries (ecosistema de assets, D-048)

Un **`LibraryRegistry`** genérico + **`LibraryItem`** / **`CatalogEntry`** con
nueve libraries concretas. Cada una tiene un servicio, un tipo de item, un
catálogo `BUILTIN_*`, un plugin y muchas factories de contenido:

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
- Compartido: **`ActiveDefsService`**, **`AssetManagerService`**, **`AssetCatalogEntry`**.

## Paletas

- **`Palette`**, **`PaletteRegistry`**, **`builtinPalettesPlugin`**,
  **`extraPalettesPlugin`**.

## Pages

- **`PagesService`**, **`ActivePageService`**, **`PageDragService`**,
  **`PageConfig`**, **`ACTIVE_PAGE_STORAGE_KEY`** (+ los overlays de página de arriba).

## Smart objects, asset export, find/replace, import, trace, animación

- Smart objects: **`SmartObjectActionsService`**.
- Asset export (D-077): **`AssetExportRegistry`**, **`AssetExportRunner`**,
  **`AssetExportPersistenceService`**, **`ExportSlot`**, **`ExportSlotInput`**,
  **`ExportSlotResult`**, **`ASSET_EXPORT_STORAGE_KEY`**.
- Find & select-same: **`FindReplaceService`**, **`FindCriteria`**, **`FindMatch`**,
  **`SelectSameService`**.
- Import placement: **`ImportPlacementService`**, **`ImportSettingsService`**,
  **`ImportPlacementMode`**, **`PendingImport`**, **`fitImportTransform`**,
  **`stretchImportTransform`**.
- Trace (raster→vector): **`TraceImageCommand`**, **`traceImageToPaths`**,
  **`TraceOptions`**, **`TraceProgressService`**.
- Motor de animación (scoped): **`AnimationService`**, **`PlaybackService`**,
  **`DEFAULT_STEP_MS`**.
- Persistencia de snapshots: **`SnapshotsPersistenceService`**, **`SerializedSnapshot`**.

:::note
La mayoría de estas APIs no están listadas individualmente en
`docs/09-api-publica.md`; esta página refleja la superficie de exports actual.
:::
