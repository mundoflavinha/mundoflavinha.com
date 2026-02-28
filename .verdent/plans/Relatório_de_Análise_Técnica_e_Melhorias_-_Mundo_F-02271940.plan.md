# Relatório Final de Análise Técnica e Plano de Evolução

Projeto: Mundo Flavinha  
Data da revisão: 27 de fevereiro de 2026

## 1. Conclusão Executiva

O plano anterior estava parcialmente coerente, mas ficou desatualizado durante a atualização do projeto.

Ele acertava a direção geral em Docker, SEO, acessibilidade, performance e qualidade, porém hoje mistura:

- itens que já foram implementados;
- problemas que deixaram de ser prioritários;
- lacunas mais críticas que não estavam no radar.

O cenário atual é de projeto interrompido no meio de uma migração. O principal risco neste momento não é "falta de tecnologia", e sim "inconsistência entre código-fonte, build gerado, conteúdo publicado e fluxo de desenvolvimento".

Por isso, a prioridade correta muda para:

1. estabilizar o estado do projeto;
2. corrigir publicação/SEO real;
3. remover conteúdo provisório e incoerências de produto;
4. só depois avançar em otimizações e automações.

---

## 2. Diagnóstico do Estado Atual

### 2.1 O que o relatório antigo marcou como problema, mas já existe

Estes itens não devem mais aparecer como pendência crítica:

- `docker-entrypoint.sh` já existe;
- `.dockerignore` já existe;
- `public/robots.txt` já existe;
- `public/sitemap.xml` já existe;
- `eslint-plugin-jsx-a11y` já foi adicionado no ESLint;
- já existe workflow de deploy em `.github/workflows/deploy.yml`;
- o projeto já está gerando HTML estático em `dist/` com `vite-react-ssg`.

### 2.2 O que está parcialmente resolvido

- `index.html` já recebeu meta tags estáticas e favicons;
- `tsconfig.json` foi endurecido em relação ao relatório antigo;
- parte da navegação e do footer principal recebeu melhorias de acessibilidade;
- algumas imagens já usam `loading="lazy"`;
- páginas de produto já têm estrutura mais madura do que a home principal.

### 2.3 O que hoje é realmente crítico

#### A. Estado interrompido e divergência entre `src/` e `dist/`

O repositório mostra sinais claros de atualização interrompida:

- `src/` tem alterações locais não finalizadas;
- `dist/` existe, mas não representa fielmente o código-fonte atual;
- o build estático ainda mostra head antigo, favicon do Vite e metadados genéricos;
- há trechos no `src/` com placeholders que não batem com o HTML já gerado.

Impacto:

- dificulta saber o que é "fonte da verdade";
- aumenta o risco de publicar algo quebrado;
- invalida parte do relatório antigo, porque ele analisa um estado que já não é único.

#### B. SEO real continua incorreto no HTML gerado

Embora o `index.html` tenha sido melhorado, o SEO real por rota ainda não está resolvido.

Problemas observados:

- o hook [`useSEO.tsx`](/Users/Mylab/www/mundoflavinha/src/hooks/useSEO.tsx) usa `useEffect`, então seus metadados não entram no HTML estático gerado;
- os arquivos em `dist/` continuam com `<head>` genérico;
- o build ainda carrega `href="/vite.svg"` em vez do favicon correto;
- isso reduz o valor de SSG para indexação e compartilhamento social.

Conclusão:

O projeto melhorou o SEO em tempo de execução no navegador, mas ainda não resolveu o SEO de publicação, que é o que importa para crawler, preview social e indexação.

#### C. Caminhos de imagem OG estão incorretos

Há inconsistência entre os caminhos usados no SEO e os assets reais:

- o arquivo existente é `public/mundo-flavinha-og.jpg`;
- o `index.html` referencia `/images/mundo-flavinha-og.jpg`;
- o helper de SEO monta imagens de produto em `/images/products/<rota>/og.jpg`, mas esses arquivos não existem no repositório.

Impacto:

- previews sociais quebrados;
- Open Graph inconsistente;
- risco de indexação com imagem ausente.

#### D. Estratégia de rotas e deploy precisa ser validada

O `vite-react-ssg` está gerando:

- `dist/index.html`
- `dist/jogo-olhou-achou.html`
- `dist/roda-de-conversa-em-familia.html`
- `dist/dia-dos-pais.html`

