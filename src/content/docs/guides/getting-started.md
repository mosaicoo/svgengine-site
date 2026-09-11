---
title: Getting started
description: Install svg-engine and render your first SVG.
---

## Installation

The library is published on npm as the scoped package `@mosaicoo/svg-engine`:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

The `core`, `render`, `io`, `optimize`, `edit` and `ai/nlu` entry points are
headless — the command above is all they need. The Material UI tier (`ui` and
`ai/nlu-ui`) has extra peer dependencies:

```bash
npm install @angular/material@^21 @angular/cdk@^21 @angular/animations@^21
```

## Read-only viewer (example)

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
This is a read-only renderer — no Material UI and no editing services are
loaded. The full public API is documented in the
[API reference](/svgengine-site/reference/api/).
:::

## Add an SVG file picker

Drop in the IO plugin and use the importer registry to load a file. Importing is
sanitized automatically — `<script>`, `on*` handlers and `javascript:` hrefs are
dropped.

```ts
// app.config.ts
import { provideSvgEnginePlugin, builtinIoPlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(builtinIoPlugin)];

// any component
private readonly importers = inject(ImporterRegistry); // from @mosaicoo/svg-engine/io
async loadFile(file: File) {
  const importer = this.importers.byMediaType('image/svg+xml');
  const result = importer?.import(await file.text());
  if (result?.ok) this.state.resetDocument(result.document);
}
```

## Set up the Material UI

The `ui` and `ai/nlu-ui` entry points render Angular Material components. The
package ships **no CSS**, so the host application must provide two things or the
editor renders unstyled.

### 1. Providers

Register the animations provider and the engine's built-in plugins in your
application config. Call the headless editor builtins **before** the UI builtins
— the order matters.

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSvgEngineEditorBuiltins } from '@mosaicoo/svg-engine/edit';
import { provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    ...provideSvgEngineEditorBuiltins(), // headless: tools, io, optimize, effects, menus, keyboard
    ...provideSvgeUiBuiltins(),          // Material tier: tool options + dialogs (after the builtins)
  ],
};
```

### 2. A Material 3 theme

The UI components read the `--mat-sys-*` design tokens produced by a Material 3
theme. The quickest way is to import a prebuilt theme in your global stylesheet:

```css
/* styles.css */
@import '@angular/material/prebuilt-themes/azure-blue.css';
```

Or define your own theme with the `mat.theme` mixin in a global SCSS file:

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

:::caution[Theme the overlay container too]
Menus, selects, dialogs and tooltips render in the **CDK overlay container**,
which Angular appends to `<body>` — outside your editor's DOM. A theme applied to
a global root (`html`/`body`, as above) covers it automatically. If you instead
scope the theme to a wrapper selector, apply it to `.cdk-overlay-container` as
well, or those surfaces will render unstyled.
:::

## Full editor shell

For the drop-in editor, use `<svge-editor>` (or `<svge-shell-pro>` for the full
professional layout). It composes the toolbar, background and renderer, and
projects overlays via `<ng-content>` so you control which gestures are enabled.

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

## Next steps

- [Architecture](/svgengine-site/guides/architecture/) — the headless boundary
  and the four consumption modes.
- [Entry points](/svgengine-site/reference/entry-points/) — what each entry point
  contains.
- [API reference](/svgengine-site/reference/api/) — every public API by entry
  point.
- [Plugins](/svgengine-site/guides/plugins/) — extend the editor without forking
  the core.
