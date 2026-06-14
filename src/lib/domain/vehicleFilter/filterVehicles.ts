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
 * ⚡ Bolt Performance Optimization:
 * Combined multiple chained .filter() calls into a single .filter() using logical && operators.
 * Impact: Prevents the allocation of 5 intermediate arrays on every filter operation,
 * reducing memory garbage collection overhead and leveraging short-circuit evaluation.
 * Measurement: The time and memory required to filter the vehicles array should be reduced,
 * especially with larger datasets.
 */
export const filterVehicles = (
  vehicles: ReadonlyArray<Vehicle>,
  criteria: FilterCriteria,
): Vehicle[] =>
  vehicles.filter((v) =>
    v.status === 'available' &&
    matchesManufacturer(v, criteria.manufacturer) &&
    matchesPriceMax(v, criteria.priceMax) &&
    matchesFuel(v, criteria.fuel) &&
    matchesMaxMileage(v, criteria.maxMileage) &&
    matchesYearFrom(v, criteria.yearFrom)
  );
