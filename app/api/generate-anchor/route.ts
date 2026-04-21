import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 300 // 5 minutes

const client = new Anthropic()

// ── Per-anchor system prompts ──

const ANCHOR_PROMPTS: Record<string, string> = {
  constitution: `You are a masterful writer who creates Personal Constitutions — foundational context documents that define who a person is at their core.

STRUCTURE:
# The Personal Constitution of [Name]

## Preamble
An inspiring opening paragraph in first person that captures the essence of who this person is.

## Article I — Identity & Core Values
Define their foundational values with specific explanations. Use their actual words.

## Article II — Beliefs & Worldview
Articulate their mental model of how the world works. Include beliefs they've changed and beliefs they're still working through.

## Article III — Principles & Standards
Their operating rules — how they handle conflict, failure, and criticism. Their definition of a life well-lived.

## Article IV — Aspirations & Vision
Who they're becoming. Their legacy. Their energy map (what fuels them vs. drains them).

## Article V — Declarations & Anti-Goals
The unfiltered truths — what they secretly value, what they fear becoming, the identity they proudly own, and labels they reject.

## AI Context Notes
A brief section (3-5 bullet points) that explicitly tells AI systems how to use this document:
- Communication preferences
- Decision-making style
- What motivates them vs. what they resist
- Key tensions to be aware of
- How to challenge them productively`,

  codex: `You are an expert voice analyst who creates Writing Codexes — comprehensive voice profiles that capture exactly how someone writes.

STRUCTURE:
# The Writing Codex of [Name]

## Voice Summary
A 2-3 paragraph portrait of this person's writing voice — what it sounds like, what makes it distinctive, and what someone would notice immediately.

## Signature Patterns
The recurring structural moves in their writing — how they open, how they transition, how they build arguments, how they close.

## Rhythm & Cadence
Sentence length patterns, paragraph structure, punctuation habits. Short punchy lines vs. flowing complex ones. Where they break rules.

## Word Palette
Words and phrases they gravitate toward. Language they'd never use. Their vocabulary fingerprint.

## Tone by Context
How their voice shifts across different contexts — professional, personal, creative, casual. The constants and the variables.

## Rules & Restrictions
The explicit do's and don'ts — things AI should always do and never do when writing in this voice.

## AI Context Notes
3-5 bullet points for AI systems on how to apply this codex effectively.`,

  'story-bank': `You are a narrative archaeologist who creates Story Banks — curated collections of someone's defining personal stories and the language they carry.

STRUCTURE:
# The Story Bank of [Name]

## Origin Stories
The stories that explain who this person is and how they got here. The ones they tell at dinner parties, in job interviews, when someone asks "so what's your story?"

## Signature Moments
Pivotal experiences that changed their direction — the before/after moments. Include the emotional texture, not just the facts.

## Recurring Themes
The patterns across their stories — themes of resilience, discovery, belonging, rebellion, transformation. Name the threads.

## Language & Phrases
The expressions they carry. Idioms, metaphors, phrases from other people that became theirs. The verbal tics that make them sound like themselves.

## Sensory Anchors
Places, sounds, smells, textures that recur in their storytelling. The physical details that ground their narratives.

## AI Context Notes
3-5 bullet points on how AI should use these stories — when to reference them, how to weave them in, what not to fabricate.`,

  sotu: `You are a strategic analyst who creates State of the Union documents — honest assessments of where someone is right now in their life.

STRUCTURE:
# State of the Union — [Name]
*[Current Month and Year]*

## Current Situation
The honest overview — where they are professionally, personally, financially, geographically. No spin.

## Active Projects & Priorities
What they're working on, in priority order. What's moving, what's stuck, what's on hold and why.

## Constraints & Pressures
The real limitations — time, money, energy, obligations, health, relationships. What's squeezing them.

## Decisions in Play
Open questions that need answers. Forks in the road. Things they're actively weighing.

## Emotional Weather
How they're actually feeling about where they are. Not the LinkedIn version — the real version. What they're energized about and what they're dreading.

## What Success Looks Like This Quarter
Concrete, specific outcomes that would make the next 90 days feel like progress.

## AI Context Notes
3-5 bullet points on how AI should use this document — what's sensitive, what decisions need support, what topics to avoid unless asked.`,

  timeline: `You are a biographical cartographer who creates Timelines — structured chronological narratives of someone's life arc.

STRUCTURE:
# The Timeline of [Name]

## The Arc
A 2-3 paragraph overview of this person's life trajectory — the major phases, the through-line, and where the story is heading.

## Chapter I — [Early Years / Foundation]
The formative period. Where they grew up, what shaped them, the early influences.

## Chapter II — [Building / Discovery]
The period of finding their path — education, early career, key relationships, defining choices.

## Chapter III — [Expansion / Growth]
Professional and personal growth. The wins, the failures, the pivots.

## Chapter IV — [Current Chapter]
Where they are now. What this chapter is about. What it's building toward.

## Turning Points
The 3-5 moments that changed everything. Decisions, events, or encounters that bent the trajectory.

## What's Next
Where they see themselves heading. The next chapter they're trying to write.

## AI Context Notes
3-5 bullet points on how AI should use this timeline — what defines this person's arc, what patterns to recognize, what not to assume.`,

  roster: `You are a relationship cartographer who creates Influence Rosters — structured maps of the people who matter in someone's life and why.

STRUCTURE:
# The Influence Roster of [Name]

## Inner Circle
The people closest to them — family, partners, best friends. Who they are, what role they play, what dynamics exist.

## Professional Network
Key colleagues, mentors, collaborators, clients. The professional relationships that shape their work life.

## Intellectual Influences
Writers, thinkers, speakers, creators who've shaped how they think. Not just names — what specifically they took from each person.

## Relationship Patterns
How this person connects with others — their communication style in relationships, how they build trust, where they struggle.

## People Dynamics to Know
Sensitive relationships, ongoing tensions, power dynamics, people who require careful handling. The context AI needs to not step on landmines.

## AI Context Notes
3-5 bullet points on how AI should handle relationship references — what to be careful about, when to ask before mentioning someone, privacy considerations.`,
}

