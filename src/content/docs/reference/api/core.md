---
title: 'API: core'
description: Public API of @mosaicoo/svg-engine/core — the headless engine for building, mutating and querying an SVG document programmatically.
---

`@mosaicoo/svg-engine/core` is the **headless engine**. It has no dependency on
`@angular/material` or `@angular/cdk`, so you can use it in a full editor, a
read-only viewer, a Node/SSR pipeline or a CLI — anywhere you need to build,
mutate and query an SVG document programmatically.

```ts
import {
  createEmptyDocument, createRect,
  EditorStateService, CommandBus, InsertNodeCommand, AUTO_PARENT,
} from '@mosaicoo/svg-engine/core';
```

## How it fits together

The data model is **immutable**: factories and tree operations always return new
objects. You never mutate the document directly — instead you **dispatch
commands** through the `CommandBus`, which applies the change and records it for
undo/redo. The current document lives in `EditorStateService` as Angular signals.

```ts
const state = inject(EditorStateService);
const bus = inject(CommandBus);

state.resetDocument(createEmptyDocument({ width: 800, height: 600 }));

const rect = createRect({ x: 10, y: 10, width: 120, height: 80 });
bus.dispatch(new InsertNodeCommand(rect, AUTO_PARENT)); // undoable
bus.undo();
```

## Document & state services

The services are Angular `@Injectable`s — inject them where you need them.

| API | Description | Use it to |
| --- | --- | --- |
| `EditorStateService` | Single source of truth for the edited document, exposed as readonly signals (`document`, `dirty`, `nodeCount`, `allNodes`). | Read the current document reactively; seed/replace it with `resetDocument()` / `setDocument()`; `markClean()` after a save. |
| `CommandBus` | The one gateway for **all** mutations. `dispatch(command)` runs the change and records history; also `undo()`, `redo()`, `goto(depth)`. | Apply any change to the document with undo/redo support. |
| `HistoryService` | The undo/redo bookkeeping behind the bus: `undoStack`, `redoStack`, `canUndo`, `canRedo`, `setMaxSize()`. | Drive undo/redo UI state and cap history depth. |
| `createEmptyDocument(options?)` | Build a fresh, empty `SvgDocument` with a root group. | Create the initial document to seed `EditorStateService`. |
| `SvgDocument` | The immutable top-level container: `viewBox`, optional `width`/`height`, the editable `root` tree, `defs`, `exportPreferences`. | The type you read from `state.document()` and pass to renderers/exporters. |
| `CreateDocumentOptions` / `DEFAULT_VIEW_BOX` | Options (`viewBox`, `width`, `height`) for `createEmptyDocument`, and the 800×600 fallback viewBox. | Configure the initial canvas size. |

## Building nodes

Every shape is created with a factory. All accept a shared `NodeFactoryOptions`
(`id?`, `transform?`, `style?`, `metadata?`); shapes default to `DEFAULT_STYLE`,
groups to `EMPTY_STYLE`.

| Factory | Creates |
| --- | --- |
| `createRect({ x, y, width, height, rx?, ry? })` | A rectangle (optionally rounded). |
| `createEllipse({ cx, cy, rx, ry })` | An ellipse / circle. |
| `createLine({ x1, y1, x2, y2 })` | A straight line. |
| `createPolygon(points)` / `createPolyline(points)` | A closed polygon / open polyline from a list of `Point`s. |
| `createPath(d)` | A path from an SVG `d` string. |
| `createText({ x, y, content, fontSize?, fontFamily?, ... })` | A text element. |
| `createImage({ x, y, width, height, href })` | A raster `<image>`. |
| `createGroup(children?)` | A container group (the building block of layers, pages and smart objects). |
| `createSymbolUse({ symbolId, x, y })` | An instance of a registered symbol (`<use href="#…">`). |

## The node model

| API | Description |
| --- | --- |
| `SvgNode` | Discriminated union of every node type; the `type` field narrows to the concrete shape (`RectNode`, `PathNode`, `GroupNode`, …). |
| `SvgNodeBase` | The fields every node shares: `id`, `transform`, `style`, `metadata` (all `readonly`). |
| `SvgNodeType` / `SVG_NODE_TYPES` | The literal union (and tuple) of valid `type` discriminators. |
| `isGroupNode(node)` | Type guard narrowing a node to `GroupNode`. |

## Reading & transforming the tree

Pure functions over the immutable tree — each returns a **new** root with
structural sharing (only the path to the changed node is reallocated).

