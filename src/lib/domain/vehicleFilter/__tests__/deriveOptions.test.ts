import { describe, it, expect } from 'vitest';
import type { Vehicle } from '@/data/vehiclesData.generated';
import { deriveManufacturerOptions, deriveFuelOptions } from '../deriveOptions';

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

describe('deriveManufacturerOptions', () => {
  it('liefert sortierte, deduplizierte Liste der vorhandenen makes', () => {
    const data = [make({ make: 'Renault' }), make({ make: 'BMW' }), make({ make: 'BMW' }), make({ make: 'Opel' })];
    expect(deriveManufacturerOptions(data)).toEqual(['BMW', 'Opel', 'Renault']);
  });
  it('ignoriert status=sold und status=hidden_review', () => {
    const data = [
      make({ make: 'BMW' }),
      make({ make: 'Hidden', status: 'sold' }),
      make({ make: 'Hidden', status: 'hidden_review' }),
    ];
    expect(deriveManufacturerOptions(data)).toEqual(['BMW']);
  });
  it('leere Eingabe → leere Liste', () => {
    expect(deriveManufacturerOptions([])).toEqual([]);
  });
});

describe('deriveFuelOptions', () => {
  it('liefert sortierte, deduplizierte Kraftstoff-Liste verfügbarer Fahrzeuge', () => {
    const data = [make({ fuel: 'Benzin' }), make({ fuel: 'Diesel' }), make({ fuel: 'Benzin' })];
    expect(deriveFuelOptions(data)).toEqual(['Benzin', 'Diesel']);
  });
});
