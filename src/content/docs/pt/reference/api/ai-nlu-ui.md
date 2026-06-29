---
title: 'API: ai/nlu-ui'
description: API pública de @mosaicoo/svg-engine/ai/nlu-ui — a caixa de comandos em linguagem natural e os serviços de voz do navegador.
---

`@mosaicoo/svg-engine/ai/nlu-ui` é a **UI da camada de linguagem natural**: uma
caixa de comandos pronta (texto + voz) ligada ao engine de NLU, mais o provider de
voz Web Speech do navegador e um orquestrador de engine. Depende de Angular Material.

```ts
import { SvgeNluInput } from '@mosaicoo/svg-engine/ai/nlu-ui';
```

## A caixa de comandos

| Componente | Seletor | O que é |
| --- | --- | --- |
| `SvgeNluInput` | `<svge-nlu-input>` | Uma caixa de comandos Material standalone: campo de texto + botão de microfone + preview ao vivo do melhor candidato (rótulo, confiança, barra), uma linha de status, um botão de confirmação para casamentos destrutivos/de baixa confiança, e uma lista clicável de alternativas. |

Bindings principais:

| Input / Output | Finalidade |
| --- | --- |
| `confirmGate?` | Hook chamado antes de rodar um intent destrutivo ou de baixa confiança. |
| `voiceLanguage?` / `voiceEngine?` | Escolhe o idioma de reconhecimento (ex.: `pt-BR`) e o engine (`web-speech`/`whisper`/`auto`). |
| `nluService?` / `confirmDialog?` | Sobrescreve o serviço de NLU ou o prompt de confirmação. |
| `resultExecuted` | Emite o `NluExecuteResult` após cada execução. |

## Serviços de voz

| API | Descrição |
| --- | --- |
| `VoiceRecognitionService` | Um `VoiceProvider` apoiado pela **Web Speech API** do navegador — privacidade em primeiro lugar e gratuito, sem download de modelo. Signals `isSupported`/`listening`/`lastError`, `listen(lang?, options?)` → transcrição final, `stop()`. |
| `VoiceEngineService` | Um orquestrador que expõe a mesma superfície `VoiceProvider`, permitindo alternar entre Web Speech e o provider Whisper on-device de forma transparente: `setEngine('web-speech' \| 'whisper' \| 'auto')`, signals `engine`/`whisperAvailable`/`availableEngines`. Persiste a escolha no localStorage. |

Ambos suportam idiomas como `pt-BR`, `en-US` e `es-ES`. O modo `auto` tenta o Web
Speech primeiro e cai para o Whisper quando ele está registrado (veja
[ai/nlu-voice-wasm](/svgengine-site/pt/reference/api/ai-nlu-voice-wasm/)).
