---
title: 'API: core'
description: API pública de @mosaicoo/svg-engine/core — el engine headless para construir, mutar y consultar un documento SVG programáticamente.
---

`@mosaicoo/svg-engine/core` es el **engine headless**. No depende de
`@angular/material` ni de `@angular/cdk`, así que puedes usarlo en un editor
completo, un visor de solo lectura, un pipeline Node/SSR o una CLI — donde
necesites construir, mutar y consultar un documento SVG programáticamente.

```ts
import {
  createEmptyDocument, createRect,
  EditorStateService, CommandBus, InsertNodeCommand, AUTO_PARENT,
} from '@mosaicoo/svg-engine/core';
```

## Cómo encajan las piezas

El modelo de datos es **inmutable**: las factories y las operaciones de árbol
siempre devuelven objetos nuevos. Nunca mutas el documento directamente — en su
lugar **despachas comandos** por el `CommandBus`, que aplica el cambio y lo
registra para undo/redo. El documento actual vive en `EditorStateService` como
signals de Angular.

```ts
const state = inject(EditorStateService);
const bus = inject(CommandBus);

state.resetDocument(createEmptyDocument({ width: 800, height: 600 }));

const rect = createRect({ x: 10, y: 10, width: 120, height: 80 });
bus.dispatch(new InsertNodeCommand(rect, AUTO_PARENT)); // con undo
bus.undo();
```

## Documento & servicios de estado

Los servicios son `@Injectable` de Angular — inyéctalos donde los necesites.

| API | Descripción | Úsalo para |
| --- | --- | --- |
| `EditorStateService` | Fuente única de verdad del documento editado, expuesta como signals de solo lectura (`document`, `dirty`, `nodeCount`, `allNodes`). | Leer el documento actual de forma reactiva; sembrar/reemplazar con `resetDocument()` / `setDocument()`; `markClean()` tras guardar. |
| `CommandBus` | El único gateway para **todas** las mutaciones. `dispatch(command)` aplica el cambio y registra el historial; también `undo()`, `redo()`, `goto(depth)`. | Aplicar cualquier cambio al documento con soporte de undo/redo. |
| `HistoryService` | La contabilidad de undo/redo detrás del bus: `undoStack`, `redoStack`, `canUndo`, `canRedo`, `setMaxSize()`. | Alimentar la UI de undo/redo y limitar la profundidad del historial. |
| `createEmptyDocument(options?)` | Construye un `SvgDocument` nuevo y vacío con un grupo raíz. | Crear el documento inicial para sembrar el `EditorStateService`. |
| `SvgDocument` | El contenedor inmutable de nivel superior: `viewBox`, `width`/`height` opcionales, el árbol editable `root`, `defs`, `exportPreferences`. | El tipo que lees de `state.document()` y pasas a renderers/exporters. |
| `CreateDocumentOptions` / `DEFAULT_VIEW_BOX` | Opciones (`viewBox`, `width`, `height`) de `createEmptyDocument` y el viewBox por defecto 800×600. | Configurar el tamaño inicial del canvas. |

## Construyendo nodos

Cada forma se crea con una factory. Todas aceptan un `NodeFactoryOptions`
compartido (`id?`, `transform?`, `style?`, `metadata?`); las formas usan
`DEFAULT_STYLE` por defecto, los grupos usan `EMPTY_STYLE`.

| Factory | Crea |
| --- | --- |
| `createRect({ x, y, width, height, rx?, ry? })` | Un rectángulo (opcionalmente redondeado). |
| `createEllipse({ cx, cy, rx, ry })` | Una elipse / círculo. |
| `createLine({ x1, y1, x2, y2 })` | Una línea recta. |
| `createPolygon(points)` / `createPolyline(points)` | Un polígono cerrado / polilínea abierta a partir de una lista de `Point`. |
| `createPath(d)` | Un path a partir de una cadena `d` de SVG. |
| `createText({ x, y, content, fontSize?, fontFamily?, ... })` | Un elemento de texto. |
| `createImage({ x, y, width, height, href })` | Una `<image>` ráster. |
| `createGroup(children?)` | Un grupo contenedor (la base de layers, páginas y smart objects). |
| `createSymbolUse({ symbolId, x, y })` | Una instancia de un símbolo registrado (`<use href="#…">`). |

