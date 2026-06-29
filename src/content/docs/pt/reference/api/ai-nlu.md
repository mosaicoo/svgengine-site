---
title: 'API: ai/nlu'
description: API pública de @mosaicoo/svg-engine/ai/nlu — o engine de linguagem natural rule-based, dicionários, matchers fuzzy e provider LLM opcional.
---

`@mosaicoo/svg-engine/ai/nlu` é a **camada de linguagem natural opt-in** (headless):
um engine rule-based que transforma texto em comandos do editor, com dicionários
PT/EN, fuzzy matching, extração de slots e um provider LLM local opcional. Sem
dependência de Angular Material/CDK.

```ts
import { NaturalLanguageService, builtinNluPlugin } from '@mosaicoo/svg-engine/ai/nlu';
```

## Engine

- **`NaturalLanguageService`** — `parse(text, ctx)` → intent + slots (regex +
  dicionários + fuzzy match).
- **`NluDictionaryRegistry`** — registra dicionários customizados.
- **`builtinNluPlugin`** — auto-descobre intents de menu + traz intents customizados.

## Tipos centrais

- **`NluIntent`**, **`NluCandidate`**, **`NluContext`**, **`NluParseOptions`**,
  **`NluExecuteOptions`**, **`NluExecuteResult`**, **`NluMatchReason`**,
  **`NluLanguage`**, **`NluShapeKind`**, **`NluSlotSchema`**, **`ExtractContext`**,
  **`ExtractedSlots`**.

## Tokenização & fuzzy matching

- **`tokenize`**, **`tokenizeWithoutStopwords`**, **`deaccent`**, **`normalize`**,
  **`levenshtein`**, **`fuzzyMatchToken`**, **`fuzzyMatchAll`**, **`fuzzyMatchAny`**,
  **`bestMatch`**, **`adaptiveMaxDistance`**, **`FuzzyMatch`**.
- Stopwords: **`isStopword`**, **`STOPWORDS`**, **`STOPWORDS_EN`**, **`STOPWORDS_PT`**.
- Gate de vagueza: **`isVagueForRuleBased`**, **`VAGUE_MIN_MEANINGFUL_TOKENS`**,
  **`VAGUE_RECOGNIZED_FRACTION`**.

## Dicionários

- Ações: **`ACTION_DICTIONARY`**, **`ACTION_DICTIONARY_EN`**, **`ACTION_DICTIONARY_PT`**,
  **`ACTION_KEYS`**, **`resolveActionCanonical`** (+ **`ActionCanonical`**).
- Cores: **`COLOR_DICTIONARY`**, **`COLOR_DICTIONARY_EN`**, **`COLOR_DICTIONARY_PT`**,
  **`COLOR_KEYS`**, **`resolveColorName`**.
- Shapes: **`SHAPE_DICTIONARY`**, **`SHAPE_DICTIONARY_EN`**, **`SHAPE_DICTIONARY_PT`**,
  **`SHAPE_KEYS`**, **`resolveShapeKind`**.
- Números: **`NUMBER_WORDS`**, **`resolveNumberWord`**; diversos **`COMPOSITE_KEYWORDS`**,
  **`CORE_INTENT_ID_HINTS`**.

## Extração de slots & parsing de cor

- **`extractSlots`**, **`extractSvgBlob`**, **`parseColorPhrase`** (+ **`ColorPhraseMatch`**),
  **`parseColorToken`**, **`parseDimensionToken`**, **`parseNumberToken`**,
  **`parseHslFunction`**, **`parseRgbFunction`**.
- Matemática de cor: **`hexToRgb`**, **`rgbToHsl`**, **`hslToRgb`**, **`adjustHexLightness`**,
  **`lightenHex`**, **`darkenHex`**, **`HEX_COLOR_RE`**, **`LIGHTNESS_MODIFIERS`**,
  **`LIGHTNESS_MULTIPLIERS`**.

## Detecção de idioma & descoberta de menu

- **`detectLanguage`** (+ **`LanguageDetectResult`**).
- **`discoverMenuIntents`**, **`discoverMenuIntentsReactive`** (+
  **`DiscoverMenuIntentsResult`**, **`DiscoverMenuIntentsReactiveResult`**),
  **`menuContributionToIntent`**.

## Provider LLM (opcional)

Um fallback de chat-LLM plugável (ex.: Ollama local):

- Contrato: **`AiChatProvider`**, **`AiChatMessage`**, **`AiChatOptions`**,
  **`AiChatRole`**, **`AI_CHAT_PROVIDER`**.
- Ollama: **`provideOllamaChat`**, **`OllamaChatProvider`**, **`OllamaChatConfig`**,
  **`DEFAULT_OLLAMA_BASE_URL`**, **`DEFAULT_OLLAMA_MODEL`**, **`DEFAULT_OLLAMA_MODELS`**.
- Resolver: **`LlmIntentResolverService`**, **`LlmExecuteOptions`**,
  **`LlmResolveOptions`**, **`LlmResolvedPlan`**, **`LlmResolvedStep`**,
  **`LlmRawSvgResult`**, **`LlmRawSvgInsertResult`**, **`LlmIntentCatalogEntry`**,
  **`parsePlan`**, **`DEFAULT_CATALOG_MAX_ENTRIES`**.

## Contrato de voz

- **`VoiceProvider`**, **`VoiceEngine`**, **`VOICE_WHISPER_PROVIDER`** — o contrato
  de provider implementado por `ai/nlu-ui` (Web Speech) e `ai/nlu-voice-wasm`
  (Whisper).

:::note
A maioria dessas APIs não está listada individualmente em
`docs/09-api-publica.md`; esta página reflete a superfície de exports atual.
:::
