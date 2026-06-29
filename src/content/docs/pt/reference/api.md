---
title: Referência da API
description: A superfície de API pública do svg-engine, organizada por entry point.
---

Esta referência documenta a **superfície de API pública** do svg-engine — os
símbolos exportados pelo `public-api.ts` de cada entry point. Ela é derivada do
código-fonte da library, que é a fonte da verdade.

## O que é público

Cada entry point secundário expõe um conjunto curado de classes, interfaces,
tipos, funções, serviços, comandos e tokens. Tudo que não é exportado pelo
`public-api.ts` de um entry point é interno e pode mudar sem aviso. A superfície
pública segue **SemVer** a partir do `1.0.0` (atualmente é `pré-1.0`, então a
superfície ainda está estabilizando).

A fronteira headless também se aplica aqui: `core`, `render`, `io`, `optimize`,
`edit` e `ai/nlu` **não** exportam tipos do Angular Material/CDK — apenas `ui` e
`ai/nlu-ui` exportam. Veja [Arquitetura](/svgengine-site/pt/guides/architecture/).

## Entry points

| Entry point | O que expõe | Material? |
| --- | --- | --- |
| [`core`](/svgengine-site/pt/reference/api/core/) | modelo de dados, tree ops imutáveis, document, comandos, serviços de history/state, geometria, animação, snapshots | Não |
| [`render`](/svgengine-site/pt/reference/api/render/) | o renderer, diretivas por tipo, viewport, registry de node-renderer | Não |
| [`io`](/svgengine-site/pt/reference/api/io/) | registries de importer/exporter + built-ins SVG/PNG/SVGZ, code generators | Não |
| [`optimize`](/svgengine-site/pt/reference/api/optimize/) | registry de optimizer + passes built-in + optimize command | Não |
| [`edit`](/svgengine-site/pt/reference/api/edit/) | seleção, transform, tools, plugins, registries, libraries, pages, efeitos | Não |
| [`ui`](/svgengine-site/pt/reference/api/ui/) | shells, painéis, dialogs, tool options, serviços | Sim |
| [`ai/nlu`](/svgengine-site/pt/reference/api/ai-nlu/) | engine de linguagem natural, dicionários, matchers, provider LLM | Não |
| [`ai/nlu-ui`](/svgengine-site/pt/reference/api/ai-nlu-ui/) | componente de input de comando + serviços de voz | Sim |
| [`ai/nlu-voice-wasm`](/svgengine-site/pt/reference/api/ai-nlu-voice-wasm/) | provider de voz Whisper on-device | Não |

:::note
Para as assinaturas exatas e mais atuais, o
[repositório da library](https://github.com/mosaicoo/svg-engine) é sempre
autoritativo.
:::
