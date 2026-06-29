---
title: 'API: ai/nlu-ui'
description: API pública de @mosaicoo/svg-engine/ai/nlu-ui — el componente de entrada de comandos y los servicios de voz.
---

`@mosaicoo/svg-engine/ai/nlu-ui` es la **UI de la capa de lenguaje natural**: una
caja de comandos texto/voz vinculada al motor de NLU, más el provider de voz Web
Speech del navegador. Depende de Angular Material.

```ts
import { SvgeNluInput } from '@mosaicoo/svg-engine/ai/nlu-ui';
```

## Superficie pública

- **`SvgeNluInput`** — el componente `<svge-nlu-input>`: una caja de comandos
  (texto + voz) que procesa la entrada vía `NaturalLanguageService` y despacha los
  comandos resultantes.
- **`VoiceRecognitionService`** — un provider de voz respaldado por la **Web Speech
  API** del navegador (idioma por defecto `pt-BR`). Implementa el contrato
  `VoiceProvider` de `ai/nlu`.
- **`VoiceEngineService`** — orquesta el provider de voz activo (permite cambiar
  Web Speech por el provider Whisper on-device de `ai/nlu-voice-wasm`).
