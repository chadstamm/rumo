# Rumo Phase 1 Design Spec

**Date:** 2026-03-20
**Author:** Chad Stamm + Vasco
**Status:** Draft

---

## What Rumo Is

Rumo is a system that helps professionals find their direction with AI. It starts with foundational tools that build personal AI context, then grows into a living platform of education, updates, and community.

The name means "direction" in Portuguese. The brand identity is nautical — exploration, navigation, charting your own course. This isn't another AI course or prompt library. Rumo helps people make AI *theirs*.

### Target Audience

Professionals (30s-50s) who have used AI but haven't personalized it. They've tried ChatGPT, maybe use it for emails or brainstorming, but don't have custom instructions, a voice codex, or any personal context set up. They're driving the car but never adjusted the mirrors.

### The Rumo System (Full Vision)

1. **The Path** — a four-step guided journey through personal context tools
2. **The Vault** — a living context profile that deepens over time (constitution, voice, stories, instructions)
3. **The Compass** (working name) — short, specific, actionable AI updates tied to your setup
4. **The Library** — educational pages that grow as AI evolves
5. **The Community** — Skool as the social/discovery layer
6. **Workshops** — live sessions, Chad's speaking lane productized

### Phased Approach

- **Phase 1 (this spec):** Hub landing page + connected four-step journey. Approach B.
- **Phase 2:** Accounts, vault, saved progress. Compass/briefing launches. Library starts growing.
- **Phase 3 (destination):** Unified app — all four tools under one roof (Approach C). Assessment onboarding. Full platform.

Everything built in Phase 1 feeds forward. Nothing gets thrown away.

---

## Phase 1 Scope

### Goal

Rebuild the Rumo landing page as a Next.js app that tells the story, frames the four-step journey, and connects the existing standalone apps in sequence. This is the front door — the connective tissue that turns four separate tools into one coherent experience.

### What Ships

1. **Landing page** — rebuilt in Next.js with the existing design language (navy/ochre/cream, nautical imagery, caravel video hero, compass rose brand mark)
2. **Four-step journey** — updated from three pillars to four, in the correct sequence:
   - Step 1: **Know Yourself** — WeTheMe (build your personal constitution)
   - Step 2: **Find Your Voice** — WriteLikeMe (capture your writing DNA)
   - Step 3: **Mine Your Stories** — StoryArchive (collect and catalog your lived experience)
   - Step 4: **Set Up Your AI** — CustomizedAI (generate custom instructions from everything above)
3. **Educational context** — each step includes a brief explanation of *why* this matters, not just what the tool does. The copy frames the journey, not the features.
4. **Cross-linking** — each standalone app links back to Rumo and forward to the next step. When you finish WeTheMe, you're pointed to WriteLikeMe. When you finish CustomizedAI, you're pointed back to Rumo.
5. **Updated copy** — hero, problem section, and guide section rewritten to reflect the "find your direction" positioning and the four-step journey.

### What Does NOT Ship in Phase 1

- User accounts / auth
- The Vault (context storage)
- The Compass (AI briefing)
- The Library (educational content pages beyond the landing page)
- Skool integration
- Any changes to the standalone apps themselves (beyond adding cross-links)
- Payments / subscriptions

### Architecture

**Current state:** Vite/React/TypeScript single-page app. No routing, no backend. Deployed on Vercel.

**Phase 1 target:** Next.js App Router. Same Vercel deployment. This gives us:
- File-system routing (needed for future Library pages, auth routes, vault)
- Server-side rendering (SEO for the landing page)
- API routes (needed in Phase 2 for auth, vault, Compass)
- The foundation for Phase 2 and 3 without another migration