## El modelo de nodos

| API | Descripción |
| --- | --- |
| `SvgNode` | Unión discriminada de todos los tipos de nodo; el campo `type` estrecha a la forma concreta (`RectNode`, `PathNode`, `GroupNode`, …). |
| `SvgNodeBase` | Los campos comunes a todo nodo: `id`, `transform`, `style`, `metadata` (todos `readonly`). |
| `SvgNodeType` / `SVG_NODE_TYPES` | La unión literal (y la tupla) de los discriminadores `type` válidos. |
| `isGroupNode(node)` | Type guard que estrecha un nodo a `GroupNode`. |

## Leyendo & transformando el árbol

Funciones puras sobre el árbol inmutable — cada una devuelve una **nueva** raíz con
compartición estructural (solo se reasigna el camino hasta el nodo cambiado).

| API | Descripción |
| --- | --- |
| `findNodeById(root, id)` | Encuentra un nodo por id, o `null`. |
| `findParent(root, childId)` | Encuentra el grupo padre de un nodo, o `null`. |
| `walk(root, visitor)` / `collectNodes(root)` / `countNodes(root)` | Recorre, aplana o cuenta el árbol. |
| `insertNode(root, parentId, node, index?)` | Devuelve un árbol nuevo con `node` insertado (lanza error si el id está duplicado). |
| `removeNode(root, id)` | Devuelve un árbol nuevo con el nodo eliminado. |
| `updateNode(root, id, updater)` | Devuelve un árbol nuevo con el nodo reemplazado por `updater(node)` (mismo `id`/`type` exigido). |
| `cloneNodeWithNewIds(node)` | Clona un subárbol en profundidad con ids nuevos (p. ej. para duplicación). |

:::tip
Estas funciones son las primitivas de bajo nivel. Para ediciones **con undo** en un
editor, prefiere los comandos equivalentes (abajo) en vez de llamarlas directamente.
:::

## Geometría & transforms

| API | Descripción |
| --- | --- |
| `Point` / `ORIGIN` | Un punto 2D inmutable; `{x:0, y:0}`. |
| `BoundingBox` + `bbox(x,y,w,h)` | Una caja alineada a los ejes y su constructor. |
| `unionBBox(a,b)` / `intersectsBBox(a,b)` / `containsPoint(box,x,y)` | Combina cajas, prueba solapamiento, prueba contención de punto (usado p. ej. en hit-testing y culling de viewport). |
| `getNodeBBox(node)` / `getNodesWorldBBox(nodes)` | Calcula el bounding box de un nodo (y la unión de una selección). |
| `Transform` / `IDENTITY_TRANSFORM` | La matriz afín inmutable de 6 elementos, correspondiente al `matrix(a,b,c,d,e,f)` de SVG. |
| `translate` / `scale` / `rotate` / `skewX` / `skewY` | Construyen los transforms comunes (rotación/skew en radianes). |
| `multiply(a,b)` / `invert(m)` / `applyTransform(m,x,y)` | Compone, invierte y aplica un transform a un punto. |
| `parseTransformAttr(attr)` | Parsea una cadena del atributo `transform` de SVG a un `Transform`. |

## Tipos de identidad & estilo

