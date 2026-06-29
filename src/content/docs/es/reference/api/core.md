---
title: 'API: core'
description: API pública de @mosaicoo/svg-engine/core — el modelo headless, tree ops, comandos, servicios, geometría, pages y animación.
---

`@mosaicoo/svg-engine/core` es el **motor headless**: el modelo de datos
inmutable, las operaciones de árbol, el tipo del documento, el command pattern,
servicios por signals, helpers de geometría, metadatos de página y el modelo de
animación. Sin dependencia de Angular Material/CDK.

```ts
import { createRect, CommandBus, type SvgDocument } from '@mosaicoo/svg-engine/core';
```

Esta página lista la superficie pública completa, agrupada por área. Para las
firmas exactas, el [repositorio de la librería](https://github.com/mosaicoo/svg-engine)
es autoritativo.

## Modelo y tipos de nodo

El árbol del documento es una unión discriminada de nodos inmutables.

- **`SvgNode`** — la unión; **`SvgNodeBase`**, **`SvgNodeType`**, **`SVG_NODE_TYPES`**.
- Variantes: **`RectNode`**, **`EllipseNode`**, **`LineNode`**, **`PolygonNode`**,
  **`PolylineNode`**, **`PathNode`**, **`TextNode`** (+ **`TextRun`**),
  **`ImageNode`**, **`GroupNode`**, **`SymbolUseNode`**.
- Estilo y metadatos: **`SvgStyle`**, **`SvgMetadata`**, **`NodeId`**.
- Defaults: **`DEFAULT_STYLE`**, **`EMPTY_STYLE`**, **`EMPTY_METADATA`**,
  **`STYLE_PROPERTY_NAMES`**, **`TRANSFORM_PROPERTY_NAMES`**.

## Documento

- **`SvgDocument`** — el documento (id, viewBox, grupo root).
- **`createEmptyDocument(opts?)`** + **`CreateDocumentOptions`**, **`DEFAULT_VIEW_BOX`**.

## Factories

Construyen nodos de forma inmutable:

- **`createRect`**, **`createEllipse`**, **`createLine`**, **`createPolygon`**,
  **`createPolyline`**, **`createPath`**, **`createText`**, **`createImage`**,
  **`createGroup`**, **`createSymbolUse`** — todas aceptan **`NodeFactoryOptions`**.
- IDs: **`generateNodeId()`**, **`toNodeId(value)`**.

## Operaciones de árbol (inmutables, structural sharing)

- **`findNodeById`**, **`findParent`**, **`insertNode`**, **`removeNode`**,
  **`updateNode`**, **`walk`**, **`collectNodes`**, **`countNodes`**,
  **`isGroupNode`**, **`cloneNodeWithNewIds`**.
- Resolución de parent: **`ParentRef`**, **`AUTO_PARENT`**, **`InsertParentResolver`**,
  **`INSERT_PARENT_RESOLVER`**.

## Geometría

- **Punto**: **`Point`**, **`ORIGIN`**.
- **Bounding box**: **`BoundingBox`**, **`bbox`**, **`unionBBox`**,
  **`containsPoint`**, **`intersectsBBox`**, **`getNodeBBox`**, **`getNodesWorldBBox`**.
- **Transform**: **`Transform`**, **`IDENTITY_TRANSFORM`**, **`translate`**,
  **`scale`**, **`rotate`**, **`skewX`**, **`skewY`**, **`multiply`**, **`invert`**,
  **`applyTransform`**, **`isIdentity`**, **`isIdentityOrTranslate`**,
  **`composeTransform`**, **`parseTransformAttr`**; descomposición vía
  **`decomposeTransform`** / **`DecomposedTransform`**; composición con pivot vía
  **`composeAnchoredScale`**, **`composePivotRotation`**, **`composePivotFlip`**,
  **`composePivotSkew`**.
- **Scale-bake** (el resize hornea geometría real): **`bakeScaleIntoNode`** y los
  por tipo **`bakeRect`** / **`bakeEllipse`** / **`bakeLine`** / **`bakePolygon`** /
  **`bakePolyline`** / **`bakePath`** / **`bakeText`** / **`bakeImage`** /
  **`bakeGroup`** / **`bakePathD`** / **`bakeTransformIntoPathD`**;
  **`scaleAxisInterval`**, **`scalePoint`**, **`scalePathSegments`**.

## Paths y anchors

- **Anchors**: **`AnchorKind`** (cusp/smooth/symmetric), **`AnchorPoint`**,
  **`AnchorSubpath`**, **`AnchorRef`**, **`classifyAnchorKind`**,
  **`parsePathToAnchors`**, **`anchorsToPathD`**, **`simplifyAnchorSubpath`**.
- **Path data**: **`PathCmd`**, **`PathSegment`**, **`parsePathD`**,
  **`serializePathD`**, **`flattenPathD`**, **`nodeToPathD`**, **`ringsToPathD`**,
  **`FlatRing`**.
- **Operaciones de path**: **`roundPathCorners`**, **`offsetPathD`** (+ **`offsetPolyline`**,
  **`offsetClosedRing`**, **`DEFAULT_OFFSET_DISTANCE`**), **`outlineStrokeToPathD`**,
  **`reversePathD`**, **`joinPathDs`**, **`splitPathDAtAnchors`**,
  **`splitPathDIntoSubpaths`** (+ **`PathSplitCut`**), **`simplifyPathD`**
  (+ **`DEFAULT_SIMPLIFY_TOLERANCE`**), **`cleanUpPathD`**.

## Color y defs

- **`parseColor`**, **`mixColor`**, **`unwrapUrlRef`**.
- **`appendDef`**, **`extractDefById`**, **`removeDefById`**.

## Pages (capa de metadatos)

- Predicados y accesores: **`isPage`**, **`getPageViewBox`**, **`getPageName`**,
  **`getPageOptions`**, **`getPageBackgroundNode`**.
- Builders: **`withPageFlag`**, **`withoutPageFlag`**, **`withPageName`**,
  **`withPageViewBox`**, **`withPageOptions`**.
- Tipos y formatos: **`PageOptions`**, **`PageBackground`**, **`PageMargins`**,
  **`PageFormat`**, **`PageOrientation`**, **`PAGE_FORMAT_SIZES`**,
  **`pageFormatSize`**, **`detectPageFormat`**, **`pageOrientationFromSize`**,
  **`DEFAULT_PAGE_OPTIONS`**, **`PAGE_BACKGROUND_IMAGE_PAR`**.
- Keys: **`SVGE_PAGE_NAME_KEY`**, **`SVGE_PAGE_OPTIONS_KEY`**, **`SVGE_PAGE_VIEWBOX_KEY`**.

## Kinds de nodo (layers, smart objects, live booleans)

- Layers: **`isLayer`**, **`withLayerFlag`**, **`withoutLayerFlag`**.
- Smart objects: **`isSmartObject`**, **`withSmartObjectFlag`**, **`withoutSmartObjectFlag`**.
- Live booleans: **`isLiveBooleanGroup`**, **`getLiveBooleanOp`**, **`LiveBooleanOp`**,
  **`LIVE_BOOLEAN_KEY`**, **`LIVE_BOOLEAN_ROLE_KEY`**.
- Clip/mask: **`ClipMaskKind`**.
- Kind keys: **`SVGE_KIND_KEY`**, **`SVGE_KIND_LAYER`**, **`SVGE_KIND_PAGE`**,
  **`SVGE_KIND_SMART_OBJECT`**.

## Atributos personalizados

- **`CustomAttrs`**, **`hasCustomAttrs`**, **`readCustomAttrs`**, **`setCustomAttr`**,
  **`removeCustomAttr`**, **`renameCustomAttr`**, **`withCustomAttrs`**,
  **`customAttrToDataName`**, **`dataNameToCustomAttr`**, **`isValidCustomAttrName`**,
  **`SVGE_CUSTOM_ATTRS_KEY`**, **`CUSTOM_ATTR_DATA_PREFIX`**.

## Comandos

Toda mutación es un `Command`. Despáchalos por el `CommandBus` (abajo) para
undo/redo automático.

- **Contrato**: **`Command`**, **`CommandContext`**, **`CommandResult`**, **`ok`**, **`fail`**.
- **Árbol**: **`InsertNodeCommand`**, **`RemoveNodeCommand`**, **`MoveNodeCommand`**,
  **`MoveNodeInTreeCommand`**, **`ReorderNodeCommand`** (+ **`ReorderDirection`**),
  **`GroupSelectionCommand`**, **`UngroupCommand`**, **`DuplicateNodeCommand`**.
- **Propiedades**: **`SetPropertyCommand`**, **`SetPropertyOnManyCommand`**,
  **`SetStylePropertyOnManyCommand`**, **`SetCornerRadiusCommand`**,
  **`SetCustomAttrCommand`**, **`RemoveCustomAttrCommand`**, **`RenameCustomAttrCommand`**.
- **Transform**: **`RotateNodeCommand`** / **`RotateNodesCommand`** (+ **`RotateNodesEntry`**),
  **`ResizeNodeCommand`** / **`ResizeNodesCommand`** (+ **`ResizeNodesEntry`**),
  **`SkewNodeCommand`** / **`SkewNodesCommand`** (+ **`SkewNodesEntry`**),
  **`FlipNodeCommand`** (+ **`FlipAxis`**), **`TranslateManyCommand`**.
- **Anchors**: **`MoveAnchorCommand`**, **`InsertAnchorCommand`**,
  **`RemoveAnchorCommand`**, **`ConvertAnchorTypeCommand`**, **`ConvertNodeToPathCommand`**,
  **`BatchConvertToPathCommand`**.
- **Operaciones de path**: **`OffsetPathCommand`**, **`OutlineStrokeCommand`**,
  **`SimplifyPathCommand`**, **`CleanUpPathCommand`**, **`ReversePathCommand`**,
  **`JoinPathsCommand`**, **`SplitPathCommand`**, **`KnifeCutPathCommand`**.
- **Pathfinder**: **`UnionCommand`**, **`IntersectCommand`**, **`SubtractCommand`**,
  **`ExcludeCommand`**, **`DivideCommand`**.
- **Live boolean**: **`MakeLiveBooleanCommand`**, **`RefreshLiveBooleanCommand`**,
  **`ReleaseLiveBooleanCommand`**.
- **Compound / clip / mask**: **`MakeCompoundPathCommand`**, **`ReleaseCompoundPathCommand`**,
  **`MakeClipMaskCommand`**, **`ReleaseClipMaskCommand`**.
- **Layers**: **`MakeLayerCommand`**, **`UnmakeLayerCommand`**, **`CreateLayerCommand`**.
- **Pages**: **`CreatePageCommand`**, **`DeletePageCommand`**, **`RenamePageCommand`**,
  **`ResizePageCommand`**, **`MovePageCommand`**, **`SetPageOptionsCommand`**,
  **`EnsureDefaultPageCommand`**.
- **Smart objects**: **`MakeSmartObjectCommand`**, **`EditSmartObjectContentsCommand`**,
  **`ReplaceSmartObjectContentsCommand`**, **`RasterizeSmartObjectCommand`**,
  **`ReleaseSmartObjectCommand`**, **`RasterizeNodeCommand`**.
- **Animación**: **`AddKeyframeCommand`**, **`MoveKeyframeCommand`**,
  **`RemoveKeyframeCommand`**, **`SetKeyframeEasingCommand`**,
  **`SetAnimationDurationCommand`**, **`RemoveTrackCommand`**.
- **Snapshots**: **`RestoreSnapshotCommand`**.

## Servicios

- **`CommandBus`** — el punto único de mutación; pasa por el historial para
  undo/redo automático.
- **`EditorStateService`** — el documento y el estado derivado como signals.
- **`HistoryService`** — pilas de undo/redo.
- **`SnapshotsService`** — checkpoints nombrados restaurables (+ **`Snapshot`**,
  **`SnapshotSource`**, **`SnapshotsLimits`**, **`DEFAULT_SNAPSHOT_LIMITS`**).
- **`Disposable`** — el contrato de cleanup usado por los registries.

## Animación (modelo de timeline)

Modelo de animación puro y headless (el árbol mostrado es derivado; el documento
base nunca se muta).

- Modelo: **`AnimationDoc`**, **`AnimationTrack`**, **`Keyframe`**, **`AnimationSample`**,
  **`AnimationValue`**, **`ANIMATION_KEY`**; **`emptyAnimationDoc`**, **`isAnimationDoc`**,
  **`readAnimationDoc`**.
- Props animables: **`AnimatablePropertyDef`**, **`AnimatablePropertyGroup`**,
  **`AnimatablePropertyKind`**, **`animatablePropertiesForNode`**,
  **`findAnimatableProperty`**, **`readAnimatableValue`**.
- Easing: **`EasingSpec`**, **`DEFAULT_EASING`**, **`evalEasing`**, **`easingControlPoints`**.
- Sampling: **`sampleAnimation`**, **`sampleTrack`**, **`applyAnimationToTree`**,
  **`interpolateValue`**, **`findTrack`**.
- Helpers de edición: **`upsertKeyframe`**, **`moveKeyframe`**, **`removeKeyframe`**,
  **`setKeyframeEasing`**, **`setAnimationDuration`**, **`removeTrack`**.
- Export: **`animationToSmil`**.

:::note
Varias de estas APIs aún no están listadas en el `docs/09-api-publica.md` de la
librería — esta página refleja la superficie de exports actual (la fuente de la
verdad).
:::
