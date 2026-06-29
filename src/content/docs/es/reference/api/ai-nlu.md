---
title: 'API: ai/nlu'
description: API pública de @mosaicoo/svg-engine/ai/nlu — el motor de lenguaje natural basado en reglas, diccionarios, matchers difusos y provider LLM opcional.
---

`@mosaicoo/svg-engine/ai/nlu` es la **capa de lenguaje natural opcional** (headless):
un motor basado en reglas que convierte texto en comandos del editor, con
diccionarios PT/EN, fuzzy matching, extracción de slots y un provider LLM local
opcional. Sin dependencia de Angular Material/CDK.

```ts
import { NaturalLanguageService, builtinNluPlugin } from '@mosaicoo/svg-engine/ai/nlu';
```

## Motor

- **`NaturalLanguageService`** — `parse(text, ctx)` → intent + slots (regex +
  diccionarios + fuzzy match).
- **`NluDictionaryRegistry`** — registra diccionarios personalizados.
- **`builtinNluPlugin`** — autodescubre intents de menú + aporta intents personalizados.

## Tipos centrales

- **`NluIntent`**, **`NluCandidate`**, **`NluContext`**, **`NluParseOptions`**,
  **`NluExecuteOptions`**, **`NluExecuteResult`**, **`NluMatchReason`**,
  **`NluLanguage`**, **`NluShapeKind`**, **`NluSlotSchema`**, **`ExtractContext`**,
  **`ExtractedSlots`**.

## Tokenización y fuzzy matching

- **`tokenize`**, **`tokenizeWithoutStopwords`**, **`deaccent`**, **`normalize`**,
  **`levenshtein`**, **`fuzzyMatchToken`**, **`fuzzyMatchAll`**, **`fuzzyMatchAny`**,
  **`bestMatch`**, **`adaptiveMaxDistance`**, **`FuzzyMatch`**.
- Stopwords: **`isStopword`**, **`STOPWORDS`**, **`STOPWORDS_EN`**, **`STOPWORDS_PT`**.
- Gate de vaguedad: **`isVagueForRuleBased`**, **`VAGUE_MIN_MEANINGFUL_TOKENS`**,
  **`VAGUE_RECOGNIZED_FRACTION`**.

## Diccionarios

- Acciones: **`ACTION_DICTIONARY`**, **`ACTION_DICTIONARY_EN`**, **`ACTION_DICTIONARY_PT`**,
  **`ACTION_KEYS`**, **`resolveActionCanonical`** (+ **`ActionCanonical`**).
- Colores: **`COLOR_DICTIONARY`**, **`COLOR_DICTIONARY_EN`**, **`COLOR_DICTIONARY_PT`**,
  **`COLOR_KEYS`**, **`resolveColorName`**.
- Shapes: **`SHAPE_DICTIONARY`**, **`SHAPE_DICTIONARY_EN`**, **`SHAPE_DICTIONARY_PT`**,
  **`SHAPE_KEYS`**, **`resolveShapeKind`**.
- Números: **`NUMBER_WORDS`**, **`resolveNumberWord`**; varios **`COMPOSITE_KEYWORDS`**,
  **`CORE_INTENT_ID_HINTS`**.

## Extracción de slots y parseo de color

- **`extractSlots`**, **`extractSvgBlob`**, **`parseColorPhrase`** (+ **`ColorPhraseMatch`**),
  **`parseColorToken`**, **`parseDimensionToken`**, **`parseNumberToken`**,
  **`parseHslFunction`**, **`parseRgbFunction`**.
- Matemática de color: **`hexToRgb`**, **`rgbToHsl`**, **`hslToRgb`**, **`adjustHexLightness`**,
  **`lightenHex`**, **`darkenHex`**, **`HEX_COLOR_RE`**, **`LIGHTNESS_MODIFIERS`**,
  **`LIGHTNESS_MULTIPLIERS`**.

## Detección de idioma y descubrimiento de menú

- **`detectLanguage`** (+ **`LanguageDetectResult`**).
- **`discoverMenuIntents`**, **`discoverMenuIntentsReactive`** (+
  **`DiscoverMenuIntentsResult`**, **`DiscoverMenuIntentsReactiveResult`**),
  **`menuContributionToIntent`**.

## Provider LLM (opcional)

Un fallback de chat-LLM enchufable (p. ej. Ollama local):

- Contrato: **`AiChatProvider`**, **`AiChatMessage`**, **`AiChatOptions`**,
  **`AiChatRole`**, **`AI_CHAT_PROVIDER`**.
- Ollama: **`provideOllamaChat`**, **`OllamaChatProvider`**, **`OllamaChatConfig`**,
  **`DEFAULT_OLLAMA_BASE_URL`**, **`DEFAULT_OLLAMA_MODEL`**, **`DEFAULT_OLLAMA_MODELS`**.
- Resolver: **`LlmIntentResolverService`**, **`LlmExecuteOptions`**,
  **`LlmResolveOptions`**, **`LlmResolvedPlan`**, **`LlmResolvedStep`**,
  **`LlmRawSvgResult`**, **`LlmRawSvgInsertResult`**, **`LlmIntentCatalogEntry`**,
  **`parsePlan`**, **`DEFAULT_CATALOG_MAX_ENTRIES`**.

## Contrato de voz

- **`VoiceProvider`**, **`VoiceEngine`**, **`VOICE_WHISPER_PROVIDER`** — el contrato
  de provider implementado por `ai/nlu-ui` (Web Speech) y `ai/nlu-voice-wasm`
  (Whisper).

:::note
La mayoría de estas APIs no están listadas individualmente en
`docs/09-api-publica.md`; esta página refleja la superficie de exports actual.
:::
