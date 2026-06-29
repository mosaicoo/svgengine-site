---
title: 'API: ai/nlu-ui'
description: API pública de @mosaicoo/svg-engine/ai/nlu-ui — la caja de comandos en lenguaje natural y los servicios de voz del navegador.
---

`@mosaicoo/svg-engine/ai/nlu-ui` es la **UI de la capa de lenguaje natural**: una
caja de comandos lista (texto + voz) vinculada al engine de NLU, más el provider de
voz Web Speech del navegador y un orquestador de engine. Depende de Angular Material.

```ts
import { SvgeNluInput } from '@mosaicoo/svg-engine/ai/nlu-ui';
```

## La caja de comandos

| Componente | Selector | Qué es |
| --- | --- | --- |
| `SvgeNluInput` | `<svge-nlu-input>` | Una caja de comandos Material standalone: campo de texto + botón de micrófono + preview en vivo del mejor candidato (etiqueta, confianza, barra), una línea de estado, un botón de confirmación para coincidencias destructivas/de baja confianza, y una lista clicable de alternativas. |

Bindings principales:

| Input / Output | Finalidad |
| --- | --- |
| `confirmGate?` | Hook llamado antes de ejecutar un intent destructivo o de baja confianza. |
| `voiceLanguage?` / `voiceEngine?` | Elige el idioma de reconocimiento (p. ej. `pt-BR`) y el engine (`web-speech`/`whisper`/`auto`). |
| `nluService?` / `confirmDialog?` | Sobrescribe el servicio de NLU o el prompt de confirmación. |
| `resultExecuted` | Emite el `NluExecuteResult` tras cada ejecución. |

## Servicios de voz

| API | Descripción |
| --- | --- |
| `VoiceRecognitionService` | Un `VoiceProvider` respaldado por la **Web Speech API** del navegador — privacidad ante todo y gratuito, sin descarga de modelo. Signals `isSupported`/`listening`/`lastError`, `listen(lang?, options?)` → transcripción final, `stop()`. |
| `VoiceEngineService` | Un orquestador que expone la misma superficie `VoiceProvider`, permitiendo alternar entre Web Speech y el provider Whisper en el dispositivo de forma transparente: `setEngine('web-speech' \| 'whisper' \| 'auto')`, signals `engine`/`whisperAvailable`/`availableEngines`. Persiste la elección en localStorage. |

Ambos soportan idiomas como `pt-BR`, `en-US` y `es-ES`. El modo `auto` intenta Web
Speech primero y recurre a Whisper cuando está registrado (ver
[ai/nlu-voice-wasm](/svgengine-site/es/reference/api/ai-nlu-voice-wasm/)).
