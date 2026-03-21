# Rumo Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Rumo's infrastructure to support the unified app — Tailwind v4, React 19, Supabase auth+database, shared layout with navigation, and route scaffolding.

**Architecture:** Rumo is a Next.js 16 App Router project at `/Users/chadstamm/Desktop/Claude Code Projects/rumo/`. Currently a static landing page with Tailwind v3 and React 18. This phase upgrades the stack, adds Supabase for auth and persistence, builds the shared chrome (nav, footer), and creates the route structure that Phase 2 will populate.

**Tech Stack:** Next.js 16, Tailwind v4, React 19, Supabase (auth + Postgres), Framer Motion, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-21-rumo-unification-design.md`

---

### Task 1: Upgrade React 18 to React 19

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update React dependencies**

```bash
cd "/Users/chadstamm/Desktop/Claude Code Projects/rumo"
npm install react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build completes with no errors

- [ ] **Step 3: Verify dev server starts**

Run: `npm run dev` — check localhost:3000 loads the landing page

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade React 18 to React 19"
```

---

### Task 2: Upgrade Tailwind v3 to v4

**Files:**
- Modify: `app/globals.css`
- Delete: `tailwind.config.ts`, `postcss.config.mjs`
- Modify: `package.json` (devDependencies)

Tailwind v4 uses CSS-first configuration — no `tailwind.config.ts`, no `postcss.config.mjs`. All config moves into `globals.css` via `@theme` blocks.

- [ ] **Step 1: Install Tailwind v4 and remove v3 deps**

```bash
cd "/Users/chadstamm/Desktop/Claude Code Projects/rumo"
npm install tailwindcss@latest @tailwindcss/postcss@latest
npm uninstall autoprefixer
```

- [ ] **Step 2: Replace `postcss.config.mjs` with Tailwind v4 PostCSS config**

Replace contents of `postcss.config.mjs` with:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

- [ ] **Step 3: Rewrite `globals.css` for Tailwind v4**

Replace contents with:
```css
@import "tailwindcss";

@theme {
  --color-navy: #1a2744;
  --color-navy-light: #243352;
  --color-cream: #faf6f1;
  --color-cream-dark: #f0e8dd;
  --color-ochre: #c4943a;
  --color-ochre-light: #d4a94f;
  --color-ocean: #2a6496;
  --color-muted: #8a7e6b;

  --font-display: var(--font-source-serif), Georgia, serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;

  --animate-fade-in-up: fadeInUp 0.8s ease-out forwards;
  --animate-fade-in: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-cream);
  color: var(--color-navy);
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 4: Delete `tailwind.config.ts`**

```bash
rm tailwind.config.ts
```

- [ ] **Step 5: Update component class names if needed**

Tailwind v4 renames some utilities. Scan all components for breaking changes:
```bash
grep -r "bg-navy\|text-navy\|bg-cream\|text-ochre\|bg-ochre\|font-display\|font-body" components/ app/ --include="*.tsx"
```

Update any Tailwind class references from `bg-navy` to `bg-navy` (these should work with the `@theme` color definitions — the `--color-` prefix maps to utility classes automatically in v4).

- [ ] **Step 6: Verify build passes**

Run: `npm run build`
Expected: Build completes with no errors

- [ ] **Step 7: Verify landing page renders correctly**

Run: `npm run dev` — visually confirm landing page looks identical to before

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: upgrade Tailwind v3 to v4 with CSS-first config"
```

---

### Task 3: Add Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Framer Motion**

```bash
cd "/Users/chadstamm/Desktop/Claude Code Projects/rumo"
npm install framer-motion
```

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion dependency"
```

---

### Task 4: Set up Supabase project and install dependencies

**Files:**
- Modify: `package.json`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `.env.local` (manual — not committed)

**Important:** This task requires Chad to create a Supabase project at https://supabase.com/dashboard and provide the project URL and anon key. If he hasn't done this yet, create the file stubs and note the env vars needed.

- [ ] **Step 1: Install Supabase dependencies**

```bash
cd "/Users/chadstamm/Desktop/Claude Code Projects/rumo"
npm install @supabase/supabase-js @supabase/ssr
```

- [ ] **Step 2: Create Supabase client helper (browser)**

Create `lib/supabase/client.ts`:
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 3: Create Supabase server helper**

Create `lib/supabase/server.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    }
  )
}
```

- [ ] **Step 4: Create `.env.local.example`**

Create `.env.local.example` (committed — template for env vars):
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 5: Add `.env*.local` to `.gitignore`**

Verify `.gitignore` includes:
```
.env*.local
```

- [ ] **Step 6: Verify build passes**

Run: `npm run build`
Expected: Build passes (env vars not needed at build time for client components)

- [ ] **Step 7: Commit**

```bash
git add lib/supabase/ .env.local.example .gitignore package.json package-lock.json
git commit -m "feat: add Supabase client and server helpers"
```

