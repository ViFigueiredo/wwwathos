# Design: Site institucional Conexão CO

Data: 2026-07-22

## Contexto

A Conexão CO é parceira nacional TIM Empresas, especializada em soluções corporativas de telecomunicações (telefonia móvel corporativa, fibra óptica empresarial, portabilidade, gestão de contratos, expansão de linhas e consultoria), atuando exclusivamente no mercado B2B em todo o território nacional.

O objetivo deste projeto é criar um site institucional de vendas (SPA) que apresente a empresa, suas soluções e facilite o contato via WhatsApp, com identidade visual que remeta à estética de operadora de telecom (azul + "três risquinhos" vermelho/branco), **sem citar a marca "TIM" em nenhum texto do site**.

## Dados da empresa

- Nome: Conexão CO
- Telefone/WhatsApp: +55 62 98177-1999
- E-mail de atendimento: atendimentotimempresas@conexaoco.com.br
- Logo: arquivo `logo.jpeg` na raiz do projeto (fundo branco, "M" estilizado em azul-marinho `#0A0F7A` e vermelho `#E30613`, texto "Conexão CO" com "CO" em vermelho)

## Escopo

Site institucional de uma página (SPA), sem backend, sem formulário de contato, com CTA de contato via WhatsApp (link direto, chat vazio) e por telefone/e-mail.

Fora de escopo: blog, área logada, CMS, formulário com envio de e-mail, múltiplas rotas/URLs por seção, internacionalização.

## Stack técnica

- **React + Vite**, TypeScript opcional (usar JS puro por padrão do projeto, a menos que o codebase já use TS).
- SPA de página única navegada por âncoras internas (`#inicio`, `#solucoes`, `#sobre`, `#contato`) com scroll suave — **sem React Router**, sem múltiplas rotas.
- CSS puro / CSS Modules — sem framework de UI pesado (não usar Bootstrap/MUI); componentes estilizados sob medida para a identidade visual definida.
- Build agnóstico de hospedagem (compatível com Vercel, Netlify, ou export estático para hospedagem compartilhada) — decisão de hospedagem final em aberto, não deve ser hardcoded no projeto.
- Sem dependência de backend/API externas.

## Identidade visual

### Paleta de cores

Extraída da logo (fundo branco):

| Uso | Cor | Hex |
|---|---|---|
| Azul-marinho (primária, marca) | Azul escuro | `#0A0F7A` |
| Vermelho (acento, CTA) | Vermelho | `#E30613` |
| Fundo claro de seções | Cinza muito claro | `#F5F6FB` |
| Fundo branco | Branco | `#FFFFFF` |
| Texto principal | Cinza escuro/quase preto | `#1A1A2E` (ajustável) |
| WhatsApp (apenas no botão de CTA) | Verde | `#25D366` |

O site deve ser predominantemente **claro** (fundo branco/cinza claro), com o azul-marinho e vermelho usados como cores de destaque/marca — não como fundo dominante em todas as seções — para manter compatibilidade com a logo de fundo branco e um tom "corporativo B2B" (não "operadora de consumo").

### Layout de referência (aprovado via mockup visual)

