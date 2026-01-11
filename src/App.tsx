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

// WAVES: The five dimensions of fulfillment
const WAVES = [
  { id: 'whole', name: 'Whole', desc: 'Integration of all parts of life' },
  { id: 'accomplished', name: 'Accomplished', desc: 'Meaningful achievement and progress' },
  { id: 'vital', name: 'Vital', desc: 'Physical energy and health' },
  { id: 'expressive', name: 'Expressive', desc: 'Creative output and authentic voice' },
  { id: 'satisfied', name: 'Satisfied', desc: 'Contentment and inner alignment' },
];

// SWEATS: Daily actions that create movement
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
  const [waveScores, setWaveScores] = useState<Record<string, number>>({
    whole: 65,
    accomplished: 72,
    vital: 58,
    expressive: 45,
    satisfied: 70,
  });

  const handleSetupComplete = (profile: COSProfile) => {
    setCosProfile(profile);
    setView('dashboard');
  };

  // Landing - first visit
  if (view === 'landing') {
    return <LandingView
      onSetup={() => setView('setup')}
      onContinue={() => setView('dashboard')}
      hasProfile={!!cosProfile}
    />;
  }

  // COS Setup
  if (view === 'setup') {
    return <SetupView onComplete={handleSetupComplete} />;
  }

  // Main app with sidebar
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-56 bg-neutral-900 text-white flex flex-col">
        <div className="p-6">
          <p className="text-lg font-light tracking-wide">RUMO</p>
          <p className="text-xs text-neutral-500 mt-1">direction</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavItem
            active={view === 'dashboard'}
            onClick={() => setView('dashboard')}
            label="Overview"
          />
          <NavItem
            active={view === 'synthesis'}
            onClick={() => setView('synthesis')}
            label="Synthesis"
          />
          <NavItem
            active={view === 'waves'}
            onClick={() => setView('waves')}
            label="WAVES"
          />
          <NavItem
            active={view === 'sweats'}
            onClick={() => setView('sweats')}
            label="SWEATS"
          />
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={() => setView('settings')}
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            Settings
          </button>
        </div>
      </aside>

      {/* Main content */}
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
        {view === 'synthesis' && (
          <SynthesisView profile={cosProfile} />
        )}
        {view === 'waves' && (
          <WavesView scores={waveScores} />
        )}
        {view === 'sweats' && (
          <SweatsView tasks={tasks} setTasks={setTasks} />
        )}
        {view === 'settings' && (
          <SettingsView onReconfigure={() => setView('setup')} />
        )}
      </main>
    </div>
  );
};

