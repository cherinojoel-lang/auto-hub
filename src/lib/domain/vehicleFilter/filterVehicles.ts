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
  // Performance optimization: Combine multiple chained .filter() calls into a single pass
  // using logical && to reduce O(6n) iterations to O(n) and prevent 5 intermediate array allocations.
  vehicles.filter((v) =>
    v.status === 'available' &&
    matchesManufacturer(v, criteria.manufacturer) &&
    matchesPriceMax(v, criteria.priceMax) &&
    matchesFuel(v, criteria.fuel) &&
    matchesMaxMileage(v, criteria.maxMileage) &&
    matchesYearFrom(v, criteria.yearFrom)
  );
