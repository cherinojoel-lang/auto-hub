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
  // ⚡ Bolt Performance Optimization:
  // Combined 6 separate .filter() calls into a single iteration.
  // Reduces time complexity from O(6n) to O(n) and avoids allocating 5 intermediate arrays in memory.
  // Also utilizes short-circuit evaluation (&&) to skip subsequent checks if an earlier condition fails.
  vehicles.filter((v) =>
    v.status === 'available' &&
    matchesManufacturer(v, criteria.manufacturer) &&
    matchesPriceMax(v, criteria.priceMax) &&
    matchesFuel(v, criteria.fuel) &&
    matchesMaxMileage(v, criteria.maxMileage) &&
    matchesYearFrom(v, criteria.yearFrom)
  );
