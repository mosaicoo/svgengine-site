---
title: Primeiros passos
description: Instale o svg-engine e renderize seu primeiro SVG.
---

## Instalação

A biblioteca é publicada no npm como o pacote escopado `@mosaicoo/svg-engine`:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Os entry points `core`, `render`, `io`, `optimize`, `edit` e `ai/nlu` são
headless — o comando acima basta. A camada de UI Material (`ui` e `ai/nlu-ui`) tem
peer dependencies extras:

```bash
npm install @angular/material@^21 @angular/cdk@^21 @angular/animations@^21
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
carregados. A API pública completa está documentada na
[referência de API](/svgengine-site/pt/reference/api/).
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

## Configure a UI Material

Os entry points `ui` e `ai/nlu-ui` renderizam componentes do Angular Material. O
pacote **não traz CSS**, então a aplicação hospedeira precisa fornecer duas
coisas — senão o editor renderiza sem estilo.

### 1. Providers

Registre o provider de animações e os plugins built-in do engine na config da
aplicação. Chame os builtins headless do editor **antes** dos builtins de UI — a
ordem importa.

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSvgEngineEditorBuiltins } from '@mosaicoo/svg-engine/edit';
import { provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    ...provideSvgEngineEditorBuiltins(), // headless: tools, io, optimize, effects, menus, teclado
    ...provideSvgeUiBuiltins(),          // camada Material: tool options + dialogs (depois dos builtins)
  ],
};
```

### 2. Um tema Material 3

Os componentes de UI leem os tokens de design `--mat-sys-*` produzidos por um tema
Material 3. O jeito mais rápido é importar um tema prebuilt na sua folha de estilos
global:

```css
/* styles.css */
@import '@angular/material/prebuilt-themes/azure-blue.css';
```

Ou defina seu próprio tema com o mixin `mat.theme` num arquivo SCSS global:

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

:::caution[Aplique o tema também no overlay container]
Menus, selects, dialogs e tooltips renderizam no **CDK overlay container**, que o
Angular acopla ao `<body>` — fora do DOM do seu editor. Um tema aplicado a uma raiz
global (`html`/`body`, como acima) o cobre automaticamente. Se em vez disso você
escopar o tema a um seletor wrapper, aplique-o também ao `.cdk-overlay-container`,
ou essas superfícies renderizam sem estilo.
:::

## Editor completo (shell)

Para o editor drop-in, use `<svge-editor>` (ou `<svge-shell-pro>` para o layout
profissional completo). Ele compõe toolbar, background e renderer, e projeta os
overlays via `<ng-content>` para você controlar quais gestos ficam ativos.

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
- [Referência de API](/svgengine-site/pt/reference/api/) — cada API pública por
  entry point.
- [Plugins](/svgengine-site/pt/guides/plugins/) — estenda o editor sem fork do
  core.
