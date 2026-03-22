# Rumo — Find Your Direction

A personal AI foundation system. One journey, three sections, four documents that know you.

Rumo consolidates the functionality of four standalone apps (WeTheMe, WriteLikeMe, StoryArchive, CustomizedAI) into a unified experience under a single brand.

## Tech Stack
- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 (CSS-first config in `globals.css`)
- Supabase (auth + Postgres) — magic link sign-in
- Framer Motion for animations
- Deployed on Vercel
- Domain: withrumo.com (purchased, needs Vercel connection)

## Architecture

### Landing Page (`/`)
- Hero (video bg, teal logo), Problem, How It Works (3 sections + 4 outputs), Horizon, Guide, Footer
- No separate app sections — unified product positioning

### The Path (`/start`)
- Three-section wizard: Shared Intake (7q) → Identity (10q) → Voice (12q) → Stories (9q) = 38 questions
- All documents generated AFTER Section 3 completion (not mid-journey)
- Auth deferred — users start answering immediately, sign-in required to save
- State managed via `WizardProvider` context + localStorage (Supabase persistence when auth added)
- Questions in `data/questions.ts`, types in `types/wizard.ts`

### The Vault (`/vault`)
- Not yet built. Will show all generated documents with view/copy/download/regenerate.

### Instructions (`/instructions`)
- Not yet built. CustomizedAI port — dynamic AI-generated questions, multi-model output.

## Key Files
| Path | Purpose |
|------|---------|
| `data/questions.ts` | 38 curated questions, section helpers |
| `types/wizard.ts` | WizardQuestion, WizardState, Section types |
| `context/wizard-context.tsx` | WizardProvider, useWizard hook, reducer |
| `components/wizard/` | WizardShell, QuestionStep, ProgressBar, SectionTransition, WizardComplete |
| `components/pillars.tsx` | Landing page journey overview (was 4-app pillars, now unified) |
| `components/hero.tsx` | Video hero with teal logo |
| `app/globals.css` | Tailwind v4 theme: navy, ochre, teal, cream, muted |

## Design System
| Token | Hex | Usage |
|-------|-----|-------|
| navy | `#1a2744` | Primary text, dark backgrounds |
| ochre | `#c4943a` | Brand accent, labels |
| teal | `#1ebeb1` | Action/go color — CTAs, links, progress |
| teal-light | `#3ed4c8` | Hover states |
| cream | `#faf6f1` | Page backgrounds |
| muted | `#8a7e6b` | Secondary text |

**Fonts:** Impact (display), Open Sans (body)

## Conventions
- Components in `components/`, no `src/` directory
- `useScrollReveal` hook for scroll-triggered animations
- CompassRose SVG component used across sections
- Teal for interactive elements, ochre for brand/identity elements
- Build with `npm run build`, dev with `npm run dev`

## Hub Access
This project is managed from the Vasco hub at `~/Desktop/Claude Code Projects/vasco/`. Vasco is Chad's AI partner with full context on all projects, priorities, and identity.

## Owner
Chad Stamm (chad@chadstamm.com) — GitHub: chadstamm/rumo
