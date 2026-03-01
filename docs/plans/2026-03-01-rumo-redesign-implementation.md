# Rumo Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild Rumo as a single-page cinematic brand home that ties together WeTheMe, WriteLikeMe, and CustomizedAI under a Portuguese maritime visual identity.

**Architecture:** Single-page React app with five scroll sections (Hero, Problem, Pillars, Horizon, Guide). Video hero background, scroll-triggered animations via Intersection Observer, Tailwind for styling with custom CSS properties for the design system. No backend, no state management — pure presentational.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, Lucide React, HTML5 video, Intersection Observer API

**Reference:** Design document at `docs/plans/2026-03-01-rumo-redesign-design.md`

**Skills to invoke during implementation:**
- `@frontend-design` — for building the page components
- `@story-brand` — for writing all copy
- `@nano-banana-pro` — for generating pillar illustrations

---

### Task 1: Project Cleanup & Configuration

Remove the old app code and configure the project for the new build.

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json`
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`
- Delete: `src/App.tsx` (will be recreated)
- Delete: `rough-app.tsx`

**Step 1: Update vite.config.ts**

Remove the GitHub Pages base path (deploying to Vercel now):

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Step 2: Update package.json**

Remove `homepage` and `gh-pages` references. Update scripts:

```json
{
  "name": "rumo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

Remove `gh-pages` from devDependencies.

**Step 3: Configure Tailwind with Rumo design system**

Update `tailwind.config.js` with the color palette, fonts, and animation utilities:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
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
```

**Step 4: Update index.css**

Replace with the new base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
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

**Step 5: Update index.html title and meta**

```html
<title>RUMO — Find Your Direction with AI</title>
<meta name="description" content="AI is powerful but generic. You need direction first. Build your personal AI foundation with Rumo." />
```

**Step 6: Delete old files**

```bash
rm src/App.tsx rough-app.tsx
```

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: clean up project for Rumo redesign"
```

---

### Task 2: Scroll Animation Hook

Build the reusable scroll-reveal hook before any sections.

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

**Step 1: Write the hook**

```ts
import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useScrollReveal.ts
git commit -m "feat: add useScrollReveal hook for scroll-triggered animations"
```

---

### Task 3: Section 1 — Hero with Video Background

The cinematic opening. Video background, overlay, headline, scroll CTA.

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Build the Hero component**

Use `@frontend-design` skill. Key requirements:
- Full viewport height (`min-h-screen`)
- `<video>` tag: `autoPlay`, `muted`, `loop`, `playsInline`, src=`/hero-bg.mp4`
- Dark gradient overlay (bottom-heavy for text legibility)
- Rumo compass logo top-left (SVG inline or from existing assets)
- Headline: large Source Serif 4, white text
- Subtext: DM Sans, slightly smaller, white with reduced opacity
- Scroll indicator at bottom (animated chevron or "Start Here" button)
- Copy to be written using `@story-brand` skill and Chad's writing codex

**Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with video background"
```

---

### Task 4: Section 2 — The Problem

The editorial bridge section.

**Files:**
- Create: `src/components/Problem.tsx`

**Step 1: Build the Problem component**

Use `@frontend-design` skill. Key requirements:
- Cream background (`bg-cream`), navy text
- Generous vertical padding (`py-24` or more)
- Max-width container, centered
- Large display heading + 3-4 sentence body copy
- Uses `useScrollReveal` for entrance animation
- Copy written using `@story-brand` skill — this is the "problem" section of the StoryBrand framework: AI is powerful but generic. The villain is generic AI that doesn't know you.

**Step 2: Commit**

```bash
git add src/components/Problem.tsx
git commit -m "feat: add Problem section"
```

---

### Task 5: Section 3 — The Three Pillars

The heart of the page. Three full-width pillar sections with alternating backgrounds.

**Files:**
- Create: `src/components/Pillars.tsx`

**Step 1: Generate pillar illustrations**

Use `@nano-banana-pro` skill to generate three illustrations:
1. **Know Yourself** — a nautical compass rose, stylized, warm ochre/gold tones on dark navy background
2. **Find Your Voice** — a quill pen with ink, maritime/vintage style, warm tones on cream background
3. **Set Up Your AI** — a star chart / constellation map, navigational style, warm tones on dark navy background

Save to `public/pillars/` directory.

**Step 2: Build the Pillars component**

Use `@frontend-design` skill. Key requirements:
- Three sub-sections, each full-width
- Alternating backgrounds: navy → cream → navy (or dark/light/dark)
- Each pillar: illustration on one side, text + CTA on the other (stacks on mobile)
- Pillar name ("Know Yourself"), app name ("WeTheMe"), description (2-3 sentences), and a bold CTA button linking to the app URL
- Each sub-section uses `useScrollReveal`
- Copy written using `@story-brand` skill — each pillar is a step in the plan the guide offers the hero
- CTAs should use ochre/gold for warmth and urgency