| API | Description |
| --- | --- |
| `findNodeById(root, id)` | Find a node by id, or `null`. |
| `findParent(root, childId)` | Find a node's parent group, or `null`. |
| `walk(root, visitor)` / `collectNodes(root)` / `countNodes(root)` | Traverse, flatten or count the tree. |
| `insertNode(root, parentId, node, index?)` | Return a new tree with `node` inserted (throws on duplicate id). |
| `removeNode(root, id)` | Return a new tree with the node removed. |
| `updateNode(root, id, updater)` | Return a new tree with the node replaced by `updater(node)` (same `id`/`type` enforced). |
| `cloneNodeWithNewIds(node)` | Deep-clone a subtree with fresh ids (e.g. for duplication). |

:::tip
These functions are the low-level primitives. For **undoable** edits in an editor,
prefer the equivalent commands (below) over calling these directly.
:::

## Geometry & transforms

| API | Description |
| --- | --- |
| `Point` / `ORIGIN` | An immutable 2D point; `{x:0, y:0}`. |
| `BoundingBox` + `bbox(x,y,w,h)` | An axis-aligned box and its constructor. |
| `unionBBox(a,b)` / `intersectsBBox(a,b)` / `containsPoint(box,x,y)` | Combine boxes, test overlap, test point containment (used e.g. for hit-testing and viewport culling). |
| `getNodeBBox(node)` / `getNodesWorldBBox(nodes)` | Compute a node's bounding box (and the union for a selection). |
| `Transform` / `IDENTITY_TRANSFORM` | The immutable 6-element affine matrix matching SVG's `matrix(a,b,c,d,e,f)`. |
| `translate` / `scale` / `rotate` / `skewX` / `skewY` | Build the common transforms (rotation/skew in radians). |
| `multiply(a,b)` / `invert(m)` / `applyTransform(m,x,y)` | Compose, invert, and apply a transform to a point. |
| `parseTransformAttr(attr)` | Parse an SVG `transform` attribute string into a `Transform`. |

## Identity & style types

| API | Description |
| --- | --- |
| `NodeId` + `toNodeId(s)` / `generateNodeId()` | The branded node-id type; coerce an external string, or mint a fresh unique id. |
| `SvgStyle` / `EMPTY_STYLE` / `DEFAULT_STYLE` | The subset of SVG presentation attributes treated as style, plus the empty and default-shape presets. |
| `SvgMetadata` / `EMPTY_METADATA` | Editor-facing per-node metadata: `name`, `locked`, `visible`, `customData`. |
| `Disposable` | The cleanup contract returned by every registry `register*()` call, so plugins can undo their contributions. |

## Commands — the mutation vocabulary

Commands are plain classes: construct one with its data and `bus.dispatch()` it.
Each is reversible (undo/redo). `Command`, `CommandContext`, `CommandResult` and
the `ok()` / `fail()` helpers form the contract; `AUTO_PARENT` tells insertion
commands to use the current implicit parent.

**Structure & ordering**

| Command | Does |
| --- | --- |
| `InsertNodeCommand` / `RemoveNodeCommand` | Add or remove a node. |
| `MoveNodeCommand` / `MoveNodeInTreeCommand` | Move a node by offset, or re-parent it in the tree. |
| `ReorderNodeCommand` (`ReorderDirection`) | Change z-order (raise/lower/front/back). |
| `DuplicateNodeCommand` | Duplicate a node with new ids. |
| `GroupSelectionCommand` / `UngroupCommand` | Group a selection / ungroup a group. |
| `TranslateManyCommand` | Move many nodes at once. |

**Transform**

| Command | Does |
| --- | --- |
| `ResizeNodeCommand` / `ResizeNodesCommand` | Resize one or many nodes (scale baked into geometry). |
| `RotateNodeCommand` / `RotateNodesCommand` | Rotate around a pivot. |
| `SkewNodeCommand` / `SkewNodesCommand` | Shear across X/Y around a pivot. |
| `FlipNodeCommand` (`FlipAxis`) | Mirror horizontally/vertically. |

**Properties**

| Command | Does |
| --- | --- |
| `SetPropertyCommand` / `SetPropertyOnManyCommand` | Set a geometry/attribute property on one or many nodes. |
| `SetStylePropertyOnManyCommand` | Set a style property (fill, stroke, …) across a selection. |
| `SetCornerRadiusCommand` | Set the non-destructive live-corner radius on a path. |
| `SetCustomAttrCommand` / `RenameCustomAttrCommand` / `RemoveCustomAttrCommand` | Undoable CRUD for custom `data-*` attributes. |

**Pathfinder (booleans) & paths**

