---
title: 'API: render'
description: Public API of @mosaicoo/svg-engine/render — the read-only renderer, directives, viewport and registry.
---

`@mosaicoo/svg-engine/render` is the **read-only renderer**: it takes an
`SvgNode` tree and renders it as SVG with Angular standalone components and
directives. It has zero dependency on Angular Material/CDK and works as an
embedded viewer.

```ts
import { SvgeRenderer } from '@mosaicoo/svg-engine/render';
```

## Top-level renderer

- **`SvgeRenderer`** — the `<svge-renderer>` component. Inputs: `tree`
  (the `SvgNode` to render), optional `viewBox`, `width`, `height`, `ariaLabel`.
  Projects `<ng-content>` so you can layer overlays inside the same `<svg>`.

## Dispatcher

- **`SvgeNodeRenderer`** / **`SvgNodeRendererComponent`** — the `g[svgeNode]`
  dispatcher: switches on `node.type`, recurses into groups, and falls back to
  the `NodeRendererRegistry` for unknown types.

## Per-type directives

Directives applied to native SVG elements (not custom-element components — that
would break the SVG render tree). Exported for advanced reuse:

- **`SvgeRectDirective`**, **`SvgeEllipseDirective`**, **`SvgeLineDirective`**,
  **`SvgePolygonDirective`**, **`SvgePolylineDirective`**, **`SvgePathDirective`**,
  **`SvgeTextDirective`**, **`SvgeImageDirective`**, **`SvgeSymbolUseDirective`**.

## Viewport

- **`ViewportService`** — signal-based pan/zoom state (`zoom`, `panX`, `panY`,
  `contentBox`, `viewBox`) with `pan`/`zoom`/`reset`/`fit`/`setZoomLimits` APIs.
  `<svge-renderer>` reads `viewport.viewBox()` when no explicit `viewBox` input
  is given.

## Plugin extension point

- **`NodeRendererRegistry`** — register a renderer for a custom node type
  (**D-020**); the dispatcher mounts it via `*ngComponentOutlet`.

## Utilities

- **`renderTransformAttr(transform)`** — serialize a `Transform` to an SVG
  `transform` attribute (omits the identity).
- **`screenToDoc(svg, clientX, clientY)`** — project client (screen) pixels to
  document coordinates via `getScreenCTM().inverse()`.
- **`projectDocumentToRenderer(...)`** — helper to feed an `SvgDocument` into the
  renderer.

:::note
This page lists the full public surface of `render`. For exact signatures, see
the [library repository](https://github.com/mosaicoo/svg-engine).
:::
