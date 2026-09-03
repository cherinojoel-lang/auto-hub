import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitLead } from '../lead-client';

describe('lead-client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns success: true with leadId on 201 response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ ok: true, lead_id: 'lead-123' }),
    });

    const result = await submitLead({
      name: 'Max Mustermann',
      email: 'max@example.com',
      message: 'Interesse an Probefahrt',
    });

    expect(result).toEqual({ success: true, leadId: 'lead-123' });
  });

  it('fails closed and flags preview when preview_mode is returned', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ ok: false, error: 'preview_mode' }),
    });

    const result = await submitLead({
      name: 'Max Mustermann',
      email: 'max@example.com',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.isPreview).toBe(true);
      expect(result.error).toContain('Vorschau-Umgebung');
      expect(result.error).toContain('+49 (0) 2374 / 912912');
    }
  });

  it('fails closed on network exception without fake success', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await submitLead({
      name: 'Max Mustermann',
      phone: '01711234567',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('Verbindungsfehler');
    }
  });
});
