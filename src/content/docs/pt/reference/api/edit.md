---
title: 'API: edit'
description: 'API pública de @mosaicoo/svg-engine/edit — a camada de edição headless: seleção, tools, gestos, plugins, registries, libraries, pages e animação.'
---

`@mosaicoo/svg-engine/edit` é a **camada de edição headless**, entre o `core` (o
modelo) e o `ui` (os widgets Material). Ela é dona da seleção, do sistema de tools,
dos gestos interativos (mover/redimensionar/rotacionar/marquee/snap/alinhar), do
sistema de plugins e dos registries de capacidades (menus, atalhos, efeitos,
bibliotecas, páginas, animação). É headless: sem Angular Material/CDK.

É uma superfície grande — esta página é um **mapa prático** do que você realmente
conecta. Tudo é signal-backed e com escopo por-editor.

```ts
import {
  provideSvgEngineEditorScope, provideSvgEngineEditorBuiltins,
  SelectionService, ToolHostService,
} from '@mosaicoo/svg-engine/edit';
```

## Setup

| API | Descrição |
| --- | --- |
| `provideSvgEngineEditorScope()` | Registra os serviços por-editor (seleção, transform, snap, marquee, alinhamento, layers, pages, animação, workspace, …) num injector filho. Forneça uma vez por instância de editor — é o que habilita o isolamento multi-editor. |
| `provideSvgEngineEditorBuiltins()` | Uma chamada que instala todo o conjunto de plugins headless (tools, libraries, IO, optimizers, efeitos, teclado, menus) em vez de registrar ~duas dúzias de plugins à mão. Combine com `provideSvgeUiBuiltins()` do `ui` para a camada Material. |
| `provideSvgEnginePlugin(plugin)` | Faz bootstrap de um plugin no momento da config do app. |
| `provideSvgeHelpLinks(links)` | Configura as URLs do menu Ajuda (docs, tutoriais, dev de plugins, reportar issue). |

## Seleção

| API | Descrição |
| --- | --- |
| `SelectionService` | O estado de seleção: signals `selectedIds`, `focusId`, `hoverId`, `count`, `hasSelection`, `isSingleSelection`; métodos `select`, `selectMany`, `addToSelection`, `removeFromSelection`, `toggle`, `clear`, `setHover`, `isSelected`. Nós bloqueados são filtrados automaticamente. |

## Tools

O sistema de tools roteia eventos de ponteiro/teclado para a tool ativa.

| API | Descrição |
| --- | --- |
| `ToolRegistry` | Registry das tools instaladas: `register(tool)` → `Disposable`, `get(id)`, `getByShortcut(key)`, signal `tools`. |
| `ToolHostService` | Estado da tool ativa + roteador de eventos: signals `activeId`/`activeTool`; `activate(id)`, `deactivate()`, e `routePointerDown/Move/Up/Cancel`, `routeKeyDown`. Encaminhe os eventos do canvas para cá. |
| `Tool` | O contrato da tool: `id`, `label`, opcionais `icon`/`cursor`/`shortcut`/`optionsComponent`, e hooks de ciclo de vida opcionais (`onActivate`, `onPointerDown`, `onKeyDown`, …). |
| `ToolContext` / `ToolPointerEvent` | O contexto (`injector`) entregue a cada hook, e o wrapper de ponteiro (`docPoint`, coords de tela, flags de modificador). |

As 15 tools built-in vêm como plugins; cada uma expõe uma constante de id:

