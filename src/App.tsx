import { useState } from 'react';

// ============================================
// DESIGN SYSTEM - Cream & Navy
// ============================================
const tokens = {
  colors: {
    // Clean white foundation for breathability
    cream: '#FFFFFF',
    creamDark: '#F8F9FA',
    white: '#FFFFFF',
    black: '#000000',

    // Royal blue family
    navy: '#3D5A80',
    navyLight: '#4A6FA5',
    navyFaded: '#7B9ABF',

    // Alentejo yellow/ochre - Portuguese building accent
    ochre: '#D4A55A',
    ochreLight: '#E5B86D',
    ochreFaded: 'rgba(212, 165, 90, 0.15)',

    // Grays
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#ADB5BD',
    gray500: '#6C757D',
    gray600: '#495057',

    // Backward compatibility
    accent: '#D4A55A',
    accentLight: '#E5B86D',
    gray50: '#FFFFFF',
    gray700: '#495057',
    gray800: '#3D5A80',
    gray900: '#3D5A80',
    bgPrimary: '#FFFFFF',
    bgCard: '#FFFFFF',
    bgNavy: '#3D5A80',
    bgNavyLight: '#4A6FA5',
    textPrimary: '#3D5A80',
    textSecondary: '#6C757D',
    textMuted: '#ADB5BD',
    textInverse: '#FFFFFF',
    teal: '#D4A55A',
    tealLight: '#E5B86D',
    tealSubtle: 'rgba(212, 165, 90, 0.08)',
    coral: '#E07A5F',
    coralSubtle: 'rgba(224, 122, 95, 0.1)',
    purple: '#7C3AED',
    purpleSubtle: 'rgba(124, 58, 237, 0.08)',
    border: '#E9ECEF',
    borderLight: '#F8F9FA',
    shadowSm: 'rgba(0, 0, 0, 0.04)',
    shadowMd: 'rgba(0, 0, 0, 0.06)',
  },
  font: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Avenir Next", "Avenir", "Montserrat", "Helvetica Neue", sans-serif',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
    9: '96px',
    10: '128px',
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
    full: '9999px',
  },
};

// ============================================
// TYPES
// ============================================
type View = 'landing' | 'setup' | 'dashboard' | 'synthesis';

