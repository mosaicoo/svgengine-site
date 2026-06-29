---
title: 'API: ai/nlu'
description: Public API of @mosaicoo/svg-engine/ai/nlu — the rule-based natural-language engine, dictionaries, fuzzy matchers and optional LLM provider.
---

`@mosaicoo/svg-engine/ai/nlu` is the **opt-in natural-language layer** (headless):
a rule-based engine that turns text into editor commands, with PT/EN dictionaries,
fuzzy matching, slot extraction and an optional local LLM provider. No Angular
Material/CDK dependency.

```ts
import { NaturalLanguageService, builtinNluPlugin } from '@mosaicoo/svg-engine/ai/nlu';
```

## Engine

- **`NaturalLanguageService`** — `parse(text, ctx)` → intent + slots (regex +
  dictionaries + fuzzy match).
- **`NluDictionaryRegistry`** — register custom dictionaries.
- **`builtinNluPlugin`** — auto-discovers menu intents + ships custom intents.

## Core types

- **`NluIntent`**, **`NluCandidate`**, **`NluContext`**, **`NluParseOptions`**,
  **`NluExecuteOptions`**, **`NluExecuteResult`**, **`NluMatchReason`**,
  **`NluLanguage`**, **`NluShapeKind`**, **`NluSlotSchema`**, **`ExtractContext`**,
  **`ExtractedSlots`**.

## Tokenization & fuzzy matching

- **`tokenize`**, **`tokenizeWithoutStopwords`**, **`deaccent`**, **`normalize`**,
  **`levenshtein`**, **`fuzzyMatchToken`**, **`fuzzyMatchAll`**, **`fuzzyMatchAny`**,
  **`bestMatch`**, **`adaptiveMaxDistance`**, **`FuzzyMatch`**.
- Stopwords: **`isStopword`**, **`STOPWORDS`**, **`STOPWORDS_EN`**, **`STOPWORDS_PT`**.
- Vagueness gate: **`isVagueForRuleBased`**, **`VAGUE_MIN_MEANINGFUL_TOKENS`**,
  **`VAGUE_RECOGNIZED_FRACTION`**.

## Dictionaries

- Actions: **`ACTION_DICTIONARY`**, **`ACTION_DICTIONARY_EN`**, **`ACTION_DICTIONARY_PT`**,
  **`ACTION_KEYS`**, **`resolveActionCanonical`** (+ **`ActionCanonical`**).
- Colors: **`COLOR_DICTIONARY`**, **`COLOR_DICTIONARY_EN`**, **`COLOR_DICTIONARY_PT`**,
  **`COLOR_KEYS`**, **`resolveColorName`**.
- Shapes: **`SHAPE_DICTIONARY`**, **`SHAPE_DICTIONARY_EN`**, **`SHAPE_DICTIONARY_PT`**,
  **`SHAPE_KEYS`**, **`resolveShapeKind`**.
- Numbers: **`NUMBER_WORDS`**, **`resolveNumberWord`**; misc **`COMPOSITE_KEYWORDS`**,
  **`CORE_INTENT_ID_HINTS`**.

## Slot extraction & color parsing

- **`extractSlots`**, **`extractSvgBlob`**, **`parseColorPhrase`** (+ **`ColorPhraseMatch`**),
  **`parseColorToken`**, **`parseDimensionToken`**, **`parseNumberToken`**,
  **`parseHslFunction`**, **`parseRgbFunction`**.
- Color math: **`hexToRgb`**, **`rgbToHsl`**, **`hslToRgb`**, **`adjustHexLightness`**,
  **`lightenHex`**, **`darkenHex`**, **`HEX_COLOR_RE`**, **`LIGHTNESS_MODIFIERS`**,
  **`LIGHTNESS_MULTIPLIERS`**.

## Language detection & menu discovery

- **`detectLanguage`** (+ **`LanguageDetectResult`**).
- **`discoverMenuIntents`**, **`discoverMenuIntentsReactive`** (+
  **`DiscoverMenuIntentsResult`**, **`DiscoverMenuIntentsReactiveResult`**),
  **`menuContributionToIntent`**.

## LLM provider (optional)

A pluggable chat-LLM fallback (e.g. local Ollama):

- Contract: **`AiChatProvider`**, **`AiChatMessage`**, **`AiChatOptions`**,
  **`AiChatRole`**, **`AI_CHAT_PROVIDER`**.
- Ollama: **`provideOllamaChat`**, **`OllamaChatProvider`**, **`OllamaChatConfig`**,
  **`DEFAULT_OLLAMA_BASE_URL`**, **`DEFAULT_OLLAMA_MODEL`**, **`DEFAULT_OLLAMA_MODELS`**.
- Resolver: **`LlmIntentResolverService`**, **`LlmExecuteOptions`**,
  **`LlmResolveOptions`**, **`LlmResolvedPlan`**, **`LlmResolvedStep`**,
  **`LlmRawSvgResult`**, **`LlmRawSvgInsertResult`**, **`LlmIntentCatalogEntry`**,
  **`parsePlan`**, **`DEFAULT_CATALOG_MAX_ENTRIES`**.

## Voice contract

- **`VoiceProvider`**, **`VoiceEngine`**, **`VOICE_WHISPER_PROVIDER`** — the
  provider contract implemented by `ai/nlu-ui` (Web Speech) and
  `ai/nlu-voice-wasm` (Whisper).

:::note
Most of these APIs are not individually listed in the library's
`docs/09-api-publica.md`; this page reflects the current export surface.
:::
