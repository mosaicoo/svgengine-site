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
