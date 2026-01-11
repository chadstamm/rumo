import { useState } from 'react';

type View = 'landing' | 'about' | 'setup' | 'home' | 'synthesis' | 'chat';

interface COSProfile {
  style: string;
  focus: string;
  tone: string;
}

const App = () => {
  const [view, setView] = useState<View>('landing');
  const [cosProfile, setCosProfile] = useState<COSProfile | null>(null);

  const handleSetupComplete = (profile: COSProfile) => {
    setCosProfile(profile);
    setView('home');
  };

  if (view === 'landing') {
    return <LandingView onContinue={() => setView('about')} hasProfile={!!cosProfile} onSkip={() => setView('home')} />;
  }

  if (view === 'about') {
    return <AboutView onContinue={() => setView('setup')} />;
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
// LANDING
// ============================================
const LandingView = ({ onContinue, hasProfile, onSkip }: { onContinue: () => void; hasProfile: boolean; onSkip: () => void }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between px-8 py-12">
      <div />

      <div className="max-w-2xl">
        <p className="text-sm text-neutral-500 tracking-wide mb-12">RUMO</p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-8">
          Most people aren't overwhelmed.<br />
          <span className="text-neutral-500">They're misaligned.</span>
        </h1>

        <p className="text-lg text-neutral-400 leading-relaxed mb-16 max-w-lg">
          RUMO is a personal navigation system. It helps you see where you stand, what matters now, and what direction makes sense next.
        </p>

        <div className="flex gap-6">
          <button
            onClick={onContinue}
            className="text-white text-lg transition-opacity duration-300 hover:opacity-60"
          >
            Begin
          </button>

          {hasProfile && (
            <button
              onClick={onSkip}
              className="text-neutral-500 text-lg transition-opacity duration-300 hover:opacity-60"
            >
              Continue
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-neutral-700">
        A personal navigation system
      </p>
    </div>
  );
};

// ============================================
// ABOUT
// ============================================
const AboutView = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center px-8">
      <div className="max-w-xl">
        <p className="text-sm text-neutral-400 mb-12">About</p>

        <div className="space-y-6 text-lg text-neutral-700 leading-relaxed mb-16">
          <p>
            RUMO pairs you with a Chief of Staff—an AI configured to match how you think.
          </p>
          <p>
            It won't manage tasks or send reminders. It helps you maintain orientation when things get noisy.
          </p>
          <p>
            You'll answer three questions to set it up.
          </p>
        </div>

        <button
          onClick={onContinue}
          className="text-neutral-900 text-lg transition-opacity duration-300 hover:opacity-60"
        >
          Set up
        </button>
      </div>
    </div>
  );
};

// ============================================
// SETUP
// ============================================
const SetupView = ({ onComplete }: { onComplete: (profile: COSProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "How do you prefer to think through problems?",
      options: [
        { label: "By talking them through", value: "verbal" },
        { label: "By writing them down", value: "written" },
        { label: "By seeing the full picture first", value: "visual" },
        { label: "By breaking them into steps", value: "sequential" }
      ]
    },
    {
      question: "What's most useful when you're stuck?",
      options: [
        { label: "Good questions", value: "questions" },
        { label: "Direct feedback", value: "direct" },
        { label: "Space to process", value: "space" },
        { label: "A clearer frame", value: "reframe" }
      ]
    },
    {
      question: "What tone works best for you?",
      options: [
        { label: "Warm", value: "warm" },
        { label: "Direct", value: "direct" },
        { label: "Measured", value: "measured" },
        { label: "Neutral", value: "neutral" }
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
        style: newAnswers[0],
        focus: newAnswers[1],
        tone: newAnswers[2]
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center px-8 py-16">
      <div className="max-w-xl w-full">
        <p className="text-sm text-neutral-400 mb-16">
          {step + 1} / {questions.length}
        </p>

        <h2 className="text-2xl font-light text-neutral-900 mb-12">
          {questions[step].question}
        </h2>

        <div className="space-y-2">
          {questions[step].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option.value)}
              className="w-full py-4 px-5 text-left text-neutral-700 bg-white border border-neutral-200 transition-all duration-200 hover:border-neutral-400"
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
// HOME
// ============================================
const HomeView = ({ onSynthesis, onChat, onReconfigure }: {
  onSynthesis: () => void;
  onChat: () => void;
  onReconfigure: () => void;
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-md w-full">
        <p className="text-sm text-neutral-400 mb-2">RUMO</p>
        <div className="w-8 h-px bg-neutral-200 mb-16" />

        <div className="space-y-6 mb-20">
          <button
            onClick={onSynthesis}
            className="w-full py-4 text-left text-lg text-neutral-900 border-b border-neutral-100 transition-opacity duration-200 hover:opacity-60"
          >
            Daily orientation
          </button>

          <button
            onClick={onChat}
            className="w-full py-4 text-left text-lg text-neutral-600 border-b border-neutral-100 transition-opacity duration-200 hover:opacity-60"
          >
            Talk with Chief of Staff
          </button>
        </div>

        <button
          onClick={onReconfigure}
          className="text-sm text-neutral-300 transition-opacity duration-200 hover:opacity-60"
        >
          Adjust settings
        </button>
      </div>
    </div>
  );
};

// ============================================
// SYNTHESIS
// ============================================
const SynthesisView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center px-8">
      <div className="max-w-xl">
        <button
          onClick={onBack}
          className="text-sm text-neutral-400 mb-16 transition-opacity duration-200 hover:opacity-60"
        >
          Back
        </button>

        <p className="text-sm text-neutral-400 mb-4">Daily orientation</p>

        <p className="text-lg text-neutral-600 leading-relaxed mb-12">
          A structured review to help you see where you stand and decide what matters today.
        </p>

        <p className="text-neutral-400">
          Available soon.
        </p>
      </div>
    </div>
  );
};

// ============================================
// CHAT
// ============================================
const ChatView = ({ onBack, profile }: { onBack: () => void; profile: COSProfile | null }) => {
  const getOpening = () => {
    if (!profile) return "What's on your mind?";
    return "What would be useful to think through?";
  };

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'cos'; text: string }>>([
    { role: 'cos', text: getOpening() }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
      const responses = [
        "What's the core tension there?",
        "What would clarity look like?",
        "What's actually at stake?",
        "What are you not saying?",
        "Where's the misalignment?"
      ];
      setMessages(prev => [...prev, {
        role: 'cos',
        text: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-8 py-6 border-b border-neutral-100">
        <button
          onClick={onBack}
          className="text-sm text-neutral-400 transition-opacity duration-200 hover:opacity-60"
        >
          Back
        </button>
      </div>

      <div className="flex-1 px-8 py-10 overflow-y-auto">
        <div className="max-w-xl space-y-8">
          {messages.map((msg, i) => (
            <div key={i}>
              <p className={`text-lg leading-relaxed ${
                msg.role === 'user' ? 'text-neutral-900' : 'text-neutral-500'
              }`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 border-t border-neutral-100">
        <div className="max-w-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder=""
            className="w-full text-lg bg-transparent text-neutral-900 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
