---
title: 'API: edit'
description: 'API pública de @mosaicoo/svg-engine/edit — la capa de edición headless: selección, tools, gestos, plugins, registries, libraries, pages y animación.'
---

`@mosaicoo/svg-engine/edit` es la **capa de edición headless**, entre `core` (el
modelo) y `ui` (los widgets Material). Es dueña de la selección, el sistema de
tools, los gestos interactivos (mover/redimensionar/rotar/marquee/snap/alinear), el
sistema de plugins y los registries de capacidades (menús, atajos, efectos,
bibliotecas, páginas, animación). Es headless: sin Angular Material/CDK.

Es una superficie grande — esta página es un **mapa práctico** de lo que realmente
conectas. Todo es signal-backed y con scope por-editor.

```ts
import {
  provideSvgEngineEditorScope, provideSvgEngineEditorBuiltins,
  SelectionService, ToolHostService,
} from '@mosaicoo/svg-engine/edit';
```

## Setup

| API | Descripción |
| --- | --- |
| `provideSvgEngineEditorScope()` | Registra los servicios por-editor (selección, transform, snap, marquee, alineación, layers, pages, animación, workspace, …) en un injector hijo. Provéelo una vez por instancia de editor — es lo que habilita el aislamiento multi-editor. |
| `provideSvgEngineEditorBuiltins()` | Una llamada que instala todo el conjunto de plugins headless (tools, libraries, IO, optimizers, efectos, teclado, menús) en vez de registrar ~dos docenas de plugins a mano. Combínalo con `provideSvgeUiBuiltins()` de `ui` para la capa Material. |
| `provideSvgEnginePlugin(plugin)` | Hace bootstrap de un plugin en el momento de la config de la app. |
| `provideSvgeHelpLinks(links)` | Configura las URLs del menú Ayuda (docs, tutoriales, dev de plugins, reportar issue). |

## Selección

| API | Descripción |
| --- | --- |
| `SelectionService` | El estado de selección: signals `selectedIds`, `focusId`, `hoverId`, `count`, `hasSelection`, `isSingleSelection`; métodos `select`, `selectMany`, `addToSelection`, `removeFromSelection`, `toggle`, `clear`, `setHover`, `isSelected`. Los nodos bloqueados se filtran automáticamente. |

## Tools

El sistema de tools enruta eventos de puntero/teclado a la tool activa.

| API | Descripción |
| --- | --- |
| `ToolRegistry` | Registry de las tools instaladas: `register(tool)` → `Disposable`, `get(id)`, `getByShortcut(key)`, signal `tools`. |
| `ToolHostService` | Estado de la tool activa + enrutador de eventos: signals `activeId`/`activeTool`; `activate(id)`, `deactivate()`, y `routePointerDown/Move/Up/Cancel`, `routeKeyDown`. Reenvía aquí los eventos del canvas. |
| `Tool` | El contrato de la tool: `id`, `label`, opcionales `icon`/`cursor`/`shortcut`/`optionsComponent`, y hooks de ciclo de vida opcionales (`onActivate`, `onPointerDown`, `onKeyDown`, …). |
| `ToolContext` / `ToolPointerEvent` | El contexto (`injector`) entregado a cada hook, y el wrapper de puntero (`docPoint`, coords de pantalla, flags de modificador). |

Las 15 tools integradas vienen como plugins; cada una expone una constante de id:

