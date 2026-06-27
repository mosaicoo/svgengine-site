---
title: Primeiros passos
description: Instale o svg-engine e renderize seu primeiro SVG.
---

## Instalação

A library é publicada no npm como o pacote escopado `@mosaicoo/svg-engine`:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Peer dependencies de UI (apenas se for consumir `@mosaicoo/svg-engine/ui`):

```bash
npm install @angular/material@^21 @angular/cdk@^21
```

## Viewer read-only (exemplo)

```ts
import { Component } from '@angular/core';
import { SvgeRenderer } from '@mosaicoo/svg-engine/render';
import { createRect, createGroup, type SvgDocument } from '@mosaicoo/svg-engine/core';

@Component({
  standalone: true,
  imports: [SvgeRenderer],
  template: `<svge-renderer [tree]="doc.root" [viewBox]="doc.viewBox" />`,
})
export class MyViewer {
  protected readonly doc: SvgDocument = {
    id: 'demo' as never,
    viewBox: { x: 0, y: 0, width: 200, height: 100 },
    root: createGroup([
      createRect({ x: 10, y: 10, width: 80, height: 60 }, { style: { fill: '#90caf9' } }),
    ]),
  };
}
```

:::note
Este é um renderer read-only — nenhuma UI Material e nenhum serviço de edição são
carregados. A API pública completa está documentada no
[repositório da library](https://github.com/mosaicoo/svg-engine).
:::

## Adicione um seletor de arquivo SVG

Adicione o plugin de IO e use o registry de importadores para carregar um
arquivo. A importação é sanitizada automaticamente — `<script>`, handlers `on*`
e hrefs `javascript:` são removidos.

```ts
// app.config.ts
import { provideSvgEnginePlugin, builtinIoPlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(builtinIoPlugin)];

// qualquer componente
private readonly importers = inject(ImporterRegistry); // de @mosaicoo/svg-engine/io
async loadFile(file: File) {
  const importer = this.importers.byMediaType('image/svg+xml');
  const result = importer?.import(await file.text());
  if (result?.ok) this.state.resetDocument(result.document);
}
```

## Editor completo (shell)

Para o editor drop-in com estilo Material, use `<svge-editor>` (ou
`<svge-shell-pro>` para o layout profissional). Ele compõe toolbar, background e
renderer, e projeta os overlays via `<ng-content>` para você controlar quais
gestos ficam ativos.

```ts
import { SvgeEditor } from '@mosaicoo/svg-engine/ui';
```

```html
<svge-editor [title]="'My drawing'">
  <svg:g svgeSelectionOverlay></svg:g>
  <svg:g svgeRotationPivot></svg:g>
  <svg:g svgeMarquee></svg:g>
  <svg:g svgeSnapGuides></svg:g>
</svge-editor>
```

## A seguir

- [Arquitetura](/svgengine-site/pt/guides/architecture/) — a fronteira headless
  e os quatro modos de consumo.
- [Entry points](/svgengine-site/pt/reference/entry-points/) — o que cada entry
  point contém.
- [Plugins](/svgengine-site/pt/guides/plugins/) — estenda o editor sem fork do
  core.
