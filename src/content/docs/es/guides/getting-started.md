---
title: Primeros pasos
description: Instala svg-engine y renderiza tu primer SVG.
---

## Instalación

La librería se publica en npm como el paquete con scope `@mosaicoo/svg-engine`:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Peer dependencies de UI (solo si consumes `@mosaicoo/svg-engine/ui`):

```bash
npm install @angular/material@^21 @angular/cdk@^21
```

## Visor read-only (ejemplo)

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
Es un renderer read-only — no se cargan UI Material ni servicios de edición. La
API pública completa está documentada en el
[repositorio de la librería](https://github.com/mosaicoo/svg-engine).
:::

## Añade un selector de archivos SVG

Añade el plugin de IO y usa el registry de importadores para cargar un archivo.
La importación se sanitiza automáticamente — `<script>`, handlers `on*` y hrefs
`javascript:` se eliminan.

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

Para el editor drop-in con estilo Material, usa `<svge-editor>` (o
`<svge-shell-pro>` para el layout profesional). Compone la toolbar, el fondo y el
renderer, y proyecta los overlays mediante `<ng-content>` para que controles qué
gestos están activos.

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

## Siguiente

- [Arquitectura](/svgengine-site/es/guides/architecture/) — la frontera headless
  y los cuatro modos de consumo.
- [Entry points](/svgengine-site/es/reference/entry-points/) — qué contiene cada
  entry point.
- [Plugins](/svgengine-site/es/guides/plugins/) — extiende el editor sin hacer
  fork del core.
