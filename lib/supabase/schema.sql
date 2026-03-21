-- Rumo Database Schema
-- Run this in the Supabase SQL Editor (supabase.com/dashboard → SQL Editor)

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

-- Updated_at triggers
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
