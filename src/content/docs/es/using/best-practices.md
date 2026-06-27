---
title: Buenas prácticas
description: Consejos para sacar el máximo del editor — y para integrarlo.
---

## Trabajar con el arte

- **Organiza con capas y grupos.** Agrupa objetos relacionados y **bloquea** lo
  que no estás editando, para no moverlo por accidente.
- **Usa snap, align y distribute.** Deja que el snap alinee los objetos mientras
  arrastras, y usa las opciones de Align/Distribute de
  [Select](/svgengine-site/es/using/tools/select/) para layouts limpios.
- **Convierte formas en paths antes de editar anchors.** Los rectángulos, elipses
  y polígonos se vuelven libremente editables tras convertirlos; luego usa
  [Direct Select](/svgengine-site/es/using/tools/direct-select/).
- **Elige el camino correcto del trazo.** Para trazos caligráficos o de ancho
  variable, selecciona un brush antes de dibujar con el
  [Pencil](/svgengine-site/es/using/tools/pencil/), o aplica la herramienta
  [Width](/svgengine-site/es/using/tools/width/) a un path existente.
- **Toma snapshots antes de cambios grandes** (`Ctrl+Shift+S`) para poder
  volver.
- **Mueve con precisión.** Las flechas mueven la selección; mantén **Shift** para
  un paso mayor.

## Integrar la librería

- **Importa solo lo que necesites.** Los entry points son independientes — un
  visor solo necesita `render`; no pagas por el editor ni por Material si no los
  usas.
- **Mantén la frontera headless.** No recurras a `ui` salvo que quieras el editor
  Material; las capas headless se mantienen ligeras.
- **Extiende con plugins, no con forks.** Añade tools, importers, efectos y más
  mediante los registries — mira [Plugins](/svgengine-site/es/guides/plugins/).
- **Enruta las mutaciones por comandos.** Despachar comandos mantiene el
  undo/redo consistente gratis.

Mira [Arquitectura](/svgengine-site/es/guides/architecture/) para el razonamiento
detrás de esto.
