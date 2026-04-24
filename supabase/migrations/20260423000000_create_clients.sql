create table public.clients (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  full_name  text        not null,
  email      text,
  phone      text,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.clients enable row level security;

-- Users can only access their own clients
create policy "users_own_clients"
  on public.clients
  for all
  using  (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Auto-refresh updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

create index clients_user_id_idx on public.clients (user_id);
