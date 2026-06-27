---
title: Exemplos
description: Receitas de código copy-paste para integrações comuns do svg-engine.
---

Receitas rápidas para as formas mais comuns de integrar o svg-engine. Para um
passo a passo guiado, veja [Primeiros passos](/svgengine-site/pt/guides/getting-started/).

## Viewer read-only

Renderize um documento SVG sem serviços de edição e sem Material:

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

## Carregar um arquivo SVG

Adicione o plugin de IO e importe um arquivo (sanitizado automaticamente):

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

Coloque o editor com estilo Material:

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

:::note
Veja [Entry points](/svgengine-site/pt/reference/entry-points/) para o que cada
pacote contém, e a [demo ao vivo](/svgengine-site/pt/demo/) para o editor
completo em ação.
:::
