import { useState } from 'react';

type View = 'landing' | 'intro' | 'setup' | 'home' | 'synthesis' | 'chat';

interface COSProfile {
  communication: string;
  focus: string;
  approach: string;
}

const App = () => {
  const [view, setView] = useState<View>('landing');
  const [cosProfile, setCosProfile] = useState<COSProfile | null>(null);

  const handleSetupComplete = (profile: COSProfile) => {
    setCosProfile(profile);
    setView('home');
  };

  if (view === 'landing') {
    return <LandingView onContinue={() => setView('intro')} hasProfile={!!cosProfile} onSkip={() => setView('home')} />;
  }

  if (view === 'intro') {
    return <IntroView onContinue={() => setView('setup')} />;
  }

  if (view === 'setup') {
    return <SetupView onComplete={handleSetupComplete} />;
  }

  if (view === 'synthesis') {
    return <SynthesisView onBack={() => setView('home')} />;
  }

  if (view === 'chat') {
    return <ChatView onBack={() => setView('home')} profile={cosProfile} />;
  }

  return <HomeView
    onSynthesis={() => setView('synthesis')}
    onChat={() => setView('chat')}
    onReconfigure={() => setView('setup')}
  />;
};

// ============================================
// LANDING - The first impression
// ============================================
const LandingView = ({ onContinue, hasProfile, onSkip }: { onContinue: () => void; hasProfile: boolean; onSkip: () => void }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="max-w-3xl w-full">

          {/* Compass mark */}
          <div className="mb-16">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-neutral-600">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1"/>
              <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <path d="M16 10L18 16L16 22L14 16L16 10Z" fill="currentColor"/>
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
            Your calendar is full.<br/>
            <span className="text-neutral-500">Your direction isn't clear.</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-16 max-w-2xl">
            Most tools help you do more. RUMO helps you figure out what actually matters—then do that.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-white text-neutral-950 text-lg font-medium transition-all duration-300 hover:bg-neutral-200"
            >
              {hasProfile ? 'Start fresh' : 'Begin'}
            </button>

            {hasProfile && (
              <button
                onClick={onSkip}
                className="px-8 py-4 text-neutral-400 text-lg transition-all duration-300 hover:text-white"
              >
                Continue where I left off
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="px-8 py-8 border-t border-neutral-900">
        <p className="text-sm text-neutral-600 tracking-wide">
          RUMO — A personal navigation system
        </p>
      </div>
    </div>
  );
};

// ============================================
// INTRO - Explain the Chief of Staff concept
// ============================================
const IntroView = ({ onContinue }: { onContinue: () => void }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Meet your Chief of Staff",
      content: "In business, a Chief of Staff helps leaders cut through noise, hold the big picture, and make better decisions. RUMO gives you the same advantage—powered by AI, shaped by you."
    },
    {
      title: "Not another assistant",
      content: "Your COS won't manage your calendar or send emails. Instead, they'll help you think clearly, question your assumptions, and stay aligned with what you actually care about."
    },
    {
      title: "Built around you",
      content: "Every person navigates differently. In a moment, you'll answer a few questions so your COS can match your style—direct or supportive, challenging or reflective."
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onContinue();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-2xl w-full">

        {/* Progress dots */}
        <div className="flex gap-2 mb-20">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === step ? 'bg-neutral-900' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-8 leading-tight">
          {slides[step].title}
        </h2>

        <p className="text-xl text-neutral-600 leading-relaxed mb-16">
          {slides[step].content}
        </p>

        <button
          onClick={handleNext}
          className="px-8 py-4 bg-neutral-900 text-white text-lg font-medium transition-all duration-300 hover:bg-neutral-800"
        >
          {step < slides.length - 1 ? 'Continue' : 'Set up my Chief of Staff'}
        </button>
      </div>
    </div>
  );
};

