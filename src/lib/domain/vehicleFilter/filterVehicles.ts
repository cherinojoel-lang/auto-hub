import type { Vehicle } from '@/data/vehiclesData.generated';
import type { FilterCriteria } from './schema';
import {
  matchesManufacturer,
  matchesPriceMax,
  matchesFuel,
  matchesMaxMileage,
  matchesYearFrom,
} from './predicates';

/**
 * Filters the vehicle list against given criteria.
 *
 * ⚡ Bolt Optimization:
 * Replaced 6 consecutive chained .filter() calls with a single .filter() pass
 * using logical && (short-circuit evaluation).
 *
 * Impact:
 * - Reduces iterations from O(6n) to O(n)
 * - Prevents the allocation of 5 intermediate arrays in memory per invocation
 */
export const filterVehicles = (
  vehicles: ReadonlyArray<Vehicle>,
  criteria: FilterCriteria,
): Vehicle[] =>
  vehicles.filter(
    (v) =>
      v.status === 'available' &&
      matchesManufacturer(v, criteria.manufacturer) &&
      matchesPriceMax(v, criteria.priceMax) &&
      matchesFuel(v, criteria.fuel) &&
      matchesMaxMileage(v, criteria.maxMileage) &&
      matchesYearFrom(v, criteria.yearFrom)
  );
