import { env } from 'cloudflare:workers';

type TurnstileRuntimeEnv = {
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_ALLOWED_HOSTNAME?: string;
};

type SiteverifyResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
  ['error-codes']?: string[];
};

export class TurnstileUnavailableError extends Error {
  constructor() {
    super('turnstile_unavailable');
  }
}

export class TurnstileRejectedError extends Error {
  constructor() {
    super('turnstile_rejected');
  }
}

export async function verifyTurnstileToken(token: string, remoteIp?: string | null): Promise<void> {
  const runtimeEnv = env as unknown as TurnstileRuntimeEnv;
  const secret = runtimeEnv.TURNSTILE_SECRET_KEY;
  if (!secret) throw new TurnstileUnavailableError();

  const body = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });
  if (remoteIp) body.set('remoteip', remoteIp);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  let response: Response;
  try {
    response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });
  } catch {
    throw new TurnstileUnavailableError();
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) throw new TurnstileUnavailableError();

  const result = await response.json() as SiteverifyResponse;
  const allowedHostname = runtimeEnv.TURNSTILE_ALLOWED_HOSTNAME?.trim();
  const correctHost = !allowedHostname || result.hostname === allowedHostname;
  const correctAction = !result.action || result.action === 'lead_form';

  if (!result.success || !correctHost || !correctAction) {
    throw new TurnstileRejectedError();
  }
}
