---
title: 'API: ai/nlu-voice-wasm'
description: API pública de @mosaicoo/svg-engine/ai/nlu-voice-wasm — el provider de voz Whisper on-device.
---

`@mosaicoo/svg-engine/ai/nlu-voice-wasm` ofrece **speech-to-text 100% local /
offline** vía **Whisper** (transformers.js + onnxruntime-web WASM). Es un entry
point pesado y opcional — las dependencias de ML se cargan de forma diferida solo
cuando la voz se usa realmente. Sin dependencia de Angular Material/CDK.

```ts
import { provideWhisperVoice } from '@mosaicoo/svg-engine/ai/nlu-voice-wasm';
```

## Superficie pública

- **`WhisperVoiceService`** — un provider de voz con el mismo contrato que
  `VoiceRecognitionService` (Web Speech), pero transcribiendo on-device con Whisper.
- **`provideWhisperVoice`** / **`provideWhisperVoiceEngine`** — providers que conectan
  el provider de voz Whisper al DI.
- **`WHISPER_VOICE_CONFIG`** / **`DEFAULT_WHISPER_VOICE_CONFIG`** / **`WhisperVoiceConfig`**
  — configuración de las rutas de modelo/asset, dtype e idioma por defecto.

:::note[Prerrequisitos de assets]
Los archivos del modelo (por defecto en `/assets/ml/whisper/…`) y los binarios
`.wasm` de onnxruntime deben ser servidos por tu propio origen — sin red externa
en runtime. Consulta el [repositorio de la biblioteca](https://github.com/mosaicoo/svg-engine)
para la configuración.
:::
