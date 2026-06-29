---
title: 'API: ai/nlu-ui'
description: API pública de @mosaicoo/svg-engine/ai/nlu-ui — o componente de entrada de comandos e os serviços de voz.
---

`@mosaicoo/svg-engine/ai/nlu-ui` é a **UI da camada de linguagem natural**: uma
caixa de comandos texto/voz ligada ao engine de NLU, mais o provider de voz Web
Speech do navegador. Depende de Angular Material.

```ts
import { SvgeNluInput } from '@mosaicoo/svg-engine/ai/nlu-ui';
```

## Superfície pública

- **`SvgeNluInput`** — o componente `<svge-nlu-input>`: uma caixa de comandos
  (texto + voz) que processa a entrada via `NaturalLanguageService` e despacha os
  comandos resultantes.
- **`VoiceRecognitionService`** — um provider de voz apoiado pela **Web Speech API**
  do navegador (idioma padrão `pt-BR`). Implementa o contrato `VoiceProvider` de
  `ai/nlu`.
- **`VoiceEngineService`** — orquestra o provider de voz ativo (permite trocar o
  Web Speech pelo provider Whisper on-device de `ai/nlu-voice-wasm`).