---

### Task 5: Create database schema

**Files:**
- Create: `lib/supabase/schema.sql`

This SQL file is the source of truth for the database schema. It will be run manually in the Supabase SQL editor.

- [ ] **Step 1: Write schema SQL**

Create `lib/supabase/schema.sql`:
```sql
-- Rumo Database Schema
-- Run this in the Supabase SQL Editor

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Wizard state (save and resume)
create table if not exists wizard_state (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  current_section int default 1,
  current_step int default 0,
  answers jsonb default '[]'::jsonb,
  analyzed_insights jsonb default '[]'::jsonb,
  writing_samples jsonb default '[]'::jsonb,
  completed_sections int[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- Generated documents
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  type text not null check (type in ('constitution', 'sotu', 'codex', 'story_bank', 'instructions')),
  content text not null,
  version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Custom instruction results (per model)
create table if not exists instruction_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  document_id uuid references documents on delete cascade not null,
  model text not null check (model in ('chatgpt', 'claude', 'gemini', 'perplexity')),
  result jsonb not null,
  created_at timestamptz default now()
);

-- Row-Level Security
alter table profiles enable row level security;
alter table wizard_state enable row level security;
alter table documents enable row level security;
alter table instruction_results enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Wizard state: users can CRUD their own state
create policy "Users can view own wizard state"
  on wizard_state for select using (auth.uid() = user_id);
create policy "Users can insert own wizard state"
  on wizard_state for insert with check (auth.uid() = user_id);
create policy "Users can update own wizard state"
  on wizard_state for update using (auth.uid() = user_id);
create policy "Users can delete own wizard state"
  on wizard_state for delete using (auth.uid() = user_id);

-- Documents: users can CRUD their own documents
create policy "Users can view own documents"
  on documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents"
  on documents for insert with check (auth.uid() = user_id);
create policy "Users can update own documents"
  on documents for update using (auth.uid() = user_id);
create policy "Users can delete own documents"
  on documents for delete using (auth.uid() = user_id);

-- Instruction results: users can CRUD their own results
create policy "Users can view own instruction results"
  on instruction_results for select using (auth.uid() = user_id);
create policy "Users can insert own instruction results"
  on instruction_results for insert with check (auth.uid() = user_id);
create policy "Users can delete own instruction results"
  on instruction_results for delete using (auth.uid() = user_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure update_updated_at();

create trigger wizard_state_updated_at
  before update on wizard_state
  for each row execute procedure update_updated_at();

create trigger documents_updated_at
  before update on documents
  for each row execute procedure update_updated_at();
```

- [ ] **Step 2: Commit**

```bash
git add lib/supabase/schema.sql
git commit -m "feat: add database schema for profiles, wizard state, documents"
```

---

### Task 6: Build auth flow — middleware and callback

**Files:**
- Create: `app/auth/callback/route.ts`
- Create: `app/auth/login/page.tsx`
- Create: `lib/supabase/middleware.ts`
- Create: `proxy.ts` (Next.js 16 middleware replacement)

- [ ] **Step 1: Create Supabase middleware helper**

Create `lib/supabase/middleware.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return supabaseResponse
}
```

- [ ] **Step 2: Create proxy.ts (Next.js 16 middleware)**

