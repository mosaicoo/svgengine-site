---
title: 'API: ai/nlu-ui'
description: Public API of @mosaicoo/svg-engine/ai/nlu-ui — the command input component and voice services.
---

`@mosaicoo/svg-engine/ai/nlu-ui` is the **UI for the natural-language layer**: a
text/voice command box bound to the NLU engine, plus the browser Web Speech voice
provider. Depends on Angular Material.

```ts
import { SvgeNluInput } from '@mosaicoo/svg-engine/ai/nlu-ui';
```

## Public surface

- **`SvgeNluInput`** — the `<svge-nlu-input>` component: a command box (text +
  voice) that parses input through `NaturalLanguageService` and dispatches the
  resulting commands.
- **`VoiceRecognitionService`** — a voice provider backed by the browser **Web
  Speech API** (default language `pt-BR`). Implements the `VoiceProvider`
  contract from `ai/nlu`.
- **`VoiceEngineService`** — orchestrates the active voice provider (so you can
  swap Web Speech for the on-device Whisper provider from `ai/nlu-voice-wasm`).
