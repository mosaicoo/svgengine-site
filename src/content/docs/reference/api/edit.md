---
title: 'API: edit'
description: 'Public API of @mosaicoo/svg-engine/edit — the headless editing layer: selection, tools, gestures, plugins, registries, libraries, pages and animation.'
---

`@mosaicoo/svg-engine/edit` is the **headless editing layer** that sits between
`core` (the model) and `ui` (the Material widgets). It owns selection, the tool
system, interactive gestures (move/resize/rotate/marquee/snap/align), the plugin
system, and the capability registries (menus, shortcuts, effects, libraries,
pages, animation). It is headless: no Angular Material/CDK.

It's a large surface — this page is a **practical map** of what you actually wire
up. Everything is signal-backed and per-editor scoped.

```ts
import {
  provideSvgEngineEditorScope, provideSvgEngineEditorBuiltins,
  SelectionService, ToolHostService,
} from '@mosaicoo/svg-engine/edit';
```

## Setup

| API | Description |
| --- | --- |
| `provideSvgEngineEditorScope()` | Registers the per-editor services (selection, transform, snap, marquee, alignment, layers, pages, animation, workspace, …) in a child injector. Provide it once per editor instance — this is what enables multi-editor isolation. |
| `provideSvgEngineEditorBuiltins()` | One call that installs the full headless plugin set (tools, libraries, IO, optimizers, effects, keyboard, menus) instead of hand-registering ~two dozen plugins. Pair it with `provideSvgeUiBuiltins()` from `ui` for the Material tier. |
| `provideSvgEnginePlugin(plugin)` | Bootstrap a single plugin at app config time. |
| `provideSvgeHelpLinks(links)` | Configure the Help-menu URLs (docs, tutorials, plugin dev, report issue). |

## Selection

| API | Description |
| --- | --- |
| `SelectionService` | The selection state: signals `selectedIds`, `focusId`, `hoverId`, `count`, `hasSelection`, `isSingleSelection`; methods `select`, `selectMany`, `addToSelection`, `removeFromSelection`, `toggle`, `clear`, `setHover`, `isSelected`. Locked nodes are filtered out automatically. |

## Tools

The tool system routes pointer/keyboard events to whichever tool is active.

| API | Description |
| --- | --- |
| `ToolRegistry` | Registry of installed tools: `register(tool)` → `Disposable`, `get(id)`, `getByShortcut(key)`, `tools` signal. |
| `ToolHostService` | Active-tool state + event router: `activeId`/`activeTool` signals; `activate(id)`, `deactivate()`, and `routePointerDown/Move/Up/Cancel`, `routeKeyDown`. Forward your canvas events here. |
| `Tool` | The tool contract: `id`, `label`, optional `icon`/`cursor`/`shortcut`/`optionsComponent`, and optional lifecycle hooks (`onActivate`, `onPointerDown`, `onKeyDown`, …). |
| `ToolContext` / `ToolPointerEvent` | The context (`injector`) handed to each hook, and the pointer wrapper (`docPoint`, screen coords, modifier flags). |

The 15 built-in tools ship as plugins; each exposes an id constant:

| Tool | Id constant | Purpose |
| --- | --- | --- |
| Select | `SELECT_TOOL_ID` | Select & transform (default). |
| Direct Select | `DIRECT_SELECT_TOOL_ID` | Edit individual anchor points. |
| Pen | `PEN_TOOL_ID` | Draw Bézier paths. |
| Pencil | `PENCIL_TOOL_ID` | Freehand drawing. |
| Rectangle / Ellipse / Polygon | `RECTANGLE_TOOL_ID` / `ELLIPSE_TOOL_ID` / `POLYGON_TOOL_ID` | Draw shapes. |
| Text | `TEXT_TOOL_ID` | Create & edit text. |
| Eyedropper | `EYEDROPPER_TOOL_ID` | Sample colors. |
| Knife | `KNIFE_TOOL_ID` | Cut paths. |
| Smooth | `SMOOTH_TOOL_ID` | Smooth paths. |
| Gradient | `GRADIENT_TOOL_ID` | Edit gradients on-canvas. |
| Width | `WIDTH_TOOL_ID` | Variable stroke-width profiles. |
| Symbol Sprayer | `SYMBOL_SPRAYER_TOOL_ID` | Spray symbol instances. |
| Page | `PAGE_TOOL_ID` | Create & edit pages/artboards. |

:::note
Each tool also exposes a service + overlay component (e.g. `PenToolService` /
`PenOverlay`) for advanced integration, but `provideSvgEngineEditorBuiltins()`
wires them for you. `pointsToPathD(points)` converts a point list to a `d` string.
:::

## Interactive gestures

These services hold transient gesture state and dispatch the matching undoable
command on commit. You read bounding boxes and feed pointer deltas in.