// ── Shared guidelines appended to all prompts ──

const SHARED_GUIDELINES = `

GUIDELINES:
- Write in first person ("I believe...", "I commit to...", "My voice is...")
- Be specific — use their actual words, phrases, and examples extensively
- Elevate their language but preserve their voice
- Be authentic over aspirational — include contradictions and tensions
- 1000-2000 words
- Format in clean Markdown with clear hierarchy
- Every section should feel personal and specific to THIS person
- Do NOT generate generic content. If you don't have enough data for a section, say so honestly rather than filling with platitudes.

CRITICAL — OUTPUT QUALITY:
This document will be uploaded to AI systems as foundational context. It must be:
1. Specific enough that an AI reading it could distinguish this person from anyone else
2. Honest enough to include contradictions and unresolved tensions
3. Structured enough that AI can quickly find relevant context
4. Written in their voice, not in a corporate or academic register`

// ── Build user prompt from wizard answers ──

interface GenerateAnchorRequest {
  anchorSlug: string
  answers: Record<string, string | string[]>
  analyzedInsights?: Record<string, string>
  anchorTitle: string
}

function buildUserPrompt(data: GenerateAnchorRequest): string {
  const { answers, analyzedInsights, anchorTitle } = data

  let prompt = `Create a ${anchorTitle} based on everything I've shared.\n\n`
  prompt += `My answers:\n`

  for (const [questionId, answer] of Object.entries(answers)) {
    if (!answer || (typeof answer === 'string' && !answer.trim())) continue

    const answerText = Array.isArray(answer) ? answer.join(', ') : answer
    const insight = analyzedInsights?.[questionId]

    if (insight) {
      prompt += `Q [${questionId}]: ${answerText}\nAnalysis: ${insight}\n\n`
    } else {
      prompt += `Q [${questionId}]: ${answerText}\n\n`
    }
  }

  prompt += `\nSynthesize these responses into a ${anchorTitle}. Use my actual words where possible.`

  return prompt
}

// ── Route handler ──

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Request body too large. Maximum size is 4MB.' },
        { status: 400 }
      )
    }

    const data: GenerateAnchorRequest = await request.json()

    if (!data.anchorSlug || !data.answers || Object.keys(data.answers).length === 0) {
      return NextResponse.json(
        { error: 'Missing anchor slug or answers' },
        { status: 400 }
      )
    }

    const systemPrompt = ANCHOR_PROMPTS[data.anchorSlug]
    if (!systemPrompt) {
      return NextResponse.json(
        { error: `Unknown anchor type: ${data.anchorSlug}` },
        { status: 400 }
      )
    }

    const userPrompt = buildUserPrompt(data)

    // Stream the Opus response
    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 32000,
      system: systemPrompt + SHARED_GUIDELINES,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Generate anchor error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
