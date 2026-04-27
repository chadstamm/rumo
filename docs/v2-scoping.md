# Rumo Question Set — v2 Scoping

*Date: 2026-04-23*
*Companion to: `docs/question-audit-2026-04-23.md`*
*Status: Pending Chad's ratification of editorial thesis. Do not begin v2 work until ratified.*

---

## 1. Editorial thesis to ratify

> **"Context only matters where it contradicts the official self."**

Surfaced from the audit. If Chad ratifies (or sharpens), this becomes the cutting criterion for v2 — the single test every question must pass.

**Status: pending Chad's call.** He may adopt as-is, sharpen the language, or reject in favor of a different organizing principle. Nothing else moves until this is ratified.

---

## 2. The v2 cut principle (if thesis holds)

For each of the 77 questions, one test:

> **"Does this extract contradiction with the official self?"**
> - **Yes** → keep or sharpen
> - **No** → cut

Audit estimate: ~50 questions survive. Do not pre-cut anything yet — this is the rule, not the action. The cut happens after ratification, not before.

---

## 3. Anchor-level v2 hypotheses

One line per anchor, drawn from the audit. Working hypotheses, not commitments.

- **Constitution** — sharpen the tension questions, cut the TED-stage clichés
- **Codex** — drop "3-5 adjectives," add sentence-exemplar question
- **Story Bank** — strongest set, minor cuts only
- **SOTU** — rebuild around "gap between stated and lived priorities," not status inventory
- **Timeline** — keep pattern-recognition + headline-now, cut resume scaffolding
- **Roster** — preserve AI-handling question, collapse directory entries, add obligation-vs-affection

---

## Hold instructions

- **Do not modify `data/questions.ts` or any wizard copy before Apr 24 paywall launch.** Question surgery 24 hours before launch introduces bugs into UX that's already calibrated and shakes copy that's already dialed in.
- Ship the 77 questions as they are. Data from live users beats launch-eve nerves.
- Wait for Chad's ratification of the editorial thesis before anything else touches the question set.

---

## 4. Beyond the question set — product architecture

These are separate from the question-set audit. Surfaced 2026-04-27 during paywall fix work, post-launch only. Do not touch before May 3.

### 4a. Vault as dashboard, not card grid

Today the vault is a 2-col card grid — six equal cards, each treating its anchor as a destination you click into. Chad's read: "still not what I want it to be. I want it to feel like a dashboard."

Direction worth exploring:
- At-a-glance state across the six anchors — what's built, what's stale, what's been edited recently
- Quick actions surfaced without expanding cards — copy, download, edit
- A different visual hierarchy that frames the six as components of one workspace, not six separate destinations
- Possibly: recent activity, version history, "last edited" timeline

What "dashboard" means to Chad still needs to be pinned down before any design work — the word covers a lot of patterns. Brainstorm with him before drawing.

### 4b. Story Bank as structured records, not a single document

Surfaced from this exchange: *"For the storybank, I want to have the phrases and maybe the stories listed out so one can add to them and/or subtract — right now that is just at the document level, and maybe, for this anchor especially, having more nuance like that would make sense, similar to what we did for the storybank app."*

The reference is to `~/Desktop/Claude Code Projects/story-archive/` — Chad's existing structured story app.

**Why it matters:** Every anchor is currently one content blob. For Story Bank, the natural unit is a single phrase or story — discrete records you'd want to add, remove, tag, or reorder individually. The current single-document model collapses that natural structure.

**The cascade question:** If you do this for Story Bank, you start asking the same of the others:
- **Influence Roster** — one record per person?
- **Timeline** — one record per moment?
- **Constitution** — one record per article/principle?

If the answer is yes for any of them, this isn't a Story Bank feature — it's a vault data-model migration. Documents become collections; collections render as documents on demand for AI upload. That's a real v2 architectural decision and changes the schema (`vault_entries` table with anchor_slug, entry_type, content, ordering, tags), the editor (per-entry CRUD instead of textarea), and the AI generation prompts.

**Decision needed before any work:** Is structured-records a Story Bank-only experiment, or the v2 architectural direction for the whole vault? Chad's gut on this drives the scope.

### 4c. Brand / Business Context as a separate anchor (or axis)

Surfaced 2026-04-27 from George B. Thomas's Strategy Talks transcript (logged at `vasco/log/raw/2026-04-22-gbt-strategy-talks-content-system.md`). George's foundation-first content architecture has five layers — and notably **separates Personal Identity from Brand/Business Identity**:

1. Brand identity — voice, tone, principles, services
2. Personal identity — frameworks, philosophy, stories, voice
3. Story bank — tagged by theme
4. Timeline
5. Sidekick Strategies (his business) — services + capabilities

RUMO today maps to layers 2, 3, 4 — and collapses brand/business entirely. That's the gap.

**Why it matters:** RUMO's natural buyer is a solopreneur, founder, or creator — someone with both a personal brand AND a business identity. The AI they're configuring needs to know which "who" to write as in a given moment. Personal-mode and business-mode have different vocabularies, different stakes, different voice. Today RUMO can't distinguish them.

**Two ways to ship it:**
- **Add a 7th anchor: Brand Voice / Business Identity.** Lower-lift, fits the existing model. Risks feeling tacked-on.
- **Introduce a "context axis" — Personal vs. Organizational.** Each anchor exists on either axis (or both). User toggles which context they're feeding their AI for a given task. Higher-lift, real architectural shift, but matches how George actually uses his system in practice.

**Decision needed before any work:** Is this v2 the "add Anchor #7" interpretation or the "Personal/Org axis" interpretation? Chad's Cultural Currents writer + TMC Executive Creative Director duality is the exact use case — gut-check on which model maps cleaner to his own life.