| API | Description |
| --- | --- |
| `TransformService` | Move/resize/rotate gestures with a live preview: `startMove`/`startResize`/`startRotate`, `updateDragDelta`/`updateRotateAngle`, `endDragAndCommit`, `cancelDrag`; `dragState`/`showPreview` signals. |
| `MarqueeService` | Drag-to-select rubber band: `start`/`update`/`end`/`cancel`, `rect`/`isActive` signals. Pair with `nodesInsideMarquee(rect, nodes, mode)` (`MarqueeHitMode`, `MarqueeMode`). |
| `SnapService` | Snap config + live guides: toggles for `enabled`, `mode` (`grid`/`objects`/`both`), `snapToGuides`, `gridSize`, `thresholdPx`; `resolveForMove(rect, candidates, zoom)` returns the snapped delta + guides. |
| `AlignmentService` | Align & distribute as one undo entry: `align(items, axis)`, `alignToReference`, `distribute`, `distributeSpacing`. Types `AlignAxis`, `DistributeAxis`, `NodeBBox`. |
| `KeyObjectService` | Remembers the "align to key object" target per editor. |

Each has matching overlay components — `SelectionOverlay`, `RotationPivot`,
`Marquee`, `SnapGuides` — that you can drop into the canvas.

## Workspace, layers & isolation

| API | Description |
| --- | --- |
| `WorkspaceService` | Editor presentation state: `background`, `page`, `grid`, `guides`, `rulers`, `interaction` signals with matching setters. Types `BackgroundConfig`, `PageConfig`, `GridConfig`, `Guide`, `RulersConfig`, `InteractionConfig`. |
| `LayersService` | Per-node visibility & lock (editor-only, not serialized): `isVisible`/`isLocked`, `setVisible`/`toggleVisible`, `setLocked`/`toggleLocked`, `showAll`/`unlockAll`. |
| `IsolationService` | Group isolation + breadcrumb navigation: `enterIsolation`, `exitIsolation`, `toggleIsolation`. |
| `SvgeCanvasGestures` | Directive for middle-mouse pan + wheel zoom, driving `ViewportService`. |
| Workspace file format | `serializeWorkspace(state)` / `parseWorkspace(json)` and the `.svge`/`.svgez` envelope types — persist the full editor state (config + viewport), not just the document. |

Overlay/filter components: `WorkspaceBackground`, `GridOverlay`, `GuidesOverlay`,
`PageOverlay`, `LayersFilter`, `IsolationFilter`, `AnchorOverlay`.

## Plugins

Everything optional in the editor is a plugin. Build your own to add tools,
libraries, menus, shortcuts, effects or formats.

| API | Description |
| --- | --- |
| `EditorPlugin` | The plugin contract: `id`, `version`, `name`, `apiVersion`, optional `dependencies`/`category`, and `install(ctx)` / optional `uninstall(ctx)`. |
| `PluginContext` | Handed to `install`: `pluginId`, `injector`, and `track(disposable)` so every contribution is auto-removed on uninstall. |
| `PluginRegistry` | Install/uninstall lifecycle: `install`, `uninstall`, `has`, `get`, `list`, `installed` signal. |
| `PLUGIN_API_VERSION` / `PluginCategory` / `InstalledPlugin` | The current API version, the category union, and the installed-record type. |

For managing and loading plugins: `PluginManagerService` +
`PluginCatalog` + `PluginStateStore` back the plugin-manager UI; `PluginLoader` +
`providePluginLoader(config)` + `validateExternalPluginManifest()` load **external**
third-party plugins behind an allowlist + API-version gate (`SVGE_PLUGIN_TRUSTED_ORIGINS`,
`SVGE_PLUGIN_MODULE_LOADER`).

## Menus & keyboard

| API | Description |
| --- | --- |
| `MenuContributionRegistry` | Extensible menu/toolbar/context-menu registry: `register(contribution)` → `Disposable`, `bySlot(slot)`. Types `MenuContribution`, `MenuSlot`, `MenuContributionContext`. Slots: `MENU_SLOT`, `TOOLBAR_SLOT`, `CONTEXT_MENU_SLOT`. |
| `ShortcutRegistry` / `ShortcutService` | Register shortcuts (`register` → `Disposable`, `findMatch(event)`) and dispatch them on keydown. `Shortcut` carries `combo`, `label`, optional `when` guard, `handler`. |
| `KeybindingsService` | Runtime customization: `listShortcuts`, `setOverride(id, combo)`, `clearOverride`, `exportAsJson`. |
| Combo helpers | `parseCombo`, `comboMatches`, `formatCombo`, `comboFromEvent`, `validateCombo`. |

Built-in contribution plugins: `builtinMenuContributionsPlugin`,
`builtinInsertMenuPlugin`, `builtinAdvancedEditMenuPlugin`,
`builtinEditorShortcutsPlugin`.

## Libraries

A uniform `LibraryRegistry<T>` (`register` → `Disposable`, `get`, `update`,
`items` signal) backs every asset library. Each ships a built-in plugin.

