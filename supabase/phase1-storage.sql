-- Fase 1 - Storage para imagens do CMS
-- Execute no SQL Editor do Supabase

insert into storage.buckets (id, name, public)
values
  ('images', 'images', true),
  ('cms-images', 'cms-images', true)
on conflict (id) do nothing;

drop policy if exists "cms_images_public_read" on storage.objects;
drop policy if exists "cms_media_public_read" on storage.objects;
create policy "cms_media_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id in ('images', 'cms-images'));

drop policy if exists "cms_images_authenticated_insert" on storage.objects;
drop policy if exists "cms_media_authenticated_insert" on storage.objects;
create policy "cms_media_authenticated_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id in ('images', 'cms-images'));

drop policy if exists "cms_images_authenticated_update" on storage.objects;
drop policy if exists "cms_media_authenticated_update" on storage.objects;
create policy "cms_media_authenticated_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id in ('images', 'cms-images'))
  with check (bucket_id in ('images', 'cms-images'));

drop policy if exists "cms_images_authenticated_delete" on storage.objects;
drop policy if exists "cms_media_authenticated_delete" on storage.objects;
create policy "cms_media_authenticated_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id in ('images', 'cms-images'));
