# Rumo Unification Design Spec

**Date:** 2026-03-21
**Status:** Draft
**Author:** Chad Stamm + Vasco

---

## Overview

Rumo is a system that helps professionals find their direction with AI. It consolidates four standalone apps (WeTheMe, WriteLikeMe, StoryArchive, CustomizedAI) into a single branded platform with a continuous journey, shared data layer, and persistent vault.

The standalone apps remain live at their original URLs with their original branding. Rumo duplicates the core functionality under unified Rumo branding, with database-backed persistence and a designed journey that builds on itself.

---

## Architecture

### High-Level Structure

```
withrumo.com
/                    Landing page (existing, enhanced)
/start               The Path -- three-section wizard
    Section 1        Identity
    Section 2        Voice
    Section 3        Stories
                     --> All documents generated after Section 3 completion
/instructions        Custom AI Instructions tool (separate flow)
/vault               Dashboard -- all generated documents
/auth                Sign-in / sign-up
/privacy             Privacy policy
```

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | Already in use for Rumo landing page |
| Styling | Tailwind v4 | Matches the four source apps; Rumo needs upgrade from v3 |
| Auth | Supabase Auth | Magic links + social login, same stack as database |
| Database | Supabase Postgres | Relational, row-level security, generous free tier |
| AI | Anthropic Claude (via @anthropic-ai/sdk) | Proven across all four apps |
| Animations | Framer Motion | Consistent with source apps |
| Hosting | Vercel | Already deployed |
| Domain | withrumo.com | Purchased 2026-03-21 |

### React / State Architecture

- One shared `RumoContext` wrapping the entire app -- holds user session, vault state, and cross-section data
- Per-section wizard contexts that read from and write to the shared context
- Supabase handles persistence; localStorage used only as offline fallback
- Streaming generation pattern carried over from source apps (ReadableStream + batched dispatch)

---

## Branding

### Visual Identity

All four tools adopt the Rumo brand. No per-tool accent colors.

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#1a2744` | Primary text, hero backgrounds |
| `--ochre` | `#c4943a` | Accent, CTAs, compass rose |
| `--ochre-light` | `#d4a94e` | Hover states, highlights |
| `--cream` | `#faf6f1` | Page backgrounds |
| `--muted` | `#8a7e6b` | Secondary text |
| `--white` | `#ffffff` | Cards, inputs |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display / headings | Source Serif 4 | 600, 700 |
| Body / UI | DM Sans | 400, 500, 600 |

### Iconography

- Compass rose SVG as primary brand mark (already built)
- Section indicators use nautical metaphors where natural, not forced

### Tone

The landing page is aspirational. The wizard is warm and conversational. The vault is clean and functional. No corporate voice. Rumo talks like a guide, not an app.

---

## The Path -- Three-Section Wizard (`/start`)

### Journey Design

One continuous flow with three clearly labeled sections. All documents are generated together after the user completes all three sections. This ensures every generation prompt has the full context -- identity, voice, and stories all inform each document.

Users can save progress and resume at any point. Progress is persisted to Supabase.

```
Section 1: Identity          Section 2: Voice           Section 3: Stories
"Who you are"                "How you write"            "What you've lived"
  Shared intake                Section-specific Qs        Section-specific Qs
  (name, background,          (writing patterns,         (trigger prompts,
   values, beliefs)             preferences, style)        lived experiences)
  Identity questions           Writing samples            Story prompts
                               (upload/paste/URL)
                                                         |
                                                         v
                                                    ALL DOCS GENERATED
                                                    - Constitution
                                                    - State of the Union
                                                    - Writing Codex
                                                    - Story Bank
```

### Generation: All at Once

Documents are NOT generated mid-journey. After the user completes Section 3, all four documents (Personal Constitution, State of the Union, Writing Codex, Story Bank) are generated in a single pass. Every generation prompt receives the complete answer set from all three sections.

This produces the best possible output -- identity context enriches the codex, stories reveal voice patterns, writing samples surface values.

The generation sequence streams each document one at a time so the user can watch them appear: Constitution first, then SOTU, then Codex, then Story Bank.

### Save and Resume

Since generation happens at the end, the save-and-resume experience is critical:

- **During the wizard:** Persistent messaging near the progress bar: "Your progress is saved automatically. Come back anytime."
- **On return to Rumo:** The vault shows journey status: "The Path -- Section 1 complete, Section 2 in progress (Question 3 of 11)" with a clear "Continue" button.
- **State persistence:** Every answer is saved to Supabase immediately. No risk of lost work.
- **Session awareness:** If a user closes mid-question, they return to that exact question.

### Shared Context Layer

Collected once in Section 1, available to all generation prompts:
- First name, last name
- Professional background
- Core values and beliefs
- Life stage / situation
- Communication preferences

These answers are tagged as `shared` in the database and passed to all generation prompts.

### Section-Specific Questions

Each section asks only what's unique to its output:

