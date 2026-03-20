# Rumo Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Rumo from Vite/React to Next.js App Router, update the landing page to a four-step journey, and add cross-links between standalone apps.

**Architecture:** Next.js 16 App Router with Tailwind CSS. Single landing page (server component) with client-side interactivity for scroll reveal and video. Existing components ported with minimal changes. Fonts loaded via next/font instead of Google Fonts CDN.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 3, lucide-react, next/font

**Spec:** `docs/superpowers/specs/2026-03-20-rumo-phase1-design.md`

---

## File Structure

```
rumo/
  app/
    layout.tsx          — Root layout: fonts, metadata, Tailwind
    page.tsx            — Landing page: assembles all sections
    globals.css         — Base styles (from src/index.css)
  components/
    hero.tsx            — Video hero with headline (client component)
    problem.tsx         — Problem statement section (client component)
    section-intro.tsx   — "The Plan" intro above pillars (client component)
    pillar-section.tsx  — Single pillar/step card (client component)
    pillars.tsx         — Assembles all four steps (server component)
    horizon.tsx         — Future vision + email capture (client component)
    guide.tsx           — Chad bio section (client component)
    footer.tsx          — Footer (server component)
    compass-rose.tsx    — Shared compass rose SVG (server component)
  hooks/
    use-scroll-reveal.ts — IntersectionObserver hook (unchanged)
  public/
    hero-bg.mp4         — Caravel video (existing)
    hero-poster.jpg     — Video poster (existing, if present)
    pillars/            — Pillar images (existing)
  next.config.ts        — Next.js config
  tailwind.config.ts    — Tailwind config (ported from .js)
  postcss.config.mjs    — PostCSS config
  tsconfig.json         — TypeScript config (Next.js defaults)
```

### What gets deleted after migration
- `src/` directory (all ported to `app/` and `components/`)
- `index.html` (replaced by `layout.tsx`)
- `vite.config.ts`
- `vite-env.d.ts`
- `postcss.config.js` (replaced by `postcss.config.mjs`)

---

### Task 1: Scaffold Next.js alongside existing Vite app

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install Next.js and update dependencies**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
npm install next@latest
npm install -D @types/node
```

- [ ] **Step 2: Update package.json scripts**

Replace the scripts section:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 4: Create tailwind.config.ts**

Port from existing `tailwind.config.js`. Change content paths from Vite to Next.js:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a2744',
        'navy-light': '#243352',
        cream: '#faf6f1',
        'cream-dark': '#f0e8dd',
        ochre: '#c4943a',
        'ochre-light': '#d4a94f',
        ocean: '#2a6496',
      },
      fontFamily: {
        display: ['var(--font-source-serif)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

Note: Font families now use CSS variables from next/font instead of hardcoded names.

- [ ] **Step 5: Create postcss.config.mjs**

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

- [ ] **Step 6: Create app/globals.css**

Port from `src/index.css`. Remove the font-family on body (handled by next/font in layout):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #faf6f1;
  color: #1a2744;
}

/* Scroll-triggered animation utility */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 7: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Source_Serif_4, DM_Sans } from 'next/font/google'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RUMO — Find Your Direction with AI',
  description:
    'AI is powerful but generic. You need direction first. Build your personal AI foundation with Rumo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${dmSans.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

- [ ] **Step 8: Create app/page.tsx (placeholder)**

```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-cream">
      <h1 className="font-display text-4xl">Rumo</h1>
    </div>
  )
}
```

- [ ] **Step 9: Update tsconfig.json for Next.js**

Replace contents with Next.js defaults:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 10: Update .gitignore**

Add Next.js entries:
```
.next/
out/
next-env.d.ts
```

- [ ] **Step 11: Verify Next.js runs**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo && npm run dev
```

Expected: Dev server starts, placeholder page renders at localhost:3000 with "Rumo" in display font.

