import { describe, it, expect } from 'vitest';
import { FilterCriteriaSchema, EMPTY_CRITERIA } from '../schema';

describe('FilterCriteriaSchema', () => {
  it('akzeptiert leere Kriterien als Default', () => {
    expect(FilterCriteriaSchema.parse({})).toEqual(EMPTY_CRITERIA);
  });

  it('akzeptiert alle fünf optionalen Felder als Strings', () => {
    const input = { manufacturer: 'BMW', priceMax: '15000', fuel: 'Benzin', maxMileage: '80000', yearFrom: '2015' };
    expect(FilterCriteriaSchema.parse(input)).toEqual(input);
  });

  it('trimmt Whitespace', () => {
    expect(FilterCriteriaSchema.parse({ manufacturer: '  BMW  ' })).toMatchObject({ manufacturer: 'BMW' });
  });

  it('lehnt nicht-numerische priceMax ab', () => {
    expect(() => FilterCriteriaSchema.parse({ priceMax: 'abc' })).toThrow();
  });

  it('lehnt unsinniges yearFrom ab', () => {
    expect(() => FilterCriteriaSchema.parse({ yearFrom: '1899' })).toThrow();
    expect(() => FilterCriteriaSchema.parse({ yearFrom: '2099' })).toThrow();
  });

  it('exportiert EMPTY_CRITERIA mit allen Feldern auf ""', () => {
    expect(EMPTY_CRITERIA).toEqual({
      manufacturer: '',
      priceMax: '',
      fuel: '',
      maxMileage: '',
      yearFrom: '',
    });
  });
});
