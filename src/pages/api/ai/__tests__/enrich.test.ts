import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../enrich';

const mockAiRun = vi.fn();

vi.mock('cloudflare:workers', () => ({
  env: {
    AI: {
      run: (...args: unknown[]) => mockAiRun(...args),
    },
  },
}));

describe('POST /api/ai/enrich', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when make or model is missing', async () => {
    const request = new Request('https://automobile-quick.de/api/ai/enrich', {
      method: 'POST',
      body: JSON.stringify({ make: 'Audi' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST({ request } as any);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('make_and_model_required');
  });

  it('calls Workers AI and returns enrichment text on success', async () => {
    mockAiRun.mockResolvedValueOnce({
      response: 'Topgepflegter Audi A4 Avant mit Traumausstattung.',
    });

    const request = new Request('https://automobile-quick.de/api/ai/enrich', {
      method: 'POST',
      body: JSON.stringify({
        make: 'Audi',
        model: 'A4 Avant',
        year: 2021,
        mileage: 45000,
        fuel_type: 'Diesel',
        power_hp: 190,
        features: ['Panoramadach', 'Matrix-LED', 'Navigation Plus'],
      }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST({ request } as any);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.enrichment).toContain('Topgepflegter Audi A4');
    expect(mockAiRun).toHaveBeenCalledWith(
      '@cf/meta/llama-3.1-8b-instruct',
      expect.objectContaining({
        prompt: expect.stringContaining('Iserlohn-Letmathe'),
      })
    );
  });
});