- [ ] **Step 12: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add app/ next.config.ts tailwind.config.ts postcss.config.mjs package.json package-lock.json tsconfig.json .gitignore
git commit -m "chore: scaffold Next.js App Router alongside Vite"
```

---

### Task 2: Port hooks and shared components

**Files:**
- Create: `hooks/use-scroll-reveal.ts`
- Create: `components/compass-rose.tsx`

- [ ] **Step 1: Port useScrollReveal hook**

Create `hooks/use-scroll-reveal.ts` — identical to `src/hooks/useScrollReveal.ts`:
```typescript
'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
```

- [ ] **Step 2: Extract shared CompassRose component**

Create `components/compass-rose.tsx` — extracted from Horizon.tsx. This is used in Horizon and Problem as a watermark. Server component (pure SVG):
```tsx
export function CompassRose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const outerR = 96
        const innerR = angle % 90 === 0 ? 84 : 88
        return (
          <line
            key={angle}
            x1={100 + Math.sin(rad) * innerR}
            y1={100 - Math.cos(rad) * innerR}
            x2={100 + Math.sin(rad) * outerR}
            y2={100 - Math.cos(rad) * outerR}
            stroke="currentColor"
            strokeWidth={angle % 90 === 0 ? '0.8' : '0.4'}
            opacity={angle % 90 === 0 ? '0.5' : '0.25'}
          />
        )
      })}
      <polygon points="100,8 104,80 100,70 96,80" fill="currentColor" opacity="0.6" />
      <polygon points="100,192 96,120 100,130 104,120" fill="currentColor" opacity="0.25" />
      <polygon points="192,100 120,96 130,100 120,104" fill="currentColor" opacity="0.35" />
      <polygon points="8,100 80,104 70,100 80,96" fill="currentColor" opacity="0.35" />
      <polygon points="166,34 115,90 118,86 112,88" fill="currentColor" opacity="0.15" />
      <polygon points="166,166 118,114 115,110 112,112" fill="currentColor" opacity="0.15" />
      <polygon points="34,166 86,118 90,115 88,112" fill="currentColor" opacity="0.15" />
      <polygon points="34,34 88,88 90,85 86,82" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.15" />
    </svg>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add hooks/ components/compass-rose.tsx
git commit -m "feat: port scroll reveal hook and compass rose component"
```

---

### Task 3: Port Hero component

**Files:**
- Create: `components/hero.tsx`

- [ ] **Step 1: Port Hero to Next.js**

Create `components/hero.tsx` as a client component. Port directly from `src/components/Hero.tsx`. Key changes:
- Add `'use client'` directive at top (needed for onClick handler and inline styles with animations)
- Import paths stay the same (no hook imports needed, animations are CSS-only)
- Keep the compass rose SVG logo inline (it's specific to the header)
- Keep the hero-bg.mp4 video reference (file stays in `public/`)
- All inline `<style>` tags preserved as-is

The component is a direct port — no copy changes yet (those come in Task 7).

- [ ] **Step 2: Verify hero renders**

Update `app/page.tsx` temporarily to import and render just the Hero:
```tsx
import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
    </div>
  )
}
```

Run dev server and verify: video plays, headline renders, scroll indicator works, compass logo shows.

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add components/hero.tsx app/page.tsx
git commit -m "feat: port Hero component to Next.js"
```

---

### Task 4: Port Problem, SectionIntro, and Pillar components

**Files:**
- Create: `components/problem.tsx`
- Create: `components/section-intro.tsx`
- Create: `components/pillar-section.tsx`
- Create: `components/pillars.tsx`

- [ ] **Step 1: Port Problem component**

Create `components/problem.tsx` as a client component (uses useScrollReveal). Direct port from `src/components/Problem.tsx`. Add `'use client'` directive. Update import path for hook to `@/hooks/use-scroll-reveal`.

- [ ] **Step 2: Extract SectionIntro component**

Create `components/section-intro.tsx` as a client component. Extract from the `SectionIntro` function currently inside `src/components/Pillars.tsx`. Add `'use client'` directive. Update hook import.

Update the heading to **"Four Steps to AI That Actually Knows You"** (was "Three Steps").

Update the supporting copy to:
```
Most people skip straight to the tools. But without self-knowledge, voice, and story,
every AI interaction starts from zero. This is the better way.
```

- [ ] **Step 3: Port PillarSection component**

Create `components/pillar-section.tsx` as a client component. Port the `PillarSection` function and all supporting components (`PillarImage`, fallback SVGs) from `src/components/Pillars.tsx`. Add `'use client'` directive. Update hook import.

- [ ] **Step 4: Create Pillars assembler with four steps**

Create `components/pillars.tsx`. This assembles the section intro and all four pillar sections. Update the PILLARS data array to four items in the correct order:

