---
title: 'API: core'
description: API pública de @mosaicoo/svg-engine/core — o modelo headless, tree ops, comandos, serviços, geometria, pages e animação.
---

`@mosaicoo/svg-engine/core` é o **engine headless**: o modelo de dados imutável,
as operações de árvore, o tipo do documento, o command pattern, serviços por
signals, helpers de geometria, metadados de página e o modelo de animação. Sem
dependência de Angular Material/CDK.

```ts
import { createRect, CommandBus, type SvgDocument } from '@mosaicoo/svg-engine/core';
```

Esta página lista a superfície pública completa, agrupada por área. Para as
assinaturas exatas, o [repositório da library](https://github.com/mosaicoo/svg-engine)
é autoritativo.

## Modelo & tipos de nó

A árvore do documento é uma união discriminada de nós imutáveis.

- **`SvgNode`** — a união; **`SvgNodeBase`**, **`SvgNodeType`**, **`SVG_NODE_TYPES`**.
- Variantes: **`RectNode`**, **`EllipseNode`**, **`LineNode`**, **`PolygonNode`**,
  **`PolylineNode`**, **`PathNode`**, **`TextNode`** (+ **`TextRun`**),
  **`ImageNode`**, **`GroupNode`**, **`SymbolUseNode`**.
- Estilo & metadados: **`SvgStyle`**, **`SvgMetadata`**, **`NodeId`**.
- Defaults: **`DEFAULT_STYLE`**, **`EMPTY_STYLE`**, **`EMPTY_METADATA`**,
  **`STYLE_PROPERTY_NAMES`**, **`TRANSFORM_PROPERTY_NAMES`**.

## Documento

- **`SvgDocument`** — o documento (id, viewBox, grupo root).
- **`createEmptyDocument(opts?)`** + **`CreateDocumentOptions`**, **`DEFAULT_VIEW_BOX`**.

## Factories

Constroem nós de forma imutável:

- **`createRect`**, **`createEllipse`**, **`createLine`**, **`createPolygon`**,
  **`createPolyline`**, **`createPath`**, **`createText`**, **`createImage`**,
  **`createGroup`**, **`createSymbolUse`** — todas aceitam **`NodeFactoryOptions`**.
- IDs: **`generateNodeId()`**, **`toNodeId(value)`**.

## Operações de árvore (imutáveis, structural sharing)

- **`findNodeById`**, **`findParent`**, **`insertNode`**, **`removeNode`**,
  **`updateNode`**, **`walk`**, **`collectNodes`**, **`countNodes`**,
  **`isGroupNode`**, **`cloneNodeWithNewIds`**.
- Resolução de parent: **`ParentRef`**, **`AUTO_PARENT`**, **`InsertParentResolver`**,
  **`INSERT_PARENT_RESOLVER`**.

## Geometria

- **Ponto**: **`Point`**, **`ORIGIN`**.
- **Bounding box**: **`BoundingBox`**, **`bbox`**, **`unionBBox`**,
  **`containsPoint`**, **`intersectsBBox`**, **`getNodeBBox`**, **`getNodesWorldBBox`**.
- **Transform**: **`Transform`**, **`IDENTITY_TRANSFORM`**, **`translate`**,
  **`scale`**, **`rotate`**, **`skewX`**, **`skewY`**, **`multiply`**, **`invert`**,
  **`applyTransform`**, **`isIdentity`**, **`isIdentityOrTranslate`**,
  **`composeTransform`**, **`parseTransformAttr`**; decomposição via
  **`decomposeTransform`** / **`DecomposedTransform`**; composição com pivot via
  **`composeAnchoredScale`**, **`composePivotRotation`**, **`composePivotFlip`**,
  **`composePivotSkew`**.
- **Scale-bake** (resize assa a geometria real): **`bakeScaleIntoNode`** e os
  por tipo **`bakeRect`** / **`bakeEllipse`** / **`bakeLine`** / **`bakePolygon`** /
  **`bakePolyline`** / **`bakePath`** / **`bakeText`** / **`bakeImage`** /
  **`bakeGroup`** / **`bakePathD`** / **`bakeTransformIntoPathD`**;
  **`scaleAxisInterval`**, **`scalePoint`**, **`scalePathSegments`**.

## Paths & anchors

- **Anchors**: **`AnchorKind`** (cusp/smooth/symmetric), **`AnchorPoint`**,
  **`AnchorSubpath`**, **`AnchorRef`**, **`classifyAnchorKind`**,
  **`parsePathToAnchors`**, **`anchorsToPathD`**, **`simplifyAnchorSubpath`**.
- **Path data**: **`PathCmd`**, **`PathSegment`**, **`parsePathD`**,
  **`serializePathD`**, **`flattenPathD`**, **`nodeToPathD`**, **`ringsToPathD`**,
  **`FlatRing`**.
- **Operações de path**: **`roundPathCorners`**, **`offsetPathD`** (+ **`offsetPolyline`**,
  **`offsetClosedRing`**, **`DEFAULT_OFFSET_DISTANCE`**), **`outlineStrokeToPathD`**,
  **`reversePathD`**, **`joinPathDs`**, **`splitPathDAtAnchors`**,
  **`splitPathDIntoSubpaths`** (+ **`PathSplitCut`**), **`simplifyPathD`**
  (+ **`DEFAULT_SIMPLIFY_TOLERANCE`**), **`cleanUpPathD`**.

## Cor & defs

- **`parseColor`**, **`mixColor`**, **`unwrapUrlRef`**.
- **`appendDef`**, **`extractDefById`**, **`removeDefById`**.

## Pages (camada de metadados)

- Predicados & acessores: **`isPage`**, **`getPageViewBox`**, **`getPageName`**,
  **`getPageOptions`**, **`getPageBackgroundNode`**.
- Builders: **`withPageFlag`**, **`withoutPageFlag`**, **`withPageName`**,
  **`withPageViewBox`**, **`withPageOptions`**.
- Tipos & formatos: **`PageOptions`**, **`PageBackground`**, **`PageMargins`**,
  **`PageFormat`**, **`PageOrientation`**, **`PAGE_FORMAT_SIZES`**,
  **`pageFormatSize`**, **`detectPageFormat`**, **`pageOrientationFromSize`**,
  **`DEFAULT_PAGE_OPTIONS`**, **`PAGE_BACKGROUND_IMAGE_PAR`**.
- Keys: **`SVGE_PAGE_NAME_KEY`**, **`SVGE_PAGE_OPTIONS_KEY`**, **`SVGE_PAGE_VIEWBOX_KEY`**.

## Kinds de nó (layers, smart objects, live booleans)

- Layers: **`isLayer`**, **`withLayerFlag`**, **`withoutLayerFlag`**.
- Smart objects: **`isSmartObject`**, **`withSmartObjectFlag`**, **`withoutSmartObjectFlag`**.
- Live booleans: **`isLiveBooleanGroup`**, **`getLiveBooleanOp`**, **`LiveBooleanOp`**,
  **`LIVE_BOOLEAN_KEY`**, **`LIVE_BOOLEAN_ROLE_KEY`**.
- Clip/mask: **`ClipMaskKind`**.
- Kind keys: **`SVGE_KIND_KEY`**, **`SVGE_KIND_LAYER`**, **`SVGE_KIND_PAGE`**,
  **`SVGE_KIND_SMART_OBJECT`**.

## Atributos customizados

- **`CustomAttrs`**, **`hasCustomAttrs`**, **`readCustomAttrs`**, **`setCustomAttr`**,
  **`removeCustomAttr`**, **`renameCustomAttr`**, **`withCustomAttrs`**,
  **`customAttrToDataName`**, **`dataNameToCustomAttr`**, **`isValidCustomAttrName`**,
  **`SVGE_CUSTOM_ATTRS_KEY`**, **`CUSTOM_ATTR_DATA_PREFIX`**.

## Comandos

Toda mutação é um `Command`. Despache-os pelo `CommandBus` (abaixo) para
undo/redo automático.

- **Contrato**: **`Command`**, **`CommandContext`**, **`CommandResult`**, **`ok`**, **`fail`**.
- **Árvore**: **`InsertNodeCommand`**, **`RemoveNodeCommand`**, **`MoveNodeCommand`**,
  **`MoveNodeInTreeCommand`**, **`ReorderNodeCommand`** (+ **`ReorderDirection`**),
  **`GroupSelectionCommand`**, **`UngroupCommand`**, **`DuplicateNodeCommand`**.
- **Propriedades**: **`SetPropertyCommand`**, **`SetPropertyOnManyCommand`**,
  **`SetStylePropertyOnManyCommand`**, **`SetCornerRadiusCommand`**,
  **`SetCustomAttrCommand`**, **`RemoveCustomAttrCommand`**, **`RenameCustomAttrCommand`**.
- **Transform**: **`RotateNodeCommand`** / **`RotateNodesCommand`** (+ **`RotateNodesEntry`**),
  **`ResizeNodeCommand`** / **`ResizeNodesCommand`** (+ **`ResizeNodesEntry`**),
  **`SkewNodeCommand`** / **`SkewNodesCommand`** (+ **`SkewNodesEntry`**),
  **`FlipNodeCommand`** (+ **`FlipAxis`**), **`TranslateManyCommand`**.
- **Anchors**: **`MoveAnchorCommand`**, **`InsertAnchorCommand`**,
  **`RemoveAnchorCommand`**, **`ConvertAnchorTypeCommand`**, **`ConvertNodeToPathCommand`**,
  **`BatchConvertToPathCommand`**.
- **Operações de path**: **`OffsetPathCommand`**, **`OutlineStrokeCommand`**,
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
- **Animação**: **`AddKeyframeCommand`**, **`MoveKeyframeCommand`**,
  **`RemoveKeyframeCommand`**, **`SetKeyframeEasingCommand`**,
  **`SetAnimationDurationCommand`**, **`RemoveTrackCommand`**.
- **Snapshots**: **`RestoreSnapshotCommand`**.

## Serviços

- **`CommandBus`** — o ponto único de mutação; passa pelo histórico para undo/redo
  automático.
- **`EditorStateService`** — o documento e o estado derivado como signals.
- **`HistoryService`** — pilhas de undo/redo.
- **`SnapshotsService`** — checkpoints nomeados restauráveis (+ **`Snapshot`**,
  **`SnapshotSource`**, **`SnapshotsLimits`**, **`DEFAULT_SNAPSHOT_LIMITS`**).
- **`Disposable`** — o contrato de cleanup usado pelos registries.

## Animação (modelo de timeline)

Modelo de animação puro e headless (a árvore exibida é derivada; o documento base
nunca é mutado).

- Modelo: **`AnimationDoc`**, **`AnimationTrack`**, **`Keyframe`**, **`AnimationSample`**,
  **`AnimationValue`**, **`ANIMATION_KEY`**; **`emptyAnimationDoc`**, **`isAnimationDoc`**,
  **`readAnimationDoc`**.
- Props animáveis: **`AnimatablePropertyDef`**, **`AnimatablePropertyGroup`**,
  **`AnimatablePropertyKind`**, **`animatablePropertiesForNode`**,
  **`findAnimatableProperty`**, **`readAnimatableValue`**.
- Easing: **`EasingSpec`**, **`DEFAULT_EASING`**, **`evalEasing`**, **`easingControlPoints`**.
- Sampling: **`sampleAnimation`**, **`sampleTrack`**, **`applyAnimationToTree`**,
  **`interpolateValue`**, **`findTrack`**.
- Helpers de edição: **`upsertKeyframe`**, **`moveKeyframe`**, **`removeKeyframe`**,
  **`setKeyframeEasing`**, **`setAnimationDuration`**, **`removeTrack`**.
- Export: **`animationToSmil`**.

:::note
Várias dessas APIs ainda não estão listadas em `docs/09-api-publica.md` da
library — esta página reflete a superfície de exports atual (a fonte da verdade).
:::
