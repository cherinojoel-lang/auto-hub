import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

interface VehicleEnrichInput {
  make: string;
  model: string;
  year?: number | string;
  mileage?: number;
  fuel_type?: string;
  power_hp?: number;
  features?: string[];
}

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
  let body: VehicleEnrichInput;
  try {
    body = (await request.json()) as VehicleEnrichInput;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  if (!body.make || !body.model) {
    return json({ ok: false, error: 'make_and_model_required' }, 400);
  }

  const ai = (env as unknown as { AI?: { run: (model: string, input: unknown) => Promise<unknown> } }).AI;
  if (!ai || typeof ai.run !== 'function') {
    return json({ ok: false, error: 'ai_binding_unavailable' }, 503);
  }

  const prompt = `Du bist ein professioneller Automobil-Verkaufsexperte für das Autohaus Automobile Quick in Castrop-Rauxel.
Erstelle für folgendes Fahrzeug eine prägnante, verkaufsfördernde Beschreibung auf Deutsch:
Fahrzeug: ${body.make} ${body.model}
${body.year ? `Erstzulassung/Baujahr: ${body.year}` : ''}
${body.mileage ? `Kilometerstand: ${body.mileage} km` : ''}
${body.fuel_type ? `Kraftstoffart: ${body.fuel_type}` : ''}
${body.power_hp ? `Leistung: ${body.power_hp} PS` : ''}
${body.features?.length ? `Highlights/Ausstattung: ${body.features.join(', ')}` : ''}

Antworte strukturiert mit:
1. Einem prägnanten Teaser-Satz (maximal 2 Zeilen)
2. Den Top 3 Verkaufsargumenten als Aufzählungspunkt
3. Einem kurzen Fazit mit Handlungsaufforderung zur Probefahrt.`;

  try {
    const aiResponse = (await ai.run('@cf/meta/llama-3.1-8b-instruct', {
      prompt,
      max_tokens: 512,
    })) as { response?: string };

    return json({
      ok: true,
      enrichment: aiResponse?.response ?? '',
      vehicle: `${body.make} ${body.model}`,
    });
  } catch (error) {
    return json({
      ok: false,
      error: 'ai_inference_failed',
      details: error instanceof Error ? error.message : String(error),
    }, 500);
  }
};
