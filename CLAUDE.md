# Rumo — Find Your Direction

An AI navigation system. Rumo helps people get started with AI by mining their personal context — identity, voice, stories, and current situation — then assembling it into documents and custom instructions that make every AI platform work better.

Consolidates four standalone apps (WeTheMe, WriteLikeMe, StoryArchive, CustomizedAI) into a unified experience.

## Tech Stack
- Next.js 16 (App Router) / React 19 / TypeScript (strict mode)
- Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`)
- Supabase (auth + Postgres) — magic link sign-in
- Anthropic SDK (`@anthropic-ai/sdk`) — direct, not Vercel AI SDK
- Framer Motion for page transitions, vanilla IntersectionObserver for scroll reveals
- Custom nautical SVG icons (`components/icons/anchor-icons.tsx`), Lucide React for misc, mammoth + pdf-parse for file uploads
- Deployed on Vercel (Turbopack dev) — auto-deploys on push to main
- Vercel project: `rumo` (linked via `.vercel/project.json`)
- GitHub: `chadstamm/rumo` (origin remote configured)
- Domain: withrumo.com (purchased, needs Vercel domain connection)

## Environment Variables
| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `ANTHROPIC_API_KEY` | Yes | **MISSING ON VERCEL** — instructions wizard fails without it |

## Architecture

### Landing Page (`/`)
Hero → Problem → Overview ("The Missing Ingredient") → How It Works (4 steps) → Instructions Wizard → Footer

### The Full Build (`/start`)
- 68 curated questions across 7 sections: Shared Intake (7q) → Identity (10q) → Situation (10q) → Voice (12q) → Stories (9q) → Timeline (10q) → Roster (10q)
- Produces raw material for all 6 context anchors
- All documents generated AFTER completion (not mid-journey)
- Auth deferred — users start immediately, sign-in required to save
- State: `WizardProvider` context + useReducer + localStorage

### Individual Anchor Builders (`/anchors/[slug]`)
- Each anchor can be built standalone via its own scoped wizard
- Uses same WizardProvider with `filterSections` and `storageKey` per anchor
- Shared Intake (section 0) always included as foundation
- Each has its own localStorage persistence and completion screen
- Routes: `/anchors/constitution`, `/anchors/sotu`, `/anchors/codex`, `/anchors/story-bank`, `/anchors/timeline`, `/anchors/roster`
- Old `/docs/*` URLs permanently redirect to `/anchors/*`

### Instructions Wizard (embedded on homepage + `/instructions`)
- CustomizedAI port — dynamic AI-generated questions, multi-model output
- Steps: Intro → Model Selection → Foundation Upload → AI Questions → Generate → Results
- State: `InstructionsProvider` context + useReducer + localStorage
- API routes call Anthropic directly with streaming (`maxDuration = 300`)
- Model hardcoded to `claude-opus-4-6` in API routes

### The Vault (`/vault`)
- Shows saved custom instructions (from instructions wizard) with per-field copy
- Lists all 6 context anchors with links to builders (currently "Coming Soon — Pro" for generated docs)
- Will eventually show generated anchor documents with view/copy/download/regenerate

## Key Files
| Path | Purpose |
|------|---------|
| `data/questions.ts` | 68 curated questions (7 sections), section helpers |
| `data/models.ts` | AI model definitions and field mappings |
| `types/wizard.ts` | WizardQuestion, WizardState, Section types + constants |
| `types/instructions.ts` | Instructions wizard types |
| `types/models.ts` | AI model types |
| `context/wizard-context.tsx` | WizardProvider, useWizard hook, reducer |
| `context/instructions-context.tsx` | InstructionsProvider, useInstructions hook, reducer |
| `components/wizard/` | Path wizard components (kebab-case filenames) |
| `components/instructions/` | Instructions wizard components (PascalCase filenames) |
| `components/icons/anchor-icons.tsx` | Shared nautical SVG icons (large + small) for all 6 anchors |
| `components/pillars.tsx` | "How It Works" — 6 steps with shared nautical icons |
| `components/overview.tsx` | "The Missing Ingredient" — interactive anchor carousel |
| `components/hero.tsx` | Video hero with teal logo |
| `app/globals.css` | Tailwind v4 `@theme` tokens + CSS component classes |
| `proxy.ts` | Next.js 16 proxy — delegates to Supabase middleware |
| `lib/supabase/` | Supabase client (browser), server, middleware, schema |
| `app/api/generate/route.ts` | Streaming instruction generation (Anthropic SDK) |
| `app/api/next-question/route.ts` | Dynamic AI question generation |
| `app/api/analyze-answer/route.ts` | Answer analysis for insight extraction |
| `app/api/parse-file/route.ts` | Server-side file parsing (PDF, DOCX) |

## Design System
| Token | Hex | Usage |
|-------|-----|-------|
| navy | `#1a2744` | Primary text, dark backgrounds |
| ochre | `#c4943a` | Brand accent, labels, section eyebrows |
| teal | `#1ebeb1` | Directional/structural only — CTAs, buttons, links, progress bars, lines |
| teal-light | `#3ed4c8` | Hover states |
| cream | `#faf6f1` | Page backgrounds |
| muted | `#8a7e6b` | Secondary text |

**Fonts:** Impact (display/headings), Open Sans (body)

**Color rules:**
- Teal = interactive/directional (buttons, links, progress). NOT for section headers or labels.
- Ochre = brand identity (eyebrows, accents, separators, anchor labels)
- Navy = structure (backgrounds, text, cards)

## Code Patterns

### Styling
- Design tokens defined via `@theme` in `globals.css` (Tailwind v4 pattern)
- `:root` CSS variables also exist for CSS component classes — intentional dual layer
- CSS component classes (`.btn-primary`, `.textarea-clean`, etc.) in `globals.css`
- Most components use inline Tailwind utilities; CSS classes for reusable patterns
- Prefer Tailwind utilities for new components

### State Management
- Context + useReducer pattern for both wizards
- localStorage hydration on mount, persist on state change
- Keys prefixed: `rumo-wizard-*`, `rumo-instructions-*`
- Custom hook (`useWizard`, `useInstructions`) throws if used outside provider

### Animations
- `useScrollReveal` hook (IntersectionObserver + `.reveal`/`.visible` CSS classes) for landing page sections
- Framer Motion `AnimatePresence` for wizard step transitions
- CSS `@keyframes` for hero animations

### Path Alias
- `@/*` maps to project root (no `src/` directory)

### File Naming
- Landing page components: kebab-case (`hero.tsx`, `pillars.tsx`)
- Wizard components: kebab-case (`question-step.tsx`)
- Instructions components: PascalCase (`ResultsStep.tsx`) — inconsistent, inherited from port

## Known Issues
- **ANTHROPIC_API_KEY missing on Vercel** — instructions wizard fails in production
- **Dead components** — `guide.tsx`, `horizon.tsx`, `pillar-section.tsx`, `section-intro.tsx` are unused (removed from page, files remain)
- **No tests, no ESLint, no Prettier** — no quality tooling configured
- **No `.env.example`** — env vars undocumented outside this file
- **No error boundaries** — React errors crash the whole page
- **Duplicate Supabase client creation** in AuthProvider and signOut

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- No lint or test scripts

## Hub Access
This project is managed from the Vasco hub at `~/Desktop/Claude Code Projects/vasco/`. Vasco is Chad's AI partner with full context on all projects, priorities, and identity.

## Owner
Chad Stamm (chad@chadstamm.com) — GitHub: chadstamm/rumo