| API | Descripción |
| --- | --- |
| `NodeId` + `toNodeId(s)` / `generateNodeId()` | El tipo branded de id de nodo; coacciona una cadena externa, o genera un id único nuevo. |
| `SvgStyle` / `EMPTY_STYLE` / `DEFAULT_STYLE` | El subconjunto de atributos de presentación de SVG tratados como estilo, más los presets vacío y de forma por defecto. |
| `SvgMetadata` / `EMPTY_METADATA` | Metadatos por-nodo orientados al editor: `name`, `locked`, `visible`, `customData`. |
| `Disposable` | El contrato de limpieza devuelto por cada `register*()` de un registry, para que los plugins deshagan sus contribuciones. |

## Comandos — el vocabulario de mutación

Los comandos son clases simples: construye una con sus datos y haz `bus.dispatch()`.
Cada uno es reversible (undo/redo). `Command`, `CommandContext`, `CommandResult` y
los helpers `ok()` / `fail()` forman el contrato; `AUTO_PARENT` indica a los
comandos de inserción que usen el padre implícito actual.

**Estructura & orden**

| Comando | Hace |
| --- | --- |
| `InsertNodeCommand` / `RemoveNodeCommand` | Añade o elimina un nodo. |
| `MoveNodeCommand` / `MoveNodeInTreeCommand` | Mueve un nodo por offset, o lo reubica (re-parent) en el árbol. |
| `ReorderNodeCommand` (`ReorderDirection`) | Cambia el orden z (subir/bajar/frente/fondo). |
| `DuplicateNodeCommand` | Duplica un nodo con ids nuevos. |
| `GroupSelectionCommand` / `UngroupCommand` | Agrupa una selección / desagrupa un grupo. |
| `TranslateManyCommand` | Mueve varios nodos a la vez. |

**Transform**

| Comando | Hace |
| --- | --- |
| `ResizeNodeCommand` / `ResizeNodesCommand` | Redimensiona uno o varios nodos (escala incrustada en la geometría). |
| `RotateNodeCommand` / `RotateNodesCommand` | Rota alrededor de un pivote. |
| `SkewNodeCommand` / `SkewNodesCommand` | Cizalla en X/Y alrededor de un pivote. |
| `FlipNodeCommand` (`FlipAxis`) | Refleja horizontal/verticalmente. |

**Propiedades**

| Comando | Hace |
| --- | --- |
| `SetPropertyCommand` / `SetPropertyOnManyCommand` | Define una propiedad de geometría/atributo en uno o varios nodos. |
| `SetStylePropertyOnManyCommand` | Define una propiedad de estilo (fill, stroke, …) en una selección. |
| `SetCornerRadiusCommand` | Define el radio de esquina viva (no destructivo) en un path. |
| `SetCustomAttrCommand` / `RenameCustomAttrCommand` / `RemoveCustomAttrCommand` | CRUD con undo para atributos `data-*` personalizados. |

**Pathfinder (booleanos) & paths**

| Comando | Hace |
| --- | --- |
| `UnionCommand` / `SubtractCommand` / `IntersectCommand` / `ExcludeCommand` / `DivideCommand` | Operaciones booleanas entre formas. |
| `MakeLiveBooleanCommand` / `RefreshLiveBooleanCommand` / `ReleaseLiveBooleanCommand` | Booleanos no destructivos ("live") que puedes reeditar después. |
| `MakeCompoundPathCommand` / `ReleaseCompoundPathCommand` | Combina/libera un path compuesto. |
| `ConvertNodeToPathCommand` / `BatchConvertToPathCommand` | Convierte formas en paths editables. |
| `ReversePathCommand` / `SimplifyPathCommand` / `CleanUpPathCommand` / `JoinPathsCommand` / `SplitPathCommand` / `OffsetPathCommand` / `OutlineStrokeCommand` | Las operaciones del menú Path. |
| `KnifeCutPathCommand` | Corta un path/forma en dos a lo largo de un trazo de cuchillo. |
| `RasterizeNodeCommand` | Reemplaza un nodo vectorial por una `<image>` ráster. |

**Páginas, layers & smart objects**

