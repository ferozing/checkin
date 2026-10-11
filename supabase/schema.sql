-- Checkin data model, from CLAUDE.md. Paste into the Supabase SQL editor and
-- run once. Safe to re-run: every statement is guarded.
--
-- Row Level Security is on for every table. The rule throughout: you only ever
-- see and change your own rows, and anything belonging to a parent follows
-- whoever owns that parent.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  name             text,
  whatsapp         text,
  whatsapp_opt_in  boolean not null default true,
  created_at       timestamptz not null default now()
);

alter table public.profiles enable row level security;
drop policy if exists "profiles are self service" on public.profiles;
create policy "profiles are self service" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- A profile exists from the moment someone signs up.
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
-- No policy on purpose: the table cannot be read, so codes cannot be listed.

create or replace function public.invite_code_is_valid(p_code text)
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.invite_codes
    where upper(code) = upper(trim(p_code)) and active and used_count < max_uses
  );
$$;

create or replace function public.redeem_invite_code(p_code text)
returns boolean language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  update public.invite_codes
     set used_count = used_count + 1
   where upper(code) = upper(trim(p_code)) and active and used_count < max_uses
  returning true into ok;
  return coalesce(ok, false);
end;
$$;

grant execute on function public.invite_code_is_valid(text) to anon, authenticated;
grant execute on function public.redeem_invite_code(text) to authenticated;

insert into public.invite_codes (code, max_uses) values
  ('FAMILY2026', 50), ('AMURA', 50), ('FIRST50', 50)
on conflict (code) do nothing;

-- ----------------------------------------------------------------- parents
create table if not exists public.parents (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  name               text not null,
  call_name          text,
  phone              text not null,
  language           text not null default 'Telugu',
  city               text,
  call_slot          text not null default 'morning' check (call_slot in ('morning', 'evening')),
  call_time          time not null default '09:00',
  first_call_at      timestamptz,
  medicines          jsonb not null default '[]'::jsonb,
  watch_for          text[] not null default '{}',
  topics             text,
  consent_status     text not null default 'pending'
                     check (consent_status in ('pending', 'given', 'declined')),
  recording_consent  boolean not null default false,
  paused             boolean not null default false,
  created_at         timestamptz not null default now()
);

alter table public.parents enable row level security;
drop policy if exists "parents are self service" on public.parents;
create policy "parents are self service" on public.parents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists parents_user_id_idx on public.parents (user_id);

-- Everything below belongs to a parent, so it inherits that parent's owner.
create or replace function public.owns_parent(p_parent uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.parents p where p.id = p_parent and p.user_id = auth.uid());
$$;

grant execute on function public.owns_parent(uuid) to authenticated;

-- ---------------------------------------------------------- family_members
create table if not exists public.family_members (
  id               uuid primary key default gen_random_uuid(),
  parent_id        uuid not null references public.parents (id) on delete cascade,
  name             text not null,
  whatsapp         text not null,
  receives_alerts  boolean not null default true,
  created_at       timestamptz not null default now()
);

alter table public.family_members enable row level security;
drop policy if exists "family follows the parent" on public.family_members;
create policy "family follows the parent" on public.family_members
  for all using (public.owns_parent(parent_id)) with check (public.owns_parent(parent_id));
create index if not exists family_members_parent_idx on public.family_members (parent_id);

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
  is_test       boolean not null default false,
  bolna_call_id text,
  transcript    jsonb,
  recording_url text,
  language      text,
  created_at    timestamptz not null default now()
);

alter table public.calls enable row level security;
drop policy if exists "calls follow the parent" on public.calls;
create policy "calls follow the parent" on public.calls
  for all using (public.owns_parent(parent_id)) with check (public.owns_parent(parent_id));
create index if not exists calls_parent_idx on public.calls (parent_id, scheduled_at desc);

-- --------------------------------------------------------------- summaries
create table if not exists public.summaries (
  id          uuid primary key default gen_random_uuid(),
  call_id     uuid not null references public.calls (id) on delete cascade,
  parent_id   uuid not null references public.parents (id) on delete cascade,
  status      text not null check (status in ('good', 'amber', 'red', 'missed')),
  headline    text,
  rows        jsonb,
  medicines   jsonb,
  mood        text,
  food_sleep  text,
  ask_today   text,
  accurate    boolean,
  created_at  timestamptz not null default now()
);

alter table public.summaries enable row level security;
drop policy if exists "summaries follow the parent" on public.summaries;
create policy "summaries follow the parent" on public.summaries
  for all using (public.owns_parent(parent_id)) with check (public.owns_parent(parent_id));
create index if not exists summaries_parent_idx on public.summaries (parent_id, created_at desc);

-- ------------------------------------------------------------------ alerts
create table if not exists public.alerts (
  id          uuid primary key default gen_random_uuid(),
  parent_id   uuid not null references public.parents (id) on delete cascade,
  summary_id  uuid references public.summaries (id) on delete set null,
  level       text not null check (level in ('red', 'amber', 'missed')),
  handled_at  timestamptz,
  created_at  timestamptz not null default now()
);

alter table public.alerts enable row level security;
drop policy if exists "alerts follow the parent" on public.alerts;
create policy "alerts follow the parent" on public.alerts
  for all using (public.owns_parent(parent_id)) with check (public.owns_parent(parent_id));
create index if not exists alerts_parent_idx on public.alerts (parent_id, created_at desc);

-- ---------------------------------------------------------------- messages
create table if not exists public.messages (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  template       text not null,
  status         text not null default 'sent'
                 check (status in ('sent', 'delivered', 'read', 'failed')),
  wa_message_id  text,
  created_at     timestamptz not null default now()
);

alter table public.messages enable row level security;
drop policy if exists "messages are self service" on public.messages;
create policy "messages are self service" on public.messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists messages_user_idx on public.messages (user_id, created_at desc);

-- ----------------------------------------------------------- subscriptions
create table if not exists public.subscriptions (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null references auth.users (id) on delete cascade,
  parent_id                uuid references public.parents (id) on delete cascade,
  status                   text not null default 'trial'
                           check (status in ('trial', 'active', 'expired', 'cancelled')),
  trial_ends_at            timestamptz,
  razorpay_subscription_id text,
  current_period_end       timestamptz,
  created_at               timestamptz not null default now()
);

-- One subscription per parent.
create unique index if not exists subscriptions_parent_key on public.subscriptions (parent_id);

alter table public.subscriptions enable row level security;
drop policy if exists "subscriptions are self service" on public.subscriptions;
create policy "subscriptions are self service" on public.subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
