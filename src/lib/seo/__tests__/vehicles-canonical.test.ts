import { describe, it, expect } from 'vitest';
import { criteriaToCanonicalUrl, slugify } from '../vehicles-canonical';
import { EMPTY_CRITERIA } from '@/lib/domain/vehicleFilter';

describe('slugify', () => {
  it('lowercases and replaces whitespace with dash', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('mappt deutsche Umlaute', () => {
    expect(slugify('Citroën')).toBe('citroen');
    expect(slugify('Müller')).toBe('mueller');
    expect(slugify('Großhandel')).toBe('grosshandel');
  });
  it('entfernt führende/trailing dashes', () => {
    expect(slugify('  --hello--  ')).toBe('hello');
  });
});

describe('criteriaToCanonicalUrl', () => {
  it('leere Kriterien → /fahrzeugbestand', () => {
    expect(criteriaToCanonicalUrl(EMPTY_CRITERIA)).toBe('/fahrzeugbestand');
  });

  it('nur manufacturer → pretty URL', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'BMW' }),
    ).toBe('/fahrzeugbestand/marke/bmw');
  });

  it('Umlaut-Marke wird kanonisch geslugt', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'Citroën' }),
    ).toBe('/fahrzeugbestand/marke/citroen');
  });

  it('manufacturer + priceMax aus Standard-Bucket → pretty URL', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'BMW', priceMax: '20000' }),
    ).toBe('/fahrzeugbestand/marke/bmw/preis-bis/20000');
  });

  it('manufacturer + fuel → pretty URL', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'Opel', fuel: 'Diesel' }),
    ).toBe('/fahrzeugbestand/marke/opel/kraftstoff/diesel');
  });

  it('nicht-kanonisierbarer priceMax → Query-URL', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'BMW', priceMax: '17500' }),
    ).toBe('/fahrzeugbestand?manufacturer=BMW&priceMax=17500');
  });

  it('maxMileage → fällt auf Query zurück (long-tail)', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'BMW', maxMileage: '80000' }),
    ).toBe('/fahrzeugbestand?manufacturer=BMW&maxMileage=80000');
  });

  it('yearFrom → fällt auf Query zurück (long-tail)', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'BMW', yearFrom: '2015' }),
    ).toBe('/fahrzeugbestand?manufacturer=BMW&yearFrom=2015');
  });

  it('unbekannter fuel-Wert → Query', () => {
    expect(
      criteriaToCanonicalUrl({ ...EMPTY_CRITERIA, manufacturer: 'BMW', fuel: 'CNG' }),
    ).toBe('/fahrzeugbestand?manufacturer=BMW&fuel=CNG');
  });
});
