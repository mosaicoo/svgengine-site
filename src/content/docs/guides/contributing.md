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
npm run test:lib    # run the library test suite (build the lib first)
npm run lint        # eslint + angular-eslint
```

`test:lib` runs against the built library, so run `build:lib` before it. Node
`^20.19 || ^22.12 || >=24` is required (see the package `engines` field).

## Repository layout

- `projects/svg-engine/` — the library and its entry points
  (`core`, `render`, `io`, `optimize`, `edit`, `ui`, `ai/*`).
- `projects/playground/` — the reference app that exercises every consumption
  mode.
- `projects/svg-studio/` — the standalone studio app (the live demo).

The repository's own developer docs live under `docs/` and evolve with the code —
treat the repository as the source of truth. Start from the
[`CONTRIBUTING.md`](https://github.com/mosaicoo/svg-engine/blob/main/CONTRIBUTING.md).

## Ways to contribute

- **Write a plugin** — add a tool, importer/exporter, effect, palette, menu or
  shortcut without touching the core. See [Plugins](/svgengine-site/guides/plugins/).
- **Report a bug or ask a question** — open an issue; the repository provides
  issue forms for bug reports, feature requests, documentation and questions.
- **Improve the docs** — both the library docs and this website.

## Pull requests

- Branch from `main`, keep changes focused, and make sure `npm run test:lib` and
  `npm run lint` pass.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) in English
  (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).
- PRs are merged by **squash**, so the PR title becomes the commit message — make
  it a good Conventional Commit line.
- New behavior should come with tests.

## Security

Please report vulnerabilities privately rather than in a public issue. Use GitHub
[Private Vulnerability Reporting](https://github.com/mosaicoo/svg-engine/security/policy),
which is the process described in the repository's `SECURITY.md`.

Any known advisories are listed there. As of the current release, the only known
advisories are in the optional `@huggingface/transformers` dependency chain, so
they affect **only** apps that use the `ai/nlu-voice-wasm` entry point — projects
that don't use on-device voice are not affected.
