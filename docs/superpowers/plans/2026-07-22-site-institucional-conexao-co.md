# Site Institucional Conexão CO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React + Vite institutional site for Conexão CO presenting the company's B2B telecom solutions, with a telecom-operator-inspired visual identity (navy + red "stripes"), anchor-based navigation, and WhatsApp/phone/email contact CTAs.

**Architecture:** React SPA bootstrapped with Vite, no router — one `App.jsx` composing section components (`Header`, `Hero`, `Solutions`, `About`, `Contact`, `Footer`, `WhatsAppFloatButton`) rendered in a fixed order on a single page, navigated via `<a href="#section-id">` anchors and CSS `scroll-behavior: smooth`. Each section is a self-contained component with its own CSS file. Static content (company info, solutions list) lives in plain JS data modules under `src/data/`.

**Tech Stack:** React 18, Vite 5, plain CSS (no UI framework), no backend, no test framework (per spec — verification via build + manual/browser checks).

## Global Constraints

- No React Router / no multi-route URLs — single page, anchor navigation only (`#inicio`, `#solucoes`, `#sobre`, `#contato`).
- No formulário de contato / no email-sending integration.
- WhatsApp links always open **chat vazio** (no pre-filled message): `https://wa.me/5562981771999`.
- Phone: `+55 62 98177-1999` (display), digits-only `5562981771999` for `tel:`/`wa.me` links.
- Email: `atendimentotimempresas@conexaoco.com.br`.
- The word **"TIM"** must never appear in any rendered text, `alt` attribute, `title`, or meta tag.
- Colors: navy `#0A0F7A` (primary/brand), navy-dark `#131c99`, red `#E30613` (accent/CTA), WhatsApp green `#25D366`, light background `#F5F6FB`, white `#FFFFFF`, text `#1A1A2E`.
- Site is predominantly light/white — navy and red are accents, not dominant backgrounds across all sections.
- No invented statistics (e.g., "X anos de mercado", "X clientes") — only the differentiators explicitly given in the spec.
- Header is always white/light background, sticky.
- Mobile-first responsive: solutions grid 3→2→1 columns; header nav collapses to hamburger below 768px.

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/assets/logo.jpeg` (copied from repo root `logo.jpeg`)

**Interfaces:**
- Produces: a running Vite + React project (`npm run dev`, `npm run build`), an `App` component in `src/App.jsx` that later tasks will extend, and `src/assets/logo.jpeg` that `Header`/`Footer` will import.

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/components src/data src/styles src/assets
```

- [ ] **Step 2: Copy the logo into src/assets**

```bash
cp logo.jpeg src/assets/logo.jpeg
```

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "conexao-co-site",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 4: Write `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 5: Write `index.html`**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/src/assets/logo.jpeg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conexão CO — Telefonia Corporativa e Fibra Óptica Empresarial</title>
    <meta
      name="description"
      content="Soluções corporativas de telefonia móvel, fibra óptica empresarial e consultoria em telecomunicações para empresas em todo o Brasil."
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 7: Write `src/App.jsx` (placeholder, extended by later tasks)**

```jsx
function App() {
  return (
    <main>
      <p>Conexão CO</p>
    </main>
  )
}

