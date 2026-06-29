---
title: 'API: ui'
description: 'API pública de @mosaicoo/svg-engine/ui — a camada de UI Material opt-in: shells de editor prontos, painéis, dialogs e serviços de apresentação.'
---

`@mosaicoo/svg-engine/ui` é a **camada de UI Material opt-in**: shells de editor
prontos, painéis, barras, dialogs e serviços de apresentação sobre o Angular
Material. Este entry point (e o `ai/nlu-ui`) são os únicos que dependem de
`@angular/material` e `@angular/cdk` — tudo abaixo de `ui` permanece headless.

```ts
import { SvgeShellPro, provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';
```

## Shells prontos

O caminho mais rápido para um editor funcional: montar um componente.

| Componente | Seletor | O que é |
| --- | --- | --- |
| `SvgeShellPro` | `<svge-shell-pro>` | O editor profissional: barra de menu + toolbar + opções de tool + paleta de tools + canvas + menu de contexto + layers + inspector + barra de status, já conectados. |
| `SvgeEditor` | `<svge-editor>` | Um shell configurável (background + renderer + overlays + toolbar, barra de status opcional) com peças alternáveis — do headless puro ao shell completo. |

## Setup

| API | Descrição |
| --- | --- |
| `provideSvgeUiBuiltins()` | Instala os plugins built-in do lado da UI (dialogs Material, o registry de opções de tool). Chame após `provideSvgEngineEditorBuiltins()` para completar a camada Material. |

## Painéis & barras

Componha seu próprio layout com estes componentes standalone em vez de usar um shell.

| Componente | Seletor | Finalidade |
| --- | --- | --- |
| `LayersPanel` | `<svge-layers-panel>` | Árvore de layers com drag-and-drop de hierarquia. |
| `SvgeInspector` | `<svge-inspector>` | Inspetor de propriedades dos nós selecionados. |
| `SvgeColorPalette` | `<svge-color-palette>` | Grade de swatches; emite `colorPicked` ao clicar. |
| `SvgeColorPicker` | `<svge-color-picker>` | Seletor de cor completo. |
| `SvgeGradientEditor` | `<svge-gradient-editor>` | Edita os stops/tipo do gradiente ativo. |
| `SvgeEffectsPanel` | `<svge-effects-panel>` | Painel de efeitos/filtros. |
| `SvgeLibrariesPanel` | `<svge-libraries-panel>` | Superfície unificada para as bibliotecas de assets (formas, templates, gradientes, patterns, estilos, assets). |
| `SvgePagesPanel` | `<svge-pages-panel>` | Abas estilo navegador para páginas/artboards (auto-oculta com zero páginas). |
| `SvgeHistoryPanel` | `<svge-history-panel>` | Histórico linear de comandos com viagem no tempo por clique (`CommandBus.goto()`). |
| `SnapshotsPanel` | `<svge-snapshots-panel>` | Checkpoints nomeados e restauráveis do documento. |
| `SvgeAssetExportPanel` | `<svge-asset-export-panel>` | UI de exportação em lote sobre o registry de asset-export do `edit`. |
| `SvgeTimeline` | `<svge-timeline>` | Dock da timeline de animação (régua + keyframes por track + playhead). |
| `SvgeMenuBar` / `SvgeToolbar` / `SvgeStatusBar` | `<svge-menu-bar>` / `<svge-toolbar>` / `<svge-status-bar>` | A barra de menu, uma toolbar de ícones por slot, e a barra de status (tool/seleção/zoom/snap). |
| `SvgeToolsPalette` / `SvgeToolOptions` | `<svge-tools-palette>` / `<svge-tool-options>` | A paleta de tools e o host que renderiza as opções da tool ativa. |
| `SvgeRulers` / `SvgeIsolationBreadcrumb` / `SvgePluginManager` | — | Réguas, o breadcrumb do modo de isolamento e o gerenciador de plugins (listar/ativar/desativar/desinstalar). |

## Dialogs

Injete um serviço de dialog e chame `.open()` para abrir um dialog Material gerenciado.

| Serviço | Abre |
| --- | --- |
| `SvgeCommandPaletteService` | A paleta de comandos (busca fuzzy sobre todo comando de menu registrado). |
| `SvgeTransformDialogService` | Object ▸ Transform (rotacionar/escalar/cisalhar por valores exatos). |
| `SvgeCodeGeneratorDialogService` | O dialog de geração de código (preview React JSX/componente/Data URI + copiar). |
| `SvgeFindReplaceDialogService` | Localizar & Substituir em texto/propriedades de nós. |
| `SvgeKeyboardShortcutsDialogService` | O gerenciador de atalhos (rebind/unbind/reset com avisos de conflito). |
| `SvgeSvgSourceDialogService` | O visualizador de fonte SVG. |
| `SvgeSmartObjectEditorDialogService` | O editor de conteúdo de smart object. |
| `SvgeTraceImageDialogService` | O dialog de opções de trace de imagem (threshold/tolerância/min-points). |
| `SvgeWorkspaceSettingsDialogService` / `SvgeDocumentSettingsDialogService` | Configurações de workspace e de documento. |
| `SvgeAboutDialogService` | O dialog Sobre. |

## Serviços

| API | Descrição |
| --- | --- |
| `ThemeService` | Gestão de tema (`system`/`light`/`dark`), persistido no localStorage e aplicado em `<html data-theme>`: `setTheme()`, `cycle()`, signals `theme`/`resolved`. |
| `ColorHistoryService` | Cores recém-usadas (anel MRU de 16, deduplicado, persistido): `add(hex)`, `clear()`, signal `history`. |
| `WorkspaceLayoutService` | Layout de painéis/docks do shell, persistido. |
| `SvgeContextMenuService` | Abrir menus de contexto programaticamente. |

:::note
O `ui` também exporta blocos que os shells usam internamente: os componentes
*ToolOptions* por tool + `ToolOptionsRegistry` + `provideSvgeBuiltinToolOptions()`,
os pipes de campo do inspector (`RectFieldPipe`, …), utilitários de cor
(`hsvToRgb`, `parseHex`, …), o shell de dialog (`SvgeDialogShell`,
`svgeDialogConfig`), constantes de slot (`MENU_SLOT`, `STATUS_BAR_SECTIONS`, …) e
`builtinUiMenuContributionsPlugin`. Normalmente você os consome através dos shells e
dialogs acima, não diretamente.
:::
