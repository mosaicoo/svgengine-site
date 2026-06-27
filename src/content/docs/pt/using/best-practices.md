---
title: Boas práticas
description: Dicas para tirar o máximo do editor — e para embuti-lo.
---

## Trabalhando com a arte

- **Organize com camadas e grupos.** Agrupe objetos relacionados e **trave** o
  que você não está editando, para não mover por acidente.
- **Use snap, align e distribute.** Deixe o snap alinhar os objetos durante o
  arrasto, e use as opções de Align/Distribute da
  [Select](/svgengine-site/pt/using/tools/select/) para layouts limpos.
- **Converta formas em paths antes de editar anchors.** Retângulos, elipses e
  polígonos ficam livremente editáveis depois de convertidos; então use o
  [Direct Select](/svgengine-site/pt/using/tools/direct-select/).
- **Escolha o caminho certo do traço.** Para traços caligráficos ou de largura
  variável, selecione um brush antes de desenhar com o
  [Pencil](/svgengine-site/pt/using/tools/pencil/), ou aplique a ferramenta
  [Width](/svgengine-site/pt/using/tools/width/) a um path existente.
- **Tire snapshots antes de grandes mudanças** (`Ctrl+Shift+S`) para poder
  voltar.
- **Movimente com precisão.** As setas movem a seleção; segure **Shift** para um
  passo maior.

## Embutindo a library

- **Importe só o que precisar.** Os entry points são independentes — um viewer só
  precisa do `render`; você não paga pelo editor nem pelo Material sem usá-los.
- **Mantenha a fronteira headless.** Não recorra ao `ui` a menos que queira o
  editor Material; as camadas headless permanecem leves.
- **Estenda com plugins, não com forks.** Adicione tools, importers, efeitos e
  mais pelos registries — veja [Plugins](/svgengine-site/pt/guides/plugins/).
- **Roteie mutações por comandos.** Despachar comandos mantém o undo/redo
  consistente de graça.

Veja [Arquitetura](/svgengine-site/pt/guides/architecture/) para o raciocínio por
trás disso.
