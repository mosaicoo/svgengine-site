---
title: 'API: core'
description: API pública de @mosaicoo/svg-engine/core — o engine headless para construir, mutar e consultar um documento SVG programaticamente.
---

`@mosaicoo/svg-engine/core` é o **engine headless**. Não depende de
`@angular/material` nem de `@angular/cdk`, então você pode usá-lo num editor
completo, num visualizador read-only, num pipeline Node/SSR ou numa CLI — onde
quer que precise construir, mutar e consultar um documento SVG programaticamente.

```ts
import {
  createEmptyDocument, createRect,
  EditorStateService, CommandBus, InsertNodeCommand, AUTO_PARENT,
} from '@mosaicoo/svg-engine/core';
```

## Como as peças se encaixam

O modelo de dados é **imutável**: factories e operações de árvore sempre retornam
novos objetos. Você nunca muta o documento diretamente — em vez disso **despacha
comandos** pelo `CommandBus`, que aplica a mudança e a registra para undo/redo. O
documento atual vive no `EditorStateService` como signals do Angular.

```ts
const state = inject(EditorStateService);
const bus = inject(CommandBus);

state.resetDocument(createEmptyDocument({ width: 800, height: 600 }));

const rect = createRect({ x: 10, y: 10, width: 120, height: 80 });
bus.dispatch(new InsertNodeCommand(rect, AUTO_PARENT)); // com undo
bus.undo();
```

## Documento & serviços de estado

Os serviços são `@Injectable` do Angular — injete-os onde precisar.

| API | Descrição | Use para |
| --- | --- | --- |
| `EditorStateService` | Fonte única de verdade do documento editado, exposta como signals read-only (`document`, `dirty`, `nodeCount`, `allNodes`). | Ler o documento atual de forma reativa; semear/substituir com `resetDocument()` / `setDocument()`; `markClean()` após salvar. |
| `CommandBus` | O único gateway para **todas** as mutações. `dispatch(command)` aplica a mudança e registra o histórico; também `undo()`, `redo()`, `goto(depth)`. | Aplicar qualquer mudança no documento com suporte a undo/redo. |
| `HistoryService` | A contabilidade de undo/redo por trás do bus: `undoStack`, `redoStack`, `canUndo`, `canRedo`, `setMaxSize()`. | Alimentar a UI de undo/redo e limitar a profundidade do histórico. |
| `createEmptyDocument(options?)` | Constrói um `SvgDocument` novo e vazio com um grupo raiz. | Criar o documento inicial para semear o `EditorStateService`. |
| `SvgDocument` | O contêiner imutável de topo: `viewBox`, `width`/`height` opcionais, a árvore editável `root`, `defs`, `exportPreferences`. | O tipo que você lê de `state.document()` e passa para renderers/exporters. |
| `CreateDocumentOptions` / `DEFAULT_VIEW_BOX` | Opções (`viewBox`, `width`, `height`) de `createEmptyDocument` e o viewBox padrão 800×600. | Configurar o tamanho inicial do canvas. |

## Construindo nós

Cada forma é criada por uma factory. Todas aceitam um `NodeFactoryOptions`
compartilhado (`id?`, `transform?`, `style?`, `metadata?`); formas usam
`DEFAULT_STYLE` por padrão, grupos usam `EMPTY_STYLE`.

| Factory | Cria |
| --- | --- |
| `createRect({ x, y, width, height, rx?, ry? })` | Um retângulo (opcionalmente arredondado). |
| `createEllipse({ cx, cy, rx, ry })` | Uma elipse / círculo. |
| `createLine({ x1, y1, x2, y2 })` | Uma linha reta. |
| `createPolygon(points)` / `createPolyline(points)` | Um polígono fechado / polilinha aberta a partir de uma lista de `Point`. |
| `createPath(d)` | Um path a partir de uma string `d` do SVG. |
| `createText({ x, y, content, fontSize?, fontFamily?, ... })` | Um elemento de texto. |
| `createImage({ x, y, width, height, href })` | Uma `<image>` raster. |
| `createGroup(children?)` | Um grupo contêiner (a base de layers, páginas e smart objects). |
| `createSymbolUse({ symbolId, x, y })` | Uma instância de um símbolo registrado (`<use href="#…">`). |

## O modelo de nós

| API | Descrição |
| --- | --- |
| `SvgNode` | União discriminada de todos os tipos de nó; o campo `type` estreita para a forma concreta (`RectNode`, `PathNode`, `GroupNode`, …). |
| `SvgNodeBase` | Os campos comuns a todo nó: `id`, `transform`, `style`, `metadata` (todos `readonly`). |
| `SvgNodeType` / `SVG_NODE_TYPES` | A união literal (e a tupla) dos discriminadores `type` válidos. |
| `isGroupNode(node)` | Type guard que estreita um nó para `GroupNode`. |

## Lendo & transformando a árvore

Funções puras sobre a árvore imutável — cada uma retorna uma **nova** raiz com
compartilhamento estrutural (só o caminho até o nó alterado é realocado).

