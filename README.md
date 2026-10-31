# CODELABX — HERO SECTION CINEMATOGRÁFICA (SHOWCASE PT-BR)

Refinamento de altíssimo padrão da vitrine de projetos da **CodelabX**, preservando integralmente a tipografia de impacto, as ações e a composição da coluna esquerda, com experiência **100% em português brasileiro (pt-BR)**.

---

## 🎨 1. DIRETRIZES DE ARTE & IDENTIDADE VISUAL

### Fotografia como Protagonista
- **Eliminada a camada preta uniforme pesada**: As imagens respiram com luz natural, composição arquitetônica e riqueza de texturas.
- **Gradientes Localizados**: Apenas sombras pontuais suaves aplicadas na área do texto para garantir leitura cristalina sem escurecer a fotografia.
- **Pré-carregamento Controlado**: Fotografias de alta resolução pré-carregadas via JavaScript para evitar *flashes* ou saltos durante a navegação.

### Acabamento Minimalista de Navegador
- **Bordas Discretas**: Fim dos contornos roxos excessivos. O roxo atua como assinatura refinada e ponto de foco, não como ornamento constante.
- **Barra Superior Clean**: Controles de janela minimalistas, URL com ícone de segurança e etiqueta discreta de *Projeto Conceitual*.
- **Espaçamento Editorial**: Hierarquia ampla, respiro generoso e proporção harmônica entre imagem e texto.

---

## 🏛️ 2. PROJETOS DEMONSTRATIVOS (100% PT-BR)

### 01. VOGEL ARQUITETURA (`vogel-arquitetura.com.br`)
- **Segmento:** Arquitetura Contemporânea
- **Tagline:** `Residências Autorais • São Paulo & Curitiba`
- **Título:** *"Arquitetura que transcende o tempo."*
- **Descrição:** *"Espaços que unem essência, precisão e uma nova forma de viver."*
- **Ação:** *"Explorar projeto"*
- **Estética:** Concreto arquitetônico aparente, vidro, iluminação solar natural e proporções monumentais.

### 02. AURÉLIA (`aurelia-relojoaria.com.br`)
- **Segmento:** Alta Relojoaria
- **Tagline:** `Manufatura de Precisão • Peças Numeradas`
- **Título:** *"O tempo em sua forma mais extraordinária."*
- **Descrição:** *"Uma expressão de precisão, tradição e elegância em cada detalhe."*
- **Ação:** *"Conhecer coleção"*
- **Estética:** Macrofotografia editorial de turbilhão suíço, tons escuros nobres e reflexos de cristal de safira.

### 03. NEXUS (`nexus-inovacao.com.br`)
- **Segmento:** Tecnologia e Inovação
- **Tagline:** `Interfaces Espaciais & Hardware de Vanguarda`
- **Título:** *"O futuro começa com novas possibilidades."*
- **Descrição:** *"Experiências digitais que conectam inovação, inteligência e design."*
- **Ação:** *"Descobrir projeto"*
- **Estética:** Design industrial escultural, ópticas micro-OLED e iluminação ambiente violeta/índigo.

---

## 🎬 3. MOTION & INTERATIVIDADE REFINADA

- **Navegação Manual Primária:** Sem autoplay impositivo. O usuário tem total controle sobre a exploração através dos 3 indicadores inferiores (`01 / Vogel Arquitetura`, `02 / Aurélia`, `03 / Nexus`) e das setas $\leftarrow / \rightarrow$.
- **Transição Cinematográfica com GSAP:** Ao alternar de projeto:
  1. A fotografia atual recebe um zoom suave e transição de opacidade.
  2. O bloco textual recua delicadamente e dá lugar ao novo conteúdo com deslocamento vertical fluido.
  3. A nova fotografia se estabelece sem saltos de layout.
  4. O indicador ativo ganha destaque visual sofisticado (cápsula branca com tipografia preta sólida e sombra suave).
- **Parallax Sutil:** Resposta suave ao movimento do cursor ($\pm 2.5^\circ$) via `requestAnimationFrame` com física *lerp*.
- **Acessibilidade:** Compatibilidade nativa com `prefers-reduced-motion`.

---

## 📁 4. ARQUIVOS IMPLEMENTADOS

- [index.html](file:///c:/Users/Win11/Downloads/Codelbx/index.html) — **Visualização direta e imediata**: abra no navegador com duplo clique sem necessidade de build.
- [src/components/hero/ProjectShowcase.tsx](file:///c:/Users/Win11/Downloads/Codelbx/src/components/hero/ProjectShowcase.tsx) — Componente React modular com tipagem TypeScript e orquestração GSAP.
- [src/components/hero/HeroSection.tsx](file:///c:/Users/Win11/Downloads/Codelbx/src/components/hero/HeroSection.tsx) — Orquestrador da seção Hero.
- [src/components/hero/HeroTypography.tsx](file:///c:/Users/Win11/Downloads/Codelbx/src/components/hero/HeroTypography.tsx) — Tipografia editorial preservada.
- [src/components/hero/HeroActions.tsx](file:///c:/Users/Win11/Downloads/Codelbx/src/components/hero/HeroActions.tsx) — Botões e credenciais preservados.
- [src/components/navigation/Navbar.tsx](file:///c:/Users/Win11/Downloads/Codelbx/src/components/navigation/Navbar.tsx) — Menu superior preservado.