| Tool | Constante de id | Finalidad |
| --- | --- | --- |
| Select | `SELECT_TOOL_ID` | Seleccionar & transformar (por defecto). |
| Direct Select | `DIRECT_SELECT_TOOL_ID` | Editar puntos de ancla individuales. |
| Pen | `PEN_TOOL_ID` | Dibujar paths Bézier. |
| Pencil | `PENCIL_TOOL_ID` | Dibujo a mano alzada. |
| Rectangle / Ellipse / Polygon | `RECTANGLE_TOOL_ID` / `ELLIPSE_TOOL_ID` / `POLYGON_TOOL_ID` | Dibujar formas. |
| Text | `TEXT_TOOL_ID` | Crear & editar texto. |
| Eyedropper | `EYEDROPPER_TOOL_ID` | Muestrear colores. |
| Knife | `KNIFE_TOOL_ID` | Cortar paths. |
| Smooth | `SMOOTH_TOOL_ID` | Suavizar paths. |
| Gradient | `GRADIENT_TOOL_ID` | Editar gradientes en el canvas. |
| Width | `WIDTH_TOOL_ID` | Perfiles de ancho de trazo variable. |
| Symbol Sprayer | `SYMBOL_SPRAYER_TOOL_ID` | Rociar instancias de símbolo. |
| Page | `PAGE_TOOL_ID` | Crear & editar páginas/artboards. |

:::note
Cada tool también expone un servicio + componente de overlay (p. ej. `PenToolService` /
`PenOverlay`) para integración avanzada, pero `provideSvgEngineEditorBuiltins()` los
conecta por ti. `pointsToPathD(points)` convierte una lista de puntos en una cadena `d`.
:::

## Gestos interactivos

Estos servicios mantienen el estado transitorio del gesto y despachan el comando con
undo correspondiente al confirmar. Tú lees bounding boxes y alimentas deltas de puntero.

| API | Descripción |
| --- | --- |
| `TransformService` | Gestos de mover/redimensionar/rotar con preview en vivo: `startMove`/`startResize`/`startRotate`, `updateDragDelta`/`updateRotateAngle`, `endDragAndCommit`, `cancelDrag`; signals `dragState`/`showPreview`. |
| `MarqueeService` | Banda de selección por arrastre: `start`/`update`/`end`/`cancel`, signals `rect`/`isActive`. Combina con `nodesInsideMarquee(rect, nodes, mode)` (`MarqueeHitMode`, `MarqueeMode`). |
| `SnapService` | Config de snap + guías en vivo: alternancias de `enabled`, `mode` (`grid`/`objects`/`both`), `snapToGuides`, `gridSize`, `thresholdPx`; `resolveForMove(rect, candidates, zoom)` devuelve el delta con snap + guías. |
| `AlignmentService` | Alinear & distribuir como una sola entrada de undo: `align(items, axis)`, `alignToReference`, `distribute`, `distributeSpacing`. Tipos `AlignAxis`, `DistributeAxis`, `NodeBBox`. |
| `KeyObjectService` | Recuerda el objetivo "alinear al objeto clave" por editor. |

Cada uno tiene componentes de overlay — `SelectionOverlay`, `RotationPivot`,
`Marquee`, `SnapGuides` — que puedes acoplar al canvas.

## Workspace, layers & aislamiento

| API | Descripción |
| --- | --- |
| `WorkspaceService` | Estado de presentación del editor: signals `background`, `page`, `grid`, `guides`, `rulers`, `interaction` con setters correspondientes. Tipos `BackgroundConfig`, `PageConfig`, `GridConfig`, `Guide`, `RulersConfig`, `InteractionConfig`. |
| `LayersService` | Visibilidad & bloqueo por-nodo (solo del editor, no serializado): `isVisible`/`isLocked`, `setVisible`/`toggleVisible`, `setLocked`/`toggleLocked`, `showAll`/`unlockAll`. |
| `IsolationService` | Aislamiento de grupo + navegación por breadcrumb: `enterIsolation`, `exitIsolation`, `toggleIsolation`. |
| `SvgeCanvasGestures` | Directiva para pan con botón central + zoom con la rueda, dirigiendo el `ViewportService`. |
| Formato de archivo del workspace | `serializeWorkspace(state)` / `parseWorkspace(json)` y los tipos del envelope `.svge`/`.svgez` — persiste todo el estado del editor (config + viewport), no solo el documento. |

Componentes de overlay/filtro: `WorkspaceBackground`, `GridOverlay`, `GuidesOverlay`,
`PageOverlay`, `LayersFilter`, `IsolationFilter`, `AnchorOverlay`.

## Plugins

