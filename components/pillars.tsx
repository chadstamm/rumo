'use client'

import { SectionIntro } from '@/components/section-intro'
import { PillarSection } from '@/components/pillar-section'
import type { PillarData } from '@/components/pillar-section'

const PILLARS: PillarData[] = [
  {
    id: 'know-yourself',
    step: '01',
    title: 'Know Yourself',
    app: 'WeTheMe',
    url: 'https://we-the-me.vercel.app',
    image: '/pillars/compass.png',
    bg: 'dark' as const,
    description:
      'AI gives everyone the same generic answers because it doesn\u2019t know who you are. Your values, your priorities, how you think\u2009\u2014\u2009that\u2019s the foundation everything else is built on. Start there.',
    cta: 'Build Your Constitution',
  },
  {
    id: 'find-your-voice',
    step: '02',
    title: 'Find Your Voice',
    app: 'WriteLikeMe',
    url: 'https://writelikeme.coach',
    image: '/pillars/quill.png',
    bg: 'light' as const,
    description:
      'AI writes like AI until it learns to write like you. Your rhythms. Your instincts. Your tone. Capture your writing DNA so every word it produces sounds like it came from your hand.',
    cta: 'Capture Your Voice',
  },
  {
    id: 'mine-your-stories',
    step: '03',
    title: 'Mine Your Stories',
    app: 'StoryArchive',
    url: 'https://storyarchive.app',
    image: '/pillars/stories.png',
    bg: 'dark' as const,
    description:
      'Your experiences are the richest context you have\u2009\u2014\u2009and the one AI knows nothing about. The moments that shaped your thinking, the lessons you carry, the details that make you credible. Mine them.',
    cta: 'Collect Your Stories',
  },
  {
    id: 'set-up-your-ai',
    step: '04',
    title: 'Set Up Your AI',
    app: 'CustomizedAI',
    url: 'https://customizedai.app',
    image: '/pillars/starmap.png',
    bg: 'light' as const,
    description:
      'This is where foundation becomes function. Take your constitution, your voice, and your stories\u2009\u2014\u2009and generate custom instructions that make every AI tool actually know you. The real payoff.',
    cta: 'Configure Your AI',
  },
]

export function Pillars() {
  return (
    <div id="pillars">
      <SectionIntro />
      {PILLARS.map((pillar, index) => (
        <PillarSection key={pillar.id} pillar={pillar} index={index} />
      ))}
    </div>
  )
}