| API | Descrição |
| --- | --- |
| `findNodeById(root, id)` | Encontra um nó pelo id, ou `null`. |
| `findParent(root, childId)` | Encontra o grupo pai de um nó, ou `null`. |
| `walk(root, visitor)` / `collectNodes(root)` / `countNodes(root)` | Percorre, achata ou conta a árvore. |
| `insertNode(root, parentId, node, index?)` | Retorna uma nova árvore com `node` inserido (lança erro em id duplicado). |
| `removeNode(root, id)` | Retorna uma nova árvore com o nó removido. |
| `updateNode(root, id, updater)` | Retorna uma nova árvore com o nó substituído por `updater(node)` (mesmo `id`/`type` exigido). |
| `cloneNodeWithNewIds(node)` | Clona uma subárvore em profundidade com ids novos (ex.: para duplicação). |

:::tip
Essas funções são as primitivas de baixo nível. Para edições **com undo** num
editor, prefira os comandos equivalentes (abaixo) em vez de chamá-las diretamente.
:::

## Geometria & transforms

| API | Descrição |
| --- | --- |
| `Point` / `ORIGIN` | Um ponto 2D imutável; `{x:0, y:0}`. |
| `BoundingBox` + `bbox(x,y,w,h)` | Uma caixa alinhada aos eixos e seu construtor. |
| `unionBBox(a,b)` / `intersectsBBox(a,b)` / `containsPoint(box,x,y)` | Combina caixas, testa sobreposição, testa contenção de ponto (usado p.ex. em hit-testing e culling de viewport). |
| `getNodeBBox(node)` / `getNodesWorldBBox(nodes)` | Calcula a bounding box de um nó (e a união de uma seleção). |
| `Transform` / `IDENTITY_TRANSFORM` | A matriz afim imutável de 6 elementos, correspondente ao `matrix(a,b,c,d,e,f)` do SVG. |
| `translate` / `scale` / `rotate` / `skewX` / `skewY` | Constroem os transforms comuns (rotação/skew em radianos). |
| `multiply(a,b)` / `invert(m)` / `applyTransform(m,x,y)` | Compõe, inverte e aplica um transform a um ponto. |
| `parseTransformAttr(attr)` | Faz parse de uma string do atributo `transform` do SVG num `Transform`. |

## Tipos de identidade & estilo

| API | Descrição |
| --- | --- |
| `NodeId` + `toNodeId(s)` / `generateNodeId()` | O tipo branded de id de nó; coage uma string externa, ou gera um id único novo. |
| `SvgStyle` / `EMPTY_STYLE` / `DEFAULT_STYLE` | O subconjunto de atributos de apresentação do SVG tratados como estilo, mais os presets vazio e de forma padrão. |
| `SvgMetadata` / `EMPTY_METADATA` | Metadados por-nó voltados ao editor: `name`, `locked`, `visible`, `customData`. |
| `Disposable` | O contrato de limpeza retornado por todo `register*()` de registry, para plugins desfazerem suas contribuições. |

## Comandos — o vocabulário de mutação

Comandos são classes simples: construa uma com seus dados e faça `bus.dispatch()`.
Cada um é reversível (undo/redo). `Command`, `CommandContext`, `CommandResult` e os
helpers `ok()` / `fail()` formam o contrato; `AUTO_PARENT` diz aos comandos de
inserção para usar o pai implícito atual.

**Estrutura & ordenação**

| Comando | Faz |
| --- | --- |
| `InsertNodeCommand` / `RemoveNodeCommand` | Adiciona ou remove um nó. |
| `MoveNodeCommand` / `MoveNodeInTreeCommand` | Move um nó por offset, ou o reposiciona (re-parent) na árvore. |
| `ReorderNodeCommand` (`ReorderDirection`) | Muda a ordem z (subir/descer/frente/trás). |
| `DuplicateNodeCommand` | Duplica um nó com ids novos. |
| `GroupSelectionCommand` / `UngroupCommand` | Agrupa uma seleção / desagrupa um grupo. |
| `TranslateManyCommand` | Move vários nós de uma vez. |

**Transform**

| Comando | Faz |
| --- | --- |
| `ResizeNodeCommand` / `ResizeNodesCommand` | Redimensiona um ou vários nós (escala embutida na geometria). |
| `RotateNodeCommand` / `RotateNodesCommand` | Rotaciona em torno de um pivô. |
| `SkewNodeCommand` / `SkewNodesCommand` | Cisalha em X/Y em torno de um pivô. |
| `FlipNodeCommand` (`FlipAxis`) | Espelha horizontal/verticalmente. |

**Propriedades**

| Comando | Faz |
| --- | --- |
| `SetPropertyCommand` / `SetPropertyOnManyCommand` | Define uma propriedade de geometria/atributo em um ou vários nós. |
| `SetStylePropertyOnManyCommand` | Define uma propriedade de estilo (fill, stroke, …) numa seleção. |
| `SetCornerRadiusCommand` | Define o raio de canto vivo (não destrutivo) num path. |
| `SetCustomAttrCommand` / `RenameCustomAttrCommand` / `RemoveCustomAttrCommand` | CRUD com undo para atributos `data-*` customizados. |

