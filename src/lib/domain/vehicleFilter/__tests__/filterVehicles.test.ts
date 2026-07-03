import { describe, it, expect } from 'vitest';
import type { Vehicle } from '@/data/vehiclesData.generated';
import { filterVehicles } from '../filterVehicles';
import { EMPTY_CRITERIA } from '../schema';

const mk = (id: string, o: Partial<Vehicle>): Vehicle => ({
  id,
  folder: id,
  make: 'BMW',
  model: 'X',
  title: 'BMW X',
  price: '15.000 €',
  priceValue: 15000,
  financing: '',
  firstRegistration: '01/2020',
  mileage: '50.000 km',
  power: '',
  fuel: 'Benzin',
  mainImage: '',
  gallery: [],
  alt: '',
  status: 'available',
  ...o,
});

const data: Vehicle[] = [
  mk('a', { make: 'BMW', priceValue: 10000, fuel: 'Diesel', mileage: '40.000 km', firstRegistration: '01/2015' }),
  mk('b', { make: 'Opel', priceValue: 25000, fuel: 'Benzin', mileage: '90.000 km', firstRegistration: '01/2019' }),
  mk('c', { make: 'BMW', priceValue: 50000, fuel: 'Benzin', mileage: '20.000 km', firstRegistration: '01/2021' }),
];

describe('filterVehicles', () => {
  it('leere Kriterien → alle verfügbaren Fahrzeuge', () => {
    expect(filterVehicles(data, EMPTY_CRITERIA).map((v) => v.id)).toEqual(['a', 'b', 'c']);
  });

  it('manufacturer-Filter via make', () => {
    expect(filterVehicles(data, { ...EMPTY_CRITERIA, manufacturer: 'BMW' }).map((v) => v.id)).toEqual(['a', 'c']);
  });

  it('AND-Logik bei mehreren Kriterien', () => {
    const out = filterVehicles(data, {
      ...EMPTY_CRITERIA,
      manufacturer: 'BMW',
      fuel: 'Benzin',
      yearFrom: '2020',
    });
    expect(out.map((v) => v.id)).toEqual(['c']);
  });

  it('schließt status != available aus', () => {
    const mixed = [...data, mk('d', { make: 'BMW', status: 'sold' })];
    expect(filterVehicles(mixed, { ...EMPTY_CRITERIA, manufacturer: 'BMW' }).map((v) => v.id)).toEqual(['a', 'c']);
  });
});