```typescript
const PILLARS = [
  {
    id: 'know-yourself',
    step: '01',
    title: 'Know Yourself',
    app: 'WeTheMe',
    url: 'https://we-the-me.vercel.app',
    image: '/pillars/compass.png',
    bg: 'dark' as const,
    description:
      'AI gives everyone the same generic answers because it doesn\u2019t know who you are. Your values, your priorities, how you think\u2009\u2014\u2009that\u2019s the foundation everything else is built on. Start there.',
    cta: 'Build Your Constitution',
  },
  {
    id: 'find-your-voice',
    step: '02',
    title: 'Find Your Voice',
    app: 'WriteLikeMe',
    url: 'https://writelikeme.coach',
    image: '/pillars/quill.png',
    bg: 'light' as const,
    description:
      'AI writes like AI until it learns to write like you. Your rhythms. Your instincts. Your tone. Capture your writing DNA so every word it produces sounds like it came from your hand.',
    cta: 'Capture Your Voice',
  },
  {
    id: 'mine-your-stories',
    step: '03',
    title: 'Mine Your Stories',
    app: 'StoryArchive',
    url: 'https://storyarchive.app',
    image: '/pillars/stories.png',
    bg: 'dark' as const,
    description:
      'Your experiences are the richest context you have\u2009\u2014\u2009and the one AI knows nothing about. The moments that shaped your thinking, the lessons you carry, the details that make you credible. Mine them.',
    cta: 'Collect Your Stories',
  },
  {
    id: 'set-up-your-ai',
    step: '04',
    title: 'Set Up Your AI',
    app: 'CustomizedAI',
    url: 'https://customizedai.app',
    image: '/pillars/starmap.png',
    bg: 'light' as const,
    description:
      'This is where foundation becomes function. Take your constitution, your voice, and your stories\u2009\u2014\u2009and generate custom instructions that make every AI tool actually know you. The real payoff.',
    cta: 'Configure Your AI',
  },
]
```

Note: StoryArchive step uses `image: '/pillars/stories.png'` — this image needs to be created. Add an SVG fallback for it (similar to existing compass/quill/starmap fallbacks). Also note CustomizedAI switches to `bg: 'light'` to maintain the dark/light/dark/light alternation.

- [ ] **Step 5: Add StoryArchive fallback SVG**

Add a `StoriesFallback` component in `pillar-section.tsx` — a book or journal motif:
```tsx
function StoriesFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Open book shape */}
      <path d="M100 40C80 45 50 50 30 55V160C50 155 80 150 100 145C120 150 150 155 170 160V55C150 50 120 45 100 40Z"
        fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      {/* Center spine */}
      <line x1="100" y1="40" x2="100" y2="145" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Page lines - left */}
      <line x1="50" y1="75" x2="90" y2="68" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <line x1="50" y1="90" x2="90" y2="83" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <line x1="50" y1="105" x2="90" y2="98" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <line x1="50" y1="120" x2="90" y2="113" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      {/* Page lines - right */}
      <line x1="110" y1="68" x2="150" y2="75" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <line x1="110" y1="83" x2="150" y2="90" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <line x1="110" y1="98" x2="150" y2="105" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <line x1="110" y1="113" x2="150" y2="120" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
    </svg>
  )
}
```

Register it in the FALLBACKS map as `'mine-your-stories': StoriesFallback`.

- [ ] **Step 6: Verify all four pillars render**

Update `app/page.tsx` to render Hero + Problem + Pillars. Check:
- Four steps show in correct order
- Dark/light alternation works
- Step numbers (01-04) display correctly
- StoryArchive fallback SVG renders (actual image TBD)
- CTAs link to correct app URLs