export default App
```

- [ ] **Step 8: Install dependencies**

```bash
npm install
```

- [ ] **Step 9: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0, prints `✓ built in ...` and creates a `dist/` folder.

- [ ] **Step 10: Commit**

```bash
git add package.json vite.config.js index.html src/main.jsx src/App.jsx src/assets/logo.jpeg
git commit -m "chore: scaffold Vite + React project"
```

---

### Task 2: Design tokens and global styles

**Files:**
- Create: `src/styles/variables.css`
- Create: `src/styles/global.css`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: CSS custom properties (`--color-navy`, `--color-navy-dark`, `--color-red`, `--color-whatsapp`, `--color-bg-light`, `--color-bg-white`, `--color-text`, `--color-text-muted`, `--font-family`, `--header-height`, `--radius-sm`, `--radius-md`, `--max-width`) and utility classes (`.container`, `.section-title`, `.accent-mini`, `.btn`, `.btn-primary`, `.btn-whatsapp`, `.btn-outline`) that every later component uses.

- [ ] **Step 1: Write `src/styles/variables.css`**

```css
:root {
  --color-navy: #0A0F7A;
  --color-navy-dark: #131c99;
  --color-red: #E30613;
  --color-whatsapp: #25D366;
  --color-bg-light: #F5F6FB;
  --color-bg-white: #FFFFFF;
  --color-text: #1A1A2E;
  --color-text-muted: #5A5F87;
  --font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --header-height: 72px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --max-width: 1180px;
}
```

- [ ] **Step 2: Write `src/styles/global.css`**

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-bg-white);
  line-height: 1.5;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.75rem;
  color: var(--color-navy);
  margin-bottom: 32px;
}

.accent-mini {
  display: flex;
  gap: 3px;
}

.accent-mini span {
  display: block;
  width: 4px;
  height: 20px;
  border-radius: 2px;
  transform: skewX(-15deg);
}

.accent-mini span:nth-child(1) { background: var(--color-red); }
.accent-mini span:nth-child(2) { background: var(--color-navy); }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn-primary {
  background: var(--color-red);
  color: #fff;
}

.btn-whatsapp {
  background: var(--color-whatsapp);
  color: #fff;
}

.btn-outline {
  background: transparent;
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
```

- [ ] **Step 3: Import the stylesheets in `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/variables.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0, no CSS import errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/variables.css src/styles/global.css src/main.jsx
git commit -m "feat: add design tokens and global styles"
```

---

### Task 3: Company constants and solutions data

**Files:**
- Create: `src/data/constants.js`
- Create: `src/data/solutions.js`

**Interfaces:**
- Produces: `COMPANY` object (`{ name, phoneDisplay, phoneDigits, email, whatsappUrl }`) from `src/data/constants.js`, and `SOLUTIONS` array (`{ id, title, description, icon }[]`) from `src/data/solutions.js`. `icon` values are string keys (`'phone' | 'swap' | 'document' | 'wifi' | 'expand' | 'chat'`) consumed by the icon map built in Task 7.

- [ ] **Step 1: Write `src/data/constants.js`**

```js
export const COMPANY = {
  name: 'Conexão CO',
  phoneDisplay: '+55 62 98177-1999',
  phoneDigits: '5562981771999',
  email: 'atendimentotimempresas@conexaoco.com.br',
  whatsappUrl: 'https://wa.me/5562981771999',
}
```

- [ ] **Step 2: Write `src/data/solutions.js`**

```js
export const SOLUTIONS = [
  {
    id: 'telefonia-movel',
    title: 'Telefonia móvel corporativa',
    description:
      'Planos e linhas móveis corporativas com condições exclusivas, e gestão simplificada de toda a frota de celulares da sua empresa.',
    icon: 'phone',
  },
  {
    id: 'portabilidade',
    title: 'Portabilidade empresarial',
    description:
      'Leve os números da sua empresa para um plano corporativo mais vantajoso, sem burocracia e sem perder o histórico de contatos.',
    icon: 'swap',
  },
  {
    id: 'gestao-contratos',
    title: 'Gestão e renovação de contratos',
    description:
      'Acompanhamento contínuo do seu contrato, com renegociação e renovação sempre nos melhores termos para a sua operação.',
    icon: 'document',
  },
  {
    id: 'fibra-optica',
    title: 'Internet fibra óptica empresarial',
    description:
      'Conexão de alta velocidade e estabilidade para a operação da sua empresa, com planos sob medida para cada porte de negócio.',
    icon: 'wifi',
  },
  {
    id: 'expansao',
    title: 'Inclusão de linhas e expansão',
    description:
      'Escale sua operação com agilidade: inclusão de novas linhas e serviços conforme o crescimento da sua empresa.',
    icon: 'expand',
  },
  {
    id: 'consultoria',
    title: 'Consultoria especializada',
    description:
      'Orientação técnica e comercial para escolher as melhores soluções de conectividade e comunicação para o seu negócio.',
    icon: 'chat',
  },
]
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0 (modules are unused so far, but must be valid JS — no syntax errors).

- [ ] **Step 4: Commit**

```bash
git add src/data/constants.js src/data/solutions.js
git commit -m "feat: add company constants and solutions data"
```

---

### Task 4: Header component

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `COMPANY` from `src/data/constants.js` (`whatsappUrl`), `src/assets/logo.jpeg`.
- Produces: default-exported `Header` component, rendered by `App`.

- [ ] **Step 1: Write `src/components/Header.jsx`**

```jsx
import { useState } from 'react'
import { COMPANY } from '../data/constants.js'
import logo from '../assets/logo.jpeg'
import './Header.css'

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="header__logo" onClick={handleNavClick}>
          <img src={logo} alt="Conexão CO" width="160" height="40" />
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp header__cta"
          >
            Fale conosco
          </a>
        </nav>

        <button
          className="header__toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
