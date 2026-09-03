import type { APIRoute } from 'astro';
import { normalizeLeadInput } from '@/domain/lead';
import { BackendUnavailableError, captureLead } from '@/lib/supabase-server';

export const prerender = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  let lead;
  try {
    lead = normalizeLeadInput((raw ?? {}) as Record<string, unknown>);
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : 'invalid_lead',
    }, 400);
  }

  try {
    const leadId = await captureLead(lead);
    return json({ ok: true, lead_id: leadId }, 201);
  } catch (error) {
    if (error instanceof BackendUnavailableError) {
      return json({ ok: false, error: 'backend_unavailable' }, 503);
    }

    return json({ ok: false, error: 'lead_capture_failed' }, 500);
  }
};
