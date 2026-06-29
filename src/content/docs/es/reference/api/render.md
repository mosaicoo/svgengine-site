---
title: 'API: render'
description: API pública de @mosaicoo/svg-engine/render — el renderer read-only, directivas, viewport y registry.
---

`@mosaicoo/svg-engine/render` es el **renderer read-only**: toma un árbol de
`SvgNode` y lo renderiza como SVG con componentes y directivas standalone de
Angular. No depende de Angular Material/CDK y sirve como visor embebido.

```ts
import { SvgeRenderer } from '@mosaicoo/svg-engine/render';
```

## Renderer top-level

- **`SvgeRenderer`** — el componente `<svge-renderer>`. Inputs: `tree`
  (el `SvgNode` a renderizar), `viewBox`, `width`, `height`, `ariaLabel`
  opcionales. Proyecta `<ng-content>` para superponer overlays dentro del mismo
  `<svg>`.

## Dispatcher

- **`SvgeNodeRenderer`** / **`SvgNodeRendererComponent`** — el dispatcher
  `g[svgeNode]`: hace switch por `node.type`, recursa en grupos y recurre al
  `NodeRendererRegistry` para tipos desconocidos.

## Directivas por tipo

Directivas aplicadas a elementos SVG nativos (no componentes con selector de
custom element — eso rompería el render tree del SVG). Exportadas para reuso
avanzado:

- **`SvgeRectDirective`**, **`SvgeEllipseDirective`**, **`SvgeLineDirective`**,
  **`SvgePolygonDirective`**, **`SvgePolylineDirective`**, **`SvgePathDirective`**,
  **`SvgeTextDirective`**, **`SvgeImageDirective`**, **`SvgeSymbolUseDirective`**.

## Viewport

- **`ViewportService`** — estado de pan/zoom por signals (`zoom`, `panX`, `panY`,
  `contentBox`, `viewBox`) con APIs `pan`/`zoom`/`reset`/`fit`/`setZoomLimits`. El
  `<svge-renderer>` lee `viewport.viewBox()` cuando no se pasa un `viewBox`.

## Punto de extensión por plugin

- **`NodeRendererRegistry`** — registra un renderer para un tipo de nodo custom
  (**D-020**); el dispatcher lo monta vía `*ngComponentOutlet`.

## Utilidades

- **`renderTransformAttr(transform)`** — serializa un `Transform` al atributo SVG
  `transform` (omite la identidad).
- **`screenToDoc(svg, clientX, clientY)`** — proyecta píxeles client (pantalla) a
  coordenadas de documento vía `getScreenCTM().inverse()`.
- **`projectDocumentToRenderer(...)`** — helper para alimentar un `SvgDocument` al
  renderer.

:::note
Esta página lista la superficie pública completa de `render`. Para las firmas
exactas, mira el [repositorio de la librería](https://github.com/mosaicoo/svg-engine).
:::
