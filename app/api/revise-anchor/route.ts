import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 300 // 5 minutes

const client = new Anthropic()

// ── System prompt ──

const REVISE_SYSTEM_PROMPT = `You are revising a previously-generated context anchor document for someone. They've asked for a specific change. Your job: honor their request while preserving everything else that's working.

Rules:
- Output the FULL revised document in the same format as the original.
- Do NOT strip sections that the user didn't ask to change.
- Preserve the first-person voice of the original.
- If the user's instruction is vague, make your best interpretation and ship it.
- Do NOT add preamble like "Here's the revised document" — output the document directly, starting with the # heading.
- Maintain the original's tone, length, and structure unless the instruction explicitly asks to change those.
- If the instruction asks to add content, integrate it where it fits best. Don't just tack it on at the end.
- If the instruction asks to remove content, remove cleanly — re-flow surrounding text if needed.
- If the instruction is ambiguous about scope ("make it shorter"), apply proportional cuts across the whole document, not wholesale deletions of whole sections.`

// ── Types ──

interface ReviseAnchorRequest {
  anchorSlug: string
  anchorTitle: string
  currentContent: string
  revisionInstruction: string
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

    const data: ReviseAnchorRequest = await request.json()

    if (!data.anchorSlug || !data.currentContent || !data.revisionInstruction) {
      return NextResponse.json(
        { error: 'Missing required fields: anchorSlug, currentContent, revisionInstruction' },
        { status: 400 }
      )
    }

    if (data.revisionInstruction.trim().length === 0) {
      return NextResponse.json(
        { error: 'Revision instruction cannot be empty' },
        { status: 400 }
      )
    }

    if (data.revisionInstruction.length > 2000) {
      return NextResponse.json(
        { error: 'Revision instruction too long. Maximum 2000 characters.' },
        { status: 400 }
      )
    }

    const anchorTitle = data.anchorTitle || data.anchorSlug

    const userPrompt = `Here is my current ${anchorTitle}:

---
${data.currentContent}
---

My revision request:
${data.revisionInstruction.trim()}

Output the full revised ${anchorTitle}. Keep all sections I didn't ask to change intact. No preamble — start directly with the document's # heading.`

    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 32000,
      system: REVISE_SYSTEM_PROMPT,
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
    console.error('Revise anchor error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