Pillar data:

```ts
const PILLARS = [
  {
    id: 'know-yourself',
    title: 'Know Yourself',
    app: 'WeTheMe',
    url: 'https://we-the-me.vercel.app',
    image: '/pillars/compass.png',
  },
  {
    id: 'find-your-voice',
    title: 'Find Your Voice',
    app: 'WriteLikeMe',
    url: 'https://writelikeme.coach',
    image: '/pillars/quill.png',
  },
  {
    id: 'set-up-your-ai',
    title: 'Set Up Your AI',
    app: 'CustomizedAI',
    url: 'https://customizedai.app',
    image: '/pillars/starmap.png',
  },
];
```

**Step 3: Commit**

```bash
git add public/pillars/ src/components/Pillars.tsx
git commit -m "feat: add Three Pillars section with illustrations"
```

---

### Task 6: Section 4 — The Horizon

Aspirational section with email capture placeholder.

**Files:**
- Create: `src/components/Horizon.tsx`

**Step 1: Build the Horizon component**

Use `@frontend-design` skill. Key requirements:
- Dark navy background with a subtle gradient or image overlay
- Could reuse the hero video or a still frame as a subtle background element
- Short aspirational copy: "Once you have your foundation, the horizon opens."
- Email capture: simple input + button (non-functional for v1 — just the UI). Style note: "The journey is just beginning."
- Uses `useScrollReveal`
- Copy written using `@story-brand` skill — this is the "success" section: what life looks like after the plan works

**Step 2: Commit**

```bash
git add src/components/Horizon.tsx
git commit -m "feat: add Horizon section"
```

---

### Task 7: Section 5 — The Guide

Chad Stamm section.

**Files:**
- Create: `src/components/Guide.tsx`

**Step 1: Build the Guide component**

Use `@frontend-design` skill. Key requirements:
- Cream background, clean and personal
- Short bio (3-4 sentences) in Chad's voice — Possiblist identity, Lisbon, builder, translator of complexity
- Links to chadstamm.com, Substack, social (use Lucide icons)
- Optional photo placeholder (can add later)
- Uses `useScrollReveal`
- Copy written using `@story-brand` skill — Chad is the guide, not the hero

**Step 2: Commit**

```bash
git add src/components/Guide.tsx
git commit -m "feat: add Guide section"
```

---

### Task 8: Footer

Minimal footer.

**Files:**
- Create: `src/components/Footer.tsx`

**Step 1: Build the Footer component**

- Navy background, cream text
- Copyright line: "&copy; 2026 Rumo"
- "Built by Chad Stamm & TMC Digital Media" with links
- Donate link (buymeacoffee.com/chadn)
- Keep it minimal — 2-3 lines max

**Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer"
```

---

### Task 9: Assemble App.tsx & Main Entry

Wire everything together.

**Files:**
- Create: `src/App.tsx`
- Modify: `src/main.tsx` (if needed)

**Step 1: Create App.tsx**

```tsx
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Pillars } from './components/Pillars';
import { Horizon } from './components/Horizon';
import { Guide } from './components/Guide';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Problem />
      <Pillars />
      <Horizon />
      <Guide />
      <Footer />
    </div>
  );
}
```

**Step 2: Verify main.tsx imports correctly**

Should import App and render to `#root`. Update if needed.

**Step 3: Run dev server and verify**

```bash
npm run dev
```

Walk through the full page: hero video plays, sections scroll-reveal, links work, responsive on mobile.

**Step 4: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: assemble all sections into App"
```

---

### Task 10: Deploy to Vercel

Move from GitHub Pages to Vercel.

**Files:**
- Modify: `package.json` (remove deploy script if not already)

**Step 1: Build and verify locally**

```bash
npm run build
npm run preview
```

Verify everything works in production build — especially the video path.

**Step 2: Deploy to Vercel**

```bash
npx vercel --prod --yes
```

If not linked yet, Vercel CLI will prompt for project setup. Link to chad-stamms-projects.

**Step 3: Verify live site**

Open the deployed URL. Check:
- Video plays on desktop and mobile
- All sections render
- Links to WeTheMe, WriteLikeMe, CustomizedAI work
- Scroll animations fire
- Typography and colors match design

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "chore: deploy to Vercel"
```

---

### Task 11: Polish & Review

Final pass with code review agent.

**Step 1: Full responsive check**

Test at 375px (mobile), 768px (tablet), 1440px (desktop). Fix any layout breaks.

**Step 2: Performance check**

- Video should not block page load (lazy-load or poster image)
- Images optimized
- Lighthouse score check

**Step 3: Invoke code review**

Use `@superpowers:requesting-code-review` to review the full implementation against the design doc.

**Step 4: Final commit and deploy**

```bash
git add -A
git commit -m "polish: responsive fixes and performance improvements"
npx vercel --prod --yes
```