```

- [ ] **Step 2: Write `src/components/Header.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg-white);
  box-shadow: 0 1px 6px rgba(10, 15, 122, 0.08);
}

.header__inner {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo img {
  height: 40px;
  width: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header__nav a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text);
}

.header__nav a:hover {
  color: var(--color-navy);
}

.header__cta {
  padding: 8px 18px;
}

.header__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
}

.header__toggle span {
  width: 24px;
  height: 2px;
  background: var(--color-navy);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .header__toggle {
    display: flex;
  }

  .header__nav {
    position: absolute;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: var(--color-bg-white);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0 16px;
    max-height: 0;
    overflow: hidden;
    box-shadow: 0 6px 10px rgba(10, 15, 122, 0.08);
    transition: max-height 0.25s ease;
  }

  .header__nav--open {
    max-height: 320px;
    padding: 16px;
  }

  .header__nav a {
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid var(--color-bg-light);
  }

  .header__cta {
    margin-top: 12px;
    width: 100%;
  }
}
```

- [ ] **Step 3: Wire `Header` into `src/App.jsx`**

```jsx
import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <p>Conexão CO</p>
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`, open the local URL in a browser. Confirm: the header is sticky at the top with the Conexão CO logo on the left, nav links (Início, Soluções, Sobre, Contato) and a green "Fale conosco" button on the right; at widths below 768px the nav collapses behind a hamburger button that toggles it open/closed.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.jsx src/components/Header.css src/App.jsx
git commit -m "feat: add sticky Header component"
```

---

### Task 5: WhatsApp floating button

**Files:**
- Create: `src/components/WhatsAppFloatButton.jsx`
- Create: `src/components/WhatsAppFloatButton.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `COMPANY.whatsappUrl` from `src/data/constants.js`.
- Produces: default-exported `WhatsAppFloatButton` component, rendered by `App` alongside `Header`.

- [ ] **Step 1: Write `src/components/WhatsAppFloatButton.jsx`**

```jsx
import { COMPANY } from '../data/constants.js'
import './WhatsAppFloatButton.css'

function WhatsAppFloatButton() {
  return (
    <a
      href={COMPANY.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Falar no WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.01 2C6.485 2 2 6.485 2 12.01c0 1.98.578 3.83 1.575 5.386L2 22l4.73-1.55A9.95 9.95 0 0 0 12.01 22c5.525 0 10.01-4.485 10.01-9.99C22.02 6.485 17.535 2 12.01 2zm0 18.184a8.13 8.13 0 0 1-4.15-1.135l-.297-.176-2.807.92.925-2.735-.194-.28a8.15 8.15 0 0 1-1.28-4.368c0-4.512 3.673-8.184 8.183-8.184 4.51 0 8.183 3.672 8.183 8.184 0 4.511-3.672 8.184-8.183 8.184z" />
      </svg>
    </a>
  )
}

export default WhatsAppFloatButton
```

- [ ] **Step 2: Write `src/components/WhatsAppFloatButton.css`**

```css
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-whatsapp);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 200;
}

@media (max-width: 480px) {
  .whatsapp-float {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }
}
```

- [ ] **Step 3: Wire `WhatsAppFloatButton` into `src/App.jsx`**

```jsx
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <p>Conexão CO</p>
      </main>
      <WhatsAppFloatButton />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`, open the local URL. Confirm a round green WhatsApp button is fixed to the bottom-right corner, visible while scrolling, and clicking it opens `https://wa.me/5562981771999` in a new tab with an empty chat.

