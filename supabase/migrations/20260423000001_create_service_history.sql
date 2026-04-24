create table public.service_history (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  client_id    uuid        not null references public.clients(id) on delete cascade,
  service_name text        not null,
  service_date date        not null,
  notes        text,
  created_at   timestamptz not null default now()
);

alter table public.service_history enable row level security;

create policy "users_own_service_history"
  on public.service_history
  for all
  using  (user_id = auth.uid())
  with check (user_id = auth.uid());

create index service_history_client_id_idx on public.service_history (client_id);
create index service_history_user_id_idx  on public.service_history (user_id);
