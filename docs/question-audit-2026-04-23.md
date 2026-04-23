# Rumo Question-Set Audit

*Date: 2026-04-23*
*Auditor: Vasco (on Chad's prompt)*
*Source: `data/questions.ts` — 77 questions across Section 0 (shared intake) + 6 anchor sections*
*Purpose: Reference for v2 scoping. Hold until post-launch — do not modify questions or wizard copy before Apr 24 paywall launch.*

---

Read all 77 questions in `data/questions.ts`. Grading the per-anchor sections (Section 0 is shared intake, not an anchor).

---

**Constitution (Section 1, 14 Q) — Verdict: Mixed**

Strongest:
- *"What's a value you hold that others might find surprising or contradictory?"*
- *"When have you compromised a value and deeply regretted it?"*

These force tension. They presume a Constitution worth having must contain contradiction and regret — that's an opinion.

Weakest:
- *"What's your honest definition of a life well-lived?"*
- *"If you could tell the world one thing about who you really are, what would it be?"*
- *"How do you handle conflict, failure, and criticism?"*

The first two are TED-stage clichés. The third stacks three questions and answers itself ("when things get hard, I…").

Recommendation: cut "life well-lived" and "tell the world one thing." Replace with a single forced-position question: *"Name a value you defended at 25 that you no longer defend — and what replaced it."*

---

**Codex (Section 2, 17 Q) — Verdict: Strong**

Strongest:
- *"What would immediately make something NOT sound like you?"*
- *"What conventional writing rules do you break on purpose?"*

Anti-voice and deliberate rule-breaking are real IP. They presume voice is defined by negation as much as affirmation.

Weakest:
- *"If you had to describe your writing voice in 3-5 adjectives, what would they be?"*
- *"Tell us about your writing journey. How did you get here, and how has your voice evolved?"*
- *"What do you want your writing to accomplish? What effect do you want on readers?"*

The 3-adjectives question is the most generic question in the entire set — every voice tool asks it, and the answer ("direct, warm, conversational") is useless. The journey question is an essay prompt. The mechanics questions (sentence-style, paragraph-style, punctuation) carry weight downstream but, standalone, are competent checklist items.

Recommendation: cut the 3-adjectives question. Replace with *"Paste a sentence you wrote that you're proud of — then explain why a generic writer wouldn't have built it that way."* Forces analysis, not labels.

---

**Story Bank (Section 3, 11 Q) — Verdict: Strong**

Strongest:
- *"What smell takes you back somewhere instantly — and why does it stick?"*
- *"What's a place that felt like home — not because you lived there, but because of how it made you feel?"*

Sensory and disqualifier-prefixed questions extract material no resume captures. This anchor is your most distinctive set.

Weakest:
- *"If you had to describe your life as a genre, what would it be?"* (with a select dropdown of 10 genres)
- *"Who's a person who changed how you see yourself — and what did they do or say that stuck?"*

The genre question is a Pinterest quiz — and reducing it to a 10-option dropdown kills any nuance. The "person who changed you" question is straight from coaching school.

Recommendation: cut genre. Or rework as *"Name the genre — and the scene from your life that proves it."* Makes the user defend the answer.

---

**State of the Union (Section 6, 10 Q) — Verdict: Weak**

Strongest:
- *"What's a truth about your current situation that you haven't said out loud yet?"*

That's the only one doing real work.

Weakest:
- *"What season of life are you in right now, and how does it feel?"*
- *"What roles are you currently juggling?"*
- *"What's actually working in your life right now? Where do you have momentum?"*

These are intake-form questions. Any therapist's first session covers them. The whole anchor is a status form with one good question stapled on.

Recommendation: cut "what's working" and "season of life." Replace with *"What did you say yes to in the last 30 days that you should have said no to — and why did you say yes anyway?"* Surfaces the gap between stated and lived priorities.

---

**Timeline (Section 4, 12 Q) — Verdict: Mixed**

Strongest:
- *"Looking at your timeline, what pattern keeps repeating?"*
- *"If your timeline ended today, what would the headline be?"*

Pattern-recognition forces synthesis the user usually outsources. The headline-now question pressure-tests aspiration against reality.

Weakest:
- *"Where did you grow up, and what did those early years give you?"*
- *"Walk through your professional timeline. Jobs, roles, pivots — the path that got you here."*
- *"What does the next chapter look like? What are you building toward?"*

Pure scaffolding. The "not a resume" disclaimer in the career question doesn't change that you're asking for a resume.

Recommendation: cut the next-chapter question (it's already covered by current-chapter + legacy-snapshot). Replace with *"Name the year you'd skip if you could — and what skipping it would have cost you."*

---

**Influence Roster (Section 5, 12 Q) — Verdict: Mixed**

Strongest:
- *"For the key people you've named, how should your AI handle communications with or about them?"*
- *"Is there a relationship in your life right now that carries friction? What does it reveal about you?"*

The AI-handling question is uniquely operational — it's the only question in all 77 that closes the loop between context and use. Real IP.

Weakest:
- *"Who's your family? Partner, parents, siblings, children..."*
- *"Beyond family, who are the 3-5 people closest to you right now?"*
- *"How do you show up in relationships? What's your pattern — the good and the bad?"*

The first two are directory entries, not questions. The third is therapy-textbook generic.

Recommendation: collapse the three directory questions into one matrix-style input. Replace the saved slot with *"Name a relationship you maintain mostly from obligation — and what would actually change if you ended it."* Forces honesty about the roster, not just inventory.

---

**Meta-verdict: Replaceable, with a defensible core**

Of 77 questions, roughly 15 are genuinely opinion-encoded — the rest are competent interview prompts that Claude would generate unprompted in any coaching context. **Story Bank and Codex hold up. Constitution and Timeline split down the middle. SOTU and Roster are mostly scaffolding with one or two sharp questions buried inside.**

The defensible IP is concentrated in:
1. **Anti-questions** — anti-voice, anti-goal (afraid-becoming), unsaid-truth, contradictions
2. **Sensory and disqualifier-prefixed** prompts (smell, place-not-lived-in)
3. **The AI-handling-instructions question** in Roster — the only operationally unique one

Everything else is copyable in an afternoon. A competitor reading the question set once could clone 80% of it without losing meaningful value. The remaining 20% is real but small.

The opinion Rumo *should* be encoding is: "context only matters where it contradicts the official self." The current set partially expresses this (in the strongest 15 questions) but dilutes it with status-form filler. The strategic question isn't whether to add questions — it's whether to cut to ~50 and make every one of them force a position.

Right now, the scaffolding *is* the product, but the scaffolding leaks. Tighten the question set against the contradiction principle and the IP becomes defensible. Leave it as-is and Rumo is, as you said, skinned inverted-prompting.
