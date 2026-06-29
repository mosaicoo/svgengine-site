---
title: 'API: ai/nlu-voice-wasm'
description: API pública de @mosaicoo/svg-engine/ai/nlu-voice-wasm — o provider de voz Whisper on-device.
---

`@mosaicoo/svg-engine/ai/nlu-voice-wasm` fornece **speech-to-text 100% local /
offline** via **Whisper** (transformers.js + onnxruntime-web WASM). É um entry
point pesado e opt-in — as dependências de ML são carregadas lazy somente quando a
voz é de fato usada. Sem dependência de Angular Material/CDK.

```ts
import { provideWhisperVoice } from '@mosaicoo/svg-engine/ai/nlu-voice-wasm';
```

## Superfície pública

- **`WhisperVoiceService`** — um provider de voz com o mesmo contrato do
  `VoiceRecognitionService` (Web Speech), mas transcrevendo on-device com Whisper.
- **`provideWhisperVoice`** / **`provideWhisperVoiceEngine`** — providers que ligam
  o provider de voz Whisper ao DI.
- **`WHISPER_VOICE_CONFIG`** / **`DEFAULT_WHISPER_VOICE_CONFIG`** / **`WhisperVoiceConfig`**
  — configuração dos caminhos de modelo/asset, dtype e idioma padrão.

:::note[Pré-requisitos de assets]
Os arquivos de modelo (por padrão em `/assets/ml/whisper/…`) e os binários `.wasm`
do onnxruntime precisam ser servidos pela sua própria origem — sem rede externa em
runtime. Veja o [repositório da biblioteca](https://github.com/mosaicoo/svg-engine)
para a configuração.
:::
