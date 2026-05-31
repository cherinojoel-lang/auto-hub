import type { Vehicle } from '@/data/vehiclesData.generated';
import { parseMileageKm, parseYearFromRegistration } from './parsers';

const ciEqual = (a: string, b: string): boolean =>
  a.toLocaleLowerCase('de-DE') === b.toLocaleLowerCase('de-DE');

export const matchesManufacturer = (vehicle: Vehicle, criterion: string): boolean => {
  if (criterion === '') return true;
  return ciEqual(vehicle.make ?? '', criterion);
};

export const matchesPriceMax = (vehicle: Vehicle, criterion: string): boolean => {
  if (criterion === '') return true;
  const limit = Number(criterion);
  return vehicle.priceValue <= limit;
};

export const matchesFuel = (vehicle: Vehicle, criterion: string): boolean => {
  if (criterion === '') return true;
  return ciEqual(vehicle.fuel ?? '', criterion);
};

export const matchesMaxMileage = (vehicle: Vehicle, criterion: string): boolean => {
  if (criterion === '') return true;
  const km = parseMileageKm(vehicle.mileage);
  if (km === null) return false;
  return km <= Number(criterion);
};

export const matchesYearFrom = (vehicle: Vehicle, criterion: string): boolean => {
  if (criterion === '') return true;
  const year = parseYearFromRegistration(vehicle.firstRegistration);
  if (year === null) return false;
  return year >= Number(criterion);
};
