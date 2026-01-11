import { useState, useEffect } from 'react';

// ============================================
// DESIGN TOKENS
// ============================================
const tokens = {
  colors: {
    // Backgrounds
    bgPrimary: '#FAFAF8',      // off-white
    bgCard: '#FFFFFF',
    bgNavy: '#0C2340',         // ink navy
    bgNavyLight: '#1A3A5C',

    // Text
    textPrimary: '#0C2340',
    textSecondary: '#5A6B7D',
    textMuted: '#8E99A4',
    textInverse: '#FFFFFF',

    // Accents
    teal: '#0D9488',
    tealLight: '#14B8A6',
    coral: '#E07A5F',

    // UI
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
};

// ============================================
// TYPES
// ============================================
type View = 'home' | 'setup' | 'synthesis' | 'waves' | 'sweats';

interface WaveData {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
}

interface SweatsLog {
  id: string;
  category: string;
  text: string;
  timestamp: Date;
}

// ============================================
// MOCK DATA
// ============================================
const mockWaves: WaveData[] = [
  { id: 'whole', name: 'Whole', value: 72, trend: 'up' },
  { id: 'accomplished', name: 'Accomplished', value: 65, trend: 'stable' },
  { id: 'vital', name: 'Vital', value: 58, trend: 'down' },
  { id: 'expressive', name: 'Expressive', value: 45, trend: 'up' },
  { id: 'satisfied', name: 'Satisfied', value: 78, trend: 'stable' },
];

const mockSweatsLog: SweatsLog[] = [
  { id: '1', category: 'work', text: 'Completed project review', timestamp: new Date() },
  { id: '2', category: 'energy', text: '30 min morning run', timestamp: new Date() },
];

const SWEATS_CATEGORIES = [
  { id: 'synthesis', name: 'Synthesis', letter: 'S' },
  { id: 'work', name: 'Work', letter: 'W' },
  { id: 'energy', name: 'Energy', letter: 'E' },
  { id: 'art', name: 'Art', letter: 'A' },
  { id: 'ties', name: 'Ties', letter: 'T' },
  { id: 'service', name: 'Service', letter: 'S' },
];

// ============================================
// APP
// ============================================
const App = () => {
  const [view, setView] = useState<View>('home');
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [waves, setWaves] = useState<WaveData[]>([]);
  const [sweatsLog, setSweatsLog] = useState<SweatsLog[]>([]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaves(mockWaves);
      setSweatsLog(mockSweatsLog);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (view === 'setup') {
    return <SetupView onComplete={() => { setHasProfile(true); setView('home'); }} />;
  }

  if (view === 'synthesis') {
    return <SynthesisView onBack={() => setView('home')} />;
  }

  return (
    <div style={{ background: tokens.colors.bgPrimary, minHeight: '100vh' }}>
      {/* Navigation */}
      <Nav
        onNavigate={setView}
        currentView={view}
      />

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `${tokens.spacing.xl} ${tokens.spacing.md}` }}>

        {/* Hero Section */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: tokens.spacing.lg,
          marginBottom: tokens.spacing.xl
        }}>
          {/* Value Prop */}
          <div style={{ gridColumn: 'span 7' }}>
            <p style={{
              color: tokens.colors.teal,
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: tokens.spacing.sm
            }}>
              PERSONAL NAVIGATION SYSTEM
            </p>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 400,
              color: tokens.colors.textPrimary,
              lineHeight: 1.1,
              marginBottom: tokens.spacing.sm
            }}>
              Find your heading.<br />
              <span style={{ color: tokens.colors.textSecondary }}>Stay on course.</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: tokens.colors.textSecondary,
              marginBottom: tokens.spacing.lg,
              maxWidth: '480px'
            }}>
              RUMO turns daily reflection into clear direction—and a system you'll actually follow.
            </p>
            <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
              <Button variant="primary" onClick={() => setView('synthesis')}>
                Start today's Synthesis
              </Button>
              {!hasProfile && (
                <Button variant="secondary" onClick={() => setView('setup')}>
                  Set your heading
                </Button>
              )}
            </div>
          </div>

          {/* Compass Card */}
          <div style={{ gridColumn: 'span 5' }}>
            <CompassCard waves={waves} isLoading={isLoading} />
          </div>
        </section>

        {/* Primary Actions */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.xl
        }}>
          <ActionCard
            title="Daily Synthesis"
            description="Morning check-in with your Chief of Staff"
            action="Begin"
            onClick={() => setView('synthesis')}
            accent={tokens.colors.teal}
          />
          <ActionCard
            title="Check your WAVES"
            description="Review your five dimensions"
            action="View"
            onClick={() => setView('waves')}
            accent={tokens.colors.bgNavy}
          />
          <ActionCard
            title="Run SWEATS"
            description="Log today's actions"
            action="Log"
            onClick={() => setView('sweats')}
            accent={tokens.colors.coral}
          />
        </section>

        {/* WAVES Panel */}
        <section style={{ marginBottom: tokens.spacing.xl }}>
          <WavesPanel waves={waves} isLoading={isLoading} />
        </section>

        {/* SWEATS Panel */}
        <section style={{ marginBottom: tokens.spacing.xl }}>
          <SweatsPanel logs={sweatsLog} isLoading={isLoading} />
        </section>

        {/* Streak Card */}
        <section style={{ marginBottom: tokens.spacing.xl }}>
          <StreakCard />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// ============================================