Todo lo opcional en el editor es un plugin. Construye el tuyo para añadir tools,
bibliotecas, menús, atajos, efectos o formatos.

| API | Descripción |
| --- | --- |
| `EditorPlugin` | El contrato de plugin: `id`, `version`, `name`, `apiVersion`, opcionales `dependencies`/`category`, y `install(ctx)` / `uninstall(ctx)` opcional. |
| `PluginContext` | Entregado a `install`: `pluginId`, `injector`, y `track(disposable)` para que toda contribución se elimine automáticamente en el uninstall. |
| `PluginRegistry` | Ciclo de vida install/uninstall: `install`, `uninstall`, `has`, `get`, `list`, signal `installed`. |
| `PLUGIN_API_VERSION` / `PluginCategory` / `InstalledPlugin` | La versión actual de la API, la unión de categorías y el tipo del registro instalado. |

Para gestionar y cargar plugins: `PluginManagerService` +
`PluginCatalog` + `PluginStateStore` dan base a la UI del gestor de plugins;
`PluginLoader` + `providePluginLoader(config)` + `validateExternalPluginManifest()`
cargan plugins **externos** de terceros tras un allowlist + gate de versión de la API
(`SVGE_PLUGIN_TRUSTED_ORIGINS`, `SVGE_PLUGIN_MODULE_LOADER`).

## Menús & teclado

| API | Descripción |
| --- | --- |
| `MenuContributionRegistry` | Registry extensible de menú/toolbar/menú contextual: `register(contribution)` → `Disposable`, `bySlot(slot)`. Tipos `MenuContribution`, `MenuSlot`, `MenuContributionContext`. Slots: `MENU_SLOT`, `TOOLBAR_SLOT`, `CONTEXT_MENU_SLOT`. |
| `ShortcutRegistry` / `ShortcutService` | Registra atajos (`register` → `Disposable`, `findMatch(event)`) y los dispara en el keydown. `Shortcut` lleva `combo`, `label`, `when` opcional, `handler`. |
| `KeybindingsService` | Personalización en runtime: `listShortcuts`, `setOverride(id, combo)`, `clearOverride`, `exportAsJson`. |
| Helpers de combo | `parseCombo`, `comboMatches`, `formatCombo`, `comboFromEvent`, `validateCombo`. |

Plugins de contribución integrados: `builtinMenuContributionsPlugin`,
`builtinInsertMenuPlugin`, `builtinAdvancedEditMenuPlugin`,
`builtinEditorShortcutsPlugin`.

## Bibliotecas

Un `LibraryRegistry<T>` uniforme (`register` → `Disposable`, `get`, `update`, signal
`items`) da base a toda biblioteca de assets. Cada una trae un plugin integrado.

| Servicio | Guarda |
| --- | --- |
| `ShapeLibraryService` | Formas reutilizables. |
| `SymbolLibraryService` | Símbolos (master/instancia vía `SymbolUseNode`). |
| `TemplateLibraryService` | Templates de documento. |
| `BrushLibraryService` | Pinceles (perfiles de ancho para el Pencil). |
| `PatternLibraryService` / `GradientLibraryService` | Patterns y gradientes. |
| `GraphicStyleLibraryService` | Estilos gráficos reutilizables. |
| `PaletteRegistry` | Paletas de color (`Palette` = `{ id, name, colors }`). |
| `ClipPathLibraryService` / `MaskLibraryService` | Clip paths y máscaras. |

Servicios de apoyo: `AssetManagerService` (archivo → data URI) y
`ActiveDefsService` / `ActiveSymbolsService` (componen los defs/símbolos usados en el
`<defs>` para exportación).

## Páginas & animación

