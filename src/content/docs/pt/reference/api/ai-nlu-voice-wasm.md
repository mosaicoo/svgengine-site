---
title: 'API: ai/nlu-voice-wasm'
description: API pública de @mosaicoo/svg-engine/ai/nlu-voice-wasm — o provider de voz Whisper on-device e offline.
---

`@mosaicoo/svg-engine/ai/nlu-voice-wasm` fornece **speech-to-text 100% local e
offline** via **Whisper** (transformers.js + onnxruntime-web WASM). É um entry point
pesado e opt-in — as dependências de ML carregam de forma lazy, só quando a voz é de
fato usada. Sem dependência de Angular Material/CDK.

```ts
import { provideWhisperVoiceEngine } from '@mosaicoo/svg-engine/ai/nlu-voice-wasm';
```

## Como conectar

Registre o engine nos providers do app; o `VoiceEngineService` (de `ai/nlu-ui`)
então o descobre como o engine `whisper`.

| API | Descrição |
| --- | --- |
| `provideWhisperVoiceEngine(config?)` | O bootstrap completo: registra a config **e** o `WhisperVoiceService` como `VOICE_WHISPER_PROVIDER`. Coloque no `providers[]` raiz. |
| `provideWhisperVoice(config?)` | Registra só a config (mesclada com os padrões). |
| `WhisperVoiceService` | O próprio provider — mesmo contrato `VoiceProvider` do Web Speech, mas transcrevendo on-device: `listen(lang?, options?)` grava (com detecção de atividade de voz) e transcreve localmente; signals `isSupported`/`listening`/`modelLoading`/`lastError`. Multilíngue (PT-BR / ES / EN). |
| `WHISPER_VOICE_CONFIG` / `DEFAULT_WHISPER_VOICE_CONFIG` | O token de injeção da config e seus padrões. |

## Configuração

`WhisperVoiceConfig` controla o modelo, o runtime WASM e o comportamento de detecção
de atividade de voz:

| Campo | Padrão | Significado |
| --- | --- | --- |
| `modelBasePath` | `/assets/ml/whisper` | De onde o transformers.js carrega o modelo. |
| `modelId` | `whisper-small` | Pasta do modelo (ex.: `whisper-base`, `whisper-small`). |
| `wasmBasePath` | `/assets/ml/ort/` | De onde os binários `.wasm` do onnxruntime são servidos. |
| `dtype` | `q8` | Quantização do modelo (`q8`/`fp32`/`fp16`/…). |
| `numThreads` | `1` | Threads WASM (1 evita o requisito de COOP/COEP). |
| `defaultLanguage` | `pt` | Idioma BCP-47 usado quando o chamador omite. |
| `maxRecordMs` | `15000` | Duração máxima de captura antes do auto-stop. |
| `silenceMs` / `silenceThreshold` | `1000` / `0.015` | Detecção de atividade de voz: duração do silêncio e limiar de energia RMS para auto-parar após a fala. |
| `noSpeechTimeoutMs` | `6000` | Desiste se nenhuma fala for detectada. |

:::caution[Pré-requisitos de assets]
Os arquivos do modelo Whisper (sob `modelBasePath`) e os binários `.wasm` do
onnxruntime (sob `wasmBasePath`) precisam ser **servidos pela sua própria origem** —
não há chamada de rede externa em runtime. Veja o
[repositório da biblioteca](https://github.com/mosaicoo/svg-engine) para a
configuração dos assets.
:::
