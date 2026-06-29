---
title: 'API: ai/nlu-voice-wasm'
description: Public API of @mosaicoo/svg-engine/ai/nlu-voice-wasm — the on-device Whisper voice provider.
---

`@mosaicoo/svg-engine/ai/nlu-voice-wasm` provides **100% local / offline**
speech-to-text via **Whisper** (transformers.js + onnxruntime-web WASM). It's a
heavy, opt-in entry point — the ML dependencies are loaded lazily only when voice
is actually used. No Angular Material/CDK dependency.

```ts
import { provideWhisperVoice } from '@mosaicoo/svg-engine/ai/nlu-voice-wasm';
```

## Public surface

- **`WhisperVoiceService`** — a voice provider with the same contract as the Web
  Speech `VoiceRecognitionService`, but transcribing on-device with Whisper.
- **`provideWhisperVoice`** / **`provideWhisperVoiceEngine`** — providers that wire
  the Whisper voice provider into DI.
- **`WHISPER_VOICE_CONFIG`** / **`DEFAULT_WHISPER_VOICE_CONFIG`** / **`WhisperVoiceConfig`**
  — configuration of the model/asset paths, dtype and default language.

:::note[Asset prerequisites]
The model files (default under `/assets/ml/whisper/…`) and the onnxruntime `.wasm`
binaries must be served by your own origin — no external network at runtime. See
the [library repository](https://github.com/mosaicoo/svg-engine) for setup.
:::