- [ ] **Step 6: Commit**

```bash
git add src/components/WhatsAppFloatButton.jsx src/components/WhatsAppFloatButton.css src/App.jsx
git commit -m "feat: add floating WhatsApp button"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/Hero.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `COMPANY.whatsappUrl` from `src/data/constants.js`.
- Produces: default-exported `Hero` component with `id="inicio"` section, rendered inside `App`'s `<main>`.

- [ ] **Step 1: Write `src/components/Hero.jsx`**

```jsx
import { COMPANY } from '../data/constants.js'
import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1>Conectividade e mobilidade corporativa para sua empresa crescer</h1>
          <p>
            Parceiro nacional especializado em soluções corporativas de telecomunicações.
            Atendimento consultivo, do contrato ao pós-venda, em todo o território nacional.
          </p>
          <div className="hero__actions">
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Fale com um consultor
            </a>
            <a href="#solucoes" className="btn btn-outline">
              Conheça as soluções
            </a>
          </div>
        </div>

        <div className="hero__accent" aria-hidden="true">
          <div className="hero__stripes">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
```

- [ ] **Step 2: Write `src/components/Hero.css`**

```css
.hero {
  position: relative;
  background: var(--color-bg-light);
  overflow: hidden;
}

.hero__inner {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 480px;
  padding-top: 48px;
  padding-bottom: 48px;
}

.hero__content {
  max-width: 560px;
  position: relative;
  z-index: 2;
}

.hero__content h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  color: var(--color-navy);
  margin-bottom: 20px;
}

.hero__content p {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin-bottom: 32px;
}

.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero__accent {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 38%;
  background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0% 100%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 32px;
}

.hero__stripes {
  display: flex;
  gap: 8px;
}

