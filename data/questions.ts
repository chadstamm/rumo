import type { WizardQuestion } from '@/types/wizard'

/**
 * Rumo Unified Question Set — 68 curated questions across 7 sections (6 anchors + shared intake)
 *
 * Curated from 124 questions across WeTheMe, WriteLikeMe, and StoryArchive,
 * plus Timeline, Roster, and Situation sections.
 *
 * Section 0 (Shared Intake): 7 questions — collected first, feeds all generation prompts
 * Section 1 (Identity): 10 questions — values, beliefs, aspirations → Personal Constitution
 * Section 2 (Voice): 12 questions — writing patterns, style, samples → Writing Codex
 * Section 3 (Stories): 9 questions — memory triggers, signature language → Story Bank
 * Section 4 (Timeline): 10 questions — milestones, chapters, trajectory → Timeline
 * Section 5 (Roster): 10 questions — relationships, network, people context → Roster
 * Section 6 (Situation): 10 questions — current season, constraints, priorities → State of the Union
 */

export const QUESTIONS: WizardQuestion[] = [
  // ═══════════════════════════════════════════════════
  // SECTION 0: SHARED INTAKE
  // "The foundation everything else builds on"
  // ═══════════════════════════════════════════════════

  {
    id: 'name-background',
    section: 0,
    question: 'Let\'s start simple. What\'s your name, and what do you do?',
    subtext: 'Your professional background, your role, your industry. The elevator version.',
    inputType: 'textarea',
    placeholder: 'I\'m [name], and I [what you do]...',
    required: true,
  },
  {
    id: 'core-values',
    section: 0,
    question: 'What are the 3-5 values you\'d fight for, even when it\'s inconvenient?',
    subtext: 'Not the values that sound good on paper. The ones that actually cost you something.',
    considerations: [
      'When have you sacrificed comfort to protect a value?',
      'What do you judge others for? (This often reveals your deepest values.)',
      'What would you want people to say about you when you\'re not in the room?',
    ],
    inputType: 'textarea',
    placeholder: 'Be specific. "Integrity" is a start — but what does that look like in your real life?',
    required: true,
  },
  {
    id: 'influences',
    section: 0,
    question: 'Who are your biggest influences? Writers, thinkers, mentors, communicators — anyone who shaped how you see the world or express yourself.',
    subtext: 'Influences reveal the DNA of your style and thinking.',
    inputType: 'textarea',
    placeholder: 'The people who shaped how I think and communicate...',
    required: true,
  },
  {
    id: 'signature-phrases',
    section: 0,
    question: 'What phrases or expressions do you say all the time? The things friends or family would impersonate you saying.',
    subtext: 'The words that are unmistakably yours.',
    inputType: 'textarea',
    placeholder: 'I always say...',
    required: true,
  },
  {
    id: 'conflict-approach',
    section: 0,
    question: 'How do you handle conflict, failure, and criticism?',
    subtext: 'Character isn\'t revealed in easy moments. Define who you are when things get hard.',
    considerations: [
      'When someone disagrees with you publicly',
      'When you fail at something important',
      'When you receive criticism that stings',
    ],
    inputType: 'textarea',
    placeholder: 'When conflict arises, I... When I fail, I... When criticized, I...',
    required: true,
  },
  {
    id: 'afraid-becoming',
    section: 0,
    question: 'What are you most afraid of becoming?',
    subtext: 'Your anti-goals are as defining as your goals. Name the version of yourself you refuse to accept.',
    inputType: 'textarea',
    placeholder: 'The person I never want to be is someone who...',
    required: true,
  },
  {
    id: 'energy-map',
    section: 0,
    question: 'What gives you energy, and what drains it?',
    subtext: 'Understanding your energy sources is essential context. AI can\'t help you optimize a life it doesn\'t understand.',
    inputType: 'textarea',
    placeholder: 'I come alive when... I lose energy when...',
    required: true,
  },

  // ═══════════════════════════════════════════════════
  // SECTION 1: IDENTITY
  // "Who you are when no one's watching"
  // ═══════════════════════════════════════════════════

  {
    id: 'value-regret',
    section: 1,
    question: 'When have you compromised a value and deeply regretted it?',
    subtext: 'Our biggest regrets point to our truest convictions. This isn\'t about shame — it\'s about clarity.',
    inputType: 'textarea',
    placeholder: 'What happened, and what did it teach you about what you actually stand for?',
  },
  {
    id: 'surprising-value',
    section: 1,
    question: 'What\'s a value you hold that others might find surprising or contradictory?',
    subtext: 'The most interesting people aren\'t one-dimensional. Where do you defy expectations?',
    inputType: 'textarea',
    placeholder: 'e.g., "I\'m fiercely competitive but believe winning means helping others win too..."',
  },
  {
    id: 'non-negotiables',
    section: 1,
    question: 'What are your absolute non-negotiables — the lines you refuse to cross?',
    subtext: 'These are the boundaries that define you. The things that, if broken, would mean you\'ve lost yourself.',
    inputType: 'textarea',
    placeholder: 'What rules do you have for yourself that you rarely break?',
    required: true,
  },
  {
    id: 'world-beliefs',
    section: 1,
    question: 'What do you believe about how the world works that shapes your decisions?',
    subtext: 'We all carry a mental model of how things work. Yours drives every choice you make.',
    considerations: [
      'What do you believe about human nature?',
      'What do you believe about success and ambition?',
      'What do you believe is the relationship between effort and outcomes?',
    ],
    inputType: 'textarea',
    placeholder: 'The beliefs that actually influence how I live...',
    required: true,
  },
  {
    id: 'changed-belief',
    section: 1,
    question: 'What\'s a belief you\'ve changed significantly in the last few years?',
    subtext: 'Growth means updating your operating system. What old belief did you shed — and what replaced it?',
    inputType: 'textarea',
    placeholder: 'I used to believe... but now I believe... because...',
  },
  {
    id: 'working-through',
    section: 1,
    question: 'What\'s a belief you hold that you\'re still working through?',
    subtext: 'Not everything is resolved. The beliefs we\'re actively wrestling with say as much about us as the settled ones.',
    inputType: 'textarea',
    placeholder: 'Where are you in tension with yourself? What question are you still sitting with?',
  },
  {
    id: 'success-definition',
    section: 1,
    question: 'What\'s your honest definition of a life well-lived?',
    subtext: 'Not society\'s definition. Not your parents\'. Yours.',
    inputType: 'textarea',
    placeholder: 'If you looked back on your life at 90, what would make you think "I did it right"?',
    required: true,
  },
  {
    id: 'future-self',
    section: 1,
    question: 'Who do you want to become in the next decade?',
    subtext: 'Not what you want to achieve — who you want to be. What qualities, capabilities, and ways of being are you growing into?',
    inputType: 'textarea',
    placeholder: 'In 10 years, the person I want to be is someone who...',
    required: true,
  },
  {
    id: 'secret-value',
    section: 1,
    question: 'What do you secretly value that you\'re embarrassed to admit?',
    subtext: 'The things we hide often matter most. This is between you and your documents.',
    inputType: 'textarea',
    placeholder: 'What drives you that you rarely say out loud?',
  },
  {
    id: 'final-declaration',
    section: 1,
    question: 'If you could tell the world one thing about who you really are, what would it be?',
    subtext: 'Your closing statement. The thing that, if people understood it, would change how they see you.',
    inputType: 'textarea',
    placeholder: 'The one thing I want the world to know about me is...',
    required: true,
  },

  // ═══════════════════════════════════════════════════
  // SECTION 2: VOICE
  // "How you write — the patterns that make it yours"
  // ═══════════════════════════════════════════════════

  {
    id: 'voice-adjectives',
    section: 2,
    question: 'If you had to describe your writing voice in 3-5 adjectives, what would they be?',
    subtext: 'These core descriptors will anchor your entire voice profile.',
    considerations: [
      'Think about what others have said about your writing.',
      'Consider what makes your writing recognizably "you."',
    ],
    inputType: 'textarea',
    placeholder: 'e.g., direct, warm, analytical, witty, conversational...',
    required: true,
  },
  {
    id: 'content-types',
    section: 2,
    question: 'What types of content do you write most often?',
    subtext: 'Select all that apply. This helps us understand where your voice lives.',
    inputType: 'multiselect',
    options: [
      'Professional emails',
      'Blogs',
      'LinkedIn',
      'Newsletters',
      'Proposals & pitches',
      'Social media',
      'Creative writing',
      'Technical & educational',
      'Video & audio scripts',
      'Sales & marketing copy',
    ],
    required: true,
  },
  {
    id: 'writing-journey',
    section: 2,
    question: 'Tell us about your writing journey. How did you get here, and how has your voice evolved?',
    subtext: 'Your writing story helps us understand the depth and character of your voice.',
    inputType: 'textarea',
    placeholder: 'When I first started writing... over time my voice became...',
    required: true,
  },
  {
    id: 'writing-goals',
    section: 2,
    question: 'What do you want your writing to accomplish? What effect do you want on readers?',
    subtext: 'Purpose shapes every aspect of voice.',
    inputType: 'textarea',
    placeholder: 'I want my writing to make people feel/think/do...',
    required: true,
  },
  {
    id: 'sentence-style',
    section: 2,
    question: 'Describe your typical sentence structure. Short and punchy, or long and flowing?',
    subtext: 'Sentence rhythm is one of the most distinctive markers of voice.',
    inputType: 'textarea',
    placeholder: 'My sentences tend to be...',
    required: true,
  },
  {
    id: 'humor-role',
    section: 2,
    question: 'What role does humor play in your writing? What type?',
    subtext: 'Humor is highly personal and often defines voice.',
    considerations: [
      'Frequency: constant, occasional, or rare?',
      'Type: dry wit, self-deprecating, absurdist, sarcasm?',
    ],
    inputType: 'textarea',
    placeholder: 'Humor in my writing is...',
  },
  {
    id: 'opening-style',
    section: 2,
    question: 'How do you typically open a piece of writing?',
    subtext: 'Openings set expectations and often become recognizable patterns.',
    inputType: 'textarea',
    placeholder: 'I usually start with...',
    required: true,
  },
  {
    id: 'rules-broken',
    section: 2,
    question: 'What conventional writing rules do you break? What unconventional choices define your style?',
    subtext: 'Deliberate rule-breaking often creates distinctive voice.',
    inputType: 'textarea',
    placeholder: 'I deliberately break the rule about...',
  },
  {
    id: 'words-avoided',
    section: 2,
    question: 'What words, phrases, or patterns do you deliberately avoid?',
    subtext: 'What you reject is as important as what you embrace.',
    considerations: [
      'Clichés or overused phrases',
      'Common AI-sounding phrases (e.g., "dive in," "in conclusion")',
      'Tones or approaches that feel inauthentic to you',
    ],
    inputType: 'textarea',
    placeholder: 'I never use words like... I avoid the tone of...',
    required: true,
  },
  {
    id: 'metaphor-style',
    section: 2,
    question: 'How do you use metaphors, analogies, and figurative language?',
    subtext: 'Figurative language reveals how you see and explain the world.',
    inputType: 'textarea',
    placeholder: 'I tend to draw comparisons from...',
  },
  {
    id: 'voice-strengths',
    section: 2,
    question: 'What are your greatest writing strengths — and what would immediately make something NOT sound like you?',
    subtext: 'Knowing both sides ensures your voice is preserved and protected.',
    inputType: 'textarea',
    placeholder: 'My strengths are... It\'s NOT me when...',
    required: true,
  },
  {
    id: 'writing-sample',
    section: 2,
    question: 'Share a writing sample that represents your voice.',
    subtext: 'Upload a file or paste text. This is the single most valuable input for capturing your patterns.',
    inputType: 'file',
    acceptTypes: '.txt,.md,.doc,.docx,.pdf',
    isWritingSample: true,
  },

  // ═══════════════════════════════════════════════════
  // SECTION 3: STORIES
  // "The moments that shaped you"
  // ═══════════════════════════════════════════════════

  {
    id: 'life-genre',
    section: 3,
    question: 'If you had to describe your life as a genre, what would it be?',
    subtext: 'Don\'t overthink it. Go with what feels true right now.',
    inputType: 'select',
    options: ['Comedy', 'Drama', 'Adventure', 'Romance', 'Thriller', 'Coming-of-Age', 'Documentary', 'Sci-Fi', 'Tragedy', 'Musical'],
    required: true,
  },
  {
    id: 'real-intro',
    section: 3,
    question: 'If someone who really knows you was introducing you to a stranger, what would they say that a resume never would?',
    subtext: 'The stuff that actually matters about you.',
    inputType: 'textarea',
    placeholder: 'They\'d probably say...',
    required: true,
  },
  {
    id: 'smell-memory',
    section: 3,
    question: 'What smell takes you back somewhere instantly — and why does it stick?',
    subtext: 'Close your eyes for a second if you need to. Let it come to you.',
    inputType: 'textarea',
    placeholder: 'When I smell... it takes me back to... because...',
    required: true,
  },
  {
    id: 'replayed-moment',
    section: 3,
    question: 'What\'s a moment you\'ve replayed in your head more than any other — and what does it give you or cost you?',
    subtext: 'Happy, painful, confusing — doesn\'t matter. The one that keeps coming back.',
    inputType: 'textarea',
    placeholder: 'The moment I keep replaying...',
    required: true,
  },
  {
    id: 'place-like-home',
    section: 3,
    question: 'What\'s a place that felt like home — not because you lived there, but because of how it made you feel?',
    subtext: 'A city, a room, a bench, a stretch of road. Wherever belonging showed up.',
    inputType: 'textarea',
    placeholder: 'The place that felt like home...',
    required: true,
  },
  {
    id: 'grateful-failure',
    section: 3,
    question: 'What\'s something you failed at that you\'re secretly grateful for?',
    subtext: 'The failure that rerouted you somewhere better.',
    inputType: 'textarea',
    placeholder: 'I failed at... and I\'m grateful because...',
    required: true,
  },
  {
    id: 'crossroads',
    section: 3,
    question: 'What\'s a decision you almost didn\'t make that changed everything?',
    subtext: 'The fork in the road you almost missed.',
    inputType: 'textarea',
    placeholder: 'I almost didn\'t... and if I hadn\'t...',
    required: true,
  },
  {
    id: 'go-to-metaphor',
    section: 3,
    question: 'Do you have a go-to metaphor or analogy you reach for when explaining something?',
    subtext: 'The comparison you keep coming back to because it just works.',
    inputType: 'textarea',
    placeholder: 'I always compare things to...',
  },
  {
    id: 'adopted-quote',
    section: 3,
    question: 'Is there a quote, saying, or piece of advice you\'ve made your own?',
    subtext: 'Something someone else said first, but you\'ve lived into.',
    inputType: 'textarea',
    placeholder: 'The words I\'ve adopted...',
  },

  // ═══════════════════════════════════════════════════
  // SECTION 4: TIMELINE
  // "The arc of your life — where you've been and where you're headed"
  // ═══════════════════════════════════════════════════

  {
    id: 'life-chapters',
    section: 4,
    question: 'If you broke your life into chapters, what would they be called?',
    subtext: 'Give each chapter a name and a rough timeframe. Think of the major eras — the moves, the careers, the relationships, the reinventions.',
    considerations: [
      'Where did each chapter start and end?',
      'What defined each era?',
      'Which chapter are you in right now?',
    ],
    inputType: 'textarea',
    placeholder: 'Chapter 1: "The Setup" (1985-2005)... Chapter 2: "The Detour" (2005-2012)...',
    required: true,
  },
  {
    id: 'career-arc',
    section: 4,
    question: 'Walk through your professional timeline. Jobs, roles, pivots — the path that got you here.',
    subtext: 'Not a resume. The real version — including the detours, the dead ends, and the lucky breaks.',
    inputType: 'textarea',
    placeholder: 'I started in... then moved to... the pivot that changed everything was...',
    required: true,
  },
  {
    id: 'defining-year',
    section: 4,
    question: 'What single year changed the trajectory of your life?',
    subtext: 'The one you point to when someone asks "when did things shift?"',
    inputType: 'textarea',
    placeholder: 'The year was... and what happened was...',
    required: true,
  },
  {
    id: 'places-lived',
    section: 4,
    question: 'Where have you lived, and what did each place give you or take from you?',
    subtext: 'Geography shapes identity. The places you\'ve been aren\'t just backdrop — they\'re character development.',
    inputType: 'textarea',
    placeholder: 'I lived in... and it gave me... / took from me...',
    required: true,
  },
  {
    id: 'personal-milestones',
    section: 4,
    question: 'What are the personal milestones that matter most — the ones that aren\'t on any resume?',
    subtext: 'Marriages, kids, losses, moves, breakthroughs, breakdowns. The real markers.',
    inputType: 'textarea',
    placeholder: 'The milestones that shaped me most...',
    required: true,
  },
  {
    id: 'pattern-recognition',
    section: 4,
    question: 'Looking at your timeline, what pattern keeps repeating?',
    subtext: 'We all have recurring themes — cycles of building and leaving, seeking and finding, starting and stalling. Name yours.',
    inputType: 'textarea',
    placeholder: 'The pattern I keep seeing is...',
    required: true,
  },
  {
    id: 'current-chapter',
    section: 4,
    question: 'Describe the chapter you\'re in right now. What\'s it about, and how far into it are you?',
    subtext: 'The present chapter is the one your AI needs to understand most. Be specific about what you\'re navigating.',
    inputType: 'textarea',
    placeholder: 'Right now I\'m in the middle of...',
    required: true,
  },
  {
    id: 'next-chapter',
    section: 4,
    question: 'What does the next chapter look like? What are you building toward?',
    subtext: 'Not a wish list. The actual trajectory — where you\'re pointed and what has to happen to get there.',
    inputType: 'textarea',
    placeholder: 'The next chapter is about...',
    required: true,
  },
  {
    id: 'timeline-regret',
    section: 4,
    question: 'What\'s a period of your life you\'d do differently if you could — and what would you change?',
    subtext: 'Regret is data. It tells the AI what you\'ve learned and what you\'re compensating for now.',
    inputType: 'textarea',
    placeholder: 'If I could redo... I would...',
  },
  {
    id: 'legacy-snapshot',
    section: 4,
    question: 'If your timeline ended today, what would the headline be?',
    subtext: 'Not what you want it to be. What it actually is, right now, based on what you\'ve done.',
    inputType: 'textarea',
    placeholder: 'The headline would be...',
    required: true,
  },

  // ═══════════════════════════════════════════════════
  // SECTION 5: ROSTER
  // "The people who matter — relationships, roles, and how you connect"
  // ═══════════════════════════════════════════════════

  {
    id: 'inner-circle',
    section: 5,
    question: 'Who are the 5-7 people closest to you right now? Name them and describe your relationship in one line each.',
    subtext: 'Partner, family, best friends, business partners — the people who would notice if you disappeared for a week.',
    inputType: 'textarea',
    placeholder: '[Name] — [relationship, one line]...',
    required: true,
  },
  {
    id: 'professional-network',
    section: 5,
    question: 'Who are the key people in your professional world? Bosses, collaborators, mentors, clients — the ones who shape your work life.',
    subtext: 'Include reporting relationships, power dynamics, and how you feel about each connection.',
    inputType: 'textarea',
    placeholder: '[Name] — [role/relationship, dynamic]...',
    required: true,
  },
  {
    id: 'mentor-figures',
    section: 5,
    question: 'Who has mentored you — formally or informally — and what did each one give you?',
    subtext: 'Teachers, coaches, bosses, friends who saw something in you before you did.',
    inputType: 'textarea',
    placeholder: '[Name] taught me...',
    required: true,
  },
  {
    id: 'relationship-style',
    section: 5,
    question: 'How do you show up in relationships? What\'s your pattern — the good and the bad?',
    subtext: 'Are you the initiator or the responder? The planner or the spontaneous one? The one who holds on or the one who lets go?',
    inputType: 'textarea',
    placeholder: 'In relationships, I tend to...',
    required: true,
  },
  {
    id: 'difficult-relationship',
    section: 5,
    question: 'Who\'s a person in your life that challenges you — and what does the friction reveal about you?',
    subtext: 'Not enemies. The relationships that push your buttons because they mirror something true.',
    inputType: 'textarea',
    placeholder: 'The person who challenges me most is... because...',
  },
  {
    id: 'lost-connection',
    section: 5,
    question: 'Is there someone you\'ve lost touch with that you think about more than you\'d expect?',
    subtext: 'The connections that linger say something about what you value in people.',
    inputType: 'textarea',
    placeholder: 'I still think about... because...',
  },
  {
    id: 'communication-preferences',
    section: 5,
    question: 'How do you prefer to communicate with the people closest to you? And what drives you crazy?',
    subtext: 'Text vs. call vs. in-person. Quick hits vs. deep dives. Morning person vs. late-night texter. This shapes how your AI interacts about and with others.',
    inputType: 'textarea',
    placeholder: 'I prefer... What drives me crazy is...',
    required: true,
  },
  {
    id: 'people-energy',
    section: 5,
    question: 'Who gives you energy and who drains it — and do the people in your life know which category they\'re in?',
    subtext: 'This isn\'t about being judgmental. It\'s about giving your AI real context for how relationships affect you.',
    inputType: 'textarea',
    placeholder: 'Energy givers: ... Energy drains: ...',
    required: true,
  },
  {
    id: 'trust-builders',
    section: 5,
    question: 'What builds trust for you? And what breaks it instantly?',
    subtext: 'Everyone has a trust architecture. Yours shapes every relationship you maintain.',
    inputType: 'textarea',
    placeholder: 'I trust people who... I lose trust when...',
    required: true,
  },
  {
    id: 'roster-gap',
    section: 5,
    question: 'What kind of person is missing from your life right now?',
    subtext: 'A collaborator, a creative partner, a specific kind of friend, a mentor for the next chapter. Name the gap.',
    inputType: 'textarea',
    placeholder: 'The person I\'m missing is someone who...',
    required: true,
  },
  // ═══════════════════════════════════════════════════
  // SECTION 6: SITUATION (STATE OF THE UNION)
  // "Where you are right now — the living layer"
  // ═══════════════════════════════════════════════════

  {
    id: 'life-season',
    section: 6,
    question: 'What season of life are you in right now, and how does it feel?',
    subtext: 'Building, recovering, transitioning, coasting, grinding, blooming — name it honestly. AI can\'t help you navigate a situation it doesn\'t understand.',
    inputType: 'textarea',
    placeholder: 'Right now I\'m in the middle of...',
    required: true,
  },
  {
    id: 'active-roles',
    section: 6,
    question: 'What roles are you currently juggling? List every hat you wear — professional, personal, all of it.',
    subtext: 'Parent, founder, employee, caretaker, student, partner, freelancer. The real list, not the tidy one.',
    inputType: 'textarea',
    placeholder: 'The hats I\'m wearing right now...',
    required: true,
  },
  {
    id: 'top-priorities',
    section: 6,
    question: 'What are your top 3-5 priorities right now — the things that actually get your time and attention?',
    subtext: 'Not what you wish your priorities were. What are you actually spending your days on?',
    considerations: [
      'What gets your first hours of the day?',
      'What do you check on constantly?',
      'What would cause a crisis if you dropped it?',
    ],
    inputType: 'textarea',
    placeholder: 'Right now, the things that actually get my time are...',
    required: true,
  },
  {
    id: 'active-challenges',
    section: 6,
    question: 'What\'s the hardest thing you\'re dealing with right now?',
    subtext: 'The thing that keeps showing up. The problem you\'re actively trying to solve — or avoid.',
    inputType: 'textarea',
    placeholder: 'The hardest thing I\'m navigating is...',
    required: true,
  },
  {
    id: 'constraints',
    section: 6,
    question: 'What are your current constraints? Money, time, geography, health, obligations — what\'s limiting your options?',
    subtext: 'Constraints aren\'t excuses. They\'re the real boundaries your AI needs to work within.',
    inputType: 'textarea',
    placeholder: 'Right now I\'m limited by...',
    required: true,
  },
  {
    id: 'pending-decisions',
    section: 6,
    question: 'What decisions are you sitting on right now — the ones you haven\'t made yet but know you need to?',
    subtext: 'The stuff that lives in the back of your mind. Career moves, relationship shifts, financial calls, geographic changes.',
    inputType: 'textarea',
    placeholder: 'The decisions I\'m avoiding or still working through...',
    required: true,
  },
  {
    id: 'whats-working',
    section: 6,
    question: 'What\'s actually working in your life right now? Where do you have momentum?',
    subtext: 'We focus on problems, but knowing your strengths right now is just as important for AI context.',
    inputType: 'textarea',
    placeholder: 'What\'s working well right now...',
    required: true,
  },
  {
    id: 'whats-not-working',
    section: 6,
    question: 'What\'s not working — the thing you keep tolerating or trying to fix?',
    subtext: 'Be specific. "My job" isn\'t enough. What about it? What\'s the friction?',
    inputType: 'textarea',
    placeholder: 'What\'s not working is...',
    required: true,
  },
  {
    id: 'six-month-target',
    section: 6,
    question: 'If you could change one thing about your situation in the next six months, what would it be?',
    subtext: 'Not a wish. A target. Something you could actually move toward starting this week.',
    inputType: 'textarea',
    placeholder: 'In six months, I want to have...',
    required: true,
  },
  {
    id: 'unsaid-truth',
    section: 6,
    question: 'What\'s a truth about your current situation that you haven\'t said out loud yet?',
    subtext: 'The thing you know but haven\'t admitted — to yourself or anyone else. This is between you and your document.',
    inputType: 'textarea',
    placeholder: 'The thing I haven\'t said yet is...',
  },
]