Mas as rotas públicas e o sitemap usam URLs limpas:

- `/jogo-olhou-achou`
- `/roda-de-conversa-em-familia`
- `/dia-dos-pais`

Isso precisa ser validado com o GitHub Pages e com o domínio `www.mundoflavinha.com`, porque arquivo `.html` plano e rota limpa nem sempre são equivalentes em acesso direto, indexação e refresh.

#### E. Fluxo de ferramentas está inconsistente

Hoje há conflito entre ferramentas:

- `package-lock.json` e `pnpm-lock.yaml` coexistem;
- GitHub Actions usa `npm ci`;
- Docker e `Makefile` usam `pnpm`;
- o ambiente atual de shell nem expõe `node`, `npm` ou `pnpm` no PATH local.

Impacto:

- builds diferentes conforme o ambiente;
- risco de lockfile divergente;
- difícil reproduzir erros com confiança.

#### F. A home principal ainda contém conteúdo de template

A home institucional ainda não está pronta como página final da marca. Há muito conteúdo genérico ou herdado de template em:

- [`src/components/ProductsSection.tsx`](/Users/Mylab/www/mundoflavinha/src/components/ProductsSection.tsx)
- [`src/components/HighlightedProductsSection.tsx`](/Users/Mylab/www/mundoflavinha/src/components/HighlightedProductsSection.tsx)
- [`src/components/FeaturedProductSection.tsx`](/Users/Mylab/www/mundoflavinha/src/components/FeaturedProductSection.tsx)
- [`src/components/FeaturesSection.tsx`](/Users/Mylab/www/mundoflavinha/src/components/FeaturesSection.tsx)
- [`src/components/TestimonialsSection.tsx`](/Users/Mylab/www/mundoflavinha/src/components/TestimonialsSection.tsx)

Exemplos:

- textos em inglês;
- nomes de produtos fictícios;
- descrições genéricas de tecnologia;
- referências a smartwatch;
- CTAs sem destino real.

Hoje isso é mais grave que uma otimização de Lighthouse, porque compromete posicionamento, credibilidade e conversão.

#### G. Há placeholders e classes inválidas no código-fonte

Foram encontrados sinais de edição incompleta, como:

- `className="...suas classes..."`;
- `href="#"` em logos e links legais;
- classes Tailwind inválidas ou suspeitas como `w-meddium`, `text-1x2`, `from-purple-00`, `from-white-500`, `to-purple-@00`, `h-67`, `w-max-lg`.

Mesmo quando parte disso parece já ter sido corrigida em algum build anterior, o estado atual de `src/` ainda precisa de saneamento antes de seguir evoluindo.

#### H. Acessibilidade e semântica melhoraram, mas ainda estão incompletas

Há avanço no `Navbar` principal e no `Footer`, porém ainda faltam:

- padronização entre a home e as landings;
- navbars das páginas de produto com `href="#"` e sem landmarks completos;
- links legais reais;
- revisão de contraste;
- legendas/transcrição para vídeo;
- redução de elementos decorativos sem `aria-hidden`;
- skip link;
- consistência semântica entre cards, seções e CTAs.

#### I. Existem dependências e estruturas mortas ou mal conectadas

Pontos visíveis:

- [`src/App.tsx`](/Users/Mylab/www/mundoflavinha/src/App.tsx) define `QueryClientProvider`, `TooltipProvider` e toasters, mas não está integrado às rotas atuais;
- `@tanstack/react-query` está instalado, mas não aparece em uso real da aplicação;
- `react-helmet-async` é referenciado em `vite.config.ts` e em um componente de Facebook Pixel, mas não está em `package.json`;
- há várias dependências de UI e utilidades sem uso aparente.

Isso indica que o projeto precisa de uma rodada de limpeza arquitetural antes de crescer.

---

## 3. Avaliação do Plano Antigo

### 3.1 O que continua válido

Seguem válidos como temas de evolução:

- semântica HTML;
- acessibilidade;
- performance de mídia;
- melhoria de tracking;
- testes;
- documentação;
- CI/CD mais completo;
- revisão contínua de TypeScript e ESLint.

### 3.2 O que precisa sair da prioridade alta

Devem sair da lista de urgência:

- criar `docker-entrypoint.sh`;
- criar `.dockerignore`;
- criar `robots.txt`;
- criar `sitemap.xml`;
- instalar `eslint-plugin-jsx-a11y`;
- afirmar que não há pipeline de deploy.

### 3.3 O que faltava e precisa entrar

Itens ausentes no plano anterior e que agora entram como prioridade:

1. reconciliar `src/`, `dist/` e branch de trabalho interrompida;
2. unificar gerenciador de pacotes;
3. corrigir SEO por rota no HTML gerado, não apenas no navegador;
4. corrigir caminhos reais de OG images;
5. validar compatibilidade entre SSG e GitHub Pages com URLs limpas;
6. substituir conteúdo de template da home por conteúdo real da marca;
7. remover placeholders, classes inválidas e links falsos;
8. limpar dependências e infraestrutura não utilizada.

---

## 4. Plano Final Recomendado

## Fase 0. Estabilização do Projeto

Objetivo: restaurar previsibilidade técnica antes de continuar evoluindo.

### Entregas

- definir `pnpm` ou `npm` como padrão único do projeto;
- remover o lockfile secundário;
- alinhar CI, Docker, README e comandos locais ao mesmo gerenciador;
- revisar o estado de `dist/` e parar de tratá-lo como fonte da verdade;
- identificar quais alterações locais eram parte da atualização interrompida e consolidar isso num estado limpo;
- remover código morto ou desconectado: `App.tsx`, providers não usados, integrações incompletas, imports órfãos;
- decidir se `react-helmet-async` será adotado de fato ou removido de vez.

### Critério de saída

- um único fluxo de instalação e build;
- código-fonte sem placeholders técnicos evidentes;
- build reprodutível a partir do estado atual.

---

## Fase 1. Publicação, SEO e Rotas

Objetivo: garantir que o site publicado represente corretamente a marca e seja indexável.

### Entregas

- substituir o modelo atual de SEO client-side por uma solução compatível com SSG/SSR;
- garantir `<title>`, description, canonical, Open Graph e Twitter Card por rota no HTML gerado;
- corrigir definitivamente favicon no build final;
- padronizar imagens OG e criar os arquivos reais por página;
- corrigir o helper de SEO para usar caminhos existentes;
- validar se o GitHub Pages resolve corretamente URLs limpas;
- se necessário, migrar a saída estática para estrutura por diretório:
  - `/jogo-olhou-achou/index.html`
  - `/roda-de-conversa-em-familia/index.html`
  - `/dia-dos-pais/index.html`
- revisar `sitemap.xml` com base na estratégia final de URL.

### Critério de saída

- cada rota pública abre diretamente;
- cada rota tem metadados corretos no HTML final;
- previews sociais e indexação usam assets existentes.

---

## Fase 2. Conteúdo e Conversão

Objetivo: tirar o projeto do estado de template e deixá-lo coerente com a marca.

### Entregas

- reescrever a home institucional com conteúdo real do Mundo Flavinha;
- remover textos genéricos, inglês residual e produtos fictícios;
- transformar CTAs em ações reais:
  - link;
  - scroll;
  - checkout;
  - WhatsApp;
  - formulário;
- corrigir links falsos como `href="#"`;
- publicar páginas reais de política de privacidade e termos;
- revisar depoimentos, nomes, provas sociais e consistência editorial;
- alinhar a home principal com as landings de produto sem duplicar mensagem.

### Critério de saída

- nenhuma seção principal com conteúdo de template;
- nenhum CTA principal sem ação;
- narrativa clara entre marca, autoridade e produtos.

---

## Fase 3. UI, Acessibilidade e Performance

Objetivo: consolidar experiência de uso e qualidade visual/técnica.

### Entregas

- revisar semântica de home e landings;
- padronizar landmarks e estrutura de headings;
- adicionar skip link;
- revisar contraste e foco visível;
- marcar SVGs decorativos com `aria-hidden`;
- revisar vídeo da página de Dia dos Pais:
  - `preload`;
  - `poster` correto;
  - legenda/transcrição ou alternativa;
- padronizar `loading="lazy"` e dimensões explícitas em imagens;
- revisar classes Tailwind inválidas e utilitários inconsistentes;
- reduzir peso visual e ruído onde houver excesso de elementos decorativos.

