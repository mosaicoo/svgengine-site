---
title: Ejemplos
description: Recetas de código copy-paste para integraciones comunes de svg-engine.
---

Recetas rápidas para las formas más comunes de integrar svg-engine. Para un
recorrido guiado, mira [Primeros pasos](/svgengine-site/es/guides/getting-started/).

## Visor read-only

Renderiza un documento SVG sin servicios de edición y sin Material:

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

## Cargar un archivo SVG

Añade el plugin de IO e importa un archivo (sanitizado automáticamente):

```ts
// app.config.ts
import { provideSvgEnginePlugin, builtinIoPlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(builtinIoPlugin)];

// cualquier componente
private readonly importers = inject(ImporterRegistry); // de @mosaicoo/svg-engine/io
async loadFile(file: File) {
  const importer = this.importers.byMediaType('image/svg+xml');
  const result = importer?.import(await file.text());
  if (result?.ok) this.state.resetDocument(result.document);
}
```

## Editor completo (shell)

Coloca el editor con estilo Material:

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
Mira [Entry points](/svgengine-site/es/reference/entry-points/) para saber qué
contiene cada paquete, y la [demo en vivo](/svgengine-site/es/demo/) para el
editor completo en acción.
:::
