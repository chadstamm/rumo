import { useState, useEffect, useRef } from 'react';

type View = 'landing' | 'setup' | 'dashboard' | 'waves' | 'sweats' | 'synthesis' | 'settings';

interface COSProfile {
  style: string;
  focus: string;
  tone: string;
}

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
  wave: string;
}

const WAVES = [
  { id: 'whole', name: 'Whole', desc: 'Integration of all parts of life' },
  { id: 'accomplished', name: 'Accomplished', desc: 'Meaningful achievement and progress' },
  { id: 'vital', name: 'Vital', desc: 'Physical energy and health' },
  { id: 'expressive', name: 'Expressive', desc: 'Creative output and authentic voice' },
  { id: 'satisfied', name: 'Satisfied', desc: 'Contentment and inner alignment' },
];

const SWEATS = [
  { id: 'synthesis', code: 'S', name: 'Synthesis', desc: 'Morning orientation with your Chief of Staff' },
  { id: 'work', code: 'W', name: 'Work', desc: 'Professional contribution and advancement' },
  { id: 'energy', code: 'E', name: 'Energy', desc: 'Physical movement and restoration' },
  { id: 'art', code: 'A', name: 'Art', desc: 'Creative practice and expression' },
  { id: 'ties', code: 'T', name: 'Ties', desc: 'Relationships and connection' },
  { id: 'service', code: 'S', name: 'Service', desc: 'Contribution beyond yourself' },
];

