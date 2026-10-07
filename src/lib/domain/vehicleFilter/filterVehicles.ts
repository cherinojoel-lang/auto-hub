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
 * ⚡ Bolt: Performance Optimization
 * 💡 What: Combined 6 separate .filter() calls into a single .filter() using logical AND.
 * 🎯 Why: Chaining multiple .filter() calls allocates an intermediate array for each step, resulting in O(N * K) processing.
 * 📊 Impact: Reduces array allocations from 6 per execution to 1, processing in strict O(N) time.
 * 🔬 Measurement: O(N) single-pass operation vs previous O(N * 6) multi-pass.
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
      matchesYearFrom(v, criteria.yearFrom),
  );