| Tool | Constante de id | Finalidade |
| --- | --- | --- |
| Select | `SELECT_TOOL_ID` | Selecionar & transformar (padrão). |
| Direct Select | `DIRECT_SELECT_TOOL_ID` | Editar pontos de âncora individuais. |
| Pen | `PEN_TOOL_ID` | Desenhar paths Bézier. |
| Pencil | `PENCIL_TOOL_ID` | Desenho à mão livre. |
| Rectangle / Ellipse / Polygon | `RECTANGLE_TOOL_ID` / `ELLIPSE_TOOL_ID` / `POLYGON_TOOL_ID` | Desenhar formas. |
| Text | `TEXT_TOOL_ID` | Criar & editar texto. |
| Eyedropper | `EYEDROPPER_TOOL_ID` | Amostrar cores. |
| Knife | `KNIFE_TOOL_ID` | Cortar paths. |
| Smooth | `SMOOTH_TOOL_ID` | Suavizar paths. |
| Gradient | `GRADIENT_TOOL_ID` | Editar gradientes no canvas. |
| Width | `WIDTH_TOOL_ID` | Perfis de largura de traço variável. |
| Symbol Sprayer | `SYMBOL_SPRAYER_TOOL_ID` | Pulverizar instâncias de símbolo. |
| Page | `PAGE_TOOL_ID` | Criar & editar páginas/artboards. |

:::note
Cada tool também expõe um serviço + componente de overlay (ex.: `PenToolService` /
`PenOverlay`) para integração avançada, mas `provideSvgEngineEditorBuiltins()` os
conecta para você. `pointsToPathD(points)` converte uma lista de pontos numa string `d`.
:::

## Gestos interativos

Esses serviços guardam o estado transitório do gesto e despacham o comando com undo
correspondente ao confirmar. Você lê bounding boxes e alimenta deltas de ponteiro.

| API | Descrição |
| --- | --- |
| `TransformService` | Gestos de mover/redimensionar/rotacionar com preview ao vivo: `startMove`/`startResize`/`startRotate`, `updateDragDelta`/`updateRotateAngle`, `endDragAndCommit`, `cancelDrag`; signals `dragState`/`showPreview`. |
| `MarqueeService` | Faixa de seleção por arrasto: `start`/`update`/`end`/`cancel`, signals `rect`/`isActive`. Combine com `nodesInsideMarquee(rect, nodes, mode)` (`MarqueeHitMode`, `MarqueeMode`). |
| `SnapService` | Config de snap + guias ao vivo: alternâncias de `enabled`, `mode` (`grid`/`objects`/`both`), `snapToGuides`, `gridSize`, `thresholdPx`; `resolveForMove(rect, candidates, zoom)` retorna o delta com snap + guias. |
| `AlignmentService` | Alinhar & distribuir como uma única entrada de undo: `align(items, axis)`, `alignToReference`, `distribute`, `distributeSpacing`. Tipos `AlignAxis`, `DistributeAxis`, `NodeBBox`. |
| `KeyObjectService` | Lembra o alvo "alinhar ao objeto-chave" por editor. |

Cada um tem componentes de overlay — `SelectionOverlay`, `RotationPivot`,
`Marquee`, `SnapGuides` — que você pode acoplar ao canvas.

## Workspace, layers & isolamento

| API | Descrição |
| --- | --- |
| `WorkspaceService` | Estado de apresentação do editor: signals `background`, `page`, `grid`, `guides`, `rulers`, `interaction` com setters correspondentes. Tipos `BackgroundConfig`, `PageConfig`, `GridConfig`, `Guide`, `RulersConfig`, `InteractionConfig`. |
| `LayersService` | Visibilidade & bloqueio por-nó (só do editor, não serializado): `isVisible`/`isLocked`, `setVisible`/`toggleVisible`, `setLocked`/`toggleLocked`, `showAll`/`unlockAll`. |
| `IsolationService` | Isolamento de grupo + navegação por breadcrumb: `enterIsolation`, `exitIsolation`, `toggleIsolation`. |
| `SvgeCanvasGestures` | Diretiva para pan com botão do meio + zoom com a roda, dirigindo o `ViewportService`. |
| Formato de arquivo do workspace | `serializeWorkspace(state)` / `parseWorkspace(json)` e os tipos do envelope `.svge`/`.svgez` — persiste todo o estado do editor (config + viewport), não só o documento. |

Componentes de overlay/filtro: `WorkspaceBackground`, `GridOverlay`, `GuidesOverlay`,
`PageOverlay`, `LayersFilter`, `IsolationFilter`, `AnchorOverlay`.

## Plugins

