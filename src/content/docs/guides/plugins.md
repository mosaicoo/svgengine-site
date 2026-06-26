---
title: Plugins
description: Extend svg-engine without forking the core — the EditorPlugin contract, capability registries and a first plugin.
---

Third parties extend svg-engine by contributing to **capability registries** —
no core changes, no fork. A plugin is a plain `EditorPlugin` object with a single
required hook, `install(ctx)`.

## In one sentence

A plugin receives a `PluginContext` with access to the Angular `Injector` and a
`track(disposable)` helper; it uses those to register contributions on the
registries; each `register()` returns a `Disposable` that `track` schedules for
automatic cleanup on uninstall.

## Minimal anatomy

```ts
import {
  type EditorPlugin,
  type PluginContext,
  PLUGIN_API_VERSION,
} from '@mosaicoo/svg-engine/edit';

export const myPlugin: EditorPlugin = {
  id: 'com.acme.my-plugin', // reverse-DNS recommended, unique in the registry
  name: 'My plugin',
  version: '1.0.0',
  apiVersion: PLUGIN_API_VERSION, // checked at install time

  install(ctx: PluginContext): void {
    // register contributions here
  },

  // Optional — runs before the tracked disposables are torn down.
  uninstall(_ctx: PluginContext): void {},
};
```

Provision it at bootstrap:

```ts
// app.config.ts
import { provideSvgEnginePlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(myPlugin)];
```

`provideSvgEnginePlugin` is a `multi` provider run via `ENVIRONMENT_INITIALIZER`,
so plugins install in declaration order.

## The PluginContext

```ts
interface PluginContext {
  readonly pluginId: string; // === plugin.id
  readonly injector: Injector; // raw Angular DI — grab any service
  track<T extends Disposable>(d: T): T; // returns d, so you can chain
}
```

The one-liner you'll use most of the time:

```ts
install(ctx) {
  ctx.track(ctx.injector.get(SomeRegistry).register(myContribution));
}
```

Read it as: get the registry, register the contribution, track it for automatic
cleanup.

## Example — register a shortcut

```ts
import type { EditorPlugin, PluginContext } from '@mosaicoo/svg-engine/edit';
import { PLUGIN_API_VERSION, ShortcutRegistry } from '@mosaicoo/svg-engine/edit';

export const myShortcutPlugin: EditorPlugin = {
  id: 'com.acme.shortcuts',
  name: 'Custom shortcuts',
  version: '1.0.0',
  apiVersion: PLUGIN_API_VERSION,

  install(ctx: PluginContext): void {
    const shortcuts = ctx.injector.get(ShortcutRegistry);
    ctx.track(
      shortcuts.register({
        id: 'com.acme.shortcuts.duplicate',
        combo: 'CmdOrCtrl+D',
        description: 'Duplicate selection',
        run: (event) => {
          event.preventDefault();
          // do the real work via ctx.injector.get(CommandBus), etc.
        },
      }),
    );
  },
};
```

Combos accept cross-platform `CmdOrCtrl` plus tokens like `Shift`, `Alt`,
`ArrowUp`, `Escape`, `F5`. Unknown tokens throw at `register()` so mistakes
surface early.

## Plugin categories

Every registry follows the same shape — `register(entry): Disposable` — so
uninstall reverses every contribution automatically.

| Category | Registry |
| --- | --- |
| Node renderers | `NodeRendererRegistry` |
| Tools | `ToolRegistry` |
| Optimizers | `OptimizerRegistry` |
| Importers | `ImporterRegistry` |
| Exporters | `ExporterRegistry` |
| Effects / filters | `EffectRegistry` |
| Libraries (assets) | `LibraryRegistry` |
| Palettes / swatches | `PaletteRegistry` |
| Menus + shortcuts | `MenuContributionRegistry` + `ShortcutRegistry` |
| Natural-language intents | `NaturalLanguageService` |
| Code generators | `CodeGeneratorRegistry` |
| Tool options panels | `ToolOptionsRegistry` |

:::note
More recipes (tools, importers, exporters, effects) are covered in the
[library repository](https://github.com/mosaicoo/svg-engine). The library also
ships a plugin manager and an opt-in loader for trusted external plugins.
:::
