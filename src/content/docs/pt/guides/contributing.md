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
npm run test:lib    # roda a suíte de testes da library (buildar a lib antes)
npm run lint        # eslint + angular-eslint
```

O `test:lib` roda contra a library já buildada, então rode o `build:lib` antes.
É exigido Node `^20.19 || ^22.12 || >=24` (veja o campo `engines` do pacote).

## Layout do repositório

- `projects/svg-engine/` — a library e seus entry points
  (`core`, `render`, `io`, `optimize`, `edit`, `ui`, `ai/*`).
- `projects/playground/` — o app de referência que exercita todos os modos de
  consumo.
- `projects/svg-studio/` — o app studio standalone (a demo ao vivo).

Os docs de desenvolvimento do próprio repositório ficam em `docs/` e evoluem com o
código — trate o repositório como a fonte da verdade. Comece pelo
[`CONTRIBUTING.md`](https://github.com/mosaicoo/svg-engine/blob/main/CONTRIBUTING.md).

## Formas de contribuir

- **Escreva um plugin** — adicione uma tool, importer/exporter, efeito, paleta,
  menu ou atalho sem tocar no core. Veja [Plugins](/svgengine-site/pt/guides/plugins/).
- **Relate um bug ou tire uma dúvida** — abra uma issue; o repositório oferece
  issue forms para bug report, feature request, documentação e perguntas.
- **Melhore a documentação** — tanto a da library quanto este site.

## Pull requests

- Crie um branch a partir de `main`, mantenha as mudanças focadas e garanta que
  `npm run test:lib` e `npm run lint` passem.
- Siga os [Conventional Commits](https://www.conventionalcommits.org/) em inglês
  (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).
- Os PRs são mesclados por **squash**, então o título do PR vira a mensagem do
  commit — faça dele uma boa linha Conventional Commit.
- Comportamentos novos devem vir com testes.

## Segurança

Por favor, relate vulnerabilidades de forma privada, e não em uma issue pública.
Use o [Private Vulnerability Reporting](https://github.com/mosaicoo/svg-engine/security/policy)
do GitHub, que é o processo descrito no `SECURITY.md` do repositório.

As advisories conhecidas ficam listadas lá. No release atual, as únicas advisories
conhecidas estão na cadeia de dependência opcional `@huggingface/transformers`,
então afetam **apenas** apps que usam o entry point `ai/nlu-voice-wasm` — projetos
que não usam voz on-device não são afetados.
