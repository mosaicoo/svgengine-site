---
title: 'API: ai/nlu-ui'
description: Public API of @mosaicoo/svg-engine/ai/nlu-ui — the natural-language command box and the browser voice services.
---

`@mosaicoo/svg-engine/ai/nlu-ui` is the **UI for the natural-language layer**: a
ready-made command box (text + voice) bound to the NLU engine, plus the browser
Web Speech voice provider and an engine orchestrator. Depends on Angular Material.

```ts
import { SvgeNluInput } from '@mosaicoo/svg-engine/ai/nlu-ui';
```

## The command box

| Component | Selector | What it is |
| --- | --- | --- |
| `SvgeNluInput` | `<svge-nlu-input>` | A standalone Material command box: text field + mic button + a live preview of the top candidate (label, confidence, bar), a status line, a confirm button for destructive/low-confidence matches, and a clickable alternatives list. |

Key bindings:

| Input / Output | Purpose |
| --- | --- |
| `confirmGate?` | Hook called before running a destructive or low-confidence intent. |
| `voiceLanguage?` / `voiceEngine?` | Choose the recognition language (e.g. `pt-BR`) and engine (`web-speech`/`whisper`/`auto`). |
| `nluService?` / `confirmDialog?` | Override the NLU service or the confirmation prompt. |
| `resultExecuted` | Emits the `NluExecuteResult` after each run. |

## Voice services

| API | Description |
| --- | --- |
| `VoiceRecognitionService` | A `VoiceProvider` backed by the browser **Web Speech API** — privacy-first and free, no model download. `isSupported`/`listening`/`lastError` signals, `listen(lang?, options?)` → final transcript, `stop()`. |
| `VoiceEngineService` | An orchestrator exposing the same `VoiceProvider` surface, so you can switch between Web Speech and the on-device Whisper provider transparently: `setEngine('web-speech' \| 'whisper' \| 'auto')`, `engine`/`whisperAvailable`/`availableEngines` signals. Persists the choice to localStorage. |

Both support languages such as `pt-BR`, `en-US` and `es-ES`. `auto` mode tries Web
Speech first and falls back to Whisper when it's registered (see
[ai/nlu-voice-wasm](/svgengine-site/reference/api/ai-nlu-voice-wasm/)).
