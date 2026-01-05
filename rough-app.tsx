import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Sparkles, 
  Briefcase, 
  Zap, 
  Palette, 
  Users, 
  HeartHandshake, 
  Clock, 
  PieChart, 
  CheckCircle2, 
  Plus, 
  ChevronRight,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Calendar,
  Play,
  Square,
  BarChart3
} from 'lucide-react';

const APP_COLORS = {
  primary: '#0C2340',
  secondaryBlue: '#1F628E',
  accentOrange: '#DA5525',
  accentTeal: '#1EBEB1',
  royalBlue: '#003087',
  purple: '#351C75',
  grey: '#A6A6A6',
};

const WAVES_DATA = [
  { id: 'whole', label: 'Whole', icon: HeartHandshake, color: '#1F628E' },
  { id: 'accomplished', label: 'Accomplished', icon: CheckCircle2, color: '#DA5525' },
  { id: 'vital', label: 'Vital', icon: Zap, color: '#1EBEB1' },
  { id: 'expressive', label: 'Expressive', icon: Palette, color: '#351C75' },
  { id: 'satisfied', label: 'Satisfied', icon: Compass, color: '#003087' },
];

const SWEATS_CATEGORIES = [
  { id: 'synthesis', name: 'Synthesis', code: 'S', icon: Sparkles, color: APP_COLORS.royalBlue, desc: 'AI morning conversation & planning' },
  { id: 'work', name: 'Work', code: 'W', icon: Briefcase, color: APP_COLORS.secondaryBlue, desc: 'Professional advances' },
  { id: 'energy', name: 'Energy', code: 'E', icon: Zap, color: APP_COLORS.accentTeal, desc: 'Health and physical drive' },
  { id: 'art', name: 'Art', code: 'A', icon: Palette, color: APP_COLORS.purple, desc: 'Creative process & expression' },
  { id: 'ties', name: 'Ties', code: 'T', icon: Users, color: APP_COLORS.accentOrange, desc: 'Fulfilling relationships' },
  { id: 'service', name: 'Service', code: 'S', icon: HeartHandshake, color: APP_COLORS.grey, desc: 'Giving back to community' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly goals', category: 'work', completed: false, wave: 'accomplished' },
    { id: 2, text: '30 min HIIT session', category: 'energy', completed: true, wave: 'vital' },
    { id: 3, text: 'Write 500 words of blog post', category: 'art', completed: false, wave: 'expressive' },
  ]);
  
  const [timerActive, setTimerActive] = useState(false);
  const [timerCategory, setTimerCategory] = useState('work');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // AI Synthesis State
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Good morning! I'm your RUMO Chief-of-Staff. Let's start our Synthesis. How are we feeling about your WAVES today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Timer Logic
  const toggleTimer = () => {
    if (timerActive) {
      clearInterval(timerInterval);
      setTimerActive(false);
      // Logic to save time entry could go here
    } else {
      const start = Date.now() - elapsedTime * 1000;
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - start) / 1000));
      }, 1000);
      setTimerInterval(interval);
      setTimerActive(true);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const userMsg = { role: 'user', text: userInput };
    setMessages([...messages, userMsg]);
    setUserInput('');
    setIsAiLoading(true);

    try {
      const apiKey = ""; // API key managed by environment
      const systemPrompt = `You are the RUMO Chief-of-Staff. Your goal is to help the user synthesize their day based on the WAVES (Whole, Accomplished, Vital, Expressive, Satisfied) and SWEATS (Synthesis, Work, Energy, Art, Ties, Service) framework. Help them plan actionable steps.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `User says: ${userInput}. Context: Today's Synthesis session.` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm processing your direction. Let's focus on your next SWEAT.";
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "My connection to the RUMO network flickered. Let's try that again." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-[#0C2340]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0C2340] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#DA5525] rounded-xl flex items-center justify-center shadow-lg">
            <Compass className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">RUMO</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem active={activeTab === 'synthesis'} onClick={() => setActiveTab('synthesis')} icon={<Sparkles size={20} />} label="Synthesis AI" />
          <NavItem active={activeTab === 'sweats'} onClick={() => setActiveTab('sweats')} icon={<Calendar size={20} />} label="Daily SWEATS" />
          <NavItem active={activeTab === 'tracker'} onClick={() => setActiveTab('tracker')} icon={<Clock size={20} />} label="Time Tracker" />
          <NavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={20} />} label="Analytics" />
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 text-white/70 hover:text-white cursor-pointer transition-colors">
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400 font-medium">YOUR DIRECTION</p>
              <p className="text-sm font-bold">Heading: North Star</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView tasks={tasks} toggleTask={(id) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t))} />}
          {activeTab === 'synthesis' && (
            <SynthesisView 
              messages={messages} 
              userInput={userInput} 
              setUserInput={setUserInput} 
              onSend={handleSendMessage} 
              isLoading={isAiLoading} 
            />
          )}
          {activeTab === 'sweats' && <SweatsView tasks={tasks} setTasks={setTasks} />}
          {activeTab === 'tracker' && (
            <TrackerView 
              active={timerActive} 
              category={timerCategory} 
              setCategory={setTimerCategory} 
              elapsed={elapsedTime} 
              toggle={toggleTimer} 
              format={formatTime} 
            />
          )}
          {activeTab === 'analytics' && <AnalyticsView />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-white/10 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardView = ({ tasks, toggleTask }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold">Progress toward WAVES</h3>
          <p className="text-slate-500">Visualizing your internal fulfillment alignment.</p>
        </div>
        <button className="text-[#DA5525] font-semibold text-sm flex items-center gap-1">
          Adjust Goals <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {WAVES_DATA.map(wave => (
          <div key={wave.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${wave.color}15` }}>
              <wave.icon size={22} style={{ color: wave.color }} />
            </div>
            <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">{wave.label}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black">72%</span>
              <span className="text-xs text-green-500 font-bold">+5%</span>
            </div>
            <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: '72%', backgroundColor: wave.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-4">Daily SWEATS Tasks</h3>
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 cursor-pointer transition-all group"
            >
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                task.completed ? 'bg-[#1EBEB1] border-[#1EBEB1]' : 'border-slate-300 group-hover:border-[#1EBEB1]'
              }`}>
                {task.completed && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.text}</p>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold uppercase">
                     {task.category}
                   </span>
                   <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DA552515] text-[#DA5525] font-bold uppercase">
                     {task.wave}
                   </span>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-medium hover:border-[#DA5525] hover:text-[#DA5525] transition-all flex items-center justify-center gap-2">
            <Plus size={18} /> Add Today's Action
          </button>
        </div>
      </section>

      <section className="bg-[#0C2340] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
            <Sparkles className="text-[#DA5525]" size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Synthesis Recommendation</h3>
          <p className="text-white/70 mb-6 leading-relaxed">
            "Based on your <strong>Work</strong> surge yesterday, your <strong>Energy</strong> levels might be low. Focus on 20 minutes of movement today to maintain your <strong>Vital</strong> wave."
          </p>
          <button className="bg-[#DA5525] hover:bg-[#c44a20] px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
            Start Synthesis <ChevronRight size={18} />
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Compass size={200} />
        </div>
      </section>
    </div>
  </div>
);

const SynthesisView = ({ messages, userInput, setUserInput, onSend, isLoading }) => {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col h-[70vh] animate-in zoom-in-95 duration-300">
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0C2340] rounded-full flex items-center justify-center">
          <Sparkles className="text-[#DA5525]" size={20} />
        </div>
        <div>
          <h3 className="font-bold">RUMO Chief-of-Staff</h3>
          <p className="text-xs text-green-500 font-semibold">Active Planning Session</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#DA5525] text-white rounded-br-none' 
                : 'bg-white text-[#0C2340] border border-slate-100 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            placeholder="Talk to your Chief-of-Staff..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#DA5525] outline-none"
          />
          <button 
            onClick={onSend}
            disabled={isLoading}
            className="bg-[#0C2340] text-white p-3 rounded-xl hover:bg-black transition-all disabled:opacity-50"
          >
            <Sparkles size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SweatsView = ({ tasks, setTasks }) => {
  const [activeCat, setActiveCat] = useState('work');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SWEATS_CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`p-4 rounded-2xl border text-center transition-all ${
              activeCat === cat.id ? 'bg-[#0C2340] text-white border-[#0C2340] shadow-lg scale-105' : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center mb-2 ${activeCat === cat.id ? 'bg-white/10' : 'bg-slate-100'}`}>
              <cat.icon size={18} style={{ color: activeCat === cat.id ? 'white' : cat.color }} />
            </div>
            <p className="text-xs font-black uppercase tracking-tighter">{cat.name}</p>
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              {SWEATS_CATEGORIES.find(c => c.id === activeCat).name} 
              <span className="text-[#DA5525]">Actions</span>
            </h3>
            <p className="text-slate-500">{SWEATS_CATEGORIES.find(c => c.id === activeCat).desc}</p>
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors">
            <Settings size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="space-y-4">
          {tasks.filter(t => t.category === activeCat).map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors">
               <div className="flex items-center gap-4">
                 <CheckCircle2 className={task.completed ? "text-[#1EBEB1]" : "text-slate-300"} />
                 <span className={`font-semibold ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.text}</span>
               </div>
               <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="text-slate-400 hover:text-[#DA5525] p-1"><Plus size={18} /></button>
                 <button className="text-slate-400 hover:text-red-500 p-1"><Plus size={18} className="rotate-45" /></button>
               </div>
            </div>
          ))}
          {tasks.filter(t => t.category === activeCat).length === 0 && (
            <div className="text-center py-12 text-slate-400 italic">
              No daily {activeCat} actions set. Run Synthesis to generate some!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TrackerView = ({ active, category, setCategory, elapsed, toggle, format }) => (
  <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-top-4 duration-500">
    <div className="bg-[#0C2340] p-12 rounded-[40px] text-white text-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DA5525] via-[#1EBEB1] to-[#351C75]"></div>
      <p className="text-[#DA5525] font-black uppercase tracking-[0.2em] mb-4">Live SWEATS Session</p>
      <h2 className="text-8xl font-black mb-8 font-mono tracking-tighter">{format(elapsed)}</h2>
      
      <div className="flex justify-center gap-6">
        <button 
          onClick={toggle}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            active ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-[#1EBEB1] hover:bg-[#199d91] scale-100'
          }`}
        >
          {active ? <Square fill="white" className="text-white" size={32} /> : <Play fill="white" className="text-white ml-1" size={32} />}
        </button>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-center mb-6">What are you SWEATing right now?</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {SWEATS_CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
              category === cat.id ? 'border-[#DA5525] bg-[#DA552508] ring-2 ring-[#DA5525]' : 'border-slate-100'
            }`}
          >
            <cat.icon size={24} style={{ color: cat.color }} />
            <span className="font-bold text-xs uppercase">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const AnalyticsView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold mb-6">Time Distribution</h3>
      <div className="space-y-4">
        {[
          { label: 'Work', value: 45, color: '#1F628E' },
          { label: 'Synthesis', value: 10, color: '#003087' },
          { label: 'Energy', value: 15, color: '#1EBEB1' },
          { label: 'Ties', value: 20, color: '#DA5525' },
          { label: 'Art', value: 10, color: '#351C75' },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-slate-400 italic font-medium">
        * You spent 30% more time on "Ties" this week compared to last month.
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">Direction Check</h3>
        <p className="text-slate-500 mb-6">Your consistency across the SWEATS framework.</p>
        
        <div className="flex items-center justify-center py-8">
           <div className="relative w-48 h-48 rounded-full border-8 border-slate-50 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-black text-[#0C2340]">84</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RUMO Score</p>
              </div>
              <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90">
                <circle cx="104" cy="104" r="96" fill="transparent" stroke="#DA5525" strokeWidth="8" strokeDasharray="603" strokeDashoffset="100" />
              </svg>
           </div>
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4">
        <PieChart className="text-[#1F628E]" />
        <div>
          <p className="text-sm font-bold">Optimal Alignment</p>
          <p className="text-xs text-slate-500">Your "Art" category needs more focus to hit your "Expressive" wave goal.</p>
        </div>
      </div>
    </div>
  </div>
);

export default App;
