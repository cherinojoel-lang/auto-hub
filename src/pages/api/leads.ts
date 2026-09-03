import type { APIRoute } from 'astro';
import { normalizeLeadInput, type NormalizedLead } from '@/domain/lead';
import { BackendUnavailableError, captureLead } from '@/lib/supabase-server';
import {
  TurnstileRejectedError,
  TurnstileUnavailableError,
  verifyTurnstileToken,
} from '@/lib/turnstile-server';

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
  let raw: Record<string, unknown>;

  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const turnstileToken = typeof raw.turnstile_token === 'string' ? raw.turnstile_token.trim() : '';
  if (!turnstileToken) {
    return json({ ok: false, error: 'turnstile_required' }, 400);
  }

  try {
    await verifyTurnstileToken(turnstileToken, request.headers.get('cf-connecting-ip'));
  } catch (error) {
    if (error instanceof TurnstileUnavailableError) {
      return json({ ok: false, error: 'turnstile_unavailable' }, 503);
    }
    if (error instanceof TurnstileRejectedError) {
      return json({ ok: false, error: 'turnstile_rejected' }, 400);
    }
    return json({ ok: false, error: 'turnstile_failed' }, 500);
  }

  let lead: NormalizedLead;
  try {
    lead = normalizeLeadInput(raw);
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