// COMPONENTS: Layout
// ============================================
const Nav = ({ onNavigate, currentView }: { onNavigate: (v: View) => void; currentView: View }) => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    maxWidth: '1200px',
    margin: '0 auto',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
      <RumoLogo />
      <span style={{
        fontSize: '18px',
        fontWeight: 600,
        color: tokens.colors.textPrimary,
        letterSpacing: '0.05em'
      }}>
        RUMO
      </span>
    </div>
    <div style={{ display: 'flex', gap: tokens.spacing.lg }}>
      {['WAVES', 'SWEATS'].map(item => (
        <button
          key={item}
          onClick={() => onNavigate(item.toLowerCase() as View)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: 500,
            color: tokens.colors.textSecondary,
            cursor: 'pointer',
            padding: `${tokens.spacing.xs} 0`,
            borderBottom: currentView === item.toLowerCase() ? `2px solid ${tokens.colors.teal}` : '2px solid transparent',
          }}
        >
          {item}
        </button>
      ))}
    </div>
  </nav>
);

const Footer = () => (
  <footer style={{
    borderTop: `1px solid ${tokens.colors.border}`,
    padding: `${tokens.spacing.md} ${tokens.spacing.md}`,
    maxWidth: '1200px',
    margin: '0 auto',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ fontSize: '12px', color: tokens.colors.textMuted }}>
        RUMO · direction
      </p>
      <p style={{ fontSize: '12px', color: tokens.colors.textMuted }}>
        v0.1.0
      </p>
    </div>
  </footer>
);

// ============================================
// COMPONENTS: Buttons
// ============================================
const Button = ({
  children,
  variant = 'primary',
  onClick
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
}) => {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: tokens.colors.bgNavy,
      color: tokens.colors.textInverse,
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: tokens.colors.textPrimary,
      border: `1px solid ${tokens.colors.border}`,
    },
    tertiary: {
      background: 'transparent',
      color: tokens.colors.teal,
      border: 'none',
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: 500,
        borderRadius: tokens.radius.md,
        cursor: 'pointer',
        transition: 'all 0.2s',
        minHeight: '44px',
      }}
    >
      {children}
    </button>
  );
};