| Service | Holds |
| --- | --- |
| `ShapeLibraryService` | Reusable shapes. |
| `SymbolLibraryService` | Symbols (master/instance via `SymbolUseNode`). |
| `TemplateLibraryService` | Document templates. |
| `BrushLibraryService` | Brushes (width profiles for the Pencil). |
| `PatternLibraryService` / `GradientLibraryService` | Patterns and gradients. |
| `GraphicStyleLibraryService` | Reusable graphic styles. |
| `PaletteRegistry` | Color palettes (`Palette` = `{ id, name, colors }`). |
| `ClipPathLibraryService` / `MaskLibraryService` | Clip paths and masks. |

Supporting services: `AssetManagerService` (file → data URI) and
`ActiveDefsService` / `ActiveSymbolsService` (compose the used defs/symbols into
`<defs>` for export).

## Pages & animation

| API | Description |
| --- | --- |
| `PagesService` | Derived view of the document's pages: `pages`/`count`/`hasPages` signals, `byId`, `nameOf`, `viewBoxOf`. |
| `ActivePageService` | Which page is being edited: `activePageId`/`activePage`/`effectiveDrawTargetId` signals, `setActivePageId`. |
| `AnimationService` | Edit the page animation via undoable commands: `addKeyframe`, `removeKeyframe`, `moveKeyframe`, `setKeyframeEasing`, `setDuration`, `setAnimatableProperty`, `sample(playhead)`; `tracks`/`duration`/`hasAnimation` signals. |
| `PlaybackService` | Drives the playhead with `requestAnimationFrame`: `play`/`pause`/`seek`/`step`/`setSpeed`/`setLoop`; `playhead`/`isPlaying` signals. |

## Effects

| API | Description |
| --- | --- |
| `EffectRegistry` | Registry of SVG-filter effects: `register` → `Disposable`, `get`, `byCategory`, `effects` signal. |
| `Effect` / `EffectParam` | The effect contract (`buildFilterMarkup()`) and its typed parameters (`EffectNumberParam`, `EffectColorParam`, `EffectSelectParam`, `EffectBooleanParam`). |
| Param helpers | `effectDefaults`, `resolveEffectParams`, `nonDefaultParams`, `isNumberParam`. |
| `ParametricEffectRegistry` / `ChainFilterRegistry` | Parametric (re-editable) effects and effect chaining, with id encode/parse helpers. |
| `builtinEffectsPlugin` | Registers the built-in filter presets (blur, drop shadow, glow, bevel/emboss, color adjustments, …). |

## Editor-state services

| API | Description |
| --- | --- |
| `ClipboardService` | In-memory copy/cut/paste decoupled from the browser clipboard: `copy`, `cut`, `paste`, `canPaste`. |
| `FindReplaceService` / `SelectSameService` | Find & replace across node text/properties (`find`, `replace`, `replaceAll`; `FindCriteria`/`FindMatch`), and "select same" (fill/stroke/font/…). |
| `AutoSaveService` | Periodic localStorage autosave with recovery. |
| `RecentFilesService` | MRU list behind "Open Recent". |
| `SnapshotsPersistenceService` | Persist editor snapshots to localStorage. |
| `AssetExportRegistry` / `AssetExportRunner` | Batch export: register slots (target + format + scale + filename) and run them with unique-name disambiguation. |
| `FullscreenService` | Native fullscreen wrapper. |
| `ImportSettingsService` / `ImportPlacementService` | SVG-import placement preference and the interactive drag-to-place gesture (`SvgeImportPlacementOverlay`). |
| `TraceImageService` | Raster-to-vector tracing: `traceImageToPaths(imageData, options)` + the undoable `TraceImageCommand`. |
| `SmartObjectActionsService` | "Replace contents" / rasterize actions for smart objects. |

:::note[Re-exported IO & optimize]
For editor convenience, `edit` also re-exports the import/export and optimize
registries, built-in formats and their plugins (`builtinIoPlugin`,
`builtinOptimizersPlugin`, …). See the [io](/svgengine-site/reference/api/io/)
and [optimize](/svgengine-site/reference/api/optimize/) pages for details.
:::

:::note[Lower-level utilities]
`edit` also exports geometry & hit-testing primitives — bbox/anchor helpers
(`anchorPoint`, `findNearestAnchor`, `BBoxAnchor`), rendered-node lookup
(`getRenderedNodeBBox`, `getRenderedNodeOBB`, `getCombinedBBox`), DOM hit-testing
(`resolveNodeIdFromEvent`, `geometricHitTestElement`) and pointer capture
(`capturePointer`, `releasePointer`, `isEditableTarget`). These back the tools and
overlays above; reach for them only when building custom canvas interactions. The
[library repository](https://github.com/mosaicoo/svg-engine) is authoritative for
exact signatures.
:::