- **Header**: sempre fundo branco/claro, fixo (sticky) no topo. Logo à esquerda, menu de âncoras (Início, Soluções, Sobre, Contato) à direita, botão "Fale conosco" (WhatsApp) em destaque.
- **Hero (#inicio)**: fundo claro à esquerda com headline, subheadline e CTAs; bloco azul-marinho diagonal à direita (clip-path) contendo o elemento gráfico "três risquinhos" (vermelho/branco/vermelho, inclinados ~15°) como elemento de marca.
- **Elemento "risquinhos"**: usado com moderação em pontos-chave — versão grande no hero, versão mini (2 traços) ao lado de títulos de seção, borda superior vermelha em cards de solução, faixa diagonal sutil em blocos de destaque/CTA. Não deve dominar visualmente as seções de conteúdo.
- **Nunca usar a palavra "TIM"** em texto, alt de imagem, título de página ou qualquer conteúdo visível/meta do site.

## Estrutura de conteúdo (SPA, seções em ordem)

### Header (sticky)
- Logo (arquivo `logo.jpeg` ou versão vetorizada, se produzida)
- Menu: Início / Soluções / Sobre / Contato (scroll suave até a âncora correspondente)
- Botão "Fale conosco" via WhatsApp (abre `https://wa.me/5562981771999` em nova aba, chat vazio sem mensagem pré-preenchida)

### Botão flutuante de WhatsApp
- Fixo no canto inferior direito, visível em todas as seções/scroll positions
- Mesmo destino: `https://wa.me/5562981771999`, chat vazio

### #inicio (Hero)
- Headline principal: proposta de valor central (conectividade, mobilidade e comunicação corporativa)
- Subheadline: reforça parceria nacional, atuação B2B, atendimento consultivo
- CTA duplo: "Fale com um consultor" (WhatsApp) + "Conheça as soluções" (scroll até #solucoes)

### #solucoes
Grid de 6 cards, um por solução do briefing:
1. Telefonia móvel corporativa
2. Portabilidade empresarial
3. Gestão e renovação de contratos corporativos
4. Internet fibra óptica empresarial
5. Inclusão de novas linhas e expansão de operações
6. Consultoria especializada em telecomunicações

Cada card: ícone, título, descrição curta (1-2 frases). Borda superior vermelha como acento. Sem CTA individual por card — um único CTA ao final da seção (WhatsApp).

### #sobre
Texto institucional escrito com base no briefing, cobrindo:
- Quem somos: parceiro nacional especializado em soluções corporativas de telecomunicações
- Atuação exclusiva B2B, em todo o território nacional
- Diferenciais: atendimento consultivo, agilidade nos processos, acompanhamento completo (contratação → pós-venda)
- Perfil de clientes atendidos: pequenas, médias e grandes empresas; indústrias, comércio, prestadores de serviço e agronegócio

Bloco de destaque com 3-4 diferenciais em formato de mini-stat/ícone (ex: "Atuação nacional", "Atendimento consultivo", "Do contrato ao pós-venda", "Soluções sob medida") — **sem inventar números não fornecidos** (não usar "X anos de mercado" ou "X clientes atendidos" sem dado real).

### #contato
- Telefone: +55 62 98177-1999 (exibido e como link `tel:`)
- E-mail: atendimentotimempresas@conexaoco.com.br (exibido e como link `mailto:`)
- Botão grande de WhatsApp (chat vazio) como CTA principal
- Sem formulário de contato

### Footer
- Logo (versão pequena)
- Telefone e e-mail
- Menu de âncoras repetido
- Copyright com ano corrente

## Responsividade

- Mobile-first: header colapsa menu em ícone hamburguer abaixo de ~768px; botão flutuante de WhatsApp sempre visível e acessível ao polegar.
- Grid de soluções: 3 colunas desktop → 2 colunas tablet → 1 coluna mobile.
- Hero: bloco azul diagonal empilha abaixo do texto em telas estreitas (não corta conteúdo).

## Acessibilidade e SEO básico

- HTML semântico (`<header>`, `<nav>`, `<main>`, `<section id="...">`, `<footer>`)
- `alt` descritivo na logo (sem mencionar "TIM")
- Meta title/description focados em "telefonia corporativa", "fibra óptica empresarial", "soluções B2B de telecomunicações" (sem citar marca de operadora)
- Contraste de cores validado (texto sobre fundo azul-marinho deve ser branco/claro; vermelho usado só em elementos de destaque, não como texto corrido longo)

## Testing

Projeto puramente front-end estático sem lógica de negócio complexa — não há necessidade de suíte de testes automatizados dedicada. Verificação será feita via:
- Build sem erros (`vite build`)
- Checklist manual de responsividade (mobile/tablet/desktop) via skill `verify`/`run`
- Verificação de que a palavra "TIM" não aparece em nenhum texto renderizado ou meta tag

## Itens explicitamente fora de escopo

- Formulário de contato / integração de envio de e-mail
- Múltiplas rotas ou URLs por seção (React Router)
- Blog, CMS, área logada
- Números/estatísticas institucionais não fornecidos pelo cliente
- Uso do nome "TIM" em qualquer conteúdo visível