interface COSProfile {
  stance: string;
  voice: string;
  toneWords: string[];
  formatPreference: string;
  planningStyle: string;
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

// ============================================
// APP
// ============================================
const App = () => {
  const [view, setView] = useState<View>('landing');
  const [cosProfile, setCosProfile] = useState<COSProfile | null>(null);

  if (view === 'landing') {
    return (
      <LandingView
        onSetup={() => setView('setup')}
        onDashboard={() => setView('dashboard')}
        hasProfile={!!cosProfile}
      />
    );
  }

  if (view === 'setup') {
    return (
      <SetupView
        onComplete={(profile) => {
          setCosProfile(profile);
          setView('dashboard');
        }}
        onBack={() => setView('landing')}
      />
    );
  }

  if (view === 'synthesis') {
    return <SynthesisView onBack={() => setView('dashboard')} />;
  }

  // Dashboard view
  return (
    <DashboardView
      onSynthesis={() => setView('synthesis')}
      onLanding={() => setView('landing')}
      onReconfigure={() => setView('setup')}
    />
  );
};

// ============================================
// RUMO LOGO COMPONENT
// ============================================
const RumoLogo = ({ size = 'md', color = '#1A2B3C' }: { size?: 'sm' | 'md' | 'lg'; color?: string }) => {
  const scales = { sm: 0.6, md: 0.75, lg: 1 };
  const scale = scales[size];
  const width = 180 * scale;
  const height = 48 * scale;

  return (
    <svg width={width} height={height} viewBox="0 0 180 48" fill="none">
      {/* R */}
      <path
        d="M0 8h14c8 0 14 5 14 13 0 6-4 10-9 12l10 15h-9l-9-14h-4v14H0V8zm7 6v13h6c5 0 8-3 8-7 0-4-3-6-8-6H7z"
        fill={color}
      />
      {/* U */}
      <path
        d="M36 8h7v26c0 5 3 8 8 8s8-3 8-8V8h7v26c0 9-6 14-15 14s-15-5-15-14V8z"
        fill={color}
      />
      {/* M */}
      <path
        d="M76 8h9l11 24 11-24h9v40h-7V18l-10 22h-6L83 18v30h-7V8z"
        fill={color}
      />
      {/* O as Compass */}
      <g transform="translate(124, 0)">
        {/* Outer circle */}
        <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="3" fill="none" />
        {/* Cardinal tick marks */}
        <line x1="24" y1="4" x2="24" y2="9" stroke={color} strokeWidth="2" />
        <line x1="24" y1="39" x2="24" y2="44" stroke={color} strokeWidth="2" />
        <line x1="4" y1="24" x2="9" y2="24" stroke={color} strokeWidth="2" />
        <line x1="39" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" />
        {/* Intercardinal tick marks */}
        <line x1="38" y1="10" x2="35" y2="13" stroke={color} strokeWidth="1.5" />
        <line x1="38" y1="38" x2="35" y2="35" stroke={color} strokeWidth="1.5" />
        <line x1="10" y1="10" x2="13" y2="13" stroke={color} strokeWidth="1.5" />
        <line x1="10" y1="38" x2="13" y2="35" stroke={color} strokeWidth="1.5" />
        {/* Compass needle - North half (solid) */}
        <path
          d="M24 6 L28 24 L20 24 Z"
          fill={color}
        />
        {/* Compass needle - South half (faded) */}
        <path
          d="M24 42 L28 24 L20 24 Z"
          fill={color}
          fillOpacity="0.3"
        />
        {/* Center dot */}
        <circle cx="24" cy="24" r="3" fill={color} />
      </g>
    </svg>
  );
};

// ============================================
// CALÇADA PATTERN - Authentic Rossio/Copacabana waves
// ============================================
const CalcadaTexture = ({ opacity = 0.08 }: { opacity?: number }) => (
  <svg
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity,
    }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id="calcada-wave" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
        {/* Row 1 - Dark wave band */}
        <path
          d="M0 20
             C 25 5, 50 5, 75 20
             C 100 35, 125 35, 150 20
             C 175 5, 200 5, 225 20
             L 225 35
             C 200 20, 175 20, 150 35
             C 125 50, 100 50, 75 35
             C 50 20, 25 20, 0 35
             Z"
          fill="currentColor"
        />
        {/* Row 2 - Dark wave band */}
        <path
          d="M0 55
             C 25 40, 50 40, 75 55
             C 100 70, 125 70, 150 55
             C 175 40, 200 40, 225 55
             L 225 70
             C 200 55, 175 55, 150 70
             C 125 85, 100 85, 75 70
             C 50 55, 25 55, 0 70
             Z"
          fill="currentColor"
        />
        {/* Row 3 - Partial for seamless tiling */}
        <path
          d="M0 90
             C 25 75, 50 75, 75 90
             C 100 105, 125 105, 150 90
             C 175 75, 200 75, 225 90
             L 225 100
             L 0 100
             Z"
          fill="currentColor"
        />
        {/* Top partial for seamless tiling */}
        <path
          d="M0 0
             L 225 0
             L 225 5
             C 200 -10, 175 -10, 150 5
             C 125 20, 100 20, 75 5
             C 50 -10, 25 -10, 0 5
             Z"
          fill="currentColor"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#calcada-wave)" />
  </svg>
);