Create `proxy.ts` at project root:
```typescript
import { updateSession } from '@/lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|hero-bg.mp4|hero-poster.jpg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **Step 3: Create auth callback route**

Create `app/auth/callback/route.ts`:
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/vault'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth`)
}
```

- [ ] **Step 4: Create login page**

Create `app/auth/login/page.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-navy">
            Sign in to Rumo
          </h1>
          <p className="text-muted mt-2 font-body">
            We&apos;ll send you a magic link to sign in.
          </p>
        </div>

        {sent ? (
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-navy font-body">
              Check your email for a sign-in link.
            </p>
            <p className="text-muted text-sm mt-2 font-body">
              Didn&apos;t get it? Check spam or{' '}
              <button
                onClick={() => setSent(false)}
                className="text-ochre hover:underline"
              >
                try again
              </button>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="bg-white rounded-xl p-6 shadow-sm">
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1 font-body">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream text-navy
                         font-body placeholder:text-muted/50
                         focus:outline-none focus:ring-2 focus:ring-ochre/30 focus:border-ochre
                         transition-colors"
            />

            {error && (
              <p className="text-red-600 text-sm mt-2 font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-4 py-2.5 bg-ochre text-white font-medium rounded-lg
                         hover:bg-ochre-light transition-colors disabled:opacity-50 font-body"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify build passes**

Run: `npm run build`
Expected: Build completes (auth pages render, env vars not needed at build for client components)

- [ ] **Step 6: Commit**

```bash
git add lib/supabase/middleware.ts proxy.ts app/auth/
git commit -m "feat: add Supabase auth flow — magic link login, callback, middleware"
```

---

### Task 7: Build shared layout with navigation

**Files:**
- Create: `components/nav.tsx`
- Modify: `components/footer.tsx` (update for app-wide use)
- Modify: `app/layout.tsx` (add nav, auth context)
- Create: `components/auth-provider.tsx`

- [ ] **Step 1: Create auth context provider**

Create `components/auth-provider.tsx`:
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
```

- [ ] **Step 2: Create navigation component**

Create `components/nav.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { CompassRose } from '@/components/compass-rose'

export function Nav() {
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()

  // Don't show nav on the landing page — hero has its own header
  if (pathname === '/') return null

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-cream-dark">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <CompassRose size={28} />
          <span className="font-display text-navy text-lg tracking-[0.2em] font-semibold uppercase">
            RUMO
          </span>
        </Link>

        <div className="flex items-center gap-6 font-body text-sm">
          <Link
            href="/start"
            className={`transition-colors ${
              pathname.startsWith('/start') ? 'text-ochre' : 'text-muted hover:text-navy'
            }`}
          >
            The Path
          </Link>
          <Link
            href="/instructions"
            className={`transition-colors ${
              pathname.startsWith('/instructions') ? 'text-ochre' : 'text-muted hover:text-navy'
            }`}
          >
            Instructions
          </Link>
          <Link
            href="/vault"
            className={`transition-colors ${
              pathname.startsWith('/vault') ? 'text-ochre' : 'text-muted hover:text-navy'
            }`}
          >
            Vault
          </Link>

          {!loading && (
            user ? (
              <button
                onClick={signOut}
                className="text-muted hover:text-navy transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-1.5 bg-ochre text-white rounded-lg text-sm hover:bg-ochre-light transition-colors"
              >
                Sign in
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Update layout.tsx with nav and auth provider**

Replace `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Source_Serif_4, DM_Sans } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'
import { Nav } from '@/components/nav'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RUMO — Find Your Direction with AI',
  description:
    'AI is powerful but generic. You need direction first. Build your personal AI foundation with Rumo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${dmSans.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: Build completes

- [ ] **Step 5: Commit**

```bash
git add components/auth-provider.tsx components/nav.tsx app/layout.tsx
git commit -m "feat: add shared nav, auth provider, and app layout"
```

---

### Task 8: Scaffold route structure with placeholder pages

**Files:**
- Create: `app/start/page.tsx`
- Create: `app/instructions/page.tsx`
- Create: `app/vault/page.tsx`

- [ ] **Step 1: Create The Path placeholder**

Create `app/start/page.tsx`:
```typescript
export default function StartPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-navy">The Path</h1>
        <p className="text-muted mt-3 font-body">
          Your journey to AI that knows you. Coming soon.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Instructions placeholder**

Create `app/instructions/page.tsx`:
```typescript
export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-navy">Custom AI Instructions</h1>
        <p className="text-muted mt-3 font-body">
          Generate personalized instructions for any AI. Coming soon.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create Vault placeholder**

Create `app/vault/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function VaultPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/vault')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-navy">Your Vault</h1>
        <p className="text-muted mt-3 font-body">
          Your personal context documents will live here.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify build passes and all routes work**

Run: `npm run build`
Expected: Build completes with new routes listed in output

- [ ] **Step 5: Commit**

```bash
git add app/start/ app/instructions/ app/vault/
git commit -m "feat: scaffold route structure with placeholder pages"
```

---

### Task 9: Create privacy page (unified)

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Create privacy page**

Port the privacy page pattern from the existing apps but with Rumo branding. Use the same content structure as the WeTheMe privacy page but update the app name, URL, and contact info to Rumo/withrumo.com.

Create `app/privacy/page.tsx` with standard privacy policy content covering: data collection (answers, writing samples, generated documents), storage (Supabase), no selling of data, contact info (chad@chadstamm.com), cookie usage (auth only).

- [ ] **Step 2: Commit**

```bash
git add app/privacy/
git commit -m "feat: add privacy policy page"
```

---

### Task 10: Final verification

- [ ] **Step 1: Full build test**

```bash
cd "/Users/chadstamm/Desktop/Claude Code Projects/rumo"
npm run build
```

Expected: Clean build with all routes:
- `/` (landing page)
- `/start` (placeholder)
- `/instructions` (placeholder)
- `/vault` (placeholder, auth-gated)
- `/auth/login` (magic link)
- `/auth/callback` (OAuth callback)
- `/privacy` (privacy policy)

- [ ] **Step 2: Dev server smoke test**

Run: `npm run dev`
- Landing page loads at `/`
- Nav appears on `/start`, `/instructions`, `/vault`
- Nav does NOT appear on `/` (landing page has its own hero header)
- `/vault` redirects to `/auth/login` when not signed in
- `/auth/login` shows magic link form

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: Phase 1 verification fixes"
```
