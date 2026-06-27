---
title: Plugins
description: Estenda o svg-engine sem fork do core — o contrato EditorPlugin, os registries de capacidade e um primeiro plugin.
---

Terceiros estendem o svg-engine contribuindo para **registries de capacidade** —
sem mexer no core, sem fork. Um plugin é um objeto `EditorPlugin` simples, com um
único hook obrigatório: `install(ctx)`.

## Em uma frase

Um plugin recebe um `PluginContext` com acesso ao `Injector` do Angular e a um
helper `track(disposable)`; usa-os para registrar contribuições nos registries;
cada `register()` devolve um `Disposable` que o `track` agenda para limpeza
automática no uninstall.

## Anatomia mínima

```ts
import {
  type EditorPlugin,
  type PluginContext,
  PLUGIN_API_VERSION,
} from '@mosaicoo/svg-engine/edit';

export const myPlugin: EditorPlugin = {
  id: 'com.acme.my-plugin', // reverse-DNS recomendado, único na registry
  name: 'My plugin',
  version: '1.0.0',
  apiVersion: PLUGIN_API_VERSION, // checado no momento do install

  install(ctx: PluginContext): void {
    // registre contribuições aqui
  },

  // Opcional — roda antes do descarte dos disposables trackeados.
  uninstall(_ctx: PluginContext): void {},
};
```

Provisione no bootstrap:

```ts
// app.config.ts
import { provideSvgEnginePlugin } from '@mosaicoo/svg-engine/edit';
providers: [provideSvgEnginePlugin(myPlugin)];
```

`provideSvgEnginePlugin` é um provider `multi` executado via
`ENVIRONMENT_INITIALIZER`, então os plugins instalam na ordem de declaração.

## O PluginContext

```ts
interface PluginContext {
  readonly pluginId: string; // === plugin.id
  readonly injector: Injector; // DI cru do Angular — pegue qualquer service
  track<T extends Disposable>(d: T): T; // retorna d, para encadear
}
```

O padrão de uma linha que você vai usar quase sempre:

```ts
install(ctx) {
  ctx.track(ctx.injector.get(SomeRegistry).register(myContribution));
}
```

Lê como: pega o registry, registra a contribuição, faz tracking para limpeza
automática.

## Exemplo — registrar um atalho

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
          // faça o trabalho real via ctx.injector.get(CommandBus), etc.
        },
      }),
    );
  },
};
```

Os combos aceitam `CmdOrCtrl` cross-platform, além de tokens como `Shift`, `Alt`,
`ArrowUp`, `Escape`, `F5`. Tokens desconhecidos dão throw no `register()`, então
erros aparecem cedo.

## Categorias de plugin

Todo registry segue a mesma forma — `register(entry): Disposable` — então o
uninstall reverte cada contribuição automaticamente.

| Categoria | Registry |
| --- | --- |
| Node renderers | `NodeRendererRegistry` |
| Tools | `ToolRegistry` |
| Optimizers | `OptimizerRegistry` |
| Importers | `ImporterRegistry` |
| Exporters | `ExporterRegistry` |
| Efeitos / filtros | `EffectRegistry` |
| Libraries (assets) | `LibraryRegistry` |
| Paletas / swatches | `PaletteRegistry` |
| Menus + atalhos | `MenuContributionRegistry` + `ShortcutRegistry` |
| Intents de linguagem natural | `NaturalLanguageService` |
| Code generators | `CodeGeneratorRegistry` |
| Painéis de opções de tool | `ToolOptionsRegistry` |

:::note
Mais receitas (tools, importers, exporters, efeitos) estão no
[repositório da library](https://github.com/mosaicoo/svg-engine). A library
também traz um plugin manager e um loader opt-in para plugins externos
confiáveis.
:::
