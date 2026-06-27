---
title: Atajos de teclado
description: Los atajos de teclado integrados del editor y las teclas de activación de herramientas.
---

Los atajos del editor los aportan plugins opt-in y se registran en un
`ShortcutRegistry`, así que una app puede reasignar o desactivar cualquiera. El
shell drop-in habilita el conjunto integrado de abajo por defecto.

:::note
En macOS, `Ctrl` equivale a `Cmd` — el parser de combos trata `Ctrl` como el
modificador primario cross-platform. Los atajos también se suprimen mientras
escribes en un campo de texto, así que `Ctrl+C`/`Ctrl+V` hacen copiar/pegar
nativo ahí.
:::

## Edición

| Atajo | Acción |
| --- | --- |
| `Ctrl+Z` | Deshacer el último comando |
| `Ctrl+Y` | Rehacer (idiom Windows) |
| `Ctrl+Shift+Z` | Rehacer (idiom macOS / Linux) |
| `Ctrl+X` | Cortar selección |
| `Ctrl+C` | Copiar selección |
| `Ctrl+V` | Pegar |
| `Ctrl+Shift+V` | Pegar en el lugar |
| `Ctrl+D` | Duplicar selección |

## Objetos

| Atajo | Acción |
| --- | --- |
| `Ctrl+G` | Agrupar selección |
| `Ctrl+Shift+G` | Desagrupar el grupo enfocado |

## Selección

| Atajo | Acción |
| --- | --- |
| `Ctrl+A` | Seleccionar todos los objetos de la página activa |
| `Flechas` | Mover la selección |
| `Shift` + `Flechas` | Mover la selección (paso mayor) |
| `Delete` | Eliminar la selección |

## Snapshots

| Atajo | Acción |
| --- | --- |
| `Ctrl+Shift+S` | Tomar un snapshot del documento actual |
| `Ctrl+Alt+Z` | Restaurar el snapshot más reciente |

## Archivo

| Atajo | Acción |
| --- | --- |
| `Ctrl+S` | Guardar workspace (`.svge`) |

## Activación de herramientas

Pulsa una tecla para cambiar de herramienta. La paleta de herramientas también
muestra cada tecla como tooltip.

| Tecla | Herramienta |
| --- | --- |
| `V` | Select |
| `A` | Direct Select |
| `B` | Pen |
| `P` | Pencil |
| `R` | Rectangle |
| `E` | Ellipse |
| `Y` | Polygon |
| `T` | Text |
| `I` | Eyedropper |
| `C` | Knife |
| `S` | Smooth |
| `G` | Gradient |
| `W` | Width |
| `O` | Symbol Sprayer |
| `Shift`+`O` | Page (Artboard) |

Mira [Herramientas](/svgengine-site/es/using/tools/) para saber qué hace cada
herramienta. Algunas funciones registran sus propios atajos (por ejemplo, Find &
Replace).