**Section 1 (Identity):** Values conflicts, fears, aspirations, decision-making patterns, relationships to work/family/growth. Sources: WeTheMe question set.

**Section 2 (Voice):** Writing habits, tone preferences, content types, vocabulary tendencies. Plus writing sample uploads (text, file, or URL extraction). Sources: WriteLikeMe question set.

**Section 3 (Stories):** Trigger prompts for personal narratives, turning points, signature phrases, recurring themes. Sources: StoryArchive question set.

### Cross-Section Data Flow

All answers feed all generation prompts, even though questions are organized by section.

| Data | Primary output | Also informs |
|------|---------------|-------------|
| Identity answers | Constitution, SOTU | Codex (personality context), Story Bank (thematic patterns) |
| Voice answers + samples | Codex | Constitution (communication style), Story Bank (narrative voice) |
| Story answers | Story Bank | Constitution (lived values), Codex (narrative patterns) |

### Question Deduplication

Before building, all three question files must be:
1. Exported and laid side-by-side
2. Deduplicated -- any question asked in two apps becomes a shared or single-section question
3. Reordered for the unified flow
4. Reduced -- target ~35-45 total questions across all three sections (vs potentially 60+ across standalone apps)

This is a separate task that requires reading all three `questions.ts` files and mapping overlaps.

### Progress Indicator

Solves user feedback about signposting:
- "Section 1 of 3: Identity -- Question 4 of 14"
- Visual progress bar showing overall journey completion
- Section labels visible so users know what's ahead

### Background Analysis

Carried over from source apps: each answer is analyzed in the background via `/api/analyze-answer`. Analyzed insights are stored and passed to generation prompts for richer output.

WriteLikeMe's `/api/analyze-sample` pattern also carried over for writing samples in Section 2.

### Voice Input

The `useVoiceInput` hook is included in Rumo v1. Available on all question steps. Particularly valuable for story prompts in Section 3 where spoken narrative is more natural than typed.

---

## State of the Union -- The Living Document

The SOTU is generated alongside the Personal Constitution as a mandatory companion document. It captures where the user is *right now* -- their current situation, active challenges, immediate priorities.

### Positioning

The SOTU is explicitly framed as a living document:
- "Your constitution is who you are always. Your State of the Union is where you are right now."
- "Life changes. Your SOTU should change with it. Update it as your situation evolves."
- This creates a natural reason to return to Rumo -- and a natural subscription hook: "Keep your SOTU current. Regenerate anytime with a Rumo subscription."

### Regeneration

Users can regenerate their SOTU without re-answering the full questionnaire. A short "SOTU update" flow asks targeted questions about what's changed since the last version. Previous answers are pre-loaded for context.

---

## Custom AI Instructions (`/instructions`)

### Separate Tool, Same Brand

CustomizedAI becomes `/instructions` on Rumo. It's architecturally separate from The Path -- its own wizard with its own flow.

**Key differences from The Path:**
- Questions are AI-generated dynamically (via `/api/next-question`), not static
- Multi-model selection (ChatGPT, Claude, Gemini, Perplexity)
- Output is structured JSON per model, not a prose document
- Foundation step allows optional upload of vault documents (constitution, codex, story bank)

### Integration with The Path

If a user has completed The Path, their vault documents are automatically available as foundation inputs for the instructions generator. This is the conversion hook -- instructions generated *with* personal context are dramatically better than without.

The UI surfaces this: "You have a Personal Constitution and Writing Codex in your vault. We'll use these to create more personalized instructions." vs. "Complete The Path to unlock deeper personalization."

### Changes from Standalone CustomizedAI

