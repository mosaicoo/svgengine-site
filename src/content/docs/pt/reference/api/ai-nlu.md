---
title: 'API: ai/nlu'
description: API pública de @mosaicoo/svg-engine/ai/nlu — o engine de linguagem natural headless que transforma comandos em texto em ações do editor, com camada LLM local opcional.
---

`@mosaicoo/svg-engine/ai/nlu` é a **camada de linguagem natural opt-in** (headless,
sem Material/CDK). Ela transforma uma frase como "desenhe um círculo vermelho" numa
ação do editor: um engine baseado em regras casa o texto com intents registrados,
extrai slots e retorna candidatos ranqueados ou auto-executa o melhor. Uma camada de
LLM local opcional cuida do que as regras não dão conta.

```ts
import { NaturalLanguageService, builtinNluPlugin } from '@mosaicoo/svg-engine/ai/nlu';
```

## O engine

| API | Descrição | Use para |
| --- | --- | --- |
| `NaturalLanguageService` | O registry de intents + matcher. `registerIntent(intent)` → `Disposable`; `parse(text, ctx, opts?)` retorna `NluCandidate[]` ranqueados; `execute(text, ctx, opts?)` faz parse e auto-executa o melhor quando confiante; signals `intents`/`intentsCount`. | Registrar intents e transformar texto em ações do editor. |
| `builtinNluPlugin` | Um plugin (instale via `provideSvgEnginePlugin(builtinNluPlugin)`) que auto-descobre todo comando de menu como intent e adiciona built-ins como `create-shape`, `set-fill`, `move-selected`, `resize-selected`, `duplicate-selected`. | Ter um vocabulário de comandos funcional de imediato. |
| `discoverMenuIntents(...)` / `discoverMenuIntentsReactive(...)` | Convertem entradas do `MenuContributionRegistry` em intents — uma vez, ou continuamente conforme plugins são instalados. | Expor seus menus à linguagem natural automaticamente. |

```ts
const nlu = inject(NaturalLanguageService);
const result = await nlu.execute('desenhe um círculo vermelho', { injector });
if (!result.executed) console.log(result.rejection); // por que não rodou
```

## Tipos centrais

| Tipo | Descrição |
| --- | --- |
| `NluIntent` | Definição de intent: `id`, `keywords`, opcionais `actionKeywords`/`slots`/`destructive`/`description`, e `execute(slots, ctx)`. |
| `NluContext` | O contexto por-chamada — carrega o `injector` para o intent resolver serviços do editor. |
| `NluCandidate` | Um resultado de parse: o `intent` casado, uma `confidence` em [0,1], os `slots` extraídos e os `matches` que o explicam. |
| `NluSlotSchema` | A forma de um slot: `number`, `color`, `shape`, `enum`, `string`, `point` ou `gradient`, com `optional`/`default`/anchor keywords. |
| `NluParseOptions` | `threshold` (padrão 0.3) e `maxResults` (padrão 5). |
| `NluExecuteOptions` | Adiciona `autoExecuteThreshold` (padrão 0.7) e `confirmGate` (hook de confirmação — obrigatório para intents `destructive`). |
| `NluExecuteResult` | O resultado: `executed`, o `candidate`, `alternatives`, e um motivo de `rejection` (`no-match`, `below-threshold`, `confirmation-declined`, `destructive-no-gate`, `execute-error` ou `null`). |
| `NluLanguage` | Idioma detectado: `pt`, `en` ou `unknown`. |

## Camada LLM opcional

Para pedidos que o engine de regras não resolve, escale para um LLM de chat (ex.: um
servidor [Ollama](https://ollama.com) local). O contrato é plugável.

| API | Descrição |
| --- | --- |
| `AiChatProvider` / `AI_CHAT_PROVIDER` | O contrato do backend LLM (`chat(messages, opts?)`, `isConfigured`, `defaultModel`) e seu token de injeção (padrão nenhum). |
| `provideOllamaChat(config?)` | Conecta o provider Ollama built-in. Config: `baseUrl`, `model`, `models`. |
| `DEFAULT_OLLAMA_BASE_URL` / `DEFAULT_OLLAMA_MODEL` / `DEFAULT_OLLAMA_MODELS` | Padrões: `http://localhost:11434`, `qwen2.5:3b`, e uma pequena lista de modelos Qwen sugeridos. |
| `LlmIntentResolverService` | A camada de escalada: `resolvePlan(text, ctx)` pede ao LLM para quebrar um pedido complexo num plano de intents em múltiplos passos; `resolveAndExecute(text, ctx)` o executa. |
| `AiChatMessage` / `AiChatOptions` | A mensagem de chat (`role`, `content`) e as opções por-chamada (`model`, `format`, `temperature`, …). |

## Contrato de voz

O `ai/nlu` define o contrato do provider de voz; as implementações de fato vivem em
`ai/nlu-ui` (Web Speech) e `ai/nlu-voice-wasm` (Whisper on-device).

| API | Descrição |
| --- | --- |
| `VoiceProvider` | Um provider de reconhecimento de fala: signals `isSupported`/`listening`/`lastError`, `listen(lang?, options?)` → transcrição, `stop()`. |
| `VoiceEngine` | Qual engine usar: `web-speech`, `whisper` ou `auto`. |
| `VOICE_WHISPER_PROVIDER` | Token de injeção do provider Whisper opcional (padrão nenhum). |

:::note
O `ai/nlu` também exporta as peças de baixo nível das quais o engine é feito —
tokenização & fuzzy matching (`tokenize`, `levenshtein`, `bestMatch`, …), os
dicionários PT/EN (`COLOR_DICTIONARY`, `SHAPE_DICTIONARY`, `ACTION_DICTIONARY`, …),
matemática de cor, parsers de slot e `detectLanguage`. São úteis para construir
intents customizados, mas desnecessárias no uso cotidiano. O
[repositório da biblioteca](https://github.com/mosaicoo/svg-engine) é autoritativo
para as assinaturas exatas.
:::
