import { describe, it, expect, vi, beforeEach } from 'vitest';
import { normalizeLeadInput } from '@/domain/lead';
import { captureLead, BackendUnavailableError } from '../supabase-server';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('cloudflare:workers', () => ({
  env: {
    SUPABASE_URL: 'https://test-project.supabase.co',
    SUPABASE_SECRET_KEY: 'test-service-key',
  },
}));

describe('captureLead (supabase-server)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('captures lead and returns uuid string on success', async () => {
    const validUuid = '12345678-1234-1234-1234-123456789abc';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(validUuid),
    });

    const lead = normalizeLeadInput({
      name: 'Max Mustermann',
      phone: '0123456789',
      intent: 'general',
    });

    const result = await captureLead(lead);
    expect(result).toBe(validUuid);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://test-project.supabase.co/rest/v1/rpc/capture_aq_lead',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          apikey: 'test-service-key',
        }),
      })
    );
  });

  it('throws BackendUnavailableError when fetch fails or times out', async () => {
    mockFetch.mockRejectedValueOnce(new Error('AbortError / Timeout'));

    const lead = normalizeLeadInput({
      name: 'Max Mustermann',
      phone: '0123456789',
      intent: 'general',
    });

    await expect(captureLead(lead)).rejects.toThrow(BackendUnavailableError);
  });

  it('throws BackendUnavailableError when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const lead = normalizeLeadInput({
      name: 'Max Mustermann',
      phone: '0123456789',
      intent: 'general',
    });

    await expect(captureLead(lead)).rejects.toThrow(BackendUnavailableError);
  });
});
