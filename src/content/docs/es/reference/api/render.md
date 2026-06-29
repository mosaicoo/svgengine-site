---
title: 'API: render'
description: API pública de @mosaicoo/svg-engine/render — el componente renderer SVG read-only, el servicio de viewport y el registry de formas personalizadas.
---

`@mosaicoo/svg-engine/render` convierte un árbol de nodos en SVG real en pantalla.
Es **read-only** — sin selección, edición ni interacción (eso vive en
`svg-engine/edit`) — lo que lo hace ideal como **visor embebible** en una app de
terceros. Headless: sin Angular Material/CDK.

```ts
import { SvgeRenderer, projectDocumentToRenderer } from '@mosaicoo/svg-engine/render';
```

## El componente renderer

| API | Descripción | Úsalo para |
| --- | --- | --- |
| `SvgeRenderer` | El componente `<svge-renderer>`. Inputs: `tree` (`SvgNode` obligatorio), `viewBox`, `width`, `height`, `ariaLabel`, `defs`. Expone `svgElement()` para acceder al `<svg>` renderizado. | Mostrar un documento (o cualquier subárbol) como visor embebible de solo lectura. |
| `projectDocumentToRenderer(doc)` | Devuelve `{ tree, viewBox }` de un `SvgDocument`, listo para enlazar al renderer. | Conectar un `SvgDocument` al `<svge-renderer>` en un solo paso. |

```html
<svge-renderer [tree]="proj().tree" [viewBox]="proj().viewBox" [defs]="doc().defs ?? null" />
```

:::caution
Si el documento usa gradientes, filtros, patterns u otras definiciones
reutilizables, **debes** enlazar `[defs]` (p. ej. `[defs]="doc.defs ?? null"`). De
lo contrario las referencias `url(#…)` no resuelven nada y esos rellenos desaparecen.
:::

## Viewport (pan & zoom)

| API | Descripción |
| --- | --- |
| `ViewportService` | Estado reactivo de pan/zoom sobre una content box base, como signals de Angular: `contentBox`, `zoom`, `panX`, `panY`, `minZoom`, `maxZoom`, `viewBox`, `fitScale`, `displayScale`. Métodos `setContentBox()`, `zoomIn()`, `zoomOut()`, `pan()`. |

`viewBox` es la ventana visible derivada de `contentBox`/`zoom`/`pan`; usa
`displayScale` (píxeles CSS por unidad de documento) cuando necesites la escala
física 1:1 en pantalla, p. ej. para mostrar el porcentaje de zoom.

## Extendiendo el renderer

| API | Descripción | Úsalo para |
| --- | --- | --- |
| `NodeRendererRegistry` | Registry de componentes de renderizado personalizados, indexados por el `type` del nodo: `register(type, component)`, `unregister(type)`, `resolve(type)`, `registeredTypes()`. Los 10 tipos integrados se despachan directamente; este es el punto de extensión para tipos **nuevos**. | Renderizar tipos de nodo personalizados introducidos por un plugin. |

## Utilidades de coordenada & transform

| API | Descripción |
| --- | --- |
| `screenToDoc(svg, clientX, clientY)` | Proyecta un píxel de pantalla al espacio de usuario del documento invirtiendo el `getScreenCTM()` en vivo (maneja bien SSR/jsdom/CTM ausente). Devuelve un `Point` o `null`. |
| `renderTransformAttr(transform)` | Serializa un `Transform` para el atributo `transform` de SVG (p. ej. `matrix(1 0 0 1 10 20)`); devuelve `null` en la identidad. |

:::note
Las directivas de binding por tipo (`[svgeRect]`, `[svgePath]`, …) y el dispatcher
`SvgeNodeRenderer` se exportan para reuso avanzado, pero el componente
`<svge-renderer>` ya las conecta por ti — rara vez las necesitarás directamente.
:::
