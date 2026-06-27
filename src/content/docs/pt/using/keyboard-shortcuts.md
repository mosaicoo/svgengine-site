---
title: Atalhos de teclado
description: Os atalhos de teclado built-in do editor e as teclas de ativação de ferramentas.
---

Os atalhos do editor vêm de plugins opt-in e são registrados em um
`ShortcutRegistry`, então um app pode remapear ou desabilitar qualquer um. O
shell drop-in habilita o conjunto built-in abaixo por padrão.

:::note
No macOS, `Ctrl` equivale a `Cmd` — o parser de combos trata `Ctrl` como o
modificador primário cross-platform. Os atalhos também são suprimidos enquanto
você digita em um campo de texto, então `Ctrl+C`/`Ctrl+V` fazem copiar/colar
nativo ali.
:::

## Edição

| Atalho | Ação |
| --- | --- |
| `Ctrl+Z` | Desfazer último comando |
| `Ctrl+Y` | Refazer (padrão Windows) |
| `Ctrl+Shift+Z` | Refazer (padrão macOS / Linux) |
| `Ctrl+X` | Recortar seleção |
| `Ctrl+C` | Copiar seleção |
| `Ctrl+V` | Colar |
| `Ctrl+Shift+V` | Colar no lugar |
| `Ctrl+D` | Duplicar seleção |

## Objetos

| Atalho | Ação |
| --- | --- |
| `Ctrl+G` | Agrupar seleção |
| `Ctrl+Shift+G` | Desagrupar o grupo em foco |

## Seleção

| Atalho | Ação |
| --- | --- |
| `Ctrl+A` | Selecionar todos os objetos da página ativa |
| `Setas` | Mover a seleção |
| `Shift` + `Setas` | Mover a seleção (passo maior) |
| `Delete` | Excluir a seleção |

## Snapshots

| Atalho | Ação |
| --- | --- |
| `Ctrl+Shift+S` | Tirar um snapshot do documento atual |
| `Ctrl+Alt+Z` | Restaurar o snapshot mais recente |

## Arquivo

| Atalho | Ação |
| --- | --- |
| `Ctrl+S` | Salvar workspace (`.svge`) |

## Ativação de ferramentas

Pressione uma tecla para trocar de ferramenta. A paleta de ferramentas também
mostra cada tecla como tooltip.

| Tecla | Ferramenta |
| --- | --- |
| `V` | Select |
| `P` | Pen |
| `I` | Eyedropper |
| `C` | Knife |
| `S` | Smooth |
| `G` | Gradient |
| `W` | Width |
| `O` | Symbol Sprayer |

Veja [Ferramentas](/svgengine-site/pt/using/tools/) para o que cada ferramenta
faz e a lista completa. Alguns recursos registram seus próprios atalhos (por
exemplo, Find & Replace).
