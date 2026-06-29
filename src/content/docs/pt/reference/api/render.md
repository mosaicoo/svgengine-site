---
title: 'API: render'
description: API pública de @mosaicoo/svg-engine/render — o componente renderer SVG read-only, o serviço de viewport e o registry de formas customizadas.
---

`@mosaicoo/svg-engine/render` transforma uma árvore de nós em SVG real na tela. É
**read-only** — sem seleção, edição ou interação (isso vive em
`svg-engine/edit`) — o que o torna ideal como **visualizador embedável** num app
de terceiros. Headless: sem Angular Material/CDK.

```ts
import { SvgeRenderer, projectDocumentToRenderer } from '@mosaicoo/svg-engine/render';
```

## O componente renderer

| API | Descrição | Use para |
| --- | --- | --- |
| `SvgeRenderer` | O componente `<svge-renderer>`. Inputs: `tree` (`SvgNode` obrigatório), `viewBox`, `width`, `height`, `ariaLabel`, `defs`. Expõe `svgElement()` para acessar o `<svg>` renderizado. | Exibir um documento (ou qualquer subárvore) como visualizador embedável read-only. |
| `projectDocumentToRenderer(doc)` | Retorna `{ tree, viewBox }` de um `SvgDocument`, pronto para vincular ao renderer. | Ligar um `SvgDocument` ao `<svge-renderer>` num único passo. |

```html
<svge-renderer [tree]="proj().tree" [viewBox]="proj().viewBox" [defs]="doc().defs ?? null" />
```

:::caution
Se o documento usa gradientes, filtros, patterns ou outras definições reutilizáveis,
você **precisa** vincular `[defs]` (ex.: `[defs]="doc.defs ?? null"`). Caso
contrário as referências `url(#…)` não resolvem nada e esses preenchimentos somem.
:::

## Viewport (pan & zoom)

| API | Descrição |
| --- | --- |
| `ViewportService` | Estado reativo de pan/zoom sobre uma content box base, como signals do Angular: `contentBox`, `zoom`, `panX`, `panY`, `minZoom`, `maxZoom`, `viewBox`, `fitScale`, `displayScale`. Métodos `setContentBox()`, `zoomIn()`, `zoomOut()`, `pan()`. |

`viewBox` é a janela visível derivada de `contentBox`/`zoom`/`pan`; use
`displayScale` (pixels CSS por unidade de documento) quando precisar da escala
física 1:1 na tela, p.ex. para mostrar a porcentagem de zoom.

## Estendendo o renderer

| API | Descrição | Use para |
| --- | --- | --- |
| `NodeRendererRegistry` | Registry de componentes de renderização customizados, indexados pelo `type` do nó: `register(type, component)`, `unregister(type)`, `resolve(type)`, `registeredTypes()`. Os 10 tipos built-in são despachados diretamente; este é o ponto de extensão para tipos **novos**. | Renderizar tipos de nó customizados introduzidos por um plugin. |

## Utilitários de coordenada & transform

| API | Descrição |
| --- | --- |
| `screenToDoc(svg, clientX, clientY)` | Projeta um pixel de tela no espaço de usuário do documento invertendo o `getScreenCTM()` ao vivo (lida bem com SSR/jsdom/CTM ausente). Retorna um `Point` ou `null`. |
| `renderTransformAttr(transform)` | Serializa um `Transform` para o atributo `transform` do SVG (ex.: `matrix(1 0 0 1 10 20)`); retorna `null` na identidade. |

:::note
As diretivas de binding por tipo (`[svgeRect]`, `[svgePath]`, …) e o dispatcher
`SvgeNodeRenderer` são exportados para reuso avançado, mas o componente
`<svge-renderer>` já as conecta para você — raramente precisará delas diretamente.
:::
