import { useState, useEffect } from 'react';

// ============================================
// GLOBAL STYLES - Animations & Hover Effects
// ============================================
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes wave {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(-10px); }
    }

    @keyframes compass-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes glow-pulse {
      0%, 100% {
        box-shadow: 0 0 20px rgba(212, 165, 90, 0.3), 0 8px 32px rgba(212, 165, 90, 0.2);
      }
      50% {
        box-shadow: 0 0 40px rgba(212, 165, 90, 0.5), 0 12px 48px rgba(212, 165, 90, 0.3);
      }
    }

    @keyframes gentle-bounce {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-3px) rotate(1deg); }
      75% { transform: translateY(-3px) rotate(-1deg); }
    }

    @keyframes slow-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes wave-flow {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-glow {
      animation: glow-pulse 3s ease-in-out infinite;
    }

    .animate-gentle-bounce {
      animation: gentle-bounce 4s ease-in-out infinite;
    }

    .animate-slow-spin {
      animation: slow-spin 20s linear infinite;
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-wave {
      animation: wave 4s ease-in-out infinite;
    }

    .btn-primary {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .btn-primary:hover::before {
      left: 100%;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(212, 165, 90, 0.35);
    }

    .btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 4px 15px rgba(212, 165, 90, 0.25);
    }

    .btn-secondary {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(61, 90, 128, 0.2);
      background: #3D5A80 !important;
      color: white !important;
    }

    .btn-secondary:active {
      transform: translateY(0);
    }

    .btn-ghost {
      transition: all 0.25s ease;
    }

    .btn-ghost:hover {
      background: rgba(61, 90, 128, 0.08) !important;
      color: #3D5A80 !important;
    }

    .card-hover {
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .link-hover {
      transition: all 0.2s ease;
      position: relative;
    }

    .link-hover::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: #D4A55A;
      transition: width 0.3s ease;
    }

    .link-hover:hover::after {
      width: 100%;
    }

    .option-btn {
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .option-btn:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 15px rgba(61, 90, 128, 0.15);
    }

    .chip-btn {
      transition: all 0.2s ease;
    }

    .chip-btn:hover {
      transform: scale(1.05);
    }

    .chip-btn:active {
      transform: scale(0.98);
    }

    .callout-box {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .callout-box:hover {
      transform: translateY(-4px) rotate(1deg);
      box-shadow: 0 15px 40px rgba(212, 165, 90, 0.25);
    }

    .logo-hover {
      transition: all 0.3s ease;
    }

    .logo-hover:hover {
      transform: scale(1.05);
    }

    .progress-bar {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .input-focus {
      transition: all 0.25s ease;
    }

    .input-focus:focus {
      border-color: #D4A55A !important;
      box-shadow: 0 0 0 3px rgba(212, 165, 90, 0.15);
    }

    /* Staggered animations */
    .stagger-1 { animation-delay: 0.1s; }
    .stagger-2 { animation-delay: 0.2s; }
    .stagger-3 { animation-delay: 0.3s; }
    .stagger-4 { animation-delay: 0.4s; }
    .stagger-5 { animation-delay: 0.5s; }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }

    /* Selection color */
    ::selection {
      background: rgba(212, 165, 90, 0.3);
      color: #3D5A80;
    }
  `}</style>
);

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
    sans: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    display: '"DM Serif Display", Georgia, serif',
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
  cosName: string;
}

// ============================================
// LOCAL STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  COS_PROFILE: 'rumo_cos_profile',
  HAS_COMPLETED_SETUP: 'rumo_setup_complete',
};

// ============================================
// APP
// ============================================
const App = () => {
  const [view, setView] = useState<View>('landing');
  const [cosProfile, setCosProfile] = useState<COSProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.COS_PROFILE);
      const hasCompletedSetup = localStorage.getItem(STORAGE_KEYS.HAS_COMPLETED_SETUP);

      if (savedProfile && hasCompletedSetup === 'true') {
        setCosProfile(JSON.parse(savedProfile));
        setView('dashboard');
      }
    } catch (e) {
      console.error('Error loading profile from localStorage:', e);
    }
    setIsLoading(false);
  }, []);

  // Save profile to localStorage when it changes
  const saveProfile = (profile: COSProfile) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COS_PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEYS.HAS_COMPLETED_SETUP, 'true');
    } catch (e) {
      console.error('Error saving profile to localStorage:', e);
    }
    setCosProfile(profile);
  };

  // Clear profile (for reconfiguring)
  const clearProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.COS_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.HAS_COMPLETED_SETUP);
    } catch (e) {
      console.error('Error clearing profile from localStorage:', e);
    }
    setCosProfile(null);
  };

  // Show loading state briefly while checking localStorage
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: tokens.colors.cream,
        fontFamily: tokens.font.sans,
      }}>
        <RumoLogo size="lg" color={tokens.colors.navy} accentColor={tokens.colors.ochre} />
      </div>
    );
  }

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
          saveProfile(profile);
          setView('dashboard');
        }}
        onBack={() => cosProfile ? setView('dashboard') : setView('landing')}
      />
    );
  }

  if (view === 'synthesis') {
    return <SynthesisView onBack={() => setView('dashboard')} cosProfile={cosProfile} />;
  }

  // Dashboard view
  return (
    <DashboardView
      onSynthesis={() => setView('synthesis')}
      onLanding={() => setView('landing')}
      onReconfigure={() => setView('setup')}
      cosProfile={cosProfile}
      onClearProfile={clearProfile}
    />
  );
};

// ============================================
// RUMO LOGO COMPONENT
// ============================================
const RumoLogo = ({ size = 'md', color = '#3D5A80', accentColor }: { size?: 'sm' | 'md' | 'lg'; color?: string; accentColor?: string }) => {
  const scales = { sm: 0.6, md: 0.75, lg: 1 };
  const scale = scales[size];
  const width = 200 * scale;
  const height = 52 * scale;
  const compassColor = accentColor || '#C9A227'; // Gold/ochre for compass needle

  return (
    <svg width={width} height={height} viewBox="0 0 200 52" fill="none">
      {/* R - Bold geometric */}
      <path
        d="M0 8h16c9 0 16 6 16 15 0 7-4 12-10 14l12 17h-10l-11-16H8v16H0V8zm8 7v15h7c6 0 9-3 9-8s-3-7-9-7H8z"
        fill={color}
      />
      {/* U - Bold geometric */}
      <path
        d="M40 8h8v28c0 6 4 9 9 9s9-3 9-9V8h8v28c0 10-7 16-17 16s-17-6-17-16V8z"
        fill={color}
      />
      {/* M - Bold geometric */}
      <path
        d="M84 8h10l12 26 12-26h10v46h-8V18l-11 24h-6L92 18v36h-8V8z"
        fill={color}
      />
      {/* O as Compass - matching reference image exactly */}
      <g transform="translate(138, 2)">
        {/* Outer navy ring */}
        <circle cx="24" cy="24" r="23" fill={color} />
        {/* White bezel ring */}
        <circle cx="24" cy="24" r="18.5" fill="white" />
        {/* Inner navy compass face */}
        <circle cx="24" cy="24" r="15" fill={color} />
        {/* Tick marks on white bezel - cardinal directions */}
        <line x1="24" y1="5.5" x2="24" y2="9" stroke={color} strokeWidth="2" />
        <line x1="24" y1="39" x2="24" y2="42.5" stroke={color} strokeWidth="2" />
        <line x1="5.5" y1="24" x2="9" y2="24" stroke={color} strokeWidth="2" />
        <line x1="39" y1="24" x2="42.5" y2="24" stroke={color} strokeWidth="2" />
        {/* Diamond compass needle - clean rhombus shape pointing NE */}
        <path
          d="M24 10 L28 24 L24 28 L20 24 Z"
          fill={compassColor}
        />
        <path
          d="M24 28 L28 24 L24 38 L20 24 Z"
          fill={compassColor}
          fillOpacity="0.4"
        />
        {/* Center dot with highlight */}
        <circle cx="24" cy="24" r="3" fill={color} />
        <circle cx="23" cy="23" r="1" fill="white" fillOpacity="0.5" />
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
    <GlobalStyles />

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

      <div className="animate-fade-in-up" style={{ marginBottom: tokens.space[7], position: 'relative', zIndex: 1 }}>
        <RumoLogo size="lg" color={tokens.colors.navy} accentColor={tokens.colors.ochre} />
      </div>

      <h1 className="animate-fade-in-up stagger-1" style={{
        fontSize: 'clamp(40px, 6vw, 72px)',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        marginBottom: tokens.space[5],
        maxWidth: '900px',
        fontFamily: tokens.font.display,
        color: tokens.colors.navy,
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        Ever feel like you're moving fast but going&nbsp;nowhere?
      </h1>

      <p className="animate-fade-in-up stagger-2" style={{
        fontSize: 'clamp(17px, 2vw, 20px)',
        color: tokens.colors.navy,
        maxWidth: '720px',
        lineHeight: 1.7,
        marginBottom: tokens.space[5],
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        We know the feeling. We've been there&nbsp;too.
      </p>

      <p className="animate-fade-in-up stagger-3" style={{
        fontSize: 'clamp(17px, 2vw, 20px)',
        color: tokens.colors.navy,
        maxWidth: '720px',
        lineHeight: 1.7,
        marginBottom: tokens.space[5],
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        You're using AI every day, but you're probably using it like a glorified search engine, right? Quick answers, random questions, no&nbsp;continuity.
      </p>

      <p className="animate-fade-in-up stagger-4" style={{
        fontSize: 'clamp(17px, 2vw, 20px)',
        color: tokens.colors.navy,
        maxWidth: '720px',
        lineHeight: 1.7,
        marginBottom: tokens.space[6],
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        The truth is, AI can be so much more. It can help you accelerate in the direction you want to head—and that's exactly what RUMO helps you&nbsp;do.
      </p>

      <p className="animate-fade-in-up stagger-5" style={{
        fontSize: '22px',
        color: tokens.colors.ochre,
        marginBottom: tokens.space[5],
        fontFamily: tokens.font.display,
        fontWeight: 700,
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        Finally move with direction.
      </p>

      <p className="animate-fade-in-up stagger-6" style={{
        fontSize: '17px',
        color: tokens.colors.navy,
        marginBottom: tokens.space[5],
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        Start by building your Chief of&nbsp;Staff...
      </p>

      <button
        onClick={onSetup}
        className="btn-primary animate-fade-in-up stagger-7"
        style={{
          background: tokens.colors.ochre,
          color: tokens.colors.white,
          border: 'none',
          padding: '18px 36px',
          borderRadius: tokens.radius.full,
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: tokens.font.sans,
          letterSpacing: '0.05em',
          position: 'relative',
          zIndex: 1,
          opacity: 0,
        }}
      >
        FIND YOUR DIRECTION
      </button>

    </section>


    {/* Problem - Expanded */}
    <section style={{
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: tokens.space[8],
        alignItems: 'start',
      }}>
        {/* Left column - Text */}
        <div style={{ textAlign: 'left' }}>
          <p style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            lineHeight: 1.3,
            color: tokens.colors.navy,
            fontFamily: tokens.font.display,
            marginBottom: tokens.space[6],
          }}>
            You're moving fast.
            <br />
            <span style={{ color: tokens.colors.ochre }}>But toward what?</span>
          </p>

          <div style={{
            fontSize: '17px',
            lineHeight: 1.8,
            color: tokens.colors.navy,
          }}>
            <p style={{ marginBottom: tokens.space[5] }}>
              You're already using AI. But it doesn't know you—your goals, your values, or where you're actually trying to&nbsp;go.
            </p>
            <p style={{ marginBottom: tokens.space[5] }}>
              Meanwhile, the most important areas of your life—your career, your family, your health, your creative work, your desire to serve—remain untouched by the most powerful thinking tool ever&nbsp;created.
            </p>
            <p style={{ fontWeight: 600, color: tokens.colors.ochre }}>
              That's the drift. That's the problem RUMO was designed to&nbsp;solve.
            </p>
          </div>
        </div>

        {/* Right column - Nautical callout - BOLD VERSION */}
        <div
          className="callout-box animate-glow animate-gentle-bounce"
          style={{
            background: `linear-gradient(135deg, ${tokens.colors.navy} 0%, #2D4A6A 100%)`,
            border: `4px solid ${tokens.colors.ochre}`,
            borderRadius: '20px',
            padding: '40px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated background gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 80% 20%, ${tokens.colors.ochre}30 0%, transparent 50%)`,
            pointerEvents: 'none',
          }} />

          {/* Compass rose decoration - top right - SPINNING */}
          <div
            className="animate-slow-spin"
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              width: '80px',
              height: '80px',
              opacity: 0.5,
            }}
          >
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke={tokens.colors.ochre} strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="35" stroke={tokens.colors.ochre} strokeWidth="1.5" fill="none" />
              <path d="M50 5 L55 50 L50 95 L45 50 Z" fill={tokens.colors.ochre} />
              <path d="M5 50 L50 45 L95 50 L50 55 Z" fill={tokens.colors.ochre} opacity="0.7" />
              <circle cx="50" cy="50" r="6" fill={tokens.colors.ochre} />
            </svg>
          </div>

          {/* Anchor decoration - bottom left - FLOATING */}
          <div
            className="animate-float"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '50px',
              height: '50px',
              opacity: 0.4,
            }}
          >
            <svg viewBox="0 0 24 24" fill={tokens.colors.ochre}>
              <path d="M12 2C10.9 2 10 2.9 10 4C10 4.74 10.4 5.39 11 5.73V7H6V9H11V17.27C9.17 16.7 8 15 8 13H6C6 15.76 7.81 18.05 10.26 18.77L10 19H8V21H16V19H14L13.74 18.77C16.19 18.05 18 15.76 18 13H16C16 15 14.83 16.7 13 17.27V9H18V7H13V5.73C13.6 5.39 14 4.74 14 4C14 2.9 13.1 2 12 2Z"/>
            </svg>
          </div>

          {/* Wave decoration at bottom - ANIMATED */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '-100%',
              width: '300%',
              height: '60px',
              opacity: 0.25,
              animation: 'wave-flow 8s linear infinite',
            }}
          >
            <svg width="100%" height="60" preserveAspectRatio="none" viewBox="0 0 600 60">
              <path
                d="M0 30 Q 50 10, 100 30 T 200 30 T 300 30 T 400 30 T 500 30 T 600 30 L600 60 L0 60 Z"
                fill={tokens.colors.ochre}
              />
              <path
                d="M0 45 Q 60 30, 120 45 T 240 45 T 360 45 T 480 45 T 600 45"
                stroke={tokens.colors.ochre}
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Quote icon - LARGER */}
          <div style={{
            marginBottom: tokens.space[4],
            color: tokens.colors.ochre,
            position: 'relative',
            zIndex: 1,
          }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
          </div>

          <p style={{
            fontSize: '26px',
            fontWeight: 800,
            lineHeight: 1.4,
            color: tokens.colors.white,
            fontFamily: tokens.font.display,
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 1,
            marginBottom: tokens.space[4],
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}>
            Momentum without direction&nbsp;drifts.
          </p>
          <p style={{
            fontSize: '26px',
            fontWeight: 800,
            lineHeight: 1.4,
            color: tokens.colors.ochre,
            fontFamily: tokens.font.display,
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: tokens.space[4],
          }}>
            Direction without momentum&nbsp;stalls.
          </p>
          <p style={{
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: tokens.colors.white,
            fontFamily: tokens.font.display,
            position: 'relative',
            zIndex: 1,
          }}>
            You need both.
          </p>

          {/* Decorative line - ANIMATED GRADIENT */}
          <div style={{
            marginTop: tokens.space[6],
            height: '5px',
            width: '100px',
            background: `linear-gradient(90deg, ${tokens.colors.ochre}, ${tokens.colors.ochreLight}, ${tokens.colors.ochre})`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite',
            borderRadius: '3px',
            position: 'relative',
            zIndex: 1,
          }} />
        </div>
      </div>
    </section>

    {/* The Guide Appears */}
    <section style={{
      background: tokens.colors.navy,
      color: tokens.colors.cream,
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Compass icon */}
        <div style={{ marginBottom: tokens.space[4], color: tokens.colors.ochre, display: 'flex', justifyContent: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: tokens.space[7],
          fontFamily: tokens.font.display,
          textAlign: 'center',
        }}>
          Meet your guide.
        </h2>

        {/* Primary paragraph */}
        <div style={{
          fontSize: '17px',
          lineHeight: 1.8,
          color: tokens.colors.creamDark,
          marginBottom: tokens.space[7],
        }}>
          <p style={{ marginBottom: tokens.space[5] }}>
            Your Chief of Staff is an AI thinking partner configured specifically for you. It knows where you're headed—and what you stand&nbsp;for.
          </p>
          <p>
            Ask it anything—a career decision, a family conflict, a creative block—and it responds with your whole life in&nbsp;view.
          </p>
        </div>

        {/* Empathy bridge */}
        <div style={{
          fontSize: '16px',
          lineHeight: 1.8,
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: tokens.space[7],
          paddingLeft: tokens.space[5],
          borderLeft: `2px solid ${tokens.colors.ochre}`,
        }}>
          <p>
            We built this because we were tired of starting every AI conversation from zero. We wanted a thinking partner that actually knew us—our goals, our values, our&nbsp;direction.
          </p>
        </div>

        {/* Micro-soundbite */}
        <p style={{
          fontSize: '18px',
          fontWeight: 600,
          fontStyle: 'italic',
          color: tokens.colors.ochre,
          marginBottom: tokens.space[7],
          fontFamily: tokens.font.display,
          lineHeight: 1.5,
          textAlign: 'center',
        }}>
          Work. Family. Health. Creativity.&nbsp;Service.
          <br />
          One compass for the whole&nbsp;journey.
        </p>

        {/* Bridge + CTA */}
        <div style={{
          paddingTop: tokens.space[6],
          borderTop: `1px solid rgba(255, 255, 255, 0.15)`,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: tokens.space[5],
            letterSpacing: '0.02em',
          }}>
            See where you're&nbsp;headed.
          </p>

          <button
            onClick={onSetup}
            className="btn-primary"
            style={{
              background: tokens.colors.ochre,
              color: tokens.colors.white,
              border: 'none',
              padding: '16px 36px',
              borderRadius: tokens.radius.full,
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: tokens.font.sans,
              letterSpacing: '0.05em',
              marginBottom: tokens.space[3],
            }}
          >
            GET ORIENTED
          </button>

          <p style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            Takes about 5 minutes.
          </p>
        </div>
      </div>
    </section>

    {/* The System - WAVES & SWEATS */}
    <section style={{
      padding: `${tokens.space[10]} ${tokens.space[5]}`,
      background: tokens.colors.creamDark,
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: tokens.space[8], textAlign: 'center' }}>
          {/* Sliders/Balance icon */}
          <div style={{ marginBottom: tokens.space[4], color: tokens.colors.ochre, display: 'flex', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <circle cx="4" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="10" r="2" fill="currentColor" />
              <circle cx="20" cy="14" r="2" fill="currentColor" />
            </svg>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 700,
            lineHeight: 1.3,
            color: tokens.colors.navy,
            fontFamily: tokens.font.display,
            marginBottom: tokens.space[5],
          }}>
            A language for your whole&nbsp;life.
          </h2>
          <div style={{
            fontSize: '17px',
            lineHeight: 1.8,
            color: tokens.colors.navy,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <p style={{ marginBottom: tokens.space[4] }}>
              Your COS uses two simple frameworks to understand the full picture of your life—not just your to-do list, but your wellbeing, relationships, creative aspirations, and sense of&nbsp;purpose.
            </p>
            <p style={{ fontWeight: 500 }}>
              This gives your AI the context it needs to provide advice that actually fits your&nbsp;life.
            </p>
          </div>
        </div>

        {/* Two Panels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: tokens.space[6],
          marginBottom: tokens.space[8],
        }}>
          {/* WAVES Panel */}
          <div
            className="card-hover"
            style={{
              padding: tokens.space[6],
              borderRadius: tokens.radius.lg,
              background: tokens.colors.white,
              borderTop: `4px solid ${tokens.colors.ochre}`,
            }}
          >
            {/* Wave icon */}
            <div style={{ marginBottom: tokens.space[3], color: tokens.colors.ochre }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              </svg>
            </div>
            <p style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: tokens.colors.ochre,
              marginBottom: tokens.space[2],
              fontFamily: tokens.font.display,
            }}>
              WAVES
            </p>
            <p style={{
              fontSize: '18px',
              fontWeight: 600,
              color: tokens.colors.navy,
              fontFamily: tokens.font.display,
              marginBottom: tokens.space[5],
            }}>
              How your life feels.
            </p>
            <div style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: tokens.colors.navy,
            }}>
              <p style={{ marginBottom: tokens.space[4] }}>
                A simple check-in across five dimensions of a life well-lived. Are you feeling whole? Accomplished? Vital? Expressive?&nbsp;Satisfied?
              </p>
              <p>
                Your COS uses this to understand what's working and what needs attention—before you even have to&nbsp;explain.
              </p>
            </div>
            <p style={{
              fontSize: '13px',
              color: tokens.colors.navy,
              marginTop: tokens.space[5],
              fontStyle: 'italic',
              opacity: 0.7,
            }}>
              Wholeness · Accomplishment · Vitality · Expression · Satisfaction</p>
          </div>

          {/* SWEATS Panel */}
          <div
            className="card-hover"
            style={{
              padding: tokens.space[6],
              borderRadius: tokens.radius.lg,
              background: tokens.colors.white,
              borderTop: `4px solid ${tokens.colors.navy}`,
            }}
          >
            {/* Target/Focus icon */}
            <div style={{ marginBottom: tokens.space[3], color: tokens.colors.navy }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <p style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: tokens.colors.navy,
              marginBottom: tokens.space[2],
              fontFamily: tokens.font.display,
            }}>
              SWEATS
            </p>
            <p style={{
              fontSize: '18px',
              fontWeight: 600,
              color: tokens.colors.navy,
              fontFamily: tokens.font.display,
              marginBottom: tokens.space[5],
            }}>
              Where you place your effort.
            </p>
            <div style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: tokens.colors.navy,
            }}>
              <p style={{ marginBottom: tokens.space[4] }}>
                Six life domains where you invest your energy: deep thinking, career, physical health, creative expression, relationships, and giving&nbsp;back.
              </p>
              <p>
                Your COS knows where you're focused and helps you protect what matters when everything feels&nbsp;urgent.
              </p>
            </div>
            <p style={{
              fontSize: '13px',
              color: tokens.colors.navy,
              marginTop: tokens.space[5],
              fontStyle: 'italic',
              opacity: 0.7,
            }}>
              Synthesis · Work · Energy · Art · Ties · Service
            </p>
          </div>
        </div>

        {/* Closing Bridge */}
        <div style={{
          textAlign: 'center',
          paddingTop: tokens.space[6],
          borderTop: `1px solid ${tokens.colors.border}`,
        }}>
          <p style={{
            fontSize: '17px',
            lineHeight: 1.7,
            color: tokens.colors.navy,
            marginBottom: tokens.space[5],
          }}>
            Together, these frameworks give your AI the vocabulary to understand your whole life—not just the task in front of&nbsp;you.
          </p>
          <p style={{
            fontSize: '16px',
            color: tokens.colors.navy,
            fontStyle: 'italic',
          }}>
            Every conversation becomes more relevant. Every suggestion more&nbsp;useful.
          </p>
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
        Ready to stop&nbsp;drifting?
      </h2>
      <p style={{
        fontSize: '18px',
        color: tokens.colors.navy,
        maxWidth: '600px',
        margin: `0 auto ${tokens.space[7]}`,
      }}>
        In five minutes, you'll have a thinking partner that knows your direction—so you can stop drifting and start building the life you actually&nbsp;want.
      </p>
      <button
        onClick={onSetup}
        className="btn-primary"
        style={{
          background: tokens.colors.ochre,
          color: tokens.colors.white,
          border: 'none',
          padding: '18px 44px',
          borderRadius: tokens.radius.full,
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: tokens.font.sans,
          letterSpacing: '0.05em',
        }}
      >
        FIND YOUR DIRECTION
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
        color: tokens.colors.navy,
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

  const TONE_OPTIONS = ['calm', 'direct', 'warm', 'witty', 'formal', 'concise', 'thoughtful', 'measured', 'sharp', 'patient', 'candid', 'encouraging', 'pragmatic', 'curious', 'structured', 'gentle', 'bold', 'analytical', 'empathetic', 'confident'];
  const FAILURE_MODES = ['overthinking', 'impulsivity', 'perfectionism', 'distraction', 'people-pleasing', 'avoidance', 'overcommitting', 'procrastination', 'self-doubt', 'decision paralysis', 'rushing', 'isolation', 'burnout cycles', 'conflict avoidance', 'underestimating time'];

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
    const maxSubSteps = [4, 5, 4, 3, 3, 3];
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
      const maxSubSteps = [4, 5, 4, 3, 3, 3];
      setSection(section - 1);
      setSubStep(maxSubSteps[section - 1] - 1);
    } else {
      onBack();
    }
  };

  const totalSteps = 22;
  const currentStep = [0, 4, 9, 13, 16, 19][section] + subStep;

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
      <GlobalStyles />
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
          className="btn-secondary"
          style={{
            background: tokens.colors.gray100,
            border: `1px solid ${tokens.colors.border}`,
            color: tokens.colors.navy,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: tokens.radius.full,
          }}
        >
          ← BACK
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', color: tokens.colors.ochre, letterSpacing: '0.1em', fontWeight: 600 }}>
            CHIEF OF STAFF GENERATOR
          </p>
          <p style={{ fontSize: '15px', color: tokens.colors.navy, fontWeight: 500 }}>
            {SETUP_SECTIONS[section].title}
          </p>
        </div>
        <p style={{ fontSize: '14px', color: tokens.colors.navy, fontWeight: 500 }}>
          {currentStep + 1} of {totalSteps}
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '3px', padding: `0 ${tokens.spacing.md}`, marginTop: tokens.spacing.sm }}>
        {SETUP_SECTIONS.map((s, i) => (
          <div
            key={s.id}
            className="progress-bar"
            style={{
              height: '4px',
              flex: 1,
              background: i < section ? tokens.colors.ochre : i === section ? tokens.colors.bgNavy : tokens.colors.border,
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
              title="Choose the characteristics you want your Chief of Staff to have."
              subtitle="Select three."
              type="multi"
              options={TONE_OPTIONS.map(t => ({ value: t, label: t }))}
              selected={profile.toneWords}
              onToggle={(v) => toggleArrayItem('toneWords', v)}
              onNext={(profile.toneWords?.length || 0) >= 3 ? advanceStep : undefined}
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
              title="Which LLM will you use this prompt with?"
              type="choice"
              options={[
                { value: 'chatgpt', label: 'ChatGPT', desc: 'OpenAI' },
                { value: 'claude', label: 'Claude', desc: 'Anthropic' },
                { value: 'gemini', label: 'Gemini', desc: 'Google' },
                { value: 'multiple', label: 'I use several', desc: 'Generate a universal prompt' },
                { value: 'other', label: 'Other', desc: 'Different platform' },
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
          {section === 5 && subStep === 2 && (
            <SetupQuestion
              title="Would you like to give your Chief of Staff a name?"
              subtitle="Some people find that naming the role makes it easier to think with consistently."
              type="text"
              value={textInput}
              onChange={setTextInput}
              placeholder="e.g., Atlas, Compass, Sage..."
              optional
              onNext={() => {
                if (textInput.trim()) {
                  updateProfile('cosName', textInput);
                }
                setTextInput('');
                advanceStep();
              }}
              onSkip={advanceStep}
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
  onSkip,
  value,
  onChange,
  placeholder,
  multiline,
  optional,
}: {
  title: string;
  subtitle?: string;
  type: 'choice' | 'multi' | 'text';
  options?: { value: string; label: string; desc?: string }[];
  selected?: string | string[];
  onSelect?: (value: string) => void;
  onSkip?: () => void;
  optional?: boolean;
  onToggle?: (value: string) => void;
  onNext?: () => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) => (
  <div className="animate-fade-in">
    <h2 style={{ fontSize: '28px', fontWeight: 700, color: tokens.colors.navy, marginBottom: tokens.spacing.xs, lineHeight: 1.3, fontFamily: tokens.font.display }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: '16px', color: tokens.colors.navy, marginBottom: tokens.spacing.lg, lineHeight: 1.5, opacity: 0.8 }}>{subtitle}</p>
    )}

    {type === 'choice' && options && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
        {options.map((opt, index) => (
          <button
            key={opt.value}
            onClick={() => onSelect?.(opt.value)}
            className="option-btn"
            style={{
              padding: tokens.spacing.sm,
              background: selected === opt.value ? tokens.colors.bgNavy : tokens.colors.bgCard,
              border: `2px solid ${selected === opt.value ? tokens.colors.bgNavy : tokens.colors.border}`,
              borderRadius: tokens.radius.lg,
              cursor: 'pointer',
              textAlign: 'left',
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <p style={{ fontSize: '17px', fontWeight: 600, color: selected === opt.value ? tokens.colors.textInverse : tokens.colors.navy }}>{opt.label}</p>
            {opt.desc && <p style={{ fontSize: '15px', color: selected === opt.value ? 'rgba(255,255,255,0.85)' : tokens.colors.navy, marginTop: '4px', lineHeight: 1.4, opacity: selected === opt.value ? 1 : 0.75 }}>{opt.desc}</p>}
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
                className="chip-btn"
                style={{
                  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
                  background: isSelected ? tokens.colors.ochre : tokens.colors.bgCard,
                  border: `2px solid ${isSelected ? tokens.colors.ochre : tokens.colors.border}`,
                  borderRadius: tokens.radius.full,
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: isSelected ? tokens.colors.textInverse : tokens.colors.navy,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {onNext && (
          <button onClick={onNext} className="btn-primary" style={{ marginTop: tokens.spacing.lg, padding: '14px 28px', background: tokens.colors.ochre, color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
            CONTINUE
          </button>
        )}
      </>
    )}

    {type === 'text' && (
      <>
        {multiline ? (
          <textarea value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="input-focus" style={{ width: '100%', minHeight: '120px', padding: tokens.spacing.sm, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radius.md, fontSize: '16px', lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit', color: tokens.colors.navy }} />
        ) : (
          <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="input-focus" style={{ width: '100%', padding: tokens.spacing.sm, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radius.md, fontSize: '16px', outline: 'none', color: tokens.colors.navy }} />
        )}
        <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          <button onClick={onNext} disabled={!optional && !value?.trim()} className={(optional || value?.trim()) ? 'btn-primary' : ''} style={{ padding: '14px 28px', background: (optional || value?.trim()) ? tokens.colors.ochre : tokens.colors.border, color: (optional || value?.trim()) ? tokens.colors.textInverse : tokens.colors.textMuted, border: 'none', borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 600, cursor: (optional || value?.trim()) ? 'pointer' : 'not-allowed' }}>
            CONTINUE
          </button>
          {optional && onSkip && (
            <button onClick={onSkip} className="btn-ghost" style={{ padding: '14px 28px', background: 'transparent', color: tokens.colors.navy, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
              SKIP FOR NOW
            </button>
          )}
        </div>
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

    return `# Personal Chief of Staff${profile.cosName ? ` — ${profile.cosName}` : ''}

## Who You Are
You are ${profile.cosName ? `${profile.cosName}, ` : ''}my Chief of Staff—a thinking partner who helps me maintain direction and make better decisions. You embody ${archetypeDesc[profile.stance] || 'a supportive partner'}.

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
          <h1 style={{ fontSize: '32px', fontWeight: 400, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.sm }}>Your COS prompt is&nbsp;ready</h1>
          <p style={{ fontSize: '16px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.md }}>This prompt contains everything your AI needs to know about you. Copy it and paste it into your AI tool to transform it into your personal Chief of&nbsp;Staff.</p>
        </div>

        {/* How to use instructions */}
        <div style={{ background: tokens.colors.creamDark, borderRadius: tokens.radius.lg, padding: tokens.spacing.md, marginBottom: tokens.spacing.lg, border: `1px solid ${tokens.colors.border}` }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: tokens.colors.textPrimary, marginBottom: tokens.spacing.sm }}>How to use this&nbsp;prompt</h3>
          <ol style={{ fontSize: '14px', color: tokens.colors.textSecondary, lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}><strong>Copy the prompt below</strong> using the COPY button</li>
            <li style={{ marginBottom: '8px' }}><strong>Open your AI tool</strong> (ChatGPT, Claude, Gemini, etc.)</li>
            <li style={{ marginBottom: '8px' }}><strong>Find "Custom Instructions" or "System Prompt"</strong>:
              <ul style={{ marginTop: '4px', marginBottom: 0, paddingLeft: '16px' }}>
                <li><em>ChatGPT:</em> Settings → Personalization → Custom&nbsp;Instructions</li>
                <li><em>Claude:</em> Start a new chat and paste the prompt as your first&nbsp;message</li>
                <li><em>Gemini:</em> Paste at the start of any conversation</li>
              </ul>
            </li>
            <li style={{ marginBottom: '8px' }}><strong>Paste your prompt</strong> and save</li>
            <li><strong>Start talking to your COS!</strong> Try: "Good morning, let's do my daily&nbsp;synthesis"</li>
          </ol>
        </div>

        {/* Why this works */}
        <div style={{ background: 'transparent', borderRadius: tokens.radius.lg, padding: `0 0 ${tokens.spacing.md} 0`, marginBottom: tokens.spacing.md }}>
          <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, fontStyle: 'italic' }}>
            <strong style={{ fontStyle: 'normal' }}>Why this works:</strong> AI tools have no memory of who you are between conversations. This prompt gives your AI the context it needs—your values, priorities, and goals—so every conversation starts from understanding, not from&nbsp;scratch.
          </p>
        </div>

        <div style={{ background: tokens.colors.bgNavy, borderRadius: tokens.radius.lg, padding: tokens.spacing.md, marginBottom: tokens.spacing.lg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.sm }}>
            <p style={{ fontSize: '12px', color: tokens.colors.teal, letterSpacing: '0.05em' }}>YOUR CHIEF OF STAFF PROMPT</p>
            <button onClick={handleCopy} style={{ background: copied ? tokens.colors.teal : 'rgba(255,255,255,0.1)', color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>
          <pre style={{ fontSize: '13px', color: tokens.colors.textInverse, whiteSpace: 'pre-wrap', lineHeight: 1.6, maxHeight: '400px', overflowY: 'auto', fontFamily: 'monospace', opacity: 0.9 }}>
            {systemPrompt}
          </pre>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
          <button onClick={handleCopy} style={{ padding: '14px 28px', background: tokens.colors.bgNavy, color: tokens.colors.textInverse, border: 'none', borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
            {copied ? 'COPIED!' : 'COPY PROMPT'}
          </button>
          <button onClick={onComplete} style={{ padding: '14px 28px', background: 'transparent', color: tokens.colors.textPrimary, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radius.full, fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
            CONTINUE TO RUMO
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
  cosProfile,
  onClearProfile,
}: {
  onSynthesis: () => void;
  onLanding: () => void;
  onReconfigure: () => void;
  cosProfile: COSProfile | null;
  onClearProfile: () => void;
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const cosName = cosProfile?.cosName || 'your Chief of Staff';

  // Get archetype info for personalization
  const archetypeEmoji: Record<string, string> = {
    challenger: '⚡',
    muse: '✨',
    scientist: '🔬',
    coach: '🎯',
    strategist: '♟️',
    anchor: '⚓',
  };
  const currentArchetype = cosProfile?.stance || 'strategist';

  return (
    <div style={{ background: tokens.colors.cream, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: tokens.font.sans }}>
      <GlobalStyles />

      {/* Header */}
      <header style={{
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        borderBottom: `1px solid ${tokens.colors.border}`,
        background: tokens.colors.white,
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div className="logo-hover" style={{ cursor: 'pointer' }}>
            <RumoLogo size="sm" color={tokens.colors.navy} accentColor={tokens.colors.ochre} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="btn-ghost"
              style={{
                background: 'none',
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.radius.full,
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: tokens.colors.navy,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{archetypeEmoji[currentArchetype]}</span>
              {cosProfile?.cosName || 'Settings'}
            </button>
          </div>
        </div>
      </header>

      {/* Settings Dropdown */}
      {showSettings && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: tokens.spacing.lg,
          background: tokens.colors.white,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          zIndex: 100,
          minWidth: '200px',
        }}>
          <button
            onClick={() => { onReconfigure(); setShowSettings(false); }}
            style={{
              width: '100%',
              padding: tokens.spacing.sm,
              background: 'none',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: tokens.radius.md,
              fontSize: '14px',
              color: tokens.colors.navy,
            }}
            onMouseOver={(e) => e.currentTarget.style.background = tokens.colors.gray100}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            Reconfigure COS
          </button>
          <button
            onClick={() => { onClearProfile(); setShowSettings(false); }}
            style={{
              width: '100%',
              padding: tokens.spacing.sm,
              background: 'none',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: tokens.radius.md,
              fontSize: '14px',
              color: tokens.colors.coral,
            }}
            onMouseOver={(e) => e.currentTarget.style.background = tokens.colors.coralSubtle}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            Reset & Start Over
          </button>
        </div>
      )}

      {/* Main Content */}
      <main style={{ flex: 1, padding: `${tokens.spacing.xl} ${tokens.spacing.lg}` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* Personalized Greeting */}
          <div className="animate-fade-in-up" style={{ marginBottom: tokens.spacing.xl }}>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 400,
              color: tokens.colors.navy,
              fontFamily: tokens.font.display,
              marginBottom: tokens.spacing.xs,
            }}>
              {greeting}.
            </h1>
            <p style={{
              fontSize: '18px',
              color: tokens.colors.navyFaded,
              lineHeight: 1.6,
            }}>
              {cosProfile?.cosName ? `${cosProfile.cosName} is ready when you are.` : 'Your navigation system is ready.'}
            </p>
          </div>

          {/* Primary Action - Daily Synthesis */}
          <div
            className="card-hover animate-fade-in-up stagger-1"
            onClick={onSynthesis}
            style={{
              background: `linear-gradient(135deg, ${tokens.colors.navy} 0%, #2D4A6A 100%)`,
              borderRadius: tokens.radius.xl,
              padding: tokens.spacing.xl,
              marginBottom: tokens.spacing.lg,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative compass */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '200px',
              height: '200px',
              opacity: 0.1,
            }}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="1" fill="none" />
                <path d="M50 5 L55 50 L50 95 L45 50 Z" fill="white" />
              </svg>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: tokens.colors.ochre,
                marginBottom: tokens.spacing.sm,
              }}>
                DAILY SYNTHESIS
              </p>
              <h2 style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 400,
                color: tokens.colors.white,
                fontFamily: tokens.font.display,
                marginBottom: tokens.spacing.sm,
              }}>
                Start your day with clarity
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: tokens.spacing.lg,
                maxWidth: '500px',
              }}>
                A quick conversation with {cosName} to orient your day, surface what matters, and set your direction.
              </p>
              <button
                className="btn-primary"
                style={{
                  background: tokens.colors.ochre,
                  color: tokens.colors.white,
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: tokens.radius.full,
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                BEGIN SYNTHESIS
              </button>
            </div>
          </div>

          {/* Secondary Actions Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: tokens.spacing.md,
            marginBottom: tokens.spacing.xl,
          }}>
            {/* WAVES Card */}
            <div
              className="card-hover animate-fade-in-up stagger-2"
              style={{
                background: tokens.colors.white,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                border: `1px solid ${tokens.colors.border}`,
                borderLeft: `4px solid ${tokens.colors.coral}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: tokens.colors.coral,
                    marginBottom: tokens.spacing.xs,
                  }}>
                    WAVES
                  </p>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 500,
                    color: tokens.colors.navy,
                    fontFamily: tokens.font.display,
                  }}>
                    How life feels
                  </h3>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={tokens.colors.coral} strokeWidth="2" strokeLinecap="round">
                  <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                </svg>
              </div>
              <p style={{
                fontSize: '14px',
                color: tokens.colors.textSecondary,
                lineHeight: 1.6,
                marginBottom: tokens.spacing.md,
              }}>
                Check in across five dimensions: Wholeness, Accomplishment, Vitality, Expression, Satisfaction.
              </p>
              <button
                className="btn-secondary"
                style={{
                  background: 'transparent',
                  color: tokens.colors.navy,
                  border: `1px solid ${tokens.colors.border}`,
                  padding: '10px 20px',
                  borderRadius: tokens.radius.full,
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Check In
              </button>
            </div>

            {/* SWEATS Card */}
            <div
              className="card-hover animate-fade-in-up stagger-3"
              style={{
                background: tokens.colors.white,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                border: `1px solid ${tokens.colors.border}`,
                borderLeft: `4px solid ${tokens.colors.purple}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: tokens.colors.purple,
                    marginBottom: tokens.spacing.xs,
                  }}>
                    SWEATS
                  </p>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 500,
                    color: tokens.colors.navy,
                    fontFamily: tokens.font.display,
                  }}>
                    Where effort goes
                  </h3>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={tokens.colors.purple} strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <p style={{
                fontSize: '14px',
                color: tokens.colors.textSecondary,
                lineHeight: 1.6,
                marginBottom: tokens.spacing.md,
              }}>
                Track effort across: Synthesis, Work, Energy, Art, Ties, Service.
              </p>
              <button
                className="btn-secondary"
                style={{
                  background: 'transparent',
                  color: tokens.colors.navy,
                  border: `1px solid ${tokens.colors.border}`,
                  padding: '10px 20px',
                  borderRadius: tokens.radius.full,
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Log Effort
              </button>
            </div>
          </div>

          {/* Your Direction Section */}
          <div
            className="animate-fade-in-up stagger-4"
            style={{
              background: tokens.colors.white,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.xl,
              border: `1px solid ${tokens.colors.border}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xl }}>
              <CompassVisual heading={160} />
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  color: tokens.colors.navy,
                  fontFamily: tokens.font.display,
                  marginBottom: tokens.spacing.sm,
                }}>
                  Your Direction
                </h3>
                {cosProfile?.outcomes ? (
                  <div>
                    <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, marginBottom: tokens.spacing.sm }}>
                      90-day focus:
                    </p>
                    <p style={{
                      fontSize: '15px',
                      color: tokens.colors.navy,
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                    }}>
                      "{cosProfile.outcomes.slice(0, 150)}{cosProfile.outcomes.length > 150 ? '...' : ''}"
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: '15px', color: tokens.colors.textSecondary }}>
                    Complete your COS setup to define your direction.
                  </p>
                )}
              </div>
            </div>
            <div style={{
              marginTop: tokens.spacing.lg,
              paddingTop: tokens.spacing.lg,
              borderTop: `1px solid ${tokens.colors.border}`,
            }}>
              <WeeklyProgressChart />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        borderTop: `1px solid ${tokens.colors.border}`,
        background: tokens.colors.white,
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '13px', color: tokens.colors.textMuted }}>© 2026 RUMO</span>
          <div style={{ display: 'flex', gap: tokens.spacing.md }}>
            <button className="link-hover" style={{ background: 'none', border: 'none', fontSize: '13px', color: tokens.colors.textMuted, cursor: 'pointer' }}>Privacy</button>
            <button className="link-hover" style={{ background: 'none', border: 'none', fontSize: '13px', color: tokens.colors.textMuted, cursor: 'pointer' }}>About</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================
// SYNTHESIS VIEW
// ============================================
const SynthesisView = ({ onBack, cosProfile }: { onBack: () => void; cosProfile: COSProfile | null }) => {
  const cosName = cosProfile?.cosName || 'Your COS';
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  const [messages, setMessages] = useState<{ role: 'cos' | 'user'; text: string }[]>([
    { role: 'cos', text: `Good ${timeOfDay}. What would be useful to think through right now?` }
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
        "How does this connect to your 90-day outcomes?",
        "What would the best version of you do here?",
        "What are you avoiding by focusing on this?",
      ];
      setMessages(prev => [...prev, { role: 'cos', text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', background: tokens.colors.cream, display: 'flex', flexDirection: 'column', fontFamily: tokens.font.sans }}>
      <GlobalStyles />
      <header style={{
        padding: tokens.spacing.md,
        borderBottom: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.md,
        background: tokens.colors.white,
      }}>
        <button
          onClick={onBack}
          className="btn-ghost"
          style={{
            background: 'none',
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: tokens.radius.full,
            padding: '8px 16px',
            color: tokens.colors.navy,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', color: tokens.colors.ochre, letterSpacing: '0.1em', fontWeight: 600 }}>SYNTHESIS</p>
          <p style={{ fontSize: '14px', color: tokens.colors.navy }}>
            {cosProfile?.cosName ? `with ${cosProfile.cosName}` : 'Daily orientation'}
          </p>
        </div>
      </header>

      <div style={{ flex: 1, padding: tokens.spacing.xl, maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={i === messages.length - 1 ? 'animate-fade-in' : ''}
              style={{
                padding: tokens.spacing.md,
                background: msg.role === 'user' ? tokens.colors.white : 'transparent',
                borderRadius: tokens.radius.lg,
                marginLeft: msg.role === 'user' ? tokens.spacing.xl : 0,
                border: msg.role === 'user' ? `1px solid ${tokens.colors.border}` : 'none',
              }}
            >
              {msg.role === 'cos' && (
                <p style={{
                  fontSize: '12px',
                  color: tokens.colors.ochre,
                  marginBottom: tokens.spacing.xs,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  {cosName.toUpperCase()}
                </p>
              )}
              <p style={{
                fontSize: '18px',
                lineHeight: 1.7,
                color: tokens.colors.navy,
                fontFamily: msg.role === 'cos' ? tokens.font.display : tokens.font.sans,
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
        background: tokens.colors.white,
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', gap: tokens.spacing.sm }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="What's on your mind..."
            className="input-focus"
            style={{
              flex: 1,
              padding: tokens.spacing.sm,
              border: `2px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.lg,
              fontSize: '16px',
              outline: 'none',
              fontFamily: tokens.font.sans,
            }}
          />
          <button
            onClick={handleSend}
            className="btn-primary"
            style={{
              padding: '12px 24px',
              background: tokens.colors.ochre,
              color: tokens.colors.white,
              border: 'none',
              borderRadius: tokens.radius.full,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
