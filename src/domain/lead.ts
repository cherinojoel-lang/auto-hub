export const LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'appointment',
  'test_drive',
  'offer',
  'sold',
  'lost',
] as const;

export const LEAD_INTENTS = ['vehicle', 'appointment', 'finance', 'trade-in', 'general'] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadIntent = (typeof LEAD_INTENTS)[number];

export type LeadInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  intent?: unknown;
  vehicle_id?: unknown;
  source?: unknown;
  landing_page?: unknown;
  channel?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_term?: unknown;
  utm_content?: unknown;
  gclid?: unknown;
  wbraid?: unknown;
  gbraid?: unknown;
  referrer?: unknown;
  marketing_consent?: unknown;
  consent_analytics?: unknown;
  consent_marketing?: unknown;
  consent_updated_at?: unknown;
  privacy_acknowledged_at?: unknown;
};

export type NormalizedLead = {
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  intent: LeadIntent;
  vehicle_id: string | null;
  source: string;
  landing_page: string | null;
  channel: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  wbraid: string | null;
  gbraid: string | null;
  referrer: string | null;
  marketing_consent: boolean;
  consent_analytics: boolean;
  consent_marketing: boolean;
  consent_updated_at: string | null;
  privacy_acknowledged_at: string;
};

function text(value: unknown, maxLength = 500): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return normalized.slice(0, maxLength);
}

function flag(value: unknown): boolean {
  return value === true || value === 'true';
}

export function normalizeLeadInput(input: LeadInput): NormalizedLead {
  const name = text(input.name, 120);
  if (!name) throw new Error('name_required');

  const email = text(input.email, 254);
  const phone = text(input.phone, 80);
  if (!email && !phone) throw new Error('contact_required');

  const rawIntent = text(input.intent, 40) ?? 'general';
  if (!LEAD_INTENTS.includes(rawIntent as LeadIntent)) throw new Error('invalid_intent');

  const now = new Date().toISOString();

  return {
    name,
    email,
    phone,
    message: text(input.message, 4000),
    intent: rawIntent as LeadIntent,
    vehicle_id: text(input.vehicle_id, 160),
    source: text(input.source, 120) ?? 'automobile-quick-website',
    landing_page: text(input.landing_page, 500),
    channel: text(input.channel, 80) ?? 'web',
    utm_source: text(input.utm_source, 160),
    utm_medium: text(input.utm_medium, 160),
    utm_campaign: text(input.utm_campaign, 240),
    utm_term: text(input.utm_term, 240),
    utm_content: text(input.utm_content, 240),
    gclid: text(input.gclid, 300),
    wbraid: text(input.wbraid, 300),
    gbraid: text(input.gbraid, 300),
    referrer: text(input.referrer, 500),
    marketing_consent: flag(input.marketing_consent),
    consent_analytics: flag(input.consent_analytics),
    consent_marketing: flag(input.consent_marketing),
    consent_updated_at: text(input.consent_updated_at, 80),
    privacy_acknowledged_at: text(input.privacy_acknowledged_at, 80) ?? now,
  };
}
