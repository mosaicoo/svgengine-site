---
title: 'API: ai/nlu'
description: API pública de @mosaicoo/svg-engine/ai/nlu — el engine de lenguaje natural headless que convierte comandos en texto en acciones del editor, con capa LLM local opcional.
---

`@mosaicoo/svg-engine/ai/nlu` es la **capa de lenguaje natural opcional** (headless,
sin Material/CDK). Convierte una frase como "dibuja un círculo rojo" en una acción
del editor: un engine basado en reglas casa el texto con intents registrados, extrae
slots y devuelve candidatos rankeados o auto-ejecuta el mejor. Una capa de LLM local
opcional resuelve lo que las reglas no pueden.

```ts
import { NaturalLanguageService, builtinNluPlugin } from '@mosaicoo/svg-engine/ai/nlu';
```

## El engine

| API | Descripción | Úsalo para |
| --- | --- | --- |
| `NaturalLanguageService` | El registry de intents + matcher. `registerIntent(intent)` → `Disposable`; `parse(text, ctx, opts?)` devuelve `NluCandidate[]` rankeados; `execute(text, ctx, opts?)` parsea y auto-ejecuta el mejor cuando hay confianza; signals `intents`/`intentsCount`. | Registrar intents y convertir texto en acciones del editor. |
| `builtinNluPlugin` | Un plugin (instala vía `provideSvgEnginePlugin(builtinNluPlugin)`) que auto-descubre cada comando de menú como intent y añade integrados como `create-shape`, `set-fill`, `move-selected`, `resize-selected`, `duplicate-selected`. | Tener un vocabulario de comandos funcional de inmediato. |
| `discoverMenuIntents(...)` / `discoverMenuIntentsReactive(...)` | Convierten entradas del `MenuContributionRegistry` en intents — una vez, o de forma continua conforme se instalan plugins. | Exponer tus menús al lenguaje natural automáticamente. |

```ts
const nlu = inject(NaturalLanguageService);
const result = await nlu.execute('dibuja un círculo rojo', { injector });
if (!result.executed) console.log(result.rejection); // por qué no se ejecutó
```

## Tipos centrales

| Tipo | Descripción |
| --- | --- |
| `NluIntent` | Definición de intent: `id`, `keywords`, opcionales `actionKeywords`/`slots`/`destructive`/`description`, y `execute(slots, ctx)`. |
| `NluContext` | El contexto por llamada — lleva el `injector` para que el intent resuelva servicios del editor. |
| `NluCandidate` | Un resultado de parse: el `intent` casado, una `confidence` en [0,1], los `slots` extraídos y los `matches` que lo explican. |
| `NluSlotSchema` | La forma de un slot: `number`, `color`, `shape`, `enum`, `string`, `point` o `gradient`, con `optional`/`default`/anchor keywords. |
| `NluParseOptions` | `threshold` (por defecto 0.3) y `maxResults` (por defecto 5). |
| `NluExecuteOptions` | Añade `autoExecuteThreshold` (por defecto 0.7) y `confirmGate` (hook de confirmación — obligatorio para intents `destructive`). |
| `NluExecuteResult` | El resultado: `executed`, el `candidate`, `alternatives`, y un motivo de `rejection` (`no-match`, `below-threshold`, `confirmation-declined`, `destructive-no-gate`, `execute-error` o `null`). |
| `NluLanguage` | Idioma detectado: `pt`, `en` o `unknown`. |

## Capa LLM opcional

Para peticiones que el engine de reglas no resuelve, escala a un LLM de chat (p. ej.
un servidor [Ollama](https://ollama.com) local). El contrato es enchufable.

| API | Descripción |
| --- | --- |
| `AiChatProvider` / `AI_CHAT_PROVIDER` | El contrato del backend LLM (`chat(messages, opts?)`, `isConfigured`, `defaultModel`) y su token de inyección (por defecto ninguno). |
| `provideOllamaChat(config?)` | Conecta el provider Ollama integrado. Config: `baseUrl`, `model`, `models`. |
| `DEFAULT_OLLAMA_BASE_URL` / `DEFAULT_OLLAMA_MODEL` / `DEFAULT_OLLAMA_MODELS` | Defaults: `http://localhost:11434`, `qwen2.5:3b`, y una pequeña lista de modelos Qwen sugeridos. |
| `LlmIntentResolverService` | La capa de escalado: `resolvePlan(text, ctx)` pide al LLM desglosar una petición compleja en un plan de intents de varios pasos; `resolveAndExecute(text, ctx)` lo ejecuta. |
| `AiChatMessage` / `AiChatOptions` | El mensaje de chat (`role`, `content`) y las opciones por llamada (`model`, `format`, `temperature`, …). |

## Contrato de voz

`ai/nlu` define el contrato del provider de voz; las implementaciones reales viven en
`ai/nlu-ui` (Web Speech) y `ai/nlu-voice-wasm` (Whisper en el dispositivo).

| API | Descripción |
| --- | --- |
| `VoiceProvider` | Un provider de reconocimiento de voz: signals `isSupported`/`listening`/`lastError`, `listen(lang?, options?)` → transcripción, `stop()`. |
| `VoiceEngine` | Qué engine usar: `web-speech`, `whisper` o `auto`. |
| `VOICE_WHISPER_PROVIDER` | Token de inyección del provider Whisper opcional (por defecto ninguno). |

:::note
`ai/nlu` también exporta las piezas de bajo nivel con las que se construye el engine
— tokenización & fuzzy matching (`tokenize`, `levenshtein`, `bestMatch`, …), los
diccionarios PT/EN (`COLOR_DICTIONARY`, `SHAPE_DICTIONARY`, `ACTION_DICTIONARY`, …),
matemática de color, parsers de slot y `detectLanguage`. Son útiles para construir
intents personalizados, pero no se necesitan en el uso cotidiano. El
[repositorio de la biblioteca](https://github.com/mosaicoo/svg-engine) es
autoritativo para las firmas exactas.
:::