**Migration approach:**
- Port existing components (Hero, Problem, Pillars, Horizon, Guide, Footer) from Vite to Next.js
- Preserve the design system: navy (#1a2744), ochre (#c4943a), cream (#faf6f1), Tailwind config, scroll reveal animations
- Keep the hero-bg.mp4 caravel video and poster image
- Add the fourth pillar (StoryArchive as step 3, pushing CustomizedAI to step 4)
- Rewrite copy to match the updated positioning

### Design Language

The existing visual identity is strong and stays:

- **Palette:** Navy, ochre/gold, cream. Dark sections alternate with light.
- **Typography:** Display font for headlines, body font for prose. Tracking and weight used for hierarchy.
- **Nautical motifs:** Compass rose logo (SVG), caravel video, ocean imagery, watermark step numbers. These are brand identity, not decoration.
- **Tone:** Cinematic, editorial, confident. Not techy. Not salesy. Feels like opening a well-designed book.
- **Motion:** Scroll-triggered reveals, subtle hover lifts, staggered fade-in on hero. Understated, not flashy.

The nautical footage (caravels, ocean) works because the brand is literally about direction and exploration. More footage in this vein is welcome — especially for section transitions or future pages. Avoid anything that makes it feel like a travel site.

### Copy Direction

**Hero:**
- Current: "AI Is Powerful. Direction Makes It Yours."
- Keep this or refine. The tagline needs to be short, low cognitive load. "Direction" must be in it.
- Subtext positions the problem: generic AI vs. personalized AI.

**Problem section:**
- Current copy is strong. Refresh to sharpen around the four-step journey.
- Core message: AI doesn't know you. That's not AI's fault — it's yours. And it's fixable.

**The Plan (pillars):**
- Update from "Three Steps" to "Four Steps to AI That Actually Knows You"
- Add StoryArchive as Step 3 with copy that explains why your stories matter
- Reorder: WeTheMe (01), WriteLikeMe (02), StoryArchive (03), CustomizedAI (04)
- Each step explains the *why* before the *what*

**Guide section:**
- Chad's bio. Positions him as someone who did this for himself and built the tools to help others do the same.

**Horizon section:**
- Teases what's coming: the vault, the compass, workshops. Creates anticipation without overpromising.

### Cross-Linking Strategy

Each standalone app gets a small update (not a rebuild):
- A "Powered by Rumo" or "Part of the Rumo journey" badge/link
- A "Next Step" CTA after completion that points to the next app in sequence
- A "Back to Rumo" link in the nav or footer

This is minimal — a few lines of code per app. The goal is connection, not unification (that's Phase 3).

### Deployment

- Rumo stays on Vercel under its existing project
- Domain: current Vercel URL for now, custom domain TBD
- Standalone apps unchanged — they keep their own domains and deployments

---

## Future Phases (Not In Scope, Documented for Direction)

### Phase 2: Accounts + Vault + Compass

- Auth (likely Clerk via Vercel Marketplace)
- Context Vault: store your constitution, voice codex, story bank, and custom instructions in one place. Not just file storage — a living profile that grows. The ongoing engagement comes from updating stories, refining voice, refreshing instructions as AI evolves.
- The Compass: short, specific AI updates tied to what you've set up. "Gemini just updated memory. Here's how to adjust your instructions." Not a newsletter — maintenance for your AI life.
- Saved journey progress: which steps you've completed, when, what to revisit

### Phase 3: Unified App (Approach C)

- All four tools rebuilt under one Rumo codebase
- Shared auth, shared design language, shared navigation
- Sequential flow with handoffs between steps
- Assessment/onboarding that personalizes the path
- The Library: educational pages that grow as AI evolves
- Skool as community/distribution channel
- Workshops and live sessions
- Subscription model

---

## Open Questions (To Resolve Before or During Build)

1. **Rumo tagline** — needs to be short, contain "direction," low cognitive load. Workshop separately.
2. **Domain** — rumo.app? getrumo.com? TBD.
3. **Story Archive copy** — what's the one-line pitch for why stories matter in this sequence?
4. **Compass naming** — "The Compass" works thematically but might conflict with the compass rose logo. Alternatives TBD.
5. **Skool timing** — when to launch the community. Could start before Phase 2 as a distribution experiment.

---

## Success Criteria

Phase 1 is done when:
- The Rumo landing page is live on Next.js with the four-step journey
- All four standalone apps have cross-links back to Rumo and forward to the next step
- The copy clearly communicates: what Rumo is, who it's for, and why the four steps matter
- A professional landing on the page understands in 30 seconds what to do and why
- The foundation is in place for Phase 2 (Next.js, Vercel, ready for auth/API routes)
