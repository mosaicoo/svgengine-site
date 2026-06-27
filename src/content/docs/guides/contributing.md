---
title: Contributing
description: How to contribute to the svg-engine library.
---

svg-engine is **open source** (Apache-2.0) and contributions are welcome — code,
plugins, bug reports, documentation and translations.

> This page is about contributing to the **library**. The repository is
> [github.com/mosaicoo/svg-engine](https://github.com/mosaicoo/svg-engine).

## Get the code

```bash
git clone https://github.com/mosaicoo/svg-engine
cd svg-engine
npm install
```

Common scripts (Angular workspace):

```bash
npm run build:lib   # build the library (ng-packagr)
npm start           # serve the playground (reference app) on :4200
npm run test:lib    # run the library test suite
npm run lint        # eslint + angular-eslint
```

## Repository layout

- `projects/svg-engine/` — the library and its entry points
  (`core`, `render`, `io`, `optimize`, `edit`, `ui`, `ai/*`).
- `projects/playground/` — the reference app that exercises every consumption
  mode.
- `projects/svg-studio/` — the standalone studio app (the live demo).
- `docs/` — architecture, decisions, roadmap, public API and the plugin guide.

## Ways to contribute

- **Write a plugin** — add a tool, importer/exporter, effect, palette, menu or
  shortcut without touching the core. See [Plugins](/svgengine-site/guides/plugins/).
- **Report a bug** — open an issue with steps to reproduce.
- **Improve the docs** — both the library docs and this website.

## Pull requests

- Branch from `main`, keep changes focused, and make sure `npm run test:lib` and
  `npm run lint` pass.
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).
- New behavior should come with tests.

## Security

Please report vulnerabilities privately rather than in a public issue — see the
repository's security policy.
