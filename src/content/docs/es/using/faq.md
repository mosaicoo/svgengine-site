---
title: FAQ
description: Preguntas frecuentes sobre svg-engine.
---

## ¿svg-engine es open source?

Sí. Tiene licencia **Apache-2.0**, se desarrolla en
[GitHub](https://github.com/mosaicoo/svg-engine) y se publica en npm como
[`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).

## ¿Está listo para producción?

Está en **pre-1.0** (la línea `0.1.x`) — la API pública aún se está estabilizando.
Es usable hoy, pero espera cambios antes del `1.0.0`.

## ¿Qué necesito para usarlo?

**Angular v21.** Instala el paquete junto con Angular:

```bash
npm install @mosaicoo/svg-engine @angular/core@^21
```

Material y CDK solo son necesarios si consumes la capa `ui`.

## ¿Tengo que usar Angular Material?

**No.** Las capas headless (`core`, `render`, `io`, `optimize`, `edit`) tienen
dependencia cero de `@angular/material` o `@angular/cdk`. Solo la capa `ui` (y la
`ai/nlu-ui`) usa Material, y es opt-in. Mira
[Arquitectura](/svgengine-site/es/guides/architecture/).

## ¿Puedo usarlo sin la UI completa del editor?

Sí. Usa `render` para un visor read-only, o `core`/`edit` de forma headless para
construir tu propia UI. Mira [Entry points](/svgengine-site/es/reference/entry-points/).

## ¿Funciona fuera de Angular?

svg-engine es una **librería Angular** — está diseñada para apps Angular. El motor
headless funciona sin ninguna UI, pero los paquetes son paquetes Angular.

## ¿Puedo extenderlo?

Sí — un [sistema de plugins](/svgengine-site/es/guides/plugins/) permite añadir
tools, importers/exporters, efectos, paletas, menús, atajos y más sin hacer fork
del core.

## ¿Soporta lenguaje natural o voz?

Hay una **capa de IA opcional** (`ai/nlu`, `ai/nlu-ui`, `ai/nlu-voice-wasm`) para
comandos por lenguaje natural y voz en el dispositivo. Es totalmente opt-in y está
desacoplada del core del editor.

## ¿Qué importa y exporta?

Importa **SVG** (sanitizado a la entrada) y exporta **SVG** y **PNG**.

## ¿Qué tamaño tiene el bundle?

Los entry points son independientes y **tree-shakeable** — envías solo lo que
importas, desde un visor read-only pequeño hasta el editor completo.

## ¿Dónde puedo probarlo?

La [demo en vivo](/svgengine-site/es/demo/) ejecuta el editor completo en tu
navegador.

## ¿Cómo reporto un bug o contribuyo?

A través del [repositorio en GitHub](https://github.com/mosaicoo/svg-engine).
