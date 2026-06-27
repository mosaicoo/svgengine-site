---
title: Contribuir
description: Cómo contribuir a la librería svg-engine.
---

svg-engine es **open source** (Apache-2.0) y las contribuciones son bienvenidas —
código, plugins, reportes de bugs, documentación y traducciones.

> Esta página trata de contribuir a la **librería**. El repositorio es
> [github.com/mosaicoo/svg-engine](https://github.com/mosaicoo/svg-engine).

## Obtén el código

```bash
git clone https://github.com/mosaicoo/svg-engine
cd svg-engine
npm install
```

Scripts comunes (workspace Angular):

```bash
npm run build:lib   # build de la librería (ng-packagr)
npm start           # levanta el playground (app de referencia) en :4200
npm run test:lib    # ejecuta la suite de tests de la librería
npm run lint        # eslint + angular-eslint
```

## Estructura del repositorio

- `projects/svg-engine/` — la librería y sus entry points
  (`core`, `render`, `io`, `optimize`, `edit`, `ui`, `ai/*`).
- `projects/playground/` — la app de referencia que ejercita todos los modos de
  consumo.
- `projects/svg-studio/` — la app studio standalone (la demo en vivo).
- `docs/` — arquitectura, decisiones, roadmap, API pública y la guía de plugins.

## Formas de contribuir

- **Escribe un plugin** — añade una tool, importer/exporter, efecto, paleta, menú
  o atajo sin tocar el core. Mira [Plugins](/svgengine-site/es/guides/plugins/).
- **Reporta un bug** — abre un issue con pasos para reproducir.
- **Mejora la documentación** — tanto la de la librería como este sitio.

## Pull requests

- Crea una rama desde `main`, mantén los cambios enfocados y asegúrate de que
  `npm run test:lib` y `npm run lint` pasen.
- Sigue los [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).
- El comportamiento nuevo debe venir con tests.

## Seguridad

Por favor, reporta las vulnerabilidades de forma privada, no en un issue público
— consulta la política de seguridad del repositorio.
