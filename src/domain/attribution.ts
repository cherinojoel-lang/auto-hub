export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  wbraid: string | null;
  gbraid: string | null;
};

const LIMITS: Record<keyof Attribution, number> = {
  utm_source: 160,
  utm_medium: 160,
  utm_campaign: 240,
  utm_term: 240,
  utm_content: 240,
  gclid: 300,
  wbraid: 300,
  gbraid: 300,
};

function bounded(value: string | null, max: number): string | null {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, max) : null;
}

export function extractAttribution(url: URL): Attribution {
  return {
    utm_source: bounded(url.searchParams.get('utm_source'), LIMITS.utm_source),
    utm_medium: bounded(url.searchParams.get('utm_medium'), LIMITS.utm_medium),
    utm_campaign: bounded(url.searchParams.get('utm_campaign'), LIMITS.utm_campaign),
    utm_term: bounded(url.searchParams.get('utm_term'), LIMITS.utm_term),
    utm_content: bounded(url.searchParams.get('utm_content'), LIMITS.utm_content),
    gclid: bounded(url.searchParams.get('gclid'), LIMITS.gclid),
    wbraid: bounded(url.searchParams.get('wbraid'), LIMITS.wbraid),
    gbraid: bounded(url.searchParams.get('gbraid'), LIMITS.gbraid),
  };
}
