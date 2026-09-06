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
  it('return null für undefined/null', () => {
    expect(parseYearFromRegistration(undefined)).toBeNull();
    expect(parseYearFromRegistration(null)).toBeNull();
  });
  it('return null für Jahre unter 1900', () => {
    expect(parseYearFromRegistration('1899')).toBeNull();
    expect(parseYearFromRegistration('12/1850')).toBeNull();
  });
  it('parsed genau 1900 (untere Grenze)', () => {
    expect(parseYearFromRegistration('1900')).toBe(1900);
  });
  it('return null für Jahre in ferner Zukunft', () => {
    const farFuture = new Date().getFullYear() + 2;
    expect(parseYearFromRegistration(farFuture.toString())).toBeNull();
  });
  it('parsed aktuelles Jahr und nächstes Jahr', () => {
    const currentYear = new Date().getFullYear();
    expect(parseYearFromRegistration(currentYear.toString())).toBe(currentYear);

    const nextYear = currentYear + 1;
    expect(parseYearFromRegistration(nextYear.toString())).toBe(nextYear);
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
});