/** Get questions for a specific section */
export function getQuestionsForSection(section: number): WizardQuestion[] {
  return QUESTIONS.filter((q) => q.section === section)
}

/** Get visible questions based on current answers (handles showWhen) */
export function getVisibleQuestions(
  questions: WizardQuestion[],
  answers: Record<string, string | string[]>
): WizardQuestion[] {
  return questions.filter((q) => {
    if (!q.showWhen) return true
    const depAnswer = answers[q.showWhen.questionId]
    if (!depAnswer) return false
    if (Array.isArray(depAnswer)) {
      return q.showWhen.includesAny.some((v) => depAnswer.includes(v))
    }
    return q.showWhen.includesAny.includes(depAnswer as string)
  })
}

/** Total questions per section (for progress display) */
export const SECTION_QUESTION_COUNTS = {
  0: QUESTIONS.filter((q) => q.section === 0).length,
  1: QUESTIONS.filter((q) => q.section === 1).length,
  2: QUESTIONS.filter((q) => q.section === 2).length,
  3: QUESTIONS.filter((q) => q.section === 3).length,
  4: QUESTIONS.filter((q) => q.section === 4).length,
  5: QUESTIONS.filter((q) => q.section === 5).length,
  6: QUESTIONS.filter((q) => q.section === 6).length,
}