Tudo que é opcional no editor é um plugin. Construa o seu para adicionar tools,
bibliotecas, menus, atalhos, efeitos ou formatos.

| API | Descrição |
| --- | --- |
| `EditorPlugin` | O contrato de plugin: `id`, `version`, `name`, `apiVersion`, opcionais `dependencies`/`category`, e `install(ctx)` / `uninstall(ctx)` opcional. |
| `PluginContext` | Entregue ao `install`: `pluginId`, `injector`, e `track(disposable)` para que toda contribuição seja removida automaticamente no uninstall. |
| `PluginRegistry` | Ciclo de vida install/uninstall: `install`, `uninstall`, `has`, `get`, `list`, signal `installed`. |
| `PLUGIN_API_VERSION` / `PluginCategory` / `InstalledPlugin` | A versão atual da API, a união de categorias e o tipo do registro instalado. |

Para gerenciar e carregar plugins (D-083): `PluginManagerService` +
`PluginCatalog` + `PluginStateStore` dão base à UI do gerenciador de plugins;
`PluginLoader` + `providePluginLoader(config)` + `validateExternalPluginManifest()`
carregam plugins **externos** de terceiros atrás de um allowlist + gate de versão da
API (`SVGE_PLUGIN_TRUSTED_ORIGINS`, `SVGE_PLUGIN_MODULE_LOADER`).

## Menus & teclado

| API | Descrição |
| --- | --- |
| `MenuContributionRegistry` | Registry extensível de menu/toolbar/menu de contexto: `register(contribution)` → `Disposable`, `bySlot(slot)`. Tipos `MenuContribution`, `MenuSlot`, `MenuContributionContext`. Slots: `MENU_SLOT`, `TOOLBAR_SLOT`, `CONTEXT_MENU_SLOT`. |
| `ShortcutRegistry` / `ShortcutService` | Registra atalhos (`register` → `Disposable`, `findMatch(event)`) e os dispara no keydown. `Shortcut` carrega `combo`, `label`, `when` opcional, `handler`. |
| `KeybindingsService` | Customização em runtime: `listShortcuts`, `setOverride(id, combo)`, `clearOverride`, `exportAsJson`. |
| Helpers de combo | `parseCombo`, `comboMatches`, `formatCombo`, `comboFromEvent`, `validateCombo`. |

Plugins de contribuição built-in: `builtinMenuContributionsPlugin`,
`builtinInsertMenuPlugin`, `builtinAdvancedEditMenuPlugin`,
`builtinEditorShortcutsPlugin`.

## Bibliotecas

Um `LibraryRegistry<T>` uniforme (`register` → `Disposable`, `get`, `update`, signal
`items`) dá base a toda biblioteca de assets. Cada uma traz um plugin built-in.

| Serviço | Guarda |
| --- | --- |
| `ShapeLibraryService` | Formas reutilizáveis. |
| `SymbolLibraryService` | Símbolos (master/instância via `SymbolUseNode`). |
| `TemplateLibraryService` | Templates de documento. |
| `BrushLibraryService` | Pincéis (perfis de largura para o Pencil). |
| `PatternLibraryService` / `GradientLibraryService` | Patterns e gradientes. |
| `GraphicStyleLibraryService` | Estilos gráficos reutilizáveis. |
| `PaletteRegistry` | Paletas de cor (`Palette` = `{ id, name, colors }`). |
| `ClipPathLibraryService` / `MaskLibraryService` | Clip paths e máscaras. |

Serviços de apoio: `AssetManagerService` (arquivo → data URI) e
`ActiveDefsService` / `ActiveSymbolsService` (compõem os defs/símbolos usados no
`<defs>` para exportação).

## Páginas & animação

