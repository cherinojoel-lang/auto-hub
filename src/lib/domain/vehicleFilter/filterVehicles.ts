import type { Vehicle } from '@/data/vehiclesData.generated';
import type { FilterCriteria } from './schema';
import {
  matchesManufacturer,
  matchesPriceMax,
  matchesFuel,
  matchesMaxMileage,
  matchesYearFrom,
} from './predicates';

export const filterVehicles = (
  vehicles: ReadonlyArray<Vehicle>,
  criteria: FilterCriteria,
): Vehicle[] =>
  // ⚡ Bolt: Combined multiple .filter() calls into a single pass to avoid allocating intermediate arrays
  vehicles.filter(
    (v) =>
      v.status === 'available' &&
      matchesManufacturer(v, criteria.manufacturer) &&
      matchesPriceMax(v, criteria.priceMax) &&
      matchesFuel(v, criteria.fuel) &&
      matchesMaxMileage(v, criteria.maxMileage) &&
      matchesYearFrom(v, criteria.yearFrom)
  );
