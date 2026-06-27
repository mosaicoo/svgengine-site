---
title: FAQ
description: Perguntas frequentes sobre o svg-engine.
---

## O svg-engine é open source?

Sim. É licenciado sob **Apache-2.0**, desenvolvido no
[GitHub](https://github.com/mosaicoo/svg-engine) e publicado no npm como
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).

## Está pronto para produção?

Está em **pré-1.0** (a linha `0.1.x`) — a API pública ainda está estabilizando. É
utilizável hoje, mas espere mudanças antes do `1.0.0`.

## O que eu preciso para usar?

**Angular v21.** Instale o pacote junto com o Angular:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Material e CDK só são necessários se você consumir a camada `ui`.

## Preciso usar o Angular Material?

**Não.** As camadas headless (`core`, `render`, `io`, `optimize`, `edit`) têm
dependência zero de `@angular/material` ou `@angular/cdk`. Só a camada `ui` (e a
`ai/nlu-ui`) usa Material, e é opt-in. Veja
[Arquitetura](/svgengine-site/pt/guides/architecture/).

## Posso usar sem a UI completa do editor?

Sim. Use `render` para um viewer read-only, ou `core`/`edit` de forma headless
para construir sua própria UI. Veja [Entry points](/svgengine-site/pt/reference/entry-points/).

## Funciona fora do Angular?

O svg-engine é uma **library Angular** — foi desenhado para apps Angular. O engine
headless roda sem nenhuma UI, mas os pacotes são pacotes Angular.

## Posso estendê-lo?

Sim — um [sistema de plugins](/svgengine-site/pt/guides/plugins/) permite adicionar
tools, importers/exporters, efeitos, paletas, menus, atalhos e mais sem fork do
core.

## Suporta linguagem natural ou voz?

Há uma **camada de IA opcional** (`ai/nlu`, `ai/nlu-ui`, `ai/nlu-voice-wasm`) para
comandos por linguagem natural e voz on-device. É totalmente opt-in e desacoplada
do core do editor.

## O que ele importa e exporta?

Importa **SVG** (sanitizado na entrada) e exporta **SVG** e **PNG**.

## Qual o tamanho do bundle?

Os entry points são independentes e **tree-shakeable** — você envia só o que
importa, de um viewer read-only pequeno até o editor completo.

## Onde posso experimentar?

A [demo ao vivo](/svgengine-site/pt/demo/) roda o editor completo no seu
navegador.

## Como reporto um bug ou contribuo?

Pelo [repositório no GitHub](https://github.com/mosaicoo/svg-engine).