- Rebranded to Rumo visual identity
- Foundation step auto-populates from vault (if docs exist)
- Results saved to vault (standalone app doesn't persist results)
- Otherwise functionally identical -- same dynamic questions, same model selection, same generation

---

## The Vault (`/vault`)

### Purpose

Persistent dashboard where all generated documents live. The single place to view, copy, download, print, and regenerate any output.

### Document Types

| Document | Source | Format |
|----------|--------|--------|
| Personal Constitution | The Path | Markdown prose |
| State of the Union | The Path | Markdown prose (living document) |
| Writing Codex | The Path | Markdown prose |
| Story Bank | The Path | Markdown prose |
| Custom AI Instructions | /instructions | Structured JSON per model |

### Journey Status

The vault prominently shows where the user is in their journey:
- **Not started:** "Begin The Path" CTA
- **In progress:** "The Path -- Section 2 in progress (Question 3 of 11). Continue."
- **Complete:** All documents displayed with view/copy/download/regenerate options

### Vault Features

- View any completed document with markdown rendering
- Copy to clipboard / download as .md / print (Save as PDF)
- **Revise** -- re-enter the wizard with existing answers pre-loaded, answer what to change
- **Regenerate** -- re-run generation with existing answers (no re-answering)
- **SOTU Update** -- short targeted flow for refreshing the State of the Union
- Timestamps: created, last updated
- Journey progress indicator: which sections are complete, what's next

### Future Vault Features (not in v1)

- Version history (track how documents evolve)
- Sharing (public link to a document)
- Export all (zip of everything)
- AI-powered "What's changed since your last update?" nudge

---

## Database Schema

### Tables

```sql
-- Users (extended from Supabase auth.users)
profiles
  id              uuid (FK -> auth.users)
  first_name      text
  last_name       text
  created_at      timestamptz
  updated_at      timestamptz

-- Wizard progress
wizard_state
  id              uuid (PK)
  user_id         uuid (FK -> profiles)
  current_section int (1-3)
  current_step    int
  answers         jsonb
  analyzed_insights jsonb
  writing_samples jsonb
  completed_sections int[] (e.g., [1, 2])
  updated_at      timestamptz

-- Generated documents
documents
  id              uuid (PK)
  user_id         uuid (FK -> profiles)
  type            text ('constitution' | 'sotu' | 'codex' | 'story_bank' | 'instructions')
  content         text (markdown or JSON)
  version         int (default 1, increment on regeneration)
  created_at      timestamptz
  updated_at      timestamptz

-- Custom instructions (model-specific)
instruction_results
  id              uuid (PK)
  user_id         uuid (FK -> profiles)
  document_id     uuid (FK -> documents)
  model           text ('chatgpt' | 'claude' | 'gemini' | 'perplexity')
  result          jsonb (model-specific fields)
  created_at      timestamptz
```

### Row-Level Security

All tables enforce `user_id = auth.uid()` -- users can only read/write their own data.

---

## Auth Flow

### Sign-Up / Sign-In

- Magic link email (primary)
- Google OAuth (secondary, add later)
- No passwords

### When Auth Is Required

Users can view the landing page and start the wizard without signing in. Auth is required when:
- They want to save their progress
- They access the vault
- They return and want to resume

This means the first few questions are frictionless. The "create account" prompt comes at the natural save point, when the user has already invested effort and wants to keep their work.

---

## Monetization (Open Decision)

Two models under consideration. Architecture supports both. Decision deferred until product has demand signal.

### Option A: Free Instructions, Paid Path

- `/instructions` is free (with or without vault doc uploads)
- The Path (three-section wizard) requires a subscription
- Conversion hook: free instructions are generic; paid instructions built on vault context are dramatically better

### Option B: Free First Run, Paid Vault

- Complete The Path once for free
- Vault persistence, regeneration, revisions, and ongoing access require a subscription
- Conversion hook: you've seen the value, now keep and evolve it
- SOTU as living document reinforces ongoing subscription value

### Payment Stack (when ready)

- Stripe via Vercel Marketplace
- Subscription tiers TBD
- Not in v1 -- build the product first, add payments when there's demand signal

---

## Migration Plan (High Level)

### Phase 1: Foundation

1. Upgrade Rumo to Tailwind v4 + React 19
2. Set up Supabase project (auth + database)
3. Create database schema and RLS policies
4. Build auth flow (magic link)
5. Build shared layout with Rumo branding (nav, footer, compass rose)

### Phase 2: The Path

6. Question deduplication and curation across three apps
7. Build shared context layer and wizard architecture
8. Port Section 1 (Identity) -- questions, analysis
9. Port Section 2 (Voice) -- questions, samples, analysis
10. Port Section 3 (Stories) -- questions, analysis
11. Build generation flow (all four docs generated after Section 3)
12. Build vault dashboard

### Phase 3: Instructions

13. Port CustomizedAI as `/instructions`
14. Wire vault integration (auto-populate foundation docs)
15. Save instruction results to database

### Phase 4: Polish and Deploy

16. Landing page updates (reflect the full product, not just marketing)
17. Connect withrumo.com domain
18. Cross-link standalone apps to Rumo
19. Testing and launch

---

## What This Spec Does NOT Cover

- Exact question list (requires separate curation work)
- Payment implementation (deferred)
- Mobile-specific design (responsive by default, no native app)
- Marketing / launch strategy
- Analytics / tracking setup
- Email notifications (welcome, section complete, etc.)

---

## Resolved Decisions

1. **URL extraction** -- kept for writing samples in Section 2 (verify implementation quality before launch)
2. **SOTU** -- mandatory companion to constitution, positioned as living document with subscription hook
3. **Voice input** -- included in v1 via useVoiceInput hook
4. **Standalone apps** -- remain independent at their URLs. Rumo duplicates the functionality under unified branding. No cross-detection or import between them.
5. **Generation timing** -- all documents generated after Section 3 completion, not mid-journey
6. **Questions** -- static and curated (not AI-generated) for The Path; dynamic for /instructions
7. **Database** -- Supabase for auth and Postgres storage
8. **Branding** -- unified Rumo brand (ochre/navy), may evolve later
