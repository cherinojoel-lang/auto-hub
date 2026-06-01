import { describe, it, expect } from 'vitest';
import type { Vehicle } from '@/data/vehiclesData.generated';
import { getVehicleImageCount, getFeatureChips } from '../vehicleFeatures';

const make = (overrides: Partial<Vehicle>): Vehicle => ({
  id: 'x',
  folder: 'x',
  make: 'BMW',
  model: 'M3',
  title: 'BMW M3',
  price: '15.000 €',
  priceValue: 15000,
  financing: '',
  firstRegistration: '01/2020',
  mileage: '50.000 km',
  power: '300 kW',
  fuel: 'Benzin',
  mainImage: '',
  gallery: [],
  alt: '',
  status: 'available',
  ...overrides,
});

// ---------------------------------------------------------------------------
// getVehicleImageCount
// ---------------------------------------------------------------------------
describe('getVehicleImageCount', () => {
  it('zählt mainImage + gallery ohne Duplikate', () => {
    const v = make({ mainImage: 'a.jpg', gallery: ['b.jpg', 'c.jpg'] });
    expect(getVehicleImageCount(v)).toBe(3);
  });

  it('gibt 0 zurück bei leerem Vehicle (kein mainImage, leere gallery)', () => {
    const v = make({ mainImage: '', gallery: [] });
    expect(getVehicleImageCount(v)).toBe(0);
  });

  it('gibt 1 zurück wenn nur mainImage vorhanden', () => {
    const v = make({ mainImage: 'hero.jpg', gallery: [] });
    expect(getVehicleImageCount(v)).toBe(1);
  });

  it('dedupliziert wenn mainImage auch in gallery vorkommt', () => {
    const v = make({ mainImage: 'a.jpg', gallery: ['a.jpg', 'b.jpg'] });
    expect(getVehicleImageCount(v)).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// getFeatureChips
// ---------------------------------------------------------------------------
describe('getFeatureChips', () => {
  it('erkennt "Navi" im title', () => {
    const v = make({ title: 'VW Golf mit Navi' });
    expect(getFeatureChips(v)).toContain('Navi');
  });

  it('erkennt "LED" im title (case-insensitive)', () => {
    const v = make({ title: 'Audi A4 led Scheinwerfer' });
    expect(getFeatureChips(v)).toContain('LED');
  });

  it('erkennt "PDC" im title', () => {
    const v = make({ title: 'Ford Focus PDC hinten' });
    expect(getFeatureChips(v)).toContain('PDC');
  });

  it('erkennt "Hybrid" im title', () => {
    const v = make({ title: 'Toyota Yaris Hybrid' });
    expect(getFeatureChips(v)).toContain('Hybrid');
  });

  it('filtert Kraftstoff-Wort heraus (fuel="Automatik" → kein "Automatik"-Chip)', () => {
    // fuel matching label exactly → should be filtered out
    const v = make({ title: 'VW Passat Automatik', fuel: 'Automatik' });
    expect(getFeatureChips(v)).not.toContain('Automatik');
  });

  it('gibt maximal 4 Chips zurück', () => {
    // title contains Navi, LED, PDC, Kamera, Hybrid, Alu — more than 4 features
    const v = make({ title: 'BMW X5 Navi LED PDC Kamera Hybrid Alu Klima' });
    expect(getFeatureChips(v).length).toBeLessThanOrEqual(4);
  });

  it('gibt [] zurück wenn keine Patterns matchen', () => {
    const v = make({ title: 'Opel Corsa Basisausstattung', description: '' });
    expect(getFeatureChips(v)).toEqual([]);
  });
});
