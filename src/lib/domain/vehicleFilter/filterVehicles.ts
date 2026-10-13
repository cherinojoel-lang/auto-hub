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
 * 💡 What: Combined multiple array .filter() operations into a single pass.
 * 🎯 Why: Prevent intermediate array allocations for each filter condition.
 * 📊 Impact: Reduces memory pressure/GC overhead and iterates O(n) instead of O(6n).
 * 🔬 Measurement: Filter execution time and memory allocations drop proportionally to array size.
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
