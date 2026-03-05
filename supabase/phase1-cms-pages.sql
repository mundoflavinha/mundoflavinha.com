-- Fase 1 - CMS Home V2
-- Execute no SQL Editor do Supabase

create table if not exists public.cms_pages (
  slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.cms_pages enable row level security;

drop policy if exists "cms_pages_public_read_home_v2" on public.cms_pages;
create policy "cms_pages_public_read_home_v2"
  on public.cms_pages
  for select
  to anon, authenticated
  using (slug = 'home-v2');

drop policy if exists "cms_pages_authenticated_insert" on public.cms_pages;
create policy "cms_pages_authenticated_insert"
  on public.cms_pages
  for insert
  to authenticated
  with check (true);

drop policy if exists "cms_pages_authenticated_update" on public.cms_pages;
create policy "cms_pages_authenticated_update"
  on public.cms_pages
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "cms_pages_authenticated_delete" on public.cms_pages;
create policy "cms_pages_authenticated_delete"
  on public.cms_pages
  for delete
  to authenticated
  using (true);

insert into public.cms_pages (slug, content)
values ('home-v2', '{}'::jsonb)
on conflict (slug) do nothing;
