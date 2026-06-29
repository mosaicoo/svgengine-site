---
title: 'API: edit'
description: Public API of @mosaicoo/svg-engine/edit — selection, transform, tools, the plugin system, capability registries, libraries, effects, pages and more.
---

`@mosaicoo/svg-engine/edit` is the largest headless entry point: selection &
transform services, the tool system, the **plugin scaffolding**, the capability
registries, the libraries/effects ecosystems, pages, snapshots and the overlays
that the UI projects onto the canvas. Zero Angular Material/CDK dependency.

```ts
import { provideSvgEnginePlugin, ToolRegistry } from '@mosaicoo/svg-engine/edit';
```

This page groups the full public surface by area. The built-in **library
content** (shapes, gradients, patterns, templates, etc.) is exported as many
small factory functions; those are summarized per library rather than listed
individually. For exact signatures, the
[library repository](https://github.com/mosaicoo/svg-engine) is authoritative.

## Plugin system

- Contract: **`EditorPlugin`**, **`PluginContext`**, **`PluginCategory`**,
  **`PLUGIN_API_VERSION`**, **`Disposable`**.
- Registry & bootstrap: **`PluginRegistry`**, **`provideSvgEnginePlugin`**,
  **`provideSvgEngineEditorScope`** (per-editor scope, D-042),
  **`provideSvgEngineEditorBuiltins`**.
- Management (D-083 Phase 1): **`PluginManagerService`**, **`PluginCatalog`**,
  **`PluginStateStore`**, **`InstalledPlugin`**, **`PluginDisplayMeta`**,
  **`withPluginMeta`**, **`PluginActionResult`**.
- External loading (D-083 Phase 2): **`PluginLoader`**, **`providePluginLoader`**,
  **`PluginLoaderConfig`**, **`PluginModuleLoader`**, **`PluginManifest`**,
  **`PluginSource`**, **`ExternalPluginManifest`**, **`validateExternalPluginManifest`**,
  **`SVGE_PLUGIN_MODULE_LOADER`**, **`SVGE_PLUGIN_TRUSTED_ORIGINS`**.

## Capability registries

Every registry follows `register(entry): Disposable`:

- **`ToolRegistry`**, **`MenuContributionRegistry`**, **`ShortcutRegistry`**,
  **`PaletteRegistry`**, **`EffectRegistry`**, **`ParametricEffectRegistry`**,
  **`ChainFilterRegistry`**, **`AssetExportRegistry`**, **`LibraryRegistry`**,
  **`PluginRegistry`**, plus the re-exported **`ImporterRegistry`**,
  **`ExporterRegistry`**, **`OptimizerRegistry`**.

## Tools

- IDs (15): **`SELECT_TOOL_ID`**, **`DIRECT_SELECT_TOOL_ID`**, **`PEN_TOOL_ID`**,
  **`PENCIL_TOOL_ID`**, **`RECTANGLE_TOOL_ID`**, **`ELLIPSE_TOOL_ID`**,
  **`POLYGON_TOOL_ID`**, **`TEXT_TOOL_ID`**, **`EYEDROPPER_TOOL_ID`**,
  **`KNIFE_TOOL_ID`**, **`SMOOTH_TOOL_ID`**, **`GRADIENT_TOOL_ID`**,
  **`WIDTH_TOOL_ID`**, **`SYMBOL_SPRAYER_TOOL_ID`**, **`PAGE_TOOL_ID`**.
- Contract & host: **`Tool`**, **`ToolContext`**, **`ToolPointerEvent`**,
  **`ToolHostService`**.
- Tool plugins: **`selectToolPlugin`**, **`shapeToolsPlugin`**, **`penToolPlugin`**,
  **`pencilToolPlugin`**, **`textToolPlugin`**, **`extraToolsPlugin`**,
  **`pageToolPlugin`**, **`selectionNudgePlugin`**.
- Per-tool services: **`ShapeToolService`**, **`PenToolService`**,
  **`PencilToolService`**, **`EyedropperToolService`**, **`KnifeToolService`**,
  **`SmoothToolService`**, **`GradientToolService`**, **`WidthToolService`**,
  **`SymbolSprayerService`**, **`SymbolSprayerPreviewService`**,
  **`InlineTextEditor`** / **`InlineTextEditorService`**.
- Shape helpers: **`ShapeDraft`**, **`ShapeKind`**, **`regularPolygonPoints`**,
  **`pointsToPathD`**, **`DEFAULT_POLYGON_SIDES`**, **`PLACEHOLDER_TEXT`**.

## Selection, transform, marquee, snap, alignment

- Selection: **`SelectionService`**, **`SelectionAppearanceService`**,
  **`AnchorSelectionService`**, **`SelectionResolutionMode`**,
  **`SelectableResolveOptions`**, **`KeyObjectService`**.
- Transform: **`TransformService`**, **`RotationPivot`**.
- Marquee: **`MarqueeService`**, **`Marquee`**, **`MarqueeState`**,
  **`MarqueeMode`**, **`MarqueeHitMode`**, **`MarqueeCandidate`**,
  **`nodesInsideMarquee`**.
- Snap: **`SnapService`**, **`SnapResult`**, **`SnapTarget`**, **`SnapSource`**,
  **`SnapMode`**, **`SnapAxis`**, **`SnapGuide`**, **`SnapGuides`**, **`resolveSnap`**,
  **`rectsToSnapTargets`**, **`gridTargetsNear`**, **`guidesToSnapTargets`**.
- Alignment: **`AlignmentService`**, **`AlignAxis`**, **`DistributeAxis`**,
  **`computeAlignDeltas`**, **`computeAlignToReferenceDeltas`**,
  **`computeDistributeDeltas`**, **`computeDistributeSpacingDeltas`**,
  **`computeAverageGap`**, **`resolveAlignReference`**.
- BBox anchors: **`BBOX_ANCHORS`**, **`BBoxAnchor`**, **`allAnchors`**,
  **`anchorPoint`**, **`findNearestAnchor`**.

## Hit-testing & rendered geometry

- **`findOwningNodeId`**, **`resolveNodeIdFromEvent`**, **`resolveSelectableNodeId`**,
  **`resolveSelectableNodeIdFromElement`**, **`geometricHitTestElement`**,
  **`findRenderedNode`**.
- **`getRenderedNodeBBox`**, **`getRenderedNodeOBB`**, **`getRenderedParentMatrix`**,
  **`getCombinedBBox`**, **`NodeBBox`**, **`RenderedOBB`**, **`rectFromPoints`**,
  **`pageBoundsIn`**, **`collectNodeAncestorIds`**, **`DEFAULT_HIT_TOLERANCE_PX`**.
- Pointer (D-036): **`capturePointer`**, **`releasePointer`**, **`isEditableTarget`**.

## Overlays, gestures & directives

- Overlays: **`SelectionOverlay`**, **`AnchorOverlay`**, **`GridOverlay`**,
  **`GuidesOverlay`**, **`PageOverlay`**, **`SvgePageSelectionOverlay`**,
  **`PenOverlay`**, **`PencilOverlay`**, **`ShapeOverlay`**, **`GradientOverlay`**,
  **`SymbolSprayerOverlay`**, **`SvgeImportPlacementOverlay`**, **`SvgePixelPreviewRaster`**.
- Gestures & filters: **`SvgeCanvasGestures`**, **`SvgeShellInteractions`**,
  **`SvgeViewportCullingDirective`**, **`IsolationFilter`**, **`LayersFilter`**,
  **`InteractionConfig`**.
- Viewport culling: **`ViewportCullingService`** (+ the directive above),
  **`WHEEL_ZOOM_SPEED_MIN`**, **`WHEEL_ZOOM_SPEED_MAX`**.
- Help links (D-096): **`SvgeHelpLinks`**, **`DEFAULT_HELP_LINKS`**,
  **`SVGE_HELP_LINKS`**, **`provideSvgeHelpLinks`**.
- Handle sizing: **`HANDLE_SIZE_DEFAULT`**, **`HANDLE_SIZE_MIN`**, **`HANDLE_SIZE_MAX`**,
  **`HANDLE_SIZE_PRESETS`**, **`HandleSizePreset`**, **`clampHandleSize`**,
  **`HANDLE_DATA_ATTR`**.

## Workspace, layers, isolation, auto-save

- **`WorkspaceService`** + config types: **`WorkspaceConfigState`**,
  **`WorkspaceEditorState`**, **`WorkspaceViewportState`**, **`WorkspaceEnvelope`**,
  **`WorkspaceParseResult`**, **`WorkspaceBackground`**, **`BackgroundConfig`**,
  **`GridConfig`**, **`RulersConfig`**, **`Guide`**; serialization
  **`serializeWorkspace`** / **`parseWorkspace`**, **`WORKSPACE_FORMAT`**,
  **`WORKSPACE_SCHEMA_VERSION`**.
- **`LayersService`**, **`IsolationService`**, **`AutoSaveService`**
  (+ **`AUTOSAVE_STORAGE_KEY`**), **`RecentFilesService`** (+ **`RecentFile`**,
  **`RECENT_FILES_STORAGE_KEY`**), **`FullscreenService`**, **`PanelHostService`**
  (+ **`PanelId`**, **`PANEL_ID`**, **`PanelRevealRequest`**).

## Menus & shortcuts

- Menus: **`MenuContribution`**, **`MenuContributionContext`**,
  **`MenuContributionDisabled`**, **`MenuSlot`**, **`MenuBarSlot`**,
  **`ContextMenuSlot`**, **`ToolbarSlot`**, **`MENU_SLOT`**, **`CONTEXT_MENU_SLOT`**,
  **`TOOLBAR_SLOT`**, **`runContribution`**, **`makeDisabledResolver`**,
  **`resolveDisabledSignal`**.
- Shortcuts: **`Shortcut`**, **`ShortcutContext`**, **`ParsedCombo`**,
  **`parseCombo`**, **`comboMatches`**, **`comboFromEvent`**, **`formatCombo`**,
  **`validateCombo`**, **`ShortcutService`**, **`ShortcutRegistry`**,
  **`KeybindingsService`**, **`KeybindingOverrides`**, **`KeybindingView`**.
- Menu/shortcut plugins: **`builtinMenuContributionsPlugin`**,
  **`builtinInsertMenuPlugin`**, **`builtinAdvancedEditMenuPlugin`**,
  **`builtinRoadmapMenuPlugin`**, **`builtinEditorShortcutsPlugin`**.

## IO & optimize (re-exported)

For backward compatibility, `edit` re-exports the `io` and `optimize` surfaces
(see those pages) plus the plugin wrappers: **`builtinIoPlugin`**,
**`pngExporterPlugin`**, **`builtinOptimizersPlugin`**.

## Effects

- Model: **`Effect`**, **`EffectInstance`**, **`EffectPreset`**, **`EffectParam`**,
  **`EffectParams`**, **`EffectParamType`**, **`EffectParamValue`**,
  **`EffectNumberParam`**, **`EffectColorParam`**, **`EffectBooleanParam`**,
  **`EffectSelectParam`**.
- Registries & plugin: **`EffectRegistry`**, **`ParametricEffectRegistry`**,
  **`ChainFilterRegistry`**, **`builtinEffectsPlugin`**, **`BUILTIN_EFFECTS`**.
- Built-in effect factories (single-filter + presets): `dropShadowEffect`,
  `blurEffect`, `innerShadowEffect`, `innerGlowEffect`, `outerGlowEffect`,
  `brightnessEffect`, `contrastEffect`, `saturateEffect`, `hueRotateEffect`,
  `grayscaleEffect`, `sepiaEffect`, `invertEffect`, `posterizeEffect`,
  `pixelateEffect`, `noiseEffect`, `embossEffect`, `bevelEffect`,
  `displacementMapEffect`, `chromaticAberrationEffect`, and more.
- Helpers: **`effectDefaults`**, **`resolveEffectParams`**, **`nonDefaultParams`**,
  **`isNumberParam`**, **`encodeEffectFilterId`**, **`extractEffectFilterId`**,
  **`parseEffectFilterId`**, **`makeChainFilterId`**, **`extractChainFilterId`**,
  **`parseChainFilterId`**, **`CHAIN_FILTER_ID_PREFIX`**, **`CHAIN_FILTER_SEPARATOR`**,
  **`PARAM_FILTER_ID_PREFIX`**; filters **`OutlineFilter`**, **`PixelPreviewFilter`**.

## Libraries (assets ecosystem, D-048)

A generic **`LibraryRegistry`** + **`LibraryItem`** / **`CatalogEntry`** with nine
concrete libraries. Each has a service, an item type, a `BUILTIN_*` catalog, a
plugin, and many content factories:

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
- Shared: **`ActiveDefsService`**, **`AssetManagerService`**, **`AssetCatalogEntry`**.

## Palettes

- **`Palette`**, **`PaletteRegistry`**, **`builtinPalettesPlugin`**,
  **`extraPalettesPlugin`**.

## Pages

- **`PagesService`**, **`ActivePageService`**, **`PageDragService`**,
  **`PageConfig`**, **`ACTIVE_PAGE_STORAGE_KEY`** (+ the page overlays above).

## Smart objects, asset export, find/replace, import, trace, animation

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
- Animation engine (scoped): **`AnimationService`**, **`PlaybackService`**,
  **`DEFAULT_STEP_MS`**.
- Snapshots persistence: **`SnapshotsPersistenceService`**, **`SerializedSnapshot`**.

:::note
Most of these APIs are not individually listed in the library's
`docs/09-api-publica.md`; this page reflects the current export surface.
:::
