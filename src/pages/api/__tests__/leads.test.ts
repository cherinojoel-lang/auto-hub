import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../leads';

const mockPrepare = vi.fn();
const mockVerifyTurnstileToken = vi.fn();

vi.mock('@/lib/turnstile-server', () => ({
  verifyTurnstileToken: (...args: unknown[]) => mockVerifyTurnstileToken(...args),
  TurnstileRejectedError: class TurnstileRejectedError extends Error {},
  TurnstileUnavailableError: class TurnstileUnavailableError extends Error {},
}));

vi.mock('cloudflare:workers', () => ({
  env: {
    DB: {
      prepare: (...args: unknown[]) => mockPrepare(...args),
    },
  },
}));

describe('POST /api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when turnstile token is missing', async () => {
    const request = new Request('https://automobile-quick.de/api/leads', {
      method: 'POST',
      body: JSON.stringify({ name: 'Max Mustermann' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST({ request } as any);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('turnstile_required');
  });

  it('inserts lead into D1 when DB binding is present and Turnstile is valid', async () => {
    mockVerifyTurnstileToken.mockResolvedValueOnce(undefined);
    const mockStmt = {
      bind: vi.fn().mockReturnThis(),
      run: vi.fn().mockResolvedValue({ success: true, meta: { changes: 1 } }),
    };
    mockPrepare.mockReturnValue(mockStmt);

    const request = new Request('https://automobile-quick.de/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        turnstile_token: 'valid-test-token',
        name: 'Max Mustermann',
        email: 'max@example.com',
        phone: '0123456789',
        message: 'Interesse an Probefahrt',
        intent: 'vehicle',
      }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST({ request } as any);
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.lead_id).toBeDefined();
    expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO lead_inquiries'));
    expect(mockStmt.run).toHaveBeenCalled();
  });
});
