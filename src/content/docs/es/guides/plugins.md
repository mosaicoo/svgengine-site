---
title: Plugins
description: Extiende svg-engine sin hacer fork del core — el contrato EditorPlugin, los registries de capacidad y un primer plugin.
---

Los terceros extienden svg-engine contribuyendo a **registries de capacidad** —
sin tocar el core, sin fork. Un plugin es un objeto `EditorPlugin` simple, con un
único hook obligatorio: `install(ctx)`.

## En una frase

Un plugin recibe un `PluginContext` con acceso al `Injector` de Angular y a un
helper `track(disposable)`; los usa para registrar contribuciones en los
registries; cada `register()` devuelve un `Disposable` que `track` agenda para
limpieza automática en el uninstall.

## Anatomía mínima

```ts
import {
  type EditorPlugin,
  type PluginContext,
  PLUGIN_API_VERSION,
} from '@mosaicoo/svg-engine/edit';

export const myPlugin: EditorPlugin = {
  id: 'com.acme.my-plugin', // reverse-DNS recomendado, único en el registry
  name: 'My plugin',
  version: '1.0.0',
  apiVersion: PLUGIN_API_VERSION, // verificado en el momento del install

  install(ctx: PluginContext): void {
    // registra contribuciones aquí
  },

  // Opcional — se ejecuta antes del descarte de los disposables trackeados.
  uninstall(_ctx: PluginContext): void {},
};
```

Provisiona en el bootstrap:

```ts
// app.config.ts
import { provideSvgEnginePlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(myPlugin)];
```

`provideSvgEnginePlugin` es un provider `multi` ejecutado mediante
`ENVIRONMENT_INITIALIZER`, así que los plugins se instalan en el orden de
declaración.

## El PluginContext

```ts
interface PluginContext {
  readonly pluginId: string; // === plugin.id
  readonly injector: Injector; // DI crudo de Angular — toma cualquier service
  track<T extends Disposable>(d: T): T; // devuelve d, para encadenar
}
```

El patrón de una línea que usarás casi siempre:

```ts
install(ctx) {
  ctx.track(ctx.injector.get(SomeRegistry).register(myContribution));
}
```

Se lee como: toma el registry, registra la contribución, hazle tracking para la
limpieza automática.

## Ejemplo — registrar un atajo

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
          // haz el trabajo real con ctx.injector.get(CommandBus), etc.
        },
      }),
    );
  },
};
```

Los combos aceptan `CmdOrCtrl` cross-platform, además de tokens como `Shift`,
`Alt`, `ArrowUp`, `Escape`, `F5`. Los tokens desconocidos lanzan error en
`register()`, así que los fallos aparecen pronto.

## Categorías de plugin

Cada registry sigue la misma forma — `register(entry): Disposable` — así que el
uninstall revierte cada contribución automáticamente.

| Categoría | Registry |
| --- | --- |
| Node renderers | `NodeRendererRegistry` |
| Tools | `ToolRegistry` |
| Optimizers | `OptimizerRegistry` |
| Importers | `ImporterRegistry` |
| Exporters | `ExporterRegistry` |
| Efectos / filtros | `EffectRegistry` |
| Libraries (assets) | `LibraryRegistry` |
| Paletas / swatches | `PaletteRegistry` |
| Menús + atajos | `MenuContributionRegistry` + `ShortcutRegistry` |
| Intents de lenguaje natural | `NaturalLanguageService` |
| Code generators | `CodeGeneratorRegistry` |
| Paneles de opciones de tool | `ToolOptionsRegistry` |

:::note
Más recetas (tools, importers, exporters, efectos) están en el
[repositorio de la librería](https://github.com/mosaicoo/svg-engine). La librería
también trae un plugin manager y un loader opt-in para plugins externos de
confianza.
:::