### Critério de saída

- navegação consistente por teclado;
- sem erros óbvios de markup;
- mídia otimizada nas páginas mais acessadas.

---

## Fase 4. Qualidade, Observabilidade e Automação

Objetivo: preparar o projeto para evoluir com segurança.

### Entregas

- adicionar testes mínimos:
  - smoke test de rotas;
  - render das páginas principais;
  - teste de presença de metadados críticos;
- adicionar `typecheck` e `lint` ao pipeline;
- expandir CI além do deploy;
- revisar tracking de CTA e eventos de conversão;
- documentar setup real do projeto;
- remover dependências sem uso;
- avaliar bundle e custo das bibliotecas instaladas.

### Critério de saída

- pipeline valida build e qualidade antes de publicar;
- README reflete o projeto real;
- dependências têm justificativa clara.

---

## 5. Priorização Final

### Prioridade alta

1. estabilizar o estado interrompido do projeto;
2. unificar npm/pnpm;
3. corrigir SEO real no HTML gerado;
4. corrigir OG images e paths de assets;
5. validar rotas estáticas com GitHub Pages;
6. remover conteúdo de template da home;
7. corrigir placeholders, links falsos e classes inválidas.

### Prioridade média

8. concluir acessibilidade e semântica;
9. otimizar vídeo e imagens;
10. limpar dependências e código morto;
11. formalizar páginas legais e CTAs reais;
12. reforçar pipeline com lint e testes.

### Prioridade baixa

13. bundle analysis;
14. strictness adicional no TypeScript;
15. observabilidade avançada;
16. PWA/service worker;
17. testes E2E completos.

---

## 6. Checklist Final de Implementação

### Estabilização

- [ ] Escolher um único gerenciador de pacotes
- [ ] Remover lockfile duplicado
- [ ] Alinhar Docker, CI e README
- [ ] Reconciliar `src/` e `dist/`
- [ ] Eliminar placeholders técnicos restantes
- [ ] Revisar código morto e integrações incompletas

### SEO e publicação

- [ ] Implementar head por rota compatível com SSG
- [ ] Corrigir favicon no build final
- [ ] Corrigir canonical, OG e Twitter Card por página
- [ ] Criar imagens OG reais por rota
- [ ] Corrigir paths das imagens OG
- [ ] Validar URLs limpas no deploy
- [ ] Revisar `sitemap.xml`

### Conteúdo

- [ ] Substituir conteúdo de template da home
- [ ] Remover inglês residual
- [ ] Revisar copy e provas sociais
- [ ] Corrigir todos os CTAs sem ação
- [ ] Substituir `href="#"` por destinos reais
- [ ] Publicar política de privacidade e termos

### Acessibilidade e UX

- [ ] Padronizar landmarks e headings
- [ ] Adicionar skip link
- [ ] Revisar foco, contraste e teclado
- [ ] Corrigir ícones decorativos
- [ ] Revisar vídeo com `poster` e acessibilidade
- [ ] Padronizar lazy loading de mídia

### Qualidade

- [ ] Adicionar `typecheck` ao fluxo
- [ ] Criar smoke tests das rotas principais
- [ ] Adicionar validação de metadados críticos
- [ ] Expandir CI além do deploy
- [ ] Limpar dependências não usadas
- [ ] Reescrever README do projeto real

---

## 7. Próximo Passo Recomendado

O próximo passo correto não é continuar empilhando melhorias isoladas.

O próximo passo correto é executar uma mini-fase de saneamento técnico com este escopo:

1. unificar o gerenciador de pacotes;
2. limpar o estado interrompido;
3. corrigir SEO estático por rota;
4. substituir o conteúdo de template da home.

Depois disso, o restante do plano volta a ser incremental e seguro.

---

## 8. Veredito Final

O plano anterior tinha boa intenção, mas já não refletia o estado real do projeto.

Versão final validada:

- mantém a direção macro do relatório original;
- remove falsos bloqueios já resolvidos;
- inclui os problemas que realmente impedem evolução segura hoje;
- reorganiza as prioridades na ordem correta para publicação e continuidade.

Resumo objetivo:

- o projeto não está ruim de stack;
- o projeto está interrompido no meio de uma transição;
- o maior ganho agora vem de coerência, não de novas ferramentas.
