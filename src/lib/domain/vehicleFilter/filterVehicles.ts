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
 * ⚡ Bolt Optimization:
 * 💡 What: Refactored multi-pass `.filter()` chain into a single-pass loop.
 * 🎯 Why: The original implementation created 5 intermediate array allocations and iterated the dataset 6 times.
 * 📊 Impact: O(n) instead of O(6n) iterations, eliminating intermediate array allocations.
 * 🔬 Measurement: Observe memory usage and execution time during complex query updates in VehiclesPage via React Profiler.
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