| Command | Does |
| --- | --- |
| `UnionCommand` / `SubtractCommand` / `IntersectCommand` / `ExcludeCommand` / `DivideCommand` | Boolean operations on shapes. |
| `MakeLiveBooleanCommand` / `RefreshLiveBooleanCommand` / `ReleaseLiveBooleanCommand` | Non-destructive ("live") booleans you can re-edit later. |
| `MakeCompoundPathCommand` / `ReleaseCompoundPathCommand` | Combine/release a compound path. |
| `ConvertNodeToPathCommand` / `BatchConvertToPathCommand` | Convert shapes to editable paths. |
| `ReversePathCommand` / `SimplifyPathCommand` / `CleanUpPathCommand` / `JoinPathsCommand` / `SplitPathCommand` / `OffsetPathCommand` / `OutlineStrokeCommand` | The Path-menu operations. |
| `KnifeCutPathCommand` | Cut a path/shape into two along a knife stroke. |
| `RasterizeNodeCommand` | Replace a vector node with a raster `<image>`. |

**Pages, layers & smart objects**

| Command | Does |
| --- | --- |
| `CreatePageCommand` / `DeletePageCommand` / `RenamePageCommand` / `ResizePageCommand` / `MovePageCommand` / `SetPageOptionsCommand` / `EnsureDefaultPageCommand` | Manage pages / artboards. |
| `CreateLayerCommand` / `MakeLayerCommand` / `UnmakeLayerCommand` | Manage logical layers. |
| `MakeSmartObjectCommand` / `ReleaseSmartObjectCommand` / `EditSmartObjectContentsCommand` / `ReplaceSmartObjectContentsCommand` | Manage smart objects. |
| `MakeClipMaskCommand` / `ReleaseClipMaskCommand` | Apply / release a clip path or opacity mask. |

**Animation** (see the animation model below)

| Command | Does |
| --- | --- |
| `AddKeyframeCommand` / `MoveKeyframeCommand` / `RemoveKeyframeCommand` / `SetKeyframeEasingCommand` | Edit keyframes on the page animation. |
| `SetAnimationDurationCommand` / `RemoveTrackCommand` | Set duration / remove a track. |
| `RestoreSnapshotCommand` | Restore the document to a saved snapshot (see below). |

## History snapshots

Named, restorable checkpoints of the whole document (think Photoshop's History &
Snapshots). The service is **per-editor**, not global.

| API | Description |
| --- | --- |
| `SnapshotsService` | Manage the snapshot collection: `take()`, `restore()`, `rename()`, `delete()`, `setLimits()`, plus `snapshots`/`count`/`currentSnapshotId` signals. |
| `Snapshot` / `SnapshotSource` | A checkpoint (`name`, `createdAt`, cloned `document`, `thumbnail`, `source`) and how it was created (`manual`, `auto-open`, …). |
| `SnapshotsLimits` / `DEFAULT_SNAPSHOT_LIMITS` | Tunable bounds (`maxCount`, `autoOnOpen`, `autoOnDestructive`) and their conservative defaults. |

## Animation model

A pure, headless animation model (no UI). It is the shared contract that both the
timeline preview and the SMIL export build on.

| API | Description |
| --- | --- |
| `AnimationDoc` / `AnimationTrack` / `Keyframe` / `EasingSpec` | The immutable animation document, its tracks, keyframes and easing. |
| `emptyAnimationDoc()` / `readAnimationDoc(node)` / `isAnimationDoc(v)` | Create, read and type-check the animation attached to a page. |
| `upsertKeyframe` / `moveKeyframe` / `removeKeyframe` / `removeTrack` / `setKeyframeEasing` / `setAnimationDuration` | Immutable editing helpers (the commands above wrap these). |
| `sampleAnimation(doc, t)` / `sampleTrack` / `applyAnimationToTree(root, doc, t)` | Sample values at a time `t` and produce the animated tree for preview. |
| `animatablePropertiesForNode(node)` / `findAnimatableProperty` / `readAnimatableValue` | The catalog of animatable properties per node type (the timeline rows). |
| `animationToSmil(doc)` | Serialize the animation to SVG SMIL `<animate>` elements for export. |
| `evalEasing` / `easingControlPoints` / `DEFAULT_EASING` | Easing evaluation and presets. |

:::note
`core` also exports lower-level geometry primitives (path parsing/serialization,
stroke outlining, scale-baking, anchor manipulation) that exist to back the
commands above. They are advanced building blocks rather than everyday APIs — in
an editor, prefer the commands. The
[library repository](https://github.com/mosaicoo/svg-engine) is authoritative for
exact signatures.
:::
