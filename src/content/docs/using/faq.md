---
title: FAQ
description: Frequently asked questions about svg-engine.
---

## Is svg-engine open source?

Yes. It's licensed **Apache-2.0**, developed on
[GitHub](https://github.com/mosaicoo/svg-engine) and published on npm as
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).

## Is it production-ready?

It's **pre-1.0** (the `0.1.x` line) — the public API is still hardening. It's
usable today, but expect changes before `1.0.0`.

## What do I need to use it?

**Angular v21.** Install the package alongside Angular:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Material and CDK are only needed if you consume the `ui` layer.

## Do I have to use Angular Material?

**No.** The headless layers (`core`, `render`, `io`, `optimize`, `edit`) have
zero dependency on `@angular/material` or `@angular/cdk`. Only the `ui` (and
`ai/nlu-ui`) layer uses Material, and it's opt-in. See
[Architecture](/svgengine-site/guides/architecture/).

## Can I use it without the full editor UI?

Yes. Use `render` for a read-only viewer, or `core`/`edit` headlessly to build
your own UI. See [Entry points](/svgengine-site/reference/entry-points/).

## Does it work outside Angular?

svg-engine is an **Angular library** — it's designed for Angular apps. The
headless engine still runs without any UI, but the packages are Angular packages.

## Can I extend it?

Yes — a [plugin system](/svgengine-site/guides/plugins/) lets you add tools,
importers/exporters, effects, palettes, menus, shortcuts and more without forking
the core.

## Does it support natural language or voice?

There's an **optional AI layer** (`ai/nlu`, `ai/nlu-ui`, `ai/nlu-voice-wasm`) for
natural-language commands and on-device voice. It's fully opt-in and decoupled
from the editor core.

## What can it import and export?

It imports **SVG** (sanitized on the way in) and exports **SVG** and **PNG**.

## How big is the bundle?

Entry points are independent and **tree-shakeable** — you ship only what you
import, from a small read-only viewer up to the full editor.

## Where can I try it?

The [live demo](/svgengine-site/demo/) runs the full editor in your browser.

## How do I report a bug or contribute?

Through the [GitHub repository](https://github.com/mosaicoo/svg-engine).
