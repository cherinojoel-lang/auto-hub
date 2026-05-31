import { describe, it, expect } from 'vitest';
import type { Vehicle } from '@/data/vehiclesData.generated';
import {
  matchesManufacturer,
  matchesPriceMax,
  matchesFuel,
  matchesMaxMileage,
  matchesYearFrom,
} from '../predicates';

const v = (overrides: Partial<Vehicle>): Vehicle => ({
  id: 'test',
  folder: 'x',
  make: 'BMW',
  model: '320d',
  title: 'BMW 320d',
  price: '15.000 €',
  priceValue: 15000,
  financing: 'ab 150 €',
  firstRegistration: '05/2018',
  mileage: '80.000 km',
  power: '140 kW',
  fuel: 'Diesel',
  mainImage: '/x.webp',
  gallery: [],
  alt: '',
  status: 'available',
  ...overrides,
});

describe('matchesManufacturer', () => {
  it('matched anhand des make-Feldes (nicht title)', () => {
    expect(matchesManufacturer(v({ make: 'BMW', title: 'Tesla-Killer' }), 'bmw')).toBe(true);
    expect(matchesManufacturer(v({ make: 'Opel', title: 'BMW-look-alike' }), 'bmw')).toBe(false);
  });
  it('leerer manufacturer matched alles', () => {
    expect(matchesManufacturer(v({}), '')).toBe(true);
  });
  it('case-insensitiv', () => {
    expect(matchesManufacturer(v({ make: 'Citroën' }), 'CITROËN')).toBe(true);
  });
});

describe('matchesPriceMax', () => {
  it('matched wenn priceValue <= criterion', () => {
    expect(matchesPriceMax(v({ priceValue: 15000 }), '15000')).toBe(true);
    expect(matchesPriceMax(v({ priceValue: 15001 }), '15000')).toBe(false);
  });
  it('leerer priceMax matched alles', () => {
    expect(matchesPriceMax(v({ priceValue: 999999 }), '')).toBe(true);
  });
});

describe('matchesFuel', () => {
  it('matched exakt (case-insensitiv)', () => {
    expect(matchesFuel(v({ fuel: 'Diesel' }), 'diesel')).toBe(true);
    expect(matchesFuel(v({ fuel: 'Benzin' }), 'diesel')).toBe(false);
  });
});

describe('matchesMaxMileage', () => {
  it('matched wenn parsed mileage <= criterion', () => {
    expect(matchesMaxMileage(v({ mileage: '80.000 km' }), '100000')).toBe(true);
    expect(matchesMaxMileage(v({ mileage: '120.000 km' }), '100000')).toBe(false);
  });
  it('vehicle ohne mileage failed', () => {
    expect(matchesMaxMileage(v({ mileage: '' }), '50000')).toBe(false);
  });
});

describe('matchesYearFrom', () => {
  it('matched wenn registrationYear >= criterion', () => {
    expect(matchesYearFrom(v({ firstRegistration: '05/2018' }), '2018')).toBe(true);
    expect(matchesYearFrom(v({ firstRegistration: '05/2018' }), '2019')).toBe(false);
  });
});
