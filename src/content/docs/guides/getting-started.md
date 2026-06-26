---
title: Getting started
description: Install svg-engine and render your first SVG.
---

## Installation

The library is published on npm as the scoped package `@mosaicoo/svg-engine`:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

UI peer dependencies (only if you consume `@mosaicoo/svg-engine/ui`):

```bash
npm install @angular/material@^21 @angular/cdk@^21
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
loaded. The full public API is documented in the library repository
(`docs/09-api-publica.md`).
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

## Full editor shell

For the Material-styled, drop-in editor, use `<svge-editor>` (or
`<svge-shell-pro>` for the professional layout). It composes the toolbar,
background and renderer, and projects overlays via `<ng-content>` so you control
which gestures are enabled.

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
- [Plugins](/svgengine-site/guides/plugins/) — extend the editor without forking
  the core.