| API | Descripción |
| --- | --- |
| `PagesService` | Vista derivada de las páginas del documento: signals `pages`/`count`/`hasPages`, `byId`, `nameOf`, `viewBoxOf`. |
| `ActivePageService` | Qué página se está editando: signals `activePageId`/`activePage`/`effectiveDrawTargetId`, `setActivePageId`. |
| `AnimationService` | Edita la animación de la página vía comandos con undo: `addKeyframe`, `removeKeyframe`, `moveKeyframe`, `setKeyframeEasing`, `setDuration`, `setAnimatableProperty`, `sample(playhead)`; signals `tracks`/`duration`/`hasAnimation`. |
| `PlaybackService` | Dirige el playhead con `requestAnimationFrame`: `play`/`pause`/`seek`/`step`/`setSpeed`/`setLoop`; signals `playhead`/`isPlaying`. |

## Efectos

| API | Descripción |
| --- | --- |
| `EffectRegistry` | Registry de efectos de filtro SVG: `register` → `Disposable`, `get`, `byCategory`, signal `effects`. |
| `Effect` / `EffectParam` | El contrato del efecto (`buildFilterMarkup()`) y sus parámetros tipados (`EffectNumberParam`, `EffectColorParam`, `EffectSelectParam`, `EffectBooleanParam`). |
| Helpers de parámetro | `effectDefaults`, `resolveEffectParams`, `nonDefaultParams`, `isNumberParam`. |
| `ParametricEffectRegistry` / `ChainFilterRegistry` | Efectos paramétricos (reeditables) y encadenamiento de efectos, con helpers de encode/parse de id. |
| `builtinEffectsPlugin` | Registra los presets de filtro integrados (blur, drop shadow, glow, bevel/emboss, ajustes de color, …). |

## Servicios de estado del editor

| API | Descripción |
| --- | --- |
| `ClipboardService` | Copy/cut/paste en memoria, desacoplado del clipboard del navegador: `copy`, `cut`, `paste`, `canPaste`. |
| `FindReplaceService` / `SelectSameService` | Buscar & reemplazar en texto/propiedades de nodos (`find`, `replace`, `replaceAll`; `FindCriteria`/`FindMatch`), y "seleccionar igual" (fill/stroke/fuente/…). |
| `AutoSaveService` | Autosave periódico en localStorage con recuperación. |
| `RecentFilesService` | Lista MRU detrás de "Abrir reciente". |
| `SnapshotsPersistenceService` | Persiste snapshots del editor en localStorage. |
| `AssetExportRegistry` / `AssetExportRunner` | Exportación por lotes: registra slots (objetivo + formato + escala + nombre) y los ejecuta con desambiguación de nombres. |
| `FullscreenService` | Wrapper de pantalla completa nativo. |
| `ImportSettingsService` / `ImportPlacementService` | Preferencia de colocación del import de SVG y el gesto interactivo de arrastrar-para-colocar (`SvgeImportPlacementOverlay`). |
| `TraceImageService` | Vectorización ráster-a-vector: `traceImageToPaths(imageData, options)` + el comando con undo `TraceImageCommand`. |
| `SmartObjectActionsService` | Acciones de "reemplazar contenido" / rasterizar para smart objects. |

:::note[IO & optimize re-exportados]
Por conveniencia del editor, `edit` también re-exporta los registries de
import/export y de optimize, los formatos integrados y sus plugins (`builtinIoPlugin`,
`builtinOptimizersPlugin`, …). Ver las páginas
[io](/svgengine-site/es/reference/api/io/) y
[optimize](/svgengine-site/es/reference/api/optimize/) para detalles.
:::

:::note[Utilidades de bajo nivel]
`edit` también exporta primitivas de geometría & hit-testing — helpers de
bbox/ancla (`anchorPoint`, `findNearestAnchor`, `BBoxAnchor`), lookup del nodo
renderizado (`getRenderedNodeBBox`, `getRenderedNodeOBB`, `getCombinedBBox`),
hit-testing en el DOM (`resolveNodeIdFromEvent`, `geometricHitTestElement`) y captura
de puntero (`capturePointer`, `releasePointer`, `isEditableTarget`). Dan base a las
tools y overlays de arriba; recúrrelas solo al construir interacciones de canvas
personalizadas. El
[repositorio de la biblioteca](https://github.com/mosaicoo/svg-engine) es
autoritativo para las firmas exactas.
:::
