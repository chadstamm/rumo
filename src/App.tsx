import { useState } from 'react';

type View = 'home' | 'synthesis' | 'chat' | 'setup';

const App = () => {
  const [view, setView] = useState<View>('home');
  const [hasChiefOfStaff, setHasChiefOfStaff] = useState(false);

  if (view === 'synthesis') {
    return <SynthesisView onBack={() => setView('home')} />;
  }

  if (view === 'chat') {
    return <ChatView onBack={() => setView('home')} />;
  }

  if (view === 'setup') {
    return <SetupView onComplete={() => { setHasChiefOfStaff(true); setView('home'); }} />;
  }

  // Show intro/setup flow for new users
  if (!hasChiefOfStaff) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="max-w-xl w-full">

          {/* Compass element - subtle nautical reference */}
          <div className="flex justify-center mb-12">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-neutral-200">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M24 6V10M24 38V42M6 24H10M38 24H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M24 16L27 24L24 32L21 24L24 16Z" fill="currentColor"/>
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl tracking-[0.25em] font-light text-neutral-900 text-center mb-4">
            RUMO
          </h1>

          <p className="text-lg text-neutral-400 text-center mb-20 tracking-wide">
            A personal navigation system
          </p>

          <div className="space-y-8 mb-20">
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
              You don't need to optimize your life.
            </p>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
              You need a clearer sense of direction.
            </p>
            <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed">
              RUMO helps you pause, reflect, and orient yourself before deciding what comes next.
            </p>
          </div>

          {/* Thin horizon line - nautical element */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-16" />

          <div className="text-center">
            <p className="text-sm text-neutral-400 mb-6">
              Begin by meeting your Chief of Staff
            </p>

            <button
              onClick={() => setView('setup')}
              className="text-xl text-neutral-900 font-medium py-4 px-12 border border-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main view for returning users
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-xl w-full">

        {/* Compass element */}
        <div className="flex justify-center mb-8">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-neutral-300">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M24 6V10M24 38V42M6 24H10M38 24H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M24 16L27 24L24 32L21 24L24 16Z" fill="currentColor"/>
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl tracking-[0.25em] font-light text-neutral-900 text-center mb-16">
          RUMO
        </h1>

        <div className="space-y-6 mb-16">
          <button
            onClick={() => setView('synthesis')}
            className="w-full py-5 text-lg text-neutral-900 font-medium border border-neutral-200 transition-all duration-300 hover:border-neutral-900"
          >
            Start today's synthesis
          </button>

          <button
            onClick={() => setView('chat')}
            className="w-full py-5 text-lg text-neutral-500 transition-all duration-300 hover:text-neutral-900"
          >
            Think things through
          </button>
        </div>

        {/* Thin line */}
        <div className="w-full h-px bg-neutral-100 mb-8" />

        <button
          onClick={() => setView('setup')}
          className="w-full text-sm text-neutral-300 transition-opacity duration-300 hover:opacity-60"
        >
          Reconfigure your Chief of Staff
        </button>
      </div>
    </div>
  );
};

const SynthesisView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-xl w-full">
        <button
          onClick={onBack}
          className="text-sm text-neutral-300 mb-20 transition-opacity duration-300 hover:opacity-60"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-light text-neutral-900 mb-8 tracking-wide">
          Today's synthesis
        </h2>

        <p className="text-lg text-neutral-500 leading-relaxed mb-12">
          This is where your daily reflection will live. A guided conversation to help you orient your day.
        </p>

        <div className="w-16 h-px bg-neutral-200 mb-8" />

        <p className="text-sm text-neutral-300">
          Coming soon
        </p>
      </div>
    </div>
  );
};

const ChatView = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: "What's on your mind?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "I hear you. Let's think through this together. What feels most important about this right now?"
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-8 py-10">
        <button
          onClick={onBack}
          className="text-sm text-neutral-300 transition-opacity duration-300 hover:opacity-60"
        >
          ← Back
        </button>
      </div>

      <div className="flex-1 px-8 pb-8 overflow-y-auto">
        <div className="max-w-xl mx-auto space-y-10">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'text-right' : ''}>
              <p className={`inline-block text-left text-lg leading-relaxed ${
                msg.role === 'user'
                  ? 'text-neutral-900'
                  : 'text-neutral-500'
              }`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 py-10 border-t border-neutral-100">
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type here..."
            className="w-full text-lg bg-transparent text-neutral-900 placeholder-neutral-300 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

const SetupView = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "How would you like your Chief of Staff to communicate with you?",
      options: ["Direct and concise", "Warm and supportive", "Thoughtful and reflective", "Challenging and honest"]
    },
    {
      question: "What matters most to you right now?",
      options: ["Finding clarity", "Building momentum", "Restoring balance", "Making a decision"]
    },
    {
      question: "How do you prefer to work through problems?",
      options: ["Talk it out", "Write it down", "See the big picture first", "Start with small steps"]
    }
  ];

  const handleSelect = (option: string) => {
    setAnswers([...answers, option]);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-xl w-full">

        {/* Progress indicator */}
        <div className="flex gap-2 mb-20">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                i <= step ? 'bg-neutral-900' : 'bg-neutral-100'
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-neutral-400 mb-4">
          Question {step + 1} of {questions.length}
        </p>

        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-16 leading-relaxed">
          {questions[step].question}
        </h2>

        <div className="space-y-4">
          {questions[step].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              className="w-full py-5 px-6 text-left text-lg text-neutral-600 border border-neutral-100 transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
