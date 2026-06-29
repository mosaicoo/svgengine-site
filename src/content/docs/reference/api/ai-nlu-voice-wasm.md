---
title: 'API: ai/nlu-voice-wasm'
description: Public API of @mosaicoo/svg-engine/ai/nlu-voice-wasm — the on-device, offline Whisper voice provider.
---

`@mosaicoo/svg-engine/ai/nlu-voice-wasm` provides **100% local, offline**
speech-to-text via **Whisper** (transformers.js + onnxruntime-web WASM). It's a
heavy, opt-in entry point — the ML dependencies load lazily, only when voice is
actually used. No Angular Material/CDK dependency.

```ts
import { provideWhisperVoiceEngine } from '@mosaicoo/svg-engine/ai/nlu-voice-wasm';
```

## Wiring it up

Register the engine in your app providers; `VoiceEngineService` (from `ai/nlu-ui`)
then discovers it as the `whisper` engine.

| API | Description |
| --- | --- |
| `provideWhisperVoiceEngine(config?)` | The complete bootstrap: registers the config **and** `WhisperVoiceService` as the `VOICE_WHISPER_PROVIDER`. Put it in your root `providers[]`. |
| `provideWhisperVoice(config?)` | Registers just the config (merged with the defaults). |
| `WhisperVoiceService` | The provider itself — same `VoiceProvider` contract as the Web Speech one, but transcribing on-device: `listen(lang?, options?)` records (with voice-activity detection) and transcribes locally; `isSupported`/`listening`/`modelLoading`/`lastError` signals. Multilingual (PT-BR / ES / EN). |
| `WHISPER_VOICE_CONFIG` / `DEFAULT_WHISPER_VOICE_CONFIG` | The config injection token and its defaults. |

## Configuration

`WhisperVoiceConfig` controls the model, the WASM runtime and the
voice-activity-detection behaviour:

| Field | Default | Meaning |
| --- | --- | --- |
| `modelBasePath` | `/assets/ml/whisper` | Where transformers.js loads the model from. |
| `modelId` | `whisper-small` | Model folder (e.g. `whisper-base`, `whisper-small`). |
| `wasmBasePath` | `/assets/ml/ort/` | Where the onnxruntime `.wasm` binaries are served. |
| `dtype` | `q8` | Model quantization (`q8`/`fp32`/`fp16`/…). |
| `numThreads` | `1` | WASM threads (1 avoids the COOP/COEP requirement). |
| `defaultLanguage` | `pt` | BCP-47 language used when the caller omits one. |
| `maxRecordMs` | `15000` | Max capture length before auto-stop. |
| `silenceMs` / `silenceThreshold` | `1000` / `0.015` | Voice-activity detection: silence duration and RMS energy threshold to auto-stop after speech. |
| `noSpeechTimeoutMs` | `6000` | Give up if no speech is detected. |

:::caution[Asset prerequisites]
The Whisper model files (under `modelBasePath`) and the onnxruntime `.wasm`
binaries (under `wasmBasePath`) must be **served by your own origin** — there is no
external network call at runtime. See the
[library repository](https://github.com/mosaicoo/svg-engine) for the asset setup.
:::
