-- Rumo Database Schema
-- Run this in the Supabase SQL Editor (supabase.com/dashboard → SQL Editor)
-- Idempotent: safe to re-run. Uses IF NOT EXISTS, ADD COLUMN IF NOT EXISTS, and policy guards.

-- ============================================================================
-- PROFILES (extends auth.users)
-- ============================================================================

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text,
  -- Subscription state (denormalized for fast client reads / RLS gates)
  subscription_status text not null default 'free'
    check (subscription_status in ('free', 'active', 'expired', 'refunded', 'past_due')),
  subscription_started_at timestamptz,
  subscription_expires_at timestamptz,
  stripe_customer_id text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add subscription columns if upgrading an older schema
alter table profiles add column if not exists email text;
alter table profiles add column if not exists subscription_status text not null default 'free'
  check (subscription_status in ('free', 'active', 'expired', 'refunded', 'past_due'));
alter table profiles add column if not exists subscription_started_at timestamptz;
alter table profiles add column if not exists subscription_expires_at timestamptz;
alter table profiles add column if not exists stripe_customer_id text unique;

-- Auto-create profile on signup, capture email from auth
-- search_path pinned to prevent schema-hijack attacks
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- SUBSCRIPTIONS (Stripe event log — one row per checkout / renewal / refund)
-- ============================================================================

create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  stripe_customer_id text not null,
  stripe_subscription_id text,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  status text not null
    check (status in ('pending', 'active', 'expired', 'canceled', 'refunded', 'past_due', 'failed')),
  amount_cents int,
  currency text default 'usd',
  starts_at timestamptz,
  expires_at timestamptz,
  raw_event jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists subscriptions_user_id_idx on subscriptions(user_id);
create index if not exists subscriptions_status_idx on subscriptions(status);

-- ============================================================================
-- DOCUMENTS (generated anchor outputs + instructions)
-- ============================================================================
-- Note: this table existed in the prior schema with a stale type list and
-- inconsistent slug (story_bank vs story-bank). Recreating the type check.

create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  anchor_slug text not null,
  content text not null,
  version int default 1,
  answer_count int,
  generated_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add columns if upgrading older schema
alter table documents add column if not exists anchor_slug text;
alter table documents add column if not exists answer_count int;
alter table documents add column if not exists generated_at timestamptz default now();

-- Backfill anchor_slug from legacy 'type' column if present, normalizing slug
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'documents' and column_name = 'type'
  ) then
    update documents
      set anchor_slug = case
        when type = 'story_bank' then 'story-bank'
        else type
      end
      where anchor_slug is null;
  end if;
end$$;

-- Drop the stale type check constraint if it exists; we validate at the app layer
alter table documents drop constraint if exists documents_type_check;
alter table documents drop column if exists type;

-- Enforce one row per (user, anchor_slug) — regenerations bump version
create unique index if not exists documents_user_anchor_unique
  on documents(user_id, anchor_slug);

-- ============================================================================
-- WIZARD STATE (per-anchor save/resume)
-- ============================================================================
-- Prior schema allowed only one in-progress wizard per user. Paid users may
-- have several in flight at once. Migrating to (user_id, anchor_slug) unique.

create table if not exists wizard_state (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  anchor_slug text not null,
  current_section smallint default 0,
  current_step int default 0,
  answers jsonb default '{}'::jsonb,
  analyzed_insights jsonb default '{}'::jsonb,
  writing_samples jsonb default '[]'::jsonb,
  completed_sections smallint[] default '{}',
  completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table wizard_state add column if not exists anchor_slug text;
alter table wizard_state add column if not exists completed boolean default false;
alter table wizard_state add column if not exists current_section smallint default 0;
alter table wizard_state add column if not exists completed_sections smallint[] default '{}';

-- Drop the legacy unique(user_id) if it's still around; replace with composite
do $$
declare
  legacy_constraint text;
begin
  select conname into legacy_constraint
  from pg_constraint
  where conrelid = 'wizard_state'::regclass
    and contype = 'u'
    and conkey = (
      select array[attnum] from pg_attribute
      where attrelid = 'wizard_state'::regclass and attname = 'user_id'
    );
  if legacy_constraint is not null then
    execute format('alter table wizard_state drop constraint %I', legacy_constraint);
  end if;
end$$;

create unique index if not exists wizard_state_user_anchor_unique
  on wizard_state(user_id, anchor_slug);

-- ============================================================================
-- INSTRUCTION RESULTS (per-model output from instructions wizard)
-- ============================================================================

create table if not exists instruction_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles on delete cascade not null,
  document_id uuid references documents on delete cascade,
  model text not null check (model in ('chatgpt', 'claude', 'gemini', 'perplexity')),
  result jsonb not null,
  created_at timestamptz default now()
);

-- ============================================================================
-- ROW-LEVEL SECURITY
-- ============================================================================

alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table documents enable row level security;
alter table wizard_state enable row level security;
alter table instruction_results enable row level security;

-- Helper: drop-then-create policy (idempotent)
-- Profiles
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Subscriptions: read-only from client; writes happen via service_role (webhook)
drop policy if exists "Users can view own subscriptions" on subscriptions;
create policy "Users can view own subscriptions"
  on subscriptions for select using (auth.uid() = user_id);

-- Documents
drop policy if exists "Users can view own documents" on documents;
create policy "Users can view own documents"
  on documents for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own documents" on documents;
create policy "Users can insert own documents"
  on documents for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own documents" on documents;
create policy "Users can update own documents"
  on documents for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own documents" on documents;
create policy "Users can delete own documents"
  on documents for delete using (auth.uid() = user_id);

-- Wizard state
drop policy if exists "Users can view own wizard state" on wizard_state;
create policy "Users can view own wizard state"
  on wizard_state for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own wizard state" on wizard_state;
create policy "Users can insert own wizard state"
  on wizard_state for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own wizard state" on wizard_state;
create policy "Users can update own wizard state"
  on wizard_state for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own wizard state" on wizard_state;
create policy "Users can delete own wizard state"
  on wizard_state for delete using (auth.uid() = user_id);

-- Instruction results
drop policy if exists "Users can view own instruction results" on instruction_results;
create policy "Users can view own instruction results"
  on instruction_results for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own instruction results" on instruction_results;
create policy "Users can insert own instruction results"
  on instruction_results for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete own instruction results" on instruction_results;
create policy "Users can delete own instruction results"
  on instruction_results for delete using (auth.uid() = user_id);

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================

-- search_path pinned to prevent schema-hijack attacks
create or replace function update_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure update_updated_at();

drop trigger if exists subscriptions_updated_at on subscriptions;
create trigger subscriptions_updated_at
  before update on subscriptions
  for each row execute procedure update_updated_at();

drop trigger if exists documents_updated_at on documents;
create trigger documents_updated_at
  before update on documents
  for each row execute procedure update_updated_at();

drop trigger if exists wizard_state_updated_at on wizard_state;
create trigger wizard_state_updated_at
  before update on wizard_state
  for each row execute procedure update_updated_at();

-- ============================================================================
-- HELPER VIEW: paid users
-- ============================================================================
-- Single source of truth for "is this user paid right now?"

-- security_invoker so RLS applies to querying user (not view creator)
drop view if exists active_paid_users;
create view active_paid_users
  with (security_invoker = true)
  as
    select id, email, subscription_status, subscription_expires_at
    from profiles
    where subscription_status = 'active'
      and (subscription_expires_at is null or subscription_expires_at > now());
