---
title: 'API: ai/nlu-voice-wasm'
description: API pública de @mosaicoo/svg-engine/ai/nlu-voice-wasm — el provider de voz Whisper en el dispositivo y offline.
---

`@mosaicoo/svg-engine/ai/nlu-voice-wasm` ofrece **speech-to-text 100% local y
offline** vía **Whisper** (transformers.js + onnxruntime-web WASM). Es un entry
point pesado y opcional — las dependencias de ML se cargan de forma diferida, solo
cuando la voz se usa realmente. Sin dependencia de Angular Material/CDK.

```ts
import { provideWhisperVoiceEngine } from '@mosaicoo/svg-engine/ai/nlu-voice-wasm';
```

## Cómo conectarlo

Registra el engine en los providers de tu app; el `VoiceEngineService` (de
`ai/nlu-ui`) lo descubre entonces como el engine `whisper`.

| API | Descripción |
| --- | --- |
| `provideWhisperVoiceEngine(config?)` | El bootstrap completo: registra la config **y** el `WhisperVoiceService` como `VOICE_WHISPER_PROVIDER`. Ponlo en el `providers[]` raíz. |
| `provideWhisperVoice(config?)` | Registra solo la config (fusionada con los defaults). |
| `WhisperVoiceService` | El provider en sí — mismo contrato `VoiceProvider` que el de Web Speech, pero transcribiendo en el dispositivo: `listen(lang?, options?)` graba (con detección de actividad de voz) y transcribe localmente; signals `isSupported`/`listening`/`modelLoading`/`lastError`. Multilingüe (PT-BR / ES / EN). |
| `WHISPER_VOICE_CONFIG` / `DEFAULT_WHISPER_VOICE_CONFIG` | El token de inyección de la config y sus defaults. |

## Configuración

`WhisperVoiceConfig` controla el modelo, el runtime WASM y el comportamiento de
detección de actividad de voz:

| Campo | Default | Significado |
| --- | --- | --- |
| `modelBasePath` | `/assets/ml/whisper` | De dónde transformers.js carga el modelo. |
| `modelId` | `whisper-small` | Carpeta del modelo (p. ej. `whisper-base`, `whisper-small`). |
| `wasmBasePath` | `/assets/ml/ort/` | De dónde se sirven los binarios `.wasm` de onnxruntime. |
| `dtype` | `q8` | Cuantización del modelo (`q8`/`fp32`/`fp16`/…). |
| `numThreads` | `1` | Threads WASM (1 evita el requisito de COOP/COEP). |
| `defaultLanguage` | `pt` | Idioma BCP-47 usado cuando el llamador lo omite. |
| `maxRecordMs` | `15000` | Duración máxima de captura antes del auto-stop. |
| `silenceMs` / `silenceThreshold` | `1000` / `0.015` | Detección de actividad de voz: duración del silencio y umbral de energía RMS para auto-parar tras el habla. |
| `noSpeechTimeoutMs` | `6000` | Se rinde si no se detecta habla. |

:::caution[Prerrequisitos de assets]
Los archivos del modelo Whisper (bajo `modelBasePath`) y los binarios `.wasm` de
onnxruntime (bajo `wasmBasePath`) deben ser **servidos por tu propio origen** — no
hay llamada de red externa en runtime. Consulta el
[repositorio de la biblioteca](https://github.com/mosaicoo/svg-engine) para la
configuración de los assets.
:::
