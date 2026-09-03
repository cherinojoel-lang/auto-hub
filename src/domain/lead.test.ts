import { describe, expect, it } from 'vitest';
import { LEAD_STATUSES, normalizeLeadInput } from './lead';

describe('lead contract', () => {
  it('uses the complete sales lifecycle', () => {
    expect(LEAD_STATUSES).toEqual([
      'new',
      'contacted',
      'qualified',
      'appointment',
      'test_drive',
      'offer',
      'sold',
      'lost',
    ]);
  });

  it('requires a name and at least one direct contact method', () => {
    expect(() => normalizeLeadInput({ name: '', intent: 'general' })).toThrow('name_required');
    expect(() => normalizeLeadInput({ name: 'Max', intent: 'general' })).toThrow('contact_required');
  });

  it('normalizes supported attribution without inventing values', () => {
    const lead = normalizeLeadInput({
      name: ' Max Mustermann ',
      email: ' max@example.de ',
      intent: 'vehicle',
      vehicle_id: ' opel-corsa-f ',
      landing_page: ' /fahrzeuge/opel-corsa-f ',
      channel: 'web',
      utm_source: ' google ',
      utm_medium: ' cpc ',
      gclid: ' TEST-GCLID ',
      consent_analytics: false,
      consent_marketing: false,
    });

    expect(lead.name).toBe('Max Mustermann');
    expect(lead.email).toBe('max@example.de');
    expect(lead.vehicle_id).toBe('opel-corsa-f');
    expect(lead.landing_page).toBe('/fahrzeuge/opel-corsa-f');
    expect(lead.utm_source).toBe('google');
    expect(lead.utm_medium).toBe('cpc');
    expect(lead.gclid).toBe('TEST-GCLID');
    expect(lead.consent_analytics).toBe(false);
    expect(lead.consent_marketing).toBe(false);
  });

  it('rejects unsupported lead intents', () => {
    expect(() => normalizeLeadInput({ name: 'Max', email: 'm@example.de', intent: 'checkout' })).toThrow('invalid_intent');
  });
});
