import { describe, it, expect } from 'vitest';
import { mapD1ToExternalSync } from '../types';
import type { D1VehicleRow } from '../../d1/types';

describe('Multi-Platform Sync Mapper', () => {
  const sampleVehicle: D1VehicleRow = {
    id: 'veh-99',
    make: 'Volkswagen',
    model: 'Golf GTI',
    version: 'Clubsport',
    mileage: 28000,
    first_registration: '2022-04',
    fuel_type: 'Benzin',
    transmission: 'Automatik',
    power_hp: 300,
    price_eur: 34990,
    vat_deductible: 1,
    status: 'AVAILABLE',
    mobile_de_url: 'https://suchen.mobile.de/fahrzeuge/details.html?id=12345',
    autoscout24_url: null,
    description: 'Top Zustand',
    features: JSON.stringify(['Sportsitze', 'DCC', 'Harman Kardon']),
    hero_image_url: 'https://images.automobile-quick.de/golf.jpg',
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-01T10:00:00Z',
  };

  it('maps vehicle to mobile.de payload using custom URL when present', () => {
    const payload = mapD1ToExternalSync(sampleVehicle, 'mobile_de');
    expect(payload.externalId).toBe('veh-99');
    expect(payload.platform).toBe('mobile_de');
    expect(payload.deepLink).toBe('https://suchen.mobile.de/fahrzeuge/details.html?id=12345');
    expect(payload.price).toBe(34990);
  });

  it('generates fallback dealer inventory deep link for autoscout24 when url is null', () => {
    const payload = mapD1ToExternalSync(sampleVehicle, 'autoscout24');
    expect(payload.platform).toBe('autoscout24');
    expect(payload.deepLink).toBe('https://www.autoscout24.de/haendler/automobile-quick/fahrzeuge/veh-99');
  });
});
