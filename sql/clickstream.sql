create extension if not exists "uuid-ossp";

create table if not exists public.clickstream (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  page text,
  target text,
  video_time numeric,
  quiz_id text,
  quiz_question_id text,
  quiz_answer text,
  quiz_correct boolean,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.clickstream enable row level security;

-- Allow authenticated users to insert their own events
create policy "Users can insert their own events"
on public.clickstream
for insert
to authenticated
with check (user_id = auth.uid());

-- Allow users to read only their own events (optional; comment out if you want admin-only read)
create policy "Users can read their own events"
on public.clickstream
for select
to authenticated
using (user_id = auth.uid());

create index if not exists clickstream_user_time_idx on public.clickstream(user_id, created_at desc);
create index if not exists clickstream_event_type_idx on public.clickstream(event_type);
