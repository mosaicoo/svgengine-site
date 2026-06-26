---
title: Architecture
description: How svg-engine is layered — the headless boundary, entry-point dependencies, consumption modes and core principles.
---

svg-engine is an Angular v21 workspace. The published library
(`@mosaicoo/svg-engine`) is split into **nine secondary entry points** so you can
consume exactly the layer you need, with real tree-shaking.

## The headless boundary

The central rule is that the headless layers never depend on a UI toolkit:

- `core`, `render`, `io`, `optimize`, `edit` and `ai/nlu` have **zero**
  dependency on `@angular/material` or `@angular/cdk`.
- Only `ui` and `ai/nlu-ui` may import Material/CDK — and both are opt-in.

This is what lets you embed the engine in a non-Material app (or even drive it
headlessly with no Angular UI at all) without pulling a UI stack into your
bundle.

## Entry-point dependencies

Each entry point only imports from the ones below it — there are no cycles:

```text
ai/nlu-ui → ai/nlu                       (+ @angular/material)
ai/nlu    → edit, core
ui        → edit, io, render, core       (+ @angular/material, @angular/cdk)
edit      → optimize, io, render, core
render    → core
io        → core
optimize  → core
core      → (no internal entry points; @angular/core + bundled polygon-clipping)
```

`@angular/material` and `@angular/cdk` are declared as **optional** peer
dependencies, so a headless consumer never has to install them.

## Four consumption modes

The library is designed for four distinct ways to consume it (all must keep
working independently):

| Mode | What you import | UI involved |
| --- | --- | --- |
| **1 — Headless** | `core` / `render` / `edit` services | None — you build your own UI (Angular, React, Vue, a CLI…) |
| **2 — Full shell** | `ui` (`<svge-shell-pro>` or `<svge-editor [shell]>`) | A complete professional editor, drop-in |
| **3 — Partial shell** | `ui` (individual components) | Pick toolbar + inspector + layers panel and compose your own layout |
| **4 — Canvas only** | `render` (`<svge-renderer>`) + optional gestures | Just the canvas with pan/zoom, no panels |

## Core principles

- **Immutable model.** Every mutation produces a new tree (structural sharing).
  Undo is snapshot-and-replay, not a fragile delta system.
- **Signal-first.** Reactive state is `signal`/`computed`; there are no RxJS
  Subjects in the public API.
- **Command pattern.** Every mutation routes through a single `CommandBus`, so
  undo/redo is automatic and consistent.
- **OnPush everywhere.** Every component uses
  `ChangeDetectionStrategy.OnPush`.
- **Tree-shakeable surface.** Each entry point exposes a single `public-api`;
  internals never leak.

## How functionality is registered

Inside `edit`, **capability registries** (tools, menus, shortcuts, palettes,
effects, …) hold the editor's functionality. Components in `ui` only **read**
those registries; plugins **populate** them. No UI component has a hardcoded list
of tools or menu items — everything appears through dynamic registration. This is
the foundation of the [plugin system](/svgengine-site/guides/plugins/).

:::note
See the [Entry points](/svgengine-site/reference/entry-points/) reference for a
per-entry-point breakdown, and the
[library repository](https://github.com/mosaicoo/svg-engine) for the full
dependency graph.
:::