**Pathfinder (booleanos) & paths**

| Comando | Faz |
| --- | --- |
| `UnionCommand` / `SubtractCommand` / `IntersectCommand` / `ExcludeCommand` / `DivideCommand` | Operações booleanas entre formas. |
| `MakeLiveBooleanCommand` / `RefreshLiveBooleanCommand` / `ReleaseLiveBooleanCommand` | Booleanos não destrutivos ("live") que você pode reeditar depois. |
| `MakeCompoundPathCommand` / `ReleaseCompoundPathCommand` | Combina/libera um path composto. |
| `ConvertNodeToPathCommand` / `BatchConvertToPathCommand` | Converte formas em paths editáveis. |
| `ReversePathCommand` / `SimplifyPathCommand` / `CleanUpPathCommand` / `JoinPathsCommand` / `SplitPathCommand` / `OffsetPathCommand` / `OutlineStrokeCommand` | As operações do menu Path. |
| `KnifeCutPathCommand` | Corta um path/forma em dois ao longo de um traço de faca. |
| `RasterizeNodeCommand` | Substitui um nó vetorial por uma `<image>` raster. |

**Páginas, layers & smart objects**

| Comando | Faz |
| --- | --- |
| `CreatePageCommand` / `DeletePageCommand` / `RenamePageCommand` / `ResizePageCommand` / `MovePageCommand` / `SetPageOptionsCommand` / `EnsureDefaultPageCommand` | Gerenciam páginas / artboards. |
| `CreateLayerCommand` / `MakeLayerCommand` / `UnmakeLayerCommand` | Gerenciam layers lógicas. |
| `MakeSmartObjectCommand` / `ReleaseSmartObjectCommand` / `EditSmartObjectContentsCommand` / `ReplaceSmartObjectContentsCommand` | Gerenciam smart objects. |
| `MakeClipMaskCommand` / `ReleaseClipMaskCommand` | Aplica / libera um clip path ou máscara de opacidade. |

**Animação** (veja o modelo de animação abaixo)

| Comando | Faz |
| --- | --- |
| `AddKeyframeCommand` / `MoveKeyframeCommand` / `RemoveKeyframeCommand` / `SetKeyframeEasingCommand` | Editam keyframes na animação da página. |
| `SetAnimationDurationCommand` / `RemoveTrackCommand` | Define duração / remove uma track. |
| `RestoreSnapshotCommand` | Restaura o documento a um snapshot salvo (veja abaixo). |

## Snapshots de histórico

Checkpoints nomeados e restauráveis do documento inteiro (pense no History &
Snapshots do Photoshop). O serviço é **por-editor**, não global.

| API | Descrição |
| --- | --- |
| `SnapshotsService` | Gerencia a coleção de snapshots: `take()`, `restore()`, `rename()`, `delete()`, `setLimits()`, mais os signals `snapshots`/`count`/`currentSnapshotId`. |
| `Snapshot` / `SnapshotSource` | Um checkpoint (`name`, `createdAt`, `document` clonado, `thumbnail`, `source`) e como foi criado (`manual`, `auto-open`, …). |
| `SnapshotsLimits` / `DEFAULT_SNAPSHOT_LIMITS` | Limites ajustáveis (`maxCount`, `autoOnOpen`, `autoOnDestructive`) e seus padrões conservadores. |

## Modelo de animação

Um modelo de animação puro e headless (sem UI). É o contrato compartilhado sobre o
qual tanto o preview da timeline quanto a exportação SMIL são construídos.

| API | Descrição |
| --- | --- |
| `AnimationDoc` / `AnimationTrack` / `Keyframe` / `EasingSpec` | O documento de animação imutável, suas tracks, keyframes e easing. |
| `emptyAnimationDoc()` / `readAnimationDoc(node)` / `isAnimationDoc(v)` | Cria, lê e checa o tipo da animação anexada a uma página. |
| `upsertKeyframe` / `moveKeyframe` / `removeKeyframe` / `removeTrack` / `setKeyframeEasing` / `setAnimationDuration` | Helpers de edição imutáveis (os comandos acima os encapsulam). |
| `sampleAnimation(doc, t)` / `sampleTrack` / `applyAnimationToTree(root, doc, t)` | Amostram valores num tempo `t` e produzem a árvore animada para o preview. |
| `animatablePropertiesForNode(node)` / `findAnimatableProperty` / `readAnimatableValue` | O catálogo de propriedades animáveis por tipo de nó (as linhas da timeline). |
| `animationToSmil(doc)` | Serializa a animação em elementos SMIL `<animate>` do SVG para exportação. |
| `evalEasing` / `easingControlPoints` / `DEFAULT_EASING` | Avaliação de easing e presets. |

:::note
O `core` também exporta primitivas geométricas de baixo nível (parse/serialização
de path, outline de stroke, scale-baking, manipulação de âncoras) que existem para
dar suporte aos comandos acima. São blocos avançados, não APIs do dia a dia — num
editor, prefira os comandos. O
[repositório da biblioteca](https://github.com/mosaicoo/svg-engine) é autoritativo
para as assinaturas exatas.
:::
