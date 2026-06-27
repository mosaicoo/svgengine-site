---
title: Contribuindo
description: Como contribuir com a library svg-engine.
---

O svg-engine é **open source** (Apache-2.0) e contribuições são bem-vindas —
código, plugins, relatos de bug, documentação e traduções.

> Esta página é sobre contribuir com a **library**. O repositório é
> [github.com/mosaicoo/svg-engine](https://github.com/mosaicoo/svg-engine).

## Obtenha o código

```bash
git clone https://github.com/mosaicoo/svg-engine
cd svg-engine
npm install
```

Scripts comuns (workspace Angular):

```bash
npm run build:lib   # build da library (ng-packagr)
npm start           # sobe o playground (app de referência) na :4200
npm run test:lib    # roda a suíte de testes da library
npm run lint        # eslint + angular-eslint
```

## Layout do repositório

- `projects/svg-engine/` — a library e seus entry points
  (`core`, `render`, `io`, `optimize`, `edit`, `ui`, `ai/*`).
- `projects/playground/` — o app de referência que exercita todos os modos de
  consumo.
- `projects/svg-studio/` — o app studio standalone (a demo ao vivo).
- `docs/` — arquitetura, decisões, roadmap, API pública e o guia de plugins.

## Formas de contribuir

- **Escreva um plugin** — adicione uma tool, importer/exporter, efeito, paleta,
  menu ou atalho sem tocar no core. Veja [Plugins](/svgengine-site/pt/guides/plugins/).
- **Relate um bug** — abra uma issue com passos para reproduzir.
- **Melhore a documentação** — tanto a da library quanto este site.

## Pull requests

- Crie um branch a partir de `main`, mantenha as mudanças focadas e garanta que
  `npm run test:lib` e `npm run lint` passem.
- Siga os [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).
- Comportamentos novos devem vir com testes.

## Segurança

Por favor, relate vulnerabilidades de forma privada, e não em uma issue pública —
veja a política de segurança do repositório.
