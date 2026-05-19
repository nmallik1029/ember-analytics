-- Run this in the Supabase SQL editor for your project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  inputs jsonb not null default '{}'::jsonb,
  allocations jsonb not null,
  summary jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists portfolios_user_id_idx
  on public.portfolios (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "users read own portfolios" on public.portfolios;
create policy "users read own portfolios" on public.portfolios
  for select using (auth.uid() = user_id);

drop policy if exists "users insert own portfolios" on public.portfolios;
create policy "users insert own portfolios" on public.portfolios
  for insert with check (auth.uid() = user_id);

drop policy if exists "users delete own portfolios" on public.portfolios;
create policy "users delete own portfolios" on public.portfolios
  for delete using (auth.uid() = user_id);