| Comando | Hace |
| --- | --- |
| `CreatePageCommand` / `DeletePageCommand` / `RenamePageCommand` / `ResizePageCommand` / `MovePageCommand` / `SetPageOptionsCommand` / `EnsureDefaultPageCommand` | Gestionan páginas / artboards. |
| `CreateLayerCommand` / `MakeLayerCommand` / `UnmakeLayerCommand` | Gestionan layers lógicas. |
| `MakeSmartObjectCommand` / `ReleaseSmartObjectCommand` / `EditSmartObjectContentsCommand` / `ReplaceSmartObjectContentsCommand` | Gestionan smart objects. |
| `MakeClipMaskCommand` / `ReleaseClipMaskCommand` | Aplica / libera un clip path o máscara de opacidad. |

**Animación** (ver el modelo de animación abajo)

| Comando | Hace |
| --- | --- |
| `AddKeyframeCommand` / `MoveKeyframeCommand` / `RemoveKeyframeCommand` / `SetKeyframeEasingCommand` | Editan keyframes en la animación de la página. |
| `SetAnimationDurationCommand` / `RemoveTrackCommand` | Define duración / elimina una track. |
| `RestoreSnapshotCommand` | Restaura el documento a un snapshot guardado (ver abajo). |

## Snapshots de historial

Checkpoints nombrados y restaurables del documento entero (piensa en el History &
Snapshots de Photoshop). El servicio es **por-editor**, no global.

| API | Descripción |
| --- | --- |
| `SnapshotsService` | Gestiona la colección de snapshots: `take()`, `restore()`, `rename()`, `delete()`, `setLimits()`, más los signals `snapshots`/`count`/`currentSnapshotId`. |
| `Snapshot` / `SnapshotSource` | Un checkpoint (`name`, `createdAt`, `document` clonado, `thumbnail`, `source`) y cómo se creó (`manual`, `auto-open`, …). |
| `SnapshotsLimits` / `DEFAULT_SNAPSHOT_LIMITS` | Límites ajustables (`maxCount`, `autoOnOpen`, `autoOnDestructive`) y sus valores por defecto conservadores. |

## Modelo de animación

Un modelo de animación puro y headless (sin UI). Es el contrato compartido sobre el
que se construyen tanto el preview de la timeline como la exportación SMIL.

| API | Descripción |
| --- | --- |
| `AnimationDoc` / `AnimationTrack` / `Keyframe` / `EasingSpec` | El documento de animación inmutable, sus tracks, keyframes y easing. |
| `emptyAnimationDoc()` / `readAnimationDoc(node)` / `isAnimationDoc(v)` | Crea, lee y comprueba el tipo de la animación adjunta a una página. |
| `upsertKeyframe` / `moveKeyframe` / `removeKeyframe` / `removeTrack` / `setKeyframeEasing` / `setAnimationDuration` | Helpers de edición inmutables (los comandos de arriba los encapsulan). |
| `sampleAnimation(doc, t)` / `sampleTrack` / `applyAnimationToTree(root, doc, t)` | Muestrean valores en un tiempo `t` y producen el árbol animado para el preview. |
| `animatablePropertiesForNode(node)` / `findAnimatableProperty` / `readAnimatableValue` | El catálogo de propiedades animables por tipo de nodo (las filas de la timeline). |
| `animationToSmil(doc)` | Serializa la animación a elementos SMIL `<animate>` de SVG para exportación. |
| `evalEasing` / `easingControlPoints` / `DEFAULT_EASING` | Evaluación de easing y presets. |

:::note
`core` también exporta primitivas geométricas de bajo nivel (parse/serialización de
path, outline de stroke, scale-baking, manipulación de anclas) que existen para dar
soporte a los comandos de arriba. Son bloques avanzados, no APIs del día a día — en
un editor, prefiere los comandos. El
[repositorio de la biblioteca](https://github.com/mosaicoo/svg-engine) es
autoritativo para las firmas exactas.
:::
