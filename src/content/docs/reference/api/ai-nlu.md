---
title: 'API: ai/nlu'
description: Public API of @mosaicoo/svg-engine/ai/nlu — the headless natural-language engine that turns text commands into editor actions, with an optional local LLM layer.
---

`@mosaicoo/svg-engine/ai/nlu` is the **opt-in natural-language layer** (headless,
no Material/CDK). It turns a phrase like "draw a red circle" into an editor action:
a rule-based engine matches the text against registered intents, extracts slots,
and either returns ranked candidates or auto-executes the best one. An optional
local-LLM layer handles requests the rules can't.

```ts
import { NaturalLanguageService, builtinNluPlugin } from '@mosaicoo/svg-engine/ai/nlu';
```

## The engine

| API | Description | Use it to |
| --- | --- | --- |
| `NaturalLanguageService` | The intent registry + matcher. `registerIntent(intent)` → `Disposable`; `parse(text, ctx, opts?)` returns ranked `NluCandidate[]`; `execute(text, ctx, opts?)` parses and auto-runs the top match when confident; `intents`/`intentsCount` signals. | Register intents and turn text into editor actions. |
| `builtinNluPlugin` | A plugin (install via `provideSvgEnginePlugin(builtinNluPlugin)`) that auto-discovers every menu command as an intent and adds built-ins like `create-shape`, `set-fill`, `move-selected`, `resize-selected`, `duplicate-selected`. | Get a working command vocabulary out of the box. |
| `discoverMenuIntents(...)` / `discoverMenuIntentsReactive(...)` | Convert `MenuContributionRegistry` entries into intents — once, or continuously as plugins install. | Expose your menus to natural language automatically. |

```ts
const nlu = inject(NaturalLanguageService);
const result = await nlu.execute('desenhe um círculo vermelho', { injector });
if (!result.executed) console.log(result.rejection); // why it didn't run
```

## Core types

| Type | Description |
| --- | --- |
| `NluIntent` | An intent definition: `id`, `keywords`, optional `actionKeywords`/`slots`/`destructive`/`description`, and `execute(slots, ctx)`. |
| `NluContext` | The per-call context — carries the `injector` so an intent can resolve editor services. |
| `NluCandidate` | A parse result: the matched `intent`, a `confidence` in [0,1], extracted `slots`, and the `matches` that explain it. |
| `NluSlotSchema` | A slot's shape: `number`, `color`, `shape`, `enum`, `string`, `point` or `gradient`, with `optional`/`default`/anchor keywords. |
| `NluParseOptions` | `threshold` (default 0.3) and `maxResults` (default 5). |
| `NluExecuteOptions` | Adds `autoExecuteThreshold` (default 0.7) and `confirmGate` (a confirmation hook — required for `destructive` intents). |
| `NluExecuteResult` | The outcome: `executed`, the `candidate`, `alternatives`, and a `rejection` reason (`no-match`, `below-threshold`, `confirmation-declined`, `destructive-no-gate`, `execute-error`, or `null`). |
| `NluLanguage` | Detected language: `pt`, `en` or `unknown`. |

## Optional LLM layer

For requests the rule-based engine can't resolve, escalate to a chat LLM (e.g. a
local [Ollama](https://ollama.com) server). The contract is pluggable.

| API | Description |
| --- | --- |
| `AiChatProvider` / `AI_CHAT_PROVIDER` | The LLM backend contract (`chat(messages, opts?)`, `isConfigured`, `defaultModel`) and its injection token (defaults to none). |
| `provideOllamaChat(config?)` | Wire up the built-in Ollama provider. Config: `baseUrl`, `model`, `models`. |
| `DEFAULT_OLLAMA_BASE_URL` / `DEFAULT_OLLAMA_MODEL` / `DEFAULT_OLLAMA_MODELS` | Defaults: `http://localhost:11434`, `qwen2.5:3b`, and a small list of suggested Qwen models. |
| `LlmIntentResolverService` | The escalation layer: `resolvePlan(text, ctx)` asks the LLM to break a complex request into a multi-step intent plan; `resolveAndExecute(text, ctx)` runs it. |
| `AiChatMessage` / `AiChatOptions` | The chat message (`role`, `content`) and per-call options (`model`, `format`, `temperature`, …). |

## Voice contract

`ai/nlu` defines the voice provider contract; the actual implementations live in
`ai/nlu-ui` (Web Speech) and `ai/nlu-voice-wasm` (on-device Whisper).

| API | Description |
| --- | --- |
| `VoiceProvider` | A speech-recognition provider: `isSupported`/`listening`/`lastError` signals, `listen(lang?, options?)` → transcript, `stop()`. |
| `VoiceEngine` | Which engine to use: `web-speech`, `whisper` or `auto`. |
| `VOICE_WHISPER_PROVIDER` | Injection token for the optional Whisper provider (defaults to none). |

:::note
`ai/nlu` also exports the lower-level pieces the engine is built from —
tokenization & fuzzy matching (`tokenize`, `levenshtein`, `bestMatch`, …), the
PT/EN dictionaries (`COLOR_DICTIONARY`, `SHAPE_DICTIONARY`, `ACTION_DICTIONARY`, …),
color math, slot parsers and `detectLanguage`. They're useful for building custom
intents but aren't needed for everyday use. The
[library repository](https://github.com/mosaicoo/svg-engine) is authoritative for
exact signatures.
:::
