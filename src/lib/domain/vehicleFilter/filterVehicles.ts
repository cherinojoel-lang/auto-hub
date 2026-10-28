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
 * 💡 What: Refactored multiple `.filter()` chain into a single `.filter()` pass.
 * 🎯 Why: Avoids creating 5 intermediate array allocations, reducing garbage collection overhead and iteration time.
 * 📊 Impact: O(N) instead of O(6N) iterations for the filter pipeline. Reduces memory allocations.
 * 🔬 Measurement: Observe memory usage during fast toggling of search filters in the UI.
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
