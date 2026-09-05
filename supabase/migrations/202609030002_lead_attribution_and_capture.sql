alter table aq_ops.leads
  drop constraint if exists leads_status_check;

alter table aq_ops.leads
  add constraint leads_status_check
  check (status = any (array['new','contacted','qualified','appointment','test_drive','offer','sold','lost']::text[]));

alter table aq_ops.leads
  add column if not exists landing_page text,
  add column if not exists channel text not null default 'web',
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists gclid text,
  add column if not exists wbraid text,
  add column if not exists gbraid text,
  add column if not exists referrer text,
  add column if not exists consent_analytics boolean not null default false,
  add column if not exists consent_marketing boolean not null default false,
  add column if not exists consent_updated_at timestamptz,
  add column if not exists sold_at timestamptz,
  add column if not exists lost_reason text;

create index if not exists leads_vehicle_source_id_created_at_idx
  on aq_ops.leads (vehicle_source_id, created_at desc)
  where vehicle_source_id is not null;

create index if not exists leads_gclid_idx
  on aq_ops.leads (gclid)
  where gclid is not null;

create or replace function public.capture_aq_lead(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, aq_ops
as $$
declare
  new_lead_id uuid;
  normalized_intent text := coalesce(nullif(payload->>'intent', ''), 'general');
  normalized_name text := btrim(coalesce(payload->>'name', ''));
  normalized_email text := nullif(btrim(coalesce(payload->>'email', '')), '');
  normalized_phone text := nullif(btrim(coalesce(payload->>'phone', '')), '');
begin
  if normalized_name = '' then
    raise exception 'name_required' using errcode = '22023';
  end if;

  if normalized_email is null and normalized_phone is null then
    raise exception 'contact_required' using errcode = '22023';
  end if;

  if normalized_intent not in ('vehicle','appointment','finance','trade-in','general') then
    raise exception 'invalid_intent' using errcode = '22023';
  end if;

  insert into aq_ops.leads (
    intent, name, email, phone, message, vehicle_source_id, source, status,
    marketing_consent, privacy_acknowledged_at, landing_page, channel,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    gclid, wbraid, gbraid, referrer, consent_analytics, consent_marketing,
    consent_updated_at
  ) values (
    normalized_intent,
    normalized_name,
    normalized_email,
    normalized_phone,
    nullif(btrim(coalesce(payload->>'message', '')), ''),
    nullif(btrim(coalesce(payload->>'vehicle_id', '')), ''),
    coalesce(nullif(btrim(coalesce(payload->>'source', '')), ''), 'automobile-quick-website'),
    'new',
    coalesce((payload->>'marketing_consent')::boolean, false),
    coalesce((payload->>'privacy_acknowledged_at')::timestamptz, now()),
    nullif(btrim(coalesce(payload->>'landing_page', '')), ''),
    coalesce(nullif(btrim(coalesce(payload->>'channel', '')), ''), 'web'),
    nullif(btrim(coalesce(payload->>'utm_source', '')), ''),
    nullif(btrim(coalesce(payload->>'utm_medium', '')), ''),
    nullif(btrim(coalesce(payload->>'utm_campaign', '')), ''),
    nullif(btrim(coalesce(payload->>'utm_term', '')), ''),
    nullif(btrim(coalesce(payload->>'utm_content', '')), ''),
    nullif(btrim(coalesce(payload->>'gclid', '')), ''),
    nullif(btrim(coalesce(payload->>'wbraid', '')), ''),
    nullif(btrim(coalesce(payload->>'gbraid', '')), ''),
    nullif(btrim(coalesce(payload->>'referrer', '')), ''),
    coalesce((payload->>'consent_analytics')::boolean, false),
    coalesce((payload->>'consent_marketing')::boolean, false),
    case when payload ? 'consent_updated_at' then (payload->>'consent_updated_at')::timestamptz else null end
  ) returning id into new_lead_id;

  return new_lead_id;
end;
$$;

revoke all on function public.capture_aq_lead(jsonb) from public;
revoke all on function public.capture_aq_lead(jsonb) from anon;
revoke all on function public.capture_aq_lead(jsonb) from authenticated;
grant execute on function public.capture_aq_lead(jsonb) to service_role;
