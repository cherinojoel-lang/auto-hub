import { describe, it, expect } from 'vitest';
import { parseMileageKm, parseYearFromRegistration, parsePriceValue } from '../parsers';

describe('parseMileageKm', () => {
  it('parsed "69.500 km" zu 69500', () => {
    expect(parseMileageKm('69.500 km')).toBe(69500);
  });
  it('parsed "1.234.567 km" zu 1234567', () => {
    expect(parseMileageKm('1.234.567 km')).toBe(1234567);
  });
  it('parsed "0 km" zu 0', () => {
    expect(parseMileageKm('0 km')).toBe(0);
  });
  it('return null für leeren String', () => {
    expect(parseMileageKm('')).toBeNull();
  });
  it('return null für Garbage', () => {
    expect(parseMileageKm('keine Angabe')).toBeNull();
  });
});

describe('parseYearFromRegistration', () => {
  it('parsed "10/2013" zu 2013', () => {
    expect(parseYearFromRegistration('10/2013')).toBe(2013);
  });
  it('parsed "01/2020" zu 2020', () => {
    expect(parseYearFromRegistration('01/2020')).toBe(2020);
  });
  it('parsed "2020" zu 2020 (Fallback ohne Monat)', () => {
    expect(parseYearFromRegistration('2020')).toBe(2020);
  });
  it('return null für leer/Garbage', () => {
    expect(parseYearFromRegistration('')).toBeNull();
    expect(parseYearFromRegistration('NEU')).toBeNull();
  });
});

describe('parsePriceValue', () => {
  it('extrahiert 7990 aus "7.990 €"', () => {
    expect(parsePriceValue('7.990 €')).toBe(7990);
  });
  it('extrahiert 12500 aus "12.500,00 €"', () => {
    expect(parsePriceValue('12.500,00 €')).toBe(12500);
  });
  it('return null für leeren String', () => {
    expect(parsePriceValue('')).toBeNull();
  });
  it('return null für undefined', () => {
    expect(parsePriceValue(undefined)).toBeNull();
  });
  it('return null für null', () => {
    expect(parsePriceValue(null)).toBeNull();
  });
  it('return null für Garbage ohne Ziffern', () => {
    expect(parsePriceValue('keine Angabe')).toBeNull();
  });
  it('extrahiert Preis trotz abweichendem Whitespace', () => {
    expect(parsePriceValue(' 15.000€')).toBe(15000);
    expect(parsePriceValue('15 000 €')).toBe(15000);
  });
});
