---
title: 'API: render'
description: API pública de @mosaicoo/svg-engine/render — o renderer read-only, diretivas, viewport e registry.
---

`@mosaicoo/svg-engine/render` é o **renderer read-only**: recebe uma árvore de
`SvgNode` e a renderiza como SVG com componentes e diretivas standalone do
Angular. Não depende de Angular Material/CDK e serve como viewer embutido.

```ts
import { SvgeRenderer } from '@mosaicoo/svg-engine/render';
```

## Renderer top-level

- **`SvgeRenderer`** — o componente `<svge-renderer>`. Inputs: `tree`
  (o `SvgNode` a renderizar), `viewBox`, `width`, `height`, `ariaLabel` opcionais.
  Projeta `<ng-content>` para você sobrepor overlays dentro do mesmo `<svg>`.

## Dispatcher

- **`SvgeNodeRenderer`** / **`SvgNodeRendererComponent`** — o dispatcher
  `g[svgeNode]`: faz switch por `node.type`, recursa em grupos e cai no
  `NodeRendererRegistry` para tipos desconhecidos.

## Diretivas por tipo

Diretivas aplicadas a elementos SVG nativos (não componentes com selector de
custom element — isso quebraria a render tree do SVG). Exportadas para reuso
avançado:

- **`SvgeRectDirective`**, **`SvgeEllipseDirective`**, **`SvgeLineDirective`**,
  **`SvgePolygonDirective`**, **`SvgePolylineDirective`**, **`SvgePathDirective`**,
  **`SvgeTextDirective`**, **`SvgeImageDirective`**, **`SvgeSymbolUseDirective`**.

## Viewport

- **`ViewportService`** — estado de pan/zoom por signals (`zoom`, `panX`, `panY`,
  `contentBox`, `viewBox`) com APIs `pan`/`zoom`/`reset`/`fit`/`setZoomLimits`. O
  `<svge-renderer>` lê `viewport.viewBox()` quando nenhum `viewBox` é passado.

## Ponto de extensão por plugin

- **`NodeRendererRegistry`** — registra um renderer para um tipo de nó custom
  (**D-020**); o dispatcher o monta via `*ngComponentOutlet`.

## Utilitários

- **`renderTransformAttr(transform)`** — serializa um `Transform` para o atributo
  SVG `transform` (omite a identidade).
- **`screenToDoc(svg, clientX, clientY)`** — projeta pixels client (tela) em
  coordenadas de documento via `getScreenCTM().inverse()`.
- **`projectDocumentToRenderer(...)`** — helper para alimentar um `SvgDocument` no
  renderer.

:::note
Esta página lista a superfície pública completa de `render`. Para as assinaturas
exatas, veja o [repositório da library](https://github.com/mosaicoo/svg-engine).
:::
