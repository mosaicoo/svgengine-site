---
title: 'API: ui'
description: 'API pública de @mosaicoo/svg-engine/ui — la capa de UI Material opcional: shells de editor listos, paneles, diálogos y servicios de presentación.'
---

`@mosaicoo/svg-engine/ui` es la **capa de UI Material opcional**: shells de editor
listos, paneles, barras, diálogos y servicios de presentación sobre Angular
Material. Este entry point (y `ai/nlu-ui`) son los únicos que dependen de
`@angular/material` y `@angular/cdk` — todo lo que está debajo de `ui` permanece
headless.

```ts
import { SvgeShellPro, provideSvgeUiBuiltins } from '@mosaicoo/svg-engine/ui';
```

## Shells listos

La forma más rápida de tener un editor funcional: montar un componente.

| Componente | Selector | Qué es |
| --- | --- | --- |
| `SvgeShellPro` | `<svge-shell-pro>` | El editor profesional: barra de menú + toolbar + opciones de tool + paleta de tools + canvas + menú contextual + layers + inspector + barra de estado, ya conectados. |
| `SvgeEditor` | `<svge-editor>` | Un shell configurable (background + renderer + overlays + toolbar, barra de estado opcional) con piezas conmutables — desde headless puro hasta un shell completo. |

## Setup

| API | Descripción |
| --- | --- |
| `provideSvgeUiBuiltins()` | Instala los plugins integrados del lado de la UI (diálogos Material, el registry de opciones de tool). Llámalo tras `provideSvgEngineEditorBuiltins()` para completar la capa Material. |

## Paneles & barras

Compón tu propio layout con estos componentes standalone en lugar de usar un shell.

| Componente | Selector | Finalidad |
| --- | --- | --- |
| `LayersPanel` | `<svge-layers-panel>` | Árbol de layers con drag-and-drop de jerarquía. |
| `SvgeInspector` | `<svge-inspector>` | Inspector de propiedades de los nodos seleccionados. |
| `SvgeColorPalette` | `<svge-color-palette>` | Grid de swatches; emite `colorPicked` al hacer clic. |
| `SvgeColorPicker` | `<svge-color-picker>` | Selector de color completo. |
| `SvgeGradientEditor` | `<svge-gradient-editor>` | Edita los stops/tipo del gradiente activo. |
| `SvgeEffectsPanel` | `<svge-effects-panel>` | Panel de efectos/filtros. |
| `SvgeLibrariesPanel` | `<svge-libraries-panel>` | Superficie unificada para las bibliotecas de assets (formas, templates, gradientes, patterns, estilos, assets). |
| `SvgePagesPanel` | `<svge-pages-panel>` | Pestañas estilo navegador para páginas/artboards (se auto-oculta con cero páginas). |
| `SvgeHistoryPanel` | `<svge-history-panel>` | Historial lineal de comandos con viaje en el tiempo por clic (`CommandBus.goto()`). |
| `SnapshotsPanel` | `<svge-snapshots-panel>` | Checkpoints nombrados y restaurables del documento. |
| `SvgeAssetExportPanel` | `<svge-asset-export-panel>` | UI de exportación por lotes sobre el registry de asset-export de `edit`. |
| `SvgeTimeline` | `<svge-timeline>` | Dock de la timeline de animación (regla + keyframes por track + playhead). |
| `SvgeMenuBar` / `SvgeToolbar` / `SvgeStatusBar` | `<svge-menu-bar>` / `<svge-toolbar>` / `<svge-status-bar>` | La barra de menú, una toolbar de iconos por slot, y la barra de estado (tool/selección/zoom/snap). |
| `SvgeToolsPalette` / `SvgeToolOptions` | `<svge-tools-palette>` / `<svge-tool-options>` | La paleta de tools y el host que renderiza las opciones de la tool activa. |
| `SvgeRulers` / `SvgeIsolationBreadcrumb` / `SvgePluginManager` | — | Reglas, el breadcrumb del modo de aislamiento y el gestor de plugins (listar/activar/desactivar/desinstalar). |

## Diálogos

Inyecta un servicio de diálogo y llama `.open()` para lanzar un diálogo Material gestionado.

| Servicio | Abre |
| --- | --- |
| `SvgeCommandPaletteService` | La paleta de comandos (búsqueda fuzzy sobre cada comando de menú registrado). |
| `SvgeTransformDialogService` | Object ▸ Transform (rotar/escalar/cizallar por valores exactos). |
| `SvgeCodeGeneratorDialogService` | El diálogo de generación de código (preview React JSX/componente/Data URI + copiar). |
| `SvgeFindReplaceDialogService` | Buscar & Reemplazar en texto/propiedades de nodos. |
| `SvgeKeyboardShortcutsDialogService` | El gestor de atajos (rebind/unbind/reset con avisos de conflicto). |
| `SvgeSvgSourceDialogService` | El visor de fuente SVG. |
| `SvgeSmartObjectEditorDialogService` | El editor de contenido de smart object. |
| `SvgeTraceImageDialogService` | El diálogo de opciones de trace de imagen (threshold/tolerancia/min-points). |
| `SvgeWorkspaceSettingsDialogService` / `SvgeDocumentSettingsDialogService` | Ajustes de workspace y de documento. |
| `SvgeAboutDialogService` | El diálogo Acerca de. |

## Servicios

| API | Descripción |
| --- | --- |
| `ThemeService` | Gestión de tema (`system`/`light`/`dark`), persistido en localStorage y aplicado en `<html data-theme>`: `setTheme()`, `cycle()`, signals `theme`/`resolved`. |
| `ColorHistoryService` | Colores usados recientemente (anillo MRU de 16, deduplicado, persistido): `add(hex)`, `clear()`, signal `history`. |
| `WorkspaceLayoutService` | Layout de paneles/docks del shell, persistido. |
| `SvgeContextMenuService` | Abrir menús contextuales programáticamente. |

:::note
`ui` también exporta bloques que los shells usan internamente: los componentes
*ToolOptions* por tool + `ToolOptionsRegistry` + `provideSvgeBuiltinToolOptions()`,
los pipes de campo del inspector (`RectFieldPipe`, …), utilidades de color
(`hsvToRgb`, `parseHex`, …), el shell de diálogo (`SvgeDialogShell`,
`svgeDialogConfig`), constantes de slot (`MENU_SLOT`, `STATUS_BAR_SECTIONS`, …) y
`builtinUiMenuContributionsPlugin`. Normalmente los consumes a través de los shells y
diálogos de arriba, no directamente.
:::
