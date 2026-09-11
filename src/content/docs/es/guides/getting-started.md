---
title: Primeros pasos
description: Instala svg-engine y renderiza tu primer SVG.
---

## Instalación

La biblioteca se publica en npm como el paquete con scope `@mosaicoo/svg-engine`:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Los entry points `core`, `render`, `io`, `optimize`, `edit` y `ai/nlu` son
headless — el comando de arriba basta. La capa de UI Material (`ui` y `ai/nlu-ui`)
tiene peer dependencies extra:

```bash
npm install @angular/material@^21 @angular/cdk@^21 @angular/animations@^21
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
Este es un renderer de solo lectura — no se carga UI Material ni servicios de
edición. La API pública completa está documentada en la
[referencia de API](/svgengine-site/es/reference/api/).
:::

## Añade un selector de archivo SVG

Añade el plugin de IO y usa el registry de importadores para cargar un archivo. La
importación se sanea automáticamente — `<script>`, handlers `on*` y hrefs
`javascript:` se descartan.

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

## Configura la UI Material

Los entry points `ui` y `ai/nlu-ui` renderizan componentes de Angular Material. El
paquete **no trae CSS**, así que la aplicación anfitriona debe proporcionar dos
cosas — de lo contrario el editor se renderiza sin estilo.

### 1. Providers

Registra el provider de animaciones y los plugins integrados del engine en la
config de la aplicación. Llama a los builtins headless del editor **antes** que los
builtins de UI — el orden importa.

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSvgEngineEditorBuiltins } from '@mosaicoo/svg-engine/edit';
import { provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    ...provideSvgEngineEditorBuiltins(), // headless: tools, io, optimize, effects, menús, teclado
    ...provideSvgeUiBuiltins(),          // capa Material: tool options + diálogos (después de los builtins)
  ],
};
```

### 2. Un tema Material 3

Los componentes de UI leen los tokens de diseño `--mat-sys-*` producidos por un
tema Material 3. La forma más rápida es importar un tema prebuilt en tu hoja de
estilos global:

```css
/* styles.css */
@import '@angular/material/prebuilt-themes/azure-blue.css';
```

O define tu propio tema con el mixin `mat.theme` en un archivo SCSS global:

```scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (primary: mat.$azure-palette, theme-type: light),
    typography: Roboto,
    density: 0,
  ));
}
```

:::caution[Aplica el tema también al overlay container]
Menús, selects, diálogos y tooltips se renderizan en el **CDK overlay container**,
que Angular añade al `<body>` — fuera del DOM de tu editor. Un tema aplicado a una
raíz global (`html`/`body`, como arriba) lo cubre automáticamente. Si en cambio
acotas el tema a un selector wrapper, aplícalo también al `.cdk-overlay-container`,
o esas superficies se renderizarán sin estilo.
:::

## Editor completo (shell)

Para el editor drop-in, usa `<svge-editor>` (o `<svge-shell-pro>` para el layout
profesional completo). Compone toolbar, background y renderer, y proyecta los
overlays vía `<ng-content>` para que controles qué gestos quedan activos.

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
- [Referencia de API](/svgengine-site/es/reference/api/) — cada API pública por
  entry point.
- [Plugins](/svgengine-site/es/guides/plugins/) — extiende el editor sin hacer
  fork del core.
