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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        <h1 className="text-2xl tracking-[0.2em] font-medium text-neutral-900 mb-3">
          RUMO
        </h1>

        <p className="text-sm text-neutral-400 mb-16">
          A personal navigation system
        </p>

        <div className="space-y-6 text-left mb-20">
          <p className="text-neutral-600 leading-relaxed">
            You don't need to optimize your life.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            You need a clearer sense of direction.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            RUMO helps you pause, reflect, and orient yourself
            before deciding what comes next.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setView('synthesis')}
            className="w-full py-4 text-neutral-900 font-medium transition-opacity duration-300 hover:opacity-60"
          >
            Start today's synthesis
          </button>

          <p className="text-xs text-neutral-300 -mt-1 mb-2">
            Run your daily reflection
          </p>

          <button
            onClick={() => setView('chat')}
            className="w-full py-4 text-neutral-500 transition-opacity duration-300 hover:opacity-60"
          >
            Think things through
          </button>

          <p className="text-xs text-neutral-300 -mt-1">
            Talk with your Chief of Staff
          </p>
        </div>

        <button
          onClick={() => setView('setup')}
          className="mt-16 text-xs text-neutral-300 transition-opacity duration-300 hover:opacity-60"
        >
          {hasChiefOfStaff ? 'Reconfigure your Chief of Staff' : 'Set up your Chief of Staff'}
        </button>
      </div>
    </div>
  );
};

const SynthesisView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <button
          onClick={onBack}
          className="text-xs text-neutral-300 mb-16 transition-opacity duration-300 hover:opacity-60"
        >
          Back
        </button>

        <h2 className="text-lg font-medium text-neutral-900 mb-8">
          Today's synthesis
        </h2>

        <p className="text-neutral-500 leading-relaxed mb-12">
          This is where your daily reflection will live.
          A guided conversation to help you orient your day.
        </p>

        <p className="text-xs text-neutral-300">
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

    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "I hear you. Let's think through this together. What feels most important about this right now?"
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 py-8">
        <button
          onClick={onBack}
          className="text-xs text-neutral-300 transition-opacity duration-300 hover:opacity-60"
        >
          Back
        </button>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'text-right' : ''}>
              <p className={`inline-block text-left leading-relaxed ${
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

      <div className="px-6 py-8 border-t border-neutral-100">
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type here..."
            className="w-full bg-transparent text-neutral-900 placeholder-neutral-300 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

const SetupView = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  const questions = [
    {
      question: "How would you like your Chief of Staff to communicate?",
      options: ["Direct and concise", "Warm and supportive", "Thoughtful and reflective", "Challenging and honest"]
    },
    {
      question: "What matters most to you right now?",
      options: ["Finding clarity", "Building momentum", "Restoring balance", "Making a decision"]
    },
    {
      question: "How do you prefer to think through problems?",
      options: ["Talk it out", "Write it down", "See the big picture first", "Start with small steps"]
    }
  ];

  const handleSelect = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <p className="text-xs text-neutral-300 mb-16">
          {step + 1} of {questions.length}
        </p>

        <h2 className="text-lg font-medium text-neutral-900 mb-12 leading-relaxed">
          {questions[step].question}
        </h2>

        <div className="space-y-3">
          {questions[step].options.map((option, i) => (
            <button
              key={i}
              onClick={handleSelect}
              className="w-full py-4 text-left text-neutral-500 transition-opacity duration-300 hover:opacity-60"
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
