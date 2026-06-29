---
title: 'API: render'
description: Public API of @mosaicoo/svg-engine/render — the read-only SVG renderer component, viewport service and custom-shape registry.
---

`@mosaicoo/svg-engine/render` turns a node tree into actual SVG on screen. It is
**read-only** — no selection, editing or interaction (those live in
`svg-engine/edit`) — which makes it ideal as an **embedded viewer** in a
third-party app. Headless: no Angular Material/CDK.

```ts
import { SvgeRenderer, projectDocumentToRenderer } from '@mosaicoo/svg-engine/render';
```

## The renderer component

| API | Description | Use it to |
| --- | --- | --- |
| `SvgeRenderer` | The `<svge-renderer>` component. Inputs: `tree` (required `SvgNode`), `viewBox`, `width`, `height`, `ariaLabel`, `defs`. Exposes `svgElement()` to access the rendered `<svg>`. | Display a document (or any subtree) as an embedded, read-only viewer. |
| `projectDocumentToRenderer(doc)` | Returns `{ tree, viewBox }` from an `SvgDocument`, ready to bind to the renderer. | Wire an `SvgDocument` to `<svge-renderer>` in one step. |

```html
<svge-renderer [tree]="proj().tree" [viewBox]="proj().viewBox" [defs]="doc().defs ?? null" />
```

:::caution
If your document uses gradients, filters, patterns or other reusable definitions,
you **must** bind `[defs]` (e.g. `[defs]="doc.defs ?? null"`). Otherwise the
`url(#…)` references resolve to nothing and those paints disappear.
:::

## Viewport (pan & zoom)

| API | Description |
| --- | --- |
| `ViewportService` | Reactive pan/zoom state over a base content box, as Angular signals: `contentBox`, `zoom`, `panX`, `panY`, `minZoom`, `maxZoom`, `viewBox`, `fitScale`, `displayScale`. Call `setContentBox()`, `zoomIn()`, `zoomOut()`, `pan()`. |

`viewBox` is the visible window derived from `contentBox`/`zoom`/`pan`; use
`displayScale` (CSS pixels per document unit) when you need the on-screen 1:1
scale, e.g. to show a zoom percentage.

## Extending the renderer

| API | Description | Use it to |
| --- | --- | --- |
| `NodeRendererRegistry` | Registry of custom renderer components keyed by node `type`: `register(type, component)`, `unregister(type)`, `resolve(type)`, `registeredTypes()`. The 10 built-in types are dispatched directly; this is the extension point for **new** node types. | Render custom node types introduced by a plugin. |

## Coordinate & transform utilities

| API | Description |
| --- | --- |
| `screenToDoc(svg, clientX, clientY)` | Project a screen pixel into document user space by inverting the live `getScreenCTM()` (handles SSR/jsdom/missing-CTM gracefully). Returns a `Point` or `null`. |
| `renderTransformAttr(transform)` | Serialize a `Transform` for the SVG `transform` attribute (e.g. `matrix(1 0 0 1 10 20)`); returns `null` for identity. |

:::note
The per-type attribute-binding directives (`[svgeRect]`, `[svgePath]`, …) and the
`SvgeNodeRenderer` dispatcher are exported for advanced reuse, but the
`<svge-renderer>` component already wires them for you — you rarely need them
directly.
:::