.hero__stripes span {
  display: block;
  width: 8px;
  height: 64px;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.hero__stripes span:nth-child(1) { background: var(--color-red); }
.hero__stripes span:nth-child(2) { background: #fff; }
.hero__stripes span:nth-child(3) { background: var(--color-red); opacity: 0.7; }

@media (max-width: 768px) {
  .hero__inner {
    flex-direction: column;
    align-items: flex-start;
    min-height: auto;
    padding-top: 40px;
  }

  .hero__content {
    max-width: 100%;
  }

  .hero__content h1 {
    font-size: 1.9rem;
  }

  .hero__accent {
    position: relative;
    width: 100%;
    height: 90px;
    clip-path: none;
    margin-top: 32px;
    border-radius: var(--radius-md);
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
}
```

- [ ] **Step 3: Replace the placeholder in `src/App.jsx` with `Hero`**

```jsx
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <WhatsAppFloatButton />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`, open the local URL. Confirm: light-background hero with headline, subheadline and two buttons ("Fale com um consultor" red, "Conheça as soluções" outlined) on the left; a navy diagonal block with three red/white/red stripes on the right. On narrow viewports (< 768px) the diagonal block stacks below the text as a full-width horizontal band instead of cutting off content.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css src/App.jsx
git commit -m "feat: add Hero section"
```

---

### Task 7: Solutions section (icons, cards, grid)

**Files:**
- Create: `src/components/icons.jsx`
- Create: `src/components/SolutionCard.jsx`
- Create: `src/components/SolutionCard.css`
- Create: `src/components/Solutions.jsx`
- Create: `src/components/Solutions.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `SOLUTIONS` from `src/data/solutions.js`, `COMPANY.whatsappUrl` from `src/data/constants.js`.
- Produces: `ICONS` map (`{ phone, swap, document, wifi, expand, chat }` → components) exported from `src/components/icons.jsx`; default-exported `SolutionCard` (props: `title`, `description`, `icon`); default-exported `Solutions` component with `id="solucoes"` section, rendered inside `App`'s `<main>` after `Hero`.

- [ ] **Step 1: Write `src/components/icons.jsx`**

```jsx
const iconProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function SwapIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

export function DocumentIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15h6" />
      <path d="M9 11h1" />
    </svg>
  )
}

export function WifiIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 12.55a11 11 0 0 1 14 0" />
      <path d="M8.5 16a6 6 0 0 1 7 0" />
      <path d="M2 8.82a16 16 0 0 1 20 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ExpandIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}

export function ChatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

export const ICONS = {
  phone: PhoneIcon,
  swap: SwapIcon,
  document: DocumentIcon,
  wifi: WifiIcon,
  expand: ExpandIcon,
  chat: ChatIcon,
}
```

- [ ] **Step 2: Write `src/components/SolutionCard.jsx`**

```jsx
import { ICONS } from './icons.jsx'
import './SolutionCard.css'

function SolutionCard({ title, description, icon }) {
  const Icon = ICONS[icon]

  return (
    <div className="solution-card">
      <div className="solution-card__icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default SolutionCard
```

- [ ] **Step 3: Write `src/components/SolutionCard.css`**

```css
.solution-card {
  background: var(--color-bg-light);
  border-radius: var(--radius-md);
  border-top: 3px solid var(--color-red);
  padding: 24px;
}

.solution-card__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.solution-card h3 {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 8px;
}

.solution-card p {
  font-size: 0.92rem;
  color: var(--color-text-muted);
}
```

- [ ] **Step 4: Write `src/components/Solutions.jsx`**

```jsx
import { COMPANY } from '../data/constants.js'
import { SOLUTIONS } from '../data/solutions.js'
import SolutionCard from './SolutionCard.jsx'
import './Solutions.css'

function Solutions() {
  return (
    <section id="solucoes" className="solutions">
      <div className="container">
        <h2 className="section-title">
          <span className="accent-mini">
            <span />
            <span />
          </span>
          Nossas soluções
        </h2>

        <div className="solutions__grid">
          {SOLUTIONS.map((solution) => (
            <SolutionCard
              key={solution.id}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
            />
          ))}
        </div>

        <div className="solutions__cta">
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Solicitar proposta
          </a>
        </div>
      </div>
    </section>
  )
}

export default Solutions
```

- [ ] **Step 5: Write `src/components/Solutions.css`**

```css
.solutions {
  padding: 72px 0;
  background: var(--color-bg-white);
}

.solutions__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.solutions__cta {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 992px) {
  .solutions__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .solutions__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 6: Add `Solutions` to `src/App.jsx` after `Hero`**

```jsx
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
      </main>
      <WhatsAppFloatButton />
    </>
  )
}

export default App
```

- [ ] **Step 7: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 8: Verify visually**

Run: `npm run dev`, open the local URL, scroll to (or click "Soluções" in the header) the solutions section. Confirm: 6 cards in a 3-column grid (2 columns around tablet width, 1 column on mobile), each with an icon, title, description, red top border, and a single "Solicitar proposta" WhatsApp button centered below the grid.

- [ ] **Step 9: Commit**

```bash
git add src/components/icons.jsx src/components/SolutionCard.jsx src/components/SolutionCard.css src/components/Solutions.jsx src/components/Solutions.css src/App.jsx
git commit -m "feat: add Solutions section with icon cards"
```

---

### Task 8: About section

**Files:**
- Create: `src/components/About.jsx`
- Create: `src/components/About.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: nothing external (static copy only).
- Produces: default-exported `About` component with `id="sobre"` section, rendered inside `App`'s `<main>` after `Solutions`.

- [ ] **Step 1: Write `src/components/About.jsx`**

```jsx
import './About.css'

const HIGHLIGHTS = [
  'Atuação nacional',
  'Atendimento consultivo',
  'Do contrato ao pós-venda',
  'Soluções sob medida',
]

function About() {
  return (
    <section id="sobre" className="about">
      <div className="container">
        <h2 className="section-title">
          <span className="accent-mini">
            <span />
            <span />
          </span>
          Sobre a Conexão CO
        </h2>

        <div className="about__content">
          <p>
            Somos um parceiro nacional especializado em soluções corporativas de
            telecomunicações, com foco em telefonia móvel corporativa e fibra óptica
            empresarial.
          </p>
          <p>
            Atuamos exclusivamente no mercado B2B, atendendo empresas de todos os
            portes e segmentos em todo o território nacional — da indústria ao
            comércio, de prestadores de serviço ao agronegócio — com o objetivo de
            oferecer conectividade, mobilidade e comunicação que impulsionam a
            produtividade e o crescimento dos nossos clientes.
          </p>
          <p>
            Nosso diferencial está no atendimento consultivo, na agilidade dos
            processos e no acompanhamento completo, desde a contratação até o
            pós-venda.
          </p>
        </div>

        <div className="about__highlights">
          {HIGHLIGHTS.map((item) => (
            <div key={item} className="about__highlight">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
```

- [ ] **Step 2: Write `src/components/About.css`**

```css
.about {
  padding: 72px 0;
  background: var(--color-bg-light);
}

.about__content {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--color-text-muted);
  margin-bottom: 40px;
}

.about__highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.about__highlight {
  background: var(--color-navy);
  color: #fff;
  border-radius: var(--radius-md);
  padding: 20px 16px;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
}

@media (max-width: 768px) {
  .about__highlights {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 3: Add `About` to `src/App.jsx` after `Solutions`**

```jsx
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'
import About from './components/About.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <About />
      </main>
      <WhatsAppFloatButton />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`, open the local URL, click "Sobre" in the header. Confirm: light-gray section with three paragraphs of institutional copy and a 4-column row of navy highlight boxes ("Atuação nacional", "Atendimento consultivo", "Do contrato ao pós-venda", "Soluções sob medida") that collapses to 2 columns on mobile.

- [ ] **Step 6: Commit**

```bash
git add src/components/About.jsx src/components/About.css src/App.jsx
git commit -m "feat: add About section"
```

---

### Task 9: Contact section

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Contact.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `COMPANY` (`whatsappUrl`, `phoneDigits`, `phoneDisplay`, `email`) from `src/data/constants.js`.
- Produces: default-exported `Contact` component with `id="contato"` section, rendered inside `App`'s `<main>` after `About`.

- [ ] **Step 1: Write `src/components/Contact.jsx`**

```jsx
import { COMPANY } from '../data/constants.js'
import './Contact.css'

function Contact() {
  return (
    <section id="contato" className="contact">
      <div className="container contact__inner">
        <div className="contact__stripes" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <h2>Vamos conversar sobre a sua empresa?</h2>
        <p>
          Fale agora com um consultor especializado e descubra a melhor solução de
          telecomunicações para o seu negócio.
        </p>

        <a
          href={COMPANY.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp contact__whatsapp"
        >
          Falar no WhatsApp
        </a>

        <div className="contact__details">
          <a href={`tel:${COMPANY.phoneDigits}`}>{COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
```

- [ ] **Step 2: Write `src/components/Contact.css`**

```css
.contact {
  position: relative;
  background: var(--color-navy);
  color: #fff;
  padding: 72px 0;
  overflow: hidden;
  text-align: center;
}

.contact__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.contact h2 {
  font-size: 1.9rem;
}

.contact p {
  max-width: 520px;
  color: rgba(255, 255, 255, 0.8);
}

.contact__whatsapp {
  margin-top: 8px;
  padding: 14px 32px;
  font-size: 1rem;
}

.contact__details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
}

.contact__stripes {
  position: absolute;
  top: 0;
  left: -40px;
  bottom: 0;
  width: 120px;
  display: flex;
  gap: 10px;
  opacity: 0.25;
}

.contact__stripes span {
  display: block;
  width: 16px;
  height: 100%;
  transform: skewX(-15deg);
}

.contact__stripes span:nth-child(1) { background: var(--color-red); }
.contact__stripes span:nth-child(2) { background: #fff; }
.contact__stripes span:nth-child(3) { background: var(--color-red); }
```

- [ ] **Step 3: Add `Contact` to `src/App.jsx` after `About`**

```jsx
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <About />
        <Contact />
      </main>
      <WhatsAppFloatButton />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`, open the local URL, click "Contato" in the header. Confirm: navy section with heading, supporting text, a "Falar no WhatsApp" button, and clickable phone (`tel:`) and email (`mailto:`) links below it. No contact form is present.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.css src/App.jsx
git commit -m "feat: add Contact section"
```

---

### Task 10: Footer

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `COMPANY` (`phoneDigits`, `phoneDisplay`, `email`) from `src/data/constants.js`, `src/assets/logo.jpeg`.
- Produces: default-exported `Footer` component, rendered by `App` after `<main>` and before `WhatsAppFloatButton`. This completes the full page assembly.

- [ ] **Step 1: Write `src/components/Footer.jsx`**

```jsx
import { COMPANY } from '../data/constants.js'
import logo from '../assets/logo.jpeg'
import './Footer.css'

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="Conexão CO" width="140" height="35" className="footer__logo" />

        <nav className="footer__nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href={`tel:${COMPANY.phoneDigits}`}>{COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>

        <p className="footer__copy">© {year} Conexão CO. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 2: Write `src/components/Footer.css`**

```css
.footer {
  background: #fff;
  border-top: 1px solid var(--color-bg-light);
  padding: 40px 0;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.footer__nav {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.9rem;
}

.footer__contact {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.footer__copy {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Add `Footer` to `src/App.jsx` (final assembly)**

```jsx
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`, open the local URL. Confirm: white footer below the Contact section, with logo, repeated anchor nav, phone/email links, and a copyright line showing the current year. Scroll through the whole page top to bottom and confirm section order is Header → Hero → Solutions → About → Contact → Footer, with the WhatsApp float button visible throughout.

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.css src/App.jsx
git commit -m "feat: add Footer and complete page assembly"
```

---

### Task 11: Final QA — responsiveness, brand-name check, build

**Files:**
- No new files. Verification only (may include small CSS fixes to any file under `src/` if responsive issues are found).

**Interfaces:**
- Consumes: the fully assembled site from Tasks 1–10.
- Produces: a verified, production-ready build in `dist/`.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: exits 0, `dist/index.html` and hashed asset files are generated.

- [ ] **Step 2: Grep check — the word "TIM" must not appear anywhere in source**

```bash
grep -rniE '\btim\b' src/ index.html || echo "OK: no standalone 'TIM' occurrences"
```

Expected: `OK: no standalone 'TIM' occurrences` (the check is case-insensitive and word-bounded, so it won't false-positive on substrings like "estimado"). If it matches anything, edit the offending file to remove/rephrase the text and re-run.

- [ ] **Step 3: Responsive check — desktop**

Run: `npm run dev`, open the local URL at a desktop viewport (≥1280px wide). Confirm: header nav fully visible (no hamburger), hero content and diagonal accent side-by-side, solutions grid in 3 columns, about highlights in 4 columns.

- [ ] **Step 4: Responsive check — tablet**

Resize the viewport to ~768–992px wide. Confirm: solutions grid switches to 2 columns, about highlights switch to 2 columns, header nav still visible or just starting to collapse depending on exact breakpoint, no horizontal scrollbar/content overflow.

- [ ] **Step 5: Responsive check — mobile**

Resize the viewport to ~375px wide (or use a mobile device preset). Confirm: header shows the hamburger toggle and opens/closes the nav menu correctly, hero's diagonal accent stacks below the text as a horizontal band, solutions grid is single-column, about highlights are 2 columns, WhatsApp float button doesn't overlap or get clipped by page edges, no horizontal scrollbar.

- [ ] **Step 6: Link check**

In the running dev site, confirm: every "Fale conosco" / "Fale com um consultor" / "Solicitar proposta" / "Falar no WhatsApp" link and the floating WhatsApp button all point to `https://wa.me/5562981771999` and open in a new tab; the phone link in Contact/Footer is `tel:5562981771999`; the email link is `mailto:atendimentotimempresas@conexaoco.com.br`.

- [ ] **Step 7: Commit any fixes found during QA**

If Steps 3–6 required CSS/markup fixes, stage and commit them:

```bash
git add -A
git commit -m "fix: responsive and QA fixes from final review"
```

If no fixes were needed, skip this step (nothing to commit).