- [ ] **Step 7: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add components/problem.tsx components/section-intro.tsx components/pillar-section.tsx components/pillars.tsx
git commit -m "feat: port Problem and Pillars with four-step journey"
```

---

### Task 5: Port Horizon, Guide, and Footer

**Files:**
- Create: `components/horizon.tsx`
- Create: `components/guide.tsx`
- Create: `components/footer.tsx`

- [ ] **Step 1: Port Horizon component**

Create `components/horizon.tsx` as client component. Port from `src/components/Horizon.tsx`. Key changes:
- Add `'use client'` directive
- Update hook import to `@/hooks/use-scroll-reveal`
- Import `CompassRose` from `@/components/compass-rose` instead of inline definition
- Remove the inline `CompassRose` function (now shared)
- Update copy in the Horizon section to tease upcoming features:
  - Change "This is just the beginning." to "What's coming: your personal AI vault, curated updates as AI evolves, and live workshops to go deeper."
  - Keep email capture form functional structure

- [ ] **Step 2: Port Guide component**

Create `components/guide.tsx` as client component. Port from `src/components/Guide.tsx`. Key changes:
- Add `'use client'` directive
- Update hook import
- Remove TMC Digital Media from footer credit — Guide section bio should position Chad as the Rumo founder, not TMC founder. Update bio copy:
  - Change "the founder of TMC Digital Media" to something like "a writer, builder, and AI strategist based in Lisbon"
  - Keep the Possiblist identity
  - Keep the GenPoss quote
- Update social links: remove X (Chad uses Bluesky), consider adding Bluesky

- [ ] **Step 3: Port Footer component**

Create `components/footer.tsx`. Port from `src/components/Footer.tsx`. Key changes:
- Remove TMC Digital Media link from "Built by" credit — just "Built by Chad Stamm"
- Keep Buy Me a Coffee link
- Keep lucide-react Coffee icon import

- [ ] **Step 4: Assemble full page**

Update `app/page.tsx` to render all sections in order:
```tsx
import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Pillars } from '@/components/pillars'
import { Horizon } from '@/components/horizon'
import { Guide } from '@/components/guide'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Problem />
      <Pillars />
      <Horizon />
      <Guide />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 5: Full scroll-through verification**

Run dev server. Scroll through entire page and verify:
- Hero video plays, headline and logo render
- Problem section reveals on scroll
- Four pillars render in correct order with alternating backgrounds
- Horizon section renders with compass rose animation
- Guide section renders with photo (or fallback)
- Footer renders cleanly
- All external links work (app URLs, social links, buy me a coffee)
- No console errors

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add components/horizon.tsx components/guide.tsx components/footer.tsx app/page.tsx
git commit -m "feat: port Horizon, Guide, Footer — full page assembled"
```

---

### Task 6: Clean up Vite artifacts

**Files:**
- Delete: `src/` directory
- Delete: `index.html`
- Delete: `vite.config.ts`
- Delete: `postcss.config.js` (replaced by postcss.config.mjs)
- Delete: `tailwind.config.js` (replaced by tailwind.config.ts)
- Modify: `package.json` (remove vite dependencies)

- [ ] **Step 1: Remove Vite dependencies**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
npm uninstall @vitejs/plugin-react vite
```

- [ ] **Step 2: Delete old files**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
rm -rf src/ index.html vite.config.ts postcss.config.js tailwind.config.js tsconfig.tsbuildinfo
```

- [ ] **Step 3: Verify build still works**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add -A
git commit -m "chore: remove Vite artifacts, migration complete"
```

---

### Task 7: Update copy for "Find Your Direction" positioning

**Files:**
- Modify: `components/hero.tsx`
- Modify: `components/problem.tsx`
- Modify: `components/guide.tsx`

This task is copy-only — no structural changes.

- [ ] **Step 1: Refine Hero copy**

The current headline "AI Is Powerful. Direction Makes It Yours." is strong. Keep it or workshop with Chad. The subtext should reinforce the four-step journey:

Current: "Most people open AI and get generic answers. You deserve a starting point built around who you actually are."

Consider: "Most people open AI and hope for the best. Rumo gives you a starting point built around who you actually are."

- [ ] **Step 2: Refine Problem copy**

Current copy is strong. Add a bridge to the four-step plan at the end. After the final paragraph, consider adding:

"The good news: it takes four steps to fix it. And you can start right now."

- [ ] **Step 3: Refine Guide bio**

Update to position Chad as Rumo's creator, not TMC's founder:
- "Chad Stamm is a writer, creative director, and AI strategist living in Lisbon. He calls himself a Possiblist..."
- Emphasize the personal journey: built five AI tools for himself, now sharing the system
- Keep the GenPoss quote
- Update social links if needed

- [ ] **Step 4: Review full page copy flow**