// ============================================
// COMPONENTS: Cards
// ============================================
const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: tokens.colors.bgCard,
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.colors.border}`,
    padding: tokens.spacing.md,
    ...style,
  }}>
    {children}
  </div>
);

const ActionCard = ({
  title,
  description,
  action,
  onClick,
  accent
}: {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  accent: string;
}) => (
  <Card style={{ position: 'relative', overflow: 'hidden' }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: accent,
    }} />
    <h3 style={{
      fontSize: '16px',
      fontWeight: 600,
      color: tokens.colors.textPrimary,
      marginBottom: tokens.spacing.xs
    }}>
      {title}
    </h3>
    <p style={{
      fontSize: '14px',
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.sm
    }}>
      {description}
    </p>
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: tokens.colors.teal,
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {action} →
    </button>
  </Card>
);

// ============================================
// COMPONENTS: Compass (Signature Interaction)
// ============================================
const CompassCard = ({ waves, isLoading }: { waves: WaveData[]; isLoading: boolean }) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredWave, setHoveredWave] = useState<string | null>(null);

  // Calculate bearing from wave values
  const avgValue = waves.length > 0 ? waves.reduce((a, b) => a + b.value, 0) / waves.length : 0;
  const bearing = Math.round((avgValue / 100) * 360);

  useEffect(() => {
    setRotation(bearing);
  }, [bearing]);

  if (isLoading) {
    return (
      <Card style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: tokens.colors.borderLight }} />
      </Card>
    );
  }

  return (
    <Card style={{
      background: tokens.colors.bgNavy,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle contour lines background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.04,
        backgroundImage: `repeating-radial-gradient(circle at center, transparent 0, transparent 20px, ${tokens.colors.textInverse} 20px, ${tokens.colors.textInverse} 21px)`,
      }} />

      <div style={{ position: 'relative', padding: tokens.spacing.sm }}>
        <p style={{
          fontSize: '12px',
          color: tokens.colors.teal,
          letterSpacing: '0.1em',
          marginBottom: tokens.spacing.sm
        }}>
          CURRENT HEADING
        </p>

        {/* Compass */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: tokens.spacing.md
        }}>
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            {/* Compass ring */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke={tokens.colors.textInverse} strokeWidth="0.5" opacity="0.2" />
              {/* Tick marks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <line
                  key={deg}
                  x1="50"
                  y1="8"
                  x2="50"
                  y2={deg % 90 === 0 ? "14" : "11"}
                  stroke={tokens.colors.textInverse}
                  strokeWidth={deg % 90 === 0 ? "1" : "0.5"}
                  opacity="0.4"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
              {/* Cardinal labels */}
              <text x="50" y="22" fill={tokens.colors.textInverse} fontSize="6" textAnchor="middle" opacity="0.6">N</text>
              <text x="83" y="52" fill={tokens.colors.textInverse} fontSize="6" textAnchor="middle" opacity="0.6">E</text>
              <text x="50" y="83" fill={tokens.colors.textInverse} fontSize="6" textAnchor="middle" opacity="0.6">S</text>
              <text x="17" y="52" fill={tokens.colors.textInverse} fontSize="6" textAnchor="middle" opacity="0.6">W</text>
              {/* Needle */}
              <g transform={`rotate(${rotation} 50 50)`} style={{ transition: 'transform 0.8s ease-out' }}>
                <polygon points="50,20 47,50 50,55 53,50" fill={tokens.colors.teal} />
                <polygon points="50,80 47,50 50,45 53,50" fill={tokens.colors.textInverse} opacity="0.3" />
              </g>
              {/* Center dot */}
              <circle cx="50" cy="50" r="3" fill={tokens.colors.bgNavy} stroke={tokens.colors.textInverse} strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Bearing readout */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '32px',
            fontWeight: 300,
            color: tokens.colors.textInverse,
            fontFamily: 'monospace',
          }}>
            {bearing}°
          </p>
          <p style={{ fontSize: '12px', color: tokens.colors.textMuted }}>
            Bearing · {avgValue.toFixed(0)}% aligned
          </p>
        </div>

        {/* Wave indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          marginTop: tokens.spacing.sm
        }}>
          {waves.map(wave => (
            <div
              key={wave.id}
              onMouseEnter={() => {
                setHoveredWave(wave.id);
                setRotation((wave.value / 100) * 360);
              }}
              onMouseLeave={() => {
                setHoveredWave(null);
                setRotation(bearing);
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: hoveredWave === wave.id ? tokens.colors.teal : tokens.colors.textInverse,
                opacity: hoveredWave === wave.id ? 1 : 0.3,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              title={`${wave.name}: ${wave.value}%`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

// ============================================
// COMPONENTS: WAVES Panel
// ============================================
const WavesPanel = ({ waves, isLoading }: { waves: WaveData[]; isLoading: boolean }) => (
  <Card>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: tokens.spacing.md
    }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: tokens.colors.textPrimary }}>
          WAVES
        </h2>
        <p style={{ fontSize: '13px', color: tokens.colors.textMuted }}>
          Five dimensions of fulfillment
        </p>
      </div>
      <p style={{ fontSize: '12px', color: tokens.colors.textMuted }}>
        Updated today
      </p>
    </div>

    <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
      {isLoading ? (
        Array(5).fill(0).map((_, i) => (
          <div key={i} style={{ flex: 1, height: '80px', background: tokens.colors.borderLight, borderRadius: tokens.radius.md }} />
        ))
      ) : (
        waves.map(wave => (
          <WaveChip key={wave.id} wave={wave} />
        ))
      )}
    </div>
  </Card>
);

const WaveChip = ({ wave }: { wave: WaveData }) => {
  const trendIcon = wave.trend === 'up' ? '↑' : wave.trend === 'down' ? '↓' : '→';
  const trendColor = wave.trend === 'up' ? tokens.colors.teal : wave.trend === 'down' ? tokens.colors.coral : tokens.colors.textMuted;

  return (
    <div style={{
      flex: 1,
      padding: tokens.spacing.sm,
      background: tokens.colors.bgPrimary,
      borderRadius: tokens.radius.md,
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: `1px solid transparent`,
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = tokens.colors.teal}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
    >
      <p style={{ fontSize: '24px', fontWeight: 300, color: tokens.colors.textPrimary }}>
        {wave.value}
      </p>
      <p style={{ fontSize: '12px', color: tokens.colors.textSecondary, marginBottom: '4px' }}>
        {wave.name}
      </p>
      <span style={{ fontSize: '11px', color: trendColor }}>
        {trendIcon}
      </span>
    </div>
  );
};

// ============================================
// COMPONENTS: SWEATS Panel
// ============================================
const SweatsPanel = ({ logs, isLoading }: { logs: SweatsLog[]; isLoading: boolean }) => (
  <Card>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: tokens.spacing.md
    }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: tokens.colors.textPrimary }}>
          SWEATS
        </h2>
        <p style={{ fontSize: '13px', color: tokens.colors.textMuted }}>
          Six daily practices
        </p>
      </div>
      <Button variant="tertiary">+ Log action</Button>
    </div>

    {/* Category chips */}
    <div style={{ display: 'flex', gap: tokens.spacing.xs, marginBottom: tokens.spacing.md }}>
      {SWEATS_CATEGORIES.map(cat => (
        <div
          key={cat.id}
          style={{
            padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
            background: tokens.colors.bgPrimary,
            borderRadius: tokens.radius.sm,
            fontSize: '12px',
            color: tokens.colors.textSecondary,
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: `1px solid ${tokens.colors.borderLight}`,
          }}
        >
          <span style={{ fontWeight: 600, marginRight: '4px' }}>{cat.letter}</span>
          {cat.name}
        </div>
      ))}
    </div>

    {/* Recent logs */}
    {isLoading ? (
      <div style={{ height: '60px', background: tokens.colors.borderLight, borderRadius: tokens.radius.md }} />
    ) : logs.length === 0 ? (
      <div style={{
        padding: tokens.spacing.lg,
        textAlign: 'center',
        border: `1px dashed ${tokens.colors.border}`,
        borderRadius: tokens.radius.md,
      }}>
        <p style={{ color: tokens.colors.textMuted, fontSize: '14px' }}>
          No check-in yet today
        </p>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
        {logs.slice(0, 3).map(log => (
          <div key={log.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: tokens.spacing.xs,
            background: tokens.colors.bgPrimary,
            borderRadius: tokens.radius.sm,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                color: tokens.colors.teal,
                textTransform: 'uppercase',
                background: `${tokens.colors.teal}15`,
                padding: '2px 6px',
                borderRadius: tokens.radius.sm,
              }}>
                {log.category}
              </span>
              <span style={{ fontSize: '14px', color: tokens.colors.textPrimary }}>
                {log.text}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: tokens.colors.textMuted }}>
              Today
            </span>
          </div>
        ))}
      </div>
    )}
  </Card>
);

// ============================================
// COMPONENTS: Streak Card
// ============================================
const StreakCard = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const streak = [true, true, true, true, false, false, false]; // Mock data

  return (
    <Card style={{ background: tokens.colors.bgNavy }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.1em', marginBottom: '4px' }}>
            THIS WEEK
          </p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: tokens.colors.textInverse }}>
            4 day streak
          </p>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          {days.map((day, i) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: tokens.radius.sm,
                background: streak[i] ? tokens.colors.teal : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 500,
                color: streak[i] ? tokens.colors.textInverse : tokens.colors.textMuted,
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// ============================================
// COMPONENTS: Logo
// ============================================
const RumoLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    {/* Compass circle */}
    <circle cx="16" cy="16" r="14" stroke={tokens.colors.bgNavy} strokeWidth="1.5" fill="none" />
    {/* Direction triangle */}
    <path d="M16 6L20 16L16 26L12 16L16 6Z" fill={tokens.colors.teal} />
    {/* Center */}
    <circle cx="16" cy="16" r="2" fill={tokens.colors.bgNavy} />
  </svg>
);

// ============================================
// VIEWS: Setup - COS Generator Interview
// ============================================
interface COSProfile {
  stance: string;
  toneWords: string[];
  formatPreference: string;
  planningStyle: string;
  questionStyle: string;
  role: string;
  outcomes: string;
  decisions: string;
  uncertainty: string;
  avoidance: string;
  constraints: string;
  goodDay: string;
  badDay: string;
  failureModes: string[];
  protectedValues: string;
  boundaries: string;
  accountability: string;
  currentAIUse: string;
  idealPartner: string;
  existingTools: string;
  primaryLLM: string;
  optimizationFocus: string;
}

const SETUP_SECTIONS = [
  { id: 'stance', title: 'Stance & Style', subtitle: 'How your Chief of Staff should work with you' },
  { id: 'context', title: 'Context Capture', subtitle: 'Your current situation and priorities' },
  { id: 'constraints', title: 'Operating Constraints', subtitle: 'What shapes your available capacity' },
  { id: 'values', title: 'Values & Guardrails', subtitle: 'What your COS should protect' },
  { id: 'relationship', title: 'AI Relationship', subtitle: 'How you work with AI today' },
  { id: 'output', title: 'Output Preferences', subtitle: 'How to configure your COS' },
];

const SetupView = ({ onComplete }: { onComplete: () => void }) => {
  const [section, setSection] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [profile, setProfile] = useState<Partial<COSProfile>>({
    toneWords: [],
    failureModes: [],
  });
  const [textInput, setTextInput] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const TONE_OPTIONS = ['calm', 'direct', 'warm', 'witty', 'formal', 'concise', 'thoughtful', 'measured', 'sharp', 'patient'];
  const FAILURE_MODES = ['overthinking', 'impulsivity', 'perfectionism', 'distraction', 'people-pleasing', 'avoidance', 'scattered focus', 'overcommitting'];

  const updateProfile = (key: keyof COSProfile, value: string | string[]) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'toneWords' | 'failureModes', item: string) => {
    const current = profile[key] || [];
    if (current.includes(item)) {
      updateProfile(key, current.filter(i => i !== item));
    } else {
      if (key === 'toneWords' && current.length >= 3) return;
      updateProfile(key, [...current, item]);
    }
  };

  const handleNext = () => {
    if (textInput.trim()) {
      // Save current text input based on section/substep
      const textFields: Record<string, keyof COSProfile> = {
        '1-0': 'role',
        '1-1': 'outcomes',
        '1-2': 'decisions',
        '1-3': 'uncertainty',
        '1-4': 'avoidance',
        '2-0': 'constraints',
        '2-1': 'goodDay',
        '2-2': 'badDay',
        '3-0': 'protectedValues',
        '3-1': 'boundaries',
        '3-2': 'accountability',
        '4-0': 'currentAIUse',
        '4-1': 'idealPartner',
        '4-2': 'existingTools',
      };
      const fieldKey = `${section}-${subStep}`;
      if (textFields[fieldKey]) {
        updateProfile(textFields[fieldKey], textInput);
      }
      setTextInput('');
    }
    advanceStep();
  };

  const advanceStep = () => {
    const maxSubSteps = [4, 5, 4, 3, 3, 2]; // substeps per section
    if (subStep < maxSubSteps[section] - 1) {
      setSubStep(subStep + 1);
    } else if (section < SETUP_SECTIONS.length - 1) {
      setSection(section + 1);
      setSubStep(0);
    } else {
      setShowOutput(true);
    }
  };

  const handleBack = () => {
    if (subStep > 0) {
      setSubStep(subStep - 1);
    } else if (section > 0) {
      const maxSubSteps = [4, 5, 4, 3, 3, 2];
      setSection(section - 1);
      setSubStep(maxSubSteps[section - 1] - 1);
    }
  };

  const totalSteps = 21;
  const currentStep = [0, 4, 9, 13, 16, 19][section] + subStep;

  if (showOutput) {
    return <SetupOutputView profile={profile as COSProfile} onComplete={onComplete} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: tokens.colors.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: tokens.spacing.md,
        borderBottom: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.md,
      }}>
        {(section > 0 || subStep > 0) && (
          <button
            onClick={handleBack}
            style={{
              background: 'none',
              border: 'none',
              color: tokens.colors.textMuted,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ← Back
          </button>
        )}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.1em' }}>
            CHIEF OF STAFF GENERATOR
          </p>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary }}>
            {SETUP_SECTIONS[section].title}
          </p>
        </div>
        <p style={{ fontSize: '12px', color: tokens.colors.textMuted }}>
          {currentStep + 1} of {totalSteps}
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '2px', padding: `0 ${tokens.spacing.md}`, marginTop: tokens.spacing.sm }}>
        {SETUP_SECTIONS.map((s, i) => (
          <div
            key={s.id}
            style={{
              height: '3px',
              flex: 1,
              background: i < section ? tokens.colors.teal : i === section ? tokens.colors.bgNavy : tokens.colors.border,
              borderRadius: '2px',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacing.lg,
      }}>
        <div style={{ maxWidth: '520px', width: '100%' }}>
          {/* Section 0: Stance & Style */}
          {section === 0 && subStep === 0 && (
            <SetupQuestion
              title="What stance should your Chief of Staff take?"
              subtitle="This defines how they challenge and support you."
              type="choice"
              options={[
                { value: 'challenging', label: 'Challenging', desc: 'Push back, surface blind spots' },
                { value: 'supporting', label: 'Supporting', desc: 'Steady, clarify, encourage' },
                { value: 'balanced', label: 'Balanced', desc: 'Support first, challenge when needed' },
              ]}
              selected={profile.stance}
              onSelect={(v) => { updateProfile('stance', v); advanceStep(); }}
            />
          )}
          {section === 0 && subStep === 1 && (
            <SetupQuestion
              title="Choose 3 words for your COS tone"
              subtitle="How should your Chief of Staff sound?"
              type="multi"
              options={TONE_OPTIONS.map(t => ({ value: t, label: t }))}
              selected={profile.toneWords}
              onToggle={(v) => toggleArrayItem('toneWords', v)}
              onNext={(profile.toneWords?.length || 0) >= 3 ? advanceStep : undefined}
              nextLabel="Continue"
            />
          )}
          {section === 0 && subStep === 2 && (
            <SetupQuestion
              title="How should responses be formatted?"
              type="choice"
              options={[
                { value: 'bullets', label: 'Bullets', desc: 'Concise, scannable' },
                { value: 'paragraphs', label: 'Short paragraphs', desc: 'More context, flowing' },
              ]}
              selected={profile.formatPreference}
              onSelect={(v) => { updateProfile('formatPreference', v); advanceStep(); }}
            />
          )}
          {section === 0 && subStep === 3 && (
            <SetupQuestion
              title="When analyzing a problem..."
              type="choice"
              options={[
                { value: 'plan-first', label: 'Plan first', desc: 'Start with structure and next steps' },
                { value: 'analysis-first', label: 'Analysis first', desc: 'Understand before prescribing' },
              ]}
              selected={profile.planningStyle}
              onSelect={(v) => { updateProfile('planningStyle', v); advanceStep(); }}
            />
          )}

          {/* Section 1: Context Capture */}
          {section === 1 && subStep === 0 && (
            <SetupQuestion
              title="What is your current role?"
              subtitle="Include multiple roles if relevant."
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., VP of Product at a Series B startup, also a parent of two"
              onNext={handleNext}
            />
          )}
          {section === 1 && subStep === 1 && (
            <SetupQuestion
              title="What are your top 3 outcomes for the next 90 days?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Launch v2, hire 2 senior engineers, establish exec team rhythm"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 1 && subStep === 2 && (
            <SetupQuestion
              title="What are the 3 recurring decisions you make that have the biggest impact?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Resource allocation, roadmap prioritization, hiring calls"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 1 && subStep === 3 && (
            <SetupQuestion
              title="Where does uncertainty show up most right now?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="What keeps you uncertain or anxious?"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 1 && subStep === 4 && (
            <SetupQuestion
              title="What do you consistently avoid or delay, even though it matters?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="Be honest—this helps your COS know where to push"
              onNext={handleNext}
              multiline
            />
          )}

          {/* Section 2: Operating Constraints */}
          {section === 2 && subStep === 0 && (
            <SetupQuestion
              title="What constraints are real right now?"
              subtitle="Time, energy, money, family, attention, health, etc."
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Limited bandwidth, young kids, recovering from burnout"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 2 && subStep === 1 && (
            <SetupQuestion
              title="What does a good day look like?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="Describe the texture—energy, accomplishment, presence"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 2 && subStep === 2 && (
            <SetupQuestion
              title="What does a bad day look like?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="What patterns show up when things go wrong?"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 2 && subStep === 3 && (
            <SetupQuestion
              title="What are your most common failure modes?"
              subtitle="Select all that apply"
              type="multi"
              options={FAILURE_MODES.map(f => ({ value: f, label: f }))}
              selected={profile.failureModes}
              onToggle={(v) => toggleArrayItem('failureModes', v)}
              onNext={advanceStep}
              nextLabel="Continue"
            />
          )}

          {/* Section 3: Values & Guardrails */}
          {section === 3 && subStep === 0 && (
            <SetupQuestion
              title="What values should your Chief of Staff protect at all costs?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Integrity, family time, creative freedom, health"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 3 && subStep === 1 && (
            <SetupQuestion
              title="What boundaries should your COS never cross?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Never encourage overwork, don't schedule during family dinner"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 3 && subStep === 2 && (
            <SetupQuestion
              title="What kind of accountability actually works for you?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Gentle reminders, direct callouts, progress tracking"
              onNext={handleNext}
              multiline
            />
          )}

          {/* Section 4: AI Relationship */}
          {section === 4 && subStep === 0 && (
            <SetupQuestion
              title="How are you currently using AI, and what frustrates you?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="Be specific about pain points"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 4 && subStep === 1 && (
            <SetupQuestion
              title="What would make AI feel like a true partner?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="What's missing from your current experience?"
              onNext={handleNext}
              multiline
            />
          )}
          {section === 4 && subStep === 2 && (
            <SetupQuestion
              title="What tools or systems are already part of your daily life?"
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Notion, Linear, Apple Notes, calendar blocking"
              onNext={handleNext}
              multiline
            />
          )}

          {/* Section 5: Output Preferences */}
          {section === 5 && subStep === 0 && (
            <SetupQuestion
              title="Which LLM are you primarily using?"
              type="choice"
              options={[
                { value: 'chatgpt', label: 'ChatGPT', desc: 'OpenAI' },
                { value: 'claude', label: 'Claude', desc: 'Anthropic' },
                { value: 'gemini', label: 'Gemini', desc: 'Google' },
                { value: 'other', label: 'Other / Multiple', desc: 'Various platforms' },
              ]}
              selected={profile.primaryLLM}
              onSelect={(v) => { updateProfile('primaryLLM', v); advanceStep(); }}
            />
          )}
          {section === 5 && subStep === 1 && (
            <SetupQuestion
              title="What should your COS optimize for?"
              type="choice"
              options={[
                { value: 'planning', label: 'Daily Planning', desc: 'Structure, priorities, execution' },
                { value: 'leadership', label: 'Leadership & Decisions', desc: 'Strategy, stakeholders, judgment' },
                { value: 'creative', label: 'Writing & Creativity', desc: 'Expression, ideas, craft' },
                { value: 'balanced', label: 'Balanced', desc: 'All of the above' },
              ]}
              selected={profile.optimizationFocus}
              onSelect={(v) => { updateProfile('optimizationFocus', v); advanceStep(); }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Question Component for Setup
const SetupQuestion = ({
  title,
  subtitle,
  type,
  options,
  selected,
  onSelect,
  onToggle,
  onNext,
  nextLabel = 'Continue',
  value,
  onChange,
  placeholder,
  multiline,
}: {
  title: string;
  subtitle?: string;
  type: 'choice' | 'multi' | 'text';
  options?: { value: string; label: string; desc?: string }[];
  selected?: string | string[];
  onSelect?: (value: string) => void;
  onToggle?: (value: string) => void;
  onNext?: () => void;
  nextLabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) => (
  <div>
    <h2 style={{
      fontSize: '24px',
      fontWeight: 400,
      color: tokens.colors.textPrimary,
      marginBottom: tokens.spacing.xs,
      lineHeight: 1.3,
    }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{
        fontSize: '14px',
        color: tokens.colors.textSecondary,
        marginBottom: tokens.spacing.lg,
      }}>
        {subtitle}
      </p>
    )}

    {type === 'choice' && options && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect?.(opt.value)}
            style={{
              padding: tokens.spacing.sm,
              background: selected === opt.value ? tokens.colors.bgNavy : tokens.colors.bgCard,
              border: `1px solid ${selected === opt.value ? tokens.colors.bgNavy : tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <p style={{
              fontSize: '16px',
              fontWeight: 500,
              color: selected === opt.value ? tokens.colors.textInverse : tokens.colors.textPrimary,
            }}>
              {opt.label}
            </p>
            {opt.desc && (
              <p style={{
                fontSize: '13px',
                color: selected === opt.value ? 'rgba(255,255,255,0.7)' : tokens.colors.textMuted,
                marginTop: '2px',
              }}>
                {opt.desc}
              </p>
            )}
          </button>
        ))}
      </div>
    )}

    {type === 'multi' && options && (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {options.map(opt => {
            const isSelected = Array.isArray(selected) && selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => onToggle?.(opt.value)}
                style={{
                  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
                  background: isSelected ? tokens.colors.teal : tokens.colors.bgCard,
                  border: `1px solid ${isSelected ? tokens.colors.teal : tokens.colors.border}`,
                  borderRadius: tokens.radius.lg,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isSelected ? tokens.colors.textInverse : tokens.colors.textPrimary,
                  transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {onNext && (
          <button
            onClick={onNext}
            style={{
              marginTop: tokens.spacing.lg,
              padding: '12px 24px',
              background: tokens.colors.bgNavy,
              color: tokens.colors.textInverse,
              border: 'none',
              borderRadius: tokens.radius.md,
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {nextLabel}
          </button>
        )}
      </>
    )}

    {type === 'text' && (
      <>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: tokens.spacing.sm,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              fontSize: '16px',
              lineHeight: 1.5,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: tokens.spacing.sm,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              fontSize: '16px',
              outline: 'none',
            }}
          />
        )}
        <button
          onClick={onNext}
          disabled={!value?.trim()}
          style={{
            marginTop: tokens.spacing.md,
            padding: '12px 24px',
            background: value?.trim() ? tokens.colors.bgNavy : tokens.colors.border,
            color: value?.trim() ? tokens.colors.textInverse : tokens.colors.textMuted,
            border: 'none',
            borderRadius: tokens.radius.md,
            fontSize: '14px',
            fontWeight: 500,
            cursor: value?.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Continue
        </button>
      </>
    )}
  </div>
);

// Output View for Generated COS
const SetupOutputView = ({ profile, onComplete }: { profile: COSProfile; onComplete: () => void }) => {
  const [copied, setCopied] = useState(false);

  const generateSystemPrompt = () => {
    const stanceDesc = {
      challenging: 'Push back on weak reasoning, surface blind spots, and challenge assumptions',
      supporting: 'Provide steady support, help clarify thinking, and encourage progress',
      balanced: 'Support first, then challenge when patterns warrant it',
    }[profile.stance] || '';

    return `# Personal Chief of Staff

## Who You Are
You are my Chief of Staff—a thinking partner who helps me maintain direction and make better decisions. You operate with a ${profile.stance} stance: ${stanceDesc}.

## Tone & Style
- Voice: ${profile.toneWords?.join(', ') || 'direct, calm, thoughtful'}
- Format: ${profile.formatPreference === 'bullets' ? 'Use bullets and short statements' : 'Use flowing short paragraphs'}
- Approach: ${profile.planningStyle === 'plan-first' ? 'Lead with structure and next steps' : 'Understand context before prescribing'}

## My Context
- Role: ${profile.role || 'Not specified'}
- 90-day outcomes: ${profile.outcomes || 'Not specified'}
- Key decisions: ${profile.decisions || 'Not specified'}
- Current uncertainty: ${profile.uncertainty || 'Not specified'}
- Avoidance patterns: ${profile.avoidance || 'Not specified'}

## Operating Constraints
- Real constraints: ${profile.constraints || 'Not specified'}
- Good day looks like: ${profile.goodDay || 'Not specified'}
- Bad day looks like: ${profile.badDay || 'Not specified'}
- Failure modes to watch: ${profile.failureModes?.join(', ') || 'None specified'}

## Values & Guardrails
- Protect these values: ${profile.protectedValues || 'Not specified'}
- Never cross these boundaries: ${profile.boundaries || 'Not specified'}
- Accountability that works: ${profile.accountability || 'Not specified'}

## Operating Principles
1. Begin each day with Synthesis—clarity before productivity
2. Ask questions before giving advice
3. ${profile.stance === 'challenging' ? 'Challenge comfortable answers' : 'Support forward momentum'}
4. Track patterns across conversations
5. Connect daily actions to longer-term direction
6. Name what I might be avoiding
7. Keep responses focused and actionable

## SWEATS Integration
Support my daily practice across six domains:
- **Synthesis**: Morning orientation and planning (this is where we start)
- **Work**: Professional progress and output
- **Energy**: Physical health and vitality
- **Art**: Creative expression and craft
- **Ties**: Relationships and connection
- **Service**: Contribution beyond self

When I check in, help me distribute attention across what matters.`;
  };

  const systemPrompt = generateSystemPrompt();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: tokens.colors.bgPrimary,
      padding: tokens.spacing.lg,
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.1em', marginBottom: tokens.spacing.xs }}>
            CHIEF OF STAFF GENERATOR
          </p>
          <h1 style={{ fontSize: '32px', fontWeight: 400, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.sm }}>
            Your COS is ready
          </h1>
          <p style={{ fontSize: '16px', color: tokens.colors.textSecondary }}>
            Copy this system prompt into your preferred LLM's custom instructions.
          </p>
        </div>

        <div style={{
          background: tokens.colors.bgNavy,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          marginBottom: tokens.spacing.lg,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: tokens.spacing.sm,
          }}>
            <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.05em' }}>
              SYSTEM PROMPT
            </p>
            <button
              onClick={handleCopy}
              style={{
                background: copied ? tokens.colors.teal : 'rgba(255,255,255,0.1)',
                color: tokens.colors.textInverse,
                border: 'none',
                borderRadius: tokens.radius.sm,
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre style={{
            fontSize: '13px',
            color: tokens.colors.textInverse,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.6,
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            opacity: 0.9,
          }}>
            {systemPrompt}
          </pre>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
          <Button variant="primary" onClick={onComplete}>
            Start using RUMO
          </Button>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy prompt'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// VIEWS: Synthesis
// ============================================
const SynthesisView = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<{role: 'cos' | 'user'; text: string}[]>([
    { role: 'cos', text: "What would be useful to think through this morning?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user' as const, text: input }]);
    setInput('');

    setTimeout(() => {
      const responses = [
        "What's the core tension there?",
        "What would clarity look like?",
        "What's actually at stake?",
      ];
      setMessages(prev => [...prev, {
        role: 'cos' as const,
        text: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: tokens.colors.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: tokens.spacing.md,
        borderBottom: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.md,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: tokens.colors.textMuted,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ← Back
        </button>
        <div>
          <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.1em' }}>SYNTHESIS</p>
          <p style={{ fontSize: '16px', color: tokens.colors.textPrimary }}>Morning orientation</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: tokens.spacing.lg, maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ paddingLeft: msg.role === 'user' ? tokens.spacing.lg : 0 }}>
              <p style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: msg.role === 'user' ? tokens.colors.textPrimary : tokens.colors.textSecondary
              }}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: tokens.spacing.md,
        borderTop: `1px solid ${tokens.colors.border}`,
        background: tokens.colors.bgCard,
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: tokens.spacing.sm }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type here..."
            style={{
              flex: 1,
              padding: tokens.spacing.sm,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              fontSize: '16px',
              outline: 'none',
            }}
          />
          <Button variant="primary" onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
