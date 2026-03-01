# Rumo Redesign — Design Document

*March 1, 2026*

---

## What Is Rumo

Rumo is the go-to resource for getting started with AI. It meets people wherever they are — AI-curious, casual users, or professionals ready to level up — and gives them a clear roadmap for making AI actually personal.

The name means "direction" in Portuguese. The brand draws from Portuguese maritime exploration: caravels, ocean, navigation, the courage to set out toward something unknown. This isn't decoration — it's the philosophy. AI without direction is noise. Rumo provides the direction.

## Who It's For

People at any stage of their AI journey who want a clear understanding of what to do. They should walk away knowing the steps, even if they haven't completed them all yet. Rumo is the roadmap, not the destination.

## The Three Pillars

Rumo ties together three existing apps as the foundation of a personal AI setup:

1. **Know Yourself** — WeTheMe (https://we-the-me.vercel.app). Build a personal constitution. AI can't serve you well if you haven't articulated who you are, what you value, and how you operate.

2. **Find Your Voice** — WriteLikeMe (https://writelikeme.coach). Create a writing voice codex. AI writes generically until it knows YOUR voice — your rhythms, your tone, your instincts.

3. **Set Up Your AI** — CustomizedAI (https://customizedai.app). Generate custom instructions for ChatGPT, Claude, Gemini, and Perplexity. This is where the foundation becomes functional — every AI tool you use now knows you.

## Future Concepts (Not v1)

These are intentionally deferred. The page should be designed so they can be layered in later:

- **AI readiness assessment** — "Where are you on your AI journey?" quiz as a lead gen gateway
- **Chief of staff guide** — Teaching people how to build a personal AI assistant using their foundation
- **WAVES & SWEATS** — May or may not fit the new direction. Parked for now.
- **Email nurture sequences** — Fed into chadstamm.com HubSpot (one CRM, not a new database)

---

## Page Structure

One page. Five sections. Scrolling cinematic story.

### Section 1: Hero

Full-bleed video background — Portuguese caravel sailing through Atlantic waters (aerial shot, Cross of the Order of Christ on the sails). The video loops silently.

Text overlaid with strong contrast:
- **Headline:** "Find Your Direction" (or similar — copy to be refined with StoryBrand skill)
- **Subtext:** One sentence establishing the thesis — AI is powerful but generic until you make it yours
- **CTA:** Scroll indicator or "Start Here" button that smooth-scrolls to Section 2

Design notes:
- Video should have a dark overlay (40-60% opacity) for text legibility
- The Rumo compass logo lives in the top-left
- Minimal UI — this should feel cinematic, like an opening scene

### Section 2: The Problem

Transition to a calmer section. Cream/warm background, navy text. Editorial feel.

Core message: Most people are using AI wrong. They open ChatGPT, type a question, get a generic answer, and wonder what the hype is about. The problem isn't AI — it's that AI doesn't know you.

Design notes:
- Clean typography, generous whitespace
- Could include a subtle scroll-triggered fade-in animation
- Short — 3-4 sentences max. This is a bridge, not a lecture.
- Copy written in Chad's voice: direct, conversational, no filler

### Section 3: The Three Pillars

The heart of the page. Each pillar gets its own visual moment.

Structure per pillar:
- Custom illustration or icon (generated via nano-banana-pro — compass for Know Yourself, quill for Find Your Voice, constellation/map for Set Up Your AI)
- Pillar name and app name
- 2-3 sentences: why this matters
- Bold CTA button linking to the app

Design notes:
- Alternate between light and dark section backgrounds for visual rhythm
- Cards or full-width sections — not a cramped 3-column grid
- Each pillar should feel like its own moment as you scroll through
- Scroll-triggered entrance animations (fade-up, subtle parallax)
- The visual progression should feel like a journey: self-knowledge → voice → action

### Section 4: The Horizon

A second video or hero-image moment. Could be the same caravel footage from a different angle, or ocean at golden hour, or a still generated via nano-banana-pro.

Core message: Once you have your foundation, the horizon opens. This is where the journey continues.

For v1, this section is light:
- A short paragraph about what's possible with a solid AI foundation
- Email capture field: "The journey is just beginning." → feeds into chadstamm.com HubSpot
- Designed to be expandable — this is where assessment, chief of staff guide, and courses would slot in later

Design notes:
- This section should feel aspirational, not salesy
- The email capture is optional, not gated — no one is blocked from the content

### Section 5: The Guide

Chad Stamm. Not hidden in a footer — a real section.

Content:
- Short bio in Chad's voice. The Possiblist identity. Lisbon, TMC, the GenPoss philosophy — but concise. 3-4 sentences.
- Links to chadstamm.com, Substack (Cultural Currents), and social
- Photo optional but recommended

Design notes:
- Clean, personal, warm
- This section doubles as a portfolio anchor — when Chad sends this URL for speaking/consulting, this is what establishes credibility

---

## Visual Identity & Design Language

### Theme
Portuguese maritime exploration meets modern AI. Cinematic, bold, clean. This should NOT look like a standard template site or a typical Claude Code output. It should feel like stepping into a world.

### Color Palette
Carried from existing Rumo brand:
- **Deep navy** (#1a2744 or similar) — primary text, dark sections
- **Warm cream** (#faf6f1 or similar) — light sections, backgrounds
- **Ochre/gold** (#c4943a or similar) — accents, CTAs, warmth
- **Ocean blue** — secondary accent from the video footage
- **White** — text on dark backgrounds

### Typography
- **Display:** Source Serif 4 — confident, editorial, warm
- **Body:** DM Sans — clean, modern, readable
- Large headings. Generous line height. Whitespace is a design element.

### Motion & Animation
- Scroll-triggered section reveals (fade-up, opacity transitions)
- Subtle parallax on pillar cards or imagery
- Video hero loops seamlessly
- Nothing gimmicky — smooth, intentional, Apple-style storytelling

### Imagery
- Hero: video background (caravel footage, `public/hero-bg.mp4`, 8.3MB, 20s loop, no audio)
- Pillar illustrations: generated via nano-banana-pro skill — stylized, not photorealistic. Should feel like navigational art: compass, quill, star chart/constellation
- Horizon section: second video clip or hero-quality still image
- Overall: nautical, Portuguese, warm light, sense of journey and possibility

### Responsive
- Mobile-first. The video hero should work on mobile (consider fallback poster image for low-bandwidth)
- Pillar sections stack vertically on mobile
- Typography scales cleanly

---

## Tech Stack

The existing Rumo project is React + Vite + Tailwind. We keep that stack:

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + custom CSS for animations/video
- **Fonts:** Source Serif 4 + DM Sans (Google Fonts or self-hosted)
- **Icons:** Lucide React (already in project)
- **Animations:** CSS scroll-triggered animations (Intersection Observer) or Framer Motion
- **Deployment:** Vercel (migrate from GitHub Pages for consistency with other apps)
- **Video:** HTML5 `<video>` tag with autoplay, muted, loop, playsInline

No backend. No accounts. No database. Static site with links to external apps.

---

## Copy Approach

All copy will be developed using the StoryBrand skill and Chad's writing codex. Key principles:

- Customer is the hero, not Rumo
- The problem (generic AI) is the villain
- Rumo/Chad is the guide
- Direct, conversational, no filler — matches Chad's voice
- Short sentences. Forward motion. Every word earns its place.

---

## What Success Looks Like

- Someone lands on Rumo and within 30 seconds understands: "I need to build my AI foundation, and here's how."
- The page is beautiful enough to share — it makes people want to send the link
- Chad has a single URL he can put on a business card, in a speaker bio, or in an email signature that represents his AI ecosystem
- The architecture supports future additions (assessment, email capture, content) without a redesign
