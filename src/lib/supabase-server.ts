import { env } from 'cloudflare:workers';
import type { NormalizedLead } from '@/domain/lead';

type SupabaseEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SECRET_KEY?: string;
};

export class BackendUnavailableError extends Error {
  constructor() {
    super('backend_unavailable');
  }
}

export async function captureLead(lead: NormalizedLead): Promise<string> {
  const runtimeEnv = env as unknown as SupabaseEnv;
  const supabaseUrl = runtimeEnv.SUPABASE_URL?.replace(/\/$/, '');
  const secretKey = runtimeEnv.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new BackendUnavailableError();
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/capture_aq_lead`, {
    method: 'POST',
    headers: {
      apikey: secretKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ payload: lead }),
  });

  if (!response.ok) {
    throw new BackendUnavailableError();
  }

  const result = await response.json<unknown>();
  if (typeof result !== 'string' || !/^[0-9a-f-]{36}$/i.test(result)) {
    throw new BackendUnavailableError();
  }

  return result;
}