| API | Descrição |
| --- | --- |
| `PagesService` | Visão derivada das páginas do documento: signals `pages`/`count`/`hasPages`, `byId`, `nameOf`, `viewBoxOf`. |
| `ActivePageService` | Qual página está sendo editada: signals `activePageId`/`activePage`/`effectiveDrawTargetId`, `setActivePageId`. |
| `AnimationService` | Edita a animação da página via comandos com undo: `addKeyframe`, `removeKeyframe`, `moveKeyframe`, `setKeyframeEasing`, `setDuration`, `setAnimatableProperty`, `sample(playhead)`; signals `tracks`/`duration`/`hasAnimation`. |
| `PlaybackService` | Dirige o playhead com `requestAnimationFrame`: `play`/`pause`/`seek`/`step`/`setSpeed`/`setLoop`; signals `playhead`/`isPlaying`. |

## Efeitos

| API | Descrição |
| --- | --- |
| `EffectRegistry` | Registry de efeitos de filtro SVG: `register` → `Disposable`, `get`, `byCategory`, signal `effects`. |
| `Effect` / `EffectParam` | O contrato do efeito (`buildFilterMarkup()`) e seus parâmetros tipados (`EffectNumberParam`, `EffectColorParam`, `EffectSelectParam`, `EffectBooleanParam`). |
| Helpers de parâmetro | `effectDefaults`, `resolveEffectParams`, `nonDefaultParams`, `isNumberParam`. |
| `ParametricEffectRegistry` / `ChainFilterRegistry` | Efeitos paramétricos (reeditáveis) e encadeamento de efeitos, com helpers de encode/parse de id. |
| `builtinEffectsPlugin` | Registra os presets de filtro built-in (blur, drop shadow, glow, bevel/emboss, ajustes de cor, …). |

## Serviços de estado do editor

| API | Descrição |
| --- | --- |
| `ClipboardService` | Copy/cut/paste em memória, desacoplado do clipboard do navegador: `copy`, `cut`, `paste`, `canPaste`. |
| `FindReplaceService` / `SelectSameService` | Localizar & substituir em texto/propriedades de nós (`find`, `replace`, `replaceAll`; `FindCriteria`/`FindMatch`), e "selecionar igual" (fill/stroke/fonte/…). |
| `AutoSaveService` | Autosave periódico em localStorage com recuperação. |
| `RecentFilesService` | Lista MRU por trás de "Abrir recente". |
| `SnapshotsPersistenceService` | Persiste snapshots do editor em localStorage. |
| `AssetExportRegistry` / `AssetExportRunner` | Exportação em lote: registra slots (alvo + formato + escala + nome) e os executa com desambiguação de nomes. |
| `FullscreenService` | Wrapper de tela cheia nativo. |
| `ImportSettingsService` / `ImportPlacementService` | Preferência de posicionamento do import de SVG e o gesto interativo de arrastar-para-posicionar (`SvgeImportPlacementOverlay`). |
| `TraceImageService` | Vetorização raster-para-vetor: `traceImageToPaths(imageData, options)` + o comando com undo `TraceImageCommand`. |
| `SmartObjectActionsService` | Ações de "substituir conteúdo" / rasterizar para smart objects. |

:::note[IO & optimize re-exportados]
Por conveniência do editor, o `edit` também re-exporta os registries de
import/export e de optimize, os formatos built-in e seus plugins (`builtinIoPlugin`,
`builtinOptimizersPlugin`, …). Veja as páginas
[io](/svgengine-site/pt/reference/api/io/) e
[optimize](/svgengine-site/pt/reference/api/optimize/) para detalhes.
:::

:::note[Utilitários de baixo nível]
O `edit` também exporta primitivas de geometria & hit-testing — helpers de
bbox/âncora (`anchorPoint`, `findNearestAnchor`, `BBoxAnchor`), lookup do nó
renderizado (`getRenderedNodeBBox`, `getRenderedNodeOBB`, `getCombinedBBox`),
hit-testing no DOM (`resolveNodeIdFromEvent`, `geometricHitTestElement`) e captura de
ponteiro (`capturePointer`, `releasePointer`, `isEditableTarget`). Eles dão base às
tools e overlays acima; use-os só ao construir interações de canvas customizadas. O
[repositório da biblioteca](https://github.com/mosaicoo/svg-engine) é autoritativo
para as assinaturas exatas.
:::