const App = () => {
  const [view, setView] = useState<View>('landing');
  const [cosProfile, setCosProfile] = useState<COSProfile | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [waveScores] = useState<Record<string, number>>({
    whole: 65, accomplished: 72, vital: 58, expressive: 45, satisfied: 70,
  });

  const handleSetupComplete = (profile: COSProfile) => {
    setCosProfile(profile);
    setView('dashboard');
  };

  if (view === 'landing') {
    return <LandingView
      onSetup={() => setView('setup')}
      onContinue={() => setView('dashboard')}
      hasProfile={!!cosProfile}
    />;
  }

  if (view === 'setup') {
    return <SetupView onComplete={handleSetupComplete} />;
  }

  return (
    <div className="flex h-screen bg-stone-50">
      <aside className="w-52 bg-stone-900 text-white flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <p className="text-base font-medium tracking-widest text-stone-300">RUMO</p>
        </div>

        <nav className="flex-1 py-4">
          <NavItem active={view === 'dashboard'} onClick={() => setView('dashboard')} label="Overview" />
          <NavItem active={view === 'synthesis'} onClick={() => setView('synthesis')} label="Synthesis" />
          <NavItem active={view === 'waves'} onClick={() => setView('waves')} label="WAVES" />
          <NavItem active={view === 'sweats'} onClick={() => setView('sweats')} label="SWEATS" />
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button
            onClick={() => setView('settings')}
            className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
          >
            Settings
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {view === 'dashboard' && (
          <DashboardView
            waveScores={waveScores}
            tasks={tasks}
            onStartSynthesis={() => setView('synthesis')}
            hasProfile={!!cosProfile}
            onSetup={() => setView('setup')}
          />
        )}
        {view === 'synthesis' && <SynthesisView profile={cosProfile} />}
        {view === 'waves' && <WavesView scores={waveScores} />}
        {view === 'sweats' && <SweatsView tasks={tasks} setTasks={setTasks} />}
        {view === 'settings' && <SettingsView onReconfigure={() => setView('setup')} />}
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-6 py-3 text-sm transition-all duration-200 ${
      active
        ? 'text-white bg-stone-800 border-l-2 border-amber-500'
        : 'text-stone-400 hover:text-white hover:bg-stone-800/50 border-l-2 border-transparent'
    }`}
  >
    {label}
  </button>
);

// ============================================
// LANDING - StoryBrand Structure
// ============================================
const LandingView = ({ onSetup, onContinue, hasProfile }: {
  onSetup: () => void;
  onContinue: () => void;
  hasProfile: boolean;
}) => (
  <div className="min-h-screen bg-stone-900 text-white">
    {/* Hero - The Problem */}
    <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/10 to-transparent" />

      <div className="max-w-3xl relative">
        <p className="text-amber-500 text-sm tracking-widest mb-8">RUMO</p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8 text-stone-100">
          You're moving fast.<br />
          <span className="text-stone-500">But toward what?</span>
        </h1>

        <p className="text-xl text-stone-400 leading-relaxed max-w-xl mb-12">
          Without direction, motion becomes noise. RUMO helps you find your heading—then gives you a system to stay on course.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onSetup}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors duration-200"
          >
            {hasProfile ? 'Reconfigure' : 'Get oriented'}
          </button>

          {hasProfile && (
            <button
              onClick={onContinue}
              className="px-8 py-4 text-stone-400 hover:text-white transition-colors duration-200"
            >
              Continue
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone-700 to-transparent" />
      </div>
    </div>

    {/* The Guide - RUMO as helper */}
    <div className="px-8 md:px-16 lg:px-24 py-24 border-t border-stone-800">
      <div className="max-w-4xl">
        <p className="text-amber-500 text-sm tracking-widest mb-6">THE GUIDE</p>
        <h2 className="text-3xl font-light text-stone-200 mb-8">
          Your Chief of Staff
        </h2>
        <p className="text-lg text-stone-400 leading-relaxed max-w-2xl mb-8">
          An AI configured to how you think. Available each morning to help you cut through noise, see what matters, and orient your day. Not an assistant—a thinking partner.
        </p>
      </div>
    </div>

    {/* The Plan */}
    <div className="px-8 md:px-16 lg:px-24 py-24 bg-stone-950">
      <div className="max-w-5xl">
        <p className="text-amber-500 text-sm tracking-widest mb-6">THE PLAN</p>
        <h2 className="text-3xl font-light text-stone-200 mb-16">
          Two frameworks. One direction.
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-5xl font-light text-stone-700">W</span>
              <h3 className="text-xl text-stone-200">WAVES</h3>
            </div>
            <p className="text-stone-500 leading-relaxed mb-6">
              Five dimensions of fulfillment you're moving toward. Not goals—states to inhabit.
            </p>
            <div className="space-y-2 text-sm text-stone-600">
              <p>Whole · Accomplished · Vital · Expressive · Satisfied</p>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-5xl font-light text-stone-700">S</span>
              <h3 className="text-xl text-stone-200">SWEATS</h3>
            </div>
            <p className="text-stone-500 leading-relaxed mb-6">
              Six daily practices that create movement. Small actions, compounded.
            </p>
            <div className="space-y-2 text-sm text-stone-600">
              <p>Synthesis · Work · Energy · Art · Ties · Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Stakes - What's at risk */}
    <div className="px-8 md:px-16 lg:px-24 py-24 border-t border-stone-800">
      <div className="max-w-3xl">
        <p className="text-amber-500 text-sm tracking-widest mb-6">THE STAKES</p>
        <h2 className="text-2xl font-light text-stone-300 leading-relaxed mb-8">
          The word <em>disease</em> has roots meaning "against the flow."
        </h2>
        <p className="text-lg text-stone-500 leading-relaxed">
          When you're misaligned—moving without direction—everything feels harder. RUMO helps you find the current and move with it.
        </p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="px-8 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-stone-900 to-stone-950">
      <div className="max-w-xl text-center mx-auto">
        <h2 className="text-3xl font-light text-stone-200 mb-6">
          Start with your Chief of Staff
        </h2>
        <p className="text-stone-500 mb-10">
          Three questions. Two minutes. Then you're ready for your first Synthesis.
        </p>
        <button
          onClick={onSetup}
          className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors duration-200"
        >
          Set up now
        </button>
      </div>
    </div>

    {/* Footer */}
    <div className="px-8 md:px-16 lg:px-24 py-8 border-t border-stone-800">
      <p className="text-xs text-stone-700">RUMO — direction</p>
    </div>
  </div>
);

// ============================================
// SETUP
// ============================================
const SetupView = ({ onComplete }: { onComplete: (profile: COSProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "How do you work through problems?",
      options: [
        { label: "Talking them through", value: "verbal" },
        { label: "Writing them down", value: "written" },
        { label: "Seeing the full picture", value: "visual" },
        { label: "Breaking into steps", value: "sequential" }
      ]
    },
    {
      question: "What helps when you're stuck?",
      options: [
        { label: "Good questions", value: "questions" },
        { label: "Direct feedback", value: "direct" },
        { label: "Space to process", value: "space" },
        { label: "A different frame", value: "reframe" }
      ]
    },
    {
      question: "What tone works best?",
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
      onComplete({ style: newAnswers[0], focus: newAnswers[1], tone: newAnswers[2] });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-16">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                i <= step ? 'bg-amber-500' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-stone-400 tracking-widest mb-8">
          CHIEF OF STAFF · {step + 1} OF {questions.length}
        </p>

        <h2 className="text-2xl font-light text-stone-900 mb-12">
          {questions[step].question}
        </h2>

        <div className="space-y-3">
          {questions[step].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option.value)}
              className="w-full py-4 px-5 text-left text-stone-700 border border-stone-200 hover:border-amber-500 hover:bg-amber-50 transition-all duration-200"
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
// DASHBOARD
// ============================================
const DashboardView = ({
  waveScores, tasks, onStartSynthesis, hasProfile, onSetup
}: {
  waveScores: Record<string, number>;
  tasks: Task[];
  onStartSynthesis: () => void;
  hasProfile: boolean;
  onSetup: () => void;
}) => (
  <div className="p-8 lg:p-12 max-w-5xl">
    <div className="mb-12">
      <p className="text-xs text-stone-400 tracking-widest mb-2">OVERVIEW</p>
      <h1 className="text-2xl font-light text-stone-900">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </h1>
    </div>

    {/* COS Setup Prompt */}
    {!hasProfile && (
      <div className="mb-12 p-8 bg-stone-100 border-l-2 border-amber-500">
        <p className="text-stone-700 mb-4">Set up your Chief of Staff to begin.</p>
        <button
          onClick={onSetup}
          className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          Get started →
        </button>
      </div>
    )}

    {/* Synthesis Card */}
    {hasProfile && (
      <div className="mb-12 p-8 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl" />
        <p className="text-xs text-amber-500 tracking-widest mb-3">SYNTHESIS</p>
        <p className="text-xl font-light mb-6">Begin your morning orientation.</p>
        <button
          onClick={onStartSynthesis}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
        >
          Start
        </button>
      </div>
    )}

    {/* WAVES Summary */}
    <div className="mb-12">
      <p className="text-xs text-stone-400 tracking-widest mb-6">WAVES</p>
      <div className="grid grid-cols-5 gap-6">
        {WAVES.map(wave => (
          <div key={wave.id} className="text-center">
            <div className="text-3xl font-light text-stone-800 mb-2">{waveScores[wave.id]}</div>
            <div className="text-xs text-stone-500">{wave.name}</div>
            <div className="mt-3 h-1 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${waveScores[wave.id]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Today's Tasks */}
    <div>
      <div className="flex justify-between items-baseline mb-6">
        <p className="text-xs text-stone-400 tracking-widest">TODAY'S SWEATS</p>
        <p className="text-xs text-stone-400">
          {tasks.filter(t => t.completed).length} / {tasks.length || '—'}
        </p>
      </div>

      {tasks.length === 0 ? (
        <p className="text-stone-400 py-8 text-center border border-dashed border-stone-200">
          Run Synthesis to plan your day.
        </p>
      ) : (
        <div className="space-y-2">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 border transition-colors ${
                task.completed ? 'border-stone-100 bg-stone-50' : 'border-stone-200'
              }`}
            >
              <div className="flex justify-between">
                <span className={task.completed ? 'text-stone-400 line-through' : 'text-stone-900'}>
                  {task.text}
                </span>
                <span className="text-xs text-stone-400 uppercase">{task.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ============================================
// SYNTHESIS
// ============================================
const SynthesisView = ({ profile }: { profile: COSProfile | null }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'cos'; text: string }>>([
    { role: 'cos', text: "What would be useful to think through this morning?" }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
      const responses = [
        "What's the core tension there?",
        "What would clarity look like?",
        "What's actually at stake?",
        "Where's the misalignment?",
        "What's one thing that would make today useful?"
      ];
      setMessages(prev => [...prev, {
        role: 'cos',
        text: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-8 border-b border-stone-100">
        <p className="text-xs text-amber-500 tracking-widest mb-2">SYNTHESIS</p>
        <p className="text-lg text-stone-900">Morning orientation</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'pl-12' : ''}>
              <p className={`text-lg leading-relaxed ${
                msg.role === 'user' ? 'text-stone-900' : 'text-stone-500'
              }`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 border-t border-stone-100 bg-stone-50">
        <div className="max-w-2xl flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type here..."
            className="flex-1 text-lg bg-transparent text-stone-900 placeholder-stone-300 outline-none border-b-2 border-stone-200 pb-2 focus:border-amber-500 transition-colors"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-stone-900 text-white text-sm hover:bg-stone-800 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// WAVES
// ============================================
const WavesView = ({ scores }: { scores: Record<string, number> }) => (
  <div className="p-8 lg:p-12 max-w-3xl">
    <div className="mb-12">
      <p className="text-xs text-amber-500 tracking-widest mb-2">WAVES</p>
      <p className="text-lg text-stone-600 leading-relaxed">
        Five dimensions of fulfillment. Not goals—states to inhabit.
      </p>
    </div>

    <div className="space-y-10">
      {WAVES.map(wave => (
        <div key={wave.id} className="border-b border-stone-100 pb-10">
          <div className="flex justify-between items-baseline mb-3">
            <h3 className="text-xl font-light text-stone-900">{wave.name}</h3>
            <span className="text-3xl font-light text-stone-300">{scores[wave.id]}</span>
          </div>
          <p className="text-stone-500 mb-4">{wave.desc}</p>
          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${scores[wave.id]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// SWEATS
// ============================================
const SweatsView = ({ tasks, setTasks }: { tasks: Task[]; setTasks: (tasks: Task[]) => void }) => {
  const [activeCategory, setActiveCategory] = useState('synthesis');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const categoryTasks = tasks.filter(t => t.category === activeCategory);

  return (
    <div className="p-8 lg:p-12 max-w-4xl">
      <div className="mb-12">
        <p className="text-xs text-amber-500 tracking-widest mb-2">SWEATS</p>
        <p className="text-lg text-stone-600 leading-relaxed">
          Six daily practices. Synthesis first.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-10 overflow-x-auto pb-2">
        {SWEATS.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? 'text-white bg-stone-900'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-stone-500 mb-8">
        {SWEATS.find(c => c.id === activeCategory)?.desc}
      </p>

      {/* Tasks */}
      {categoryTasks.length === 0 ? (
        <p className="text-stone-400 py-12 text-center border border-dashed border-stone-200">
          No {activeCategory} actions today.
        </p>
      ) : (
        <div className="space-y-2">
          {categoryTasks.map(task => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`w-full text-left p-4 border transition-all duration-200 ${
                task.completed
                  ? 'border-stone-100 bg-stone-50 text-stone-400'
                  : 'border-stone-200 hover:border-amber-500'
              }`}
            >
              <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// SETTINGS
// ============================================
const SettingsView = ({ onReconfigure }: { onReconfigure: () => void }) => (
  <div className="p-8 lg:p-12 max-w-xl">
    <p className="text-xs text-stone-400 tracking-widest mb-12">SETTINGS</p>

    <div className="space-y-8">
      <div className="pb-8 border-b border-stone-100">
        <p className="text-stone-900 mb-3">Chief of Staff</p>
        <p className="text-sm text-stone-500 mb-4">Adjust how your COS communicates.</p>
        <button
          onClick={onReconfigure}
          className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          Reconfigure →
        </button>
      </div>
    </div>
  </div>
);

export default App;
