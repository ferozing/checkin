-- Checkin data model. Paste this into the Supabase SQL editor (Database > SQL editor)
-- and run it once. Safe to re-run: every statement is guarded.
--
-- Row Level Security is on for every table. The rule throughout is simple:
-- you can only ever see and change your own rows.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text,
  whatsapp    text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are self service" on public.profiles;
create policy "profiles are self service" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- A profile row is created the moment someone signs up, so the rest of the
-- app can assume it exists.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------ invite_codes
create table if not exists public.invite_codes (
  code        text primary key,
  max_uses    integer not null default 50,
  used_count  integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.invite_codes enable row level security;
-- No policy on purpose: nobody can read the table directly, so the codes
-- cannot be listed. Validation goes through the function below.

create or replace function public.invite_code_is_valid(p_code text)
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.invite_codes
    where upper(code) = upper(trim(p_code))
      and active
      and used_count < max_uses
  );
$$;

grant execute on function public.invite_code_is_valid(text) to anon, authenticated;

create or replace function public.redeem_invite_code(p_code text)
returns boolean language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  update public.invite_codes
     set used_count = used_count + 1
   where upper(code) = upper(trim(p_code))
     and active
     and used_count < max_uses
  returning true into ok;
  return coalesce(ok, false);
end;
$$;

grant execute on function public.redeem_invite_code(text) to authenticated;

-- The codes that were hardcoded in the browser bundle until now.
insert into public.invite_codes (code, max_uses) values
  ('FAMILY2026', 50), ('AMURA', 50), ('FIRST50', 50)
on conflict (code) do nothing;

-- ---------------------------------------------------------------- waitlist
create table if not exists public.waitlist (
  id           uuid primary key default gen_random_uuid(),
  name         text,
  whatsapp     text,
  parent_city  text,
  language     text,
  invite_code  text,
  created_at   timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "anyone may join the waitlist" on public.waitlist;
create policy "anyone may join the waitlist" on public.waitlist
  for insert to anon, authenticated with check (true);

-- ----------------------------------------------------------------- parents
create table if not exists public.parents (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  call_name   text,
  phone       text not null,
  language    text not null default 'Hindi',
  call_slot   text not null default 'morning' check (call_slot in ('morning', 'evening')),
  call_time   time not null default '09:30',
  medicines   text,
  watch_for   text,
  consent_at  timestamptz,
  paused      boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.parents enable row level security;

drop policy if exists "parents are self service" on public.parents;
create policy "parents are self service" on public.parents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists parents_user_id_idx on public.parents (user_id);

-- ------------------------------------------------------------------- calls
create table if not exists public.calls (
  id            uuid primary key default gen_random_uuid(),
  parent_id     uuid not null references public.parents (id) on delete cascade,
  scheduled_at  timestamptz,
  started_at    timestamptz,
  ended_at      timestamptz,
  duration_sec  integer,
  status        text not null default 'scheduled'
                check (status in ('scheduled', 'ringing', 'completed', 'no_answer', 'failed')),
  attempt       integer not null default 1,
  bolna_call_id text,
  transcript    jsonb,
  language      text,
  created_at    timestamptz not null default now()
);

alter table public.calls enable row level security;

drop policy if exists "calls follow the parent" on public.calls;
create policy "calls follow the parent" on public.calls
  for all using (
    exists (select 1 from public.parents p where p.id = calls.parent_id and p.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.parents p where p.id = calls.parent_id and p.user_id = auth.uid())
  );

create index if not exists calls_parent_id_idx on public.calls (parent_id, scheduled_at desc);

-- --------------------------------------------------------------- summaries
create table if not exists public.summaries (
  id                uuid primary key default gen_random_uuid(),
  call_id           uuid not null references public.calls (id) on delete cascade,
  parent_id         uuid not null references public.parents (id) on delete cascade,
  status            text not null check (status in ('good', 'amber', 'red')),
  bullets           jsonb,
  medicines         text,
  mood              text,
  food_sleep        text,
  watch_for_update  text,
  ask_today         text,
  parent_message    text,
  created_at        timestamptz not null default now()
);

alter table public.summaries enable row level security;

drop policy if exists "summaries follow the parent" on public.summaries;
create policy "summaries follow the parent" on public.summaries
  for all using (
    exists (select 1 from public.parents p where p.id = summaries.parent_id and p.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.parents p where p.id = summaries.parent_id and p.user_id = auth.uid())
  );

create index if not exists summaries_parent_id_idx on public.summaries (parent_id, created_at desc);

-- ----------------------------------------------------------- subscriptions
create table if not exists public.subscriptions (
  user_id                 uuid primary key references auth.users (id) on delete cascade,
  status                  text not null default 'trial'
                          check (status in ('trial', 'active', 'expired', 'cancelled')),
  trial_ends_at           timestamptz,
  razorpay_subscription_id text,
  current_period_end      timestamptz,
  created_at              timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions are self service" on public.subscriptions;
create policy "subscriptions are self service" on public.subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
