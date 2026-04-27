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
- Domain: withrumo.com (live, connected to Vercel)

## Environment Variables
| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `ANTHROPIC_API_KEY` | Yes | On Vercel (Production). Added Mar 28, 2026. |

## Architecture

### Landing Page (`/`)
Hero → Problem → Overview ("The Missing Ingredient") → How It Works (4 steps) → Instructions Wizard → Footer

### The Full Build (`/start`) — paywalled
- 81 curated questions across 7 sections covering identity, voice, stories, situation, timeline, and roster (exact per-section counts pending v2 audit reconciliation — see `docs/v2-scoping.md`)
- Produces raw material for all 6 context anchors, generated sequentially after completion
- **Pay-first paywall.** Server component (`app/start/page.tsx`) checks subscription. Unsubscribed users see marketing page (`app/start/chart-your-course-client.tsx`) with gold CTAs that fire `/api/stripe/checkout`. Subscribed users mount `<DocumentWizard config={FULL_BUILD_CONFIG} />` directly. Constitution-only free path stays at `/anchors/constitution`.
- State: `WizardProvider` context + useReducer + localStorage. Storage key `chart-your-course` isolates state from per-anchor wizards.

### Per-Anchor Paywall (`/anchors/[slug]`)
- Server component does subscription check before rendering
- Free anchor: `constitution` (renders wizard directly)
- Paid anchors: `codex`, `story-bank`, `sotu`, `timeline`, `roster` — unsubscribed users see `<AnchorPaywall>` with Stripe CTA
- Same gating pattern as `/start` (the canonical reference)

### Individual Anchor Builders (`/anchors/[slug]`)
- Each anchor can be built standalone via its own scoped wizard
- Uses same WizardProvider with `filterSections` and `storageKey` per anchor
- Shared Intake (section 0) always included as foundation
- Each has its own localStorage persistence and completion screen
- Routes: `/anchors/constitution`, `/anchors/sotu`, `/anchors/codex`, `/anchors/story-bank`, `/anchors/timeline`, `/anchors/roster`
- Old `/docs/*` URLs permanently redirect to `/anchors/*`

### Subscription & Account Model
- **Two tiers:** Free (Constitution only, lead-gate at end captures email) vs. Paid ($49/yr unlocks all 6 anchors + vault + Chart Your Course)
- **Stripe:** Checkout at `/api/stripe/checkout/route.ts` (creates session via `lib/stripe.ts`), webhook at `/api/stripe/webhook/route.ts` (handles `checkout.session.completed`, `customer.subscription.{updated,deleted}`, `invoice.payment_failed`). Both webhook + `/success/page.tsx` capture customer name from `customer_details.name` (split on first space, only fills empty fields).
- **`profiles.subscription_status`:** `'free'` / `'active'` / `'expired'` / `'refunded'` / `'past_due'` — gates feature access
- **`profiles.account_type`:** `'standard'` / `'comp'` / `'lifetime'` — for reporting and intent (paying vs. complimentary vs. one-time/founder). Default `'standard'`. Distinct from subscription status.
- **Comp accounts:** `scripts/comp-account.mjs <email>` — creates Supabase user if missing, sets `subscription_status='active'` + `account_type='comp'`, sends magic link. Run with `node --env-file=.env.local scripts/comp-account.mjs <email>`. Used for family, beta testers, gifted access.
- **Schema source of truth:** `lib/supabase/schema.sql` (idempotent, run in Supabase SQL Editor on changes)

### Instructions Wizard (embedded on homepage + `/instructions`)
- CustomizedAI port — dynamic AI-generated questions, multi-model output
- Steps: Intro → Model Selection → Foundation Upload → AI Questions → Generate → Results
- State: `InstructionsProvider` context + useReducer + localStorage
- API routes call Anthropic directly with streaming (`maxDuration = 300`)
- Model hardcoded to `claude-opus-4-6` in API routes

### The Vault (`/vault`)
- Per-anchor cards showing build state, version, answer count, generation date
- Per-anchor actions when built: **Edit** (manual textarea), **Refine with AI** (instruction-based AI revision via `/api/revise-anchor`), **Regenerate** (returns to wizard at `/anchors/[slug]`)
- Per-anchor utility: Copy, Download (.md), Delete, Upload (.md/.txt to seed)
- Edit and Refine are mutually exclusive — opening one closes the other
- Free / locked states for unbuilt anchors based on subscription
- Storage: localStorage for guests, Supabase for authed (auto-migrates on sign-in via `migrateLocalToSupabase` in `lib/vault-storage.ts`)
- See `docs/v2-scoping.md` section 4a for vault redesign direction (post-launch)

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
| `app/api/generate-anchor/route.ts` | Streaming anchor doc generation (Anthropic SDK, opus-4-6, max_tokens=32000) |
| `app/api/revise-anchor/route.ts` | Streaming "Refine with AI" rewrites |
| `app/api/stripe/checkout/route.ts` | Stripe Checkout Session creation (subscription mode) |
| `app/api/stripe/webhook/route.ts` | Stripe webhook handler — subscription state + name capture |
| `app/start/page.tsx` | Server-side paywall check; routes to wizard or marketing |
| `app/start/chart-your-course-client.tsx` | Marketing page for unsubscribed visitors |
| `app/start/full-build-config.ts` | Chart Your Course wizard config (shared) |
| `app/anchors/[slug]/page.tsx` | Per-anchor paywall + wizard mount |
| `app/vault/page.tsx` | Vault dashboard — Edit / Refine / Regenerate / Copy / Download / Delete / Upload |
| `app/success/page.tsx` | Post-checkout celebration + guest provisioning |
| `components/anchor-paywall.tsx` | Locked-anchor teaser w/ Stripe CTA |
| `components/upgrade-button.tsx` | Stripe checkout trigger (handles loading + already-subscribed redirect) |
| `components/auth-provider.tsx` | Auth context, subscription state, localStorage→Supabase migration |
| `components/wizard/document-wizard.tsx` | Anchor wizard shell, hero, completion + FullBuildComplete |
| `lib/vault-storage.ts` | Vault doc CRUD (localStorage + Supabase, with migration on sign-in) |
| `lib/supabase/service.ts` | Service-role client (bypasses RLS, server-only) |
| `lib/supabase/ensure-user.ts` | Look up or create Supabase user by email |
| `lib/supabase/send-magic-link.ts` | Magic link helper (used by /success + comp script) |
| `lib/supabase/schema.sql` | Schema source of truth (idempotent) |
| `scripts/comp-account.mjs` | Provision a comp account by email |

## Design System
| Token | Hex | Usage |
|-------|-----|-------|
| navy | `#0c2340` | Primary text, dark backgrounds |
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

## Audit Status
Last targeted update: 2026-04-27 (paywall + comp + name capture + vault edit). Sections that may still be stale and need a fuller audit before launch:
- Per-section question counts in `data/questions.ts` (CLAUDE.md says 68 across 7 sections; chart-your-course total is 81; v2 audit references 77)
- "Known Issues" list — some may be resolved, others new
- Tech stack version pins
- Architecture diagrams of any per-anchor question deltas
