---
title: 'API: core'
description: Public API of @mosaicoo/svg-engine/core — the headless model, tree ops, commands, services, geometry, pages and animation.
---

`@mosaicoo/svg-engine/core` is the **headless engine**: the immutable data model,
tree operations, the document type, the command pattern, signal-based services,
geometry helpers, page metadata and the animation model. Zero Angular
Material/CDK dependency.

```ts
import { createRect, CommandBus, type SvgDocument } from '@mosaicoo/svg-engine/core';
```

This page lists the full public surface, grouped by area. For exact signatures,
the [library repository](https://github.com/mosaicoo/svg-engine) is authoritative.

## Model & node types

The document tree is a discriminated union of immutable nodes.

- **`SvgNode`** — the union; **`SvgNodeBase`**, **`SvgNodeType`**, **`SVG_NODE_TYPES`**.
- Variants: **`RectNode`**, **`EllipseNode`**, **`LineNode`**, **`PolygonNode`**,
  **`PolylineNode`**, **`PathNode`**, **`TextNode`** (+ **`TextRun`**),
  **`ImageNode`**, **`GroupNode`**, **`SymbolUseNode`**.
- Style & metadata: **`SvgStyle`**, **`SvgMetadata`**, **`NodeId`**.
- Defaults: **`DEFAULT_STYLE`**, **`EMPTY_STYLE`**, **`EMPTY_METADATA`**,
  **`STYLE_PROPERTY_NAMES`**, **`TRANSFORM_PROPERTY_NAMES`**.

## Document

- **`SvgDocument`** — the document (id, viewBox, root group).
- **`createEmptyDocument(opts?)`** + **`CreateDocumentOptions`**, **`DEFAULT_VIEW_BOX`**.

## Factories

Construct nodes immutably:

- **`createRect`**, **`createEllipse`**, **`createLine`**, **`createPolygon`**,
  **`createPolyline`**, **`createPath`**, **`createText`**, **`createImage`**,
  **`createGroup`**, **`createSymbolUse`** — all accept **`NodeFactoryOptions`**.
- IDs: **`generateNodeId()`**, **`toNodeId(value)`**.

## Tree operations (immutable, structural sharing)

- **`findNodeById`**, **`findParent`**, **`insertNode`**, **`removeNode`**,
  **`updateNode`**, **`walk`**, **`collectNodes`**, **`countNodes`**,
  **`isGroupNode`**, **`cloneNodeWithNewIds`**.
- Parent resolution: **`ParentRef`**, **`AUTO_PARENT`**, **`InsertParentResolver`**,
  **`INSERT_PARENT_RESOLVER`**.

## Geometry

- **Point**: **`Point`**, **`ORIGIN`**.
- **Bounding box**: **`BoundingBox`**, **`bbox`**, **`unionBBox`**,
  **`containsPoint`**, **`intersectsBBox`**, **`getNodeBBox`**, **`getNodesWorldBBox`**.
- **Transform**: **`Transform`**, **`IDENTITY_TRANSFORM`**, **`translate`**,
  **`scale`**, **`rotate`**, **`skewX`**, **`skewY`**, **`multiply`**, **`invert`**,
  **`applyTransform`**, **`isIdentity`**, **`isIdentityOrTranslate`**,
  **`composeTransform`**, **`parseTransformAttr`**; decomposition via
  **`decomposeTransform`** / **`DecomposedTransform`**; pivot composition via
  **`composeAnchoredScale`**, **`composePivotRotation`**, **`composePivotFlip`**,
  **`composePivotSkew`**.
- **Scale-bake** (resize bakes real geometry): **`bakeScaleIntoNode`** and the
  per-type **`bakeRect`** / **`bakeEllipse`** / **`bakeLine`** / **`bakePolygon`** /
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
- **Path ops**: **`roundPathCorners`**, **`offsetPathD`** (+ **`offsetPolyline`**,
  **`offsetClosedRing`**, **`DEFAULT_OFFSET_DISTANCE`**), **`outlineStrokeToPathD`**,
  **`reversePathD`**, **`joinPathDs`**, **`splitPathDAtAnchors`**,
  **`splitPathDIntoSubpaths`** (+ **`PathSplitCut`**), **`simplifyPathD`**
  (+ **`DEFAULT_SIMPLIFY_TOLERANCE`**), **`cleanUpPathD`**.

## Color & defs

- **`parseColor`**, **`mixColor`**, **`unwrapUrlRef`**.
- **`appendDef`**, **`extractDefById`**, **`removeDefById`**.

## Pages (metadata layer)

- Predicates & accessors: **`isPage`**, **`getPageViewBox`**, **`getPageName`**,
  **`getPageOptions`**, **`getPageBackgroundNode`**.
- Builders: **`withPageFlag`**, **`withoutPageFlag`**, **`withPageName`**,
  **`withPageViewBox`**, **`withPageOptions`**.
- Types & formats: **`PageOptions`**, **`PageBackground`**, **`PageMargins`**,
  **`PageFormat`**, **`PageOrientation`**, **`PAGE_FORMAT_SIZES`**,
  **`pageFormatSize`**, **`detectPageFormat`**, **`pageOrientationFromSize`**,
  **`DEFAULT_PAGE_OPTIONS`**, **`PAGE_BACKGROUND_IMAGE_PAR`**.
- Keys: **`SVGE_PAGE_NAME_KEY`**, **`SVGE_PAGE_OPTIONS_KEY`**, **`SVGE_PAGE_VIEWBOX_KEY`**.

## Node kinds (layers, smart objects, live booleans)

- Layers: **`isLayer`**, **`withLayerFlag`**, **`withoutLayerFlag`**.
- Smart objects: **`isSmartObject`**, **`withSmartObjectFlag`**, **`withoutSmartObjectFlag`**.
- Live booleans: **`isLiveBooleanGroup`**, **`getLiveBooleanOp`**, **`LiveBooleanOp`**,
  **`LIVE_BOOLEAN_KEY`**, **`LIVE_BOOLEAN_ROLE_KEY`**.
- Clip/mask: **`ClipMaskKind`**.
- Kind keys: **`SVGE_KIND_KEY`**, **`SVGE_KIND_LAYER`**, **`SVGE_KIND_PAGE`**,
  **`SVGE_KIND_SMART_OBJECT`**.

## Custom attributes

- **`CustomAttrs`**, **`hasCustomAttrs`**, **`readCustomAttrs`**, **`setCustomAttr`**,
  **`removeCustomAttr`**, **`renameCustomAttr`**, **`withCustomAttrs`**,
  **`customAttrToDataName`**, **`dataNameToCustomAttr`**, **`isValidCustomAttrName`**,
  **`SVGE_CUSTOM_ATTRS_KEY`**, **`CUSTOM_ATTR_DATA_PREFIX`**.

## Commands

Every mutation is a `Command`. Dispatch them through the `CommandBus` (below) for
automatic undo/redo.

- **Contract**: **`Command`**, **`CommandContext`**, **`CommandResult`**, **`ok`**, **`fail`**.
- **Tree**: **`InsertNodeCommand`**, **`RemoveNodeCommand`**, **`MoveNodeCommand`**,
  **`MoveNodeInTreeCommand`**, **`ReorderNodeCommand`** (+ **`ReorderDirection`**),
  **`GroupSelectionCommand`**, **`UngroupCommand`**, **`DuplicateNodeCommand`**.
- **Properties**: **`SetPropertyCommand`**, **`SetPropertyOnManyCommand`**,
  **`SetStylePropertyOnManyCommand`**, **`SetCornerRadiusCommand`**,
  **`SetCustomAttrCommand`**, **`RemoveCustomAttrCommand`**, **`RenameCustomAttrCommand`**.
- **Transform**: **`RotateNodeCommand`** / **`RotateNodesCommand`** (+ **`RotateNodesEntry`**),
  **`ResizeNodeCommand`** / **`ResizeNodesCommand`** (+ **`ResizeNodesEntry`**),
  **`SkewNodeCommand`** / **`SkewNodesCommand`** (+ **`SkewNodesEntry`**),
  **`FlipNodeCommand`** (+ **`FlipAxis`**), **`TranslateManyCommand`**.
- **Anchors**: **`MoveAnchorCommand`**, **`InsertAnchorCommand`**,
  **`RemoveAnchorCommand`**, **`ConvertAnchorTypeCommand`**, **`ConvertNodeToPathCommand`**,
  **`BatchConvertToPathCommand`**.
- **Path ops**: **`OffsetPathCommand`**, **`OutlineStrokeCommand`**,
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
- **Animation**: **`AddKeyframeCommand`**, **`MoveKeyframeCommand`**,
  **`RemoveKeyframeCommand`**, **`SetKeyframeEasingCommand`**,
  **`SetAnimationDurationCommand`**, **`RemoveTrackCommand`**.
- **Snapshots**: **`RestoreSnapshotCommand`**.

## Services

- **`CommandBus`** — the single mutation entry point; routes through history for
  automatic undo/redo.
- **`EditorStateService`** — the document and derived state as signals.
- **`HistoryService`** — undo/redo stacks.
- **`SnapshotsService`** — named restorable checkpoints (+ **`Snapshot`**,
  **`SnapshotSource`**, **`SnapshotsLimits`**, **`DEFAULT_SNAPSHOT_LIMITS`**).
- **`Disposable`** — the cleanup contract used across registries.

## Animation (timeline model)

Pure, headless animation model (the displayed tree is derived; the base document
is never mutated).

- Model: **`AnimationDoc`**, **`AnimationTrack`**, **`Keyframe`**, **`AnimationSample`**,
  **`AnimationValue`**, **`ANIMATION_KEY`**; **`emptyAnimationDoc`**, **`isAnimationDoc`**,
  **`readAnimationDoc`**.
- Animatable props: **`AnimatablePropertyDef`**, **`AnimatablePropertyGroup`**,
  **`AnimatablePropertyKind`**, **`animatablePropertiesForNode`**,
  **`findAnimatableProperty`**, **`readAnimatableValue`**.
- Easing: **`EasingSpec`**, **`DEFAULT_EASING`**, **`evalEasing`**, **`easingControlPoints`**.
- Sampling: **`sampleAnimation`**, **`sampleTrack`**, **`applyAnimationToTree`**,
  **`interpolateValue`**, **`findTrack`**.
- Editing helpers: **`upsertKeyframe`**, **`moveKeyframe`**, **`removeKeyframe`**,
  **`setKeyframeEasing`**, **`setAnimationDuration`**, **`removeTrack`**.
- Export: **`animationToSmil`**.

:::note
Several of these APIs are not yet listed in the library's `docs/09-api-publica.md`
— this page reflects the current export surface (the source of truth).
:::