Read through the entire page top to bottom. Check that the narrative flows:
Hero (hook) → Problem (pain) → Plan (solution) → Horizon (aspiration) → Guide (trust) → Footer

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add components/hero.tsx components/problem.tsx components/guide.tsx
git commit -m "copy: update positioning for Find Your Direction"
```

---

### Task 8: Add cross-links to standalone apps

**Files:**
- Modify: `~/Desktop/Claude Code Projects/we-the-me/` (1-2 files)
- Modify: `~/Desktop/Claude Code Projects/writelikeme/` (1-2 files)
- Modify: `~/Desktop/Claude Code Projects/story-archive/` (1-2 files)
- Modify: `~/Desktop/Claude Code Projects/mycustomai/` (1-2 files)

- [ ] **Step 1: Identify where to add cross-links in each app**

Each app needs two things:
1. A "Next Step" CTA visible after the user completes the tool (on the dashboard/results page)
2. A small "Part of the Rumo journey" link in the footer or nav

Read each app's dashboard/completion component and footer to find exact insertion points. The changes should be minimal — a small banner or link, not a redesign.

- [ ] **Step 2: Define the cross-link data**

```
WeTheMe → next: WriteLikeMe (writelikeme.coach) — "Next: Capture Your Voice"
WriteLikeMe → next: StoryArchive (storyarchive.app) — "Next: Mine Your Stories"
StoryArchive → next: CustomizedAI (customizedai.app) — "Next: Set Up Your AI"
CustomizedAI → next: Rumo (rumo URL) — "Back to Rumo — See What's Next"
All → Rumo link in footer
```

- [ ] **Step 3: Add cross-links to WeTheMe**

Add "Next: Capture Your Voice →" link on the dashboard page and a small Rumo footer link.

- [ ] **Step 4: Add cross-links to WriteLikeMe**

Same pattern — "Next: Mine Your Stories →" on dashboard, Rumo footer link.

- [ ] **Step 5: Add cross-links to StoryArchive**

Same pattern — "Next: Set Up Your AI →" on dashboard, Rumo footer link.

- [ ] **Step 6: Add cross-links to CustomizedAI**

"Back to Rumo — See What's Next →" on dashboard, Rumo footer link.

- [ ] **Step 7: Commit each app separately**

```bash
git -C ~/Desktop/Claude\ Code\ Projects/we-the-me add -A && git -C ~/Desktop/Claude\ Code\ Projects/we-the-me commit -m "feat: add Rumo cross-links"
git -C ~/Desktop/Claude\ Code\ Projects/writelikeme add -A && git -C ~/Desktop/Claude\ Code\ Projects/writelikeme commit -m "feat: add Rumo cross-links"
git -C ~/Desktop/Claude\ Code\ Projects/story-archive add -A && git -C ~/Desktop/Claude\ Code\ Projects/story-archive commit -m "feat: add Rumo cross-links"
git -C ~/Desktop/Claude\ Code\ Projects/mycustomai add -A && git -C ~/Desktop/Claude\ Code\ Projects/mycustomai commit -m "feat: add Rumo cross-links"
```

---

### Task 9: Deploy and verify

**Files:**
- Modify: `CLAUDE.md` (update project description)

- [ ] **Step 1: Push Rumo to GitHub**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo && git push origin main
```

Vercel auto-deploys from GitHub. Wait for build to complete.

- [ ] **Step 2: Verify production deployment**

Check the Vercel URL. Full scroll-through:
- Video loads and plays
- All four steps render correctly
- All app links work
- Guide photo loads
- No console errors
- Mobile responsive (check at 375px width)

- [ ] **Step 3: Push standalone app changes**

```bash
git -C ~/Desktop/Claude\ Code\ Projects/we-the-me push origin main
git -C ~/Desktop/Claude\ Code\ Projects/writelikeme push origin main
git -C ~/Desktop/Claude\ Code\ Projects/story-archive push origin main
git -C ~/Desktop/Claude\ Code\ Projects/mycustomai push origin main
```

- [ ] **Step 4: Verify cross-links on deployed apps**

Visit each app, complete a test flow, and verify the "Next Step" link appears and points to the right place.

- [ ] **Step 5: Update CLAUDE.md**

Update the Rumo project description to reflect the new state:
```markdown
# Rumo

Personal AI direction system. Phase 1: Next.js landing page with four-step journey connecting WeTheMe, WriteLikeMe, StoryArchive, and CustomizedAI.

## Tech Stack
- Next.js 16 / React / TypeScript / Tailwind CSS
- Deployed on Vercel

## Architecture
- Landing page hub that connects four standalone context apps
- Phase 2: accounts, vault, compass (AI updates)
- Phase 3: unified app (all tools under one roof)
```

- [ ] **Step 6: Commit and push**

```bash
cd ~/Desktop/Claude\ Code\ Projects/rumo
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Phase 1"
git push origin main
```