// ============================================
// NAVIGATION
// ============================================
const NavItem = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
      active
        ? 'text-white bg-neutral-800'
        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
    }`}
  >
    {label}
  </button>
);

// ============================================
// LANDING
// ============================================
const LandingView = ({ onSetup, onContinue, hasProfile }: {
  onSetup: () => void;
  onContinue: () => void;
  hasProfile: boolean;
}) => (
  <div className="min-h-screen bg-neutral-900 text-white">
    <div className="max-w-4xl mx-auto px-8 py-20">

      <p className="text-sm text-neutral-500 tracking-wide mb-16">RUMO</p>

      <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
        Direction before motion.
      </h1>

      <div className="max-w-2xl space-y-6 text-lg text-neutral-400 leading-relaxed mb-16">
        <p>
          Most people move fast without knowing where they're headed.
          They optimise without orientation.
        </p>
        <p>
          RUMO helps you find your direction first. Then it helps you move—through
          the <span className="text-white">WAVES</span> of fulfillment you're working toward,
          and the daily <span className="text-white">SWEATS</span> that get you there.
        </p>
        <p>
          It starts with your Chief of Staff—an AI configured to how you think,
          available each morning to help you orient your day.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onSetup}
          className="block text-lg text-white border-b border-neutral-700 pb-2 hover:border-white transition-colors"
        >
          {hasProfile ? 'Reconfigure Chief of Staff' : 'Set up your Chief of Staff'}
        </button>

        {hasProfile && (
          <button
            onClick={onContinue}
            className="block text-lg text-neutral-500 hover:text-white transition-colors"
          >
            Continue to dashboard
          </button>
        )}
      </div>

      {/* Brief framework intro */}
      <div className="mt-32 pt-16 border-t border-neutral-800">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sm text-neutral-500 mb-4">WAVES</p>
            <p className="text-neutral-400 leading-relaxed">
              Five dimensions of fulfillment: Whole, Accomplished, Vital, Expressive, Satisfied.
              These are the outcomes you're moving toward—not goals to achieve, but states to inhabit.
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-4">SWEATS</p>
            <p className="text-neutral-400 leading-relaxed">
              Six daily practices: Synthesis, Work, Energy, Art, Ties, Service.
              These are the actions that create movement. Synthesis comes first—your morning orientation.
            </p>
          </div>
        </div>
      </div>
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
      question: "How do you prefer to work through problems?",
      options: [
        { label: "Talking them through", value: "verbal" },
        { label: "Writing them down", value: "written" },
        { label: "Seeing the full picture first", value: "visual" },
        { label: "Breaking into steps", value: "sequential" }
      ]
    },
    {
      question: "What's most useful when you're stuck?",
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
      onComplete({
        style: newAnswers[0],
        focus: newAnswers[1],
        tone: newAnswers[2]
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center px-8">
      <div className="max-w-lg w-full">
        <p className="text-sm text-neutral-400 mb-16">
          Chief of Staff — {step + 1} / {questions.length}
        </p>

        <h2 className="text-2xl font-light text-neutral-900 mb-12">
          {questions[step].question}
        </h2>

        <div className="space-y-2">
          {questions[step].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option.value)}
              className="w-full py-4 px-5 text-left text-neutral-700 border border-neutral-200 transition-all duration-200 hover:border-neutral-400"
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
  waveScores,
  tasks,
  onStartSynthesis,
  hasProfile,
  onSetup
}: {
  waveScores: Record<string, number>;
  tasks: Task[];
  onStartSynthesis: () => void;
  hasProfile: boolean;
  onSetup: () => void;
}) => {
  const completedToday = tasks.filter(t => t.completed).length;
  const totalToday = tasks.length;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-12">
        <p className="text-sm text-neutral-400 mb-2">Overview</p>
        <h1 className="text-2xl font-light text-neutral-900">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h1>
      </div>

      {/* COS prompt if not configured */}
      {!hasProfile && (
        <div className="mb-12 p-6 bg-neutral-100 border border-neutral-200">
          <p className="text-neutral-700 mb-4">
            Set up your Chief of Staff to begin daily Synthesis.
          </p>
          <button
            onClick={onSetup}
            className="text-neutral-900 border-b border-neutral-400 pb-1 hover:border-neutral-900 transition-colors"
          >
            Set up
          </button>
        </div>
      )}

      {/* Synthesis prompt */}
      {hasProfile && (
        <div className="mb-12 p-6 bg-neutral-900 text-white">
          <p className="text-sm text-neutral-400 mb-2">Synthesis</p>
          <p className="text-lg mb-4">Begin your morning orientation.</p>
          <button
            onClick={onStartSynthesis}
            className="text-white border-b border-neutral-600 pb-1 hover:border-white transition-colors"
          >
            Start
          </button>
        </div>
      )}

      {/* WAVES summary */}
      <div className="mb-12">
        <p className="text-sm text-neutral-400 mb-6">WAVES</p>
        <div className="grid grid-cols-5 gap-4">
          {WAVES.map(wave => (
            <div key={wave.id} className="text-center">
              <p className="text-2xl font-light text-neutral-900 mb-1">
                {waveScores[wave.id]}
              </p>
              <p className="text-xs text-neutral-500">{wave.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's SWEATS */}
      <div>
        <div className="flex justify-between items-baseline mb-6">
          <p className="text-sm text-neutral-400">Today's SWEATS</p>
          <p className="text-sm text-neutral-400">
            {completedToday} / {totalToday || '—'}
          </p>
        </div>

        {tasks.length === 0 ? (
          <p className="text-neutral-400 py-8">
            No actions set. Run Synthesis to plan your day.
          </p>
        ) : (
          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`p-4 border ${task.completed ? 'border-neutral-200 bg-neutral-50' : 'border-neutral-200'}`}
              >
                <div className="flex justify-between">
                  <span className={task.completed ? 'text-neutral-400 line-through' : 'text-neutral-900'}>
                    {task.text}
                  </span>
                  <span className="text-xs text-neutral-400 uppercase">{task.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
    <div className="h-full flex flex-col">
      <div className="p-8 border-b border-neutral-200">
        <p className="text-sm text-neutral-400 mb-2">Synthesis</p>
        <p className="text-lg text-neutral-900">Morning orientation</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl space-y-6">
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

      <div className="p-8 border-t border-neutral-200">
        <div className="max-w-2xl flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 text-lg bg-transparent text-neutral-900 outline-none border-b border-neutral-200 pb-2 focus:border-neutral-900 transition-colors"
          />
          <button
            onClick={handleSend}
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
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
  <div className="p-8 max-w-3xl">
    <div className="mb-12">
      <p className="text-sm text-neutral-400 mb-2">WAVES</p>
      <p className="text-lg text-neutral-600 leading-relaxed">
        Five dimensions of fulfillment. These aren't goals to achieve—they're states to move toward and inhabit.
      </p>
    </div>

    <div className="space-y-8">
      {WAVES.map(wave => (
        <div key={wave.id} className="border-b border-neutral-100 pb-8">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-xl font-light text-neutral-900">{wave.name}</h3>
            <span className="text-2xl font-light text-neutral-400">{scores[wave.id]}</span>
          </div>
          <p className="text-neutral-500 mb-4">{wave.desc}</p>
          <div className="h-1 bg-neutral-100">
            <div
              className="h-full bg-neutral-400 transition-all duration-500"
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
    <div className="p-8 max-w-4xl">
      <div className="mb-12">
        <p className="text-sm text-neutral-400 mb-2">SWEATS</p>
        <p className="text-lg text-neutral-600 leading-relaxed">
          Six daily practices that create movement. Synthesis comes first—your morning orientation.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex gap-1 mb-8 border-b border-neutral-200">
        {SWEATS.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-3 text-sm transition-colors ${
              activeCategory === cat.id
                ? 'text-neutral-900 border-b-2 border-neutral-900 -mb-px'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Category description */}
      <div className="mb-8">
        <p className="text-neutral-500">
          {SWEATS.find(c => c.id === activeCategory)?.desc}
        </p>
      </div>

      {/* Tasks for category */}
      {categoryTasks.length === 0 ? (
        <p className="text-neutral-400 py-8">
          No {activeCategory} actions today.
        </p>
      ) : (
        <div className="space-y-2">
          {categoryTasks.map(task => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`w-full text-left p-4 border transition-colors ${
                task.completed
                  ? 'border-neutral-200 bg-neutral-50 text-neutral-400'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <span className={task.completed ? 'line-through' : ''}>
                {task.text}
              </span>
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
  <div className="p-8 max-w-xl">
    <p className="text-sm text-neutral-400 mb-12">Settings</p>

    <div className="space-y-8">
      <div>
        <p className="text-neutral-900 mb-2">Chief of Staff</p>
        <button
          onClick={onReconfigure}
          className="text-neutral-500 border-b border-neutral-300 pb-1 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
        >
          Reconfigure
        </button>
      </div>
    </div>
  </div>
);

export default App;