// ============================================
// SETUP - Configure the Chief of Staff
// ============================================
const SetupView = ({ onComplete }: { onComplete: (profile: COSProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "When you need to think through something important, what helps most?",
      subtext: "This shapes how your COS will engage with you.",
      options: [
        { label: "Someone who listens and asks good questions", value: "reflective" },
        { label: "Someone who challenges my thinking directly", value: "challenging" },
        { label: "Someone who helps me see the bigger picture", value: "strategic" },
        { label: "Someone who keeps things practical and actionable", value: "pragmatic" }
      ]
    },
    {
      question: "What's pulling at your attention most right now?",
      subtext: "Your COS will help you navigate from here.",
      options: [
        { label: "I'm at a crossroads and need to make a decision", value: "decision" },
        { label: "I'm spread too thin and losing focus", value: "focus" },
        { label: "I'm successful but wondering if I'm on the right path", value: "meaning" },
        { label: "I want to grow but I'm not sure what's next", value: "growth" }
      ]
    },
    {
      question: "How do you prefer to receive guidance?",
      subtext: "This sets the tone for your conversations.",
      options: [
        { label: "Warm and encouraging—I respond to support", value: "warm" },
        { label: "Direct and honest—don't sugarcoat it", value: "direct" },
        { label: "Thoughtful and measured—give me space to process", value: "thoughtful" },
        { label: "Energizing and forward-moving—keep momentum high", value: "energizing" }
      ]
    }
  ];

  const handleSelect = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        communication: newAnswers[2],
        focus: newAnswers[1],
        approach: newAnswers[0]
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-8 py-16">
      <div className="max-w-2xl w-full">

        {/* Progress bar */}
        <div className="flex gap-1 mb-16">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 transition-colors duration-500 ${
                i <= step ? 'bg-neutral-900' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-neutral-400 mb-6 uppercase tracking-wider">
          Question {step + 1} of {questions.length}
        </p>

        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4 leading-relaxed">
          {questions[step].question}
        </h2>

        <p className="text-neutral-500 mb-12">
          {questions[step].subtext}
        </p>

        <div className="space-y-3">
          {questions[step].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option.value)}
              className="w-full py-5 px-6 text-left text-lg text-neutral-700 bg-white border border-neutral-200 transition-all duration-300 hover:border-neutral-900 hover:shadow-sm"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// HOME - The daily starting point
// ============================================
const HomeView = ({ onSynthesis, onChat, onReconfigure }: {
  onSynthesis: () => void;
  onChat: () => void;
  onReconfigure: () => void;
}) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-xl w-full text-center">

        {/* Compass */}
        <div className="flex justify-center mb-8">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-neutral-300">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M24 6V12M24 36V42M6 24H12M36 24H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M24 14L28 24L24 34L20 24L24 14Z" fill="currentColor"/>
          </svg>
        </div>

        <p className="text-neutral-400 mb-2">{greeting}</p>

        <h1 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-wide mb-16">
          RUMO
        </h1>

        <div className="space-y-4 mb-16">
          <button
            onClick={onSynthesis}
            className="w-full py-5 text-lg font-medium text-white bg-neutral-900 transition-all duration-300 hover:bg-neutral-800"
          >
            Start today's synthesis
          </button>

          <p className="text-sm text-neutral-400 mb-4">
            A guided reflection to orient your day
          </p>

          <button
            onClick={onChat}
            className="w-full py-5 text-lg text-neutral-700 border border-neutral-200 transition-all duration-300 hover:border-neutral-900"
          >
            Talk with your Chief of Staff
          </button>

          <p className="text-sm text-neutral-400">
            Think through something specific
          </p>
        </div>

        <div className="pt-8 border-t border-neutral-100">
          <button
            onClick={onReconfigure}
            className="text-sm text-neutral-300 transition-colors duration-300 hover:text-neutral-500"
          >
            Reconfigure Chief of Staff
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SYNTHESIS - Daily reflection (placeholder)
// ============================================
const SynthesisView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-2xl w-full">
        <button
          onClick={onBack}
          className="text-sm text-neutral-400 mb-16 transition-colors duration-300 hover:text-neutral-900"
        >
          ← Back
        </button>

        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">
          Today's Synthesis
        </h2>

        <p className="text-xl text-neutral-500 leading-relaxed mb-8">
          Your daily synthesis is a guided conversation to help you step back, see clearly, and decide what matters today.
        </p>

        <div className="w-16 h-px bg-neutral-200 mb-8" />

        <p className="text-neutral-400 mb-8">
          This feature is coming soon. For now, use the chat to talk through your day with your Chief of Staff.
        </p>

        <button
          onClick={onBack}
          className="px-6 py-3 text-neutral-900 border border-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

// ============================================
// CHAT - Conversation with COS
// ============================================
const ChatView = ({ onBack, profile }: { onBack: () => void; profile: COSProfile | null }) => {
  const getOpeningMessage = () => {
    if (!profile) return "What's on your mind?";

    const openers: Record<string, string> = {
      decision: "You mentioned you're at a crossroads. What's the decision you're wrestling with?",
      focus: "It sounds like things have been scattered lately. What's one thing that, if you focused on it, might settle everything else?",
      meaning: "Success without meaning is exhausting. What's making you question your path right now?",
      growth: "Growth requires knowing where you want to go. What does 'next' look like for you?"
    };

    return openers[profile.focus] || "What's on your mind today?";
  };

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: getOpeningMessage() }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    // Simulated thoughtful response
    setTimeout(() => {
      const responses = [
        "That's worth sitting with. What feels most true about that when you say it out loud?",
        "I notice you said that with some weight. What's underneath it?",
        "Let's slow down there. If you had to name what's actually at stake, what would it be?",
        "That's clearer than you might think. What would change if you fully committed to that?",
        "There's something important in that. What's the part you haven't said yet?"
      ];
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="px-8 py-6 bg-white border-b border-neutral-100">
        <button
          onClick={onBack}
          className="text-sm text-neutral-400 transition-colors duration-300 hover:text-neutral-900"
        >
          ← Back to RUMO
        </button>
      </div>

      <div className="flex-1 px-8 py-12 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'text-right' : ''}>
              <p className={`inline-block text-left text-lg leading-relaxed max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-neutral-900 text-white px-6 py-4'
                  : 'text-neutral-700'
              }`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 bg-white border-t border-neutral-100">
        <div className="max-w-2xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your thoughts..."
            className="flex-1 text-lg bg-transparent text-neutral-900 placeholder-neutral-400 outline-none"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-neutral-900 text-white text-sm font-medium transition-all duration-300 hover:bg-neutral-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