// ============================================
// LANDING VIEW - Cream & Navy with Calçada
// ============================================
const LandingView = ({
  onSetup,
  onDashboard,
  hasProfile,
}: {
  onSetup: () => void;
  onDashboard: () => void;
  hasProfile: boolean;
}) => (
  <div style={{
    background: tokens.colors.cream,
    minHeight: '100vh',
    fontFamily: tokens.font.sans,
    color: tokens.colors.navy,
  }}>
    {/* Navigation - Minimal */}
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: `${tokens.space[5]} ${tokens.space[7]}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      background: 'rgba(250, 248, 245, 0.85)',
      backdropFilter: 'blur(20px)',
    }}>
      <RumoLogo size="sm" color={tokens.colors.navy} />
      <div style={{ display: 'flex', gap: tokens.space[6], alignItems: 'center' }}>
        {hasProfile && (
          <button
            onClick={onDashboard}
            style={{
              background: 'none',
              border: 'none',
              color: tokens.colors.navyFaded,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: tokens.font.sans,
            }}
          >
            DASHBOARD
          </button>
        )}
        <button
          onClick={onSetup}
          style={{
            background: tokens.colors.ochre,
            color: tokens.colors.white,
            border: 'none',
            padding: '10px 20px',
            borderRadius: tokens.radius.full,
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: tokens.font.display,
          }}
        >
          SET YOUR COURSE
        </button>
      </div>
    </nav>

    {/* Hero - Single powerful statement */}
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Calçada wave texture - hero only */}
      <div style={{ color: tokens.colors.navyFaded, position: 'absolute', inset: 0 }}>
        <CalcadaTexture opacity={0.06} />
      </div>

      <div style={{ marginBottom: tokens.space[7], position: 'relative', zIndex: 1 }}>
        <RumoLogo size="lg" color={tokens.colors.navy} />
      </div>

      <h1 style={{
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        marginBottom: tokens.space[6],
        maxWidth: '900px',
        fontFamily: tokens.font.display,
        color: tokens.colors.navy,
        position: 'relative',
        zIndex: 1,
      }}>
        Find your direction.
      </h1>

      <p style={{
        fontSize: 'clamp(18px, 2vw, 22px)',
        color: tokens.colors.navyFaded,
        maxWidth: '600px',
        lineHeight: 1.6,
        marginBottom: tokens.space[8],
        position: 'relative',
        zIndex: 1,
      }}>
        RUMO is an AI-powered personal navigation system that helps you clarify where you're going—and act with intention to get there.
      </p>

      <p style={{
        fontSize: '20px',
        color: tokens.colors.navy,
        marginBottom: tokens.space[4],
        fontFamily: tokens.font.display,
        fontWeight: 700,
        letterSpacing: '0.02em',
        position: 'relative',
        zIndex: 1,
      }}>
        Begin by creating your personal Chief of Staff.
      </p>

      <button
        onClick={onSetup}
        style={{
          background: tokens.colors.ochre,
          color: tokens.colors.white,
          border: 'none',
          padding: '16px 32px',
          borderRadius: tokens.radius.full,
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: tokens.font.display,
          position: 'relative',
          zIndex: 1,
        }}
      >
        START HERE
      </button>

    </section>

    {/* Problem - One idea */}
    <section style={{
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '640px', textAlign: 'center' }}>
        <p style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          lineHeight: 1.4,
          color: tokens.colors.navy,
          fontFamily: tokens.font.display,
        }}>
          You're moving fast.
          <br />
          <span style={{ color: tokens.colors.navyFaded }}>But toward what?</span>
        </p>
      </div>
    </section>

    {/* Solution - Chief of Staff */}
    <section style={{
      background: tokens.colors.navy,
      color: tokens.colors.cream,
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          color: tokens.colors.navyFaded,
          marginBottom: tokens.space[5],
          fontFamily: tokens.font.display,
          fontWeight: 600,
        }}>
          THE SOLUTION
        </p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: tokens.space[6],
          fontFamily: tokens.font.display,
        }}>
          Your Chief of Staff
        </h2>
        <p style={{
          fontSize: '18px',
          lineHeight: 1.7,
          color: tokens.colors.creamDark,
          maxWidth: '560px',
          opacity: 0.8,
        }}>
          An AI thinking partner configured to how you work. Each morning, it helps you see what matters, cut through noise, and orient your day.
        </p>
      </div>
    </section>

    {/* Frameworks - Minimal grid */}
    <section style={{
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: tokens.space[8],
        }}>
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: tokens.colors.navy,
              marginBottom: tokens.space[4],
              fontFamily: tokens.font.display,
            }}>
              WAVES
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: tokens.colors.navyLight,
              marginBottom: tokens.space[3],
            }}>
              Five dimensions of fulfillment. Not goals—states to inhabit.
            </p>
            <p style={{
              fontSize: '14px',
              color: tokens.colors.navyFaded,
            }}>
              Whole · Accomplished · Vital · Expressive · Satisfied
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: tokens.colors.navy,
              marginBottom: tokens.space[4],
              fontFamily: tokens.font.display,
            }}>
              SWEATS
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: tokens.colors.navyLight,
              marginBottom: tokens.space[3],
            }}>
              Six daily practices that create movement. Small actions, compounded.
            </p>
            <p style={{
              fontSize: '14px',
              color: tokens.colors.navyFaded,
            }}>
              Synthesis · Work · Energy · Art · Ties · Service
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section style={{
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
      textAlign: 'center',
      borderTop: `1px solid ${tokens.colors.creamDark}`,
    }}>
      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 800,
        marginBottom: tokens.space[4],
        fontFamily: tokens.font.display,
        color: tokens.colors.navy,
      }}>
        Ready?
      </h2>
      <p style={{
        fontSize: '18px',
        color: tokens.colors.navyFaded,
        marginBottom: tokens.space[7],
      }}>
        Set up your Chief of Staff in five minutes.
      </p>
      <button
        onClick={onSetup}
        style={{
          background: tokens.colors.ochre,
          color: tokens.colors.white,
          border: 'none',
          padding: '16px 40px',
          borderRadius: tokens.radius.full,
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: tokens.font.display,
        }}
      >
        BEGIN SETUP
      </button>
    </section>

    {/* Footer - Minimal */}
    <footer style={{
      padding: `${tokens.space[6]} ${tokens.space[5]}`,
      borderTop: `1px solid ${tokens.colors.creamDark}`,
      textAlign: 'center',
    }}>
      <p style={{
        fontSize: '13px',
        color: tokens.colors.navyFaded,
        fontFamily: tokens.font.display,
        fontWeight: 600,
        letterSpacing: '0.1em',
      }}>
        © 2026 RUMO
      </p>
    </footer>
  </div>
);

// ============================================
// SETUP VIEW - COS Generator
// ============================================
const SETUP_SECTIONS = [
  { id: 'stance', title: 'Stance & Style' },
  { id: 'context', title: 'Context Capture' },
  { id: 'constraints', title: 'Operating Constraints' },
  { id: 'values', title: 'Values & Guardrails' },
  { id: 'relationship', title: 'AI Relationship' },
  { id: 'output', title: 'Output Preferences' },
];

const SetupView = ({
  onComplete,
  onBack,
}: {
  onComplete: (profile: COSProfile) => void;
  onBack: () => void;
}) => {
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
      const textFields: Record<string, keyof COSProfile> = {
        '1-0': 'role', '1-1': 'outcomes', '1-2': 'decisions', '1-3': 'uncertainty', '1-4': 'avoidance',
        '2-0': 'constraints', '2-1': 'goodDay', '2-2': 'badDay',
        '3-0': 'protectedValues', '3-1': 'boundaries', '3-2': 'accountability',
        '4-0': 'currentAIUse', '4-1': 'idealPartner', '4-2': 'existingTools',
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
    const maxSubSteps = [5, 5, 4, 3, 3, 2];
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
      const maxSubSteps = [5, 5, 4, 3, 3, 2];
      setSection(section - 1);
      setSubStep(maxSubSteps[section - 1] - 1);
    } else {
      onBack();
    }
  };

  const totalSteps = 22;
  const currentStep = [0, 5, 10, 14, 17, 20][section] + subStep;

  if (showOutput) {
    return <SetupOutputView profile={profile as COSProfile} onComplete={() => onComplete(profile as COSProfile)} />;
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
          ← BACK
        </button>
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
              title="I want my Chief of Staff to be..."
              subtitle="Choose the archetype that resonates with how you want to be supported."
              type="choice"
              options={[
                { value: 'challenger', label: 'The Challenger', desc: 'Pushes back, surfaces blind spots, won\'t let you off easy' },
                { value: 'muse', label: 'The Muse', desc: 'Sparks ideas, connects dots, inspires new thinking' },
                { value: 'scientist', label: 'The Scientist', desc: 'Analyzes data, tests assumptions, seeks evidence' },
                { value: 'coach', label: 'The Coach', desc: 'Encourages growth, builds confidence, celebrates wins' },
                { value: 'strategist', label: 'The Strategist', desc: 'Plans ahead, sees the big picture, anticipates obstacles' },
                { value: 'anchor', label: 'The Anchor', desc: 'Grounds you, provides calm, steadies the ship' },
              ]}
              selected={profile.stance}
              onSelect={(v) => { updateProfile('stance', v); advanceStep(); }}
            />
          )}
          {section === 0 && subStep === 1 && (
            <SetupQuestion
              title="How should your Chief of Staff present?"
              subtitle="Choose a voice and persona."
              type="choice"
              options={[
                { value: 'masculine', label: 'Masculine', desc: 'He/him, more assertive tone' },
                { value: 'feminine', label: 'Feminine', desc: 'She/her, more nurturing tone' },
                { value: 'neutral', label: 'Neutral', desc: 'They/them, balanced and non-gendered' },
                { value: 'abstract', label: 'Abstract', desc: 'No persona, pure function' },
              ]}
              selected={profile.voice}
              onSelect={(v) => { updateProfile('voice', v); advanceStep(); }}
            />
          )}
          {section === 0 && subStep === 2 && (
            <SetupQuestion
              title="Choose the characteristics you want your Chief of Staff to have."
              subtitle="Select three."
              type="multi"
              options={TONE_OPTIONS.map(t => ({ value: t, label: t }))}
              selected={profile.toneWords}
              onToggle={(v) => toggleArrayItem('toneWords', v)}
              onNext={(profile.toneWords?.length || 0) >= 3 ? advanceStep : undefined}
            />
          )}
          {section === 0 && subStep === 3 && (
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
          {section === 0 && subStep === 4 && (
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
            <SetupQuestion title="What is your current role?" subtitle="Include multiple roles if relevant." type="text" value={textInput} onChange={setTextInput} placeholder="e.g., VP of Product at a Series B startup, also a parent of two" onNext={handleNext} />
          )}
          {section === 1 && subStep === 1 && (
            <SetupQuestion title="What are your top three outcomes for the next 90 days?" type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Launch v2, hire two senior engineers, establish exec team rhythm" onNext={handleNext} multiline />
          )}
          {section === 1 && subStep === 2 && (
            <SetupQuestion title="What are the three recurring decisions you make that have the biggest impact?" type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Resource allocation, roadmap prioritization, hiring calls" onNext={handleNext} multiline />
          )}
          {section === 1 && subStep === 3 && (
            <SetupQuestion title="Where does uncertainty show up most right now?" type="text" value={textInput} onChange={setTextInput} placeholder="What keeps you uncertain or anxious?" onNext={handleNext} multiline />
          )}
          {section === 1 && subStep === 4 && (
            <SetupQuestion title="What do you consistently avoid or delay, even though it matters?" type="text" value={textInput} onChange={setTextInput} placeholder="Be honest—this helps your COS know where to push" onNext={handleNext} multiline />
          )}

          {/* Section 2: Operating Constraints */}
          {section === 2 && subStep === 0 && (
            <SetupQuestion title="What constraints are real right now?" subtitle="Time, energy, money, family, attention, health, etc." type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Limited bandwidth, young kids, recovering from burnout" onNext={handleNext} multiline />
          )}
          {section === 2 && subStep === 1 && (
            <SetupQuestion title="What does a good day look like?" type="text" value={textInput} onChange={setTextInput} placeholder="Describe the texture—energy, accomplishment, presence" onNext={handleNext} multiline />
          )}
          {section === 2 && subStep === 2 && (
            <SetupQuestion title="What does a bad day look like?" type="text" value={textInput} onChange={setTextInput} placeholder="What patterns show up when things go wrong?" onNext={handleNext} multiline />
          )}
          {section === 2 && subStep === 3 && (
            <SetupQuestion title="What are your most common failure modes?" subtitle="Select all that apply" type="multi" options={FAILURE_MODES.map(f => ({ value: f, label: f }))} selected={profile.failureModes} onToggle={(v) => toggleArrayItem('failureModes', v)} onNext={advanceStep} />
          )}

          {/* Section 3: Values & Guardrails */}
          {section === 3 && subStep === 0 && (
            <SetupQuestion title="What values should your Chief of Staff protect at all costs?" type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Integrity, family time, creative freedom, health" onNext={handleNext} multiline />
          )}
          {section === 3 && subStep === 1 && (
            <SetupQuestion title="What boundaries should your COS never cross?" type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Never encourage overwork, don't schedule during family dinner" onNext={handleNext} multiline />
          )}
          {section === 3 && subStep === 2 && (
            <SetupQuestion title="What kind of accountability actually works for you?" type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Gentle reminders, direct callouts, progress tracking" onNext={handleNext} multiline />
          )}

          {/* Section 4: AI Relationship */}
          {section === 4 && subStep === 0 && (
            <SetupQuestion title="How are you currently using AI, and what frustrates you?" type="text" value={textInput} onChange={setTextInput} placeholder="Be specific about pain points" onNext={handleNext} multiline />
          )}
          {section === 4 && subStep === 1 && (
            <SetupQuestion title="What would make AI feel like a true partner?" type="text" value={textInput} onChange={setTextInput} placeholder="What's missing from your current experience?" onNext={handleNext} multiline />
          )}
          {section === 4 && subStep === 2 && (
            <SetupQuestion title="What tools or systems are already part of your daily life?" type="text" value={textInput} onChange={setTextInput} placeholder="e.g., Notion, Linear, Apple Notes, calendar blocking" onNext={handleNext} multiline />
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

// ============================================
// SETUP QUESTION COMPONENT
// ============================================
const SetupQuestion = ({
  title,
  subtitle,
  type,
  options,
  selected,
  onSelect,
  onToggle,
  onNext,
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
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) => (
  <div>
    <h2 style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.xs, lineHeight: 1.3, fontFamily: tokens.font.display }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.lg }}>{subtitle}</p>
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
              borderRadius: tokens.radius.full,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: 500, color: selected === opt.value ? tokens.colors.textInverse : tokens.colors.textPrimary }}>{opt.label}</p>
            {opt.desc && <p style={{ fontSize: '13px', color: selected === opt.value ? 'rgba(255,255,255,0.7)' : tokens.colors.textMuted, marginTop: '2px' }}>{opt.desc}</p>}
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
                  borderRadius: tokens.radius.full,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isSelected ? tokens.colors.textInverse : tokens.colors.textPrimary,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {onNext && (
          <button onClick={onNext} style={{ marginTop: tokens.spacing.lg, padding: '12px 24px', background: tokens.colors.bgNavy, color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
            CONTINUE
          </button>
        )}
      </>
    )}

    {type === 'text' && (
      <>
        {multiline ? (
          <textarea value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} style={{ width: '100%', minHeight: '120px', padding: tokens.spacing.sm, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.md, fontSize: '16px', lineHeight: 1.5, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
        ) : (
          <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: tokens.spacing.sm, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.md, fontSize: '16px', outline: 'none' }} />
        )}
        <button onClick={onNext} disabled={!value?.trim()} style={{ marginTop: tokens.spacing.md, padding: '12px 24px', background: value?.trim() ? tokens.colors.bgNavy : tokens.colors.border, color: value?.trim() ? tokens.colors.textInverse : tokens.colors.textMuted, border: 'none', borderRadius: tokens.radius.full, fontSize: '14px', fontWeight: 500, cursor: value?.trim() ? 'pointer' : 'not-allowed' }}>
          Continue
        </button>
      </>
    )}
  </div>
);

// ============================================
// SETUP OUTPUT VIEW
// ============================================
const SetupOutputView = ({ profile, onComplete }: { profile: COSProfile; onComplete: () => void }) => {
  const [copied, setCopied] = useState(false);

  const generateSystemPrompt = () => {
    const archetypeDesc: Record<string, string> = {
      challenger: 'The Challenger—you push back, surface blind spots, and won\'t let me off easy',
      muse: 'The Muse—you spark ideas, connect dots, and inspire new thinking',
      scientist: 'The Scientist—you analyze data, test assumptions, and seek evidence',
      coach: 'The Coach—you encourage growth, build confidence, and celebrate wins',
      strategist: 'The Strategist—you plan ahead, see the big picture, and anticipate obstacles',
      anchor: 'The Anchor—you ground me, provide calm, and steady the ship',
    };

    const voiceDesc: Record<string, string> = {
      masculine: 'Use he/him pronouns if referring to yourself. Take a more assertive, direct tone.',
      feminine: 'Use she/her pronouns if referring to yourself. Take a more nurturing, empathetic tone.',
      neutral: 'Use they/them pronouns if referring to yourself. Maintain a balanced, non-gendered presence.',
      abstract: 'Do not refer to yourself with pronouns. You are pure function, not persona.',
    };

    return `# Personal Chief of Staff

## Who You Are
You are my Chief of Staff—a thinking partner who helps me maintain direction and make better decisions. You embody ${archetypeDesc[profile.stance] || 'a supportive partner'}.

${profile.voice && profile.voice !== 'abstract' ? `## Persona\n${voiceDesc[profile.voice] || ''}\n` : ''}
## Tone & Style
- Characteristics: ${profile.toneWords?.join(', ') || 'direct, calm, thoughtful'}
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
3. ${profile.stance === 'challenger' ? 'Challenge comfortable answers' : 'Support forward momentum'}
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
    <div style={{ minHeight: '100vh', background: tokens.colors.bgPrimary, padding: tokens.spacing.lg }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.1em', marginBottom: tokens.spacing.xs }}>CHIEF OF STAFF GENERATOR</p>
          <h1 style={{ fontSize: '32px', fontWeight: 400, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.sm }}>Your COS is ready</h1>
          <p style={{ fontSize: '16px', color: tokens.colors.textSecondary }}>Copy this system prompt into your preferred LLM's custom instructions.</p>
        </div>

        <div style={{ background: tokens.colors.bgNavy, borderRadius: tokens.radius.lg, padding: tokens.spacing.md, marginBottom: tokens.spacing.lg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.sm }}>
            <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.05em' }}>SYSTEM PROMPT</p>
            <button onClick={handleCopy} style={{ background: copied ? tokens.colors.teal : 'rgba(255,255,255,0.1)', color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>
          <pre style={{ fontSize: '13px', color: tokens.colors.textInverse, whiteSpace: 'pre-wrap', lineHeight: 1.6, maxHeight: '400px', overflowY: 'auto', fontFamily: 'monospace', opacity: 0.9 }}>
            {systemPrompt}
          </pre>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
          <button onClick={onComplete} style={{ padding: '14px 28px', background: tokens.colors.bgNavy, color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
            CONTINUE TO RUMO
          </button>
          <button onClick={handleCopy} style={{ padding: '14px 28px', background: 'transparent', color: tokens.colors.textPrimary, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
            {copied ? 'COPIED!' : 'COPY PROMPT'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPASS COMPONENT
// ============================================
const CompassVisual = ({ heading = 160 }: { heading?: number }) => {
  const size = 200;
  const center = size / 2;
  const outerRadius = 85;
  const innerRadius = 60;

  // Convert heading to radians (0° = North, clockwise)
  const rad = (heading - 90) * (Math.PI / 180);
  const pointerX = center + Math.cos(rad) * (outerRadius - 15);
  const pointerY = center + Math.sin(rad) * (outerRadius - 15);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer circle */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#E5E7EB" strokeWidth="2" />

        {/* Inner circle */}
        <circle cx={center} cy={center} r={innerRadius} fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />

        {/* Wave decoration inside */}
        <path
          d={`M ${center - 40} ${center + 10} Q ${center - 20} ${center - 5} ${center} ${center + 10} T ${center + 40} ${center + 10}`}
          fill="none" stroke="#D1D5DB" strokeWidth="1.5"
        />
        <path
          d={`M ${center - 35} ${center + 20} Q ${center - 15} ${center + 5} ${center + 5} ${center + 20} T ${center + 35} ${center + 20}`}
          fill="none" stroke="#E5E7EB" strokeWidth="1"
        />

        {/* Cardinal directions */}
        <text x={center} y="25" textAnchor="middle" fontSize="14" fontWeight="500" fill="#5A6B7D">N</text>
        <text x={size - 15} y={center + 5} textAnchor="middle" fontSize="14" fontWeight="500" fill="#5A6B7D">E</text>
        <text x={center} y={size - 12} textAnchor="middle" fontSize="14" fontWeight="500" fill="#5A6B7D">S</text>
        <text x="15" y={center + 5} textAnchor="middle" fontSize="14" fontWeight="500" fill="#5A6B7D">W</text>

        {/* Heading number */}
        <text x={center} y={center + 8} textAnchor="middle" fontSize="36" fontWeight="300" fill="#0C2340">{heading}°</text>

        {/* Direction pointer */}
        <circle cx={pointerX} cy={pointerY} r="6" fill="#5A6B7D" />
        <polygon
          points={`${pointerX + 8},${pointerY} ${pointerX + 16},${pointerY - 4} ${pointerX + 16},${pointerY + 4}`}
          fill="#5A6B7D"
        />
      </svg>
    </div>
  );
};

// ============================================
// PROGRESS CHART COMPONENT
// ============================================
const WeeklyProgressChart = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const values = [45, 60, 75, 85, 70, 55, 40]; // Example values
  const maxHeight = 80;
  const today = new Date().getDay();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: maxHeight + 30, marginBottom: tokens.spacing.sm }}>
        {days.map((day, i) => {
          const height = (values[i] / 100) * maxHeight;
          const isToday = i === today;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '32px',
                  height: height,
                  background: isToday ? tokens.colors.textSecondary : '#CBD5E1',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                }}
              >
                {isToday && (
                  <div style={{
                    position: 'absolute',
                    bottom: -20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '6px',
                    background: tokens.colors.textSecondary,
                    borderRadius: '50%',
                  }} />
                )}
              </div>
              <span style={{ fontSize: '12px', color: tokens.colors.textMuted, marginTop: '8px' }}>{day}</span>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: '13px', color: tokens.colors.textMuted, textAlign: 'center' }}>
        Five-Day Streak • Last updated {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
      </p>
    </div>
  );
};

// ============================================
// DASHBOARD VIEW (Post-Setup / Returning User)
// ============================================
const DashboardView = ({
  onSynthesis,
  onLanding,
  onReconfigure,
}: {
  onSynthesis: () => void;
  onLanding: () => void;
  onReconfigure: () => void;
}) => (
  <div style={{ background: tokens.colors.bgPrimary, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    {/* Header */}
    <header style={{
      padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
      borderBottom: `1px solid ${tokens.colors.border}`,
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button onClick={onLanding} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <RumoLogo size="sm" color={tokens.colors.textPrimary} />
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.lg }}>
          <button style={{ background: 'none', border: 'none', fontSize: '14px', color: tokens.colors.textSecondary, cursor: 'pointer' }}>HOW IT WORKS</button>
          <button style={{ background: 'none', border: 'none', fontSize: '14px', color: tokens.colors.textSecondary, cursor: 'pointer' }}>WAVES</button>
          <button style={{ background: 'none', border: 'none', fontSize: '14px', color: tokens.colors.textSecondary, cursor: 'pointer' }}>SWEATS</button>
          <button onClick={onReconfigure} style={{ background: 'none', border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.full, padding: '8px 16px', fontSize: '14px', color: tokens.colors.textPrimary, cursor: 'pointer' }}>SIGN IN</button>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <section style={{
      padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
      borderBottom: `1px solid ${tokens.colors.border}`,
      background: tokens.colors.bgCard,
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: tokens.spacing.xl,
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 400, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.xs }}>
            Find Your Direction
          </h1>
          <p style={{ fontSize: '16px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.lg }}>
            Reflect. Choose. Act with clarity, every day.
          </p>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            <button onClick={onSynthesis} style={{
              padding: '12px 24px',
              background: tokens.colors.teal,
              color: tokens.colors.textInverse,
              border: 'none',
              borderRadius: tokens.radius.full,
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              START TODAY'S SYNTHESIS
            </button>
            <button onClick={onReconfigure} style={{
              padding: '12px 24px',
              background: 'transparent',
              color: tokens.colors.textPrimary,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.full,
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              SET UP CHIEF OF STAFF
              <span style={{ color: tokens.colors.textMuted }}>›</span>
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.sm }}>Your Heading</p>
          <CompassVisual heading={160} />
        </div>
      </div>
    </section>

    {/* Action Cards */}
    <section style={{ padding: `${tokens.spacing.xl} ${tokens.spacing.lg}` }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: tokens.spacing.md,
      }}>
        {/* Daily Synthesis Card - teal accent */}
        <div style={{
          background: `linear-gradient(135deg, ${tokens.colors.bgCard} 0%, ${tokens.colors.tealSubtle} 100%)`,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          boxShadow: `0 1px 3px ${tokens.colors.shadowSm}`,
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 500, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.xs }}>Daily Synthesis</h3>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.md }}>Review & reflect.</p>
          <button onClick={onSynthesis} style={{
            padding: '10px 20px',
            background: tokens.colors.teal,
            color: tokens.colors.textInverse,
            border: 'none',
            borderRadius: tokens.radius.full,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            BEGIN
            <span>›</span>
          </button>
        </div>

        {/* Track WAVES Card - coral accent */}
        <div style={{
          background: `linear-gradient(135deg, ${tokens.colors.bgCard} 0%, ${tokens.colors.coralSubtle} 100%)`,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          boxShadow: `0 1px 3px ${tokens.colors.shadowSm}`,
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 500, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.xs }}>Track Your WAVES</h3>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.md }}>Check-In to Balance.</p>
          <button style={{
            padding: '10px 20px',
            background: 'transparent',
            color: tokens.colors.textPrimary,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: tokens.radius.full,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            VIEW
            <span style={{ color: tokens.colors.textMuted }}>›</span>
          </button>
        </div>

        {/* Run SWEATS Card - purple accent */}
        <div style={{
          background: `linear-gradient(135deg, ${tokens.colors.bgCard} 0%, ${tokens.colors.purpleSubtle} 100%)`,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          boxShadow: `0 1px 3px ${tokens.colors.shadowSm}`,
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 500, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.xs }}>Run Your SWEATS</h3>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.md }}>Log Intentions.</p>
          <button style={{
            padding: '10px 20px',
            background: 'transparent',
            color: tokens.colors.textPrimary,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: tokens.radius.full,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            START
            <span style={{ color: tokens.colors.textMuted }}>›</span>
          </button>
        </div>
      </div>
    </section>

    {/* Weekly Progress */}
    <section style={{ padding: `0 ${tokens.spacing.lg} ${tokens.spacing.xl}` }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: tokens.colors.bgCard,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        boxShadow: `0 1px 3px ${tokens.colors.shadowSm}`,
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 500, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.lg }}>Your Progress This Week</h3>
        <WeeklyProgressChart />
      </div>
    </section>

    {/* Footer */}
    <footer style={{
      marginTop: 'auto',
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      borderTop: `1px solid ${tokens.colors.border}`,
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        gap: tokens.spacing.lg,
        alignItems: 'center',
      }}>
        <button style={{ background: 'none', border: 'none', fontSize: '13px', color: tokens.colors.textMuted, cursor: 'pointer' }}>PRIVACY</button>
        <span style={{ color: tokens.colors.border }}>|</span>
        <button style={{ background: 'none', border: 'none', fontSize: '13px', color: tokens.colors.textMuted, cursor: 'pointer' }}>CONTACT</button>
        <span style={{ color: tokens.colors.border }}>|</span>
        <button style={{ background: 'none', border: 'none', fontSize: '13px', color: tokens.colors.textMuted, cursor: 'pointer' }}>ABOUT</button>
        <span style={{ color: tokens.colors.border }}>|</span>
        <span style={{ fontSize: '13px', color: tokens.colors.textMuted }}>© RUMO</span>
      </div>
    </footer>
  </div>
);

// ============================================
// SYNTHESIS VIEW
// ============================================
const SynthesisView = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'cos' | 'user'; text: string }[]>([
    { role: 'cos', text: "What would be useful to think through this morning?" }
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
        "Where's the misalignment?",
        "What's one thing that would make today useful?",
      ];
      setMessages(prev => [...prev, { role: 'cos', text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', background: tokens.colors.bgPrimary, display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: tokens.spacing.md, borderBottom: `1px solid ${tokens.colors.border}`, display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: tokens.colors.textMuted, cursor: 'pointer', fontSize: '14px' }}>← BACK</button>
        <div>
          <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.1em' }}>SYNTHESIS</p>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary }}>Morning orientation</p>
        </div>
      </header>

      <div style={{ flex: 1, padding: tokens.spacing.lg, maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ paddingLeft: msg.role === 'user' ? tokens.spacing.lg : 0 }}>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: msg.role === 'user' ? tokens.colors.textPrimary : tokens.colors.textSecondary }}>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: tokens.spacing.md, borderTop: `1px solid ${tokens.colors.border}`, background: tokens.colors.bgCard }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: tokens.spacing.sm }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type here..."
            style={{ flex: 1, padding: tokens.spacing.sm, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.md, fontSize: '16px', outline: 'none' }}
          />
          <button onClick={handleSend} style={{ padding: '12px 24px', background: tokens.colors.bgNavy, color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>SEND</button>
        </div>
      </div>
    </div>
  );
};

export default App;
